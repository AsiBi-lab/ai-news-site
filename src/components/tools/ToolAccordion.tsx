'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EASE_SMOOTH } from '@/lib/animations/variants'
import {
  Lightbulb,
  MessageSquare,
  Sparkles,
  ThumbsUp,
  ThumbsDown,
  ChevronDown,
  Copy,
  Check
} from 'lucide-react'
import type { AITool, ArticleTool } from '@/types/database'
import { cn } from '@/lib/utils'

interface ToolAccordionProps {
  tool: AITool
  articleToolData: ArticleTool
  defaultOpen?: ('tips' | 'prompts' | 'uses' | 'pros_cons')[]
  className?: string
}

type SectionType = 'tips' | 'prompts' | 'uses' | 'pros_cons'

interface SectionConfig {
  id: SectionType
  label: string
  icon: React.ReactNode
  gradient: string
}

const sections: SectionConfig[] = [
  {
    id: 'tips',
    label: 'Tips & Best Practices',
    icon: <Lightbulb className="w-4 h-4" />,
    gradient: 'from-amber-500/20 to-orange-500/20'
  },
  {
    id: 'prompts',
    label: 'Example Prompts',
    icon: <MessageSquare className="w-4 h-4" />,
    gradient: 'from-blue-500/20 to-cyan-500/20'
  },
  {
    id: 'uses',
    label: 'Recommended Uses',
    icon: <Sparkles className="w-4 h-4" />,
    gradient: 'from-purple-500/20 to-pink-500/20'
  },
  {
    id: 'pros_cons',
    label: 'Pros & Cons',
    icon: <ThumbsUp className="w-4 h-4" />,
    gradient: 'from-emerald-500/20 to-teal-500/20'
  },
]

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="p-1.5 rounded-md hover:bg-white/20 dark:hover:bg-white/10 transition-colors"
      aria-label={copied ? 'Copied!' : 'Copy to clipboard'}
    >
      {copied ? (
        <Check className="w-3.5 h-3.5 text-emerald-500" />
      ) : (
        <Copy className="w-3.5 h-3.5 text-genesis-muted" />
      )}
    </button>
  )
}

export function ToolAccordion({
  tool,
  articleToolData,
  defaultOpen = [],
  className = ''
}: ToolAccordionProps) {
  const [openSections, setOpenSections] = useState<Set<SectionType>>(
    new Set(defaultOpen)
  )

  const toggleSection = (section: SectionType) => {
    setOpenSections(prev => {
      const next = new Set(prev)
      if (next.has(section)) {
        next.delete(section)
      } else {
        next.add(section)
      }
      return next
    })
  }

  const getSectionContent = (section: SectionType) => {
    switch (section) {
      case 'tips':
        return articleToolData.tips
      case 'prompts':
        return articleToolData.prompt_examples
      case 'uses':
        return articleToolData.recommended_uses
      case 'pros_cons':
        return { pros: tool.pros, cons: tool.cons }
      default:
        return []
    }
  }

  const hasContent = (section: SectionType) => {
    const content = getSectionContent(section)
    if (section === 'pros_cons') {
      const { pros, cons } = content as { pros: string[], cons: string[] }
      return (pros && pros.length > 0) || (cons && cons.length > 0)
    }
    return Array.isArray(content) && content.length > 0
  }

  const visibleSections = sections.filter(s => hasContent(s.id))

  if (visibleSections.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className={`my-6 space-y-2 ${className}`}
    >
      {visibleSections.map((section, index) => (
        <motion.div
          key={section.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="overflow-hidden rounded-xl border border-white/20 dark:border-white/10 bg-white/30 dark:bg-white/5 backdrop-blur-sm"
        >
          {/* Section Header */}
          <button
            onClick={() => toggleSection(section.id)}
            className={cn(
              'w-full flex items-center justify-between p-4 text-left transition-colors',
              'hover:bg-white/20 dark:hover:bg-white/5',
              openSections.has(section.id) && `bg-gradient-to-r ${section.gradient}`
            )}
            aria-expanded={openSections.has(section.id)}
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                'p-2 rounded-lg transition-colors',
                openSections.has(section.id)
                  ? 'bg-white/40 dark:bg-white/20'
                  : 'bg-white/20 dark:bg-white/10'
              )}>
                {section.icon}
              </div>
              <span className="font-medium text-genesis">{section.label}</span>
            </div>
            <motion.div
              animate={{ rotate: openSections.has(section.id) ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-5 h-5 text-genesis-muted" />
            </motion.div>
          </button>

          {/* Section Content */}
          <AnimatePresence>
            {openSections.has(section.id) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: EASE_SMOOTH }}
              >
                <div className="px-4 pb-4">
                  {section.id === 'pros_cons' ? (
                    <ProsCons pros={tool.pros} cons={tool.cons} />
                  ) : section.id === 'prompts' ? (
                    <PromptsList prompts={getSectionContent(section.id) as string[]} />
                  ) : (
                    <ItemsList items={getSectionContent(section.id) as string[]} />
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </motion.div>
  )
}

function ItemsList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <motion.li
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          className="flex items-start gap-2 text-sm text-genesis-muted"
        >
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#6b8cce] to-[#c88ba8] flex-shrink-0" />
          {item}
        </motion.li>
      ))}
    </ul>
  )
}

function PromptsList({ prompts }: { prompts: string[] }) {
  return (
    <div className="space-y-3">
      {prompts.map((prompt, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="flex items-start gap-2 p-3 rounded-lg bg-white/30 dark:bg-white/5 border border-white/20 dark:border-white/10"
        >
          <code className="flex-1 text-sm text-genesis font-mono whitespace-pre-wrap">
            {prompt}
          </code>
          <CopyButton text={prompt} />
        </motion.div>
      ))}
    </div>
  )
}

function ProsCons({ pros, cons }: { pros: string[], cons: string[] }) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {/* Pros */}
      {pros && pros.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium text-sm">
            <ThumbsUp className="w-4 h-4" />
            Pros
          </div>
          <ul className="space-y-1.5">
            {pros.map((pro, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className="flex items-start gap-2 text-sm text-genesis-muted"
              >
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                {pro}
              </motion.li>
            ))}
          </ul>
        </div>
      )}

      {/* Cons */}
      {cons && cons.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-medium text-sm">
            <ThumbsDown className="w-4 h-4" />
            Cons
          </div>
          <ul className="space-y-1.5">
            {cons.map((con, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className="flex items-start gap-2 text-sm text-genesis-muted"
              >
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-500 flex-shrink-0" />
                {con}
              </motion.li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
