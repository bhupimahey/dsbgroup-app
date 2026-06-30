'use client';

import Link from 'next/link';
import { useFormStatus } from 'react-dom';

type Props = {
  action: (formData: FormData) => Promise<void>;
  redirectTo: string;
  errorMessage: string | null;
};

function LoginFormFields({ errorMessage }: { errorMessage: string | null }) {
  const { pending } = useFormStatus();

  return (
    <>
      <div>
        <label htmlFor="email" className="text-sm font-semibold" style={{ color: 'var(--z-text)' }}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="username"
          placeholder="admin@gmail.com"
          className="zynix-auth-input"
          disabled={pending}
        />
      </div>

      <div>
        <div className="flex items-center justify-between gap-2">
          <label htmlFor="password" className="text-sm font-semibold" style={{ color: 'var(--z-text)' }}>
            Password
          </label>
          <Link href="/forgot-password?from=admin" className="zynix-auth-link text-xs">
            Forgot password?
          </Link>
        </div>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          placeholder="••••••••"
          className="zynix-auth-input"
          disabled={pending}
        />
      </div>

      {errorMessage ? (
        <p
          className="rounded-lg px-3 py-2 text-sm"
          style={{ background: 'rgba(230,83,60,0.1)', color: 'var(--z-danger)' }}
        >
          {errorMessage}
        </p>
      ) : null}

      {pending ? (
        <p
          className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm"
          role="status"
          aria-live="polite"
          style={{ background: 'rgba(var(--z-accent-rgb), 0.12)', color: 'var(--z-text)' }}
        >
          <span className="zynix-auth-spinner" aria-hidden="true" />
          Verifying credentials and opening your dashboard…
        </p>
      ) : null}

      <button
        type="submit"
        className="zynix-auth-btn zynix-auth-btn--loading"
        disabled={pending}
        aria-busy={pending}
      >
        {pending ? (
          <>
            <span className="zynix-auth-spinner zynix-auth-spinner--btn" aria-hidden="true" />
            Signing in…
          </>
        ) : (
          'Sign in to admin'
        )}
      </button>
    </>
  );
}

export default function AdminLoginForm({ action, redirectTo, errorMessage }: Props) {
  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="callbackUrl" value={redirectTo} />
      <LoginFormFields errorMessage={errorMessage} />
    </form>
  );
}
