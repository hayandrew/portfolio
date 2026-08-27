import React from "react";
import styles from "@/styles/PagePlaceholder.module.css";

interface ContentBlock {
  title: string;
  description: string;
}

interface PagePlaceholderProps {
  pageName: string;
  heroTitle: string;
  heroDescription: string;
  blocks?: ContentBlock[];
  children?: React.ReactNode;
}

export default function PagePlaceholder({
  pageName,
  heroTitle,
  heroDescription,
  blocks = [],
  children,
}: PagePlaceholderProps) {
  return (
    <div className="page-container">
      <div className={`content-wrapper ${styles.placeholderWrapper}`}>
        {/* Active Route Status Bar */}
        <div className={styles.statusBar}>
          <span>&gt; system_state: {pageName} online</span>
          <span className={styles.statusDot}></span>
        </div>

        {/* Hero Section Placeholder */}
        <section className={styles.heroSection}>
          <div className={styles.sectionLabel}>
            [ HERO PLACEHOLDER ]
          </div>
          <h1 className={styles.heroTitle}>
            {heroTitle}
          </h1>
          <p className={styles.heroDescription}>
            {heroDescription}
          </p>
        </section>

        {/* Content Section Placeholder */}
        <section className={styles.contentSection}>
          <div className={styles.sectionLabel}>
            [ CONTENT PLACEHOLDER ]
          </div>

          <div className={styles.contentWrapper}>
            {children ? children : (
              <div className={styles.gridContainer}>
                {blocks.length > 0 ? (
                  blocks.map((block, idx) => (
                    <div key={idx} className={styles.blockItem}>
                      <h3 className={styles.blockTitle}>
                        {block.title}
                      </h3>
                      <p className={styles.blockDesc}>
                        {block.description}
                      </p>
                    </div>
                  ))
                ) : (
                  [1, 2, 3].map((item) => (
                    <div key={item} className={styles.blockItem}>
                      <div className={styles.defaultBlockMeta}>
                        <span className={styles.defaultBlockLabel}>
                          BLOCK_0{item}
                        </span>
                        <span className={styles.defaultBlockDot}></span>
                      </div>
                      <h3 className={styles.defaultBlockTitle}>
                        Section block
                      </h3>
                      <div className={styles.defaultBlockLines}>
                        <div className={styles.defaultLine1}></div>
                        <div className={styles.defaultLine2}></div>
                        <div className={styles.defaultLine3}></div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
