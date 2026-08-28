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

  console.log('[reCAPTCHA] Starting verification:', {
    host,
    remoteIp: remoteIp ? 'present' : 'none',
    hasSecret: Boolean(secret),
    secretPrefix: secret ? `${secret.slice(0, 4)}... (length: ${secret.length})` : 'MISSING',
    tokenPrefix: `${token.slice(0, 8)}... (length: ${token.length})`,
  });

  if (!secret) {
    console.error('[reCAPTCHA] Error: No reCAPTCHA secret key configured for host:', host);
  }

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
    console.error(`[reCAPTCHA] Siteverify HTTP error: ${response.status} ${response.statusText}`);
    throw new Error('Failed to verify reCAPTCHA');
  }

  const data = (await response.json()) as RecaptchaVerifyResponse;
  console.log('[reCAPTCHA] Google verification response:', {
    success: data.success,
    errorCodes: data['error-codes'] ?? [],
  });

  return {
    success: data.success,
    errorCodes: data['error-codes'],
  };
}
