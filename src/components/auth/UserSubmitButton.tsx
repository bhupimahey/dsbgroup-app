'use client';

import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { useFormStatus } from 'react-dom';
import UserSpinner from '@/components/auth/UserSpinner';
import { AUTH_BUTTON } from '@/components/auth/auth-classes';

type UserSubmitButtonProps = ComponentPropsWithoutRef<'button'> & {
  children: ReactNode;
  pendingLabel?: string;
};

export default function UserSubmitButton({
  children,
  pendingLabel = 'Please wait…',
  className = AUTH_BUTTON,
  ...props
}: UserSubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className={className} disabled={pending} aria-busy={pending} {...props}>
      {pending ? (
        <span className="user-submit-button-pending">
          <UserSpinner className="user-spinner user-spinner--inline" />
          {pendingLabel}
        </span>
      ) : (
        children
      )}
    </button>
  );
}
