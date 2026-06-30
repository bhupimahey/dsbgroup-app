type Props = {
  value: number;
  max?: number;
  label: string;
  suffix?: string;
  title: string;
  subtitle?: string;
};

export default function AdminGaugeChart({
  value,
  max = 100,
  label,
  suffix = '%',
  title,
  subtitle,
}: Props) {
  const pct = max > 0 ? Math.min(Math.max((value / max) * 100, 0), 100) : 0;
  const size = 140;
  const stroke = 12;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = (pct / 100) * circumference;

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
      <div className="zynix-card-body flex flex-col items-center">
        <div className="relative">
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
            <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#f3f3f3" strokeWidth={stroke} />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="var(--z-accent)"
              strokeWidth={stroke}
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold" style={{ color: 'var(--z-text)' }}>
              {value.toFixed(suffix === '%' ? 1 : 0)}
              {suffix}
            </span>
          </div>
        </div>
        <p className="mt-3 text-center text-sm" style={{ color: 'var(--z-text-muted)' }}>
          {label}
        </p>
      </div>
    </div>
  );
}
