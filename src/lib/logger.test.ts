import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { logger } from './logger'

describe('Logger', () => {
  let originalEnv: string | undefined

  beforeEach(() => {
    originalEnv = process.env.NODE_ENV
    vi.clearAllMocks()
  })

  afterEach(() => {
    process.env.NODE_ENV = originalEnv
  })

  describe('shouldLog', () => {
    it('should not log in test environment', () => {
      process.env.NODE_ENV = 'test'
      const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

      logger.info('test message')

      expect(consoleLogSpy).not.toHaveBeenCalled()
    })

    it('should not log debug messages in production', () => {
      process.env.NODE_ENV = 'production'
      const consoleDebugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {})

      logger.debug('debug message')

      expect(consoleDebugSpy).not.toHaveBeenCalled()
    })

    it('should log error messages in production', () => {
      process.env.NODE_ENV = 'production'
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      logger.error('error message')

      expect(consoleErrorSpy).toHaveBeenCalled()
    })
  })

  describe('formatMessage', () => {
    it('should format as JSON in production', () => {
      process.env.NODE_ENV = 'production'
      const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

      logger.info('test message', { userId: '123' })

      expect(consoleLogSpy).toHaveBeenCalled()
      const loggedData = consoleLogSpy.mock.calls[0][0]

      // Should be valid JSON
      const parsed = JSON.parse(loggedData)
      expect(parsed.level).toBe('info')
      expect(parsed.message).toBe('test message')
      expect(parsed.userId).toBe('123')
      expect(parsed.timestamp).toBeDefined()
    })

    it('should format as human-readable in development', () => {
      process.env.NODE_ENV = 'development'
      const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

      logger.info('test message')

      expect(consoleLogSpy).toHaveBeenCalled()
      const loggedData = consoleLogSpy.mock.calls[0][0]

      // Should contain timestamp and level
      expect(loggedData).toContain('[INFO]')
      expect(loggedData).toContain('test message')
    })
  })

  describe('sanitizeContext', () => {
    it('should redact password fields', () => {
      process.env.NODE_ENV = 'development'
      const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

      logger.info('user login', {
        username: 'john@example.com',
        password: 'secret123',
      })

      const loggedData = consoleLogSpy.mock.calls[0][0]
      expect(loggedData).toContain('john@example.com')
      expect(loggedData).not.toContain('secret123')
      expect(loggedData).toContain('[REDACTED]')
    })

    it('should redact token fields', () => {
      process.env.NODE_ENV = 'development'
      const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

      logger.info('API request', {
        endpoint: '/api/data',
        authToken: 'Bearer abc123',
        apiKey: 'key-xyz789',
      })

      const loggedData = consoleLogSpy.mock.calls[0][0]
      expect(loggedData).toContain('/api/data')
      expect(loggedData).not.toContain('abc123')
      expect(loggedData).not.toContain('xyz789')
      expect(loggedData).toContain('[REDACTED]')
    })

    it('should redact authorization headers', () => {
      process.env.NODE_ENV = 'development'
      const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

      logger.info('HTTP request', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'authorization': 'Bearer secret-token',
        },
      })

      const loggedData = consoleLogSpy.mock.calls[0][0]
      expect(loggedData).toContain('POST')
      expect(loggedData).toContain('application/json')
      expect(loggedData).not.toContain('secret-token')
      expect(loggedData).toContain('[REDACTED]')
    })

    it('should handle nested objects', () => {
      process.env.NODE_ENV = 'development'
      const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

      logger.info('nested data', {
        user: {
          id: '123',
          email: 'user@example.com',
          credentials: {
            password: 'secret',
            apiKey: 'key123',
          },
        },
      })

      const loggedData = consoleLogSpy.mock.calls[0][0]
      expect(loggedData).toContain('123')
      expect(loggedData).toContain('user@example.com')
      expect(loggedData).not.toContain('secret')
      expect(loggedData).not.toContain('key123')
    })

    it('should preserve safe data', () => {
      process.env.NODE_ENV = 'development'
      const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

      logger.info('safe data', {
        userId: '123',
        action: 'login',
        timestamp: Date.now(),
        metadata: {
          browser: 'Chrome',
          os: 'macOS',
        },
      })

      const loggedData = consoleLogSpy.mock.calls[0][0]
      expect(loggedData).toContain('123')
      expect(loggedData).toContain('login')
      expect(loggedData).toContain('Chrome')
      expect(loggedData).toContain('macOS')
    })
  })

  describe('log levels', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'development'
    })

    it('should log info messages', () => {
      const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

      logger.info('info message')

      expect(consoleLogSpy).toHaveBeenCalled()
      expect(consoleLogSpy.mock.calls[0][0]).toContain('[INFO]')
    })

    it('should log warn messages', () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      logger.warn('warning message')

      expect(consoleWarnSpy).toHaveBeenCalled()
      expect(consoleWarnSpy.mock.calls[0][0]).toContain('[WARN]')
    })

    it('should log error messages', () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      logger.error('error message')

      expect(consoleErrorSpy).toHaveBeenCalled()
      expect(consoleErrorSpy.mock.calls[0][0]).toContain('[ERROR]')
    })

    it('should log debug messages in development', () => {
      const consoleDebugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {})

      logger.debug('debug message')

      expect(consoleDebugSpy).toHaveBeenCalled()
      expect(consoleDebugSpy.mock.calls[0][0]).toContain('[DEBUG]')
    })
  })

  describe('log method', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'development'
    })

    it('should call correct method for each level', () => {
      const infoSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      const debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {})

      logger.log('info', 'info')
      logger.log('warn', 'warn')
      logger.log('error', 'error')
      logger.log('debug', 'debug')

      expect(infoSpy).toHaveBeenCalled()
      expect(warnSpy).toHaveBeenCalled()
      expect(errorSpy).toHaveBeenCalled()
      expect(debugSpy).toHaveBeenCalled()
    })
  })
})
