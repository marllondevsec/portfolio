import React from 'react';

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
}

export interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
}