/**
 * Checks the unlock code the learner received and, if it is correct, returns the signed certificate number.
 * Save as: app/api/certificate/unlock/route.ts
 */
import { courseByKey } from '../certificate-courses'
import { CertConfigError, certificateId, findPeriodForCode, validName } from '../certificate-lib'

// Simple brute-force guard: 10 wrong codes per IP per 10 minutes (per server instance).
const WINDOW_MS = 10 * 60 * 1000
const MAX_FAILURES = 10
const failures = new Map<string, { count: number; resetAt: number }>()

function isBlocked(ip: string): boolean {
  const f = failures.get(ip)
  if (!f) return false
  if (Date.now() > f.resetAt) {
    failures.delete(ip)
    return false
  }
  return f.count >= MAX_FAILURES
}

function recordFailure(ip: string) {
  const f = failures.get(ip)
  if (!f || Date.now() > f.resetAt) failures.set(ip, { count: 1, resetAt: Date.now() + WINDOW_MS })
  else f.count += 1
}

const json = (body: object, status = 200) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } })

export async function POST(request: Request) {
  const ip = (request.headers.get('x-forwarded-for') ?? 'unknown').split(',')[0].trim()
  if (isBlocked(ip)) return json({ ok: false, error: 'Too many attempts. Please wait a few minutes and try again.' }, 429)

  let body: { name?: unknown; courseKey?: unknown; code?: unknown }
  try {
    body = await request.json()
  } catch {
    return json({ ok: false, error: 'Invalid request.' }, 400)
  }
  const course = courseByKey(body.courseKey)
  if (!validName(body.name) || !course || typeof body.code !== 'string') return json({ ok: false, error: 'Invalid request.' }, 400)

  try {
    const period = findPeriodForCode(body.name, course.key, body.code)
    if (!period) {
      recordFailure(ip)
      return json({ ok: false, error: 'That code is incorrect for this name and course. Please check the code we sent you.' }, 401)
    }
    return json({ ok: true, courseKey: course.key, period, certificateId: certificateId(body.name, course.key, period) })
  } catch (err) {
    if (err instanceof CertConfigError) return json({ ok: false, error: 'Certificates are temporarily unavailable.' }, 503)
    return json({ ok: false, error: 'Something went wrong. Please try again.' }, 500)
  }
}