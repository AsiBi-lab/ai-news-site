'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    // TODO: Implement newsletter signup with Supabase or external service
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setStatus('success')
    setEmail('')
  }

  return (
    <section className="py-20">
      <div className="container">
        <div className="relative max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Mail className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary">Newsletter</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Stay Ahead of the Curve
          </h2>

          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Weekly insights on AI breakthroughs, industry trends, and practical applications. No spam.
          </p>

          {status === 'success' ? (
            <div className="flex items-center justify-center gap-2 text-primary font-medium">
              <CheckCircle2 className="h-5 w-5" />
              <span>You're subscribed! Check your inbox.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 h-12 px-4 bg-background border-border/50 focus:border-primary"
              />
              <Button
                type="submit"
                disabled={status === 'loading'}
                className="h-12 px-6 gap-2"
              >
                {status === 'loading' ? (
                  'Subscribing...'
                ) : (
                  <>
                    Subscribe
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          )}

          <p className="mt-4 text-xs text-muted-foreground">
            Join 50,000+ AI professionals. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  )
}
