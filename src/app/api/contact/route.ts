import { NextResponse } from 'next/server';
import { sendContactEmails } from '@/lib/contact-email';
import { verifyRecaptcha } from '@/lib/recaptcha';

function getClientIp(request: Request): string | undefined {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    undefined
  );
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  const host = request.headers.get('host');
  const ip = getClientIp(request);
  console.log(`[Contact API] Received submission request. Host: "${host}", IP: "${ip}"`);

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch (err) {
    console.error('[Contact API] Failed to parse form data:', err);
    return NextResponse.json({ error: 'No form data received' }, { status: 400 });
  }

  const name = (formData.get('name') as string | null)?.trim() ?? '';
  const email = (formData.get('email') as string | null)?.trim() ?? '';
  const message = (formData.get('message') as string | null)?.trim() ?? '';
  const recaptchaToken =
    (formData.get('g-recaptcha-response') as string | null)?.trim() ?? '';

  console.log('[Contact API] Form payload received:', {
    hasName: Boolean(name),
    emailProvided: email,
    messageLength: message.length,
    hasRecaptchaToken: Boolean(recaptchaToken),
    tokenLength: recaptchaToken.length,
  });

  if (!name || !email || !message) {
    console.warn('[Contact API] Missing required form fields');
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    console.warn(`[Contact API] Invalid email provided: "${email}"`);
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
  }

  if (!recaptchaToken) {
    console.warn('[Contact API] Missing reCAPTCHA token in form submission');
    return NextResponse.json({ error: 'reCAPTCHA verification is required' }, { status: 400 });
  }

  try {
    console.log('[Contact API] Verifying reCAPTCHA token with Google...');
    const recaptcha = await verifyRecaptcha(recaptchaToken, host, ip);

    if (!recaptcha.success) {
      console.error('[Contact API] reCAPTCHA verification failed:', {
        errorCodes: recaptcha.errorCodes,
        host,
      });
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed. Please try again.' },
        { status: 400 }
      );
    }
    console.log('[Contact API] reCAPTCHA verification succeeded');

    console.log('[Contact API] Sending contact emails via SMTP...');
    await sendContactEmails({ name, email, message }, host);
    console.log('[Contact API] Contact emails sent successfully');

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
    });
  } catch (err: unknown) {
    if (err instanceof Error && err.message === 'Failed to verify reCAPTCHA') {
      console.error('[Contact API] reCAPTCHA verification endpoint error:', err);
      return NextResponse.json(
        { error: 'Failed to verify reCAPTCHA. Please try again.' },
        { status: 500 }
      );
    }

    const errorDetails = err instanceof Error ? {
      name: err.name,
      message: err.message,
      stack: err.stack,
      ...(err as unknown as Record<string, unknown>),
    } : err;

    console.error('[Contact API] Error processing contact submission:', errorDetails);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 200 });
}

