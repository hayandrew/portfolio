import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProjectsPage from "./page";

describe("ProjectsPage Component", () => {
  it("renders Hero component and filter console options", () => {
    render(<ProjectsPage />);
    expect(screen.getByRole("heading", { name: "LABS" })).toBeInTheDocument();
    expect(screen.getByText("SELECT REPO_TYPE:")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "[ALL]" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "[WEB]" })).toBeInTheDocument();
  });

  it("renders default layout lists of projects", () => {
    render(<ProjectsPage />);
    expect(screen.getByRole("heading", { level: 3, name: "BET+" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "Earl the Monster" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "LED Visualizer" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "Project Dugout" })).toBeInTheDocument();
  });

  it("filters project cards list dynamically based on selected button filter tag", () => {
    render(<ProjectsPage />);
    const libraryFilterBtn = screen.getByRole("button", { name: "[LIBRARY]" });

    // Filter by Library
    fireEvent.click(libraryFilterBtn);

    // LED Visualizer (OSS Library) should be visible
    expect(screen.getByRole("heading", { level: 3, name: "LED Visualizer" })).toBeInTheDocument();

    // BET+ (Web App Node) should be filtered out
    expect(screen.queryByRole("heading", { level: 3, name: "BET+" })).not.toBeInTheDocument();
  });

  it("renders links for source code and live demos", () => {
    render(<ProjectsPage />);
    const sourceLinks = screen.getAllByRole("link", { name: /view source code/i });
    expect(sourceLinks.length).toBeGreaterThan(0);
    expect(sourceLinks[0]).toHaveAttribute("href", "https://github.com/hayandrew");

    const liveLinks = screen.getAllByRole("link", { name: /open live demonstration/i });
    expect(liveLinks.length).toBeGreaterThan(0);
    expect(liveLinks[0]).toHaveAttribute("href", "https://andyhay.com");
  });
});
