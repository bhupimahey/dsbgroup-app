import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import { deletePageAction, updatePageAction } from '@/lib/admin/page-actions';
import { AdminCheckbox, AdminField, AdminTextarea } from '@/components/admin/AdminFormFields';
import AdminFileUpload from '@/components/admin/AdminFileUpload';
import AdminRichTextEditor from '@/components/admin/AdminRichTextEditorLazy';
import AdminBackLink from '@/components/admin/ui/AdminBackLink';
import AdminSubmitButton from '@/components/admin/ui/AdminSubmitButton';
import { AdminConfirmDeleteForm, AdminFormDeleteButton } from '@/components/admin/ui/AdminTableActions';
import { AdminForm } from '@/components/admin/ui/AdminFormCard';
import { adminPage } from '@/components/admin/ui/admin-styles';

export default async function AdminEditPagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const page = await prisma.page.findUnique({ where: { id } });
  if (!page) notFound();

  const update = updatePageAction.bind(null, id);

  return (
    <div className={adminPage}>
      <AdminBackLink href="/admin/pages">Back to pages</AdminBackLink>

      <AdminForm title="Edit page" subtitle={page.title} action={update} className="max-w-2xl">
        <AdminField label="Title" name="title" defaultValue={page.title} required />
        <AdminField label="Slug" name="slug" defaultValue={page.slug} required />
        <AdminRichTextEditor label="Body" name="body" defaultValue={page.body} required uploadKind="page-image" />
        <AdminFileUpload
          label="Page image"
          name="imagePath"
          accept="image/jpeg,image/png,image/webp,image/gif"
          defaultValue={page.imagePath ?? ''}
          uploadKind="page-image"
          hint="Optional hero or banner image shown at the top of the page."
        />
        <AdminField label="Meta title" name="metaTitle" defaultValue={page.metaTitle ?? ''} />
        <AdminTextarea label="Meta description" name="metaDescription" defaultValue={page.metaDescription ?? ''} rows={3} />
        <AdminField label="Meta keywords (comma-separated)" name="metaKeywords" defaultValue={page.metaKeywords ?? ''} />
        <AdminCheckbox label="Published" name="published" defaultChecked={page.published} />
        <AdminSubmitButton pendingLabel="Saving page…">Save changes</AdminSubmitButton>
      </AdminForm>

      <AdminConfirmDeleteForm
        action={deletePageAction.bind(null, id)}
        confirmMessage="Delete this page permanently? This cannot be undone."
      >
        <AdminFormDeleteButton>Delete this page</AdminFormDeleteButton>
      </AdminConfirmDeleteForm>
    </div>
  );
}
