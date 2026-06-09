"use client";

import { useState, useEffect, useRef } from "react";

// ─── TYPES ───────────────────────────────────────────────────────────────────
interface Track {
  icon: string;
  title: string;
  stack: string;
  outcome: string;
  color: string;
  accent: string;
}

interface FAQ {
  q: string;
  a: string;
}

// ─── REAL CONTACT DETAILS ────────────────────────────────────────────────────
const WA_NUMBER_1 = "2348130062780";
const WA_NUMBER_2 = "2348028184625";
const WA_GROUP = "https://chat.whatsapp.com/G52hmywkfgX6rt3G5Auu6g";
const PHONE_1 = "08130062780";
const PHONE_2 = "08028184625";
const EMAIL = "dstarite@gmail.com";
const WA_DIRECT = `https://wa.me/${WA_NUMBER_1}`;

function buildApplyLink(name = "", phone = "", course = "") {
  const msg = encodeURIComponent(
    `Hello Paschal! 👋\n\nI want to apply for the *Beyond Camp* programme.\n\n` +
      `*Name:* ${name || "[Your Name]"}\n` +
      `*WhatsApp:* ${phone || "[Your Number]"}\n` +
      `*Track:* ${course || "[Course Choice]"}\n\n` +
      `Please reserve a slot for me. Thank you!`,
  );
  return `https://wa.me/${WA_NUMBER_1}?text=${msg}`;
}

// ─── DATA ────────────────────────────────────────────────────────────────────
const TRACKS: Track[] = [
  {
    icon: "🌐",
    title: "Web Development",
    stack: "HTML · CSS · JavaScript · React · Next.js · Laravel",
    outcome: "Build real-world full-stack web applications from scratch.",
    color: "#e8f4ff",
    accent: "#0077cc",
  },
  {
    icon: "📱",
    title: "Mobile App Dev",
    stack: "React Native · Flutter · Firebase",
    outcome: "Ship Android & iOS apps employers and clients actually want.",
    color: "#fff0e8",
    accent: "#cc5500",
  },
  {
    icon: "📊",
    title: "Data Analysis",
    stack: "Excel · SQL · Power BI · Data Visualization",
    outcome: "Turn raw data into insights businesses will pay for.",
    color: "#e8fff2",
    accent: "#007a40",
  },
  {
    icon: "🎨",
    title: "UI/UX Design",
    stack: "Figma · User Research · Prototyping · Design Systems",
    outcome: "Design digital products that feel good and convert well.",
    color: "#f8e8ff",
    accent: "#7700cc",
  },
  {
    icon: "🤖",
    title: "AI & Automation",
    stack: "ChatGPT · Prompt Engineering · n8n · AI Workflows",
    outcome: "Use AI to automate work and create real income opportunities.",
    color: "#fff8e8",
    accent: "#cc8800",
  },
];

const BENEFITS = [
  { icon: "🎥", label: "Live Classes" },
  { icon: "🛠️", label: "Practical Projects" },
  { icon: "🧑‍🏫", label: "1-on-1 Mentorship" },
  { icon: "💼", label: "Portfolio Development" },
  { icon: "🗺️", label: "Career Guidance" },
  { icon: "📜", label: "Certificate" },
  { icon: "💬", label: "Private Community" },
  { icon: "📹", label: "Recorded Sessions" },
];

const FAQS: FAQ[] = [
  {
    q: "Do I need a laptop?",
    a: "Yes. A laptop or PC is required. Classes are fully online so you can attend from any state during or after camp.",
  },
  {
    q: "Do I need prior experience?",
    a: "No. Every track starts from zero. We only assume you are serious and willing to put in the work.",
  },
  {
    q: "Will classes be recorded?",
    a: "Yes. All live sessions are recorded and available for replay so you never fall behind.",
  },
  {
    q: "How long are the daily classes?",
    a: "Classes run Monday to Friday, roughly 2 hours per session, with weekend reviews and project feedback.",
  },
  {
    q: "Will I receive a certificate?",
    a: "Yes. After completing your projects and assessments, you receive a D-Starite Technologies certificate of completion.",
  },
  {
    q: "Is the ₦95,000 price going up?",
    a: "Yes. ₦95,000 is an exclusive NYSC bonanza price for corps members who sign up before slots fill. The standard price is higher.",
  },
  {
    q: "How do I pay?",
    a: "Payment details are shared after you reserve your slot via WhatsApp. We accept bank transfer.",
  },
];

