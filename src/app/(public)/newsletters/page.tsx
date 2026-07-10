import Link from 'next/link';
import Image from 'next/image';
import Pagination from '@/components/Pagination';
import { getNewslettersIndexData } from '@/lib/db/public-data';
import { formatNewsletterIssueLabel } from '@/lib/newsletter/email-context';
import { DEFAULT_PAGE_SIZE, parsePageParam } from '@/lib/pagination';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'Newsletters' };

export default async function NewslettersArchivePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const { pagination, issues } = await getNewslettersIndexData(
    parsePageParam(pageParam),
    DEFAULT_PAGE_SIZE,
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-wider text-[#c5a059]">DSB Law Group</p>
      <h1 className="mt-2 text-3xl font-bold text-[#05162e] sm:text-4xl">Newsletter archive</h1>
      <p className="mt-4 max-w-2xl text-slate-600">
        Browse past legal updates and labour code insights. Subscribe from any page to receive new issues by email.
      </p>

      {issues.length === 0 ? (
        <p className="mt-12 rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
          No published newsletter issues yet.
        </p>
      ) : (
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {issues.map((issue) => (
            <li key={issue.id}>
              <Link
                href={`/newsletters/${issue.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:border-[#c5a059] hover:shadow-md"
              >
                <div className="relative aspect-[4/3] bg-[#05162e]">
                  {issue.coverImagePath ? (
                    <Image
                      src={issue.coverImagePath}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                      <span className="text-sm font-semibold uppercase tracking-wider text-[#c5a059]">
                        {issue.issueNumber ? `Issue ${issue.issueNumber}` : 'Newsletter'}
                      </span>
                      <span className="mt-2 text-lg font-bold text-white">{issue.subject}</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#c5a059]">
                    {formatNewsletterIssueLabel(issue.issueNumber, issue.issueDate)}
                  </p>
                  <h2 className="mt-2 text-lg font-semibold text-[#05162e] group-hover:text-[#c5a059]">
                    {issue.subject}
                  </h2>
                  {issue.teaser ? (
                    <p className="mt-2 line-clamp-3 text-sm text-slate-600">{issue.teaser}</p>
                  ) : null}
                  <span className="mt-auto pt-4 text-sm font-semibold text-[#05162e]">Read issue →</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <Pagination basePath="/newsletters" {...pagination} />
    </div>
  );
}
