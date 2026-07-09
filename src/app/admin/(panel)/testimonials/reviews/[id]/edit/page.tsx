import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import {
  deleteTextTestimonialAction,
  updateTextTestimonialAction,
} from '@/lib/admin/testimonial-actions';
import { AdminCheckbox, AdminField, AdminTextarea } from '@/components/admin/AdminFormFields';
import AdminBackLink from '@/components/admin/ui/AdminBackLink';
import AdminSubmitButton from '@/components/admin/ui/AdminSubmitButton';
import { AdminConfirmDeleteForm, AdminFormDeleteButton } from '@/components/admin/ui/AdminTableActions';
import { AdminForm } from '@/components/admin/ui/AdminFormCard';
import { adminPage } from '@/components/admin/ui/admin-styles';

export default async function AdminEditTextTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const review = await prisma.textTestimonial.findUnique({ where: { id } });
  if (!review) notFound();

  const update = updateTextTestimonialAction.bind(null, id);
  const remove = deleteTextTestimonialAction.bind(null, id);

  return (
    <div className={adminPage}>
      <AdminBackLink href="/admin/testimonials">Back to testimonials</AdminBackLink>

      <AdminForm title="Edit text testimonial" subtitle={review.name} action={update}>
        <AdminTextarea label="Quote" name="quote" defaultValue={review.quote} required rows={5} />
        <AdminField label="Client name" name="name" defaultValue={review.name} required />
        <AdminField label="Role / company" name="role" defaultValue={review.role} required />
        <AdminField
          label="Photo path"
          name="imagePath"
          defaultValue={review.imagePath ?? ''}
          hint="Optional image path under /public."
        />
        <AdminField label="Sort order" name="sortOrder" defaultValue={String(review.sortOrder)} />
        <AdminCheckbox label="Published" name="published" defaultChecked={review.published} />
        <AdminSubmitButton pendingLabel="Saving…">Save changes</AdminSubmitButton>
      </AdminForm>

      <AdminConfirmDeleteForm
        action={remove}
        confirmMessage="Delete this text testimonial permanently? This cannot be undone."
      >
        <AdminFormDeleteButton>Delete text testimonial</AdminFormDeleteButton>
      </AdminConfirmDeleteForm>
    </div>
  );
}
