/**
 * Public list of courses for the dropdown on the certificate page (no secrets in it).
 * Save as: app/api/certificate/courses/route.ts
 */
import { COURSES } from '../certificate-courses'

export async function GET() {
  return Response.json({ ok: true, courses: COURSES }, { headers: { 'Cache-Control': 'public, max-age=300' } })
}