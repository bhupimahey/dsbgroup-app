import Link from 'next/link';
import { verifyEmailAction } from '@/lib/auth/register-actions';
import AuthShell from '@/components/auth/AuthShell';
import { AUTH_LINK } from '@/components/auth/auth-classes';

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
      title={result.ok ? 'Email verified' : 'Verification failed'}
      description={result.message}
      footer={
        <Link href="/login" className={AUTH_LINK}>
          Continue to login
        </Link>
      }
    >
      {result.ok ? (
        <p className="text-sm text-green-800">Your account is active. Sign in to access premium content.</p>
      ) : (
        <p className="text-sm text-red-700">Register again if your verification link has expired.</p>
      )}
    </AuthShell>
  );
}
