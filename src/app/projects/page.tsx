"use client";

import React, { useState } from "react";
import styles from "@/styles/projects.module.css";

interface Project {
  id: string;
  title: string;
  category: "web" | "hardware" | "library";
  categoryLabel: string;
  description: string;
  technologies: string[];
  codeLink?: string | null;
  liveLink?: string | null;
}

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<"all" | "web" | "hardware">(
    "all",
  );

  const projects: Project[] = [
    {
      id: "project-2",
      title: "Earl the Monster",
      category: "web",
      categoryLabel: "Web",
      description:
        "Earl the Monster is a playful children’s book brand and interactive website built around Earl, a lovable monster with a big personality. The site brings the world of Earl to life with information about the books, characters, and creative content, while giving young readers and families a fun place to explore Earl’s adventures.",
      technologies: ["C++", "Arduino", "ESP32", "SPI/I2C", "WebSockets"],
      codeLink: "https://github.com/hayandrew/earlthemonster",
      liveLink: "https://earlthemonster.com",
    },
    {
      id: "project-3",
      title: "LED Visualizer",
      category: "hardware",
      categoryLabel: "Hardware",
      description:
        "A utility package written in Rust/WebAssembly compiling telemetry byte arrays into unified JSON logs with sub-millisecond execution overhead.",
      technologies: ["Rust", "WASM", "NPM", "Node.js", "Jest"],
      codeLink: "https://github.com/hayandrew",
      liveLink: "https://andyhay.com",
    },
    {
      id: "project-4",
      title: "Project Dugout",
      category: "hardware",
      categoryLabel: "Hardware",
      description:
        "A client-side styling layout engine featuring custom retro grid-lines, glowing text modules, CRT scanline effects, and custom state controllers.",
      technologies: ["React", "CSS Grid", "Animations", "Linting"],
      codeLink: "https://github.com/hayandrew",
      liveLink: "https://andyhay.com",
    },
    {
      id: "project-5",
      title: "Kwenchr",
      category: "web",
      categoryLabel: "Web",
      description:
        "A client-side styling layout engine featuring custom retro grid-lines, glowing text modules, CRT scanline effects, and custom state controllers.",
      technologies: ["React", "CSS Grid", "Animations", "Linting"],
      codeLink: "https://github.com/hayandrew",
      liveLink: "https://andyhay.com",
    },
    {
      id: "project-7",
      title: "Reality Stan",
      category: "web",
      categoryLabel: "Web",
      description:
        "A client-side styling layout engine featuring custom retro grid-lines, glowing text modules, CRT scanline effects, and custom state controllers.",
      technologies: ["React", "CSS Grid", "Animations", "Linting"],
      codeLink: "https://github.com/hayandrew",
      liveLink: "https://andyhay.com",
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
            {(["all", "web", "hardware", "library"] as const).map((filter) => (
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
                  : project.category === "hardware"
                    ? styles.cardHw
                    : styles.cardLib;

              const categoryClass =
                project.category === "web"
                  ? styles.categoryWeb
                  : project.category === "hardware"
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
                        SOURCE_CODE
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
                        LIVE_NODE
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
