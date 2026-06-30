import type { ReactNode } from 'react';
import { adminSubtitle } from './admin-styles';

type Props = {
  title?: string;
  description?: string;
  actions?: ReactNode;
};

export default function AdminPageHeader({ title, description, actions }: Props) {
  if (!title && !description && !actions) return null;

  return (
    <div className="zynix-card mb-6">
      <div className="zynix-card-body flex flex-wrap items-start justify-between gap-4">
        <div>
          {title ? (
            <h2 className="text-base font-semibold" style={{ color: 'var(--z-text)' }}>
              {title}
            </h2>
          ) : null}
          {description ? (
            <p className={title ? adminSubtitle : 'text-sm'} style={{ color: 'var(--z-text-muted)' }}>
              {description}
            </p>
          ) : null}
        </div>
        {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
      </div>
    </div>
  );
}
