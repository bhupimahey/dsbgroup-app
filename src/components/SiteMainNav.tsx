'use client';

import Link from 'next/link';
import { useState } from 'react';
import { MAIN_NAV, type NavItem } from '@/lib/site/nav-links';

function NavDropdown({ item }: { item: NavItem & { children: { href: string; label: string }[] } }) {
  return (
    <div className="group relative">
      <button
        type="button"
        className="inline-flex items-center gap-1 py-2 text-sm font-medium text-white/90 transition hover:text-[var(--dsb-gold)]"
        aria-haspopup="true"
      >
        {item.label}
        <svg className="h-3.5 w-3.5 opacity-70" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </button>
      <div className="invisible absolute left-0 top-full z-50 min-w-[220px] translate-y-1 rounded-md border border-white/10 bg-[#0a2444] py-2 opacity-0 shadow-lg transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
        {item.children.map((child) => (
          <Link
            key={child.href}
            href={child.href}
            className="block px-4 py-2 text-sm text-white/90 hover:bg-white/10 hover:text-[var(--dsb-gold)]"
          >
            {child.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function MobileNavItem({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  if ('children' in item && item.children) {
    return (
      <div className="border-b border-white/10 py-2">
        <p className="px-2 text-xs font-semibold uppercase tracking-wider text-[var(--dsb-gold)]">{item.label}</p>
        <ul className="mt-1 space-y-1">
          {item.children.map((child) => (
            <li key={child.href}>
              <Link
                href={child.href}
                onClick={onNavigate}
                className="block rounded px-2 py-2 text-sm text-white/90 hover:bg-white/10"
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <Link
      href={item.href!}
      onClick={onNavigate}
      className="block border-b border-white/10 px-2 py-3 text-sm font-medium text-white/90 hover:bg-white/10"
    >
      {item.label}
    </Link>
  );
}

export default function SiteMainNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="hidden items-center gap-x-5 lg:flex" aria-label="Main">
        {MAIN_NAV.map((item) =>
          'children' in item && item.children ? (
            <NavDropdown key={item.label} item={item as NavItem & { children: { href: string; label: string }[] }} />
          ) : (
            <Link
              key={item.href}
              href={item.href!}
              className="py-2 text-sm font-medium text-white/90 transition hover:text-[var(--dsb-gold)]"
            >
              {item.label}
            </Link>
          ),
        )}
      </nav>

      <button
        type="button"
        className="inline-flex items-center justify-center rounded-md border border-white/20 p-2 text-white lg:hidden"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
        {open ? (
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        )}
      </button>

      {open ? (
        <div id="mobile-nav" className="absolute left-0 right-0 top-full z-50 border-t border-white/10 bg-[#05162e] px-4 py-3 shadow-lg lg:hidden">
          {MAIN_NAV.map((item) => (
            <MobileNavItem key={'children' in item ? item.label : item.href} item={item} onNavigate={() => setOpen(false)} />
          ))}
        </div>
      ) : null}
    </>
  );
}
