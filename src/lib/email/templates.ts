const siteName = process.env.EMAIL_FROM_NAME ?? 'DSB Law Group';
const fromAddress = process.env.EMAIL_FROM_ADDRESS ?? 'noreply';
const fromDomain = process.env.RESEND_FROM_DOMAIN ?? 'dsblaw.local';
const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export function absoluteUrl(path: string) {
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

export function getEmailFrom(): string {
  if (process.env.EMAIL_FROM) {
    return process.env.EMAIL_FROM;
  }
  return `${siteName} <${fromAddress}@${fromDomain}>`;
}

export function getReplyTo(): string | undefined {
  return process.env.EMAIL_REPLY_TO || undefined;
}

type EmailTemplateOptions = {
  title: string;
  bodyHtml: string;
  ctaUrl?: string;
  ctaLabel?: string;
  secondaryCtaUrl?: string;
  secondaryCtaLabel?: string;
  issueLabel?: string;
};

export function buildEmailHtml({
  title,
  bodyHtml,
  ctaUrl,
  ctaLabel,
  secondaryCtaUrl,
  secondaryCtaLabel,
  issueLabel,
}: EmailTemplateOptions): string {
  const ctaBlock =
    ctaUrl && ctaLabel
      ? `<p style="margin:24px 0 12px;"><a href="${ctaUrl}" style="background:#05162e;color:#fff;padding:12px 24px;border-radius:4px;text-decoration:none;display:inline-block;font-weight:600;">${ctaLabel}</a></p>`
      : '';

  const secondaryCtaBlock =
    secondaryCtaUrl && secondaryCtaLabel
      ? `<p style="margin:0 0 24px;"><a href="${secondaryCtaUrl}" style="background:#c5a059;color:#05162e;padding:12px 24px;border-radius:4px;text-decoration:none;display:inline-block;font-weight:600;">${secondaryCtaLabel}</a></p>`
      : '';

  const issueBlock = issueLabel
    ? `<p style="margin:0 0 12px;color:#c5a059;font-size:13px;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;">${issueLabel}</p>`
    : '';

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>${title}</title></head>
<body style="margin:0;padding:0;background:#f0f2f5;font-family:Outfit,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f2f5;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
        <tr><td style="background:#05162e;padding:22px 32px;border-bottom:3px solid #c5a059;">
          <p style="margin:0;color:#fff;font-size:18px;font-weight:700;">${siteName}</p>
          <p style="margin:6px 0 0;color:#c5a059;font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;">Legal Updates Newsletter</p>
        </td></tr>
        <tr><td style="padding:32px;color:#091622;font-size:15px;line-height:1.65;">
          ${issueBlock}
          <h1 style="margin:0 0 16px;font-size:22px;color:#05162e;">${title}</h1>
          ${bodyHtml}
          ${ctaBlock}
          ${secondaryCtaBlock}
        </td></tr>
        <tr><td style="padding:16px 32px;background:#f8fafc;font-size:12px;color:#64748b;">
          <p style="margin:0;">&copy; ${new Date().getFullYear()} ${siteName}. <a href="${base}" style="color:#c5a059;">Visit website</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
