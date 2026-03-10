export type PageId =
  | 'home'
  | 'home-zh'
  | 'exam-guide'
  | 'resources'
  | 'official-resources'
  | 'about'
  | 'privacy'
  | 'terms'
  | 'contact'
  | 'pricing'
  | 'practice'
  | 'speaking'
  | 'writing'
  | 'listening'
  | 'reading'
  | 'blog'
  | 'community'
  | 'admin-answers'
  | 'admin-leads'
  | 'audio-upload'
  | 'logo-showcase'
  | 'icon-export'
  | 'reset-password';

export type AccessLevel = 'public' | 'authenticated' | 'admin' | 'trial';

export const PAGE_ACCESS_MAP: Record<PageId, AccessLevel> = {
  home: 'public',
  'home-zh': 'public',
  'exam-guide': 'public',
  resources: 'public',
  'official-resources': 'public',
  about: 'public',
  privacy: 'public',
  terms: 'public',
  contact: 'public',
  pricing: 'public',
  practice: 'authenticated',
  speaking: 'authenticated',
  writing: 'authenticated',
  listening: 'authenticated',
  reading: 'authenticated',
  blog: 'authenticated',
  community: 'authenticated',
  'admin-answers': 'admin',
  'admin-leads': 'admin',
  'audio-upload': 'authenticated',
  'logo-showcase': 'public',
  'icon-export': 'public',
  'reset-password': 'public',
};

export function getPageAccessLevel(pageId: PageId): AccessLevel {
  return PAGE_ACCESS_MAP[pageId] ?? 'public';
}
