import { cache } from 'react';
import { prisma } from '@/lib/db';

export const getPublishedPageBySlug = cache((slug: string) =>
  prisma.page.findFirst({ where: { slug, published: true } }),
);

export const getPublishedPostBySlug = cache((slug: string) =>
  prisma.post.findFirst({ where: { slug, published: true } }),
);

export const getPublishedBlogPostBySlug = cache((slug: string) =>
  prisma.post.findFirst({
    where: { slug, published: true, type: 'BLOG' },
    include: { categories: { include: { category: true } } },
  }),
);

export const getPublishedArticleBySlug = cache((slug: string) =>
  prisma.post.findFirst({ where: { slug, published: true, type: 'ARTICLE' } }),
);

export const getPublishedNewsletterBySlug = cache((slug: string) =>
  prisma.newsletter.findFirst({
    where: { slug, published: true, status: 'SENT' },
  }),
);
