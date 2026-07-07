"use client";

import { useState } from "react";

// ── CONTACT DETAILS ──────────────────────────────────────────────────────────
const ACCOUNT_NUMBER = "0078508706";
const ACCOUNT_NAME   = "Nwokeocha Paschal Chikwado";
const BANK           = "Access Bank";
const CERT_FEE       = "₦3,000";
const WA_NUMBER      = "2348130062780";
const EVENT_DATE     = new Date().toLocaleDateString("en-GB", { month: "long", year: "numeric" });
const EVENT_TITLE    = "AI in Business";

// ── BRAND TOKENS ─────────────────────────────────────────────────────────────
const BRAND = {
  green:      "#0E7C41",
  greenDark:  "#0A5C31",
  greenDeep:  "#083D21",
  mint:       "#EAF8EF",
  mintBorder: "rgba(14,124,65,0.18)",
  white:      "#FFFFFF",
  ink:        "#0E2418",
  muted:      "#5B7A6B",
  line:       "rgba(14,124,65,0.14)",
};

function buildWALink(name: string) {
  const msg = encodeURIComponent(
    `Hello! 👋 I just paid for my *AI in Business Webinar Certificate*.\n\n` +
    `*Name on certificate:* ${name}\n` +
    `*Amount paid:* ${CERT_FEE}\n` +
    `*Account:* ${ACCOUNT_NUMBER} (${BANK})\n\n` +
    `Please find attached my payment receipt. Kindly unlock my certificate download. Thank you!`
  );
  return `https://wa.me/${WA_NUMBER}?text=${msg}`;
}

