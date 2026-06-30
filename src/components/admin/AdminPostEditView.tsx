import { notFound, redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { deletePostAction, updatePostAction } from '@/lib/admin/post-actions';
import { adminPostEditPathForType, adminPostListPath, type AdminPostKind } from '@/lib/admin/post-routes';
import AdminPostEditor from '@/components/admin/AdminPostEditor';
import AdminBackLink from '@/components/admin/ui/AdminBackLink';
import AdminSubmitButton from '@/components/admin/ui/AdminSubmitButton';
import { AdminConfirmDeleteForm, AdminFormDeleteButton } from '@/components/admin/ui/AdminTableActions';
import { AdminForm } from '@/components/admin/ui/AdminFormCard';
import { adminPage } from '@/components/admin/ui/admin-styles';

export default async function AdminPostEditView({ id, kind }: { id: string; kind: AdminPostKind }) {
  const post = await prisma.post.findUnique({ where: { id }, include: { categories: true } });
  if (!post) notFound();
  if ((kind === 'blog' && post.type !== 'BLOG') || (kind === 'articles' && post.type !== 'ARTICLE')) {
    redirect(adminPostEditPathForType(post.type, id));
  }

  const categories =
    kind === 'blog' ? await prisma.category.findMany({ orderBy: { name: 'asc' } }) : [];
  const selected = new Set(post.categories.map((c) => c.categoryId));
  const update = updatePostAction.bind(null, id);
  const label = kind === 'blog' ? 'blog post' : 'article';

  return (
    <div className={adminPage}>
      <AdminBackLink href={adminPostListPath(kind)}>Back to {kind === 'blog' ? 'blog' : 'articles'}</AdminBackLink>
      <AdminForm title={`Edit ${label}`} subtitle={post.title} action={update}>
        <AdminPostEditor
          kind={kind}
          categories={categories}
          selectedCategoryIds={selected}
          defaults={{
            title: post.title,
            slug: post.slug,
            teaser: post.teaser,
            body: post.body,
            visibility: post.visibility,
            metaTitle: post.metaTitle,
            metaDescription: post.metaDescription,
            metaKeywords: post.metaKeywords,
            featuredImagePath: post.featuredImagePath,
            published: post.published,
          }}
        />
        <AdminSubmitButton pendingLabel="Saving…">Save changes</AdminSubmitButton>
      </AdminForm>
      <AdminConfirmDeleteForm
        action={deletePostAction.bind(null, id)}
        confirmMessage={`Delete this ${label} permanently? This cannot be undone.`}
      >
        <AdminFormDeleteButton>Delete this {label}</AdminFormDeleteButton>
      </AdminConfirmDeleteForm>
    </div>
  );
}
