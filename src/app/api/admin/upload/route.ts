import { NextResponse } from 'next/server';

import { writeFile, mkdir } from 'node:fs/promises';

import path from 'node:path';

import { auth } from '@/lib/auth';

import { isStaffRole } from '@/lib/auth-utils';



const MAX_BYTES = 15 * 1024 * 1024;



const UPLOAD_DIRS: Record<string, string> = {
  pdf: 'newsletters',
  image: '',
  'page-image': 'pages',
  'post-image': 'posts',
  'team-image': 'team',
  'faq-image': 'faq',
  'newsletter-image': 'newsletters',
};



export async function POST(request: Request) {

  const session = await auth();

  if (!session?.user || !isStaffRole(session.user.role)) {

    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  }



  const formData = await request.formData();

  const file = formData.get('file');

  const kind = String(formData.get('kind') ?? 'file');



  if (!(file instanceof File)) {

    return NextResponse.json({ error: 'No file' }, { status: 400 });

  }



  if (file.size > MAX_BYTES) {

    return NextResponse.json({ error: 'File must be 15 MB or smaller.' }, { status: 400 });

  }



  const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');

  const isImage = file.type.startsWith('image/');



  if (kind === 'pdf' && !isPdf) {

    return NextResponse.json({ error: 'Please upload a PDF file.' }, { status: 400 });

  }



  if ((kind === 'image' || kind === 'page-image' || kind === 'post-image' || kind === 'team-image' || kind === 'faq-image' || kind === 'newsletter-image') && !isImage) {

    return NextResponse.json({ error: 'Please upload an image file.' }, { status: 400 });

  }



  const bytes = await file.arrayBuffer();

  const buffer = Buffer.from(bytes);

  const subdir = UPLOAD_DIRS[kind] ?? '';

  const uploadsDir = subdir

    ? path.join(process.cwd(), 'public', 'uploads', subdir)

    : path.join(process.cwd(), 'public', 'uploads');

  await mkdir(uploadsDir, { recursive: true });



  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-');

  const filename = `${Date.now()}-${safeName}`;

  await writeFile(path.join(uploadsDir, filename), buffer);



  const publicPath = subdir ? `/uploads/${subdir}/${filename}` : `/uploads/${filename}`;

  return NextResponse.json({ path: publicPath });

}

