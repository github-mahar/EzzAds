'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Copy, RefreshCw, Save, ArrowLeft, Zap } from 'lucide-react';
import CopyButton from '@/components/ui/CopyButton';
import type { AdGenerationInput } from '@/types';

interface OutputBlock {
    type: string;
    label: string;
    items: string[];
}

// Demo output — will be replaced with actual API response
const DEMO_OUTPUT: OutputBlock[] = [
    {
        type: 'HEADLINE',
        label: 'HEADLINE_VARIANTS',
        items: [
            'Stop Burning Ad Spend on Copy That Doesn\'t Convert',
            'Your Competitors Use AI to Write Ads. You Should Too.',
            'The Ad Copy Engine That Outperforms Your Best Copywriter',
        ],
    },
    {
        type: 'HOOK',
        label: 'HOOK_VARIANTS',
        items: [
            '93% of Facebook ads fail in the first 3 seconds. Here\'s how the top 7% win.',
            'You\'re not losing to better products. You\'re losing to better copy.',
            'What if every ad you wrote was engineered to convert — not just written to fill space?',
        ],
    },
    {
        type: 'PRIMARY_TEXT',
        label: 'PRIMARY_TEXT_VARIANTS',
        items: [
            'Most businesses treat ad copy like an afterthought. They write something "good enough," launch it, and hope for the best.\n\nBut hope doesn\'t scale.\n\nEzzAds uses proven psychological frameworks — AIDA, PAS, and emotional triggers — to generate ad copy that\'s engineered for conversion. Not generic. Not templated. Precision-crafted for your audience, your platform, and your offer.\n\nOne prompt. Six optimized output blocks. Deploy in seconds.',
            'Your ad copy is the most expensive real estate in your business. Every word either converts or costs you money.\n\nEzzAds analyzes your product, audience, and platform to generate high-converting ad copy that speaks directly to your customer\'s pain points, desires, and decision triggers.\n\nStop guessing. Start converting.',
        ],
    },
    {
        type: 'CTA',
        label: 'CTA_SUGGESTION',
        items: ['Generate Your First Ad Free →'],
    },
    {
        type: 'CREATIVE_DIRECTION',
        label: 'CREATIVE_DIRECTION',
        items: [
            'Visual: Dark, high-contrast split screen. Left side: cluttered generic ad mockup (faded/struck through). Right side: clean, structured EzzAds output glowing with blue accent. Typography-driven, no stock photos. Use monospace font overlay for "data processing" feel. Format: 1:1 for Meta/Instagram, 16:9 for YouTube.',
        ],
    },
    {
        type: 'VIDEO_SCRIPT',
        label: 'VIDEO_SCRIPT_15S',
        items: [
            '[0-3s] HOOK: "Your ad copy is costing you thousands."\n[3-7s] PROBLEM: Quick montage of generic, underperforming ads.\n[7-12s] SOLUTION: EzzAds interface generating copy in real-time.\n[12-15s] CTA: "Generate your first ad free. EzzAds.ai"',
        ],
    },
];

