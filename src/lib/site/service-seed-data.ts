import type { ServiceDetailJson } from '@/lib/site/service-page-json';
import { defaultServiceDetailJson } from '@/lib/site/service-page-json';

export type ServiceSeed = {
  slug: string;
  name: string;
  teaser: string;
  description?: string;
  imagePath?: string;
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
    teaser:
      'Incorporation, governance, regulatory approvals and corporate legal advisory for businesses at every stage.',
    metaDescription: 'Corporate advisory, incorporation, governance and regulatory compliance — DSB Law Group.',
    content: detail(
      'Corporate Advisory',
      'Incorporation, governance, regulatory approvals and corporate legal advisory for businesses at every stage.',
      [
        'DSB Law Group provides comprehensive corporate law advisory services to companies, promoters, directors and management teams across different stages of the business lifecycle. We assist clients with incorporation, governance, regulatory compliance, commercial documentation, restructuring and representation before corporate authorities.',
        'Our multidisciplinary team combines legal, secretarial, financial and regulatory expertise to deliver practical solutions aligned with applicable company law requirements and the client’s commercial objectives.',
      ],
      [
        'Incorporation and registration of companies and other business entities',
        'Wholly owned subsidiaries, branch offices, liaison offices and project offices',
        'Corporate governance and board-level compliance advisory',
        'Drafting and review of shareholder agreements, commercial contracts and internal policies',
        'Preparation of employment, consultancy and management agreements',
        'Advisory on statutory filings, disclosures and regulatory approvals',
        'Corporate restructuring, mergers, amalgamations and capital reorganisation',
        'Legal and secretarial due diligence',
        'Representation before NCLT, NCLAT, Regional Directors and Registrars of Companies',
        'Advisory on directors’ duties, liabilities and governance responsibilities',
        'Ongoing company secretarial and compliance support',
      ],
      {
        secondaryHeading: 'Supporting Businesses Through Every Stage',
        secondaryParagraph:
          'Our corporate law practice is focused on helping organisations establish strong legal foundations, maintain regulatory discipline and manage change effectively. From setting up a new company to handling restructuring or complex governance matters, we provide clear, coordinated and commercially relevant support.',
        benefitsHeading: 'Our Corporate Advisory Services',
        benefitsIntro:
          'We assist companies, promoters, directors and management teams across incorporation, governance, restructuring, commercial documentation and representation.',
        benefitsClosing:
          'By working closely with promoters, boards and management teams, DSB Law Group helps businesses reduce legal risk, improve decision-making and remain compliant while pursuing long-term growth.',
      },
    ),
  },
  {
    slug: 'business-advisory',
    name: 'Business Advisory',
    teaser:
      'Business transformation, strategic planning and process optimisation to prepare organisations for sustainable growth.',
    metaDescription: 'Business transformation, strategic planning and process optimisation — DSB Law Group.',
    content: detail(
      'Business Advisory',
      'Business transformation, strategic planning and process optimisation to prepare organisations for sustainable growth.',
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
        'Business process management',
        'Technology-enabled transformation support',
      ],
    ),
  },
  {
    slug: 'banking-finance',
    name: 'Banking & Finance',
    teaser:
      'Legal, regulatory and strategic advisory for banks, financial institutions and businesses within India’s financial ecosystem.',
    metaDescription: 'Banking, RBI regulatory advisory and financial-sector compliance — DSB Law Group.',
    content: detail(
      'Banking & Finance',
      'Legal, regulatory and strategic advisory for banks, financial institutions and businesses within India’s financial ecosystem.',
      [
        'DSB Law Group provides legal, regulatory and strategic advisory services to banks, financial institutions and businesses operating within India’s banking and financial ecosystem.',
        'Our team assists clients in understanding and complying with the regulatory framework prescribed by the authorities. We combine legal knowledge, financial insight and practical industry experience to support institutions in managing regulatory obligations, structuring transactions and strengthening internal governance.',
      ],
      [
        'Advisory on RBI regulations, directions and compliance requirements',
        'Guidance on banking laws and the Indian financial regulatory framework',
        'Support for fundraising, financing structures and capital planning',
        'Advisory on lending, credit development and credit-management frameworks',
        'Assistance with asset securitisation and structured finance transactions',
        'Review of banking documentation, agreements and operational policies',
        'Regulatory compliance reviews and risk assessments',
        'Support for internal controls, governance and reporting systems',
        'Advisory on cross-border banking and FEMA-related matters',
        'Assistance during regulatory inspections, audits and representations',
      ],
      {
        secondaryHeading: 'Practical Support for Financial Institutions',
        secondaryParagraph:
          'Our approach is focused on helping clients interpret regulatory requirements clearly and implement them effectively. Whether the requirement involves a new financial product, transaction structuring, compliance review or regulatory response, DSB Law Group provides coordinated and commercially practical support.',
        benefitsHeading: 'Our Banking & Finance Services',
        benefitsIntro:
          'We advise banks, NBFCs and businesses on regulatory, operational and transactional matters within India’s financial sector.',
        benefitsClosing:
          'We work closely with management, compliance teams and financial professionals to identify risks, improve processes and build a stronger foundation for responsible and sustainable operations.',
      },
    ),
  },
  {
    slug: 'joint-ventures',
    name: 'Joint Ventures',
    teaser:
      'End-to-end support for joint ventures, strategic alliances and cross-border partnership structures.',
    metaDescription: 'Joint venture structuring, alliances and transaction advisory — DSB Law Group.',
    content: detail(
      'Joint Ventures',
      'End-to-end support for joint ventures, strategic alliances and cross-border partnership structures.',
      [
        'We provide end-to-end support for joint ventures, strategic alliances and cross-border partnership structures.',
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
    teaser:
      'Advisory for private equity investments, fund structures and transaction documentation across India.',
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
    teaser:
      'End-to-end M&A support including scheme structuring, regulatory approvals and NCLT petitions.',
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
    teaser:
      'Direct and indirect tax planning, GST compliance and transaction-related tax advisory.',
    metaDescription: 'Direct and indirect tax planning, GST and compliance — DSB Law Group.',
    content: detail(
      'Taxation',
      'Direct and indirect tax planning, GST compliance and transaction-related tax advisory.',
      [
        'DSB Law Group provides comprehensive taxation advisory and compliance support to businesses, promoters, investors and financial institutions. We assist clients with direct and indirect tax matters, transaction structuring, regulatory compliance and tax-efficient business planning.',
        'Our multidisciplinary team combines legal, financial and tax expertise to deliver practical solutions that align with applicable laws, commercial objectives and evolving regulatory requirements.',
      ],
      [
        'Direct tax planning and advisory',
        'GST and indirect tax compliance',
        'Advance tax and TDS advisory',
        'Corporate income-tax return support',
        'Tax advisory for business restructuring and transactions',
        'Cross-border taxation and FEMA-related tax matters',
        'Transfer pricing advisory and documentation',
        'Tax support for private equity and foreign investments',
        'Review of tax positions, exposures and compliance gaps',
        'Assistance with assessments, notices and representations before tax authorities',
        'Tax due diligence for mergers, acquisitions and investments',
        'Advisory on internal tax processes and reporting systems',
      ],
      {
        secondaryHeading: 'Practical and Compliant Tax Solutions',
        secondaryParagraph:
          'Our approach is focused on helping clients manage tax obligations with clarity while reducing avoidable risk. We work closely with management and finance teams to identify potential issues, improve compliance processes and structure transactions efficiently.',
        benefitsHeading: 'Our Taxation Services',
        benefitsIntro:
          'We assist businesses with direct and indirect tax planning, compliance and transaction-related tax matters.',
        benefitsClosing:
          'Whether the requirement involves routine compliance, a complex transaction, cross-border investment or a tax dispute, DSB Law Group provides coordinated, timely and commercially relevant support.',
      },
    ),
  },
  {
    slug: 'audit',
    name: 'Audit',
    teaser:
      'Internal, concurrent and regulatory audits for banks, NBFCs and corporate organisations.',
    metaDescription: 'Internal, concurrent and regulatory audit services — DSB Law Group.',
    content: detail(
      'Audit',
      'Internal, concurrent and regulatory audits for banks, NBFCs and corporate organisations.',
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
        'Follow-up and integrated audits',
        'Internal-control and process reviews',
      ],
    ),
  },
  {
    slug: 'intellectual-property',
    name: 'Intellectual Property Rights',
    teaser:
      'Registration, licensing and enforcement of trademarks, copyrights, patents and designs across India and overseas.',
    metaDescription: 'Trademark, copyright, patent and IP enforcement — DSB Law Group.',
    content: detail(
      'Intellectual Property Rights',
      'Registration, licensing and enforcement of trademarks, copyrights, patents and designs across India and overseas.',
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
        'Counterfeit and unfair-competition matters',
        'Intellectual-property portfolio management',
      ],
    ),
  },
  {
    slug: 'labour-law',
    name: 'Labor & Industrial Law',
    teaser:
      'Employment law, industrial disputes, POSH compliance and new labour codes advisory for organisations.',
    metaDescription: 'Employment law, industrial disputes and HR compliance — DSB Law Group.',
    content: detail(
      'Labor & Industrial Law',
      'Employment law, industrial disputes, POSH compliance and new labour codes advisory for organisations.',
      [
        'Labour law compliance is increasingly important for business continuity, workforce stability and risk management. With India’s evolving labour law framework, organisations must regularly review their employment practices, wage structures, policies and statutory compliance systems.',
        'With a legacy of over six decades in labour law advisory, DSB Law Group assists businesses in developing practical and legally compliant workforce frameworks aligned with operational requirements.',
      ],
      [
        'Employment and HR documentation',
        'Wage and compensation advisory',
        'Workforce restructuring, retrenchment and closure',
        'Social security compliance (PF, ESI, gratuity, maternity)',
        'Labour law audits and regulatory support',
        'Industrial relations and dispute resolution',
        'Workplace safety and POSH compliance',
        'New-age workforce and gig worker advisory',
      ],
      {
        secondaryHeading: 'We Help Prevent Labour Issues, Not Just Resolve Them',
        secondaryParagraph:
          'At DSB Law Group, we help organisations build stronger workplace systems, reduce compliance risks and manage their workforce with confidence.',
      },
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

export function buildServiceCategoryRecords() {
  return SERVICE_SEED_DATA.map((item, index) => ({
    slug: item.slug,
    name: item.name,
    teaser: item.teaser,
    description: item.description ?? null,
    imagePath: item.imagePath ?? null,
    sortOrder: index,
  }));
}
