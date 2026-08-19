import 'dotenv/config';
import { createPrismaClient } from '../src/lib/prisma-client';
import {
  defaultHomePageJson,
  HOME_PAGE_BODY_PLACEHOLDER,
  parseHomePageJson,
} from '../src/lib/site/home-page-json';

const prisma = createPrismaClient();

async function main() {
  const existing = await prisma.page.findUnique({
    where: { slug: 'home' },
    select: { contentJson: true },
  });

  if (existing && parseHomePageJson(existing.contentJson)) {
    console.log('Home page already has structured content; skipping overwrite.');
    return;
  }

  const contentJson = defaultHomePageJson();

  await prisma.page.upsert({
    where: { slug: 'home' },
    update: {
      title: contentJson.heroHeading,
      body: HOME_PAGE_BODY_PLACEHOLDER,
      contentJson,
      metaTitle: `${contentJson.heroHeading} | ${contentJson.heroTagline}`,
      metaDescription:
        'DSB Law Group is a full-service Indian law firm providing legal, regulatory and business advisory solutions across India.',
      metaKeywords: 'DSB Law Group, legal consultants, NBFC, corporate advisory, taxation',
      imagePath: contentJson.heroImagePath || null,
      published: true,
    },
    create: {
      slug: 'home',
      title: contentJson.heroHeading,
      body: HOME_PAGE_BODY_PLACEHOLDER,
      contentJson,
      metaTitle: `${contentJson.heroHeading} | ${contentJson.heroTagline}`,
      metaDescription:
        'DSB Law Group is a full-service Indian law firm providing legal, regulatory and business advisory solutions across India.',
      metaKeywords: 'DSB Law Group, legal consultants, NBFC, corporate advisory, taxation',
      imagePath: contentJson.heroImagePath || null,
      published: true,
    },
  });

  console.log('Home page content saved to database (slug: home).');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
