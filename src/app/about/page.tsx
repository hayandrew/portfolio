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
                    SENIOR SOFTWARE ENGINEER
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
            <section className={styles.bioPanel} aria-label="Professional Bio">
              <h1 className={styles.bioHeading}>SYSTEM_BIO_DATA</h1>
              <div className={styles.bioText}>
                <p className={styles.bioParagraph}>
                  I am a senior full-stack developer with a passion for building
                  sleek, performant, and premium web interfaces. Over the past
                  decade, I have focused on designing scalable system
                  architectures, optimizing client-side performance, and
                  integrating web technologies with physical environments.
                </p>
                <p className={styles.bioParagraph}>
                  My engineering philosophy centers around **semantic
                  integrity**, **clean abstractions**, and **visual
                  excellence**. I believe developer portfolios should not just
                  catalog work, but showcase interactive capabilities,
                  micro-animations, and careful design execution.
                </p>
                <p>
                  Outside of traditional full-stack web applications, I
                  participate in **hardware hacking**, optimizing firmware on
                  microcontrollers like the ESP32, and linking sensor pipelines
                  with web frontends via low-latency WebSockets.
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
                          <span className={styles.skillName}>{skill.name}</span>
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
