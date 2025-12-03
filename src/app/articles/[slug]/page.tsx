import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeft } from 'lucide-react'

interface Props {
  params: Promise<{ slug: string }>
}

async function getArticle(slug: string) {
  const supabase = await createClient()

  const { data } = await supabase
    .from('articles')
    .select('*, category:categories(*)')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  return data
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const article = await getArticle(resolvedParams.slug)
  if (!article) return { title: 'Article Not Found' }

  return {
    title: article.seo_title || article.title,
    description: article.seo_description || article.excerpt,
  }
}

export default async function ArticlePage({ params }: Props) {
  const resolvedParams = await params
  const article = await getArticle(resolvedParams.slug)
  if (!article) notFound()

  return (
    <article className="container max-w-4xl py-8">
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/articles">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Articles
        </Link>
      </Button>

      <header className="mb-8">
        {article.category && (
          <Link href={`/categories/${article.category.slug}`}>
            <Badge variant="secondary" className="mb-4 hover:bg-secondary/80">
              {article.category.name}
            </Badge>
          </Link>
        )}

        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
          {article.title}
        </h1>

        {article.excerpt && (
          <p className="text-xl text-muted-foreground mb-4">
            {article.excerpt}
          </p>
        )}

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {article.published_at && (
            <time>
              {new Date(article.published_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          )}
          {article.ai_generated && (
            <Badge variant="outline" className="text-xs">
              AI Generated
            </Badge>
          )}
        </div>
      </header>

      {article.featured_image && (
        <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
          <Image
            src={article.featured_image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div
        className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary prose-img:rounded-lg"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {article.source_url && (
        <div className="mt-8 pt-8 border-t">
          <p className="text-sm text-muted-foreground">
            Source:{' '}
            <a
              href={article.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {new URL(article.source_url).hostname}
            </a>
          </p>
        </div>
      )}
    </article>
  )
}
