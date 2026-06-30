import { prisma } from '@/lib/db';

function sumPublishedGroups(groups: { published: boolean; _count: number }[]) {
  let total = 0;
  let published = 0;
  for (const group of groups) {
    total += group._count;
    if (group.published) published = group._count;
  }
  return { total, published };
}

export async function getDashboardStats() {
  const [
    pageGroups,
    postGroups,
    blogCount,
    articleCount,
    leadCount,
    subscriberCount,
    userCount,
    teamCount,
    faqCount,
    officeCount,
    newsletterSendsCount,
    openedSendsCount,
    recentLeads,
    recentPosts,
    recentPages,
  ] = await Promise.all([
    prisma.page.groupBy({ by: ['published'], _count: { _all: true } }),
    prisma.post.groupBy({ by: ['published'], _count: { _all: true } }),
    prisma.post.count({ where: { type: 'BLOG' } }),
    prisma.post.count({ where: { type: 'ARTICLE' } }),
    prisma.contactLead.count(),
    prisma.subscriber.count({ where: { active: true, verified: true } }),
    prisma.user.count({ where: { role: 'USER', active: true } }),
    prisma.teamMember.count({ where: { published: true } }),
    prisma.faqItem.count({ where: { published: true } }),
    prisma.office.count({ where: { published: true } }),
    prisma.newsletterSend.count(),
    prisma.newsletterSend.count({ where: { openedAt: { not: null } } }),
    prisma.contactLead.findMany({
      orderBy: { createdAt: 'desc' },
      take: 3,
      select: { id: true, name: true, email: true, createdAt: true },
    }),
    prisma.post.findMany({
      orderBy: { updatedAt: 'desc' },
      take: 3,
      select: { id: true, title: true, type: true, updatedAt: true },
    }),
    prisma.page.findMany({
      orderBy: { updatedAt: 'desc' },
      take: 2,
      select: { id: true, title: true, updatedAt: true },
    }),
  ]);

  const pages = sumPublishedGroups(
    pageGroups.map((g) => ({ published: g.published, _count: g._count._all })),
  );
  const posts = sumPublishedGroups(
    postGroups.map((g) => ({ published: g.published, _count: g._count._all })),
  );

  return {
    pageCount: pages.total,
    publishedPages: pages.published,
    postCount: posts.total,
    blogCount,
    articleCount,
    publishedPosts: posts.published,
    leadCount,
    subscriberCount,
    userCount,
    teamCount,
    faqCount,
    officeCount,
    newsletterSendsCount,
    openedSendsCount,
    recentLeads,
    recentPosts,
    recentPages,
  };
}
