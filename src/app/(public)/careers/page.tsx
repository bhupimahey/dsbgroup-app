import { cmsPageMetadata, renderCmsPage } from '@/lib/cms-page';

export const revalidate = 300;

export async function generateMetadata() {
  return cmsPageMetadata('careers');
}

export default async function CareersPage() {
  return renderCmsPage('careers');
}
