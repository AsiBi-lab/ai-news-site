import { describe, it, expect } from 'vitest'
import { validateOrigin, csrfGuard } from './csrf-protection'

describe('CSRF Protection', () => {
  describe('validateOrigin', () => {
    it('should allow valid localhost origins', () => {
      const mockRequest = {
        headers: {
          get: (key: string) => {
            if (key === 'origin') return 'http://localhost:3000'
            return null
          },
        },
      } as any

      expect(validateOrigin(mockRequest)).toBe(true)
    })

    it('should allow requests from configured NEXT_PUBLIC_SITE_URL', () => {
      // Save original env
      const originalEnv = process.env.NEXT_PUBLIC_SITE_URL
      process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com'

      const mockRequest = {
        headers: {
          get: (key: string) => {
            if (key === 'origin') return 'https://example.com'
            return null
          },
        },
      } as any

      expect(validateOrigin(mockRequest)).toBe(true)

      // Restore env
      process.env.NEXT_PUBLIC_SITE_URL = originalEnv
    })

    it('should block invalid origins', () => {
      const mockRequest = {
        headers: {
          get: (key: string) => {
            if (key === 'origin') return 'https://evil.com'
            return null
          },
        },
      } as any

      expect(validateOrigin(mockRequest)).toBe(false)
    })

    it('should allow requests without Origin header (same-origin)', () => {
      const mockRequest = {
        headers: {
          get: () => null,
        },
      } as any

      expect(validateOrigin(mockRequest)).toBe(true)
    })

    it('should block subdomain attacks', () => {
      const mockRequest = {
        headers: {
          get: (key: string) => {
            if (key === 'origin') return 'http://evil.localhost:3000'
            return null
          },
        },
      } as any

      expect(validateOrigin(mockRequest)).toBe(false)
    })

    it('should block origin suffix attacks (e.g., localhost:3000.evil.com)', () => {
      // This is a critical security test - startsWith would pass this, includes won't
      const mockRequest = {
        headers: {
          get: (key: string) => {
            if (key === 'origin') return 'http://localhost:3000.evil.com'
            return null
          },
        },
      } as any

      expect(validateOrigin(mockRequest)).toBe(false)
    })

    it('should block origin with additional path', () => {
      const mockRequest = {
        headers: {
          get: (key: string) => {
            if (key === 'origin') return 'http://localhost:3000/malicious'
            return null
          },
        },
      } as any

      expect(validateOrigin(mockRequest)).toBe(false)
    })
  })

  describe('csrfGuard', () => {
    it('should return null for valid POST requests', () => {
      const mockRequest = {
        method: 'POST',
        headers: {
          get: (key: string) => {
            if (key === 'origin') return 'http://localhost:3000'
            return null
          },
        },
      } as any

      const result = csrfGuard(mockRequest)
      expect(result).toBeNull()
    })

    it('should return 403 error for invalid POST requests', () => {
      const mockRequest = {
        method: 'POST',
        headers: {
          get: (key: string) => {
            if (key === 'origin') return 'https://evil.com'
            return null
          },
        },
      } as any

      const result = csrfGuard(mockRequest)
      expect(result).not.toBeNull()

      // Check if it's a Response object
      if (result) {
        expect(result.status).toBe(403)
      }
    })

    it('should allow GET requests regardless of origin', () => {
      const mockRequest = {
        method: 'GET',
        headers: {
          get: (key: string) => {
            if (key === 'origin') return 'https://evil.com'
            return null
          },
        },
      } as any

      const result = csrfGuard(mockRequest)
      expect(result).toBeNull()
    })

    it('should allow POST requests without origin header', () => {
      const mockRequest = {
        method: 'POST',
        headers: {
          get: () => null,
        },
      } as any

      const result = csrfGuard(mockRequest)
      expect(result).toBeNull()
    })
  })
})
