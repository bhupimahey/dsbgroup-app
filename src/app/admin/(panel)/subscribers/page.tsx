import { prisma } from '@/lib/db';
import { toggleSubscriberActiveFormAction } from '@/lib/admin/subscriber-actions';
import { parseFilterParam, pickListQuery, subscriberListWhere } from '@/lib/admin/list-filters';
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

export const metadata = { title: 'Subscribers' };

const FILTER_KEYS = ['q', 'verified', 'active'] as const;

const YES_NO_OPTIONS = [
  { value: '', label: 'All' },
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
] as const;

function formatFrequency(value: string) {
  return value.replace('_', ' ').toLowerCase();
}

export default async function AdminSubscribersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string; verified?: string; active?: string }>;
}) {
  const params = await searchParams;
  const filters = {
    q: parseFilterParam(params.q),
    verified: parseFilterParam(params.verified),
    active: parseFilterParam(params.active),
  };
  const filterQuery = pickListQuery(params, [...FILTER_KEYS]);
  const where = subscriberListWhere(filters);
  const pagination = getPaginationMeta(await prisma.subscriber.count({ where }), parsePageParam(params.page));
  const subscribers = await prisma.subscriber.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    include: {
      preferences: {
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
        basePath="/admin/subscribers"
        values={filters}
        fields={[
          { type: 'search', name: 'q', label: 'Search', placeholder: 'Email address' },
          { type: 'select', name: 'verified', label: 'Verified', options: YES_NO_OPTIONS },
          { type: 'select', name: 'active', label: 'Active', options: YES_NO_OPTIONS },
        ]}
      />

      <div className={adminTableWrap}>
        <table className={adminTable}>
          <thead>
            <tr>
              <th className={adminTableHeadCell}>Email</th>
              <th className={adminTableHeadCell}>Verified</th>
              <th className={adminTableHeadCell}>Active</th>
              <th className={adminTableHeadCell}>Frequency</th>
              <th className={adminTableHeadCell}>Service areas</th>
              <th className={adminTableHeadCell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center" style={{ color: 'var(--z-text-muted)' }}>
                  No subscribers match your filters.
                </td>
              </tr>
            ) : (
              subscribers.map((subscriber) => {
                const tags = [
                  ...new Set(subscriber.preferences.map((pref) => pref.serviceCategory.name)),
                ];
                return (
                  <tr key={subscriber.id} className={`${adminTableRow} align-top`}>
                    <td className={`${adminTableCell} font-semibold`}>{subscriber.email}</td>
                    <td className={adminTableCell}>
                      <AdminStatusBadge variant={subscriber.verified ? 'success' : 'neutral'}>
                        {subscriber.verified ? 'Yes' : 'No'}
                      </AdminStatusBadge>
                    </td>
                    <td className={adminTableCell}>
                      <AdminStatusBadge variant={subscriber.active ? 'success' : 'danger'}>
                        {subscriber.active ? 'Yes' : 'No'}
                      </AdminStatusBadge>
                    </td>
                    <td className={`${adminTableCell} capitalize`} style={{ color: 'var(--z-text-muted)' }}>
                      {formatFrequency(subscriber.frequency)}
                    </td>
                    <td className={adminTableCell}>
                      {tags.length === 0 ? (
                        <span style={{ color: 'var(--z-text-muted)' }}>—</span>
                      ) : (
                        <div className="flex max-w-md flex-wrap gap-1">
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
                    <td className={adminTableCell}>
                      <form action={toggleSubscriberActiveFormAction}>
                        <input type="hidden" name="subscriberId" value={subscriber.id} />
                        <input type="hidden" name="active" value={subscriber.active ? 'false' : 'true'} />
                        <AdminPendingButton
                          pendingLabel="Updating…"
                          className="text-[var(--z-accent-dark)]"
                          style={{ color: 'var(--z-accent-dark)' }}
                        >
                          {subscriber.active ? 'Deactivate' : 'Activate'}
                        </AdminPendingButton>
                      </form>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
        <AdminPagination basePath="/admin/subscribers" {...pagination} query={filterQuery} />
      </div>
    </div>
  );
}
