export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function formatMessageHtml(message: string): string {
  return escapeHtml(message).replace(/\n/g, '<br>');
}

export function emailLayout(title: string, body: string): string {
  return `
    <div style="font-family: monospace, Courier, monospace; max-width: 600px; margin: 0 auto; border: 1px solid #1a2333; background-color: #030712;">
      <div style="background-color: #080c14; padding: 24px; text-align: center; border-bottom: 2px solid #00ff66;">
        <h1 style="color: #00ff66; margin: 0; font-size: 24px; letter-spacing: 0.1em; text-shadow: 0 0 5px rgba(0,255,102,0.3);">ANDYHAY.COM</h1>
        <p style="color: #8892b0; margin: 8px 0 0; font-size: 14px;">${escapeHtml(title)}</p>
      </div>
      <div style="padding: 32px; background-color: #030712; color: #ccd6f6; line-height: 1.6;">
        ${body}
      </div>
      <div style="background-color: #080c14; padding: 20px; text-align: center; border-top: 1px solid #1a2333;">
        <p style="color: #666; font-size: 12px; margin: 0;">
          <a href="https://andyhay.com" style="color: #00ff66; text-decoration: none;">andyhay.com</a>
        </p>
      </div>
    </div>
  `;
}
