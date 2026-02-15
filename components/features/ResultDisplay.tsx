'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { RefreshCw, Save, ArrowLeft, Zap, AlertTriangle } from 'lucide-react';
import CopyButton from '@/components/ui/CopyButton';

interface OutputBlock {
    type: string;
    label: string;
    items: string[];
}

interface GenerationResult {
    id: string;
    platform: string;
    performanceRating: string;
    frameworkUsed: string;
    blocks: OutputBlock[];
    input?: {
        productName: string;
        platform: string;
        tone: string;
        goal: string;
    };
    generatedAt: string;
    tokensUsed?: number;
}

export default function ResultDisplay() {
    const [result, setResult] = useState<GenerationResult | null>(null);
    const [savedBlocks, setSavedBlocks] = useState<Set<number>>(new Set());
    const [hasData, setHasData] = useState<boolean | null>(null);

    useEffect(() => {
        const storedResult = sessionStorage.getItem('ezzads_result');
        const storedInput = sessionStorage.getItem('ezzads_input');

        if (storedResult) {
            const parsed = JSON.parse(storedResult);
            if (storedInput) {
                parsed.input = JSON.parse(storedInput);
            }
            setResult(parsed);
            setHasData(true);
        } else {
            setHasData(false);
        }
    }, []);

    const handleSave = (index: number) => {
        setSavedBlocks((prev) => new Set([...prev, index]));
    };

    // No data state
    if (hasData === false) {
        return (
            <div className="card-void p-12 text-center flex flex-col items-center gap-4 animate-boot">
                <AlertTriangle size={32} style={{ color: 'var(--color-text-muted)' }} />
                <span className="mono-header text-xs">[NO_GENERATION_DATA]</span>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    No generation output found. Initialize a new generation to view results.
                </p>
                <Link href="/generate" className="btn-signal">
                    <Zap size={14} />
                    INITIALIZE_GENERATION
                </Link>
            </div>
        );
    }

    // Loading state
    if (hasData === null || !result) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="processing-bar w-48" />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 animate-boot-delay-1">
            {/* Input Summary Bar */}
            {result.input && (
                <div
                    className="card-void p-4 flex flex-wrap items-center gap-4"
                    style={{ borderColor: 'rgba(37, 99, 235, 0.15)' }}
                >
                    <span className="mono-label text-[10px]">INPUT_SUMMARY:</span>
                    {[
                        { label: 'PRODUCT', value: result.input.productName },
                        { label: 'PLATFORM', value: result.input.platform },
                        { label: 'TONE', value: result.input.tone },
                        { label: 'GOAL', value: result.input.goal },
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
                    <div className="ml-auto flex items-center gap-4">
                        {result.tokensUsed && result.tokensUsed > 0 && (
                            <span className="mono-label text-[9px]">TOKENS: {result.tokensUsed}</span>
                        )}
                        <div className="flex items-center gap-2">
                            <span className="status-pulse" />
                            <span
                                className="text-[10px] font-semibold"
                                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent-success)' }}
                            >
                                CTR_RATING: {result.performanceRating}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* Framework Tag */}
            <div className="flex items-center gap-3">
                <span className="mono-label text-[10px]">FRAMEWORK_APPLIED:</span>
                <span
                    className="text-[10px] px-2 py-0.5 font-semibold"
                    style={{
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--color-accent-blue)',
                        background: 'rgba(37, 99, 235, 0.08)',
                        border: '1px solid rgba(37, 99, 235, 0.2)',
                        borderRadius: 'var(--radius-sharp)',
                    }}
                >
                    [{result.frameworkUsed}]
                </span>
                <span className="mono-label text-[10px]">ID: {result.id}</span>
            </div>

            {/* Output Blocks */}
            <div className="grid grid-cols-1 gap-4">
                {result.blocks.map((block, blockIndex) => (
                    <div key={block.type + blockIndex} className="card-void overflow-hidden">
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
                    <Link href="/generate" className="btn-void">
                        <RefreshCw size={14} />
                        REGENERATE_VARIANTS
                    </Link>
                    <button className="btn-signal">
                        <Save size={14} />
                        SAVE_TO_ARCHIVE
                    </button>
                </div>
            </div>
        </div>
    );
}
