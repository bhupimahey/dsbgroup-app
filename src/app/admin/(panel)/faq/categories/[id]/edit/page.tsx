import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import { deleteFaqCategoryAction, updateFaqCategoryAction } from '@/lib/admin/faq-actions';
import { AdminField } from '@/components/admin/AdminFormFields';
import AdminBackLink from '@/components/admin/ui/AdminBackLink';
import AdminSubmitButton from '@/components/admin/ui/AdminSubmitButton';
import { AdminConfirmDeleteForm, AdminFormDeleteButton } from '@/components/admin/ui/AdminTableActions';
import { AdminForm } from '@/components/admin/ui/AdminFormCard';
import { adminPage } from '@/components/admin/ui/admin-styles';

export default async function AdminEditFaqCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const category = await prisma.faqCategory.findUnique({
    where: { id },
    include: { _count: { select: { items: true } } },
  });
  if (!category) notFound();

  const update = updateFaqCategoryAction.bind(null, id);
  const remove = deleteFaqCategoryAction.bind(null, id);

  return (
    <div className={adminPage}>
      <AdminBackLink href="/admin/faq/categories">Back to categories</AdminBackLink>

      <AdminForm title="Edit FAQ category" subtitle={category.name} action={update}>
        <AdminField label="Category name" name="name" defaultValue={category.name} required />
        <AdminField label="Sort order" name="sortOrder" defaultValue={String(category.sortOrder)} />
        <AdminSubmitButton pendingLabel="Saving…">Save changes</AdminSubmitButton>
      </AdminForm>

      <AdminConfirmDeleteForm
        action={remove}
        confirmMessage={`Delete "${category.name}" and its ${category._count.items} FAQ item(s)? This cannot be undone.`}
      >
        <AdminFormDeleteButton>Delete this category</AdminFormDeleteButton>
      </AdminConfirmDeleteForm>
    </div>
  );
}
