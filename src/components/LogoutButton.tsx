'use client';

import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { useFormStatus } from 'react-dom';
import UserFormPendingOverlay from '@/components/auth/UserFormPendingOverlay';
import UserSpinner from '@/components/auth/UserSpinner';
import { signOutAction } from '@/lib/auth/sign-out-action';

type LogoutButtonProps = {
  className?: string;
  children?: ReactNode;
} & Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label' | 'title'>;

function LogoutSubmitButton({
  className = 'theme-header-social-icon',
  children,
  ...props
}: LogoutButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className={className} disabled={pending} aria-busy={pending} {...props}>
      {pending ? <UserSpinner className="user-spinner user-spinner--inline" /> : children}
    </button>
  );
}

export default function LogoutButton({
  className = 'theme-header-social-icon',
  children = 'Logout',
  ...props
}: LogoutButtonProps) {
  return (
    <form action={signOutAction} className="theme-header-auth-form">
      <LogoutSubmitButton className={className} {...props}>
        {children}
      </LogoutSubmitButton>
      <UserFormPendingOverlay message="Signing out…" />
    </form>
  );
}
