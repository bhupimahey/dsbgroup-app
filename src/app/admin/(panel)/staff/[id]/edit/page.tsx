import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/admin/require-admin';
import { deleteStaffAction, updateStaffAction } from '@/lib/admin/staff-actions';
import { AdminCheckbox, AdminField, AdminSelect } from '@/components/admin/AdminFormFields';
import AdminBackLink from '@/components/admin/ui/AdminBackLink';
import AdminSubmitButton from '@/components/admin/ui/AdminSubmitButton';
import { AdminConfirmDeleteForm, AdminFormDeleteButton } from '@/components/admin/ui/AdminTableActions';
import { AdminForm } from '@/components/admin/ui/AdminFormCard';
import { adminPage } from '@/components/admin/ui/admin-styles';

export default async function AdminEditStaffPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const member = await prisma.user.findUnique({ where: { id } });
  if (!member || member.role === 'USER') notFound();

  const update = updateStaffAction.bind(null, id);

  return (
    <div className={adminPage}>
      <AdminBackLink href="/admin/staff">Back to staff</AdminBackLink>
      <AdminForm title="Edit staff user" subtitle={member.email} action={update}>
        <AdminField label="Full name" name="name" defaultValue={member.name ?? ''} required />
        <AdminField label="Email" name="email" type="email" defaultValue={member.email} required />
        <AdminSelect
          label="Role"
          name="role"
          defaultValue={member.role}
          options={[
            { value: 'EDITOR', label: 'Editor (CMS access)' },
            { value: 'ADMIN', label: 'Admin (full access)' },
          ]}
        />
        <AdminCheckbox label="Active" name="active" defaultChecked={member.active} />
        <AdminSubmitButton pendingLabel="Saving…">Save changes</AdminSubmitButton>
      </AdminForm>
      <AdminConfirmDeleteForm
        action={deleteStaffAction.bind(null, id)}
        confirmMessage={`Remove staff access for ${member.email}?`}
      >
        <AdminFormDeleteButton>Remove staff user</AdminFormDeleteButton>
      </AdminConfirmDeleteForm>
    </div>
  );
}
