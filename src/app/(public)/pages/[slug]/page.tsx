import Image from 'next/image';
import { notFound } from 'next/navigation';
import ServiceDetailContent from '@/components/services/ServiceDetailContent';
import ThemePageHero from '@/components/theme/ThemePageHero';
import { getPublishedPageBySlug } from '@/lib/cms/cache';
import { getServiceCategories } from '@/lib/db/public-data';
import { resolveServiceDetailJson } from '@/lib/site/service-page-json';
import '@/styles/services-page.css';

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
  const [page, categories] = await Promise.all([
    getPublishedPageBySlug(slug),
    getServiceCategories(),
  ]);

  if (!page) notFound();

  const serviceMatch = categories.find((category) => category.slug === slug);

  if (!serviceMatch) {
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
          <div className="cms-html prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: page.body }} />
        </article>
      </div>
    );
  }

  const content = resolveServiceDetailJson(page);
  const moreServices = categories
    .filter((category) => category.slug !== slug)
    .slice(0, 4)
    .map((category) => ({
      slug: category.slug,
      name: category.name,
      teaser: category.teaser?.trim() || category.description?.trim() || '',
      imagePath: category.imagePath,
    }));

  const heroImage = page.imagePath?.trim() || serviceMatch.imagePath?.trim() || null;

  return (
    <ServiceDetailContent
      title={page.title}
      heroTitle={page.title}
      imagePath={heroImage}
      content={content}
      services={categories.map((category) => ({ slug: category.slug, name: category.name }))}
      moreServices={moreServices}
      activeSlug={slug}
    />
  );
}
