import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { inMemoryRateLimit } from './in-memory-rate-limit'

// Create Redis client only if env vars are set
const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null

// Different rate limiters for different use cases
export const rateLimiters = {
  // Newsletter: 5 requests per minute per IP
  newsletter: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(5, '1 m'),
        prefix: 'ratelimit:newsletter',
        analytics: true,
      })
    : null,

  // Search: 30 requests per minute per IP
  search: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(30, '1 m'),
        prefix: 'ratelimit:search',
        analytics: true,
      })
    : null,

  // General API: 100 requests per minute per IP
  api: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(100, '1 m'),
        prefix: 'ratelimit:api',
        analytics: true,
      })
    : null,
}

// Helper function to check rate limit
export async function checkRateLimit(
  limiterKey: keyof typeof rateLimiters,
  identifier: string
): Promise<{ success: boolean; remaining: number; reset: number }> {
  const limiter = rateLimiters[limiterKey]

  // If Redis is not configured, use in-memory fallback
  if (!limiter) {
    console.warn('⚠️  Redis not configured, using in-memory rate limiting')
    return await inMemoryRateLimit(limiterKey, identifier)
  }

  const result = await limiter.limit(identifier)

  return {
    success: result.success,
    remaining: result.remaining,
    reset: result.reset,
  }
}

// Helper to get IP from request
export function getIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')

  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }

  if (realIP) {
    return realIP
  }

  return 'unknown'
}
