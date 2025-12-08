import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Middleware for CSP nonce generation and security headers
 *
 * Generates a unique nonce for each request and includes it in the CSP header.
 * This allows inline scripts/styles while maintaining security by preventing
 * injection of unauthorized inline code.
 */
export function middleware(request: NextRequest) {
  // Generate a random nonce for this request
  // Using crypto.randomUUID for better performance than randomBytes in edge runtime
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')

  // Create response with nonce header for use in layout
  const response = NextResponse.next()
  response.headers.set('x-nonce', nonce)

  // Content Security Policy with nonce
  const cspHeader = [
    "default-src 'self'",
    // script-src: Allow self, nonce-based inline scripts, and Vercel analytics
    `script-src 'self' 'nonce-${nonce}' https://va.vercel-scripts.com`,
    // style-src: Allow self, nonce-based inline styles
    // Note: 'unsafe-inline' as fallback for browsers that don't support nonces
    `style-src 'self' 'nonce-${nonce}' 'unsafe-inline'`,
    // img-src: Allow images from self, Supabase, Unsplash, and data URIs
    "img-src 'self' https://*.supabase.co https://images.unsplash.com blob: data:",
    // font-src: Allow fonts from self and data URIs
    "font-src 'self' data:",
    // connect-src: Allow connections to self, Supabase, and Vercel analytics
    "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://va.vercel-scripts.com",
    // frame-ancestors: Prevent embedding in iframes
    "frame-ancestors 'none'",
    // base-uri: Restrict base tag URLs
    "base-uri 'self'",
    // form-action: Restrict form submissions
    "form-action 'self'",
  ].join('; ')

  // Set CSP header
  response.headers.set('Content-Security-Policy', cspHeader)

  // Also set other security headers that were in next.config.ts
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), interest-cohort=()')

  return response
}

/**
 * Matcher configuration
 *
 * Apply middleware to all routes except:
 * - API routes (they don't need CSP for HTML)
 * - Next.js static files (_next/static)
 * - Next.js image optimization (_next/image)
 * - Favicon and other static assets
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (static files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
