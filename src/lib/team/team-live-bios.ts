import type { TeamGroup } from '@/generated/prisma/client';
import { DINESH_GUPTA_BIO } from '@/lib/team/dinesh-gupta-profile';
import { teamTeaser } from '@/lib/team/constants';

export type TeamLiveMember = {
  id: string;
  name: string;
  title: string;
  bio: string;
  teaser: string;
  group: TeamGroup;
  branch?: string;
  phone?: string;
  email?: string;
  sortOrder: number;
};

function member(
  data: Omit<TeamLiveMember, 'teaser'> & { teaser?: string },
): TeamLiveMember {
  return {
    ...data,
    teaser: data.teaser?.trim() || teamTeaser(data.bio),
  };
}

/** Roster and bios from the client “Our People” document. */
export const TEAM_LIVE_MEMBERS: TeamLiveMember[] = [
  member({
    id: 'seed-dinesh-gupta',
    name: 'Dinesh Gupta',
    title: 'Co-founder and Managing Partner',
    group: 'MANAGING_PARTNERS_CEO',
    phone: '+91-181-228-0315',
    email: 'info@dsblawgroup.com',
    sortOrder: 0,
    bio: DINESH_GUPTA_BIO,
  }),
  member({
    id: 'seed-deepali-gupta',
    name: 'Deepali Gupta',
    title: 'Managing Partner',
    group: 'MANAGING_PARTNERS_CEO',
    sortOrder: 1,
    bio: `Ms Deepali Gupta is the Managing Partner of DSB Law Group and has been an integral part of the firm’s growth and professional development. A focused, confident and dedicated advocate, she brings a strong sense of integrity, responsibility and client commitment to her role.

With more than 15 years of experience in taxation and legal advisory, Ms Gupta plays a key role in overseeing the firm’s tax-related matters and ensuring that clients remain aligned with applicable legal and regulatory requirements. Her ability to understand complex issues and present clear, practical solutions enables her to serve a diverse range of clients effectively.

Ms Gupta has also served as a Director of Citizens Urban Cooperative Bank, adding valuable institutional and governance experience to her professional profile. Her exposure to both legal practice and the cooperative banking sector strengthens her ability to advise on matters involving taxation, compliance and business operations.

Known for her strong communication skills and adaptability, she works effectively in a dynamic legal environment and responds efficiently to evolving client and regulatory requirements. She is also actively involved in the firm’s strategic planning, development of new initiatives and representation before professional and reputed forums.

Ms Gupta holds a degree in law and a Master’s degree in English. Her professional discipline, analytical approach and commitment to excellence continue to contribute significantly to the firm’s growth and client service.`,
  }),
  member({
    id: 'seed-kanika-gupta',
    name: 'Kanika Gupta',
    title: 'Chief Executive Officer',
    group: 'MANAGING_PARTNERS_CEO',
    sortOrder: 2,
    bio: `Ms Kanika Gupta is the Chief Executive Officer of DSB Law Group and a qualified Chartered Accountant with over nine years of professional experience in taxation, audit, financial management and corporate advisory. An alumna of Shri Ram College of Commerce, she brings together strong financial expertise, commercial understanding and strategic leadership to guide the firm’s continued growth.

As Chief Executive Officer, Ms. Gupta works closely with the Founder Director, Managing Partners and the executive leadership team to define and implement the firm’s strategic roadmap. She plays a central role in translating the organisation’s long-term vision into focused business priorities, strengthening internal systems and ensuring that the firm remains responsive to the evolving legal, regulatory and commercial needs of its clients.

Her experience as a Chartered Accountant enables her to contribute meaningfully to matters involving financial planning, taxation, audit, risk management, corporate governance and business structuring. She combines this technical foundation with a practical understanding of organisational management, allowing her to support both the professional and operational functions of DSB Law Group.

Her responsibilities extend across business planning, financial oversight, operational management, service-delivery standards and organisational development. She supports the expansion of the firm’s practice areas, evaluates new business opportunities and ensures that its resources, systems and professional capabilities remain aligned with strategic objectives.

Ms. Gupta is also actively involved in mentoring professionals, developing leadership capabilities and promoting coordination among the firm’s multidisciplinary teams. Her leadership encourages accountability, transparency, innovation and professional integrity, while ensuring that technical expertise is consistently supported by a clear understanding of each client’s business requirements.

She oversees the alignment of operations across DSB Law Group’s offices in Jalandhar, Mumbai, New Delhi, Jaipur, Pune and Ludhiana. Through structured planning and effective coordination, she contributes to maintaining consistency in client service, internal communication and implementation of organisational policies across locations.

With her combination of Chartered Accountancy expertise, financial acumen, strategic perspective and people-focused leadership, Ms Gupta plays a vital role in strengthening DSB Law Group’s institutional capabilities and advancing its vision of delivering integrated, dependable and high-impact legal, financial, regulatory and corporate advisory solutions.`,
  }),
  member({
    id: 'seed-nitin-jain',
    name: 'Nitin Jain',
    title: 'Chartered Accountant',
    group: 'PARTNERS_DIRECTORS',
    sortOrder: 0,
    bio: `Mr Nitin Jain is a dedicated Chartered Accountant associated with DSB Law Group, specialising in internal audits of banks, Non-Banking Financial Companies and corporate organisations. With a methodical approach and strong attention to detail, he brings analytical depth, professional discipline and sector-specific expertise to each assignment.

He is actively involved in planning, supervising and executing internal audit engagements, risk assessments and compliance reviews for a diverse portfolio of financial and corporate clients. His work focuses on evaluating internal controls, identifying operational and regulatory risks and supporting organisations in strengthening their governance and compliance frameworks.

Mr Jain also oversees audit assignments relating to NBFCs, where he applies his understanding of financial operations, regulatory requirements and internal control systems to ensure that audit processes are comprehensive and aligned with applicable standards.

Through his structured approach and commitment to accuracy, he contributes to greater transparency, operational efficiency and regulatory adherence across client organisations. His professional insight and practical understanding of audit and risk management make him an important part of DSB Law Group’s multidisciplinary advisory team.`,
  }),
  member({
    id: 'seed-saurabh-gupta',
    name: 'Saurabh Kumar Gupta',
    title: 'Civil and Criminal Litigation',
    group: 'PARTNERS_DIRECTORS',
    sortOrder: 1,
    bio: `Mr Saurabh Kumar Gupta is a legal professional with over six years of experience in civil and criminal litigation. He regularly appears before Civil Courts in Jalandhar, Kapurthala and Phagwara, as well as Labour Courts, the office of the Commissioner, Jalandhar Division, the Joint Registrar of Cooperative Societies and Consumer Courts.

His practice covers a wide range of matters, including civil disputes, revenue matters, service-related issues, labour disputes, SARFAESI proceedings, cooperative society matters, consumer disputes, matrimonial cases and criminal matters. He also provides legal consultancy to individuals, businesses and other establishments in these areas of law.

Mr Gupta is particularly experienced in advising on service matters, labour-related issues, matrimonial disputes, civil and revenue matters. He is also involved in the drafting and preparation of legal documents, pleadings and other case-related materials.

Through his practical courtroom experience and broad exposure to litigation and advisory work, he contributes to DSB Law Group’s ability to provide clients with clear legal guidance, effective representation and well-prepared documentation across diverse disputes.`,
  }),
  member({
    id: 'seed-shifali-singla',
    name: 'Shifali Singla',
    title: 'Company Secretary',
    group: 'PARTNERS_DIRECTORS',
    sortOrder: 2,
    bio: `Ms Shifali Singla is a Company Secretary associated with DSB Law Group, with experience in corporate and company law matters. She supports the firm in handling statutory compliance, corporate documentation, regulatory filings and other secretarial assignments for client organisations.

Her academic background in commerce, together with her Company Secretary qualification and CA Intermediate studies, provides her with a sound understanding of corporate, financial and compliance-related matters. This multidisciplinary foundation enables her to approach assignments with both regulatory awareness and commercial understanding.

Ms Singla assists in maintaining corporate records, preparing statutory documents and supporting companies in meeting their obligations under applicable corporate laws. Through her organised approach and attention to detail, she contributes to the timely and accurate execution of the firm’s corporate compliance work.

She holds a Bachelor of Commerce degree from Guru Nanak Dev University and has completed CA Intermediate. Her developing expertise in corporate advisory and compliance supports DSB Law Group’s commitment to providing dependable and structured secretarial services.`,
  }),
  member({
    id: 'seed-nikita-arora',
    name: 'Nikita Arora',
    title: 'Corporate Laws, Legal and Intellectual Property Rights',
    group: 'PARTNERS_DIRECTORS',
    sortOrder: 3,
    bio: `Ms Nikita Arora is a Fellow Member of the Institute of Company Secretaries of India and holds degrees in Commerce and Law. She heads the Corporate Laws, Legal and Intellectual Property Rights practice at DSB Law Group’s Delhi office and brings more than a decade of experience in advising Indian and overseas clients on corporate, regulatory and legal matters.

Her practice covers corporate advisory, secretarial compliance, due diligence, corporate governance, legal documentation, negotiations and regulatory matters under the Companies Act, SEBI framework and RBI regulations. She has advised clients on setting up business entities in India, structuring foreign investments and facilitating transactions involving Foreign Direct Investment.

Ms Arora has conducted due diligence assignments across multiple sectors and has advised clients on joint ventures, general corporate matters and ongoing regulatory compliance. She has also been involved in secretarial and compliance audits of public sector undertakings, listed companies and Non-Banking Financial Companies.

She regularly represents clients before regulatory and adjudicatory authorities, including the National Company Law Tribunal, in matters relating to corporate law and compliance. Her ability to combine technical knowledge with practical legal strategy enables her to support clients through complex corporate and regulatory issues.

Ms Arora also has extensive experience in Intellectual Property Rights. She advises clients on the registration, protection and enforcement of intellectual property in India and overseas and appears before relevant authorities in prosecution, opposition and related proceedings.

In addition to her role at DSB Law Group, she is a Partner at Dinesh Gupta & Co., Company Secretaries, serves as a Professional Director of Exclusive Leasing and Finance Limited and is associated with the Anti-Corruption Academy as Secretary. Her professional approach is guided by diligence, responsiveness and a commitment to delivering high-quality advisory services.`,
  }),
  member({
    id: 'seed-aditi-kapur',
    name: 'Aditi Kapur',
    title: 'Company Secretary',
    group: 'PARTNERS_DIRECTORS',
    sortOrder: 4,
    bio: `Ms Aditi Kapur Arora is a qualified Company Secretary, law graduate and Six Sigma Black Belt professional who heads the Corporate Advisory and Business Process Re-engineering division of DSB Law Group. Associated with the Group since 2009, she brings a strong combination of academic excellence, corporate law expertise and process-oriented advisory experience.

She has maintained a distinguished academic record, having secured merit in her Bachelor of Commerce programme and topped the University in LL.B. After completing her internship with Dinesh Gupta & Co., Company Secretaries, she joined the firm as an associate and became a Partner of DSB Law Group in 2012. She presently serves as a Director of DSB Law Group Pvt. Ltd.

Ms Kapur has also been associated with established legal practices, including Kapur Law Firm, a civil law firm founded in Kapurthala in 1925, and Arora and Associates, a multidisciplinary law firm based in Jalandhar. She has previously served as Manager, Compliance at Capital Small Finance Bank, where she gained valuable exposure to banking compliance and regulatory processes.

Her areas of expertise include corporate laws, management consultancy, business process re-engineering and legal advisory. She has independently handled legal matters for reputed organisations in the region, including consumer disputes, arbitration proceedings, revenue matters and other corporate and commercial issues.

Known for her strong drafting, communication and analytical abilities, Ms. Kapur contributes significantly to the Group’s corporate advisory and legal assignments. Her ability to combine legal knowledge with process improvement and management insight enables her to provide practical and structured solutions to clients.

She is also a regular faculty member at programmes organised by the Institute of Company Secretaries of India, where she contributes to professional learning and knowledge development.`,
  }),
  member({
    id: 'seed-jorawar-bhasin',
    name: 'Jorawar Singh Bhasin',
    title: 'Senior Advocate - Direct Taxes',
    group: 'PARTNERS_DIRECTORS',
    sortOrder: 5,
    bio: `Mr Jorawar Singh Bhasin is a highly respected Senior Advocate with over 26 years of experience in direct tax laws. He has built a distinguished practice in tax litigation and advisory, representing clients before appellate authorities, High Courts and the Supreme Court of India.

His areas of expertise include income tax assessments, search and seizure proceedings, international taxation, transfer pricing, tax structuring and complex interpretational matters under direct tax legislation. He is widely recognised for his strategic legal insight, persuasive advocacy and ability to address technically challenging tax issues with clarity and precision.

At DSB Law Group, Mr. Bhasin leads the Direct Tax practice and provides high-value advisory and litigation support to corporates, high-net-worth individuals and financial institutions. He works closely with clients on assessment proceedings, appellate strategy, tax disputes and transaction-related tax considerations.

His practical approach, in-depth understanding of tax law and long-standing professional reputation make him a trusted adviser in the field of direct taxation. Through his leadership, the firm can offer clients strong representation, informed tax strategy and dependable support across a wide range of contentious and advisory matters.`,
  }),
  member({
    id: 'seed-yogesh-bochiwal',
    name: 'Yogesh Bochiwal',
    title: 'Company Secretary',
    group: 'SENIOR_WHOLE_TIME_CONSULTANTS',
    sortOrder: 0,
    bio: `Mr Yogesh Bochiwal is a qualified Chartered Accountant and Company Secretary with over 30 years of extensive experience in the banking and financial services sector. He is associated with DSB Law Group as a whole-time Senior Consultant and brings deep domain knowledge, strategic insight and a strong understanding of financial, regulatory and operational frameworks.

Over the course of his career, Mr Bochiwal has gained significant experience in credit appraisal, project finance, credit monitoring and risk management across corporate and MSME segments. His ability to assess complex financial structures, identify risks and evaluate business viability enables him to provide practical and result-oriented advisory support.

He has also been actively associated with NBFCs and financial consultancy assignments, contributing across areas such as financial analysis, audit, taxation, management consultancy and operational process improvement. His experience in handling complex credit portfolios and strengthening internal systems adds considerable value to client engagements.

At DSB Law Group, Mr Bochiwal advises clients on financial, regulatory and business matters, supporting them with structured, compliant and growth-oriented solutions. His extensive experience, analytical approach and multidisciplinary qualifications make him a valuable part of the firm’s advisory team.`,
  }),
  member({
    id: 'seed-sagrika-jayee',
    name: 'Sagrika Jayee',
    title: 'Company Secretary',
    group: 'SENIOR_WHOLE_TIME_CONSULTANTS',
    sortOrder: 1,
    bio: `Ms Sagrika Jayee is a qualified Company Secretary and a Member of the Institute of Company Secretaries of India. She holds a Bachelor of Commerce degree and has also cleared CFA Level I, strengthening her understanding of finance, investment analysis and corporate decision-making. She joined DSB Law Group in 2015 and presently serves as a Senior Consultant, bringing over six years of professional experience in corporate, secretarial and legal compliance matters.

Having completed her apprenticeship with the firm, Ms Jayee possesses strong practical exposure and an in-depth understanding of corporate and regulatory frameworks. She has independently handled a wide range of company secretarial assignments and has also gained valuable experience in managing corporate and legal matters in Chandigarh.

Her expertise includes drafting and reviewing legal agreements, corporate contracts and statutory documentation. She has worked on merger and acquisition transactions, legal due diligence, changes in management, corporate restructuring and matters relating to proceedings before the National Company Law Tribunal.

Ms Jayee also advises clients on corporate, secretarial, banking and NBFC-related compliance requirements. Her experience extends to statutory audits, ROC and RBI compliances, regulatory filings and coordination with statutory and regulatory authorities.

Known for her analytical approach, attention to detail and strong understanding of corporate laws, Ms Jayee plays an important role in supporting clients through complex compliance, restructuring and corporate advisory assignments.`,
  }),
  member({
    id: 'seed-meenakshi-seth',
    name: 'Meenakshi Seth',
    title: 'Chartered Accountant',
    group: 'SENIOR_WHOLE_TIME_CONSULTANTS',
    sortOrder: 2,
    bio: `Ms Meenakshi Seth is a qualified Chartered Accountant with over 10 years of professional experience in taxation, audit, financial reporting and regulatory compliance. She also holds a Master of Commerce degree from Panjab University and is DISA qualified, reflecting her expertise in information systems audit and technology-driven financial controls.

Her professional experience covers direct and indirect taxation, statutory and internal audits, IND AS reporting, financial analysis, MIS reporting and statutory filings. She is actively involved in reviewing financial statements, evaluating internal controls and ensuring that organisations comply with applicable accounting, tax and regulatory requirements.

Ms Seth has handled audit and compliance assignments across diverse sectors, including industrial units, educational institutions and banking organisations. Her practical approach enables her to identify financial and operational risks, strengthen control systems and support clients in streamlining their accounting and compliance processes.

She also has significant experience in tax compliance and is capable of handling income tax assessments, notices and related proceedings. Her understanding of taxation, audit and financial reporting allows her to provide clients with comprehensive and well-structured advisory support.

With her analytical ability, technical knowledge and attention to detail, Ms Seth contributes to DSB Law Group’s audit, taxation and financial advisory practice by helping clients achieve accurate reporting, effective compliance and improved financial governance.`,
  }),
  member({
    id: 'seed-wishey-kataria',
    name: 'Dr. Wishey Kataria',
    title: 'Senior Consultant',
    group: 'SENIOR_WHOLE_TIME_CONSULTANTS',
    sortOrder: 3,
    phone: '+91 94179-77777',
    email: 'wishey@dsblawgroup.com',
    bio: `Dr Wishey Kataria is a business and academic professional whose expertise spans corporate governance, business management, strategic advisory and regulatory compliance. With a PhD focused on board diversity and its relationship with corporate governance, she brings a strong combination of research-based understanding and practical business insight to her role at DSB Law Group.

As a Senior Consultant, Dr Kataria contributes to advisory assignments involving governance structures, regulatory frameworks, corporate compliance and strategic business planning. Her academic background enables her to examine complex organisational issues with depth, while her professional approach remains focused on practical, ethical and sustainable solutions.

Her career began in academia as an Assistant Professor, where she developed a strong interest in knowledge creation, responsible leadership and evidence-based management. She has published extensively in the fields of corporate governance, strategic marketing and business management, and continues to contribute to academic discourse through her editorial and research work.

Dr Kataria also serves as the Chief Editor of a reputed ABDC-listed journal and has contributed as a guest editor to several academic volumes. Her editorial experience reflects her commitment to maintaining high standards of research, encouraging informed discussion and advancing thought leadership across management and governance-related subjects.

In addition to her advisory and academic responsibilities, she is actively involved in developing newsletters and professional knowledge content for DSB Law Group. Through these initiatives, she helps share timely regulatory information, practical insights and emerging developments with businesses and professionals, thereby supporting greater awareness and informed decision-making.

Known for her commitment, integrity and thoughtful approach, Dr Kataria continues to contribute to the development of transparent, inclusive and resilient business systems.`,
  }),
  member({
    id: 'seed-shikha-gupta',
    name: 'Shikha Gupta',
    title: 'Company Secretary and Cost Accountant',
    branch: 'Jaipur Branch',
    group: 'SENIOR_WHOLE_TIME_CONSULTANTS',
    sortOrder: 4,
    bio: `Ms Shikha Gupta is a key member of the Corporate Department at DSB Law Group’s Jaipur branch, bringing over 11 years of experience in corporate compliance, financial planning and strategic advisory. As a qualified Company Secretary and Cost Accountant, she combines regulatory knowledge with a strong understanding of financial and operational matters.

Her core expertise lies in handling complex corporate and regulatory requirements, with a particular focus on compliance matters relating to Non-Banking Financial Companies. She advises clients on evolving regulatory frameworks and supports them in establishing structured systems for accurate, timely and effective compliance.

Ms. Gupta is also actively involved in client training and capacity-building initiatives, particularly in the area of Credit Information Company reporting by NBFCs. Through focused training sessions, she helps management teams and compliance professionals understand reporting requirements, strengthen internal processes and meet their regulatory obligations with greater clarity and confidence.

In addition to her compliance practice, she plays an important role in preparing financial projections, business plans and related documentation for companies across sectors. Her work supports clients in strategic planning, fundraising, business expansion and regulatory submissions.

With her practical approach, financial insight and in-depth understanding of NBFC compliance, Ms Gupta serves as a trusted adviser to both emerging ventures and established organisations navigating India’s evolving corporate and financial landscape.`,
  }),
  member({
    id: 'seed-tarandeep-singh',
    name: 'Tarandeep Singh',
    title: 'IT & System Security',
    group: 'WHOLE_TIME_CONSULTANTS',
    sortOrder: 0,
    bio: `Mr Tarandeep Singh is an experienced Software Engineer with over a decade of expertise in solution architecture, software development and information technology operations. As a Whole-Time Consultant at DSB Law Group, he oversees the firm’s IT systems and supports the development of secure, reliable and scalable technology infrastructure aligned with its strategic and operational requirements.

He has extensive experience in designing, implementing and maintaining complex technical environments, including software platforms, cloud infrastructure, system integrations, DevOps processes and containerisation solutions. His technical knowledge enables him to strengthen system performance, improve operational efficiency and support the secure delivery of digital services across the organisation.

Mr. Singh is also experienced in managing development teams, coordinating technical projects and engaging with clients and internal stakeholders to translate business requirements into practical technology solutions. His approach combines technical depth with a clear understanding of organisational needs, enabling him to support both day-to-day operations and long-term technology planning.

With a strong focus on innovation, system security and continuous improvement, Mr Singh plays an important role in enhancing DSB Law Group’s digital capabilities. His contribution supports improved process integration, cost efficiency, data protection and the development of a resilient technology framework for the firm’s continued growth.`,
  }),
  member({
    id: 'seed-tanya-sharma',
    name: 'Tanya Sharma',
    title: 'Advocate',
    group: 'WHOLE_TIME_CONSULTANTS',
    sortOrder: 1,
    bio: `Advocate Tanya Sharma is an experienced legal professional with eight years of practice in litigation and advisory matters. She has represented clients before the District Courts at Jalandhar and has handled a wide range of legal assignments requiring detailed research, drafting, representation and client coordination.

At DSB Law Group, she is involved in matters before the Micro and Small Enterprises Facilitation Council, Jalandhar, and also assists in handling income tax notices and related assignments. Her work includes reviewing legal documents, preparing responses, examining agreements and supporting clients through procedural and regulatory requirements.

Advocate Sharma holds a B.A. LL.B. (Hons.) degree from Guru Nanak Dev University, Jalandhar. She was a Gold Medallist and a University topper for five consecutive years, reflecting her strong academic foundation and commitment to legal excellence.

She is known for her organised working style, attention to detail and ability to analyse complex legal documents and regulatory issues. Her experience also includes providing legal advice, preparing recommendations, negotiating with opposing parties where required and remaining updated with changes in applicable laws and regulations.

With strong research, drafting and critical-thinking abilities, Advocate Sharma approaches each assignment with accuracy, professionalism and a clear focus on achieving effective outcomes for clients. Her collaborative approach and practical litigation experience make her a valuable part of DSB Law Group’s legal team.`,
  }),
  member({
    id: 'seed-megha-sharma',
    name: 'Megha Sharma',
    title: 'Company Secretary | Qualified Social Auditor',
    branch: 'Pune Branch',
    group: 'WHOLE_TIME_CONSULTANTS',
    sortOrder: 2,
    bio: `Ms Megha Sharma is a seasoned Company Secretary with nearly a decade of experience in corporate compliance, governance and audit-related matters. She works closely with the Corporate Law Department at DSB Law Group and supports clients across India on regulatory requirements, statutory filings and internal corporate practices.

As a qualified Company Secretary, she brings a strong understanding of company law, secretarial compliance and governance frameworks. Her experience enables her to advise organisations on maintaining statutory records, meeting filing obligations and strengthening internal compliance systems in line with applicable legal requirements.

Ms Sharma is also a Qualified Social Auditor, which adds an important dimension to her professional expertise. This qualification enables her to combine traditional corporate compliance with a broader understanding of social responsibility, impact assessment and sustainable governance practices.

Based at the Pune branch and operating remotely, she plays an important role in supporting DSB Law Group’s pan-India clientele. Her work involves coordinating compliance assignments, ensuring timely filings and providing structured advisory support across different jurisdictions.

With her dual expertise in corporate law and social auditing, Ms Sharma contributes to the firm’s ability to provide clients with comprehensive, responsible and forward-looking governance solutions.`,
  }),
  member({
    id: 'seed-meghna-chauhan',
    name: 'Meghna Chauhan',
    title: 'Manager - Finance & Accounts',
    branch: 'Jalandhar Branch',
    group: 'WHOLE_TIME_CONSULTANTS',
    sortOrder: 3,
    bio: `Ms Meghna Chauhan is a Chartered Accountant serving as Manager - Finance & Accounts at DSB Law Group’s Jalandhar Head Office. She works closely with the firm’s leadership and finance teams, contributing to the planning, implementation and monitoring of key financial decisions.

Her areas of expertise include financial planning, accounting, reporting, budgeting and strategic financial management. She plays an important role in ensuring that financial processes are accurate, compliant and aligned with the organisation’s broader operational and growth objectives.

Ms Chauhan supports the strengthening of internal financial systems, review of financial information and development of processes that promote better control, efficiency and transparency. Her analytical approach enables her to identify financial trends, assess business requirements and support informed decision-making across the organisation.

With her practical insight, professional discipline and strong understanding of financial management, Ms Chauhan contributes significantly to maintaining robust finance and accounting functions at DSB Law Group.`,
  }),
  member({
    id: 'seed-alisha-nakra',
    name: 'Alisha Nakra',
    title: 'Company Secretary',
    group: 'WHOLE_TIME_CONSULTANTS',
    sortOrder: 4,
    bio: `With a diverse and enriching professional journey, Alisha Nakra began her career by undertaking an internship in the corporate sector at VARDHMAN GROUP in Ludhiana. Subsequently, she garnered practical experience working under a PCS, where she honed her skills in compliance and regulatory affairs. As a Company Secretary in a prominent limited company based in Jalandhar she played a pivotal role in ensuring statutory adherence and facilitating seamless corporate operations. Since 2015, She have been an integral part of her family business, where she encompass a wide array of matters, showcasing her adaptability and commitment to the organization's success.

Currently, at DSB she hold the esteemed position of Company Secretary, contributing to the organization's success by overseeing legal and regulatory compliance, corporate governance, and actively participating in strategic decision-making within the dynamic landscape of financial services.`,
  }),
  member({
    id: 'seed-harshita-hetawal',
    name: 'Harshita Hetawal',
    title: 'Company Secretary',
    branch: 'Jaipur Branch',
    group: 'WHOLE_TIME_CONSULTANTS',
    sortOrder: 5,
    bio: `Ms Harshita Hetawal is a Company Secretary based at DSB Law Group’s Jaipur branch, with five years of professional experience in compliance management, corporate governance and legal advisory services.

Her experience includes company and LLP incorporations, annual filings, regulatory compliance under the Ministry of Corporate Affairs and FEMA, drafting of agreements and management of end-to-end secretarial and legal compliance requirements. Her structured approach and strong understanding of regulatory frameworks enable her to handle complex assignments with efficiency, accuracy and clarity.

Ms Hetawal supports clients in meeting statutory obligations, maintaining corporate records and managing ongoing compliance requirements. She also contributes to advisory assignments involving governance, documentation and regulatory coordination.

In addition to her core compliance expertise, she has experience in branding initiatives, social media strategy and team leadership. This combination of technical knowledge and creative insight allows her to contribute across both professional and organisational functions.

With her dynamic approach, regulatory understanding and commitment to quality, Ms Hetawal is a valuable member of DSB Law Group’s corporate and compliance team.`,
  }),
  member({
    id: 'seed-priyanka-chaturvedi',
    name: 'Priyanka Chaturvedi',
    title: 'Company Secretary',
    branch: 'Bangalore Branch',
    group: 'WHOLE_TIME_CONSULTANTS',
    sortOrder: 6,
    bio: `Ms Priyanka Chaturvedi is a Company Secretary associated with the Corporate Department at DSB Law Group’s Bangalore branch. With around six years of professional experience, she brings practical expertise in corporate compliance, governance and secretarial matters.

She has been actively involved in managing compliance requirements for multiple entities, including statutory filings, maintenance of corporate records and adherence to applicable regulatory frameworks. Her structured approach and attention to detail enable her to support clients in meeting ongoing corporate and governance obligations efficiently.

Ms Chaturvedi works closely with the firm’s corporate advisory team to assist clients across different jurisdictions and sectors. She also supports internal coordination and compliance processes, contributing to the timely and organised execution of assignments.

Originally from Mumbai and presently based in Bangalore, Ms Chaturvedi combines practical corporate exposure with a collaborative working style, making her a valuable member of DSB Law Group’s corporate compliance team.`,
  }),
  member({
    id: 'seed-sweety-sharma',
    name: 'Sweety Sharma',
    title: 'Company Secretary',
    branch: 'Kolkata Branch',
    group: 'WHOLE_TIME_CONSULTANTS',
    sortOrder: 7,
    bio: `Ms Sweety Sharma is a Company Secretary associated with DSB Law Group’s Kolkata branch and brings over a decade of professional experience in corporate compliance, taxation, audit and governance matters.

Her experience includes managing corporate filings, ROC and RBI compliances, taxation, GST, financial forecasting and investment-related regulatory requirements. She supports organisations in maintaining timely and accurate compliance while ensuring alignment with applicable corporate and financial regulations.

Ms Sharma has also handled a wide range of audit assignments, including internal audits, statutory audits, bank audits, tax audits and investigation audits. This diverse exposure provides her with a strong understanding of financial controls, regulatory risks and corporate reporting frameworks.

With her structured approach and attention to detail, she contributes significantly to the firm’s compliance, audit and advisory assignments. Her practical knowledge enables her to identify gaps, strengthen internal processes and support clients in meeting complex regulatory obligations.

Known for her regulatory insight, professional discipline and commitment to sound corporate governance, Ms Sharma is a valuable member of DSB Law Group’s corporate and financial advisory team.`,
  }),
  member({
    id: 'seed-isha-gandhi',
    name: 'Isha Gandhi',
    title: 'Chartered Accountant',
    branch: 'Hyderabad Branch',
    group: 'WHOLE_TIME_CONSULTANTS',
    sortOrder: 8,
    bio: `Ms Isha Gandhi is a Chartered Accountant associated with the Accounts and Taxation Department at DSB Law Group’s Hyderabad branch. With approximately six and a half years of professional experience in finance, accounting, audit and taxation, she brings strong technical knowledge and a practical understanding of financial regulations and tax frameworks.

Her professional background includes experience as both a Statutory Auditor and Tax Auditor, enabling her to approach financial and compliance matters with a comprehensive perspective. She is involved in reviewing financial records, supporting audit assignments, ensuring tax compliance and assisting clients in preparing for regulatory assessments.

Ms Gandhi also contributes to financial reporting, reconciliation, documentation and the evaluation of accounting practices. Her work helps clients maintain accurate records, identify compliance gaps and strengthen internal financial processes.

Based in Hyderabad and working remotely, she collaborates closely with DSB Law Group’s teams and clients across different locations. Her organised approach, technical proficiency and commitment to timely delivery make her a valuable part of the firm’s finance, audit and taxation practice.`,
  }),
  member({
    id: 'seed-deviyani-kaur',
    name: 'Deviyani Kaur',
    title: 'HR & Labour Laws',
    branch: 'Jalandhar Branch',
    group: 'WHOLE_TIME_CONSULTANTS',
    sortOrder: 9,
    bio: `Ms Deviyani Kaur has been associated with DSB Law Group since 2018 and brings extensive experience in human resource management, workforce coordination and labour law-related advisory. She holds an MBA in Human Resources and International Business from Lovely Professional University.

She plays an important role in managing the firm’s HR function, with particular focus on recruitment and coordination of remote professionals across India. Her responsibilities include identifying suitable talent, streamlining hiring processes and supporting the development of efficient and well-coordinated teams across locations.

Ms Kaur is also actively involved in fostering a positive and collaborative work environment. She works closely with employees and management to support effective communication, team coordination and smooth implementation of HR processes.

In addition to her HR responsibilities, she serves as a Process Coordinator and oversees Management Information System reporting and Customer Relationship Management functions. In this role, she monitors the progress of client assignments, maintains structured MIS records, coordinates with internal teams and helps ensure that work is completed within defined timelines and quality standards.

Her organised approach, people-management skills and commitment to service delivery enable her to contribute meaningfully to the firm’s internal operations, process management and client relationships.`,
  }),
  member({
    id: 'seed-pooja-jindal',
    name: 'Pooja Jindal',
    title: 'Company Secretary',
    branch: 'New Delhi Branch',
    group: 'WHOLE_TIME_CONSULTANTS',
    sortOrder: 10,
    bio: `Ms Pooja Jindal is an integral member of the Corporate Law team at DSB Law Group and brings over five years of professional experience in corporate compliance, secretarial practice and regulatory advisory.

Based in New Delhi and working remotely, she supports clients across a range of sectors in meeting their statutory and regulatory obligations. Her work includes managing secretarial filings, maintaining corporate records, ensuring timely compliance under applicable company law requirements and assisting with NBFC-related compliances.

Ms. Jindal’s practical understanding of corporate and regulatory frameworks enables her to identify compliance requirements, coordinate filings and support clients in addressing operational and governance-related challenges. Her experience across diverse industries also allows her to adapt her approach to the specific needs of growing and established businesses.

Known for her precision, efficiency and dependable working style, Ms Jindal contributes to the timely execution of assignments and supports both clients and internal teams with structured compliance solutions.`,
  }),
  member({
    id: 'seed-adv-gulshan',
    name: 'Adv. Gulshan',
    title: 'Advocate',
    group: 'EMPANELLED_ADVOCATES',
    sortOrder: 0,
    bio: `Adv. Gulshan is an experienced legal practitioner with over eight years of professional experience in litigation and legal advisory. He holds an LL.M. degree and has developed a broad practice across civil, criminal, labour and employment-related matters.

He is empanelled with various Non-Banking Financial Companies for handling litigation and recovery matters, including SARFAESI proceedings and allied disputes. His experience enables him to advise financial institutions and other clients on recovery strategy, enforcement actions and legal remedies available under the applicable framework.

Adv. Gulshan also has in-depth knowledge of labour and employment laws, service matters and statutory compliance. He regularly advises clients on workplace disputes, employment-related issues and the interpretation of evolving legal and regulatory requirements.

His practice further includes cheque dishonour matters under Section 138 of the Negotiable Instruments Act, contractual disputes and a wide range of civil and criminal proceedings. In addition to courtroom representation, he provides strategic legal consultancy to businesses, financial institutions and other establishments across diverse sectors.

He is also actively involved in drafting and vetting legal notices, pleadings, agreements and other legal documents. With his practical approach, litigation experience and strong understanding of procedural law, Adv. Gulshan contributes to DSB Law Group’s dispute resolution and legal advisory practice.`,
  }),
  member({
    id: 'seed-adv-kapil-batra',
    name: 'Adv. Kapil Batra',
    title: 'Senior Advocate',
    group: 'EMPANELLED_ADVOCATES',
    sortOrder: 1,
    phone: '+91 95920-20999',
    email: 'kapilbatraadvocate@gmail.com',
    bio: `Adv. Kapil Batra is a seasoned legal professional with over 38 years of experience in litigation and advisory practice. Carrying forward the legacy of Batra Vakeel, a respected legal practice established in 1975 by his late father, Shri Mohan Lal Batra, he has built a strong reputation for providing dependable, practical and result-oriented legal solutions.

Practising since 1987, Adv. Batra is enrolled with the Punjab and Haryana High Court and has represented clients before District Courts, High Courts and specialised forums, including the Debt Recovery Tribunal and Consumer Courts. His extensive courtroom experience enables him to handle complex disputes with a balanced combination of legal insight, strategic preparation and client-focused advocacy.

His practice spans civil, criminal and commercial matters, including disputes under the Negotiable Instruments Act, land and property matters, partition proceedings, matrimonial disputes, agreements to sell, contractual issues, commercial litigation, revenue matters, consumer disputes and arbitration proceedings. He also advises clients on debt recovery matters and related proceedings before the Debt Recovery Tribunal.

Adv. Batra maintains an active litigation and advisory presence across multiple jurisdictions, including the Jalandhar District Courts, Chandigarh, Mohali, Panchkula and Dera Bassi. He also appears in matters across India, including proceedings before the National Company Law Tribunal.

Known for his deep legal understanding, professional discipline and practical approach, Adv. Batra contributes significantly to DSB Law Group’s litigation and dispute resolution practice. His long-standing experience and commitment to professional excellence make him a trusted adviser to individuals, businesses and institutions across a wide range of legal matters.`,
  }),
];
