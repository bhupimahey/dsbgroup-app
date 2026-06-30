import { getSession } from '@/lib/auth/session';
import AdminShell from '@/components/admin/AdminShell';

export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  return (
    <AdminShell
      user={{
        email: session?.user?.email,
        name: session?.user?.name,
        role: session?.user?.role,
      }}
    >
      {children}
    </AdminShell>
  );
}
