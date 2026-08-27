/**
 * Server-side and client-side environment detection and configuration.
 */

const DEV_HOST_PATTERNS = [
  /^localhost(:\d+)?$/,
  /^127\.0\.0\.1(:\d+)?$/,
  /^192\.168\.\d{1,3}\.\d{1,3}(:\d+)?$/,
  /^10\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d+)?$/,
  /^172\.(1[6-9]|2\d|3[0-1])\.\d{1,3}\.\d{1,3}(:\d+)?$/,
  /\.test$/,
  /\.local$/,
  /\.vercel\.app$/,
  /\.netlify\.app$/,
];

export function isDevelopmentHost(host: string | null | undefined): boolean {
  if (!host) {
    return process.env.NODE_ENV === 'development';
  }

  const hostname = host.split(':')[0].toLowerCase();
  return DEV_HOST_PATTERNS.some((pattern) => pattern.test(host) || pattern.test(hostname));
}

export function shouldUseTestKeys(host?: string | null): boolean {
  return isDevelopmentHost(host ?? null);
}

export function getRecaptchaSiteKey(host?: string | null): string {
  const test = shouldUseTestKeys(host);
  let key = test
    ? process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY_DEV
    : process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY_PROD;

  if (test && !key && process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY_PROD) {
    key = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY_PROD;
  }

  return key || "";
}

export function getRecaptchaSecretKey(host?: string | null): string {
  const test = shouldUseTestKeys(host);
  let key = test
    ? process.env.RECAPTCHA_SECRET_KEY_DEV
    : process.env.RECAPTCHA_SECRET_KEY_PROD;

  if (test && !key && process.env.RECAPTCHA_SECRET_KEY_PROD) {
    key = process.env.RECAPTCHA_SECRET_KEY_PROD;
  }

  return key || "";
}

export interface EmailConfig {
  smtpHost: string;
  smtpPort: number;
  smtpAuth: boolean;
  smtpSecure: boolean;
  fromEmail: string;
  fromName: string;
  adminEmail: string;
}

export function getEmailConfig(host?: string | null): EmailConfig {
  const isDev = isDevelopmentHost(host);

  return {
    smtpHost: process.env.SMTP_HOST ?? (isDev ? 'localhost' : 'localhost'),
    smtpPort: parseInt(process.env.SMTP_PORT ?? (isDev ? '1025' : '25'), 10),
    smtpAuth: process.env.SMTP_AUTH === 'true',
    smtpSecure: process.env.SMTP_SECURE === 'true',
    fromEmail: process.env.SMTP_FROM_EMAIL ?? 'andy@andyhay.com',
    fromName: process.env.SMTP_FROM_NAME ?? 'Andy Hay',
    adminEmail: process.env.ADMIN_EMAIL ?? 'andy@andyhay.com',
  };
}

export function getEnvironmentInfo(host?: string | null) {
  return {
    environment: shouldUseTestKeys(host) ? 'test' : 'live',
    isDevelopment: isDevelopmentHost(host),
    nodeEnv: process.env.NODE_ENV,
  };
}
