import { redirect } from 'next/navigation';
import SiteFooter from '@/components/SiteFooter';
import SiteHeaderWithAuth from '@/components/SiteHeaderWithAuth';
import { auth } from '@/lib/auth';
import { isStaffRole } from '@/lib/auth-utils';

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) {
    redirect('/login?callbackUrl=/account');
  }
  if (isStaffRole(session.user.role)) {
    redirect('/admin');
  }

  return (
    <>
      <SiteHeaderWithAuth />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}
