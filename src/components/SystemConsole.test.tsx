import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SystemConsole from "./SystemConsole";

describe("SystemConsole Component", () => {
  it("renders floating launcher button initially and hides terminal dialog", () => {
    render(<SystemConsole />);
    expect(screen.getByRole("button", { name: /launch system console/i })).toBeInTheDocument();
    expect(screen.queryByRole("dialog", { name: /system command terminal/i })).not.toBeInTheDocument();
  });

  it("opens terminal overlay modal when clicking launcher button", () => {
    render(<SystemConsole />);
    const launchBtn = screen.getByRole("button", { name: /launch system console/i });
    fireEvent.click(launchBtn);

    expect(screen.getByRole("dialog", { name: /system command terminal/i })).toBeInTheDocument();
    expect(screen.getByText("SYSTEM COMMAND TERMINAL")).toBeInTheDocument();
  });

  it("opens terminal overlay modal when receiving 'open-system-console' custom event", () => {
    render(<SystemConsole />);
    expect(screen.queryByRole("dialog", { name: /system command terminal/i })).not.toBeInTheDocument();

    act(() => {
      window.dispatchEvent(new Event("open-system-console"));
    });

    expect(screen.getByRole("dialog", { name: /system command terminal/i })).toBeInTheDocument();
  });

  it("handles console command runs and clears logs correctly", () => {
    render(<SystemConsole />);
    // Open console
    fireEvent.click(screen.getByRole("button", { name: /launch system console/i }));

    const input = screen.getByLabelText(/terminal command input/i);
    expect(input).toBeInTheDocument();

    // Submit help command
    fireEvent.change(input, { target: { value: "help" } });
    fireEvent.submit(input.closest("form")!);

    expect(screen.getByText(/> help/i)).toBeInTheDocument();
    expect(screen.getByText(/AVAILABLE COMMANDS:/i)).toBeInTheDocument();

    // Submit clear command
    fireEvent.change(input, { target: { value: "clear" } });
    fireEvent.submit(input.closest("form")!);

    expect(screen.queryByText(/AVAILABLE COMMANDS:/i)).not.toBeInTheDocument();
  });

  it("closes console when clicking ESC close button or pressing Escape key", () => {
    render(<SystemConsole />);
    
    // Open console
    fireEvent.click(screen.getByRole("button", { name: /launch system console/i }));
    expect(screen.getByRole("dialog", { name: /system command terminal/i })).toBeInTheDocument();

    // Close via close button
    fireEvent.click(screen.getByRole("button", { name: /close terminal/i }));
    expect(screen.queryByRole("dialog", { name: /system command terminal/i })).not.toBeInTheDocument();

    // Re-open
    fireEvent.click(screen.getByRole("button", { name: /launch system console/i }));
    expect(screen.getByRole("dialog", { name: /system command terminal/i })).toBeInTheDocument();

    // Close via Escape key
    fireEvent.keyDown(window, { key: "Escape", code: "Escape" });
    expect(screen.queryByRole("dialog", { name: /system command terminal/i })).not.toBeInTheDocument();
  });
});
