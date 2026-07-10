import { prisma } from '@/lib/db';
import { getPaginationMeta } from '@/lib/pagination';

export const BLOG_PAGE_SIZE = 9;

export async function getBlogIndexData(categorySlug: string, page: number) {
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
}

export async function getArticlesIndexData(page: number, pageSize: number) {
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
}

export async function getNewslettersIndexData(page: number, pageSize: number) {
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
}

export async function getOfficesIndexData(page: number, pageSize: number) {
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
}

export async function getServiceCategories() {
  return prisma.serviceCategory.findMany({
    where: { active: true },
    orderBy: { sortOrder: 'asc' },
  });
}

export async function getHomeBlogPosts() {
  return prisma.post.findMany({
    where: { type: 'BLOG', published: true },
    orderBy: { publishedAt: 'desc' },
    take: 3,
    include: { categories: { include: { category: true } } },
  });
}

export async function getHomeServiceCategories() {
  return prisma.serviceCategory.findMany({
    where: { active: true },
    orderBy: { sortOrder: 'asc' },
    take: 6,
  });
}

export async function getTeamMembers() {
  return prisma.teamMember.findMany({
    where: { published: true },
    orderBy: [{ group: 'asc' }, { sortOrder: 'asc' }],
  });
}

export async function getFaqCategoriesPage(categoryPage: number, pageSize: number) {
  const total = await prisma.faqCategory.count();
  const pagination = getPaginationMeta(total, categoryPage, pageSize);
  const categories = await prisma.faqCategory.findMany({
    orderBy: { sortOrder: 'asc' },
    skip: pagination.skip,
    take: pagination.take,
  });

  const categoryIds = categories.map((category) => category.id);
  const publishedItems =
    categoryIds.length > 0
      ? await prisma.faqItem.findMany({
          where: { categoryId: { in: categoryIds }, published: true },
          orderBy: { sortOrder: 'asc' },
        })
      : [];

  const itemsByCategory = new Map<string, typeof publishedItems>();
  for (const item of publishedItems) {
    const list = itemsByCategory.get(item.categoryId) ?? [];
    list.push(item);
    itemsByCategory.set(item.categoryId, list);
  }

  return { pagination, categories, itemsByCategory };
}
