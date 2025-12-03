import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ArticleCard } from '@/components/articles'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeft } from 'lucide-react'

interface Props {
  params: Promise<{ slug: string }>
}

async function getCategory(slug: string) {
  const supabase = await createClient()

  const { data } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single()

  return data
}

async function getCategoryArticles(categoryId: string) {
  const supabase = await createClient()

  const { data } = await supabase
    .from('articles')
    .select('*, category:categories(*)')
    .eq('category_id', categoryId)
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  return data
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const category = await getCategory(resolvedParams.slug)
  if (!category) return { title: 'Category Not Found' }

  return {
    title: `${category.name} - AI News`,
    description: category.description || `Browse all ${category.name} articles`,
  }
}

export default async function CategoryPage({ params }: Props) {
  const resolvedParams = await params
  const category = await getCategory(resolvedParams.slug)
  if (!category) notFound()

  const articles = await getCategoryArticles(category.id)

  return (
    <div className="container py-8">
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/articles">
          <ArrowLeft className="mr-2 h-4 w-4" />
          All Articles
        </Link>
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
        {category.description && (
          <p className="text-muted-foreground">{category.description}</p>
        )}
      </div>

      {articles && articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground">
            No articles in this category yet. Check back soon!
          </p>
        </div>
      )}
    </div>
  )
}
