import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ArticleContent } from './ArticleContent'

describe('ArticleContent Component', () => {
  it('should render HTML content', () => {
    const content = '<p>Test paragraph</p>'
    render(<ArticleContent content={content} tools={[]} />)

    expect(screen.getByText(/Test paragraph/i)).toBeInTheDocument()
  })

  it('should sanitize malicious scripts (XSS protection)', () => {
    const maliciousContent = '<p>Hello</p><script>alert("XSS")</script><p>World</p>'
    const { container } = render(<ArticleContent content={maliciousContent} tools={[]} />)

    // Script tags should be removed by DOMPurify
    const scripts = container.querySelectorAll('script')
    expect(scripts).toHaveLength(0)

    // But text content should still be there
    expect(screen.getByText(/Hello/i)).toBeInTheDocument()
    expect(screen.getByText(/World/i)).toBeInTheDocument()
  })

  it('should sanitize onerror attributes (XSS protection)', () => {
    const maliciousContent = '<img src=x onerror="alert(\'XSS\')">'
    const { container } = render(<ArticleContent content={maliciousContent} tools={[]} />)

    // Find all img tags
    const images = container.querySelectorAll('img')
    images.forEach(img => {
      // onerror should be removed by DOMPurify
      expect(img.getAttribute('onerror')).toBeNull()
    })
  })

  it('should sanitize javascript: URLs (XSS protection)', () => {
    const maliciousContent = '<a href="javascript:alert(\'XSS\')">Click me</a>'
    const { container } = render(<ArticleContent content={maliciousContent} tools={[]} />)

    const links = container.querySelectorAll('a')
    links.forEach(link => {
      const href = link.getAttribute('href')
      // DOMPurify should remove javascript: URLs
      expect(href).not.toMatch(/javascript:/i)
    })
  })

  it('should render tool widgets when tool marker is present', () => {
    const content = '<p>Test</p><!-- tool:test-tool -->'
    const mockTools = [
      {
        tool: {
          id: 1,
          slug: 'test-tool',
          name: 'Test Tool',
          description: 'A test tool',
          website_url: 'https://example.com',
          logo_url: null,
          category: 'productivity',
          pricing_model: 'free',
          is_featured: false,
        },
        custom_summary: 'Test summary',
        tips: [],
        prompt_examples: [],
        recommended_uses: [],
      },
    ]

    render(<ArticleContent content={content} tools={mockTools as any} />)

    // Tool widget should be rendered with tool name
    expect(screen.getByText('Test Tool')).toBeInTheDocument()
  })

  it('should handle empty content gracefully', () => {
    const { container } = render(<ArticleContent content="" tools={[]} />)
    expect(container.querySelector('.article-content')).toBeInTheDocument()
  })

  it('should preserve safe HTML tags', () => {
    const content = '<p>Paragraph</p><h2>Heading</h2><strong>Bold</strong><em>Italic</em>'
    const { container } = render(<ArticleContent content={content} tools={[]} />)

    expect(container.querySelector('p')).toBeInTheDocument()
    expect(container.querySelector('h2')).toBeInTheDocument()
    expect(container.querySelector('strong')).toBeInTheDocument()
    expect(container.querySelector('em')).toBeInTheDocument()
  })

  it('should remove dangerous data attributes', () => {
    const maliciousContent = '<div data-custom="safe" onclick="alert()">Test</div>'
    const { container } = render(<ArticleContent content={maliciousContent} tools={[]} />)

    const div = container.querySelector('div')
    if (div) {
      // onclick should be removed
      expect(div.getAttribute('onclick')).toBeNull()
      // Our DOMPurify config disallows data- attributes
      expect(div.getAttribute('data-custom')).toBeNull()
    }
  })
})
