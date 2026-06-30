import Link from 'next/link';
import { requestPasswordResetAction } from '@/lib/auth/register-actions';

export const metadata = { title: 'Forgot password' };

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string; error?: string; dev?: string; from?: string }>;
}) {
  const { sent, error, dev, from } = await searchParams;
  const loginHref = from === 'admin' ? '/admin/login' : '/login';

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-2xl font-semibold text-slate-900">Forgot password</h1>
      <p className="mt-2 text-sm text-slate-600">We will email a reset link if the account exists.</p>
      {sent ? (
        <p className="mt-4 rounded-lg bg-green-50 p-4 text-sm text-green-900">
          If an account exists, a reset link has been sent.
          {dev ? (
            <a href={dev} className="mt-2 block break-all text-blue-800 underline">
              {dev}
            </a>
          ) : null}
        </p>
      ) : null}
      {error ? <p className="mt-4 text-sm text-red-600">Enter a valid email address.</p> : null}
      <form action={requestPasswordResetAction} className="mt-6 space-y-4 rounded-xl border bg-white p-6">
        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        <button type="submit" className="w-full rounded-md bg-blue-900 px-4 py-2 text-sm font-medium text-white">
          Send reset link
        </button>
      </form>
      <Link href={loginHref} className="mt-4 inline-block text-sm text-blue-800 underline">
        Back to login
      </Link>
    </div>
  );
}
