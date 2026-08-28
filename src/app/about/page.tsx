import React from "react";
import Image from "next/image";
import styles from "@/styles/about.module.css";

interface SkillGroup {
  category: string;
  skills: string[];
}

export default function AboutPage() {
  const skillGroups: SkillGroup[] = [
    {
      category: "Leadership & Strategy",
      skills: [
        "Business Strategy",
        "Team Building",
        "Hiring & Interviewing",
        "Performance Management",
        "Cross Functional Collaboration",
        "Mentorship",
        "Stakeholder Management",
        "Agile / Scrum Methodologies",
        "Roadmap Planning & Prioritization",
        "Budget Management",
        "Vendor Management",
      ],
    },
    {
      category: "Frontend Web Systems",
      skills: [
        "React / React 19",
        "Next.js / App Router",
        "TypeScript / JavaScript ESNext",
        "Vanilla CSS & Responsive Design",
        "React Testing Library / Vitest",
        "Web Performance Optimization",
        "State Management",
        "CSS Modules",
        "Animations",
        "SEO Fundamentals",
        "Accessibility",
        "Legal Compliance",
      ],
    },
    {
      category: "Backend & Systems Architecture",
      skills: [
        "Node.js / Express / Fastify",
        "PHP / MySQL",
        "MongoDB / Mongoose",
        "REST APIs & WebSocket Systems",
        "Python",
        "Integration Testing",
        "CI/CD Pipelines",
        "Docker",
        "AWS Basics",
        "GitHub Actions",
      ],
    },
  ];

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className={styles.aboutContainer}>
          <div className={styles.profileSection}>
            {/* Dossier Card (Left Column) */}
            <section
              className={styles.dossierCard}
              aria-label="Biometric Dossier Card"
            >
              <div className={styles.avatarContainer}>
                <Image
                  src="/images/headshot.jpg"
                  alt="Andy Hay"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 300px"
                  className={styles.avatarImage}
                />
                <div className={styles.avatarGrid} />
                <div className={styles.avatarFallback}>AH</div>
              </div>

              <div className={styles.dossierMeta}>
                <div className={styles.metaRow}>
                  <span className={styles.metaLabel}>IDENTIFIER</span>
                  <span className={styles.metaValue}>ANDY HAY</span>
                </div>
                <div className={styles.metaRow}>
                  <span className={styles.metaLabel}>DESIGNATION</span>
                  <span className={styles.metaValue}>
                    SOFTWARE ENGINEERING MANAGER
                  </span>
                </div>
                <div className={styles.metaRow}>
                  <span className={styles.metaLabel}>LOCATION </span>
                  <span className={styles.metaValue}>NEW YORK, NY</span>
                </div>
              </div>
            </section>

            {/* Biography Panel (Right Column) */}
            <section className={styles.bioPanel} aria-label="Professional Bio">
              <h1 className={styles.bioHeading}>ABOUT ME_</h1>
              <div className={styles.bioText}>
                <p className={styles.bioParagraph}>
                  I’m an engineering leader with more than a decade of
                  experience building consumer-facing digital products at scale.
                  I’ve led engineering teams and helped launch and grow
                  subscription streaming products used by millions of people. My
                  background spans full-stack development, product engineering,
                  and modern technologies including React and Node.js. I’m
                  passionate about connecting strong technical execution with
                  great product experiences while creating an environment where
                  engineers can do their best work.
                </p>
                <p className={styles.bioParagraph}>
                  I’m also a strong advocate for using emerging technology to
                  make engineering teams more effective. I’ve helped introduce
                  AI tools such as Cursor into the development workflow,
                  encouraging engineers to experiment with practical ways to
                  improve their everyday work.
                </p>
                <p className={styles.bioParagraph}>
                  Outside of my career, I’m a hands-on maker and periodically
                  create YouTube videos on a channel focused on repairing and
                  creatively modifying electronics. I enjoy building projects
                  with ESP32s, LEDs, displays, 3D printing, and AI—bringing the
                  same curiosity and problem-solving mindset to my hobbies that
                  I bring to engineering leadership.
                </p>
              </div>
            </section>
          </div>

          {/* Interactive Skills Matrix Section */}
          <section
            className={styles.skillsSection}
            aria-label="Skills Proficiencies"
          >
            <h2 className={`${styles.bioHeading} ${styles.skillsHeading}`}>
              SKILLS
            </h2>
            <div className={styles.skillsGrid}>
              {skillGroups.map((group, idx) => (
                <div key={idx} className={styles.skillGroup}>
                  <h3 className={styles.skillGroupTitle}>{group.category}</h3>
                  <div className={styles.skillGroupList}>
                    {group.skills.map((skill, sIdx) => (
                      <div key={sIdx} className={styles.skillItem}>
                        <span className={styles.skillPrompt}>&gt;</span>
                        <span className={styles.skillName}>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
