import Link from 'next/link';
import Image from 'next/image';
import { getServiceCategories } from '@/lib/db/public-data';
import ThemePageHero from '@/components/theme/ThemePageHero';
import '@/styles/theme-inner-pages.css';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'Services' };

const SERVICE_IMAGES = [
  '/images/theme/index2/sections/about3-img.png',
  '/images/theme/index2/sections/about4-img.png',
  '/images/theme/index2/sections/about5-img.png',
  '/images/theme/index2/sections/company-img1.png',
  '/images/theme/index2/sections/welcome-img-2.png',
  '/images/theme/index2/sections/servicebg.png',
] as const;

export default async function ServicesPage() {
  const categories = await getServiceCategories();

  return (
    <div className="theme-shell">
      <ThemePageHero
        title="Our Services"
        breadcrumbs={[{ label: 'Our Services' }]}
      />

      <section className="theme-inner-section">
        <div className="theme-inner-container">
          <h2 className="theme-inner-title">
            A Wide Range Of Legal And Advisory Services To Help Businesses
          </h2>

          <div className="theme-inner-grid-2">
            {categories.map((cat, index) => (
              <article key={cat.id} className="servicev2-card">
                <div className="servicev2-card-grid">
                  <div>
                    <h2>
                      <Link href={`/pages/${cat.slug}`}>{cat.name}</Link>
                    </h2>
                    <p>
                      Expert guidance across {cat.name.toLowerCase()} — tailored advisory for
                      compliance, governance, and strategic decisions.
                    </p>
                    <Link href={`/pages/${cat.slug}`} className="servicev2-card-link">
                      Learn More <span aria-hidden>→</span>
                    </Link>
                  </div>
                  <div className="servicev2-card-image">
                    <Image
                      src={SERVICE_IMAGES[index % SERVICE_IMAGES.length]}
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
    </div>
  );
}
