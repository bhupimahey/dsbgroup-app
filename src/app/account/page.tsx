import Link from 'next/link';
import { auth } from '@/lib/auth';
import ChangePasswordForm from '@/components/account/ChangePasswordForm';
import DeactivateAccountForm from '@/components/account/DeactivateAccountForm';
import PreferencesForm from '@/components/account/PreferencesForm';
import ProfileForm from '@/components/account/ProfileForm';
import { prisma } from '@/lib/db';

export const metadata = { title: 'My account' };

const SAVED_MESSAGES: Record<string, string> = {
  profile: 'Profile updated successfully.',
  password: 'Password updated successfully.',
  preferences: 'Newsletter preferences saved.',
};

const ERROR_MESSAGES: Record<string, string> = {
  profile: 'Could not update profile. Check your name and try again.',
  password: 'Could not update password. Check the form and try again.',
  'wrong-password': 'Current password is incorrect.',
  preferences: 'Select at least one practice area.',
};

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const session = await auth();
  const { saved, error } = await searchParams;

  const user = session?.user?.email
    ? await prisma.user.findUnique({
        where: { email: session.user.email },
        include: { subscriptionPreferences: true },
      })
    : null;

  const categories = await prisma.serviceCategory.findMany({
    where: { active: true },
    orderBy: { sortOrder: 'asc' },
  });

  const defaultFrequency = user?.subscriptionPreferences[0]?.frequency ?? 'WEEKLY';
  const displayName = user?.name ?? session?.user?.name ?? 'Client';

  return (
    <div className="user-account-page">
      <section className="user-account-hero">
        <div className="user-account-hero-inner">
          <p className="user-account-hero-label">Client portal</p>
          <h1 className="user-account-hero-title">Welcome, {displayName}</h1>
          <p className="user-account-hero-desc">
            Manage your profile, password, and newsletter preferences. Access premium articles after signing in.
          </p>
          <p className="user-account-hero-email">{session?.user?.email}</p>
        </div>
      </section>

      <div className="user-account-shell">
        {saved && SAVED_MESSAGES[saved] ? (
          <p className="user-account-alert user-account-alert--success">{SAVED_MESSAGES[saved]}</p>
        ) : null}
        {error && ERROR_MESSAGES[error] ? (
          <p className="user-account-alert user-account-alert--error">{ERROR_MESSAGES[error]}</p>
        ) : null}

        <div className="user-account-summary">
          <div>
            <span className="user-account-summary-label">Email verified</span>
            <strong>{user?.emailVerified ? user.emailVerified.toLocaleDateString('en-IN') : 'Pending'}</strong>
          </div>
          <div>
            <span className="user-account-summary-label">Newsletter topics</span>
            <strong>{user?.subscriptionPreferences.length ?? 0} selected</strong>
          </div>
        </div>

        <div className="user-account-grid">
          <ProfileForm name={user?.name ?? ''} />
          <ChangePasswordForm />
          <PreferencesForm
            categories={categories}
            preferences={user?.subscriptionPreferences ?? []}
            defaultFrequency={defaultFrequency}
          />
        </div>

        <section className="user-account-quick-links">
          <h2 className="user-account-card-title">Quick links</h2>
          <div className="user-account-link-row">
            <Link href="/articles" className="user-account-quick-link">
              Browse premium articles
            </Link>
            <Link href="/blog" className="user-account-quick-link">
              Read public blog
            </Link>
            <Link href="/newsletters" className="user-account-quick-link">
              View newsletters
            </Link>
          </div>
        </section>

        <DeactivateAccountForm />
      </div>
    </div>
  );
}
