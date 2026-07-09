import { absoluteUrl, buildEmailHtml, getEmailFrom, getReplyTo } from '@/lib/email/templates';
import { formatNewsletterIssueLabel } from '@/lib/newsletter/email-context';

export { absoluteUrl } from '@/lib/email/templates';

export type SendNewsletterOptions = {
  subject: string;
  bodyHtml: string;
  openPixelUrl: string;
  archiveUrl?: string;
  pdfUrl?: string;
  issueNumber?: string | null;
  issueDate?: Date | null;
  teaser?: string | null;
};

export async function sendEmail(to: string, subject: string, html: string) {
  const from = getEmailFrom();
  const replyTo = getReplyTo();

  if (process.env.RESEND_API_KEY) {
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
      ...(replyTo ? { reply_to: replyTo } : {}),
    });

    if (error) {
      console.error('[email] Resend error:', error);
      throw new Error(error.message);
    }
    return;
  }

  if (process.env.NODE_ENV === 'development') {
    console.log(`[dev email] From: ${from}\nTo: ${to}\nSubject: ${subject}\n${html}\n---`);
    return;
  }

  console.warn(`[email] RESEND_API_KEY is not set — email to ${to} was not sent.`);
}

export async function sendVerificationEmail(
  email: string,
  token: string,
  options?: {
    name?: string;
    categoryNames?: string[];
    frequency?: string;
  },
) {
  const url = absoluteUrl(`/verify-email?token=${encodeURIComponent(token)}`);
  const {
    formatCategoryList,
    formatSubscriptionFrequency,
  } = await import('@/lib/subscription/labels');

  const newsletterBlock =
    options?.categoryNames?.length && options.frequency
      ? `<p><strong>Newsletter preferences</strong></p>
<ul style="margin:0 0 16px;padding-left:20px;color:#334155;">
  <li>Practice areas: ${formatCategoryList(options.categoryNames)}</li>
  <li>Frequency: ${formatSubscriptionFrequency(options.frequency)}</li>
</ul>`
      : '';

  const greeting = options?.name ? `<p>Hello ${options.name},</p>` : '';

  const html = buildEmailHtml({
    title: 'Verify your email address',
    bodyHtml: `${greeting}<p>Thank you for registering with DSB Law Group.</p>
${newsletterBlock}<p>Please confirm your email address to activate your client account, read premium articles, and manage newsletter preferences.</p>
<p style="margin:0;color:#64748b;font-size:14px;">This verification link expires in 24 hours.</p>
<p style="margin:16px 0 0;color:#64748b;font-size:13px;word-break:break-all;">If the button does not work, copy this link:<br><a href="${url}">${url}</a></p>`,
    ctaUrl: url,
    ctaLabel: 'Verify email address',
  });
  await sendEmail(email, 'Verify your DSB Law Group account', html);
  return url;
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const url = absoluteUrl(`/reset-password?token=${encodeURIComponent(token)}`);
  const html = buildEmailHtml({
    title: 'Reset your password',
    bodyHtml: `<p>We received a request to reset your password. This link expires in one hour. If you did not request this, you can ignore this email.</p>`,
    ctaUrl: url,
    ctaLabel: 'Reset password',
  });
  await sendEmail(email, 'Reset your DSB Law Group password', html);
  return url;
}

export async function sendSubscriberVerifyEmail(email: string, token: string) {
  const url = absoluteUrl(`/verify-subscriber?token=${encodeURIComponent(token)}`);
  const html = buildEmailHtml({
    title: 'Confirm your subscription',
    bodyHtml: `<p>Please confirm your newsletter subscription to receive legal updates from DSB Law Group.</p>`,
    ctaUrl: url,
    ctaLabel: 'Confirm subscription',
  });
  await sendEmail(email, 'Confirm your DSB Law Group subscription', html);
  return url;
}

export async function sendNewsletterEmail(to: string, options: SendNewsletterOptions) {
  const issueLabel = formatNewsletterIssueLabel(options.issueNumber, options.issueDate ?? null);
  const teaserBlock = options.teaser ? `<p style="margin:0 0 16px;color:#64748b;">${options.teaser}</p>` : '';
  const pixel = `<img src="${options.openPixelUrl}" width="1" height="1" alt="" style="display:none;" />`;

  const html = buildEmailHtml({
    title: options.subject,
    bodyHtml: `${teaserBlock}${options.bodyHtml}${pixel}`,
    issueLabel: issueLabel || undefined,
    ctaUrl: options.archiveUrl,
    ctaLabel: options.archiveUrl ? 'Read issue online' : undefined,
    secondaryCtaUrl: options.pdfUrl,
    secondaryCtaLabel: options.pdfUrl ? 'Download PDF' : undefined,
  });

  await sendEmail(to, options.subject, html);
}
