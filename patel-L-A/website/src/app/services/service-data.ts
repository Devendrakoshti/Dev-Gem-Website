export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceData {
  metaTitle: string;
  metaDescription: string;
  title: string;
  description: string;
  benefits: string[];
  faqs: ServiceFaq[];
  paragraphs: string[];
  price: string;
  cta: string;
  ctaTitle?: string;
  ctaDescription?: string;
  overviewCard?: {
    label: string;
    title: string;
  };
  overviewHighlights?: {
    label: string;
    value: string;
    detail: string;
  }[];
  pricing?: {
    title: string;
    price: string;
    note?: string;
    features: string[];
  }[];
  definition?: {
    title: string;
    paragraphs: string[];
  };
  benefitsSection?: {
    title: string;
    paragraphstitle?: string[];
    paragraphs: string[];
  };
  process?: {
    title: string;
    steps: { title: string; description: string }[];
  };
}

export const services: Record<string, ServiceData> = {};
