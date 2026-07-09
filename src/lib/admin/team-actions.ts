'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { revalidateTeamCache } from '@/lib/db/revalidate-public';
import { requireStaff } from '@/lib/admin/require-staff';
import { ensureBioHtml } from '@/lib/team/bio-html';
import { teamTeaser } from '@/lib/team/constants';
import { teamSchema } from '@/lib/validations/cms';

function parseTeamForm(formData: FormData) {
  return teamSchema.parse({
    name: String(formData.get('name') ?? '').trim(),
    title: String(formData.get('title') ?? '').trim(),
    bio: String(formData.get('bio') ?? '').trim(),
    teaser: String(formData.get('teaser') ?? '').trim(),
    branch: String(formData.get('branch') ?? '').trim(),
    group: String(formData.get('group') ?? 'WHOLE_TIME_CONSULTANTS'),
    imagePath: String(formData.get('imagePath') ?? ''),
    phone: String(formData.get('phone') ?? '').trim(),
    email: String(formData.get('email') ?? '').trim(),
    sortOrder: formData.get('sortOrder') || 0,
    published: formData.get('published') === 'on',
  });
}

function teamData(data: ReturnType<typeof parseTeamForm>) {
  const bio = ensureBioHtml(data.bio);
  const teaser = data.teaser?.trim() || teamTeaser(bio);
  return {
    name: data.name,
    title: data.title,
    bio,
    teaser,
    branch: data.branch || null,
    group: data.group,
    imagePath: data.imagePath || null,
    phone: data.phone || null,
    email: data.email || null,
    sortOrder: data.sortOrder ?? 0,
    published: data.published ?? true,
  };
}

export async function createTeamAction(formData: FormData) {
  await requireStaff();
  const data = parseTeamForm(formData);
  await prisma.teamMember.create({ data: teamData(data) });
  revalidatePath('/admin/team');
  revalidatePath('/team');
  revalidateTeamCache();
  redirect('/admin/team');
}

export async function updateTeamAction(id: string, formData: FormData) {
  await requireStaff();
  const data = parseTeamForm(formData);
  await prisma.teamMember.update({ where: { id }, data: teamData(data) });
  revalidatePath('/admin/team');
  revalidatePath('/team');
  revalidateTeamCache();
  redirect('/admin/team');
}

export async function deleteTeamAction(id: string) {
  await requireStaff();
  await prisma.teamMember.delete({ where: { id } });
  revalidatePath('/admin/team');
  revalidatePath('/team');
  revalidateTeamCache();
  redirect('/admin/team');
}
