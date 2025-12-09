import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Search, Zap, Shield, Heart, Target, Clock } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'AI Deck - Your shortcut to the perfect AI tool. We help you discover, compare, and choose from thousands of AI tools without the endless searching.',
}

const problems = [
  {
    icon: Clock,
    problem: 'Hours of searching',
    solution: 'Find the right tool in seconds',
  },
  {
    icon: Search,
    problem: 'Scattered information',
    solution: 'Everything in one place',
  },
  {
    icon: Target,
    problem: 'Wrong tool choices',
    solution: 'Filter by your exact needs',
  },
]

const values = [
  {
    icon: Shield,
    title: 'Honest Reviews',
    description: 'We never accept payment for positive reviews. Our opinions are always based on real evaluation, not affiliate commissions.',
  },
  {
    icon: Zap,
    title: 'Save Your Time',
    description: 'Life is too short for endless Google searches. We organize thousands of AI tools so you can find what you need instantly.',
  },
  {
    icon: Search,
    title: 'Every Use Case',
    description: 'Whether you are a developer, marketer, designer, writer, or just curious - we have filters for your specific needs.',
  },
  {
    icon: Heart,
    title: 'Free Forever',
    description: 'The core AI Deck experience will always be free. We believe everyone deserves access to AI tool discovery.',
  },
]

export default function AboutPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Your Shortcut to the{' '}
          <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Perfect AI Tool
          </span>
        </h1>
        <p className="text-xl text-muted-foreground">
          Stop wasting hours searching. Start building with the right AI tools.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">The Problem We Solve</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((item) => (
            <Card key={item.problem} className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-6 w-6 text-red-500" />
                </div>
                <p className="text-muted-foreground line-through mb-2">{item.problem}</p>
                <p className="font-semibold text-green-600 dark:text-green-400">{item.solution}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="max-w-3xl mx-auto mb-16">
        <Card className="bg-gradient-to-br from-primary/5 via-background to-blue-500/5 border-primary/20">
          <CardContent className="p-8 md:p-12">
            <h2 className="text-2xl font-bold mb-6">What is AI Deck?</h2>
            <p className="text-muted-foreground mb-4">
              AI Deck is a comprehensive directory of AI tools, organized by purpose, profession, category, and use case.
              Think of it as your personal deck of cards - each card is an AI tool ready to help you solve a specific problem.
            </p>
            <p className="text-muted-foreground mb-4">
              With thousands of AI tools launching every month, it is impossible to keep track of what is available.
              We do the research so you do not have to. Our team continuously discovers, evaluates, and categorizes
              AI tools so you can find exactly what you need in seconds.
            </p>
            <p className="text-muted-foreground">
              Whether you are looking for an AI writing assistant, image generator, code helper, productivity booster,
              or something completely unique - AI Deck helps you find it.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">What We Stand For</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {values.map((value) => (
            <Card key={value.title} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="max-w-3xl mx-auto mb-16">
        <Card className="bg-gradient-to-br from-purple-500/10 via-background to-pink-500/5 border-purple-500/20">
          <CardContent className="p-8 md:p-12">
            <h2 className="text-2xl font-bold mb-6">Our Vision</h2>
            <p className="text-muted-foreground mb-4">
              We believe AI should be accessible to everyone - not just tech experts.
              Our mission is to democratize AI discovery, making it easy for anyone to find
              the tools that can transform their work and life.
            </p>
            <p className="text-muted-foreground">
              AI Deck is just the beginning. We are building a complete ecosystem to help you
              navigate the AI revolution. Stay tuned for what is coming next.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Find Your Perfect AI Tool?</h2>
        <p className="text-muted-foreground mb-6">
          Start exploring thousands of AI tools, filtered by exactly what you need.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/tools"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            Browse AI Tools
          </Link>
          <Link
            href="/categories"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            Explore Categories
          </Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto mt-16 pt-8 border-t border-border text-center">
        <p className="text-sm text-muted-foreground">
          Questions? Check our <Link href="/faq" className="text-primary hover:underline">FAQ</Link>
          {' | '}
          Read our <Link href="/disclosure" className="text-primary hover:underline">Affiliate Disclosure</Link>
          {' | '}
          Contact: <a href="mailto:hello@aideck.io" className="text-primary hover:underline">hello@aideck.io</a>
        </p>
      </div>
    </div>
  )
}
