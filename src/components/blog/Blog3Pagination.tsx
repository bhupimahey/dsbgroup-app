import Link from 'next/link';
import { buildPageHref, getPageNumbers } from '@/lib/pagination';

type Blog3PaginationProps = {
  basePath: string;
  page: number;
  totalPages: number;
  total: number;
  query?: Record<string, string | number | undefined | null>;
  pageParam?: string;
};

export default function Blog3Pagination({
  basePath,
  page,
  totalPages,
  total,
  query,
  pageParam = 'page',
}: Blog3PaginationProps) {
  if (total === 0 || totalPages <= 1) return null;

  const pageNumbers = getPageNumbers(page, totalPages, 5);
  const href = (targetPage: number) => buildPageHref(basePath, targetPage, query, pageParam);
  const showLeadingEllipsis = pageNumbers[0] > 1;
  const showTrailingEllipsis = pageNumbers[pageNumbers.length - 1] < totalPages;

  return (
    <nav className="blog3-pagination" aria-label="Blog pagination">
      <ul className="blog3-pagination-list">
        <li>
          {page > 1 ? (
            <Link href={href(page - 1)} className="blog3-pagination-link" aria-label="Previous page">
              «
            </Link>
          ) : (
            <span className="blog3-pagination-link is-disabled" aria-hidden>
              «
            </span>
          )}
        </li>

        {showLeadingEllipsis ? (
          <>
            <li>
              <Link href={href(1)} className="blog3-pagination-link">
                1
              </Link>
            </li>
            {pageNumbers[0] > 2 ? (
              <li>
                <span className="blog3-pagination-ellipsis">…</span>
              </li>
            ) : null}
          </>
        ) : null}

        {pageNumbers.map((n) => (
          <li key={n}>
            <Link
              href={href(n)}
              className={`blog3-pagination-link${n === page ? ' is-active' : ''}`}
              aria-current={n === page ? 'page' : undefined}
            >
              {n}
            </Link>
          </li>
        ))}

        {showTrailingEllipsis ? (
          <>
            {pageNumbers[pageNumbers.length - 1] < totalPages - 1 ? (
              <li>
                <span className="blog3-pagination-ellipsis">…</span>
              </li>
            ) : null}
            <li>
              <Link href={href(totalPages)} className="blog3-pagination-link">
                {totalPages}
              </Link>
            </li>
          </>
        ) : null}

        <li>
          {page < totalPages ? (
            <Link href={href(page + 1)} className="blog3-pagination-link" aria-label="Next page">
              »
            </Link>
          ) : (
            <span className="blog3-pagination-link is-disabled" aria-hidden>
              »
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
}
