export interface NavItem {
  label: string;
  href: string;
}

export interface PracticeArea {
  title: string;
  description: string;
  iconName: string; // Dynamic icon mapper
}

export interface WhyChooseUsItem {
  title: string;
  description: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  iconName: string;
}

export interface ConsultationFormInput {
  fullName: string;
  phoneNumber: string;
  email: string;
  practiceArea: string;
  message: string;
}

export interface SocialLink {
  platform: 'LinkedIn' | 'Instagram' | 'Facebook' | 'X';
  url: string;
}
