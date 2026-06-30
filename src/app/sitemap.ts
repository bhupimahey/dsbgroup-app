import type { MetadataRoute } from 'next';
import { prisma } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

  const staticRoutes = [
    '',
    '/contact',
    '/blog',
    '/articles',
    '/about',
    '/faq',
    '/team',
    '/offices',
    '/privacy',
    '/terms',
    '/careers',
    '/services',
    '/newsletters',
  ].map((path) => ({ url: `${base}${path}`, lastModified: new Date() }));

  try {
    const [posts, publicArticles, pages, newsletters] = await Promise.all([
      prisma.post.findMany({
        where: { published: true, type: 'BLOG' },
        select: { slug: true, updatedAt: true },
      }),
      prisma.post.findMany({
        where: { published: true, type: 'ARTICLE', visibility: 'PUBLIC' },
        select: { slug: true, updatedAt: true },
      }),
      prisma.page.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
      }),
      prisma.newsletter.findMany({
        where: { published: true, status: 'SENT' },
        select: { slug: true, sentAt: true, updatedAt: true },
      }),
    ]);

    const cmsPages = pages
      .filter((p) => !['about', 'privacy', 'terms', 'careers'].includes(p.slug))
      .map((p) => ({
        url: `${base}/pages/${p.slug}`,
        lastModified: p.updatedAt,
      }));

    return [
      ...staticRoutes,
      ...cmsPages,
      ...posts.map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: p.updatedAt })),
      ...publicArticles.map((p) => ({
        url: `${base}/articles/${p.slug}`,
        lastModified: p.updatedAt,
      })),
      ...newsletters.map((n) => ({
        url: `${base}/newsletters/${n.slug}`,
        lastModified: n.sentAt ?? n.updatedAt,
      })),
    ];
  } catch {
    return staticRoutes;
  }
}
