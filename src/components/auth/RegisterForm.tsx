'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { registerAction } from '@/lib/auth/register-actions';
import { AUTH_BUTTON, AUTH_FIELD, AUTH_LABEL, AUTH_LINK } from '@/components/auth/auth-classes';

const initialState: { error?: string } = {};

type RegisterFormProps = {
  callbackUrl?: string;
};

export default function RegisterForm({ callbackUrl }: RegisterFormProps) {
  const [state, action, pending] = useActionState(registerAction, initialState);
  const loginHref = callbackUrl
    ? `/login?callbackUrl=${encodeURIComponent(callbackUrl)}`
    : '/login';

  return (
    <form action={action} className="space-y-4">
      <div className="user-auth-note">
        <span className="user-auth-note-icon" aria-hidden>
          ✉
        </span>
        <p>
          After you submit this form, a <strong>verification email</strong> is sent to your inbox. Click the link to
          activate your account, then sign in.
        </p>
      </div>

      {callbackUrl ? <input type="hidden" name="callbackUrl" value={callbackUrl} /> : null}

      <div>
        <label htmlFor="name" className={AUTH_LABEL}>
          Full name
        </label>
        <input id="name" name="name" type="text" required autoComplete="name" className={AUTH_FIELD} />
      </div>

      <div>
        <label htmlFor="email" className={AUTH_LABEL}>
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={AUTH_FIELD}
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="password" className={AUTH_LABEL}>
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          className={AUTH_FIELD}
          placeholder="Minimum 8 characters"
        />
      </div>

      <div>
        <label htmlFor="confirmPassword" className={AUTH_LABEL}>
          Confirm password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          className={AUTH_FIELD}
        />
      </div>

      {state.error ? <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p> : null}

      <button type="submit" disabled={pending} className={AUTH_BUTTON}>
        {pending ? 'Creating account & sending email…' : 'Create account & verify email'}
      </button>

      <p className="text-center text-sm text-slate-600">
        Already have an account?{' '}
        <Link href={loginHref} className={AUTH_LINK}>
          Sign in
        </Link>
      </p>
    </form>
  );
}
