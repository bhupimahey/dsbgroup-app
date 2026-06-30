import { prisma } from '@/lib/db';
import { deletePostAction } from '@/lib/admin/post-actions';
import {
  adminPostEditPath,
  adminPostListPath,
  adminPostNewPath,
  postKindToType,
  publicPostPath,
  type AdminPostKind,
} from '@/lib/admin/post-routes';
import { parseFilterParam, pickListQuery, postListWhere, PUBLISHED_FILTER_OPTIONS } from '@/lib/admin/list-filters';
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

const META = {
  blog: { title: 'Blog', newLabel: '+ New blog post', empty: 'No blog posts match your filters.' },
  articles: {
    title: 'Articles',
    newLabel: '+ New article',
    empty: 'No articles match your filters.',
  },
} as const;

export async function AdminPostListPage({
  kind,
  searchParams,
}: {
  kind: AdminPostKind;
  searchParams: Promise<{ page?: string; q?: string; status?: string; visibility?: string }>;
}) {
  const params = await searchParams;
  const basePath = adminPostListPath(kind);
  const type = postKindToType(kind);
  const meta = META[kind];
  const filters = {
    q: parseFilterParam(params.q),
    status: parseFilterParam(params.status),
    type,
    visibility: parseFilterParam(params.visibility),
  };
  const filterKeys = kind === 'articles' ? (['q', 'status', 'visibility'] as const) : (['q', 'status'] as const);
  const filterQuery = pickListQuery(params, [...filterKeys]);
  const listFilterValues =
    kind === 'articles'
      ? { q: filters.q, status: filters.status, visibility: filters.visibility }
      : { q: filters.q, status: filters.status };
  const where = postListWhere(filters);
  const pagination = getPaginationMeta(await prisma.post.count({ where }), parsePageParam(params.page));
  const posts = await prisma.post.findMany({
    where,
    orderBy: { updatedAt: 'desc' },
    skip: pagination.skip,
    take: pagination.take,
  });

  return (
    <div className={adminPage}>
      <AdminPageHeader actions={<AdminButtonLink href={adminPostNewPath(kind)}>{meta.newLabel}</AdminButtonLink>} />

      <AdminListFilters
        basePath={basePath}
        values={listFilterValues}
        fields={[
          { type: 'search', name: 'q', label: 'Search', placeholder: 'Title or slug' },
          ...(kind === 'articles'
            ? ([
                {
                  type: 'select' as const,
                  name: 'visibility',
                  label: 'Access',
                  options: [
                    { value: '', label: 'All access levels' },
                    { value: 'PUBLIC', label: 'Public' },
                    { value: 'PREMIUM', label: 'Premium' },
                  ],
                },
              ] as const)
            : []),
          { type: 'select', name: 'status', label: 'Status', options: PUBLISHED_FILTER_OPTIONS },
        ]}
      />

      <div className={adminTableWrap}>
        <table className={adminTable}>
          <thead>
            <tr>
              <th className={adminTableHeadCell}>Title</th>
              {kind === 'articles' ? <th className={adminTableHeadCell}>Access</th> : null}
              <th className={adminTableHeadCell}>Status</th>
              <th className={adminTableHeadCell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 ? (
              <tr>
                <td colSpan={kind === 'articles' ? 4 : 3} className="px-4 py-10 text-center" style={{ color: 'var(--z-text-muted)' }}>
                  {meta.empty}
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className={adminTableRow}>
                  <td className={`${adminTableCell} font-semibold`}>{post.title}</td>
                  {kind === 'articles' ? (
                    <td className={adminTableCell}>
                      <AdminStatusBadge variant={post.visibility === 'PREMIUM' ? 'warning' : 'published'}>
                        {post.visibility === 'PREMIUM' ? 'Premium' : 'Public'}
                      </AdminStatusBadge>
                    </td>
                  ) : null}
                  <td className={adminTableCell}>
                    <AdminStatusBadge variant={post.published ? 'published' : 'draft'}>
                      {post.published ? 'Published' : 'Draft'}
                    </AdminStatusBadge>
                  </td>
                  <td className={adminTableCell}>
                    <AdminTableActions
                      editHref={adminPostEditPath(kind, post.id)}
                      viewHref={post.published ? publicPostPath(post.type, post.slug) : undefined}
                      viewExternal
                      deleteAction={deletePostAction.bind(null, post.id)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <AdminPagination basePath={basePath} {...pagination} query={filterQuery} />
      </div>
    </div>
  );
}
