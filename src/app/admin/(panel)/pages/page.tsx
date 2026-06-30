import AdminPageHeader from '@/components/admin/ui/AdminPageHeader';
import AdminPagination from '@/components/admin/ui/AdminPagination';
import AdminListFilters from '@/components/admin/ui/AdminListFilters';
import { AdminButtonLink } from '@/components/admin/ui/AdminButton';
import AdminTableActions from '@/components/admin/ui/AdminTableActions';
import {
  adminBadgeDraft,
  adminBadgeDraftStyle,
  adminBadgePublished,
  adminBadgePublishedStyle,
  adminPage,
  adminTable,
  adminTableCell,
  adminTableHeadCell,
  adminTableRow,
  adminTableWrap,
} from '@/components/admin/ui/admin-styles';
import { pageListWhere, parseFilterParam, pickListQuery, PUBLISHED_FILTER_OPTIONS } from '@/lib/admin/list-filters';
import { prisma } from '@/lib/db';
import { deletePageAction } from '@/lib/admin/page-actions';
import { getPaginationMeta, parsePageParam } from '@/lib/pagination';

export const metadata = { title: 'Pages' };

const FILTER_KEYS = ['q', 'status'] as const;

function previewHref(slug: string) {
  return slug === 'about' ? '/about' : `/pages/${slug}`;
}

export default async function AdminPagesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string; status?: string }>;
}) {
  const params = await searchParams;
  const filters = {
    q: parseFilterParam(params.q),
    status: parseFilterParam(params.status),
  };
  const filterQuery = pickListQuery(params, [...FILTER_KEYS]);
  const where = pageListWhere(filters);
  const pagination = getPaginationMeta(await prisma.page.count({ where }), parsePageParam(params.page));
  const pages = await prisma.page.findMany({
    where,
    orderBy: { updatedAt: 'desc' },
    skip: pagination.skip,
    take: pagination.take,
  });

  return (
    <div className={adminPage}>
      <AdminPageHeader actions={<AdminButtonLink href="/admin/pages/new">+ New Page</AdminButtonLink>} />

      <AdminListFilters
        basePath="/admin/pages"
        values={filters}
        fields={[
          { type: 'search', name: 'q', label: 'Search', placeholder: 'Title or slug' },
          { type: 'select', name: 'status', label: 'Status', options: PUBLISHED_FILTER_OPTIONS },
        ]}
      />

      <div className={adminTableWrap}>
        <table className={adminTable}>
          <thead>
            <tr>
              <th className={adminTableHeadCell}>Title</th>
              <th className={adminTableHeadCell}>Slug</th>
              <th className={adminTableHeadCell}>Status</th>
              <th className={adminTableHeadCell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pages.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center" style={{ color: 'var(--z-text-muted)' }}>
                  No pages match your filters.
                </td>
              </tr>
            ) : (
              pages.map((page) => (
                <tr key={page.id} className={adminTableRow}>
                  <td className={`${adminTableCell} font-semibold`}>{page.title}</td>
                  <td className={adminTableCell} style={{ color: 'var(--z-text-muted)' }}>
                    {page.slug}
                  </td>
                  <td className={adminTableCell}>
                    <span
                      className={page.published ? adminBadgePublished : adminBadgeDraft}
                      style={page.published ? adminBadgePublishedStyle : adminBadgeDraftStyle}
                    >
                      {page.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className={adminTableCell}>
                    <AdminTableActions
                      editHref={`/admin/pages/${page.id}/edit`}
                      viewHref={page.published ? previewHref(page.slug) : undefined}
                      viewExternal
                      deleteAction={deletePageAction.bind(null, page.id)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <AdminPagination basePath="/admin/pages" {...pagination} query={filterQuery} />
      </div>
    </div>
  );
}
