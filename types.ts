
export interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
}

export interface FeedItem {
  id: string;
  title: string;
  date: string;
  content: string;
  imageUrl?: string;
  tags: string[];
}

export interface CVData {
  summary: string;
  skills: string[];
  tools: string[];
  experience: {
    role: string;
    company: string;
    period: string;
    description: string;
  }[];
  education: {
    degree: string;
    institution: string;
    details: string;
  }[];
}

export enum SectionType {
  ABOUT = 'ABOUT',
  CV = 'CV',
  PROJECTS = 'PROJECTS',
  FEED = 'FEED'
}
