import { createOfficeAction } from '@/lib/admin/office-actions';
import { AdminCheckbox, AdminField, AdminTextarea } from '@/components/admin/AdminFormFields';
import AdminBackLink from '@/components/admin/ui/AdminBackLink';
import AdminSubmitButton from '@/components/admin/ui/AdminSubmitButton';
import { AdminForm } from '@/components/admin/ui/AdminFormCard';
import { adminPage } from '@/components/admin/ui/admin-styles';

export const metadata = { title: 'New office' };

export default function AdminNewOfficePage() {
  return (
    <div className={adminPage}>
      <AdminBackLink href="/admin/offices">Back to offices</AdminBackLink>

      <AdminForm title="New office" action={createOfficeAction}>
        <AdminField label="Name" name="name" required />
        <AdminTextarea label="Address" name="address" required rows={3} />
        <AdminField label="Phone" name="phone" />
        <AdminField label="Email" name="email" type="email" />
        <AdminField label="Map URL" name="mapUrl" hint="Google Maps or similar link." />
        <AdminField label="Sort order" name="sortOrder" defaultValue="0" />
        <AdminCheckbox label="Published" name="published" defaultChecked />
        <AdminSubmitButton>Create office</AdminSubmitButton>
      </AdminForm>
    </div>
  );
}
