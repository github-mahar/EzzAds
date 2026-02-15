// ============================================
// OPENAI CLIENT — THE EZZADS GENERATOR
// ============================================
// Per architecture-lock.md §3: OpenAI interactions MUST happen Server-Side ONLY.
// Per techstack.md §8: API key protected via environment variables.

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export { openai };

/**
 * System prompt for ad generation.
 * Uses AIDA / PAS / Emotional trigger frameworks.
 */
export const AD_SYSTEM_PROMPT = `You are an elite advertising copywriter and conversion optimization specialist working for a military-grade ad generation engine called EzzAds.

YOUR MISSION:
Generate high-converting ad copy using proven marketing psychology frameworks. Every word must be engineered for conversion — not generic marketing fluff.

RULES:
1. Apply the specified framework (AIDA, PAS, or Emotional Triggers) rigorously.
2. Optimize output structure, length, and tone for the specific ad platform.
3. Produce specific, actionable copy that speaks directly to the target audience's pain points and desires.
4. Each variation MUST be meaningfully different — not just rewording.
5. CTAs must be action-oriented and urgency-driven.
6. Headlines must hook in under 3 seconds.

PLATFORM-SPECIFIC GUIDELINES:
- META (Facebook/Instagram): Emotional hooks, story-driven, 125-character primary text optimal
- GOOGLE: Keyword-rich, benefit-focused, strict character limits (30 char headlines, 90 char descriptions)
- TIKTOK: Casual, trend-aware, pattern-interrupt hooks, short punchy copy
- YOUTUBE: Video-script friendly, curiosity-driven headlines, longer-form hooks
- LINKEDIN: Professional, value-proposition focused, industry-specific language

FRAMEWORK DEFINITIONS:
- AIDA: Attention → Interest → Desire → Action (build progressive engagement)
- PAS: Problem → Agitate → Solve (amplify pain then present solution)
- EMOTIONAL: Fear of Missing Out, Social Proof, Urgency, Authority, Scarcity

You MUST respond with valid JSON only. No markdown, no explanation, no wrapping — just the JSON object.`;

/**
 * Build the user prompt from input parameters
 */
export function buildUserPrompt(input: {
  productName: string;
  targetAudience: string;
  platform: string;
  offer?: string;
  tone: string;
  goal: string;
}): string {
  return `GENERATE AD COPY WITH THESE PARAMETERS:

PRODUCT/SERVICE: ${input.productName}
TARGET AUDIENCE: ${input.targetAudience}
PLATFORM: ${input.platform}
OFFER: ${input.offer || 'No specific offer provided'}
TONE: ${input.tone}
CAMPAIGN GOAL: ${input.goal}
FRAMEWORK: Auto-select the best framework (AIDA, PAS, or Emotional) based on the goal and tone.

OUTPUT FORMAT (respond with this exact JSON structure):
{
  "frameworkUsed": "AIDA" | "PAS" | "EMOTIONAL_TRIGGER",
  "performanceRating": "OPTIMAL" | "HIGH" | "MODERATE",
  "headlines": [
    "Headline variation 1",
    "Headline variation 2", 
    "Headline variation 3"
  ],
  "primaryText": [
    "Primary ad body text variation 1 (2-4 sentences optimized for ${input.platform})",
    "Primary ad body text variation 2 (2-4 sentences optimized for ${input.platform})"
  ],
  "cta": "Single best CTA for this campaign",
  "hooks": [
    "Hook variation 1 (pattern-interrupt opening line)",
    "Hook variation 2 (stat or question based)",
    "Hook variation 3 (emotional trigger)"
  ],
  "creativeDirection": "Detailed image/creative direction guidance (visual style, composition, colors, format recommendations for ${input.platform})",
  "videoScript": "Optional 15-30 second video script with timestamps [0-3s], [3-7s], [7-12s], [12-15s]"
}`;
}
