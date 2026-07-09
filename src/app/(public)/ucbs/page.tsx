import { cmsPageMetadata, renderCmsPage } from '@/lib/cms-page';

export const revalidate = 300;

export async function generateMetadata() {
  return cmsPageMetadata('ucbs');
}

export default async function UcbsPage() {
  return renderCmsPage('ucbs');
}
