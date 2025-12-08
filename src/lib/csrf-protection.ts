import { NextRequest } from 'next/server'

/**
 * Validates the origin of a request against allowed origins
 * Uses exact match to prevent bypass attacks (e.g., localhost:3000.evil.com)
 * @param request - The incoming Next.js request
 * @returns true if origin is valid or not present, false otherwise
 */
export function validateOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin')

  // Build allowed origins list, filtering out undefined values
  const allowedOrigins: string[] = [
    'http://localhost:3000',
    'http://localhost:3001',
  ]

  // Add production URL if configured
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    allowedOrigins.push(process.env.NEXT_PUBLIC_SITE_URL)
    // Also allow HTTPS version if HTTP was provided
    if (process.env.NEXT_PUBLIC_SITE_URL.startsWith('http://')) {
      allowedOrigins.push(process.env.NEXT_PUBLIC_SITE_URL.replace('http://', 'https://'))
    }
  }

  // Allow requests without Origin header (e.g., curl, server-to-server, same-origin)
  if (!origin) {
    return true
  }

  // SECURITY: Use exact match to prevent bypass attacks
  // e.g., "http://localhost:3000.evil.com" would pass startsWith but fail exact match
  return allowedOrigins.includes(origin)
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
