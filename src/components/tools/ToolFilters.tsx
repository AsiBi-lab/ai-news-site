'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'

const pricingOptions = [
  { value: '', label: 'All' },
  { value: 'free', label: 'Free' },
  { value: 'freemium', label: 'Freemium' },
  { value: 'paid', label: 'Paid' },
  { value: 'enterprise', label: 'Enterprise' },
]

interface Props {
  currentPricing?: string
  categories?: string[]
  currentCategory?: string
}

export function ToolFilters({ currentPricing, categories = [], currentCategory }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handlePricingChange = (value: string) => {
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set('pricing', value)
    } else {
      params.delete('pricing')
    }
    router.push(`?${params.toString()}`)
  }

  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set('category', value)
    } else {
      params.delete('category')
    }
    router.push(`?${params.toString()}`)
  }

  const handleKeyDown = (e: React.KeyboardEvent, callback: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      callback()
    }
  }

  return (
    <div className="space-y-4">
      {/* Pricing Filter */}
      <fieldset>
        <legend className="text-sm font-medium mb-2">Pricing</legend>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by pricing">
          {pricingOptions.map((option) => {
            const isSelected = (currentPricing || '') === option.value
            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => handlePricingChange(option.value)}
                onKeyDown={(e) => handleKeyDown(e, () => handlePricingChange(option.value))}
                className={cn(
                  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                  isSelected
                    ? 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80'
                    : 'border-input bg-background hover:bg-accent hover:text-accent-foreground'
                )}
              >
                {option.label}
              </button>
            )
          })}
        </div>
      </fieldset>

      {/* Category Filter */}
      {categories.length > 0 && (
        <fieldset>
          <legend className="text-sm font-medium mb-2">Category</legend>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            <button
              type="button"
              role="radio"
              aria-checked={!currentCategory}
              onClick={() => handleCategoryChange('')}
              onKeyDown={(e) => handleKeyDown(e, () => handleCategoryChange(''))}
              className={cn(
                'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                !currentCategory
                  ? 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80'
                  : 'border-input bg-background hover:bg-accent hover:text-accent-foreground'
              )}
            >
              All
            </button>
            {categories.map((category) => {
              const isSelected = currentCategory === category
              return (
                <button
                  key={category}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => handleCategoryChange(category)}
                  onKeyDown={(e) => handleKeyDown(e, () => handleCategoryChange(category))}
                  className={cn(
                    'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                    isSelected
                      ? 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80'
                      : 'border-input bg-background hover:bg-accent hover:text-accent-foreground'
                  )}
                >
                  {category}
                </button>
              )
            })}
          </div>
        </fieldset>
      )}
    </div>
  )
}
