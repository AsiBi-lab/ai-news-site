// In-memory fallback rate limiter when Redis is not available
import cache from 'memory-cache'

interface RateLimitResult {
  success: boolean
  remaining: number
  reset: number
}

interface RateLimitConfig {
  limit: number      // Max requests
  windowMs: number   // Time window in milliseconds
}

const configs: Record<string, RateLimitConfig> = {
  newsletter: { limit: 5, windowMs: 60000 },    // 5 per minute
  search: { limit: 30, windowMs: 60000 },        // 30 per minute
  api: { limit: 100, windowMs: 60000 },          // 100 per minute
}

export async function inMemoryRateLimit(
  limiterKey: string,
  identifier: string
): Promise<RateLimitResult> {
  const config = configs[limiterKey]
  if (!config) {
    console.warn(`No rate limit config for: ${limiterKey}`)
    return { success: true, remaining: -1, reset: 0 }
  }

  const key = `ratelimit:${limiterKey}:${identifier}`
  const now = Date.now()
  const windowStart = now - config.windowMs

  // Get existing requests from cache
  let requests: number[] = cache.get(key) || []

  // Filter out requests outside the current window
  requests = requests.filter(timestamp => timestamp > windowStart)

  // Check if limit exceeded
  if (requests.length >= config.limit) {
    const oldestRequest = Math.min(...requests)
    const resetTime = oldestRequest + config.windowMs

    return {
      success: false,
      remaining: 0,
      reset: Math.ceil(resetTime / 1000), // Convert to seconds
    }
  }

  // Add current request
  requests.push(now)
  cache.put(key, requests, config.windowMs)

  return {
    success: true,
    remaining: config.limit - requests.length,
    reset: Math.ceil((now + config.windowMs) / 1000),
  }
}
