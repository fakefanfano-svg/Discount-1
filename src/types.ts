export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type ArticleCategory = 
  | 'All'
  | 'Patterns'
  | 'Stitch Guides'
  | 'Wearables & Fashion'
  | 'Home & Living'
  | 'Amigurumi'
  | 'Yarn & Care';

export interface StitchGuide {
  code: string;
  name: string;
  description: string;
}

export interface MaterialItem {
  item: string;
  detail: string;
  checked?: boolean;
}

export interface ArticleStep {
  title: string;
  instruction: string;
  tip?: string;
  stitchesCount?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: ArticleCategory;
  readTime: string;
  date: string;
  difficulty: DifficultyLevel;
  coverImage: string;
  author: {
    name: string;
    role: string;
    avatarInitials: string;
  };
  excerpt: string;
  dropCapInitial: string;
  bodyIntro: string;
  pullQuote?: {
    quote: string;
    attribution: string;
  };
  materials: MaterialItem[];
  stitchesUsed: StitchGuide[];
  steps: ArticleStep[];
  gaugeNotes?: string;
  finishingTips?: string[];
  featured?: boolean;
  likes: number;
  tags?: string[];
  isReadingArticle?: boolean;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: string;
  author: string;
  location?: string;
  image: string;
  hookSize: string;
  yarnType: string;
  timeSpent: string;
  likes: number;
  userLiked?: boolean;
  description: string;
  articleId?: string;
}

export interface RowCounterState {
  currentRound: number;
  totalRounds: number;
  projectName: string;
  notes: string;
}
