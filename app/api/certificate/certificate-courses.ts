/**
 * The certificates you can issue. EDIT THIS FILE to add a programme, course, workshop or webinar.
 * Save as: app/api/certificate/certificate-courses.ts
 *
 *   key          3 or 4 capital letters/digits, unique. NEVER change a key after you have issued certificates:
 *                it is part of the signed certificate number.
 *   group        heading used to group the course in the dropdown
 *   title        what learners pick in the dropdown
 *   heading      the big line printed on the certificate
 *   kind         'completion'    -> "Certificate of Completion" (courses, programmes, career paths)
 *                'participation' -> "Certificate of Participation" (webinars, workshops)
 *   description  one line printed under the heading (keep it under about 130 characters)
 *   fee          certificate fee in naira. 0 = included in the programme fee (the learner requests it on WhatsApp
 *                and you issue the unlock code after checking they completed the programme)
 */
export type CertificateKind = 'completion' | 'participation'

export type Course = {
  key: string
  group: string
  title: string
  heading: string
  kind: CertificateKind
  description: string
  fee: number
}

const PROGRAMMES = 'Beyond Camp programmes'
const PATHS = 'Career paths'
const OTHER = 'Courses, webinars and workshops'

export const COURSES: Course[] = [
  { key: 'WFD', group: PROGRAMMES, title: 'Web Fundamentals', heading: 'Web Fundamentals Programme', kind: 'completion', fee: 0,
    description: 'A practical introduction to HTML, CSS, JavaScript and publishing a first website.' },
  { key: 'FED', group: PROGRAMMES, title: 'Frontend Development', heading: 'Frontend Development Programme', kind: 'completion', fee: 0,
    description: 'Building and deploying responsive web applications with HTML, CSS, JavaScript, React and Next.js.' },
  { key: 'BED', group: PROGRAMMES, title: 'Backend Development', heading: 'Backend Development Programme', kind: 'completion', fee: 0,
    description: 'Building APIs with databases and authentication using Node.js and NestJS.' },
  { key: 'FSD', group: PROGRAMMES, title: 'Full-Stack Development', heading: 'Full-Stack Development Programme', kind: 'completion', fee: 0,
    description: 'Building and deploying complete full-stack applications, from interface to database.' },
  { key: 'AIA', group: PROGRAMMES, title: 'AI Automation', heading: 'AI Automation Programme', kind: 'completion', fee: 0,
    description: 'Using AI tools and automation platforms to build practical business workflows.' },
  { key: 'DAN', group: PROGRAMMES, title: 'Data Analysis', heading: 'Data Analysis Programme', kind: 'completion', fee: 0,
    description: 'Analysing data and presenting findings with Excel, SQL and Power BI.' },
  { key: 'UIX', group: PROGRAMMES, title: 'UI/UX Design', heading: 'UI/UX Design Programme', kind: 'completion', fee: 0,
    description: 'User research, wireframing, Figma and interactive prototyping for digital products.' },
  { key: 'MOB', group: PROGRAMMES, title: 'Mobile Development', heading: 'Mobile Development Programme', kind: 'completion', fee: 0,
    description: 'Building cross-platform mobile applications with Flutter and Firebase.' },

  { key: 'FCP', group: PATHS, title: 'Frontend Career Path', heading: 'Frontend Career Path', kind: 'completion', fee: 0,
    description: 'A combined career path of related Beyond Camp programmes in frontend development.' },
  { key: 'ADP', group: PATHS, title: 'AI + Data Path', heading: 'AI + Data Career Path', kind: 'completion', fee: 0,
    description: 'A combined career path of related Beyond Camp programmes in AI and data.' },
  { key: 'PDP', group: PATHS, title: 'Product Design Path', heading: 'Product Design Career Path', kind: 'completion', fee: 0,
    description: 'A combined career path of related Beyond Camp programmes in product design.' },
  { key: 'SDP', group: PATHS, title: 'Software Developer Path', heading: 'Software Developer Career Path', kind: 'completion', fee: 0,
    description: 'A combined career path of related Beyond Camp programmes in software development.' },
  { key: 'CTP', group: PATHS, title: 'Complete Tech Pass', heading: 'Complete Tech Pass', kind: 'completion', fee: 0,
    description: 'A broad, combined path across several Beyond Camp technology programmes.' },

  { key: 'CFD', group: OTHER, title: 'Computer Fundamentals', heading: 'Computer Fundamentals Course', kind: 'completion', fee: 0,
    description: 'A practical introduction to computers, the internet and essential digital skills.' },
  { key: 'AIB', group: OTHER, title: 'AI in Business Webinar', heading: 'AI in Business Webinar', kind: 'participation', fee: 3000,
    description: 'An intensive online programme on applying Artificial Intelligence in modern business practice.' },
]

export const courseByKey = (key: unknown): Course | undefined =>
  typeof key === 'string' ? COURSES.find((c) => c.key === key.toUpperCase()) : undefined