// ── CERTIFICATE SVG — returns a raw SVG string (used for both render + download)
function buildSVGString(name: string, preview: boolean): string {
  const displayName = (name.trim() || "Your Full Name").length > 28
    ? (name.trim() || "Your Full Name").substring(0, 28) + "…"
    : (name.trim() || "Your Full Name");

  const watermark = preview
    ? `<text x="400" y="280" text-anchor="middle" dominant-baseline="middle"
        fill="rgba(255,255,255,0.07)" font-size="72" font-family="Georgia,serif"
        font-weight="bold" transform="rotate(-30,400,280)">PREVIEW</text>`
    : "";

  return `<svg viewBox="0 0 800 560" xmlns="http://www.w3.org/2000/svg" width="800" height="560">
  <rect width="800" height="560" fill="#0A1628"/>
  <rect x="12" y="12" width="776" height="536" fill="none" stroke="#C9A227" stroke-width="2.5"/>
  <rect x="22" y="22" width="756" height="516" fill="none" stroke="#C9A227" stroke-width="0.8" opacity="0.5"/>
  <rect x="12" y="12" width="776" height="6" fill="#C9A227"/>
  <rect x="12" y="542" width="776" height="6" fill="#C9A227"/>
  <circle cx="40"  cy="40"  r="8" fill="none" stroke="#C9A227" stroke-width="1.5"/>
  <circle cx="40"  cy="40"  r="3" fill="#C9A227"/>
  <circle cx="760" cy="40"  r="8" fill="none" stroke="#C9A227" stroke-width="1.5"/>
  <circle cx="760" cy="40"  r="3" fill="#C9A227"/>
  <circle cx="40"  cy="520" r="8" fill="none" stroke="#C9A227" stroke-width="1.5"/>
  <circle cx="40"  cy="520" r="3" fill="#C9A227"/>
  <circle cx="760" cy="520" r="8" fill="none" stroke="#C9A227" stroke-width="1.5"/>
  <circle cx="760" cy="520" r="3" fill="#C9A227"/>
  ${watermark}
  <text x="400" y="72" text-anchor="middle" fill="#5AC8FA"
    font-family="'Segoe UI',Arial,sans-serif" font-size="13" letter-spacing="4" font-weight="bold">
    D-STARITE TECHNOLOGIES ACADEMY</text>
  <line x1="160" y1="88" x2="640" y2="88" stroke="#C9A227" stroke-width="0.8" opacity="0.7"/>
  <text x="400" y="128" text-anchor="middle" fill="#C9A227"
    font-family="Georgia,'Times New Roman',serif" font-size="14" letter-spacing="6">
    CERTIFICATE OF PARTICIPATION</text>
  <text x="400" y="172" text-anchor="middle" fill="#a8c8e8"
    font-family="Georgia,serif" font-size="15" font-style="italic">
    This is to certify that</text>
  <text x="400" y="240" text-anchor="middle" fill="#FFFFFF"
    font-family="Georgia,'Times New Roman',serif" font-size="38" font-weight="bold">
    ${displayName}</text>
  <line x1="160" y1="255" x2="640" y2="255" stroke="#C9A227" stroke-width="1" opacity="0.9"/>
  <text x="400" y="292" text-anchor="middle" fill="#a8c8e8"
    font-family="Georgia,serif" font-size="15" font-style="italic">
    has successfully participated in the</text>
  <text x="400" y="338" text-anchor="middle" fill="#5AC8FA"
    font-family="Georgia,serif" font-size="26" font-weight="bold">
    ${EVENT_TITLE} Webinar</text>
  <text x="400" y="375" text-anchor="middle" fill="#7a9bbf"
    font-family="'Segoe UI',Arial,sans-serif" font-size="12">
    An intensive online programme on applying Artificial Intelligence in modern business practice</text>
  <line x1="200" y1="400" x2="600" y2="400" stroke="#C9A227" stroke-width="0.6" opacity="0.5"/>
  <text x="280" y="434" text-anchor="middle" fill="#5AC8FA"
    font-family="'Segoe UI',Arial,sans-serif" font-size="11" font-weight="bold" letter-spacing="1">DATE</text>
  <text x="280" y="452" text-anchor="middle" fill="#fff"
    font-family="Georgia,serif" font-size="13">${EVENT_DATE}</text>
  <text x="520" y="434" text-anchor="middle" fill="#5AC8FA"
    font-family="'Segoe UI',Arial,sans-serif" font-size="11" font-weight="bold" letter-spacing="1">ISSUED BY</text>
  <text x="520" y="452" text-anchor="middle" fill="#fff"
    font-family="Georgia,serif" font-size="14" font-weight="bold">D-Starite Technologies Academy</text>
  <line x1="160" y1="478" x2="640" y2="478" stroke="#C9A227" stroke-width="0.6" opacity="0.4"/>
  <text x="400" y="500" text-anchor="middle" fill="#3a5a7a"
    font-family="'Segoe UI',Arial,sans-serif" font-size="10" letter-spacing="1">
    dstaritetechnologies.com  ·  Empowering Growth Through Innovation</text>
</svg>`;
}

// ── CERTIFICATE REACT COMPONENT (renders inline) ─────────────────────────────
function CertificateSVG({ name, preview = false }: { name: string; preview?: boolean }) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: buildSVGString(name, preview) }}
      style={{ width: "100%", lineHeight: 0 }}
    />
  );
}

// ── DOWNLOAD: SVG → Canvas → PNG — zero dependencies ────────────────────────
async function downloadCertAsPNG(name: string): Promise<void> {
  const svgString = buildSVGString(name, false);
  const scale     = 3; // 2400 × 1680 px — crisp on any screen / printer

  return new Promise((resolve, reject) => {
    const img = new Image();
    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url  = URL.createObjectURL(blob);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width  = 800 * scale;
      canvas.height = 560 * scale;
      const ctx = canvas.getContext("2d");
      if (!ctx) { reject(new Error("Canvas unavailable")); return; }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);

      canvas.toBlob((pngBlob) => {
        if (!pngBlob) { reject(new Error("PNG export failed")); return; }
        const a = document.createElement("a");
        a.href = URL.createObjectURL(pngBlob);
        a.download = `DStarite_Certificate_${name.trim().replace(/\s+/g, "_")}.png`;
        a.click();
        setTimeout(() => URL.revokeObjectURL(a.href), 5000);
        resolve();
      }, "image/png");
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("SVG failed to load into image"));
    };

    img.src = url;
  });
}

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────
type Step = "enter" | "preview" | "pay" | "verify" | "done";

