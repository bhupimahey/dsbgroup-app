import { createPageAction } from '@/lib/admin/page-actions';
import { AdminCheckbox, AdminField, AdminTextarea } from '@/components/admin/AdminFormFields';
import AdminFileUpload from '@/components/admin/AdminFileUpload';
import AdminRichTextEditor from '@/components/admin/AdminRichTextEditorLazy';
import AdminBackLink from '@/components/admin/ui/AdminBackLink';
import AdminSubmitButton from '@/components/admin/ui/AdminSubmitButton';
import { AdminForm } from '@/components/admin/ui/AdminFormCard';
import { adminPage } from '@/components/admin/ui/admin-styles';

export const metadata = { title: 'New page' };

export default function AdminNewPagePage() {
  return (
    <div className={adminPage}>
      <AdminBackLink href="/admin/pages">Back to pages</AdminBackLink>

      <AdminForm title="Create page" subtitle="Add a new CMS page." action={createPageAction} className="max-w-2xl">
        <AdminField label="Title" name="title" required />
        <AdminField label="Slug" name="slug" required hint="Lowercase letters, numbers, and hyphens only." />
        <AdminRichTextEditor label="Body" name="body" required uploadKind="page-image" />
        <AdminFileUpload
          label="Page image"
          name="imagePath"
          accept="image/jpeg,image/png,image/webp,image/gif"
          uploadKind="page-image"
          hint="Optional hero or banner image shown at the top of the page."
        />
        <AdminField label="Meta title" name="metaTitle" />
        <AdminTextarea label="Meta description" name="metaDescription" rows={3} />
        <AdminField label="Meta keywords (comma-separated)" name="metaKeywords" />
        <AdminCheckbox label="Published" name="published" />
        <AdminSubmitButton pendingLabel="Creating page…">Create page</AdminSubmitButton>
      </AdminForm>
    </div>
  );
}
