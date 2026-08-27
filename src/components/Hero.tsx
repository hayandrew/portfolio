"use client";

import React from "react";
import styles from "@/styles/Hero.module.css";

interface HeroProps {
  section: "about" | "experience" | "projects" | "contact";
}

export default function Hero({ section }: HeroProps) {
  const getSectionDetails = () => {
    switch (section) {
      case "about":
        return {
          title: "ABOUT ME",
          color: "var(--accent-amber)",
          glow: "var(--accent-amber-glow)",
        };
      case "experience":
        return {
          title: "EXPERIENCE",
          color: "var(--accent-green)",
          glow: "var(--accent-green-glow)",
        };
      case "projects":
        return {
          title: "LABS",
          color: "var(--accent-cyan)",
          glow: "var(--accent-cyan-glow)",
        };
      case "contact":
        return {
          title: "CONTACT ME",
          color: "var(--accent-pink)",
          glow: "var(--accent-pink-glow)",
        };
    }
  };

  const { title, color, glow } = getSectionDetails();

  const renderBackgroundSVG = () => {
    switch (section) {
      case "about":
        return (
          <svg className={styles.bgSvg} xmlns="http://www.w3.org/2000/svg">
            {/* Concentric blueprint circles */}
            <circle
              cx="80%"
              cy="50%"
              r="220"
              stroke={color}
              strokeWidth="1.5"
              strokeDasharray="6,8"
              fill="none"
              opacity="0.12"
              className={styles.animatedShape}
            />
            <circle
              cx="80%"
              cy="50%"
              r="160"
              stroke={color}
              strokeWidth="1"
              fill="none"
              opacity="0.08"
            />
            <circle
              cx="80%"
              cy="50%"
              r="300"
              stroke={color}
              strokeWidth="0.5"
              strokeDasharray="2,4"
              fill="none"
              opacity="0.05"
            />
            {/* Diagonal blueprint crosshair */}
            <line
              x1="0"
              y1="35%"
              x2="100%"
              y2="35%"
              stroke={color}
              strokeWidth="0.5"
              opacity="0.08"
            />
            <line
              x1="0"
              y1="75%"
              x2="100%"
              y2="75%"
              stroke={color}
              strokeWidth="0.5"
              opacity="0.08"
            />
            <line
              x1="60%"
              y1="0"
              x2="60%"
              y2="100%"
              stroke={color}
              strokeWidth="0.5"
              opacity="0.08"
              strokeDasharray="4,4"
            />
            {/* Magnified ticks */}
            <path
              d="M 10,10 L 40,10 M 10,10 L 10,40 M 10,10 L 25,25"
              stroke={color}
              strokeWidth="2"
              fill="none"
              opacity="0.2"
              transform="translate(40, 90)"
            />
          </svg>
        );
      case "experience":
        return (
          <svg className={styles.bgSvg} xmlns="http://www.w3.org/2000/svg">
            {/* Stepped timeline paths */}
            <path
              d="M -50,220 L 250,220 L 380,100 L 600,100 L 720,240 L 980,240 L 1100,140 L 1300,140"
              stroke={color}
              strokeWidth="1.5"
              fill="none"
              opacity="0.15"
            />
            <path
              d="M -50,250 L 220,250 L 350,130 L 570,130 L 690,270 L 950,270 L 1070,170 L 1300,170"
              stroke={color}
              strokeWidth="0.75"
              strokeDasharray="4,4"
              fill="none"
              opacity="0.08"
            />
            {/* Stepped timeline node indicators */}
            <circle cx="250" cy="220" r="4.5" fill={color} opacity="0.4" />
            <circle cx="380" cy="100" r="4.5" fill={color} opacity="0.4" />
            <circle cx="720" cy="240" r="4.5" fill={color} opacity="0.4" />
            <circle cx="1100" cy="140" r="4.5" fill={color} opacity="0.4" />
            {/* Chronology vertical markers */}
            <line
              x1="250"
              y1="0"
              x2="250"
              y2="100%"
              stroke={color}
              strokeWidth="0.5"
              strokeDasharray="2,6"
              opacity="0.1"
            />
            <line
              x1="720"
              y1="0"
              x2="720"
              y2="100%"
              stroke={color}
              strokeWidth="0.5"
              strokeDasharray="2,6"
              opacity="0.1"
            />
          </svg>
        );
      case "projects":
        return (
          <svg className={styles.bgSvg} xmlns="http://www.w3.org/2000/svg">
            {/* Isometric grid lines */}
            <path
              d="M -100,-100 L 1400,650 M -100,100 L 1400,850 M -100,300 L 1400,1050"
              stroke={color}
              strokeWidth="0.75"
              opacity="0.1"
            />
            <path
              d="M 1400,-100 L -100,650 M 1400,100 L -100,850"
              stroke={color}
              strokeWidth="0.75"
              strokeDasharray="3,3"
              opacity="0.08"
            />
            {/* Magnified rotating polygon */}
            <polygon
              points="100,0 170,120 30,120"
              stroke={color}
              strokeWidth="1"
              fill="none"
              opacity="0.08"
              className={styles.animatedShape}
              transform="translate(680, 50)"
            />
            {/* Concentric node rings */}
            <circle
              cx="50%"
              cy="40%"
              r="130"
              stroke={color}
              strokeWidth="1"
              fill="none"
              opacity="0.1"
              strokeDasharray="4,6"
            />
          </svg>
        );
      case "contact":
        return (
          <svg className={styles.bgSvg} xmlns="http://www.w3.org/2000/svg">
            {/* Magnified signal sine waves */}
            <path
              d="M -50,150 C 150,50 250,250 450,150 C 650,50 750,250 950,150 C 1150,50 1200,200 1350,150"
              stroke={color}
              strokeWidth="1.5"
              fill="none"
              opacity="0.15"
            />
            <path
              d="M -50,170 C 120,90 280,210 450,170 C 620,90 780,210 950,170 C 1120,90 1220,210 1350,170"
              stroke={color}
              strokeWidth="0.75"
              strokeDasharray="3,5"
              fill="none"
              opacity="0.1"
            />
            {/* Dispatch hubs */}
            <circle cx="450" cy="150" r="5" fill={color} opacity="0.3" />
            <circle cx="950" cy="150" r="5" fill={color} opacity="0.3" />
          </svg>
        );
    }
  };

  return (
    <section className={styles.hero} aria-label={`${section} page banner`}>
      {renderBackgroundSVG()}
      <div className={styles.content}>
        <h1
          className={styles.title}
          style={{ color, textShadow: `0 0 12px ${glow}` }}
        >
          {title}
        </h1>
      </div>
    </section>
  );
}
