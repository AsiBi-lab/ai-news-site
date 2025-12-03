'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Badge } from '@/components/ui/badge'

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

  return (
    <div className="space-y-4">
      {/* Pricing Filter */}
      <div>
        <h4 className="text-sm font-medium mb-2">Pricing</h4>
        <div className="flex flex-wrap gap-2">
          {pricingOptions.map((option) => (
            <Badge
              key={option.value}
              variant={
                (currentPricing || '') === option.value ? 'default' : 'outline'
              }
              className="cursor-pointer hover:bg-primary/80 transition-colors"
              onClick={() => handlePricingChange(option.value)}
            >
              {option.label}
            </Badge>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      {categories.length > 0 && (
        <div>
          <h4 className="text-sm font-medium mb-2">Category</h4>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={!currentCategory ? 'default' : 'outline'}
              className="cursor-pointer hover:bg-primary/80 transition-colors"
              onClick={() => handleCategoryChange('')}
            >
              All
            </Badge>
            {categories.map((category) => (
              <Badge
                key={category}
                variant={currentCategory === category ? 'default' : 'outline'}
                className="cursor-pointer hover:bg-primary/80 transition-colors"
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
