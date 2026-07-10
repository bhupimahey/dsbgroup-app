import { cmsPageMetadata, renderCmsPage } from '@/lib/cms-page';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  return cmsPageMetadata('ucbs');
}

export default async function UcbsPage() {
  return renderCmsPage('ucbs');
}
