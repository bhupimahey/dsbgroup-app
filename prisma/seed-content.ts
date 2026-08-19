import {
  ABOUT_PAGE_BODY_PLACEHOLDER,
  defaultAboutPageJson,
} from '../src/lib/site/about-page-json';
import {
  defaultHomePageJson,
  HOME_PAGE_BODY_PLACEHOLDER,
} from '../src/lib/site/home-page-json';
import {
  defaultServicesIndexJson,
  SERVICES_INDEX_BODY_PLACEHOLDER,
} from '../src/lib/site/service-page-json';
import {
  defaultNbfcPageJson,
  NBFC_PAGE_BODY_PLACEHOLDER,
} from '../src/lib/site/nbfc-page-json';
import {
  defaultHrLabourPageJson,
  HR_LABOUR_PAGE_BODY_PLACEHOLDER,
} from '../src/lib/site/hr-labour-page-json';
import { buildServiceCategoryPages } from '../src/lib/site/service-seed-data';

const SERVICE_CATEGORY_PAGES = buildServiceCategoryPages();
const SERVICES_INDEX_JSON = defaultServicesIndexJson();
const NBFC_PAGE_JSON = defaultNbfcPageJson();
const HR_LABOUR_PAGE_JSON = defaultHrLabourPageJson();

const ABOUT_PAGE_JSON = defaultAboutPageJson();
const HOME_PAGE_JSON = defaultHomePageJson();

