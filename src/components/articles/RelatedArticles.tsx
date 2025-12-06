import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'

interface RelatedArticlesProps {
  currentArticleId: string
  categoryId: string | null
}

interface RelatedArticle {
  id: string
  title: string
  slug: string
  excerpt: string | null
  featured_image: string | null
  published_at: string | null
  category: { name: string } | null
}

export async function RelatedArticles({
  currentArticleId,
  categoryId,
}: RelatedArticlesProps) {
  const supabase = await createClient()

  // Fetch related articles from the same category
  let query = supabase
    .from('articles')
    .select('id, title, slug, excerpt, featured_image, published_at, category:categories(name)')
    .eq('status', 'published')
    .neq('id', currentArticleId)
    .order('published_at', { ascending: false })
    .limit(3)

  // If we have a category, filter by it
  if (categoryId) {
    query = query.eq('category_id', categoryId)
  }

  const { data: articles } = await query

  // Transform the data to handle the category array from Supabase
  const transformedArticles = transformArticles(articles)

  // If no articles in same category, get any recent articles
  if (transformedArticles.length === 0) {
    const { data: recentArticles } = await supabase
      .from('articles')
      .select('id, title, slug, excerpt, featured_image, published_at, category:categories(name)')
      .eq('status', 'published')
      .neq('id', currentArticleId)
      .order('published_at', { ascending: false })
      .limit(3)

    const transformedRecent = transformArticles(recentArticles)
    if (transformedRecent.length === 0) {
      return null
    }

    return <RelatedArticlesGrid articles={transformedRecent} />
  }

  return <RelatedArticlesGrid articles={transformedArticles} />
}

// Transform Supabase response to handle category array
function transformArticles(data: unknown): RelatedArticle[] {
  if (!data || !Array.isArray(data)) return []

  return data.map((article) => ({
    id: article.id,
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt,
    featured_image: article.featured_image,
    published_at: article.published_at,
    // Supabase returns single relations as objects, not arrays
    category: article.category && typeof article.category === 'object' && !Array.isArray(article.category)
      ? article.category
      : null,
  }))
}

function RelatedArticlesGrid({ articles }: { articles: RelatedArticle[] }) {
  return (
    <section className="border-t pt-10 mt-10">
      <h2 className="text-xl font-bold mb-6">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article) => (
          <RelatedArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  )
}

function RelatedArticleCard({ article }: { article: RelatedArticle }) {
  const formattedDate = article.published_at
    ? new Date(article.published_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })
    : null

  return (
    <Link href={`/articles/${article.slug}`} className="group block">
      <article className="space-y-3">
        {article.featured_image && (
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
            <Image
              src={article.featured_image}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </div>
        )}
        <div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            {article.category && (
              <span className="text-primary font-medium">{article.category.name}</span>
            )}
            {article.category && formattedDate && <span>·</span>}
            {formattedDate && <time>{formattedDate}</time>}
          </div>
          <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
            {article.title}
          </h3>
        </div>
      </article>
    </Link>
  )
}
