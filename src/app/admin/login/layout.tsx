import DsbLogo from '@/components/brand/DsbLogo';

export default function AdminLoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="zynix-auth min-h-screen">
      <div className="zynix-auth-shell">
        <aside className="zynix-auth-brand">
          <div className="zynix-auth-brand-pattern" aria-hidden />
          <div className="relative max-w-md">
            <DsbLogo height={52} priority onDark />
            <h1 className="mt-8 text-3xl font-bold leading-tight">Admin Portal</h1>
            <p className="mt-4 text-base leading-relaxed text-white/80">
              Secure access to the CMS dashboard. Manage pages, posts, newsletters, team, and
              leads.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-white/75">
              <li className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: 'var(--z-accent)' }} />
                CMS dashboard & analytics
              </li>
              <li className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: 'var(--z-accent)' }} />
                Role-based staff access only
              </li>
              <li className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: 'var(--z-accent)' }} />
                Newsletter & subscriber tools
              </li>
            </ul>
          </div>
        </aside>

        <main className="zynix-auth-panel">{children}</main>
      </div>
    </div>
  );
}
