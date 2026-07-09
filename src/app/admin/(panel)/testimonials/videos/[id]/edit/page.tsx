import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import {
  deleteVideoTestimonialAction,
  updateVideoTestimonialAction,
} from '@/lib/admin/testimonial-actions';
import { AdminCheckbox, AdminField } from '@/components/admin/AdminFormFields';
import AdminBackLink from '@/components/admin/ui/AdminBackLink';
import AdminSubmitButton from '@/components/admin/ui/AdminSubmitButton';
import { AdminConfirmDeleteForm, AdminFormDeleteButton } from '@/components/admin/ui/AdminTableActions';
import { AdminForm } from '@/components/admin/ui/AdminFormCard';
import { adminPage } from '@/components/admin/ui/admin-styles';

export default async function AdminEditVideoTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const video = await prisma.videoTestimonial.findUnique({ where: { id } });
  if (!video) notFound();

  const update = updateVideoTestimonialAction.bind(null, id);
  const remove = deleteVideoTestimonialAction.bind(null, id);

  return (
    <div className={adminPage}>
      <AdminBackLink href="/admin/testimonials">Back to testimonials</AdminBackLink>

      <AdminForm title="Edit video testimonial" subtitle={video.title} action={update}>
        <AdminField label="Title" name="title" defaultValue={video.title} required />
        <AdminField
          label="YouTube URL"
          name="embedUrl"
          defaultValue={video.embedUrl}
          required
          hint="Paste a YouTube watch, shorts, or embed link."
        />
        <AdminField label="Sort order" name="sortOrder" defaultValue={String(video.sortOrder)} />
        <AdminCheckbox label="Published" name="published" defaultChecked={video.published} />
        <AdminSubmitButton pendingLabel="Saving…">Save changes</AdminSubmitButton>
      </AdminForm>

      <AdminConfirmDeleteForm
        action={remove}
        confirmMessage="Delete this video testimonial permanently? This cannot be undone."
      >
        <AdminFormDeleteButton>Delete video testimonial</AdminFormDeleteButton>
      </AdminConfirmDeleteForm>
    </div>
  );
}
