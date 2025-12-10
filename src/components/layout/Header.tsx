import Link from 'next/link'
import { Navigation } from './Navigation'
import { MobileMenu } from './MobileMenu'
import { ThemeToggle } from '@/components/ThemeToggle'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 glass">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <span className="text-lg font-bold text-primary">AI</span>
          </div>
          <span className="text-xl font-bold font-display text-foreground group-hover:text-primary transition-colors">
            News
          </span>
        </Link>

        <Navigation className="hidden md:flex" />

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <MobileMenu className="md:hidden" />
        </div>
      </div>
    </header>
  )
}
