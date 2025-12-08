import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { sanitizeError, logError, handleApiError, handleDatabaseError } from './error-handler'

describe('Error Handler', () => {
  let originalEnv: string | undefined

  beforeEach(() => {
    originalEnv = process.env.NODE_ENV
  })

  afterEach(() => {
    process.env.NODE_ENV = originalEnv
    vi.restoreAllMocks()
  })

  describe('sanitizeError', () => {
    it('should sanitize errors in production', () => {
      process.env.NODE_ENV = 'production'

      const error = new Error('Database connection failed with password: secret123')
      const sanitized = sanitizeError(error)

      expect(sanitized).not.toContain('password')
      expect(sanitized).not.toContain('secret123')
      expect(sanitized).toBe('An error occurred. Please try again later.')
    })

    it('should show message in development', () => {
      process.env.NODE_ENV = 'development'

      const error = new Error('Test error')
      const sanitized = sanitizeError(error)

      expect(sanitized).toBe('Test error')
    })

    it('should handle non-Error objects', () => {
      process.env.NODE_ENV = 'development'

      const sanitized = sanitizeError('string error')

      expect(sanitized).toBe('Unknown error')
    })

    it('should handle undefined/null', () => {
      process.env.NODE_ENV = 'development'

      expect(sanitizeError(null)).toBe('Unknown error')
      expect(sanitizeError(undefined)).toBe('Unknown error')
    })
  })

  describe('logError', () => {
    it('should log structured JSON in production', () => {
      process.env.NODE_ENV = 'production'
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      const error = new Error('Test error')
      logError(error, { userId: '123', endpoint: '/api/test' })

      expect(consoleErrorSpy).toHaveBeenCalled()
      const loggedData = consoleErrorSpy.mock.calls[0][0]

      // In production, should be JSON string
      expect(typeof loggedData).toBe('string')

      const parsed = JSON.parse(loggedData)
      expect(parsed.message).toBe('Test error')
      expect(parsed.userId).toBe('123')
      expect(parsed.endpoint).toBe('/api/test')
      expect(parsed.timestamp).toBeDefined()
      // Stack should not be included in production
      expect(parsed.stack).toBeUndefined()
    })

    it('should log human-readable format in development', () => {
      process.env.NODE_ENV = 'development'
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      const error = new Error('Test error')
      logError(error, { userId: '123' })

      expect(consoleErrorSpy).toHaveBeenCalled()
      expect(consoleErrorSpy.mock.calls[0][0]).toBe('[Error]')
      expect(consoleErrorSpy.mock.calls[0][1]).toMatchObject({
        message: 'Test error',
        userId: '123',
      })
    })

    it('should include stack trace in development', () => {
      process.env.NODE_ENV = 'development'
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      const error = new Error('Test error')
      logError(error)

      const loggedData = consoleErrorSpy.mock.calls[0][1]
      expect(loggedData.stack).toBeDefined()
      expect(loggedData.stack).toContain('Error: Test error')
    })
  })

  describe('handleApiError', () => {
    it('should return 500 response with sanitized error', async () => {
      process.env.NODE_ENV = 'production'
      vi.spyOn(console, 'error').mockImplementation(() => {})

      const error = new Error('Internal database error')
      const response = handleApiError(error, { endpoint: '/api/test' })

      expect(response.status).toBe(500)

      const body = await response.json()
      expect(body.error).toBe('An error occurred. Please try again later.')
      expect(body.error).not.toContain('database')
    })

    it('should log error with context', () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      const error = new Error('Test error')
      handleApiError(error, { endpoint: '/api/test', method: 'POST' })

      expect(consoleErrorSpy).toHaveBeenCalled()
    })
  })

  describe('handleDatabaseError', () => {
    it('should handle duplicate key error (23505)', async () => {
      process.env.NODE_ENV = 'development'
      vi.spyOn(console, 'error').mockImplementation(() => {})

      const dbError = { code: '23505', message: 'duplicate key value' }
      const response = handleDatabaseError(dbError, { table: 'users' })

      expect(response.status).toBe(400)

      const body = await response.json()
      expect(body.error).toBe('This record already exists')
    })

    it('should handle foreign key violation (23503)', async () => {
      process.env.NODE_ENV = 'development'
      vi.spyOn(console, 'error').mockImplementation(() => {})

      const dbError = { code: '23503', message: 'foreign key violation' }
      const response = handleDatabaseError(dbError)

      expect(response.status).toBe(400)

      const body = await response.json()
      expect(body.error).toBe('Referenced record does not exist')
    })

    it('should handle not null violation (23502)', async () => {
      process.env.NODE_ENV = 'development'
      vi.spyOn(console, 'error').mockImplementation(() => {})

      const dbError = { code: '23502', message: 'not null violation' }
      const response = handleDatabaseError(dbError)

      expect(response.status).toBe(400)

      const body = await response.json()
      expect(body.error).toBe('Required field is missing')
    })

    it('should fallback to generic error for unknown codes', async () => {
      process.env.NODE_ENV = 'production'
      vi.spyOn(console, 'error').mockImplementation(() => {})

      const dbError = { code: 'UNKNOWN', message: 'some error' }
      const response = handleDatabaseError(dbError)

      expect(response.status).toBe(500)

      const body = await response.json()
      expect(body.error).toBe('An error occurred. Please try again later.')
    })

    it('should not expose database error codes in production', async () => {
      process.env.NODE_ENV = 'production'
      vi.spyOn(console, 'error').mockImplementation(() => {})

      const dbError = { code: '23505', message: 'duplicate key' }
      const response = handleDatabaseError(dbError)

      const body = await response.json()
      // In production, should use generic message
      expect(body.error).toBe('An error occurred. Please try again later.')
    })
  })
})
