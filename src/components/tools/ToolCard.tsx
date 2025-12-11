'use client'

import React from 'react'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import Link from 'next/link'
import { Scale } from 'lucide-react'
import type { AITool } from '@/types/database'
import { motion } from 'framer-motion'
import { useAnimationContext, useReducedAnimations } from '@/lib/animations/useAnimationContext'
import {
  getStaggerDelay,
  getMobileStaggerDelay,
} from '@/lib/animations/variants'

interface Props {
  tool: AITool
  index?: number
  showCompare?: boolean
}

const pricingColors: Record<string, string> = {
  free: 'bg-emerald-500/20 text-emerald-600 dark:bg-emerald-500/30 dark:text-emerald-400',
  freemium: 'bg-sky-500/20 text-sky-600 dark:bg-sky-500/30 dark:text-sky-400',
  paid: 'bg-amber-500/20 text-amber-600 dark:bg-amber-500/30 dark:text-amber-400',
  enterprise: 'bg-violet-500/20 text-violet-600 dark:bg-violet-500/30 dark:text-violet-400',
}

// Static star rating component - no animation overhead
const StarRating = React.memo(function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={`text-sm ${
              i < Math.floor(rating)
                ? 'text-amber-400'
                : 'text-genesis-muted/30'
            }`}
          >
            ★
          </span>
        ))}
      </div>
      <span className="text-xs text-genesis-muted font-medium">
        {rating.toFixed(1)}
      </span>
    </div>
  )
})

export const ToolCard = React.memo(function ToolCard({ tool, index = 0, showCompare = true }: Props) {
  const animContext = useAnimationContext()
  const reducedAnimations = useReducedAnimations()

  // Get appropriate animation based on context
  const getTransition = () => {
    if (animContext === 'reduced') {
      return { duration: 0 }
    }
    if (animContext === 'mobile') {
      return getMobileStaggerDelay(index)
    }
    return getStaggerDelay(index)
  }

  // Skip y-transform on mobile/reduced for performance
  const getInitial = () => {
    if (reducedAnimations) {
      return { opacity: 0 }
    }
    return { opacity: 0, y: 20 }
  }

  const getAnimate = () => {
    if (reducedAnimations) {
      return { opacity: 1 }
    }
    return { opacity: 1, y: 0 }
  }

  return (
    <motion.div
      initial={getInitial()}
      animate={getAnimate()}
      transition={getTransition()}
      className="relative group"
    >
      {/* Compare Button - positioned absolutely */}
      {showCompare && (
        <Link
          href={`/compare?tools=${tool.slug}`}
          className="absolute top-3 right-3 z-10 p-2 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-border/50 opacity-0 group-hover:opacity-100 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 shadow-sm"
          title="Add to Compare"
          onClick={(e) => e.stopPropagation()}
        >
          <Scale className="w-4 h-4" />
        </Link>
      )}

      <Link href={`/tools/${tool.slug}`} className="block h-full">
        <div className="h-full card-genesis rounded-3xl overflow-hidden p-6 flex flex-col">
          {/* Header */}
          <div className="flex items-start gap-4 mb-4">
            {/* Logo */}
            <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-white/50 dark:bg-white/10 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
              {tool.logo_url ? (
                <Image
                  src={tool.logo_url}
                  alt={tool.name}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              ) : (
                <span className="text-2xl font-bold text-genesis-muted">
                  {tool.name.charAt(0)}
                </span>
              )}
            </div>

            {/* Title & Pricing */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-genesis truncate text-lg group-hover:text-gradient-animate transition-all duration-300">
                {tool.name}
              </h3>
              {tool.pricing && (
                <Badge
                  variant="secondary"
                  className={`${pricingColors[tool.pricing] || ''} mt-1 text-xs font-medium`}
                >
                  {tool.pricing}
                </Badge>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-genesis-muted line-clamp-2 leading-relaxed flex-1 font-light">
            {tool.description}
          </p>

          {/* Footer */}
          <div className="mt-4 pt-4 border-t border-white/20 dark:border-white/10 flex items-center justify-between">
            {/* Rating - Static component, no per-star animation */}
            {tool.rating && <StarRating rating={tool.rating} />}

            {/* Category */}
            {tool.category && (
              <Badge variant="outline" className="text-xs bg-white/30 dark:bg-white/5 border-white/30 dark:border-white/10">
                {tool.category}
              </Badge>
            )}
          </div>

          {/* View Details Arrow - Only show on desktop */}
          <div className="mt-4 flex items-center justify-end opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 hidden md:flex">
            <span className="text-sm text-genesis-muted font-medium flex items-center gap-2">
              View Details
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
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
})
