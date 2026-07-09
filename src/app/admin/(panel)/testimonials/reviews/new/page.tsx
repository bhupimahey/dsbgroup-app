import { createTextTestimonialAction } from '@/lib/admin/testimonial-actions';
import { AdminCheckbox, AdminField, AdminTextarea } from '@/components/admin/AdminFormFields';
import AdminBackLink from '@/components/admin/ui/AdminBackLink';
import AdminSubmitButton from '@/components/admin/ui/AdminSubmitButton';
import { AdminForm } from '@/components/admin/ui/AdminFormCard';
import { adminPage } from '@/components/admin/ui/admin-styles';

export const metadata = { title: 'New text testimonial' };

export default function AdminNewTextTestimonialPage() {
  return (
    <div className={adminPage}>
      <AdminBackLink href="/admin/testimonials">Back to testimonials</AdminBackLink>

      <AdminForm title="New text testimonial" action={createTextTestimonialAction}>
        <AdminTextarea label="Quote" name="quote" required rows={5} />
        <AdminField label="Client name" name="name" required />
        <AdminField label="Role / company" name="role" required />
        <AdminField label="Photo path" name="imagePath" hint="Optional image path under /public, e.g. /uploads/client.jpg" />
        <AdminField label="Sort order" name="sortOrder" defaultValue="0" />
        <AdminCheckbox label="Published" name="published" defaultChecked />
        <AdminSubmitButton>Create text testimonial</AdminSubmitButton>
      </AdminForm>
    </div>
  );
}
