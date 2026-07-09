import Link from 'next/link';
import { verifyEmailAction } from '@/lib/auth/register-actions';
import AuthShell from '@/components/auth/AuthShell';
import { AUTH_LINK } from '@/components/auth/auth-classes';
import { formatCategoryList, formatSubscriptionFrequency } from '@/lib/subscription/labels';

export const metadata = { title: 'Email verification' };

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <AuthShell
        badge="Email Verification"
        title="Invalid link"
        description="This verification link is missing a token."
        footer={
          <Link href="/register" className={AUTH_LINK}>
            Register again
          </Link>
        }
      >
        <p className="text-sm text-slate-600">Request a new account to receive a fresh verification email.</p>
      </AuthShell>
    );
  }

  const result = await verifyEmailAction(token);

  return (
    <AuthShell
      badge="Email Verification"
      title={result.ok ? 'Welcome to DSB Law Group' : 'Verification failed'}
      description={result.message}
      footer={
        <Link href="/login" className={AUTH_LINK}>
          Continue to login
        </Link>
      }
    >
      {result.ok ? (
        <div className="user-auth-success-panel">
          <p className="user-auth-success-lead">
            Your account is active. Sign in to access premium articles and manage your profile.
          </p>

          {result.categories?.length ? (
            <div className="user-auth-pref-card">
              <p className="user-auth-pref-card-label">Your newsletter preferences</p>
              <ul className="user-auth-pref-list">
                {result.categories.map((category) => (
                  <li key={category}>{category}</li>
                ))}
              </ul>
              {result.frequency ? (
                <p className="user-auth-pref-meta">
                  Delivery: <strong>{formatSubscriptionFrequency(result.frequency)}</strong>
                </p>
              ) : null}
              <p className="user-auth-pref-foot">
                You can add or remove practice areas anytime from your account profile after signing in.
              </p>
            </div>
          ) : (
            <div className="user-auth-info-note">
              <strong>Newsletter updates</strong>
              <p>
                You can subscribe to legal updates from your account profile after signing in. Choose the practice areas
                you care about and how often you want to hear from us.
              </p>
            </div>
          )}

          <p className="user-auth-success-footnote">
            {result.categories?.length
              ? `You are set to receive updates on ${formatCategoryList(result.categories)}.`
              : 'Browse premium articles and set newsletter preferences once you are signed in.'}
          </p>
        </div>
      ) : (
        <p className="text-sm text-red-700">Register again if your verification link has expired.</p>
      )}
    </AuthShell>
  );
}
