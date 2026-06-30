import Link from 'next/link';
import { resetPasswordAction } from '@/lib/auth/register-actions';

export const metadata = { title: 'Reset password' };

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; error?: string }>;
}) {
  const { token, error } = await searchParams;

  if (!token) {
    return (
      <div className="mx-auto max-w-md px-4 py-16">
        <p className="text-red-600">Missing reset token.</p>
        <Link href="/forgot-password" className="mt-4 inline-block text-blue-800 underline">
          Request new link
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-2xl font-semibold text-slate-900">Reset password</h1>
      {error ? <p className="mt-2 text-sm text-red-600">Link invalid or expired.</p> : null}
      <form action={resetPasswordAction} className="mt-6 space-y-4 rounded-xl border bg-white p-6">
        <input type="hidden" name="token" value={token} />
        <input
          name="password"
          type="password"
          required
          minLength={8}
          placeholder="New password"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        <input
          name="confirmPassword"
          type="password"
          required
          minLength={8}
          placeholder="Confirm password"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        <button type="submit" className="w-full rounded-md bg-blue-900 px-4 py-2 text-sm font-medium text-white">
          Update password
        </button>
      </form>
    </div>
  );
}
