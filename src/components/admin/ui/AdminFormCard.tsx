import type { ReactNode } from 'react';

type Props = {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
};

export function AdminFormCard({ title, subtitle, children, className = '' }: Props) {
  return (
    <div className={`zynix-card ${className}`}>
      {title || subtitle ? (
        <div className="zynix-card-header">
          {title ? (
            <h2 className="text-[15px] font-semibold" style={{ color: 'var(--z-text)' }}>
              {title}
            </h2>
          ) : null}
          {subtitle ? (
            <p className="mt-0.5 text-xs" style={{ color: 'var(--z-text-muted)' }}>
              {subtitle}
            </p>
          ) : null}
        </div>
      ) : null}
      <div className="zynix-card-body space-y-4">{children}</div>
    </div>
  );
}

type FormProps = Props & {
  action: (formData: FormData) => void | Promise<void>;
};

export function AdminForm({ title, subtitle, action, children, className = 'max-w-2xl' }: FormProps) {
  return (
    <form action={action} className={`space-y-4 ${className}`}>
      <AdminFormCard title={title} subtitle={subtitle}>
        {children}
      </AdminFormCard>
    </form>
  );
}
