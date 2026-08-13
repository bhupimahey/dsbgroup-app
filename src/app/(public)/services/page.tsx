import ServicesIndexContent from '@/components/services/ServicesIndexContent';
import { getServicesIndexData } from '@/lib/db/public-data';
import {
  parseServiceDetailJson,
  resolveServicesIndexJson,
} from '@/lib/site/service-page-json';
import '@/styles/services-page.css';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const { indexPage } = await getServicesIndexData();
  if (!indexPage) return { title: 'Services' };
  return {
    title: indexPage.metaTitle ?? indexPage.title,
    description: indexPage.metaDescription ?? undefined,
  };
}

export default async function ServicesPage() {
  const { indexPage, categories, pagesBySlug } = await getServicesIndexData();

  const content = resolveServicesIndexJson(indexPage);
  const services = categories.map((category) => {
    const detailPage = pagesBySlug.get(category.slug);
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

  return <ServicesIndexContent content={content} services={services} />;
}
