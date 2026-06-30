import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import { deleteCategoryAction, updateCategoryAction } from '@/lib/admin/category-actions';
import { AdminField } from '@/components/admin/AdminFormFields';
import AdminBackLink from '@/components/admin/ui/AdminBackLink';
import AdminSubmitButton from '@/components/admin/ui/AdminSubmitButton';
import { AdminConfirmDeleteForm, AdminFormDeleteButton } from '@/components/admin/ui/AdminTableActions';
import { AdminForm } from '@/components/admin/ui/AdminFormCard';
import { adminPage } from '@/components/admin/ui/admin-styles';

export default async function AdminEditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) notFound();

  const update = updateCategoryAction.bind(null, id);

  return (
    <div className={adminPage}>
      <AdminBackLink href="/admin/categories">Back to blog categories</AdminBackLink>
      <AdminForm title="Edit blog category" subtitle={category.name} action={update}>
        <AdminField label="Name" name="name" defaultValue={category.name} required />
        <AdminField label="Slug" name="slug" defaultValue={category.slug} required />
        <AdminSubmitButton pendingLabel="Saving…">Save changes</AdminSubmitButton>
      </AdminForm>
      <AdminConfirmDeleteForm
        action={deleteCategoryAction.bind(null, id)}
        confirmMessage="Delete this blog category?"
      >
        <AdminFormDeleteButton>Delete category</AdminFormDeleteButton>
      </AdminConfirmDeleteForm>
    </div>
  );
}
