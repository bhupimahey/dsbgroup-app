import { prisma } from '@/lib/db';
import { createCategoryAction, deleteCategoryAction } from '@/lib/admin/category-actions';
import { categoryListWhere, parseFilterParam, pickListQuery } from '@/lib/admin/list-filters';
import { AdminField } from '@/components/admin/AdminFormFields';
import AdminPageHeader from '@/components/admin/ui/AdminPageHeader';
import AdminPagination from '@/components/admin/ui/AdminPagination';
import AdminListFilters from '@/components/admin/ui/AdminListFilters';
import AdminSubmitButton from '@/components/admin/ui/AdminSubmitButton';
import { AdminForm } from '@/components/admin/ui/AdminFormCard';
import AdminTableActions from '@/components/admin/ui/AdminTableActions';
import {
  adminPage,
  adminTable,
  adminTableCell,
  adminTableHeadCell,
  adminTableRow,
  adminTableWrap,
} from '@/components/admin/ui/admin-styles';
import { getPaginationMeta, parsePageParam } from '@/lib/pagination';

export const metadata = { title: 'Blog categories' };

const FILTER_KEYS = ['q'] as const;

export default async function AdminCategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string }>;
}) {
  const params = await searchParams;
  const filters = { q: parseFilterParam(params.q) };
  const filterQuery = pickListQuery(params, [...FILTER_KEYS]);
  const where = categoryListWhere(filters);
  const pagination = getPaginationMeta(await prisma.category.count({ where }), parsePageParam(params.page));
  const categories = await prisma.category.findMany({
    where,
    orderBy: { name: 'asc' },
    skip: pagination.skip,
    take: pagination.take,
  });

  return (
    <div className={adminPage}>
      <AdminPageHeader />

      <AdminForm title="New category" action={createCategoryAction}>
        <AdminField label="Name" name="name" required />
        <AdminField label="Slug" name="slug" required hint="Lowercase letters, numbers, and hyphens only." />
        <AdminSubmitButton>Create category</AdminSubmitButton>
      </AdminForm>

      <AdminListFilters
        basePath="/admin/categories"
        values={filters}
        fields={[{ type: 'search', name: 'q', label: 'Search', placeholder: 'Name or slug' }]}
      />

      <div className={adminTableWrap}>
        <table className={adminTable}>
          <thead>
            <tr>
              <th className={adminTableHeadCell}>Name</th>
              <th className={adminTableHeadCell}>Slug</th>
              <th className={adminTableHeadCell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-10 text-center" style={{ color: 'var(--z-text-muted)' }}>
                  No categories match your filters.
                </td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr key={category.id} className={adminTableRow}>
                  <td className={`${adminTableCell} font-semibold`}>{category.name}</td>
                  <td className={adminTableCell} style={{ color: 'var(--z-text-muted)' }}>
                    {category.slug}
                  </td>
                  <td className={adminTableCell}>
                    <AdminTableActions
                      editHref={`/admin/categories/${category.id}/edit`}
                      deleteAction={deleteCategoryAction.bind(null, category.id)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <AdminPagination basePath="/admin/categories" {...pagination} query={filterQuery} />
      </div>
    </div>
  );
}
