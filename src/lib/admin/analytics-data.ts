import { cache } from 'react';
import { prisma } from '@/lib/db';

function monthKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

function monthLabel(key: string): string {
  const [year, month] = key.split('-').map(Number);
  return new Date(year, month - 1, 1).toLocaleDateString(undefined, { month: 'short', year: '2-digit' });
}

function buildMonthlySeries(
  rows: { createdAt: Date }[],
  months = 12,
): { label: string; value: number }[] {
  const counts = new Map<string, number>();
  const now = new Date();

  for (let i = months - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    counts.set(monthKey(d), 0);
  }

  for (const row of rows) {
    const key = monthKey(row.createdAt);
    if (counts.has(key)) {
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
  }

  return [...counts.entries()].map(([key, value]) => ({ label: monthLabel(key), value }));
}

function toNumber(value: bigint | number | null | undefined): number {
  if (value == null) return 0;
  return typeof value === 'bigint' ? Number(value) : value;
}

export const getAnalyticsOverview = cache(async function getAnalyticsOverview() {
  const since = new Date();
  since.setMonth(since.getMonth() - 11);
  since.setDate(1);
  since.setHours(0, 0, 0, 0);

  const [
    subscriberStats,
    sendStats,
    usersCount,
    subscriberRows,
    userRows,
    newsletterStats,
  ] = await Promise.all([
    prisma.$queryRaw<Array<{ total: bigint; verified: bigint; active: bigint }>>`
      SELECT
        COUNT(*) AS total,
        SUM(CASE WHEN verified = 1 THEN 1 ELSE 0 END) AS verified,
        SUM(CASE WHEN verified = 1 AND active = 1 THEN 1 ELSE 0 END) AS active
      FROM Subscriber
    `,
    prisma.$queryRaw<Array<{ total: bigint; opened: bigint; clicked: bigint }>>`
      SELECT
        COUNT(*) AS total,
        SUM(CASE WHEN openedAt IS NOT NULL THEN 1 ELSE 0 END) AS opened,
        SUM(CASE WHEN clickedAt IS NOT NULL THEN 1 ELSE 0 END) AS clicked
      FROM NewsletterSend
    `,
    prisma.user.count({ where: { role: 'USER' } }),
    prisma.subscriber.findMany({
      where: { createdAt: { gte: since } },
      select: { createdAt: true },
    }),
    prisma.user.findMany({
      where: { role: 'USER', createdAt: { gte: since } },
      select: { createdAt: true },
    }),
    prisma.newsletter.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: {
        id: true,
        subject: true,
        status: true,
        sentAt: true,
      },
    }),
  ]);

  const subscriberRow = subscriberStats[0];
  const sendRow = sendStats[0];
  const totalSubscribers = toNumber(subscriberRow?.total);
  const verifiedSubscribers = toNumber(subscriberRow?.verified);
  const activeSubscribers = toNumber(subscriberRow?.active);
  const newsletterSendsCount = toNumber(sendRow?.total);
  const openedSendsCount = toNumber(sendRow?.opened);
  const clickedSendsCount = toNumber(sendRow?.clicked);

  const newsletterIds = newsletterStats.map((n) => n.id);
  const [sendMetrics, openedByNewsletter, clickedByNewsletter] = newsletterIds.length
    ? await Promise.all([
        prisma.newsletterSend.groupBy({
          by: ['newsletterId'],
          where: { newsletterId: { in: newsletterIds } },
          _count: { _all: true },
        }),
        prisma.newsletterSend.groupBy({
          by: ['newsletterId'],
          where: { newsletterId: { in: newsletterIds }, openedAt: { not: null } },
          _count: { _all: true },
        }),
        prisma.newsletterSend.groupBy({
          by: ['newsletterId'],
          where: { newsletterId: { in: newsletterIds }, clickedAt: { not: null } },
          _count: { _all: true },
        }),
      ])
    : [[], [], []];

  const sendMap = new Map(sendMetrics.map((r) => [r.newsletterId, r._count._all]));
  const openedMap = new Map(openedByNewsletter.map((r) => [r.newsletterId, r._count._all]));
  const clickedMap = new Map(clickedByNewsletter.map((r) => [r.newsletterId, r._count._all]));

  const openRate = newsletterSendsCount > 0 ? (openedSendsCount / newsletterSendsCount) * 100 : 0;
  const clickRate = newsletterSendsCount > 0 ? (clickedSendsCount / newsletterSendsCount) * 100 : 0;

  return {
    totalSubscribers,
    verifiedSubscribers,
    activeSubscribers,
    usersCount,
    newsletterSendsCount,
    openedSendsCount,
    clickedSendsCount,
    openRate,
    clickRate,
    subscriberGrowth: buildMonthlySeries(subscriberRows),
    userGrowth: buildMonthlySeries(userRows),
    newsletterPerformance: newsletterStats.map((newsletter) => {
      const sends = sendMap.get(newsletter.id) ?? 0;
      const opened = openedMap.get(newsletter.id) ?? 0;
      const clicked = clickedMap.get(newsletter.id) ?? 0;
      return {
        id: newsletter.id,
        subject: newsletter.subject,
        status: newsletter.status,
        sentAt: newsletter.sentAt,
        sends,
        opened,
        clicked,
        openRate: sends > 0 ? (opened / sends) * 100 : 0,
      };
    }),
  };
});
