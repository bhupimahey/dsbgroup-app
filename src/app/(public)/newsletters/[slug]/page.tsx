import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPublishedNewsletterBySlug } from '@/lib/cms/cache';
import { formatNewsletterIssueLabel } from '@/lib/newsletter/email-context';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const issue = await getPublishedNewsletterBySlug(slug);
  if (!issue) return {};
  return {
    title: issue.subject,
    description: issue.teaser ?? `Newsletter issue ${issue.issueNumber ?? ''}`.trim(),
  };
}

export default async function NewsletterIssuePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const issue = await getPublishedNewsletterBySlug(slug);

  if (!issue) notFound();

  const issueLabel = formatNewsletterIssueLabel(issue.issueNumber, issue.issueDate);

  return (
    <article className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <Link href="/newsletters" className="text-sm font-semibold text-[#c5a059] hover:underline">
        ← All newsletters
      </Link>

      {issueLabel ? (
        <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-[#c5a059]">{issueLabel}</p>
      ) : null}
      <h1 className="mt-2 text-3xl font-bold text-[#05162e] sm:text-4xl">{issue.subject}</h1>
      {issue.teaser ? <p className="mt-4 max-w-3xl text-lg text-slate-600">{issue.teaser}</p> : null}

      <div className="mt-8 flex flex-wrap gap-3">
        {issue.pdfPath ? (
          <>
            <a
              href={issue.pdfPath}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-[#05162e] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0a2444]"
            >
              Download PDF
            </a>
            <a
              href={`${issue.pdfPath}#view=FitH`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-[#c5a059] bg-white px-5 py-2.5 text-sm font-semibold text-[#05162e] hover:bg-[#faf6ef]"
            >
              Open in new tab
            </a>
          </>
        ) : null}
      </div>

      {issue.bodyHtml ? (
        <div
          className="cms-html prose prose-slate mt-10 max-w-none border-t border-slate-200 pt-10"
          dangerouslySetInnerHTML={{ __html: issue.bodyHtml }}
        />
      ) : null}

      {issue.pdfPath ? (
        <div className="mt-10 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-inner">
          <iframe
            src={issue.pdfPath}
            title={issue.subject}
            className="h-[80vh] w-full min-h-[640px] bg-white"
          />
        </div>
      ) : (
        <p className="mt-10 rounded-lg border border-dashed border-slate-300 p-8 text-center text-slate-500">
          No PDF file attached to this issue.
        </p>
      )}
    </article>
  );
}
