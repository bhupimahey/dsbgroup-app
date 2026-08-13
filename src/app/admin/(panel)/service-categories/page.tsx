import { prisma } from '@/lib/db';
import {
  createServiceCategoryAction,
  deleteServiceCategoryAction,
} from '@/lib/admin/service-category-actions';
import { parseFilterParam, pickListQuery, serviceCategoryListWhere } from '@/lib/admin/list-filters';
import { AdminField, AdminTextarea } from '@/components/admin/AdminFormFields';
import AdminFileUpload from '@/components/admin/AdminFileUpload';
import AdminPageHeader from '@/components/admin/ui/AdminPageHeader';
import AdminPagination from '@/components/admin/ui/AdminPagination';
import AdminListFilters from '@/components/admin/ui/AdminListFilters';
import AdminSubmitButton from '@/components/admin/ui/AdminSubmitButton';
import { AdminForm } from '@/components/admin/ui/AdminFormCard';
import AdminStatusBadge from '@/components/admin/ui/AdminStatusBadge';
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

export const metadata = { title: 'Service areas' };

const FILTER_KEYS = ['q'] as const;

export default async function AdminServiceCategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string }>;
}) {
  const params = await searchParams;
  const filters = { q: parseFilterParam(params.q) };
  const filterQuery = pickListQuery(params, [...FILTER_KEYS]);
  const where = serviceCategoryListWhere(filters);
  const pagination = getPaginationMeta(await prisma.serviceCategory.count({ where }), parsePageParam(params.page));
  const categories = await prisma.serviceCategory.findMany({
    where,
    orderBy: { sortOrder: 'asc' },
    include: { _count: { select: { preferences: true, newsletters: true } } },
    skip: pagination.skip,
    take: pagination.take,
  });

  return (
    <div className={adminPage}>
      <AdminPageHeader />

      <AdminForm
        title="New service area"
        subtitle="Controls the card on /services, the More Services strip, and newsletter targeting."
        action={createServiceCategoryAction}
      >
        <AdminField label="Name" name="name" required />
        <AdminField label="Slug" name="slug" required hint="Lowercase letters, numbers, and hyphens only." />
        <AdminTextarea
          label="Card teaser"
          name="teaser"
          rows={3}
          hint="Short summary shown on /services cards and the More Services strip on detail pages."
        />
        <AdminTextarea
          label="Long description"
          name="description"
          rows={4}
          hint="Optional longer summary used where a fuller description is needed."
        />
        <AdminFileUpload
          label="Card image"
          name="imagePath"
          accept="image/jpeg,image/png,image/webp,image/gif"
          uploadKind="page-image"
          hint="Image used on the /services and More Services cards. Recommended 250×209."
        />
        <AdminField label="Sort order" name="sortOrder" defaultValue="0" />
        <label className="flex items-center gap-2 text-sm" style={{ color: 'var(--z-text)' }}>
          <input type="checkbox" name="active" defaultChecked className="rounded" />
          Active
        </label>
        <AdminSubmitButton pendingLabel="Creating…">Create service area</AdminSubmitButton>
      </AdminForm>

      <AdminListFilters
        basePath="/admin/service-categories"
        values={filters}
        fields={[{ type: 'search', name: 'q', label: 'Search', placeholder: 'Name or slug' }]}
      />

      <div className={adminTableWrap}>
        <table className={adminTable}>
          <thead>
            <tr>
              <th className={adminTableHeadCell}>Name</th>
              <th className={adminTableHeadCell}>Slug</th>
              <th className={adminTableHeadCell}>Subscribers</th>
              <th className={adminTableHeadCell}>Status</th>
              <th className={adminTableHeadCell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center" style={{ color: 'var(--z-text-muted)' }}>
                  No service areas match your filters.
                </td>
              </tr>
            ) : (
              categories.map((category) => (
              <tr key={category.id} className={adminTableRow}>
                <td className={`${adminTableCell} font-semibold`}>{category.name}</td>
                <td className={adminTableCell} style={{ color: 'var(--z-text-muted)' }}>
                  {category.slug}
                </td>
                <td className={adminTableCell} style={{ color: 'var(--z-text-muted)' }}>
                  {category._count.preferences}
                </td>
                <td className={adminTableCell}>
                  <AdminStatusBadge variant={category.active ? 'success' : 'neutral'}>
                    {category.active ? 'Active' : 'Inactive'}
                  </AdminStatusBadge>
                </td>
                <td className={adminTableCell}>
                  <AdminTableActions
                    editHref={`/admin/service-categories/${category.id}/edit`}
                    deleteAction={deleteServiceCategoryAction.bind(null, category.id)}
                    deleteConfirmMessage="Delete this service area? Linked preferences will be removed."
                  />
                </td>
              </tr>
            ))
            )}
          </tbody>
        </table>
        <AdminPagination basePath="/admin/service-categories" {...pagination} query={filterQuery} />
      </div>
    </div>
  );
}
