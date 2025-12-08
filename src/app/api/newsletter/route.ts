import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { checkRateLimit, getIP } from '@/lib/rate-limit'
import { csrfGuard } from '@/lib/csrf-protection'
import { handleApiError, handleDatabaseError } from '@/lib/error-handler'

// Lazy initialization to avoid build-time errors
function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

// Email validation
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && email.length <= 254
}

export async function POST(request: NextRequest) {
  try {
    // CSRF Protection - verify origin
    const csrfError = csrfGuard(request)
    if (csrfError) return csrfError

    // Get IP for rate limiting
    const ip = getIP(request)

    // Check rate limit using Redis (falls back to allowing if Redis not configured)
    const rateLimit = await checkRateLimit('newsletter', ip)
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

    // Parse request body
    const body = await request.json()
    const { email } = body

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const normalizedEmail = email.toLowerCase().trim()

    if (!isValidEmail(normalizedEmail)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Check if already subscribed
    const { data: existing } = await getSupabaseAdmin()
      .from('newsletter_subscribers')
      .select('id, status')
      .eq('email', normalizedEmail)
      .single()

    if (existing) {
      if (existing.status === 'confirmed') {
        return NextResponse.json(
          { message: 'You are already subscribed!' },
          { status: 200 }
        )
      }
      // Re-subscribe if previously unsubscribed
      if (existing.status === 'unsubscribed') {
        await getSupabaseAdmin()
          .from('newsletter_subscribers')
          .update({
            status: 'confirmed',
            confirmed_at: new Date().toISOString(),
            unsubscribed_at: null
          })
          .eq('id', existing.id)

        return NextResponse.json(
          { message: 'Welcome back! You have been re-subscribed.' },
          { status: 200 }
        )
      }
    }

    // Insert new subscriber
    const { error: insertError } = await getSupabaseAdmin()
      .from('newsletter_subscribers')
      .insert({
        email: normalizedEmail,
        status: 'confirmed',
        confirmed_at: new Date().toISOString(),
      })

    if (insertError) {
      // Handle unique constraint violation
      if (insertError.code === '23505') {
        return NextResponse.json(
          { message: 'You are already subscribed!' },
          { status: 200 }
        )
      }
      return handleDatabaseError(insertError, {
        endpoint: '/api/newsletter',
        method: 'POST',
        action: 'insert_subscriber',
        ip,
      })
    }

    return NextResponse.json(
      { message: 'Successfully subscribed! Welcome aboard.' },
      { status: 201 }
    )
  } catch (error) {
    return handleApiError(error, {
      endpoint: '/api/newsletter',
      method: 'POST',
      ip: getIP(request),
    })
  }
}
