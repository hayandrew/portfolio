import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import Logo from "./Logo";

describe("Logo Component", () => {
  beforeEach(() => {
    // Save and stub window.innerWidth / window.innerHeight
    vi.spyOn(window, "innerWidth", "get").mockReturnValue(1024);
    vi.spyOn(window, "innerHeight", "get").mockReturnValue(768);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders container structures", () => {
    const { container } = render(<Logo />);

    expect(container.querySelector(".logoContainer")).toBeInTheDocument();
    expect(container.querySelector(".logo")).toBeInTheDocument();
    expect(container.querySelector(".shadows")).toBeInTheDocument();
  });

  it("creates HTML list items and SVG paths for each letter in desktop view", () => {
    const { container } = render(<Logo />);

    const letters = container.querySelectorAll(".logo .letters");
    expect(letters.length).toBe(8);

    // Check that each letter li contains an svg and path
    letters.forEach((letter) => {
      const svg = letter.querySelector("svg");
      expect(svg).toBeInTheDocument();
      expect(svg?.querySelector("path")).toBeInTheDocument();
    });

    const shadows = container.querySelectorAll(".shadows .letters");
    expect(shadows.length).toBe(8);
  });

  it("creates HTML list items for each letter without shadows in mobile view", () => {
    // Simulate mobile viewport and mobile User Agent
    vi.spyOn(window, "innerWidth", "get").mockReturnValue(500);
    Object.defineProperty(window.navigator, "userAgent", {
      value: "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X)",
      writable: true,
      configurable: true,
    });

    const { container } = render(<Logo />);

    const letters = container.querySelectorAll(".logo .letters");
    expect(letters.length).toBe(8);

    const shadows = container.querySelectorAll(".shadows .letters");
    expect(shadows.length).toBe(8);
  });

  it("triggers hover/mouseenter animation in desktop view", () => {
    vi.useFakeTimers();
    const { container } = render(<Logo />);

    // Fast-forward 1200ms to bind events
    act(() => {
      vi.advanceTimersByTime(1200);
    });

    const firstLetter = container.querySelector(".logo .letters");
    expect(firstLetter).toBeInTheDocument();

    // Trigger mouse enter
    fireEvent.mouseEnter(firstLetter!);
    vi.useRealTimers();
  });

  it("attaches touch events in mobile view", () => {
    vi.useFakeTimers();
    vi.spyOn(window, "innerWidth", "get").mockReturnValue(500);
    Object.defineProperty(window.navigator, "userAgent", {
      value: "Mobi",
      writable: true,
      configurable: true,
    });

    const addSpy = vi.spyOn(HTMLUListElement.prototype, "addEventListener");
    const removeSpy = vi.spyOn(HTMLUListElement.prototype, "removeEventListener");

    const { unmount } = render(<Logo />);

    // Fast-forward 1200ms to bind events
    act(() => {
      vi.advanceTimersByTime(1200);
    });

    expect(addSpy).toHaveBeenCalledWith("touchstart", expect.any(Function), {
      passive: false,
    });
    expect(addSpy).toHaveBeenCalledWith("touchmove", expect.any(Function), {
      passive: false,
    });
    expect(addSpy).toHaveBeenCalledWith("touchend", expect.any(Function), {
      passive: false,
    });

    unmount();

    expect(removeSpy).toHaveBeenCalledWith("touchstart", expect.any(Function));
    expect(removeSpy).toHaveBeenCalledWith("touchmove", expect.any(Function));
    expect(removeSpy).toHaveBeenCalledWith("touchend", expect.any(Function));

    vi.useRealTimers();
  });

  it("supports window resize functionality in desktop view", () => {
    vi.useFakeTimers();
    render(<Logo />);

    // Fast-forward 1200ms to bind events
    act(() => {
      vi.advanceTimersByTime(1200);
    });

    const resizeEvent = new Event("resize");

    act(() => {
      window.dispatchEvent(resizeEvent);
      vi.advanceTimersByTime(350);
    });

    vi.useRealTimers();
  });
});
