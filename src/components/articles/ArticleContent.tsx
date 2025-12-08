'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import DOMPurify from 'dompurify'
import { parseArticleContent, findToolBySlug, ContentSegment } from '@/lib/content/parseArticleContent'
import { ToolWidget } from '@/components/tools/ToolWidget'
import { ToolAccordion } from '@/components/tools/ToolAccordion'
import type { ArticleToolWithDetails } from '@/types/database'

// DOMPurify configuration for XSS protection
const DOMPURIFY_CONFIG = {
  ALLOWED_TAGS: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'em', 'u', 'a', 'img', 'ul', 'ol', 'li', 'blockquote', 'code', 'pre', 'br', 'hr'],
  ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'id'],
  ALLOW_DATA_ATTR: false,
}

/**
 * Separate component for HTML segments to properly use hooks
 * This fixes the React hooks violation (useMemo inside map)
 */
interface HtmlSegmentProps {
  content: string
  index: number
}

function HtmlSegment({ content, index }: HtmlSegmentProps) {
  // Now useMemo is called at the top level of this component - valid!
  const sanitizedContent = useMemo(
    () => DOMPurify.sanitize(content, DOMPURIFY_CONFIG),
    [content]
  )

  return (
    <motion.div
      key={`html-${index}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-p:leading-relaxed prose-li:leading-relaxed prose-blockquote:border-l-primary prose-blockquote:bg-muted/50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg"
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  )
}

/**
 * Separate component for tool segments
 */
interface ToolSegmentProps {
  segment: Extract<ContentSegment, { type: 'tool' }>
  tools: ArticleToolWithDetails[]
  index: number
}

function ToolSegment({ segment, tools, index }: ToolSegmentProps) {
  const toolData = findToolBySlug(segment.toolSlug, tools)
  if (!toolData) return null

  return (
    <motion.div
      key={`tool-${segment.toolSlug}-${index}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="not-prose"
    >
      <ToolWidget
        tool={toolData.tool}
        customSummary={toolData.custom_summary}
      />

      {(toolData.tips?.length > 0 ||
        toolData.prompt_examples?.length > 0 ||
        toolData.recommended_uses?.length > 0 ||
        toolData.tool.pros?.length > 0 ||
        toolData.tool.cons?.length > 0) && (
        <ToolAccordion
          tool={toolData.tool}
          articleToolData={toolData}
          defaultOpen={segment.displayType === 'featured' ? ['tips'] : []}
        />
      )}
    </motion.div>
  )
}

interface ArticleContentProps {
  content: string
  tools: ArticleToolWithDetails[]
  className?: string
}

export function ArticleContent({ content, tools, className = '' }: ArticleContentProps) {
  const parsedContent = useMemo(
    () => parseArticleContent(content, tools),
    [content, tools]
  )

  return (
    <div className={`article-content ${className}`}>
      {parsedContent.segments.map((segment, index) => {
        if (segment.type === 'html') {
          return (
            <HtmlSegment
              key={`html-${index}`}
              content={segment.content}
              index={index}
            />
          )
        }

        if (segment.type === 'tool') {
          return (
            <ToolSegment
              key={`tool-${segment.toolSlug}-${index}`}
              segment={segment}
              tools={tools}
              index={index}
            />
          )
        }

        return null
      })}
    </div>
  )
}
