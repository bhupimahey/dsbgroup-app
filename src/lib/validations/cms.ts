import { z } from 'zod';

export const pageSchema = z.object({
  slug: z.string().min(1).max(120).regex(/^[a-z0-9-]+$/),
  title: z.string().min(1).max(200),
  body: z.string().min(1).max(500_000),
  metaTitle: z.string().max(200).optional().or(z.literal('')),
  metaDescription: z.string().max(500).optional().or(z.literal('')),
  metaKeywords: z.string().max(500).optional().or(z.literal('')),
  imagePath: z.string().max(500).optional().or(z.literal('')),
  published: z.coerce.boolean().optional(),
});

export const postSchema = z.object({
  slug: z.string().min(1).max(120).regex(/^[a-z0-9-]+$/),
  title: z.string().min(1).max(200),
  teaser: z.string().min(1).max(2000),
  body: z.string().min(1).max(500_000),
  type: z.enum(['BLOG', 'ARTICLE']),
  visibility: z.enum(['PUBLIC', 'PREMIUM']),
  metaTitle: z.string().max(200).optional().or(z.literal('')),
  metaDescription: z.string().max(500).optional().or(z.literal('')),
  metaKeywords: z.string().max(500).optional().or(z.literal('')),
  featuredImagePath: z.string().max(500).optional().or(z.literal('')),
  published: z.coerce.boolean().optional(),
});

export const teamSchema = z.object({
  name: z.string().min(1).max(120),
  title: z.string().min(1).max(200),
  bio: z.string().min(1).max(20_000),
  teaser: z.string().max(500).optional().or(z.literal('')),
  branch: z.string().max(120).optional().or(z.literal('')),
  group: z.enum([
    'MANAGING_PARTNERS_CEO',
    'PARTNERS_DIRECTORS',
    'SENIOR_WHOLE_TIME_CONSULTANTS',
    'WHOLE_TIME_CONSULTANTS',
    'EMPANELLED_ADVOCATES',
  ]),
  imagePath: z.string().max(500).optional().or(z.literal('')),
  phone: z.string().max(40).optional().or(z.literal('')),
  email: z.string().email().max(200).optional().or(z.literal('')),
  sortOrder: z.coerce.number().int().min(0).max(9999).optional(),
  published: z.coerce.boolean().optional(),
});

export const officeSchema = z.object({
  name: z.string().min(1).max(200),
  address: z.string().min(1).max(2000),
  phone: z.string().max(40).optional().or(z.literal('')),
  email: z.string().email().max(200).optional().or(z.literal('')),
  mapUrl: z.string().max(2000).optional().or(z.literal('')),
  sortOrder: z.coerce.number().int().min(0).max(9999).optional(),
  published: z.coerce.boolean().optional(),
});

export const faqCategorySchema = z.object({
  name: z.string().min(1).max(200),
  sortOrder: z.coerce.number().int().min(0).max(9999).optional(),
});

export const faqItemSchema = z.object({
  categoryId: z.string().min(1),
  question: z.string().min(1).max(500),
  answer: z.string().min(1).max(5000),
  sortOrder: z.coerce.number().int().min(0).max(9999).optional(),
  published: z.coerce.boolean().optional(),
});

export const videoTestimonialSchema = z.object({
  title: z.string().min(1).max(200),
  embedUrl: z.string().min(1).max(2000),
  sortOrder: z.coerce.number().int().min(0).max(9999).optional(),
  published: z.coerce.boolean().optional(),
});

export const textTestimonialSchema = z.object({
  quote: z.string().min(1).max(5000),
  name: z.string().min(1).max(120),
  role: z.string().min(1).max(200),
  imagePath: z.string().max(500).optional().or(z.literal('')),
  sortOrder: z.coerce.number().int().min(0).max(9999).optional(),
  published: z.coerce.boolean().optional(),
});

export const categorySchema = z.object({
  slug: z.string().min(1).max(120).regex(/^[a-z0-9-]+$/),
  name: z.string().min(1).max(200),
});

export const serviceCategorySchema = z.object({
  slug: z.string().min(1).max(120).regex(/^[a-z0-9-]+$/),
  name: z.string().min(1).max(200),
  sortOrder: z.coerce.number().int().min(0).max(9999).optional(),
  active: z.coerce.boolean().optional(),
});

export const staffUserSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(200),
  role: z.enum(['ADMIN', 'EDITOR']),
  active: z.coerce.boolean().optional(),
});

export const newsletterSchema = z
  .object({
    slug: z.string().min(1).max(120).regex(/^[a-z0-9-]+$/),
    subject: z.string().min(1).max(200),
    teaser: z.string().max(2000).optional().or(z.literal('')),
    bodyHtml: z.string().max(500_000).optional().or(z.literal('')),
    issueNumber: z.string().max(40).optional().or(z.literal('')),
    issueDate: z.string().optional().or(z.literal('')),
    pdfPath: z.string().max(500).optional().or(z.literal('')),
    coverImagePath: z.string().max(500).optional().or(z.literal('')),
    published: z.coerce.boolean().optional(),
    serviceCategoryIds: z.array(z.string()).min(1),
  })
  .refine((data) => data.bodyHtml?.trim() || data.pdfPath?.trim(), {
    message: 'Provide email body text or upload a PDF issue.',
    path: ['bodyHtml'],
  });

export const subscribeSchema = z.object({
  email: z.string().email().max(200),
  frequency: z.enum(['WEEKLY', 'TWICE_WEEKLY', 'MONTHLY']),
  serviceCategoryIds: z.array(z.string()).min(1),
});

export const preferencesSchema = z.object({
  frequency: z.enum(['WEEKLY', 'TWICE_WEEKLY', 'MONTHLY']),
  serviceCategoryIds: z.array(z.string()).min(1),
});

export const registerSchema = z
  .object({
    name: z.string().min(2).max(120),
    email: z.string().email().max(200),
    password: z.string().min(8).max(128),
    confirmPassword: z.string().min(8).max(128),
    subscribeNewsletter: z.enum(['on']).optional(),
    frequency: z.enum(['WEEKLY', 'TWICE_WEEKLY', 'MONTHLY']).optional(),
    serviceCategoryIds: z.array(z.string()).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
  .superRefine((data, ctx) => {
    if (data.subscribeNewsletter !== 'on') return;

    if (!data.serviceCategoryIds?.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Select at least one practice area for newsletter updates.',
        path: ['serviceCategoryIds'],
      });
    }
  });

export const resetRequestSchema = z.object({
  email: z.string().email().max(200),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1),
  password: z.string().min(8).max(128),
  confirmPassword: z.string().min(8).max(128),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const profileSchema = z.object({
  name: z.string().min(2).max(120),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1).max(128),
  password: z.string().min(8).max(128),
  confirmPassword: z.string().min(8).max(128),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});
