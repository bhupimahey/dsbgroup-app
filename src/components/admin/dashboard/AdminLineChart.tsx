export type LineItem = {
  label: string;
  value: number;
};

type Props = {
  items: LineItem[];
  title: string;
  subtitle?: string;
  color?: string;
};

export default function AdminLineChart({
  items,
  title,
  subtitle,
  color = '#05162e',
}: Props) {
  const width = 420;
  const height = 180;
  const padX = 28;
  const padY = 24;
  const chartW = width - padX * 2;
  const chartH = height - padY * 2;
  const max = Math.max(...items.map((i) => i.value), 1);

  const points = items.map((item, index) => {
    const x = padX + (items.length <= 1 ? chartW / 2 : (index / (items.length - 1)) * chartW);
    const y = padY + chartH - (item.value / max) * chartH;
    return { ...item, x, y };
  });

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath =
    points.length > 0
      ? `${linePath} L ${points[points.length - 1].x} ${padY + chartH} L ${points[0].x} ${padY + chartH} Z`
      : '';

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
      <div className="zynix-card-body">
        <svg viewBox={`0 0 ${width} ${height + 28}`} className="h-auto w-full" role="img" aria-label={title}>
          {[0, 0.25, 0.5, 0.75, 1].map((tick) => {
            const y = padY + chartH - tick * chartH;
            return (
              <line
                key={tick}
                x1={padX}
                x2={width - padX}
                y1={y}
                y2={y}
                stroke="#eef1f5"
                strokeWidth="1"
              />
            );
          })}

          {areaPath ? (
            <path d={areaPath} fill={color} fillOpacity="0.12" stroke="none" />
          ) : null}

          {linePath ? (
            <path d={linePath} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          ) : null}

          {points.map((point) => (
            <g key={point.label}>
              <circle cx={point.x} cy={point.y} r="4.5" fill="#fff" stroke={color} strokeWidth="2" />
              <text
                x={point.x}
                y={height + 16}
                textAnchor="middle"
                fontSize="10"
                fill="#64748b"
              >
                {point.label}
              </text>
            </g>
          ))}
        </svg>

        <div className="mt-2 flex flex-wrap gap-3 border-t pt-3" style={{ borderColor: 'var(--z-border)' }}>
          {items.slice(-3).map((item) => (
            <div key={item.label} className="text-xs" style={{ color: 'var(--z-text-muted)' }}>
              <span className="font-semibold" style={{ color: 'var(--z-text)' }}>
                {item.value}
              </span>{' '}
              in {item.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
