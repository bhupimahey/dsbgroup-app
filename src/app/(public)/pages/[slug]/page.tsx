import Image from 'next/image';
import { notFound } from 'next/navigation';
import ServiceDetailContent from '@/components/services/ServiceDetailContent';
import ThemePageHero from '@/components/theme/ThemePageHero';
import { getPublishedPageBySlug } from '@/lib/cms/cache';
import { getServiceCardPages, getServiceCategories } from '@/lib/db/public-data';
import {
  parseServiceDetailJson,
  resolveServiceDetailJson,
} from '@/lib/site/service-page-json';
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

  const otherCategories = categories.filter((category) => category.slug !== slug).slice(0, 4);
  const otherPagesBySlug = await getServiceCardPages(otherCategories.map((c) => c.slug));

  const moreServices = otherCategories.map((category) => {
    const detailPage = otherPagesBySlug.get(category.slug);
    const fromPage = detailPage ? parseServiceDetailJson(detailPage.contentJson) : null;
    const teaser =
      category.teaser?.trim() ||
      category.description?.trim() ||
      fromPage?.cardTeaser?.trim() ||
      fromPage?.introParagraphs?.[0]?.trim() ||
      '';
    return {
      slug: category.slug,
      name: category.name,
      teaser,
      imagePath: category.imagePath?.trim() || detailPage?.imagePath || null,
    };
  });

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
