import ServicesIndexContent from '@/components/services/ServicesIndexContent';
import { getServicesIndexData } from '@/lib/db/public-data';
import { resolveServiceCardCopy } from '@/lib/site/service-card';
import { resolveServicesIndexJson } from '@/lib/site/service-page-json';
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
  const services = categories.map((category) =>
    resolveServiceCardCopy(category, pagesBySlug.get(category.slug)),
  );

  return <ServicesIndexContent content={content} services={services} />;
}
