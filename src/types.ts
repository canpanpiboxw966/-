export interface PastProjectCategory {
  id: string;
  categoryName: string;
  representativeTitle: string; // e.g. "대전 삼선4구역 재개발 정비사업 외"
  primaryClient?: string;
  representativeImage: {
    title: string;
    url: string;
    alt?: string;
  };
  totalCount?: number;
  description: string;
  clients: string[];
  images?: {
    title: string;
    description: string;
    url: string;
    tag?: string;
  }[];
  projects: {
    name: string;
    client?: string;
    year?: string;
    note?: string;
  }[];
}

export interface CompanyProject {
  id: string;
  title: string;
  category: '지형현황측량' | '공사측량' | '설계측량' | '하천측량' | '시설물유지관리' | '드론/GNSS';
  client: string;
  location: string;
  period: string;
  summary: string;
  scope: string[];
  equipment: string[];
  deliverables: string[];
  featuredImage: string;
  galleryImages?: string[];
  isFeatured?: boolean;
}

export interface ServiceDetail {
  id: string;
  title: string;
  englishTitle: string;
  tag: string;
  summary: string;
  targetCases: string[];
  workflow: string[];
  deliverables: string[];
  icon: string;
}

export interface TechItem {
  id: string;
  name: string;
  subName: string;
  description: string;
  benefits: string[];
  features: string[];
}

export interface InquiryRecord {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  location: string;
  serviceType: string;
  expectedDate: string;
  message: string;
  fileName?: string;
  fileSize?: string;
  createdAt: string;
  status: 'pending' | 'contacted' | 'completed';
}
