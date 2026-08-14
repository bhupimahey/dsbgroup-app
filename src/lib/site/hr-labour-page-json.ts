import { z } from 'zod';
import { joinParagraphs, splitParagraphs } from '@/lib/site/about-page-json';

export const HR_LABOUR_PAGE_BODY_PLACEHOLDER =
  '<p>HR &amp; Labour Laws page content is managed in the structured editor below.</p>';

export const hrLabourServiceSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(2000),
});

export const hrLabourPageJsonSchema = z.object({
  template: z.literal('hr-labour'),
  version: z.literal(1),
  heroTitle: z.string().min(1).max(200),
  introHeading: z.string().min(1).max(300),
  introParagraphs: z.array(z.string().min(1).max(5000)).min(1).max(12),
  servicesHeading: z.string().min(1).max(200),
  servicesItems: z.array(hrLabourServiceSchema).min(1).max(12),
  closingParagraph: z.string().min(1).max(5000),
  ctaHeading: z.string().min(1).max(300),
  ctaText: z.string().min(1).max(2000),
});

export type HrLabourPageJson = z.infer<typeof hrLabourPageJsonSchema>;

export function defaultHrLabourPageJson(): HrLabourPageJson {
  return {
    template: 'hr-labour',
    version: 1,
    heroTitle: 'HR & Labour Laws',
    introHeading: 'We don’t just resolve labour issues. We help prevent them.',
    introParagraphs: [
      'Labour law compliance is increasingly important for business continuity, workforce stability and risk management. With India’s evolving labour law framework, organisations must regularly review their employment practices, wage structures, policies and statutory compliance systems.',
      'With a legacy of over six decades in labour law advisory, DSB Law Group assists businesses in developing practical and legally compliant workforce frameworks aligned with operational requirements.',
    ],
    servicesHeading: 'Our Key Services',
    servicesItems: [
      {
        title: 'Employment and HR Documentation',
        description:
          'Drafting and reviewing employment agreements, HR policies, employee handbooks and contractor arrangements.',
      },
      {
        title: 'Wage and Compensation Advisory',
        description:
          'Guidance on minimum wages, bonus, overtime, equal remuneration and compliant salary structuring.',
      },
      {
        title: 'Workforce Restructuring',
        description:
          'Advisory on retrenchment, closure, voluntary retirement schemes, mergers and workforce integration.',
      },
      {
        title: 'Social Security Compliance',
        description:
          'Support in matters relating to provident fund, ESI, gratuity, maternity benefits and multi-state compliance.',
      },
      {
        title: 'Labour Law Audits and Regulatory Support',
        description:
          'Compliance audits, due diligence, risk assessment, inspection support and responses to notices or penalties.',
      },
      {
        title: 'Industrial Relations and Dispute Resolution',
        description:
          'Advisory on employee relations, union matters, settlements, disciplinary proceedings and representation before labour authorities and courts.',
      },
      {
        title: 'Workplace Safety and POSH Compliance',
        description:
          'Assistance with workplace safety requirements, factory compliance, POSH policies, Internal Committee constitution and workplace investigations.',
      },
      {
        title: 'New-Age Workforce Advisory',
        description:
          'Guidance on gig workers, consultants, contractual employees and employee-versus-contractor classification.',
      },
    ],
    closingParagraph:
      'At DSB Law Group, we help organisations build stronger workplace systems, reduce compliance risks and manage their workforce with confidence.',
    ctaHeading: 'Need HR or labour law support?',
    ctaText:
      'Connect with DSB Law Group to discuss employment documentation, compliance, disputes or workforce structuring.',
  };
}

export function parseHrLabourPageJson(value: unknown): HrLabourPageJson | null {
  const parsed = hrLabourPageJsonSchema.safeParse(value);
  return parsed.success ? parsed.data : null;
}

export function parseHrLabourPageForm(formData: FormData): HrLabourPageJson {
  const servicesItems = Array.from({ length: 12 }, (_, index) => ({
    title: String(formData.get(`service${index}Title`) ?? '').trim(),
    description: String(formData.get(`service${index}Description`) ?? '').trim(),
  })).filter((item) => item.title && item.description);

  return hrLabourPageJsonSchema.parse({
    template: 'hr-labour',
    version: 1,
    heroTitle: String(formData.get('heroTitle') ?? '').trim(),
    introHeading: String(formData.get('introHeading') ?? '').trim(),
    introParagraphs: splitParagraphs(String(formData.get('introParagraphs') ?? '')),
    servicesHeading: String(formData.get('servicesHeading') ?? '').trim(),
    servicesItems,
    closingParagraph: String(formData.get('closingParagraph') ?? '').trim(),
    ctaHeading: String(formData.get('ctaHeading') ?? '').trim(),
    ctaText: String(formData.get('ctaText') ?? '').trim(),
  });
}

export function resolveHrLabourJsonFromPage(page: {
  contentJson: unknown;
  title: string;
  metaTitle: string | null;
} | null): HrLabourPageJson {
  if (page) {
    const parsed = parseHrLabourPageJson(page.contentJson);
    if (parsed) return parsed;
  }
  return defaultHrLabourPageJson();
}

export { joinParagraphs };
