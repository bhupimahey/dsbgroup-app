import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { createPrismaClient } from '../src/lib/prisma-client';
import { CMS_PAGES, SERVICE_CATEGORY_PAGES } from './seed-content';
import { TEAM_SEED_MEMBERS, teamSeedPayload } from '../src/lib/team/team-seed-data';
import { TEXT_TESTIMONIALS, VIDEO_TESTIMONIALS } from '../src/lib/site/testimonials-content';

const prisma = createPrismaClient();

async function main() {
  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? 'admin@gmail.com';
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? 'Admin@12345';
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  const legacyDefaultEmail = 'admin@dsblaw.local';
  if (adminEmail !== legacyDefaultEmail) {
    await prisma.user.deleteMany({
      where: { email: legacyDefaultEmail, role: 'ADMIN' },
    });
  }

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      passwordHash,
      role: 'ADMIN',
      name: 'Site Admin',
      active: true,
      emailVerified: new Date(),
    },
    create: {
      email: adminEmail,
      passwordHash,
      role: 'ADMIN',
      name: 'Site Admin',
      active: true,
      emailVerified: new Date(),
    },
  });

  const testUserEmail = 'bhupimahey@gmail.com';
  const testPasswordHash = await bcrypt.hash('bhupimahey', 12);

  await prisma.user.upsert({
    where: { email: testUserEmail },
    update: {
      passwordHash: testPasswordHash,
      role: 'USER',
      name: 'Bhupinder Test User',
      active: true,
      emailVerified: new Date(),
    },
    create: {
      email: testUserEmail,
      passwordHash: testPasswordHash,
      role: 'USER',
      name: 'Bhupinder Test User',
      active: true,
      emailVerified: new Date(),
    },
  });

  const serviceCategories = [
    { slug: 'intellectual-property', name: 'Intellectual Property Rights' },
    { slug: 'labour-law', name: 'Labor & Industrial Law' },
    { slug: 'joint-ventures', name: 'Joint Ventures' },
    { slug: 'taxation', name: 'Taxation' },
    { slug: 'business-advisory', name: 'Business Advisory' },
    { slug: 'banking-finance', name: 'Banking & Finance' },
    { slug: 'private-equity', name: 'Private Equity' },
    { slug: 'audit', name: 'Audit' },
    { slug: 'mergers-acquisitions', name: 'Mergers & Acquisitions' },
    { slug: 'corporate-advisory', name: 'Corporate Advisory' },
  ];

  for (const [i, cat] of serviceCategories.entries()) {
    await prisma.serviceCategory.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, sortOrder: i, active: true },
      create: { ...cat, sortOrder: i, active: true },
    });
  }

  for (const page of CMS_PAGES) {
    await prisma.page.upsert({
      where: { slug: page.slug },
      update: {
        title: page.title,
        body: page.body,
        metaTitle: page.metaTitle,
        metaDescription: page.metaDescription,
        metaKeywords: page.metaKeywords,
        published: true,
      },
      create: { ...page, published: true },
    });
  }

  const blogCategories = [
    { slug: 'compliance', name: 'Compliance' },
    { slug: 'corporate', name: 'Corporate' },
    { slug: 'industry-news', name: 'Industry News' },
  ];

  for (const cat of blogCategories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name },
      create: cat,
    });
  }

  const complianceCat = await prisma.category.findUnique({ where: { slug: 'compliance' } });
  const corporateCat = await prisma.category.findUnique({ where: { slug: 'corporate' } });
  const industryCat = await prisma.category.findUnique({ where: { slug: 'industry-news' } });

  const blogSeedPosts = [
    {
      slug: 'nbfc-regulatory-compliance-2024',
      title: 'NBFC regulatory compliance: key updates for 2024',
      teaser:
        'A practical overview of recent RBI circulars and compliance priorities for NBFCs operating across lending and co-lending models.',
      body: '<p>NBFCs must stay aligned with evolving RBI norms on governance, outsourcing, and fair-practices code requirements.</p>',
      featuredImagePath: '/uploads/posts/1782715791290-phf-pics--e1777285998333.jpg',
      publishedAt: new Date('2024-06-05'),
      categoryId: complianceCat?.id,
    },
    {
      slug: 'labour-law-amendments-india',
      title: 'Labour law amendments: what employers should review now',
      teaser:
        'From wage codes to industrial relations reforms, employers should reassess contracts, policies, and dispute-prevention frameworks.',
      body: '<p>Industrial and labour law changes continue to reshape employer obligations across India.</p>',
      featuredImagePath: '/uploads/posts/1782713182380-JS-bhasin-e1777285246665.jpg',
      publishedAt: new Date('2024-05-12'),
      categoryId: industryCat?.id,
    },
    {
      slug: 'intellectual-property-rights-startups',
      title: 'Intellectual property rights for growing businesses',
      teaser:
        'Protect trademarks, copyrights, and trade secrets early to avoid costly disputes as your brand and product portfolio expand.',
      body: '<p>IP strategy should align with business growth, licensing, and enforcement priorities.</p>',
      featuredImagePath: '/uploads/posts/1782711889186-Wishey-Katariaa-new.jpg',
      publishedAt: new Date('2024-04-18'),
      categoryId: corporateCat?.id,
    },
    {
      slug: 'joint-venture-legal-checklist',
      title: 'Joint venture legal checklist before you sign',
      teaser:
        'Governance, exit rights, dispute resolution, and regulatory approvals should be mapped before partners commit capital and operations.',
      body: '<p>Structured due diligence reduces downstream friction in joint venture arrangements.</p>',
      featuredImagePath: '/uploads/posts/1782715840129-Yogesh-Bochiwal-e1777285579613.jpg',
      publishedAt: new Date('2024-03-22'),
      categoryId: corporateCat?.id,
    },
    {
      slug: 'welcome-blog-post',
      title: 'Welcome to the new DSB Law Group website',
      teaser:
        'Our platform upgrade is underway — blogs, articles, and legal updates remain fully public while we expand premium content.',
      body: '<p>This is a sample public blog post stored in MySQL.</p>',
      featuredImagePath: '/uploads/posts/1782712997039-Adv_gulshan.jpg',
      publishedAt: new Date('2024-02-10'),
      categoryId: complianceCat?.id,
    },
  ] as const;

  for (const post of blogSeedPosts) {
    const saved = await prisma.post.upsert({
      where: { slug: post.slug },
      update: {
        title: post.title,
        teaser: post.teaser,
        body: post.body,
        featuredImagePath: post.featuredImagePath,
        published: true,
        publishedAt: post.publishedAt,
        type: 'BLOG',
        visibility: 'PUBLIC',
      },
      create: {
        slug: post.slug,
        title: post.title,
        teaser: post.teaser,
        body: post.body,
        featuredImagePath: post.featuredImagePath,
        type: 'BLOG',
        visibility: 'PUBLIC',
        published: true,
        publishedAt: post.publishedAt,
        metaKeywords: 'DSB Law, legal updates, blog',
      },
    });

    if (post.categoryId) {
      await prisma.postCategory.upsert({
        where: { postId_categoryId: { postId: saved.id, categoryId: post.categoryId } },
        update: {},
        create: { postId: saved.id, categoryId: post.categoryId },
      });
    }
  }

  await prisma.post.upsert({
    where: { slug: 'premium-insight-sample' },
    update: {},
    create: {
      slug: 'premium-insight-sample',
      title: 'Premium compliance insight (sample)',
      teaser: 'Teaser visible to everyone. Full analysis requires login.',
      body: '<p>Full premium article body — only shown after authentication.</p>',
      type: 'ARTICLE',
      visibility: 'PREMIUM',
      published: true,
      publishedAt: new Date(),
    },
  });

  for (const member of TEAM_SEED_MEMBERS) {
    await prisma.teamMember.upsert({
      where: { id: member.id },
      update: teamSeedPayload(member),
      create: { id: member.id, ...teamSeedPayload(member) },
    });
  }

  const faqCat = await prisma.faqCategory.upsert({
    where: { id: 'seed-faq-general' },
    update: { name: 'General', sortOrder: 0 },
    create: { id: 'seed-faq-general', name: 'General', sortOrder: 0 },
  });

  await prisma.faqItem.upsert({
    where: { id: 'seed-faq-1' },
    update: {},
    create: {
      id: 'seed-faq-1',
      categoryId: faqCat.id,
      question: 'How do I subscribe to newsletters?',
      answer: 'Use the subscription popup or register an account and set preferences under My Account.',
      sortOrder: 0,
      published: true,
    },
  });

  await prisma.office.upsert({
    where: { id: 'seed-office-main' },
    update: {},
    create: {
      id: 'seed-office-main',
      name: 'Head Office',
      address: 'DSB Law Group\nNew Delhi, India',
      phone: '+91-00000-00000',
      email: 'info@dsblaw.local',
      mapUrl: 'https://maps.google.com',
      sortOrder: 0,
      published: true,
    },
  });

  for (const [index, video] of VIDEO_TESTIMONIALS.entries()) {
    const id = `seed-video-testimonial-${index + 1}`;
    await prisma.videoTestimonial.upsert({
      where: { id },
      update: {
        title: video.title,
        embedUrl: video.embedUrl,
        sortOrder: index,
        published: true,
      },
      create: {
        id,
        title: video.title,
        embedUrl: video.embedUrl,
        sortOrder: index,
        published: true,
      },
    });
  }

  for (const [index, review] of TEXT_TESTIMONIALS.entries()) {
    const id = `seed-text-testimonial-${index + 1}`;
    await prisma.textTestimonial.upsert({
      where: { id },
      update: {
        quote: review.quote,
        name: review.name,
        role: review.role,
        sortOrder: index,
        published: true,
      },
      create: {
        id,
        quote: review.quote,
        name: review.name,
        role: review.role,
        sortOrder: index,
        published: true,
      },
    });
  }

  console.log('Seed complete.');
  console.log(`Admin login: ${adminEmail} / ${adminPassword}`);
  console.log(`CMS pages seeded: ${CMS_PAGES.length} (including ${SERVICE_CATEGORY_PAGES.length} service practice areas)`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
