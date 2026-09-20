'use client'

/**
 * Beyond Camp: Terms and Conditions (Version 1.0, effective September 2026)
 *
 * A self-contained, inline-styled page. To edit the wording, change the `TERMS` object below.
 * Clause numbers (`n`) and the "Section x.y" cross-references are plain text, so if you insert or
 * remove a clause, renumber the ones after it. Cross-references become links automatically.
 *
 * The downloadable PDF lives at `public/beyond-camp-terms-and-conditions.pdf`.
 */
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
type Block =
  | { t: 'p'; text: string }
  | { t: 'list'; style: 'bullet' | 'alpha'; items: string[] }
  | { t: 'table'; head: string[] | null; rows: string[][]; widths: number[]; boldFirst?: boolean }
  | { t: 'callout'; title?: string; paras?: string[]; items?: string[]; note?: string }
  | { t: 'quote'; label: string; text: string }
  | { t: 'scale'; items: { pct: string; label: string; tone: number }[] }
  | { t: 'values'; items: { h: string; d: string }[] }
  | { t: 'clause'; n: string; id?: string | null; title: string; text?: string | null; blocks: Block[] }

type Section = { id: string; num: string; title: string; blocks: Block[] }

type TermsDoc = {
  brand: string
  tagline: string
  title: string
  operator: string
  version: string
  effective: string
  intro: string
  summary: { title: string; items: string[]; note: string }
  sections: Section[]
  closing: string
  pdfHref: string
  pdfFile: string
}

