'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import DsbLogo from '@/components/brand/DsbLogo';
import FooterSubscribeForm from '@/components/subscription/FooterSubscribeForm';
import {
  FOOTER_LINKS,
  FOOTER_SERVICE_LINKS,
  FOOTER_USEFUL_LINKS,
  HEAD_OFFICE,
  SITE_CONTACT,
} from '@/lib/site/nav-links';

const SOCIAL_LINKS = [
  { label: 'Facebook', href: '#', icon: 'f' },
  { label: 'LinkedIn', href: '#', icon: 'in' },
  { label: 'YouTube', href: '#', icon: '▶' },
] as const;

function FooterSocialLinks({ className }: { className?: string }) {
  return (
    <div className={className} aria-label="Social links">
      <ul>
        {SOCIAL_LINKS.map((social) => (
          <li key={social.label}>
            <a href={social.href} aria-label={social.label}>
              {social.icon}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function HomeFooter() {
  return (
    <footer className="theme-footer-home theme-shell">
      <div className="theme-footer-home-main">
        <div className="theme-footer-home-inner">
          <div className="theme-footer-home-grid">
            <div>
              <DsbLogo href="/" height={42} onDark />
              <p className="theme-footer-home-about">
                Full-service legal and regulatory advisory for businesses, NBFCs, and institutions
                across India.
              </p>
              <FooterSocialLinks className="theme-footer-home-social" />
            </div>

            <div>
              <h3>Our services</h3>
              <ul className="theme-footer-home-list">
                {FOOTER_SERVICE_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3>Useful Links</h3>
              <ul className="theme-footer-home-list">
                {FOOTER_USEFUL_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3>Contact Us</h3>
              <div className="theme-footer-contact-item">
                <span aria-hidden>✉</span>
                <a href={SITE_CONTACT.emailHref}>{SITE_CONTACT.email}</a>
              </div>
              <div className="theme-footer-contact-item">
                <span aria-hidden>📍</span>
                <span>
                  {HEAD_OFFICE.line1}
                  <br />
                  {HEAD_OFFICE.line2}
                </span>
              </div>
              <div className="theme-footer-contact-item">
                <span aria-hidden>☎</span>
                <a href={SITE_CONTACT.phoneHref}>{SITE_CONTACT.phone}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="theme-footer-home-copy">
        © Copyright {new Date().getFullYear()} DSB Law Group. All rights reserved.
      </div>
    </footer>
  );
}

function InnerFooter() {
  const quickLinks = FOOTER_LINKS.slice(0, 8);
  const policyLinks = FOOTER_LINKS.slice(8);

  return (
    <footer className="theme-footer theme-shell">
      <div className="theme-footer-main">
        <div className="theme-footer-inner">
          <div className="theme-footer-grid">
            <div>
              <DsbLogo href="/" height={42} onDark />
              <p className="mt-4 text-sm leading-6">
                Full-service legal and regulatory advisory for businesses, NBFCs, and institutions
                across India.
              </p>
              <FooterSocialLinks className="theme-footer-social mt-4" />
            </div>

            <div>
              <h3>About Link</h3>
              <div className="theme-footer-list">
                {quickLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3>Policies</h3>
              <div className="theme-footer-list">
                {policyLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="theme-footer-subscribe-box">
              <h3>Subscribe</h3>
              <p>
                Subscribe to receive legal updates, newsletter issues, and recent regulatory
                insights.
              </p>
              <FooterSubscribeForm variant="boxed" />
            </div>
          </div>
        </div>
      </div>
      <div className="theme-copyright">
        © Copyright {new Date().getFullYear()} DSB Law Group. All rights reserved.
      </div>
    </footer>
  );
}

export default function SiteFooter() {
  const pathname = usePathname();
  return pathname === '/' ? <HomeFooter /> : <InnerFooter />;
}
