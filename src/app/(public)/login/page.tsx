import Link from 'next/link';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';
import { auth, signIn } from '@/lib/auth';
import { isStaffRole } from '@/lib/auth-utils';
import UserFormPendingOverlay from '@/components/auth/UserFormPendingOverlay';
import UserSubmitButton from '@/components/auth/UserSubmitButton';
import AuthShell from '@/components/auth/AuthShell';
import { AUTH_FIELD, AUTH_LABEL, AUTH_LINK } from '@/components/auth/auth-classes';
import { prisma } from '@/lib/db';

export const metadata = { title: 'Client Login' };

const ERROR_MESSAGES: Record<string, string> = {
  CredentialsSignin: 'Invalid email or password. If you just registered, verify your email first.',
  StaffUseAdmin: 'Staff accounts cannot sign in here. Use the admin portal instead.',
};

export default async function UserLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; callbackUrl?: string; reset?: string }>;
}) {
  const session = await auth();
  const { error, callbackUrl, reset } = await searchParams;
  const redirectTo =
    callbackUrl?.startsWith('/') && !callbackUrl.startsWith('/admin') ? callbackUrl : '/account';

  if (session?.user) {
    if (isStaffRole(session.user.role)) {
      redirect('/admin');
    }
    redirect(redirectTo);
  }

  async function loginAction(formData: FormData) {
    'use server';
    const target = String(formData.get('callbackUrl') ?? '/account');
    const safeTarget =
      target.startsWith('/') && !target.startsWith('/admin') ? target : '/account';
    const email = String(formData.get('email') ?? '').trim().toLowerCase();
    const password = String(formData.get('password') ?? '');

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing?.passwordHash && existing.active) {
      const matches = await bcrypt.compare(password, existing.passwordHash);
      if (matches && isStaffRole(existing.role)) {
        redirect(`/login?error=StaffUseAdmin&callbackUrl=${encodeURIComponent(safeTarget)}`);
      }
    }

    try {
      await signIn('credentials', {
        email,
        password,
        portal: 'client',
        redirectTo: safeTarget,
      });
    } catch (err) {
      if (err instanceof AuthError && err.type === 'CredentialsSignin') {
        redirect(`/login?error=CredentialsSignin&callbackUrl=${encodeURIComponent(safeTarget)}`);
      }
      throw err;
    }
  }

  return (
    <AuthShell
      badge="Client Login"
      title="Welcome back"
      description="Sign in to read premium articles and manage your newsletter preferences."
      footer={
        <>
          Don&apos;t have an account?{' '}
          <Link
            href={`/register${callbackUrl ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ''}`}
            className={AUTH_LINK}
          >
            Register
          </Link>
        </>
      }
    >
      {reset ? (
        <p className="mb-4 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-800">
          Password updated. You can sign in now.
        </p>
      ) : null}

      <form action={loginAction} className="space-y-4">
        <input type="hidden" name="callbackUrl" value={redirectTo} />

        <div>
          <label htmlFor="email" className={AUTH_LABEL}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="username"
            className={AUTH_FIELD}
            placeholder="you@example.com"
          />
        </div>

        <div>
          <div className="flex items-center justify-between gap-2">
            <label htmlFor="password" className={AUTH_LABEL}>
              Password
            </label>
            <Link href="/forgot-password" className={`text-xs ${AUTH_LINK}`}>
              Forgot password?
            </Link>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className={AUTH_FIELD}
          />
        </div>

        {error ? (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {ERROR_MESSAGES[error] ?? ERROR_MESSAGES.CredentialsSignin}
            {error === 'StaffUseAdmin' ? (
              <>
                {' '}
                <Link href="/admin/login" className={AUTH_LINK}>
                  Go to admin login
                </Link>
              </>
            ) : null}
          </p>
        ) : null}

        <UserSubmitButton pendingLabel="Signing in…">Sign in</UserSubmitButton>
        <UserFormPendingOverlay message="Signing in…" />
      </form>

      <p className="mt-6 text-center text-xs text-gray-500">
        DSB staff?{' '}
        <Link href="/admin/login" className={AUTH_LINK}>
          Sign in to the admin portal
        </Link>
      </p>
    </AuthShell>
  );
}
