import { cmsPageMetadata, renderCmsPage } from '@/lib/cms-page';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  return cmsPageMetadata('terms');
}

export default async function TermsPage() {
  return renderCmsPage('terms');
}
