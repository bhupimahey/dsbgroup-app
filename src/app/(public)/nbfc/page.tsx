import { cmsPageMetadata, renderCmsPage } from '@/lib/cms-page';

export const revalidate = 300;

export async function generateMetadata() {
  return cmsPageMetadata('nbfc');
}

export default async function NbfcPage() {
  return renderCmsPage('nbfc');
}
