import Link from 'next/link';
import type { NbfcPageJson } from '@/lib/site/nbfc-page-json';
import { SITE_CONTACT } from '@/lib/site/nav-links';

type Props = {
  content: NbfcPageJson;
};

export default function NbfcPageContent({ content }: Props) {
  return (
    <div className="services-page theme-shell">
      <section className="services-hero">
        <div className="services-container">
          <h1>{content.heroTitle}</h1>
          <p className="services-breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden>›</span>
            <span>{content.heroTitle}</span>
          </p>
        </div>
      </section>

      <section className="services-section">
        <div className="services-container">
          <h2 className="services-index-heading">{content.introHeading}</h2>
          {content.introParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="services-body-text">
              {paragraph}
            </p>
          ))}

          <div className="services-divider" />

          <h2 className="services-subheading">{content.servicesHeading}</h2>
          {content.servicesIntro ? (
            <p className="services-body-text">{content.servicesIntro}</p>
          ) : null}

          <div className="services-benefits-grid">
            {content.servicesBullets.map((item) => (
              <div key={item} className="services-benefit-item">
                <span aria-hidden>•</span>
                {item}
              </div>
            ))}
          </div>

          <div className="services-divider" />

          <h2 className="services-subheading">{content.closingHeading}</h2>
          {content.closingParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="services-body-text">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="services-cta-section">
        <div className="services-container">
          <div className="services-cta-grid">
            <div>
              <h2 className="services-cta-title">{content.ctaHeading}</h2>
              <p className="services-cta-text">{content.ctaText}</p>
            </div>
            <div className="services-cta-actions">
              <Link href={SITE_CONTACT.phoneHref} className="services-btn services-btn--light">
                Get Law Advice <span aria-hidden>→</span>
              </Link>
              <Link href="/contact" className="services-btn">
                Contact Us <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
