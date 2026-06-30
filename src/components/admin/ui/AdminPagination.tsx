import Link from 'next/link';
import { buildPageHref, getPageNumbers } from '@/lib/pagination';

type AdminPaginationProps = {
  basePath: string;
  page: number;
  totalPages: number;
  total: number;
  from: number;
  to: number;
  query?: Record<string, string | number | undefined | null>;
  pageParam?: string;
};

export default function AdminPagination({
  basePath,
  page,
  totalPages,
  total,
  from,
  to,
  query,
  pageParam = 'page',
}: AdminPaginationProps) {
  if (total === 0) return null;

  const href = (targetPage: number) => buildPageHref(basePath, targetPage, query, pageParam);

  const pageNumbers = getPageNumbers(page, totalPages);

  return (
    <div
      className="flex flex-wrap items-center justify-between gap-3 border-t px-4 py-3"
      style={{ borderColor: 'var(--z-border)' }}
    >
      <p className="text-sm" style={{ color: 'var(--z-text-muted)' }}>
        Showing {from}–{to} of {total}
      </p>

      {totalPages > 1 ? (
        <nav className="flex flex-wrap items-center gap-1" aria-label="Pagination">
          {page > 1 ? (
            <Link
              href={href(page - 1)}
              className="rounded-md px-3 py-1.5 text-sm font-medium hover:bg-black/5"
              style={{ color: 'var(--z-text)' }}
            >
              Previous
            </Link>
          ) : (
            <span className="rounded-md px-3 py-1.5 text-sm" style={{ color: 'var(--z-text-muted)' }}>
              Previous
            </span>
          )}

          {pageNumbers.map((n) => (
            <Link
              key={n}
              href={href(n)}
              aria-current={n === page ? 'page' : undefined}
              className="min-w-9 rounded-md px-3 py-1.5 text-center text-sm font-medium"
              style={
                n === page
                  ? { background: 'var(--z-accent-dark)', color: '#fff' }
                  : { color: 'var(--z-text)' }
              }
            >
              {n}
            </Link>
          ))}

          {page < totalPages ? (
            <Link
              href={href(page + 1)}
              className="rounded-md px-3 py-1.5 text-sm font-medium hover:bg-black/5"
              style={{ color: 'var(--z-text)' }}
            >
              Next
            </Link>
          ) : (
            <span className="rounded-md px-3 py-1.5 text-sm" style={{ color: 'var(--z-text-muted)' }}>
              Next
            </span>
          )}
        </nav>
      ) : null}
    </div>
  );
}
