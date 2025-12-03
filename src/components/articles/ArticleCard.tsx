import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import Image from 'next/image'
import type { Article, Category } from '@/types/database'

interface Props {
  article: Article & { category: Category | null }
}

export function ArticleCard({ article }: Props) {
  return (
    <Link href={`/articles/${article.slug}`}>
      <Card className="group h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
        {article.featured_image && (
          <div className="relative aspect-video">
            <Image
              src={article.featured_image}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        <CardHeader>
          {article.category && (
            <Badge variant="secondary" className="w-fit">
              {article.category.name}
            </Badge>
          )}
          <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
            {article.title}
          </h3>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {article.excerpt}
          </p>
          <time className="text-xs text-muted-foreground mt-2 block">
            {article.published_at && new Date(article.published_at).toLocaleDateString()}
          </time>
        </CardContent>
      </Card>
    </Link>
  )
}
