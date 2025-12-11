/**
 * Genesis Design System Tokens
 *
 * Centralized design tokens for consistent styling across the application.
 * These values match the CSS variables defined in globals.css @theme inline.
 */

// Color Palette
export const colors = {
  genesis: {
    blue: '#6b8cce',
    lavender: '#a89cc8',
    pink: '#c88ba8',
  },
  text: {
    light: '#2d3a52',
    lightMuted: '#5a6a8a',
    dark: 'rgba(220, 230, 255, 0.95)',
    darkMuted: 'rgba(180, 200, 240, 0.7)',
  },
  gradient: {
    start: '#e8e4e0',
    mid1: '#d4e8f5',
    mid2: '#e8d4eb',
    mid3: '#f5d4de',
  },
} as const

// Animation Timing
export const animation = {
  easeSmooth: [0.25, 0.8, 0.25, 1] as const,
  duration: {
    fast: 0.15,
    normal: 0.3,
    slow: 0.5,
    slower: 0.6,
  },
} as const

// Spacing (matches Tailwind defaults)
export const spacing = {
  xs: '0.25rem',  // 4px
  sm: '0.5rem',   // 8px
  md: '1rem',     // 16px
  lg: '1.5rem',   // 24px
  xl: '2rem',     // 32px
  '2xl': '3rem',  // 48px
} as const

// Border Radius
export const radius = {
  sm: 'calc(0.75rem - 4px)',
  md: 'calc(0.75rem - 2px)',
  lg: '0.75rem',
  xl: 'calc(0.75rem + 4px)',
  full: '9999px',
} as const

// Shadows
export const shadows = {
  genesis: '0 4px 20px rgba(255, 255, 255, 0.3)',
  genesisDark: '0 4px 20px rgba(100, 140, 200, 0.3)',
  card: '0 4px 30px rgba(0, 0, 0, 0.08)',
  cardDark: '0 4px 30px rgba(0, 0, 0, 0.3)',
} as const

// Typography
export const typography = {
  fontFamily: {
    sans: 'var(--font-plus-jakarta)',
    mono: 'var(--font-geist-mono)',
  },
  letterSpacing: {
    tight: '-0.02em',
    genesis: '0.05em',
  },
} as const

// CSS Variable names for use with var()
export const cssVars = {
  easeSmooth: '--ease-smooth',
  genesisText: '--genesis-text',
  genesisTextMuted: '--genesis-text-muted',
  background: '--background',
  foreground: '--foreground',
} as const

// Gradient definitions
export const gradients = {
  genesis: 'linear-gradient(135deg, #6b8cce 0%, #a89cc8 50%, #c88ba8 100%)',
  genesisLight: 'linear-gradient(135deg, #e8e4e0 0%, #d4e8f5 25%, #e8d4eb 50%, #f5d4de 75%, #d4e8f5 100%)',
  genesisDark: 'linear-gradient(135deg, oklch(0.18 0.02 260) 0%, oklch(0.16 0.04 280) 50%, oklch(0.14 0.03 300) 100%)',
} as const

export type GenesisColors = typeof colors
export type GenesisAnimation = typeof animation
