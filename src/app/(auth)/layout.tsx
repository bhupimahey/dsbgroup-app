import SiteFooter from '@/components/SiteFooter';
import SiteHeaderWithAuth from '@/components/SiteHeaderWithAuth';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeaderWithAuth />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
