'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Mail } from 'lucide-react'

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
    <section className="py-16">
      <div className="container max-w-4xl">
        <Card className="bg-gradient-to-br from-primary/10 via-background to-blue-500/10 border-primary/20">
          <CardContent className="p-8 md:p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center">
              <Mail className="h-8 w-8 text-primary" />
            </div>

            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Stay Updated with AI News
            </h2>

            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Get the latest AI insights delivered to your inbox. No spam, just quality content about artificial intelligence.
            </p>

            {status === 'success' ? (
              <p className="text-green-600 dark:text-green-400 font-medium">
                Thanks for subscribing! Check your inbox.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1"
                />
                <Button type="submit" disabled={status === 'loading'}>
                  {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
