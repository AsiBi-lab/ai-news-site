interface ErrorContext {
  [key: string]: any
}

/**
 * Sanitizes error messages for client responses
 * In production: returns generic message
 * In development: returns actual error message (no stack trace)
 */
export function sanitizeError(error: Error | unknown): string {
  const isProd = process.env.NODE_ENV === 'production'

  if (isProd) {
    // Generic message in production to avoid information leakage
    return 'An error occurred. Please try again later.'
  }

  // Development: show error message (not stack)
  if (error instanceof Error) {
    return error.message
  }

  return 'Unknown error'
}

/**
 * Logs errors with context for debugging and monitoring
 * In production: structured JSON for log aggregation (Sentry, CloudWatch, etc.)
 * In development: human-readable format
 */
export function logError(
  error: Error | unknown,
  context?: ErrorContext
) {
  const timestamp = new Date().toISOString()
  const isProd = process.env.NODE_ENV === 'production'

  const logEntry = {
    timestamp,
    message: error instanceof Error ? error.message : 'Unknown error',
    stack: !isProd && error instanceof Error ? error.stack : undefined,
    ...context,
  }

  // In production, this would go to Sentry or similar
  // For now, structured JSON logging for aggregation
  if (isProd) {
    console.error(JSON.stringify(logEntry))
  } else {
    console.error('[Error]', logEntry)
  }
}

/**
 * Unified API error handler
 * Logs the error with context and returns a sanitized response
 *
 * @example
 * try {
 *   // ... API logic
 * } catch (error) {
 *   return handleApiError(error, { endpoint: '/api/newsletter', method: 'POST' })
 * }
 */
export function handleApiError(
  error: Error | unknown,
  context?: ErrorContext
): Response {
  logError(error, context)

  return Response.json(
    { error: sanitizeError(error) },
    { status: 500 }
  )
}

/**
 * Database-specific error handler
 * Provides more specific error messages for common database issues
 */
export function handleDatabaseError(
  error: any,
  context?: ErrorContext
): Response {
  logError(error, { ...context, type: 'database' })

  const isProd = process.env.NODE_ENV === 'production'

  // Common Supabase/PostgreSQL error codes
  const errorMessages: Record<string, string> = {
    '23505': 'This record already exists',
    '23503': 'Referenced record does not exist',
    '23502': 'Required field is missing',
    '42P01': 'Database table not found',
  }

  // Check if it's a database error with a code
  const errorCode = error?.code
  if (!isProd && errorCode && errorMessages[errorCode]) {
    return Response.json(
      { error: errorMessages[errorCode] },
      { status: 400 }
    )
  }

  // Fallback to generic handler
  return Response.json(
    { error: sanitizeError(error) },
    { status: 500 }
  )
}
