import { createPrismaClient } from '@/lib/prisma-client';

type PrismaClientInstance = ReturnType<typeof createPrismaClient>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientInstance | undefined;
};

function hasTestimonialDelegates(client: PrismaClientInstance): boolean {
  return (
    typeof client.videoTestimonial?.findMany === 'function' &&
    typeof client.textTestimonial?.findMany === 'function'
  );
}

function resolvePrisma(): PrismaClientInstance {
  const cached = globalForPrisma.prisma;
  if (cached && hasTestimonialDelegates(cached)) {
    return cached;
  }

  const client = createPrismaClient();
  globalForPrisma.prisma = client;
  return client;
}

export const prisma = new Proxy({} as PrismaClientInstance, {
  get(_target, property, receiver) {
    const client = resolvePrisma();
    const value = Reflect.get(client, property, receiver);
    return typeof value === 'function' ? value.bind(client) : value;
  },
});
