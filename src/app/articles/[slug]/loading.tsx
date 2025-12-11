import { Skeleton } from '@/components/ui/skeleton'

export default function ArticleLoading() {
  return (
    <article className="container max-w-4xl py-8">
      <Skeleton className="h-10 w-32 mb-6" />

      <header className="mb-8">
        <Skeleton className="h-6 w-24 mb-4" />
        <Skeleton className="h-12 w-full mb-2" />
        <Skeleton className="h-12 w-3/4 mb-4" />
        <Skeleton className="h-6 w-full mb-4" />
        <Skeleton className="h-4 w-48" />
      </header>

      <Skeleton className="aspect-video w-full mb-8 rounded-lg" />

      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </article>
  )
}
