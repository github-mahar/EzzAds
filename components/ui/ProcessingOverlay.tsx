'use client';

import { useState, useEffect } from 'react';
import { getPhaseLabel } from '@/lib/utils';
import type { ProcessingPhase } from '@/types';

interface ProcessingOverlayProps {
    isActive: boolean;
    onComplete?: () => void;
}

const PHASES: ProcessingPhase[] = [
    'ANALYZING_INPUT',
    'COMPUTING_FRAMEWORK',
    'GENERATING_VARIANTS',
    'OPTIMIZING_OUTPUT',
    'COMPLETE',
];

export default function ProcessingOverlay({ isActive, onComplete }: ProcessingOverlayProps) {
    const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!isActive) {
            setCurrentPhaseIndex(0);
            setProgress(0);
            return;
        }

        const phaseInterval = setInterval(() => {
            setCurrentPhaseIndex((prev) => {
                if (prev >= PHASES.length - 1) {
                    clearInterval(phaseInterval);
                    onComplete?.();
                    return prev;
                }
                return prev + 1;
            });
        }, 1200);

        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + 2;
            });
        }, 100);

        return () => {
            clearInterval(phaseInterval);
            clearInterval(progressInterval);
        };
    }, [isActive, onComplete]);

    if (!isActive) return null;

    const currentPhase = PHASES[currentPhaseIndex];

    return (
        <div
            className="fixed inset-0 z-40 flex items-center justify-center"
            style={{ background: 'rgba(2, 4, 8, 0.85)', backdropFilter: 'blur(4px)' }}
        >
            <div
                className="w-full max-w-md p-8 animate-boot"
                style={{
                    background: 'var(--color-bg-secondary)',
                    border: '1px solid var(--color-border-subtle)',
                    borderRadius: 'var(--radius-default)',
                }}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <span className="mono-header text-xs">[GENERATION_ENGINE]</span>
                    <span
                        className="text-xs"
                        style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent-blue)' }}
                    >
                        {Math.min(progress, 100)}%
                    </span>
                </div>

                {/* Progress Bar */}
                <div className="relative h-[3px] mb-6 overflow-hidden" style={{ background: 'var(--color-border-subtle)', borderRadius: '1px' }}>
                    <div
                        className="absolute inset-y-0 left-0 transition-all duration-200"
                        style={{
                            width: `${progress}%`,
                            background: 'var(--color-accent-blue)',
                            boxShadow: '0 0 10px var(--color-accent-glow)',
                        }}
                    />
                    {/* Scanner sweep overlay */}
                    <div
                        className="absolute inset-0"
                        style={{
                            width: '30%',
                            background: 'linear-gradient(90deg, transparent, rgba(37, 99, 235, 0.6), transparent)',
                            animation: 'scanner-sweep 1.5s ease-in-out infinite',
                        }}
                    />
                </div>

                {/* Phase Labels */}
                <div className="flex flex-col gap-2">
                    {PHASES.slice(0, currentPhaseIndex + 1).map((phase, i) => (
                        <div
                            key={phase}
                            className="flex items-center gap-2"
                            style={{
                                animation: `data-stream 150ms ease-out ${i * 50}ms forwards`,
                                opacity: 0,
                            }}
                        >
                            <span
                                className="text-[10px]"
                                style={{
                                    fontFamily: 'var(--font-mono)',
                                    color: i < currentPhaseIndex ? 'var(--color-accent-success)' : 'var(--color-accent-blue)',
                                }}
                            >
                                {i < currentPhaseIndex ? '✓' : '▸'}
                            </span>
                            <span
                                className="text-xs"
                                style={{
                                    fontFamily: 'var(--font-mono)',
                                    color: i < currentPhaseIndex ? 'var(--color-text-muted)' : 'var(--color-text-primary)',
                                }}
                            >
                                {getPhaseLabel(phase)}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
