import { prisma } from '@/lib/db';
import type { TextTestimonial, VideoTestimonial } from '@/lib/site/testimonials-content';
import { TEXT_TESTIMONIALS, VIDEO_TESTIMONIALS } from '@/lib/site/testimonials-content';

function hasTestimonialModels(): boolean {
  return (
    typeof prisma.videoTestimonial?.findMany === 'function' &&
    typeof prisma.textTestimonial?.findMany === 'function'
  );
}

export async function getPublishedVideoTestimonials(): Promise<VideoTestimonial[]> {
  if (!hasTestimonialModels()) return [...VIDEO_TESTIMONIALS];

  try {
    const rows = await prisma.videoTestimonial.findMany({
      where: { published: true },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
      select: { title: true, embedUrl: true },
    });

    if (rows.length === 0) return [...VIDEO_TESTIMONIALS];
    return rows;
  } catch {
    return [...VIDEO_TESTIMONIALS];
  }
}

export async function getPublishedTextTestimonials(): Promise<TextTestimonial[]> {
  if (!hasTestimonialModels()) return [...TEXT_TESTIMONIALS];

  try {
    const rows = await prisma.textTestimonial.findMany({
      where: { published: true },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
      select: { quote: true, name: true, role: true, imagePath: true },
    });

    if (rows.length === 0) return [...TEXT_TESTIMONIALS];
    return rows.map(({ quote, name, role, imagePath }) => ({
      quote,
      name,
      role,
      imagePath: imagePath ?? undefined,
    }));
  } catch {
    return [...TEXT_TESTIMONIALS];
  }
}
