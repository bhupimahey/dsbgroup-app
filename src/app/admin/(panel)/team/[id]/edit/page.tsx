import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import { deleteTeamAction, updateTeamAction } from '@/lib/admin/team-actions';
import AdminTeamMemberFields from '@/components/admin/AdminTeamMemberFields';
import AdminBackLink from '@/components/admin/ui/AdminBackLink';
import AdminSubmitButton from '@/components/admin/ui/AdminSubmitButton';
import { AdminConfirmDeleteForm, AdminFormDeleteButton } from '@/components/admin/ui/AdminTableActions';
import { AdminForm } from '@/components/admin/ui/AdminFormCard';
import { adminPage } from '@/components/admin/ui/admin-styles';

export default async function AdminEditTeamMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const member = await prisma.teamMember.findUnique({ where: { id } });
  if (!member) notFound();

  const update = updateTeamAction.bind(null, id);

  return (
    <div className={adminPage}>
      <AdminBackLink href="/admin/team">Back to team</AdminBackLink>

      <AdminForm title="Edit team member" subtitle={member.name} action={update}>
        <AdminTeamMemberFields defaults={member} />
        <AdminSubmitButton pendingLabel="Saving…">Save changes</AdminSubmitButton>
      </AdminForm>

      <AdminConfirmDeleteForm
        action={deleteTeamAction.bind(null, id)}
        confirmMessage="Delete this team member permanently? This cannot be undone."
      >
        <AdminFormDeleteButton>Delete this member</AdminFormDeleteButton>
      </AdminConfirmDeleteForm>
    </div>
  );
}
