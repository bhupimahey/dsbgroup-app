import ServicesIndexContent from '@/components/services/ServicesIndexContent';
import { getServicesIndexData } from '@/lib/db/public-data';
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
  const { indexPage, categories } = await getServicesIndexData();

  const content = resolveServicesIndexJson(indexPage);
  const services = categories.map((category) => ({
    slug: category.slug,
    name: category.name,
    teaser: category.teaser?.trim() || category.description?.trim() || '',
    imagePath: category.imagePath,
  }));

  return <ServicesIndexContent content={content} services={services} />;
}
