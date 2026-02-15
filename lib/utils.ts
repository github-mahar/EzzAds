// ============================================
// UTILITY FUNCTIONS — THE EZZADS GENERATOR
// ============================================

import type { ProcessingPhase } from '@/types';

/**
 * Format date to system-style timestamp
 */
export function formatTimestamp(date: string | Date): string {
    const d = new Date(date);
    return d.toISOString().replace('T', ' // ').slice(0, 22);
}

/**
 * Generate a deterministic ID for demo purposes
 */
export function generateId(): string {
    return `EZZ-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
}

/**
 * Get processing phase display text
 */
export function getPhaseLabel(phase: ProcessingPhase): string {
    const labels: Record<ProcessingPhase, string> = {
        IDLE: 'SYSTEM_READY',
        ANALYZING_INPUT: 'Analyzing target parameters...',
        COMPUTING_FRAMEWORK: 'Computing persuasion framework...',
        GENERATING_VARIANTS: 'Generating ad variants...',
        OPTIMIZING_OUTPUT: 'Optimizing for platform delivery...',
        COMPLETE: 'GENERATION_COMPLETE',
        ERROR: 'GENERATION_FAILED',
    };
    return labels[phase];
}

/**
 * Clamp a number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

/**
 * Copy text to clipboard with fallback
 */
export async function copyToClipboard(text: string): Promise<boolean> {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        const result = document.execCommand('copy');
        document.body.removeChild(textarea);
        return result;
    }
}

/**
 * Platform display metadata
 */
export const PLATFORM_META: Record<string, { label: string; color: string }> = {
    META: { label: 'META_ADS', color: '#2563EB' },
    GOOGLE: { label: 'GOOGLE_ADS', color: '#10B981' },
    TIKTOK: { label: 'TIKTOK_ADS', color: '#EF4444' },
    YOUTUBE: { label: 'YOUTUBE_ADS', color: '#EF4444' },
    LINKEDIN: { label: 'LINKEDIN_ADS', color: '#2563EB' },
};
