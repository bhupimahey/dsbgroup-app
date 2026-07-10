import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { createPrismaClient } from '../src/lib/prisma-client';

const DEMO_CLIENT_EMAIL = 'bhupimahey@gmail.com';
const DEMO_CLIENT_PASSWORD = 'bhupimahey';
const DEMO_CLIENT_NAME = 'Bhupinder Test User';

const prisma = createPrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash(DEMO_CLIENT_PASSWORD, 12);

  await prisma.user.upsert({
    where: { email: DEMO_CLIENT_EMAIL },
    update: {
      passwordHash,
      role: 'USER',
      name: DEMO_CLIENT_NAME,
      active: true,
      emailVerified: new Date(),
    },
    create: {
      email: DEMO_CLIENT_EMAIL,
      passwordHash,
      role: 'USER',
      name: DEMO_CLIENT_NAME,
      active: true,
      emailVerified: new Date(),
    },
  });

  console.log(`Demo client ready: ${DEMO_CLIENT_EMAIL} / ${DEMO_CLIENT_PASSWORD}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
