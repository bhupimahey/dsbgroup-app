import { Queue } from 'bullmq';

let queueInstance: Queue | null = null;

function redisConnectionOptions() {
  return {
    url: process.env.REDIS_URL ?? 'redis://127.0.0.1:6379',
    maxRetriesPerRequest: 1,
    enableOfflineQueue: false,
    lazyConnect: true,
    retryStrategy: () => null,
  };
}

export function getNewsletterQueue(): Queue {
  if (!queueInstance) {
    queueInstance = new Queue('newsletter-send', {
      connection: redisConnectionOptions(),
    });
    queueInstance.on('error', () => {
      // Redis may be offline in local dev — avoid crashing the Next.js process.
    });
  }
  return queueInstance;
}

export async function enqueueNewsletterSend(newsletterId: string) {
  await getNewsletterQueue().add(
    'send',
    { newsletterId },
    { attempts: 3, backoff: { type: 'exponential', delay: 5000 } },
  );
}
