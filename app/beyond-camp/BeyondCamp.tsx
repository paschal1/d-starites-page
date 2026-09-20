'use client'

/**
 * Beyond Camp landing page.
 *
 * - Prices live in PROGRAMMES / BUNDLES below (same numbers as the pricing PDF).
 * - Student / NYSC discounted rates apply to Online classes on the programmes that have a `studentOnline` price.
 * - "Register Now" opens WhatsApp with the learner's details pre-filled.
 * - "Pay Now" opens Paystack, saves the payment to /api/payment/verify, then sends the learner to WhatsApp.
 */
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
// import PaystackPop from '@paystack/inline-js'

// ─────────────────────────────────────────────────────────────────────────────
// Configuration
// ─────────────────────────────────────────────────────────────────────────────
const WA_NUMBER = '2348130062780'
const WA_GROUP = 'https://chat.whatsapp.com/G52hmywkfgX6rt3G5Auu6g'
const PHONE_1 = '08130062780'
const PHONE_2 = '08028184625'
const EMAIL = 'info@dstariteitsolutions.online'
const PAYSTACK_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY ?? 'pk_live_7fa94265109b3b80e76e7ab6b402e5160f5a35aa'
const PRICING_PDF = '/beyond-camp-pricing-guide.pdf'
const PRICING_PDF_NAME = 'Beyond-Camp-Pricing-Guide.pdf'
const TERMS_HREF = '/beyond-camp/terms'

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
type Fmt = 'online' | 'offline' | 'hybrid'
type Category = 'student' | 'nysc' | 'graduate' | 'professional'

type Item = {
  id: string
  name: string
  duration: string
  prices: Record<Fmt, number>
  /** Discounted online rate for eligible students and NYSC members, if the programme has one. */
  studentOnline: number | null
}
type Programme = Item & { group: string; audience: string; topics: string[]; final: string; outcome: string }
type Bundle = Item

type Status =
  | { kind: 'idle' }
  | { kind: 'whatsapp' }
  | { kind: 'paid'; reference: string; link: string }

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────
const PROGRAMMES: Programme[] = [
  {
    "id": "web-fundamentals",
    "name": "Web Fundamentals",
    "group": "Web development",
    "duration": "6 weeks",
    "prices": {
      "online": 35000,
      "offline": 50000,
      "hybrid": 60000
    },
    "studentOnline": null,
    "audience": "Best for complete beginners.",
    "topics": [
      "Computer and internet fundamentals for web development",
      "HTML and semantic page structure",
      "CSS and responsive design",
      "Basic JavaScript",
      "Git and GitHub fundamentals",
      "Building and deploying a simple website",
      "How websites, domains and hosting work"
    ],
    "final": "A practical mini-project.",
    "outcome": "Create and publish a simple responsive website, and understand the foundations needed for further development."
  },
  {
    "id": "frontend-development",
    "name": "Frontend Development",
    "group": "Web development",
    "duration": "12 weeks",
    "prices": {
      "online": 75000,
      "offline": 110000,
      "hybrid": 125000
    },
    "studentOnline": 60000,
    "audience": "For learners who want to become professional frontend developers.",
    "topics": [
      "HTML, CSS, responsive layouts and modern styling",
      "JavaScript fundamentals and the DOM",
      "Working with APIs",
      "React and Next.js fundamentals",
      "Reusable components, forms and frontend validation",
      "Git and GitHub",
      "Deployment and basic production practices"
    ],
    "final": "Build and deploy a complete responsive web application.",
    "outcome": "A practical GitHub portfolio, a deployed project and a foundation for professional frontend work."
  },
  {
    "id": "backend-development",
    "name": "Backend Development",
    "group": "Web development",
    "duration": "12 weeks",
    "prices": {
      "online": 85000,
      "offline": 120000,
      "hybrid": 140000
    },
    "studentOnline": 65000,
    "audience": "For learners who want to build APIs and server applications.",
    "topics": [
      "Backend fundamentals",
      "Node.js and NestJS concepts",
      "REST APIs",
      "Databases and data modelling",
      "Authentication and authorization",
      "API validation and error handling",
      "Working with external services",
      "Deployment fundamentals"
    ],
    "final": "Build a functional backend API with database integration and authentication.",
    "outcome": "A production-style backend project you can show, built with authentication and a real database."
  },
  {
    "id": "full-stack-development",
    "name": "Full-Stack Development",
    "group": "Web development",
    "duration": "16 weeks",
    "prices": {
      "online": 140000,
      "offline": 190000,
      "hybrid": 220000
    },
    "studentOnline": null,
    "audience": "For learners who want to combine frontend and backend development.",
    "topics": [
      "Frontend development with React and Next.js",
      "Backend APIs and databases",
      "Authentication and API integration",
      "Git and GitHub",
      "Deployment",
      "Project architecture and development workflow"
    ],
    "final": "Build and deploy a complete full-stack application.",
    "outcome": "A full-stack capstone project that shows you can take an application from idea to deployment."
  },
  {
    "id": "ai-automation",
    "name": "AI Automation",
    "group": "AI and automation",
    "duration": "8 weeks",
    "prices": {
      "online": 85000,
      "offline": 120000,
      "hybrid": 140000
    },
    "studentOnline": 65000,
    "audience": "For anyone who wants to use AI to save time and improve how work gets done.",
    "topics": [
      "AI fundamentals and prompt engineering",
      "Using modern AI assistants effectively",
      "Automation concepts with Make, n8n and similar tools",
      "Webhooks and API basics",
      "Connecting forms, spreadsheets, email and AI",
      "WhatsApp and customer-support automation concepts",
      "AI-assisted business processes"
    ],
    "final": "Build practical automations, such as lead capture into a spreadsheet, AI processing and a notification, plus an AI-assisted business workflow.",
    "outcome": "Identify repetitive tasks and turn them into useful AI-powered workflows."
  },
  {
    "id": "data-analysis",
    "name": "Data Analysis",
    "group": "Data",
    "duration": "12 weeks",
    "prices": {
      "online": 90000,
      "offline": 125000,
      "hybrid": 145000
    },
    "studentOnline": 70000,
    "audience": "For people who enjoy working with numbers and information.",
    "topics": [
      "Understanding data and business questions",
      "Microsoft Excel: cleaning, formulas, pivot tables and charts",
      "SQL fundamentals and querying relational data",
      "Power BI dashboards and data visualization",
      "Introduction to Python and Pandas where applicable",
      "Interpreting and presenting findings"
    ],
    "final": "Create practical dashboards and analyse real-world datasets.",
    "outcome": "A portfolio of analysis work that demonstrates practical data skills."
  },
  {
    "id": "ui-ux-design",
    "name": "UI/UX Design",
    "group": "Design",
    "duration": "8 weeks",
    "prices": {
      "online": 70000,
      "offline": 100000,
      "hybrid": 120000
    },
    "studentOnline": 55000,
    "audience": "For people who enjoy design and creativity.",
    "topics": [
      "UI/UX fundamentals and understanding users",
      "User research basics, information architecture and user flows",
      "Wireframing and Figma",
      "High-fidelity design for web and mobile",
      "Interactive prototypes and design systems",
      "Usability and design critique",
      "Case-study and portfolio preparation"
    ],
    "final": "Design a complete digital product from user problem to interactive prototype.",
    "outcome": "A practical UI/UX portfolio case study, and the ability to communicate designs to clients and developers."
  },
  {
    "id": "mobile-development",
    "name": "Mobile Development",
    "group": "Mobile",
    "duration": "12 weeks",
    "prices": {
      "online": 100000,
      "offline": 140000,
      "hybrid": 160000
    },
    "studentOnline": 75000,
    "audience": "For learners who want to build Android and iOS apps, starting with a cross-platform approach such as Flutter.",
    "topics": [
      "Programming and Dart fundamentals",
      "Flutter environment, layouts and navigation",
      "Forms, validation and API integration",
      "Authentication and state management fundamentals",
      "Firebase and backend integration",
      "Local storage, testing and debugging",
      "Application deployment fundamentals"
    ],
    "final": "Build a functional mobile application connected to a backend or cloud service.",
    "outcome": "A working mobile application connected to a backend or cloud service."
  }
]

