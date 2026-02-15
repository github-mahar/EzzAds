'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Zap, Trash2, Eye, Archive, AlertTriangle, X, Copy } from 'lucide-react';
import { getSavedAds, deleteAd, type SavedAd } from '@/lib/db';
import { createClient } from '@/lib/supabase';
import CopyButton from '@/components/ui/CopyButton';

export default function DashboardView() {
    const [ads, setAds] = useState<SavedAd[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [expandedAd, setExpandedAd] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const loadAds = useCallback(async () => {
        setLoading(true);
        const data = await getSavedAds();
        setAds(data);
        setLoading(false);
    }, []);

    useEffect(() => {
        const supabase = createClient();
        supabase.auth.getUser().then(({ data: { user } }) => {
            if (user) {
                setIsAuthenticated(true);
                loadAds();
            } else {
                setIsAuthenticated(false);
                setLoading(false);
            }
        });
    }, [loadAds]);

    const handleDelete = async (adId: string) => {
        setDeletingId(adId);
        const success = await deleteAd(adId);
        if (success) {
            setAds((prev) => prev.filter((ad) => ad.id !== adId));
            if (expandedAd === adId) setExpandedAd(null);
        }
        setDeletingId(null);
    };

    // Unauthenticated state
    if (isAuthenticated === false) {
        return (
            <div className="card-void p-12 text-center flex flex-col items-center gap-4 animate-boot">
                <Archive size={32} style={{ color: 'var(--color-text-muted)' }} />
                <span className="mono-header text-xs">[SESSION_REQUIRED]</span>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    Authenticate to access your creative archive.
                </p>
                <Link href="/login?redirect=/dashboard" className="btn-signal">
                    <Zap size={14} />
                    AUTHENTICATE
                </Link>
            </div>
        );
    }

    // Loading state
    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="flex flex-col items-center gap-4">
                    <div className="processing-bar w-48" />
                    <span className="mono-label text-[10px]">LOADING_ARCHIVE...</span>
                </div>
            </div>
        );
    }

    // Empty state
    if (ads.length === 0) {
        return (
            <div className="card-void p-12 text-center flex flex-col items-center gap-4 animate-boot">
                <Archive size={32} style={{ color: 'var(--color-text-muted)' }} />
                <span className="mono-header text-xs">[ARCHIVE_EMPTY]</span>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    No saved generations found. Create your first ad to populate the archive.
                </p>
                <Link href="/generate" className="btn-signal">
                    <Zap size={14} />
                    INITIALIZE_GENERATION
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 animate-boot-delay-1">
            {/* Stats Bar */}
            <div className="flex flex-wrap items-center gap-4">
                {[
                    { label: 'TOTAL_ARCHIVED', value: ads.length },
                    { label: 'PLATFORMS', value: new Set(ads.map((a) => a.platform)).size },
                    { label: 'LATEST', value: ads[0] ? new Date(ads[0].created_at).toLocaleDateString() : 'N/A' },
                ].map((stat) => (
                    <div
                        key={stat.label}
                        className="flex items-center gap-2 px-3 py-2"
                        style={{
                            background: 'var(--color-bg-secondary)',
                            border: '1px solid var(--color-border-subtle)',
                            borderRadius: 'var(--radius-sharp)',
                        }}
                    >
                        <span className="mono-label text-[10px]">{stat.label}:</span>
                        <span className="mono-data text-xs">{stat.value}</span>
                    </div>
                ))}
            </div>

            {/* Ad Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {ads.map((ad) => (
                    <div key={ad.id} className="card-void overflow-hidden flex flex-col">
                        {/* Card Header */}
                        <div
                            className="flex items-center justify-between px-4 py-3"
                            style={{ borderBottom: '1px solid var(--color-border-subtle)' }}
                        >
                            <div className="flex items-center gap-2">
                                <span
                                    className="text-[9px] px-1.5 py-0.5 font-semibold"
                                    style={{
                                        fontFamily: 'var(--font-mono)',
                                        color: 'var(--color-accent-blue)',
                                        background: 'rgba(37, 99, 235, 0.08)',
                                        border: '1px solid rgba(37, 99, 235, 0.2)',
                                        borderRadius: 'var(--radius-sharp)',
                                    }}
                                >
                                    {ad.platform}
                                </span>
                                <span
                                    className="text-[9px] px-1.5 py-0.5"
                                    style={{
                                        fontFamily: 'var(--font-mono)',
                                        color: 'var(--color-accent-success)',
                                        background: 'rgba(16, 185, 129, 0.06)',
                                        borderRadius: 'var(--radius-sharp)',
                                    }}
                                >
                                    {ad.performance_rating}
                                </span>
                            </div>
                            <span className="mono-label text-[9px]">
                                {new Date(ad.created_at).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                })}
                            </span>
                        </div>

                        {/* Card Body */}
                        <div className="p-4 flex-1 flex flex-col gap-3">
                            <h3
                                className="text-sm font-semibold truncate"
                                style={{ color: 'var(--color-text-primary)' }}
                            >
                                {ad.product_name}
                            </h3>
                            <p
                                className="text-xs line-clamp-2"
                                style={{ color: 'var(--color-text-muted)' }}
                            >
                                {ad.target_audience}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-auto">
                                {[
                                    { label: ad.tone },
                                    { label: ad.goal },
                                    { label: ad.framework_used },
                                ].map((tag) => (
                                    <span
                                        key={tag.label}
                                        className="text-[9px] px-1.5 py-0.5"
                                        style={{
                                            fontFamily: 'var(--font-mono)',
                                            color: 'var(--color-text-muted)',
                                            background: 'var(--color-bg-primary)',
                                            border: '1px solid var(--color-border-subtle)',
                                            borderRadius: 'var(--radius-sharp)',
                                        }}
                                    >
                                        {tag.label}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Card Actions */}
                        <div
                            className="flex items-center gap-2 px-4 py-3"
                            style={{ borderTop: '1px solid var(--color-border-subtle)' }}
                        >
                            <button
                                onClick={() => setExpandedAd(expandedAd === ad.id ? null : ad.id)}
                                className="flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] tracking-wider flex-1 justify-center transition-all duration-100"
                                style={{
                                    fontFamily: 'var(--font-mono)',
                                    color: 'var(--color-accent-blue)',
                                    border: '1px solid rgba(37, 99, 235, 0.2)',
                                    borderRadius: 'var(--radius-sharp)',
                                    background: 'rgba(37, 99, 235, 0.04)',
                                }}
                            >
                                <Eye size={10} />
                                VIEW
                            </button>
                            <button
                                onClick={() => handleDelete(ad.id)}
                                disabled={deletingId === ad.id}
                                className="flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] tracking-wider transition-all duration-100"
                                style={{
                                    fontFamily: 'var(--font-mono)',
                                    color: 'var(--color-accent-danger)',
                                    border: '1px solid rgba(239, 68, 68, 0.2)',
                                    borderRadius: 'var(--radius-sharp)',
                                }}
                            >
                                <Trash2 size={10} />
                                {deletingId === ad.id ? '...' : 'DELETE'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Expanded Ad Modal */}
            {expandedAd && (() => {
                const ad = ads.find((a) => a.id === expandedAd);
                if (!ad) return null;
                const blocks = (ad.output_data as { blocks?: { label: string; items: string[] }[] }).blocks ?? [];

                return (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        style={{ background: 'rgba(2, 4, 8, 0.85)', backdropFilter: 'blur(8px)' }}
                        onClick={() => setExpandedAd(null)}
                    >
                        <div
                            className="card-void w-full max-w-3xl max-h-[80vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div
                                className="flex items-center justify-between px-6 py-4 sticky top-0 z-10"
                                style={{
                                    background: 'var(--color-bg-secondary)',
                                    borderBottom: '1px solid var(--color-border-subtle)',
                                }}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="mono-header text-xs">[{ad.product_name}]</span>
                                    <span
                                        className="text-[9px] px-1.5 py-0.5"
                                        style={{
                                            fontFamily: 'var(--font-mono)',
                                            color: 'var(--color-accent-blue)',
                                            background: 'rgba(37, 99, 235, 0.08)',
                                            borderRadius: 'var(--radius-sharp)',
                                        }}
                                    >
                                        {ad.platform}
                                    </span>
                                </div>
                                <button
                                    onClick={() => setExpandedAd(null)}
                                    className="p-1.5"
                                    style={{
                                        border: '1px solid var(--color-border-subtle)',
                                        borderRadius: 'var(--radius-sharp)',
                                    }}
                                >
                                    <X size={14} style={{ color: 'var(--color-text-muted)' }} />
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="p-6 flex flex-col gap-4">
                                {blocks.map((block, idx) => (
                                    <div
                                        key={idx}
                                        className="flex flex-col gap-2"
                                        style={{
                                            background: 'var(--color-bg-primary)',
                                            border: '1px solid var(--color-border-subtle)',
                                            borderRadius: 'var(--radius-sharp)',
                                            padding: '16px',
                                        }}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="mono-header text-[10px]">[{block.label}]</span>
                                            <CopyButton text={block.items.join('\n\n')} label="COPY" />
                                        </div>
                                        {block.items.map((item, itemIdx) => (
                                            <div key={itemIdx} className="flex gap-2 items-start group">
                                                <span className="mono-label text-[9px] pt-0.5 shrink-0">{String(itemIdx + 1).padStart(2, '0')}</span>
                                                <p className="text-xs leading-relaxed whitespace-pre-line" style={{ color: 'var(--color-text-secondary)' }}>
                                                    {item}
                                                </p>
                                                <div className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                                                    <Copy
                                                        size={10}
                                                        style={{ color: 'var(--color-text-muted)', cursor: 'pointer' }}
                                                        onClick={() => navigator.clipboard.writeText(item)}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            })()}
        </div>
    );
}
