import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth/session';
import { isStaffRole } from '@/lib/auth-utils';

export async function requireStaff() {
  const session = await getSession();
  if (!session?.user || !isStaffRole(session.user.role)) {
    redirect('/admin/login');
  }
  return session;
}
