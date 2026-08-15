import 'dotenv/config';
import { createPrismaClient } from '../src/lib/prisma-client';
import { photoPathForTeamName } from '../src/lib/team/team-photos';

const prisma = createPrismaClient();

async function main() {
  const members = await prisma.teamMember.findMany({
    select: { id: true, name: true, imagePath: true },
  });

  let updated = 0;
  for (const member of members) {
    const photo = photoPathForTeamName(member.name);
    if (!photo) continue;
    const current = member.imagePath?.trim() || '';
    if (current && !current.startsWith('/uploads/team/')) continue;

    await prisma.teamMember.update({
      where: { id: member.id },
      data: { imagePath: photo, showPhotoOnFront: true },
    });
    updated += 1;
    console.log(`Photo set for ${member.name}: ${photo}`);
  }

  console.log(`Team photos attached: ${updated} of ${members.length} members`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
