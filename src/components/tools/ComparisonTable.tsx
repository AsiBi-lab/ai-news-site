'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Check, X, ExternalLink, Star } from 'lucide-react'
import type { AITool } from '@/types/database'

interface Props {
  tools: AITool[]
}

const pricingLabels: Record<string, string> = {
  free: 'Free',
  freemium: 'Freemium',
  paid: 'Paid',
  enterprise: 'Enterprise',
}

const pricingColors: Record<string, string> = {
  free: 'bg-emerald-500/20 text-emerald-600 dark:bg-emerald-500/30 dark:text-emerald-400',
  freemium: 'bg-blue-500/20 text-blue-600 dark:bg-blue-500/30 dark:text-blue-400',
  paid: 'bg-amber-500/20 text-amber-600 dark:bg-amber-500/30 dark:text-amber-400',
  enterprise: 'bg-purple-500/20 text-purple-600 dark:bg-purple-500/30 dark:text-purple-400',
}

export function ComparisonTable({ tools }: Props) {
  // Collect all unique features across tools
  const allFeatures = [...new Set(tools.flatMap(t => t.features || []))]

  return (
    <div className="mt-8 overflow-x-auto">
      <table className="w-full border-collapse">
        {/* Header with tool info */}
        <thead>
          <tr>
            <th className="p-4 text-left font-medium text-muted-foreground bg-muted/30 rounded-tl-2xl w-48">
              Tool
            </th>
            {tools.map((tool, index) => (
              <th
                key={tool.id}
                className={`p-4 bg-muted/30 min-w-[200px] ${
                  index === tools.length - 1 ? 'rounded-tr-2xl' : ''
                }`}
              >
                <div className="flex flex-col items-center gap-3">
                  {tool.logo_url ? (
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-white/50 dark:bg-white/10">
                      <Image
                        src={tool.logo_url}
                        alt={tool.name}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-genesis-blue to-genesis-pink flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">
                        {tool.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="font-semibold hover:text-primary transition-colors"
                  >
                    {tool.name}
                  </Link>
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-border/50">
          {/* Pricing row */}
          <tr className="bg-card/50">
            <td className="p-4 font-medium">Pricing</td>
            {tools.map(tool => (
              <td key={tool.id} className="p-4 text-center">
                {tool.pricing && (
                  <Badge className={pricingColors[tool.pricing] || ''}>
                    {pricingLabels[tool.pricing] || tool.pricing}
                  </Badge>
                )}
              </td>
            ))}
          </tr>

          {/* Rating row */}
          <tr>
            <td className="p-4 font-medium">Rating</td>
            {tools.map(tool => (
              <td key={tool.id} className="p-4 text-center">
                {tool.rating ? (
                  <div className="flex items-center justify-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-medium">{tool.rating.toFixed(1)}</span>
                  </div>
                ) : (
                  <span className="text-muted-foreground">—</span>
                )}
              </td>
            ))}
          </tr>

          {/* Category row */}
          <tr className="bg-card/50">
            <td className="p-4 font-medium">Category</td>
            {tools.map(tool => (
              <td key={tool.id} className="p-4 text-center">
                <span className="text-sm">{tool.category || '—'}</span>
              </td>
            ))}
          </tr>

          {/* Description row */}
          <tr>
            <td className="p-4 font-medium">Description</td>
            {tools.map(tool => (
              <td key={tool.id} className="p-4 text-center">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {tool.description || '—'}
                </p>
              </td>
            ))}
          </tr>

          {/* Features section header */}
          {allFeatures.length > 0 && (
            <tr className="bg-muted/50">
              <td colSpan={tools.length + 1} className="p-4 font-semibold text-lg">
                Features
              </td>
            </tr>
          )}

          {/* Feature rows */}
          {allFeatures.map((feature, index) => (
            <tr key={feature} className={index % 2 === 0 ? 'bg-card/50' : ''}>
              <td className="p-4 text-sm">{feature}</td>
              {tools.map(tool => (
                <td key={tool.id} className="p-4 text-center">
                  {tool.features?.includes(feature) ? (
                    <Check className="w-5 h-5 text-emerald-500 mx-auto" />
                  ) : (
                    <X className="w-5 h-5 text-muted-foreground/50 mx-auto" />
                  )}
                </td>
              ))}
            </tr>
          ))}

          {/* Pros section header */}
          <tr className="bg-muted/50">
            <td colSpan={tools.length + 1} className="p-4 font-semibold text-lg">
              Pros
            </td>
          </tr>

          {/* Pros row */}
          <tr className="bg-emerald-500/5">
            <td className="p-4"></td>
            {tools.map(tool => (
              <td key={tool.id} className="p-4">
                <ul className="space-y-2">
                  {tool.pros?.map((pro, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                      <span>{pro}</span>
                    </li>
                  ))}
                  {(!tool.pros || tool.pros.length === 0) && (
                    <li className="text-muted-foreground text-sm">No pros listed</li>
                  )}
                </ul>
              </td>
            ))}
          </tr>

          {/* Cons section header */}
          <tr className="bg-muted/50">
            <td colSpan={tools.length + 1} className="p-4 font-semibold text-lg">
              Cons
            </td>
          </tr>

          {/* Cons row */}
          <tr className="bg-red-500/5">
            <td className="p-4"></td>
            {tools.map(tool => (
              <td key={tool.id} className="p-4">
                <ul className="space-y-2">
                  {tool.cons?.map((con, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <X className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                      <span>{con}</span>
                    </li>
                  ))}
                  {(!tool.cons || tool.cons.length === 0) && (
                    <li className="text-muted-foreground text-sm">No cons listed</li>
                  )}
                </ul>
              </td>
            ))}
          </tr>

          {/* Website link row */}
          <tr className="bg-card/50">
            <td className="p-4 font-medium rounded-bl-2xl">Website</td>
            {tools.map((tool, index) => (
              <td
                key={tool.id}
                className={`p-4 text-center ${
                  index === tools.length - 1 ? 'rounded-br-2xl' : ''
                }`}
              >
                {tool.url ? (
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary hover:underline text-sm"
                  >
                    Visit <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-muted-foreground">—</span>
                )}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}
