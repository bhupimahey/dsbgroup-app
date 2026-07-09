import {
  createVideoTestimonialAction,
} from '@/lib/admin/testimonial-actions';
import { AdminCheckbox, AdminField } from '@/components/admin/AdminFormFields';
import AdminBackLink from '@/components/admin/ui/AdminBackLink';
import AdminSubmitButton from '@/components/admin/ui/AdminSubmitButton';
import { AdminForm } from '@/components/admin/ui/AdminFormCard';
import { adminPage } from '@/components/admin/ui/admin-styles';

export const metadata = { title: 'New video testimonial' };

export default function AdminNewVideoTestimonialPage() {
  return (
    <div className={adminPage}>
      <AdminBackLink href="/admin/testimonials">Back to testimonials</AdminBackLink>

      <AdminForm title="New video testimonial" action={createVideoTestimonialAction}>
        <AdminField label="Title" name="title" required />
        <AdminField
          label="YouTube URL"
          name="embedUrl"
          required
          hint="Paste a YouTube watch, shorts, or embed link. It will be saved as an embed URL."
        />
        <AdminField label="Sort order" name="sortOrder" defaultValue="0" />
        <AdminCheckbox label="Published" name="published" defaultChecked />
        <AdminSubmitButton>Create video testimonial</AdminSubmitButton>
      </AdminForm>
    </div>
  );
}
