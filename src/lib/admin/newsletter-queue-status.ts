export type QueueJobCounts = {
  waiting: number;
  active: number;
  completed: number;
  failed: number;
  delayed: number;
};

const QUEUE_TIMEOUT_MS = 1500;

export async function getNewsletterQueueCounts(): Promise<QueueJobCounts | null> {
  try {
    const { getNewsletterQueue } = await import('@/lib/queue/newsletter-queue');
    const queue = getNewsletterQueue();

    const counts = await Promise.race([
      queue.getJobCounts('waiting', 'active', 'completed', 'failed', 'delayed'),
      new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Redis queue timeout')), QUEUE_TIMEOUT_MS);
      }),
    ]);

    return {
      waiting: counts.waiting ?? 0,
      active: counts.active ?? 0,
      completed: counts.completed ?? 0,
      failed: counts.failed ?? 0,
      delayed: counts.delayed ?? 0,
    };
  } catch {
    return null;
  }
}
