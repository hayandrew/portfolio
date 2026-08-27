import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ExperiencePage from "./page";

describe("ExperiencePage Component", () => {
  it("renders Hero component", () => {
    render(<ExperiencePage />);
    expect(screen.getByRole("heading", { name: "EXPERIENCE" })).toBeInTheDocument();
  });

  it("renders all timeline experience cards with their company details", () => {
    render(<ExperiencePage />);
    expect(screen.getByRole("heading", { level: 3, name: "Software Engineering Manager" })).toBeInTheDocument();
    expect(screen.getByText("> Paramount Skydance Corporation")).toBeInTheDocument();
    expect(screen.getByText("2022 - 2026")).toBeInTheDocument();

    expect(screen.getByRole("heading", { level: 3, name: "Lead Software Engineer" })).toBeInTheDocument();
    expect(screen.getByText("> ViacomCBS")).toBeInTheDocument();
    expect(screen.getByText("2018 - 2022")).toBeInTheDocument();

    expect(screen.getByRole("heading", { level: 3, name: "Director, Front-end Development" })).toBeInTheDocument();
    expect(screen.getByText("> Ziff Davis Enterprise")).toBeInTheDocument();
    expect(screen.getByText("2006 - 2011")).toBeInTheDocument();
  });
});
