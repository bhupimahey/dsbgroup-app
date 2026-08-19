import { z } from 'zod';
import { joinParagraphs, splitLines, splitParagraphs } from '@/lib/site/about-page-json';

export const HOME_PAGE_BODY_PLACEHOLDER =
  '<p>Home page content is managed in the structured editor below.</p>';

const chipSchema = z.object({
  label: z.string().min(1).max(80),
  href: z.string().min(1).max(500),
});

const titleTextSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(2000),
});

const progressBarSchema = z.object({
  label: z.string().min(1).max(120),
  percent: z.coerce.number().int().min(0).max(100),
});

const counterSchema = z.object({
  value: z.string().min(1).max(20),
  label: z.string().min(1).max(120),
});

const stepSchema = z.object({
  title: z.string().min(1).max(200),
  body: z.string().min(1).max(2000),
  icon: z.string().max(500).optional().or(z.literal('')),
});

const caseSchema = z.object({
  title: z.string().min(1).max(200),
  summary: z.string().min(1).max(1000),
  detail: z.string().min(1).max(2000),
  href: z.string().min(1).max(500),
  imagePath: z.string().max(500).optional().or(z.literal('')),
});

export const homePageJsonSchema = z.object({
  template: z.literal('home'),
  version: z.literal(1),
  heroHeading: z.string().min(1).max(200),
  heroTagline: z.string().min(1).max(300),
  heroParagraphs: z.array(z.string().min(1).max(5000)).min(1).max(8),
  heroCtaLabel: z.string().min(1).max(80),
  heroCtaHref: z.string().min(1).max(500),
  heroImagePath: z.string().max(500).optional().or(z.literal('')),
  heroBackgroundPath: z.string().max(500).optional().or(z.literal('')),
  heroBadgeYear: z.string().max(20).optional().or(z.literal('')),
  heroBadgeText: z.string().max(120).optional().or(z.literal('')),
  heroChips: z.array(chipSchema).min(1).max(12),
  aboutLabel: z.string().min(1).max(80),
  aboutHeading: z.string().min(1).max(300),
  aboutHighlight: z.string().min(1).max(2000),
  aboutParagraphs: z.array(z.string().min(1).max(5000)).min(1).max(12),
  aboutCtaLabel: z.string().min(1).max(80),
  aboutCtaHref: z.string().min(1).max(500),
  aboutImageMain: z.string().max(500).optional().or(z.literal('')),
  aboutImageSide1: z.string().max(500).optional().or(z.literal('')),
  aboutImageSide2: z.string().max(500).optional().or(z.literal('')),
  expertiseHeading: z.string().min(1).max(200),
  expertiseIntro: z.string().max(1000).optional().or(z.literal('')),
  expertiseItems: z.array(z.string().min(1).max(200)).min(1).max(20),
  whyChooseHeading: z.string().min(1).max(200),
  whyChooseCards: z.array(titleTextSchema).min(1).max(6),
  visionHeading: z.string().min(1).max(200),
  visionText: z.string().min(1).max(5000),
  missionHeading: z.string().min(1).max(200),
  missionParagraphs: z.array(z.string().min(1).max(5000)).min(1).max(8),
  commitmentHeading: z.string().min(1).max(200),
  commitmentText: z.string().min(1).max(2000),
  legacyHeading: z.string().min(1).max(200),
  legacyParagraphs: z.array(z.string().min(1).max(5000)).min(1).max(12),
  founderHeading: z.string().min(1).max(200),
  founderName: z.string().min(1).max(200),
  founderRole: z.string().min(1).max(200),
  founderParagraphs: z.array(z.string().min(1).max(5000)).min(1).max(12),
  founderImagePath: z.string().max(500).optional().or(z.literal('')),
  servicesLabel: z.string().min(1).max(80),
  servicesHeading: z.string().min(1).max(300),
  servicesIntro: z.string().max(5000).optional().or(z.literal('')),
  progressLabel: z.string().min(1).max(80),
  progressHeading: z.string().min(1).max(300),
  progressParagraph: z.string().min(1).max(2000),
  progressBars: z.array(progressBarSchema).min(1).max(6),
  progressCtaLabel: z.string().min(1).max(80),
  progressCtaHref: z.string().min(1).max(500),
  progressImagePath: z.string().max(500).optional().or(z.literal('')),
  counters: z.array(counterSchema).min(1).max(6),
  howItWorksLabel: z.string().min(1).max(80),
  howItWorksHeading: z.string().min(1).max(300),
  howItWorksLead: z.string().min(1).max(2000),
  howItWorksBody: z.string().min(1).max(2000),
  howItWorksCtaLabel: z.string().min(1).max(80),
  howItWorksCtaHref: z.string().min(1).max(500),
  howItWorksSteps: z.array(stepSchema).min(1).max(6),
  caseLabel: z.string().min(1).max(80),
  caseHeading: z.string().min(1).max(300),
  caseItems: z.array(caseSchema).min(1).max(6),
  testimonialsLabel: z.string().min(1).max(80),
  testimonialsHeading: z.string().min(1).max(300),
  blogLabel: z.string().min(1).max(80),
  blogHeading: z.string().min(1).max(300),
  contactLabel: z.string().min(1).max(80),
  contactHeading: z.string().min(1).max(300),
  contactFormTitle: z.string().min(1).max(200),
  contactFormIntro: z.string().min(1).max(1000),
  contactEmailTitle: z.string().min(1).max(120),
  contactPhoneTitle: z.string().min(1).max(120),
  contactLocationTitle: z.string().min(1).max(120),
  contactLocationText: z.string().min(1).max(1000),
  ctaHeading: z.string().min(1).max(300),
  ctaText: z.string().min(1).max(2000),
});

