import { prisma } from '@/lib/db';
import { createPostAction } from '@/lib/admin/post-actions';
import { adminPostListPath, type AdminPostKind } from '@/lib/admin/post-routes';
import AdminPostEditor from '@/components/admin/AdminPostEditor';
import AdminBackLink from '@/components/admin/ui/AdminBackLink';
import AdminSubmitButton from '@/components/admin/ui/AdminSubmitButton';
import { AdminForm } from '@/components/admin/ui/AdminFormCard';
import { adminPage } from '@/components/admin/ui/admin-styles';

export const metadata = { title: 'New post' };

function parseKind(value: string | undefined): AdminPostKind {
  return value === 'articles' ? 'articles' : 'blog';
}

export default async function AdminNewPostPage({
  searchParams,
}: {
  searchParams: Promise<{ kind?: string }>;
}) {
  const { kind: kindParam } = await searchParams;
  const kind = parseKind(kindParam);

  if (kind === 'blog') {
    const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } });

    return (
      <div className={adminPage}>
        <AdminBackLink href={adminPostListPath(kind)}>Back to blog</AdminBackLink>
        <AdminForm title="New blog post" subtitle="Public updates and industry commentary." action={createPostAction}>
          <AdminPostEditor kind="blog" categories={categories} />
          <AdminSubmitButton pendingLabel="Creating…">Create blog post</AdminSubmitButton>
        </AdminForm>
      </div>
    );
  }

  return (
    <div className={adminPage}>
      <AdminBackLink href={adminPostListPath(kind)}>Back to articles</AdminBackLink>
      <AdminForm title="New article" subtitle="Premium or public long-form content." action={createPostAction}>
        <AdminPostEditor kind="articles" categories={[]} />
        <AdminSubmitButton pendingLabel="Creating…">Create article</AdminSubmitButton>
      </AdminForm>
    </div>
  );
}