const BUNDLES: Bundle[] = [
  {
    "id": "frontend-career-path",
    "name": "Frontend Career Path",
    "duration": "16 weeks",
    "prices": {
      "online": 130000,
      "offline": 180000,
      "hybrid": 200000
    },
    "studentOnline": null
  },
  {
    "id": "ai-data-path",
    "name": "AI + Data Path",
    "duration": "16 weeks",
    "prices": {
      "online": 160000,
      "offline": 220000,
      "hybrid": 250000
    },
    "studentOnline": null
  },
  {
    "id": "product-design-path",
    "name": "Product Design Path",
    "duration": "12 weeks",
    "prices": {
      "online": 110000,
      "offline": 150000,
      "hybrid": 170000
    },
    "studentOnline": null
  },
  {
    "id": "software-developer-path",
    "name": "Software Developer Path",
    "duration": "24 weeks",
    "prices": {
      "online": 250000,
      "offline": 350000,
      "hybrid": 380000
    },
    "studentOnline": null
  },
  {
    "id": "complete-tech-pass",
    "name": "Complete Tech Pass",
    "duration": "24 to 32 weeks",
    "prices": {
      "online": 299000,
      "offline": 399000,
      "hybrid": 349000
    },
    "studentOnline": null
  }
]

const ALL_ITEMS: Item[] = [...PROGRAMMES, ...BUNDLES]

const CATEGORIES: { id: Category; label: string; blurb: string }[] = [
  {
    id: 'student',
    label: 'Student',
    blurb: 'Add practical skills to your degree, with discounted online rates on selected programmes.',
  },
  {
    id: 'nysc',
    label: 'NYSC corps member',
    blurb: 'Make your service year count with a skill that lasts, with discounted online rates on selected programmes.',
  },
  {
    id: 'graduate',
    label: 'Graduate',
    blurb: 'Build real projects and a portfolio that support your job search and your next step.',
  },
  {
    id: 'professional',
    label: 'Working professional',
    blurb: 'Learn AI automation, data analysis or a new craft alongside your job, in the format that fits your week.',
  },
]

const FORMATS: { id: Fmt; label: string; blurb: string }[] = [
  {
    id: 'online',
    label: 'Online',
    blurb: 'Live remote classes, learning materials, practical assignments, projects and community support.',
  },
  {
    id: 'offline',
    label: 'Offline',
    blurb: 'Physical classroom learning, practical sessions and direct instructor support.',
  },
  {
    id: 'hybrid',
    label: 'Hybrid',
    blurb: 'Online learning plus physical sessions and support, for flexibility and direct interaction.',
  },
]

const BENEFITS: { icon: IconName; title: string; text: string }[] = [
  { icon: 'live', title: 'Live classes', text: 'Instructor-led sessions three times a week.' },
  { icon: 'code', title: 'Practical projects', text: 'Real-world assignments and a capstone project.' },
  { icon: 'people', title: 'Instructor support', text: 'Q&A and mentorship within the programme.' },
  { icon: 'briefcase', title: 'Portfolio guidance', text: 'Turn your projects into work you can show.' },
  { icon: 'compass', title: 'Career guidance', text: 'Direction on CVs, LinkedIn and opportunities.' },
  { icon: 'award', title: 'Certificate', text: 'Awarded on completion, subject to requirements.' },
  { icon: 'chat', title: 'Learning community', text: 'Learn alongside other serious learners.' },
  { icon: 'replay', title: 'Replays', text: 'Recorded sessions where applicable.' },
]

const JOURNEY = [
  'Choose a programme and a format.',
  'Register for a cohort and pay in full, or by approved instalments.',
  'Attend live sessions and ask questions as you go.',
  'Complete practical assignments and build real projects.',
  'Get feedback, then complete and present your capstone project.',
  'Finish with a portfolio and a certificate, subject to completion requirements.',
]

const PROJECTS = [
  {
    name: 'OneUniverse',
    text: 'Secure digital marketplace with BVN/NIN verification, bank loan integration and real-time geo-matching.',
    links: [{ label: 'View on Google Play', href: 'https://play.google.com/store/apps/details?id=com.oneuniverse.oneuniverse' }],
  },
  {
    name: 'ICAN Surulere',
    text: 'Full web platform for the ICAN Surulere chapter: member login, events, gallery and backend systems, built with Next.js.',
    links: [{ label: 'Visit the website', href: 'https://www.icansuruleredistrict.org' }],
  },
  {
    name: 'Founder Thrive',
    text: 'Lifestyle app combating burnout in startup founders, with wellness tools, mind-body routines and wellbeing journeys.',
    links: [
      { label: 'Platform', href: 'https://www.founderthrive.net' },
      { label: 'Play Store', href: 'https://play.google.com/store/search?q=founder+thrive+the+weave&c=apps' },
    ],
  },
]

