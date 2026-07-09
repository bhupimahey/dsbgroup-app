import { cmsPageMetadata, renderCmsPage } from '@/lib/cms-page';

export const revalidate = 300;

export async function generateMetadata() {
  return cmsPageMetadata('privacy');
}

export default async function PrivacyPage() {
  return renderCmsPage('privacy');
}
