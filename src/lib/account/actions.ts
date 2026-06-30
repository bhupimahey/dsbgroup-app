'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth, signOut } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { preferencesSchema } from '@/lib/validations/cms';

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
  redirect('/account?saved=1');
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
