import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { checkRateLimit, getIP } from '@/lib/rate-limit'
import { handleApiError, handleDatabaseError } from '@/lib/error-handler'

// Lazy initialization to avoid build-time errors
function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export async function GET(request: NextRequest) {
  try {
    // Rate limiting using Redis
    const ip = getIP(request)

    const rateLimit = await checkRateLimit('search', ip)
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': rateLimit.reset.toString(),
          },
        }
      )
    }

    // Get search query
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q')?.trim()
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 20)

    if (!query || query.length < 2) {
      return NextResponse.json(
        { error: 'Search query must be at least 2 characters' },
        { status: 400 }
      )
    }

    // Search using ilike for title and excerpt
    const { data: articles, error } = await getSupabase()
      .from('articles')
      .select(`
        id,
        title,
        slug,
        excerpt,
        featured_image,
        published_at,
        category:categories(name, slug)
      `)
      .eq('status', 'published')
      .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%`)
      .order('published_at', { ascending: false })
      .limit(limit)

    if (error) {
      return handleDatabaseError(error, {
        endpoint: '/api/search',
        method: 'GET',
        action: 'search_articles',
        query,
        ip,
      })
    }

    return NextResponse.json({
      results: articles || [],
      query,
      count: articles?.length || 0
    })
  } catch (error) {
    return handleApiError(error, {
      endpoint: '/api/search',
      method: 'GET',
      ip: getIP(request),
    })
  }
}
