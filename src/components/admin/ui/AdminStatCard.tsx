import type { ReactNode } from 'react';

type Tone = 'primary' | 'success' | 'info' | 'warning' | 'danger';

type Props = {
  label: string;
  value: number | string;
  tone?: Tone;
  hint?: string;
  trend?: string;
  icon?: ReactNode;
};

export default function AdminStatCard({
  label,
  value,
  tone = 'primary',
  hint,
  trend,
  icon,
}: Props) {
  return (
    <div className="zynix-stat-card">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium" style={{ color: 'var(--z-text-muted)' }}>
            {label}
          </p>
          <p className="mt-2 text-[1.75rem] font-bold leading-none" style={{ color: 'var(--z-text)' }}>
            {value}
          </p>
          {hint ? (
            <p className="mt-2 text-xs" style={{ color: 'var(--z-text-muted)' }}>
              {hint}
            </p>
          ) : null}
          {trend ? <span className="zynix-badge-up mt-2">{trend}</span> : null}
        </div>
        {icon ? <span className={`zynix-stat-icon ${tone}`}>{icon}</span> : null}
      </div>
    </div>
  );
}
