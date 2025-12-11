import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export default function ToolLoading() {
  return (
    <div className="container max-w-4xl py-8">
      <Skeleton className="h-10 w-32 mb-6" />

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <Skeleton className="w-24 h-24 rounded-xl shrink-0" />
        <div className="flex-1">
          <Skeleton className="h-9 w-48 mb-3" />
          <Skeleton className="h-5 w-24 mb-3" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4 mb-4" />
          <Skeleton className="h-10 w-36" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <Skeleton className="h-6 w-24" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-5 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