export type HomePageJson = z.infer<typeof homePageJsonSchema>;

function splitChips(text: string) {
  return splitLines(text).map((line) => {
    const [label, href] = line.split('|').map((part) => part.trim());
    return { label: label || line, href: href || '/services' };
  });
}

export function joinChips(chips: HomePageJson['heroChips']): string {
  return chips.map((chip) => `${chip.label}|${chip.href}`).join('\n');
}

function readWhyChoose(formData: FormData, index: number) {
  return {
    title: String(formData.get(`whyChooseTitle${index}`) ?? '').trim(),
    description: String(formData.get(`whyChooseDescription${index}`) ?? '').trim(),
  };
}

function readProgressBar(formData: FormData, index: number) {
  return {
    label: String(formData.get(`progressLabel${index}`) ?? '').trim(),
    percent: Number(formData.get(`progressPercent${index}`) ?? 0),
  };
}

function readCounter(formData: FormData, index: number) {
  return {
    value: String(formData.get(`counterValue${index}`) ?? '').trim(),
    label: String(formData.get(`counterLabel${index}`) ?? '').trim(),
  };
}

function readStep(formData: FormData, index: number) {
  return {
    title: String(formData.get(`stepTitle${index}`) ?? '').trim(),
    body: String(formData.get(`stepBody${index}`) ?? '').trim(),
    icon: String(formData.get(`stepIcon${index}`) ?? '').trim(),
  };
}

function readCase(formData: FormData, index: number) {
  return {
    title: String(formData.get(`caseTitle${index}`) ?? '').trim(),
    summary: String(formData.get(`caseSummary${index}`) ?? '').trim(),
    detail: String(formData.get(`caseDetail${index}`) ?? '').trim(),
    href: String(formData.get(`caseHref${index}`) ?? '').trim(),
    imagePath: String(formData.get(`caseImage${index}`) ?? '').trim(),
  };
}

