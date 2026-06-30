'use server';

import bcrypt from 'bcryptjs';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/admin/require-admin';
import { requireStaff } from '@/lib/admin/require-staff';
import { staffUserSchema } from '@/lib/validations/cms';

function revalidateStaffPaths() {
  revalidatePath('/admin/staff');
}

export async function createStaffAction(formData: FormData) {
  await requireAdmin();
  const data = staffUserSchema.parse({
    name: String(formData.get('name') ?? '').trim(),
    email: String(formData.get('email') ?? '').trim().toLowerCase(),
    role: String(formData.get('role') ?? 'EDITOR'),
    active: formData.get('active') === 'on',
  });
  const tempPassword = String(formData.get('password') ?? '').trim();
  if (tempPassword.length < 8) {
    throw new Error('Password must be at least 8 characters.');
  }

  const passwordHash = await bcrypt.hash(tempPassword, 12);
  await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      passwordHash,
      role: data.role,
      active: data.active ?? true,
      emailVerified: new Date(),
    },
  });

  revalidateStaffPaths();
  redirect('/admin/staff');
}

export async function updateStaffAction(id: string, formData: FormData) {
  await requireAdmin();
  const data = staffUserSchema.parse({
    name: String(formData.get('name') ?? '').trim(),
    email: String(formData.get('email') ?? '').trim().toLowerCase(),
    role: String(formData.get('role') ?? 'EDITOR'),
    active: formData.get('active') === 'on',
  });

  await prisma.user.update({
    where: { id },
    data: {
      name: data.name,
      email: data.email,
      role: data.role,
      active: data.active ?? true,
    },
  });

  revalidateStaffPaths();
  redirect('/admin/staff');
}

export async function toggleUserActiveFormAction(formData: FormData) {
  await requireStaff();
  const id = String(formData.get('userId') ?? '').trim();
  const active = formData.get('active') === 'true';
  if (!id) return;

  await prisma.user.update({ where: { id, role: 'USER' }, data: { active } });
  revalidatePath('/admin/users');
}

export async function deleteStaffAction(id: string) {
  const session = await requireAdmin();
  if (session.user.id === id) {
    redirect('/admin/staff');
  }

  const user = await prisma.user.findUnique({ where: { id } });
  if (!user || user.role === 'USER') return;
  await prisma.user.delete({ where: { id } });
  revalidateStaffPaths();
  redirect('/admin/staff');
}

export async function deleteStaffFormAction(formData: FormData) {
  const id = String(formData.get('staffId') ?? '').trim();
  if (!id) return;
  await deleteStaffAction(id);
}
