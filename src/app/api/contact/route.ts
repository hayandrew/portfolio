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

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: 'No form data received' }, { status: 400 });
  }

  const name = (formData.get('name') as string | null)?.trim() ?? '';
  const email = (formData.get('email') as string | null)?.trim() ?? '';
  const message = (formData.get('message') as string | null)?.trim() ?? '';
  const recaptchaToken =
    (formData.get('g-recaptcha-response') as string | null)?.trim() ?? '';

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
  }

  if (!recaptchaToken) {
    return NextResponse.json({ error: 'reCAPTCHA verification is required' }, { status: 400 });
  }

  try {
    const recaptcha = await verifyRecaptcha(recaptchaToken, host, getClientIp(request));

    if (!recaptcha.success) {
      console.error('reCAPTCHA verification failed:', recaptcha.errorCodes);
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed. Please try again.' },
        { status: 400 }
      );
    }

    await sendContactEmails({ name, email, message }, host);

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
    });
  } catch (err) {
    if (err instanceof Error && err.message === 'Failed to verify reCAPTCHA') {
      return NextResponse.json(
        { error: 'Failed to verify reCAPTCHA. Please try again.' },
        { status: 500 }
      );
    }

    console.error('Contact form error:', err);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 200 });
}
