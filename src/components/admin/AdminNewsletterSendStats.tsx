import { prisma } from '@/lib/db';
import { getNewsletterQueueCounts } from '@/lib/admin/newsletter-queue-status';
import AdminStatCard from '@/components/admin/ui/AdminStatCard';

export default async function AdminNewsletterSendStats({ newsletterId }: { newsletterId: string }) {
  const [sends, opened, clicked, queueCounts] = await Promise.all([
    prisma.newsletterSend.count({ where: { newsletterId } }),
    prisma.newsletterSend.count({ where: { newsletterId, openedAt: { not: null } } }),
    prisma.newsletterSend.count({ where: { newsletterId, clickedAt: { not: null } } }),
    getNewsletterQueueCounts(),
  ]);

  const openRate = sends > 0 ? (opened / sends) * 100 : 0;
  const clickRate = sends > 0 ? (clicked / sends) * 100 : 0;

  return (
    <section className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <AdminStatCard label="Emails sent" value={sends} tone="primary" />
      <AdminStatCard label="Opens" value={opened} tone="success" hint={`${openRate.toFixed(1)}% open rate`} />
      <AdminStatCard label="Clicks" value={clicked} tone="info" hint={`${clickRate.toFixed(1)}% click rate`} />
      {queueCounts ? (
        <AdminStatCard
          label="Queue jobs"
          value={queueCounts.waiting + queueCounts.active}
          tone="warning"
          hint={`${queueCounts.failed} failed`}
        />
      ) : (
        <AdminStatCard label="Queue" value="—" tone="info" hint="Redis unavailable" />
      )}
    </section>
  );
}
