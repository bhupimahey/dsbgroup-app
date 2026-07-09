'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState, useTransition } from 'react';
import AdminProfileMenu from '@/components/admin/AdminProfileMenu';
import { AdminSearchIcon, AdminSpinner } from '@/components/admin/ui/AdminIcons';

type Props = {
  email?: string | null;
  name?: string | null;
  onMenuClick: () => void;
  onToggleCollapse: () => void;
  collapsed: boolean;
};

function resolveSearchRoute(q: string): string {
  if (q.includes('page')) return '/admin/pages';
  if (q.includes('article')) return '/admin/articles';
  if (q.includes('blog') || q.includes('post')) return '/admin/blog';
  if (q.includes('service')) return '/admin/service-categories';
  if (q.includes('lead')) return '/admin/leads';
  if (q.includes('newsletter')) return '/admin/newsletters';
  if (q.includes('team')) return '/admin/team';
  if (q.includes('faq')) return '/admin/faq';
  if (q.includes('testimonial')) return '/admin/testimonials';
  if (q.includes('office')) return '/admin/offices';
  if (q.includes('subscriber')) return '/admin/subscribers';
  if (q.includes('staff')) return '/admin/staff';
  if (q.includes('user') || q.includes('client')) return '/admin/users';
  if (q.includes('analytics') || q.includes('report')) return '/admin/analytics';
  return '/admin/pages';
}

export default function AdminTopbar({
  email,
  name,
  onMenuClick,
  onToggleCollapse,
  collapsed,
}: Props) {
  const displayName = name?.trim() || email || 'Staff user';
  const router = useRouter();
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [typing, setTyping] = useState(false);
  const [isPending, startTransition] = useTransition();
  const notifyRef = useRef<HTMLDivElement>(null);
  const typingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (notifyRef.current && !notifyRef.current.contains(e.target as Node)) setNotifyOpen(false);
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  useEffect(() => {
    for (const route of ['/admin/pages', '/admin/posts', '/admin/team', '/admin/newsletters']) {
      router.prefetch(route);
    }
  }, [router]);

  useEffect(() => {
    return () => {
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    };
  }, []);

  function handleSidebarToggle() {
    if (typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches) {
      onToggleCollapse();
    } else {
      onMenuClick();
    }
  }

  function runSearch() {
    const q = search.trim().toLowerCase();
    if (!q) return;
    const href = resolveSearchRoute(q);
    startTransition(() => router.push(href));
  }

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    runSearch();
  }

  function handleSearchChange(value: string) {
    setSearch(value);
    setTyping(true);
    const q = value.trim().toLowerCase();
    if (q) router.prefetch(resolveSearchRoute(q));
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    typingTimerRef.current = setTimeout(() => setTyping(false), 450);
  }

  const searching = typing || isPending;

  return (
    <header
      className="sticky top-0 z-30 h-[var(--z-header-height)] border-b bg-white"
      style={{ borderColor: 'var(--z-border)', boxShadow: 'var(--z-shadow)' }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[3px]"
        style={{ background: 'linear-gradient(90deg, var(--z-accent), var(--z-primary))' }}
        aria-hidden
      />
      <div className="flex h-full items-center gap-2 px-3 sm:gap-3 sm:px-5 lg:px-6">
        <button
          type="button"
          onClick={handleSidebarToggle}
          className="zynix-header-icon shrink-0"
          aria-label={collapsed ? 'Expand sidebar' : 'Toggle navigation menu'}
        >
          <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <form
          onSubmit={handleSearchSubmit}
          className="relative hidden min-w-0 flex-1 items-center gap-2 md:flex md:max-w-md lg:max-w-lg xl:max-w-xl"
        >
          <div className="relative min-w-0 flex-1">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--z-text-muted)' }}>
              <AdminSearchIcon className="h-4 w-4" />
            </span>
            <input
              type="search"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search pages, posts, leads…"
              className="zynix-search"
              aria-busy={searching}
            />
            {searching ? (
              <span
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
                role="status"
                aria-live="polite"
                aria-label="Searching"
              >
                <AdminSpinner className="h-4 w-4 text-[var(--z-accent)]" />
              </span>
            ) : null}
          </div>
          <button
            type="submit"
            className="zynix-search-btn shrink-0"
            disabled={!search.trim() || isPending}
            aria-label="Search admin"
          >
            {isPending ? <AdminSpinner className="h-4 w-4" /> : <AdminSearchIcon className="h-4 w-4" />}
            <span className="hidden lg:inline">Search</span>
          </button>
        </form>

        <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="zynix-header-icon"
            aria-label="View public site"
            title="View public site"
          >
            <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4M14 4h6m0 0v6m0-6L10 14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </Link>

          <div ref={notifyRef} className="relative">
            <button
              type="button"
              onClick={() => setNotifyOpen((v) => !v)}
              className="zynix-header-icon relative"
              aria-label="Notifications"
              aria-expanded={notifyOpen}
            >
              <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2c0 .5-.2 1-.6 1.4L4 17h5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            {notifyOpen ? (
              <div
                className="absolute right-0 z-50 mt-2 w-56 rounded-lg border bg-white py-2 shadow-lg"
                style={{ borderColor: 'var(--z-border)' }}
              >
                <p className="px-3 py-2 text-xs" style={{ color: 'var(--z-text-muted)' }}>
                  No new notifications
                </p>
                <Link
                  href="/admin/leads"
                  className="block px-3 py-2 text-sm transition hover:bg-[#f9fafb]"
                  style={{ color: 'var(--z-text)' }}
                  onClick={() => setNotifyOpen(false)}
                >
                  View contact leads →
                </Link>
              </div>
            ) : null}
          </div>

          <Link
            href="/admin/analytics"
            className="zynix-header-icon hidden sm:inline-flex"
            aria-label="Analytics"
            title="Analytics"
          >
            <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M4 19V5M4 19h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M8 16V11M12 16V7M16 16v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </Link>

          <AdminProfileMenu name={displayName} email={email} />
        </div>
      </div>
    </header>
  );
}
