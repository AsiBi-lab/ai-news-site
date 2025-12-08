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
vi.mock('framer-motion', () => {
  const React = require('react')
  return {
    motion: new Proxy(
      {},
      {
        get: (_target: object, prop: string) => {
          // Return a component that renders both children and dangerouslySetInnerHTML
          return React.forwardRef(({ children, dangerouslySetInnerHTML, ...props }: any, ref: any) => {
            // If dangerouslySetInnerHTML is used, render a div with it
            if (dangerouslySetInnerHTML) {
              return React.createElement(prop, {
                ...props,
                ref,
                dangerouslySetInnerHTML
              })
            }
            // Otherwise render children normally
            return React.createElement(prop, { ...props, ref }, children)
          })
        },
      }
    ),
    AnimatePresence: ({ children }: any) => children,
  }
})
