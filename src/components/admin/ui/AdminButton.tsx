import type { ComponentPropsWithoutRef } from 'react';
import Link from 'next/link';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';

type ButtonProps = ComponentPropsWithoutRef<'button'> & { variant?: Variant };

export function AdminButton({ variant = 'primary', className = '', ...props }: ButtonProps) {
  const cls =
    variant === 'primary'
      ? 'zynix-btn-primary'
      : variant === 'danger'
        ? 'inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--z-danger)] px-4 py-2 text-sm font-medium text-white hover:opacity-90'
        : 'zynix-btn-light';
  return <button className={`${cls} ${className}`} {...props} />;
}

type LinkProps = ComponentPropsWithoutRef<typeof Link> & { variant?: Variant };

export function AdminButtonLink({ variant = 'primary', className = '', prefetch = true, ...props }: LinkProps) {
  const cls = variant === 'primary' ? 'zynix-btn-primary' : 'zynix-btn-light';
  return <Link prefetch={prefetch} className={`${cls} ${className}`} {...props} />;
}
