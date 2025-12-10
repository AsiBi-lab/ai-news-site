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
    <Link href={`/articles/${article.slug}`} className="block h-full group relative">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 transform scale-[0.80] rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
      <Card className="h-full border-white/10 bg-neutral-900/50 overflow-hidden hover:border-indigo-500/50 transition-all duration-300 relative z-10 group-hover:-translate-y-1">
        {article.featured_image && (
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={article.featured_image}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent opacity-60" />
          </div>
        )}

        <CardHeader className="p-5">
          {article.category && (
            <Badge variant="secondary" className="w-fit mb-2 bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 border-indigo-500/20">
              {article.category.name}
            </Badge>
          )}
          <h3 className="font-bold text-lg line-clamp-2 text-white group-hover:text-indigo-300 transition-colors font-display">
            {article.title}
          </h3>
        </CardHeader>

        <CardContent className="p-5 pt-0">
          <p className="text-sm text-neutral-400 line-clamp-2 mb-3">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between mt-auto">
            <time className="text-xs text-neutral-500 font-medium">
              {article.published_at && new Date(article.published_at).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
