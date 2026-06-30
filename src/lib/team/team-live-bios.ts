import type { TeamGroup } from '@/generated/prisma/client';
import { DINESH_GUPTA_BIO } from '@/lib/team/dinesh-gupta-profile';

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

/** Full roster from https://www.dsblawgroup.com/our-team */
export const TEAM_LIVE_MEMBERS: TeamLiveMember[] = [
  {
    id: 'seed-dinesh-gupta',
    name: 'Dinesh Gupta',
    title: 'Co Founder & Managing Partner',
    teaser:
      'Mr. Dinesh Gupta, Co-Founder of DSB Law Group is a Fellow Member of the ICSI and a rank holder Law…',
    group: 'MANAGING_PARTNERS_CEO',
    phone: '+91-181-228-0315',
    email: 'info@dsblawgroup.com',
    sortOrder: 0,
    bio: DINESH_GUPTA_BIO,
  },
  {
    id: 'seed-deepali-gupta',
    name: 'Deepali Gupta',
    title: 'Managing Partner',
    teaser:
      'As a Highly focused, confident and dedicated Advocate with strong sense of values, Deepali Gupta…',
    group: 'MANAGING_PARTNERS_CEO',
    sortOrder: 1,
    bio: `As a Highly focused, confident and dedicated Advocate with strong sense of values, Deepali Gupta has been an integral part of our group. She is a Senior Partner at DSB Law Group. She has served as a Director in Citizens Urban Cooperative Bank. She is highly qualified and has a vast experience of more than 15 years in the field of taxation. She is a graduate in Law and has done her Masters in English. She oversees and ensures the group's strict adherence to tax laws. As a skilled communicator, she is able to synthesize complex information and deliver finest solutions to our diverse clients. Apart from being a thorough professional, she thrives in dynamic environment and quickly adapts to the ever changing demand of the legal field. She is highly instrumental in the Firm's development plans for new ventures and to represent the firm in reputed fora.`,
  },
  {
    id: 'seed-kanika-gupta',
    name: 'Kanika Gupta',
    title: 'Chief Executive Officer',
    teaser:
      'Kanika Gupta is the Chief Executive Officer of DSB Law Group, bringing over 9 years of distinguished experience…',
    group: 'MANAGING_PARTNERS_CEO',
    sortOrder: 2,
    bio: `Kanika Gupta is the Chief Executive Officer of DSB Law Group, bringing over 9 years of distinguished experience in taxation, audit, financial management, and corporate advisory. A qualified Chartered Accountant and alumna of Shri Ram College of Commerce, Kanika combines deep technical knowledge with strategic leadership to drive the firm's vision forward.

As CEO, Kanika works closely with the Founder Director and executive leadership team to shape and execute the firm's strategic roadmap. A commitment to operational excellence, strong corporate governance, and forward-thinking business planning marks her leadership.

Kanika is also deeply involved in mentoring teams, aligning operational strategies with long-term goals, and fostering a culture of innovation and integrity across the firm's offices in Jalandhar, Mumbai, New Delhi, Jaipur, Pune and Ludhiana.

Her blend of financial acumen and leadership makes her a driving force behind DSB Law Group's continued success in delivering high-impact legal and corporate advisory services.`,
  },
  {
    id: 'seed-nitin-jain',
    name: 'Nitin Jain',
    title: 'Chartered Accountant',
    teaser: 'Mr. Nitin Jain is a whole-time dedicated Chartered Accountant associated with DSB Law Group,…',
    group: 'PARTNERS_DIRECTORS',
    sortOrder: 0,
    bio: `Mr. Nitin Jain is a whole-time dedicated Chartered Accountant associated with DSB Law Group, specializing in internal audits of banks and corporates. Known for his methodical approach and attention to detail, he brings strong analytical skills and domain expertise to every assignment. He is actively involved in planning and executing internal audit processes, risk assessments, and compliance reviews for a diverse portfolio of financial and corporate clients. Also oversees audits of Non-Banking Financial Companies (NBFCs). His work ensures transparency, operational efficiency, and adherence to regulatory standards.`,
  },
  {
    id: 'seed-saurabh-gupta',
    name: 'Saurabh Kumar Gupta',
    title: 'Civil and Criminal litigation',
    teaser: 'Mr. Saurabh Gupta, having 6 years of experience and practicing Law in Civil Courts, Jalandhar…',
    group: 'PARTNERS_DIRECTORS',
    sortOrder: 1,
    bio: `Mr. Saurabh Gupta, having 6 years of experience and practicing Law in Civil Courts, Jalandhar, Kapurthala, Phagwara; Labour Courts, Commissioner, Jalandhar Division, Jalandhar; Joint Registrar, Co-op. Societies, Jalandhar and Consumer Courts, in various legal fields viz. Civil, Revenue, Service matters, Labour Disputes, SARFAESI Matters, Cooperative Societies matter, Consumer matters, Matrimonial and Criminal matters. Apart from above, is also doing consultancy on aforesaid matters with various establishments.

**EXPERTISATION**
_Consultation on Service matters and other Labour-related matters_
_Consultation on Matrimonial, civil and revenue matters_
_Drafting and preparation of legal documents_`,
  },
  {
    id: 'seed-shifali-singla',
    name: 'Shifali Singla',
    title: 'Company Secretary',
    teaser: 'Ms. Shifali Singla, Company Secretary , Partner at DSB Group and has been an integral part…',
    group: 'PARTNERS_DIRECTORS',
    sortOrder: 2,
    bio: `I have done my B.Com from GNDU and I am a CA Inter. I have an experience in corporate work`,
  },
  {
    id: 'seed-nikita-arora',
    name: 'Nikita Arora',
    title: 'Corporate Laws, Legal and IPR',
    teaser: 'Ms. Nikita Arora is a Fellow Member of the Institute of Company Secretaries of India…',
    group: 'PARTNERS_DIRECTORS',
    sortOrder: 3,
    bio: `Ms. Nikita Arora is a Fellow Member of the Institute of Company Secretaries of India, a Commerce and Law Graduate. She is heading the Corporate Laws, Legal and IPR division of Delhi branch. With a vision of building unrivalled goodwill with the clients by providing the exquisite services of highest calibre with full enthusiasm and dedication, she has been serving the clients for more than a decade with a team of experienced professionals. She has a vast experience in handling matters related to Corporate Laws including corporate advisory, corporate secretarial work, due diligence, SEBI regulations, RBI regulations, corporate governance, legal compliance, legal writing, negotiation, and Intellectual Property Rights (IPR) laws. She is well versed with SEBI and RBI regulations. With an experience in handling corporate laws and legal matters, she has advised Indian and overseas clients on setting up entities in India and in facilitating foreign transactions including Foreign Direct Investment (FDI). She has also conducted due diligence of companies engaged in various sectors and has also advised clients on general secretarial matters, joint ventures and regulatory compliances. She has also been involved in the secretarial and compliance audits of various companies including PSUs, NBFCs and listed companies. She also makes appearances before relevant authorities including National Company Law Tribunal (NCLT) in Corporate Laws matters. With a rich experience in IPRs, she has advised clients on the IPR registration matters in and outside India. She also makes appearances before the relevant authorities on behalf of clients in the prosecution matters of IPRs including opposition proceedings. Presently, Ms. Nikita Arora is a Partner of Dinesh Gupta & Co., Company Secretaries, Professional Director of Exclusive Leasing and Finance Limited and Secretary of Anti-Corruption Academy.`,
  },
  {
    id: 'seed-aditi-kapur',
    name: 'Aditi Kapur',
    title: 'Company Secretary',
    teaser: 'Ms. Aditi Kapur Arora is a qualified Company Secretary and a Law Graduate…',
    group: 'PARTNERS_DIRECTORS',
    sortOrder: 4,
    bio: `Ms. Aditi Kapur Arora, is a qualified Company Secretary and a Law Graduate. She is also a Six Sigma Black Belt certified and is heading the Corporate Advisory and BPR Division of the group. Maintaining her brilliant academic record of being a merit holder in B.Com, Aditi topped the University in LL.b She is associated with the group since 2009.

After completing her internship in the group firm, M/s Dinesh Gupta & Co., she joined the firm as an associate and in the year 2012, she became a partner of DSB Law group. Presently, she is the Director of DSB Law Group Pvt. Ltd. As a young and dynamic Partner, Aditi brings a fresh and innovative spirit to the team. She is also a Senior Associate in Kapur Law Firm, a leading civil law firm of Kapurthala established since 1925 and a Senior Associate in M/s Arora and Associates, a leading multi-disciplinary law firm based at Jalandhar. She has also served as a Manager – Compliance at Capital Small Finance Bank, Jalandhar for the Period of March 2015- August 2015

Her expertise includes corporate laws, management consultancy and BPR solutions. She has been handling independently legal matters of the reputed organizations in the region, including Consumer Litigation, Arbitration Matters, Revenue Matters etc. She possesses unparallel skills of drafting and communication which in turn proves to be an asset to the group. She is also a regular faculty member in the programmes organized by institute of Company Secretaries of India.`,
  },
  {
    id: 'seed-jorawar-bhasin',
    name: 'Jorawar Singh Bhasin',
    title: 'Senior Advocate – Direct Taxes',
    teaser: 'A highly respected Senior Advocate with over 26 years of experience…',
    group: 'PARTNERS_DIRECTORS',
    sortOrder: 5,
    bio: `A highly respected Senior Advocate with over 26 years of experience, specializing in Direct Tax laws. With a distinguished career in tax litigation and advisory, he has represented clients before various appellate forums, High Courts, and the Supreme Court of India. His extensive expertise covers income tax assessments, search and seizure matters, international taxation, transfer pricing, and tax structuring. He is known for his strategic legal insight, persuasive advocacy, and deep understanding of complex tax legislation. At DSB Law Group, he leads the Direct Tax practice, providing high-value advisory and litigation support to corporates, HNIs, and financial institutions. His long-standing reputation and practical approach have made him a trusted advisor in the field of tax law.`,
  },
  {
    id: 'seed-yogesh-bochiwal',
    name: 'Mr. Yogesh Bochiwal',
    title: 'Company Secretary',
    teaser: 'Mr. Yogesh Bochiwal is a qualified Chartered Accountant and Company Secretary with over 30 years…',
    group: 'SENIOR_WHOLE_TIME_CONSULTANTS',
    sortOrder: 0,
    bio: `Mr. Yogesh Bochiwal is a qualified Chartered Accountant and Company Secretary with over 30 years of rich experience in the banking and financial services sector. He brings with him deep domain expertise, strategic insight, and a strong understanding of financial and regulatory frameworks.
Over the years, he has gained extensive exposure in credit appraisal, project finance, credit monitoring, and risk management across corporate and MSME segments. His experience enables him to effectively evaluate complex financial structures and provide practical, result-oriented solutions.

He has also been actively associated with NBFCs and financial consultancy assignments, contributing significantly in areas such as financial analysis, audit, taxation, and management consultancy. His expertise in handling complex credit portfolios and strengthening operational processes adds significant value to advisory engagements.
At DSB Law Group, Mr. Bochiwal plays a key role in advising on financial and regulatory matters, supporting clients with structured, compliant, and growth-oriented solutions. His vast experience and analytical approach make him a valuable asset to the firm.`,
  },
  {
    id: 'seed-sagrika-jayee',
    name: 'Sagrika Jayee',
    title: 'Company Secretary',
    teaser: 'Ms. Sagrika Jayee is associated with the firm since October 2015 till March 2020 and has re-joined…',
    group: 'SENIOR_WHOLE_TIME_CONSULTANTS',
    sortOrder: 1,
    bio: `Ms. Sagrika Jayee has been associated with the firm from October 2015 to March 2020 and re-joined as Consultant in May 2022. She brings with her over 6 years of rich professional experience in corporate and legal compliances. Presently, she is working as Senior Consultant with us.
She is a Qualified Company Secretary and a Member of the Institute of Company Secretaries of India (ICSI). Having completed her apprenticeship with the firm itself, she possesses strong practical exposure and in-depth understanding of corporate regulatory frameworks. She has successfully handled various CS-related assignments in Chandigarh and has extensive knowledge of drafting and vetting legal agreements, corporate documentation, and matters pertaining to NCLT proceedings.

Her core areas of expertise include:
* Drafting and reviewing legal agreements and corporate contracts
* Handling Merger & Acquisition (M&A) transactions
* Conducting Legal Due Diligence
* Managing matters related to change in management and restructuring
* Advisory on corporate, secretarial, banking and NBFC compliances
* Independent handling of statutory audits
* Ensuring ROC and RBI compliances
* Liaison with regulatory and statutory authorities

Ms. Sagrika is known for her analytical approach, regulatory expertise, and strong command over corporate laws, making her a valuable asset in handling complex corporate structuring and compliance matters.`,
  },
  {
    id: 'seed-meenakshi-seth',
    name: 'Meenakshi Seth',
    title: 'Chartered Accountant',
    teaser: 'Meenakshi Seth is a qualified Chartered Accountant with experience in taxation, audit, financial reporting…',
    group: 'SENIOR_WHOLE_TIME_CONSULTANTS',
    sortOrder: 2,
    bio: `Meenakshi Seth is a qualified Chartered Accountant with experience in taxation, audit, financial reporting, and regulatory compliance. She has worked extensively on direct and indirect taxation, IND-AS reporting, and statutory filings, ensuring adherence to applicable laws and standards.

She has been involved in audit assignments, financial analysis, and MIS reporting, with exposure across sectors such as industrial units, educational institutions, and banking. Her expertise includes strengthening internal controls, streamlining financial processes, and ensuring efficient compliance management.`,
  },
  {
    id: 'seed-wishey-kataria',
    name: 'Dr. Wishey Kataria',
    title: 'Senior Consultant',
    teaser: 'Dr. Wishey Kataria is a distinguished business professional whose expertise…',
    group: 'SENIOR_WHOLE_TIME_CONSULTANTS',
    sortOrder: 3,
    phone: '+91 94179-77777',
    email: 'wishey@dsblawgroup.com',
    bio: `Dr. Wishey Kataria is a distinguished business professional whose expertise bridges the worlds of academia, business management and strategic corporate governance. With a PhD focusing on Board Diversity and its relationship with Corporate Governance, she brings a powerful blend of research depth and boardroom insight to every initiative she leads. In parallel, she serves as a Senior Consultant at DSB Law Group, offering strategic counsel on regulatory frameworks, governance structures, and corporate compliance. Her professional journey began in academia as an Assistant Professor, a role that ignited her passion for knowledge creation and ethical leadership. She has since published extensively in the areas of corporate governance, strategic marketing, and business management, and continues to contribute to scholarly discourse as Chief Editor of a reputed ABDC-listed journal. Her editorial experience also includes serving as a guest editor for several academic volumes, further demonstrating her commitment to advancing thought leadership in her field. Dr. Kataria embodies the apotheosis of dedication. Her values are the compass that guide her work, and she remains steadfast in her belief in doing the right thing. Through her unwavering commitment to principle and performance, she continues to shape more transparent, inclusive, and resilient business systems.`,
  },
  {
    id: 'seed-shikha-gupta',
    name: 'Shikha Gupta',
    title: 'Company Secretary/ Cost Accountant',
    branch: 'Jaipur Branch',
    teaser: 'Shikha Gupta is a key member of our Corporate Department, bringing over 11.5 years…',
    group: 'SENIOR_WHOLE_TIME_CONSULTANTS',
    sortOrder: 4,
    bio: `Shikha Gupta is a key member of our Corporate Department, bringing over 11.5 years of extensive experience in corporate compliance and strategic advisory. Her expertise lies in handling complex regulatory frameworks, with a strong specialization in NBFC compliance.
Shikha is also actively involved in client training and capacity building, particularly in the area of Credit Information Company (CIC) Reporting by NBFCs. Her training sessions are designed to help clients understand and meet their regulatory obligations with clarity and confidence.

In addition to her compliance work, Shikha plays a vital role in preparing financial projections and business plans for companies across sectors—supporting them in strategic planning, fundraising, and regulatory submissions.
Her depth of knowledge and hands-on approach make her a trusted advisor to both startups and established businesses navigating India's dynamic corporate landscape.`,
  },
  {
    id: 'seed-tarandeep-singh',
    name: 'Tarandeep Singh',
    title: 'IT & System Security',
    teaser: 'Mr. Trarandeep, a highly experienced Software Engineer with over a decade of expertise…',
    group: 'WHOLE_TIME_CONSULTANTS',
    sortOrder: 0,
    bio: `Mr. Tarandeep, a highly experienced Software Engineer with over a decade of expertise in solution architecture and software development, currently overseeing all IT operations. Demonstrates a strong commitment to designing, implementing, and maintaining complex infrastructures and technical solutions that support the firm's strategic goals. Possesses advanced knowledge of software development processes, developer team management, and client engagement. Brings extensive hands-on experience in setting up and managing DevOps, cloud infrastructure, system integration, and containerization projects. An innovative and strategic thinker, adept at collaborating across technical and business teams to drive operational efficiency, reduce costs, and support growth through continuous improvement and forward-thinking IT infrastructure planning.`,
  },
  {
    id: 'seed-tanya-sharma',
    name: 'Tanya Sharma',
    title: 'Advocate',
    teaser: 'Advocate Tanya Sharma is having 7 years of experience in practicing and litigation in District Courts,…',
    group: 'WHOLE_TIME_CONSULTANTS',
    sortOrder: 1,
    bio: `Advocate Tanya Sharma is having 7 years of experience in practicing and litigation in District Courts, Jalandhar, Punjab and now is handling cases listed in Micro, Small Enterprise Facilitation Council, Jalandhar, Punjab and dealing with Income Tax Notices and various other projects associated with it from last one year. (Total 8 years)

Educational Qualifications and Professional Experience: Advocate Tanya Sharma has done BA L.L.B (HONS) from GNDU, Jalandhar and is a Gold Medalist, an university toper for consecutive 5 (five) years. She is highly organized, motivated and experienced Advocate who enjoys autonomy as well as working with others to achieve best client's outcomes. She has provided professional legal advices and recommendations, has knowledge to analyze various legal documents, agreements and forms, having skills to negotiate with opposite parties when necessary and stayed up-to-date with current laws and regulations. Further, she is well accomplished Advocate offering a strong attention to details and accuracy and excellent in critical thinking and research skills. With 8 years of extensive field experience and determination to achieve great results, Advocate Tanya Sharma is an effective team player possessing the important ability to uplift the growth and success of the company.`,
  },
  {
    id: 'seed-megha-sharma',
    name: 'Megha Sharma',
    title: 'Company Secretary | Qualified Social Auditor',
    branch: 'Pune Branch',
    teaser: 'Megha Sharma works closely with our Corporate Law department at DSB Law Group,…',
    group: 'WHOLE_TIME_CONSULTANTS',
    sortOrder: 2,
    bio: `Megha Sharma works closely with our Corporate Law department at DSB Law Group, contributing her deep expertise in corporate compliance, governance, and auditing. With nearly a decade of experience, Megha brings a rich and diverse background in advising companies on regulatory requirements, statutory filings, and internal corporate practices. A seasoned Company Secretary, Megha also holds the distinction of being a Qualified Social Auditor, which reflects her integrated approach to corporate responsibility and sustainable business governance. Her dual qualifications allow her to offer clients nuanced insights into both traditional compliance frameworks and evolving social impact mandates. Based in Pune and operating remotely, Megha plays a critical role in supporting our pan-India clientele, ensuring seamless coordination, timely filings, and robust compliance advisory`,
  },
  {
    id: 'seed-meghna-chauhan',
    name: 'Meghna Chauhan',
    title: 'Manager Finance & Accounts',
    branch: 'Jalandhar Branch',
    teaser: 'Ms. Meghna is a Chartered Accountant and works closely with our core leadership and finance teams…',
    group: 'WHOLE_TIME_CONSULTANTS',
    sortOrder: 3,
    bio: `Ms. Meghna has joined as Manager – Finance & Accounts, based at our Jalandhar Head Office. She is a Chartered Accountant and works closely with our core leadership and finance teams.
Meghna brings strong expertise in financial planning, accounting, and strategic financial decision-making. Her experience plays a key role in the implementation of financial decisions, ensuring accuracy, compliance, and alignment with organizational objectives.

With her analytical approach and practical insight, Meghna contributes significantly to strengthening our financial processes and supporting informed business decisions. We are delighted to have her as part of the DSB core team.`,
  },
  {
    id: 'seed-alisha-nakra',
    name: 'Alisha Nakra',
    title: 'Company Secretary',
    teaser: 'With a diverse and enriching professional journey, Alisha Nakra began her career by undertaking…',
    group: 'WHOLE_TIME_CONSULTANTS',
    sortOrder: 4,
    bio: `With a diverse and enriching professional journey, Alisha Nakra began her career by undertaking an internship in the corporate sector at VARDHMAN GROUP in Ludhiana. Subsequently, she garnered practical experience working under a PCS, where she honed her skills in compliance and regulatory affairs. As a Company Secretary in a prominent limited company based in Jalandhar she played a pivotal role in ensuring statutory adherence and facilitating seamless corporate operations. Since 2015, She have been an integral part of her family business, where she encompass a wide array of matters, showcasing her adaptability and commitment to the organization's success.

Currently, at DSB she hold the esteemed position of Company Secretary, contributing to the organization's success by overseeing legal and regulatory compliance, corporate governance, and actively participating in strategic decision-making within the dynamic landscape of financial services.`,
  },
  {
    id: 'seed-harshita-hetawal',
    name: 'Harshita Hetawal',
    title: 'Company Secretary',
    branch: 'Jaipur Branch',
    teaser: 'Ms. Harshita Hetawal joined as a Company Secretary, based in Jaipur. She brings with her 5 years of professional experience …',
    group: 'WHOLE_TIME_CONSULTANTS',
    sortOrder: 5,
    bio: `Ms. Harshita Hetawal joined as a Company Secretary, based in Jaipur. She brings with her 5 years of professional experience in compliance management, corporate governance, and legal advisory services.
Harshita has extensive hands-on experience in company and LLP incorporations, annual filings, regulatory compliances under MCA and FEMA, drafting of agreements, and managing end-to-end compliance requirements. Her structured approach and strong regulatory knowledge enable her to handle complex compliance matters with efficiency and clarity.

In addition to her core compliance expertise, Harshita has also contributed to branding initiatives, social media strategy, and team leadership, making her a versatile professional with a balanced mix of technical and creative skills. Her dynamic approach and strong professional background make her a valuable addition to the DSB team.`,
  },
  {
    id: 'seed-priyanka-chaturvedi',
    name: 'Priyanka Chaturvedi',
    title: 'Company Secretary',
    branch: 'Bangalore Branch',
    teaser: 'Ms. Priyanka joined as a Consultant in our Corporate Department. With around 6 years of professional experience…',
    group: 'WHOLE_TIME_CONSULTANTS',
    sortOrder: 6,
    bio: `Ms. Priyanka joined as a Consultant in our Corporate Department. With around 6 years of professional experience, Priyanka has been actively involved in managing corporate compliances across multiple entities, ensuring adherence to regulatory frameworks and corporate governance requirements. Her practical exposure and structured approach make her a valuable addition to our corporate advisory team.
Originally from Mumbai and currently based in Bangalore, Priyanka is collaborating closely with the team to support clients and internal processes.`,
  },
  {
    id: 'seed-sweety-sharma',
    name: 'Sweety Sharma',
    title: 'Company Secretary',
    branch: 'Kolkata Branch',
    teaser:
      'Brings with her over a decade of rich professional experience in corporate compliance, taxation, auditing, and governance…',
    group: 'WHOLE_TIME_CONSULTANTS',
    sortOrder: 7,
    bio: `Ms. Sweety brings with her over a decade of rich professional experience in corporate compliance, taxation, auditing, and governance.
Ms. Sweety has extensive hands-on expertise in managing corporate filings, ROC and RBI compliances, taxation, GST, financial forecasting, and investment-related compliances. Her experience also includes handling internal audits, statutory audits, bank audits, tax audits, and investigation audits, giving her a strong and well-rounded understanding of regulatory and financial frameworks.

With her deep knowledge and structured approach, Ms. Sweety adds significant value to our compliance and advisory services. She is known for her attention to detail, regulatory insight, and commitment to maintaining the highest standards of corporate governance.`,
  },
  {
    id: 'seed-isha-gandhi',
    name: 'Isha Gandhi',
    title: 'Chartered Accountant',
    branch: 'Hyderabad Branch',
    teaser: 'Isha Gandhi is a Chartered Accountant working closely with the Accounts & Taxation…',
    group: 'WHOLE_TIME_CONSULTANTS',
    sortOrder: 8,
    bio: `Isha Gandhi is a Chartered Accountant working closely with the Accounts & Taxation Department at DSB Law Group. With approximately 6.5 years of experience in finance and accounting, she brings strong technical proficiency and a well-rounded understanding of financial regulations and tax frameworks.
Her background includes significant roles as both a Statutory Auditor and Tax Auditor, giving her a comprehensive perspective on audit processes, financial reporting, and tax compliance. Isha's expertise supports our clients in maintaining accurate financial records, navigating tax laws, and preparing for regulatory assessments.

Based in Hyderabad and operating remotely, Isha ensures seamless collaboration with our teams and clients across jurisdictions, delivering timely and reliable financial insights.`,
  },
  {
    id: 'seed-deviyani-kaur',
    name: 'Deviyani Kaur',
    title: 'HR & Labour Laws',
    branch: 'Jalandhar Branch',
    teaser: 'Ms. Deviyani Kaur has been associated with DSB since 2018 and brings extensive experience in Human Resources…',
    group: 'WHOLE_TIME_CONSULTANTS',
    sortOrder: 9,
    bio: `Ms. Deviyani Kaur has been associated with DSB since 2018 and brings extensive experience in Human Resources and labour law advisory. She holds an MBA in HR & International Business from Lovely Professional University.
She plays a key role in managing the HR function, with a strong focus on recruitment of remote employees across PAN India. Her expertise lies in identifying talent, streamlining hiring processes, and building efficient remote teams.
Ms. Deviyani is also committed to fostering a positive and harmonious work environment, ensuring that team members collaborate effectively.
In addition to her HR responsibilities, she serves as a Process Coordinator and Customer Relationship Manager. In this capacity, she ensures that client assignments are executed efficiently and within defined timelines, maintaining high standards of service delivery and client satisfaction.`,
  },
  {
    id: 'seed-pooja-jindal',
    name: 'Pooja Jindal',
    title: 'Company Secretary',
    branch: 'New Delhi Branch',
    teaser: 'Pooja Jindal is an integral part of the Corporate Law team at DSB Law Group…',
    group: 'WHOLE_TIME_CONSULTANTS',
    sortOrder: 10,
    bio: `Pooja Jindal is an integral part of the Corporate Law team at DSB Law Group. With over five years of professional experience as a Company Secretary, she brings a practical and insightful approach to corporate compliance and regulatory matters. Working remotely from New Delhi, Pooja supports a wide range of clients by ensuring adherence to statutory requirements, handling secretarial filings, and NBFC Compliances. Her commitment to precision and efficiency makes her a trusted resource for both internal teams and clients alike. Pooja's experience spans across various sectors, allowing her to understand and address the diverse compliance challenges faced by growing businesses today.`,
  },
  {
    id: 'seed-adv-gulshan',
    name: 'Adv. Gulshan',
    title: 'Advocate',
    teaser: 'Adv. Gulshan is a seasoned legal practitioner with over 8 years of experience in litigation and advisory…',
    group: 'EMPANELLED_ADVOCATES',
    sortOrder: 0,
    bio: `Adv. Gulshan is a seasoned legal practitioner with over 8 years of experience in litigation and advisory. He holds an LL.M. degree and has developed a robust practice across Civil and Criminal laws, representing clients in a wide spectrum of disputes and proceedings.
He is empanelled with various NBFCs for handling litigation matters, including recovery proceedings, SARFAESI actions and allied legal issues. He possesses in-depth knowledge of labour and employment laws, service matters, and regularly advises on issues relating to statutory compliance and dispute resolution under the evolving legal framework.
His core areas of practice also include cheque dishonour cases under Section 138 of the Negotiable Instruments Act, contractual disputes and other civil and criminal proceedings. In addition to litigation, he provides strategic legal consultancy and advisory services to clients and establishments across diverse sectors.

**EXPERTISATION**
* Labour & Employment Laws and Service Matters
* Civil and Criminal Litigation
* SARFAESI and Recovery Proceedings for NBFCs
* Cases under Section 138 of the Negotiable Instruments Act
* Drafting and Vetting of Legal Notices, Pleadings and Agreements`,
  },
  {
    id: 'seed-adv-kapil-batra',
    name: 'Adv. Kapil Batra',
    title: 'Senior Advocate',
    teaser: 'Kapil Batra is a seasoned legal professional with over 38 years of experience in the legal fraternity…',
    group: 'EMPANELLED_ADVOCATES',
    sortOrder: 1,
    phone: '+91 95920-20999',
    email: 'kapilbatraadvocate@gmail.com',
    bio: `Kapil Batra is a seasoned legal professional with over 38 years of experience in the legal fraternity. Carrying forward the legacy of "Batra Vakeel", a reputed legal practice established in 1975 by his late father, Sh. Mohan Lal Batra, he has built a strong reputation for delivering reliable and result-oriented legal solutions.
With decades of hands-on courtroom and advisory experience, he is known for his deep legal insight, client-focused approach, and commitment to professional excellence.

**Professional Experience**
Kapil Batra has been actively practicing law since 1987 and is enrolled with the Punjab & Haryana High Court. Over the years, he has successfully handled a wide spectrum of legal matters across civil, criminal, and commercial domains.
He has represented clients across various courts and tribunals, including District Courts, High Courts, and specialized forums such as DRT and Consumer Courts.

**Areas of Expertise**
* Civil Law
* Criminal Law (excluding injury cases)
* Negotiable Instruments Act
* Land & Property Disputes
* Partition Matters
* Matrimonial Cases
* Agreements to Sell & Contract Law
* Commercial Litigation
* Debt Recovery Tribunal (DRT)
* Consumer Disputes
* Revenue Law
* Arbitration Matters

**Practice Presence**
Kapil Batra maintains a strong litigation and advisory presence across multiple jurisdictions, including:
* Jalandhar District Courts
* Chandigarh Tricity (Chandigarh, Mohali, Panchkula)
* Dera Bassi
* Pan India appearances including NCLT matters`,
  },
];
