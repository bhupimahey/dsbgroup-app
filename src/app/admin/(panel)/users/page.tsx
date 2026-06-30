import { prisma } from '@/lib/db';
import { toggleUserActiveFormAction } from '@/lib/admin/staff-actions';
import { parseFilterParam, pickListQuery, userListWhere } from '@/lib/admin/list-filters';
import AdminPageHeader from '@/components/admin/ui/AdminPageHeader';
import AdminPagination from '@/components/admin/ui/AdminPagination';
import AdminListFilters from '@/components/admin/ui/AdminListFilters';
import AdminStatusBadge from '@/components/admin/ui/AdminStatusBadge';
import { AdminPendingButton } from '@/components/admin/ui/AdminTableActions';
import {
  adminPage,
  adminTable,
  adminTableCell,
  adminTableHeadCell,
  adminTableRow,
  adminTableWrap,
} from '@/components/admin/ui/admin-styles';
import { getPaginationMeta, parsePageParam } from '@/lib/pagination';

export const metadata = { title: 'Client accounts' };

const FILTER_KEYS = ['q', 'active'] as const;

const YES_NO_OPTIONS = [
  { value: '', label: 'All' },
  { value: 'yes', label: 'Active' },
  { value: 'no', label: 'Inactive' },
] as const;

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string; active?: string }>;
}) {
  const params = await searchParams;
  const filters = {
    q: parseFilterParam(params.q),
    active: parseFilterParam(params.active),
  };
  const filterQuery = pickListQuery(params, [...FILTER_KEYS]);
  const where = userListWhere(filters);
  const pagination = getPaginationMeta(await prisma.user.count({ where }), parsePageParam(params.page));
  const users = await prisma.user.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    include: {
      subscriptionPreferences: {
        include: { serviceCategory: { select: { name: true } } },
      },
    },
    skip: pagination.skip,
    take: pagination.take,
  });

  return (
    <div className={adminPage}>
      <AdminPageHeader />

      <AdminListFilters
        basePath="/admin/users"
        values={filters}
        fields={[
          { type: 'search', name: 'q', label: 'Search', placeholder: 'Name or email' },
          { type: 'select', name: 'active', label: 'Status', options: YES_NO_OPTIONS },
        ]}
      />

      <div className={adminTableWrap}>
        <table className={adminTable}>
          <thead>
            <tr>
              <th className={adminTableHeadCell}>Name</th>
              <th className={adminTableHeadCell}>Email</th>
              <th className={adminTableHeadCell}>Verified</th>
              <th className={adminTableHeadCell}>Active</th>
              <th className={adminTableHeadCell}>Preferences</th>
              <th className={adminTableHeadCell}>Joined</th>
              <th className={adminTableHeadCell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center" style={{ color: 'var(--z-text-muted)' }}>
                  No client accounts match your filters.
                </td>
              </tr>
            ) : (
              users.map((user) => {
                const tags = [...new Set(user.subscriptionPreferences.map((p) => p.serviceCategory.name))];
                return (
                  <tr key={user.id} className={`${adminTableRow} align-top`}>
                    <td className={`${adminTableCell} font-semibold`}>{user.name ?? '—'}</td>
                    <td className={adminTableCell} style={{ color: 'var(--z-text-muted)' }}>
                      {user.email}
                    </td>
                    <td className={adminTableCell}>
                      <AdminStatusBadge variant={user.emailVerified ? 'success' : 'neutral'}>
                        {user.emailVerified ? 'Yes' : 'No'}
                      </AdminStatusBadge>
                    </td>
                    <td className={adminTableCell}>
                      <AdminStatusBadge variant={user.active ? 'success' : 'danger'}>
                        {user.active ? 'Active' : 'Inactive'}
                      </AdminStatusBadge>
                    </td>
                    <td className={adminTableCell}>
                      {tags.length === 0 ? (
                        <span style={{ color: 'var(--z-text-muted)' }}>—</span>
                      ) : (
                        <div className="flex max-w-xs flex-wrap gap-1">
                          {tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex rounded-md px-2 py-0.5 text-xs font-medium"
                              style={{ background: 'var(--z-primary-light)', color: 'var(--z-primary)' }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </td>
                    <td className={`${adminTableCell} whitespace-nowrap`} style={{ color: 'var(--z-text-muted)' }}>
                      {user.createdAt.toLocaleDateString()}
                    </td>
                    <td className={adminTableCell}>
                      <form action={toggleUserActiveFormAction}>
                        <input type="hidden" name="userId" value={user.id} />
                        <input type="hidden" name="active" value={user.active ? 'false' : 'true'} />
                        <AdminPendingButton pendingLabel="Updating…" style={{ color: 'var(--z-accent-dark)' }}>
                          {user.active ? 'Deactivate' : 'Activate'}
                        </AdminPendingButton>
                      </form>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
        <AdminPagination basePath="/admin/users" {...pagination} query={filterQuery} />
      </div>
    </div>
  );
}
