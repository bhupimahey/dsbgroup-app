import Image from 'next/image';
import Link from 'next/link';
import type { ServicesIndexJson } from '@/lib/site/service-page-json';
import { SERVICE_CARD_IMAGES } from '@/lib/site/service-page-json';
import { SITE_CONTACT } from '@/lib/site/nav-links';

type ServiceCard = {
  slug: string;
  name: string;
  teaser: string;
  imagePath?: string | null;
};

type Props = {
  content: ServicesIndexJson;
  services: ServiceCard[];
};

export default function ServicesIndexContent({ content, services }: Props) {
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
          <h2 className="services-index-heading">{content.sectionHeading}</h2>
          <div className="services-card-grid">
            {services.map((service, index) => (
              <article key={service.slug} className="services-card">
                <div>
                  <h2>
                    <Link href={`/pages/${service.slug}`}>{service.name}</Link>
                  </h2>
                  {service.teaser ? <p>{service.teaser}</p> : null}
                  <Link href={`/pages/${service.slug}`} className="services-card-link">
                    Learn More <span aria-hidden>→</span>
                  </Link>
                </div>
                <div className="services-card-image">
                  <Image
                    src={service.imagePath || SERVICE_CARD_IMAGES[index % SERVICE_CARD_IMAGES.length]}
                    alt=""
                    fill
                    sizes="140px"
                    unoptimized
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="services-cta-section">
        <div className="services-container">
          <div className="services-cta-grid">
            <div>
              <h2 className="services-cta-title">Need professional assistance?</h2>
              <p className="services-cta-text">
                Connect with DSB Law Group to discuss your legal, regulatory, financial or business requirements.
              </p>
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
