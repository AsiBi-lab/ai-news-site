import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
import { handleApiError } from '@/lib/error-handler'

export const runtime = 'edge'

// Maximum lengths to prevent DoS attacks
const MAX_TITLE_LENGTH = 120
const MAX_SUBTITLE_LENGTH = 200

/**
 * Sanitize text input for OG image generation
 * - Limits length to prevent memory exhaustion
 * - Removes potentially harmful characters
 */
function sanitizeOgText(text: string, maxLength: number): string {
  return text
    .substring(0, maxLength)
    .replace(/[\x00-\x1F\x7F]/g, '') // Remove control characters
    .trim()
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Get and sanitize parameters to prevent DoS and injection
    const rawTitle = searchParams.get('title') || 'AI Deck'
    const rawSubtitle = searchParams.get('subtitle') || 'Find the Perfect AI Tool'
    const rawType = searchParams.get('type') || 'default'

    const title = sanitizeOgText(rawTitle, MAX_TITLE_LENGTH)
    const subtitle = sanitizeOgText(rawSubtitle, MAX_SUBTITLE_LENGTH)
    const type = ['default', 'tool', 'article'].includes(rawType) ? rawType : 'default'

    return new ImageResponse(
      (
        <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Decorative grid pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            opacity: 0.1,
          }}
        >
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              style={{
                width: '200px',
                height: '100%',
                borderRight: '1px solid white',
              }}
            />
          ))}
        </div>

        {/* Gradient orbs */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124, 58, 237, 0.4) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            left: '-100px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)',
          }}
        />

        {/* Logo grid icon */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '40px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
              }}
            />
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
              }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
              }}
            />
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
              }}
            />
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: '0 60px',
          }}
        >
          <h1
            style={{
              fontSize: type === 'default' ? '72px' : '56px',
              fontWeight: 800,
              color: 'white',
              margin: 0,
              lineHeight: 1.1,
              maxWidth: '900px',
              background: 'linear-gradient(135deg, #ffffff, #e0e7ff)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
            }}
          >
            {title}
          </h1>

          <p
            style={{
              fontSize: '28px',
              color: 'rgba(255, 255, 255, 0.7)',
              margin: '20px 0 0 0',
              maxWidth: '700px',
            }}
          >
            {subtitle}
          </p>
        </div>

        {/* Brand footer */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <span
            style={{
              fontSize: '24px',
              fontWeight: 700,
              color: 'white',
              letterSpacing: '0.1em',
            }}
          >
            AI DECK
          </span>
          <span
            style={{
              fontSize: '20px',
              color: 'rgba(255, 255, 255, 0.5)',
            }}
          >
            aideck.io
          </span>
        </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (error) {
    return handleApiError(error, {
      endpoint: '/api/og',
      method: 'GET',
    })
  }
}
