import React from "react";
import { render, screen, act } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import AboutPage from "./page";

describe("AboutPage Component", () => {
  it("renders status bar and main headings", () => {
    render(<AboutPage />);
    expect(screen.getByText("ABOUT ME_")).toBeInTheDocument();
    expect(screen.getByText("SKILLS")).toBeInTheDocument();
  });

  it("renders dossier metadata values", () => {
    render(<AboutPage />);
    expect(screen.getByText("IDENTIFIER")).toBeInTheDocument();
    expect(screen.getByText("ANDY HAY")).toBeInTheDocument();
    expect(screen.getByText("DESIGNATION")).toBeInTheDocument();
    expect(screen.getByText("SOFTWARE ENGINEERING LEADER")).toBeInTheDocument();
    expect(screen.getByText("LOCATION")).toBeInTheDocument();
    expect(screen.getByText("NEW YORK, NY")).toBeInTheDocument();
  });

  it("renders all skill category groupings and individual skills", () => {
    render(<AboutPage />);
    expect(screen.getByText("Leadership & Strategy")).toBeInTheDocument();
    expect(screen.getByText("Business Strategy")).toBeInTheDocument();

    expect(screen.getByText("Frontend Web Systems")).toBeInTheDocument();
    expect(screen.getByText("React / React 19")).toBeInTheDocument();
    expect(screen.getByText("Next.js / App Router")).toBeInTheDocument();

    expect(screen.getByText("Backend & Systems Architecture")).toBeInTheDocument();
    expect(screen.getByText("Node.js / Express / Fastify")).toBeInTheDocument();
    expect(screen.getByText("PHP / MySQL")).toBeInTheDocument();
  });
});
