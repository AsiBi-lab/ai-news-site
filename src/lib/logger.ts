/**
 * Centralized Logging Utility
 *
 * Provides structured logging for the application with:
 * - Multiple log levels (info, warn, error, debug)
 * - Automatic sensitive data redaction
 * - Environment-aware formatting (JSON for production, pretty for dev)
 * - Context enrichment
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug'

interface LogContext {
  [key: string]: any
}

class Logger {
  /**
   * Check if logging should be enabled for this level
   */
  private shouldLog(level: LogLevel): boolean {
    // Never log in test environment
    if (process.env.NODE_ENV === 'test') return false

    // In production, skip debug logs
    if (process.env.NODE_ENV === 'production' && level === 'debug') return false

    return true
  }

  /**
   * Format log message based on environment
   */
  private formatMessage(
    level: LogLevel,
    message: string,
    context?: LogContext
  ): string {
    const timestamp = new Date().toISOString()

    if (process.env.NODE_ENV === 'production') {
      // JSON format for log aggregation (CloudWatch, Datadog, etc.)
      return JSON.stringify({
        timestamp,
        level,
        message,
        ...context,
      })
    }

    // Human-readable format for development
    const contextStr = context ? ` ${JSON.stringify(context, null, 2)}` : ''
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${contextStr}`
  }

  /**
   * Sanitize context to remove sensitive information
   */
  private sanitizeContext(context?: LogContext): LogContext | undefined {
    if (!context) return undefined

    const sanitized = { ...context }

    // List of sensitive field patterns (case-insensitive)
    const sensitivePatterns = [
      /password/i,
      /token/i,
      /key/i,
      /secret/i,
      /authorization/i,
      /cookie/i,
      /session/i,
      /api[-_]?key/i,
      /auth[-_]?token/i,
    ]

    // Recursively sanitize object
    const sanitizeValue = (obj: any): any => {
      if (obj === null || obj === undefined) return obj
      if (typeof obj !== 'object') return obj

      if (Array.isArray(obj)) {
        return obj.map(sanitizeValue)
      }

      const result: any = {}
      for (const [key, value] of Object.entries(obj)) {
        // Check if key matches sensitive patterns
        const isSensitive = sensitivePatterns.some(pattern => pattern.test(key))

        if (isSensitive) {
          result[key] = '[REDACTED]'
        } else if (typeof value === 'object' && value !== null) {
          result[key] = sanitizeValue(value)
        } else {
          result[key] = value
        }
      }

      return result
    }

    return sanitizeValue(sanitized)
  }

  /**
   * Log info-level message
   * Use for general application flow and important events
   */
  info(message: string, context?: LogContext) {
    if (!this.shouldLog('info')) return

    const sanitized = this.sanitizeContext(context)
    console.log(this.formatMessage('info', message, sanitized))
  }

  /**
   * Log warning message
   * Use for recoverable issues and deprecated features
   */
  warn(message: string, context?: LogContext) {
    if (!this.shouldLog('warn')) return

    const sanitized = this.sanitizeContext(context)
    console.warn(this.formatMessage('warn', message, sanitized))
  }

  /**
   * Log error message
   * Use for application errors and exceptions
   */
  error(message: string, context?: LogContext) {
    if (!this.shouldLog('error')) return

    const sanitized = this.sanitizeContext(context)
    console.error(this.formatMessage('error', message, sanitized))
  }

  /**
   * Log debug message
   * Use for detailed diagnostic information (disabled in production)
   */
  debug(message: string, context?: LogContext) {
    if (!this.shouldLog('debug')) return

    const sanitized = this.sanitizeContext(context)
    console.debug(this.formatMessage('debug', message, sanitized))
  }

  /**
   * Log with custom level
   */
  log(level: LogLevel, message: string, context?: LogContext) {
    switch (level) {
      case 'info':
        this.info(message, context)
        break
      case 'warn':
        this.warn(message, context)
        break
      case 'error':
        this.error(message, context)
        break
      case 'debug':
        this.debug(message, context)
        break
    }
  }
}

// Export singleton instance
export const logger = new Logger()

// Export type for use in other files
export type { LogLevel, LogContext }
