import Link from 'next/link';
import { verifySubscriberAction } from '@/lib/subscription/actions';

export const metadata = { title: 'Confirm subscription' };

export default async function VerifySubscriberPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  if (!token) {
    return (
      <div className="mx-auto max-w-md px-4 py-16">
        <h1 className="text-2xl font-semibold">Invalid link</h1>
        <Link href="/" className="mt-4 inline-block text-blue-800 underline">
          Home
        </Link>
      </div>
    );
  }

  const result = await verifySubscriberAction(token);

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-2xl font-semibold text-slate-900">
        {result.ok ? 'Subscription confirmed' : 'Verification failed'}
      </h1>
      <p className="mt-2 text-sm text-slate-600">{result.message}</p>
      <Link href="/" className="mt-6 inline-block text-blue-800 underline">
        Back to home
      </Link>
    </div>
  );
}
