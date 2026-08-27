import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "./page";

describe("HomePage Component", () => {
  it("renders large center-aligned heading and subtitle", () => {
    const { container } = render(<HomePage />);
    expect(container.querySelector(".logoContainer")).toBeInTheDocument();
    expect(screen.getByText(/> SOFTWARE ENGINEERING LEADER/i)).toBeInTheDocument();
  });

  it("renders stacked menu items with indices", () => {
    render(<HomePage />);
    expect(screen.getByText("Dossier Profile")).toBeInTheDocument();
    expect(screen.getByText("[01]")).toBeInTheDocument();
    expect(screen.getByText("Career Timeline")).toBeInTheDocument();
    expect(screen.getByText("[02]")).toBeInTheDocument();
    expect(screen.getByText("Projects Gallery")).toBeInTheDocument();
    expect(screen.getByText("[03]")).toBeInTheDocument();
    expect(screen.getByText("Routing Channels")).toBeInTheDocument();
    expect(screen.getByText("[04]")).toBeInTheDocument();
  });
});
