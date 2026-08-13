import { z } from 'zod';
import { joinParagraphs, splitLines, splitParagraphs } from '@/lib/site/about-page-json';

export const NBFC_PAGE_BODY_PLACEHOLDER =
  '<p>NBFC page content is managed in the structured editor below.</p>';

export const nbfcPageJsonSchema = z.object({
  template: z.literal('nbfc'),
  version: z.literal(1),
  heroTitle: z.string().min(1).max(200),
  introHeading: z.string().min(1).max(300),
  introParagraphs: z.array(z.string().min(1).max(5000)).min(1).max(12),
  servicesHeading: z.string().min(1).max(200),
  servicesIntro: z.string().max(5000).optional().or(z.literal('')),
  servicesBullets: z.array(z.string().min(1).max(300)).min(1).max(30),
  closingHeading: z.string().min(1).max(300),
  closingParagraphs: z.array(z.string().min(1).max(5000)).min(1).max(8),
  ctaHeading: z.string().min(1).max(300),
  ctaText: z.string().min(1).max(2000),
});

export type NbfcPageJson = z.infer<typeof nbfcPageJsonSchema>;

export function defaultNbfcPageJson(): NbfcPageJson {
  return {
    template: 'nbfc',
    version: 1,
    heroTitle: 'NBFC Advisory',
    introHeading: 'Comprehensive NBFC Advisory Under One Roof',
    introParagraphs: [
      'DSB Law Group provides comprehensive advisory support to Non-Banking Financial Companies across their complete business lifecycle, from incorporation and RBI registration to ongoing compliance, restructuring and strategic growth.',
      'Our multidisciplinary team combines legal, financial, taxation and company secretarial expertise to help promoters, investors and management navigate the regulatory framework applicable to NBFCs, including the Reserve Bank of India Act, 1934 and relevant RBI directions.',
      'Whether you are establishing a new NBFC, restructuring an existing entity, applying for a Certificate of Registration, seeking approval for a specialised business model or responding to an RBI inspection, we provide practical, precise and commercially aligned support at every stage.',
    ],
    servicesHeading: 'Our NBFC Services',
    servicesIntro: '',
    servicesBullets: [
      'Incorporation and registration of NBFCs',
      'RBI licensing and Certificate of Registration support',
      'Product-based and business model advisory',
      'Regulatory and compliance advisory',
      'Company secretarial and governance support',
      'Structuring of financial instruments',
      'Drafting and review of business and legal documents',
      'Legal, accounting and taxation advisory',
      'Training and capacity-building programmes',
      'Legal and commercial due diligence',
      'Strategic business and growth advisory',
    ],
    closingHeading: 'End-to-End Regulatory Support',
    closingParagraphs: [
      'Our approach extends beyond obtaining approvals. We help NBFCs establish strong compliance systems, improve governance, manage regulatory risk and build a sustainable foundation for long-term growth.',
    ],
    ctaHeading: 'Need help with NBFC advisory?',
    ctaText:
      'Connect with DSB Law Group to discuss licensing, compliance, restructuring or strategic requirements for your NBFC.',
  };
}

export function parseNbfcPageJson(value: unknown): NbfcPageJson | null {
  const parsed = nbfcPageJsonSchema.safeParse(value);
  return parsed.success ? parsed.data : null;
}

export function parseNbfcPageForm(formData: FormData): NbfcPageJson {
  return nbfcPageJsonSchema.parse({
    template: 'nbfc',
    version: 1,
    heroTitle: String(formData.get('heroTitle') ?? '').trim(),
    introHeading: String(formData.get('introHeading') ?? '').trim(),
    introParagraphs: splitParagraphs(String(formData.get('introParagraphs') ?? '')),
    servicesHeading: String(formData.get('servicesHeading') ?? '').trim(),
    servicesIntro: String(formData.get('servicesIntro') ?? '').trim(),
    servicesBullets: splitLines(String(formData.get('servicesBullets') ?? '')),
    closingHeading: String(formData.get('closingHeading') ?? '').trim(),
    closingParagraphs: splitParagraphs(String(formData.get('closingParagraphs') ?? '')),
    ctaHeading: String(formData.get('ctaHeading') ?? '').trim(),
    ctaText: String(formData.get('ctaText') ?? '').trim(),
  });
}

export function resolveNbfcJsonFromPage(page: {
  contentJson: unknown;
  title: string;
  metaTitle: string | null;
} | null): NbfcPageJson {
  if (page) {
    const parsed = parseNbfcPageJson(page.contentJson);
    if (parsed) return parsed;
    const defaults = defaultNbfcPageJson();
    return {
      ...defaults,
      heroTitle: page.metaTitle?.trim() || page.title.trim() || defaults.heroTitle,
    };
  }
  return defaultNbfcPageJson();
}

export { joinParagraphs };
