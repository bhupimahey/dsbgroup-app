import 'dotenv/config';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createPrismaClient } from '../src/lib/prisma-client';
import { slugify } from '../src/lib/slug';
import { isPage, isPost, isPublished, parseWxr } from './lib/wxr-parser';

const prisma = createPrismaClient();

type RedirectRule = { from: string; to: string };

function wpPathFromLink(link: string): string | null {
  try {
    const url = new URL(link);
    return url.pathname.replace(/\/$/, '') || '/';
  } catch {
    return null;
  }
}

function nextPathForItem(item: ReturnType<typeof parseWxr>[number]): string {
  if (isPage(item)) {
    return item.slug === 'about' ? '/about' : `/pages/${item.slug}`;
  }
  return `/blog/${item.slug}`;
}

async function main() {
  const wxrPath = process.argv[2];
  if (!wxrPath) {
    console.error('Usage: npm run migrate:wordpress -- path/to/export.xml [--dry-run]');
    process.exit(1);
  }

  const dryRun = process.argv.includes('--dry-run');
  const absolutePath = resolve(wxrPath);
  const xml = readFileSync(absolutePath, 'utf8');
  const items = parseWxr(xml);

  const redirects: RedirectRule[] = [];
  let pages = 0;
  let posts = 0;
  let skipped = 0;

  for (const item of items) {
    if (!isPublished(item)) {
      skipped += 1;
      continue;
    }

    const slug = item.slug || slugify(item.title);
    const oldPath = item.link ? wpPathFromLink(item.link) : null;
    const newPath = nextPathForItem({ ...item, slug });

    if (oldPath && oldPath !== newPath) {
      redirects.push({ from: oldPath, to: newPath });
    }

    if (isPage(item)) {
      pages += 1;
      if (!dryRun) {
        await prisma.page.upsert({
          where: { slug },
          update: {
            title: item.title,
            body: item.content || '<p></p>',
            published: true,
            metaDescription: item.excerpt || null,
          },
          create: {
            slug,
            title: item.title,
            body: item.content || '<p></p>',
            published: true,
            metaDescription: item.excerpt || null,
          },
        });
      }
      continue;
    }

    if (isPost(item)) {
      posts += 1;
      if (!dryRun) {
        await prisma.post.upsert({
          where: { slug },
          update: {
            title: item.title,
            teaser: item.excerpt || item.title,
            body: item.content || '<p></p>',
            type: 'BLOG',
            visibility: 'PUBLIC',
            published: true,
            publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
          },
          create: {
            slug,
            title: item.title,
            teaser: item.excerpt || item.title,
            body: item.content || '<p></p>',
            type: 'BLOG',
            visibility: 'PUBLIC',
            published: true,
            publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
          },
        });
      }
      continue;
    }

    skipped += 1;
  }

  const redirectsPath = resolve('scripts/output/wordpress-redirects.json');
  if (!dryRun) {
    writeFileSync(redirectsPath, JSON.stringify(redirects, null, 2));
  }

  console.log(`WXR file: ${absolutePath}`);
  console.log(`Mode: ${dryRun ? 'dry-run' : 'import'}`);
  console.log(`Pages imported: ${pages}`);
  console.log(`Blog posts imported: ${posts}`);
  console.log(`Skipped items: ${skipped}`);
  if (!dryRun) {
    console.log(`Redirect map written to ${redirectsPath}`);
    console.log('Configure nginx/Next.js rewrites using this JSON for 301 redirects.');
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
