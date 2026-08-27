import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { usePathname } from "next/navigation";
import ContactPage from "./page";

describe("ContactPage Component", () => {
  const mockRender = vi.fn();
  const mockGetResponse = vi.fn();
  const mockReset = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(usePathname).mockReturnValue("/contact");

    // Clear grecaptcha from window on each setup
    delete (window as any).grecaptcha;
    delete (window as any).onRecaptchaLoad;

    // Mock global fetch
    global.fetch = vi.fn();
  });

  afterEach(() => {
    delete (window as any).grecaptcha;
    delete (window as any).onRecaptchaLoad;
    delete (global as any).fetch;
  });

  const simulateRecaptchaLoad = () => {
    // Define grecaptcha on window to simulate script completion
    window.grecaptcha = {
      render: mockRender.mockReturnValue(123),
      getResponse: mockGetResponse,
      reset: mockReset,
    };

    // Trigger component onload callback
    if (window.onRecaptchaLoad) {
      act(() => {
        window.onRecaptchaLoad!();
      });
    }
  };

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

  it("shows error when reCAPTCHA is not completed", async () => {
    render(<ContactPage />);
    
    mockGetResponse.mockReturnValue(""); // Empty token
    simulateRecaptchaLoad();

    const nameInput = screen.getByLabelText(/sender_id/i);
    const emailInput = screen.getByLabelText(/route_path/i);
    const msgInput = screen.getByLabelText(/transmission_payload/i);
    const submitBtn = screen.getByRole("button", { name: "TRANSMIT PAYLOAD" });

    fireEvent.change(nameInput, { target: { value: "Test User" } });
    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.change(msgInput, { target: { value: "Hello, this is a test transmission payload." } });

    await act(async () => {
      fireEvent.click(submitBtn);
    });

    expect(screen.getByText("Please complete reCAPTCHA verification.")).toBeInTheDocument();
  });

  it("submits the form successfully and displays success panel", async () => {
    const mockJson = vi.fn().mockResolvedValue({ success: true });
    (global.fetch as any).mockResolvedValue({
      ok: true,
      headers: {
        get: () => "application/json",
      },
      json: mockJson,
    });

    render(<ContactPage />);
    
    mockGetResponse.mockReturnValue("valid-token");
    simulateRecaptchaLoad();

    const nameInput = screen.getByLabelText(/sender_id/i);
    const emailInput = screen.getByLabelText(/route_path/i);
    const msgInput = screen.getByLabelText(/transmission_payload/i);
    const submitBtn = screen.getByRole("button", { name: "TRANSMIT PAYLOAD" });

    fireEvent.change(nameInput, { target: { value: "Test User" } });
    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.change(msgInput, { target: { value: "Hello, this is a test transmission payload." } });

    await act(async () => {
      fireEvent.click(submitBtn);
    });

    expect(global.fetch).toHaveBeenCalledWith("/api/contact", expect.objectContaining({
      method: "POST",
    }));

    expect(screen.getByText("[TRANSMISSION SUCCESSFUL]")).toBeInTheDocument();
    expect(screen.getByText(/Queued for review. Node response code 202 ACCEPTED/i)).toBeInTheDocument();

    // Reset button clears success panel
    const newTxBtn = screen.getByRole("button", { name: "OPEN NEW TRANSMISSION" });
    fireEvent.click(newTxBtn);
    expect(screen.queryByText("[TRANSMISSION SUCCESSFUL]")).not.toBeInTheDocument();
  });

  it("handles server error response correctly", async () => {
    const mockJson = vi.fn().mockResolvedValue({ error: "SMTP dispatch failed" });
    (global.fetch as any).mockResolvedValue({
      ok: false,
      headers: {
        get: () => "application/json",
      },
      json: mockJson,
    });

    render(<ContactPage />);
    
    mockGetResponse.mockReturnValue("valid-token");
    simulateRecaptchaLoad();

    const nameInput = screen.getByLabelText(/sender_id/i);
    const emailInput = screen.getByLabelText(/route_path/i);
    const msgInput = screen.getByLabelText(/transmission_payload/i);
    const submitBtn = screen.getByRole("button", { name: "TRANSMIT PAYLOAD" });

    fireEvent.change(nameInput, { target: { value: "Test User" } });
    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.change(msgInput, { target: { value: "Hello, this is a test transmission payload." } });

    await act(async () => {
      fireEvent.click(submitBtn);
    });

    expect(screen.getByText("[TRANSMISSION ERROR]")).toBeInTheDocument();
    expect(screen.getByText("SMTP dispatch failed")).toBeInTheDocument();
    expect(mockReset).toHaveBeenCalledWith(123);
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
