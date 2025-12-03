// ========================================
// Database Types for AI News Site
// ========================================

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  created_at: string
}

export interface Tag {
  id: string
  name: string
  slug: string
}

export interface Article {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string | null
  featured_image: string | null
  status: 'draft' | 'published' | 'archived'
  published_at: string | null
  category_id: string | null
  source_url: string | null
  ai_generated: boolean
  seo_title: string | null
  seo_description: string | null
  created_at: string
  updated_at: string
}

export interface ArticleWithRelations extends Article {
  category: Category | null
  tags: Tag[]
}

export interface AITool {
  id: string
  name: string
  slug: string
  description: string | null
  category: string | null
  pricing: 'free' | 'freemium' | 'paid' | 'enterprise' | null
  url: string | null
  logo_url: string | null
  features: string[]
  pros: string[]
  cons: string[]
  rating: number | null
  is_featured: boolean
  created_at: string
  updated_at: string
}

// Supabase Query Types
export interface ArticleFilters {
  status?: Article['status']
  category_id?: string
  tag_slug?: string
  limit?: number
  offset?: number
}

export interface ToolFilters {
  category?: string
  pricing?: AITool['pricing']
  is_featured?: boolean
  limit?: number
  offset?: number
}
