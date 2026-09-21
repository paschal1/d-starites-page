'use client'

/**
 * ADMIN PAGE: issue an unlock code for a learner. Save as: app/certificate-admin/page.tsx
 * Pick the course, type the learner's name exactly as they wrote it in WhatsApp ("Name on certificate"),
 * choose the month, enter your CERT_ADMIN_KEY, then copy the message into WhatsApp.
 * Only issue a code after you have confirmed payment (paid certificates) or that the learner completed the programme.
 * Your admin key is sent to the server but never stored by this page.
 */
import { useEffect, useState } from 'react'

type Course = { key: string; group: string; title: string }
type Issued = { name: string; course: string; awarded: string; code: string; certificateId: string; message: string }

const G = { green: '#0E7C41', deep: '#083D21', mint: '#EAF8EF', border: 'rgba(14,124,65,0.22)', ink: '#0E2418', muted: '#5B7A6B', error: '#A4231B', errorBg: '#FDECEA' }

const thisMonth = () => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

export default function CertificateAdmin() {
  const [courses, setCourses] = useState<Course[]>([])
  const [courseKey, setCourseKey] = useState('')
  const [name, setName] = useState('')
  const [month, setMonth] = useState(thisMonth())
  const [adminKey, setAdminKey] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [issued, setIssued] = useState<Issued | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    fetch('/api/certificate/courses')
      .then((r) => r.json())
      .then((d) => setCourses(d.courses ?? []))
      .catch(() => setError('Could not load the course list.'))
  }, [])

  async function issue() {
    setError('')
    setIssued(null)
    setCopied(false)
    if (!courseKey || name.trim().length < 3 || !adminKey) return setError('Choose a course and enter the name and your admin key.')
    const period = month.slice(2, 4) + month.slice(5, 7) // "2026-09" -> "2609"
    setBusy(true)
    try {
      const qs = new URLSearchParams({ name: name.trim(), course: courseKey, period })
      const res = await fetch(`/api/certificate/code?${qs}`, { headers: { 'x-admin-key': adminKey } })
      const data = await res.json()
      if (res.ok && data.ok) setIssued(data)
      else setError(data.error || 'Could not issue a code.')
    } catch {
      setError('Could not reach the server.')
    } finally {
      setBusy(false)
    }
  }

  async function copy() {
    if (!issued) return
    try {
      await navigator.clipboard.writeText(issued.message)
      setCopied(true)
    } catch {
      setError('Copy failed. Select the message and copy it manually.')
    }
  }

  const groups = Array.from(new Set(courses.map((c) => c.group)))
  const field: React.CSSProperties = { width: '100%', boxSizing: 'border-box', padding: '12px 14px', fontSize: 17, fontFamily: 'inherit', border: '1.5px solid #8AA595', borderRadius: 8, background: '#fff', color: G.ink }
  const label: React.CSSProperties = { display: 'block', fontWeight: 700, fontSize: 14, margin: '0 0 6px', color: G.deep }

  return (
    <main style={{ minHeight: '100vh', background: G.mint, fontFamily: "Calibri, Carlito, Roboto, 'Segoe UI', system-ui, sans-serif", color: G.ink, padding: '40px 16px 64px' }}>
      <meta name="robots" content="noindex,nofollow" />
      <div style={{ maxWidth: 520, margin: '0 auto', background: '#fff', border: `1px solid ${G.border}`, borderRadius: 14, padding: '28px 26px' }}>
        <h1 style={{ margin: '0 0 6px', fontFamily: 'Cambria, Caladea, Georgia, serif', fontSize: 28, color: G.deep }}>Issue certificate code</h1>
        <p style={{ margin: '0 0 22px', color: G.muted, fontSize: 15.5 }}>Only issue a code after you have confirmed payment or that the learner completed the programme.</p>

        <div style={{ display: 'grid', gap: 16 }}>
          <div>
            <label htmlFor="a-course" style={label}>Course</label>
            <select id="a-course" style={field} value={courseKey} onChange={(e) => setCourseKey(e.target.value)}>
              <option value="">Select a course…</option>
              {groups.map((g) => (
                <optgroup key={g} label={g}>
                  {courses.filter((c) => c.group === g).map((c) => (
                    <option key={c.key} value={c.key}>{c.title}</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="a-name" style={label}>Name on certificate (exactly as the learner wrote it)</label>
            <input id="a-name" style={field} value={name} onChange={(e) => setName(e.target.value)} autoComplete="off" />
          </div>
          <div>
            <label htmlFor="a-month" style={label}>Month awarded</label>
            <input id="a-month" type="month" style={field} value={month} onChange={(e) => setMonth(e.target.value)} />
          </div>
          <div>
            <label htmlFor="a-key" style={label}>Admin key</label>
            <input id="a-key" type="password" style={field} value={adminKey} onChange={(e) => setAdminKey(e.target.value)} autoComplete="off" />
          </div>
        </div>

        {error && <div role="alert" style={{ marginTop: 16, padding: '12px 14px', background: G.errorBg, color: G.error, borderRadius: 8, fontWeight: 700, fontSize: 15.5 }}>{error}</div>}

        <button type="button" onClick={issue} disabled={busy} style={{ marginTop: 20, width: '100%', padding: 15, background: G.green, color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 17, cursor: 'pointer', opacity: busy ? 0.7 : 1 }}>
          {busy ? 'Issuing…' : 'Get unlock code'}
        </button>

        {issued && (
          <section role="status" style={{ marginTop: 24, background: G.mint, border: `1px solid ${G.border}`, borderRadius: 10, padding: '18px 18px' }}>
            <div style={{ fontSize: 14, color: G.muted }}>Unlock code for {issued.name}</div>
            <div style={{ fontFamily: "Consolas, 'Courier New', monospace", fontWeight: 700, fontSize: 34, letterSpacing: '0.12em', color: G.deep, margin: '2px 0 8px' }}>{issued.code}</div>
            <div style={{ fontSize: 15, marginBottom: 12 }}>{issued.course}, {issued.awarded}<br />Certificate no. <span style={{ fontFamily: "Consolas, 'Courier New', monospace" }}>{issued.certificateId}</span></div>
            <textarea readOnly value={issued.message} rows={4} style={{ ...field, fontSize: 15, resize: 'vertical' }} />
            <button type="button" onClick={copy} style={{ marginTop: 10, width: '100%', padding: 13, background: G.deep, color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>
              {copied ? 'Copied. Paste it in WhatsApp' : 'Copy WhatsApp message'}
            </button>
          </section>
        )}
      </div>
    </main>
  )
}