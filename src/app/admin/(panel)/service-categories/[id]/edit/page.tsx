import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import {
  deleteServiceCategoryAction,
  updateServiceCategoryAction,
} from '@/lib/admin/service-category-actions';
import { AdminCheckbox, AdminField, AdminTextarea } from '@/components/admin/AdminFormFields';
import AdminFileUpload from '@/components/admin/AdminFileUpload';
import AdminBackLink from '@/components/admin/ui/AdminBackLink';
import AdminSubmitButton from '@/components/admin/ui/AdminSubmitButton';
import { AdminConfirmDeleteForm, AdminFormDeleteButton } from '@/components/admin/ui/AdminTableActions';
import { AdminForm } from '@/components/admin/ui/AdminFormCard';
import { adminPage } from '@/components/admin/ui/admin-styles';

export default async function AdminEditServiceCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const category = await prisma.serviceCategory.findUnique({ where: { id } });
  if (!category) notFound();

  const update = updateServiceCategoryAction.bind(null, id);
  const detailPage = await prisma.page.findUnique({
    where: { slug: category.slug },
    select: { id: true, slug: true },
  });

  return (
    <div className={adminPage}>
      <AdminBackLink href="/admin/service-categories">Back to service areas</AdminBackLink>
      <AdminForm
        title="Edit service area"
        subtitle={`${category.name} — controls the card on /services and the More Services strip on service detail pages.`}
        action={update}
      >
        <AdminField label="Name" name="name" defaultValue={category.name} required />
        <AdminField label="Slug" name="slug" defaultValue={category.slug} required />
        <AdminTextarea
          label="Card teaser"
          name="teaser"
          defaultValue={category.teaser ?? ''}
          rows={3}
          hint="Short summary shown on /services cards and the More Services strip on detail pages."
        />
        <AdminTextarea
          label="Long description"
          name="description"
          defaultValue={category.description ?? ''}
          rows={4}
          hint="Optional longer summary used where a fuller description is needed."
        />
        <AdminFileUpload
          label="Card image"
          name="imagePath"
          accept="image/jpeg,image/png,image/webp,image/gif"
          defaultValue={category.imagePath ?? ''}
          uploadKind="page-image"
          hint="Image used on the /services and More Services cards. Recommended 250×209."
        />
        <AdminField label="Sort order" name="sortOrder" defaultValue={String(category.sortOrder)} />
        <AdminCheckbox label="Active" name="active" defaultChecked={category.active} />
        <AdminSubmitButton pendingLabel="Saving…">Save changes</AdminSubmitButton>
      </AdminForm>

      {detailPage ? (
        <div
          className="rounded-xl border p-4 text-sm"
          style={{ borderColor: 'var(--z-border)', background: 'var(--z-surface)', color: 'var(--z-text)' }}
        >
          Detail page copy (hero, intro, benefits, sidebar) is managed under{' '}
          <Link className="underline" href={`/admin/pages/${detailPage.id}/edit`}>
            Pages → {category.name}
          </Link>
          .
        </div>
      ) : null}

      <AdminConfirmDeleteForm
        action={deleteServiceCategoryAction.bind(null, id)}
        confirmMessage="Delete this service area? Linked preferences will be removed."
      >
        <AdminFormDeleteButton>Delete service area</AdminFormDeleteButton>
      </AdminConfirmDeleteForm>
    </div>
  );
}
