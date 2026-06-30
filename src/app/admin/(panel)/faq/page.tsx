import Link from 'next/link';
import { prisma } from '@/lib/db';
import { deleteFaqItemAction } from '@/lib/admin/faq-actions';
import {
  faqItemAdminListWhere,
  parseFilterParam,
  pickListQuery,
  PUBLISHED_FILTER_OPTIONS,
} from '@/lib/admin/list-filters';
import AdminPageHeader from '@/components/admin/ui/AdminPageHeader';
import AdminPagination from '@/components/admin/ui/AdminPagination';
import AdminListFilters from '@/components/admin/ui/AdminListFilters';
import { AdminButtonLink } from '@/components/admin/ui/AdminButton';
import AdminStatusBadge from '@/components/admin/ui/AdminStatusBadge';
import AdminTableActions from '@/components/admin/ui/AdminTableActions';
import {
  adminLink,
  adminPage,
  adminTable,
  adminTableCell,
  adminTableHeadCell,
  adminTableRow,
  adminTableWrap,
} from '@/components/admin/ui/admin-styles';
import { getPaginationMeta, parsePageParam } from '@/lib/pagination';
import { stripHtml } from '@/lib/team/bio-html';

export const metadata = { title: 'FAQ' };

const FILTER_KEYS = ['q', 'status', 'categoryId'] as const;

export default async function AdminFaqPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string; status?: string; categoryId?: string }>;
}) {
  const params = await searchParams;
  const filters = {
    q: parseFilterParam(params.q),
    status: parseFilterParam(params.status),
    categoryId: parseFilterParam(params.categoryId),
  };
  const filterQuery = pickListQuery(params, [...FILTER_KEYS]);
  const where = faqItemAdminListWhere(filters);
  const pagination = getPaginationMeta(await prisma.faqItem.count({ where }), parsePageParam(params.page));

  const [items, categories] = await Promise.all([
    prisma.faqItem.findMany({
      where,
      orderBy: [{ category: { sortOrder: 'asc' } }, { sortOrder: 'asc' }, { question: 'asc' }],
      include: { category: true },
      skip: pagination.skip,
      take: pagination.take,
    }),
    prisma.faqCategory.findMany({ orderBy: { sortOrder: 'asc' } }),
  ]);

  const categoryOptions = [
    { value: '', label: 'All categories' },
    ...categories.map((category) => ({ value: category.id, label: category.name })),
  ];

  return (
    <div className={adminPage}>
      <AdminPageHeader
        actions={
          <>
            <AdminButtonLink href="/admin/faq/categories" variant="secondary">
              Categories
            </AdminButtonLink>
            <AdminButtonLink href="/admin/faq/new">+ New FAQ</AdminButtonLink>
          </>
        }
      />

      <AdminListFilters
        basePath="/admin/faq"
        values={filters}
        fields={[
          { type: 'search', name: 'q', label: 'Search', placeholder: 'Question, answer, or category' },
          { type: 'select', name: 'categoryId', label: 'Category', options: categoryOptions },
          { type: 'select', name: 'status', label: 'Status', options: PUBLISHED_FILTER_OPTIONS },
        ]}
      />

      <div className={adminTableWrap}>
        <table className={adminTable}>
          <thead>
            <tr>
              <th className={adminTableHeadCell}>Question</th>
              <th className={adminTableHeadCell}>Category</th>
              <th className={adminTableHeadCell}>Order</th>
              <th className={adminTableHeadCell}>Status</th>
              <th className={adminTableHeadCell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center" style={{ color: 'var(--z-text-muted)' }}>
                  {categories.length === 0 ? (
                    <>
                      No FAQ categories yet.{' '}
                      <Link href="/admin/faq/categories/new" className={adminLink} style={{ color: 'var(--z-accent-dark)' }}>
                        Create a category
                      </Link>{' '}
                      first.
                    </>
                  ) : (
                    'No FAQ items match your filters.'
                  )}
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className={`${adminTableRow} align-top`}>
                  <td className={adminTableCell}>
                    <div className="max-w-md font-semibold">{item.question}</div>
                    <p className="mt-1 line-clamp-2 text-sm" style={{ color: 'var(--z-text-muted)' }}>
                      {stripHtml(item.answer)}
                    </p>
                  </td>
                  <td className={adminTableCell} style={{ color: 'var(--z-text-muted)' }}>
                    {item.category.name}
                  </td>
                  <td className={adminTableCell} style={{ color: 'var(--z-text-muted)' }}>
                    {item.sortOrder}
                  </td>
                  <td className={adminTableCell}>
                    <AdminStatusBadge variant={item.published ? 'published' : 'draft'}>
                      {item.published ? 'Published' : 'Draft'}
                    </AdminStatusBadge>
                  </td>
                  <td className={adminTableCell}>
                    <AdminTableActions
                      editHref={`/admin/faq/${item.id}/edit`}
                      deleteAction={deleteFaqItemAction.bind(null, item.id)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <AdminPagination basePath="/admin/faq" {...pagination} query={filterQuery} />
      </div>
    </div>
  );
}