// ─────────────────────────────────────────────────────────────────────────────
// Content
// Inline markup inside any text: **bold**, [label](url).
// ─────────────────────────────────────────────────────────────────────────────
const TERMS: TermsDoc = {
  "brand": "BEYOND CAMP",
  "tagline": "Tech & Digital Skills Academy",
  "title": "Terms and Conditions",
  "operator": "A programme of D-Starite Technologies",
  "version": "Version 1.0",
  "effective": "Effective September 2026",
  "intro": "These Terms and Conditions (“Terms”) are the agreement between you and Beyond Camp Tech & Digital Skills Academy (“Beyond Camp”, “we”, “us”, “our”) for every paid programme you register for. Please read them before you pay. By completing registration or making any payment, you confirm that you have read, understood and accepted them.",
  "summary": {
    "title": "The short version",
    "items": [
      "We charge fair fees so we can deliver live, practical training with competent instructors.",
      "If we fail to deliver what you paid for, for example the instructor never shows up and no replacement is provided, you are entitled to a refund (Section 7.2).",
      "If you try the programme and it is not right for you, you can ask for a partial refund within 30 days of the start date (Section 7.4).",
      "Fees are not refundable if you did not attend, stopped attending or ask after the first month (Section 7.6).",
      "Completing a programme does not guarantee a job, client or income (Section 9.2)."
    ],
    "note": "This summary is for convenience only. The full Terms below apply."
  },
  "closing": "Thank you for learning with Beyond Camp. Practical skills for the digital world.",
  "pdfHref": "/beyond-camp-terms-and-conditions.pdf",
  "pdfFile": "beyond-camp-terms-and-conditions.pdf",
  "sections": [
    {
      "id": "about",
      "title": "About Beyond Camp and These Terms",
      "blocks": [
        {
          "t": "clause",
          "id": null,
          "title": "Who we are",
          "text": "Beyond Camp Tech & Digital Skills Academy is a practical technology learning community for undergraduates, NYSC members, graduates and working professionals. It is operated by D-Starite Technologies (“D-Starite”), a Nigerian IT solutions and technology education company, through the D-Starite Technologies Academy.",
          "blocks": [],
          "n": "1.1"
        },
        {
          "t": "clause",
          "id": null,
          "title": "What these Terms cover",
          "text": "These Terms apply to every paid Beyond Camp programme and career bundle, in the Online, Offline and Hybrid formats, and to the cohorts, workshops and learning resources connected to them.",
          "blocks": [],
          "n": "1.2"
        },
        {
          "t": "clause",
          "id": null,
          "title": "Cohort details",
          "text": "Prices, dates, timetables and payment plans are confirmed for each cohort before you pay. If the cohort details we send you in writing differ from the general information on our website or in our prospectus, the cohort details apply. These Terms, including the Refund Policy in Section 7, apply in every case.",
          "blocks": [],
          "n": "1.3"
        },
        {
          "t": "clause",
          "id": null,
          "title": "Acceptance",
          "text": "You accept these Terms when you complete registration or make any payment. If you are paying on behalf of someone else, you confirm that you have their authority and that they will be bound by these Terms.",
          "blocks": [],
          "n": "1.4"
        }
      ],
      "num": "1"
    },
    {
      "id": "mission",
      "title": "Our Mission and Values",
      "blocks": [
        {
          "t": "quote",
          "label": "Our mission",
          "text": "To make practical technology education accessible and effective, helping students, NYSC members, graduates and working professionals build real digital skills, complete real projects and grow a portfolio that opens doors, through live instruction, mentorship and community."
        },
        {
          "t": "p",
          "text": "Everything in these Terms follows from six values."
        },
        {
          "t": "values",
          "items": [
            {
              "h": "Practical first",
              "d": "We teach by building. Every module should answer one question: what can the learner do now that they could not do before?"
            },
            {
              "h": "Genuine value",
              "d": "Our fees exist to deliver instruction and support that are worth what you pay. When we do not deliver, we make it right. That is the principle behind our Refund Policy."
            },
            {
              "h": "Affordable, not cheap",
              "d": "We keep programmes accessible, including discounted student and NYSC rates, while charging enough to pay competent instructors and deliver every cohort well."
            },
            {
              "h": "Honesty and transparency",
              "d": "We publish our prices and terms clearly, and we never promise jobs, clients or guaranteed income."
            },
            {
              "h": "Community and mentorship",
              "d": "People learn faster together. We build a supportive learning community around every cohort."
            },
            {
              "h": "Respect and integrity",
              "d": "We treat learners, instructors and partners with respect, and we expect the same in return."
            }
          ]
        }
      ],
      "num": "2"
    },
    {
      "id": "definitions",
      "title": "Definitions",
      "blocks": [
        {
          "t": "p",
          "text": "In these Terms, the following words have these meanings."
        },
        {
          "t": "table",
          "head": [
            "Term",
            "Meaning"
          ],
          "widths": [
            0.26,
            0.74
          ],
          "boldFirst": true,
          "rows": [
            [
              "Programme",
              "Any course or career bundle offered by Beyond Camp, for example Frontend Development or the Complete Tech Pass."
            ],
            [
              "Cohort",
              "A group of learners taking a Programme together on a defined schedule."
            ],
            [
              "Format",
              "Online (live remote classes), Offline (physical classroom sessions) or Hybrid (a combination of both)."
            ],
            [
              "Fee",
              "The total amount payable for a Programme in your chosen Format, after any approved discount."
            ],
            [
              "Commencement Date",
              "The date of the first live session of your Cohort, as confirmed by Beyond Camp."
            ],
            [
              "Learner, you",
              "The person registered to attend a Programme."
            ],
            [
              "Instructor",
              "A lead trainer, teaching assistant, guest mentor or other person engaged by Beyond Camp to deliver a Programme."
            ],
            [
              "Working Day",
              "Monday to Friday, excluding public holidays in Nigeria."
            ],
            [
              "Official Channels",
              "The bank accounts, payment links, email addresses and website published or confirmed by Beyond Camp (see Section 6.2)."
            ]
          ]
        }
      ],
      "num": "3"
    },
    {
      "id": "registration",
      "title": "Registration and Eligibility",
      "blocks": [
        {
          "t": "clause",
          "id": null,
          "title": "Confirming your place",
          "text": "Your place is confirmed only when you have:",
          "blocks": [
            {
              "t": "list",
              "style": "alpha",
              "items": [
                "chosen a Programme, Format and Cohort;",
                "submitted accurate registration details;",
                "paid the full Fee, or the first instalment where an instalment plan is approved; and",
                "received confirmation from Beyond Camp."
              ]
            }
          ],
          "n": "4.1"
        },
        {
          "t": "clause",
          "id": null,
          "title": "Age",
          "text": "Learners must be at least 18 years old. A Learner under 18 may register only with the written consent of a parent or guardian, who is responsible for the Fee and for making sure these Terms are observed.",
          "blocks": [],
          "n": "4.2"
        },
        {
          "t": "clause",
          "id": null,
          "title": "Accurate information",
          "text": "You must give accurate and current information. We may cancel a registration that contains false information.",
          "blocks": [],
          "n": "4.3"
        },
        {
          "t": "clause",
          "id": null,
          "title": "Student and NYSC rates",
          "text": "Discounted rates are offered to eligible students and NYSC members on selected Programmes and Cohorts, and availability may vary. We may ask for proof of eligibility, such as a valid student ID or NYSC identification, before payment. If eligibility is not confirmed, or the information given is false, the standard Fee applies. We may withdraw the discount, require payment of the difference or cancel the registration. Discounts cannot be combined unless Beyond Camp management approves in writing.",
          "blocks": [],
          "n": "4.4"
        },
        {
          "t": "clause",
          "id": null,
          "title": "Limited places",
          "text": "Cohorts are kept small so that practical support stays effective. Places are given to confirmed registrations only.",
          "blocks": [],
          "n": "4.5"
        }
      ],
      "num": "4"
    },
    {
      "id": "programmes",
      "title": "Programmes, Formats and Schedule",
      "blocks": [
        {
          "t": "clause",
          "id": null,
          "title": "Duration and format",
          "text": "Programme durations range from 6 weeks to 24–32 weeks, depending on the Programme, and are published for each Programme. The Online, Offline and Hybrid Formats of the same Programme follow the same academic duration.",
          "blocks": [],
          "n": "5.1"
        },
        {
          "t": "clause",
          "id": null,
          "title": "Class schedule",
          "text": "Standard live classes are held three times a week, on Monday, Wednesday and Thursday, usually in two-hour sessions in either a morning or a late-afternoon slot. The exact timetable for your Cohort is confirmed before it begins. Where necessary, we may adjust session times by agreement with the Cohort while keeping the planned learning hours.",
          "blocks": [],
          "n": "5.2"
        },
        {
          "t": "clause",
          "id": "receive",
          "title": "What you receive",
          "text": "Every Learner receives:",
          "blocks": [
            {
              "t": "list",
              "style": "bullet",
              "items": [
                "a structured curriculum with clear weekly outcomes;",
                "live instructor-led sessions, with replay access where applicable;",
                "practical assignments and real-world projects, including a capstone or final project;",
                "instructor Q&A and support within the agreed support window;",
                "access to the learning community;",
                "portfolio, CV and career guidance;",
                "a project presentation or demo opportunity where applicable; and",
                "a certificate, subject to the requirements in Section 9.1."
              ]
            }
          ],
          "n": "5.3"
        },
        {
          "t": "clause",
          "id": null,
          "title": "Programme updates",
          "text": "Technology changes quickly. We may update the curriculum, tools, examples and schedule to reflect industry changes, Instructor availability and Cohort needs, provided the published Programme outcomes are maintained.",
          "blocks": [],
          "n": "5.4"
        },
        {
          "t": "clause",
          "id": null,
          "title": "Instructors and substitutions",
          "text": "Programmes are delivered by qualified Instructors. If an Instructor is unavailable, we will tell you as early as we can and arrange a suitably qualified substitute or a make-up session.",
          "blocks": [],
          "n": "5.5"
        },
        {
          "t": "clause",
          "id": "postponement",
          "title": "Minimum enrolment and postponement",
          "text": "To keep a Cohort viable, we may postpone or cancel it if too few Learners have enrolled to run it properly, and we will tell you promptly. If we cancel a Cohort, or postpone its Commencement Date by more than 14 days, you may choose a full refund or a transfer under Section 7.2.",
          "blocks": [],
          "n": "5.6"
        }
      ],
      "num": "5"
    },
    {
      "id": "fees",
      "title": "Fees and Payment",
      "blocks": [
        {
          "t": "clause",
          "id": null,
          "title": "Fees",
          "text": "Fees are stated in Nigerian Naira (₦) and depend on the Programme and Format you choose. The Fee that applies to you is the one confirmed for your Cohort at registration. We may change prices for future Cohorts; a change does not affect a Fee you have already paid or that we have confirmed to you in writing.",
          "blocks": [],
          "n": "6.1"
        },
        {
          "t": "clause",
          "id": "official",
          "title": "Pay through Official Channels only",
          "text": "Pay only through the Official Channels. Instructors, volunteers and other individuals are not authorised to collect payments, negotiate discounts or change published Fees. Money paid to any other person or account is not payment to Beyond Camp. If someone asks you to pay outside the Official Channels, please report it to us straight away.",
          "blocks": [],
          "n": "6.2"
        },
        {
          "t": "clause",
          "id": "instalments",
          "title": "Instalments",
          "text": "Selected Programmes may be paid in approved instalments. The standard plan has two payments:",
          "blocks": [
            {
              "t": "list",
              "style": "bullet",
              "items": [
                "**First instalment:** 80% of the Fee, before the Commencement Date.",
                "**Second instalment:** 20% of the Fee, three weeks after the first instalment."
              ]
            },
            {
              "t": "p",
              "text": "For example, on a ₦75,000 Programme the first instalment is ₦60,000 and the second is ₦15,000. Some higher-value Programmes may be offered a three-payment plan, which we will confirm in writing before you enrol. Your place is confirmed after the first instalment and completed registration. Each later instalment remains payable on its due date. An instalment plan makes a Programme easier to afford; it does not reduce the Fee. Any other payment arrangement must be approved by Beyond Camp before you enrol."
            }
          ],
          "n": "6.3"
        },
        {
          "t": "clause",
          "id": null,
          "title": "Late payment",
          "text": "If an instalment is overdue, we may suspend your access to live sessions, replays and the learning community until it is paid, and we may withhold your certificate until the Fee is paid in full.",
          "blocks": [],
          "n": "6.4"
        },
        {
          "t": "clause",
          "id": null,
          "title": "What the Fee does not cover",
          "text": "The Fee covers your Programme only. It does not cover your own laptop or devices, internet data, power, transport or personal software subscriptions, unless we say so. A laptop is strongly recommended for development, data and UI/UX Programmes, and stable internet access is needed for Online Programmes. Specific technical requirements are shared before each Cohort begins.",
          "blocks": [],
          "n": "6.5"
        },
        {
          "t": "clause",
          "id": null,
          "title": "Proof of payment",
          "text": "We will confirm receipt of your payment. Keep your proof of payment, because you will need it for any refund request.",
          "blocks": [],
          "n": "6.6"
        }
      ],
      "num": "6"
    },
    {
      "id": "refunds",
      "title": "Refund Policy",
      "blocks": [
        {
          "t": "clause",
          "id": "approach",
          "title": "Our approach",
          "text": "Your Fee pays for real delivery costs: Instructor fees, data and internet, fuel and power (especially for Offline classes), software and platforms, learning materials, payment charges and administration. Many of these costs are committed for the whole Cohort as soon as it starts, whether or not an individual Learner continues. Our refund policy therefore follows three simple principles:",
          "blocks": [
            {
              "t": "list",
              "style": "bullet",
              "items": [
                "If we do not deliver the value you paid for, we refund you.",
                "If the value was delivered and you were not there to receive it, we cannot refund it.",
                "If you try the Programme and it is not right for you, you have a fair first-month window for a partial refund."
              ]
            }
          ],
          "n": "7.1"
        },
        {
          "t": "clause",
          "id": "refund-a",
          "title": "Route A: when we do not deliver",
          "text": "You are entitled to a refund if Beyond Camp fails to deliver the Programme you paid for. This includes the following situations:",
          "blocks": [
            {
              "t": "list",
              "style": "alpha",
              "items": [
                "we cancel the Cohort before it begins, or postpone the Commencement Date by more than 14 days and you do not accept the new date;",
                "the Instructor does not show up for scheduled sessions, and we do not provide a make-up session or a suitably qualified substitute within 7 days of the missed session; or",
                "the Programme stops, or is materially different from what was advertised (for example, core modules are left out), and we do not put it right within 14 days of you telling us."
              ]
            },
            {
              "t": "p",
              "text": "**What you receive.** If no live session was delivered, you receive a full refund of all Fees paid. If part of the Programme was delivered, you receive a refund for the part that was not, calculated by the share of scheduled sessions or modules that were missed. You may choose a transfer instead (Section 7.9). Please tell us within 14 days of the missed session or event so that we can put it right quickly."
            }
          ],
          "n": "7.2"
        },
        {
          "t": "clause",
          "id": "not-failure",
          "title": "What is not a failure by Beyond Camp",
          "text": "Route A does not apply where the value was made available and you were not there to receive it. In particular, it does not apply where:",
          "blocks": [
            {
              "t": "list",
              "style": "bullet",
              "items": [
                "you did not attend, joined late or left early, or did not watch the replay;",
                "you could not take part because of your own device, internet, power, schedule or travel problems;",
                "a session was rescheduled by agreement, or was made up or covered by a substitute as described in Section 7.2(b);",
                "a session was delayed or disrupted by events beyond our reasonable control and was rescheduled within a reasonable time (Section 12.2); or",
                "the pace or level of a session that was delivered is different from what you expected. Route B may help in that case."
              ]
            }
          ],
          "n": "7.3"
        },
        {
          "t": "clause",
          "id": "refund-b",
          "title": "Route B: first-month partial refund",
          "text": "If, within the first 30 days after the Commencement Date, you find the Programme is not right for you (you do not like the training, or you cannot follow it despite a genuine effort), you may request a partial refund. To qualify:",
          "blocks": [
            {
              "t": "list",
              "style": "alpha",
              "items": [
                "you must send your request in writing within 30 days of the Commencement Date (or at any time before it, if you wish to withdraw before the Programme starts); and",
                "if the Programme has started, you must have attended the live sessions held so far, or watched the replays, and made a genuine attempt at the exercises."
              ]
            },
            {
              "t": "p",
              "text": "Before we process your request, we will invite you to a short conversation and offer catch-up help from the Instructor or support team. You are free to decline, and declining does not affect your right to a refund."
            },
            {
              "t": "p",
              "text": "The refund is partial because the costs described in Section 7.1 are already committed to your Cohort. We refund a percentage of the Fees you have paid, depending on when your request reaches us:"
            },
            {
              "t": "scale",
              "items": [
                {
                  "pct": "90%",
                  "label": "Before the Commencement Date",
                  "tone": 0
                },
                {
                  "pct": "70%",
                  "label": "Days 1 to 14 after the Commencement Date",
                  "tone": 1
                },
                {
                  "pct": "50%",
                  "label": "Days 15 to 30 after the Commencement Date",
                  "tone": 2
                },
                {
                  "pct": "0%",
                  "label": "After day 30 (Route A still applies if we failed to deliver)",
                  "tone": 3
                }
              ]
            },
            {
              "t": "callout",
              "title": "Worked examples",
              "paras": [
                "**Paid in full.** A Learner who has paid the full ₦75,000 Fee for Frontend Development (Online) asks for a refund on day 10. The refund is 70%, which is ₦52,500. On day 20, the refund would be 50%, which is ₦37,500.",
                "**Paying by instalments.** A Learner who has paid the ₦60,000 first instalment asks for a refund on day 10. The refund is 70% of ₦60,000, which is ₦42,000, and the unpaid ₦15,000 balance is no longer due."
              ]
            }
          ],
          "n": "7.4"
        },
        {
          "t": "clause",
          "id": "calc",
          "title": "Instalments, bundles and discounts",
          "text": "Refunds are always calculated on the amount you have actually paid.",
          "blocks": [
            {
              "t": "list",
              "style": "alpha",
              "items": [
                "When a Route B refund is approved, any unpaid instalment is cancelled and is no longer due.",
                "If you withdraw after the 30-day window and Route A does not apply, unpaid instalments remain payable, because your place was reserved for the whole Cohort.",
                "For Career Bundles, the refund applies to the whole bundle within the same time limits.",
                "For discounted student or NYSC Fees, the refund is calculated on the discounted amount you paid."
              ]
            }
          ],
          "n": "7.5"
        },
        {
          "t": "clause",
          "id": "no-refund",
          "title": "When refunds are not available",
          "text": "Except under Route A, we do not refund Fees where:",
          "blocks": [
            {
              "t": "list",
              "style": "bullet",
              "items": [
                "the request is made more than 30 days after the Commencement Date;",
                "you did not attend, stopped attending, lost interest, or your availability or circumstances changed;",
                "you were suspended or removed from the Programme for a breach of Section 8;",
                "you completed the Programme or have received your certificate;",
                "you are dissatisfied that a job, client or income did not follow (see Section 9.2); or",
                "the payment was made to a person or account that is not an Official Channel."
              ]
            },
            {
              "t": "p",
              "text": "In a genuine emergency, such as serious illness or bereavement, we may at our discretion offer a transfer to a later Cohort. This is not a right and is decided case by case."
            }
          ],
          "n": "7.6"
        },
        {
          "t": "clause",
          "id": "request",
          "title": "How to request a refund",
          "text": "Email [info@dstariteitsolutions.online](mailto:info@dstariteitsolutions.online) with the subject line “Refund request – [Programme] – [Cohort]”, and include:",
          "blocks": [
            {
              "t": "list",
              "style": "alpha",
              "items": [
                "your full name and the email address or phone number you registered with;",
                "the Programme, Format and Cohort;",
                "your proof of payment;",
                "whether you are asking under Route A or Route B, and your reasons; and",
                "the details of the bank account for the refund."
              ]
            },
            {
              "t": "p",
              "text": "Refunds are paid to the account used to make the payment, or to a bank account in the Learner’s own name."
            }
          ],
          "n": "7.7"
        },
        {
          "t": "clause",
          "id": null,
          "title": "Refund timelines",
          "text": "We will acknowledge your request within 3 Working Days, tell you our decision within 7 Working Days of receiving everything we need, and pay approved refunds by bank transfer in Naira within 14 Working Days of approval.",
          "blocks": [],
          "n": "7.8"
        },
        {
          "t": "clause",
          "id": "transfer",
          "title": "Transfer instead of a refund",
          "text": "Instead of a refund, you may ask to transfer to a later Cohort of the same Programme, and we may offer a transfer where it suits you better. A transfer is subject to available places, must be agreed in writing, and may involve a difference in Fee if prices have changed.",
          "blocks": [],
          "n": "7.9"
        }
      ],
      "num": "7"
    },
    {
      "id": "conduct",
      "title": "Learner Responsibilities and Conduct",
      "blocks": [
        {
          "t": "clause",
          "id": null,
          "title": "Your responsibilities",
          "text": "To get the most from a Programme, you should:",
          "blocks": [
            {
              "t": "list",
              "style": "bullet",
              "items": [
                "attend live sessions on time, or use the replays where available;",
                "complete assignments, projects and the capstone by the dates set;",
                "make sure you meet the technical requirements for your Programme;",
                "ask for help early if you are struggling, because Instructors and the support team are there for that; and",
                "submit your own original work and follow the instructions for using AI tools and third-party code."
              ]
            }
          ],
          "n": "8.1"
        },
        {
          "t": "clause",
          "id": null,
          "title": "Code of conduct",
          "text": "We expect respect, professionalism and honesty from every Learner. You must not:",
          "blocks": [
            {
              "t": "list",
              "style": "bullet",
              "items": [
                "harass, discriminate against, threaten or insult Instructors, staff or other Learners;",
                "disrupt classes or community spaces;",
                "plagiarise, or submit someone else’s work as your own;",
                "share access links, login details, materials or recordings with anyone who has not paid for the Programme;",
                "make payments or private arrangements with Instructors outside the Official Channels; or",
                "use Beyond Camp platforms or events for unlawful activity, spam or unauthorised advertising."
              ]
            }
          ],
          "n": "8.2"
        },
        {
          "t": "clause",
          "id": null,
          "title": "Consequences",
          "text": "We may warn, suspend or remove a Learner who breaches these rules, and in serious cases removal is immediate. A Learner removed for misconduct is not entitled to a refund, and any unpaid instalments remain due.",
          "blocks": [],
          "n": "8.3"
        },
        {
          "t": "clause",
          "id": null,
          "title": "Reporting concerns",
          "text": "If an Instructor or anyone else asks you for an unofficial payment or behaves improperly, tell us at [info@dstariteitsolutions.online](mailto:info@dstariteitsolutions.online) so we can act.",
          "blocks": [],
          "n": "8.4"
        }
      ],
      "num": "8"
    },
    {
      "id": "certificate-outcomes",
      "title": "Certification and Outcomes",
      "blocks": [
        {
          "t": "clause",
          "id": "certificate",
          "title": "Certificates",
          "text": "A certificate is issued to Learners who meet the completion requirements of their Programme. These are communicated at the start of the Cohort and usually include:",
          "blocks": [
            {
              "t": "list",
              "style": "alpha",
              "items": [
                "sufficient attendance;",
                "completion of the assignments;",
                "submission of the capstone or final project; and",
                "payment of the Fee in full."
              ]
            }
          ],
          "n": "9.1"
        },
        {
          "t": "clause",
          "id": "outcomes",
          "title": "No guarantee of outcomes",
          "text": "Beyond Camp provides structured training, practical experience and career guidance. Completing a Programme does not guarantee a job, client, income level or employment outcome. Your results depend on your effort, practice, project quality, portfolio, communication and continued learning.",
          "blocks": [],
          "n": "9.2"
        }
      ],
      "num": "9"
    },
    {
      "id": "ip",
      "title": "Intellectual Property and Recordings",
      "blocks": [
        {
          "t": "clause",
          "id": null,
          "title": "Our materials",
          "text": "The curriculum, slides, notes, recordings, templates, assessments and branding belong to Beyond Camp, D-Starite or their licensors. We give you a personal, non-transferable licence to use them for your own learning. You may not copy, resell, publish or share them without our written permission.",
          "blocks": [],
          "n": "10.1"
        },
        {
          "t": "clause",
          "id": null,
          "title": "Your work",
          "text": "You own the projects, code and designs you create during a Programme, and we will not use your work commercially without your permission. You allow us to review and assess your work and to show capstone demonstrations within your Cohort. We will ask for your consent before featuring your work, name or photo in marketing or testimonials.",
          "blocks": [],
          "n": "10.2"
        },
        {
          "t": "clause",
          "id": null,
          "title": "Recordings",
          "text": "Live sessions may be recorded to provide replays and to maintain quality. Your voice, image and chat messages may appear in recordings that are available to your Cohort. If you have concerns, please tell us before your first session.",
          "blocks": [],
          "n": "10.3"
        }
      ],
      "num": "10"
    },
    {
      "id": "privacy",
      "title": "Privacy and Data Protection",
      "blocks": [
        {
          "t": "clause",
          "id": null,
          "title": "What we collect",
          "text": "We collect your name and contact details, identification used to verify student or NYSC status, payment records, attendance, assignments and projects, and our communications with you.",
          "blocks": [],
          "n": "11.1"
        },
        {
          "t": "clause",
          "id": null,
          "title": "How we use it",
          "text": "We use your information to register you, deliver and support your Programme, verify eligibility, process payments and refunds, issue certificates, communicate with you and improve our Programmes. We send marketing messages only where you agree, and you can unsubscribe at any time. We do not sell your personal data.",
          "blocks": [],
          "n": "11.2"
        },
        {
          "t": "clause",
          "id": null,
          "title": "Who we share it with",
          "text": "We share your information only with Instructors and service providers who need it, such as meeting platforms, payment providers and email services, and where the law requires it.",
          "blocks": [],
          "n": "11.3"
        },
        {
          "t": "clause",
          "id": null,
          "title": "Your rights",
          "text": "We handle personal data in line with the Nigeria Data Protection Act 2023. Subject to legal and record-keeping requirements, you may ask to access, correct or delete your data, object to certain uses, or withdraw your consent by contacting us. You may also complain to the Nigeria Data Protection Commission.",
          "blocks": [],
          "n": "11.4"
        },
        {
          "t": "clause",
          "id": null,
          "title": "Security and retention",
          "text": "We use reasonable measures to protect your data, and we keep it only as long as needed for the purposes above and for legal, tax and accounting records.",
          "blocks": [],
          "n": "11.5"
        }
      ],
      "num": "11"
    },
    {
      "id": "liability",
      "title": "Limitation of Liability and Events Beyond Our Control",
      "blocks": [
        {
          "t": "clause",
          "id": null,
          "title": "Limitation of liability",
          "text": "We deliver our Programmes with reasonable skill and care. To the extent the law allows, Beyond Camp is not liable for indirect or consequential loss, such as lost income or opportunities, or for loss caused by your own devices, internet or power, or by failures of third-party platforms. Our total liability in connection with a Programme is limited to the Fees you paid for it. Nothing in these Terms limits liability that cannot be limited by law, including liability for fraud.",
          "blocks": [],
          "n": "12.1"
        },
        {
          "t": "clause",
          "id": "force-majeure",
          "title": "Events beyond our control",
          "text": "We are not in breach of these Terms where delivery is delayed or disrupted by events beyond our reasonable control, such as prolonged power or network outages, natural disasters, civil unrest, government action or public-health restrictions. In those cases we will reschedule the affected sessions, or move them online where possible. If we cannot deliver within a reasonable time, Route A (Section 7.2) applies.",
          "blocks": [],
          "n": "12.2"
        },
        {
          "t": "clause",
          "id": null,
          "title": "Personal property",
          "text": "At Offline and Hybrid sessions you are responsible for your laptop, devices and belongings. We are not liable for loss or damage unless it is caused by our negligence.",
          "blocks": [],
          "n": "12.3"
        }
      ],
      "num": "12"
    },
    {
      "id": "disputes",
      "title": "Complaints and Dispute Resolution",
      "blocks": [
        {
          "t": "clause",
          "id": null,
          "title": "Raise it with us first",
          "text": "If you have a concern, email [info@dstariteitsolutions.online](mailto:info@dstariteitsolutions.online). We will acknowledge it within 3 Working Days and aim to resolve it within 14 Working Days.",
          "blocks": [],
          "n": "13.1"
        },
        {
          "t": "clause",
          "id": "escalation",
          "title": "Escalation",
          "text": "If you are not satisfied, ask us to escalate your complaint to management. Both sides agree to try to settle any dispute by good-faith discussion or mediation before going to court.",
          "blocks": [],
          "n": "13.2"
        },
        {
          "t": "clause",
          "id": null,
          "title": "Governing law",
          "text": "These Terms are governed by the laws of the Federal Republic of Nigeria. The courts of Nigeria have jurisdiction over any dispute that is not resolved under Section 13.2.",
          "blocks": [],
          "n": "13.3"
        }
      ],
      "num": "13"
    },
    {
      "id": "changes",
      "title": "Changes to These Terms",
      "blocks": [
        {
          "t": "clause",
          "id": null,
          "title": "Updates",
          "text": "We may update these Terms as our Programmes and the law change. The current version, with its version number and effective date, is always published on our website. Updated Terms apply to registrations made after the effective date. For Learners already enrolled, changes to Fees and refund rights do not apply to that Cohort unless they are more favourable to the Learner.",
          "blocks": [],
          "n": "14.1"
        }
      ],
      "num": "14"
    },
    {
      "id": "general",
      "title": "General Provisions",
      "blocks": [
        {
          "t": "clause",
          "id": null,
          "title": "Entire agreement",
          "text": "These Terms, together with the cohort details confirmed to you in writing, are the whole agreement between you and Beyond Camp about the Programme.",
          "blocks": [],
          "n": "15.1"
        },
        {
          "t": "clause",
          "id": null,
          "title": "Severability",
          "text": "If any part of these Terms is found to be unenforceable, the rest remains in force.",
          "blocks": [],
          "n": "15.2"
        },
        {
          "t": "clause",
          "id": null,
          "title": "No waiver",
          "text": "If we do not enforce a right straight away, we do not lose it.",
          "blocks": [],
          "n": "15.3"
        },
        {
          "t": "clause",
          "id": null,
          "title": "Transfer of rights",
          "text": "You may not transfer your place or your rights to someone else without our written approval. We may transfer our rights and duties to D-Starite or to a successor operator of the Academy.",
          "blocks": [],
          "n": "15.4"
        },
        {
          "t": "clause",
          "id": null,
          "title": "Electronic communication",
          "text": "We may communicate with you by email, messaging platforms or our website, and you agree that these count as written communication.",
          "blocks": [],
          "n": "15.5"
        }
      ],
      "num": "15"
    },
    {
      "id": "contact",
      "title": "Contact Us",
      "blocks": [
        {
          "t": "p",
          "text": "Questions about these Terms, or a refund or complaint to raise? Reach us here."
        },
        {
          "t": "table",
          "head": null,
          "widths": [
            0.26,
            0.74
          ],
          "boldFirst": true,
          "rows": [
            [
              "Organisation",
              "Beyond Camp Tech & Digital Skills Academy, a programme of D-Starite Technologies"
            ],
            [
              "Email",
              "[info@dstariteitsolutions.online](mailto:info@dstariteitsolutions.online)"
            ],
            [
              "Website",
              "[dstariteitsolutions.online/beyond-camp](https://dstariteitsolutions.online/beyond-camp)"
            ],
            [
              "Refund requests",
              "Email us with the subject line and details described in Section 7.7."
            ]
          ]
        }
      ],
      "num": "16"
    }
  ]
}

