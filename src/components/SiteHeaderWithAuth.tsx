import { getSession } from '@/lib/auth/session';
import HeaderAuthNav from '@/components/HeaderAuthNav';
import SiteHeader from '@/components/SiteHeader';

export default async function SiteHeaderWithAuth() {
  const session = await getSession();

  return (
    <SiteHeader
      socialAuth={
        <HeaderAuthNav
          user={
            session?.user?.email
              ? {
                  email: session.user.email,
                  name: session.user.name,
                  role: session.user.role,
                }
              : null
          }
        />
      }
    />
  );
}
