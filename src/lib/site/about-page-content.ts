import type { getPublishedPageBySlug } from '@/lib/cms/cache';
import {
  aboutJsonToPageContent,
  parseAboutPageJson,
} from '@/lib/site/about-page-json';

type AboutCmsPage = NonNullable<Awaited<ReturnType<typeof getPublishedPageBySlug>>>;

export type AboutStat = {
  value: number;
  suffix: string;
  label: string;
};

export type AboutFeatureCard = {
  title: string;
  description: string;
  href: string;
  icon: 'guidance' | 'consulting' | 'support';
};

export type AboutTabPanel = {
  id: string;
  label: string;
  paragraphs: Array<{ lead?: string; text: string }>;
};

export type AboutPageContent = {
  heroTitle: string;
  introBadge: string;
  introHeading: string;
  introParagraphs: string[];
  introImage: string;
  stats: AboutStat[];
  lawProvideHeading: string;
  lawProvideParagraphs: string[];
  featureCards: AboutFeatureCard[];
  missionHeading: string;
  missionParagraphs: string[];
  missionBullets: string[];
  visionHeading: string;
  visionLead: string;
  tabs: AboutTabPanel[];
  teamBadge: string;
  teamHeading: string;
  ctaHeading: string;
  ctaText: string;
};

const INTRO_IMAGE = '/images/theme/about/sections/about3-img1.png';
const MISSION_IMAGE = '/images/theme/about/sections/missionimg1.png';
const VISION_IMAGE = '/images/theme/about/sections/vissionimg.png';

export const DEFAULT_ABOUT_CONTENT: AboutPageContent = {
  heroTitle: 'About Us',
  introBadge: 'About Us',
  introHeading: 'About DSB Law Group — Corporate and Management Consulting Profile',
  introParagraphs: [
    'With more than 58 years of professional experience, DSB Law Group is a trusted corporate and financial consulting firm with strong expertise in banking, Non-Banking Financial Companies, corporate laws and regulatory advisory in India.',
    'We provide comprehensive, end-to-end solutions under one roof, helping businesses manage legal, financial and regulatory requirements efficiently. Our approach is focused on delivering practical, timely and cost-effective support that aligns with each client\'s commercial objectives.',
  ],
  introImage: INTRO_IMAGE,
  stats: [
    { value: 58, suffix: '+', label: 'Years of Experience' },
    { value: 50, suffix: '+', label: 'NBFC Establishments' },
    { value: 11, suffix: '', label: 'Offices Pan India' },
    { value: 1000, suffix: '+', label: 'Clients Served' },
  ],
  lawProvideHeading: 'Integrated Legal, Regulatory & Business Advisory Under One Roof',
  lawProvideParagraphs: [
    'DSB Law Group provides integrated legal, regulatory, financial and business advisory services to support organisations at every stage of their growth. Our multidisciplinary team delivers practical, commercially focused solutions designed to strengthen compliance, manage risk and enable informed decision-making.',
    'From NBFC licensing and banking compliance to corporate advisory, taxation and HR matters, we bring lawyers, chartered accountants, company secretaries and industry specialists together for coordinated counsel.',
  ],
  featureCards: [
    {
      title: 'Corporate & Regulatory Compliance',
      description:
        'Company incorporation, governance, regulatory approvals and ongoing compliance support across corporate and financial-sector mandates.',
      href: '/pages/corporate-advisory',
      icon: 'guidance',
    },
    {
      title: 'NBFC & Banking Advisory',
      description:
        'End-to-end NBFC consultancy — licensing, incorporation, funding, investor tie-ups and RBI compliance advisory across India.',
      href: '/nbfc',
      icon: 'consulting',
    },
    {
      title: 'Taxation & Business Advisory',
      description:
        'Direct and indirect taxation, FEMA advisory, mergers and acquisitions, and strategic business transformation support.',
      href: '/pages/taxation',
      icon: 'support',
    },
  ],
  missionHeading: 'Our Mission',
  missionParagraphs: [
    'Our mission is to stand alongside small and medium enterprises as they navigate growth, compliance and business transformation. More than consultants, we serve as long-term partners by bringing together legal expertise, strategic insight and technology-enabled business solutions under one roof.',
    'We help SMEs strengthen their operations through intelligent digital tools, streamlined compliance systems and practical automation frameworks. By combining professional guidance with technology, we enable businesses to improve internal processes, make informed decisions and prepare for sustainable expansion.',
    'DSB Law Group also provides comprehensive legal, regulatory and strategic support to Non-Banking Financial Companies throughout their business lifecycle. From licensing and regulatory compliance to governance, restructuring and ongoing advisory, we assist NBFCs at every stage with experience, precision and innovation.',
    'Every engagement is focused on creating lasting value. Through deep sector knowledge, digital capability and a collaborative approach, we help enterprises operate more efficiently, manage risk confidently and scale with clarity.',
  ],
  missionBullets: [
    'Corporate and Regulatory Compliance',
    'NBFC Advisory, Licensing and Regulatory Support',
    'Banking and Finance Solutions',
    'Direct and Indirect Taxation',
    'Employment Laws and HR Advisory',
    'Mergers, Acquisitions and Capital Markets',
  ],
  visionHeading: 'Our Vision, History & Why Clients Choose Us',
  visionLead:
    'We take the time to understand each client\'s business, challenges and objectives before providing solutions. Our focus is on delivering high-quality advice, timely execution and measurable value.',
  tabs: [
    {
      id: 'vision',
      label: 'Our Vision',
      paragraphs: [
        {
          text: 'To be the trusted strategic partner for SMEs by delivering integrated legal, business and technology-enabled consulting solutions that empower enterprises to grow with confidence, achieve regulatory clarity and compete with strength.',
        },
      ],
    },
    {
      id: 'history',
      label: 'Our History',
      paragraphs: [
        {
          lead: 'Founded in 1967',
          text: 'DSB Law Group traces its roots to the vision and discipline of its founding partners. From a prominent practice at Raj Chambers in Jalandhar, the firm has grown into a pan-India advisory group serving banking, NBFC, corporate and regulatory clients for more than five decades.',
        },
        {
          lead: 'Legacy of excellence',
          text: 'The values established by our founders — professional integrity, client focus and principled practice — remain deeply embedded in our culture and continue to guide every mandate we undertake.',
        },
      ],
    },
    {
      id: 'why-choose',
      label: 'Why Choose Us',
      paragraphs: [
        {
          lead: 'Client-Focused Approach',
          text: 'We take the time to understand each client\'s business, challenges and objectives before providing solutions. Our focus is on delivering high-quality advice, timely execution and measurable value.',
        },
        {
          lead: 'Multidisciplinary Expertise',
          text: 'Our team brings together lawyers, chartered accountants, company secretaries, tax professionals and industry specialists, enabling coordinated solutions across legal, financial and regulatory matters.',
        },
        {
          lead: 'Practical and Innovative Solutions',
          text: 'We apply strategic thinking and practical problem-solving to complex business challenges, particularly within the Banking, Financial Services and Insurance sector.',
        },
      ],
    },
  ],
  teamBadge: 'Our Expert Team',
  teamHeading: 'Meet Our Expert Law Consulting Team',
  ctaHeading: 'Get expert legal advice on your business strategies',
  ctaText:
    'We believe that informed clients make better decisions. As part of our service, we provide personalised legal guidance to help you navigate complex regulatory and commercial matters with confidence.',
};

