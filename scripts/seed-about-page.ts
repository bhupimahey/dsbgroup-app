import 'dotenv/config';
import { createPrismaClient } from '../src/lib/prisma-client';
import {
  ABOUT_PAGE_BODY_PLACEHOLDER,
  defaultAboutPageJson,
} from '../src/lib/site/about-page-json';

const prisma = createPrismaClient();

async function main() {
  const contentJson = defaultAboutPageJson();

  await prisma.page.upsert({
    where: { slug: 'about' },
    update: {
      title: contentJson.introHeading,
      body: ABOUT_PAGE_BODY_PLACEHOLDER,
      contentJson,
      metaTitle: contentJson.heroTitle,
      metaDescription:
        'About DSB Law Group — corporate and financial consulting with expertise in banking, NBFC, corporate law and regulatory advisory across India.',
      metaKeywords: 'DSB Law, about us, legal firm, NBFC, corporate advisory',
      published: true,
    },
    create: {
      slug: 'about',
      title: contentJson.introHeading,
      body: ABOUT_PAGE_BODY_PLACEHOLDER,
      contentJson,
      metaTitle: contentJson.heroTitle,
      metaDescription:
        'About DSB Law Group — corporate and financial consulting with expertise in banking, NBFC, corporate law and regulatory advisory across India.',
      metaKeywords: 'DSB Law, about us, legal firm, NBFC, corporate advisory',
      published: true,
    },
  });

  console.log('About page content saved to database (slug: about).');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
