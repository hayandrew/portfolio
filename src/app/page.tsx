"use client";

import React from "react";
import Link from "next/link";
import styles from "@/styles/page.module.css";
import Logo from "@/components/Logo";

export default function HomePage() {
  const [isLogoReady, setIsLogoReady] = React.useState(false);
  const [showContent, setShowContent] = React.useState(false);

  const triggerConsole = () => {
    window.dispatchEvent(new Event("open-system-console"));
  };

  // Wait for the loader to fade out (500ms) before fading in the homepage content
  React.useEffect(() => {
    if (isLogoReady) {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLogoReady]);

  return (
    <div
      className={`page-container home-page-container ${styles.homePage} ${
        !isLogoReady ? "home-page-loading" : ""
      }`}
      style={{ paddingTop: 0 }}
    >
      <div className="content-wrapper">
        <div className={styles.centeredWrapper}>
          {/* Large Center-Aligned Interactive Name Logo */}
          <div className={styles.heroNameContainer}>
            <Logo onReady={() => setIsLogoReady(true)} />
            <div
              className={`${styles.interactiveSubtitle} ${
                showContent ? styles.contentVisible : styles.contentHidden
              }`}
            >
              SOFTWARE ENGINEERING LEADER_
            </div>
          </div>

          {/* Loader displayed during Logo zoom-in */}
          <div
            className={`${styles.loader} ${
              isLogoReady ? styles.loaderFadeOut : ""
            }`}
          >
            <span className={styles.loaderText}>INITIALIZING SYSTEM_</span>
            <div className={styles.loaderBar}></div>
          </div>

          {/* Stacked Menu Items */}
          <nav
            className={`${styles.menuStack} ${
              showContent ? styles.contentVisible : styles.contentHidden
            }`}
            aria-label="Main Navigation"
          >
            <Link href="/about" className={styles.stackedMenuItem}>
              <div className={styles.menuLabel}>ABOUT_</div>
            </Link>

            <Link href="/experience" className={styles.stackedMenuItem}>
              <div className={styles.menuLabel}>EXPERIENCE_</div>
            </Link>

            <Link href="/projects" className={styles.stackedMenuItem}>
              <div className={styles.menuLabel}>PROJECTS_</div>
            </Link>

            <Link href="/contact" className={styles.stackedMenuItem}>
              <div className={styles.menuLabel}>CONTACT_</div>
            </Link>

            <div className={styles.menuDivider}></div>

            <div className={styles.socialRow}>
              <a
                href="https://www.linkedin.com/in/andyhaynyc/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                LINKEDIN
              </a>
              <a
                href="https://github.com/hayandrew"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                GITHUB
              </a>
              <a
                href="https://www.youtube.com/@ANDYvsMACHINE"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                YOUTUBE
              </a>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
