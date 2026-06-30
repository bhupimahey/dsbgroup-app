'use client';

import { useEffect, useState, type ReactNode } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminTopbar from '@/components/admin/AdminTopbar';
import AdminFooter from '@/components/admin/AdminFooter';
import AdminBreadcrumb from '@/components/admin/AdminBreadcrumb';

type Props = {
  children: ReactNode;
  user?: {
    email?: string | null;
    name?: string | null;
    role?: string | null;
  };
};

export default function AdminShell({ children, user }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const update = () => {
      setIsDesktop(mq.matches);
      if (!mq.matches) setSidebarOpen(false);
    };
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const effectiveCollapsed = isDesktop && sidebarCollapsed;

  return (
    <div className="admin-zynix min-h-screen">
      <AdminSidebar
        open={sidebarOpen}
        collapsed={effectiveCollapsed}
        onClose={() => setSidebarOpen(false)}
        isAdmin={user?.role === 'ADMIN'}
      />

      <div
        className={`flex min-h-screen flex-col transition-[margin] duration-300 ${
          effectiveCollapsed ? 'lg:ml-[var(--z-sidebar-collapsed)]' : 'lg:ml-[var(--z-sidebar-width)]'
        }`}
      >
        <AdminTopbar
          email={user?.email}
          name={user?.name}
          collapsed={effectiveCollapsed}
          onMenuClick={() => setSidebarOpen(true)}
          onToggleCollapse={() => setSidebarCollapsed((v) => !v)}
        />

        <main className="flex-1 p-3 sm:p-5 lg:p-6">
          <div className="mx-auto w-full max-w-[1400px]">
            <AdminBreadcrumb />
            {children}
          </div>
        </main>

        <AdminFooter />
      </div>
    </div>
  );
}
