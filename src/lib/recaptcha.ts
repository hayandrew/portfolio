import { getRecaptchaSecretKey } from './env';

interface RecaptchaVerifyResponse {
  success: boolean;
  'error-codes'?: string[];
}

export async function verifyRecaptcha(
  token: string,
  host?: string | null,
  remoteIp?: string
): Promise<{ success: boolean; errorCodes?: string[] }> {
  const secret = getRecaptchaSecretKey(host);

  const body = new URLSearchParams({
    secret,
    response: token,
  });

  if (remoteIp) {
    body.set('remoteip', remoteIp);
  }

  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });

  if (!response.ok) {
    throw new Error('Failed to verify reCAPTCHA');
  }

  const data = (await response.json()) as RecaptchaVerifyResponse;
  return {
    success: data.success,
    errorCodes: data['error-codes'],
  };
}
