'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { requireStaff } from '@/lib/admin/require-staff';
import { parseNewsletterFormData } from '@/lib/admin/newsletter-form';
import { enqueueNewsletterSend } from '@/lib/queue/newsletter-queue';

function revalidateNewsletterPaths(slug?: string) {
  revalidatePath('/admin/newsletters');
  revalidatePath('/newsletters');
  if (slug) revalidatePath(`/newsletters/${slug}`);
}

export async function createNewsletterAction(formData: FormData) {
  await requireStaff();
  const data = parseNewsletterFormData(formData);

  const newsletter = await prisma.newsletter.create({
    data: {
      slug: data.slug,
      subject: data.subject,
      teaser: data.teaser,
      bodyHtml: data.bodyHtml,
      issueNumber: data.issueNumber,
      issueDate: data.issueDate,
      pdfPath: data.pdfPath,
      coverImagePath: data.coverImagePath,
      published: data.published ?? false,
      status: 'DRAFT',
      tags: {
        create: data.serviceCategoryIds.map((serviceCategoryId) => ({ serviceCategoryId })),
      },
    },
  });

  revalidateNewsletterPaths(newsletter.slug);
  redirect(`/admin/newsletters/${newsletter.id}/edit`);
}

export async function updateNewsletterAction(id: string, formData: FormData) {
  await requireStaff();
  const data = parseNewsletterFormData(formData);

  await prisma.newsletterServiceTag.deleteMany({ where: { newsletterId: id } });
  const newsletter = await prisma.newsletter.update({
    where: { id },
    data: {
      slug: data.slug,
      subject: data.subject,
      teaser: data.teaser,
      bodyHtml: data.bodyHtml,
      issueNumber: data.issueNumber,
      issueDate: data.issueDate,
      pdfPath: data.pdfPath,
      coverImagePath: data.coverImagePath,
      published: data.published ?? false,
      tags: {
        create: data.serviceCategoryIds.map((serviceCategoryId) => ({ serviceCategoryId })),
      },
    },
  });

  revalidateNewsletterPaths(newsletter.slug);
  redirect('/admin/newsletters');
}

export async function queueNewsletterAction(id: string) {
  await requireStaff();
  const newsletter = await prisma.newsletter.update({
    where: { id },
    data: { status: 'QUEUED' },
  });
  await enqueueNewsletterSend(id);
  revalidateNewsletterPaths(newsletter.slug);
  redirect('/admin/newsletters');
}

export async function deleteNewsletterAction(id: string) {
  await requireStaff();
  const newsletter = await prisma.newsletter.findUnique({ where: { id }, select: { slug: true } });
  await prisma.newsletter.delete({ where: { id } });
  revalidateNewsletterPaths(newsletter?.slug);
  redirect('/admin/newsletters');
}
