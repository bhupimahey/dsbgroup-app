'use client';

import { useTransition } from 'react';
import { signOutAction } from '@/lib/auth/sign-out-action';

export default function AdminSignOutButton() {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => startTransition(() => signOutAction())}
      className="flex w-full items-center gap-2 rounded-md px-0 py-1 text-sm font-medium text-red-600 transition hover:text-red-700 disabled:opacity-60"
    >
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {pending ? 'Signing out…' : 'Sign out'}
    </button>
  );
}
