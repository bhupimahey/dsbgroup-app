import 'dotenv/config';
import { createPrismaClient } from '../src/lib/prisma-client';
import { TEAM_SEED_MEMBERS, teamSeedPayload } from '../src/lib/team/team-seed-data';

const prisma = createPrismaClient();

async function main() {
  for (const member of TEAM_SEED_MEMBERS) {
    await prisma.teamMember.upsert({
      where: { id: member.id },
      update: teamSeedPayload(member),
      create: { id: member.id, ...teamSeedPayload(member) },
    });
  }

  console.log(`Team roster updated: ${TEAM_SEED_MEMBERS.length} profiles saved (photos left unchanged).`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
