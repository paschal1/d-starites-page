import styles from "./page.module.css";

const WHATSAPP = "https://chat.whatsapp.com/L6lVZO8ofb7199FF2OnBcp";
const BEYOND_CAMP = "https://www.dstariteitsolutions.online/beyond-camp";
const TERMS = "https://www.dstariteitsolutions.online/beyond-camp/terms";

const WEEKS: { week: string; text: string }[] = [
  { week: "Week 1", text: "Foundations and Excel basics: data types, cleaning, core formulas" },
  { week: "Week 2", text: "Excel for analysis: lookups, logical functions, PivotTables" },
  { week: "Week 3", text: "Excel dashboards and charts, plus mini-project" },
  { week: "Week 4", text: "SQL 1: querying, filtering, sorting, aggregating" },
  { week: "Week 5", text: "SQL 2: joins, subqueries, CTEs" },
  { week: "Week 6", text: "SQL 3: window functions and a business database project" },
  { week: "Week 7", text: "Power BI 1: Power Query and data modelling" },
  { week: "Week 8", text: "Power BI 2: DAX basics and interactive dashboards" },
  { week: "Week 9", text: "Python or R: wrangling, exploration, visualisation" },
  { week: "Week 10", text: "Capstone project, portfolio and presentation" },
];

const AUDIENCE = [
  { title: "For business owners", text: "Understand your sales, customers and costs without guessing." },
  { title: "For career builders", text: "Build a portfolio of real projects and a skill employers hire for." },
  { title: "For professionals", text: "Report faster, present clearer and make better decisions in your current role." },
];

const FACTS = [
  { big: "10 weeks", small: "Hands-on training" },
  { big: "Office or online", small: "In person in Alakahia, or live on Google Meet" },
  { big: "1 Nov 2026", small: "Classes begin" },
  { big: "31 Oct", small: "Registration closes" },
];

export default function DataAnalysisPage() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.wrap}>
          <span className={styles.tag}>D-Starite Technologies · Beyond Camp</span>
          <h1>Data Analysis Masterclass</h1>
          <p>
            Do Not Buy What You Don’t Understand. Read how this 10-week, hands-on programme works, what you will
            build, and how it fits your growth and your business.
          </p>
          <div className={styles.actions}>
            <a className={styles.btn} href={WHATSAPP} target="_blank" rel="noopener noreferrer">
              Join the WhatsApp group
            </a>
            <a className={`${styles.btn} ${styles.btnAlt}`} href="#curriculum">
              See the curriculum
            </a>
          </div>
          <div className={styles.facts}>
            {FACTS.map((f) => (
              <div key={f.big}>
                <b>{f.big}</b>
                {f.small}
              </div>
            ))}
          </div>
        </div>
      </header>

      <section className={styles.section}>
        <div className={styles.wrap}>
          <h2>Why data analysis?</h2>
          <p>
            Most businesses already hold sales records, customer lists and expense sheets. Few turn them into
            decisions. Data analysis lets you see what is working, what is leaking money and what to do next, with
            numbers you can defend.
          </p>
          <div className={styles.grid}>
            {AUDIENCE.map((a) => (
              <div className={styles.card} key={a.title}>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} id="curriculum">
        <div className={styles.wrap}>
          <h2>The 10-week curriculum</h2>
          <ol className={styles.weeks}>
            {WEEKS.map((w) => (
              <li key={w.week}>
                <b>{w.week}</b>
                <span>{w.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.wrap}>
          <h2>Your instructor</h2>
          <div className={styles.instructor}>
            <div className={styles.avatar} aria-hidden="true">PN</div>
            <div>
              <h3>Paschal Nwokeocha</h3>
              <p className={styles.muted}>
                Software Developer and Tech Consultant. Founder, D-Starite Technologies.
              </p>
              <p>
                Paschal has built real software products, from HRMS systems to inventory platforms to client
                websites, and has trained aspiring developers into practitioners. You learn from projects that have
                shipped, not theory alone.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.wrap}>
          <h2>Where classes hold</h2>
          <p>
            Classes are mostly held in person at our office:{" "}
            <b>No 40 Alogwu Road, Alakahia, opposite the MTN mast</b>. If you are not close by, you can join online,
            live on Google Meet.
          </p>

          <h2 className={styles.gap}>Investment</h2>
          <div className={styles.prices}>
            <div className={styles.card}>
              <p>Full programme</p>
              <div className={styles.big}>₦50,000</div>
              <p>10 weeks, in person or online</p>
            </div>
            <div className={styles.card}>
              <p>Pay in instalments</p>
              <div className={styles.big}>
                ₦20,000<small> / month</small>
              </div>
              <p>Total price stays ₦50,000</p>
            </div>
          </div>

          <h2 className={styles.gap}>How to pay</h2>
          <div className={styles.pay}>
            <div><span>Account name</span><b>Nwokeocha Paschal Chikwado</b></div>
            <div><span>Account number</span><b>6058383907</b></div>
            <div><span>Bank</span><b>Moniepoint</b></div>
          </div>
          <p>After payment, send your receipt and full name through the WhatsApp group.</p>
          <a className={styles.btn} href={WHATSAPP} target="_blank" rel="noopener noreferrer">
            Join the WhatsApp group
          </a>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.wrap}>
          <p>
            Explore other tracks: <a href={BEYOND_CAMP}>dstariteitsolutions.online/beyond-camp</a>
            <br />
            Terms: <a href={TERMS}>Beyond Camp terms</a>
          </p>
          <p>With ❤️&amp;💡 from D-Starite Technologies</p>
        </div>
      </footer>
    </main>
  );
}
