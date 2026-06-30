export type NewsletterEmailContext = {
  subject: string;
  bodyHtml: string;
  openPixelUrl: string;
  archiveUrl?: string;
  pdfUrl?: string;
  issueNumber?: string | null;
  teaser?: string | null;
};

export function formatNewsletterIssueLabel(issueNumber?: string | null, issueDate?: Date | null) {
  const parts: string[] = [];
  if (issueNumber) parts.push(`Issue ${issueNumber}`);
  if (issueDate) {
    parts.push(
      issueDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
    );
  }
  return parts.join(' · ');
}
