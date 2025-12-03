import { createClient } from '@/lib/supabase/server'
import { ArticleCard } from '@/components/articles'
import { CategoryFilter } from '@/components/shared/CategoryFilter'

interface Props {
  searchParams: Promise<{ category?: string; page?: string }>
}

export default async function ArticlesPage({ searchParams }: Props) {
  const params = await searchParams
  const supabase = await createClient()

  // Build query
  let query = supabase
    .from('articles')
    .select('*, category:categories(*)')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  // Apply category filter if provided
  if (params.category) {
    const { data: category } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', params.category)
      .single()

    if (category) {
      query = query.eq('category_id', category.id)
    }
  }

  const { data: articles } = await query

  // Get categories for filter
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('name')

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Articles</h1>
        <p className="text-muted-foreground">
          Latest news and insights about artificial intelligence
        </p>
      </div>

      <CategoryFilter
        categories={categories ?? []}
        currentCategory={params.category}
      />

      {articles && articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No articles found. Check back soon!</p>
        </div>
      )}
    </div>
  )
}
