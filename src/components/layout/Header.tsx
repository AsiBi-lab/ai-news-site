'use client'

import Link from 'next/link'
import { Navigation } from './Navigation'
import { MobileMenu } from './MobileMenu'
import { ThemeToggle } from '@/components/ThemeToggle'
import { SearchButton } from '@/components/shared'
import { motion } from 'framer-motion'

export function Header() {
  return (
    <motion.header
      className="sticky top-0 z-50 w-full py-6 relative"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.8, 0.25, 1] }}
    >
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-white/30 dark:bg-slate-900/30 backdrop-blur-xl border-b border-white/20 dark:border-white/5" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group relative">
            <motion.span
              className="text-2xl font-bold tracking-genesis-tight text-genesis inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              AI DECK
            </motion.span>
            {/* Logo hover glow */}
            <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#6b8cce]/20 via-[#8b7cb8]/20 to-[#c88ba8]/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
          </Link>

          {/* Navigation */}
          <Navigation className="hidden md:flex" />

          {/* Actions */}
          <div className="flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <SearchButton />
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <ThemeToggle />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="hidden md:block"
            >
              <Link
                href="/tools"
                className="btn-genesis btn-glow btn-ripple px-5 py-2.5 rounded-full font-semibold text-sm inline-block relative overflow-hidden"
              >
                <span className="relative z-10">Explore Tools</span>
              </Link>
            </motion.div>
            <MobileMenu className="md:hidden" />
          </div>
        </div>
      </div>
    </motion.header>
  )
}
