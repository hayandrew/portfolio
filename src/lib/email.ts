import nodemailer from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';
import { getEmailConfig } from './env';

export function createMailTransport(host?: string | null) {
  const config = getEmailConfig(host);

  const options: SMTPTransport.Options = {
    host: config.smtpHost,
    port: config.smtpPort,
    secure: config.smtpSecure,
    auth: config.smtpAuth
      ? {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        }
      : undefined,
  };

  return nodemailer.createTransport(options);
}

export async function verifyMailTransport(host?: string | null): Promise<boolean> {
  const transport = createMailTransport(host);
  await transport.verify();
  return true;
}

export function getFromAddress(host?: string | null) {
  const config = getEmailConfig(host);
  return { address: config.fromEmail, name: config.fromName };
}

export { getEmailConfig };
