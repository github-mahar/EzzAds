'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Zap, ArrowRight } from 'lucide-react';
import SegmentedToggle from '@/components/ui/SegmentedToggle';
import ProcessingOverlay from '@/components/ui/ProcessingOverlay';
import type { AdPlatform, AdTone, AdGoal } from '@/types';

const PLATFORM_OPTIONS: { value: AdPlatform; label: string }[] = [
    { value: 'META', label: 'META' },
    { value: 'GOOGLE', label: 'GOOGLE' },
    { value: 'TIKTOK', label: 'TIKTOK' },
    { value: 'YOUTUBE', label: 'YOUTUBE' },
    { value: 'LINKEDIN', label: 'LINKEDIN' },
];

const TONE_OPTIONS: { value: AdTone; label: string }[] = [
    { value: 'BOLD', label: 'BOLD' },
    { value: 'EMOTIONAL', label: 'EMOTIONAL' },
    { value: 'PROFESSIONAL', label: 'PROFESSIONAL' },
    { value: 'AGGRESSIVE', label: 'AGGRESSIVE' },
];

const GOAL_OPTIONS: { value: AdGoal; label: string }[] = [
    { value: 'SALES', label: 'SALES' },
    { value: 'LEADS', label: 'LEADS' },
    { value: 'AWARENESS', label: 'AWARENESS' },
    { value: 'CLICKS', label: 'CLICKS' },
];

