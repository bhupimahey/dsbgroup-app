import { cmsPageMetadata, renderCmsPage } from '@/lib/cms-page';

export const revalidate = 60;

export async function generateMetadata() {
  return cmsPageMetadata('podcasts');
}

export default async function PodcastsPage() {
  return renderCmsPage('podcasts');
}
