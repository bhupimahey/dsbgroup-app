import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import SubscriptionPopupGate from '@/components/subscription/SubscriptionPopupGate';
import InitialPageLoader from '@/components/theme/InitialPageLoader';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <InitialPageLoader />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <SubscriptionPopupGate />
    </>
  );
}
