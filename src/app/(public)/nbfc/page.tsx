import NbfcPageContent from '@/components/nbfc/NbfcPageContent';
import { getPublishedPageBySlug } from '@/lib/cms/cache';
import { resolveNbfcJsonFromPage } from '@/lib/site/nbfc-page-json';
import '@/styles/services-page.css';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const page = await getPublishedPageBySlug('nbfc');
  if (!page) return { title: 'NBFC Advisory' };
  return {
    title: page.metaTitle ?? page.title,
    description: page.metaDescription ?? undefined,
  };
}

export default async function NbfcPage() {
  const page = await getPublishedPageBySlug('nbfc');
  const content = resolveNbfcJsonFromPage(page);
  return <NbfcPageContent content={content} />;
}
