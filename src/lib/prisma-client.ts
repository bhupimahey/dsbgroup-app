import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '@/generated/prisma/client';

function parseDatabaseUrl(databaseUrl: string) {
  const url = new URL(databaseUrl);
  const allowPublicKeyRetrieval =
    url.searchParams.get('allowPublicKeyRetrieval') === 'true' ||
    process.env.NODE_ENV === 'production';

  return {
    host: url.hostname,
    port: Number(url.port || 3306),
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    database: url.pathname.replace(/^\//, ''),
    connectionLimit: 10,
    connectTimeout: 10_000,
    allowPublicKeyRetrieval,
  };
}

export function createPrismaClient() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not set');
  }

  const adapter = new PrismaMariaDb(parseDatabaseUrl(databaseUrl));

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });
}
