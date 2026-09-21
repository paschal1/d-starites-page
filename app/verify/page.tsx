/**
 * Public page that confirms a certificate is genuine. The QR code on every certificate points here.
 * Save as: app/verify/page.tsx
 */
import type { Metadata } from 'next'
import { courseByKey } from '../api/certificate/certificate-courses'
import { CertConfigError, ISSUER, certificateId, cleanToken, parseCertificateId, periodLabel, safeEqual, validName } from '../api/certificate/certificate-lib'

export const metadata: Metadata = {
  title: 'Verify a Certificate | D-Starite Technologies Academy',
  robots: { index: false, follow: false },
}
export const dynamic = 'force-dynamic'

const BRAND = {
  green: '#0E7C41',
  greenDark: '#0A5C31',
  greenDeep: '#083D21',
  mint: '#EAF8EF',
  mintBorder: 'rgba(14,124,65,0.22)',
  ink: '#0E2418',
  muted: '#5B7A6B',
  error: '#A4231B',
  errorBg: '#FDECEA',
}

const first = (v?: string | string[]) => (Array.isArray(v) ? v[0] : v)

type Result = 'empty' | 'valid' | 'invalid' | 'unavailable'

function check(id?: string, name?: string): Result {
  if (!id || !name) return 'empty' // nothing to check yet: show the form (with whatever was given)
  const parsed = parseCertificateId(id)
  if (!parsed || !validName(name)) return 'invalid'
  try {
    return safeEqual(cleanToken(id), cleanToken(certificateId(name, parsed.courseKey, parsed.period))) ? 'valid' : 'invalid'
  } catch (err) {
    return err instanceof CertConfigError ? 'unavailable' : 'invalid'
  }
}

export default async function VerifyPage({ searchParams }: { searchParams: Promise<{ id?: string | string[]; n?: string | string[] }> }) {
  const sp = await searchParams
  const id = first(sp.id)?.trim().toUpperCase()
  const name = first(sp.n)?.replace(/\s+/g, ' ').trim()
  const result = check(id, name)
  const parsed = result === 'valid' && id ? parseCertificateId(id) : null
  const course = parsed ? courseByKey(parsed.courseKey) : undefined

  const field: React.CSSProperties = {
    width: '100%',
    boxSizing: 'border-box',
    padding: '13px 14px',
    fontSize: 17,
    fontFamily: 'inherit',
    color: BRAND.ink,
    background: '#fff',
    border: '1.5px solid #8AA595',
    borderRadius: 8,
  }
  const label: React.CSSProperties = { display: 'block', fontWeight: 700, fontSize: 14, margin: '0 0 6px', color: BRAND.greenDeep }
  const row = (k: string, v: React.ReactNode, mono = false) => (
    <>
      <dt style={{ color: BRAND.muted }}>{k}</dt>
      <dd style={{ margin: 0, fontWeight: 700, fontFamily: mono ? "Consolas, 'Courier New', monospace" : undefined }}>{v}</dd>
    </>
  )

  return (
    <main style={{ minHeight: '100vh', background: `linear-gradient(180deg,#fff 0%,${BRAND.mint} 60%,#fff 100%)`, fontFamily: "Calibri, Carlito, Roboto, 'Segoe UI', system-ui, sans-serif", color: BRAND.ink, padding: '48px 16px 64px' }}>
      <div style={{ maxWidth: 560, margin: '0 auto' }}>
        <p style={{ margin: '0 0 6px', textAlign: 'center', fontWeight: 700, fontSize: 14, color: BRAND.green }}>{ISSUER}</p>
        <h1 style={{ margin: '0 0 28px', textAlign: 'center', fontFamily: 'Cambria, Caladea, Georgia, serif', fontSize: 'clamp(28px, 6vw, 38px)', color: BRAND.greenDeep, lineHeight: 1.15 }}>Certificate verification</h1>

        {result === 'valid' && parsed && course && (
          <section role="status" style={{ background: '#fff', border: `2px solid ${BRAND.green}`, borderRadius: 14, padding: '28px 26px', boxShadow: '0 4px 24px rgba(14,124,65,0.10)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
              <span aria-hidden="true" style={{ width: 36, height: 36, borderRadius: '50%', background: BRAND.green, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 20 }}>✓</span>
              <h2 style={{ margin: 0, fontFamily: 'Cambria, Caladea, Georgia, serif', fontSize: 24, color: BRAND.greenDark }}>This certificate is genuine</h2>
            </div>
            <dl style={{ margin: 0, display: 'grid', gridTemplateColumns: 'minmax(110px, 0.4fr) 1fr', gap: '10px 16px', fontSize: 17 }}>
              {row('Awarded to', name)}
              {row(course.kind === 'completion' ? 'Completed' : 'Participated in', course.heading)}
              {row('Awarded', periodLabel(parsed.period))}
              {row('Issued by', ISSUER)}
              {row('Certificate no.', id, true)}
            </dl>
            <p style={{ margin: '20px 0 0', fontSize: 15, color: BRAND.muted }}>Check that the name above matches the name printed on the certificate you were given.</p>
          </section>
        )}

        {result === 'invalid' && (
          <section role="alert" style={{ background: BRAND.errorBg, border: '1.5px solid #E9B4AE', borderRadius: 14, padding: '22px 24px', marginBottom: 28 }}>
            <h2 style={{ margin: '0 0 8px', fontFamily: 'Cambria, Caladea, Georgia, serif', fontSize: 22, color: BRAND.error }}>We could not verify this certificate</h2>
            <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.6 }}>The certificate number does not match the name given. Check both carefully and try again. If you still cannot verify it, contact D-Starite Technologies Academy.</p>
          </section>
        )}

        {result === 'unavailable' && (
          <section role="alert" style={{ background: BRAND.errorBg, border: '1.5px solid #E9B4AE', borderRadius: 14, padding: '22px 24px' }}>
            <p style={{ margin: 0, fontSize: 16.5 }}>Verification is temporarily unavailable. Please try again later.</p>
          </section>
        )}

        {(result === 'empty' || result === 'invalid') && (
          <form method="get" action="/verify" style={{ background: '#fff', border: `1px solid ${BRAND.mintBorder}`, borderRadius: 14, padding: '26px 24px', boxShadow: '0 4px 24px rgba(14,124,65,0.06)' }}>
            <p style={{ margin: '0 0 18px', color: BRAND.muted, fontSize: 16 }}>Scan the QR code on the certificate, or enter its details below.</p>
            <div style={{ marginBottom: 16 }}>
              <label htmlFor="v-id" style={label}>Certificate number</label>
              <input id="v-id" name="id" defaultValue={id ?? ''} placeholder="DST-XXX-0000-XXXX-XXXX" autoComplete="off" style={{ ...field, fontFamily: "Consolas, 'Courier New', monospace", textTransform: 'uppercase' }} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label htmlFor="v-n" style={label}>Name on the certificate</label>
              <input id="v-n" name="n" defaultValue={name ?? ''} placeholder="Full name" autoComplete="off" style={field} />
            </div>
            <button type="submit" style={{ width: '100%', padding: 15, background: BRAND.green, color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 17, cursor: 'pointer' }}>Verify certificate</button>
          </form>
        )}

        <p style={{ textAlign: 'center', marginTop: 32, fontSize: 14, color: BRAND.muted }}>
          <a href="https://www.dstariteitsolutions.online" style={{ color: BRAND.green, fontWeight: 600 }}>dstariteitsolutions.online</a>
        </p>
      </div>
    </main>
  )
}