export function defaultHomePageJson(): HomePageJson {
  return {
    template: 'home',
    version: 1,
    heroHeading: 'DSB Law Group',
    heroTagline: 'Trusted Business and Legal Consultants',
    heroParagraphs: [
      'DSB Law Group is a full-service Indian law firm providing a comprehensive range of legal, regulatory and business advisory solutions to clients operating across India.',
      'With strong professional expertise and a client-focused approach, we assist businesses, financial institutions, promoters, directors and management teams across a wide range of matters, including corporate and company law, taxation, bank audits, financial-sector advisory, regulatory compliance and RBI-related matters, particularly those concerning Non-Banking Financial Companies.',
    ],
    heroCtaLabel: 'View All Services',
    heroCtaHref: '/services',
    heroImagePath: '/images/home/hero-photo.jpg',
    heroBackgroundPath: '/images/home/hero-bg.jpg',
    heroBadgeYear: '1967',
    heroBadgeText: 'Trusted legal advisory since',
    heroChips: [
      { label: 'BANKING', href: '/pages/banking-finance' },
      { label: 'NBFCs', href: '/nbfc' },
      { label: 'UCBs', href: '/ucbs' },
      { label: 'CORPORATE LAWS', href: '/pages/corporate-advisory' },
      { label: 'TAXATION', href: '/pages/taxation' },
      { label: 'HR & LABOUR LAWS', href: '/hr-labour-law/about' },
      { label: 'OTHER SERVICES', href: '/services' },
    ],
    aboutLabel: 'About Us',
    aboutHeading: 'About DSB Law Group',
    aboutHighlight:
      'Corporate and Management Consulting Profile — more than 58 years of professional experience as a trusted corporate and financial consulting firm.',
    aboutParagraphs: [
      'With more than 58 years of professional experience, DSB Law Group is a trusted corporate and financial consulting firm with strong expertise in banking, Non-Banking Financial Companies, corporate laws and regulatory advisory in India.',
      'We provide comprehensive, end-to-end solutions under one roof, helping businesses manage legal, financial and regulatory requirements efficiently. Our approach is focused on delivering practical, timely and cost-effective support that aligns with each client’s commercial objectives.',
      'Our multidisciplinary approach enables us to address legal, financial, secretarial and regulatory requirements in an integrated manner. By combining technical knowledge with practical business understanding, we help clients navigate complex laws, evolving regulatory frameworks and operational challenges with greater clarity and confidence.',
    ],
    aboutCtaLabel: 'Explore About Us',
    aboutCtaHref: '/about',
    aboutImageMain: '/images/home/about-1.jpg',
    aboutImageSide1: '/images/home/about-2.jpg',
    aboutImageSide2: '/images/home/about-4.jpg',
    expertiseHeading: 'Our Areas of Expertise',
    expertiseIntro: 'Our multidisciplinary capabilities include:',
    expertiseItems: [
      'Corporate and Regulatory Compliance',
      'NBFC Advisory, Licensing and Regulatory Support',
      'Banking and Finance Solutions',
      'Direct and Indirect Taxation',
      'FEMA Advisory and Cross-Border Transactions',
      'Market Entry Strategies and Joint Ventures',
      'Private Equity and Fundraising',
      'Mergers and Acquisitions',
      'Employment Laws and HR Advisory',
      'Capital Markets and Securities',
      'Intellectual Property Rights',
    ],
    whyChooseHeading: 'Why Choose DSB Law Group?',
    whyChooseCards: [
      {
        title: 'Client-Focused Approach',
        description:
          'We take the time to understand each client’s business, challenges and objectives before providing solutions. Our focus is on delivering high-quality advice, timely execution and measurable value.',
      },
      {
        title: 'Multidisciplinary Expertise',
        description:
          'Our team brings together lawyers, chartered accountants, company secretaries, tax professionals and industry specialists, enabling us to provide coordinated solutions across legal, financial and regulatory matters.',
      },
      {
        title: 'Practical and Innovative Solutions',
        description:
          'We apply strategic thinking and practical problem-solving to complex business challenges, particularly within the Banking, Financial Services and Insurance sector.',
      },
      {
        title: 'Proven Experience',
        description:
          'With decades of hands-on experience, we have supported businesses in implementing corporate strategies, navigating regulatory requirements, managing risk and completing important transactions.',
      },
    ],
    visionHeading: 'Our Vision',
    visionText:
      'To be the trusted strategic partner for SMEs by delivering integrated legal, business and technology-enabled consulting solutions that empower enterprises to grow with confidence, achieve regulatory clarity and compete with strength.',
    missionHeading: 'Our Mission',
    missionParagraphs: [
      'Our mission is to stand alongside small and medium enterprises as they navigate growth, compliance and business transformation. More than consultants, we serve as long-term partners by bringing together legal expertise, strategic insight and technology-enabled business solutions under one roof.',
      'We help SMEs strengthen their operations through intelligent digital tools, streamlined compliance systems and practical automation frameworks. By combining professional guidance with technology, we enable businesses to improve internal processes, make informed decisions and prepare for sustainable expansion.',
      'DSB Law Group also provides comprehensive legal, regulatory and strategic support to Non-Banking Financial Companies throughout their business lifecycle. From licensing and regulatory compliance to governance, restructuring and ongoing advisory, we assist NBFCs at every stage with experience, precision and innovation.',
      'Every engagement is focused on creating lasting value. Through deep sector knowledge, digital capability and a collaborative approach, we help enterprises operate more efficiently, manage risk confidently and scale with clarity.',
    ],
    commitmentHeading: 'Our Commitment',
    commitmentText:
      'To be a unified partner for smarter, leaner and scalable business growth, where strategy, technology and execution come together under one roof.',
    legacyHeading: 'A Legacy of Growth and Expertise',
    legacyParagraphs: [
      'Founded in 1967 by Late Shri K.M. Gupta, DSB Law Group began as a specialised taxation practice and has since grown into a comprehensive legal and business advisory firm. Under the leadership of Shri Dinesh Gupta since 1984, the firm expanded its expertise across corporate law, banking, NBFC regulations, governance and regulatory compliance.',
      'Over the years, DSB Law Group has continued to evolve with the changing legal and business environment. By combining sound legal knowledge with practical commercial insight, we provide solutions that are not only legally robust but also aligned with our clients’ strategic and operational objectives.',
      'Our team brings together experienced professionals with sector-specific expertise, enabling us to address complex regulatory matters, support business expansion and deliver tailored advisory solutions. We work closely with enterprises at different stages of growth, from emerging businesses and start-ups to established organisations seeking to strengthen compliance, governance and operational efficiency.',
      'Our approach is centred on creating measurable value. We help clients achieve greater regulatory clarity, manage risk, improve decision-making and pursue sustainable growth with confidence.',
      'With a proven record of supporting businesses through change and expansion, DSB Law Group remains committed to excellence, integrity and long-term professional relationships. As we continue to grow, our purpose remains unchanged: to provide dependable, forward-looking legal and business solutions that empower our clients to achieve lasting success.',
    ],
    founderHeading: 'The Vision Behind DSB Law Group',
    founderName: 'Late Shri K.M. Gupta',
    founderRole: 'Founder, DSB Law Group',
    founderParagraphs: [
      'Late Shri K.M. Gupta was a distinguished Senior Advocate with more than 45 years of experience in taxation, labour and industrial laws. He founded DSB Law Group on the enduring principles of integrity, professionalism, commitment and client service, values that continue to guide the firm today.',
      'Beginning his legal career in the 1960s, Shri K.M. Gupta built a strong reputation for providing ethical, practical and dependable legal advice. Over the years, he served as legal adviser to several respected government and private institutions across Northern India. His professional approach was defined by thorough preparation, timely assistance and cost-effective solutions.',
      'Despite coming from humble beginnings, he pursued his legal education while serving as a gazetted officer. With the unwavering support of his wife, Mrs Rajrani Gupta, he entered legal practice and gradually expanded his expertise into taxation and labour law.',
      'With the guidance and encouragement of trusted colleagues, he established a prominent practice and later developed the firm’s professional base at Raj Chambers. His vision, discipline and dedication laid the foundation for DSB Law Group’s continued growth and evolution.',
      'Shri K.M. Gupta passed away on 26 May 2015, leaving behind a lasting legacy of professional excellence and principled legal practice. His values remain deeply embedded in the firm’s culture and continue to inspire future generations of DSB Law Group.',
    ],
    founderImagePath: '/images/home/about-4.jpg',
    servicesLabel: 'Our Services',
    servicesHeading: 'Integrated legal, regulatory, financial and business advisory',
    servicesIntro:
      'DSB Law Group provides integrated legal, regulatory, financial and business advisory services to support organisations at every stage of their growth. Our multidisciplinary team delivers practical, commercially focused solutions designed to strengthen compliance, manage risk and enable informed decision-making.',
    progressLabel: 'Company Progress',
    progressHeading: 'Structured legal operations that support measurable growth',
    progressParagraph:
      'We help organisations move from reactive legal operations to structured, measurable compliance systems.',
    progressBars: [
      { label: 'Business Planning', percent: 98 },
      { label: 'International Business', percent: 96 },
    ],
    progressCtaLabel: 'Request a Quote',
    progressCtaHref: '/contact',
    progressImagePath: '/images/home/company.jpg',
    counters: [
      { value: '400+', label: 'Consulting Solutions' },
      { value: '620+', label: 'Complete Cases' },
      { value: '800+', label: 'Happy Customers' },
      { value: '120+', label: 'Expert Consultants' },
    ],
    howItWorksLabel: 'How it works',
    howItWorksHeading: 'How we support your legal and business objectives',
    howItWorksLead:
      'Include practical guidance on compliance, governance, and sector-specific legal strategy so visitors can quickly understand how we help.',
    howItWorksBody:
      'Showcase certifications, industry affiliations, and client outcomes to demonstrate credibility and establish trust with financial and corporate leaders.',
    howItWorksCtaLabel: 'Contact',
    howItWorksCtaHref: '/contact',
    howItWorksSteps: [
      {
        title: 'Understanding your goals',
        body: 'We begin with your legal and business objectives to define the right advisory strategy.',
        icon: '/images/theme/index2/icons/client1.svg',
      },
      {
        title: 'Comprehensive analysis',
        body: 'Our team reviews your compliance posture, risks, and opportunities across key functions.',
        icon: '/images/theme/index2/icons/client2.svg',
      },
      {
        title: 'Execution and ongoing support',
        body: 'We help implement legal solutions and stay with you through evolving regulations.',
        icon: '/images/theme/index2/icons/client3.svg',
      },
    ],
    caseLabel: 'Case Study',
    caseHeading: 'View our case study',
    caseItems: [
      {
        title: 'NBFC licensing & setup',
        summary: 'End-to-end RBI licensing, governance framework, and launch readiness for a new NBFC.',
        detail:
          'We supported the client through regulatory filings, board governance design, and operational launch milestones.',
        href: '/nbfc',
        imagePath: '/images/home/case-1.webp',
      },
      {
        title: 'Banking compliance program',
        summary: 'Designed a regulatory response and audit workflow for a financial institution.',
        detail:
          'Our team mapped compliance gaps, implemented monitoring workflows, and trained internal stakeholders.',
        href: '/pages/banking-finance',
        imagePath: '/images/home/case-2.webp',
      },
      {
        title: 'Corporate restructuring',
        summary: 'Led legal restructuring and documentation for growth-stage entities across jurisdictions.',
        detail:
          'We coordinated transaction documents, stakeholder approvals, and post-restructuring compliance.',
        href: '/pages/corporate-advisory',
        imagePath: '/images/home/case-3.webp',
      },
    ],
    testimonialsLabel: 'Our Clients Feedback',
    testimonialsHeading: 'Some words from our clients',
    blogLabel: 'Our Blog',
    blogHeading: 'Our latest news & blog',
    contactLabel: 'Contact Us',
    contactHeading: 'Get in touch with us today',
    contactFormTitle: 'Send Us A Message',
    contactFormIntro: 'Our response time is within 30 minutes during business hours.',
    contactEmailTitle: 'Email us today',
    contactPhoneTitle: 'Call or text',
    contactLocationTitle: 'Contact us',
    contactLocationText: 'Pan-India legal advisory with offices supporting clients across sectors.',
    ctaHeading: 'Let us help you grow your business',
    ctaText: 'Subscribe to updates and receive practical legal and regulatory insights from DSB Law Group.',
  };
}

