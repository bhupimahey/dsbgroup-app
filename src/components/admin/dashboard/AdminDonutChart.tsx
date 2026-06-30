export type ChartSegment = {
  label: string;
  value: number;
  color: string;
};

type Props = {
  segments: ChartSegment[];
  title: string;
  subtitle?: string;
};

export default function AdminDonutChart({ segments, title, subtitle }: Props) {
  const total = segments.reduce((sum, s) => sum + s.value, 0);
  const size = 148;
  const stroke = 24;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  let offset = 0;
  const arcs = segments
    .filter((s) => s.value > 0)
    .map((segment) => {
      const pct = total > 0 ? segment.value / total : 0;
      const dash = pct * circumference;
      const current = { ...segment, dash, gap: circumference - dash, offset, pct };
      offset -= dash;
      return current;
    });

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
      <div className="zynix-card-body flex flex-col items-center gap-5">
        <div className="relative shrink-0">
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
            <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#f3f4f6" strokeWidth={stroke} />
            {total === 0 ? (
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="#e5e7eb"
                strokeWidth={stroke}
                strokeDasharray={`${circumference} 0`}
              />
            ) : (
              arcs.map((arc) => (
                <circle
                  key={arc.label}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="none"
                  stroke={arc.color}
                  strokeWidth={stroke}
                  strokeDasharray={`${arc.dash} ${arc.gap}`}
                  strokeDashoffset={arc.offset}
                />
              ))
            )}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-bold leading-none" style={{ color: 'var(--z-text)' }}>
              {total}
            </span>
            <span className="mt-1 text-[10px] font-medium uppercase tracking-wider" style={{ color: 'var(--z-text-muted)' }}>
              Total
            </span>
          </div>
        </div>

        <ul className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
          {segments.map((segment) => {
            const pct = total > 0 ? Math.round((segment.value / total) * 100) : 0;
            return (
              <li
                key={segment.label}
                className="flex items-center gap-2.5 rounded-lg border px-3 py-2.5"
                style={{ borderColor: 'var(--z-border)', background: '#fafbfc' }}
              >
                <span
                  className="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full ring-2 ring-white"
                  style={{ backgroundColor: segment.color }}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs leading-snug" style={{ color: 'var(--z-text-muted)' }}>
                    {segment.label}
                  </p>
                  <p className="mt-0.5 text-sm font-semibold leading-none" style={{ color: 'var(--z-text)' }}>
                    {segment.value}
                    <span className="ml-1 text-xs font-normal" style={{ color: 'var(--z-text-muted)' }}>
                      ({pct}%)
                    </span>
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
