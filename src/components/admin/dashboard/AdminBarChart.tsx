export type BarItem = {
  label: string;
  value: number;
  color?: string;
};

type Props = {
  items: BarItem[];
  title: string;
  subtitle?: string;
};

export default function AdminBarChart({ items, title, subtitle }: Props) {
  const max = Math.max(...items.map((i) => i.value), 1);

  return (
    <div className="zynix-card h-full">
      <div className="zynix-card-header">
        <h3 className="text-[15px] font-semibold" style={{ color: 'var(--z-text)' }}>
          {title}
        </h3>
        {subtitle ? (
          <p className="mt-0.5 text-xs" style={{ color: 'var(--z-text-muted)' }}>
            {subtitle}
          </p>
        ) : null}
      </div>
      <div className="zynix-card-body space-y-4">
        {items.map((item) => {
          const width = Math.max((item.value / max) * 100, item.value > 0 ? 8 : 0);
          const color = item.color ?? 'var(--z-primary)';

          return (
            <div key={item.label}>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="font-medium" style={{ color: 'var(--z-text)' }}>
                  {item.label}
                </span>
                <span className="font-semibold tabular-nums" style={{ color: 'var(--z-text)' }}>
                  {item.value}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full" style={{ background: '#f3f3f3' }}>
                <div className="h-full rounded-full transition-all duration-700" style={{ width: `${width}%`, backgroundColor: color }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
