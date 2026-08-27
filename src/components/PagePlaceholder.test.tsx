import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PagePlaceholder from "./PagePlaceholder";

describe("PagePlaceholder Component", () => {
  const defaultProps = {
    pageName: "test_page",
    heroTitle: "Hero Title Test",
    heroDescription: "Hero description text test.",
  };

  it("renders pageName in status bar", () => {
    render(<PagePlaceholder {...defaultProps} />);
    expect(screen.getByText("> system_state: test_page online")).toBeInTheDocument();
  });

  it("renders hero title and description", () => {
    render(<PagePlaceholder {...defaultProps} />);
    expect(screen.getByRole("heading", { level: 1, name: /hero title test/i })).toBeInTheDocument();
    expect(screen.getByText("Hero description text test.")).toBeInTheDocument();
  });

  it("renders default layout blocks when no blocks are provided and no children are passed", () => {
    const { container } = render(<PagePlaceholder {...defaultProps} />);
    // Default blocks (BLOCK_01, BLOCK_02, BLOCK_03) should render
    expect(screen.getByText("BLOCK_01")).toBeInTheDocument();
    expect(screen.getByText("BLOCK_02")).toBeInTheDocument();
    expect(screen.getByText("BLOCK_03")).toBeInTheDocument();
  });

  it("renders custom blocks when blocks prop is provided", () => {
    const customBlocks = [
      { title: "Custom Block 1", description: "Desc 1" },
      { title: "Custom Block 2", description: "Desc 2" },
    ];
    render(<PagePlaceholder {...defaultProps} blocks={customBlocks} />);
    expect(screen.getByText("Custom Block 1")).toBeInTheDocument();
    expect(screen.getByText("Desc 1")).toBeInTheDocument();
    expect(screen.getByText("Custom Block 2")).toBeInTheDocument();
    expect(screen.getByText("Desc 2")).toBeInTheDocument();
  });

  it("renders custom children content instead of grid blocks when passed", () => {
    render(
      <PagePlaceholder {...defaultProps}>
        <div data-testid="custom-child">Hello Custom Child</div>
      </PagePlaceholder>
    );
    expect(screen.getByTestId("custom-child")).toBeInTheDocument();
    expect(screen.queryByText("BLOCK_01")).not.toBeInTheDocument();
  });
});
