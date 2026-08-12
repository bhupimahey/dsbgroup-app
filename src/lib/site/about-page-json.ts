import { z } from 'zod';
import {
  DEFAULT_ABOUT_CONTENT,
  type AboutFeatureCard,
  type AboutPageContent,
  type AboutStat,
  type AboutTabPanel,
} from '@/lib/site/about-page-content';

export const ABOUT_PAGE_BODY_PLACEHOLDER =
  '<p>About page content is managed in the structured editor below.</p>';

export const aboutStatSchema = z.object({
  value: z.coerce.number().int().min(0).max(999_999),
  suffix: z.string().max(8),
  label: z.string().min(1).max(120),
});

export const aboutFeatureCardSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(2000),
  href: z.string().min(1).max(500),
  icon: z.enum(['guidance', 'consulting', 'support']),
});

export const aboutTabParagraphSchema = z.object({
  lead: z.string().max(200).optional(),
  text: z.string().min(1).max(5000),
});

export const aboutTabSchema = z.object({
  id: z.string().min(1).max(40),
  label: z.string().min(1).max(120),
  paragraphs: z.array(aboutTabParagraphSchema).min(1).max(12),
});

export const aboutPageJsonSchema = z.object({
  version: z.literal(1),
  heroTitle: z.string().min(1).max(200),
  introBadge: z.string().min(1).max(120),
  introHeading: z.string().min(1).max(300),
  introParagraphs: z.array(z.string().min(1).max(5000)).min(1).max(12),
  stats: z.array(aboutStatSchema).length(4),
  lawProvideHeading: z.string().min(1).max(300),
  lawProvideParagraphs: z.array(z.string().min(1).max(5000)).min(1).max(8),
  featureCards: z.array(aboutFeatureCardSchema).length(3),
  missionHeading: z.string().min(1).max(200),
  missionParagraphs: z.array(z.string().min(1).max(5000)).min(1).max(12),
  missionBullets: z.array(z.string().min(1).max(300)).min(1).max(12),
  visionHeading: z.string().min(1).max(300),
  visionLead: z.string().min(1).max(5000),
  tabs: z.array(aboutTabSchema).length(3),
  teamBadge: z.string().min(1).max(120),
  teamHeading: z.string().min(1).max(300),
  ctaHeading: z.string().min(1).max(300),
  ctaText: z.string().min(1).max(5000),
});

export type AboutPageJson = z.infer<typeof aboutPageJsonSchema>;

export function splitParagraphs(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);
}

export function joinParagraphs(paragraphs: string[]): string {
  return paragraphs.join('\n\n');
}

export function splitLines(text: string): string[] {
  return text
    .split('\n')
    .map((part) => part.trim())
    .filter(Boolean);
}

export function parseTabLines(text: string): AboutTabPanel['paragraphs'] {
  return splitLines(text).map((line) => {
    const colonIndex = line.indexOf(': ');
    if (colonIndex > 0 && colonIndex < 80) {
      return {
        lead: line.slice(0, colonIndex).trim(),
        text: line.slice(colonIndex + 2).trim(),
      };
    }
    return { text: line };
  });
}

export function formatTabLines(paragraphs: AboutTabPanel['paragraphs']): string {
  return paragraphs
    .map((paragraph) => (paragraph.lead ? `${paragraph.lead}: ${paragraph.text}` : paragraph.text))
    .join('\n');
}

export function defaultAboutPageJson(): AboutPageJson {
  const { introImage: _introImage, ...content } = DEFAULT_ABOUT_CONTENT;
  return {
    version: 1,
    heroTitle: content.heroTitle,
    introBadge: content.introBadge,
    introHeading: content.introHeading,
    introParagraphs: [...content.introParagraphs],
    stats: content.stats.map((stat) => ({ ...stat })),
    lawProvideHeading: content.lawProvideHeading,
    lawProvideParagraphs: [...content.lawProvideParagraphs],
    featureCards: content.featureCards.map((card) => ({ ...card })),
    missionHeading: content.missionHeading,
    missionParagraphs: [...content.missionParagraphs],
    missionBullets: [...content.missionBullets],
    visionHeading: content.visionHeading,
    visionLead: content.visionLead,
    tabs: content.tabs.map((tab) => ({
      id: tab.id,
      label: tab.label,
      paragraphs: tab.paragraphs.map((paragraph) => ({ ...paragraph })),
    })),
    teamBadge: content.teamBadge,
    teamHeading: content.teamHeading,
    ctaHeading: content.ctaHeading,
    ctaText: content.ctaText,
  };
}

export function parseAboutPageJson(value: unknown): AboutPageJson | null {
  const parsed = aboutPageJsonSchema.safeParse(value);
  return parsed.success ? parsed.data : null;
}

