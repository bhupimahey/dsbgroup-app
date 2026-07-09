import { cmsPageMetadata, renderCmsPage } from '@/lib/cms-page';

export const revalidate = 300;

export async function generateMetadata() {
  return cmsPageMetadata('podcasts');
}

export default async function PodcastsPage() {
  return renderCmsPage('podcasts');
}