// ─────────────────────────────────────────────────────────────────────────────
// Design tokens
// ─────────────────────────────────────────────────────────────────────────────
const C = {
  forest: '#1E4D35',
  leaf: '#2F7A4F',
  link: '#25693F',
  tint: '#E3EFDC',
  mist: '#F3F8F0',
  sage: '#BBD8AE',
  grey: '#E7EAE7',
  ink: '#1C2420',
  muted: '#5A675E',
  rule: '#CFD9D1',
  onForest: '#D8E9CF',
  white: '#FFFFFF',
}

const F = {
  head: 'Cambria, Caladea, Georgia, "Times New Roman", serif',
  body: 'Calibri, Carlito, "Segoe UI", system-ui, -apple-system, Roboto, "Helvetica Neue", Arial, sans-serif',
}

/** Distance from the top of the viewport for the sticky contents list. Raise it if your site has a fixed header. */
const STICKY_TOP = 24

const SECTION_ID_BY_NUM: Record<string, string> = Object.fromEntries(TERMS.sections.map((s) => [s.num, s.id]))
const SECTION_IDS = TERMS.sections.map((s) => s.id)
const clauseAnchor = (n: string) => `clause-${n.replace('.', '-')}`

// ─────────────────────────────────────────────────────────────────────────────
// Hooks
// ─────────────────────────────────────────────────────────────────────────────
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

