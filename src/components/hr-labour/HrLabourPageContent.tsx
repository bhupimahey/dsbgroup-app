import Link from 'next/link';
import type { HrLabourPageJson } from '@/lib/site/hr-labour-page-json';
import { SITE_CONTACT } from '@/lib/site/nav-links';

type Props = {
  content: HrLabourPageJson;
};

export default function HrLabourPageContent({ content }: Props) {
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
            <p key={paragraph.slice(0, 48)} className="services-body-text">
              {paragraph}
            </p>
          ))}

          <div className="services-divider" />

          <h2 className="services-subheading">{content.servicesHeading}</h2>
          <div className="services-approach-grid">
            {content.servicesItems.map((item) => (
              <div key={item.title} className="services-approach-card">
                <h3 className="services-approach-title">{item.title}</h3>
                <p className="services-approach-text">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="services-divider" />

          <p className="services-body-text">{content.closingParagraph}</p>
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