export const ABOUT_PAGE_IMAGES = {
  intro: INTRO_IMAGE,
  mission: MISSION_IMAGE,
  vision: VISION_IMAGE,
} as const;

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function extractParagraphs(html: string): string[] {
  const matches = html.match(/<p[^>]*>([\s\S]*?)<\/p>/gi) ?? [];
  return matches
    .map((block) => stripTags(block))
    .filter(Boolean);
}

function extractListItems(html: string): string[] {
  const matches = html.match(/<li[^>]*>([\s\S]*?)<\/li>/gi) ?? [];
  return matches
    .map((block) => stripTags(block))
    .filter(Boolean);
}

function parseSectionMap(body: string): Map<string, string> {
  const map = new Map<string, string>();
  const parts = body.split(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi);

  if (parts.length <= 1) {
    return map;
  }

  for (let i = 1; i < parts.length; i += 2) {
    const key = stripTags(parts[i]).trim().toLowerCase();
    const value = parts[i + 1]?.trim() ?? '';
    if (key) {
      map.set(key, value);
    }
  }

  return map;
}

export function resolveAboutPageContent(page: AboutCmsPage | null): AboutPageContent {
  if (!page) {
    return { ...DEFAULT_ABOUT_CONTENT };
  }

  const structured = parseAboutPageJson(page.contentJson);
  if (structured) {
    return aboutJsonToPageContent(structured, page.imagePath);
  }

  const content = { ...DEFAULT_ABOUT_CONTENT };

  if (page.metaTitle?.trim()) {
    content.heroTitle = page.metaTitle.trim();
  }

  if (page.title?.trim()) {
    content.introHeading = page.title.trim();
  }

  if (page.imagePath?.trim()) {
    content.introImage = page.imagePath.trim();
  }

  const sections = parseSectionMap(page.body);

  if (sections.size === 0) {
    const paragraphs = extractParagraphs(page.body);
    if (paragraphs.length > 0) {
      content.introParagraphs = paragraphs;
    }
    return content;
  }

  const intro = sections.get('intro') ?? sections.get('about intro') ?? sections.get('about us');
  if (intro) {
    const paragraphs = extractParagraphs(intro);
    if (paragraphs.length > 0) {
      content.introParagraphs = paragraphs;
    }
  }

  const lawProvide = sections.get('law provide') ?? sections.get('expertise') ?? sections.get('our areas of expertise');
  if (lawProvide) {
    const paragraphs = extractParagraphs(lawProvide);
    if (paragraphs.length > 0) {
      content.lawProvideParagraphs = paragraphs;
    }
    const bullets = extractListItems(lawProvide);
    if (bullets.length >= 3) {
      content.missionBullets = bullets.slice(0, 6);
    }
  }

  const mission = sections.get('mission') ?? sections.get('our mission');
  if (mission) {
    const paragraphs = extractParagraphs(mission);
    if (paragraphs.length > 0) {
      content.missionParagraphs = paragraphs;
    }
    const bullets = extractListItems(mission);
    if (bullets.length > 0) {
      content.missionBullets = bullets;
    }
  }

  const vision = sections.get('vision') ?? sections.get('our vision');
  if (vision) {
    const paragraphs = extractParagraphs(vision);
    if (paragraphs.length > 0) {
      content.tabs = content.tabs.map((tab) =>
        tab.id === 'vision'
          ? {
              ...tab,
              paragraphs: paragraphs.map((text) => ({ text })),
            }
          : tab,
      );
    }
  }

  const history = sections.get('history') ?? sections.get('our history');
  if (history) {
    const paragraphs = extractParagraphs(history);
    if (paragraphs.length > 0) {
      content.tabs = content.tabs.map((tab) =>
        tab.id === 'history'
          ? {
              ...tab,
              paragraphs: paragraphs.map((text, index) =>
                index === 0 ? { lead: 'Our History', text } : { text },
              ),
            }
          : tab,
      );
    }
  }

  const whyChoose = sections.get('why choose us') ?? sections.get('why choose dsb law group');
  if (whyChoose) {
    const paragraphs = extractParagraphs(whyChoose);
    if (paragraphs.length > 0) {
      content.tabs = content.tabs.map((tab) =>
        tab.id === 'why-choose'
          ? {
              ...tab,
              paragraphs: paragraphs.map((text) => ({ text })),
            }
          : tab,
      );
    }
  }

  const commitment = sections.get('commitment') ?? sections.get('our commitment');
  if (commitment) {
    const paragraphs = extractParagraphs(commitment);
    if (paragraphs[0]) {
      content.visionLead = paragraphs[0];
    }
  }

  return content;
}

