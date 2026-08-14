import { getPublishedPageBySlug } from '@/lib/cms/cache';
import HrLabourPageContent from '@/components/hr-labour/HrLabourPageContent';
import { resolveHrLabourJsonFromPage } from '@/lib/site/hr-labour-page-json';
import '@/styles/services-page.css';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const page = await getPublishedPageBySlug('about-hr-labour-law');
  if (!page) return { title: 'HR & Labour Laws' };
  return {
    title: page.metaTitle ?? page.title,
    description: page.metaDescription ?? undefined,
  };
}

export default async function AboutHrLabourLawPage() {
  const page = await getPublishedPageBySlug('about-hr-labour-law');
  const content = resolveHrLabourJsonFromPage(page);
  return <HrLabourPageContent content={content} />;
}
