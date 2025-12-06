'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, MouseEvent } from 'react'

interface Props {
  children: React.ReactNode
  index?: number
  enableTilt?: boolean
  enableSpotlight?: boolean
  className?: string
}

export function AnimatedCard({
  children,
  index = 0,
  enableTilt = true,
  enableSpotlight = true,
  className = ''
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  // Mouse position for tilt effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth spring animation for mouse movement
  const springConfig = { damping: 25, stiffness: 150 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig)

  // Spotlight position
  const spotlightX = useMotionValue('50%')
  const spotlightY = useMotionValue('50%')

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !enableTilt) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Normalize mouse position to -0.5 to 0.5
    const normalizedX = (e.clientX - centerX) / rect.width
    const normalizedY = (e.clientY - centerY) / rect.height

    mouseX.set(normalizedX)
    mouseY.set(normalizedY)

    // Update spotlight position
    if (enableSpotlight) {
      const spotX = ((e.clientX - rect.left) / rect.width) * 100
      const spotY = ((e.clientY - rect.top) / rect.height) * 100
      spotlightX.set(`${spotX}%`)
      spotlightY.set(`${spotY}%`)
    }
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    spotlightX.set('50%')
    spotlightY.set('50%')
  }

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.1,
        duration: 0.5,
        ease: [0.25, 0.8, 0.25, 1]
      }}
      style={{
        rotateX: enableTilt ? rotateX : 0,
        rotateY: enableTilt ? rotateY : 0,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.3, ease: [0.25, 0.8, 0.25, 1] }
      }}
      whileTap={{ scale: 0.98 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Spotlight overlay */}
      {enableSpotlight && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-10 rounded-3xl opacity-0 group-hover:opacity-100"
          style={{
            background: `radial-gradient(600px circle at ${spotlightX.get()} ${spotlightY.get()}, rgba(255,255,255,0.15), transparent 40%)`,
          }}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
      {children}
    </motion.div>
  )
}

// Simpler animated wrapper for non-card elements
export function FadeInUp({
  children,
  delay = 0,
  className = ''
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay,
        duration: 0.5,
        ease: [0.25, 0.8, 0.25, 1]
      }}
    >
      {children}
    </motion.div>
  )
}

// Staggered children animation
export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  className = ''
}: {
  children: React.ReactNode
  staggerDelay?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          }
        }
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className = ''
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.25, 0.8, 0.25, 1]
          }
        }
      }}
    >
      {children}
    </motion.div>
  )
}
