import { createClient } from '@/lib/supabase/server'
import { ComparisonTable } from '@/components/tools/ComparisonTable'
import { ToolSelector } from '@/components/tools/ToolSelector'
import type { AITool } from '@/types/database'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Compare AI Tools | AI Deck',
  description: 'Compare AI tools side by side. See features, pricing, pros and cons to find the best tool for your needs.',
}

interface Props {
  searchParams: Promise<{ tools?: string }>
}

export default async function ComparePage({ searchParams }: Props) {
  const params = await searchParams
  const supabase = await createClient()

  // Get all tools for the selector
  const { data: allTools } = await supabase
    .from('ai_tools')
    .select('id, name, slug, logo_url, category, pricing')
    .order('name')

  // Parse selected tool slugs from URL
  const selectedSlugs = params.tools?.split(',').filter(Boolean) || []

  // Get selected tools with full details
  let selectedTools: AITool[] = []
  if (selectedSlugs.length > 0) {
    const { data } = await supabase
      .from('ai_tools')
      .select('*')
      .in('slug', selectedSlugs)
    selectedTools = data || []

    // Sort to match URL order
    selectedTools.sort((a, b) =>
      selectedSlugs.indexOf(a.slug) - selectedSlugs.indexOf(b.slug)
    )
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Compare AI Tools</h1>
        <p className="text-muted-foreground">
          Select up to 3 tools to compare side by side
        </p>
      </div>

      <ToolSelector
        tools={allTools || []}
        selectedSlugs={selectedSlugs}
        maxSelection={3}
      />

      {selectedTools.length >= 2 ? (
        <ComparisonTable tools={selectedTools} />
      ) : (
        <div className="text-center py-16 bg-muted/30 rounded-3xl mt-8">
          <p className="text-muted-foreground text-lg">
            {selectedTools.length === 0
              ? 'Select at least 2 tools to compare'
              : 'Select one more tool to start comparing'
            }
          </p>
        </div>
      )}
    </div>
  )
}
