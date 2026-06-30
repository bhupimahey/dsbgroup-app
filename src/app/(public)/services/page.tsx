import Link from 'next/link';
import { prisma } from '@/lib/db';
import ThemePageHero from '@/components/theme/ThemePageHero';

export const revalidate = 60;

export const metadata = { title: 'Services' };

export default async function ServicesPage() {
  const categories = await prisma.serviceCategory.findMany({
    where: { active: true },
    orderBy: { sortOrder: 'asc' },
  });

  return (
    <div className="theme-shell">
      <ThemePageHero title="Our Services" currentLabel="Our Services" />
      <section className="theme-content-wrap">
        <h2 className="theme-section-title mb-8 text-center text-4xl font-semibold text-[var(--theme-navy)]">
          A Wide Range Of Services To Help Businesses
        </h2>
        <ul className="theme-service-grid">
          {categories.map((cat) => (
            <li key={cat.id} className="theme-service-card">
              <svg
                aria-hidden
                className="mx-auto h-10 w-10 text-[var(--theme-gold)]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
                <path d="M12 12l8-4.5" />
                <path d="M12 12L4 7.5" />
                <path d="M12 12v9" />
              </svg>
              <p>{cat.name}</p>
              <Link href={`/pages/${cat.slug}`} className="mt-3 inline-block text-sm font-semibold text-[var(--theme-navy)] hover:text-[var(--theme-gold)]">
                Learn More
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