export default function ResultDisplay() {
    const [inputData, setInputData] = useState<AdGenerationInput | null>(null);
    const [savedBlocks, setSavedBlocks] = useState<Set<number>>(new Set());

    useEffect(() => {
        const stored = sessionStorage.getItem('ezzads_input');
        if (stored) {
            setInputData(JSON.parse(stored));
        }
    }, []);

    const handleSave = (index: number) => {
        setSavedBlocks((prev) => new Set([...prev, index]));
    };

    return (
        <div className="flex flex-col gap-6 animate-boot-delay-1">
            {/* Input Summary Bar */}
            {inputData && (
                <div
                    className="card-void p-4 flex flex-wrap items-center gap-4"
                    style={{ borderColor: 'rgba(37, 99, 235, 0.15)' }}
                >
                    <span className="mono-label text-[10px]">INPUT_SUMMARY:</span>
                    {[
                        { label: 'PRODUCT', value: inputData.productName },
                        { label: 'PLATFORM', value: inputData.platform },
                        { label: 'TONE', value: inputData.tone },
                        { label: 'GOAL', value: inputData.goal },
                    ].map((item) => (
                        <div key={item.label} className="flex items-center gap-2">
                            <span className="mono-label text-[9px]">{item.label}:</span>
                            <span
                                className="text-[11px] px-2 py-0.5"
                                style={{
                                    fontFamily: 'var(--font-mono)',
                                    color: 'var(--color-accent-blue)',
                                    background: 'rgba(37, 99, 235, 0.08)',
                                    border: '1px solid rgba(37, 99, 235, 0.2)',
                                    borderRadius: 'var(--radius-sharp)',
                                }}
                            >
                                {item.value}
                            </span>
                        </div>
                    ))}
                    <div className="ml-auto flex items-center gap-2">
                        <span className="status-pulse" />
                        <span
                            className="text-[10px] font-semibold"
                            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent-success)' }}
                        >
                            CTR_RATING: OPTIMAL
                        </span>
                    </div>
                </div>
            )}

            {/* Output Blocks */}
            <div className="grid grid-cols-1 gap-4">
                {DEMO_OUTPUT.map((block, blockIndex) => (
                    <div key={block.type} className="card-void overflow-hidden">
                        {/* Block Header */}
                        <div
                            className="flex items-center justify-between px-5 py-3"
                            style={{ borderBottom: '1px solid var(--color-border-subtle)' }}
                        >
                            <div className="flex items-center gap-3">
                                <span className="mono-header text-xs">[{block.label}]</span>
                                <span
                                    className="text-[9px] px-1.5 py-0.5"
                                    style={{
                                        fontFamily: 'var(--font-mono)',
                                        color: 'var(--color-accent-success)',
                                        background: 'rgba(16, 185, 129, 0.08)',
                                        borderRadius: 'var(--radius-sharp)',
                                    }}
                                >
                                    {block.items.length} VARIANT{block.items.length > 1 ? 'S' : ''}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CopyButton text={block.items.join('\n\n')} label="COPY_ALL" />
                                <button
                                    onClick={() => handleSave(blockIndex)}
                                    className="flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] tracking-wider transition-all duration-100"
                                    style={{
                                        fontFamily: 'var(--font-mono)',
                                        color: savedBlocks.has(blockIndex) ? 'var(--color-accent-success)' : 'var(--color-text-muted)',
                                        background: savedBlocks.has(blockIndex) ? 'rgba(16, 185, 129, 0.08)' : 'transparent',
                                        border: `1px solid ${savedBlocks.has(blockIndex) ? 'var(--color-accent-success)' : 'var(--color-border-subtle)'}`,
                                        borderRadius: 'var(--radius-sharp)',
                                    }}
                                >
                                    <Save size={10} />
                                    {savedBlocks.has(blockIndex) ? 'ARCHIVED' : 'SAVE'}
                                </button>
                            </div>
                        </div>

                        {/* Block Content */}
                        <div className="p-5 flex flex-col gap-3">
                            {block.items.map((item, itemIndex) => (
                                <div
                                    key={itemIndex}
                                    className="flex gap-3 p-4 group"
                                    style={{
                                        background: 'var(--color-bg-primary)',
                                        border: '1px solid var(--color-border-subtle)',
                                        borderRadius: 'var(--radius-sharp)',
                                    }}
                                >
                                    <span className="mono-label text-[9px] shrink-0 pt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                                        {String(itemIndex + 1).padStart(2, '0')}
                                    </span>
                                    <div className="flex-1 flex flex-col gap-2">
                                        <p
                                            className="text-sm leading-relaxed whitespace-pre-line"
                                            style={{ color: 'var(--color-text-secondary)' }}
                                        >
                                            {item}
                                        </p>
                                    </div>
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-100 shrink-0">
                                        <CopyButton text={item} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Action Bar */}
            <div
                className="flex flex-wrap items-center justify-between gap-4 py-6"
                style={{ borderTop: '1px solid var(--color-border-subtle)' }}
            >
                <Link href="/generate" className="btn-void">
                    <ArrowLeft size={14} />
                    NEW_GENERATION
                </Link>
                <div className="flex items-center gap-3">
                    <button className="btn-void">
                        <RefreshCw size={14} />
                        REGENERATE_VARIANTS
                    </button>
                    <button className="btn-signal">
                        <Save size={14} />
                        SAVE_TO_ARCHIVE
                    </button>
                </div>
            </div>
        </div>
    );
}
