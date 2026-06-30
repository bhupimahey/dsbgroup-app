import Link from 'next/link';
import { auth } from '@/lib/auth';
import PreferencesForm from '@/components/account/PreferencesForm';
import { prisma } from '@/lib/db';

export const metadata = { title: 'My account' };

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const session = await auth();
  const { saved } = await searchParams;

  const user = session?.user?.email
    ? await prisma.user.findUnique({
        where: { email: session.user.email },
        include: { subscriptionPreferences: true },
      })
    : null;

  const categories = await prisma.serviceCategory.findMany({
    where: { active: true },
    orderBy: { sortOrder: 'asc' },
  });

  const defaultFrequency =
    user?.subscriptionPreferences[0]?.frequency ?? 'WEEKLY';

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-2xl font-semibold text-slate-900">My account</h1>
      <p className="mt-2 text-sm text-slate-600">Signed in as {session?.user?.email}</p>
      {saved ? (
        <p className="mt-2 text-sm text-green-700">Preferences saved.</p>
      ) : null}

      <dl className="mt-8 space-y-3 rounded-xl border border-slate-200 bg-white p-6 text-sm">
        <div>
          <dt className="text-slate-500">Name</dt>
          <dd className="font-medium text-slate-900">{user?.name ?? '—'}</dd>
        </div>
        <div>
          <dt className="text-slate-500">Email verified</dt>
          <dd className="font-medium text-slate-900">
            {user?.emailVerified ? user.emailVerified.toLocaleString() : 'Not verified'}
          </dd>
        </div>
      </dl>

      <div className="mt-8">
        <PreferencesForm
          categories={categories}
          preferences={user?.subscriptionPreferences ?? []}
          defaultFrequency={defaultFrequency}
        />
      </div>

      <Link href="/articles" className="mt-6 inline-block text-blue-800 underline">
        Browse articles
      </Link>
    </div>
  );
}
