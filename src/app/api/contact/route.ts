import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';

const contactSchema = z.object({
  name:    z.string().min(2).max(120),
  email:   z.string().email().max(200),
  phone:   z.string().max(40).optional().or(z.literal('')),
  message: z.string().min(10).max(5000),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const data = contactSchema.parse(json);

    await prisma.contactLead.create({
      data: {
        name:    data.name.trim(),
        email:   data.email.trim().toLowerCase(),
        phone:   data.phone?.trim() || null,
        message: data.message.trim(),
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ ok: false, error: 'Invalid form data' }, { status: 400 });
    }
    console.error('Contact form error:', error);
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}
