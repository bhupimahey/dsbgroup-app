import Link from 'next/link';
import { prisma } from '@/lib/db';
import { deleteLeadAction, markLeadHandledFormAction } from '@/lib/admin/lead-actions';
import { leadListWhere, parseFilterParam, pickListQuery } from '@/lib/admin/list-filters';
import AdminPageHeader from '@/components/admin/ui/AdminPageHeader';
import AdminPagination from '@/components/admin/ui/AdminPagination';
import AdminListFilters from '@/components/admin/ui/AdminListFilters';
import { AdminButtonLink } from '@/components/admin/ui/AdminButton';
import AdminStatusBadge from '@/components/admin/ui/AdminStatusBadge';
import AdminTableActions, { AdminPendingButton } from '@/components/admin/ui/AdminTableActions';
import {
  adminPage,
  adminTable,
  adminTableCell,
  adminTableHeadCell,
  adminTableRow,
  adminTableWrap,
} from '@/components/admin/ui/admin-styles';
import { getPaginationMeta, parsePageParam } from '@/lib/pagination';

export const metadata = { title: 'Contact leads' };

const FILTER_KEYS = ['q', 'handled'] as const;

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string; handled?: string }>;
}) {
  const params = await searchParams;
  const filters = {
    q: parseFilterParam(params.q),
    handled: parseFilterParam(params.handled),
  };
  const filterQuery = pickListQuery(params, [...FILTER_KEYS]);
  const where = leadListWhere(filters);
  const pagination = getPaginationMeta(await prisma.contactLead.count({ where }), parsePageParam(params.page));
  const leads = await prisma.contactLead.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    skip: pagination.skip,
    take: pagination.take,
  });

  const exportQuery = new URLSearchParams();
  if (filters.q) exportQuery.set('q', filters.q);
  if (filters.handled) exportQuery.set('handled', filters.handled);
  const exportHref = `/api/admin/leads/export${exportQuery.size ? `?${exportQuery}` : ''}`;

  return (
    <div className={adminPage}>
      <AdminPageHeader
        actions={
          <AdminButtonLink href={exportHref} variant="secondary">
            Export CSV
          </AdminButtonLink>
        }
      />

      <AdminListFilters
        basePath="/admin/leads"
        values={filters}
        fields={[
          { type: 'search', name: 'q', label: 'Search', placeholder: 'Name, email, or message' },
          {
            type: 'select',
            name: 'handled',
            label: 'Status',
            options: [
              { value: '', label: 'All leads' },
              { value: 'no', label: 'Open' },
              { value: 'yes', label: 'Handled' },
            ],
          },
        ]}
      />

      <div className={adminTableWrap}>
        <table className={adminTable}>
          <thead>
            <tr>
              <th className={adminTableHeadCell}>Date</th>
              <th className={adminTableHeadCell}>Name</th>
              <th className={adminTableHeadCell}>Email</th>
              <th className={adminTableHeadCell}>Phone</th>
              <th className={adminTableHeadCell}>Status</th>
              <th className={adminTableHeadCell}>Message</th>
              <th className={adminTableHeadCell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center" style={{ color: 'var(--z-text-muted)' }}>
                  No leads match your filters.
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead.id} className={`${adminTableRow} align-top`}>
                  <td className={`${adminTableCell} whitespace-nowrap`} style={{ color: 'var(--z-text-muted)' }}>
                    {lead.createdAt.toLocaleString()}
                  </td>
                  <td className={`${adminTableCell} font-semibold`}>{lead.name}</td>
                  <td className={adminTableCell}>
                    <Link href={`mailto:${lead.email}`} className="hover:underline" style={{ color: 'var(--z-accent-dark)' }}>
                      {lead.email}
                    </Link>
                  </td>
                  <td className={adminTableCell} style={{ color: 'var(--z-text-muted)' }}>
                    {lead.phone ?? '—'}
                  </td>
                  <td className={adminTableCell}>
                    <AdminStatusBadge variant={lead.handled ? 'success' : 'warning'}>
                      {lead.handled ? 'Handled' : 'Open'}
                    </AdminStatusBadge>
                  </td>
                  <td className={`${adminTableCell} max-w-md`}>{lead.message}</td>
                  <td className={adminTableCell}>
                    <div className="flex flex-col gap-1">
                      <form action={markLeadHandledFormAction}>
                        <input type="hidden" name="leadId" value={lead.id} />
                        <input type="hidden" name="handled" value={lead.handled ? 'false' : 'true'} />
                        <AdminPendingButton pendingLabel="Updating…" style={{ color: 'var(--z-accent-dark)' }}>
                          {lead.handled ? 'Reopen' : 'Mark handled'}
                        </AdminPendingButton>
                      </form>
                      <AdminTableActions deleteAction={deleteLeadAction.bind(null, lead.id)} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <AdminPagination basePath="/admin/leads" {...pagination} query={filterQuery} />
      </div>
    </div>
  );
}
