import { siteData } from './siteData';

export interface ContentBlock {
  type: 'text' | 'heading' | 'list' | 'image' | 'video';
  body?: string;
  text?: string;
  items?: string[];
  src?: string;
  caption?: string;
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  image: string;
  date: string;
  source: string;
  featured: boolean;
  hasCharts?: boolean;
  video?: string;
  content: ContentBlock[];
}

export interface Section {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  color: string;
  coverImage: string;
  description: string;
  articles: Article[];
}

export interface NavItem {
  id: string;
  label: string;
  color: string;
}

export function getSections(): Section[] {
  return siteData.sections as Section[];
}

export function getSection(id: string): Section | undefined {
  return getSections().find((s) => s.id === id);
}

export function getArticleById(articleId: string): { article: Article; section: Section } | undefined {
  for (const section of getSections()) {
    const article = section.articles.find((a) => a.id === articleId);
    if (article) return { article, section };
  }
  return undefined;
}

export function getNavItems(): NavItem[] {
  return siteData.navItems as NavItem[];
}

export function getHero() {
  return siteData.hero;
}

export function getCoverStory(): { article: Article; section: Section } | undefined {
  for (const section of getSections()) {
    const article = section.articles.find((a) => a.id === 'gaming-fraud');
    if (article) return { article, section };
  }
  return undefined;
}
