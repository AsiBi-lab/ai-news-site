import { describe, it, expect } from 'vitest'
import { checkRateLimit, getIP } from './rate-limit'

describe('checkRateLimit', () => {
  it('should use fallback when Redis not configured', async () => {
    const result = await checkRateLimit('api', 'test-ip-' + Date.now())

    // Should return a result (not throw)
    expect(result).toBeDefined()
    expect(result.success).toBeDefined()
    expect(typeof result.success).toBe('boolean')
  })

  it('should return consistent structure', async () => {
    const result = await checkRateLimit('newsletter', '192.168.1.1-' + Date.now())

    expect(result).toHaveProperty('success')
    expect(result).toHaveProperty('remaining')
    expect(result).toHaveProperty('reset')
    expect(typeof result.success).toBe('boolean')
    expect(typeof result.remaining).toBe('number')
    expect(typeof result.reset).toBe('number')
  })

  it('should successfully allow requests under limit', async () => {
    const identifier = 'test-under-limit-' + Date.now()
    const result = await checkRateLimit('api', identifier)

    expect(result.success).toBe(true)
    expect(result.remaining).toBeGreaterThanOrEqual(0)
  })

  it('should block requests after exceeding limit', async () => {
    const identifier = 'test-exceed-limit-' + Date.now()

    // Make multiple requests to exceed limit (api limit is 100/min)
    // We'll test with newsletter limit (5/min) for faster test
    const results = []
    for (let i = 0; i < 7; i++) {
      results.push(await checkRateLimit('newsletter', identifier))
    }

    // First 5 should succeed, next should fail
    expect(results[0].success).toBe(true)
    expect(results[4].success).toBe(true)
    expect(results[5].success).toBe(false)
    expect(results[6].success).toBe(false)
  })
})

describe('getIP', () => {
  it('should extract IP from x-forwarded-for', () => {
    const mockRequest = {
      headers: {
        get: (key: string) => {
          if (key === 'x-forwarded-for') return '203.0.113.1, 198.51.100.1'
          return null
        },
      },
    } as any

    const ip = getIP(mockRequest)
    expect(ip).toBe('203.0.113.1')
  })

  it('should extract IP from x-real-ip', () => {
    const mockRequest = {
      headers: {
        get: (key: string) => {
          if (key === 'x-real-ip') return '203.0.113.5'
          return null
        },
      },
    } as any

    const ip = getIP(mockRequest)
    expect(ip).toBe('203.0.113.5')
  })

  it('should prefer x-forwarded-for over x-real-ip', () => {
    const mockRequest = {
      headers: {
        get: (key: string) => {
          if (key === 'x-forwarded-for') return '203.0.113.1'
          if (key === 'x-real-ip') return '203.0.113.5'
          return null
        },
      },
    } as any

    const ip = getIP(mockRequest)
    expect(ip).toBe('203.0.113.1')
  })

  it('should return "unknown" if no IP headers', () => {
    const mockRequest = {
      headers: {
        get: () => null,
      },
    } as any

    const ip = getIP(mockRequest)
    expect(ip).toBe('unknown')
  })

  it('should handle x-forwarded-for with single IP', () => {
    const mockRequest = {
      headers: {
        get: (key: string) => {
          if (key === 'x-forwarded-for') return '203.0.113.1'
          return null
        },
      },
    } as any

    const ip = getIP(mockRequest)
    expect(ip).toBe('203.0.113.1')
  })
})
