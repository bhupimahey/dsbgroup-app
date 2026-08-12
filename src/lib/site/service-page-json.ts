import { z } from 'zod';
import { joinParagraphs, splitLines, splitParagraphs } from '@/lib/site/about-page-json';

export const SERVICE_PAGE_BODY_PLACEHOLDER =
  '<p>Service page content is managed in the structured editor below.</p>';

export const SERVICES_INDEX_BODY_PLACEHOLDER =
  '<p>Services index content is managed in the structured editor below.</p>';

export const serviceApproachCardSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(2000),
  href: z.string().max(500).optional(),
});

export const serviceDetailJsonSchema = z.object({
  template: z.literal('service-detail'),
  version: z.literal(1),
  cardTeaser: z.string().min(1).max(500),
  introParagraphs: z.array(z.string().min(1).max(5000)).min(1).max(8),
  secondaryHeading: z.string().min(1).max(300),
  secondaryParagraph: z.string().min(1).max(5000),
  approachCards: z.array(serviceApproachCardSchema).length(2),
  benefitsHeading: z.string().min(1).max(300),
  benefitsIntro: z.string().min(1).max(5000),
  benefitBullets: z.array(z.string().min(1).max(300)).min(1).max(12),
  benefitsClosing: z.string().min(1).max(5000),
  brochureText: z.string().max(500).optional(),
  brochurePdfUrl: z.string().max(500).optional(),
  brochureDocUrl: z.string().max(500).optional(),
});

export const servicesIndexJsonSchema = z.object({
  template: z.literal('services-index'),
  version: z.literal(1),
  heroTitle: z.string().min(1).max(200),
  sectionHeading: z.string().min(1).max(400),
});

export type ServiceDetailJson = z.infer<typeof serviceDetailJsonSchema>;
export type ServicesIndexJson = z.infer<typeof servicesIndexJsonSchema>;

export const SERVICE_CARD_IMAGES = [
  '/images/theme/services/sections/servicev1img1.png',
  '/images/theme/services/sections/servicev1img2.png',
  '/images/theme/services/sections/servicev1img3.png',
  '/images/theme/services/sections/servicev1img4.png',
] as const;

export const DEFAULT_SERVICE_DETAIL_IMAGE = '/images/theme/services/sections/servicedeailsimg1.png';

export function defaultServicesIndexJson(): ServicesIndexJson {
  return {
    template: 'services-index',
    version: 1,
    heroTitle: 'Our Services',
    sectionHeading:
      'Integrated Legal, Regulatory, Financial And Business Advisory Services For Growing Organisations',
  };
}

export function defaultServiceDetailJson(name: string, bullets: string[] = []): ServiceDetailJson {
  const intro =
    bullets.length > 0
      ? `DSB Law Group provides expert ${name.toLowerCase()} advisory — helping clients manage compliance, documentation, and strategic decisions with practical, commercially focused counsel.`
      : `DSB Law Group advises clients on ${name} — regulatory compliance, documentation, dispute resolution, and strategic counsel tailored to your business.`;

  const defaultBullets =
    bullets.length > 0
      ? bullets.slice(0, 6)
      : [
          'Regulatory compliance and documentation',
          'Strategic advisory and risk management',
          'Representation before authorities and tribunals',
          'Commercially focused legal solutions',
        ];

  return {
    template: 'service-detail',
    version: 1,
    cardTeaser: intro,
    introParagraphs: [
      intro,
      'Our multidisciplinary team combines legal, financial and regulatory expertise to deliver end-to-end support under one roof.',
    ],
    secondaryHeading: `Why Choose DSB Law Group For ${name}`,
    secondaryParagraph:
      'We take the time to understand your business objectives before recommending solutions. Our focus is on delivering high-quality advice, timely execution and measurable value.',
    approachCards: [
      {
        title: 'Regulatory Expertise',
        description:
          'Deep knowledge of applicable laws, RBI directions, and sector regulations to keep your business compliant and audit-ready.',
      },
      {
        title: 'Client-Centric Approach',
        description:
          'We work collaboratively as long-term partners — providing practical guidance aligned with your commercial goals.',
      },
    ],
    benefitsHeading: `Key ${name} Services`,
    benefitsIntro:
      'Our team supports organisations at every stage — from initial structuring and approvals to ongoing compliance and complex transactions.',
    benefitBullets: defaultBullets,
    benefitsClosing:
      'Connect with DSB Law Group to discuss your requirements and receive tailored advisory support from experienced professionals.',
    brochureText: 'Download our service overview or speak with our consultants for detailed guidance.',
  };
}

export function parseServiceDetailJson(value: unknown): ServiceDetailJson | null {
  const parsed = serviceDetailJsonSchema.safeParse(value);
  return parsed.success ? parsed.data : null;
}

export function parseServicesIndexJson(value: unknown): ServicesIndexJson | null {
  const parsed = servicesIndexJsonSchema.safeParse(value);
  return parsed.success ? parsed.data : null;
}

export function parseServiceDetailForm(formData: FormData): ServiceDetailJson {
  return serviceDetailJsonSchema.parse({
    template: 'service-detail',
    version: 1,
    cardTeaser: String(formData.get('cardTeaser') ?? '').trim(),
    introParagraphs: splitParagraphs(String(formData.get('introParagraphs') ?? '')),
    secondaryHeading: String(formData.get('secondaryHeading') ?? '').trim(),
    secondaryParagraph: String(formData.get('secondaryParagraph') ?? '').trim(),
    approachCards: [0, 1].map((index) => ({
      title: String(formData.get(`approach${index + 1}Title`) ?? '').trim(),
      description: String(formData.get(`approach${index + 1}Description`) ?? '').trim(),
      href: String(formData.get(`approach${index + 1}Href`) ?? '').trim() || undefined,
    })),
    benefitsHeading: String(formData.get('benefitsHeading') ?? '').trim(),
    benefitsIntro: String(formData.get('benefitsIntro') ?? '').trim(),
    benefitBullets: splitLines(String(formData.get('benefitBullets') ?? '')),
    benefitsClosing: String(formData.get('benefitsClosing') ?? '').trim(),
    brochureText: String(formData.get('brochureText') ?? '').trim() || undefined,
    brochurePdfUrl: String(formData.get('brochurePdfUrl') ?? '').trim() || undefined,
    brochureDocUrl: String(formData.get('brochureDocUrl') ?? '').trim() || undefined,
  });
}

export function parseServicesIndexForm(formData: FormData): ServicesIndexJson {
  return servicesIndexJsonSchema.parse({
    template: 'services-index',
    version: 1,
    heroTitle: String(formData.get('heroTitle') ?? '').trim(),
    sectionHeading: String(formData.get('sectionHeading') ?? '').trim(),
  });
}

export function resolveServiceDetailJson(page: {
  contentJson: unknown;
  title: string;
  body: string;
}): ServiceDetailJson {
  const fromJson = parseServiceDetailJson(page.contentJson);
  if (fromJson) {
    return fromJson;
  }

  return defaultServiceDetailJson(page.title);
}

export function resolveServicesIndexJson(page: {
  contentJson: unknown;
  metaTitle: string | null;
  title: string;
} | null): ServicesIndexJson {
  if (page) {
    const fromJson = parseServicesIndexJson(page.contentJson);
    if (fromJson) {
      return fromJson;
    }
  }

  return defaultServicesIndexJson();
}
