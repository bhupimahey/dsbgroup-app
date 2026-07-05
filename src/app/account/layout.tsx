import SiteFooter from '@/components/SiteFooter';
import SiteHeaderWithAuth from '@/components/SiteHeaderWithAuth';

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeaderWithAuth />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}
