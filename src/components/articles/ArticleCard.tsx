import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import Image from 'next/image'
import type { Article, Category } from '@/types/database'

interface Props {
  article: Article & { category: Category | null }
}

export function ArticleCard({ article }: Props) {
  const formattedDate = article.published_at
    ? new Date(article.published_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : null

  return (
    <Link href={`/articles/${article.slug}`} className="group block h-full">
      <Card className="h-full overflow-hidden border-border/50 bg-card/50 hover:bg-card hover:border-border transition-all duration-200">
        {article.featured_image && (
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={article.featured_image}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
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
}
