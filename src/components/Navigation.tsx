"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/styles/navigation.module.css";
import Logo from "./Logo";

interface MenuItem {
  label: string;
  path: string;
  external?: boolean;
  icon: React.ReactNode;
}

const menuItems: MenuItem[] = [
  {
    label: "home",
    path: "/",
    icon: (
      <svg
        className="w-4 h-4 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
  },
  {
    label: "about",
    path: "/about",
    icon: (
      <svg
        className="w-4 h-4 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
  },
  {
    label: "experience",
    path: "/experience",
    icon: (
      <svg
        className="w-4 h-4 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    label: "projects",
    path: "/projects",
    icon: (
      <svg
        className="w-4 h-4 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      </svg>
    ),
  },
  {
    label: "contact",
    path: "/contact",
    icon: (
      <svg
        className="w-4 h-4 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
];
export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const [isVisible, setIsVisible] = useState(pathname !== "/");

  // Close mobile drawer and update visibility state on route transition by adjusting state during rendering.
  // This avoids cascading renders caused by updating state synchronously within an effect.
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
    setIsVisible(pathname !== "/");
  }

  // Handle scroll visibility for the homepage
  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const handleScroll = () => {
      // Guard against scroll events firing during route transitions
      if (window.location.pathname !== "/") {
        return;
      }

      // Look for the homepage hero container class
      const logoEl = document.querySelector('[class*="heroNameContainer"]');
      if (logoEl) {
        const rect = logoEl.getBoundingClientRect();
        // Hide until the logo is scrolled past the top of the viewport
        if (rect.bottom < 0) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      } else {
        // Fallback threshold
        if (window.scrollY > 300) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Disable body scroll when mobile overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const isHeaderVisible = pathname !== "/" || isVisible;

  return (
    <header
      className={`${styles.header} ${!isHeaderVisible ? styles.headerHidden : ""}`}
    >
      {/* Header Logo */}
      <Link
        href="/"
        className={styles.logoLink}
        aria-label="Andy Hay Portfolio Home"
      >
        <Logo scaleMultiplier={0.5} className={styles.headerLogo} />
      </Link>

      {/* Desktop Navigation Menu */}
      {pathname !== "/" && (
        <nav aria-label="Desktop Navigation">
          <ul className={styles.desktopNav}>
            {menuItems
              .filter((item) => item.path !== "/")
              .map((item) => {
                const isActive = pathname === item.path;
                if (item.external) {
                  return (
                    <li key={item.path} className={styles.navItem}>
                      <a
                        href={item.path}
                        target="_blank"
                        rel="noreferrer"
                        className={`${styles.navLink} ${styles.inlineFlexLink}`}
                      >
                        {item.icon}
                        {item.label}
                      </a>
                    </li>
                  );
                }
                return (
                  <li key={item.path} className={styles.navItem}>
                    <Link
                      href={item.path}
                      className={`${styles.navLink} ${isActive ? styles.activeNavLink : ""} ${styles.inlineFlexLink}`}
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </nav>
      )}

      {/* Mobile Menu Toggle Button */}
      <button
        className={`${styles.menuBtn} ${pathname === "/" ? styles.homeMenuBtn : ""} ${isOpen ? styles.menuOpen : ""}`}
        onClick={toggleMenu}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        <div className={styles.burgerLine} />
        <div className={styles.burgerLine} />
        <div className={styles.burgerLine} />
      </button>

      {/* Mobile Drawer Overlay */}
      <div
        className={`${styles.mobileOverlay} ${isOpen ? styles.mobileOverlayOpen : ""}`}
      >
        <nav aria-label="Mobile Navigation">
          <ul className={styles.mobileNav}>
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              if (item.external) {
                return (
                  <li key={item.path} className={styles.mobileNavItem}>
                    <a
                      href={item.path}
                      target="_blank"
                      rel="noreferrer"
                      className={`${styles.mobileNavLink} ${styles.inlineFlexLink}`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.icon}
                      {item.label}
                    </a>
                  </li>
                );
              }
              return (
                <li key={item.path} className={styles.mobileNavItem}>
                  <Link
                    href={item.path}
                    className={`${styles.mobileNavLink} ${isActive ? styles.mobileActiveNavLink : ""} ${styles.inlineFlexLink}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
