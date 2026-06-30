import { NextResponse } from 'next/server';
import { z } from 'zod';
import { checkSubscriberEmailAction } from '@/lib/subscription/actions';

export async function POST(request: Request) {
  try {
    const { email } = z.object({ email: z.string().email() }).parse(await request.json());
    const result = await checkSubscriberEmailAction(email);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid email address.' }, { status: 400 });
  }
}
