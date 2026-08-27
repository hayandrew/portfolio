import { emailLayout, escapeHtml, formatMessageHtml } from './layout';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export function buildAdminContactEmail(data: ContactFormData): { subject: string; html: string } {
  const { name, email, message } = data;
  const date = new Date().toLocaleString('en-US', {
    dateStyle: 'long',
    timeStyle: 'short',
  });

  const body = `
    <h2 style="color: #00ff66; margin: 0 0 20px; font-size: 18px; font-family: monospace;">[NEW MESSAGE RECEIVED]</h2>
    <div style="background-color: #0c101a; padding: 20px; border-radius: 4px; margin-bottom: 20px; border-left: 4px solid #00ff66; font-family: monospace;">
      <p style="margin: 8px 0; color: #ccd6f6;"><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p style="margin: 8px 0; color: #ccd6f6;"><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}" style="color: #00ff66; text-decoration: none;">${escapeHtml(email)}</a></p>
      <p style="margin: 8px 0; color: #ccd6f6;"><strong>Date:</strong> ${escapeHtml(date)}</p>
    </div>
    <div style="background-color: #0c101a; padding: 20px; border-radius: 4px; border-left: 4px solid #8892b0; font-family: monospace;">
      <h3 style="color: #00ff66; margin: 0 0 12px; font-size: 14px;">[MESSAGE PAYLOAD]</h3>
      <p style="color: #ccd6f6; line-height: 1.6; margin: 0;">${formatMessageHtml(message)}</p>
    </div>
  `;

  return {
    subject: `Contact Form: ${name}`,
    html: emailLayout('Incoming Transmission', body),
  };
}

export function buildAcknowledgmentEmail(data: ContactFormData): { subject: string; html: string } {
  const firstName = data.name.trim().split(/\s+/)[0] || data.name;

  const body = `
    <h2 style="color: #00ff66; margin: 0 0 20px; font-size: 18px; font-family: monospace;">[TRANSMISSION RECEIVED]</h2>
    <p style="color: #ccd6f6; font-family: monospace;">Hi ${escapeHtml(firstName)},</p>
    <p style="color: #ccd6f6; font-family: monospace;">
      Your payload has been successfully routed. I have received your message and will respond as soon as possible.
      A replica of your transmission data is logged below:
    </p>
    <div style="background-color: #0c101a; padding: 20px; border-radius: 4px; margin: 20px 0; border-left: 4px solid #00ff66; font-family: monospace;">
      <p style="color: #ccd6f6; line-height: 1.6; margin: 0;">${formatMessageHtml(data.message)}</p>
    </div>
    <p style="color: #ccd6f6; font-family: monospace;">
      Best regards,<br>
      <strong>Andy Hay</strong>
    </p>
    <p style="color: #666; font-size: 11px; margin-top: 24px; font-family: monospace;">
      Questions? Reply directly to this email or contact me at
      <a href="mailto:andy@andyhay.com" style="color: #00ff66; text-decoration: none;">andy@andyhay.com</a>.
    </p>
  `;

  return {
    subject: "Transmission Received — andyhay.com",
    html: emailLayout('Acknowledgment', body),
  };
}
