'use client';

import { useState, useTransition } from 'react';
import UserBusyOverlay from '@/components/auth/UserBusyOverlay';
import UserSpinner from '@/components/auth/UserSpinner';
import { deactivateAccountAction } from '@/lib/account/actions';

export default function DeactivateAccountForm() {
  const [confirmed, setConfirmed] = useState(false);
  const [pending, startTransition] = useTransition();

  function onDeactivate() {
    if (!confirmed) {
      setConfirmed(true);
      return;
    }
    startTransition(() => deactivateAccountAction());
  }

  return (
    <div className="user-account-card user-account-card--danger">
      <UserBusyOverlay active={pending} message="Deactivating account…" />
      <h2 className="user-account-card-title">Deactivate account</h2>
      <p className="user-account-card-desc">
        Your login will be disabled and newsletter preferences removed. Contact us if you need access restored.
      </p>
      {confirmed ? (
        <p className="mt-4 text-sm font-medium text-red-800">Are you sure? This cannot be undone from the website.</p>
      ) : null}
      <button
        type="button"
        disabled={pending}
        onClick={onDeactivate}
        className="mt-5 inline-flex items-center gap-2 rounded-md border border-red-300 bg-white px-4 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:opacity-60"
      >
        {pending ? (
          <>
            <UserSpinner className="user-spinner user-spinner--inline" />
            Deactivating…
          </>
        ) : confirmed ? (
          'Yes, deactivate my account'
        ) : (
          'Deactivate my account'
        )}
      </button>
      {confirmed && !pending ? (
        <button
          type="button"
          onClick={() => setConfirmed(false)}
          className="ml-3 mt-5 text-sm font-semibold text-slate-600 hover:underline"
        >
          Cancel
        </button>
      ) : null}
    </div>
  );
}
