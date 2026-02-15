// ============================================
// SUPABASE CLIENT (Browser) — THE EZZADS GENERATOR
// ============================================
// Per architecture-lock.md §3: Supabase is the single source of truth.

import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
}
