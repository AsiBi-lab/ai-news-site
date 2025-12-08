import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

// Cleanup after each test
afterEach(() => {
  cleanup()
})

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
    }
  },
  useSearchParams() {
    return new URLSearchParams()
  },
  usePathname() {
    return ''
  },
}))

// Mock Framer Motion (to avoid animation issues in tests)
vi.mock('framer-motion', () => ({
  motion: new Proxy(
    {},
    {
      get: () => {
        // Return a component that just renders its children
        return ({ children, ...props }: any) => children
      },
    }
  ),
  AnimatePresence: ({ children }: any) => children,
}))
