import { getSession } from '@/lib/auth/session';
import SubscriptionPopup from '@/components/subscription/SubscriptionPopup';

export default async function SubscriptionPopupGate() {
  const session = await getSession();
  if (session?.user) return null;
  return <SubscriptionPopup />;
}
