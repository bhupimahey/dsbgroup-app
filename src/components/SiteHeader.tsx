'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import DsbLogo from '@/components/brand/DsbLogo';
import {
  isNavHrefActive,
  isNavItemActive,
  MAIN_NAV,
  SITE_CONTACT,
  type NavItem,
} from '@/lib/site/nav-links';

const SOCIAL_LINKS = [
  {
    label: 'Facebook',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
        <path
          fill="currentColor"
          d="M13.5 8.5V6.9c0-.8.5-.9.8-.9h1.6V3h-2.2C11.1 3 10.5 5 10.5 6.4v2.1H9v2.8h1.5V21h3V11.3h2l.3-2.8h-2.3z"
        />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
        <path
          fill="currentColor"
          d="M6.5 8.5A1.75 1.75 0 1 1 6.5 5a1.75 1.75 0 0 1 0 3.5zM5 9.8h3V19H5V9.8zm4.8 0h2.8v1.3h.1c.4-.8 1.4-1.6 2.8-1.6 3 0 3.5 1.9 3.5 4.4V19h-3v-4.3c0-1 0-2.3-1.4-2.3s-1.6 1.1-1.6 2.2V19h-3V9.8z"
        />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
        <path
          fill="currentColor"
          d="M21 8.4a2.5 2.5 0 0 0-1.8-1.8C17.7 6.2 12 6.2 12 6.2s-5.7 0-7.2.4A2.5 2.5 0 0 0 3 8.4 26 26 0 0 0 2.6 12c0 1.3.1 2.6.4 3.6a2.5 2.5 0 0 0 1.8 1.8c1.5.4 7.2.4 7.2.4s5.7 0 7.2-.4a2.5 2.5 0 0 0 1.8-1.8c.3-1 .4-2.3.4-3.6s-.1-2.6-.4-3.6zM10.2 14.8V9.2L15 12l-4.8 2.8z"
        />
      </svg>
    ),
  },
] as const;

function navLinkClass(pathname: string, href: string, base = 'theme-main-nav-link') {
  return isNavHrefActive(pathname, href)
    ? `${base} theme-main-nav-link--active`
    : base;
}

function navButtonClass(pathname: string, item: NavItem) {
  return isNavItemActive(pathname, item)
    ? 'theme-main-nav-button theme-main-nav-button--active'
    : 'theme-main-nav-button';
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="theme-header theme-shell">
      <div className="theme-topbar">
        <div className="theme-topbar-inner">
          <div className="theme-topbar-links">
            <a href={SITE_CONTACT.phoneHref}>{SITE_CONTACT.phone}</a>
            <a href={SITE_CONTACT.emailHref}>{SITE_CONTACT.email}</a>
          </div>
          <div className="theme-header-social" aria-label="Social Links">
            {SOCIAL_LINKS.map((social) => (
              <a key={social.label} href={social.href} aria-label={social.label}>
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="theme-header-inner">
        <DsbLogo href="/" height={44} priority onDark />

        <ul className="theme-main-nav" aria-label="Main Navigation">
          {MAIN_NAV.map((item) =>
            'children' in item && item.children ? (
              <li className="theme-main-nav-item" key={item.label}>
                <button className={navButtonClass(pathname, item)} type="button">
                  {item.label} <span aria-hidden>▾</span>
                </button>
                <div className="theme-submenu">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={
                        isNavHrefActive(pathname, child.href) ? 'theme-submenu-link--active' : undefined
                      }
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </li>
            ) : (
              <li key={item.href}>
                <Link className={navLinkClass(pathname, item.href!)} href={item.href!}>
                  {item.label}
                </Link>
              </li>
            ),
          )}
        </ul>

        <button
          type="button"
          className="theme-mobile-toggle"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-panel"
        >
          <span className="sr-only">{mobileOpen ? 'Close Menu' : 'Open Menu'}</span>
          ☰
        </button>

        <div className="theme-mobile-panel" id="mobile-nav-panel" data-open={mobileOpen}>
          {MAIN_NAV.map((item) =>
            'children' in item && item.children ? (
              <details key={item.label} open={isNavItemActive(pathname, item)}>
                <summary className={isNavItemActive(pathname, item) ? 'theme-mobile-active' : undefined}>
                  {item.label}
                </summary>
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className={isNavHrefActive(pathname, child.href) ? 'theme-mobile-active' : undefined}
                    onClick={() => setMobileOpen(false)}
                  >
                    {child.label}
                  </Link>
                ))}
              </details>
            ) : (
              <Link
                key={item.href}
                href={item.href!}
                className={isNavHrefActive(pathname, item.href!) ? 'theme-mobile-active' : undefined}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ),
          )}
        </div>
      </div>
    </header>
  );
}
