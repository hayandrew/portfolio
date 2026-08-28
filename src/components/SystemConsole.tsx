"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "@/styles/SystemConsole.module.css";

interface LogMessage {
  text: string;
  type: "system" | "input" | "output" | "error";
}

export default function SystemConsole() {
  const [terminalInput, setTerminalInput] = useState("");
  const [logs, setLogs] = useState<LogMessage[]>([
    { text: "ANDY_HAY_OS [Version 16.2.10]", type: "system" },
    { text: "Initializing cybernetic dashboard framework...", type: "system" },
    { text: "System State: ONLINE. Node 0-5 response 100%.", type: "system" },
    { text: "Type 'help' to view active commands.", type: "system" },
  ]);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Listen for the custom "open-system-console" event
  useEffect(() => {
    const handleOpen = () => setIsTerminalOpen(true);
    window.addEventListener("open-system-console", handleOpen);
    return () => window.removeEventListener("open-system-console", handleOpen);
  }, []);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [logs]);

  // Focus terminal input on body click
  const focusTerminal = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Keyboard navigation & accessibility for ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsTerminalOpen(false);
      }
    };
    if (isTerminalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isTerminalOpen]);

  // Auto focus input when opening terminal
  useEffect(() => {
    if (isTerminalOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isTerminalOpen]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    const newLogs = [
      ...logs,
      { text: `> ${terminalInput}`, type: "input" as const },
    ];

    switch (cmd) {
      case "help":
        newLogs.push({
          text: `AVAILABLE COMMANDS:\n  about      - Display dossier profile of Andy Hay\n  experience - Display professional timeline summary\n  projects   - Display portfolio projects summary\n  contact    - Display connection locations & routing\n  clear      - Clear the console buffer\n  help       - Print this command directory`,
          type: "output",
        });
        break;
      case "about":
        newLogs.push({
          text: `DOSSIER PROFILE: ANDY HAY\nROLE: Software Engineering Manager\nLOCATION: New York, NY\nBIO: Engineering leader with 10+ years experience building consumer products at scale. Specializes in streaming architecture, full-stack React/Node, and high-performance product teams.`,
          type: "output",
        });
        break;
      case "experience":
        newLogs.push({
          text: `TIMELINE OVERVIEW:\n  2022 - 2026: Software Engineering Manager (Paramount Skydance Corporation)\n  2018 - 2022: Lead Software Engineer (ViacomCBS)\n  2014 - 2018: Senior Software Engineer (Viacom, Inc.)\n  2011 - 2014: Senior Software Engineer (Backbase)\n  2006 - 2011: Director, Front-end Development (Ziff Davis Enterprise)\nUse top navigation to inspect the career timeline.`,
          type: "output",
        });
        break;
      case "projects":
        newLogs.push({
          text: `PORTFOLIO HIGHLIGHTS:\n  * Earl the Monster - Children's book interactive brand site\n  * Portfolio Site   - This responsive portfolio site\n  * Kwenchr          - Location-aware happy hour finder app\n  * Reality Stan     - Survivor & Big Brother tracking application\n  * LED Visualizer   - Ambient audio reactive display matrix (ESP32)\n  * Project Dugout   - Retro Tiger game conversion with SPI/ESP32\nUse top navigation to view the full Projects gallery.`,
          type: "output",
        });
        break;
      case "contact":
        newLogs.push({
          text: `ROUTING CHANNELS:\n  LinkedIn: linkedin.com/in/andyhaynyc\n  GitHub:   github.com/hayandrew\n  YouTube:  youtube.com/@ANDYvsMACHINE\nUse top navigation or click Contact page to transmit a direct message.`,
          type: "output",
        });
        break;
      case "clear":
        setLogs([]);
        setTerminalInput("");
        return;
      default:
        newLogs.push({
          text: `Command not found: '${cmd}'. Type 'help' for valid command index.`,
          type: "error",
        });
    }

    setLogs(newLogs);
    setTerminalInput("");
  };

  return (
    <>
      {/* Floating System Console Launcher FAB */}
      <button
        className={styles.consoleLaunchBtnFloating}
        onClick={() => setIsTerminalOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={isTerminalOpen}
        aria-label="Launch System Console"
      >
        <span className={styles.terminalIcon}>&gt;_</span>
        <span className={styles.btnText}>Console</span>
      </button>

      {/* Toggleable overlay console */}
      {isTerminalOpen && (
        <div
          className={styles.consoleOverlay}
          role="dialog"
          aria-modal="true"
          aria-label="System Command Terminal"
          onClick={() => setIsTerminalOpen(false)}
        >
          <div
            className={styles.consoleModalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.consoleCloseBtn}
              onClick={() => setIsTerminalOpen(false)}
              aria-label="Close terminal"
            >
              [ESC] CLOSE_CONSOLE
            </button>

            <div className={styles.terminalContainer} onClick={focusTerminal}>
              <div className={styles.terminalHeader}>
                <div className={styles.terminalTitle}>
                  SYSTEM COMMAND TERMINAL
                </div>
              </div>
              <div className={styles.terminalBody} ref={terminalBodyRef}>
                {logs.map((log, idx) => (
                  <div
                    key={idx}
                    className={styles.logEntry}
                    style={{
                      color:
                        log.type === "input"
                          ? "#ffffff"
                          : log.type === "error"
                            ? "var(--accent-red)"
                            : log.type === "output"
                              ? "var(--accent-cyan)"
                              : "var(--accent-green)",
                      textShadow:
                        log.type === "output"
                          ? "0 0 5px var(--accent-cyan-glow)"
                          : log.type === "error"
                            ? "none"
                            : "0 0 5px var(--accent-green-glow)",
                    }}
                  >
                    {log.text}
                  </div>
                ))}
                <form
                  onSubmit={handleCommand}
                  className={styles.terminalInputLine}
                >
                  <span className={styles.prompt}>hayandrew@port_node:~#</span>
                  <input
                    type="text"
                    ref={inputRef}
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    className={styles.inputField}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    aria-label="Terminal command input"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
