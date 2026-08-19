import HomePageContent from '@/components/home/HomePageContent';
import { cmsPageMetadata } from '@/lib/cms-page';
import {
  getHomeBlogPosts,
  getHomePageContent,
  getHomeServiceCategories,
} from '@/lib/db/public-data';
import { resolveServiceCardCopy } from '@/lib/site/service-card';
import { getPublishedTextTestimonials, getPublishedVideoTestimonials } from '@/lib/site/testimonials';
import '@/styles/home-index2.css';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  return cmsPageMetadata('home');
}

export default async function HomePage() {
  const [content, serviceCategories, blogPosts, videoTestimonials, textTestimonials] = await Promise.all([
    getHomePageContent(),
    getHomeServiceCategories(),
    getHomeBlogPosts(),
    getPublishedVideoTestimonials(),
    getPublishedTextTestimonials(),
  ]);

  return (
    <HomePageContent
      content={content}
      homeServices={serviceCategories.map((service) => resolveServiceCardCopy(service))}
      blogPosts={blogPosts}
      videoTestimonials={videoTestimonials}
      textTestimonials={textTestimonials}
    />
  );
}
