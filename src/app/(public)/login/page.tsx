import Link from 'next/link';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';
import { auth, signIn } from '@/lib/auth';
import DsbLogo from '@/components/brand/DsbLogo';

export const metadata = { title: 'Client Login' };

export default async function UserLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; callbackUrl?: string }>;
}) {
  const session = await auth();
  const { error, callbackUrl } = await searchParams;
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
    <div className="bg-[#f0f2f5] py-12 sm:py-16">
      <div className="mx-auto max-w-md px-4 sm:px-6">
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-[#c5a059]/30 bg-[#05162e] px-6 py-8 text-center">
            <div className="flex justify-center">
              <DsbLogo height={48} priority onDark />
            </div>
            <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-[#c5a059]">
              Client Login
            </p>
            <h1 className="mt-2 text-2xl font-bold text-white">Welcome back</h1>
            <p className="mt-2 text-sm text-white/75">
              Sign in to read premium articles and manage newsletter preferences.
            </p>
          </div>

          <form action={loginAction} className="space-y-4 px-6 py-8">
            <input type="hidden" name="callbackUrl" value={redirectTo} />

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-[#05162e]">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="username"
                className="mt-1.5 w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20"
              />
            </div>

            <div>
              <div className="flex items-center justify-between gap-2">
                <label htmlFor="password" className="block text-sm font-semibold text-[#05162e]">
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs font-semibold text-[#c5a059] hover:underline">
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="mt-1.5 w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20"
              />
            </div>

            {error ? (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                Invalid email or password. If you just registered, verify your email first.
              </p>
            ) : null}

            <button
              type="submit"
              className="w-full rounded-md bg-[#05162e] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0a2444]"
            >
              Sign in
            </button>
          </form>

          <div className="border-t border-slate-200 bg-slate-50 px-6 py-5 text-center text-sm text-slate-600">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="font-semibold text-[#c5a059] hover:underline">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
