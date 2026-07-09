'use client';

import { useActionState, useState } from 'react';
import { registerAction } from '@/lib/auth/register-actions';
import NewsletterInterestFields, {
  type NewsletterCategory,
} from '@/components/subscription/NewsletterInterestFields';
import UserFormPendingOverlay from '@/components/auth/UserFormPendingOverlay';
import UserSubmitButton from '@/components/auth/UserSubmitButton';
import { AUTH_FIELD, AUTH_LABEL } from '@/components/auth/auth-classes';

const initialState: { error?: string } = {};

type RegisterFormProps = {
  callbackUrl?: string;
  categories: NewsletterCategory[];
  defaultEmail?: string;
};

export default function RegisterForm({ callbackUrl, categories, defaultEmail = '' }: RegisterFormProps) {
  const [state, action] = useActionState(registerAction, initialState);
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);

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
          defaultValue={defaultEmail}
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

      <div className="user-newsletter-opt-in">
        <label className="user-newsletter-opt-in-label">
          <input
            type="checkbox"
            name="subscribeNewsletter"
            value="on"
            checked={subscribeNewsletter}
            onChange={(event) => setSubscribeNewsletter(event.target.checked)}
            className="accent-[#05162e]"
          />
          <span>
            <strong>Send me legal updates by email</strong>
            <small>Choose practice areas now, or add them later from your profile.</small>
          </span>
        </label>
      </div>

      {subscribeNewsletter ? <NewsletterInterestFields categories={categories} compact /> : null}

      {state.error ? <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p> : null}

      <UserSubmitButton pendingLabel="Creating account…">
        Create account & verify email
      </UserSubmitButton>
      <UserFormPendingOverlay message="Creating account & sending verification email…" />
    </form>
  );
}
