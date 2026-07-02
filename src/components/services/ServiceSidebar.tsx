import Link from 'next/link';

type ServiceItem = {
  slug: string;
  name: string;
};

type Props = {
  services: ServiceItem[];
  activeSlug?: string;
};

export default function ServiceSidebar({ services, activeSlug }: Props) {
  return (
    <>
      <aside className="theme-sidebar-panel">
        <h2>Our Services</h2>
        {services.map((service) => (
          <Link
            key={service.slug}
            href={`/pages/${service.slug}`}
            className={`theme-sidebar-link-row${activeSlug === service.slug ? ' is-active' : ''}`}
          >
            {service.name}
            <span aria-hidden>›</span>
          </Link>
        ))}
      </aside>

      <aside className="theme-sidebar-panel theme-sidebar-help">
        <h2>If You Need Any Help Contact With Us</h2>
        <a href="tel:+918727914446">☎ +91 87279-14446</a>
      </aside>
    </>
  );
}