const CMS_PAGES = [
  {
    slug: 'home',
    title: HOME_PAGE_JSON.heroHeading,
    body: HOME_PAGE_BODY_PLACEHOLDER,
    contentJson: HOME_PAGE_JSON,
    metaTitle: `${HOME_PAGE_JSON.heroHeading} | ${HOME_PAGE_JSON.heroTagline}`,
    metaDescription:
      'DSB Law Group is a full-service Indian law firm providing legal, regulatory and business advisory solutions across India.',
    metaKeywords: 'DSB Law Group, legal consultants, NBFC, corporate advisory, taxation',
  },
  {
    slug: 'about',
    title: ABOUT_PAGE_JSON.introHeading,
    body: ABOUT_PAGE_BODY_PLACEHOLDER,
    contentJson: ABOUT_PAGE_JSON,
    metaTitle: ABOUT_PAGE_JSON.heroTitle,
    metaDescription:
      'About DSB Law Group — corporate and financial consulting with expertise in banking, NBFC, corporate law and regulatory advisory across India.',
    metaKeywords: 'DSB Law, about us, legal firm, NBFC, corporate advisory',
  },
  {
    slug: 'services',
    title: SERVICES_INDEX_JSON.heroTitle,
    body: SERVICES_INDEX_BODY_PLACEHOLDER,
    contentJson: SERVICES_INDEX_JSON,
    metaTitle: 'Our Services | DSB Law Group',
    metaDescription:
      'Legal, regulatory, financial and business advisory services from DSB Law Group — corporate advisory, banking, taxation, audit, M&A and more.',
    metaKeywords: 'services, legal services, corporate advisory, DSB Law',
  },
  {
    slug: 'achievements',
    title: 'Achievements',
    body: '<p>DSB Law Group has been recognized for regulatory excellence, client retention, and award-winning advisory across banking, NBFC, and corporate mandates.</p><p>Content can be updated here from the admin panel.</p>',
    metaTitle: 'Achievements',
    metaDescription: 'Awards and milestones — DSB Law Group.',
    metaKeywords: 'achievements, awards, DSB Law',
  },
  {
    slug: 'nbfc',
    title: NBFC_PAGE_JSON.introHeading,
    body: NBFC_PAGE_BODY_PLACEHOLDER,
    contentJson: NBFC_PAGE_JSON,
    metaTitle: NBFC_PAGE_JSON.heroTitle,
    metaDescription:
      'DSB Law Group advises Non-Banking Financial Companies on incorporation, RBI licensing, regulatory compliance, restructuring and strategic growth.',
    metaKeywords: 'NBFC, RBI, licensing, compliance, non-banking financial company',
  },
  {
    slug: 'ucbs',
    title: "UCB's",
    body: '<p>Advisory for Urban Cooperative Banks — governance, RBI compliance, audits, and regulatory submissions.</p>',
    metaTitle: "UCB's — Urban Cooperative Banks",
    metaDescription: 'Urban Cooperative Bank regulatory and legal advisory.',
    metaKeywords: 'UCB, cooperative bank, RBI',
  },
  {
    slug: 'hr-labour-laws',
    title: 'HR & Labour Laws',
    body: '<p>Advisory on employment law, industrial disputes, and HR compliance programmes.</p><p>See also our dedicated <a href="/pages/labour-law">Labor &amp; Industrial Law</a> practice page.</p>',
    metaTitle: 'HR & Labour Laws',
    metaDescription: 'Labour and industrial law advisory services.',
    metaKeywords: 'labour law, HR compliance, industrial law',
  },
  {
    slug: 'about-hr-labour-law',
    title: HR_LABOUR_PAGE_JSON.heroTitle,
    body: HR_LABOUR_PAGE_BODY_PLACEHOLDER,
    contentJson: HR_LABOUR_PAGE_JSON,
    metaTitle: HR_LABOUR_PAGE_JSON.heroTitle,
    metaDescription:
      'HR and labour law advisory from DSB Law Group — employment documentation, wages, POSH, social security and workforce compliance.',
    metaKeywords: 'HR, labour law, employment, POSH, labour codes',
  },
  {
    slug: 'new-labour-codes-compliance',
    title: 'New Labour Codes Compliance',
    body: '<p>Guidance on India&apos;s new labour codes — compliance roadmaps, policy updates, and employer obligations.</p>',
    metaTitle: 'New Labour Codes Compliance',
    metaDescription: 'Labour code compliance advisory for employers.',
    metaKeywords: 'labour codes, compliance, HR',
  },
  {
    slug: 'dinesh-gupta',
    title: 'Dinesh Gupta & Co.',
    body: '<p>Dinesh Gupta &amp; Co. is associated with DSB Law Group, providing integrated financial, legal, and corporate advisory.</p><p>Profile content can be edited from the admin CMS.</p>',
    metaTitle: 'Dinesh Gupta & Co.',
    metaDescription: 'Dinesh Gupta & Co. — DSB Law Group.',
    metaKeywords: 'Dinesh Gupta, Dinesh Gupta and Co',
  },
  {
    slug: 'research',
    title: 'Research',
    body: '<p>Research publications and regulatory commentary from DSB Law Group.</p>',
    metaTitle: 'Research',
    metaDescription: 'Legal and regulatory research — DSB Law Group.',
    metaKeywords: 'research, publications, legal',
  },
  {
    slug: 'podcasts',
    title: 'Podcasts',
    body: '<p>Podcast episodes and audio insights from DSB Law Group advisors.</p>',
    metaTitle: 'Podcasts',
    metaDescription: 'DSB Law Group podcasts.',
    metaKeywords: 'podcasts, audio, legal insights',
  },
  {
    slug: 'video-lectures',
    title: 'Video Lectures',
    body: '<p>Video lectures and webinars on banking, NBFC, taxation, and corporate law topics.</p>',
    metaTitle: 'Video Lectures',
    metaDescription: 'Video lectures and webinars — DSB Law Group.',
    metaKeywords: 'video, webinars, lectures',
  },
  {
    slug: 'disclaimer',
    title: 'Disclaimer',
    body: '<p>This website is for general information only and does not constitute legal advice. Contact DSB Law Group for advice specific to your situation.</p>',
    metaTitle: 'Disclaimer',
    metaDescription: 'Website disclaimer — DSB Law Group.',
    metaKeywords: 'disclaimer',
  },
  {
    slug: 'privacy',
    title: 'Privacy Policy',
    body: '<p>Our privacy policy describes how we collect, use, and protect your personal information.</p>',
    metaTitle: 'Privacy Policy',
    metaDescription: 'DSB Law Group privacy policy.',
    metaKeywords: 'privacy policy',
  },
  {
    slug: 'terms',
    title: 'Terms & Conditions',
    body: '<p>Terms governing use of this website and our services.</p>',
    metaTitle: 'Terms & Conditions',
    metaDescription: 'Website terms and conditions.',
    metaKeywords: 'terms and conditions',
  },
  {
    slug: 'careers',
    title: 'Career Opportunities',
    body: '<p>Join DSB Law Group — send your CV via the contact form with the subject Careers.</p>',
    metaTitle: 'Careers',
    metaDescription: 'Career opportunities at DSB Law Group.',
    metaKeywords: 'careers, jobs, legal careers',
  },
  ...SERVICE_CATEGORY_PAGES,
];

export { CMS_PAGES, SERVICE_CATEGORY_PAGES };
