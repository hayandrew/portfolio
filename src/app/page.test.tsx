import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "./page";

describe("HomePage Component", () => {
  it("renders large center-aligned heading and subtitle", () => {
    const { container } = render(<HomePage />);
    expect(container.querySelector(".logoContainer")).toBeInTheDocument();
    expect(screen.getByText(/SOFTWARE ENGINEERING LEADER_/i)).toBeInTheDocument();
  });

  it("renders stacked menu items", () => {
    render(<HomePage />);
    expect(screen.getByText("ABOUT_")).toBeInTheDocument();
    expect(screen.getByText("EXPERIENCE_")).toBeInTheDocument();
    expect(screen.getByText("LABS_")).toBeInTheDocument();
    expect(screen.getByText("CONTACT_")).toBeInTheDocument();
  });
});
