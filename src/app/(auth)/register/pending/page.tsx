import Link from 'next/link';

export const metadata = { title: 'Verify your email' };

export default async function RegisterPendingPage({
  searchParams,
}: {
  searchParams: Promise<{ dev?: string }>;
}) {
  const { dev } = await searchParams;

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-2xl font-semibold text-slate-900">Check your email</h1>
      <p className="mt-2 text-sm text-slate-600">
        We sent a verification link to your inbox. Click the link to activate your account, then sign in.
      </p>
      {dev ? (
        <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
          <p className="font-medium">Development shortcut</p>
          <a href={dev} className="mt-2 block break-all text-blue-800 underline">
            {dev}
          </a>
        </div>
      ) : null}
      <Link href="/login" className="mt-6 inline-block text-blue-800 underline">
        Back to login
      </Link>
    </div>
  );
}
