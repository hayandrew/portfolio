import { describe, it, expect } from 'vitest';
import { buildAdminContactEmail, buildAcknowledgmentEmail } from './contact';

describe('Contact Email Templates Generator', () => {
  const contactData = {
    name: 'Andy Hay',
    email: 'andy@example.com',
    message: 'Hello\nAndy!',
  };

  it('should render admin contact templates with proper properties', () => {
    const result = buildAdminContactEmail(contactData);

    expect(result.subject).toBe('Contact Form: Andy Hay');
    expect(result.html).toContain('NEW MESSAGE RECEIVED');
    expect(result.html).toContain('Andy Hay');
    expect(result.html).toContain('mailto:andy@example.com');
    expect(result.html).toContain('Hello<br>Andy!');
  });

  it('should render visitor acknowledgment templates with proper properties', () => {
    const result = buildAcknowledgmentEmail(contactData);

    expect(result.subject).toBe("Transmission Received — andyhay.com");
    expect(result.html).toContain('TRANSMISSION RECEIVED');
    expect(result.html).toContain('Hi Andy,');
    expect(result.html).toContain('Hello<br>Andy!');
    expect(result.html).toContain('Andy Hay');
    expect(result.html).toContain('andy@andyhay.com');
  });
});