function useActiveSection(ids: string[], enabled: boolean): string {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    if (!enabled || typeof IntersectionObserver === 'undefined') return
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-12% 0px -78% 0px' },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids, enabled])
  return active
}

// ─────────────────────────────────────────────────────────────────────────────
// Inline text: **bold**, [label](url), and "Section 7.2" cross-reference links
// ─────────────────────────────────────────────────────────────────────────────
const linkStyle: React.CSSProperties = {
  color: C.link,
  textDecoration: 'underline',
  textDecorationThickness: 1,
  textUnderlineOffset: 3,
  wordBreak: 'break-word',
}

function renderInline(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = []
  const re = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)|Section (\d+(?:\.\d+)?)/g
  let last = 0
  let key = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index))
    if (m[1] !== undefined) {
      nodes.push(<strong key={key++}>{m[1]}</strong>)
    } else if (m[2] !== undefined) {
      nodes.push(
        <a key={key++} href={m[3]} style={linkStyle}>
          {m[2]}
        </a>,
      )
    } else {
      const num = m[4]
      const href = num.includes('.') ? `#${clauseAnchor(num)}` : `#${SECTION_ID_BY_NUM[num] ?? ''}`
      nodes.push(
        <a key={key++} href={href} style={linkStyle}>
          {m[0]}
        </a>,
      )
    }
    last = re.lastIndex
  }
  if (last < text.length) nodes.push(text.slice(last))
  return nodes
}

