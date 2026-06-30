import Link from 'next/link';
import { buildPageHref, getPageNumbers } from '@/lib/pagination';

type PaginationProps = {
  basePath: string;
  page: number;
  totalPages: number;
  total: number;
  from: number;
  to: number;
  query?: Record<string, string | number | undefined | null>;
  pageParam?: string;
};

export default function Pagination({
  basePath,
  page,
  totalPages,
  total,
  from,
  to,
  query,
  pageParam = 'page',
}: PaginationProps) {
  if (total === 0) return null;

  const pageNumbers = getPageNumbers(page, totalPages);
  const href = (targetPage: number) => buildPageHref(basePath, targetPage, query, pageParam);

  return (
    <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-6">
      <p className="text-sm text-slate-500">
        Showing {from}–{to} of {total}
      </p>

      {totalPages > 1 ? (
        <nav className="flex flex-wrap items-center gap-1" aria-label="Pagination">
          {page > 1 ? (
            <Link
              href={href(page - 1)}
              className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Previous
            </Link>
          ) : (
            <span className="rounded-md px-3 py-1.5 text-sm text-slate-400">Previous</span>
          )}

          {pageNumbers.map((n) => (
            <Link
              key={n}
              href={href(n)}
              aria-current={n === page ? 'page' : undefined}
              className={`min-w-9 rounded-md px-3 py-1.5 text-center text-sm font-medium ${
                n === page
                  ? 'bg-[#05162e] text-white'
                  : 'border border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {n}
            </Link>
          ))}

          {page < totalPages ? (
            <Link
              href={href(page + 1)}
              className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Next
            </Link>
          ) : (
            <span className="rounded-md px-3 py-1.5 text-sm text-slate-400">Next</span>
          )}
        </nav>
      ) : null}
    </div>
  );
}
