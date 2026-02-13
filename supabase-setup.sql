-- =============================================
-- BookNest Supabase Database Setup
-- Run this in: Supabase Dashboard → SQL Editor
-- =============================================

-- 1. BOOKMARKS TABLE (per-user bookmark storage)
-- =============================================
CREATE TABLE IF NOT EXISTS public.bookmarks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  is_favorite BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS so each user can only access their own bookmarks
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if re-running
DROP POLICY IF EXISTS "Users can view own bookmarks" ON public.bookmarks;
DROP POLICY IF EXISTS "Users can insert own bookmarks" ON public.bookmarks;
DROP POLICY IF EXISTS "Users can update own bookmarks" ON public.bookmarks;
DROP POLICY IF EXISTS "Users can delete own bookmarks" ON public.bookmarks;

-- RLS Policies: each user ONLY sees/modifies their own data
CREATE POLICY "Users can view own bookmarks"
  ON public.bookmarks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own bookmarks"
  ON public.bookmarks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bookmarks"
  ON public.bookmarks FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own bookmarks"
  ON public.bookmarks FOR DELETE
  USING (auth.uid() = user_id);


-- 2. AUTH LOGS TABLE (tracks every login, register, Google sign-in, logout)
-- =============================================
CREATE TABLE IF NOT EXISTS public.auth_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  event TEXT NOT NULL,           -- 'login', 'register', 'google_login', 'logout'
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS so each user can only see their own logs
ALTER TABLE public.auth_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own auth logs" ON public.auth_logs;
DROP POLICY IF EXISTS "Users can insert own auth logs" ON public.auth_logs;

CREATE POLICY "Users can view own auth logs"
  ON public.auth_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own auth logs"
  ON public.auth_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);


-- 3. ENABLE REALTIME for bookmarks (for live updates)
-- =============================================
ALTER PUBLICATION supabase_realtime ADD TABLE public.bookmarks;


-- 4. INDEXES for performance
-- =============================================
CREATE INDEX IF NOT EXISTS idx_bookmarks_user_id ON public.bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_bookmarks_created_at ON public.bookmarks(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_auth_logs_user_id ON public.auth_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_auth_logs_created_at ON public.auth_logs(user_id, created_at DESC);
