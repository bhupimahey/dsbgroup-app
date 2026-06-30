import Link from 'next/link';
import { verifyEmailAction } from '@/lib/auth/register-actions';

export const metadata = { title: 'Email verification' };

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <div className="mx-auto max-w-md px-4 py-16">
        <h1 className="text-2xl font-semibold text-slate-900">Invalid link</h1>
        <p className="mt-2 text-sm text-slate-600">This verification link is missing a token.</p>
        <Link href="/register" className="mt-6 inline-block text-blue-800 underline">
          Register again
        </Link>
      </div>
    );
  }

  const result = await verifyEmailAction(token);

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-2xl font-semibold text-slate-900">
        {result.ok ? 'Email verified' : 'Verification failed'}
      </h1>
      <p className="mt-2 text-sm text-slate-600">{result.message}</p>
      <Link href="/login" className="mt-6 inline-block text-blue-800 underline">
        Continue to login
      </Link>
    </div>
  );
}
