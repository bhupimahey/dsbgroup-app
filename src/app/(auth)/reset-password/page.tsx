import Link from 'next/link';
import { resetPasswordAction } from '@/lib/auth/register-actions';
import UserFormPendingOverlay from '@/components/auth/UserFormPendingOverlay';
import UserSubmitButton from '@/components/auth/UserSubmitButton';
import AuthShell from '@/components/auth/AuthShell';
import { AUTH_FIELD, AUTH_LABEL, AUTH_LINK } from '@/components/auth/auth-classes';

export const metadata = { title: 'Reset password' };

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; error?: string }>;
}) {
  const { token, error } = await searchParams;

  if (!token) {
    return (
      <AuthShell
        badge="Password Reset"
        title="Missing token"
        description="This reset link is incomplete."
        footer={
          <Link href="/forgot-password" className={AUTH_LINK}>
            Request new link
          </Link>
        }
      >
        <p className="text-sm text-red-600">Use the full link from your password reset email.</p>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      badge="Password Reset"
      title="Choose a new password"
      description="Enter and confirm your new password below."
      footer={
        <Link href="/login" className={AUTH_LINK}>
          Back to login
        </Link>
      }
    >
      {error ? <p className="mb-4 text-sm text-red-600">Link invalid or expired.</p> : null}

      <form action={resetPasswordAction} className="space-y-4">
        <input type="hidden" name="token" value={token} />
        <div>
          <label htmlFor="password" className={AUTH_LABEL}>
            New password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            className={AUTH_FIELD}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className={AUTH_LABEL}>
            Confirm password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            className={AUTH_FIELD}
          />
        </div>
        <UserSubmitButton pendingLabel="Updating password…">Update password</UserSubmitButton>
        <UserFormPendingOverlay message="Updating password…" />
      </form>
    </AuthShell>
  );
}
