import { cmsPageMetadata, renderCmsPage } from '@/lib/cms-page';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  return cmsPageMetadata('privacy');
}

export default async function PrivacyPage() {
  return renderCmsPage('privacy');
}
