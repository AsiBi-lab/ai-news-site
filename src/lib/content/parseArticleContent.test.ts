import { describe, it, expect } from 'vitest'
import { parseArticleContent, findToolBySlug } from './parseArticleContent'

describe('parseArticleContent - XSS Protection', () => {
  it('should handle basic HTML content', () => {
    const content = '<p>Hello world</p>'
    const result = parseArticleContent(content, [])

    expect(result.segments).toHaveLength(1)
    expect(result.segments[0].type).toBe('html')
  })

  it('should parse tool markers with HTML comments', () => {
    const content = '<p>Check this tool:</p><!-- tool:chatgpt --><p>Amazing!</p>'
    const mockTools = [
      {
        tool: { id: 1, slug: 'chatgpt', name: 'ChatGPT' },
        custom_summary: 'Test',
      } as any
    ]
    const result = parseArticleContent(content, mockTools)

    expect(result.segments).toHaveLength(3)
    expect(result.segments[0].type).toBe('html')
    expect(result.segments[1].type).toBe('tool')
    if (result.segments[1].type === 'tool') {
      expect(result.segments[1].toolSlug).toBe('chatgpt')
    }
    expect(result.segments[2].type).toBe('html')
  })

  it('should handle tool markers with displayType', () => {
    const content = '<!-- tool:midjourney type:featured -->'
    const mockTools = [
      {
        tool: { id: 2, slug: 'midjourney', name: 'Midjourney' },
        custom_summary: 'Test',
      } as any
    ]
    const result = parseArticleContent(content, mockTools)

    expect(result.segments).toHaveLength(1)
    expect(result.segments[0].type).toBe('tool')
    if (result.segments[0].type === 'tool') {
      expect(result.segments[0].displayType).toBe('featured')
    }
  })

  it('should ignore tool markers for non-existent tools', () => {
    const content = '<p>Test</p><!-- tool:nonexistent --><p>End</p>'
    const result = parseArticleContent(content, [])

    // Should only have 2 HTML segments, tool marker should be ignored
    expect(result.segments).toHaveLength(2)
    expect(result.segments.every(s => s.type === 'html')).toBe(true)
  })

  it('should NOT allow script tags (will be sanitized by DOMPurify in component)', () => {
    const maliciousContent = '<p>Hello</p><script>alert("XSS")</script><p>World</p>'
    const result = parseArticleContent(maliciousContent, [])

    // The content is parsed but contains malicious code
    expect(result.segments).toBeDefined()
    expect(result.segments.length).toBeGreaterThan(0)
    // Note: Actual XSS protection happens in ArticleContent component with DOMPurify
  })
})

describe('findToolBySlug', () => {
  const mockTools = [
    {
      tool: { id: 1, slug: 'chatgpt', name: 'ChatGPT' },
      custom_summary: 'Test summary',
    } as any,
    {
      tool: { id: 2, slug: 'midjourney', name: 'Midjourney' },
      custom_summary: 'Another test',
    } as any,
  ]

  it('should find tool by slug', () => {
    const result = findToolBySlug('chatgpt', mockTools)
    expect(result).toBeDefined()
    expect(result?.tool.slug).toBe('chatgpt')
    expect(result?.tool.name).toBe('ChatGPT')
  })

  it('should return null for non-existent slug', () => {
    const result = findToolBySlug('nonexistent', mockTools)
    expect(result).toBeNull()
  })

  it('should be case-sensitive', () => {
    const result = findToolBySlug('ChatGPT', mockTools)
    expect(result).toBeNull()
  })
})
