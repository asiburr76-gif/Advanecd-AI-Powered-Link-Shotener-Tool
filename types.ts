
export interface LinkAnalytics {
  clicks: number;
  lastClicked?: string;
  history: { date: string; clicks: number }[];
}

export interface ShortenedLink {
  id: string;
  originalUrl: string;
  shortCode: string;
  title: string;
  tags: string[];
  summary: string;
  createdAt: string;
  analytics: LinkAnalytics;
}

export enum TabType {
  DASHBOARD = 'DASHBOARD',
  LINKS = 'LINKS',
  ANALYTICS = 'ANALYTICS',
  SETTINGS = 'SETTINGS'
}

export interface EnrichmentData {
  title: string;
  tags: string[];
  summary: string;
}
