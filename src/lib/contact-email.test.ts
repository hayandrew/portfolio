import { describe, it, expect, vi, beforeEach } from 'vitest';
import { sendContactEmails } from './contact-email';
import { createMailTransport, getFromAddress } from '@/lib/email';
import { buildAcknowledgmentEmail, buildAdminContactEmail } from '@/lib/email-templates/contact';
import { getEmailConfig } from '@/lib/env';

vi.mock('@/lib/email', () => ({
  createMailTransport: vi.fn(),
  getFromAddress: vi.fn(),
}));

vi.mock('@/lib/email-templates/contact', () => ({
  buildAdminContactEmail: vi.fn(),
  buildAcknowledgmentEmail: vi.fn(),
}));

vi.mock('@/lib/env', () => ({
  getEmailConfig: vi.fn(),
}));

describe('sendContactEmails utility', () => {
  const mockTransport = {
    sendMail: vi.fn(),
  };

  const contactData = {
    name: 'Andy',
    email: 'andy@example.com',
    message: 'Hello Andy!',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(createMailTransport).mockReturnValue(mockTransport as any);
    vi.mocked(getFromAddress).mockReturnValue({ address: 'andy@andyhay.com', name: 'Andy Hay' });
    vi.mocked(getEmailConfig).mockReturnValue({ adminEmail: 'andy@andyhay.com' } as any);

    vi.mocked(buildAdminContactEmail).mockReturnValue({
      subject: 'Admin Subject',
      html: '<p>Admin HTML</p>',
    });

    vi.mocked(buildAcknowledgmentEmail).mockReturnValue({
      subject: 'User Ack Subject',
      html: '<p>User Ack HTML</p>',
    });
  });

  it('should send both admin contact email and user acknowledgment email', async () => {
    mockTransport.sendMail.mockResolvedValue({ messageId: '123' });

    await sendContactEmails(contactData, 'localhost:3000');

    expect(createMailTransport).toHaveBeenCalledWith('localhost:3000');
    expect(getFromAddress).toHaveBeenCalledWith('localhost:3000');
    expect(getEmailConfig).toHaveBeenCalledWith('localhost:3000');

    // Admin email assertions
    expect(mockTransport.sendMail).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        from: 'Andy Hay <andy@andyhay.com>',
        to: 'andy@andyhay.com',
        replyTo: 'Andy <andy@example.com>',
        subject: 'Admin Subject',
        html: '<p>Admin HTML</p>',
      })
    );

    // User ack email assertions
    expect(mockTransport.sendMail).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        from: 'Andy Hay <andy@andyhay.com>',
        to: 'andy@example.com',
        subject: 'User Ack Subject',
        html: '<p>User Ack HTML</p>',
      })
    );
  });
});
