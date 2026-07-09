import SiteFooter from '@/components/SiteFooter';
import SiteHeaderWithAuth from '@/components/SiteHeaderWithAuth';
import InitialPageLoader from '@/components/theme/InitialPageLoader';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <InitialPageLoader />
      <SiteHeaderWithAuth />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
