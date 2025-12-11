'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { EASE_SMOOTH } from '@/lib/animations/variants'

interface ArticleCardProps {
  slug: string
  title: string
  excerpt: string | null
  featured_image: string | null
  published_at: string | null
  category: { name: string } | null
}

interface Props {
  article: ArticleCardProps
  index?: number
}

export const ArticleCard = React.memo(function ArticleCard({ article, index = 0 }: Props) {
  const formattedDate = article.published_at
    ? new Date(article.published_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.1,
        duration: 0.5,
        ease: EASE_SMOOTH
      }}
    >
      <Link href={`/articles/${article.slug}`} className="group block h-full">
        <div className="h-full card-genesis rounded-3xl overflow-hidden">
          {article.featured_image && (
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={article.featured_image}
                alt={article.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-90"
              />
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-4 left-4">
                {article.category && (
                  <motion.span
                    className="px-4 py-1.5 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-slate-600 inline-block"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    {article.category.name}
                  </motion.span>
                )}
              </div>
            </div>
          )}

          <div className="p-6">
            <div className="flex items-center gap-3 mb-3">
              {!article.featured_image && article.category && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold badge-research">
                  {article.category.name}
                </span>
              )}
              {formattedDate && (
                <time className="text-xs text-genesis-muted">
                  {formattedDate}
                </time>
              )}
            </div>

            <h3 className="font-semibold text-genesis leading-snug line-clamp-2 mb-3 group-hover:text-gradient-animate transition-all duration-300">
              {article.title}
            </h3>

            {article.excerpt && (
              <p className="text-sm text-genesis-muted line-clamp-2 leading-relaxed font-light">
                {article.excerpt}
              </p>
            )}

            {/* Read more indicator */}
            <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              <span className="text-sm font-medium text-genesis-muted">Read article</span>
              <svg
                className="w-4 h-4 text-genesis-muted transition-transform duration-300 group-hover:translate-x-1"
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
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
})