export function parseHomePageJson(value: unknown): HomePageJson | null {
  const parsed = homePageJsonSchema.safeParse(value);
  return parsed.success ? parsed.data : null;
}

export function parseHomePageForm(formData: FormData): HomePageJson {
  return homePageJsonSchema.parse({
    template: 'home',
    version: 1,
    heroHeading: String(formData.get('heroHeading') ?? '').trim(),
    heroTagline: String(formData.get('heroTagline') ?? '').trim(),
    heroParagraphs: splitParagraphs(String(formData.get('heroParagraphs') ?? '')),
    heroCtaLabel: String(formData.get('heroCtaLabel') ?? '').trim(),
    heroCtaHref: String(formData.get('heroCtaHref') ?? '').trim(),
    heroImagePath: String(formData.get('heroImagePath') ?? '').trim(),
    heroBackgroundPath: String(formData.get('heroBackgroundPath') ?? '').trim(),
    heroBadgeYear: String(formData.get('heroBadgeYear') ?? '').trim(),
    heroBadgeText: String(formData.get('heroBadgeText') ?? '').trim(),
    heroChips: splitChips(String(formData.get('heroChips') ?? '')),
    aboutLabel: String(formData.get('aboutLabel') ?? '').trim(),
    aboutHeading: String(formData.get('aboutHeading') ?? '').trim(),
    aboutHighlight: String(formData.get('aboutHighlight') ?? '').trim(),
    aboutParagraphs: splitParagraphs(String(formData.get('aboutParagraphs') ?? '')),
    aboutCtaLabel: String(formData.get('aboutCtaLabel') ?? '').trim(),
    aboutCtaHref: String(formData.get('aboutCtaHref') ?? '').trim(),
    aboutImageMain: String(formData.get('aboutImageMain') ?? '').trim(),
    aboutImageSide1: String(formData.get('aboutImageSide1') ?? '').trim(),
    aboutImageSide2: String(formData.get('aboutImageSide2') ?? '').trim(),
    expertiseHeading: String(formData.get('expertiseHeading') ?? '').trim(),
    expertiseIntro: String(formData.get('expertiseIntro') ?? '').trim(),
    expertiseItems: splitLines(String(formData.get('expertiseItems') ?? '')),
    whyChooseHeading: String(formData.get('whyChooseHeading') ?? '').trim(),
    whyChooseCards: [0, 1, 2, 3].map((index) => readWhyChoose(formData, index)).filter((card) => card.title && card.description),
    visionHeading: String(formData.get('visionHeading') ?? '').trim(),
    visionText: String(formData.get('visionText') ?? '').trim(),
    missionHeading: String(formData.get('missionHeading') ?? '').trim(),
    missionParagraphs: splitParagraphs(String(formData.get('missionParagraphs') ?? '')),
    commitmentHeading: String(formData.get('commitmentHeading') ?? '').trim(),
    commitmentText: String(formData.get('commitmentText') ?? '').trim(),
    legacyHeading: String(formData.get('legacyHeading') ?? '').trim(),
    legacyParagraphs: splitParagraphs(String(formData.get('legacyParagraphs') ?? '')),
    founderHeading: String(formData.get('founderHeading') ?? '').trim(),
    founderName: String(formData.get('founderName') ?? '').trim(),
    founderRole: String(formData.get('founderRole') ?? '').trim(),
    founderParagraphs: splitParagraphs(String(formData.get('founderParagraphs') ?? '')),
    founderImagePath: String(formData.get('founderImagePath') ?? '').trim(),
    servicesLabel: String(formData.get('servicesLabel') ?? '').trim(),
    servicesHeading: String(formData.get('servicesHeading') ?? '').trim(),
    servicesIntro: String(formData.get('servicesIntro') ?? '').trim(),
    progressLabel: String(formData.get('progressSectionLabel') ?? '').trim(),
    progressHeading: String(formData.get('progressHeading') ?? '').trim(),
    progressParagraph: String(formData.get('progressParagraph') ?? '').trim(),
    progressBars: [0, 1].map((index) => readProgressBar(formData, index)).filter((bar) => bar.label),
    progressCtaLabel: String(formData.get('progressCtaLabel') ?? '').trim(),
    progressCtaHref: String(formData.get('progressCtaHref') ?? '').trim(),
    progressImagePath: String(formData.get('progressImagePath') ?? '').trim(),
    counters: [0, 1, 2, 3].map((index) => readCounter(formData, index)).filter((item) => item.value && item.label),
    howItWorksLabel: String(formData.get('howItWorksLabel') ?? '').trim(),
    howItWorksHeading: String(formData.get('howItWorksHeading') ?? '').trim(),
    howItWorksLead: String(formData.get('howItWorksLead') ?? '').trim(),
    howItWorksBody: String(formData.get('howItWorksBody') ?? '').trim(),
    howItWorksCtaLabel: String(formData.get('howItWorksCtaLabel') ?? '').trim(),
    howItWorksCtaHref: String(formData.get('howItWorksCtaHref') ?? '').trim(),
    howItWorksSteps: [0, 1, 2].map((index) => readStep(formData, index)).filter((step) => step.title && step.body),
    caseLabel: String(formData.get('caseLabel') ?? '').trim(),
    caseHeading: String(formData.get('caseHeading') ?? '').trim(),
    caseItems: [0, 1, 2].map((index) => readCase(formData, index)).filter((item) => item.title && item.summary),
    testimonialsLabel: String(formData.get('testimonialsLabel') ?? '').trim(),
    testimonialsHeading: String(formData.get('testimonialsHeading') ?? '').trim(),
    blogLabel: String(formData.get('blogLabel') ?? '').trim(),
    blogHeading: String(formData.get('blogHeading') ?? '').trim(),
    contactLabel: String(formData.get('contactLabel') ?? '').trim(),
    contactHeading: String(formData.get('contactHeading') ?? '').trim(),
    contactFormTitle: String(formData.get('contactFormTitle') ?? '').trim(),
    contactFormIntro: String(formData.get('contactFormIntro') ?? '').trim(),
    contactEmailTitle: String(formData.get('contactEmailTitle') ?? '').trim(),
    contactPhoneTitle: String(formData.get('contactPhoneTitle') ?? '').trim(),
    contactLocationTitle: String(formData.get('contactLocationTitle') ?? '').trim(),
    contactLocationText: String(formData.get('contactLocationText') ?? '').trim(),
    ctaHeading: String(formData.get('ctaHeading') ?? '').trim(),
    ctaText: String(formData.get('ctaText') ?? '').trim(),
  });
}

export function resolveHomeJsonFromPage(page: { contentJson: unknown } | null): HomePageJson {
  return parseHomePageJson(page?.contentJson) ?? defaultHomePageJson();
}
