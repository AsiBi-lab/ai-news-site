'use client'

import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import Link from 'next/link'
import type { AITool } from '@/types/database'
import { motion } from 'framer-motion'
import { EASE_SMOOTH } from '@/lib/animations/variants'
import { ExternalLink } from 'lucide-react'

interface ToolWidgetProps {
  tool: AITool
  customSummary?: string | null
  showRating?: boolean
  className?: string
}

const pricingColors: Record<string, string> = {
  free: 'bg-emerald-500/20 text-emerald-600 dark:bg-emerald-500/30 dark:text-emerald-400',
  freemium: 'bg-sky-500/20 text-sky-600 dark:bg-sky-500/30 dark:text-sky-400',
  paid: 'bg-amber-500/20 text-amber-600 dark:bg-amber-500/30 dark:text-amber-400',
  enterprise: 'bg-violet-500/20 text-violet-600 dark:bg-violet-500/30 dark:text-violet-400',
}

export function ToolWidget({
  tool,
  customSummary,
  showRating = true,
  className = ''
}: ToolWidgetProps) {
  const description = customSummary || tool.description

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE_SMOOTH }}
      className={`my-8 ${className}`}
    >
      <div className="card-genesis rounded-2xl overflow-hidden p-5">
        {/* Header */}
        <div className="flex items-start gap-4">
          {/* Logo */}
          <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-white/50 dark:bg-white/10 flex items-center justify-center flex-shrink-0">
            {tool.logo_url ? (
              <Image
                src={tool.logo_url}
                alt={tool.name}
                fill
                className="object-cover"
              />
            ) : (
              <span className="text-2xl font-bold text-genesis-muted">
                {tool.name.charAt(0)}
              </span>
            )}
          </div>

          {/* Title & Badges */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-semibold text-genesis text-lg">
                {tool.name}
              </h4>
              {tool.pricing && (
                <Badge
                  variant="secondary"
                  className={`${pricingColors[tool.pricing] || ''} text-xs font-medium`}
                >
                  {tool.pricing}
                </Badge>
              )}
            </div>

            {/* Rating */}
            {showRating && tool.rating && (
              <div className="flex items-center gap-1.5 mt-1">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                      className={`text-sm ${
                        i < Math.floor(tool.rating!)
                          ? 'text-amber-400'
                          : 'text-genesis-muted/30'
                      }`}
                    >
                      ★
                    </motion.span>
                  ))}
                </div>
                <span className="text-xs text-genesis-muted font-medium">
                  {tool.rating.toFixed(1)}
                </span>
              </div>
            )}
          </div>

          {/* External Link */}
          <Link
            href={`/tools/${tool.slug}`}
            className="flex-shrink-0 p-2 rounded-lg bg-white/30 dark:bg-white/5 hover:bg-white/50 dark:hover:bg-white/10 transition-colors"
            aria-label={`View ${tool.name} details`}
          >
            <ExternalLink className="w-4 h-4 text-genesis-muted" />
          </Link>
        </div>

        {/* Description */}
        {description && (
          <p className="mt-3 text-sm text-genesis-muted leading-relaxed line-clamp-3">
            {description}
          </p>
        )}

        {/* View Details Link */}
        <div className="mt-4 pt-3 border-t border-white/20 dark:border-white/10">
          <Link
            href={`/tools/${tool.slug}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-genesis hover:text-genesis/80 transition-colors group"
          >
            View full details
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
