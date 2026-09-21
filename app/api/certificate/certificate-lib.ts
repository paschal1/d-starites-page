/**
 * D-Starite certificate helpers (server only).
 * Save as: app/api/certificate/certificate-lib.ts
 *
 * Everything is derived from one secret, so no database is needed. For each (learner name, course, month):
 *   - unlock code   = 6 characters that only you can generate; you send it after payment / after checking completion
 *   - certificate # = e.g. DST-FED-2609-K7M2-QX9P  (course key, month awarded YYMM, then a signature), checked by /verify
 *
 * Required environment variables:
 *   CERT_SECRET      long random string, e.g. run `openssl rand -hex 32`   (never share or commit it)
 *   CERT_ADMIN_KEY   password you use to generate unlock codes             (never share or commit it)
 */
import { createHmac, timingSafeEqual } from 'crypto'
import { courseByKey } from './certificate-courses'

export const ISSUER = 'D-Starite Technologies Academy'

export class CertConfigError extends Error {}

// 32 characters, no 0/O/1/I so codes are easy to read out and type.
const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function secret(): string {
  const s = process.env.CERT_SECRET
  if (!s || s.length < 16) throw new CertConfigError('CERT_SECRET is missing or too short')
  return s
}

/** Case, extra spaces and accent composition do not matter: "  ada   OBI " and "Ada Obi" are the same person. */
export function normalizeName(name: string): string {
  return name.normalize('NFC').replace(/\s+/g, ' ').trim().toUpperCase()
}

export function validName(name: unknown): name is string {
  if (typeof name !== 'string') return false
  const n = normalizeName(name)
  return n.length >= 3 && n.length <= 60
}

// ── months, as "YYMM" (e.g. 2609 = September 2026) ──
export const isValidPeriod = (p: unknown): p is string => typeof p === 'string' && /^\d{2}(0[1-9]|1[0-2])$/.test(p)

export function periodNow(d = new Date()): string {
  return String(d.getFullYear() % 100).padStart(2, '0') + String(d.getMonth() + 1).padStart(2, '0')
}

/** Next month, this month, then back `back` months. Used to find which month an unlock code was issued for. */
export function recentPeriods(back = 60, from = new Date()): string[] {
  const out: string[] = []
  for (let i = -1; i <= back; i++) out.push(periodNow(new Date(from.getFullYear(), from.getMonth() - i, 1)))
  return out
}

export function periodLabel(p: string): string {
  return `${MONTHS[parseInt(p.slice(2), 10) - 1]} ${2000 + parseInt(p.slice(0, 2), 10)}`
}

// ── signing ──
function digest(purpose: 'unlock' | 'cert', courseKey: string, period: string, name: string): Buffer {
  return createHmac('sha256', secret()).update(`${purpose}|${courseKey}|${period}|${normalizeName(name)}`).digest()
}

function toCode(buf: Buffer, length: number): string {
  let out = ''
  let value = 0
  let bits = 0
  for (let i = 0; i < buf.length; i++) {
    const byte = buf[i]
    value = ((value << 8) | byte) & 0xffff
    bits += 8
    while (bits >= 5 && out.length < length) {
      out += ALPHABET[(value >>> (bits - 5)) & 31]
      bits -= 5
    }
    if (out.length >= length) break
  }
  return out
}

/** The code you send to the learner, e.g. K7M2QX. Only valid for this name + course + month. */
export function unlockCode(name: string, courseKey: string, period: string): string {
  return toCode(digest('unlock', courseKey, period, name), 6)
}

/** The number printed on the certificate, e.g. DST-FED-2609-K7M2-QX9P */
export function certificateId(name: string, courseKey: string, period: string): string {
  const c = toCode(digest('cert', courseKey, period, name), 8)
  return `DST-${courseKey}-${period}-${c.slice(0, 4)}-${c.slice(4)}`
}

/** Splits "DST-FED-2609-K7M2-QX9P" into its parts (tolerates lowercase and stray spaces). */
export function parseCertificateId(id: string): { courseKey: string; period: string } | null {
  const m = /^DST-([A-Z0-9]{3,4})-(\d{4})-[A-Z0-9]{4}-[A-Z0-9]{4}$/.exec(id.trim().toUpperCase().replace(/\s+/g, ''))
  if (!m || !isValidPeriod(m[2]) || !courseByKey(m[1])) return null
  return { courseKey: m[1], period: m[2] }
}

/** Uppercase and strip everything except letters and digits. */
export function cleanToken(s: string): string {
  return s.toUpperCase().replace(/[^A-Z0-9]/g, '')
}

export function safeEqual(a: string, b: string): boolean {
  const A = Buffer.from(a)
  const B = Buffer.from(b)
  return A.length === B.length && timingSafeEqual(A, B)
}

/** Which month was this code issued for? Returns the YYMM, or null if the code is wrong. */
export function findPeriodForCode(name: string, courseKey: string, code: string): string | null {
  const given = cleanToken(code)
  let found: string | null = null
  for (const p of recentPeriods()) if (safeEqual(given, unlockCode(name, courseKey, p))) found = p
  return found
}