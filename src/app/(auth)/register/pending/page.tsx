import Link from 'next/link';
import AuthShell from '@/components/auth/AuthShell';
import { AUTH_LINK } from '@/components/auth/auth-classes';

export const metadata = { title: 'Verify your email' };

export default async function RegisterPendingPage({
  searchParams,
}: {
  searchParams: Promise<{ dev?: string; callbackUrl?: string }>;
}) {
  const { dev, callbackUrl } = await searchParams;
  const loginHref = callbackUrl
    ? `/login?callbackUrl=${encodeURIComponent(callbackUrl)}`
    : '/login';

  return (
    <AuthShell
      badge="Email Verification"
      title="Check your email"
      description="We sent a verification link to your inbox. Click the link to activate your account, then sign in."
      footer={
        <Link href={loginHref} className={AUTH_LINK}>
          Back to login
        </Link>
      }
    >
      {dev ? (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
          <p className="font-medium">Development shortcut</p>
          <a href={dev} className={`mt-2 block break-all ${AUTH_LINK}`}>
            {dev}
          </a>
        </div>
      ) : (
        <p className="text-sm text-slate-600">
          Didn&apos;t receive the email? Check spam or register again with the correct address.
        </p>
      )}
    </AuthShell>
  );
}
