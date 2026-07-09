'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { revalidateOfficesCache } from '@/lib/db/revalidate-public';
import { requireStaff } from '@/lib/admin/require-staff';
import { officeSchema } from '@/lib/validations/cms';

function parseOfficeForm(formData: FormData) {
  return officeSchema.parse({
    name: String(formData.get('name') ?? '').trim(),
    address: String(formData.get('address') ?? '').trim(),
    phone: String(formData.get('phone') ?? ''),
    email: String(formData.get('email') ?? ''),
    mapUrl: String(formData.get('mapUrl') ?? ''),
    sortOrder: formData.get('sortOrder') || 0,
    published: formData.get('published') === 'on',
  });
}

export async function createOfficeAction(formData: FormData) {
  await requireStaff();
  const data = parseOfficeForm(formData);
  await prisma.office.create({
    data: {
      name: data.name,
      address: data.address,
      phone: data.phone || null,
      email: data.email || null,
      mapUrl: data.mapUrl || null,
      sortOrder: data.sortOrder ?? 0,
      published: data.published ?? true,
    },
  });
  revalidatePath('/admin/offices');
  revalidatePath('/offices');
  revalidateOfficesCache();
  redirect('/admin/offices');
}

export async function updateOfficeAction(id: string, formData: FormData) {
  await requireStaff();
  const data = parseOfficeForm(formData);
  await prisma.office.update({
    where: { id },
    data: {
      name: data.name,
      address: data.address,
      phone: data.phone || null,
      email: data.email || null,
      mapUrl: data.mapUrl || null,
      sortOrder: data.sortOrder ?? 0,
      published: data.published ?? true,
    },
  });
  revalidatePath('/admin/offices');
  revalidatePath('/offices');
  revalidateOfficesCache();
  redirect('/admin/offices');
}

export async function deleteOfficeAction(id: string) {
  await requireStaff();
  await prisma.office.delete({ where: { id } });
  revalidatePath('/admin/offices');
  revalidatePath('/offices');
  revalidateOfficesCache();
  redirect('/admin/offices');
}
