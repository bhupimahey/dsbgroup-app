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

function teaserFromPage(page: { contentJson: unknown; title: string } | undefined, name: string) {
  if (!page) return `Expert guidance across ${name.toLowerCase()} — tailored advisory for compliance and strategic decisions.`;
  const json = parseServiceDetailJson(page.contentJson);
  return json?.cardTeaser ?? `Expert guidance across ${name.toLowerCase()} — tailored advisory for compliance and strategic decisions.`;
}

export default async function ServicesPage() {
  const { indexPage, categories, pagesBySlug } = await getServicesIndexData();

  const content = resolveServicesIndexJson(indexPage);
  const services = categories.map((category) => ({
    slug: category.slug,
    name: category.name,
    teaser: teaserFromPage(pagesBySlug.get(category.slug), category.name),
    imagePath: pagesBySlug.get(category.slug)?.imagePath,
  }));

  return <ServicesIndexContent content={content} services={services} />;
}
