import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeft, ExternalLink, Check, X, Star } from 'lucide-react'

interface Props {
  params: Promise<{ slug: string }>
}

async function getTool(slug: string) {
  const supabase = await createClient()

  const { data } = await supabase
    .from('ai_tools')
    .select('*')
    .eq('slug', slug)
    .single()

  return data
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const tool = await getTool(resolvedParams.slug)
  if (!tool) return { title: 'Tool Not Found' }

  return {
    title: `${tool.name} - AI Tool Review`,
    description: tool.description,
  }
}

const pricingColors: Record<string, string> = {
  free: 'bg-green-500/10 text-green-600 dark:text-green-400',
  freemium: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  paid: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
  enterprise: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
}

export default async function ToolPage({ params }: Props) {
  const resolvedParams = await params
  const tool = await getTool(resolvedParams.slug)
  if (!tool) notFound()

  return (
    <div className="container max-w-4xl py-8">
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/tools">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Tools
        </Link>
      </Button>

      {/* Header */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-muted flex items-center justify-center shrink-0">
          {tool.logo_url ? (
            <Image src={tool.logo_url} alt={tool.name} fill className="object-cover" />
          ) : (
            <span className="text-3xl font-bold text-muted-foreground">
              {tool.name.charAt(0)}
            </span>
          )}
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">{tool.name}</h1>
            {tool.pricing && (
              <Badge className={pricingColors[tool.pricing]}>{tool.pricing}</Badge>
            )}
            {tool.is_featured && (
              <Badge variant="secondary">
                <Star className="w-3 h-3 mr-1 fill-yellow-500 text-yellow-500" />
                Featured
              </Badge>
            )}
          </div>

          {tool.category && (
            <Badge variant="outline" className="mb-3">
              {tool.category}
            </Badge>
          )}

          {tool.rating && (
            <div className="flex items-center gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(tool.rating!)
                      ? 'fill-yellow-500 text-yellow-500'
                      : 'text-muted-foreground/30'
                  }`}
                />
              ))}
              <span className="ml-2 text-lg font-medium">{tool.rating.toFixed(1)}</span>
            </div>
          )}

          <p className="text-muted-foreground">{tool.description}</p>

          {tool.url && (
            <Button asChild className="mt-4">
              <a href={tool.url} target="_blank" rel="noopener noreferrer">
                Visit Website
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      </div>

      {/* Features, Pros, Cons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tool.features && tool.features.length > 0 && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {tool.features.map((feature: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {tool.pros && tool.pros.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-green-600 dark:text-green-400">Pros</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {tool.pros.map((pro: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {tool.cons && tool.cons.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-red-600 dark:text-red-400">Cons</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {tool.cons.map((con: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <X className="h-5 w-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
