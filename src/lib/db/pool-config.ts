function readPositiveInt(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : fallback;
}

export function getDatabasePoolConfig(databaseUrl: string) {
  const url = new URL(databaseUrl);
  const allowPublicKeyRetrieval =
    url.searchParams.get('allowPublicKeyRetrieval') === 'true' ||
    process.env.NODE_ENV === 'production';

  const connectionLimit = readPositiveInt(
    process.env.DATABASE_POOL_SIZE,
    process.env.NODE_ENV === 'production' ? 15 : 5,
  );

  return {
    host: url.hostname,
    port: Number(url.port || 3306),
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    database: url.pathname.replace(/^\//, ''),
    connectionLimit,
    minimumIdle: Math.min(2, connectionLimit),
    idleTimeout: 60_000,
    acquireTimeout: 10_000,
    connectTimeout: 10_000,
    allowPublicKeyRetrieval,
  };
}
