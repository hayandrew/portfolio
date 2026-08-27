import React from "react";
import styles from "@/styles/experience.module.css";

interface JobRole {
  id: string;
  title: string;
  company: string;
  period: string;
  category: "web" | "hardware" | "systems";
  description: string;
  bullets?: string[];
  technologies: string[];
}

export default function ExperiencePage() {
  const roles: JobRole[] = [
    {
      id: "role-1",
      title: "Software Engineering Manager",
      company: "Paramount Skydance Corporation",
      period: "2022 - 2026",
      category: "web",
      description:
        "Lead engineering efforts for the BET+ streaming platform (3.5M+ users) across web and connected experiences.",
      bullets: [
        "Manage and mentor a team of engineers, driving technical direction, performance management, onboarding, and training.",
        "Foster a high-performing team culture through mentorship, feedback, and clear ownership.",
        "Enabled engineering teams to leverage AI coding tools, including Cursor, by providing access, promoting adoption, and encouraging responsible use to improve productivity.",
        "Drive workflow optimization across engineering, improving delivery speed and team efficiency through cross-functional partnerships.",
      ],
      technologies: [
        "Next.js",
        "React 19",
        "TypeScript",
        "Performance",
        "WebPack",
        "Node.js",
        "React Testing Library",
        "GitHub",
        "Agile",
      ],
    },
    {
      id: "role-2",
      title: "Lead Software Engineer",
      company: "ViacomCBS",
      period: "2018 - 2022",
      category: "web",
      description:
        "Led development of a full OTT platform experience including authentication, subscriptions, user profiles, playback, and personalized content.",
      bullets: [
        "Delivered end-to-end user journeys across account creation, sign-in, subscription management, billing, and content discovery.",
        "Built key engagement features including Continue Watching, Watchlist, search, and dynamic content carousels.",
        "Developed a full-featured user settings SPA supporting payment management, plan changes, cancellations, and billing history.",
        "Implemented multi-tier subscription models, coupon systems, and partner/TVE subscription integrations.",
      ],
      technologies: [
        "Next.js",
        "React 19",
        "TypeScript",
        "Performance",
        "WebPack",
        "Node.js",
      ],
    },
    {
      id: "role-3",
      title: "Senior Software Engineer",
      company: "Viacom, Inc.",
      period: "2014 - 2018",
      category: "web",
      description:
        "Architected a hybrid SSR + client-rendered React application to balance SEO and authenticated user experiences.",
      bullets: [
        "Designed routing strategy separating SEO pages from authenticated experiences.",
        "Built and maintained a scalable Node.js SSR framework supporting multi-tenant configurations.",
        "Implemented kid profiles and parental PIN controls for family-safe experiences.",
        "Supported multi-device experiences, including second-screen activation flows and client-side personalization.",
      ],
      technologies: [
        "Next.js",
        "React 19",
        "TypeScript",
        "Performance",
        "WebPack",
        "Node.js",
      ],
    },
    {
      id: "role-4",
      title: "Senior Software Engineer",
      company: "Backbase",
      period: "2011 - 2014",
      category: "systems",
      description:
        "Collaborated across international teams to build dynamic enterprise portals, reusable UI component libraries, and responsive, hybrid mobile applications using AngularJS.",
      bullets: [
        "Built secure enterprise portals for international financial institutions.",
        "Developed modular AngularJS components reused across multiple platforms.",
        "Delivered hybrid mobile web applications with responsive design systems.",
      ],
      technologies: ["Go", "Node.js", "WebSockets", "PostgreSQL", "Prisma"],
    },
    {
      id: "role-5",
      title: "Director, Front-end Development",
      company: "Ziff Davis Enterprise",
      period: "2006 - 2011",
      category: "hardware",
      description:
        "Led design and frontend teams in delivering large-scale publishing platforms, early mobile experiences, and custom digital solutions for enterprise clients like IBM, Intel, and Dell.",
      bullets: [
        "Directed front-end engineering teams in high-traffic publishing environments.",
        "Spearheaded early mobile-optimized web versions for major publications.",
        "Delivered custom landing page templates and advertising integrations.",
      ],
      technologies: [
        "C++",
        "Arduino",
        "ESP32",
        "I2C",
        "WebSockets",
        "Hardware",
      ],
    },
  ];

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className={styles.experienceContainer}>
          {/* Professional Development */}
          <section
            className={styles.profDevSection}
            aria-label="Professional Development"
          >
            <h2 className={styles.sectionTitle}>PROFESSIONAL DEVELOPMENT_</h2>
            <div className={styles.certList}>
              <div className={styles.certCard}>
                <div className={styles.certHeader}>
                  <h3 className={styles.certTitle}>
                    Google Cloud Generative AI Leader Certification
                  </h3>
                  <span className={styles.certBadge}>GCP / GenAI</span>
                </div>
                <p className={styles.certDescription}>
                  Credential designed for leaders, solution architects, and
                  consultants to validate their ability to drive AI
                  transformation and align generative AI initiatives with
                  business strategies.
                </p>
              </div>

              <div className={styles.certCard}>
                <div className={styles.certHeader}>
                  <h3 className={styles.certTitle}>
                    AgilePM® Foundation Certificate
                  </h3>
                  <span className={styles.certBadge}>Agile / Governance</span>
                </div>
                <div className={styles.certIssuer}>
                  Agile Business Consortium / APMG International
                </div>
                <p className={styles.certDescription}>
                  Mastered structured agile methodologies to balance corporate
                  project governance with incremental, iterative delivery.
                </p>
              </div>
            </div>
          </section>
          {/* Vertical Timeline */}
          <section className={styles.timeline} aria-label="Career Timeline">
            <h2 className={styles.sectionTitle}>CAREER TIMELINE_</h2>
            {roles.map((role, idx) => {
              const sideClass =
                idx % 2 === 0
                  ? styles.timelineItemLeft
                  : styles.timelineItemRight;

              const accentColor =
                role.category === "web"
                  ? "var(--accent-cyan)"
                  : role.category === "hardware"
                    ? "var(--accent-amber)"
                    : "var(--accent-green)";

              const accentGlow =
                role.category === "web"
                  ? "var(--accent-cyan-glow)"
                  : role.category === "hardware"
                    ? "var(--accent-amber-glow)"
                    : "var(--accent-green-glow)";

              return (
                <div
                  key={role.id}
                  className={`${styles.timelineItem} ${sideClass}`}
                  style={{
                    "--category-accent": accentColor,
                    "--category-accent-glow": accentGlow,
                  } as React.CSSProperties}
                >
                  {/* Timeline dot */}
                  <div className={styles.timelineNode} />

                  {/* Period Badge */}
                  <div className={styles.dateBadge}>{role.period}</div>

                  {/* Card panel */}
                  <div className={styles.timelineCard}>
                    <h3 className={styles.roleTitle}>{role.title}</h3>
                    <div className={styles.companyName}>
                      &gt; {role.company}
                    </div>
                    <p className={styles.roleDescription}>{role.description}</p>

                    {/* Bulleted list of achievements */}
                    {role.bullets && role.bullets.length > 0 && (
                      <ul className={styles.roleBullets}>
                        {role.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className={styles.bulletItem}>
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Technologies list */}
                    <div className={styles.techBadgeList}>
                      {role.technologies.map((tech) => (
                        <span key={tech} className={styles.techBadge}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </section>
        </div>
      </div>
    </div>
  );
}
