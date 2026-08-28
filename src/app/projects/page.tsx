"use client";

import React, { useState } from "react";
import styles from "@/styles/projects.module.css";

interface Project {
  id: string;
  title: string;
  category: "web" | "esp32" | "library";
  categoryLabel: string;
  description: string;
  technologies: string[];
  codeLink?: string | null;
  liveLink?: string | null;
}

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<"all" | "web" | "esp32">(
    "all",
  );

  const projects: Project[] = [
    {
      id: "project-1",
      title: "Earl the Monster",
      category: "web",
      categoryLabel: "Web",
      description:
        "Earl the Monster is a playful children’s book brand and interactive website built around Earl, a lovable monster with a big personality.",
      technologies: [
        "NextJS",
        "React",
        "Vercel",
        "Stripe",
        "ReCaptcha",
        "CSS Modules",
        "TypeScript",
        "NodeJS",
        "Express",
        "Vitest",
      ],
      codeLink: "https://github.com/hayandrew/earlthemonster",
      liveLink: "https://earlthemonster.com",
    },
    {
      id: "project-2",
      title: "Portfolio Site",
      category: "web",
      categoryLabel: "Web",
      description:
        "This web site. Portfolio website featuring Andy Hay, an Engineering Manager, creator, maker, and all around good guy.",
      technologies: [
        "NextJS",
        "React",
        "Vercel",
        "ReCaptcha",
        "CSS Modules",
        "TypeScript",
        "Animations",
        "NodeJS",
        "Express",
        "Vitest",
      ],
      codeLink: "https://github.com/hayandrew/portfolio",
    },

    {
      id: "project-3",
      title: "Kwenchr",
      category: "web",
      categoryLabel: "Web",
      description:
        "A site that uses the user's current location to find nearby drink specials intended for happy hours.",
      technologies: [
        "React",
        "CSS Grid",
        "Animations",
        "TypeScript",
        "CSS Modules",
        "MongoDB",
        "NodeJS",
        "Express",
      ],
      codeLink: "https://github.com/hayandrew/kwenchr",
    },
    {
      id: "project-4",
      title: "Reality Stan",
      category: "web",
      categoryLabel: "Web",
      description: "A big brother and Survivor game tracking tool.",
      technologies: [
        "CSS Grid",
        "Animations",
        "CSS Modules",
        "NodeJS",
        "Express",
      ],
      codeLink: "https://github.com/hayandrew/realitystan",
    },
    {
      id: "project-5",
      title: "LED Visualizer",
      category: "esp32",
      categoryLabel: "ESP32",
      description:
        "I built a custom LED display matrix that uses a mic to visualize ambient sound.",
      technologies: ["C++", "ESP32", "Arduino", "Arduino IDE", "PlatformIO"],
      codeLink: "https://github.com/hayandrew/led-music-visualizer",
    },
    {
      id: "project-6",
      title: "Project Dugout",
      category: "esp32",
      categoryLabel: "ESP32",
      description:
        "I gutted a broken handheld Tiger Baseball game and turned it into a modern handheld with an ESP32 and SPI display",
      technologies: ["C++", "ESP32", "Arduino", "Arduino IDE", "PlatformIO"],
      codeLink: "https://github.com/hayandrew/project-dugout",
      liveLink: "https://www.youtube.com/watch?v=sPr2wZAA69U",
    },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className={styles.projectsContainer}>
          {/* Tag Filter Console */}
          <section
            className={styles.filterConsole}
            aria-label="Category Console Filter"
          >
            <span className={styles.filterLabel}>SELECT REPO_TYPE:</span>
            {(["all", "web", "esp32"] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`${styles.filterBtn} ${activeFilter === filter ? styles.filterBtnActive : ""}`}
              >
                [{filter.toUpperCase()}]
              </button>
            ))}
          </section>

          {/* Grid of Projects */}
          <section className={styles.projectsGrid} aria-label="Projects Grid">
            {filteredProjects.map((project) => {
              const cardColorClass =
                project.category === "web"
                  ? styles.cardWeb
                  : project.category === "esp32"
                    ? styles.cardHw
                    : styles.cardLib;

              const categoryClass =
                project.category === "web"
                  ? styles.categoryWeb
                  : project.category === "esp32"
                    ? styles.categoryHw
                    : styles.categoryLib;

              return (
                <article
                  key={project.id}
                  className={`${styles.projectCard} ${cardColorClass}`}
                >
                  <div className={styles.cardMeta}>
                    <span className={`${styles.categoryTag} ${categoryClass}`}>
                      {project.categoryLabel}
                    </span>
                    <span>ONLINE // NOMINAL</span>
                  </div>

                  <h3 className={styles.projectTitle}>{project.title}</h3>

                  <p className={styles.projectDesc}>{project.description}</p>

                  <div className={styles.stackList}>
                    {project.technologies.map((tech) => (
                      <span key={tech} className={styles.stackTag}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className={styles.actionArea}>
                    {project.codeLink && (
                      <a
                        href={project.codeLink}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.actionBtn}
                        aria-label={`View source code for ${project.title}`}
                      >
                        REPO
                      </a>
                    )}
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noreferrer"
                        className={`${styles.actionBtn} ${styles.actionBtnPrimary}`}
                        aria-label={`Open live demonstration for ${project.title}`}
                      >
                        WEBSITE
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </section>
        </div>
      </div>
    </div>
  );
}
