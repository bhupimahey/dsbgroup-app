import Image from 'next/image';
import Link from 'next/link';
import ContactFaq from '@/components/contact/ContactFaq';
import ServiceMoreCards from '@/components/services/ServiceMoreCards';
import ServiceSidebarRight from '@/components/services/ServiceSidebarRight';
import type { ServiceDetailJson } from '@/lib/site/service-page-json';
import { DEFAULT_SERVICE_DETAIL_IMAGE } from '@/lib/site/service-page-json';
import { SITE_CONTACT } from '@/lib/site/nav-links';

type ServiceItem = {
  slug: string;
  name: string;
};

type MoreService = ServiceItem & {
  teaser: string;
  imagePath?: string | null;
};

type Props = {
  title: string;
  heroTitle: string;
  imagePath?: string | null;
  content: ServiceDetailJson;
  services: ServiceItem[];
  moreServices: MoreService[];
  activeSlug: string;
};

export default function ServiceDetailContent({
  title,
  heroTitle,
  imagePath,
  content,
  services,
  moreServices,
  activeSlug,
}: Props) {
  const heroImage = imagePath?.trim() || DEFAULT_SERVICE_DETAIL_IMAGE;

  return (
    <div className="services-page theme-shell">
      <section className="services-hero">
        <div className="services-container">
          <h1>{heroTitle}</h1>
          <p className="services-breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden>›</span>
            <Link href="/services">Services</Link>
            <span aria-hidden>›</span>
            <span>{title}</span>
          </p>
        </div>
      </section>

      <section className="services-section">
        <div className="services-container">
          <div className="services-detail-grid">
            <article>
              <div className="services-detail-main-image">
                <Image src={heroImage} alt="" fill className="object-cover" sizes="(max-width: 991px) 100vw, 760px" unoptimized />
              </div>

              <h1 className="services-detail-title">{title}</h1>
              {content.introParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="services-body-text">
                  {paragraph}
                </p>
              ))}

              <div className="services-divider" />

              <h2 className="services-subheading">{content.secondaryHeading}</h2>
              <p className="services-body-text">{content.secondaryParagraph}</p>

              <div className="services-approach-grid">
                {content.approachCards.map((card, index) => (
                  <div key={card.title} className="services-approach-card">
                    <div className="services-approach-icon">
                      <Image
                        src={
                          index === 0
                            ? '/images/theme/services/icons/stragig1.svg'
                            : '/images/theme/services/icons/approach1.svg'
                        }
                        alt=""
                        width={32}
                        height={32}
                        unoptimized
                      />
                    </div>
                    <h3 className="services-approach-title">
                      {card.href ? <Link href={card.href}>{card.title}</Link> : card.title}
                    </h3>
                    <p className="services-approach-text">{card.description}</p>
                  </div>
                ))}
              </div>

              <div className="services-divider" />

              <h2 className="services-subheading">{content.benefitsHeading}</h2>
              <p className="services-body-text">{content.benefitsIntro}</p>

              <div className="services-benefits-grid">
                {content.benefitBullets.map((item) => (
                  <div key={item} className="services-benefit-item">
                    <span>
                      <Image src="/images/theme/services/icons/check1.png" alt="" width={10} height={10} unoptimized />
                    </span>
                    {item}
                  </div>
                ))}
              </div>

              <p className="services-body-text">{content.benefitsClosing}</p>
            </article>

            <ServiceSidebarRight services={services} activeSlug={activeSlug} content={content} />
          </div>
        </div>
      </section>

      {moreServices.length > 0 ? <ServiceMoreCards services={moreServices} /> : null}

      <section className="services-faq-section">
        <div className="services-container">
          <ContactFaq />
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
