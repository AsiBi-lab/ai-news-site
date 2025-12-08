import { NextRequest } from 'next/server'

/**
 * Validates the origin of a request against allowed origins
 * @param request - The incoming Next.js request
 * @returns true if origin is valid or not present, false otherwise
 */
export function validateOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin')
  const allowedOrigins = [
    process.env.NEXT_PUBLIC_SITE_URL,
    'http://localhost:3000',
    'http://localhost:3001',
  ]

  // Allow requests without Origin header (e.g., curl, server-to-server, same-origin)
  if (!origin) {
    return true
  }

  return allowedOrigins.some(allowed =>
    allowed && origin.startsWith(allowed)
  )
}

/**
 * CSRF guard middleware for API routes
 * Checks POST requests for valid Origin header
 * @param request - The incoming Next.js request
 * @returns Response with 403 error if origin invalid, null otherwise
 */
export function csrfGuard(request: NextRequest) {
  if (request.method === 'POST' && !validateOrigin(request)) {
    return Response.json(
      { error: 'Invalid origin' },
      { status: 403 }
    )
  }
  return null
}
