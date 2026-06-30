import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import { deleteFaqItemAction, updateFaqItemAction } from '@/lib/admin/faq-actions';
import AdminFaqItemFields from '@/components/admin/AdminFaqItemFields';
import AdminBackLink from '@/components/admin/ui/AdminBackLink';
import AdminSubmitButton from '@/components/admin/ui/AdminSubmitButton';
import { AdminConfirmDeleteForm, AdminFormDeleteButton } from '@/components/admin/ui/AdminTableActions';
import { AdminForm } from '@/components/admin/ui/AdminFormCard';
import { adminPage } from '@/components/admin/ui/admin-styles';

export default async function AdminEditFaqItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [item, categories] = await Promise.all([
    prisma.faqItem.findUnique({ where: { id } }),
    prisma.faqCategory.findMany({ orderBy: { sortOrder: 'asc' } }),
  ]);
  if (!item) notFound();

  const update = updateFaqItemAction.bind(null, id);
  const remove = deleteFaqItemAction.bind(null, id);

  return (
    <div className={adminPage}>
      <AdminBackLink href="/admin/faq">Back to FAQ</AdminBackLink>

      <AdminForm title="Edit FAQ item" subtitle={item.question} action={update}>
        <AdminFaqItemFields
          categories={categories}
          defaults={{
            categoryId: item.categoryId,
            question: item.question,
            answer: item.answer,
            sortOrder: item.sortOrder,
            published: item.published,
          }}
        />
        <AdminSubmitButton pendingLabel="Saving…">Save changes</AdminSubmitButton>
      </AdminForm>

      <AdminConfirmDeleteForm
        action={remove}
        confirmMessage="Delete this FAQ item permanently? This cannot be undone."
      >
        <AdminFormDeleteButton>Delete this FAQ item</AdminFormDeleteButton>
      </AdminConfirmDeleteForm>
    </div>
  );
}
