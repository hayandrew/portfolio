import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Navigation from "./Navigation";
import { usePathname } from "next/navigation";

// The mock in vitest.setup.ts sets usePathname to "/" by default.
// We can override it in individual tests if needed.

describe("Navigation Component", () => {
  it("renders logo link and title", () => {
    render(<Navigation />);
    const logoLink = screen.getByRole("link", { name: /andy hay portfolio home/i });
    expect(logoLink).toBeInTheDocument();
    expect(screen.getByText("ANDY HAY")).toBeInTheDocument();
    expect(screen.getByText("> SOFTWARE ENGINEERING LEADER_")).toBeInTheDocument();
  });

  it("renders all navigation items on sub-pages (desktop and mobile)", () => {
    vi.mocked(usePathname).mockReturnValue("/about");
    render(<Navigation />);
    // Check links (home should only exist for mobile, others on both)
    const homeLinks = screen.getAllByRole("link", { name: /home/i });
    expect(homeLinks.length).toBe(2); // Logo link and mobile home link
    expect(screen.getAllByRole("link", { name: /about/i }).length).toBe(2);
    expect(screen.getAllByRole("link", { name: /experience/i }).length).toBe(2);
    expect(screen.getAllByRole("link", { name: /projects/i }).length).toBe(2);
    expect(screen.getAllByRole("link", { name: /contact/i }).length).toBe(2);
  });

  it("renders only mobile navigation items on homepage", () => {
    vi.mocked(usePathname).mockReturnValue("/");
    render(<Navigation />);
    // Check links (desktop menu is hidden on home route)
    const homeLinks = screen.getAllByRole("link", { name: /home/i });
    expect(homeLinks.length).toBe(2); // Logo link and mobile home link
    expect(screen.getAllByRole("link", { name: /about/i }).length).toBe(1); // Mobile only
    expect(screen.getAllByRole("link", { name: /experience/i }).length).toBe(1);
    expect(screen.getAllByRole("link", { name: /projects/i }).length).toBe(1);
    expect(screen.getAllByRole("link", { name: /contact/i }).length).toBe(1);
  });

  it("marks the active link based on pathname", () => {
    // Mock pathname as "/about"
    vi.mocked(usePathname).mockReturnValue("/about");

    const { container } = render(<Navigation />);
    // The activeNavLink class should be present on the active Link
    const activeLink = container.querySelector('[class*="activeNavLink"]');
    expect(activeLink).toBeInTheDocument();
    expect(activeLink?.textContent).toContain("about");
  });

  it("toggles the mobile drawer menu when menu button is clicked", () => {
    render(<Navigation />);
    const menuButton = screen.getByRole("button", { name: /open menu/i });
    expect(menuButton).toBeInTheDocument();
    expect(menuButton).toHaveAttribute("aria-expanded", "false");

    // Click to open
    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("button", { name: /close menu/i })).toBeInTheDocument();

    // Click to close
    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute("aria-expanded", "false");
  });
});
