import Link from 'next/link';
import AuthShell from '@/components/auth/AuthShell';
import { AUTH_LINK } from '@/components/auth/auth-classes';

export const metadata = { title: 'Verify your email' };

export default async function RegisterPendingPage({
  searchParams,
}: {
  searchParams: Promise<{ dev?: string; callbackUrl?: string; email?: string }>;
}) {
  const { dev, callbackUrl, email } = await searchParams;
  const loginHref = callbackUrl
    ? `/login?callbackUrl=${encodeURIComponent(callbackUrl)}`
    : '/login';
  const maskedEmail = email ? decodeURIComponent(email) : 'your email address';

  return (
    <AuthShell
      badge="Verify Email"
      title="Check your inbox"
      description={`We sent an account verification link to ${maskedEmail}.`}
      footer={
        <Link href={loginHref} className={AUTH_LINK}>
          Back to login
        </Link>
      }
    >
      <div className="user-auth-verify-steps">
        <div className="user-auth-verify-step">
          <span className="user-auth-verify-step-num">1</span>
          <div>
            <strong>Open the verification email</strong>
            <span>Look for the subject “Verify your DSB Law Group account” from DSB Law Group.</span>
          </div>
        </div>
        <div className="user-auth-verify-step">
          <span className="user-auth-verify-step-num">2</span>
          <div>
            <strong>Click “Verify email address”</strong>
            <span>This activates your account. The link expires in 24 hours.</span>
          </div>
        </div>
        <div className="user-auth-verify-step">
          <span className="user-auth-verify-step-num">3</span>
          <div>
            <strong>Sign in to your account</strong>
            <span>After verification, use your email and password at the login page.</span>
          </div>
        </div>
      </div>

      {dev ? (
        <div className="user-auth-dev-link">
          <strong>Local development shortcut</strong>
          <p>No email provider configured — use this link instead:</p>
          <a href={dev}>{dev}</a>
        </div>
      ) : (
        <p className="mt-4 text-sm text-slate-600">
          Didn&apos;t receive the email? Check spam/junk, wait a minute, or register again with the correct address.
        </p>
      )}
    </AuthShell>
  );
}
