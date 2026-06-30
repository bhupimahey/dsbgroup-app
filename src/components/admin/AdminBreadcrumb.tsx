'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LABELS: Record<string, string> = {
  admin: 'Dashboard',
  pages: 'Pages',
  blog: 'Blog',
  articles: 'Articles',
  posts: 'Blog',
  categories: 'Blog categories',
  'service-categories': 'Service areas',
  team: 'Team',
  faq: 'FAQ',
  offices: 'Offices',
  newsletters: 'Newsletters',
  subscribers: 'Subscribers',
  users: 'Client accounts',
  staff: 'Staff',
  leads: 'Leads',
  analytics: 'Analytics',
  new: 'Create',
  edit: 'Edit',
};

function crumbsFromPath(pathname: string) {
  const parts = pathname.split('/').filter(Boolean);
  const items: { href: string; label: string }[] = [{ href: '/admin', label: 'Dashboard' }];

  if (parts.length <= 1) return items;

  let path = '';
  for (let i = 0; i < parts.length; i++) {
    path += `/${parts[i]}`;
    if (parts[i] === 'admin' && i === 0) continue;
    const label = LABELS[parts[i]] ?? parts[i].charAt(0).toUpperCase() + parts[i].slice(1);
    items.push({ href: path, label });
  }

  return items;
}

function pageTitle(pathname: string) {
  if (pathname === '/admin') return 'Dashboard';
  const parts = pathname.split('/').filter(Boolean);
  const last = parts[parts.length - 1];
  if (last === 'new') return `New ${LABELS[parts[parts.length - 2]] ?? 'Item'}`;
  if (last === 'edit') return `Edit ${LABELS[parts[parts.length - 2]] ?? 'Item'}`;
  return LABELS[last] ?? last.charAt(0).toUpperCase() + last.slice(1);
}

export default function AdminBreadcrumb() {
  const pathname = usePathname();
  const crumbs = crumbsFromPath(pathname);
  const title = pageTitle(pathname);

  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="zynix-page-title">{title}</h1>

      <nav aria-label="Breadcrumb" className="zynix-breadcrumb">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <span key={crumb.href + crumb.label} className="inline-flex items-center gap-1.5">
              {index > 0 ? (
                <svg className="h-3 w-3 opacity-50" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              ) : null}
              {isLast ? (
                <span className="active">{crumb.label}</span>
              ) : (
                <Link href={crumb.href}>{crumb.label}</Link>
              )}
            </span>
          );
        })}
      </nav>
    </div>
  );
}
