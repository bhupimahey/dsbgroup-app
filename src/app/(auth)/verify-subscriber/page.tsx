import Link from 'next/link';
import { verifySubscriberAction } from '@/lib/subscription/actions';
import AuthShell from '@/components/auth/AuthShell';
import { AUTH_BUTTON, AUTH_LINK } from '@/components/auth/auth-classes';
import { formatCategoryList, formatSubscriptionFrequency } from '@/lib/subscription/labels';

export const metadata = { title: 'Confirm subscription' };

export default async function VerifySubscriberPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <AuthShell
        badge="Newsletter"
        title="Invalid link"
        description="This subscription confirmation link is missing a token."
        footer={
          <Link href="/" className={AUTH_LINK}>
            Back to home
          </Link>
        }
      >
        <p className="text-sm text-slate-600">Use the latest link from your confirmation email.</p>
      </AuthShell>
    );
  }

  const result = await verifySubscriberAction(token);
  const registerHref = result.ok && result.email
    ? `/register?email=${encodeURIComponent(result.email)}`
    : '/register';

  return (
    <AuthShell
      badge="Newsletter"
      title={result.ok ? 'Subscription confirmed' : 'Verification failed'}
      description={
        result.ok
          ? 'You will now receive legal updates from DSB Law Group at the email address you provided.'
          : result.message
      }
      footer={
        result.ok ? (
          <>
            Prefer to manage everything in one place?{' '}
            <Link href={registerHref} className={AUTH_LINK}>
              Create a free account
            </Link>
          </>
        ) : (
          <Link href="/" className={AUTH_LINK}>
            Back to home
          </Link>
        )
      }
    >
      {result.ok ? (
        <div className="user-auth-success-panel">
          <p className="user-auth-success-lead">
            Your newsletter subscription is active. We&apos;ll send updates based on the interests you selected.
          </p>

          {result.categories?.length ? (
            <div className="user-auth-pref-card">
              <p className="user-auth-pref-card-label">Your selected interests</p>
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
            </div>
          ) : null}

          <div className="user-auth-info-note">
            <strong>Want to change practice areas later?</strong>
            <p>
              Create a free client account to manage newsletter preferences, read premium articles, and update your
              profile anytime. Your guest subscription and account preferences stay separate until you register.
            </p>
          </div>

          <Link href={registerHref} className={`${AUTH_BUTTON} user-auth-success-cta`}>
            Create free account
          </Link>
          <p className="user-auth-success-footnote">
            Selected areas: {result.categories?.length ? formatCategoryList(result.categories) : 'your chosen topics'}.
            After registration you can add or remove practice areas from your profile.
          </p>
        </div>
      ) : (
        <p className="text-sm text-red-700">{result.message}</p>
      )}
    </AuthShell>
  );
}
