'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { X, Plus, Search } from 'lucide-react'
import { useState, useMemo } from 'react'
import { Badge } from '@/components/ui/badge'

interface ToolOption {
  id: string
  name: string
  slug: string
  logo_url: string | null
  category: string | null
  pricing: string | null
}

interface Props {
  tools: ToolOption[]
  selectedSlugs: string[]
  maxSelection: number
}

export function ToolSelector({ tools, selectedSlugs, maxSelection }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const selectedTools = useMemo(
    () => tools.filter(t => selectedSlugs.includes(t.slug)),
    [tools, selectedSlugs]
  )

  const availableTools = useMemo(
    () => tools.filter(t =>
      !selectedSlugs.includes(t.slug) &&
      t.name.toLowerCase().includes(search.toLowerCase())
    ),
    [tools, selectedSlugs, search]
  )

  const updateUrl = (newSlugs: string[]) => {
    const params = new URLSearchParams(searchParams.toString())
    if (newSlugs.length > 0) {
      params.set('tools', newSlugs.join(','))
    } else {
      params.delete('tools')
    }
    router.push(`/compare?${params.toString()}`)
  }

  const addTool = (slug: string) => {
    if (selectedSlugs.length < maxSelection) {
      updateUrl([...selectedSlugs, slug])
      setSearch('')
      setIsOpen(false)
    }
  }

  const removeTool = (slug: string) => {
    updateUrl(selectedSlugs.filter(s => s !== slug))
  }

  return (
    <div className="space-y-4">
      {/* Selected tools */}
      <div className="flex flex-wrap gap-3">
        {selectedTools.map(tool => (
          <div
            key={tool.id}
            className="flex items-center gap-2 bg-card border border-border/50 rounded-full pl-2 pr-1 py-1"
          >
            {tool.logo_url ? (
              <div className="relative w-6 h-6 rounded-full overflow-hidden bg-white/50">
                <Image
                  src={tool.logo_url}
                  alt={tool.name}
                  fill
                  className="object-contain p-0.5"
                />
              </div>
            ) : (
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-genesis-blue to-genesis-pink flex items-center justify-center">
                <span className="text-xs font-bold text-white">
                  {tool.name.charAt(0)}
                </span>
              </div>
            )}
            <span className="font-medium text-sm">{tool.name}</span>
            <button
              onClick={() => removeTool(tool.slug)}
              className="p-1 hover:bg-muted rounded-full transition-colors"
              aria-label={`Remove ${tool.name}`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}

        {/* Add tool button */}
        {selectedSlugs.length < maxSelection && (
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 bg-muted/50 hover:bg-muted border border-dashed border-border rounded-full px-4 py-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm font-medium">Add Tool</span>
            </button>

            {/* Dropdown */}
            {isOpen && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-card border border-border rounded-2xl shadow-xl z-50">
                {/* Search input */}
                <div className="p-3 border-b border-border">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search tools..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-muted/50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      autoFocus
                    />
                  </div>
                </div>

                {/* Tool list */}
                <div className="max-h-64 overflow-y-auto p-2">
                  {availableTools.length > 0 ? (
                    availableTools.map(tool => (
                      <button
                        key={tool.id}
                        onClick={() => addTool(tool.slug)}
                        className="w-full flex items-center gap-3 p-2 hover:bg-muted rounded-lg transition-colors text-left"
                      >
                        {tool.logo_url ? (
                          <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-white/50 shrink-0">
                            <Image
                              src={tool.logo_url}
                              alt={tool.name}
                              fill
                              className="object-contain p-1"
                            />
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-genesis-blue to-genesis-pink flex items-center justify-center shrink-0">
                            <span className="text-sm font-bold text-white">
                              {tool.name.charAt(0)}
                            </span>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{tool.name}</p>
                          <p className="text-xs text-muted-foreground truncate">
                            {tool.category || 'Uncategorized'}
                          </p>
                        </div>
                        {tool.pricing && (
                          <Badge variant="secondary" className="text-xs shrink-0">
                            {tool.pricing}
                          </Badge>
                        )}
                      </button>
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground text-sm py-4">
                      {search ? 'No tools found' : 'All tools selected'}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Helper text */}
      <p className="text-sm text-muted-foreground">
        {selectedSlugs.length === 0
          ? `Select ${maxSelection} tools to compare`
          : selectedSlugs.length < 2
          ? `Select ${2 - selectedSlugs.length} more tool${2 - selectedSlugs.length > 1 ? 's' : ''} to compare`
          : `${selectedSlugs.length} of ${maxSelection} tools selected`
        }
      </p>

      {/* Click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}
