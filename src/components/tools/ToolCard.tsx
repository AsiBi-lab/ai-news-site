import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import type { AITool } from '@/types/database'

interface Props {
  tool: AITool
}

const pricingColors: Record<string, string> = {
  free: 'bg-green-500/10 text-green-600 dark:text-green-400',
  freemium: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  paid: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
  enterprise: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
}

export function ToolCard({ tool }: Props) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
          {tool.logo_url ? (
            <Image src={tool.logo_url} alt={tool.name} fill className="object-cover" />
          ) : (
            <span className="text-xl font-bold text-muted-foreground">
              {tool.name.charAt(0)}
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
            {tool.name}
          </h3>
          {tool.pricing && (
            <Badge variant="secondary" className={pricingColors[tool.pricing] || ''}>
              {tool.pricing}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {tool.description}
        </p>

        {tool.rating && (
          <div className="flex items-center gap-1 mt-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={
                  i < Math.floor(tool.rating!)
                    ? 'text-yellow-500'
                    : 'text-muted-foreground/30'
                }
              >
                ★
              </span>
            ))}
            <span className="text-sm text-muted-foreground ml-1">
              ({tool.rating.toFixed(1)})
            </span>
          </div>
        )}

        {tool.category && (
          <Badge variant="outline" className="mt-3">
            {tool.category}
          </Badge>
        )}
      </CardContent>

      <CardFooter>
        <Button asChild variant="ghost" className="w-full">
          <Link href={`/tools/${tool.slug}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
