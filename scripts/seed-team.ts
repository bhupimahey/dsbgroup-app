import 'dotenv/config';
import { createPrismaClient } from '../src/lib/prisma-client';
import { TEAM_SEED_MEMBERS, teamCreatePayload, teamUpdatePayload } from '../src/lib/team/team-seed-data';
import { normalizeTeamName } from '../src/lib/team/team-photos';

const prisma = createPrismaClient();

async function findExisting(member: (typeof TEAM_SEED_MEMBERS)[number]) {
  const byId = await prisma.teamMember.findUnique({
    where: { id: member.id },
    select: { id: true, imagePath: true },
  });
  if (byId) return byId;

  const rows = await prisma.teamMember.findMany({ select: { id: true, name: true, imagePath: true } });
  const key = normalizeTeamName(member.name);
  return rows.find((row) => normalizeTeamName(row.name) === key) ?? null;
}

async function main() {
  let photosFilled = 0;

  for (const member of TEAM_SEED_MEMBERS) {
    const existing = await findExisting(member);
    const payload = existing
      ? teamUpdatePayload(member, existing)
      : teamCreatePayload(member);

    if (existing) {
      await prisma.teamMember.update({ where: { id: existing.id }, data: payload });
    } else {
      await prisma.teamMember.create({ data: { id: member.id, ...payload } });
    }

    if (payload.imagePath && payload.imagePath !== existing?.imagePath) photosFilled += 1;
  }

  console.log(
    `Team roster updated: ${TEAM_SEED_MEMBERS.length} profiles saved (${photosFilled} photos attached).`,
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
