import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-blue-500/5" />

      {/* Animated shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            The Future of{' '}
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Artificial Intelligence
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Stay ahead with the latest AI news, tutorials, and tool reviews.
            Your daily dose of machine learning insights.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/articles">Browse Articles</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/tools">Explore AI Tools</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
