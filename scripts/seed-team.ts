import 'dotenv/config';
import { createPrismaClient } from '../src/lib/prisma-client';
import { TEAM_SEED_MEMBERS, teamCreatePayload, teamUpdatePayload } from '../src/lib/team/team-seed-data';

const prisma = createPrismaClient();

async function main() {
  let photosFilled = 0;

  for (const member of TEAM_SEED_MEMBERS) {
    const existing = await prisma.teamMember.findUnique({
      where: { id: member.id },
      select: { imagePath: true },
    });
    const photo = teamCreatePayload(member).imagePath;
    await prisma.teamMember.upsert({
      where: { id: member.id },
      update: teamUpdatePayload(member, existing),
      create: { id: member.id, ...teamCreatePayload(member) },
    });
    if (!existing?.imagePath && photo) photosFilled += 1;
  }

  console.log(
    `Team roster updated: ${TEAM_SEED_MEMBERS.length} profiles saved as document paragraphs (${photosFilled} missing photos filled from live site).`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
