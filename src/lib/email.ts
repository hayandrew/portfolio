import nodemailer from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';
import { getEmailConfig } from './env';

export function createMailTransport(host?: string | null) {
  const config = getEmailConfig(host);

  console.log('[SMTP Transport] Initializing nodemailer transport:', {
    host: config.smtpHost,
    port: config.smtpPort,
    secure: config.smtpSecure,
    authRequired: config.smtpAuth,
    hasUser: Boolean(process.env.SMTP_USER),
    userEmail: process.env.SMTP_USER || '(none)',
    hasPass: Boolean(process.env.SMTP_PASS),
  });

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
  try {
    await transport.verify();
    console.log('[SMTP Transport] Connection verified successfully');
    return true;
  } catch (error) {
    console.error('[SMTP Transport] Connection verification failed:', error);
    throw error;
  }
}

export function getFromAddress(host?: string | null) {
  const config = getEmailConfig(host);
  return { address: config.fromEmail, name: config.fromName };
}

export { getEmailConfig };
