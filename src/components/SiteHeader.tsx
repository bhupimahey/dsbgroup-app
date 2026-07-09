'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, type ReactNode } from 'react';
import DsbLogo from '@/components/brand/DsbLogo';
import {
  isNavHrefActive,
  isNavItemActive,
  MAIN_NAV,
  OFFICE_LOCATIONS,
  SITE_CONTACT,
  type NavItem,
} from '@/lib/site/nav-links';
import { SITE_SOCIAL_LINKS } from '@/lib/site/social-links';

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="theme-topbar-contact-icon" aria-hidden>
      <path
        fill="currentColor"
        d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.3 21 3 13.7 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"
      />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="theme-topbar-contact-icon" aria-hidden>
      <path
        fill="currentColor"
        d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5L4 8V6l8 5 8-5v2z"
      />
    </svg>
  );
}

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

export default function SiteHeader({ socialAuth }: { socialAuth?: ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="theme-header theme-shell">
      <div className="theme-topbar">
        <div className="theme-topbar-inner">
          <div className="theme-topbar-start">
            <div className="theme-topbar-contact">
              <a href={SITE_CONTACT.phoneHref} className="theme-topbar-contact-link">
                <PhoneIcon />
                {SITE_CONTACT.phone}
              </a>
              <a href={SITE_CONTACT.emailHref} className="theme-topbar-contact-link">
                <EmailIcon />
                {SITE_CONTACT.email}
              </a>
            </div>

            <div className="theme-topbar-locations" aria-label="Our locations">
              <span className="theme-locations-badge">Our Locations</span>
              <ul className="theme-locations-list">
                {OFFICE_LOCATIONS.map((city) => (
                  <li key={city}>{city}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="theme-header-social" aria-label="Social and account links">
            {SITE_SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="theme-header-social-link"
                aria-label={social.label}
                {...(social.href.startsWith('http')
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                {social.icon}
              </a>
            ))}
            {socialAuth}
          </div>
        </div>
      </div>

      <div className="theme-header-inner">
        <DsbLogo href="/" height={44} priority />

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
