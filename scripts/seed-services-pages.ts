import 'dotenv/config';
import type { Prisma } from '../src/generated/prisma/client';
import { createPrismaClient } from '../src/lib/prisma-client';
import {
  defaultServicesIndexJson,
  SERVICES_INDEX_BODY_PLACEHOLDER,
} from '../src/lib/site/service-page-json';
import {
  buildServiceCategoryPages,
  buildServiceCategoryRecords,
} from '../src/lib/site/service-seed-data';
import {
  defaultNbfcPageJson,
  NBFC_PAGE_BODY_PLACEHOLDER,
} from '../src/lib/site/nbfc-page-json';

const prisma = createPrismaClient();

async function main() {
  const servicesIndex = defaultServicesIndexJson();
  const servicePages = buildServiceCategoryPages();
  const categoryRecords = buildServiceCategoryRecords();
  const nbfcContent = defaultNbfcPageJson();

  for (const cat of categoryRecords) {
    await prisma.serviceCategory.upsert({
      where: { slug: cat.slug },
      update: {
        name: cat.name,
        teaser: cat.teaser,
        description: cat.description,
        imagePath: cat.imagePath,
        sortOrder: cat.sortOrder,
        active: true,
      },
      create: {
        slug: cat.slug,
        name: cat.name,
        teaser: cat.teaser,
        description: cat.description,
        imagePath: cat.imagePath,
        sortOrder: cat.sortOrder,
        active: true,
      },
    });
  }

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

  await prisma.page.upsert({
    where: { slug: 'nbfc' },
    update: {
      title: nbfcContent.introHeading,
      body: NBFC_PAGE_BODY_PLACEHOLDER,
      contentJson: nbfcContent as Prisma.InputJsonValue,
      metaTitle: nbfcContent.heroTitle,
      metaDescription:
        'DSB Law Group advises Non-Banking Financial Companies on incorporation, RBI licensing, regulatory compliance, restructuring and strategic growth.',
      metaKeywords: 'NBFC, RBI, licensing, compliance, non-banking financial company',
      published: true,
    },
    create: {
      slug: 'nbfc',
      title: nbfcContent.introHeading,
      body: NBFC_PAGE_BODY_PLACEHOLDER,
      contentJson: nbfcContent as Prisma.InputJsonValue,
      metaTitle: nbfcContent.heroTitle,
      metaDescription:
        'DSB Law Group advises Non-Banking Financial Companies on incorporation, RBI licensing, regulatory compliance, restructuring and strategic growth.',
      metaKeywords: 'NBFC, RBI, licensing, compliance, non-banking financial company',
      published: true,
    },
  });

  console.log(
    `Seeded /services index page, ${servicePages.length} service detail pages, ${categoryRecords.length} service categories, and NBFC page.`,
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
