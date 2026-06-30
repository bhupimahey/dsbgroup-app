import Link from 'next/link';

export type ActivityItem = {
  id: string;
  title: string;
  meta: string;
  href: string;
  type: 'lead' | 'post' | 'page' | 'newsletter';
  time: Date;
};

const TYPE_STYLES = {
  lead: { bg: 'rgba(197, 160, 89, 0.15)', color: 'var(--z-accent-dark)', label: 'Lead' },
  post: { bg: 'rgba(5, 22, 46, 0.08)', color: 'var(--z-primary)', label: 'Post' },
  page: { bg: 'rgba(197, 160, 89, 0.12)', color: 'var(--z-accent-dark)', label: 'Page' },
  newsletter: { bg: 'rgba(38, 191, 148, 0.12)', color: 'var(--z-success)', label: 'Newsletter' },
};

function timeAgo(date: Date) {
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

type Props = {
  items: ActivityItem[];
};

export default function AdminRecentFeed({ items }: Props) {
  return (
    <div className="zynix-card h-full">
      <div className="zynix-card-header flex items-center justify-between gap-3">
        <div>
          <h3 className="text-[15px] font-semibold" style={{ color: 'var(--z-text)' }}>
            Recent Activity
          </h3>
          <p className="mt-0.5 text-xs" style={{ color: 'var(--z-text-muted)' }}>
            Latest CMS updates
          </p>
        </div>
        <Link href="/admin/leads" className="text-xs font-semibold" style={{ color: 'var(--z-accent-dark)' }}>
          View all
        </Link>
      </div>

      <div className="zynix-card-body">
        {items.length === 0 ? (
          <div
            className="rounded-lg border border-dashed py-10 text-center text-sm"
            style={{ borderColor: 'var(--z-border)', color: 'var(--z-text-muted)' }}
          >
            No recent activity yet.
          </div>
        ) : (
          <ul>
            {items.map((item) => {
              const style = TYPE_STYLES[item.type];
              return (
                <li key={item.id} className="border-b last:border-0" style={{ borderColor: 'var(--z-border)' }}>
                  <Link
                    href={item.href}
                    className="group flex items-start gap-3 py-3 transition hover:bg-[#fafbfc] -mx-2 px-2 rounded-lg"
                  >
                    <span
                      className="mt-0.5 shrink-0 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase"
                      style={{ background: style.bg, color: style.color }}
                    >
                      {style.label}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold group-hover:text-[var(--z-accent-dark)]" style={{ color: 'var(--z-text)' }}>
                        {item.title}
                      </p>
                      <p className="mt-0.5 truncate text-xs" style={{ color: 'var(--z-text-muted)' }}>
                        {item.meta}
                      </p>
                    </div>
                    <span className="shrink-0 text-xs" style={{ color: 'var(--z-text-muted)' }}>
                      {timeAgo(item.time)}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
