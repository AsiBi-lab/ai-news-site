import type { Variants } from 'framer-motion'

// Standard easing curve for all animations
export const EASE_SMOOTH = [0.25, 0.8, 0.25, 1] as const

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
