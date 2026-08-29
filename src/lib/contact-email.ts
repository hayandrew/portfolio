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

  await transport.sendMail({
    from: `${from.name} <${from.address}>`,
    to: adminEmail,
    replyTo: `${data.name} <${data.email}>`,
    subject: adminEmailContent.subject,
    html: adminEmailContent.html,
  });

  await transport.sendMail({
    from: `${from.name} <${from.address}>`,
    to: data.email,
    subject: ackEmailContent.subject,
    html: ackEmailContent.html,
  });
}
