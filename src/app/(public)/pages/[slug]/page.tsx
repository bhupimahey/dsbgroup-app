import Image from 'next/image';
import { notFound } from 'next/navigation';
import ServiceDetailContent from '@/components/services/ServiceDetailContent';
import ThemePageHero from '@/components/theme/ThemePageHero';
import { getPublishedPageBySlug } from '@/lib/cms/cache';
import { getServiceCategories } from '@/lib/db/public-data';
import { prisma } from '@/lib/db';
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

function teaserFromPage(page: { contentJson: unknown; title: string }) {
  const json = parseServiceDetailJson(page.contentJson);
  if (json?.cardTeaser) return json.cardTeaser;
  return `Expert guidance across ${page.title.toLowerCase()} — tailored advisory for compliance and strategic decisions.`;
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
  const otherSlugs = categories.filter((category) => category.slug !== slug).slice(0, 4);
  const otherPages = await prisma.page.findMany({
    where: { slug: { in: otherSlugs.map((item) => item.slug) }, published: true },
  });
  const otherPagesBySlug = new Map(otherPages.map((item) => [item.slug, item]));

  const moreServices = otherSlugs.map((category) => {
    const otherPage = otherPagesBySlug.get(category.slug);
    return {
      slug: category.slug,
      name: category.name,
      teaser: otherPage
        ? teaserFromPage(otherPage)
        : `Explore our ${category.name.toLowerCase()} advisory services.`,
      imagePath: otherPage?.imagePath,
    };
  });

  return (
    <ServiceDetailContent
      title={page.title}
      heroTitle={page.title}
      imagePath={page.imagePath}
      content={content}
      services={categories.map((category) => ({ slug: category.slug, name: category.name }))}
      moreServices={moreServices}
      activeSlug={slug}
    />
  );
}
