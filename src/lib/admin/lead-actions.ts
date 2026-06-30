'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { requireStaff } from '@/lib/admin/require-staff';

export async function markLeadHandledFormAction(formData: FormData) {
  await requireStaff();
  const id = String(formData.get('leadId') ?? '').trim();
  const handled = formData.get('handled') === 'true';
  if (!id) return;

  await prisma.contactLead.update({
    where: { id },
    data: { handled, handledAt: handled ? new Date() : null },
  });
  revalidatePath('/admin/leads');
}

export async function deleteLeadAction(id: string) {
  await requireStaff();
  await prisma.contactLead.delete({ where: { id } });
  revalidatePath('/admin/leads');
  redirect('/admin/leads');
}

export async function deleteLeadFormAction(formData: FormData) {
  const id = String(formData.get('leadId') ?? '').trim();
  if (!id) return;
  await deleteLeadAction(id);
}
