import { PracticeArea, WhyChooseUsItem, ServiceItem, NavItem } from './types';

export const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Practice Areas', href: '#practice-areas' },
  { label: 'Why Advocate Akash', href: '#why-choose' },
  { label: 'Services', href: '#services' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export const practiceAreas: PracticeArea[] = [
  {
    title: 'Civil Litigation',
    description: 'Expert representation in property disputes, contract enforcement, recovery suits, and appellate civil proceedings.',
    iconName: 'Scale',
  },
  {
    title: 'Criminal Law',
    description: 'Comprehensive defense strategy, representation in trial courts, High Court appeals, revision petitions, and cross-examinations.',
    iconName: 'Shield',
  },
  {
    title: 'Family & Divorce Matters',
    description: 'Compassionate guidance in divorce, child custody, alimony, maintenance, domestic violence cases, and family mediation.',
    iconName: 'Users',
  },
  {
    title: 'Consumer Disputes',
    description: 'Protecting consumer rights before District, State, and National Consumer Forums against defective goods and deficient services.',
    iconName: 'ShoppingBag',
  },
  {
    title: 'Property Matters',
    description: 'Title verification, partition suits, landlord-tenant disputes, RERA issues, and legal advice on buying/leasing property.',
    iconName: 'Home',
  },
  {
    title: 'Cheque Bounce Cases',
    description: 'Strategic legal notices and litigation under Section 138 of the Negotiable Instruments Act for recovery of outstanding debts.',
    iconName: 'FileText',
  },
  {
    title: 'Legal Notice Drafting',
    description: 'Drafting precise and highly impactful legal notices to demand resolution and set strong foundations for potential litigation.',
    iconName: 'PenTool',
  },
  {
    title: 'Documentation & Agreements',
    description: 'Drafting and vetting sales deeds, lease agreements, partnership deeds, wills, gift deeds, and power of attorney documents.',
    iconName: 'Briefcase',
  },
  {
    title: 'Bail Matters',
    description: 'Prompt and strategic filing of anticipatory bail, regular bail, and interim bail applications across all judicial levels.',
    iconName: 'Key',
  },
  {
    title: 'Legal Consultation',
    description: 'Providing in-depth verbal and written legal advice, evaluating legal risks, and charting a constructive course of action.',
    iconName: 'HelpCircle',
  },
];

export const whyChooseMe: WhyChooseUsItem[] = [
  {
    title: 'Professional Representation',
    description: 'Meticulous legal planning, thorough prep work, and powerful representation in the courtroom with polished courtroom manner.',
  },
  {
    title: 'Ethical Legal Practice',
    description: 'Unwavering commitment to BCI code of ethics, absolute transparency in counsel, and zero tolerance for malpractices.',
  },
  {
    title: 'Client Confidentiality',
    description: 'Absolute privacy and protection of all client-privileged information, files, discussions, and strategic details.',
  },
  {
    title: 'Transparent Communication',
    description: 'Keeping you informed at every step, providing realistic outcome probabilities, and clear discussion on court schedules.',
  },
  {
    title: 'Timely Legal Assistance',
    description: 'Striving for swift actions, responsive replies, prompt petition filing, and avoiding unnecessary delays in proceedings.',
  },
  {
    title: 'Dedicated Legal Research',
    description: 'Exhaustive exploration of precedent-setting Judgments from High Courts and the Supreme Court of India for every case.',
  },
];

export const services: ServiceItem[] = [
  {
    title: 'Legal Consultation',
    description: 'Personalized advisory sessions to diagnose your legal position and map out potential recourse.',
    iconName: 'MessageSquare',
  },
  {
    title: 'Court Representation',
    description: 'Strong advocacy and pleading before the High Court of Delhi and District Courts of Delhi NCR.',
    iconName: 'Gavel',
  },
  {
    title: 'Legal Notice Drafting',
    description: 'Drafting strong formal legal demand notices to settle claims before initiating litigation.',
    iconName: 'FileEdit',
  },
  {
    title: 'Petitions & Applications',
    description: 'Drafting and filing complaints, civil suits, writ petitions, and miscellaneous applications.',
    iconName: 'BookOpen',
  },
  {
    title: 'Documentation',
    description: 'Expert drafting, drafting review, and legal validation of various deeds, affidavits, and instruments.',
    iconName: 'Files',
  },
  {
    title: 'Legal Opinion',
    description: 'Formal, written evaluations of legal risks, case merits, and detailed statutory interpretations.',
    iconName: 'Compass',
  },
  {
    title: 'Case Strategy',
    description: 'Tailored legal blueprints to resolve multi-jurisdictional disputes efficiently and effectively.',
    iconName: 'TrendingUp',
  },
  {
    title: 'Contract Review',
    description: 'Vetting commercial, employment, and real estate contracts to shield you from unfavorable liabilities.',
    iconName: 'FileCheck',
  },
];

export const educationTimeline = [
  {
    institution: 'Maa Shakumbhari University (MSU), Saharanpur',
    degree: 'Bachelor of Laws (LL.B.)',
    description: 'Rigorous legal education focusing on constitutional law, criminal procedure, civil procedure, corporate laws, and judicial ethics.',
    year: 'LL.B. Graduate',
  },
  {
    institution: 'University of Delhi – Motilal Nehru College',
    degree: 'Bachelor of Arts (B.A.)',
    description: 'Broad foundation in political science, public administration, and socio-legal studies from the prestigious University of Delhi.',
    year: 'B.A. Graduate',
  },
];

export const contactDetails = {
  name: 'Adv. Akash Kumar',
  role: 'Advocate | High Court of Delhi & District Courts',
  officeAddress: 'B-121, Pandav Nagar, New Delhi – 110092',
  phone: '+91 9667336929',
  email: 'kumarakash46823@gmail.com',
  whatsappNumber: '+919667336929',
  socialLinks: {
    linkedin: 'https://www.linkedin.com/in/adv-akash-kumar-02b32b1aa/',
    instagram: 'https://www.instagram.com/adv.akash__kumar/',
    facebook: 'https://www.facebook.com/profile.php?id=100005093223311',
  },
};
