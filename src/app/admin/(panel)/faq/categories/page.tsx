import Link from 'next/link';
import { prisma } from '@/lib/db';
import { deleteFaqCategoryAction } from '@/lib/admin/faq-actions';
import { faqCategoryListWhere, parseFilterParam, pickListQuery } from '@/lib/admin/list-filters';
import AdminPageHeader from '@/components/admin/ui/AdminPageHeader';
import AdminPagination from '@/components/admin/ui/AdminPagination';
import AdminListFilters from '@/components/admin/ui/AdminListFilters';
import { AdminButtonLink } from '@/components/admin/ui/AdminButton';
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

export const metadata = { title: 'FAQ categories' };

const FILTER_KEYS = ['q'] as const;

export default async function AdminFaqCategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string }>;
}) {
  const params = await searchParams;
  const filters = { q: parseFilterParam(params.q) };
  const filterQuery = pickListQuery(params, [...FILTER_KEYS]);
  const where = faqCategoryListWhere(filters);
  const pagination = getPaginationMeta(await prisma.faqCategory.count({ where }), parsePageParam(params.page));

  const categories = await prisma.faqCategory.findMany({
    where,
    orderBy: { sortOrder: 'asc' },
    include: { _count: { select: { items: true } } },
    skip: pagination.skip,
    take: pagination.take,
  });

  return (
    <div className={adminPage}>
      <AdminPageHeader
        actions={
          <>
            <AdminButtonLink href="/admin/faq" variant="secondary">
              All FAQ items
            </AdminButtonLink>
            <AdminButtonLink href="/admin/faq/categories/new">+ New category</AdminButtonLink>
          </>
        }
      />

      <AdminListFilters
        basePath="/admin/faq/categories"
        values={filters}
        fields={[{ type: 'search', name: 'q', label: 'Search', placeholder: 'Category name' }]}
      />

      <div className={adminTableWrap}>
        <table className={adminTable}>
          <thead>
            <tr>
              <th className={adminTableHeadCell}>Name</th>
              <th className={adminTableHeadCell}>Items</th>
              <th className={adminTableHeadCell}>Sort order</th>
              <th className={adminTableHeadCell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center" style={{ color: 'var(--z-text-muted)' }}>
                  No categories match your filters.{' '}
                  <Link href="/admin/faq/categories/new" className={adminLink} style={{ color: 'var(--z-accent-dark)' }}>
                    Create one
                  </Link>
                </td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr key={category.id} className={adminTableRow}>
                  <td className={`${adminTableCell} font-semibold`}>{category.name}</td>
                  <td className={adminTableCell} style={{ color: 'var(--z-text-muted)' }}>
                    {category._count.items}
                  </td>
                  <td className={adminTableCell} style={{ color: 'var(--z-text-muted)' }}>
                    {category.sortOrder}
                  </td>
                  <td className={adminTableCell}>
                    <AdminTableActions
                      editHref={`/admin/faq/categories/${category.id}/edit`}
                      deleteAction={deleteFaqCategoryAction.bind(null, category.id)}
                      deleteConfirmMessage="Delete this category and all FAQ items in it? This cannot be undone."
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <AdminPagination basePath="/admin/faq/categories" {...pagination} query={filterQuery} />
      </div>
    </div>
  );
}