export function aboutJsonToPageContent(
  json: AboutPageJson,
  imagePath: string | null | undefined,
): AboutPageContent {
  return {
    ...json,
    introImage: imagePath?.trim() || DEFAULT_ABOUT_CONTENT.introImage,
  };
}

export function pageContentToAboutJson(content: AboutPageContent): AboutPageJson {
  return aboutPageJsonSchema.parse({
    version: 1,
    heroTitle: content.heroTitle,
    introBadge: content.introBadge,
    introHeading: content.introHeading,
    introParagraphs: content.introParagraphs,
    stats: content.stats,
    lawProvideHeading: content.lawProvideHeading,
    lawProvideParagraphs: content.lawProvideParagraphs,
    featureCards: content.featureCards,
    missionHeading: content.missionHeading,
    missionParagraphs: content.missionParagraphs,
    missionBullets: content.missionBullets,
    visionHeading: content.visionHeading,
    visionLead: content.visionLead,
    tabs: content.tabs,
    teamBadge: content.teamBadge,
    teamHeading: content.teamHeading,
    ctaHeading: content.ctaHeading,
    ctaText: content.ctaText,
  });
}

function readStat(formData: FormData, index: number): AboutStat {
  const n = index + 1;
  return {
    value: Number(formData.get(`stat${n}Value`) ?? 0),
    suffix: String(formData.get(`stat${n}Suffix`) ?? ''),
    label: String(formData.get(`stat${n}Label`) ?? '').trim(),
  };
}

function readFeatureCard(formData: FormData, index: number): AboutFeatureCard {
  const n = index + 1;
  const icon = String(formData.get(`feature${n}Icon`) ?? 'guidance');
  return {
    title: String(formData.get(`feature${n}Title`) ?? '').trim(),
    description: String(formData.get(`feature${n}Description`) ?? '').trim(),
    href: String(formData.get(`feature${n}Href`) ?? '').trim(),
    icon: icon === 'consulting' || icon === 'support' ? icon : 'guidance',
  };
}

export function parseAboutPageForm(formData: FormData): AboutPageJson {
  const tabIds = ['vision', 'history', 'why-choose'] as const;
  const tabLabels = [
    String(formData.get('tabVisionLabel') ?? 'Our Vision').trim(),
    String(formData.get('tabHistoryLabel') ?? 'Our History').trim(),
    String(formData.get('tabWhyChooseLabel') ?? 'Why Choose Us').trim(),
  ];
  const tabFields = ['tabVisionContent', 'tabHistoryContent', 'tabWhyChooseContent'] as const;

  return aboutPageJsonSchema.parse({
    version: 1,
    heroTitle: String(formData.get('heroTitle') ?? '').trim(),
    introBadge: String(formData.get('introBadge') ?? '').trim(),
    introHeading: String(formData.get('introHeading') ?? '').trim(),
    introParagraphs: splitParagraphs(String(formData.get('introParagraphs') ?? '')),
    stats: [0, 1, 2, 3].map((index) => readStat(formData, index)),
    lawProvideHeading: String(formData.get('lawProvideHeading') ?? '').trim(),
    lawProvideParagraphs: splitParagraphs(String(formData.get('lawProvideParagraphs') ?? '')),
    featureCards: [0, 1, 2].map((index) => readFeatureCard(formData, index)),
    missionHeading: String(formData.get('missionHeading') ?? '').trim(),
    missionParagraphs: splitParagraphs(String(formData.get('missionParagraphs') ?? '')),
    missionBullets: splitLines(String(formData.get('missionBullets') ?? '')),
    visionHeading: String(formData.get('visionHeading') ?? '').trim(),
    visionLead: String(formData.get('visionLead') ?? '').trim(),
    tabs: tabIds.map((id, index) => ({
      id,
      label: tabLabels[index],
      paragraphs: parseTabLines(String(formData.get(tabFields[index]) ?? '')),
    })),
    teamBadge: String(formData.get('teamBadge') ?? '').trim(),
    teamHeading: String(formData.get('teamHeading') ?? '').trim(),
    ctaHeading: String(formData.get('ctaHeading') ?? '').trim(),
    ctaText: String(formData.get('ctaText') ?? '').trim(),
  });
}

export function resolveAboutJsonFromPage(page: {
  contentJson: unknown;
  title: string;
  metaTitle: string | null;
  body: string;
}): AboutPageJson {
  const fromJson = parseAboutPageJson(page.contentJson);
  if (fromJson) {
    return fromJson;
  }

  const legacy = DEFAULT_ABOUT_CONTENT;
  return pageContentToAboutJson({
    ...legacy,
    heroTitle: page.metaTitle?.trim() || legacy.heroTitle,
    introHeading: page.title.trim() || legacy.introHeading,
  });
}
