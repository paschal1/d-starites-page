/**
 * ADMIN ONLY: issues an unlock code for one learner + course. Normally you use the admin page (/certificate-admin),
 * which calls this. You can also call it directly:
 *   GET /api/certificate/code?name=Ada+Obi&course=FED&period=2609     with header  x-admin-key: YOUR_CERT_ADMIN_KEY
 * `period` is the month awarded as YYMM (2609 = September 2026). Leave it out to use the current month.
 * Save as: app/api/certificate/code/route.ts
 */
import { courseByKey } from '../certificate-courses'
import { CertConfigError, certificateId, isValidPeriod, normalizeName, periodLabel, periodNow, safeEqual, unlockCode, validName } from '../certificate-lib'

const json = (body: object, status = 200) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } })

export async function GET(request: Request) {
  const url = new URL(request.url)
  const adminKey = process.env.CERT_ADMIN_KEY
  const supplied = request.headers.get('x-admin-key') ?? url.searchParams.get('key') ?? ''
  if (!adminKey || adminKey.length < 12 || !safeEqual(supplied, adminKey)) return json({ ok: false, error: 'Unauthorized' }, 401)

  const name = url.searchParams.get('name') ?? ''
  const course = courseByKey(url.searchParams.get('course'))
  const period = url.searchParams.get('period') || periodNow()
  if (!validName(name)) return json({ ok: false, error: "Add the learner's full name (?name=Full+Name)." }, 400)
  if (!course) return json({ ok: false, error: 'Unknown course. Use one of the keys in certificate-courses.ts (e.g. course=FED).' }, 400)
  if (!isValidPeriod(period)) return json({ ok: false, error: 'period must be YYMM, for example 2609 for September 2026.' }, 400)

  try {
    const code = unlockCode(name, course.key, period)
    return json({
      ok: true,
      name: normalizeName(name),
      course: course.title,
      awarded: periodLabel(period),
      code,
      certificateId: certificateId(name, course.key, period),
      message:
        `Hello! Your certificate for *${course.title}* is ready. Your unlock code is *${code}*. ` +
        `Open the certificate page, choose "${course.title}", enter your name exactly as before, then enter this code to download it.`,
    })
  } catch (err) {
    if (err instanceof CertConfigError) return json({ ok: false, error: 'CERT_SECRET is not configured.' }, 503)
    return json({ ok: false, error: 'Something went wrong.' }, 500)
  }
}