// ─── FADE-IN HOOK ─────────────────────────────────────────────────────────────
function useFadeIn(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

// ─── FADE WRAPPER ─────────────────────────────────────────────────────────────
function FadeIn({
  children,
  delay = 0,
  style = {},
}: {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
}) {
  const { ref, visible } = useFadeIn();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── COUNTER ANIMATION ────────────────────────────────────────────────────────
function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, visible } = useFadeIn(0.5);

  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const duration = 1200;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else setCount(Math.floor(start));
    }, step);
    return () => clearInterval(timer);
  }, [visible, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function BeyondCampPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", course: "" });
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [activeTrack, setActiveTrack] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  function handleSubmit() {
    if (!form.name.trim() || !form.phone.trim() || !form.course) {
      setFormError("Please fill in all fields before continuing.");
      return;
    }
    setFormError("");
    const link = buildApplyLink(
      form.name.trim(),
      form.phone.trim(),
      form.course,
    );
    window.open(link, "_blank");
    setSubmitted(true);
  }

  return (
    <main
      style={{
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
        color: "#111827",
        background: "#fff",
        overflowX: "hidden",
      }}
    >
      {/* ── GLOBAL STYLES (injected via style tag trick) ── */}
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: #c7e4ff; }

        .btn-green {
          background: #16a34a;
          color: #fff;
          padding: 15px 32px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 16px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          border: none;
          transition: background 0.2s, transform 0.15s;
          letter-spacing: -0.01em;
        }
        .btn-green:hover { background: #15803d; transform: translateY(-1px); }
        .btn-green:active { transform: scale(0.98); }

        .btn-blue {
          background: #0077cc;
          color: #fff;
          padding: 15px 32px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 16px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          border: none;
          transition: background 0.2s, transform 0.15s;
          letter-spacing: -0.01em;
        }
        .btn-blue:hover { background: #005fa3; transform: translateY(-1px); }

        .btn-ghost {
          background: rgba(255,255,255,0.12);
          border: 1.5px solid rgba(255,255,255,0.28);
          color: #fff;
          padding: 14px 28px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 16px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
          letter-spacing: -0.01em;
        }
        .btn-ghost:hover { background: rgba(255,255,255,0.2); transform: translateY(-1px); }

        .track-tab {
          padding: 10px 18px;
          border-radius: 8px;
          border: 1.5px solid #e5e7eb;
          background: #fff;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          color: #6b7280;
          white-space: nowrap;
        }
        .track-tab:hover { border-color: #0077cc; color: #0077cc; }
        .track-tab.active { background: #0a1628; border-color: #0a1628; color: #fff; }

        .faq-btn {
          background: none;
          border: none;
          width: 100%;
          text-align: left;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 0;
          font-size: 16px;
          font-weight: 600;
          color: #111827;
          gap: 16px;
        }
        .faq-icon {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #f3f4f6;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          color: #0077cc;
          flex-shrink: 0;
          transition: background 0.2s, transform 0.2s;
        }
        .faq-icon.open { background: #0077cc; color: #fff; transform: rotate(45deg); }

        input, select, textarea {
          width: 100%;
          padding: 13px 16px;
          border: 1.5px solid #e5e7eb;
          border-radius: 10px;
          font-size: 15px;
          font-family: inherit;
          color: #111827;
          background: #fff;
          transition: border-color 0.2s, box-shadow 0.2s;
          outline: none;
        }
        input:focus, select:focus { border-color: #0077cc; box-shadow: 0 0 0 3px rgba(0,119,204,0.12); }
        label { display: block; font-weight: 600; font-size: 14px; margin-bottom: 7px; color: #374151; }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .hero-badge {
          animation: float 4s ease-in-out infinite;
        }

        .pulse-dot::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          border-radius: 50%;
          border: 2px solid #22c55e;
          animation: pulse-ring 1.5s ease-out infinite;
        }

        .shimmer-btn {
          background-size: 200% auto;
          animation: shimmer 2.5s linear infinite;
        }

        .ticker-wrap {
          overflow: hidden;
          white-space: nowrap;
          background: #0a1628;
          padding: 12px 0;
        }
        .ticker-inner {
          display: inline-block;
          animation: ticker 25s linear infinite;
        }

        @media (max-width: 640px) {
          .hero-actions { flex-direction: column; align-items: stretch; }
          .hero-actions a, .hero-actions button { text-align: center; justify-content: center; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .benefits-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .projects-grid { grid-template-columns: 1fr !important; }
          .price-box { padding: 32px 24px !important; }
          .cta-actions { flex-direction: column; align-items: stretch; }
          .cta-actions a { text-align: center; justify-content: center; }
          .track-tabs { padding-bottom: 8px; }
          .two-col { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── STICKY NAV ── */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(10, 22, 40, 0.96)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "60px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                background: "linear-gradient(135deg, #0077cc, #00b4ff)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
              }}
            >
              🚀
            </div>
            <span
              style={{
                color: "#fff",
                fontWeight: 800,
                fontSize: "17px",
                letterSpacing: "-0.02em",
              }}
            >
              Beyond<span style={{ color: "#38bdf8" }}>Camp</span>
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <a
              href="#apply"
              className="btn-green"
              style={{ padding: "9px 20px", fontSize: "14px" }}
            >
              Apply Now
            </a>
          </div>
        </div>
      </nav>

      {/* ── TICKER ── */}
      <div className="ticker-wrap">
        <div className="ticker-inner">
          {[...Array(2)].map((_, i) => (
            <span
              key={i}
              style={{ color: "#94a3b8", fontSize: "13px", fontWeight: 500 }}
            >
              &nbsp;&nbsp;🔥 Limited slots available &nbsp;·&nbsp; 4 Weeks
              Intensive &nbsp;·&nbsp; 100% Online &nbsp;·&nbsp; 5 Career Tracks
              &nbsp;·&nbsp; NYSC Bonanza Price ₦95,000 &nbsp;·&nbsp; Practical
              Portfolio Projects &nbsp;·&nbsp; Certificate of Completion
              &nbsp;·&nbsp; WhatsApp Community &nbsp;·&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ── HERO ── */}
      <section
        style={{
          background:
            "linear-gradient(160deg, #070e1c 0%, #0a1628 45%, #0d2344 100%)",
          color: "#fff",
          padding: "80px 24px 90px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `linear-gradient(rgba(0,119,204,0.06) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0,119,204,0.06) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
            pointerEvents: "none",
          }}
        />

        {/* Glow blobs */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "50%",
            transform: "translateX(-60%)",
            width: "600px",
            height: "400px",
            background:
              "radial-gradient(ellipse, rgba(0,119,204,0.18) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-60px",
            right: "-80px",
            width: "300px",
            height: "300px",
            background:
              "radial-gradient(ellipse, rgba(56,189,248,0.12) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "760px",
            margin: "0 auto",
          }}
        >
          {/* Badge */}
          <div
            className="hero-badge"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "28px",
            }}
          >
            <div
              style={{
                background: "rgba(56,189,248,0.12)",
                border: "1px solid rgba(56,189,248,0.3)",
                borderRadius: "100px",
                padding: "7px 16px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <div
                style={{ position: "relative", width: "8px", height: "8px" }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#22c55e",
                    position: "relative",
                    zIndex: 1,
                  }}
                />
                <div
                  className="pulse-dot"
                  style={{ position: "absolute", inset: 0 }}
                />
              </div>
              <span
                style={{
                  color: "#38bdf8",
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                NYSC Bonanza 2026 · Slots Filling Fast
              </span>
            </div>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: "clamp(48px, 10vw, 88px)",
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              marginBottom: "6px",
            }}
          >
            BEYOND
          </h1>
          <h1
            style={{
              fontSize: "clamp(48px, 10vw, 88px)",
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              marginBottom: "28px",
              background: "linear-gradient(90deg, #38bdf8, #818cf8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            CAMP
          </h1>

          <p
            style={{
              fontSize: "clamp(17px, 2.5vw, 21px)",
              color: "#94a3b8",
              lineHeight: 1.55,
              marginBottom: "40px",
              maxWidth: "560px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Learn a high-income digital skill before NYSC ends.{" "}
            <strong style={{ color: "#e2e8f0" }}>
              4 weeks. Online. Practical. Job-ready.
            </strong>
          </p>

          {/* CTA buttons */}
          <div
            className="hero-actions"
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: "48px",
            }}
          >
            <a
              href="#apply"
              className="btn-blue shimmer-btn"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #0077cc 0%, #0099ff 50%, #0077cc 100%)",
                fontSize: "17px",
                padding: "16px 36px",
              }}
            >
              Reserve My Slot →
            </a>
            <a
              href={WA_GROUP}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Join Free Community
            </a>
          </div>

          {/* Social proof row */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              {["🟢", "🟢", "🟢"].map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    background: `hsl(${200 + i * 30}, 70%, 55%)`,
                    border: "2px solid #0a1628",
                    marginLeft: i > 0 ? "-10px" : "0",
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {["👩🏾‍💻", "👨🏽‍💻", "👩🏿‍💻"][i]}
                </div>
              ))}
            </div>
            <p style={{ fontSize: "14px", color: "#64748b" }}>
              <span style={{ color: "#38bdf8", fontWeight: 700 }}>
                Corps members
              </span>{" "}
              are already registered
            </p>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section
        style={{
          background: "#0a1628",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "40px 24px",
        }}
      >
        <div
          className="stats-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "0",
            maxWidth: "860px",
            margin: "0 auto",
          }}
        >
          {[
            { num: 4, suffix: "", label: "Weeks Intensive" },
            { num: 5, suffix: "", label: "Career Tracks" },
            { num: 100, suffix: "%", label: "Practical Learning" },
            { num: 95, suffix: "K", label: "Bonanza Price ₦" },
          ].map((s, i) => (
            <div
              key={s.label}
              style={{
                textAlign: "center",
                padding: "20px 16px",
                borderRight:
                  i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none",
              }}
            >
              <div
                style={{
                  fontSize: "clamp(30px, 5vw, 44px)",
                  fontWeight: 900,
                  color: "#fff",
                  lineHeight: 1,
                }}
              >
                {s.suffix === "K" ? "₦" : ""}
                <CountUp target={s.num} suffix={s.suffix} />
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: "#64748b",
                  fontWeight: 500,
                  marginTop: "4px",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── REALITY CHECK ── */}
      <section
        style={{ padding: "96px 24px", maxWidth: "740px", margin: "0 auto" }}
      >
        <FadeIn>
          <div
            style={{
              display: "inline-block",
              background: "#fef3c7",
              border: "1px solid #fcd34d",
              borderRadius: "8px",
              padding: "5px 14px",
              fontSize: "13px",
              fontWeight: 700,
              color: "#92400e",
              marginBottom: "20px",
              textTransform: "uppercase",
              letterSpacing: "0.07em",
            }}
          >
            The Real Question
          </div>
          <h2
            style={{
              fontSize: "clamp(28px, 4.5vw, 42px)",
              fontWeight: 900,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              marginBottom: "24px",
              color: "#111827",
            }}
          >
            What will you have
            <br />
            when NYSC ends?
          </h2>
          <p
            style={{
              fontSize: "17px",
              color: "#4b5563",
              lineHeight: 1.8,
              marginBottom: "16px",
            }}
          >
            Most corps members leave with only a certificate.{" "}
            <strong>Beyond Camp</strong> is a 4-week intensive designed so you
            leave with a practical digital skill, real portfolio projects, and a
            clear path to freelance work, remote jobs, or tech employment —{" "}
            <strong>before your service year even ends.</strong>
          </p>

          {/* Feature checklist */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              margin: "32px 0 36px",
            }}
          >
            {[
              "Build something real, not just tutorials",
              "Learn from a developer who has shipped actual products",
              "Get a portfolio you can show employers and clients",
              "Join a community of serious, like-minded corps members",
            ].map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    width: "22px",
                    height: "22px",
                    borderRadius: "50%",
                    background: "#dcfce7",
                    flexShrink: 0,
                    marginTop: "1px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                  }}
                >
                  ✅
                </div>
                <p
                  style={{
                    fontSize: "16px",
                    color: "#1f2937",
                    lineHeight: 1.5,
                  }}
                >
                  {item}
                </p>
              </div>
            ))}
          </div>

          <a href="#apply" className="btn-blue" style={{ fontSize: "16px" }}>
            I Want This →
          </a>
        </FadeIn>
      </section>

      {/* ── TRACKS ── */}
      <section style={{ background: "#f8fafc", padding: "96px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <FadeIn style={{ textAlign: "center", marginBottom: "48px" }}>
            <div
              style={{
                display: "inline-block",
                background: "#dbeafe",
                border: "1px solid #93c5fd",
                borderRadius: "8px",
                padding: "5px 14px",
                fontSize: "13px",
                fontWeight: 700,
                color: "#1d4ed8",
                marginBottom: "16px",
                textTransform: "uppercase",
                letterSpacing: "0.07em",
              }}
            >
              Choose Your Path
            </div>
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 40px)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
              }}
            >
              5 Career Tracks
            </h2>
          </FadeIn>

          {/* Tab selector */}
          <div
            className="track-tabs"
            style={{
              display: "flex",
              gap: "8px",
              overflowX: "auto",
              paddingBottom: "4px",
              marginBottom: "28px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {TRACKS.map((t, i) => (
              <button
                key={t.title}
                className={`track-tab${activeTrack === i ? " active" : ""}`}
                onClick={() => setActiveTrack(i)}
              >
                {t.icon} {t.title}
              </button>
            ))}
          </div>

          {/* Active track card */}
          <FadeIn key={activeTrack}>
            <div
              style={{
                background: "#fff",
                borderRadius: "20px",
                border: "1px solid #e5e7eb",
                overflow: "hidden",
                boxShadow: "0 8px 40px rgba(0,0,0,0.06)",
              }}
            >
              <div
                style={{
                  background: TRACKS[activeTrack].color,
                  padding: "40px 40px 32px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    fontSize: "64px",
                    marginBottom: "16px",
                    lineHeight: 1,
                  }}
                >
                  {TRACKS[activeTrack].icon}
                </div>
                <h3
                  style={{
                    fontSize: "28px",
                    fontWeight: 900,
                    letterSpacing: "-0.02em",
                    color: "#111827",
                    marginBottom: "8px",
                  }}
                >
                  {TRACKS[activeTrack].title}
                </h3>
                <p
                  style={{
                    fontSize: "15px",
                    color: TRACKS[activeTrack].accent,
                    fontWeight: 700,
                    marginBottom: "16px",
                  }}
                >
                  {TRACKS[activeTrack].stack}
                </p>
                <p
                  style={{
                    fontSize: "18px",
                    color: "#1f2937",
                    fontWeight: 500,
                    lineHeight: 1.5,
                    maxWidth: "600px",
                  }}
                >
                  {TRACKS[activeTrack].outcome}
                </p>
              </div>
              <div
                style={{
                  padding: "28px 40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "16px",
                }}
              >
                <p style={{ fontSize: "14px", color: "#6b7280" }}>
                  Starts during or right after NYSC camp · Online · Certificate
                  included
                </p>
                <a
                  href="#apply"
                  className="btn-blue"
                  style={{ fontSize: "15px", padding: "12px 24px" }}
                >
                  Apply for this track →
                </a>
              </div>
            </div>
          </FadeIn>

          {/* All tracks quick grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "12px",
              marginTop: "20px",
            }}
          >
            {TRACKS.map((t, i) => (
              <button
                key={t.title}
                onClick={() => setActiveTrack(i)}
                style={{
                  background: activeTrack === i ? "#0a1628" : "#fff",
                  border: `1.5px solid ${activeTrack === i ? "#0a1628" : "#e5e7eb"}`,
                  borderRadius: "12px",
                  padding: "16px",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.2s",
                }}
              >
                <div style={{ fontSize: "24px", marginBottom: "8px" }}>
                  {t.icon}
                </div>
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: activeTrack === i ? "#fff" : "#111827",
                    lineHeight: 1.3,
                  }}
                >
                  {t.title}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section
        style={{ padding: "96px 24px", maxWidth: "1000px", margin: "0 auto" }}
      >
        <FadeIn style={{ textAlign: "center", marginBottom: "56px" }}>
          <div
            style={{
              display: "inline-block",
              background: "#f0fdf4",
              border: "1px solid #86efac",
              borderRadius: "8px",
              padding: "5px 14px",
              fontSize: "13px",
              fontWeight: 700,
              color: "#166534",
              marginBottom: "16px",
              textTransform: "uppercase",
              letterSpacing: "0.07em",
            }}
          >
            What's Included
          </div>
          <h2
            style={{
              fontSize: "clamp(26px, 4vw, 38px)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
            }}
          >
            Everything in one price
          </h2>
        </FadeIn>
        <div
          className="benefits-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "16px",
          }}
        >
          {BENEFITS.map((b, i) => (
            <FadeIn key={b.label} delay={i * 0.06}>
              <div
                style={{
                  background: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "14px",
                  padding: "24px 20px",
                  textAlign: "center",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    "#0077cc";
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 4px 24px rgba(0,119,204,0.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    "#e5e7eb";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                <div style={{ fontSize: "32px", marginBottom: "10px" }}>
                  {b.icon}
                </div>
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#374151",
                  }}
                >
                  {b.label}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── INSTRUCTOR ── */}
      <section style={{ background: "#0a1628", padding: "96px 24px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div
            className="two-col"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "64px",
              alignItems: "center",
            }}
          >
            <FadeIn>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: "140px",
                    height: "140px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #0077cc, #38bdf8)",
                    margin: "0 auto 20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "64px",
                    boxShadow:
                      "0 0 0 6px rgba(56,189,248,0.15), 0 0 0 12px rgba(56,189,248,0.08)",
                  }}
                >
                  👨‍💻
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <a
                    href={`tel:${PHONE_1}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "10px",
                      padding: "12px",
                      color: "#94a3b8",
                      fontSize: "14px",
                      textDecoration: "none",
                      fontWeight: 600,
                      transition: "background 0.2s",
                    }}
                  >
                    📞 {PHONE_1}
                  </a>
                  <a
                    href={`tel:${PHONE_2}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "10px",
                      padding: "12px",
                      color: "#94a3b8",
                      fontSize: "14px",
                      textDecoration: "none",
                      fontWeight: 600,
                    }}
                  >
                    📞 {PHONE_2}
                  </a>
                  <a
                    href={`mailto:${EMAIL}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "10px",
                      padding: "12px",
                      color: "#94a3b8",
                      fontSize: "13px",
                      textDecoration: "none",
                      fontWeight: 600,
                    }}
                  >
                    ✉️ {EMAIL}
                  </a>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#38bdf8",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "12px",
                }}
              >
                Your Instructor
              </p>
              <h2
                style={{
                  fontSize: "clamp(24px, 3vw, 34px)",
                  fontWeight: 900,
                  color: "#fff",
                  letterSpacing: "-0.02em",
                  marginBottom: "6px",
                }}
              >
                Paschal Nwokeocha
              </h2>
              <p
                style={{
                  color: "#38bdf8",
                  fontWeight: 600,
                  marginBottom: "20px",
                  fontSize: "15px",
                }}
              >
                Software Developer · Tech Consultant
                <br />
                Founder, D-Starite Technologies
              </p>
              <p
                style={{
                  color: "#94a3b8",
                  lineHeight: 1.8,
                  fontSize: "15px",
                  marginBottom: "28px",
                }}
              >
                I have built real software products — from HRMS systems to
                inventory platforms to client websites — and have trained
                aspiring developers into practitioners. I don't just teach
                theory. I teach from actual projects I have shipped.
              </p>
              <div style={{ display: "flex", gap: "12px" }}>
                <a
                  href="#apply"
                  className="btn-blue"
                  style={{ fontSize: "14px", padding: "11px 20px" }}
                >
                  Apply Now
                </a>
                <a
                  href="https://ng.linkedin.com/in/starttechnology"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "#38bdf8",
                    fontSize: "14px",
                    fontWeight: 600,
                    textDecoration: "none",
                    background: "rgba(56,189,248,0.1)",
                    border: "1px solid rgba(56,189,248,0.25)",
                    borderRadius: "10px",
                    padding: "11px 20px",
                  }}
                >
                  LinkedIn →
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section style={{ background: "#f8fafc", padding: "96px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <FadeIn style={{ textAlign: "center", marginBottom: "56px" }}>
            <div
              style={{
                display: "inline-block",
                background: "#fef3c7",
                border: "1px solid #fcd34d",
                borderRadius: "8px",
                padding: "5px 14px",
                fontSize: "13px",
                fontWeight: 700,
                color: "#92400e",
                marginBottom: "16px",
                textTransform: "uppercase",
                letterSpacing: "0.07em",
              }}
            >
              Real Work. Real Products.
            </div>
            <h2
              style={{
                fontSize: "clamp(26px, 4vw, 38px)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                marginBottom: "12px",
              }}
            >
              Projects I've Contributed To
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: "#6b7280",
                maxWidth: "480px",
                margin: "0 auto",
                lineHeight: 1.6,
              }}
            >
              Your instructor doesn't just teach — he ships. Here are live
              products.
            </p>
          </FadeIn>

          <div
            className="projects-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "24px",
            }}
          >
            {/* OneUniverse */}
            <FadeIn delay={0}>
              <div
                style={{
                  background: "#fff",
                  borderRadius: "20px",
                  border: "1px solid #e5e7eb",
                  overflow: "hidden",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    background: "#0a1628",
                    padding: "20px",
                    overflowX: "auto",
                    display: "flex",
                    gap: "8px",
                  }}
                >
                  {[
                    "https://play-lh.googleusercontent.com/5MdC9VfHhtQz0RK43vdu31jkx5WfWpbFLqm_uIQ1OAV_v5R24swsEydEAmfwCIIGotXF5SoDmAWObgbgiYVK=w200-h400",
                    "https://play-lh.googleusercontent.com/-aUMVwWoUN7pRfU-AOay8A-ulbt2rDb6TRtYvItIZ649X7J0JWX-lIV2ElGvJBTyUKEuAwCrUiTAOMmzpg5A=w200-h400",
                  ].map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt=""
                      style={{
                        height: "160px",
                        width: "auto",
                        borderRadius: "8px",
                        flexShrink: 0,
                      }}
                    />
                  ))}
                </div>
                <div
                  style={{
                    padding: "20px 24px",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "10px",
                      flexWrap: "wrap",
                    }}
                  >
                    <h3
                      style={{
                        fontWeight: 800,
                        fontSize: "17px",
                        color: "#111827",
                      }}
                    >
                      OneUniverse
                    </h3>
                    <span
                      style={{
                        background: "#dcfce7",
                        color: "#166534",
                        fontSize: "11px",
                        fontWeight: 700,
                        padding: "3px 8px",
                        borderRadius: "100px",
                      }}
                    >
                      LIVE
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#6b7280",
                      lineHeight: 1.6,
                      flex: 1,
                      marginBottom: "14px",
                    }}
                  >
                    Secure digital marketplace with BVN/NIN verification, bank
                    loan integration, and real-time geo-matching.
                  </p>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.oneuniverse.oneuniverse"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: "13px",
                      color: "#0077cc",
                      fontWeight: 700,
                      textDecoration: "none",
                    }}
                  >
                    View on Google Play →
                  </a>
                </div>
              </div>
            </FadeIn>

            {/* ICAN Surulere */}
            <FadeIn delay={0.1}>
              <div
                style={{
                  background: "#fff",
                  borderRadius: "20px",
                  border: "1px solid #e5e7eb",
                  overflow: "hidden",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    background: "linear-gradient(135deg, #1e3a5f, #0d2344)",
                    padding: "40px 24px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "12px",
                      padding: "20px",
                      display: "inline-block",
                    }}
                  >
                    <p
                      style={{
                        color: "#38bdf8",
                        fontWeight: 900,
                        fontSize: "24px",
                        margin: 0,
                      }}
                    >
                      ICAN
                    </p>
                    <p
                      style={{
                        color: "#94a3b8",
                        fontSize: "12px",
                        margin: "4px 0 0",
                      }}
                    >
                      Surulere District Society
                    </p>
                  </div>
                  <p
                    style={{
                      color: "#64748b",
                      fontSize: "12px",
                      marginTop: "10px",
                    }}
                  >
                    icansuruleredistrict.org
                  </p>
                </div>
                <div
                  style={{
                    padding: "20px 24px",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "10px",
                      flexWrap: "wrap",
                    }}
                  >
                    <h3
                      style={{
                        fontWeight: 800,
                        fontSize: "17px",
                        color: "#111827",
                      }}
                    >
                      ICAN Surulere
                    </h3>
                    <span
                      style={{
                        background: "#dbeafe",
                        color: "#1d4ed8",
                        fontSize: "11px",
                        fontWeight: 700,
                        padding: "3px 8px",
                        borderRadius: "100px",
                      }}
                    >
                      LIVE
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#6b7280",
                      lineHeight: 1.6,
                      flex: 1,
                      marginBottom: "14px",
                    }}
                  >
                    Full web platform for ICAN Surulere chapter. Member login,
                    events, gallery, and backend systems built with Next.js.
                  </p>
                  <a
                    href="https://www.icansuruleredistrict.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: "13px",
                      color: "#0077cc",
                      fontWeight: 700,
                      textDecoration: "none",
                    }}
                  >
                    Visit Website →
                  </a>
                </div>
              </div>
            </FadeIn>

            {/* FounderThrive */}
            <FadeIn delay={0.2}>
              <div
                style={{
                  background: "#fff",
                  borderRadius: "20px",
                  border: "1px solid #e5e7eb",
                  overflow: "hidden",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    background: "linear-gradient(135deg, #052e16, #14532d)",
                    padding: "40px 24px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      background: "rgba(255,255,255,0.07)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: "12px",
                      padding: "18px 24px",
                      display: "inline-block",
                      minWidth: "160px",
                    }}
                  >
                    <p
                      style={{
                        color: "#4ade80",
                        fontWeight: 900,
                        fontSize: "22px",
                        margin: 0,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      Founder Thrive
                    </p>
                    <p
                      style={{
                        color: "#86efac",
                        fontSize: "11px",
                        margin: "4px 0 0",
                      }}
                    >
                      by The Weave
                    </p>
                  </div>
                  <p
                    style={{
                      color: "#4ade80",
                      fontSize: "11px",
                      marginTop: "10px",
                      fontWeight: 600,
                    }}
                  >
                    📱 Google Play Store
                  </p>
                </div>
                <div
                  style={{
                    padding: "20px 24px",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "10px",
                      flexWrap: "wrap",
                    }}
                  >
                    <h3
                      style={{
                        fontWeight: 800,
                        fontSize: "17px",
                        color: "#111827",
                      }}
                    >
                      Founder Thrive
                    </h3>
                    <span
                      style={{
                        background: "#dcfce7",
                        color: "#166534",
                        fontSize: "11px",
                        fontWeight: 700,
                        padding: "3px 8px",
                        borderRadius: "100px",
                      }}
                    >
                      LIVE
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#6b7280",
                      lineHeight: 1.6,
                      flex: 1,
                      marginBottom: "14px",
                    }}
                  >
                    Lifestyle app combating burnout in startup founders.
                    Wellness tools, mind-body routines, and wellbeing journeys.
                  </p>
                  <div
                    style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}
                  >
                    <a
                      href="https://www.founderthrive.net"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: "13px",
                        color: "#0077cc",
                        fontWeight: 700,
                        textDecoration: "none",
                      }}
                    >
                      Platform →
                    </a>
                    <a
                      href="https://play.google.com/store/search?q=founder+thrive+the+weave&c=apps"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: "13px",
                        color: "#166534",
                        fontWeight: 700,
                        textDecoration: "none",
                      }}
                    >
                      Play Store →
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section
        style={{
          padding: "96px 24px",
          textAlign: "center",
          background: "#fff",
        }}
      >
        <FadeIn>
          <div
            style={{
              display: "inline-block",
              background: "#f0fdf4",
              border: "1px solid #86efac",
              borderRadius: "8px",
              padding: "5px 14px",
              fontSize: "13px",
              fontWeight: 700,
              color: "#166534",
              marginBottom: "16px",
              textTransform: "uppercase",
              letterSpacing: "0.07em",
            }}
          >
            Investment
          </div>
          <h2
            style={{
              fontSize: "clamp(26px, 4vw, 38px)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              marginBottom: "48px",
            }}
          >
            One Price. Everything Included.
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div
            className="price-box"
            style={{
              display: "inline-block",
              background: "#fff",
              border: "2px solid #0077cc",
              borderRadius: "24px",
              padding: "48px 56px",
              boxShadow: "0 20px 60px rgba(0,119,204,0.12)",
              maxWidth: "460px",
              width: "100%",
              position: "relative",
            }}
          >
            {/* Popular badge */}
            <div
              style={{
                position: "absolute",
                top: "-16px",
                left: "50%",
                transform: "translateX(-50%)",
                background: "#0077cc",
                color: "#fff",
                padding: "6px 20px",
                borderRadius: "100px",
                fontSize: "13px",
                fontWeight: 700,
                whiteSpace: "nowrap",
              }}
            >
              🔥 NYSC Bonanza Price
            </div>

            <p
              style={{
                fontSize: "clamp(52px, 10vw, 68px)",
                fontWeight: 900,
                color: "#0a1628",
                lineHeight: 1,
                marginBottom: "6px",
              }}
            >
              ₦95,000
            </p>
            <p
              style={{
                color: "#6b7280",
                fontSize: "14px",
                marginBottom: "32px",
              }}
            >
              One-time payment. No hidden fees.
            </p>

            <ul
              style={{
                textAlign: "left",
                listStyle: "none",
                padding: 0,
                marginBottom: "32px",
              }}
            >
              {BENEFITS.map((b) => (
                <li
                  key={b.label}
                  style={{
                    padding: "10px 0",
                    borderBottom: "1px solid #f3f4f6",
                    fontSize: "15px",
                    color: "#374151",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <span style={{ color: "#16a34a", fontWeight: 700 }}>✓</span>
                  {b.icon} {b.label}
                </li>
              ))}
            </ul>

            <a
              href="#apply"
              style={{
                display: "block",
                background: "linear-gradient(135deg, #0077cc, #0099ff)",
                color: "#fff",
                padding: "16px",
                borderRadius: "12px",
                fontWeight: 700,
                fontSize: "17px",
                textDecoration: "none",
                textAlign: "center",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.9")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")
              }
            >
              Reserve My Slot →
            </a>
            <p
              style={{ marginTop: "14px", fontSize: "12px", color: "#9ca3af" }}
            >
              ⚠️ Price increases after NYSC camp closes. Limited slots.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: "#f8fafc", padding: "96px 24px" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <FadeIn style={{ textAlign: "center", marginBottom: "56px" }}>
            <div
              style={{
                display: "inline-block",
                background: "#f3e8ff",
                border: "1px solid #d8b4fe",
                borderRadius: "8px",
                padding: "5px 14px",
                fontSize: "13px",
                fontWeight: 700,
                color: "#6b21a8",
                marginBottom: "16px",
                textTransform: "uppercase",
                letterSpacing: "0.07em",
              }}
            >
              FAQ
            </div>
            <h2
              style={{
                fontSize: "clamp(26px, 4vw, 36px)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
              }}
            >
              Common Questions
            </h2>
          </FadeIn>

          <div
            style={{
              background: "#fff",
              borderRadius: "20px",
              border: "1px solid #e5e7eb",
              overflow: "hidden",
            }}
          >
            {FAQS.map((faq, i) => (
              <div
                key={i}
                style={{
                  borderBottom:
                    i < FAQS.length - 1 ? "1px solid #f3f4f6" : "none",
                }}
              >
                <button
                  className="faq-btn"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ padding: "20px 24px" }}
                >
                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "#111827",
                      lineHeight: 1.4,
                    }}
                  >
                    {faq.q}
                  </span>
                  <div className={`faq-icon${openFaq === i ? " open" : ""}`}>
                    +
                  </div>
                </button>
                {openFaq === i && (
                  <div style={{ padding: "0 24px 20px", animation: "none" }}>
                    <p
                      style={{
                        color: "#4b5563",
                        lineHeight: 1.8,
                        fontSize: "15px",
                      }}
                    >
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APPLY FORM ── */}
      <section
        id="apply"
        style={{
          padding: "96px 24px",
          textAlign: "center",
          background: "#fff",
        }}
      >
        <FadeIn style={{ maxWidth: "560px", margin: "0 auto" }}>
          <div
            style={{
              display: "inline-block",
              background: "#dcfce7",
              border: "1px solid #86efac",
              borderRadius: "8px",
              padding: "5px 14px",
              fontSize: "13px",
              fontWeight: 700,
              color: "#166534",
              marginBottom: "16px",
              textTransform: "uppercase",
              letterSpacing: "0.07em",
            }}
          >
            Apply Now
          </div>
          <h2
            style={{
              fontSize: "clamp(28px, 5vw, 44px)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              marginBottom: "12px",
              lineHeight: 1.1,
            }}
          >
            Don't let NYSC end
            <br />
            without a skill.
          </h2>
          <p
            style={{
              color: "#6b7280",
              fontSize: "16px",
              marginBottom: "40px",
              lineHeight: 1.6,
            }}
          >
            Fill in your details — it opens WhatsApp with your info pre-filled
            so we can confirm your slot instantly.
          </p>
        </FadeIn>

        {submitted ? (
          <FadeIn>
            <div
              style={{
                maxWidth: "440px",
                margin: "0 auto",
                background: "#f0fdf4",
                border: "1.5px solid #86efac",
                borderRadius: "20px",
                padding: "40px 32px",
              }}
            >
              <div style={{ fontSize: "48px", marginBottom: "12px" }}>✅</div>
              <p
                style={{
                  fontSize: "22px",
                  fontWeight: 800,
                  color: "#166534",
                  marginBottom: "8px",
                }}
              >
                WhatsApp opened!
              </p>
              <p
                style={{
                  fontSize: "15px",
                  color: "#4b5563",
                  marginBottom: "24px",
                  lineHeight: 1.6,
                }}
              >
                Your details are pre-filled in the message. Just hit{" "}
                <strong>Send</strong> and Paschal will confirm your slot.
              </p>
              <a
                href={WA_GROUP}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-green"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  fontSize: "16px",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Join Free WhatsApp Community
              </a>
            </div>
          </FadeIn>
        ) : (
          <FadeIn delay={0.1}>
            <div
              style={{
                maxWidth: "460px",
                margin: "0 auto",
                background: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "20px",
                padding: "40px 36px",
                boxShadow: "0 8px 48px rgba(0,0,0,0.07)",
                textAlign: "left",
              }}
            >
              <div style={{ marginBottom: "18px" }}>
                <label>Full Name *</label>
                <input
                  type="text"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div style={{ marginBottom: "18px" }}>
                <label>WhatsApp Number *</label>
                <input
                  type="tel"
                  placeholder="e.g. 08012345678"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
              <div style={{ marginBottom: "24px" }}>
                <label>Choose Your Track *</label>
                <select
                  value={form.course}
                  onChange={(e) => setForm({ ...form, course: e.target.value })}
                >
                  <option value="">Select a track...</option>
                  {TRACKS.map((t) => (
                    <option key={t.title} value={t.title}>
                      {t.icon} {t.title}
                    </option>
                  ))}
                </select>
              </div>

              {formError && (
                <div
                  style={{
                    background: "#fef2f2",
                    border: "1px solid #fecaca",
                    borderRadius: "10px",
                    padding: "12px 16px",
                    fontSize: "14px",
                    color: "#dc2626",
                    fontWeight: 600,
                    marginBottom: "16px",
                  }}
                >
                  ⚠️ {formError}
                </div>
              )}

              <button
                onClick={handleSubmit}
                className="btn-green"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  fontSize: "17px",
                  padding: "16px",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Reserve My Slot on WhatsApp
              </button>

              <p
                style={{
                  textAlign: "center",
                  marginTop: "16px",
                  fontSize: "13px",
                  color: "#9ca3af",
                }}
              >
                Prefer to message directly?{" "}
                <a
                  href={WA_DIRECT}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#16a34a",
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  Chat on WhatsApp
                </a>{" "}
                or call{" "}
                <a
                  href={`tel:${PHONE_1}`}
                  style={{
                    color: "#0077cc",
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  {PHONE_1}
                </a>
              </p>

              <div
                style={{
                  marginTop: "20px",
                  padding: "16px",
                  background: "#f0fdf4",
                  border: "1px solid #bbf7d0",
                  borderRadius: "12px",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontSize: "13px",
                    color: "#166534",
                    marginBottom: "10px",
                    fontWeight: 600,
                  }}
                >
                  💬 Not ready to pay yet? Join the free community first.
                </p>
                <a
                  href={WA_GROUP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-green"
                  style={{ fontSize: "14px", padding: "10px 20px" }}
                >
                  Join WhatsApp Community →
                </a>
              </div>
            </div>
          </FadeIn>
        )}
      </section>

      {/* ── FINAL CTA ── */}
      <section
        style={{
          background: "linear-gradient(160deg, #070e1c 0%, #0a1628 100%)",
          color: "#fff",
          padding: "96px 24px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "400px",
            background:
              "radial-gradient(ellipse, rgba(56,189,248,0.1) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "640px",
            margin: "0 auto",
          }}
        >
          <FadeIn>
            <p style={{ fontSize: "40px", marginBottom: "16px" }}>🇳🇬</p>
            <h2
              style={{
                fontSize: "clamp(30px, 5vw, 52px)",
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                marginBottom: "16px",
              }}
            >
              One year of service.
              <br />
              <span
                style={{
                  background: "linear-gradient(90deg, #38bdf8, #818cf8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                One skill that lasts a lifetime.
              </span>
            </h2>
            <p
              style={{
                color: "#64748b",
                fontSize: "17px",
                marginBottom: "40px",
                lineHeight: 1.6,
              }}
            >
              Join the Beyond Camp community and start your journey today.
            </p>

            <div
              className="cta-actions"
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "center",
                flexWrap: "wrap",
                marginBottom: "40px",
              }}
            >
              <a
                href="#apply"
                className="btn-blue"
                style={{ fontSize: "17px", padding: "16px 40px" }}
              >
                Apply Now →
              </a>
              <a
                href={WA_GROUP}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Join Free Community
              </a>
            </div>

            <div
              style={{
                display: "flex",
                gap: "20px",
                justifyContent: "center",
                flexWrap: "wrap",
                marginBottom: "32px",
              }}
            >
              <a
                href={`tel:${PHONE_1}`}
                style={{
                  color: "#38bdf8",
                  fontSize: "14px",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                📞 {PHONE_1}
              </a>
              <a
                href={`tel:${PHONE_2}`}
                style={{
                  color: "#38bdf8",
                  fontSize: "14px",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                📞 {PHONE_2}
              </a>
              <a
                href={`mailto:${EMAIL}`}
                style={{
                  color: "#38bdf8",
                  fontSize: "14px",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                ✉️ {EMAIL}
              </a>
            </div>

            <p style={{ fontSize: "13px", color: "#334155" }}>
              © {new Date().getFullYear()} D-Starite Technologies ·{" "}
              <a
                href="https://www.dstaritetechnologies.com"
                style={{ color: "#334155", textDecoration: "none" }}
              >
                dstaritetechnologies.com
              </a>
            </p>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
