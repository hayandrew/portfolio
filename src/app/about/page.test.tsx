import React from "react";
import { render, screen, act } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import AboutPage from "./page";

describe("AboutPage Component", () => {
  it("renders status bar and main headings", () => {
    render(<AboutPage />);
    expect(screen.getByRole("heading", { name: "ABOUT_DOSSIER" })).toBeInTheDocument();
    expect(screen.getByText("SYSTEM_BIO_DATA")).toBeInTheDocument();
    expect(screen.getByText("SKILLS_RATING_MATRIX")).toBeInTheDocument();
  });

  it("renders dossier metadata values", () => {
    render(<AboutPage />);
    expect(screen.getByText("IDENTIFIER")).toBeInTheDocument();
    expect(screen.getByText("ANDY HAY")).toBeInTheDocument();
    expect(screen.getByText("DESIGNATION")).toBeInTheDocument();
    expect(screen.getByText("SOFTWARE ENGINEERING MANAGER")).toBeInTheDocument();
    expect(screen.getByText("LOCATION NODE")).toBeInTheDocument();
    expect(screen.getByText("NEW YORK, NY")).toBeInTheDocument();
  });

  it("renders all skill category groupings and individual skills", () => {
    render(<AboutPage />);
    expect(screen.getByText("Frontend Web Systems")).toBeInTheDocument();
    expect(screen.getByText("React / React 19")).toBeInTheDocument();
    expect(screen.getByText("Next.js / App Router")).toBeInTheDocument();

    expect(screen.getByText("Backend & Systems Architecture")).toBeInTheDocument();
    expect(screen.getByText("Node.js / Express / Fastify")).toBeInTheDocument();
    expect(screen.getByText("Go / Rust (Systems Coding)")).toBeInTheDocument();

    expect(screen.getByText("Hardware & IoT Integrations")).toBeInTheDocument();
    expect(screen.getByText("ESP32 / ESP8266 Microcontrollers")).toBeInTheDocument();
    expect(screen.getByText("C++ / Arduino IDE / PlatformIO")).toBeInTheDocument();
  });

  it("triggers animation changes for skill progress bars on mount", () => {
    vi.useFakeTimers();
    const { container } = render(<AboutPage />);

    // Initially progress bars width should be 0% before animation state resolves
    const progressFill = container.querySelector('[class*="progressBarFill"]') as HTMLElement;
    expect(progressFill?.style.width).toBe("0%");

    // Fast-forward animation timer
    act(() => {
      vi.advanceTimersByTime(160);
    });

    // Width should now match the actual level of React / React 19 (95%)
    expect(progressFill?.style.width).toBe("95%");
    vi.useRealTimers();
  });
});
