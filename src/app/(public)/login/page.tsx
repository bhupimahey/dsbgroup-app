import Link from 'next/link';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';
import { auth, signIn } from '@/lib/auth';
import AuthShell from '@/components/auth/AuthShell';
import { AUTH_BUTTON, AUTH_FIELD, AUTH_LABEL, AUTH_LINK } from '@/components/auth/auth-classes';

export const metadata = { title: 'Client Login' };

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
    redirect(redirectTo);
  }

  async function loginAction(formData: FormData) {
    'use server';
    const target = String(formData.get('callbackUrl') ?? '/account');
    const safeTarget =
      target.startsWith('/') && !target.startsWith('/admin') ? target : '/account';

    try {
      await signIn('credentials', {
        email: String(formData.get('email') ?? ''),
        password: String(formData.get('password') ?? ''),
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
      description="Sign in to read premium articles and manage newsletter preferences."
      footer={
        <>
          Don&apos;t have an account?{' '}
          <Link href={`/register${callbackUrl ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ''}`} className={AUTH_LINK}>
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
            Invalid email or password. If you just registered, verify your email first.
          </p>
        ) : null}

        <button type="submit" className={AUTH_BUTTON}>
          Sign in
        </button>
      </form>
    </AuthShell>
  );
}