// ─────────────────────────────────────────────────────────────────────────────
// Blocks
// ─────────────────────────────────────────────────────────────────────────────
const bodyText: React.CSSProperties = { margin: '0 0 12px', fontSize: 17, lineHeight: 1.7 }

function ListView({ style, items }: { style: 'bullet' | 'alpha'; items: string[] }) {
  return (
    <ul role="list" style={{ listStyle: 'none', margin: '0 0 14px', padding: 0 }}>
      {items.map((it, i) => (
        <li key={i} style={{ display: 'flex', gap: 12, margin: '0 0 6px', fontSize: 17, lineHeight: 1.65 }}>
          <span
            aria-hidden="true"
            style={{
              flex: '0 0 auto',
              minWidth: 26,
              color: C.leaf,
              fontWeight: 700,
              textAlign: style === 'alpha' ? 'left' : 'center',
            }}
          >
            {style === 'alpha' ? `(${String.fromCharCode(97 + i)})` : '•'}
          </span>
          <span style={{ minWidth: 0 }}>{renderInline(it)}</span>
        </li>
      ))}
    </ul>
  )
}

function TableView({ b }: { b: Extract<Block, { t: 'table' }> }) {
  return (
    <div style={{ overflowX: 'auto', margin: '4px 0 20px', border: `1px solid ${C.rule}`, borderRadius: 6 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 16, lineHeight: 1.55, minWidth: 420 }}>
        <colgroup>
          {b.widths.map((w, i) => (
            <col key={i} style={{ width: `${w * 100}%` }} />
          ))}
        </colgroup>
        {b.head && (
          <thead>
            <tr>
              {b.head.map((h, i) => (
                <th
                  key={i}
                  scope="col"
                  style={{ background: C.forest, color: C.white, textAlign: 'left', padding: '10px 14px', fontWeight: 700 }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {b.rows.map((r, ri) => (
            <tr key={ri}>
              {r.map((c, ci) => {
                const first = ci === 0 && b.boldFirst
                const Cell = first ? 'th' : 'td'
                return (
                  <Cell
                    key={ci}
                    scope={first ? 'row' : undefined}
                    style={{
                      textAlign: 'left',
                      verticalAlign: 'top',
                      padding: '10px 14px',
                      fontWeight: first ? 700 : 400,
                      background: ci === 0 ? C.mist : 'transparent',
                      borderTop: ri === 0 && !b.head ? 'none' : `1px solid ${C.rule}`,
                    }}
                  >
                    {renderInline(c)}
                  </Cell>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function CalloutView({ b }: { b: Extract<Block, { t: 'callout' }> }) {
  return (
    <aside
      style={{
        background: C.mist,
        border: `1px solid ${C.rule}`,
        borderLeft: `4px solid ${C.leaf}`,
        borderRadius: 6,
        padding: '16px 20px 8px',
        margin: '4px 0 22px',
      }}
    >
      {b.title && (
        <p style={{ margin: '0 0 8px', fontWeight: 700, fontSize: 17, color: C.forest }}>{b.title}</p>
      )}
      {b.paras?.map((p, i) => (
        <p key={i} style={{ ...bodyText, fontSize: 16.5 }}>
          {renderInline(p)}
        </p>
      ))}
      {b.items && <ListView style="bullet" items={b.items} />}
      {b.note && <p style={{ margin: '0 0 10px', fontSize: 15, color: C.muted, fontStyle: 'italic' }}>{b.note}</p>}
    </aside>
  )
}

function QuoteView({ b }: { b: Extract<Block, { t: 'quote' }> }) {
  return (
    <figure
      style={{
        margin: '4px 0 24px',
        background: C.tint,
        borderLeft: `5px solid ${C.forest}`,
        borderRadius: 4,
        padding: '20px 24px 22px',
      }}
    >
      <figcaption style={{ fontWeight: 700, fontSize: 15, color: C.leaf, marginBottom: 8 }}>{b.label}</figcaption>
      <blockquote style={{ margin: 0, fontFamily: F.head, fontSize: 22, lineHeight: 1.5, color: C.ink }}>
        {b.text}
      </blockquote>
    </figure>
  )
}

/** The refund scale: the one piece of this page that is deliberately loud. */
function ScaleView({ b }: { b: Extract<Block, { t: 'scale' }> }) {
  const bg = [C.forest, C.leaf, C.sage, C.grey]
  const fg = [C.white, C.white, C.ink, C.ink]
  return (
    <figure style={{ margin: '6px 0 24px' }}>
      <div
        role="list"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: 2,
          borderRadius: 6,
          overflow: 'hidden',
        }}
      >
        {b.items.map((it, i) => (
          <div key={i} role="listitem" style={{ background: bg[it.tone], color: fg[it.tone], padding: '16px 18px 18px' }}>
            <div style={{ fontFamily: F.head, fontWeight: 700, fontSize: 46, lineHeight: 1.05, marginBottom: 6 }}>{it.pct}</div>
            <div style={{ fontSize: 15, lineHeight: 1.4 }}>{it.label}</div>
          </div>
        ))}
      </div>
      <figcaption style={{ marginTop: 8, fontSize: 14.5, color: C.muted }}>
        Share of the Fees you have paid that is refunded, by when your request reaches us.
      </figcaption>
    </figure>
  )
}

function ValuesView({ b }: { b: Extract<Block, { t: 'values' }> }) {
  return (
    <div style={{ margin: '0 0 12px', borderTop: `1px solid ${C.rule}` }}>
      {b.items.map((it, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            columnGap: 24,
            rowGap: 4,
            padding: '14px 0',
            borderBottom: `1px solid ${C.rule}`,
          }}
        >
          <div style={{ flex: '0 0 210px', fontFamily: F.head, fontWeight: 700, fontSize: 19, color: C.forest }}>{it.h}</div>
          <div style={{ flex: '1 1 260px', fontSize: 17, lineHeight: 1.65 }}>{renderInline(it.d)}</div>
        </div>
      ))}
    </div>
  )
}

function BlockView({ b }: { b: Block }) {
  switch (b.t) {
    case 'p':
      return <p style={bodyText}>{renderInline(b.text)}</p>
    case 'list':
      return <ListView style={b.style} items={b.items} />
    case 'table':
      return <TableView b={b} />
    case 'callout':
      return <CalloutView b={b} />
    case 'quote':
      return <QuoteView b={b} />
    case 'scale':
      return <ScaleView b={b} />
    case 'values':
      return <ValuesView b={b} />
    default:
      return null
  }
}

function ClauseView({ c, narrow }: { c: Extract<Block, { t: 'clause' }>; narrow: boolean }) {
  return (
    <div
      id={clauseAnchor(c.n)}
      style={{
        display: 'grid',
        gridTemplateColumns: `${narrow ? 40 : 54}px minmax(0, 1fr)`,
        margin: '0 0 8px',
        scrollMarginTop: 24,
      }}
    >
      <div style={{ fontWeight: 700, color: C.leaf, fontSize: 16, lineHeight: '27px', paddingTop: 1 }}>{c.n}</div>
      <div>
        <p style={bodyText}>
          <strong>{c.title}.</strong> {c.text ? renderInline(c.text) : null}
        </p>
        {c.blocks.map((b, i) => (
          <BlockView key={i} b={b} />
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────
function DownloadButton({ onDark }: { onDark?: boolean }) {
  return (
    <a
      href={TERMS.pdfHref}
      download={TERMS.pdfFile}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        padding: '11px 20px',
        borderRadius: 6,
        fontWeight: 700,
        fontSize: 16,
        textDecoration: 'none',
        background: onDark ? C.white : C.forest,
        color: onDark ? C.forest : C.white,
        border: `2px solid ${onDark ? C.white : C.forest}`,
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3v12" />
        <path d="M7 11l5 5 5-5" />
        <path d="M5 20h14" />
      </svg>
      Download PDF
    </a>
  )
}

export default function TermsAndConditions() {
  const wide = useMedia('(min-width: 980px)')
  const narrow = useMedia('(max-width: 560px)')
  const active = useActiveSection(SECTION_IDS, wide)

  const contents = (
    <ol role="list" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      {TERMS.sections.map((s) => {
        const isActive = wide && active === s.id
        return (
          <li key={s.id} style={{ margin: 0 }}>
            <a
              href={`#${s.id}`}
              aria-current={isActive ? 'true' : undefined}
              style={{
                display: 'flex',
                gap: 10,
                padding: '6px 10px',
                borderLeft: `3px solid ${isActive ? C.leaf : 'transparent'}`,
                color: isActive ? C.forest : C.ink,
                fontWeight: isActive ? 700 : 400,
                fontSize: 15.5,
                lineHeight: 1.35,
                textDecoration: 'none',
              }}
            >
              <span style={{ flex: '0 0 22px', color: C.leaf, fontWeight: 700 }}>{s.num}</span>
              <span>{s.title}</span>
            </a>
          </li>
        )
      })}
    </ol>
  )

  return (
    <div style={{ background: C.white, color: C.ink, fontFamily: F.body }}>
      {/* Hero */}
      <header style={{ background: C.forest, color: C.white }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: narrow ? '36px 20px 32px' : '56px 28px 44px' }}>
          <Link href="/beyond-camp" style={{ display: 'inline-flex', flexWrap: 'wrap', columnGap: 14, color: C.onForest, fontSize: 16, textDecoration: 'none' }}>
            <span style={{ fontFamily: F.head, fontWeight: 700, color: C.white, fontSize: 18 }}>{TERMS.brand}</span>
            <span>{TERMS.tagline}</span>
          </Link>
          <h1
            style={{
              fontFamily: F.head,
              fontWeight: 700,
              fontSize: narrow ? 38 : 56,
              lineHeight: 1.05,
              margin: '18px 0 10px',
              color: C.white,
            }}
          >
            {TERMS.title}
          </h1>
          <p style={{ margin: '0 0 4px', fontSize: 19, color: C.white }}>{TERMS.operator}</p>
          <p style={{ margin: '0 0 26px', fontSize: 16, color: C.onForest }}>
            {TERMS.version} | {TERMS.effective}
          </p>
          <DownloadButton onDark />
        </div>
      </header>

      {/* Body */}
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: narrow ? '28px 20px 64px' : '48px 28px 88px' }}>
        <div style={{ display: 'flex', flexDirection: wide ? 'row' : 'column', alignItems: wide ? 'flex-start' : 'stretch', gap: wide ? 64 : 24 }}>
          {wide ? (
            <nav
              aria-label="Contents"
              style={{ flex: '0 0 270px', position: 'sticky', top: STICKY_TOP, maxHeight: `calc(100vh - ${STICKY_TOP * 2}px)`, overflowY: 'auto' }}
            >
              <p style={{ margin: '0 0 8px 13px', fontWeight: 700, fontSize: 15, color: C.muted }}>Contents</p>
              {contents}
            </nav>
          ) : (
            <nav aria-label="Contents" style={{ width: '100%', boxSizing: 'border-box' }}>
              <details style={{ border: `1px solid ${C.rule}`, borderRadius: 6, background: C.mist, padding: '12px 14px' }}>
                <summary style={{ cursor: 'pointer', fontWeight: 700, color: C.forest, fontSize: 17 }}>Contents</summary>
                <div style={{ marginTop: 10 }}>{contents}</div>
              </details>
            </nav>
          )}

          <main style={{ flex: '1 1 0%', minWidth: 0, maxWidth: 740 }}>
            <p style={{ ...bodyText, fontSize: 19, lineHeight: 1.65, marginBottom: 22 }}>{renderInline(TERMS.intro)}</p>

            <CalloutView b={{ t: 'callout', title: TERMS.summary.title, items: TERMS.summary.items, note: TERMS.summary.note }} />

            {TERMS.sections.map((s) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} style={{ margin: '52px 0 0', scrollMarginTop: 24 }}>
                <h2
                  id={`${s.id}-h`}
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 14,
                    fontFamily: F.head,
                    fontWeight: 700,
                    fontSize: narrow ? 25 : 30,
                    lineHeight: 1.2,
                    color: C.forest,
                    margin: '0 0 22px',
                    paddingBottom: 10,
                    borderBottom: `2px solid ${C.leaf}`,
                  }}
                >
                  <span style={{ color: C.leaf }}>{s.num}</span>
                  <span>{s.title}</span>
                </h2>
                {s.blocks.map((b, i) =>
                  b.t === 'clause' ? <ClauseView key={i} c={b} narrow={narrow} /> : <BlockView key={i} b={b} />,
                )}
              </section>
            ))}

            <div style={{ marginTop: 56, paddingTop: 24, borderTop: `1px solid ${C.rule}` }}>
              <p style={{ fontFamily: F.head, fontSize: 22, lineHeight: 1.4, color: C.forest, margin: '0 0 20px' }}>{TERMS.closing}</p>
              <DownloadButton />
              <p style={{ margin: '18px 0 0', fontSize: 15, color: C.muted }}>
                {TERMS.version} | {TERMS.effective}
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}