export function buildAboutSeedBody(): string {
  return `<h2>Intro</h2>
<p>${DEFAULT_ABOUT_CONTENT.introParagraphs[0]}</p>
<p>${DEFAULT_ABOUT_CONTENT.introParagraphs[1]}</p>
<h2>Our Areas of Expertise</h2>
<p>Our multidisciplinary capabilities include corporate and regulatory compliance, NBFC advisory, banking and finance, taxation, FEMA advisory, market entry strategies, private equity, mergers and acquisitions, employment laws, capital markets and intellectual property rights.</p>
<h2>Our Mission</h2>
<p>${DEFAULT_ABOUT_CONTENT.missionParagraphs[0]}</p>
<p>${DEFAULT_ABOUT_CONTENT.missionParagraphs[1]}</p>
<p>${DEFAULT_ABOUT_CONTENT.missionParagraphs[2]}</p>
<p>${DEFAULT_ABOUT_CONTENT.missionParagraphs[3]}</p>
<h2>Our Vision</h2>
<p>${DEFAULT_ABOUT_CONTENT.tabs[0].paragraphs[0].text}</p>
<h2>Our History</h2>
<p>${DEFAULT_ABOUT_CONTENT.tabs[1].paragraphs[0].text}</p>
<p>${DEFAULT_ABOUT_CONTENT.tabs[1].paragraphs[1].text}</p>
<h2>Why Choose Us</h2>
<p>${DEFAULT_ABOUT_CONTENT.tabs[2].paragraphs[0].text}</p>
<p>${DEFAULT_ABOUT_CONTENT.tabs[2].paragraphs[1].text}</p>
<p>${DEFAULT_ABOUT_CONTENT.tabs[2].paragraphs[2].text}</p>
<h2>Our Commitment</h2>
<p>To be a unified partner for smarter, leaner and scalable business growth, where strategy, technology and execution come together under one roof.</p>`;
}
