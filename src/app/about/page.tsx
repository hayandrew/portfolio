"use client";

import React, { useState, useEffect } from "react";
import styles from "@/styles/about.module.css";
import Hero from "@/components/Hero";

interface Skill {
  name: string;
  level: number;
}

interface SkillGroup {
  category: string;
  skills: Skill[];
}

export default function AboutPage() {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    // Trigger progress bar filling animation on mount
    const timer = setTimeout(() => setAnimated(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const skillGroups: SkillGroup[] = [
    {
      category: "Frontend Web Systems",
      skills: [
        { name: "React / React 19", level: 95 },
        { name: "Next.js / App Router", level: 90 },
        { name: "TypeScript / JavaScript ESNext", level: 90 },
        { name: "Vanilla CSS & Responsive Design", level: 85 },
      ],
    },
    {
      category: "Backend & Systems Architecture",
      skills: [
        { name: "Node.js / Express / Fastify", level: 85 },
        { name: "Go / Rust (Systems Coding)", level: 75 },
        { name: "PostgreSQL / Prisma ORM", level: 80 },
        { name: "REST APIs & WebSocket Systems", level: 90 },
      ],
    },
    {
      category: "Hardware & IoT Integrations",
      skills: [
        { name: "ESP32 / ESP8266 Microcontrollers", level: 80 },
        { name: "C++ / Arduino IDE / PlatformIO", level: 75 },
        { name: "Serial Protocols (I2C, SPI, UART)", level: 85 },
        { name: "Firmware Optimization & Testing", level: 70 },
      ],
    },
  ];

  return (
    <>
      <Hero section="about" />
      <div className="page-container" style={{ paddingTop: 0 }}>
        <div className="content-wrapper">
          <div className={styles.aboutContainer}>
            <div className={styles.profileSection}>
              {/* Dossier Card (Left Column) */}
              <section
                className={styles.dossierCard}
                aria-label="Biometric Dossier Card"
              >
                <div className={styles.avatarContainer}>
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
                    <span className={styles.metaLabel}>LOCATION NODE</span>
                    <span className={styles.metaValue}>NEW YORK, NY</span>
                  </div>
                  <div className={styles.metaRow}>
                    <span className={styles.metaLabel}>DEPLOYMENT</span>
                    <span className={styles.metaValue}>ACTIVE / NOMINAL</span>
                  </div>
                </div>
              </section>

              {/* Biography Panel (Right Column) */}
              <section
                className={styles.bioPanel}
                aria-label="Professional Bio"
              >
                <h1 className={styles.bioHeading}>SYSTEM_BIO_DATA</h1>
                <div className={styles.bioText}>
                  <p className={styles.bioParagraph}>
                    I’m an engineering leader with more than a decade of
                    experience building consumer-facing digital products at
                    scale. I’ve led engineering teams and helped launch and grow
                    subscription streaming products used by millions of people.
                    My background spans full-stack development, product
                    engineering, and modern technologies including React and
                    Node.js. I’m passionate about connecting strong technical
                    execution with great product experiences while creating an
                    environment where engineers can do their best work.
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
                    with ESP32s, LEDs, displays, 3D printing, and AI—bringing
                    the same curiosity and problem-solving mindset to my hobbies
                    that I bring to engineering leadership.
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
                SKILLS_RATING_MATRIX
              </h2>
              <div className={styles.skillsGrid}>
                {skillGroups.map((group, idx) => (
                  <div key={idx} className={styles.skillGroup}>
                    <h3 className={styles.skillGroupTitle}>{group.category}</h3>
                    <div className={styles.skillGroupList}>
                      {group.skills.map((skill, sIdx) => (
                        <div key={sIdx} className={styles.skillItem}>
                          <div className={styles.skillHeader}>
                            <span className={styles.skillName}>
                              {skill.name}
                            </span>
                            <span className={styles.skillPercent}>
                              {skill.level}%
                            </span>
                          </div>
                          <div className={styles.progressBarTrack}>
                            <div
                              className={styles.progressBarFill}
                              style={{
                                width: animated ? `${skill.level}%` : "0%",
                              }}
                            />
                          </div>
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
    </>
  );
}
