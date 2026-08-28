import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ContactPage from './page';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn().mockReturnValue('/contact'),
}));

describe('ContactPage Component', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
    
    // Explicitly reset global properties to undefined to avoid JSDOM caching leaks
    (window as any).grecaptcha = undefined;
    (window as any).onRecaptchaLoad = undefined;
  });

  afterEach(() => {
    global.fetch = originalFetch;
    (window as any).grecaptcha = undefined;
    (window as any).onRecaptchaLoad = undefined;
  });

  const setupMockGrecaptcha = (token = 'mock_grecaptcha_response') => {
    window.grecaptcha = {
      render: vi.fn().mockReturnValue(42),
      getResponse: vi.fn().mockReturnValue(token),
      reset: vi.fn(),
    };
  };

  it('should render form fields, labels, and contact links', () => {
    render(<ContactPage />);

    expect(screen.getByText('MESSAGE TRANSMISSION CONSOLE')).toBeInTheDocument();
    expect(screen.getByLabelText(/NAME:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/EMAIL:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/MESSAGE:/i)).toBeInTheDocument();
    expect(screen.getByText('LINKEDIN')).toBeInTheDocument();
    expect(screen.getByText('GITHUB')).toBeInTheDocument();
    expect(screen.getByText('YOUTUBE')).toBeInTheDocument();
  });

  it('should call reCAPTCHA load function and add script element to document', () => {
    const appendChildSpy = vi.spyOn(document.body, 'appendChild');

    render(<ContactPage />);

    // Check that grecaptcha onload handler was set up
    expect(window.onRecaptchaLoad).toBeDefined();

    // Mock grecaptcha before onload fires
    setupMockGrecaptcha();

    // Trigger grecaptcha load callback
    window.onRecaptchaLoad!();
    expect(window.grecaptcha!.render).toHaveBeenCalled();

    // Confirm recaptcha script element was appended to document body
    const scriptAppended = appendChildSpy.mock.calls.some(
      ([node]) => node instanceof HTMLScriptElement && node.src.includes('recaptcha/api.js')
    );
    expect(scriptAppended).toBe(true);

    appendChildSpy.mockRestore();
  });

  it('should handle inputs successfully and update state values', () => {
    render(<ContactPage />);

    const nameInput = screen.getByLabelText(/NAME:/i) as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: 'Andy' } });
    expect(nameInput.value).toBe('Andy');

    const emailInput = screen.getByLabelText(/EMAIL:/i) as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: 'andy@example.com' } });
    expect(emailInput.value).toBe('andy@example.com');

    const messageInput = screen.getByLabelText(/MESSAGE:/i) as HTMLTextAreaElement;
    fireEvent.change(messageInput, { target: { value: 'Hello there!' } });
    expect(messageInput.value).toBe('Hello there!');
  });

  it('should display error message if reCAPTCHA is not completed', async () => {
    render(<ContactPage />);
    
    expect(window.onRecaptchaLoad).toBeDefined();
    // Mock empty recaptcha response
    setupMockGrecaptcha('');
    window.onRecaptchaLoad!();

    const nameInput = screen.getByLabelText(/NAME:/i);
    const emailInput = screen.getByLabelText(/EMAIL:/i);
    const messageInput = screen.getByLabelText(/MESSAGE:/i);

    fireEvent.change(nameInput, { target: { value: 'Andy' } });
    fireEvent.change(emailInput, { target: { value: 'andy@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'Hello' } });

    const submitBtn = screen.getByRole('button', { name: /send/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText('Please complete the reCAPTCHA verification.')).toBeInTheDocument();
    });
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should submit form data successfully and render the success screen', async () => {
    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      headers: {
        get: (name: string) => (name === 'content-type' ? 'application/json' : null),
      },
      json: async () => ({ success: true, message: 'Message sent successfully' }),
    } as unknown as Response);

    render(<ContactPage />);
    
    expect(window.onRecaptchaLoad).toBeDefined();
    setupMockGrecaptcha();
    window.onRecaptchaLoad!();

    fireEvent.change(screen.getByLabelText(/NAME:/i), { target: { value: 'Andy' } });
    fireEvent.change(screen.getByLabelText(/EMAIL:/i), { target: { value: 'andy@example.com' } });
    fireEvent.change(screen.getByLabelText(/MESSAGE:/i), { target: { value: 'I love your portfolio!' } });

    const submitBtn = screen.getByRole('button', { name: /send/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/TRANSMISSION SUCCESSFUL/i)).toBeInTheDocument();
    });

    expect(global.fetch).toHaveBeenCalledWith('/api/contact', expect.any(Object));
  });

  it('should render server validation errors if contact submission fails', async () => {
    vi.mocked(global.fetch).mockResolvedValue({
      ok: false,
      headers: {
        get: (name: string) => (name === 'content-type' ? 'application/json' : null),
      },
      json: async () => ({ error: 'Invalid email address' }),
    } as unknown as Response);

    render(<ContactPage />);
    
    expect(window.onRecaptchaLoad).toBeDefined();
    setupMockGrecaptcha();
    window.onRecaptchaLoad!();

    fireEvent.change(screen.getByLabelText(/NAME:/i), { target: { value: 'Andy' } });
    fireEvent.change(screen.getByLabelText(/EMAIL:/i), { target: { value: 'invalid@example.com' } });
    fireEvent.change(screen.getByLabelText(/MESSAGE:/i), { target: { value: 'Test' } });

    const submitBtn = screen.getByRole('button', { name: /send/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText('Invalid email address')).toBeInTheDocument();
    });
  });
});
