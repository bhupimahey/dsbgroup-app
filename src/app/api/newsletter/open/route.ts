import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const newsletterId = searchParams.get('newsletterId');
  const email = searchParams.get('email');

  if (newsletterId && email) {
    await prisma.newsletterSend.updateMany({
      where: { newsletterId, recipient: email, openedAt: null },
      data: { openedAt: new Date() },
    });
  }

  const pixel = Buffer.from(
    'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    'base64',
  );
  return new NextResponse(pixel, {
    headers: { 'Content-Type': 'image/gif', 'Cache-Control': 'no-store' },
  });
}
