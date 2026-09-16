export interface MagazineFact {
  label: string;
  value: string;
  subtext?: string;
}

export interface QuoteCard {
  id: string;
  quote: string;
  context?: string;
  tag?: string;
}

export interface CravingItem {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  humorNote?: string;
  highlight?: boolean;
}

export interface RoamPlace {
  id: string;
  location: string;
  dateOrTag?: string;
  caption: string;
  image: string;
}

export interface MemoryPhoto {
  id: string;
  title: string;
  caption: string;
  date?: string;
  type: 'polaroid' | 'magazine' | 'wide' | 'portrait';
  image: string;
  rotation?: number;
  order?: number;
  uploadedAt?: number;
}

export interface AwardItem {
  id: string;
  title: string;
  category: string;
  citation: string;
}

export interface HypotheticalItem {
  prompt: string;
  answer: string;
  iconName: string;
  comment?: string;
}

export interface BucketListItem {
  id: string;
  text: string;
  completed: boolean;
  isCustom?: boolean;
}

export interface WishItem {
  year: number;
  wish: string;
  unlocked?: boolean;
}

export interface MusicConfig {
  audioUrl: string;
  title: string;
  artist: string;
  subtitle: string;
  description: string;
  editorNote: string;
  updatedAt?: number;
}

export interface PhotoSlot {
  id: string;
  slotNumber: number;
  name: string;
  section: string;
  title: string;
  caption: string;
  date?: string;
  image: string;
  updatedAt?: number;
}

