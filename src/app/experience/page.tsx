import React from "react";
import styles from "@/styles/experience.module.css";
import Hero from "@/components/Hero";

interface JobRole {
  id: string;
  title: string;
  company: string;
  period: string;
  category: "web" | "hardware" | "systems";
  description: string;
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
        "Lead engineering initiatives for the BET+ streaming platform, helping deliver experiences used by more than 3.5 million users across web and connected devices. Spanning architecture, frontend and backend development, workflow optimization, and team leadership.",
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
        "Lead engineering initiatives for the BET+ streaming platform, helping deliver experiences used by more than 3.5 million users across web and connected devices. My work spans architecture, frontend and backend development, workflow optimization, and team leadership.",
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
        "Lead engineering initiatives for the BET+ streaming platform, helping deliver experiences used by more than 3.5 million users across web and connected devices. My work spans architecture, frontend and backend development, workflow optimization, and team leadership.",
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
    <>
      <Hero section="experience" />
      <div className="page-container" style={{ paddingTop: 0 }}>
        <div className="content-wrapper">
          <div className={styles.experienceContainer}>
            {/* Vertical Timeline */}
            <section className={styles.timeline} aria-label="Career Timeline">
              {roles.map((role, idx) => {
                const sideClass =
                  idx % 2 === 0
                    ? styles.timelineItemLeft
                    : styles.timelineItemRight;

                return (
                  <div
                    key={role.id}
                    className={`${styles.timelineItem} ${sideClass}`}
                  >
                    {/* Timeline dot */}
                    <div
                      className={styles.timelineNode}
                      style={{
                        borderColor:
                          role.category === "web"
                            ? "var(--accent-cyan)"
                            : role.category === "hardware"
                              ? "var(--accent-amber)"
                              : "var(--accent-green)",
                        boxShadow:
                          role.category === "web"
                            ? "0 0 8px var(--accent-cyan-glow)"
                            : role.category === "hardware"
                              ? "0 0 8px var(--accent-amber-glow)"
                              : "0 0 8px var(--accent-green-glow)",
                      }}
                    />

                    {/* Period Badge */}
                    <div className={styles.dateBadge}>{role.period}</div>

                    {/* Card panel */}
                    <div className={styles.timelineCard}>
                      <h3 className={styles.roleTitle}>{role.title}</h3>
                      <div className={styles.companyName}>
                        &gt; {role.company}
                      </div>
                      <p className={styles.roleDescription}>
                        {role.description}
                      </p>

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
            <div>
              Download my resume here. Make sure resume doesn&apos;t include
              personal information.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
