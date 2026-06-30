'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';
import { requireStaff } from '@/lib/admin/require-staff';

export async function toggleSubscriberActiveFormAction(formData: FormData) {
  await requireStaff();
  const id = String(formData.get('subscriberId') ?? '').trim();
  const active = formData.get('active') === 'true';
  if (!id) return;

  await prisma.subscriber.update({ where: { id }, data: { active } });
  revalidatePath('/admin/subscribers');
}
