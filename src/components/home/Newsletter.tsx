'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Mail } from 'lucide-react'

import { FadeIn } from '@/components/animations/FadeIn'
import { Meteors } from '@/components/ui/meteors'

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
    <section className="py-16 md:py-24 relative overflow-hidden bg-neutral-950">
      <div className="container max-w-4xl relative z-10">
        <FadeIn>
          <Card className="relative overflow-hidden border-white/10 bg-neutral-900/50">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10" />
            <div className="absolute inset-0">
              <Meteors number={20} />
            </div>

            <CardContent className="p-8 md:p-16 text-center relative z-10">
              <div className="w-20 h-20 mx-auto mb-8 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center rotate-3 hover:rotate-6 transition-transform duration-300 shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                <Mail className="h-10 w-10 text-indigo-400" />
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display text-white">
                Stay Updated with AI News
              </h2>

              <p className="text-neutral-400 mb-10 max-w-lg mx-auto text-lg">
                Get the latest AI insights delivered to your inbox. No spam, just quality content about artificial intelligence.
              </p>

              {status === 'success' ? (
                <div className="p-4 rounded-lg bg-green-500/10 text-green-400 font-medium animate-in fade-in zoom-in border border-green-500/20">
                  Thanks for subscribing! Check your inbox.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 h-12 bg-neutral-950/50 backdrop-blur-sm border-white/10 focus-visible:ring-indigo-500 text-white placeholder:text-neutral-500"
                  />
                  <Button type="submit" disabled={status === 'loading'} size="lg" className="h-12 px-8 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/25">
                    {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </section>
  )
}
