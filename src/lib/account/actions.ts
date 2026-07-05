'use server';

import bcrypt from 'bcryptjs';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth, signOut } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { changePasswordSchema, preferencesSchema, profileSchema } from '@/lib/validations/cms';

export async function updateProfileAction(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) redirect('/login');

  const parsed = profileSchema.safeParse({
    name: String(formData.get('name') ?? ''),
  });

  if (!parsed.success) redirect('/account?error=profile');

  await prisma.user.update({
    where: { id: session.user.id },
    data: { name: parsed.data.name.trim() },
  });

  revalidatePath('/account');
  redirect('/account?saved=profile');
}

export async function changePasswordAction(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) redirect('/login');

  const parsed = changePasswordSchema.safeParse({
    currentPassword: String(formData.get('currentPassword') ?? ''),
    password: String(formData.get('password') ?? ''),
    confirmPassword: String(formData.get('confirmPassword') ?? ''),
  });

  if (!parsed.success) redirect('/account?error=password');

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user?.passwordHash) redirect('/account?error=password');

  const currentOk = await bcrypt.compare(parsed.data.currentPassword, user.passwordHash);
  if (!currentOk) redirect('/account?error=wrong-password');

  const passwordHash = await bcrypt.hash(parsed.data.password, 12);
  await prisma.user.update({
    where: { id: session.user.id },
    data: { passwordHash },
  });

  revalidatePath('/account');
  redirect('/account?saved=password');
}

export async function updatePreferencesAction(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) redirect('/login');

  const parsed = preferencesSchema.safeParse({
    frequency: String(formData.get('frequency') ?? 'WEEKLY'),
    serviceCategoryIds: formData.getAll('serviceCategoryIds').map(String),
  });

  if (!parsed.success) redirect('/account?error=preferences');

  await prisma.subscriptionPreference.deleteMany({ where: { userId: session.user.id } });
  await prisma.subscriptionPreference.createMany({
    data: parsed.data.serviceCategoryIds.map((serviceCategoryId) => ({
      userId: session.user.id,
      serviceCategoryId,
      frequency: parsed.data.frequency,
    })),
  });

  revalidatePath('/account');
  redirect('/account?saved=preferences');
}

export async function deactivateAccountAction() {
  const session = await auth();
  if (!session?.user?.id) redirect('/login');

  await prisma.user.update({
    where: { id: session.user.id },
    data: { active: false },
  });
  await prisma.subscriptionPreference.deleteMany({ where: { userId: session.user.id } });
  await signOut({ redirectTo: '/' });
}
