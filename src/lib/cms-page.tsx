import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getPublishedPageBySlug } from '@/lib/cms/cache';
import ThemePageHero from '@/components/theme/ThemePageHero';

export async function renderCmsPage(slug: string) {
  const page = await getPublishedPageBySlug(slug);
  if (!page) notFound();

  return (
    <div className="theme-shell">
      <ThemePageHero title={page.title} />
      <article className="theme-content-wrap">
        {page.imagePath ? (
          <div className="relative mb-8 aspect-[21/9] w-full overflow-hidden rounded-xl">
            <Image src={page.imagePath} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 1140px" unoptimized />
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

export async function cmsPageMetadata(slug: string) {
  const page = await getPublishedPageBySlug(slug);
  if (!page) return { title: slug };
  return {
    title: page.metaTitle ?? page.title,
    description: page.metaDescription ?? undefined,
    keywords: page.metaKeywords?.split(',').map((k) => k.trim()).filter(Boolean),
  };
}

/** Shared exports for thin App Router pages backed by a CMS slug. */
export function cmsPageRoute(slug: string) {
  return {
    dynamic: 'force-dynamic' as const,
    generateMetadata: () => cmsPageMetadata(slug),
    Page: () => renderCmsPage(slug),
  };
}