const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: 'Who can join Beyond Camp?',
    a: 'Undergraduates, NYSC members, graduates and working professionals. Basic computer literacy is recommended. If you have never coded before, Web Fundamentals is the gentlest place to start, and you can message us if you are not sure which programme fits your goal.',
  },
  {
    q: 'Which format should I choose: Online, Offline or Hybrid?',
    a: 'Online gives you live remote classes from anywhere at the lowest fee. Offline is physical classroom learning with on-site instructor support. Hybrid combines online learning with physical sessions. All three follow the same academic duration; Offline and Hybrid fees also cover venue, power and physical support. Please ask us which locations are running before you register for Offline or Hybrid.',
  },
  {
    q: 'What do I need before I start?',
    a: 'A laptop is strongly recommended for development, data and UI/UX programmes, and stable internet access is needed for Online classes. Some programmes need you to install software or create free accounts. We share the specific requirements before your cohort begins.',
  },
  {
    q: 'How do the student and NYSC rates work?',
    a: 'Eligible students and NYSC members get discounted Online rates on Frontend, Backend, AI Automation, Data Analysis, UI/UX Design and Mobile Development. Pick Student or NYSC corps member in the pricing section or the form to see your rate. We may ask for a valid student ID or NYSC identification before your place is confirmed, and discounts cannot be combined unless management approves.',
  },
  {
    q: 'When are classes held, and how long is a programme?',
    a: 'Live classes usually run three times a week, on Monday, Wednesday and Thursday, in two-hour sessions in the morning or late afternoon. Programmes run from 6 weeks up to 24 to 32 weeks, depending on what you choose. Your exact timetable is confirmed before the cohort starts, and replays are available where applicable.',
  },
  {
    q: 'Can I pay in instalments?',
    a: 'Selected programmes can be paid in two instalments: 80% before the programme starts and 20% three weeks later. Instalments must be approved before you enrol, so choose Register Now and tell us on WhatsApp that you would like to pay in instalments.',
  },
  {
    q: 'How do I pay, and what happens next?',
    a: 'Choose Pay Now to pay securely online with Paystack. As soon as your payment succeeds, we take you to WhatsApp so we can confirm your place and add you to your cohort group. If you prefer, choose Register Now: we open WhatsApp with your details filled in and send you the payment details.',
  },
  {
    q: 'What if I am not satisfied, or you cannot deliver?',
    a: (
      <>
        If we fail to deliver what you paid for, for example the instructor never shows up and no replacement is provided, you are entitled to a refund. If you try the programme and it is not right for you, you can request a partial refund within 30 days of the start date. Refunds do not apply where the learner did not attend. The full policy is in our{' '}
        <Link href={TERMS_HREF} style={{ color: '#25693F', textDecoration: 'underline', textUnderlineOffset: 3 }}>
          Terms and Conditions
        </Link>
        .
      </>
    ),
  },
  {
    q: 'Will I receive a certificate?',
    a: 'Yes, on completion. The requirements are set at the start of your cohort and usually include sufficient attendance, completed assignments, your capstone or final project, and full payment.',
  },
  {
    q: 'Will this guarantee me a job or income?',
    a: 'No, and we will not promise that. What we provide is practical training, real projects, portfolio guidance and career direction. Your results depend on your effort, practice, project quality and continued learning.',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Design tokens
// ─────────────────────────────────────────────────────────────────────────────
const C = {
  deep: '#0F3323',
  forest: '#1E4D35',
  leaf: '#2F7A4F',
  link: '#25693F',
  tint: '#E3EFDC',
  mist: '#F3F8F0',
  sage: '#BBD8AE',
  ink: '#1C2420',
  muted: '#5A675E',
  rule: '#CFD9D1',
  field: '#8A9A8E',
  onDark: '#CFE3C8',
  amber: '#F2B84B',
  white: '#FFFFFF',
  error: '#A4231B',
  errorBg: '#FDECEA',
}

const F = {
  head: 'Cambria, Caladea, "Noto Serif", Georgia, "Times New Roman", serif',
  body: 'Calibri, Carlito, Roboto, "Segoe UI", system-ui, -apple-system, "Helvetica Neue", Arial, sans-serif',
}

const btnBase: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 10,
  padding: '14px 26px',
  borderRadius: 6,
  fontSize: 17,
  fontWeight: 700,
  fontFamily: 'inherit',
  lineHeight: 1.2,
  textDecoration: 'none',
  cursor: 'pointer',
  border: '2px solid transparent',
  boxSizing: 'border-box',
}
const btnAmber: React.CSSProperties = { ...btnBase, background: C.amber, color: C.ink, borderColor: C.amber }
const btnForest: React.CSSProperties = { ...btnBase, background: C.forest, color: C.white, borderColor: C.forest }
const btnGhostDark: React.CSSProperties = { ...btnBase, background: 'transparent', color: C.white, borderColor: 'rgba(255,255,255,0.55)' }
const btnOutline: React.CSSProperties = { ...btnBase, background: 'transparent', color: C.forest, borderColor: C.forest }
const btnSmall: React.CSSProperties = { padding: '9px 16px', fontSize: 15 }

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────
const money = (n: number) => `₦${n.toLocaleString('en-NG')}`

function priceFor(item: Item, category: Category, fmt: Fmt) {
  const standard = item.prices[fmt]
  const eligible = (category === 'student' || category === 'nysc') && fmt === 'online' && item.studentOnline !== null
  const amount = eligible ? (item.studentOnline as number) : standard
  const label = eligible ? (category === 'student' ? 'Student rate' : 'NYSC rate') : 'Standard rate'
  return { amount, standard, discounted: eligible, label }
}

const categoryLabel = (c: Category) => CATEGORIES.find((x) => x.id === c)?.label ?? c
const formatLabel = (f: Fmt) => FORMATS.find((x) => x.id === f)?.label ?? f

function goTo(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
}

function useMedia(query: string): boolean {
  const [matches, setMatches] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const update = () => setMatches(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [query])
  return matches
}

type LearnerDetails = {
  name: string
  email: string
  phone: string
  category: Category
  format: Fmt
  programme: string
  amount: number
  rate: string
}

function registerLink(d: LearnerDetails) {
  const msg =
    `Hello Paschal! 👋\n\nI want to register for a *Beyond Camp* programme.\n\n` +
    `*Name:* ${d.name}\n*Email:* ${d.email}\n*WhatsApp:* ${d.phone}\n` +
    `*I am a:* ${categoryLabel(d.category)}\n*Programme:* ${d.programme}\n*Format:* ${formatLabel(d.format)}\n` +
    `*Fee:* ${money(d.amount)} (${d.rate})\n\nPlease confirm my slot and send me the payment details. Thank you!`
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`
}

function paidLink(d: LearnerDetails, reference: string) {
  const msg =
    `Hello Paschal! 👋\n\nI have just paid for *Beyond Camp*.\n\n` +
    `*Name:* ${d.name}\n*Email:* ${d.email}\n*WhatsApp:* ${d.phone}\n` +
    `*I am a:* ${categoryLabel(d.category)}\n*Programme:* ${d.programme}\n*Format:* ${formatLabel(d.format)}\n` +
    `*Amount paid:* ${money(d.amount)}\n*Payment reference:* ${reference}\n\nPlease confirm my registration. Thank you!`
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`
}

// ─────────────────────────────────────────────────────────────────────────────
// Small building blocks
// ─────────────────────────────────────────────────────────────────────────────
type IconName = 'live' | 'code' | 'people' | 'briefcase' | 'compass' | 'award' | 'chat' | 'replay'

const ICON_PATHS: Record<IconName, React.ReactNode> = {
  live: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </>
  ),
  code: <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" />,
  people: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M17 14c2.5 0 4.5 2 4.5 4.5" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5l-2 5-5 2 2-5z" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="9" r="5" />
      <path d="M8.5 13.5L7 21l5-3 5 3-1.5-7.5" />
    </>
  ),
  chat: <path d="M4 5h16v11H9l-5 4z" />,
  replay: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M10 8.5l5 3.5-5 3.5z" />
    </>
  ),
}

function Icon({ name, size = 26, color = C.leaf }: { name: IconName; size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICON_PATHS[name]}
    </svg>
  )
}

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v12" />
      <path d="M7 11l5 5 5-5" />
      <path d="M5 20h14" />
    </svg>
  )
}

function Section({
  id,
  bg = C.white,
  children,
}: {
  id?: string
  bg?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} style={{ background: bg, scrollMarginTop: 64 }}>
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: 'clamp(56px, 8vw, 104px) clamp(20px, 4vw, 32px)' }}>{children}</div>
    </section>
  )
}

function H2({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <h2
      style={{
        fontFamily: F.head,
        fontWeight: 700,
        fontSize: 'clamp(30px, 4vw, 44px)',
        lineHeight: 1.12,
        color: dark ? C.white : C.forest,
        margin: '0 0 16px',
        maxWidth: 780,
      }}
    >
      {children}
    </h2>
  )
}

function Lead({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p style={{ fontSize: 19, lineHeight: 1.6, color: dark ? C.onDark : C.muted, margin: '0 0 40px', maxWidth: 700 }}>{children}</p>
  )
}

