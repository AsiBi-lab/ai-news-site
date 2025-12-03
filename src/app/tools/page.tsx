import { createClient } from '@/lib/supabase/server'
import { ToolCard, ToolFilters } from '@/components/tools'

interface Props {
  searchParams: Promise<{ pricing?: string; category?: string }>
}

export default async function ToolsPage({ searchParams }: Props) {
  const params = await searchParams
  const supabase = await createClient()

  // Build query
  let query = supabase.from('ai_tools').select('*').order('name')

  // Apply pricing filter
  if (params.pricing) {
    query = query.eq('pricing', params.pricing)
  }

  // Apply category filter
  if (params.category) {
    query = query.eq('category', params.category)
  }

  const { data: tools } = await query

  // Get unique categories for filter
  const { data: allTools } = await supabase.from('ai_tools').select('category')
  const categories = [...new Set(allTools?.map((t) => t.category).filter(Boolean))] as string[]

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Tools Directory</h1>
        <p className="text-muted-foreground">
          Discover the best AI tools for your workflow
        </p>
      </div>

      <ToolFilters
        currentPricing={params.pricing}
        categories={categories}
        currentCategory={params.category}
      />

      {tools && tools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No tools found. Check back soon!</p>
        </div>
      )}
    </div>
  )
}