export default function GeneratorEngine() {
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);
    const [formData, setFormData] = useState({
        productName: '',
        targetAudience: '',
        platform: 'META' as AdPlatform,
        offer: '',
        tone: 'BOLD' as AdTone,
        goal: 'SALES' as AdGoal,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};
        if (!formData.productName.trim()) newErrors.productName = 'REQUIRED: Product/Service identifier';
        if (!formData.targetAudience.trim()) newErrors.targetAudience = 'REQUIRED: Target audience parameters';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleGenerate = () => {
        if (!validate()) return;
        setIsProcessing(true);
    };

    const handleProcessingComplete = useCallback(() => {
        // Store form data in sessionStorage for the result page
        sessionStorage.setItem('ezzads_input', JSON.stringify(formData));
        setTimeout(() => {
            router.push('/result');
        }, 500);
    }, [formData, router]);

    return (
        <>
            <ProcessingOverlay isActive={isProcessing} onComplete={handleProcessingComplete} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-boot-delay-1">
                {/* Main Form */}
                <div className="lg:col-span-8">
                    <div className="card-void p-6 flex flex-col gap-6">
                        {/* Form Header */}
                        <div className="flex items-center justify-between">
                            <span className="mono-header text-xs">[INPUT_PARAMETERS]</span>
                            <span className="mono-label text-[10px]">* REQUIRED_FIELDS</span>
                        </div>

                        {/* Product Name */}
                        <div className="flex flex-col gap-2">
                            <label className="mono-header text-xs" htmlFor="productName">
                                [PRODUCT_SERVICE_NAME] *
                            </label>
                            <input
                                id="productName"
                                type="text"
                                className="input-void"
                                placeholder="e.g., NexusTracker Pro — AI Analytics Platform"
                                value={formData.productName}
                                onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                            />
                            {errors.productName && (
                                <span className="text-[10px]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent-danger)' }}>
                                    ⚠ {errors.productName}
                                </span>
                            )}
                        </div>

                        {/* Target Audience */}
                        <div className="flex flex-col gap-2">
                            <label className="mono-header text-xs" htmlFor="targetAudience">
                                [TARGET_AUDIENCE] *
                            </label>
                            <input
                                id="targetAudience"
                                type="text"
                                className="input-void"
                                placeholder="e.g., E-commerce founders scaling from $10K-$100K MRR"
                                value={formData.targetAudience}
                                onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                            />
                            {errors.targetAudience && (
                                <span className="text-[10px]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent-danger)' }}>
                                    ⚠ {errors.targetAudience}
                                </span>
                            )}
                        </div>

                        {/* Offer (Optional) */}
                        <div className="flex flex-col gap-2">
                            <label className="mono-header text-xs" htmlFor="offer">
                                [OFFER_HOOK] <span style={{ color: 'var(--color-text-muted)' }}>OPTIONAL</span>
                            </label>
                            <input
                                id="offer"
                                type="text"
                                className="input-void"
                                placeholder="e.g., 30-day free trial — No credit card required"
                                value={formData.offer}
                                onChange={(e) => setFormData({ ...formData, offer: e.target.value })}
                            />
                        </div>

                        {/* Platform Selection (Segmented Toggle) */}
                        <SegmentedToggle
                            label="PLATFORM_TARGET"
                            options={PLATFORM_OPTIONS}
                            value={formData.platform}
                            onChange={(platform) => setFormData({ ...formData, platform })}
                        />

                        {/* Tone Selection */}
                        <SegmentedToggle
                            label="OUTPUT_TONE"
                            options={TONE_OPTIONS}
                            value={formData.tone}
                            onChange={(tone) => setFormData({ ...formData, tone })}
                        />

                        {/* Goal Selection */}
                        <SegmentedToggle
                            label="CAMPAIGN_OBJECTIVE"
                            options={GOAL_OPTIONS}
                            value={formData.goal}
                            onChange={(goal) => setFormData({ ...formData, goal })}
                        />

                        {/* Generate Button */}
                        <div
                            className="pt-4 flex items-center justify-between"
                            style={{ borderTop: '1px solid var(--color-border-subtle)' }}
                        >
                            <span className="mono-label text-[10px]">
                                FRAMEWORK: AUTO_SELECT (AIDA / PAS / EMOTIONAL)
                            </span>
                            <button
                                onClick={handleGenerate}
                                disabled={isProcessing}
                                className="btn-signal glow-signal"
                            >
                                <Zap size={14} />
                                GENERATE_AD
                                <ArrowRight size={14} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Sidebar: System Info */}
                <div className="lg:col-span-4 flex flex-col gap-4">
                    {/* Config Summary */}
                    <div className="card-void p-5 flex flex-col gap-4">
                        <span className="mono-header text-xs">[SYSTEM_STATUS]</span>
                        <div className="flex flex-col gap-3">
                            {[
                                { label: 'ENGINE', value: 'GPT-4o', status: 'ACTIVE' },
                                { label: 'FRAMEWORK', value: 'AUTO', status: 'READY' },
                                { label: 'RATE_LIMIT', value: '5/day', status: 'FREE_TIER' },
                            ].map((item) => (
                                <div
                                    key={item.label}
                                    className="flex items-center justify-between py-2 px-3"
                                    style={{
                                        background: 'var(--color-bg-primary)',
                                        border: '1px solid var(--color-border-subtle)',
                                        borderRadius: 'var(--radius-sharp)',
                                    }}
                                >
                                    <span className="mono-label text-[10px]">{item.label}</span>
                                    <span className="mono-data text-xs">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Frameworks */}
                    <div className="card-void p-5 flex flex-col gap-3">
                        <span className="mono-header text-xs">[AVAILABLE_FRAMEWORKS]</span>
                        {['AIDA — Attention, Interest, Desire, Action', 'PAS — Problem, Agitate, Solve', 'EMOTIONAL — Fear, Greed, Urgency, Social Proof'].map(
                            (fw) => (
                                <div
                                    key={fw}
                                    className="py-2 px-3 text-xs"
                                    style={{
                                        fontFamily: 'var(--font-mono)',
                                        color: 'var(--color-text-muted)',
                                        background: 'var(--color-bg-primary)',
                                        border: '1px solid var(--color-border-subtle)',
                                        borderRadius: 'var(--radius-sharp)',
                                    }}
                                >
                                    {fw}
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
