// ============================================
// DATABASE OPERATIONS — THE EZZADS GENERATOR
// ============================================
// All Supabase read/write operations in one place.
// Server-side operations use supabase-server.ts
// Client-side operations use supabase.ts

import { createClient } from '@/lib/supabase';

// -----------------------------------------------
// TYPES
// -----------------------------------------------
export interface Profile {
    id: string;
    email: string;
    plan_type: 'FREE' | 'PRO';
    generations_used_today: number;
    total_generations: number;
    last_generation_date: string | null;
    created_at: string;
    updated_at: string;
}

export interface SavedAd {
    id: string;
    user_id: string;
    platform: string;
    tone: string;
    goal: string;
    product_name: string;
    target_audience: string;
    offer: string | null;
    output_data: Record<string, unknown>;
    framework_used: string;
    performance_rating: string;
    generation_id: string | null;
    tokens_used: number;
    created_at: string;
}

export interface SaveAdInput {
    platform: string;
    tone: string;
    goal: string;
    product_name: string;
    target_audience: string;
    offer?: string;
    output_data: Record<string, unknown>;
    framework_used: string;
    performance_rating: string;
    generation_id?: string;
    tokens_used?: number;
}

// -----------------------------------------------
// PROFILE OPERATIONS (Client-side)
// -----------------------------------------------

export async function getProfile(): Promise<Profile | null> {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    if (error) {
        console.error('[DB] Failed to fetch profile:', error.message);
        return null;
    }

    return data as Profile;
}

export async function getUsageStats(): Promise<{
    usedToday: number;
    limit: number;
    total: number;
    planType: string;
} | null> {
    const profile = await getProfile();
    if (!profile) return null;

    // Reset daily count if it's a new day
    const today = new Date().toISOString().split('T')[0];
    const lastDate = profile.last_generation_date;

    if (lastDate !== today && profile.generations_used_today > 0) {
        // New day — reset counter
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            await supabase
                .from('profiles')
                .update({
                    generations_used_today: 0,
                    last_generation_date: today,
                })
                .eq('id', user.id);
        }
        return {
            usedToday: 0,
            limit: profile.plan_type === 'PRO' ? -1 : 5,
            total: profile.total_generations,
            planType: profile.plan_type,
        };
    }

    return {
        usedToday: profile.generations_used_today,
        limit: profile.plan_type === 'PRO' ? -1 : 5,
        total: profile.total_generations,
        planType: profile.plan_type,
    };
}

export async function incrementGenerationCount(): Promise<boolean> {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const today = new Date().toISOString().split('T')[0];
    const profile = await getProfile();
    if (!profile) return false;

    const isNewDay = profile.last_generation_date !== today;

    const { error } = await supabase
        .from('profiles')
        .update({
            generations_used_today: isNewDay ? 1 : profile.generations_used_today + 1,
            total_generations: profile.total_generations + 1,
            last_generation_date: today,
        })
        .eq('id', user.id);

    if (error) {
        console.error('[DB] Failed to increment generation count:', error.message);
        return false;
    }

    return true;
}

// -----------------------------------------------
// SAVED ADS OPERATIONS (Client-side)
// -----------------------------------------------

export async function getSavedAds(): Promise<SavedAd[]> {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
        .from('saved_ads')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('[DB] Failed to fetch saved ads:', error.message);
        return [];
    }

    return (data as SavedAd[]) ?? [];
}

export async function saveAd(input: SaveAdInput): Promise<SavedAd | null> {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
        .from('saved_ads')
        .insert({
            user_id: user.id,
            platform: input.platform,
            tone: input.tone,
            goal: input.goal,
            product_name: input.product_name,
            target_audience: input.target_audience,
            offer: input.offer ?? null,
            output_data: input.output_data,
            framework_used: input.framework_used,
            performance_rating: input.performance_rating,
            generation_id: input.generation_id ?? null,
            tokens_used: input.tokens_used ?? 0,
        })
        .select()
        .single();

    if (error) {
        console.error('[DB] Failed to save ad:', error.message);
        return null;
    }

    return data as SavedAd;
}

export async function deleteAd(adId: string): Promise<boolean> {
    const supabase = createClient();

    const { error } = await supabase
        .from('saved_ads')
        .delete()
        .eq('id', adId);

    if (error) {
        console.error('[DB] Failed to delete ad:', error.message);
        return false;
    }

    return true;
}

export async function getAdById(adId: string): Promise<SavedAd | null> {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('saved_ads')
        .select('*')
        .eq('id', adId)
        .single();

    if (error) {
        console.error('[DB] Failed to fetch ad:', error.message);
        return null;
    }

    return data as SavedAd;
}
