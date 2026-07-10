import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ServiceSidebar from '@/components/services/ServiceSidebar';
import ThemePageHero from '@/components/theme/ThemePageHero';
import { getPublishedPageBySlug } from '@/lib/cms/cache';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getPublishedPageBySlug(slug);
  if (!page) return {};
  return {
    title: page.metaTitle ?? page.title,
    description: page.metaDescription ?? undefined,
  };
}

export default async function CmsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [page, services, serviceMatch] = await Promise.all([
    getPublishedPageBySlug(slug),
    prisma.serviceCategory.findMany({
      where: { active: true },
      orderBy: { sortOrder: 'asc' },
    }),
    prisma.serviceCategory.findUnique({ where: { slug } }),
  ]);

  if (!page) notFound();

  const isServicePage = Boolean(serviceMatch);

  if (!isServicePage) {
    return (
      <div className="theme-shell">
        <ThemePageHero title={page.title} breadcrumbs={[{ label: page.title }]} />
        <article className="theme-content-wrap">
          {page.imagePath ? (
            <div className="relative mb-8 aspect-[21/9] w-full overflow-hidden rounded-xl">
              <Image
                src={page.imagePath}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1140px"
                unoptimized
              />
            </div>
          ) : null}
          <div
            className="cms-html prose prose-slate max-w-none"
            dangerouslySetInnerHTML={{ __html: page.body }}
          />
        </article>
      </div>
    );
  }

  const otherServices = services.filter((service) => service.slug !== slug).slice(0, 4);

  return (
    <div className="theme-shell">
      <ThemePageHero
        title={page.title}
        breadcrumbs={[
          { label: 'Our Services', href: '/services' },
          { label: page.title },
        ]}
      />

      <section className="theme-inner-section">
        <div className="theme-inner-container theme-inner-grid-main-sidebar">
          <article className="serviceright-main">
            {page.imagePath ? (
              <div className="serviceright-main-image">
                <Image
                  src={page.imagePath}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 991px) 100vw, 760px"
                  unoptimized
                />
              </div>
            ) : null}
            <h1>{page.title}</h1>
            <div
              className="cms-html"
              dangerouslySetInnerHTML={{ __html: page.body }}
            />
          </article>

          <div>
            <ServiceSidebar services={services} activeSlug={slug} />
          </div>
        </div>
      </section>

      {otherServices.length > 0 ? (
        <section className="theme-inner-section" style={{ paddingTop: 0 }}>
          <div className="theme-inner-container">
            <h2 className="theme-inner-title">View Our More Services</h2>
            <div className="theme-inner-grid-2">
              {otherServices.map((service, index) => (
                <article key={service.id} className="servicev2-card">
                  <div className="servicev2-card-grid">
                    <div>
                      <h2>
                        <Link href={`/pages/${service.slug}`}>{service.name}</Link>
                      </h2>
                      <p>
                        Explore our {service.name.toLowerCase()} advisory and compliance support.
                      </p>
                      <Link href={`/pages/${service.slug}`} className="servicev2-card-link">
                        Learn More <span aria-hidden>→</span>
                      </Link>
                    </div>
                    <div className="servicev2-card-image">
                      <Image
                        src={`/images/theme/index2/sections/about${(index % 3) + 3}-img.png`}
                        alt=""
                        fill
                        sizes="150px"
                        unoptimized
                      />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
