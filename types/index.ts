// ============================================
// TYPE DEFINITIONS — THE EZZADS GENERATOR
// ============================================

// Ad Generation Types
export type AdPlatform = 'META' | 'GOOGLE' | 'TIKTOK' | 'YOUTUBE' | 'LINKEDIN';

export type AdTone = 'BOLD' | 'EMOTIONAL' | 'PROFESSIONAL' | 'AGGRESSIVE';

export type AdGoal = 'SALES' | 'LEADS' | 'AWARENESS' | 'CLICKS';

export interface AdGenerationInput {
  productName: string;
  targetAudience: string;
  platform: AdPlatform;
  offer?: string;
  tone: AdTone;
  goal: AdGoal;
}

export interface AdOutputBlock {
  type: 'HEADLINE' | 'PRIMARY_TEXT' | 'CTA' | 'HOOK' | 'CREATIVE_DIRECTION' | 'VIDEO_SCRIPT';
  label: string;
  content: string;
  variants?: string[];
}

export interface AdGenerationOutput {
  id: string;
  platform: AdPlatform;
  performanceRating: 'OPTIMAL' | 'HIGH' | 'MODERATE';
  blocks: AdOutputBlock[];
  generatedAt: string;
  frameworkUsed: 'AIDA' | 'PAS' | 'EMOTIONAL_TRIGGER';
}

// User & Plan Types
export type PlanType = 'FREE' | 'PRO';

export interface UserProfile {
  id: string;
  email: string;
  planType: PlanType;
  generationsUsedToday: number;
  generationsLimit: number;
  createdAt: string;
}

// Saved Ad Types
export interface SavedAd {
  id: string;
  userId: string;
  platform: AdPlatform;
  inputData: AdGenerationInput;
  outputData: AdGenerationOutput;
  createdAt: string;
}

// Navigation
export interface NavItem {
  label: string;
  href: string;
  moniker: string;
}

// API Response
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}

// Processing State
export type ProcessingPhase =
  | 'IDLE'
  | 'ANALYZING_INPUT'
  | 'COMPUTING_FRAMEWORK'
  | 'GENERATING_VARIANTS'
  | 'OPTIMIZING_OUTPUT'
  | 'COMPLETE'
  | 'ERROR';
