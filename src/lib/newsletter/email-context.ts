export type NewsletterEmailContext = {
  subject: string;
  bodyHtml: string;
  openPixelUrl: string;
  archiveUrl?: string;
  pdfUrl?: string;
  issueNumber?: string | null;
  teaser?: string | null;
};

export function formatNewsletterIssueLabel(issueNumber?: string | null, issueDate?: Date | string | null) {
  const parts: string[] = [];
  if (issueNumber) parts.push(`Issue ${issueNumber}`);
  if (issueDate) {
    const d = typeof issueDate === 'string' ? new Date(issueDate) : issueDate;
    parts.push(d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }));
  }
  return parts.join(' · ');
}
