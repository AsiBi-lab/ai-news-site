'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

const navItems = [
  { href: '/tools', label: 'Tools' },
  { href: '/compare', label: 'Compare' },
  { href: '/articles', label: 'Articles' },
  { href: '/about', label: 'About' },
]

interface NavigationProps {
  className?: string
}

export function Navigation({ className }: NavigationProps) {
  const pathname = usePathname()

  return (
    <nav aria-label="Main navigation" className={cn('flex items-center gap-8', className)}>
      {navItems.map((item, index) => (
        <motion.div
          key={item.href}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
        >
          <Link
            href={item.href}
            aria-current={pathname === item.href ? 'page' : undefined}
            className={cn(
              'relative font-medium transition-all duration-300 py-2 group',
              pathname === item.href
                ? 'text-genesis'
                : 'text-genesis-muted hover:text-genesis'
            )}
          >
            {item.label}
            {/* Animated underline */}
            <span
              className={cn(
                'absolute bottom-0 left-0 h-0.5 rounded-full transition-all duration-400 ease-out',
                'bg-gradient-to-r from-[#6b8cce] via-[#8b7cb8] to-[#c88ba8]',
                pathname === item.href
                  ? 'w-full'
                  : 'w-0 group-hover:w-full'
              )}
            />
            {/* Hover glow effect */}
            <span
              className={cn(
                'absolute inset-0 -z-10 rounded-lg opacity-0 transition-opacity duration-300',
                'bg-gradient-to-r from-[#6b8cce]/10 via-[#8b7cb8]/10 to-[#c88ba8]/10',
                'group-hover:opacity-100'
              )}
            />
          </Link>
        </motion.div>
      ))}
    </nav>
  )
}
