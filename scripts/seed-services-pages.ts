import 'dotenv/config';
import type { Prisma } from '../src/generated/prisma/client';
import { createPrismaClient } from '../src/lib/prisma-client';
import {
  defaultServicesIndexJson,
  SERVICES_INDEX_BODY_PLACEHOLDER,
} from '../src/lib/site/service-page-json';
import { buildServiceCategoryPages } from '../src/lib/site/service-seed-data';

const prisma = createPrismaClient();

async function main() {
  const servicesIndex = defaultServicesIndexJson();
  const servicePages = buildServiceCategoryPages();

  await prisma.page.upsert({
    where: { slug: 'services' },
    update: {
      title: servicesIndex.heroTitle,
      body: SERVICES_INDEX_BODY_PLACEHOLDER,
      contentJson: servicesIndex as Prisma.InputJsonValue,
      metaTitle: 'Our Services | DSB Law Group',
      metaDescription:
        'Legal, regulatory, financial and business advisory services from DSB Law Group.',
      published: true,
    },
    create: {
      slug: 'services',
      title: servicesIndex.heroTitle,
      body: SERVICES_INDEX_BODY_PLACEHOLDER,
      contentJson: servicesIndex as Prisma.InputJsonValue,
      metaTitle: 'Our Services | DSB Law Group',
      metaDescription:
        'Legal, regulatory, financial and business advisory services from DSB Law Group.',
      published: true,
    },
  });

  for (const page of servicePages) {
    await prisma.page.upsert({
      where: { slug: page.slug },
      update: {
        title: page.title,
        body: page.body,
        contentJson: page.contentJson as Prisma.InputJsonValue,
        metaTitle: page.metaTitle,
        metaDescription: page.metaDescription,
        metaKeywords: page.metaKeywords,
        published: true,
      },
      create: {
        slug: page.slug,
        title: page.title,
        body: page.body,
        contentJson: page.contentJson as Prisma.InputJsonValue,
        metaTitle: page.metaTitle,
        metaDescription: page.metaDescription,
        metaKeywords: page.metaKeywords,
        published: true,
      },
    });
  }

  console.log(`Services index + ${servicePages.length} service detail pages saved to database.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
