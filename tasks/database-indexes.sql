-- =====================================================
-- Database Indexes for AI Deck
-- Run these in Supabase SQL Editor (Dashboard > SQL Editor)
-- =====================================================

-- ARTICLES TABLE
-- ---------------

-- For finding articles by slug (used in article pages)
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);

-- For filtering by status (published/draft)
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);

-- For ordering by publish date (homepage, category pages)
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at DESC);

-- For filtering by category
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category_id);

-- Composite index for common query: published articles ordered by date
CREATE INDEX IF NOT EXISTS idx_articles_published_date
ON articles(status, published_at DESC)
WHERE status = 'published';


-- CATEGORIES TABLE
-- -----------------

-- For finding categories by slug
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);


-- AI_TOOLS TABLE
-- ---------------

-- For finding tools by slug
CREATE INDEX IF NOT EXISTS idx_ai_tools_slug ON ai_tools(slug);

-- For filtering featured tools (homepage)
CREATE INDEX IF NOT EXISTS idx_ai_tools_featured ON ai_tools(is_featured);

-- For filtering by category
CREATE INDEX IF NOT EXISTS idx_ai_tools_category ON ai_tools(category_id);


-- VERIFY INDEXES
-- ---------------
-- Run this to see all indexes:
-- SELECT indexname, tablename FROM pg_indexes WHERE schemaname = 'public';
