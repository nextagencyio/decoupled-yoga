// Auto-generated TypeScript types from Drupal GraphQL schema.
// Run `decoupled-cli schema sync` to regenerate.

export interface NodeClass {
  id: string;
  body: { value: string; summary?: string };
  classLevel: string;
  duration: string;
  image: { url: string; alt: string; width: number; height: number };
  path: string;
  schedule: string;
  title: string;
}

export interface NodeHomepage {
  id: string;
  ctaDescription: { value: string };
  ctaPrimary: string;
  ctaSecondary: string;
  ctaTitle: string;
  featuresItems: any[];
  heroDescription: { value: string };
  heroSubtitle: string;
  heroTitle: string;
  path: string;
  title: string;
}

export interface ParagraphFeatureItem {
  id: string;
  description: { value: string };
  icon: string;
  title: string;
}

export interface NodeInstructor {
  id: string;
  body: { value: string; summary?: string };
  certifications: string;
  email: string;
  path: string;
  photo: { url: string; alt: string; width: number; height: number };
  specialty: string;
  title: string;
}

export interface NodePage {
  id: string;
  body: { value: string; summary?: string };
  path: string;
  title: string;
}

export interface NodeRetreat {
  id: string;
  body: { value: string; summary?: string };
  endDate: { time: string };
  image: { url: string; alt: string; width: number; height: number };
  location: string;
  path: string;
  price: string;
  retreatDate: { time: string };
  title: string;
}
