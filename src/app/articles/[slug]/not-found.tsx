import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/server'

export default async function ArticleNotFound() {
  const supabase = await createClient()

  // Fetch similar articles to suggest
  const { data: similarArticles } = await supabase
    .from('articles')
    .select('title, slug, excerpt')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(3)

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
            <svg
              className="w-8 h-8 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-2">Article not found</h1>
          <p className="text-muted-foreground">
            This article may have been moved, deleted, or never existed.
            Check the URL or browse our latest articles below.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
          <Button asChild>
            <Link href="/articles">All articles</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Go home</Link>
          </Button>
        </div>

        {similarArticles && similarArticles.length > 0 && (
          <div className="border-t pt-8 text-left">
            <h2 className="text-lg font-semibold mb-6">You might be interested in</h2>
            <div className="space-y-4">
              {similarArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/articles/${article.slug}`}
                  className="block p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <h3 className="font-medium mb-1">{article.title}</h3>
                  {article.excerpt && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {article.excerpt}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
