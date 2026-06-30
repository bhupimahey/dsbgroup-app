import { requireAdmin } from '@/lib/admin/require-admin';
import { createStaffAction } from '@/lib/admin/staff-actions';
import { AdminCheckbox, AdminField, AdminSelect } from '@/components/admin/AdminFormFields';
import AdminBackLink from '@/components/admin/ui/AdminBackLink';
import AdminSubmitButton from '@/components/admin/ui/AdminSubmitButton';
import { AdminForm } from '@/components/admin/ui/AdminFormCard';
import { adminPage } from '@/components/admin/ui/admin-styles';

export const metadata = { title: 'New staff user' };

export default async function AdminNewStaffPage() {
  await requireAdmin();

  return (
    <div className={adminPage}>
      <AdminBackLink href="/admin/staff">Back to staff</AdminBackLink>
      <AdminForm title="New staff user" subtitle="Create an admin or editor account for CMS access." action={createStaffAction}>
        <AdminField label="Full name" name="name" required />
        <AdminField label="Email" name="email" type="email" required />
        <AdminField label="Temporary password" name="password" type="password" required hint="Minimum 8 characters." />
        <AdminSelect
          label="Role"
          name="role"
          defaultValue="EDITOR"
          options={[
            { value: 'EDITOR', label: 'Editor (CMS access)' },
            { value: 'ADMIN', label: 'Admin (full access)' },
          ]}
        />
        <AdminCheckbox label="Active" name="active" defaultChecked />
        <AdminSubmitButton pendingLabel="Creating…">Create staff user</AdminSubmitButton>
      </AdminForm>
    </div>
  );
}
