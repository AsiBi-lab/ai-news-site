import type { Variants, Transition } from 'framer-motion'

// Standard easing curve for all animations
export const EASE_SMOOTH = [0.25, 0.8, 0.25, 1] as const

// ============================================
// DESKTOP VARIANTS (Full animations)
// ============================================

// Container with staggered children
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    }
  }
}

// Standard fade-up for content items
export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: EASE_SMOOTH
    }
  }
}

// Scale animation for stats/numbers
export const statVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: EASE_SMOOTH
    }
  }
}

// Card entrance animation
export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: EASE_SMOOTH
    }
  }
}

// Stagger delay calculator for lists
export const getStaggerDelay = (index: number, baseDelay = 0.08) => ({
  delay: index * baseDelay,
  duration: 0.5,
  ease: EASE_SMOOTH
})

// ============================================
// MOBILE-OPTIMIZED VARIANTS (Reduced motion)
// ============================================

// Instant appearance - no animation overhead
export const mobileContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
      staggerChildren: 0,
      delayChildren: 0,
    }
  }
}

// Simple fade - minimal CPU usage
export const mobileItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
    }
  }
}

// No scale animation on mobile
export const mobileStatVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.15,
    }
  }
}

// Instant card appearance
export const mobileCardVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.15,
    }
  }
}

// Mobile stagger - minimal delay
export const getMobileStaggerDelay = (index: number): Transition => ({
  delay: Math.min(index * 0.02, 0.1), // Cap at 100ms total
  duration: 0.15,
})

// ============================================
// REDUCED MOTION VARIANTS (Accessibility)
// ============================================

// For users with prefers-reduced-motion
export const reducedMotionVariants: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 }
}

// ============================================
// UTILITY: Get variants based on context
// ============================================

export type AnimationContext = 'desktop' | 'mobile' | 'reduced'

export const getContainerVariants = (context: AnimationContext): Variants => {
  if (context === 'reduced') return reducedMotionVariants
  if (context === 'mobile') return mobileContainerVariants
  return containerVariants
}

export const getItemVariants = (context: AnimationContext): Variants => {
  if (context === 'reduced') return reducedMotionVariants
  if (context === 'mobile') return mobileItemVariants
  return itemVariants
}

export const getCardVariants = (context: AnimationContext): Variants => {
  if (context === 'reduced') return reducedMotionVariants
  if (context === 'mobile') return mobileCardVariants
  return cardVariants
}

export const getStatVariants = (context: AnimationContext): Variants => {
  if (context === 'reduced') return reducedMotionVariants
  if (context === 'mobile') return mobileStatVariants
  return statVariants
}
