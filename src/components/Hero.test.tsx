import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Hero from "./Hero";

describe("Hero Component", () => {
  it("renders about section details and SVG correctly", () => {
    const { container } = render(<Hero section="about" />);
    expect(screen.getByRole("heading", { name: "ABOUT_DOSSIER" })).toBeInTheDocument();
    expect(screen.getByText("System Node: Biometric & Technical Specs")).toBeInTheDocument();
    expect(container.querySelector("svg")).toBeInTheDocument();
    expect(container.querySelector("circle")).toBeInTheDocument();
  });

  it("renders experience section details and SVG correctly", () => {
    const { container } = render(<Hero section="experience" />);
    expect(screen.getByRole("heading", { name: "EXPERIENCE_TIMELINE" })).toBeInTheDocument();
    expect(screen.getByText("System History: Professional Chronology")).toBeInTheDocument();
    expect(container.querySelector("svg")).toBeInTheDocument();
    expect(container.querySelector("path")).toBeInTheDocument();
  });

  it("renders projects section details and SVG correctly", () => {
    const { container } = render(<Hero section="projects" />);
    expect(screen.getByRole("heading", { name: "PROJECTS_REPOSITORY" })).toBeInTheDocument();
    expect(screen.getByText("System Showcase: Open Source & Hardware Nodes")).toBeInTheDocument();
    expect(container.querySelector("svg")).toBeInTheDocument();
    expect(container.querySelector("polygon")).toBeInTheDocument();
  });

  it("renders contact section details and SVG correctly", () => {
    const { container } = render(<Hero section="contact" />);
    expect(screen.getByRole("heading", { name: "CONTACT_ROUTING" })).toBeInTheDocument();
    expect(screen.getByText("System Channels: Direct Payload Dispatch")).toBeInTheDocument();
    expect(container.querySelector("svg")).toBeInTheDocument();
    expect(container.querySelector("path")).toBeInTheDocument();
  });
});
