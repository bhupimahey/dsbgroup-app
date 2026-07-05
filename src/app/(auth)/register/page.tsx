import Link from 'next/link';
import AuthShell, { REGISTER_PERKS } from '@/components/auth/AuthShell';
import RegisterForm from '@/components/auth/RegisterForm';
import { AUTH_LINK } from '@/components/auth/auth-classes';

export const metadata = { title: 'Register' };

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;
  const safeCallback =
    callbackUrl?.startsWith('/') && !callbackUrl.startsWith('/admin') ? callbackUrl : undefined;

  return (
    <AuthShell
      badge="Create Account"
      title="Join DSB Law Group"
      description="Register with your email. We will send a verification link to activate your account before first login."
      perks={[...REGISTER_PERKS]}
      footer={
        <>
          Already registered?{' '}
          <Link
            href={safeCallback ? `/login?callbackUrl=${encodeURIComponent(safeCallback)}` : '/login'}
            className={AUTH_LINK}
          >
            Sign in
          </Link>
        </>
      }
    >
      <RegisterForm callbackUrl={safeCallback} />
    </AuthShell>
  );
}
