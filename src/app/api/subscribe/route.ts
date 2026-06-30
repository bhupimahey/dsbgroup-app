import { NextResponse } from 'next/server';
import { z } from 'zod';
import { subscribeGuestAction } from '@/lib/subscription/actions';

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const schema = z.object({
      email: z.string().email(),
      frequency: z.enum(['WEEKLY', 'TWICE_WEEKLY', 'MONTHLY']),
      serviceCategoryIds: z.array(z.string()).min(1),
    });
    const data = schema.parse(json);

    const formData = new FormData();
    formData.set('email', data.email);
    formData.set('frequency', data.frequency);
    for (const id of data.serviceCategoryIds) {
      formData.append('serviceCategoryIds', id);
    }

    const result = await subscribeGuestAction(formData);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }
}
