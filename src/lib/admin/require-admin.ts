import { redirect } from 'next/navigation';
import { requireStaff } from '@/lib/admin/require-staff';

export async function requireAdmin() {
  const session = await requireStaff();
  if (session.user.role !== 'ADMIN') {
    redirect('/admin');
  }
  return session;
}
