import { prisma } from '@/lib/db';
import { deleteTeamAction } from '@/lib/admin/team-actions';
import { TEAM_GROUP_LABELS, TEAM_GROUP_ORDER } from '@/lib/team/constants';
import {
  parseFilterParam,
  pickListQuery,
  PUBLISHED_FILTER_OPTIONS,
  teamListWhere,
} from '@/lib/admin/list-filters';
import { getPaginationMeta, parsePageParam } from '@/lib/pagination';
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

export const metadata = { title: 'Team' };

const FILTER_KEYS = ['q', 'status', 'group'] as const;

const GROUP_FILTER_OPTIONS = [
  { value: '', label: 'All sections' },
  ...TEAM_GROUP_ORDER.map((group) => ({ value: group, label: TEAM_GROUP_LABELS[group] })),
];

export default async function AdminTeamPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string; status?: string; group?: string }>;
}) {
  const params = await searchParams;
  const filters = {
    q: parseFilterParam(params.q),
    status: parseFilterParam(params.status),
    group: parseFilterParam(params.group),
  };
  const filterQuery = pickListQuery(params, [...FILTER_KEYS]);
  const where = teamListWhere(filters);
  const pagination = getPaginationMeta(await prisma.teamMember.count({ where }), parsePageParam(params.page));
  const members = await prisma.teamMember.findMany({
    where,
    orderBy: [{ group: 'asc' }, { sortOrder: 'asc' }],
    skip: pagination.skip,
    take: pagination.take,
  });

  return (
    <div className={adminPage}>
      <AdminPageHeader actions={<AdminButtonLink href="/admin/team/new">+ Add Member</AdminButtonLink>} />

      <AdminListFilters
        basePath="/admin/team"
        values={filters}
        fields={[
          { type: 'search', name: 'q', label: 'Search', placeholder: 'Name, title, email, branch' },
          { type: 'select', name: 'group', label: 'Section', options: GROUP_FILTER_OPTIONS },
          { type: 'select', name: 'status', label: 'Status', options: PUBLISHED_FILTER_OPTIONS },
        ]}
      />

      <div className={adminTableWrap}>
        <table className={adminTable}>
          <thead>
            <tr>
              <th className={adminTableHeadCell}>Name</th>
              <th className={adminTableHeadCell}>Section</th>
              <th className={adminTableHeadCell}>Title</th>
              <th className={adminTableHeadCell}>Contact</th>
              <th className={adminTableHeadCell}>Status</th>
              <th className={adminTableHeadCell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center" style={{ color: 'var(--z-text-muted)' }}>
                  No team members match your filters.
                </td>
              </tr>
            ) : (
              members.map((m) => (
                <tr key={m.id} className={adminTableRow}>
                  <td className={`${adminTableCell} font-semibold`}>{m.name}</td>
                  <td className={`${adminTableCell} text-xs`} style={{ color: 'var(--z-text-muted)' }}>
                    {TEAM_GROUP_LABELS[m.group]}
                  </td>
                  <td className={adminTableCell} style={{ color: 'var(--z-text-muted)' }}>
                    <div>{m.title}</div>
                    {m.branch ? <div className="text-xs">{m.branch}</div> : null}
                  </td>
                  <td className={`${adminTableCell} text-sm`} style={{ color: 'var(--z-text-muted)' }}>
                    {m.phone ? <div>{m.phone}</div> : null}
                    {m.email ? <div className="max-w-[12rem] truncate">{m.email}</div> : null}
                    {!m.phone && !m.email ? '—' : null}
                  </td>
                  <td className={adminTableCell}>
                    <AdminStatusBadge variant={m.published ? 'published' : 'draft'}>
                      {m.published ? 'Published' : 'Draft'}
                    </AdminStatusBadge>
                  </td>
                  <td className={adminTableCell}>
                    <AdminTableActions
                      editHref={`/admin/team/${m.id}/edit`}
                      deleteAction={deleteTeamAction.bind(null, m.id)}
                      deleteConfirmMessage={`Remove ${m.name} from the team directory?`}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <AdminPagination basePath="/admin/team" {...pagination} query={filterQuery} />
      </div>
    </div>
  );
}
