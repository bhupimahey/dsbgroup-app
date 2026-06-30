import { cmsPageMetadata, renderCmsPage } from '@/lib/cms-page';

export const revalidate = 60;

export async function generateMetadata() {
  return cmsPageMetadata('disclaimer');
}

export default async function DisclaimerPage() {
  return renderCmsPage('disclaimer');
}
