import { createClient } from '@/lib/supabase/server'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Sparkles } from 'lucide-react'

export async function FeaturedArticles() {
  const supabase = await createClient()

  const { data: articles } = await supabase
    .from('articles')
    .select('*, category:categories(*)')
    .eq('status', 'published')
    .eq('is_featured', true)
    .order('published_at', { ascending: false })
    .limit(3)

  if (!articles || articles.length === 0) {
    return (
      <section className="py-20">
        <div className="container">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary">Featured</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Editor's Picks</h2>
          <p className="text-muted-foreground">No featured articles yet. Check back soon!</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20">
      <div className="container">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">Featured</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">Editor's Picks</h2>
          </div>
          <Link
            href="/articles"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group"
          >
            View all articles
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => {
            const formattedDate = article.published_at
              ? new Date(article.published_at).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })
              : null

            return (
              <Link key={article.id} href={`/articles/${article.slug}`} className="group block">
                <Card className="h-full overflow-hidden border-border/50 bg-card/50 hover:bg-card hover:border-border transition-all duration-200">
                  {article.featured_image && (
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={article.featured_image}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                      {index === 0 && (
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-primary text-primary-foreground border-0 text-xs">
                            Top Story
                          </Badge>
                        </div>
                      )}
                    </div>
                  )}

                  <CardContent className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      {article.category && (
                        <Badge variant="secondary" className="text-xs font-medium bg-primary/10 text-primary hover:bg-primary/15 border-0">
                          {article.category.name}
                        </Badge>
                      )}
                      {formattedDate && (
                        <time className="text-xs text-muted-foreground">
                          {formattedDate}
                        </time>
                      )}
                    </div>

                    <h3 className="font-semibold text-lg leading-snug line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>

                    {article.excerpt && (
                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {article.excerpt}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        <Link
          href="/articles"
          className="flex sm:hidden items-center justify-center gap-1.5 mt-8 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          View all articles
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}
