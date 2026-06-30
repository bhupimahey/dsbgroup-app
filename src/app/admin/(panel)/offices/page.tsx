import { prisma } from '@/lib/db';
import { deleteOfficeAction } from '@/lib/admin/office-actions';
import {
  officeListWhere,
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
  adminPage,
  adminTable,
  adminTableCell,
  adminTableHeadCell,
  adminTableRow,
  adminTableWrap,
} from '@/components/admin/ui/admin-styles';
import { getPaginationMeta, parsePageParam } from '@/lib/pagination';

export const metadata = { title: 'Offices' };

const FILTER_KEYS = ['q', 'status'] as const;

export default async function AdminOfficesPage({
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
  const where = officeListWhere(filters);
  const pagination = getPaginationMeta(await prisma.office.count({ where }), parsePageParam(params.page));
  const offices = await prisma.office.findMany({
    where,
    orderBy: { sortOrder: 'asc' },
    skip: pagination.skip,
    take: pagination.take,
  });

  return (
    <div className={adminPage}>
      <AdminPageHeader actions={<AdminButtonLink href="/admin/offices/new">+ New Office</AdminButtonLink>} />

      <AdminListFilters
        basePath="/admin/offices"
        values={filters}
        fields={[
          { type: 'search', name: 'q', label: 'Search', placeholder: 'Name, address, phone, email' },
          { type: 'select', name: 'status', label: 'Status', options: PUBLISHED_FILTER_OPTIONS },
        ]}
      />

      <div className={adminTableWrap}>
        <table className={adminTable}>
          <thead>
            <tr>
              <th className={adminTableHeadCell}>Name</th>
              <th className={adminTableHeadCell}>Address</th>
              <th className={adminTableHeadCell}>Status</th>
              <th className={adminTableHeadCell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {offices.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center" style={{ color: 'var(--z-text-muted)' }}>
                  No offices match your filters.
                </td>
              </tr>
            ) : (
              offices.map((office) => (
                <tr key={office.id} className={adminTableRow}>
                  <td className={`${adminTableCell} font-semibold`}>{office.name}</td>
                  <td className={`${adminTableCell} max-w-xs truncate`} style={{ color: 'var(--z-text-muted)' }}>
                    {office.address}
                  </td>
                  <td className={adminTableCell}>
                    <AdminStatusBadge variant={office.published ? 'published' : 'draft'}>
                      {office.published ? 'Published' : 'Draft'}
                    </AdminStatusBadge>
                  </td>
                  <td className={adminTableCell}>
                    <AdminTableActions
                      editHref={`/admin/offices/${office.id}/edit`}
                      viewHref={office.published ? '/offices' : undefined}
                      viewExternal
                      deleteAction={deleteOfficeAction.bind(null, office.id)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <AdminPagination basePath="/admin/offices" {...pagination} query={filterQuery} />
      </div>
    </div>
  );
}
