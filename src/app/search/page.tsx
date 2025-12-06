import { Suspense } from 'react'
import { SearchContent } from './SearchContent'
import { ArticleCardSkeleton } from '@/components/articles/ArticleCardSkeleton'

export const metadata = {
  title: 'Search Articles | AI News',
  description: 'Search for AI news, tutorials, and insights',
}

function SearchFallback() {
  return (
    <div className="container py-8">
      <div className="max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl font-bold text-center mb-8">Search Articles</h1>
        <div className="h-14 bg-muted animate-pulse rounded-md" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <ArticleCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchFallback />}>
      <SearchContent />
    </Suspense>
  )
}
