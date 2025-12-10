import { createClient } from '@/lib/supabase/server'
import { FeaturedArticlesClient } from './FeaturedArticlesClient'

export async function FeaturedArticles() {
  const supabase = await createClient()

  const { data: articles } = await supabase
    .from('articles')
    .select('*, category:categories(*)')
    .eq('status', 'published')
    .eq('is_featured', true)
    .order('published_at', { ascending: false })
    .limit(3)

  return <FeaturedArticlesClient articles={articles || []} />
}
