import { slugify } from '@/lib/slug';
import { newsletterSchema } from '@/lib/validations/cms';

export function parseNewsletterFormData(formData: FormData) {
  const subject = String(formData.get('subject') ?? '').trim();
  const slugInput = String(formData.get('slug') ?? '').trim();
  const bodyHtml = String(formData.get('bodyHtml') ?? '').trim();
  const pdfPath = String(formData.get('pdfPath') ?? '').trim();
  const issueDateRaw = String(formData.get('issueDate') ?? '').trim();

  const parsed = newsletterSchema.parse({
    slug: slugInput || slugify(subject),
    subject,
    teaser: String(formData.get('teaser') ?? '').trim(),
    bodyHtml: bodyHtml || (pdfPath ? '<p>Our latest newsletter issue is now available. Open the PDF to read the full edition.</p>' : ''),
    issueNumber: String(formData.get('issueNumber') ?? '').trim(),
    issueDate: issueDateRaw,
    pdfPath,
    coverImagePath: String(formData.get('coverImagePath') ?? '').trim(),
    published: formData.get('published') === 'on',
    serviceCategoryIds: formData.getAll('serviceCategoryIds').map(String),
  });

  return {
    ...parsed,
    bodyHtml: parsed.bodyHtml ?? '',
    issueDate: parsed.issueDate ? new Date(parsed.issueDate) : null,
    teaser: parsed.teaser || null,
    pdfPath: parsed.pdfPath || null,
    coverImagePath: parsed.coverImagePath || null,
    issueNumber: parsed.issueNumber || null,
  };
}
