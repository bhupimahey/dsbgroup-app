import Link from 'next/link';
import { requestPasswordResetAction } from '@/lib/auth/register-actions';
import UserFormPendingOverlay from '@/components/auth/UserFormPendingOverlay';
import UserSubmitButton from '@/components/auth/UserSubmitButton';
import AuthShell from '@/components/auth/AuthShell';
import { AUTH_FIELD, AUTH_LABEL, AUTH_LINK } from '@/components/auth/auth-classes';

export const metadata = { title: 'Forgot password' };

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string; error?: string; dev?: string; from?: string }>;
}) {
  const { sent, error, dev, from } = await searchParams;
  const loginHref = from === 'admin' ? '/admin/login' : '/login';

  return (
    <AuthShell
      badge="Password Reset"
      title="Forgot password"
      description="We will email a reset link if an account exists for that address."
      footer={
        <Link href={loginHref} className={AUTH_LINK}>
          Back to login
        </Link>
      }
    >
      {sent ? (
        <p className="mb-4 rounded-lg bg-green-50 p-4 text-sm text-green-900">
          If an account exists, a reset link has been sent.
          {dev ? (
            <a href={dev} className={`mt-2 block break-all ${AUTH_LINK}`}>
              {dev}
            </a>
          ) : null}
        </p>
      ) : null}
      {error ? <p className="mb-4 text-sm text-red-600">Enter a valid email address.</p> : null}

      <form action={requestPasswordResetAction} className="space-y-4">
        <div>
          <label htmlFor="email" className={AUTH_LABEL}>
            Email
          </label>
          <input id="email" name="email" type="email" required className={AUTH_FIELD} />
        </div>
        <UserSubmitButton pendingLabel="Sending reset link…">Send reset link</UserSubmitButton>
        <UserFormPendingOverlay message="Sending reset link…" />
      </form>
    </AuthShell>
  );
}
