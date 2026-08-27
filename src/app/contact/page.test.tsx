import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ContactPage from "./page";

describe("ContactPage Component", () => {
  it("renders status bar and transmission console labels", () => {
    render(<ContactPage />);
    expect(screen.getByText("MESSAGE TRANSMISSION CONSOLE")).toBeInTheDocument();
    expect(screen.getByLabelText(/sender_id/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/route_path/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/transmission_payload/i)).toBeInTheDocument();
  });

  it("disables transmit button when form fields are empty", () => {
    render(<ContactPage />);
    const submitBtn = screen.getByRole("button", { name: "TRANSMIT PAYLOAD" });
    expect(submitBtn).toBeDisabled();
  });

  it("enables transmit button when required fields are filled", () => {
    render(<ContactPage />);
    const nameInput = screen.getByLabelText(/sender_id/i);
    const emailInput = screen.getByLabelText(/route_path/i);
    const msgInput = screen.getByLabelText(/transmission_payload/i);
    const submitBtn = screen.getByRole("button", { name: "TRANSMIT PAYLOAD" });

    fireEvent.change(nameInput, { target: { value: "Test User" } });
    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.change(msgInput, { target: { value: "Hello, this is a test transmission payload." } });

    expect(submitBtn).not.toBeDisabled();
  });

  it("submits the form, updates button text to transmitting, and shows success panel after timeout", () => {
    vi.useFakeTimers();
    render(<ContactPage />);

    const nameInput = screen.getByLabelText(/sender_id/i);
    const emailInput = screen.getByLabelText(/route_path/i);
    const msgInput = screen.getByLabelText(/transmission_payload/i);

    fireEvent.change(nameInput, { target: { value: "Test User" } });
    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.change(msgInput, { target: { value: "Hello, this is a test transmission payload." } });

    const submitBtn = screen.getByRole("button", { name: "TRANSMIT PAYLOAD" });
    fireEvent.click(submitBtn);

    // Button updates to transmitting state and disables inputs
    expect(screen.getByRole("button", { name: "TRANSMITTING DATA..." })).toBeInTheDocument();
    expect(nameInput).toBeDisabled();

    // Advance fake timers by 1500ms
    act(() => {
      vi.advanceTimersByTime(1500);
    });

    // Success panel renders
    expect(screen.getByText("[TRANSMISSION SUCCESSFUL]")).toBeInTheDocument();
    expect(screen.getByText(/Queued for review. Node response code 202 ACCEPTED/i)).toBeInTheDocument();

    // Reset button clears success panel
    const newTxBtn = screen.getByRole("button", { name: "OPEN NEW TRANSMISSION" });
    fireEvent.click(newTxBtn);
    expect(screen.queryByText("[TRANSMISSION SUCCESSFUL]")).not.toBeInTheDocument();

    vi.useRealTimers();
  });

  it("renders connection nodes sidebar panel links", () => {
    render(<ContactPage />);
    expect(screen.getByRole("heading", { level: 2, name: "LINKS" })).toBeInTheDocument();
    expect(screen.getByText("EMAIL")).toBeInTheDocument();
    expect(screen.getByText("andy@andyhay.com")).toBeInTheDocument();
    expect(screen.getByText("LINKEDIN")).toBeInTheDocument();
    expect(screen.getByText("GITHUB")).toBeInTheDocument();
  });
});
