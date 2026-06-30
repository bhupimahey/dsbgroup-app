import Link from 'next/link';

type Props = {
  name: string;
};

export default function AdminDashboardHero({ name }: Props) {
  return (
    <section className="zynix-card overflow-hidden">
      <div
        className="zynix-card-body relative"
        style={{
          background:
            'linear-gradient(135deg, rgba(5,22,46,0.04) 0%, rgba(197,160,89,0.06) 45%, rgba(255,255,255,1) 100%)',
        }}
      >
        <div
          className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, var(--z-accent) 0%, transparent 70%)' }}
          aria-hidden
        />
        <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--z-accent-dark)' }}>
              Welcome back
            </p>
            <h2 className="mt-1 text-2xl font-bold sm:text-[1.65rem]" style={{ color: 'var(--z-text)' }}>
              {name}
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed" style={{ color: 'var(--z-text-muted)' }}>
              Review your CMS stats, manage content modules, and monitor leads from your DSB Law
              admin dashboard.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 lg:flex-col">
            <Link href="/admin/pages/new" className="zynix-btn-primary">
              + New Page
            </Link>
            <Link href="/admin/posts/new" className="zynix-btn-light">
              + New Post
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
