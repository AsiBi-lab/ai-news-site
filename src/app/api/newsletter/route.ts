import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Use service role for server-side operations
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Simple rate limiting using in-memory store
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_REQUESTS = 5

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return false
  }

  if (record.count >= MAX_REQUESTS) {
    return true
  }

  record.count++
  return false
}

// Email validation
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && email.length <= 254
}

export async function POST(request: NextRequest) {
  try {
    // Get IP for rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ||
               request.headers.get('x-real-ip') ||
               'unknown'

    // Check rate limit
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
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
    const { data: existing } = await supabaseAdmin
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
        await supabaseAdmin
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
    const { error: insertError } = await supabaseAdmin
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
      console.error('Newsletter subscription error:', insertError)
      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Successfully subscribed! Welcome aboard.' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Newsletter API error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
