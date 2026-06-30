'use client';

import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { useFormStatus } from 'react-dom';
import { AdminButton } from '@/components/admin/ui/AdminButton';
import { AdminSpinner } from '@/components/admin/ui/AdminIcons';

type Props = ComponentPropsWithoutRef<'button'> & {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  pendingLabel?: string;
};

export default function AdminSubmitButton({
  children,
  variant = 'primary',
  className = '',
  pendingLabel = 'Saving…',
  ...props
}: Props) {
  const { pending } = useFormStatus();

  return (
    <AdminButton type="submit" variant={variant} className={className} disabled={pending} aria-busy={pending} {...props}>
      {pending ? (
        <>
          <AdminSpinner className="h-4 w-4" />
          {pendingLabel}
        </>
      ) : (
        children
      )}
    </AdminButton>
  );
}