export default function AICertPage() {
  const [step,        setStep]        = useState<Step>("enter");
  const [fullName,    setFullName]    = useState("");
  const [nameError,   setNameError]   = useState("");
  const [unlockCode,  setUnlockCode]  = useState("");
  const [codeError,   setCodeError]   = useState("");
  const [downloading, setDownloading] = useState(false);
  const [dlError,     setDlError]     = useState("");

  function handlePreview() {
    if (fullName.trim().length < 3) {
      setNameError("Please enter your full name (at least 3 characters).");
      return;
    }
    setNameError("");
    setStep("preview");
  }

  // Code = first 4 letters of first name (uppercase) + "DST"
  // e.g. "Adaeze Chukwuemeka" → "ADAEDST"
  // You send this code manually via WhatsApp after confirming payment.
  function handleVerify() {
    const firstName = fullName.trim().toUpperCase().split(" ")[0];
    const expected  = firstName.substring(0, 4) + "DST";
    if (unlockCode.trim().toUpperCase() === expected) {
      setCodeError("");
      setStep("done");
    } else {
      setCodeError("That code is incorrect. Please check your WhatsApp for the unlock code we sent you.");
    }
  }

  async function handleDownload() {
    setDownloading(true);
    setDlError("");
    try {
      await downloadCertAsPNG(fullName);
    } catch (err) {
      console.error(err);
      setDlError("Download failed. Please try again or contact us on WhatsApp.");
    } finally {
      setDownloading(false);
    }
  }

  // ── SHARED STYLES ───────────────────────────────────────────────────────────
  const pageStyle: React.CSSProperties = {
    minHeight: "100vh",
    background: `linear-gradient(180deg,${BRAND.white} 0%,${BRAND.mint} 45%,${BRAND.white} 100%)`,
    fontFamily: "'Inter','Segoe UI',sans-serif",
    color: BRAND.ink,
    padding: "0 16px 60px",
  };

  const cardStyle: React.CSSProperties = {
    background: BRAND.white,
    border: `1px solid ${BRAND.line}`,
    borderRadius: "16px",
    padding: "36px 32px",
    maxWidth: "560px",
    margin: "0 auto",
    boxShadow: "0 4px 24px rgba(14,124,65,0.06)",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 16px",
    background: BRAND.mint,
    border: `1.5px solid ${BRAND.mintBorder}`,
    borderRadius: "10px",
    color: BRAND.ink,
    fontSize: "17px",
    outline: "none",
    boxSizing: "border-box",
  };

  const btnPrimary: React.CSSProperties = {
    width: "100%",
    padding: "15px",
    background: BRAND.green,
    color: BRAND.white,
    border: "none",
    borderRadius: "10px",
    fontWeight: 700,
    fontSize: "16px",
    cursor: "pointer",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "12px",
    fontWeight: 700,
    color: BRAND.green,
    marginBottom: "8px",
    letterSpacing: "0.07em",
    textTransform: "uppercase",
  };

  const errorStyle: React.CSSProperties = {
    color: "#C0392B",
    fontSize: "13px",
    marginTop: "8px",
    fontWeight: 500,
  };

  const stepDot = (n: number, label: string, active: boolean, done: boolean) => (
    <div style={{ display: "flex", alignItems: "center", gap: "7px", opacity: done || active ? 1 : 0.35 }}>
      <div style={{
        width: "26px", height: "26px", borderRadius: "50%", flexShrink: 0,
        background: done ? BRAND.greenDark : active ? BRAND.green : BRAND.mint,
        border: done || active ? "none" : `1px solid ${BRAND.mintBorder}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "11px", fontWeight: 800,
        color: done || active ? BRAND.white : BRAND.muted,
      }}>
        {done ? "✓" : n}
      </div>
      <span style={{ fontSize: "12px", fontWeight: active ? 700 : 400, color: active ? BRAND.greenDeep : BRAND.muted }}>
        {label}
      </span>
    </div>
  );
  const divider = <div style={{ width: "20px", height: "1px", background: BRAND.mintBorder, alignSelf: "center", flexShrink: 0 }} />;

  const isDone    = step === "done";
  const isPay     = step === "pay";
  const isVerify  = step === "verify";
  const isPreview = step === "preview";
  const isEnter   = step === "enter";

  return (
    <main style={pageStyle}>

      {/* ── HERO ─────────────────────────────────────────── */}
      <div style={{ textAlign: "center", padding: "56px 0 36px" }}>
        <span style={{
          display: "inline-block",
          background: BRAND.mint, border: `1px solid ${BRAND.mintBorder}`,
          color: BRAND.greenDark, padding: "5px 14px", borderRadius: "100px",
          fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em",
          textTransform: "uppercase", marginBottom: "18px",
        }}>
          D-Starite Technologies Academy
        </span>
        <h1 style={{
          fontSize: "clamp(26px,6vw,46px)", fontWeight: 900, lineHeight: 1.1,
          letterSpacing: "-0.02em", margin: "0 auto 12px", maxWidth: "580px",
          color: BRAND.greenDeep,
        }}>
          AI in Business<br />
          <span style={{ color: BRAND.green }}>Certificate of Participation</span>
        </h1>
        <p style={{ color: BRAND.muted, fontSize: "15px", maxWidth: "460px", margin: "0 auto", lineHeight: 1.65 }}>
          Enter your name exactly as you want it on your certificate, preview it, pay, and download.
        </p>
      </div>

      {/* ── PROGRESS ─────────────────────────────────────── */}
      <div style={{ display: "flex", justifyContent: "center", gap: "clamp(8px,3vw,28px)", marginBottom: "36px", flexWrap: "wrap", padding: "0 12px" }}>
        {stepDot(1, "Name",     isEnter,   !isEnter)}
        {divider}
        {stepDot(2, "Preview",  isPreview, isPay || isVerify || isDone)}
        {divider}
        {stepDot(3, "Pay",      isPay,     isVerify || isDone)}
        {divider}
        {stepDot(4, "Unlock",   isVerify,  isDone)}
        {divider}
        {stepDot(5, "Download", isDone,    false)}
      </div>

      {/* ── STEP 1: Name ─────────────────────────────────── */}
      {step === "enter" && (
        <div style={cardStyle}>
          <h2 style={{ fontSize: "20px", fontWeight: 800, marginBottom: "6px", color: BRAND.greenDeep }}>
            Enter your full name
          </h2>
          <p style={{ color: BRAND.muted, fontSize: "14px", marginBottom: "24px", lineHeight: 1.6 }}>
            This is exactly how it will appear on your certificate. Use your proper full name.
          </p>
          <label style={labelStyle}>Full Name</label>
          <input
            type="text"
            placeholder="e.g. Adaeze Chukwuemeka"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handlePreview()}
            style={inputStyle}
            autoFocus
          />
          {nameError && <p style={errorStyle}>⚠️ {nameError}</p>}
          <button onClick={handlePreview} style={{ ...btnPrimary, marginTop: "22px" }}>
            Preview My Certificate →
          </button>
        </div>
      )}

      {/* ── STEP 2: Preview ──────────────────────────────── */}
      {step === "preview" && (
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <div style={{
            background: BRAND.white, border: `1px solid ${BRAND.mintBorder}`,
            borderRadius: "16px", padding: "20px", marginBottom: "20px",
            boxShadow: "0 4px 24px rgba(14,124,65,0.06)",
          }}>
            <p style={{ fontSize: "11px", color: BRAND.greenDark, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "10px", textAlign: "center" }}>
              Preview — watermark removed after payment
            </p>
            <CertificateSVG name={fullName} preview />
          </div>
          <div style={{ ...cardStyle, maxWidth: "700px" }}>
            <p style={{ fontSize: "15px", color: BRAND.ink, marginBottom: "18px", lineHeight: 1.6 }}>
              Name on certificate: <strong style={{ color: BRAND.greenDeep }}>"{fullName}"</strong>
            </p>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <button onClick={() => setStep("enter")} style={{
                flex: 1, minWidth: "110px", padding: "13px",
                background: BRAND.white, border: `1px solid ${BRAND.mintBorder}`,
                color: BRAND.greenDeep, borderRadius: "10px", fontWeight: 600, fontSize: "15px", cursor: "pointer",
              }}>
                ← Edit Name
              </button>
              <button onClick={() => setStep("pay")} style={{ ...btnPrimary, flex: 2, minWidth: "160px", width: "auto" }}>
                Pay & Get Certificate →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── STEP 3: Pay ──────────────────────────────────── */}
      {step === "pay" && (
        <div style={cardStyle}>
          <h2 style={{ fontSize: "20px", fontWeight: 800, marginBottom: "6px", color: BRAND.greenDeep }}>
            Complete Payment
          </h2>
          <p style={{ color: BRAND.muted, fontSize: "14px", marginBottom: "22px" }}>
            Transfer to the account below, then tap the WhatsApp button to send your receipt. We'll reply with your unlock code.
          </p>

          {/* Bank details */}
          <div style={{ background: BRAND.mint, border: `1px solid ${BRAND.mintBorder}`, borderRadius: "12px", padding: "18px 20px", marginBottom: "18px" }}>
            <p style={{ fontSize: "11px", color: BRAND.greenDark, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "12px" }}>
              Bank Transfer Details
            </p>
            {([
              ["Amount",         CERT_FEE],
              ["Account Number", ACCOUNT_NUMBER],
              ["Account Name",   ACCOUNT_NAME],
              ["Bank",           BANK],
            ] as [string,string][]).map(([label, value]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: `1px solid ${BRAND.mintBorder}` }}>
                <span style={{ fontSize: "13px", color: BRAND.muted }}>{label}</span>
                <span style={{ fontSize: label === "Amount" ? "20px" : "14px", fontWeight: label === "Amount" ? 900 : 700, color: BRAND.greenDeep, textAlign: "right" }}>
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* Steps */}
          <div style={{ background: BRAND.white, border: `1px solid ${BRAND.mintBorder}`, borderRadius: "12px", padding: "14px 18px", marginBottom: "20px" }}>
            <p style={{ fontSize: "12px", fontWeight: 700, color: BRAND.greenDark, marginBottom: "8px" }}>After payment:</p>
            {["Save your payment receipt (screenshot)", "Tap the button below to open WhatsApp", "Send the pre-filled message + attach receipt", "We'll reply with your unlock code within minutes"].map((s, i) => (
              <p key={i} style={{ fontSize: "13px", color: BRAND.ink, marginBottom: "5px" }}>{i + 1}. {s}</p>
            ))}
          </div>

          {/* WhatsApp CTA */}
          <a
            href={buildWALink(fullName)}
            target="_blank" rel="noopener noreferrer"
            style={{ display: "block", textAlign: "center", textDecoration: "none", marginBottom: "10px",
              background: "#25D366", color: "#fff", padding: "15px", borderRadius: "10px",
              fontWeight: 700, fontSize: "16px", cursor: "pointer",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white" style={{ verticalAlign: "middle", marginRight: "8px", marginBottom: "2px" }}>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            I've Paid — Send Receipt on WhatsApp
          </a>

          <button onClick={() => setStep("verify")} style={{
            width: "100%", padding: "12px", background: "transparent",
            border: `1px solid ${BRAND.mintBorder}`, color: BRAND.muted,
            borderRadius: "10px", fontWeight: 600, fontSize: "14px", cursor: "pointer",
          }}>
            I already have an unlock code →
          </button>
        </div>
      )}

      {/* ── STEP 4: Unlock code ───────────────────────────── */}
      {step === "verify" && (
        <div style={cardStyle}>
          <h2 style={{ fontSize: "20px", fontWeight: 800, marginBottom: "6px", color: BRAND.greenDeep }}>
            Enter Your Unlock Code
          </h2>
          <p style={{ color: BRAND.muted, fontSize: "14px", marginBottom: "24px", lineHeight: 1.6 }}>
            We sent your personal unlock code via WhatsApp after confirming your payment.
          </p>
          <label style={labelStyle}>Unlock Code</label>
          <input
            type="text"
            placeholder="Enter code"
            value={unlockCode}
            onChange={(e) => setUnlockCode(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === "Enter" && handleVerify()}
            style={{ ...inputStyle, letterSpacing: "0.15em", fontSize: "22px", textAlign: "center", textTransform: "uppercase" }}
            autoFocus
          />
          {codeError && <p style={errorStyle}>⚠️ {codeError}</p>}
          <button onClick={handleVerify} style={{ ...btnPrimary, marginTop: "22px", marginBottom: "12px" }}>
            Unlock My Certificate →
          </button>
          <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer"
            style={{ display: "block", textAlign: "center", color: "#25D366", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>
            💬 Haven't received your code? Message us on WhatsApp
          </a>
        </div>
      )}

      {/* ── STEP 5: Download ─────────────────────────────── */}
      {step === "done" && (
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          {/* Success */}
          <div style={{
            background: BRAND.mint, border: `1px solid ${BRAND.mintBorder}`,
            borderRadius: "12px", padding: "16px 20px", marginBottom: "20px", textAlign: "center",
          }}>
            <p style={{ fontSize: "24px", marginBottom: "4px" }}>🎉</p>
            <p style={{ fontWeight: 800, fontSize: "16px", color: BRAND.greenDark, marginBottom: "4px" }}>
              Certificate unlocked!
            </p>
            <p style={{ fontSize: "13px", color: BRAND.muted }}>
              Ready to download for <strong style={{ color: BRAND.greenDeep }}>{fullName}</strong>
            </p>
          </div>

          {/* Clean cert preview */}
          <div style={{ background: "#F7F7F5", border: `1px solid ${BRAND.mintBorder}`, borderRadius: "16px", padding: "20px", marginBottom: "20px" }}>
            <CertificateSVG name={fullName} preview={false} />
          </div>

          {/* Download */}
          <div style={{ ...cardStyle, maxWidth: "700px" }}>
            <button
              onClick={handleDownload}
              disabled={downloading}
              style={{ ...btnPrimary, marginBottom: "10px", opacity: downloading ? 0.7 : 1, background: BRAND.greenDark }}
            >
              {downloading ? "Generating…" : "⬇️  Download Certificate (PNG)"}
            </button>
            {dlError && <p style={errorStyle}>⚠️ {dlError}</p>}
            <p style={{ fontSize: "12px", color: BRAND.muted, textAlign: "center", lineHeight: 1.6, marginBottom: "20px" }}>
              Downloads as a high-resolution PNG (2400 × 1680 px) — ready to share on LinkedIn, WhatsApp, or print.
            </p>
            <div style={{ borderTop: `1px solid ${BRAND.line}`, paddingTop: "16px", textAlign: "center" }}>
              <p style={{ fontSize: "13px", color: BRAND.muted, marginBottom: "8px" }}>Share your achievement</p>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`I just received my AI in Business Webinar certificate from D-Starite Technologies Academy! 🎓\n\nCheck them out: dstaritetechnologies.com`)}`}
                target="_blank" rel="noopener noreferrer"
                style={{ fontSize: "14px", color: "#25D366", fontWeight: 700, textDecoration: "none" }}
              >
                📤 Share on WhatsApp →
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ── FOOTER ───────────────────────────────────────── */}
      <p style={{ textAlign: "center", marginTop: "48px", fontSize: "12px", color: BRAND.muted }}>
        Questions? Chat us on{" "}
        <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer"
          style={{ color: BRAND.green, fontWeight: 600, textDecoration: "none" }}>WhatsApp</a>
        {" · "}
        <a href="https://www.dstaritetechnologies.com" style={{ color: BRAND.green, textDecoration: "none" }}>
          dstaritetechnologies.com
        </a>
      </p>
    </main>
  );
}