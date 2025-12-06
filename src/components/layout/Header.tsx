import Link from 'next/link'
import { Navigation } from './Navigation'
import { MobileMenu } from './MobileMenu'
import { ThemeToggle } from '@/components/ThemeToggle'
import { SearchButton } from '@/components/shared'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary text-primary-foreground font-bold text-sm transition-transform group-hover:scale-105">
            AI
          </div>
          <span className="text-xl font-semibold tracking-tight">
            News
          </span>
        </Link>

        <Navigation className="hidden md:flex" />

        <div className="flex items-center gap-2">
          <SearchButton />
          <ThemeToggle />
          <MobileMenu className="md:hidden" />
        </div>
      </div>
    </header>
  )
}
