import { unstable_cache } from 'next/cache';
import { prisma } from '@/lib/db';
import { PUBLIC_CACHE_TAGS } from '@/lib/db/cache-tags';
import { getPaginationMeta } from '@/lib/pagination';

export const PUBLIC_CACHE_SECONDS = 60;
export const BLOG_PAGE_SIZE = 9;

export const getCachedBlogIndexData = unstable_cache(
  async (categorySlug: string, page: number) => {
    const where = {
      type: 'BLOG' as const,
      published: true,
      ...(categorySlug ? { categories: { some: { category: { slug: categorySlug } } } } : {}),
    };

    const [categories, totalPosts] = await Promise.all([
      prisma.category.findMany({ orderBy: { name: 'asc' } }),
      prisma.post.count({ where }),
    ]);

    const pagination = getPaginationMeta(totalPosts, page, BLOG_PAGE_SIZE);
    const posts = await prisma.post.findMany({
      where,
      orderBy: { publishedAt: 'desc' },
      include: { categories: { include: { category: true } } },
      skip: pagination.skip,
      take: pagination.take,
    });

    return { categories, posts, pagination };
  },
  ['public-blog-index'],
  { revalidate: PUBLIC_CACHE_SECONDS, tags: [PUBLIC_CACHE_TAGS.blog] },
);

export const getCachedArticlesIndexData = unstable_cache(
  async (page: number, pageSize: number) => {
    const where = { type: 'ARTICLE' as const, published: true };
    const total = await prisma.post.count({ where });
    const pagination = getPaginationMeta(total, page, pageSize);
    const posts = await prisma.post.findMany({
      where,
      orderBy: { publishedAt: 'desc' },
      skip: pagination.skip,
      take: pagination.take,
    });

    return { pagination, posts };
  },
  ['public-articles-index'],
  { revalidate: PUBLIC_CACHE_SECONDS, tags: [PUBLIC_CACHE_TAGS.articles] },
);

export const getCachedNewslettersIndexData = unstable_cache(
  async (page: number, pageSize: number) => {
    const where = { published: true, status: 'SENT' as const };
    const total = await prisma.newsletter.count({ where });
    const pagination = getPaginationMeta(total, page, pageSize);
    const issues = await prisma.newsletter.findMany({
      where,
      orderBy: [{ issueDate: 'desc' }, { sentAt: 'desc' }],
      skip: pagination.skip,
      take: pagination.take,
    });

    return { pagination, issues };
  },
  ['public-newsletters-index'],
  { revalidate: PUBLIC_CACHE_SECONDS, tags: [PUBLIC_CACHE_TAGS.newsletters] },
);

export const getCachedOfficesIndexData = unstable_cache(
  async (page: number, pageSize: number) => {
    const where = { published: true };
    const total = await prisma.office.count({ where });
    const pagination = getPaginationMeta(total, page, pageSize);
    const offices = await prisma.office.findMany({
      where,
      orderBy: { sortOrder: 'asc' },
      skip: pagination.skip,
      take: pagination.take,
    });

    return { pagination, offices };
  },
  ['public-offices-index'],
  { revalidate: PUBLIC_CACHE_SECONDS, tags: [PUBLIC_CACHE_TAGS.offices] },
);

export const getCachedServiceCategories = unstable_cache(
  async () =>
    prisma.serviceCategory.findMany({
      where: { active: true },
      orderBy: { sortOrder: 'asc' },
    }),
  ['public-service-categories'],
  { revalidate: PUBLIC_CACHE_SECONDS, tags: [PUBLIC_CACHE_TAGS.services] },
);

export const getCachedHomeBlogPosts = unstable_cache(
  async () =>
    prisma.post.findMany({
      where: { type: 'BLOG', published: true },
      orderBy: { publishedAt: 'desc' },
      take: 3,
      include: { categories: { include: { category: true } } },
    }),
  ['public-home-blog-posts'],
  { revalidate: PUBLIC_CACHE_SECONDS, tags: [PUBLIC_CACHE_TAGS.home, PUBLIC_CACHE_TAGS.blog] },
);

export const getCachedHomeServiceCategories = unstable_cache(
  async () =>
    prisma.serviceCategory.findMany({
      where: { active: true },
      orderBy: { sortOrder: 'asc' },
      take: 6,
    }),
  ['public-home-service-categories'],
  { revalidate: PUBLIC_CACHE_SECONDS, tags: [PUBLIC_CACHE_TAGS.home, PUBLIC_CACHE_TAGS.services] },
);

export const getCachedTeamMembers = unstable_cache(
  async () =>
    prisma.teamMember.findMany({
      where: { published: true },
      orderBy: [{ group: 'asc' }, { sortOrder: 'asc' }],
    }),
  ['public-team-members'],
  { revalidate: PUBLIC_CACHE_SECONDS, tags: [PUBLIC_CACHE_TAGS.team] },
);
