'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { ArticleCard } from '@/components/articles/ArticleCard'
import { ArticleCardSkeleton } from '@/components/articles/ArticleCardSkeleton'
import { Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SearchResult {
  id: string
  title: string
  slug: string
  excerpt: string | null
  featured_image: string | null
  published_at: string | null
  category: { name: string; slug: string } | null
}

export function SearchContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialQuery = searchParams.get('q') || ''

  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const performSearch = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setResults([])
      setHasSearched(false)
      return
    }

    setIsLoading(true)
    setHasSearched(true)

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}&limit=20`)
      const data = await response.json()

      if (response.ok) {
        setResults(data.results || [])
      } else {
        setResults([])
      }
    } catch {
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Search on initial load if query exists
  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery)
    }
  }, [initialQuery, performSearch])

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query !== initialQuery) {
        router.push(`/search?q=${encodeURIComponent(query)}`, { scroll: false })
        performSearch(query)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [query, initialQuery, router, performSearch])

  const clearSearch = () => {
    setQuery('')
    setResults([])
    setHasSearched(false)
    router.push('/search', { scroll: false })
  }

  return (
    <div className="container py-8">
      <div className="max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl font-bold text-center mb-8">Search Articles</h1>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for AI news, tutorials, and more..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-14 pl-12 pr-12 text-lg"
            autoFocus
          />
          {query && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={clearSearch}
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>

        {query.length > 0 && query.length < 2 && (
          <p className="text-sm text-muted-foreground mt-2 text-center">
            Enter at least 2 characters to search
          </p>
        )}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <ArticleCardSkeleton key={i} />
          ))}
        </div>
      ) : hasSearched ? (
        results.length > 0 ? (
          <>
            <p className="text-muted-foreground mb-6">
              Found {results.length} result{results.length !== 1 ? 's' : ''} for &quot;{initialQuery}&quot;
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <Search className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
            <h2 className="text-xl font-semibold mb-2">No results found</h2>
            <p className="text-muted-foreground">
              Try different keywords or check your spelling
            </p>
          </div>
        )
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          <Search className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
          <p>Start typing to search articles</p>
        </div>
      )}
    </div>
  )
}
