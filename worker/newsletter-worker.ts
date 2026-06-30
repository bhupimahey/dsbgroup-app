import 'dotenv/config';
import { Worker } from 'bullmq';
import { createPrismaClient } from '../src/lib/prisma-client';
import { absoluteUrl, sendNewsletterEmail } from '../src/lib/email/mailer';

const prisma = createPrismaClient();
const redisUrl = process.env.REDIS_URL ?? 'redis://127.0.0.1:6379';

async function processNewsletter(newsletterId: string) {
  const newsletter = await prisma.newsletter.findUnique({
    where: { id: newsletterId },
    include: { tags: true },
  });
  if (!newsletter) return;

  const categoryIds = newsletter.tags.map((t) => t.serviceCategoryId);
  const recipients = new Set<string>();

  const subscribers = await prisma.subscriber.findMany({
    where: { active: true, verified: true },
    include: { preferences: true },
  });

  for (const sub of subscribers) {
    if (sub.preferences.some((p) => categoryIds.includes(p.serviceCategoryId))) {
      recipients.add(sub.email);
    }
  }

  const users = await prisma.user.findMany({
    where: { active: true, emailVerified: { not: null } },
    include: { subscriptionPreferences: true },
  });

  for (const user of users) {
    if (user.subscriptionPreferences.some((p) => categoryIds.includes(p.serviceCategoryId))) {
      recipients.add(user.email);
    }
  }

  for (const recipient of recipients) {
    const openUrl = absoluteUrl(
      `/api/newsletter/open?newsletterId=${newsletterId}&email=${encodeURIComponent(recipient)}`,
    );
    const archiveUrl =
      newsletter.published ? absoluteUrl(`/newsletters/${newsletter.slug}`) : undefined;
    const pdfUrl = newsletter.pdfPath ? absoluteUrl(newsletter.pdfPath) : undefined;

    await sendNewsletterEmail(recipient, {
      subject: newsletter.subject,
      bodyHtml: newsletter.bodyHtml,
      openPixelUrl: openUrl,
      archiveUrl,
      pdfUrl,
      issueNumber: newsletter.issueNumber,
      issueDate: newsletter.issueDate,
      teaser: newsletter.teaser,
    });
    await prisma.newsletterSend.create({ data: { newsletterId, recipient } });
  }

  await prisma.newsletter.update({
    where: { id: newsletterId },
    data: { status: 'SENT', sentAt: new Date() },
  });

  console.log(`Newsletter ${newsletterId} sent to ${recipients.size} recipients.`);
}

const worker = new Worker(
  'newsletter-send',
  async (job) => {
    await processNewsletter(job.data.newsletterId as string);
  },
  { connection: { url: redisUrl } },
);

worker.on('failed', (job, err) => {
  console.error(`Newsletter job ${job?.id} failed:`, err);
});

console.log('Newsletter worker running…');
