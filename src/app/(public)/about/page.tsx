import { cmsPageMetadata, renderCmsPage } from '@/lib/cms-page';

export const revalidate = 300;

export async function generateMetadata() {
  return cmsPageMetadata('about');
}

export default async function AboutPage() {
  return renderCmsPage('about');
}