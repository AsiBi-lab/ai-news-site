'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import type { Category } from '@/types/database'

interface Props {
  categories: Category[]
  currentCategory?: string
}

export function CategoryFilter({ categories, currentCategory }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleClick = (slug?: string) => {
    const params = new URLSearchParams(searchParams)
    if (slug) {
      params.set('category', slug)
    } else {
      params.delete('category')
    }
    router.push(`?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Badge
        variant={!currentCategory ? 'default' : 'outline'}
        className="cursor-pointer hover:bg-primary/80 transition-colors"
        onClick={() => handleClick()}
      >
        All
      </Badge>
      {categories.map((cat) => (
        <Badge
          key={cat.id}
          variant={currentCategory === cat.slug ? 'default' : 'outline'}
          className="cursor-pointer hover:bg-primary/80 transition-colors"
          onClick={() => handleClick(cat.slug)}
        >
          {cat.name}
        </Badge>
      ))}
    </div>
  )
}
