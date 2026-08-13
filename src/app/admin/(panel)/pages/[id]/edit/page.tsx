import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import { deletePageAction, updatePageAction } from '@/lib/admin/page-actions';
import { getPageEditorKind } from '@/lib/admin/page-templates';
import AdminAboutPageFields from '@/components/admin/AdminAboutPageFields';
import AdminNbfcPageFields from '@/components/admin/AdminNbfcPageFields';
import AdminServiceDetailFields from '@/components/admin/AdminServiceDetailFields';
import AdminServicesIndexFields from '@/components/admin/AdminServicesIndexFields';
import { AdminCheckbox, AdminField, AdminTextarea } from '@/components/admin/AdminFormFields';
import AdminFileUpload from '@/components/admin/AdminFileUpload';
import AdminRichTextEditor from '@/components/admin/AdminRichTextEditorLazy';
import AdminBackLink from '@/components/admin/ui/AdminBackLink';
import AdminSubmitButton from '@/components/admin/ui/AdminSubmitButton';
import { AdminConfirmDeleteForm, AdminFormDeleteButton } from '@/components/admin/ui/AdminTableActions';
import { AdminForm } from '@/components/admin/ui/AdminFormCard';
import { adminPage } from '@/components/admin/ui/admin-styles';
import { resolveAboutJsonFromPage } from '@/lib/site/about-page-json';
import { resolveNbfcJsonFromPage } from '@/lib/site/nbfc-page-json';
import { resolveServiceDetailJson, resolveServicesIndexJson } from '@/lib/site/service-page-json';

export default async function AdminEditPagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const page = await prisma.page.findUnique({ where: { id } });
  if (!page) notFound();

  const editorKind = await getPageEditorKind(page.slug);
  const update = updatePageAction.bind(null, id);

  const titles: Record<typeof editorKind, string> = {
    about: 'Edit About Us page',
    'services-index': 'Edit Services index page',
    'service-detail': 'Edit service detail page',
    nbfc: 'Edit NBFC Advisory page',
    standard: 'Edit page',
  };

  const subtitles: Record<typeof editorKind, string> = {
    about: 'Structured sections map directly to the public /about layout.',
    'services-index': 'Controls the /services listing page hero and heading.',
    'service-detail': 'Structured sections map to the public service detail layout.',
    nbfc: 'Structured sections map directly to the public /nbfc layout.',
    standard: page.title,
  };

  return (
    <div className={adminPage}>
      <AdminBackLink href="/admin/pages">Back to pages</AdminBackLink>

      <AdminForm
        title={titles[editorKind]}
        subtitle={subtitles[editorKind]}
        action={update}
        className={editorKind === 'standard' ? 'max-w-2xl' : 'max-w-3xl'}
      >
        {editorKind === 'about' ? (
          <AdminAboutPageFields
            content={resolveAboutJsonFromPage(page)}
            slug={page.slug}
            imagePath={page.imagePath}
            metaDescription={page.metaDescription}
            metaKeywords={page.metaKeywords}
            published={page.published}
          />
        ) : editorKind === 'services-index' ? (
          <AdminServicesIndexFields
            content={resolveServicesIndexJson(page)}
            slug={page.slug}
            metaDescription={page.metaDescription}
            metaKeywords={page.metaKeywords}
            published={page.published}
          />
        ) : editorKind === 'service-detail' ? (
          <AdminServiceDetailFields
            content={resolveServiceDetailJson(page)}
            title={page.title}
            slug={page.slug}
            imagePath={page.imagePath}
            metaDescription={page.metaDescription}
            metaKeywords={page.metaKeywords}
            published={page.published}
          />
        ) : editorKind === 'nbfc' ? (
          <AdminNbfcPageFields
            content={resolveNbfcJsonFromPage(page)}
            slug={page.slug}
            metaDescription={page.metaDescription}
            metaKeywords={page.metaKeywords}
            published={page.published}
          />
        ) : (
          <>
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
          </>
        )}
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
