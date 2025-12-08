import type { ArticleToolWithDetails } from '@/types/database'

interface ParsedContent {
  segments: ContentSegment[]
}

export type ContentSegment =
  | { type: 'html'; content: string }
  | { type: 'tool'; toolSlug: string; displayType: 'featured' | 'mentioned' | 'tutorial' | 'compared' }

/**
 * Parse article HTML content and extract tool markers.
 * Tool markers format: <!-- tool:slug --> or <!-- tool:slug type:featured -->
 *
 * @param html - The raw HTML content from the article
 * @param tools - Array of linked tools with details
 * @returns Parsed content segments for rendering
 */
export function parseArticleContent(
  html: string,
  tools: ArticleToolWithDetails[]
): ParsedContent {
  // Pattern matches: <!-- tool:toolSlug --> or <!-- tool:toolSlug type:displayType -->
  const toolMarkerPattern = /<!--\s*tool:(\w+[-\w]*)\s*(?:type:(\w+))?\s*-->/g

  const segments: ContentSegment[] = []
  let lastIndex = 0
  let match

  while ((match = toolMarkerPattern.exec(html)) !== null) {
    // Add HTML content before the marker
    if (match.index > lastIndex) {
      const htmlContent = html.slice(lastIndex, match.index).trim()
      if (htmlContent) {
        segments.push({ type: 'html', content: htmlContent })
      }
    }

    // Add tool marker segment
    const toolSlug = match[1]
    const displayType = (match[2] as 'featured' | 'mentioned' | 'tutorial' | 'compared') || 'featured'

    // Only add if tool exists in linked tools
    const toolExists = tools.some(t => t.tool.slug === toolSlug)
    if (toolExists) {
      segments.push({ type: 'tool', toolSlug, displayType })
    }

    lastIndex = match.index + match[0].length
  }

  // Add remaining HTML content after last marker
  if (lastIndex < html.length) {
    const htmlContent = html.slice(lastIndex).trim()
    if (htmlContent) {
      segments.push({ type: 'html', content: htmlContent })
    }
  }

  // If no markers found, return entire content as single HTML segment
  if (segments.length === 0 && html.trim()) {
    segments.push({ type: 'html', content: html })
  }

  return { segments }
}

/**
 * Find a tool by slug from the linked tools array
 */
export function findToolBySlug(
  slug: string,
  tools: ArticleToolWithDetails[]
): ArticleToolWithDetails | undefined {
  return tools.find(t => t.tool.slug === slug)
}

/**
 * Extract headings from HTML for table of contents
 */
export function extractHeadings(html: string): { id: string; text: string; level: number }[] {
  const headingPattern = /<h([2-3])[^>]*(?:id="([^"]*)")?[^>]*>(.*?)<\/h[2-3]>/gi
  const headings: { id: string; text: string; level: number }[] = []
  let match

  while ((match = headingPattern.exec(html)) !== null) {
    const level = parseInt(match[1], 10)
    const id = match[2] || slugify(stripHtml(match[3]))
    const text = stripHtml(match[3])

    headings.push({ id, text, level })
  }

  return headings
}

/**
 * Strip HTML tags from a string
 */
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim()
}

/**
 * Convert text to URL-friendly slug
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim()
}
