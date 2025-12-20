import { LucideIcon } from 'lucide-react';

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link: string;
  isWriteUp?: boolean;
  impact?: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
  icon: LucideIcon;
}

export interface StudyPost {
  id: string;
  title: string;
  summary: string;
  date: string;
}

export interface WorkflowStep {
  id: number;
  label: string;
  icon: LucideIcon;
}