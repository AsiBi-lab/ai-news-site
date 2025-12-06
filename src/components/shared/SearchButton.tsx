'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { useEffect, useCallback } from 'react'

export function SearchButton() {
  const router = useRouter()

  const goToSearch = useCallback(() => {
    router.push('/search')
  }, [router])

  // Keyboard shortcut: Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        goToSearch()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [goToSearch])

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={goToSearch}
      className="relative"
      aria-label="Search"
    >
      <Search className="h-5 w-5" />
      <span className="sr-only">Search (⌘K)</span>
    </Button>
  )
}
