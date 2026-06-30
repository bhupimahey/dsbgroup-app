export type ChartSeries = {
  name: string;
  value: number;
  color: string;
};

export type ChartGroup = {
  label: string;
  series: ChartSeries[];
};

type Props = {
  groups: ChartGroup[];
  title: string;
  subtitle?: string;
};

function truncate(text: string, max = 28) {
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

export default function AdminGroupedBarChart({ groups, title, subtitle }: Props) {
  const max = Math.max(...groups.flatMap((g) => g.series.map((s) => s.value)), 1);
  const legend = groups[0]?.series.map((s) => ({ name: s.name, color: s.color })) ?? [];

  return (
    <div className="zynix-card h-full">
      <div className="zynix-card-header flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-[15px] font-semibold" style={{ color: 'var(--z-text)' }}>
            {title}
          </h3>
          {subtitle ? (
            <p className="mt-0.5 text-xs" style={{ color: 'var(--z-text-muted)' }}>
              {subtitle}
            </p>
          ) : null}
        </div>
        {legend.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {legend.map((item) => (
              <span key={item.name} className="inline-flex items-center gap-1.5 text-xs" style={{ color: 'var(--z-text-muted)' }}>
                <span className="h-2.5 w-2.5 rounded-sm" style={{ background: item.color }} />
                {item.name}
              </span>
            ))}
          </div>
        ) : null}
      </div>
      <div className="zynix-card-body space-y-5">
        {groups.length === 0 ? (
          <p className="py-8 text-center text-sm" style={{ color: 'var(--z-text-muted)' }}>
            No newsletter data to chart yet.
          </p>
        ) : (
          groups.map((group) => (
            <div key={group.label}>
              <p className="mb-2 text-sm font-medium" style={{ color: 'var(--z-text)' }} title={group.label}>
                {truncate(group.label)}
              </p>
              <div className="flex h-16 items-end gap-2">
                {group.series.map((series) => {
                  const heightPct = Math.max((series.value / max) * 100, series.value > 0 ? 8 : 0);
                  return (
                    <div key={series.name} className="flex min-w-0 flex-1 flex-col items-center gap-1">
                      <span className="text-[11px] font-semibold tabular-nums" style={{ color: 'var(--z-text)' }}>
                        {series.value}
                      </span>
                      <div className="flex w-full flex-1 items-end">
                        <div
                          className="w-full rounded-t-md transition-all duration-700"
                          style={{ height: `${heightPct}%`, backgroundColor: series.color, minHeight: series.value > 0 ? '6px' : '0' }}
                          title={`${series.name}: ${series.value}`}
                        />
                      </div>
                      <span className="text-[10px]" style={{ color: 'var(--z-text-muted)' }}>
                        {series.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
