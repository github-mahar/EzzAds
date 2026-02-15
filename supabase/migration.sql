-- ==================================================
-- THE EZZADS GENERATOR — DATABASE SCHEMA
-- ==================================================
-- Run this in your Supabase SQL Editor:
-- https://viqitcjszkxunzvfpwpg.supabase.co → SQL Editor → New Query
-- ==================================================

-- 1. PROFILES TABLE (extends auth.users)
-- -----------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  plan_type TEXT NOT NULL DEFAULT 'FREE' CHECK (plan_type IN ('FREE', 'PRO')),
  generations_used_today INTEGER NOT NULL DEFAULT 0,
  total_generations INTEGER NOT NULL DEFAULT 0,
  last_generation_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. SAVED_ADS TABLE
-- -----------------------------------------------
CREATE TABLE IF NOT EXISTS public.saved_ads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  tone TEXT NOT NULL,
  goal TEXT NOT NULL,
  product_name TEXT NOT NULL,
  target_audience TEXT NOT NULL,
  offer TEXT,
  output_data JSONB NOT NULL,
  framework_used TEXT NOT NULL DEFAULT 'AIDA',
  performance_rating TEXT NOT NULL DEFAULT 'HIGH',
  generation_id TEXT,
  tokens_used INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. INDEXES
-- -----------------------------------------------
CREATE INDEX IF NOT EXISTS idx_saved_ads_user_id ON public.saved_ads(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_ads_created_at ON public.saved_ads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_saved_ads_platform ON public.saved_ads(platform);

-- 4. ROW LEVEL SECURITY (RLS)
-- -----------------------------------------------
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_ads ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can only read/update their own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Saved Ads: Users can only CRUD their own ads
CREATE POLICY "Users can view own ads"
  ON public.saved_ads FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own ads"
  ON public.saved_ads FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own ads"
  ON public.saved_ads FOR DELETE
  USING (auth.uid() = user_id);

-- 5. AUTO-CREATE PROFILE ON SIGNUP
-- -----------------------------------------------
-- This trigger automatically creates a profile row when a new user signs up.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$;

-- Drop trigger if it exists, then create
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 6. AUTO-UPDATE updated_at
-- -----------------------------------------------
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS profiles_updated_at ON public.profiles;
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ==================================================
-- DONE. Your database is ready.
-- ==================================================
