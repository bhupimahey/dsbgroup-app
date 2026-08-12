import type { ReactNode } from 'react';
import {
  AdminCheckbox,
  AdminField,
  AdminSelect,
  AdminTextarea,
} from '@/components/admin/AdminFormFields';
import AdminFileUpload from '@/components/admin/AdminFileUpload';
import {
  formatTabLines,
  joinParagraphs,
  type AboutPageJson,
} from '@/lib/site/about-page-json';

type Props = {
  content: AboutPageJson;
  slug: string;
  imagePath?: string | null;
  metaDescription?: string | null;
  metaKeywords?: string | null;
  published?: boolean;
};

const FEATURE_ICON_OPTIONS = [
  { value: 'guidance', label: 'Guidance (corporate)' },
  { value: 'consulting', label: 'Consulting (NBFC)' },
  { value: 'support', label: 'Support (tax / advisory)' },
];

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset
      className="space-y-4 rounded-xl border p-4"
      style={{ borderColor: 'var(--z-border)', background: 'var(--z-surface)' }}
    >
      <legend className="px-1 text-sm font-semibold uppercase tracking-wide" style={{ color: 'var(--z-text)' }}>
        {title}
      </legend>
      {children}
    </fieldset>
  );
}

export default function AdminAboutPageFields({
  content,
  slug,
  imagePath,
  metaDescription,
  metaKeywords,
  published,
}: Props) {
  const visionTab = content.tabs.find((tab) => tab.id === 'vision') ?? content.tabs[0];
  const historyTab = content.tabs.find((tab) => tab.id === 'history') ?? content.tabs[1];
  const whyChooseTab = content.tabs.find((tab) => tab.id === 'why-choose') ?? content.tabs[2];

  return (
    <>
      <input type="hidden" name="aboutTemplate" value="1" />

      <AdminField label="Slug" name="slug" defaultValue={slug} required />

      <Section title="Hero & intro">
        <AdminField label="Hero title (breadcrumb area)" name="heroTitle" defaultValue={content.heroTitle} required />
        <AdminField label="Intro badge" name="introBadge" defaultValue={content.introBadge} required />
        <AdminField
          label="Intro heading"
          name="introHeading"
          defaultValue={content.introHeading}
          required
          hint="Main heading beside the intro image."
        />
        <AdminTextarea
          label="Intro paragraphs"
          name="introParagraphs"
          defaultValue={joinParagraphs(content.introParagraphs)}
          rows={8}
          required
          hint="Separate paragraphs with a blank line."
        />
        <AdminFileUpload
          label="Intro image"
          name="imagePath"
          accept="image/jpeg,image/png,image/webp,image/gif"
          defaultValue={imagePath ?? ''}
          uploadKind="page-image"
          hint="Shown in the first About section on the public page."
        />
      </Section>

      <Section title="Stats counters">
        {content.stats.map((stat, index) => {
          const n = index + 1;
          return (
            <div key={stat.label} className="grid gap-4 sm:grid-cols-3">
              <AdminField
                label={`Stat ${n} — value`}
                name={`stat${n}Value`}
                defaultValue={String(stat.value)}
                required
              />
              <AdminField
                label={`Stat ${n} — suffix`}
                name={`stat${n}Suffix`}
                defaultValue={stat.suffix}
                hint='e.g. "+" or leave blank'
              />
              <AdminField
                label={`Stat ${n} — label`}
                name={`stat${n}Label`}
                defaultValue={stat.label}
                required
              />
            </div>
          );
        })}
      </Section>

      <Section title="Expertise & feature cards">
        <AdminField
          label="Section heading"
          name="lawProvideHeading"
          defaultValue={content.lawProvideHeading}
          required
        />
        <AdminTextarea
          label="Section paragraphs"
          name="lawProvideParagraphs"
          defaultValue={joinParagraphs(content.lawProvideParagraphs)}
          rows={6}
          required
          hint="Separate paragraphs with a blank line."
        />
        {content.featureCards.map((card, index) => {
          const n = index + 1;
          return (
            <div
              key={card.title}
              className="space-y-4 rounded-lg border p-3"
              style={{ borderColor: 'var(--z-border)' }}
            >
              <p className="text-sm font-semibold" style={{ color: 'var(--z-text)' }}>
                Feature card {n}
              </p>
              <AdminField label="Title" name={`feature${n}Title`} defaultValue={card.title} required />
              <AdminTextarea
                label="Description"
                name={`feature${n}Description`}
                defaultValue={card.description}
                rows={3}
                required
              />
              <AdminField label="Link URL" name={`feature${n}Href`} defaultValue={card.href} required />
              <AdminSelect
                label="Icon"
                name={`feature${n}Icon`}
                defaultValue={card.icon}
                options={FEATURE_ICON_OPTIONS}
              />
            </div>
          );
        })}
      </Section>

      <Section title="Our mission">
        <AdminField label="Section heading" name="missionHeading" defaultValue={content.missionHeading} required />
        <AdminTextarea
          label="Mission paragraphs"
          name="missionParagraphs"
          defaultValue={joinParagraphs(content.missionParagraphs)}
          rows={10}
          required
          hint="All mission paragraphs — separate with a blank line."
        />
        <AdminTextarea
          label="Mission checklist items"
          name="missionBullets"
          defaultValue={content.missionBullets.join('\n')}
          rows={8}
          required
          hint="One bullet per line."
        />
      </Section>

      <Section title="Vision, history & why choose us">
        <AdminField label="Section heading" name="visionHeading" defaultValue={content.visionHeading} required />
        <AdminTextarea label="Section lead paragraph" name="visionLead" defaultValue={content.visionLead} rows={4} required />
        <AdminField label="Vision tab label" name="tabVisionLabel" defaultValue={visionTab.label} required />
        <AdminTextarea
          label="Vision tab content"
          name="tabVisionContent"
          defaultValue={formatTabLines(visionTab.paragraphs)}
          rows={4}
          required
          hint="One paragraph per line."
        />
        <AdminField label="History tab label" name="tabHistoryLabel" defaultValue={historyTab.label} required />
        <AdminTextarea
          label="History tab content"
          name="tabHistoryContent"
          defaultValue={formatTabLines(historyTab.paragraphs)}
          rows={6}
          required
          hint='Optional "Label: paragraph" format per line.'
        />
        <AdminField
          label="Why choose us tab label"
          name="tabWhyChooseLabel"
          defaultValue={whyChooseTab.label}
          required
        />
        <AdminTextarea
          label="Why choose us tab content"
          name="tabWhyChooseContent"
          defaultValue={formatTabLines(whyChooseTab.paragraphs)}
          rows={8}
          required
          hint='Use "Client-Focused Approach: paragraph text" per line.'
        />
      </Section>

      <Section title="Team preview & CTA">
        <AdminField label="Team badge" name="teamBadge" defaultValue={content.teamBadge} required />
        <AdminField label="Team section heading" name="teamHeading" defaultValue={content.teamHeading} required />
        <p className="text-sm" style={{ color: 'var(--z-text-muted)' }}>
          Team member cards are loaded from Admin → Team (first 4 published members).
        </p>
        <AdminField label="CTA heading" name="ctaHeading" defaultValue={content.ctaHeading} required />
        <AdminTextarea label="CTA text" name="ctaText" defaultValue={content.ctaText} rows={4} required />
      </Section>

      <Section title="SEO & publishing">
        <AdminTextarea
          label="Meta description"
          name="metaDescription"
          defaultValue={metaDescription ?? ''}
          rows={3}
        />
        <AdminField
          label="Meta keywords (comma-separated)"
          name="metaKeywords"
          defaultValue={metaKeywords ?? ''}
        />
        <AdminCheckbox label="Published" name="published" defaultChecked={published ?? true} />
      </Section>
    </>
  );
}
