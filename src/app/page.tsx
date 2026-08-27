"use client";

import React from "react";
import Link from "next/link";
import styles from "@/styles/page.module.css";
import Logo from "@/components/Logo";

export default function HomePage() {
  const triggerConsole = () => {
    window.dispatchEvent(new Event("open-system-console"));
  };
  return (
    <div className={`page-container ${styles.homePage}`} style={{ paddingTop: 0 }}>
      <div className="content-wrapper">
        <div className={styles.centeredWrapper}>
          {/* Large Center-Aligned Interactive Name Logo */}
          <div className={styles.heroNameContainer}>
            <Logo />
            <div className={styles.interactiveSubtitle}>
              SOFTWARE ENGINEERING LEADER_
            </div>
          </div>

          {/* Stacked Menu Items */}
          <nav className={styles.menuStack} aria-label="Main Navigation">
            <Link href="/about" className={styles.stackedMenuItem}>
              <div className={styles.menuLabel}>ABOUT_</div>
            </Link>

            <Link href="/experience" className={styles.stackedMenuItem}>
              <div className={styles.menuLabel}>EXPERIENCE_</div>
            </Link>

            <Link href="/projects" className={styles.stackedMenuItem}>
              <div className={styles.menuLabel}>LABS_</div>
            </Link>

            <Link href="/contact" className={styles.stackedMenuItem}>
              <div className={styles.menuLabel}>CONTACT_</div>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
