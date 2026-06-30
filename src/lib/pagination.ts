export const DEFAULT_PAGE_SIZE = 20;

export function parsePageParam(value: string | string[] | undefined): number {
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = Number.parseInt(raw ?? '1', 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

export type PaginationMeta = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  skip: number;
  take: number;
  hasPrev: boolean;
  hasNext: boolean;
  from: number;
  to: number;
};

export function getPaginationMeta(
  total: number,
  page: number,
  pageSize = DEFAULT_PAGE_SIZE,
): PaginationMeta {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const skip = (currentPage - 1) * pageSize;

  return {
    page: currentPage,
    pageSize,
    total,
    totalPages,
    skip,
    take: pageSize,
    hasPrev: currentPage > 1,
    hasNext: currentPage < totalPages,
    from: total === 0 ? 0 : skip + 1,
    to: Math.min(skip + pageSize, total),
  };
}

export function buildPageHref(
  basePath: string,
  page: number,
  query?: Record<string, string | number | undefined | null>,
  pageParam = 'page',
): string {
  const params = new URLSearchParams();

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (key === pageParam) continue;
      if (value !== undefined && value !== null && value !== '') {
        params.set(key, String(value));
      }
    }
  }

  if (page > 1) {
    params.set(pageParam, String(page));
  }

  const qs = params.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}

export function getPageNumbers(current: number, total: number, max = 5): number[] {
  if (total <= max) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const half = Math.floor(max / 2);
  let start = Math.max(1, current - half);
  let end = start + max - 1;

  if (end > total) {
    end = total;
    start = end - max + 1;
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}
