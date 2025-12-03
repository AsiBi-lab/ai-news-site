import { Card, CardContent } from '@/components/ui/card'
import { Newspaper, Cpu, Users, Zap } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us - AI News',
  description: 'Learn about AI News - your daily source for artificial intelligence news, tutorials, and tool reviews.',
}

const features = [
  {
    icon: Newspaper,
    title: 'Daily AI News',
    description: 'Stay updated with the latest developments in artificial intelligence, machine learning, and deep learning.',
  },
  {
    icon: Cpu,
    title: 'Tool Reviews',
    description: 'In-depth reviews and comparisons of AI tools to help you choose the right solutions for your needs.',
  },
  {
    icon: Users,
    title: 'Community Driven',
    description: 'Built for the AI community, featuring content that matters to developers, researchers, and enthusiasts.',
  },
  {
    icon: Zap,
    title: 'AI-Powered',
    description: 'Some of our content is generated and curated using AI, reviewed by humans for quality.',
  },
]

export default function AboutPage() {
  return (
    <div className="container py-12 md:py-16">
      {/* Hero */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          About{' '}
          <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            AI News
          </span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Your trusted source for artificial intelligence news, insights, and tool reviews.
          We help you stay ahead in the rapidly evolving world of AI.
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {features.map((feature) => (
          <Card key={feature.title} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mission */}
      <div className="max-w-3xl mx-auto">
        <Card className="bg-gradient-to-br from-primary/5 via-background to-blue-500/5 border-primary/20">
          <CardContent className="p-8 md:p-12">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground mb-4">
              AI News was created to democratize access to AI knowledge. We believe that everyone
              should be able to understand and benefit from artificial intelligence, regardless
              of their technical background.
            </p>
            <p className="text-muted-foreground">
              Our team combines AI-powered content generation with human curation to bring you
              the most relevant and accurate information about the AI landscape. From breaking
              news to in-depth tutorials, we&apos;ve got you covered.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
