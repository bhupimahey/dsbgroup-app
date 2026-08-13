import Image from 'next/image';
import Link from 'next/link';
import { SERVICE_CARD_IMAGES } from '@/lib/site/service-page-json';

type ServiceCard = {
  slug: string;
  name: string;
  teaser: string;
  imagePath?: string | null;
};

type Props = {
  services: ServiceCard[];
};

export default function ServiceMoreCards({ services }: Props) {
  return (
    <section className="services-more-section">
      <div className="services-container">
        <h2 className="services-more-heading">View Our More Services</h2>
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
  );
}
