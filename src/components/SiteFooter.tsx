import Link from 'next/link';
import DsbLogo from '@/components/brand/DsbLogo';
import HomeCtaSubscribe from '@/components/home/HomeCtaSubscribe';
import SiteSocialLinks from '@/components/site/SiteSocialLinks';
import { getHomePageContent } from '@/lib/db/public-data';
import {
  FOOTER_SERVICE_LINKS,
  FOOTER_USEFUL_LINKS,
  HEAD_OFFICE,
  SITE_CONTACT,
} from '@/lib/site/nav-links';

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="theme-footer-contact-icon" aria-hidden>
      <path
        fill="currentColor"
        d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5L4 8V6l8 5 8-5v2z"
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="theme-footer-contact-icon theme-footer-contact-icon--pin" aria-hidden>
      <path
        fill="currentColor"
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="theme-footer-contact-icon" aria-hidden>
      <path
        fill="currentColor"
        d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.3 21 3 13.7 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"
      />
    </svg>
  );
}

export default async function SiteFooter() {
  const content = await getHomePageContent();

  return (
    <footer className="theme-footer-home theme-shell">
      <section className="theme-footer-cta">
        <div className="theme-footer-cta-inner">
          <div>
            <h2 className="theme-footer-cta-heading">{content.ctaHeading}</h2>
            <p className="theme-footer-cta-text">{content.ctaText}</p>
          </div>
          <div>
            <HomeCtaSubscribe />
          </div>
        </div>
      </section>

      <div className="theme-footer-home-main">
        <div className="theme-footer-home-inner">
          <div className="theme-footer-home-grid">
            <div>
              <DsbLogo href="/" height={42} onDark />
              <p className="theme-footer-home-about">
                Full-service legal and regulatory advisory for businesses, NBFCs, and institutions
                across India.
              </p>
              <SiteSocialLinks className="theme-footer-home-social" />
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
                  <li key={`${link.href}-${link.label}`}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3>Contact Us</h3>
              <div className="theme-footer-contact-item">
                <EmailIcon />
                <a href={SITE_CONTACT.emailHref}>{SITE_CONTACT.email}</a>
              </div>
              <div className="theme-footer-contact-item">
                <PinIcon />
                <span>
                  {HEAD_OFFICE.line1}
                  <br />
                  {HEAD_OFFICE.line2}
                </span>
              </div>
              <div className="theme-footer-contact-item">
                <PhoneIcon />
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
