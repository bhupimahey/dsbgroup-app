import { createTeamAction } from '@/lib/admin/team-actions';
import AdminTeamMemberFields from '@/components/admin/AdminTeamMemberFields';
import AdminBackLink from '@/components/admin/ui/AdminBackLink';
import AdminSubmitButton from '@/components/admin/ui/AdminSubmitButton';
import { AdminForm } from '@/components/admin/ui/AdminFormCard';
import { adminPage } from '@/components/admin/ui/admin-styles';

export const metadata = { title: 'New team member' };

export default function AdminNewTeamMemberPage() {
  return (
    <div className={adminPage}>
      <AdminBackLink href="/admin/team">Back to team</AdminBackLink>

      <AdminForm title="New team member" action={createTeamAction}>
        <AdminTeamMemberFields />
        <AdminSubmitButton pendingLabel="Creating…">Create member</AdminSubmitButton>
      </AdminForm>
    </div>
  );
}
