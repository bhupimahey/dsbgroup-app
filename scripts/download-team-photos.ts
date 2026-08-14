import { createWriteStream } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import { pipeline } from 'node:stream/promises';
import path from 'node:path';
import { TEAM_PHOTO_SOURCES } from '../src/lib/team/team-photos';

const DEST_DIR = path.join(process.cwd(), 'public', 'uploads', 'team');

async function download(url: string, dest: string) {
  const response = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; DSBLawGroup-import/1.0)' },
    redirect: 'follow',
  });
  if (!response.ok || !response.body) {
    throw new Error(`${response.status} ${response.statusText} for ${url}`);
  }
  await pipeline(response.body, createWriteStream(dest));
}

async function main() {
  await mkdir(DEST_DIR, { recursive: true });

  for (const photo of TEAM_PHOTO_SOURCES) {
    const dest = path.join(DEST_DIR, photo.file);
    process.stdout.write(`Downloading ${photo.file}… `);
    await download(photo.url, dest);
    console.log('ok');
  }

  console.log(`Saved ${TEAM_PHOTO_SOURCES.length} team photos to public/uploads/team`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