function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: T
  options: { id: T; label: string }[]
  onChange: (v: T) => void
}) {
  return (
    <div role="radiogroup" aria-label={label} style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {options.map((o) => {
        const on = o.id === value
        return (
          <button
            key={o.id}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(o.id)}
            style={{
              padding: '10px 16px',
              borderRadius: 6,
              fontSize: 16,
              fontWeight: 700,
              fontFamily: 'inherit',
              cursor: 'pointer',
              background: on ? C.forest : C.white,
              color: on ? C.white : C.forest,
              border: `2px solid ${on ? C.forest : C.field}`,
            }}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}

function PriceBlock({ p, align = 'right', size = 24 }: { p: ReturnType<typeof priceFor>; align?: 'left' | 'right'; size?: number }) {
  return (
    <div style={{ textAlign: align }}>
      <div style={{ fontFamily: F.head, fontWeight: 700, fontSize: size, color: C.forest, lineHeight: 1.1 }}>{money(p.amount)}</div>
      <div style={{ fontSize: 14, color: C.muted, marginTop: 3 }}>
        {p.discounted && (
          <>
            <s>{money(p.standard)}</s>
            {' · '}
          </>
        )}
        <span style={{ fontWeight: p.discounted ? 700 : 400, color: p.discounted ? C.link : C.muted }}>{p.label}</span>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────
export default function BeyondCamp() {
  const wide = useMedia('(min-width: 960px)')

  const [category, setCategory] = useState<Category>('professional')
  const [format, setFormat] = useState<Fmt>('online')
  const [selectedId, setSelectedId] = useState('')
  const [explorerId, setExplorerId] = useState(PROGRAMMES[1].id)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [form, setForm] = useState({ name: '', email: '', phone: '', agree: false })
  const [error, setError] = useState('')
  const [paying, setPaying] = useState(false)
  const [status, setStatus] = useState<Status>({ kind: 'idle' })

  const selected = ALL_ITEMS.find((i) => i.id === selectedId) ?? null
  const price = selected ? priceFor(selected, category, format) : null
  const explorer = PROGRAMMES.find((p) => p.id === explorerId) ?? PROGRAMMES[0]
  const eligibleForDiscount = category === 'student' || category === 'nysc'

  // After a successful payment, take the learner to WhatsApp (a button is shown as a fallback).
  useEffect(() => {
    if (status.kind !== 'paid') return
    const t = window.setTimeout(() => window.location.assign(status.link), 2500)
    return () => window.clearTimeout(t)
  }, [status])

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }))
    setError('')
  }

  function chooseCategory(c: Category, scrollTo?: string) {
    setCategory(c)
    if (scrollTo) goTo(scrollTo)
  }

  function chooseProgramme(id: string) {
    setSelectedId(id)
    goTo('register')
  }

  function validate(): string {
    if (form.name.trim().length < 2) return 'Please enter your full name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) return 'Please enter a valid email address.'
    if (form.phone.replace(/\D/g, '').length < 10) return 'Please enter your WhatsApp number (at least 10 digits).'
    if (!selected || !price) return 'Please choose a programme or career path.'
    if (!form.agree) return 'Please confirm that you have read and accept the Terms and Conditions.'
    return ''
  }

  function details(): LearnerDetails {
    return {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      category,
      format,
      programme: selected!.name,
      amount: price!.amount,
      rate: price!.label,
    }
  }

  function handleRegister() {
    const problem = validate()
    if (problem) return setError(problem)
    window.open(registerLink(details()), '_blank', 'noopener,noreferrer')
    setStatus({ kind: 'whatsapp' })
  }

async function handlePay() {
  const problem = validate()
  if (problem) return setError(problem)
  const d = details()
  setPaying(true)

  let PaystackPop: any
  try {
    // Loaded on click, so it never runs on the server
    const mod: any = await import('@paystack/inline-js')
    PaystackPop = mod.default ?? mod
  } catch (err) {
    console.error(err)
    setPaying(false)
    setError('We could not load the payment window. Please try again, or choose Register Now to continue on WhatsApp.')
    return
  }

  const paystack = new PaystackPop()
  paystack.newTransaction({
      key: PAYSTACK_PUBLIC_KEY,
      email: d.email,
      amount: d.amount * 100,
      currency: 'NGN',
      phone: d.phone,
      metadata: {
        custom_fields: [
          { display_name: 'Full name', variable_name: 'full_name', value: d.name },
          { display_name: 'WhatsApp', variable_name: 'whatsapp', value: d.phone },
          { display_name: 'Programme', variable_name: 'programme', value: d.programme },
          { display_name: 'Format', variable_name: 'format', value: formatLabel(d.format) },
          { display_name: 'Learner type', variable_name: 'learner_type', value: categoryLabel(d.category) },
        ],
      },
      onSuccess: async (response: any) => {
        const reference: string = response.reference
        setPaying(false)
        setStatus({ kind: 'paid', reference, link: paidLink(d, reference) })
        try {
          await fetch('/api/payment/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: d.name,
              email: d.email,
              phone: d.phone,
              amount: d.amount,
              courseId: selected!.id,
              courseTitle: d.programme,
              category: d.category,
              format: d.format,
              reference,
              status: 'success',
            }),
          })
        } catch (err) {
          console.error(err)
        }
      },
      onCancel: () => {
        setPaying(false)
        setError('Payment was cancelled. You can try again, or choose Register Now to continue on WhatsApp.')
      },
      onError: () => {
        setPaying(false)
        setError('We could not open the payment window. Please try again, or choose Register Now to continue on WhatsApp.')
      },
    })
  }

  // ── styles that depend on layout ──
  const fieldStyle: React.CSSProperties = {
    width: '100%',
    boxSizing: 'border-box',
    padding: '12px 14px',
    fontSize: 17,
    fontFamily: 'inherit',
    color: C.ink,
    background: C.white,
    border: `1.5px solid ${C.field}`,
    borderRadius: 6,
  }
  const labelStyle: React.CSSProperties = { display: 'block', fontWeight: 700, fontSize: 15, marginBottom: 6, color: C.ink }

  return (
    <div className="bc" id="top" style={{ fontFamily: F.body, color: C.ink, background: C.white, fontSize: 17, lineHeight: 1.6 }}>
      <style>{`
        html { scroll-behavior: smooth; }
        @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
        .bc *, .bc *::before, .bc *::after { box-sizing: border-box; }
        .bc a:focus-visible, .bc button:focus-visible, .bc input:focus-visible, .bc select:focus-visible { outline: 3px solid ${C.forest}; outline-offset: 2px; }
        .bc .bc-dark a:focus-visible, .bc .bc-dark button:focus-visible { outline-color: ${C.amber}; }
        .bc .bc-btn { transition: filter .15s ease; }
        .bc .bc-btn:hover { filter: brightness(0.93); }
        .bc .bc-btn:disabled { opacity: .6; cursor: not-allowed; }
        .bc .bc-navlink:hover { color: #fff; }
      `}</style>

      {/* ───────────── Navigation ───────────── */}
      <nav className="bc-dark" aria-label="Main" style={{ position: 'sticky', top: 0, zIndex: 50, background: C.deep, borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 clamp(20px, 4vw, 32px)', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <a href="#top" style={{ display: 'flex', alignItems: 'baseline', gap: 12, textDecoration: 'none' }}>
            <span style={{ fontFamily: F.head, fontWeight: 700, fontSize: 21, color: C.white }}>BEYOND CAMP</span>
            {wide && <span style={{ fontSize: 15, color: C.onDark }}>Tech &amp; Digital Skills Academy</span>}
          </a>
          <div style={{ display: 'flex', alignItems: 'center', gap: wide ? 28 : 12 }}>
            {wide &&
              [
                ['Programmes', '#programmes'],
                ['Pricing', '#pricing'],
                ['How it works', '#how-it-works'],
                ['FAQ', '#faq'],
              ].map(([label, href]) => (
                <a key={href} href={href} className="bc-navlink" style={{ color: C.onDark, textDecoration: 'none', fontSize: 16, fontWeight: 600 }}>
                  {label}
                </a>
              ))}
            <a href="#register" className="bc-btn" style={{ ...btnAmber, ...btnSmall }}>
              Register Now
            </a>
          </div>
        </div>
      </nav>

      {/* ───────────── Hero ───────────── */}
      <header className="bc-dark" style={{ background: C.deep, color: C.white }}>
        <div
          style={{
            maxWidth: 1160,
            margin: '0 auto',
            padding: 'clamp(48px, 7vw, 96px) clamp(20px, 4vw, 32px) clamp(56px, 8vw, 104px)',
            display: 'grid',
            gridTemplateColumns: wide ? 'minmax(0, 1.15fr) minmax(0, 0.85fr)' : 'minmax(0, 1fr)',
            gap: wide ? 72 : 44,
            alignItems: 'center',
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: F.head,
                fontWeight: 700,
                fontSize: 'clamp(38px, 5.6vw, 66px)',
                lineHeight: 1.05,
                margin: '0 0 22px',
                color: C.white,
              }}
            >
              Practical tech skills, built through real projects.
            </h1>
            <p style={{ fontSize: 'clamp(18px, 2vw, 21px)', lineHeight: 1.6, color: C.onDark, margin: '0 0 34px', maxWidth: 600 }}>
              Live classes, mentorship and a portfolio you can show. For students, NYSC members, graduates and working
              professionals, in Online, Offline or Hybrid formats.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 44 }}>
              <a href="#register" className="bc-btn" style={{ ...btnAmber, fontSize: 18, padding: '16px 30px' }}>
                Register Now
              </a>
              <a href={PRICING_PDF} download={PRICING_PDF_NAME} className="bc-btn" style={{ ...btnGhostDark, fontSize: 18, padding: '16px 26px' }}>
                <DownloadIcon />
                Download pricing
              </a>
            </div>
            <dl style={{ display: 'flex', flexWrap: 'wrap', gap: '14px 0', margin: 0, padding: 0 }}>
              {[
                ['8', 'programmes'],
                ['5', 'career paths'],
                ['6 to 32', 'weeks'],
                ['3', 'formats'],
              ].map(([n, l], i) => (
                <div key={l} style={{ paddingRight: 24, marginRight: 24, borderRight: i < 3 ? '1px solid rgba(255,255,255,0.22)' : 'none' }}>
                  <dt style={{ fontFamily: F.head, fontWeight: 700, fontSize: 26, color: C.white, lineHeight: 1.1 }}>{n}</dt>
                  <dd style={{ margin: 0, fontSize: 15, color: C.onDark }}>{l}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Timetable */}
          <div style={{ background: C.mist, color: C.ink, borderRadius: 10, padding: 'clamp(22px, 3vw, 32px)', border: `1px solid ${C.sage}` }}>
            <h2 style={{ fontFamily: F.head, fontSize: 26, color: C.forest, margin: '0 0 4px', lineHeight: 1.2 }}>A typical week</h2>
            <p style={{ margin: '0 0 20px', color: C.muted, fontSize: 16 }}>Live classes three times a week.</p>
            <div style={{ borderTop: `1px solid ${C.rule}` }}>
              {[
                ['Monday', 'Live instructor-led class'],
                ['Wednesday', 'Live instructor-led class'],
                ['Thursday', 'Live class or practical session'],
              ].map(([day, what]) => (
                <div key={day} style={{ display: 'flex', flexWrap: 'wrap', gap: '2px 16px', padding: '13px 0', borderBottom: `1px solid ${C.rule}` }}>
                  <div style={{ flex: '0 0 104px', fontWeight: 700, color: C.forest }}>{day}</div>
                  <div style={{ flex: '1 1 180px' }}>{what}</div>
                </div>
              ))}
            </div>
            <p style={{ margin: '18px 0 0', fontSize: 16 }}>
              Each session runs about two hours, in a morning slot (10:00 AM to 12:00 PM) or a late-afternoon slot (4:00 PM to 6:00 PM).
            </p>
            <p style={{ margin: '12px 0 0', fontSize: 16 }}>
              Between classes: practical assignments, project work, instructor Q&amp;A and community support.
            </p>
            <p style={{ margin: '12px 0 0', fontSize: 14.5, color: C.muted }}>Your exact timetable is confirmed before your cohort begins.</p>
          </div>
        </div>
      </header>

      <main>
        {/* ───────────── Who it is for ───────────── */}
        <Section id="who">
          <H2>Made for where you are right now</H2>
          <Lead>Choose the group that fits you and we will show the prices that apply to you.</Lead>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 32 }}>
            {CATEGORIES.map((c) => (
              <div key={c.id} style={{ borderTop: `3px solid ${category === c.id ? C.forest : C.sage}`, paddingTop: 18 }}>
                <h3 style={{ fontFamily: F.head, fontSize: 24, margin: '0 0 8px', color: C.forest, lineHeight: 1.2 }}>{c.label}</h3>
                <p style={{ margin: '0 0 18px', color: C.muted, fontSize: 17 }}>{c.blurb}</p>
                <button
                  type="button"
                  className="bc-btn"
                  onClick={() => chooseCategory(c.id, 'pricing')}
                  style={{ ...btnOutline, ...btnSmall }}
                >
                  See my price
                </button>
              </div>
            ))}
          </div>
        </Section>

        {/* ───────────── Programmes ───────────── */}
        <Section id="programmes" bg={C.mist}>
          <H2>Eight programmes, one practical approach</H2>
          <Lead>Every programme ends with a project you build and present. Pick one to see what you will learn.</Lead>

          <div style={{ display: 'grid', gridTemplateColumns: wide ? '300px minmax(0, 1fr)' : 'minmax(0, 1fr)', gap: wide ? 48 : 28, alignItems: 'start' }}>
            <div role="tablist" aria-label="Programmes" style={{ display: 'flex', flexDirection: wide ? 'column' : 'row', flexWrap: wide ? 'nowrap' : 'wrap', gap: wide ? 0 : 8, borderTop: wide ? `1px solid ${C.rule}` : 'none' }}>
              {PROGRAMMES.map((p) => {
                const on = p.id === explorer.id
                return (
                  <button
                    key={p.id}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => setExplorerId(p.id)}
                    style={{
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      fontSize: 17,
                      padding: wide ? '14px 16px' : '10px 14px',
                      background: on ? C.forest : wide ? 'transparent' : C.white,
                      color: on ? C.white : C.ink,
                      border: wide ? 'none' : `2px solid ${on ? C.forest : C.field}`,
                      borderBottom: wide ? `1px solid ${C.rule}` : undefined,
                      borderRadius: wide ? 0 : 6,
                      display: 'flex',
                      justifyContent: 'space-between',
                      gap: 12,
                      alignItems: 'baseline',
                    }}
                  >
                    <span style={{ fontWeight: 700 }}>{p.name}</span>
                    {wide && <span style={{ fontSize: 14.5, opacity: 0.8 }}>{p.duration}</span>}
                  </button>
                )
              })}
            </div>

            <div role="tabpanel" style={{ background: C.white, border: `1px solid ${C.rule}`, borderRadius: 8, padding: 'clamp(22px, 3vw, 36px)' }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.leaf, marginBottom: 6 }}>
                {explorer.group} | {explorer.duration}
              </div>
              <h3 style={{ fontFamily: F.head, fontSize: 'clamp(26px, 3vw, 34px)', color: C.forest, margin: '0 0 8px', lineHeight: 1.15 }}>{explorer.name}</h3>
              <p style={{ margin: '0 0 24px', color: C.muted }}>{explorer.audience}</p>

              <h4 style={{ margin: '0 0 10px', fontSize: 17 }}>What you will learn</h4>
              <ul role="list" style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '8px 28px' }}>
                {explorer.topics.map((t) => (
                  <li key={t} style={{ display: 'flex', gap: 10 }}>
                    <span aria-hidden="true" style={{ color: C.leaf, fontWeight: 700 }}>
                      &bull;
                    </span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>

              <div style={{ background: C.mist, borderLeft: `4px solid ${C.leaf}`, borderRadius: 4, padding: '16px 20px', marginBottom: 26 }}>
                <p style={{ margin: '0 0 8px' }}>
                  <strong>Final project.</strong> {explorer.final}
                </p>
                <p style={{ margin: 0 }}>
                  <strong>Outcome.</strong> {explorer.outcome}
                </p>
              </div>

              <h4 style={{ margin: '0 0 12px', fontSize: 17 }}>
                Fees for {categoryLabel(category).toLowerCase()} learners{' '}
                <a href="#pricing" style={{ fontWeight: 400, fontSize: 15, color: C.link }}>
                  (change)
                </a>
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12, marginBottom: 26 }}>
                {FORMATS.map((f) => (
                  <div key={f.id} style={{ border: `1px solid ${C.rule}`, borderRadius: 6, padding: '12px 14px' }}>
                    <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{f.label}</div>
                    <PriceBlock p={priceFor(explorer, category, f.id)} align="left" size={22} />
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="bc-btn"
                onClick={() => {
                  setSelectedId(explorer.id)
                  goTo('register')
                }}
                style={btnForest}
              >
                Register for {explorer.name}
              </button>
            </div>
          </div>
        </Section>

        {/* ───────────── How it works ───────────── */}
        <Section id="how-it-works">
          <div style={{ display: 'grid', gridTemplateColumns: wide ? 'minmax(0, 1.3fr) minmax(0, 0.9fr)' : 'minmax(0, 1fr)', gap: wide ? 80 : 56 }}>
            <div>
              <H2>Everything you need to finish with something to show</H2>
              <Lead>Each programme comes with the same support structure, whichever format you choose.</Lead>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '28px 32px' }}>
                {BENEFITS.map((b) => (
                  <div key={b.title} style={{ display: 'flex', gap: 14 }}>
                    <div style={{ flex: '0 0 auto', marginTop: 2 }}>
                      <Icon name={b.icon} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: C.forest }}>{b.title}</div>
                      <div style={{ color: C.muted, fontSize: 16, lineHeight: 1.5 }}>{b.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 style={{ fontFamily: F.head, fontSize: 28, color: C.forest, margin: '0 0 20px' }}>Your learning journey</h3>
              <ol role="list" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {JOURNEY.map((s, i) => (
                  <li key={s} style={{ display: 'flex', gap: 16, padding: '14px 0', borderTop: `1px solid ${C.rule}`, borderBottom: i === JOURNEY.length - 1 ? `1px solid ${C.rule}` : 'none' }}>
                    <span style={{ flex: '0 0 30px', height: 30, borderRadius: '50%', background: C.forest, color: C.white, fontWeight: 700, fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {i + 1}
                    </span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Section>

        {/* ───────────── Pricing ───────────── */}
        <Section id="pricing" bg={C.mist}>
          <H2>Clear prices for every kind of learner</H2>
          <Lead>Tell us who you are and how you want to learn. The prices below update to match.</Lead>

          <div style={{ display: 'grid', gap: 26, marginBottom: 36 }}>
            <div>
              <div style={{ fontWeight: 700, marginBottom: 10 }}>I am a</div>
              <Segmented<Category> label="Learner type" value={category} onChange={setCategory} options={CATEGORIES.map((c) => ({ id: c.id, label: c.label }))} />
            </div>
            <div>
              <div style={{ fontWeight: 700, marginBottom: 10 }}>I want to learn</div>
              <div role="radiogroup" aria-label="Format" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
                {FORMATS.map((f) => {
                  const on = f.id === format
                  return (
                    <button
                      key={f.id}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      onClick={() => setFormat(f.id)}
                      style={{
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                        fontSize: 16,
                        lineHeight: 1.5,
                        padding: '14px 16px',
                        borderRadius: 6,
                        background: on ? C.forest : C.white,
                        color: on ? C.white : C.ink,
                        border: `2px solid ${on ? C.forest : C.field}`,
                      }}
                    >
                      <span style={{ display: 'block', fontFamily: F.head, fontWeight: 700, fontSize: 21, marginBottom: 4 }}>{f.label}</span>
                      <span style={{ opacity: on ? 0.92 : 0.8 }}>{f.blurb}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {eligibleForDiscount && format !== 'online' && (
            <p style={{ background: C.tint, borderLeft: `4px solid ${C.leaf}`, padding: '12px 16px', margin: '0 0 24px', borderRadius: 4 }}>
              Student and NYSC discounts apply to Online classes.{' '}
              <button type="button" onClick={() => setFormat('online')} style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', fontWeight: 700, color: C.link, textDecoration: 'underline', cursor: 'pointer' }}>
                Switch to Online
              </button>{' '}
              to see your rate.
            </p>
          )}

          <h3 style={{ fontFamily: F.head, fontSize: 28, color: C.forest, margin: '0 0 6px' }}>Programmes</h3>
          <PriceList items={PROGRAMMES} category={category} format={format} onRegister={chooseProgramme} />

          <h3 style={{ fontFamily: F.head, fontSize: 28, color: C.forest, margin: '44px 0 6px' }}>Career paths and bundles</h3>
          <p style={{ margin: '0 0 6px', color: C.muted, maxWidth: 700 }}>
            Bundles combine related programmes at a better overall price than registering for each one separately. Ask us what each bundle includes.
          </p>
          <PriceList items={BUNDLES} category={category} format={format} onRegister={chooseProgramme} />

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '20px 32px', marginTop: 40, paddingTop: 28, borderTop: `1px solid ${C.rule}` }}>
            <a href={PRICING_PDF} download={PRICING_PDF_NAME} className="bc-btn" style={btnForest}>
              <DownloadIcon />
              Download the full pricing guide (PDF)
            </a>
            <p style={{ margin: 0, color: C.muted, fontSize: 16, maxWidth: 560 }}>
              Prices are confirmed for your cohort before you pay. Eligible students and NYSC members may be asked for a valid student ID or NYSC identification.
              Selected programmes can be paid in two approved instalments (80% then 20%).
            </p>
          </div>
        </Section>

        {/* ───────────── Instructor ───────────── */}
        <div className="bc-dark" style={{ background: C.deep, color: C.white }}>
          <div style={{ maxWidth: 1160, margin: '0 auto', padding: 'clamp(56px, 8vw, 104px) clamp(20px, 4vw, 32px)', display: 'grid', gridTemplateColumns: wide ? 'minmax(0, 1fr) minmax(0, 1fr)' : 'minmax(0, 1fr)', gap: wide ? 80 : 48 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 24 }}>
                <div aria-hidden="true" style={{ width: 72, height: 72, borderRadius: '50%', background: C.forest, border: `2px solid ${C.leaf}`, color: C.white, fontFamily: F.head, fontWeight: 700, fontSize: 26, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  PN
                </div>
                <div>
                  <h2 style={{ fontFamily: F.head, fontSize: 'clamp(26px, 3vw, 34px)', margin: 0, color: C.white, lineHeight: 1.15 }}>Paschal Nwokeocha</h2>
                  <p style={{ margin: '4px 0 0', color: C.onDark, fontSize: 16 }}>Software Developer and Tech Consultant. Founder, D-Starite Technologies.</p>
                </div>
              </div>
              <p style={{ color: C.onDark, fontSize: 18, lineHeight: 1.7, margin: '0 0 28px' }}>
                I have built real software products, from HRMS systems to inventory platforms to client websites, and have trained aspiring developers into practitioners. I don’t just teach theory. I teach from actual projects I have shipped.
              </p>
              <a href="https://ng.linkedin.com/in/starttechnology" target="_blank" rel="noopener noreferrer" className="bc-btn" style={{ ...btnGhostDark, ...btnSmall }}>
                View LinkedIn profile
              </a>
            </div>
            <div>
              <h3 style={{ fontFamily: F.head, fontSize: 26, color: C.white, margin: '0 0 6px' }}>Products your instructor has contributed to</h3>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', marginTop: 18 }}>
                {PROJECTS.map((p) => (
                  <div key={p.name} style={{ padding: '18px 0', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
                    <div style={{ fontWeight: 700, fontSize: 19, color: C.white }}>{p.name}</div>
                    <p style={{ margin: '4px 0 8px', color: C.onDark, fontSize: 16.5 }}>{p.text}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
                      {p.links.map((l) => (
                        <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" style={{ color: C.amber, fontWeight: 700, fontSize: 15.5 }}>
                          {l.label}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ───────────── FAQ ───────────── */}
        <Section id="faq">
          <div style={{ display: 'grid', gridTemplateColumns: wide ? 'minmax(0, 0.7fr) minmax(0, 1.3fr)' : 'minmax(0, 1fr)', gap: wide ? 72 : 32 }}>
            <div>
              <H2>Common questions</H2>
              <p style={{ color: C.muted, fontSize: 18, margin: '0 0 20px' }}>Can’t find your answer? Message us on WhatsApp and we will help you choose.</p>
              <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer" className="bc-btn" style={{ ...btnOutline, ...btnSmall }}>
                <WhatsAppIcon size={18} />
                Chat with us
              </a>
            </div>
            <div style={{ borderTop: `1px solid ${C.rule}` }}>
              {FAQS.map((f, i) => {
                const open = openFaq === i
                return (
                  <div key={f.q} style={{ borderBottom: `1px solid ${C.rule}` }}>
                    <h3 style={{ margin: 0 }}>
                      <button
                        type="button"
                        aria-expanded={open}
                        aria-controls={`faq-${i}`}
                        onClick={() => setOpenFaq(open ? null : i)}
                        style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, textAlign: 'left', background: 'none', border: 'none', padding: '20px 0', cursor: 'pointer', fontFamily: 'inherit', fontSize: 18, fontWeight: 700, color: C.forest, lineHeight: 1.35 }}
                      >
                        <span>{f.q}</span>
                        <span aria-hidden="true" style={{ flex: '0 0 auto', width: 28, height: 28, borderRadius: '50%', border: `2px solid ${C.leaf}`, color: C.leaf, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, lineHeight: 1 }}>
                          {open ? '−' : '+'}
                        </span>
                      </button>
                    </h3>
                    {open && (
                      <div id={`faq-${i}`} style={{ padding: '0 44px 22px 0', color: C.ink, fontSize: 17, lineHeight: 1.7 }}>
                        {f.a}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </Section>

        {/* ───────────── Register ───────────── */}
        <Section id="register" bg={C.mist}>
          <div style={{ display: 'grid', gridTemplateColumns: wide ? 'minmax(0, 0.8fr) minmax(0, 1.2fr)' : 'minmax(0, 1fr)', gap: wide ? 72 : 40, alignItems: 'start' }}>
            <div>
              <H2>Register for the next cohort</H2>
              <Lead>Choose your programme, then pay now or register on WhatsApp. Your place is confirmed after payment and completed registration.</Lead>
              <h3 style={{ fontFamily: F.head, fontSize: 22, color: C.forest, margin: '0 0 12px' }}>What happens next</h3>
              <ol role="list" style={{ listStyle: 'none', padding: 0, margin: '0 0 32px' }}>
                {[
                  'Pay online, or register on WhatsApp and we send payment details.',
                  'We confirm your place and add you to your cohort group.',
                  'You receive your timetable and technical requirements before classes begin.',
                  'Live classes start and you build your first project.',
                ].map((s, i) => (
                  <li key={s} style={{ display: 'flex', gap: 14, padding: '10px 0', borderTop: `1px solid ${C.rule}` }}>
                    <span style={{ flex: '0 0 26px', fontWeight: 700, color: C.leaf }}>{i + 1}</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
              <p style={{ margin: 0, color: C.muted, fontSize: 16 }}>
                Not ready yet?{' '}
                <a href={WA_GROUP} target="_blank" rel="noopener noreferrer" style={{ color: C.link, fontWeight: 700 }}>
                  Join the free WhatsApp community
                </a>{' '}
                and ask us anything first.
              </p>
            </div>

            <div style={{ background: C.white, border: `1px solid ${C.rule}`, borderRadius: 10, padding: 'clamp(22px, 3vw, 36px)' }}>
              {status.kind === 'paid' ? (
                <div role="status" aria-live="polite" style={{ textAlign: 'center', padding: '12px 0' }}>
                  <h3 style={{ fontFamily: F.head, fontSize: 30, color: C.forest, margin: '0 0 10px' }}>Payment received</h3>
                  <p style={{ margin: '0 0 6px' }}>
                    Thank you. Your payment reference is <strong>{status.reference}</strong>.
                  </p>
                  <p style={{ margin: '0 0 24px', color: C.muted }}>Taking you to WhatsApp so we can confirm your place. If nothing happens, use the button below.</p>
                  <a href={status.link} className="bc-btn" style={{ ...btnForest, width: '100%' }}>
                    <WhatsAppIcon />
                    Continue to WhatsApp
                  </a>
                </div>
              ) : status.kind === 'whatsapp' ? (
                <div role="status" aria-live="polite" style={{ textAlign: 'center', padding: '12px 0' }}>
                  <h3 style={{ fontFamily: F.head, fontSize: 30, color: C.forest, margin: '0 0 10px' }}>WhatsApp is open</h3>
                  <p style={{ margin: '0 0 24px', color: C.muted }}>
                    Your details are filled in. Press <strong>Send</strong> and we will confirm your slot and share the payment details.
                  </p>
                  <a href={WA_GROUP} target="_blank" rel="noopener noreferrer" className="bc-btn" style={{ ...btnForest, width: '100%' }}>
                    <WhatsAppIcon />
                    Join the free WhatsApp community
                  </a>
                  <button type="button" onClick={() => setStatus({ kind: 'idle' })} style={{ marginTop: 16, background: 'none', border: 'none', color: C.link, fontWeight: 700, fontFamily: 'inherit', fontSize: 16, cursor: 'pointer', textDecoration: 'underline' }}>
                    Edit my details
                  </button>
                </div>
              ) : (
                <div>
                  <div style={{ display: 'grid', gap: 18 }}>
                    <div>
                      <label htmlFor="f-name" style={labelStyle}>Full name</label>
                      <input id="f-name" type="text" autoComplete="name" style={fieldStyle} value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Your full name" />
                    </div>
                    <div>
                      <label htmlFor="f-email" style={labelStyle}>Email address</label>
                      <input id="f-email" type="email" autoComplete="email" style={fieldStyle} value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="you@example.com" />
                    </div>
                    <div>
                      <label htmlFor="f-phone" style={labelStyle}>WhatsApp number</label>
                      <input id="f-phone" type="tel" autoComplete="tel" style={fieldStyle} value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="e.g. 08012345678" />
                    </div>
                    <div>
                      <div style={labelStyle}>I am a</div>
                      <Segmented<Category> label="Learner type" value={category} onChange={(c) => { setCategory(c); setError('') }} options={CATEGORIES.map((c) => ({ id: c.id, label: c.label }))} />
                    </div>
                    <div>
                      <div style={labelStyle}>Format</div>
                      <Segmented<Fmt> label="Format" value={format} onChange={(f) => { setFormat(f); setError('') }} options={FORMATS.map((f) => ({ id: f.id, label: f.label }))} />
                    </div>
                    <div>
                      <label htmlFor="f-programme" style={labelStyle}>Programme or career path</label>
                      <select id="f-programme" style={fieldStyle} value={selectedId} onChange={(e) => { setSelectedId(e.target.value); setError('') }}>
                        <option value="">Select a programme…</option>
                        <optgroup label="Programmes">
                          {PROGRAMMES.map((p) => {
                            const pr = priceFor(p, category, format)
                            return (
                              <option key={p.id} value={p.id}>
                                {p.name} ({p.duration}): {money(pr.amount)}
                                {pr.discounted ? ` (${pr.label})` : ''}
                              </option>
                            )
                          })}
                        </optgroup>
                        <optgroup label="Career paths and bundles">
                          {BUNDLES.map((b) => {
                            const pr = priceFor(b, category, format)
                            return (
                              <option key={b.id} value={b.id}>
                                {b.name} ({b.duration}): {money(pr.amount)}
                              </option>
                            )
                          })}
                        </optgroup>
                      </select>
                    </div>
                  </div>

                  {/* Summary */}
                  <div aria-live="polite" style={{ margin: '24px 0', background: C.mist, borderLeft: `4px solid ${C.leaf}`, borderRadius: 4, padding: '16px 20px' }}>
                    {selected && price ? (
                      <>
                        <div style={{ fontSize: 15, color: C.muted }}>Your fee</div>
                        <div style={{ fontFamily: F.head, fontWeight: 700, fontSize: 34, color: C.forest, lineHeight: 1.1 }}>{money(price.amount)}</div>
                        <div style={{ marginTop: 6, fontSize: 16 }}>
                          {selected.name}, {formatLabel(format)}, {selected.duration}.{' '}
                          {price.discounted ? (
                            <>
                              <strong>{price.label} applied</strong> (standard fee {money(price.standard)}). We may ask for your student ID or NYSC identification before confirming your place.
                            </>
                          ) : eligibleForDiscount && format !== 'online' ? (
                            'Student and NYSC discounts apply to Online classes.'
                          ) : eligibleForDiscount ? (
                            'No discounted rate is offered on this programme.'
                          ) : (
                            'Standard rate.'
                          )}
                        </div>
                      </>
                    ) : (
                      <div style={{ color: C.muted }}>Choose a programme to see your fee.</div>
                    )}
                  </div>

                  <label style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontWeight: 400, fontSize: 16, marginBottom: 20, cursor: 'pointer' }}>
                    <input type="checkbox" checked={form.agree} onChange={(e) => update('agree', e.target.checked)} style={{ width: 20, height: 20, marginTop: 3, flex: '0 0 auto', accentColor: C.forest }} />
                    <span>
                      I have read and accept the{' '}
                      <Link href={TERMS_HREF} target="_blank" style={{ color: C.link, fontWeight: 700 }}>
                        Terms and Conditions
                      </Link>
                      , including the refund policy.
                    </span>
                  </label>

                  {error && (
                    <div role="alert" style={{ background: C.errorBg, border: `1px solid #E9B4AE`, color: C.error, borderRadius: 6, padding: '12px 16px', fontWeight: 700, fontSize: 16, marginBottom: 18 }}>
                      {error}
                    </div>
                  )}

                  <div style={{ display: 'grid', gap: 12 }}>
                    <button type="button" className="bc-btn" onClick={handlePay} disabled={paying} style={{ ...btnForest, width: '100%', fontSize: 18, padding: '16px' }}>
                      {paying ? 'Opening secure payment…' : price ? `Pay Now ${money(price.amount)}` : 'Pay Now'}
                    </button>
                    <button type="button" className="bc-btn" onClick={handleRegister} disabled={paying} style={{ ...btnOutline, width: '100%', fontSize: 18, padding: '16px' }}>
                      <WhatsAppIcon />
                      Register Now on WhatsApp
                    </button>
                  </div>
                  <p style={{ margin: '16px 0 0', fontSize: 15, color: C.muted, lineHeight: 1.5 }}>
                    <strong>Pay Now</strong> uses secure checkout by Paystack, then takes you to WhatsApp to confirm your place. <strong>Register Now</strong> opens WhatsApp with your details filled in, and we send you the payment details. Prefer to talk first?{' '}
                    <a href={`tel:${PHONE_1}`} style={{ color: C.link, fontWeight: 700 }}>
                      Call {PHONE_1}
                    </a>
                    .
                  </p>
                </div>
              )}
            </div>
          </div>
        </Section>
      </main>

      {/* ───────────── Footer ───────────── */}
      <footer className="bc-dark" style={{ background: C.deep, color: C.onDark }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '56px clamp(20px, 4vw, 32px) 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 36, marginBottom: 40 }}>
            <div>
              <div style={{ fontFamily: F.head, fontWeight: 700, fontSize: 22, color: C.white }}>BEYOND CAMP</div>
              <p style={{ margin: '6px 0 0', fontSize: 16 }}>Practical skills for the digital world. A programme of D-Starite Technologies.</p>
            </div>
            <div style={{ fontSize: 16 }}>
              <div style={{ color: C.white, fontWeight: 700, marginBottom: 8 }}>Contact</div>
              <div><a href={`tel:${PHONE_1}`} style={{ color: C.onDark }}>{PHONE_1}</a></div>
              <div><a href={`tel:${PHONE_2}`} style={{ color: C.onDark }}>{PHONE_2}</a></div>
              <div><a href={`mailto:${EMAIL}`} style={{ color: C.onDark }}>{EMAIL}</a></div>
            </div>
            <div style={{ fontSize: 16 }}>
              <div style={{ color: C.white, fontWeight: 700, marginBottom: 8 }}>Learn more</div>
              <div><a href={PRICING_PDF} download={PRICING_PDF_NAME} style={{ color: C.onDark }}>Download pricing guide</a></div>
              <div><Link href={TERMS_HREF} style={{ color: C.onDark }}>Terms and Conditions</Link></div>
              <div><a href={WA_GROUP} target="_blank" rel="noopener noreferrer" style={{ color: C.onDark }}>Free WhatsApp community</a></div>
            </div>
          </div>
          <p style={{ margin: 0, paddingTop: 22, borderTop: '1px solid rgba(255,255,255,0.16)', fontSize: 14.5 }}>
            © {new Date().getFullYear()} D-Starite Technologies.{' '}
            <a href="https://www.dstariteitsolutions.online" style={{ color: C.onDark }}>
              dstariteitsolutions.online
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Price list (used for programmes and bundles)
// ─────────────────────────────────────────────────────────────────────────────
function PriceList({
  items,
  category,
  format,
  onRegister,
}: {
  items: Item[]
  category: Category
  format: Fmt
  onRegister: (id: string) => void
}) {
  return (
    <ul role="list" style={{ listStyle: 'none', padding: 0, margin: '12px 0 0', borderTop: `1px solid ${C.rule}` }}>
      {items.map((it) => {
        const p = priceFor(it, category, format)
        return (
          <li key={it.id} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px 24px', padding: '16px 0', borderBottom: `1px solid ${C.rule}` }}>
            <div style={{ flex: '1 1 220px', minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 19, color: C.ink }}>{it.name}</div>
              <div style={{ fontSize: 15, color: C.muted }}>{it.duration}</div>
            </div>
            <div style={{ flex: '0 0 auto', minWidth: 150 }}>
              <PriceBlock p={p} />
            </div>
            <button type="button" className="bc-btn" onClick={() => onRegister(it.id)} style={{ ...btnOutline, ...btnSmall, flex: '0 0 auto' }}>
              Register
            </button>
          </li>
        )
      })}
    </ul>
  )
}