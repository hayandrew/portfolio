import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProjectsPage from "./page";

describe("ProjectsPage Component", () => {
  it("renders Hero component and filter console options", () => {
    render(<ProjectsPage />);
    expect(screen.getByText("SELECT REPO_TYPE:")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "[ALL]" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "[WEB]" })).toBeInTheDocument();
  });

  it("renders default layout lists of projects", () => {
    render(<ProjectsPage />);
    expect(screen.getByRole("heading", { level: 3, name: "Earl the Monster" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "Portfolio Site" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "LED Visualizer" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "Project Dugout" })).toBeInTheDocument();
  });

  it("filters project cards list dynamically based on selected button filter tag", () => {
    render(<ProjectsPage />);
    const esp32FilterBtn = screen.getByRole("button", { name: "[ESP32]" });

    // Filter by ESP32
    fireEvent.click(esp32FilterBtn);

    // LED Visualizer (ESP32) should be visible
    expect(screen.getByRole("heading", { level: 3, name: "LED Visualizer" })).toBeInTheDocument();

    // Earl the Monster (Web) should be filtered out
    expect(screen.queryByRole("heading", { level: 3, name: "Earl the Monster" })).not.toBeInTheDocument();
  });

  it("renders links for source code and live demos", () => {
    render(<ProjectsPage />);
    const sourceLinks = screen.getAllByRole("link", { name: /view source code/i });
    expect(sourceLinks.length).toBeGreaterThan(0);
    expect(sourceLinks[0]).toHaveAttribute("href", "https://github.com/hayandrew/earlthemonster");

    const liveLinks = screen.getAllByRole("link", { name: /open live demonstration/i });
    expect(liveLinks.length).toBeGreaterThan(0);
    expect(liveLinks[0]).toHaveAttribute("href", "https://earlthemonster.com");
  });
});
