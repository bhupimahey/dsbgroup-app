import Image from 'next/image';
import Link from 'next/link';
import ServiceQuoteForm from '@/components/services/ServiceQuoteForm';
import type { ServiceDetailJson } from '@/lib/site/service-page-json';
import { SITE_CONTACT } from '@/lib/site/nav-links';

type ServiceItem = {
  slug: string;
  name: string;
};

type Props = {
  services: ServiceItem[];
  activeSlug: string;
  content: ServiceDetailJson;
};

export default function ServiceSidebarRight({ services, activeSlug, content }: Props) {
  return (
    <aside>
      <div className="services-sidebar-panel">
        <h2>Our Services</h2>
        {services.map((service) => (
          <Link
            key={service.slug}
            href={`/pages/${service.slug}`}
            className={`services-sidebar-link${activeSlug === service.slug ? ' is-active' : ''}`}
          >
            {service.name}
            <span aria-hidden>›</span>
          </Link>
        ))}
      </div>

      <div className="services-sidebar-panel">
        <h2>Download Brochure</h2>
        <p className="services-body-text">{content.brochureText ?? 'Download our service overview for more details.'}</p>
        {content.brochurePdfUrl ? (
          <a href={content.brochurePdfUrl} className="services-brochure-btn" target="_blank" rel="noreferrer">
            <Image src="/images/theme/services/icons/doc2.svg" alt="" width={18} height={18} unoptimized />
            PDF Download
          </a>
        ) : null}
        {content.brochureDocUrl ? (
          <a href={content.brochureDocUrl} className="services-brochure-btn services-brochure-btn--light" target="_blank" rel="noreferrer">
            <Image src="/images/theme/services/icons/doc1.svg" alt="" width={18} height={18} unoptimized />
            Doc Download
          </a>
        ) : null}
      </div>

      <div className="services-sidebar-panel">
        <h2>If You Need Any Help Contact With Us</h2>
        <a href={SITE_CONTACT.phoneHref} className="services-sidebar-phone">
          <Image src="/images/theme/services/icons/phone9.svg" alt="" width={20} height={20} unoptimized />
          {SITE_CONTACT.phone}
        </a>
      </div>

      <div className="services-sidebar-panel">
        <h2>Get A Free Quote</h2>
        <ServiceQuoteForm />
      </div>
    </aside>
  );
}
