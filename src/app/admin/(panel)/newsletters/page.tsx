import Link from 'next/link';
import { prisma } from '@/lib/db';
import { deleteNewsletterAction, queueNewsletterAction } from '@/lib/admin/newsletter-actions';
import {
  newsletterListWhere,
  parseFilterParam,
  pickListQuery,
} from '@/lib/admin/list-filters';
import AdminPageHeader from '@/components/admin/ui/AdminPageHeader';
import AdminPagination from '@/components/admin/ui/AdminPagination';
import AdminListFilters from '@/components/admin/ui/AdminListFilters';
import { AdminButtonLink } from '@/components/admin/ui/AdminButton';
import AdminStatusBadge from '@/components/admin/ui/AdminStatusBadge';
import AdminTableActions, { AdminPendingButton } from '@/components/admin/ui/AdminTableActions';
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

export const metadata = { title: 'Newsletters' };

const FILTER_KEYS = ['q', 'status', 'archive'] as const;

function statusVariant(status: string): 'success' | 'warning' | 'draft' {
  if (status === 'SENT') return 'success';
  if (status === 'QUEUED') return 'warning';
  return 'draft';
}

export default async function AdminNewslettersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string; status?: string; archive?: string }>;
}) {
  const params = await searchParams;
  const filters = {
    q: parseFilterParam(params.q),
    status: parseFilterParam(params.status),
    archive: parseFilterParam(params.archive),
  };
  const filterQuery = pickListQuery(params, [...FILTER_KEYS]);
  const where = newsletterListWhere(filters);
  const pagination = getPaginationMeta(await prisma.newsletter.count({ where }), parsePageParam(params.page));
  const newsletters = await prisma.newsletter.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    skip: pagination.skip,
    take: pagination.take,
  });

  return (
    <div className={adminPage}>
      <AdminPageHeader actions={<AdminButtonLink href="/admin/newsletters/new">+ New Newsletter Issue</AdminButtonLink>} />

      <AdminListFilters
        basePath="/admin/newsletters"
        values={filters}
        fields={[
          { type: 'search', name: 'q', label: 'Search', placeholder: 'Subject, slug, or issue number' },
          {
            type: 'select',
            name: 'status',
            label: 'Send status',
            options: [
              { value: '', label: 'All send statuses' },
              { value: 'DRAFT', label: 'Draft' },
              { value: 'QUEUED', label: 'Queued' },
              { value: 'SENT', label: 'Sent' },
            ],
          },
          {
            type: 'select',
            name: 'archive',
            label: 'Archive',
            options: [
              { value: '', label: 'All archive states' },
              { value: 'published', label: 'Public' },
              { value: 'hidden', label: 'Hidden' },
            ],
          },
        ]}
      />

      <div className={adminTableWrap}>
        <table className={adminTable}>
          <thead>
            <tr>
              <th className={adminTableHeadCell}>Issue</th>
              <th className={adminTableHeadCell}>Subject</th>
              <th className={adminTableHeadCell}>PDF</th>
              <th className={adminTableHeadCell}>Status</th>
              <th className={adminTableHeadCell}>Archive</th>
              <th className={adminTableHeadCell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {newsletters.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center" style={{ color: 'var(--z-text-muted)' }}>
                  No newsletters match your filters.
                </td>
              </tr>
            ) : (
              newsletters.map((newsletter) => (
                <tr key={newsletter.id} className={adminTableRow}>
                  <td className={adminTableCell}>
                    <div className="font-semibold">{newsletter.issueNumber ?? '—'}</div>
                    {newsletter.issueDate ? (
                      <div className="text-xs" style={{ color: 'var(--z-text-muted)' }}>
                        {newsletter.issueDate.toLocaleDateString()}
                      </div>
                    ) : null}
                  </td>
                  <td className={`${adminTableCell} font-semibold`}>{newsletter.subject}</td>
                  <td className={adminTableCell}>
                    {newsletter.pdfPath ? (
                      <a
                        href={newsletter.pdfPath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium hover:underline"
                        style={{ color: 'var(--z-accent-dark)' }}
                      >
                        PDF
                      </a>
                    ) : (
                      <span style={{ color: 'var(--z-text-muted)' }}>—</span>
                    )}
                  </td>
                  <td className={adminTableCell}>
                    <AdminStatusBadge variant={statusVariant(newsletter.status)}>{newsletter.status}</AdminStatusBadge>
                  </td>
                  <td className={adminTableCell}>
                    {newsletter.published ? (
                      <Link href={`/newsletters/${newsletter.slug}`} className={adminLink} style={{ color: 'var(--z-accent-dark)' }}>
                        Public
                      </Link>
                    ) : (
                      <span style={{ color: 'var(--z-text-muted)' }}>Hidden</span>
                    )}
                  </td>
                  <td className={adminTableCell}>
                    <div className="flex flex-wrap items-center gap-1">
                      <AdminTableActions
                        editHref={`/admin/newsletters/${newsletter.id}/edit`}
                        viewHref={newsletter.published ? `/newsletters/${newsletter.slug}` : undefined}
                        viewExternal
                        deleteAction={deleteNewsletterAction.bind(null, newsletter.id)}
                      />
                      {newsletter.status === 'DRAFT' ? (
                        <form action={queueNewsletterAction.bind(null, newsletter.id)}>
                          <AdminPendingButton pendingLabel="Queuing…" style={{ color: 'var(--z-info)' }}>
                            Queue send
                          </AdminPendingButton>
                        </form>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <AdminPagination basePath="/admin/newsletters" {...pagination} query={filterQuery} />
      </div>
    </div>
  );
}
