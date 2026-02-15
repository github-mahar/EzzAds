-- ==================================================
-- STRIPE COLUMNS MIGRATION
-- ==================================================
-- Run this AFTER the initial migration.sql
-- Adds Stripe-related columns to the profiles table.
-- ==================================================

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT,
  ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT;

-- Allow webhook to update these columns (via service role or admin)
-- No additional RLS needed since webhook uses service role key.

-- Index for fast lookups by Stripe customer ID
CREATE INDEX IF NOT EXISTS idx_profiles_stripe_customer
  ON public.profiles(stripe_customer_id)
  WHERE stripe_customer_id IS NOT NULL;
