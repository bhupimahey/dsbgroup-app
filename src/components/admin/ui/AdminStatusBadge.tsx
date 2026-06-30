type Variant = 'published' | 'draft' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';

const styles: Record<Variant, { bg: string; color: string }> = {
  published: { bg: 'rgba(38, 191, 148, 0.12)', color: 'var(--z-success)' },
  draft: { bg: '#f3f4f6', color: 'var(--z-text-muted)' },
  success: { bg: 'rgba(38, 191, 148, 0.12)', color: 'var(--z-success)' },
  warning: { bg: 'rgba(245, 184, 73, 0.15)', color: 'var(--z-warning)' },
  danger: { bg: 'rgba(230, 83, 60, 0.12)', color: 'var(--z-danger)' },
  info: { bg: 'rgba(35, 183, 229, 0.12)', color: 'var(--z-info)' },
  neutral: { bg: '#f3f4f6', color: 'var(--z-text-muted)' },
};

type Props = {
  variant: Variant;
  children: React.ReactNode;
};

export default function AdminStatusBadge({ variant, children }: Props) {
  const s = styles[variant];
  return (
    <span
      className="inline-flex rounded-md px-2.5 py-1 text-xs font-semibold"
      style={{ background: s.bg, color: s.color }}
    >
      {children}
    </span>
  );
}
