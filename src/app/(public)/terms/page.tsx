import { cmsPageMetadata, renderCmsPage } from '@/lib/cms-page';

export const revalidate = 300;

export async function generateMetadata() {
  return cmsPageMetadata('terms');
}

export default async function TermsPage() {
  return renderCmsPage('terms');
}
