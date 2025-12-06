import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/server'

export default async function NotFound() {
  const supabase = await createClient()

  // Fetch recent articles to suggest
  const { data: recentArticles } = await supabase
    .from('articles')
    .select('title, slug')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(3)

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="mb-8">
          <h1 className="text-8xl font-bold text-primary/20 mb-4">404</h1>
          <h2 className="text-2xl font-bold mb-2">Page not found</h2>
          <p className="text-muted-foreground">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been
            moved or deleted.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <Button asChild>
            <Link href="/">Go home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/articles">Browse articles</Link>
          </Button>
        </div>

        {recentArticles && recentArticles.length > 0 && (
          <div className="border-t pt-8">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Recent Articles
            </h3>
            <ul className="space-y-2">
              {recentArticles.map((article) => (
                <li key={article.slug}>
                  <Link
                    href={`/articles/${article.slug}`}
                    className="text-primary hover:underline"
                  >
                    {article.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
