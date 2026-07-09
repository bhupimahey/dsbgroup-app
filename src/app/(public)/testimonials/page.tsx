import TestimonialsPageGrid from '@/components/testimonials/TestimonialsPageGrid';
import ThemePageHero from '@/components/theme/ThemePageHero';
import { getPublishedTextTestimonials, getPublishedVideoTestimonials } from '@/lib/site/testimonials';
import '@/styles/testimonials-page.css';

export const metadata = {
  title: 'Testimonials',
  description: 'Video and written client testimonials for DSB Law Group.',
};

export const revalidate = 60;

export default async function TestimonialsPage() {
  const [videos, reviews] = await Promise.all([
    getPublishedVideoTestimonials(),
    getPublishedTextTestimonials(),
  ]);

  return (
    <div className="theme-shell">
      <ThemePageHero title="Testimonials" breadcrumbs={[{ label: 'Testimonials' }]} />

      <TestimonialsPageGrid videos={videos} reviews={reviews} />
    </div>
  );
}
