import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import { deleteOfficeAction, updateOfficeAction } from '@/lib/admin/office-actions';
import { AdminCheckbox, AdminField, AdminTextarea } from '@/components/admin/AdminFormFields';
import AdminBackLink from '@/components/admin/ui/AdminBackLink';
import AdminSubmitButton from '@/components/admin/ui/AdminSubmitButton';
import { AdminConfirmDeleteForm, AdminFormDeleteButton } from '@/components/admin/ui/AdminTableActions';
import { AdminForm } from '@/components/admin/ui/AdminFormCard';
import { adminPage } from '@/components/admin/ui/admin-styles';

export default async function AdminEditOfficePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const office = await prisma.office.findUnique({ where: { id } });
  if (!office) notFound();

  const update = updateOfficeAction.bind(null, id);

  return (
    <div className={adminPage}>
      <AdminBackLink href="/admin/offices">Back to offices</AdminBackLink>

      <AdminForm title="Edit office" subtitle={office.name} action={update}>
        <AdminField label="Name" name="name" defaultValue={office.name} required />
        <AdminTextarea label="Address" name="address" defaultValue={office.address} required rows={3} />
        <AdminField label="Phone" name="phone" defaultValue={office.phone ?? ''} />
        <AdminField label="Email" name="email" type="email" defaultValue={office.email ?? ''} />
        <AdminField label="Map URL" name="mapUrl" defaultValue={office.mapUrl ?? ''} />
        <AdminField label="Sort order" name="sortOrder" defaultValue={String(office.sortOrder)} />
        <AdminCheckbox label="Published" name="published" defaultChecked={office.published} />
        <AdminSubmitButton pendingLabel="Saving…">Save changes</AdminSubmitButton>
      </AdminForm>

      <AdminConfirmDeleteForm
        action={deleteOfficeAction.bind(null, id)}
        confirmMessage="Delete this office permanently? This cannot be undone."
      >
        <AdminFormDeleteButton>Delete this office</AdminFormDeleteButton>
      </AdminConfirmDeleteForm>
    </div>
  );
}
