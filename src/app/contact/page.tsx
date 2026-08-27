"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import styles from "@/styles/contact.module.css";

// Determine environment and use appropriate keys (matching earlthemonster defaults)
const isDevelopment =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1" ||
    window.location.hostname.includes(".test") ||
    window.location.hostname.includes(".local") ||
    window.location.hostname.includes("vercel.app") ||
    window.location.hostname.includes("netlify.app") ||
    window.location.hostname === "localhost:8000" ||
    window.location.hostname === "localhost:3000");

const RECAPTCHA_SITE_KEY =
  (isDevelopment
    ? process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY_DEV
    : process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY_PROD) || "";


declare global {
  interface Window {
    grecaptcha?: {
      render: (
        container: HTMLElement,
        options: { sitekey: string; theme?: "light" | "dark" },
      ) => number;
      getResponse: (widgetId: number) => string;
      reset: (widgetId: number) => void;
    };
    onRecaptchaLoad?: () => void;
  }
}

export default function ContactPage() {
  const [senderName, setSenderName] = useState("");
  const [routeEmail, setRouteEmail] = useState("");
  const [payloadMessage, setPayloadMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "transmitting" | "success">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const pathname = usePathname();
  const recaptchaContainerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    const cleanupRecaptcha = () => {
      // Remove reCAPTCHA badge and iframes
      const recaptchaElements = document.querySelectorAll(
        '.grecaptcha-badge, iframe[src*="recaptcha"]',
      );
      recaptchaElements.forEach((element) => {
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
      });

      // Remove reCAPTCHA script
      if (scriptRef.current?.parentNode) {
        scriptRef.current.parentNode.removeChild(scriptRef.current);
      }
      scriptRef.current = null;
      widgetIdRef.current = null;
      window.grecaptcha = undefined;
      window.onRecaptchaLoad = undefined;
    };

    if (pathname === "/contact") {
      const loadRecaptcha = () => {
        // Don't load if already loaded
        if (window.grecaptcha || scriptRef.current) {
          return;
        }

        // Set up the callback for when reCAPTCHA is ready
        window.onRecaptchaLoad = () => {
          // Only render if container exists and hasn't been rendered yet
          if (
            recaptchaContainerRef.current &&
            window.grecaptcha &&
            widgetIdRef.current === null
          ) {
            try {
              widgetIdRef.current = window.grecaptcha.render(
                recaptchaContainerRef.current,
                {
                  sitekey: RECAPTCHA_SITE_KEY,
                  theme: "dark",
                },
              );
            } catch (error) {
              console.error("Error rendering reCAPTCHA:", error);
            }
          }
        };

        const script = document.createElement("script");
        script.src = `https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad`;
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
        scriptRef.current = script;
      };

      loadRecaptcha();
      return cleanupRecaptcha;
    }
  }, [pathname]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!senderName || !routeEmail || !payloadMessage) return;

    if (!window.grecaptcha || widgetIdRef.current === null) {
      setErrorMsg("reCAPTCHA loader not initialized.");
      return;
    }

    const token = window.grecaptcha.getResponse(widgetIdRef.current);
    if (!token) {
      setErrorMsg("Please complete reCAPTCHA verification.");
      return;
    }

    setStatus("transmitting");

    try {
      const form = new FormData();
      form.append("name", senderName);
      form.append("email", routeEmail);
      form.append("message", payloadMessage);
      form.append("g-recaptcha-response", token);

      const response = await fetch("/api/contact", {
        method: "POST",
        body: form,
      });

      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        throw new Error("Server returned an invalid response");
      }

      if (!response.ok) {
        throw new Error(data.error || "Failed to route transmission");
      }

      setStatus("success");
      setSenderName("");
      setRouteEmail("");
      setPayloadMessage("");
    } catch (err) {
      console.error("Form submission error:", err);
      setErrorMsg(err instanceof Error ? err.message : "Failed to route transmission");
      setStatus("idle");
      if (window.grecaptcha && widgetIdRef.current !== null) {
        window.grecaptcha.reset(widgetIdRef.current);
      }
    }
  };

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className={styles.contactContainer}>
          <div className={styles.gridSection}>
            {/* Message Dispatch Terminal (Left Column) */}
            <section
              className={styles.terminalFormWindow}
              aria-label="Message Terminal"
            >
              <div className={styles.terminalFormHeader}>
                <div className={styles.terminalFormTitle}>
                  MESSAGE TRANSMISSION CONSOLE
                </div>
                <div className={styles.terminalStatus}>
                  <div className={styles.statusIndicator} />
                  <span>
                    {status === "transmitting"
                      ? "DISPATCHING PAYLOAD..."
                      : status === "success"
                        ? "TRANSMISSION NOMINAL"
                        : "DISPATCHER READY"}
                  </span>
                </div>
              </div>

              <div className={styles.terminalFormBody}>
                {errorMsg && (
                  <div className={styles.errorPanel}>
                    <div className={styles.errorHeader}>
                      <span>[TRANSMISSION ERROR]</span>
                    </div>
                    <div className={styles.errorDesc}>
                      {errorMsg}
                    </div>
                  </div>
                )}

                {status === "success" && (
                  <div className={styles.successPanel}>
                    <div className={styles.successHeader}>
                      <span>[TRANSMISSION SUCCESSFUL]</span>
                    </div>
                    <div className={styles.successDesc}>
                      Your payload data has been routed and queued for review.
                      Node response code 202 ACCEPTED. Thank you for connecting.
                    </div>
                    <button
                      onClick={() => {
                        setStatus("idle");
                        setErrorMsg(null);
                      }}
                      className={styles.successResetBtn}
                    >
                      OPEN NEW TRANSMISSION
                    </button>
                  </div>
                )}

                {status !== "success" && (
                  <form
                    onSubmit={handleSubmit}
                    className={styles.transmissionForm}
                  >
                    <div className={styles.formGroup}>
                      <label htmlFor="name-input" className={styles.formLabel}>
                        SENDER_ID (NAME):
                      </label>
                      <div className={styles.inputWrapper}>
                        <span className={styles.inputPrefix}>&gt;</span>
                        <input
                          type="text"
                          id="name-input"
                          required
                          value={senderName}
                          onChange={(e) => setSenderName(e.target.value)}
                          className={styles.terminalInput}
                          placeholder="e.g. USER_01"
                          disabled={status === "transmitting"}
                        />
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="email-input" className={styles.formLabel}>
                        ROUTE_PATH (EMAIL):
                      </label>
                      <div className={styles.inputWrapper}>
                        <span className={styles.inputPrefix}>&gt;</span>
                        <input
                          type="email"
                          id="email-input"
                          required
                          value={routeEmail}
                          onChange={(e) => setRouteEmail(e.target.value)}
                          className={styles.terminalInput}
                          placeholder="e.g. user@example.com"
                          disabled={status === "transmitting"}
                        />
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label
                        htmlFor="message-input"
                        className={styles.formLabel}
                      >
                        TRANSMISSION_PAYLOAD (MESSAGE):
                      </label>
                      <div className={styles.inputWrapper}>
                        <textarea
                          id="message-input"
                          required
                          value={payloadMessage}
                          onChange={(e) => setPayloadMessage(e.target.value)}
                          className={`${styles.terminalInput} ${styles.terminalTextarea}`}
                          placeholder="Write your connection payload details here..."
                          disabled={status === "transmitting"}
                        />
                      </div>
                    </div>

                    <div className={styles.formGroup} style={{ marginTop: "0.5rem", minHeight: "78px" }}>
                      <div ref={recaptchaContainerRef} />
                    </div>

                    <button
                      type="submit"
                      className={styles.transmitBtn}
                      disabled={
                        status === "transmitting" ||
                        !senderName ||
                        !routeEmail ||
                        !payloadMessage
                      }
                    >
                      {status === "transmitting"
                        ? "TRANSMITTING DATA..."
                        : "TRANSMIT PAYLOAD"}
                    </button>
                  </form>
                )}
              </div>
            </section>

            {/* Connection Nodes Sidebar (Right Column) */}
            <aside
              className={styles.connectionsPanel}
              aria-label="Connection Streams"
            >
              <div className={styles.nodesCard}>
                <h2 className={styles.nodesCardTitle}>LINKS</h2>

                <div className={styles.nodeList}>
                  <a href="mailto:andy@andyhay.com" className={styles.nodeLink}>
                    <div className={styles.nodeIcon}>
                      <svg
                        className="w-5 h-5"
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
                    </div>
                    <div className={styles.nodeInfo}>
                      <span className={styles.nodeName}>EMAIL</span>
                      <span className={styles.nodeAddress}>
                        andy@andyhay.com
                      </span>
                    </div>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/andyhaynyc/"
                    target="_blank"
                    rel="noreferrer"
                    className={styles.nodeLink}
                  >
                    <div className={styles.nodeIcon}>
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                      </svg>
                    </div>
                    <div className={styles.nodeInfo}>
                      <span className={styles.nodeName}>LINKEDIN</span>
                      <span className={styles.nodeAddress}>in/andyhaynyc</span>
                    </div>
                  </a>

                  <a
                    href="https://github.com/hayandrew"
                    target="_blank"
                    rel="noreferrer"
                    className={styles.nodeLink}
                  >
                    <div className={styles.nodeIcon}>
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.193 22 16.44 22 12.017 22 6.484 17.522 2 12 2z"
                        />
                      </svg>
                    </div>
                    <div className={styles.nodeInfo}>
                      <span className={styles.nodeName}>GITHUB</span>
                      <span className={styles.nodeAddress}>hayandrew</span>
                    </div>
                  </a>
                  <a
                    href="https://www.youtube.com/@ANDYvsMACHINE"
                    target="_blank"
                    rel="noreferrer"
                    className={styles.nodeLink}
                  >
                    <div className={styles.nodeIcon}>
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.193 22 16.44 22 12.017 22 6.484 17.522 2 12 2z"
                        />
                      </svg>
                    </div>
                    <div className={styles.nodeInfo}>
                      <span className={styles.nodeName}>YOUTUBE</span>
                      <span className={styles.nodeAddress}>ANDYvsMACHINE</span>
                    </div>
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
