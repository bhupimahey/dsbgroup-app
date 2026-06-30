import Link from 'next/link';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/admin/require-admin';
import { deleteStaffAction } from '@/lib/admin/staff-actions';
import { parseFilterParam, pickListQuery, staffListWhere } from '@/lib/admin/list-filters';
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

export const metadata = { title: 'Staff' };

const FILTER_KEYS = ['q', 'active'] as const;

export default async function AdminStaffPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string; active?: string }>;
}) {
  await requireAdmin();
  const params = await searchParams;
  const filters = {
    q: parseFilterParam(params.q),
    active: parseFilterParam(params.active),
  };
  const filterQuery = pickListQuery(params, [...FILTER_KEYS]);
  const where = staffListWhere(filters);
  const pagination = getPaginationMeta(await prisma.user.count({ where }), parsePageParam(params.page));
  const staff = await prisma.user.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    skip: pagination.skip,
    take: pagination.take,
  });

  return (
    <div className={adminPage}>
      <AdminPageHeader actions={<AdminButtonLink href="/admin/staff/new">+ New staff user</AdminButtonLink>} />

      <AdminListFilters
        basePath="/admin/staff"
        values={filters}
        fields={[
          { type: 'search', name: 'q', label: 'Search', placeholder: 'Name or email' },
          {
            type: 'select',
            name: 'active',
            label: 'Status',
            options: [
              { value: '', label: 'All' },
              { value: 'yes', label: 'Active' },
              { value: 'no', label: 'Inactive' },
            ],
          },
        ]}
      />

      <div className={adminTableWrap}>
        <table className={adminTable}>
          <thead>
            <tr>
              <th className={adminTableHeadCell}>Name</th>
              <th className={adminTableHeadCell}>Email</th>
              <th className={adminTableHeadCell}>Role</th>
              <th className={adminTableHeadCell}>Status</th>
              <th className={adminTableHeadCell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {staff.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center" style={{ color: 'var(--z-text-muted)' }}>
                  No staff accounts match your filters.
                </td>
              </tr>
            ) : (
              staff.map((member) => (
              <tr key={member.id} className={adminTableRow}>
                <td className={`${adminTableCell} font-semibold`}>{member.name ?? '—'}</td>
                <td className={adminTableCell} style={{ color: 'var(--z-text-muted)' }}>
                  {member.email}
                </td>
                <td className={adminTableCell}>
                  <AdminStatusBadge variant={member.role === 'ADMIN' ? 'warning' : 'info'}>
                    {member.role}
                  </AdminStatusBadge>
                </td>
                <td className={adminTableCell}>
                  <AdminStatusBadge variant={member.active ? 'success' : 'danger'}>
                    {member.active ? 'Active' : 'Inactive'}
                  </AdminStatusBadge>
                </td>
                <td className={adminTableCell}>
                  <AdminTableActions
                    editHref={`/admin/staff/${member.id}/edit`}
                    deleteAction={deleteStaffAction.bind(null, member.id)}
                    deleteConfirmMessage={`Remove staff access for ${member.email}?`}
                  />
                </td>
              </tr>
            ))
            )}
          </tbody>
        </table>
        <AdminPagination basePath="/admin/staff" {...pagination} query={filterQuery} />
      </div>

      <p className="text-sm" style={{ color: 'var(--z-text-muted)' }}>
        Editors can manage CMS content. Only admins can manage staff accounts.{' '}
        <Link href="/admin/users" className={adminLink} style={{ color: 'var(--z-accent-dark)' }}>
          View client accounts →
        </Link>
      </p>
    </div>
  );
}
