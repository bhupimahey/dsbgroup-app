import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import {
  deleteServiceCategoryAction,
  updateServiceCategoryAction,
} from '@/lib/admin/service-category-actions';
import { AdminCheckbox, AdminField } from '@/components/admin/AdminFormFields';
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

  return (
    <div className={adminPage}>
      <AdminBackLink href="/admin/service-categories">Back to service areas</AdminBackLink>
      <AdminForm title="Edit service area" subtitle={category.name} action={update}>
        <AdminField label="Name" name="name" defaultValue={category.name} required />
        <AdminField label="Slug" name="slug" defaultValue={category.slug} required />
        <AdminField label="Sort order" name="sortOrder" defaultValue={String(category.sortOrder)} />
        <AdminCheckbox label="Active" name="active" defaultChecked={category.active} />
        <AdminSubmitButton pendingLabel="Saving…">Save changes</AdminSubmitButton>
      </AdminForm>
      <AdminConfirmDeleteForm
        action={deleteServiceCategoryAction.bind(null, id)}
        confirmMessage="Delete this service area? Linked preferences will be removed."
      >
        <AdminFormDeleteButton>Delete service area</AdminFormDeleteButton>
      </AdminConfirmDeleteForm>
    </div>
  );
}
