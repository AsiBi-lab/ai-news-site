'use client'

import { useState, useEffect } from 'react'
import type { AnimationContext } from './variants'

const MOBILE_BREAKPOINT = 768

/**
 * Hook to determine animation context based on device and user preferences.
 * Returns 'reduced' for users who prefer reduced motion,
 * 'mobile' for mobile devices, and 'desktop' otherwise.
 */
export function useAnimationContext(): AnimationContext {
  const [context, setContext] = useState<AnimationContext>('desktop')

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    // Check for mobile device
    const isMobile = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`)

    const updateContext = () => {
      if (prefersReducedMotion.matches) {
        setContext('reduced')
      } else if (isMobile.matches) {
        setContext('mobile')
      } else {
        setContext('desktop')
      }
    }

    // Initial check
    updateContext()

    // Listen for changes
    prefersReducedMotion.addEventListener('change', updateContext)
    isMobile.addEventListener('change', updateContext)

    return () => {
      prefersReducedMotion.removeEventListener('change', updateContext)
      isMobile.removeEventListener('change', updateContext)
    }
  }, [])

  return context
}

/**
 * Hook that returns true if animations should be minimal.
 * Use this for simple boolean checks.
 */
export function useReducedAnimations(): boolean {
  const context = useAnimationContext()
  return context !== 'desktop'
}
