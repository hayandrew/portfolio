import { createMailTransport, getFromAddress } from '@/lib/email';
import {
  buildAcknowledgmentEmail,
  buildAdminContactEmail,
  type ContactFormData,
} from '@/lib/email-templates/contact';
import { getEmailConfig } from '@/lib/env';

export async function sendContactEmails(
  data: ContactFormData,
  host?: string | null
): Promise<void> {
  const transport = createMailTransport(host);
  const from = getFromAddress(host);
  const { adminEmail } = getEmailConfig(host);

  const adminEmailContent = buildAdminContactEmail(data);
  const ackEmailContent = buildAcknowledgmentEmail(data);

  console.log(`[Contact Email] Dispatching admin notification to: "${adminEmail}" from: "${from.name} <${from.address}>"`);
  try {
    const adminResult = await transport.sendMail({
      from: `${from.name} <${from.address}>`,
      to: adminEmail,
      replyTo: `${data.name} <${data.email}>`,
      subject: adminEmailContent.subject,
      html: adminEmailContent.html,
    });
    console.log('[Contact Email] Admin notification sent. MessageId/Response:', adminResult);
  } catch (error) {
    console.error('[Contact Email] Failed to send admin notification email:', error);
    throw error;
  }

  console.log(`[Contact Email] Dispatching user acknowledgment to: "${data.email}"`);
  try {
    const ackResult = await transport.sendMail({
      from: `${from.name} <${from.address}>`,
      to: data.email,
      subject: ackEmailContent.subject,
      html: ackEmailContent.html,
    });
    console.log('[Contact Email] User acknowledgment sent. MessageId/Response:', ackResult);
  } catch (error) {
    console.error('[Contact Email] Failed to send user acknowledgment email:', error);
    throw error;
  }
}
