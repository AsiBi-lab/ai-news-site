import { describe, it, expect } from 'vitest'
import { NextRequest } from 'next/server'
import { middleware } from './middleware'

describe('Security Middleware', () => {
  function createMockRequest(url: string = 'http://localhost:3000/'): NextRequest {
    return new NextRequest(new URL(url))
  }

  it('should generate unique nonce for each request', () => {
    const request1 = createMockRequest()
    const request2 = createMockRequest()

    const response1 = middleware(request1)
    const response2 = middleware(request2)

    const nonce1 = response1.headers.get('x-nonce')
    const nonce2 = response2.headers.get('x-nonce')

    expect(nonce1).toBeDefined()
    expect(nonce2).toBeDefined()
    expect(nonce1).not.toBe(nonce2)
  })

  it('should set CSP header with nonce', () => {
    const request = createMockRequest()
    const response = middleware(request)

    const csp = response.headers.get('content-security-policy')
    const nonce = response.headers.get('x-nonce')

    expect(csp).toBeDefined()
    expect(csp).toContain(`'nonce-${nonce}'`)
    expect(csp).not.toContain("'unsafe-eval'")
  })

  it('should NOT include unsafe-inline for scripts in CSP', () => {
    const request = createMockRequest()
    const response = middleware(request)

    const csp = response.headers.get('content-security-policy')

    // Extract script-src directive
    const scriptSrc = csp?.split(';').find(d => d.trim().startsWith('script-src'))

    expect(scriptSrc).toBeDefined()
    expect(scriptSrc).not.toContain("'unsafe-inline'")
    expect(scriptSrc).not.toContain("'unsafe-eval'")
  })

  it('should include style-src with nonce and unsafe-inline fallback', () => {
    const request = createMockRequest()
    const response = middleware(request)

    const csp = response.headers.get('content-security-policy')
    const nonce = response.headers.get('x-nonce')

    // Extract style-src directive
    const styleSrc = csp?.split(';').find(d => d.trim().startsWith('style-src'))

    expect(styleSrc).toBeDefined()
    expect(styleSrc).toContain(`'nonce-${nonce}'`)
    // unsafe-inline as fallback for browsers that don't support nonces
    expect(styleSrc).toContain("'unsafe-inline'")
  })

  it('should set all required security headers', () => {
    const request = createMockRequest()
    const response = middleware(request)

    expect(response.headers.get('x-content-type-options')).toBe('nosniff')
    expect(response.headers.get('x-frame-options')).toBe('DENY')
    expect(response.headers.get('x-xss-protection')).toBe('1; mode=block')
    expect(response.headers.get('referrer-policy')).toBe('strict-origin-when-cross-origin')
    expect(response.headers.get('strict-transport-security')).toBe(
      'max-age=31536000; includeSubDomains; preload'
    )
    expect(response.headers.get('permissions-policy')).toBe(
      'camera=(), microphone=(), geolocation=(), interest-cohort=()'
    )
  })

  it('should include Vercel Analytics in script-src', () => {
    const request = createMockRequest()
    const response = middleware(request)

    const csp = response.headers.get('content-security-policy')
    const scriptSrc = csp?.split(';').find(d => d.trim().startsWith('script-src'))

    expect(scriptSrc).toContain('https://va.vercel-scripts.com')
  })

  it('should allow Supabase domains in connect-src', () => {
    const request = createMockRequest()
    const response = middleware(request)

    const csp = response.headers.get('content-security-policy')
    const connectSrc = csp?.split(';').find(d => d.trim().startsWith('connect-src'))

    expect(connectSrc).toContain('https://*.supabase.co')
    expect(connectSrc).toContain('wss://*.supabase.co')
  })

  it('should allow images from Supabase and Unsplash', () => {
    const request = createMockRequest()
    const response = middleware(request)

    const csp = response.headers.get('content-security-policy')
    const imgSrc = csp?.split(';').find(d => d.trim().startsWith('img-src'))

    expect(imgSrc).toContain('https://*.supabase.co')
    expect(imgSrc).toContain('https://images.unsplash.com')
    expect(imgSrc).toContain('data:')
    expect(imgSrc).toContain('blob:')
  })

  it('should set frame-ancestors to none', () => {
    const request = createMockRequest()
    const response = middleware(request)

    const csp = response.headers.get('content-security-policy')

    expect(csp).toContain("frame-ancestors 'none'")
  })

  it('should set base-uri and form-action to self', () => {
    const request = createMockRequest()
    const response = middleware(request)

    const csp = response.headers.get('content-security-policy')

    expect(csp).toContain("base-uri 'self'")
    expect(csp).toContain("form-action 'self'")
  })
})
