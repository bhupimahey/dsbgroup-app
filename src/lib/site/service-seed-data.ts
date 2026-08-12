import type { ServiceDetailJson } from '@/lib/site/service-page-json';
import { defaultServiceDetailJson } from '@/lib/site/service-page-json';

type ServiceSeed = {
  slug: string;
  name: string;
  metaDescription: string;
  content: ServiceDetailJson;
};

function detail(
  name: string,
  cardTeaser: string,
  intro: string[],
  bullets: string[],
  extra?: Partial<ServiceDetailJson>,
): ServiceDetailJson {
  const base = defaultServiceDetailJson(name, bullets);
  return {
    ...base,
    cardTeaser,
    introParagraphs: intro,
    benefitBullets: bullets,
    ...extra,
  };
}

export const SERVICE_SEED_DATA: ServiceSeed[] = [
  {
    slug: 'corporate-advisory',
    name: 'Corporate Advisory',
    metaDescription: 'Corporate advisory, incorporation, governance and regulatory compliance — DSB Law Group.',
    content: detail(
      'Corporate Advisory',
      'We support businesses with incorporation, governance, regulatory approvals and corporate legal matters.',
      [
        'We support businesses with incorporation, governance, regulatory approvals and corporate legal matters.',
        'From company registration and subsidiary structuring to contracts, policies and representations before NCLT, NCLAT, Regional Directors and Registrars of Companies, DSB Law Group provides end-to-end corporate advisory.',
      ],
      [
        'Company incorporation and registration',
        'Wholly owned subsidiaries, branch offices, liaison offices and project offices',
        'Corporate contracts, policies and governance documents',
        'Employment and commercial agreements',
        'Government approvals and regulatory compliance',
        'Representation before NCLT, NCLAT, Regional Directors and ROCs',
      ],
    ),
  },
  {
    slug: 'business-advisory',
    name: 'Business Advisory',
    metaDescription: 'Business transformation, strategic planning and process optimisation — DSB Law Group.',
    content: detail(
      'Business Advisory',
      'We help organisations improve performance, strengthen internal processes and prepare for sustainable growth.',
      [
        'We help organisations improve performance, strengthen internal processes and prepare for sustainable growth.',
        'Our business advisory practice supports transformation programmes, operational restructuring and technology-enabled change aligned with long-term commercial objectives.',
      ],
      [
        'Business transformation advisory',
        'Strategic planning and implementation support',
        'Business process re-engineering',
        'Process optimisation and efficiency improvement',
        'Organisational and operational restructuring',
        'Technology-enabled transformation support',
      ],
    ),
  },
  {
    slug: 'banking-finance',
    name: 'Banking & Finance',
    metaDescription: 'Banking, RBI regulatory advisory and financial-sector compliance — DSB Law Group.',
    content: detail(
      'Banking & Finance',
      'We advise financial institutions and businesses on regulatory, operational and transactional matters within India\'s financial sector.',
      [
        'We advise financial institutions and businesses on regulatory, operational and transactional matters within India\'s financial sector.',
        'DSB Law Group assists clients with RBI compliance, fundraising structures, lending frameworks, asset securitisation and regulatory reviews for banks and NBFCs.',
      ],
      [
        'RBI regulatory advisory',
        'Banking and financial-sector compliance',
        'Fundraising and financing structures',
        'Credit development and lending frameworks',
        'Asset securitisation advisory',
        'Regulatory support for banks and NBFCs',
      ],
    ),
  },
  {
    slug: 'joint-ventures',
    name: 'Joint Ventures',
    metaDescription: 'Joint venture structuring, alliances and transaction advisory — DSB Law Group.',
    content: detail(
      'Joint Ventures',
      'We provide end-to-end support for joint ventures, strategic alliances and cross-border partnership structures.',
      [
        'We provide end-to-end support for investments, acquisitions, restructuring and strategic transactions including joint ventures and alliances.',
        'Our team assists with due diligence, documentation, regulatory approvals and commercial structuring for domestic and international partnerships.',
      ],
      [
        'Joint ventures and strategic alliances',
        'Legal and commercial due diligence',
        'Transaction documentation and negotiations',
        'Business valuation and financial structuring',
        'RBI, SEBI and other regulatory approvals',
        'Cross-border partnership advisory',
      ],
    ),
  },
  {
    slug: 'private-equity',
    name: 'Private Equity',
    metaDescription: 'Private equity transactions, due diligence and regulatory advisory — DSB Law Group.',
    content: detail(
      'Private Equity',
      'Advisory for private equity investments, fund structures and transaction documentation across India.',
      [
        'We advise on private equity and investment transactions — from term sheets and due diligence to closing and post-investment compliance.',
        'DSB Law Group supports investors, funds and promoters with regulatory, tax and corporate structuring for PE mandates.',
      ],
      [
        'Private equity and investment transactions',
        'Legal and commercial due diligence',
        'Transaction documentation and negotiations',
        'Tax support for private equity and foreign investments',
        'RBI, SEBI and other regulatory approvals',
        'Business valuation and financial structuring',
      ],
    ),
  },
  {
    slug: 'mergers-acquisitions',
    name: 'Mergers & Acquisitions',
    metaDescription: 'M&A advisory, amalgamations and NCLT petitions — DSB Law Group.',
    content: detail(
      'Mergers & Acquisitions',
      'End-to-end M&A support including scheme structuring, regulatory approvals and NCLT petitions.',
      [
        'We provide comprehensive support for mergers, acquisitions, amalgamations and corporate restructuring mandates.',
        'Our team manages due diligence, transaction documents, stakeholder approvals and representations before NCLT and regulatory authorities.',
      ],
      [
        'Mergers, acquisitions and amalgamations',
        'Legal and commercial due diligence',
        'Transaction documentation and negotiations',
        'RBI, SEBI and other regulatory approvals',
        'NCLT petitions for mergers and amalgamations',
        'Post-transaction integration and compliance',
      ],
    ),
  },
  {
    slug: 'taxation',
    name: 'Taxation',
    metaDescription: 'Direct and indirect tax planning, GST and compliance — DSB Law Group.',
    content: detail(
      'Taxation',
      'We assist businesses with direct and indirect tax planning, compliance and transaction-related tax matters.',
      [
        'We assist businesses with direct and indirect tax planning, compliance and transaction-related tax matters.',
        'Our taxation practice covers corporate tax, GST, TDS, cross-border taxation and transfer pricing for domestic and international clients.',
      ],
      [
        'Direct tax planning and advisory',
        'GST and indirect tax compliance',
        'Advance tax and TDS advisory',
        'Corporate tax return support',
        'Cross-border taxation',
        'Transfer-pricing advisory',
      ],
    ),
  },
  {
    slug: 'audit',
    name: 'Audit',
    metaDescription: 'Internal, concurrent and regulatory audit services — DSB Law Group.',
    content: detail(
      'Audit',
      'Our audit services help organisations strengthen controls, improve compliance and identify operational risks.',
      [
        'Our audit services help organisations strengthen controls, improve compliance and identify operational risks.',
        'We conduct internal, concurrent, credit and IT audits tailored to banks, NBFCs and corporates.',
      ],
      [
        'Internal audits',
        'Concurrent and investment audits',
        'Credit audits for banks and NBFCs',
        'Information Technology audits',
        'Cost and revenue audits',
        'Internal-control and process reviews',
      ],
    ),
  },
  {
    slug: 'intellectual-property',
    name: 'Intellectual Property Rights',
    metaDescription: 'Trademark, copyright, patent and IP enforcement — DSB Law Group.',
    content: detail(
      'Intellectual Property Rights',
      'We help businesses protect, manage and commercialise their intellectual property assets.',
      [
        'We help businesses protect, manage and commercialise their intellectual property assets.',
        'From registration and licensing to enforcement and portfolio management, DSB Law Group provides integrated IPR advisory.',
      ],
      [
        'Trademark, copyright, patent and design registration',
        'IPR licensing and assignment agreements',
        'Brand protection and infringement advisory',
        'Copyright, patent and design enforcement',
        'Franchising and technology-transfer agreements',
        'Intellectual-property portfolio management',
      ],
    ),
  },
  {
    slug: 'labour-law',
    name: 'Labor & Industrial Law',
    metaDescription: 'Employment law, industrial disputes and HR compliance — DSB Law Group.',
    content: detail(
      'Labor & Industrial Law',
      'Advisory on employment law, industrial disputes, POSH compliance and workforce structuring.',
      [
        'DSB Law Group advises employers on employment contracts, industrial disputes, retrenchment, POSH compliance and new labour code obligations.',
        'We help organisations build compliant HR frameworks while managing workforce-related legal and regulatory risk.',
      ],
      [
        'Employment and industrial law advisory',
        'Workforce structuring and contracts',
        'Industrial disputes and litigation support',
        'POSH compliance and workplace policies',
        'New labour codes compliance',
        'HR and regulatory audit support',
      ],
    ),
  },
];

export function serviceSeedBySlug(slug: string): ServiceSeed | undefined {
  return SERVICE_SEED_DATA.find((item) => item.slug === slug);
}

export function buildServiceCategoryPages() {
  return SERVICE_SEED_DATA.map((item) => ({
    slug: item.slug,
    title: item.name,
    body: '<p>Service page content is managed in the structured editor below.</p>',
    contentJson: item.content,
    metaTitle: `${item.name} | DSB Law Group`,
    metaDescription: item.metaDescription,
    metaKeywords: `${item.slug.replace(/-/g, ', ')}, DSB Law, legal services`,
  }));
}
