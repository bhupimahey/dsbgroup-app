import Link from 'next/link';
import AuthShell, { REGISTER_PERKS } from '@/components/auth/AuthShell';
import RegisterForm from '@/components/auth/RegisterForm';
import { AUTH_LINK } from '@/components/auth/auth-classes';
import { prisma } from '@/lib/db';

export const metadata = { title: 'Register' };

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string; email?: string }>;
}) {
  const { callbackUrl, email } = await searchParams;
  const safeCallback =
    callbackUrl?.startsWith('/') && !callbackUrl.startsWith('/admin') ? callbackUrl : undefined;
  const defaultEmail = email?.trim() ?? '';

  const categories = await prisma.serviceCategory.findMany({
    where: { active: true },
    orderBy: { sortOrder: 'asc' },
    select: { id: true, name: true, slug: true },
  });

  return (
    <AuthShell
      badge="Create Account"
      title="Join DSB Law Group"
      description="Register with your email. We will send a verification link to activate your account before first login."
      perks={[...REGISTER_PERKS]}
      footer={
        <>
          Already have an account?{' '}
          <Link
            href={safeCallback ? `/login?callbackUrl=${encodeURIComponent(safeCallback)}` : '/login'}
            className={AUTH_LINK}
          >
            Sign in
          </Link>
        </>
      }
    >
      <RegisterForm callbackUrl={safeCallback} categories={categories} defaultEmail={defaultEmail} />
    </AuthShell>
  );
}
