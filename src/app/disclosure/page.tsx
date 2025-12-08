import { Card, CardContent } from '@/components/ui/card'
import { Heart, DollarSign, Shield, CheckCircle, XCircle, Mail } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Affiliate Disclosure',
  description: 'AI Deck Affiliate Disclosure - Full transparency about how we earn money and our commitment to honest, unbiased reviews.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function DisclosurePage() {
  return (
    <div className="container py-12 md:py-16">
      {/* Hero */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
          <Heart className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Affiliate Disclosure
        </h1>
        <p className="text-lg text-muted-foreground">
          Full transparency about how AI Deck earns money — and why you can trust our recommendations.
        </p>
      </div>

      {/* Our Promise */}
      <Card className="max-w-3xl mx-auto mb-12 bg-gradient-to-br from-green-500/10 via-background to-emerald-500/5 border-green-500/30">
        <CardContent className="p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="h-8 w-8 text-green-500" />
            <h2 className="text-2xl font-bold">Our Editorial Promise</h2>
          </div>
          <p className="text-lg mb-6">
            <strong>Money will never influence our opinions.</strong>
          </p>
          <p className="text-muted-foreground mb-6">
            We built AI Deck to help people find the right AI tools, not to maximize affiliate revenue.
            Our reviews, ratings, and recommendations are based on genuine evaluation — never on who pays us the most.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-green-500/10">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium">What We Promise</p>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                  <li>Honest, unbiased reviews</li>
                  <li>Objective tool comparisons</li>
                  <li>Clear labeling of affiliate links</li>
                  <li>Recommendations based on quality</li>
                </ul>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-red-500/10">
              <XCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium">What We Never Do</p>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                  <li>Accept payment for positive reviews</li>
                  <li>Rank tools based on commission rates</li>
                  <li>Hide negative aspects of tools</li>
                  <li>Recommend tools we dont believe in</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* How We Earn Money */}
      <div className="max-w-3xl mx-auto mb-12">
        <Card>
          <CardContent className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <DollarSign className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-bold">How AI Deck Earns Money</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              Running AI Deck costs money — hosting, development, research, and countless hours of work.
              Here is how we keep the lights on while keeping the service free for you:
            </p>

            <div className="space-y-6">
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold mb-2">1. Affiliate Links</h3>
                <p className="text-muted-foreground text-sm">
                  When you click a link to an AI tool and sign up or make a purchase, we may earn a small commission.
                  This costs you nothing extra — the tool company pays us for referring you.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold mb-2">2. Exclusive Coupons and Deals</h3>
                <p className="text-muted-foreground text-sm">
                  We negotiate special discounts with AI tool companies. When you use our coupon codes,
                  you save money and we may earn a referral fee. Win-win.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-semibold mb-2">3. Display Advertising</h3>
                <p className="text-muted-foreground text-sm">
                  We display clearly labeled advertisements on our site. These are always marked as Ad or Sponsored
                  so you know exactly what is paid content vs. our editorial content.
                </p>
              </div>

              <div className="border-l-4 border-gray-400 pl-4">
                <h3 className="font-semibold mb-2">4. Future: Premium Features</h3>
                <p className="text-muted-foreground text-sm">
                  In the future, we may offer premium features for power users. The core directory and
                  reviews will always remain free.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* How We Review Tools */}
      <div className="max-w-3xl mx-auto mb-12">
        <Card>
          <CardContent className="p-6 md:p-8">
            <h2 className="text-xl font-bold mb-6">How We Evaluate AI Tools</h2>
            <p className="text-muted-foreground mb-6">
              Every tool in our directory goes through the same evaluation process, regardless of whether
              they have an affiliate program:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="font-medium mb-2">Features and Capabilities</p>
                <p className="text-sm text-muted-foreground">What can the tool actually do? Does it deliver on its promises?</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="font-medium mb-2">Ease of Use</p>
                <p className="text-sm text-muted-foreground">How steep is the learning curve? Is it accessible to beginners?</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="font-medium mb-2">Value for Money</p>
                <p className="text-sm text-muted-foreground">Is the pricing fair? Are there good free tiers or alternatives?</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="font-medium mb-2">Privacy and Security</p>
                <p className="text-sm text-muted-foreground">How does the tool handle your data? Is it trustworthy?</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="font-medium mb-2">Customer Support</p>
                <p className="text-sm text-muted-foreground">Is help available when you need it?</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="font-medium mb-2">Real User Feedback</p>
                <p className="text-sm text-muted-foreground">What are actual users saying about the tool?</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* FTC Compliance */}
      <div className="max-w-3xl mx-auto mb-12">
        <Card className="bg-muted/30">
          <CardContent className="p-6 md:p-8">
            <h2 className="text-xl font-bold mb-4">FTC Compliance Statement</h2>
            <p className="text-muted-foreground text-sm">
              In accordance with the Federal Trade Commission guidelines on endorsements and testimonials,
              we disclose that AI Deck may receive compensation for clicks, leads, or sales generated through
              affiliate links on this website. This disclosure applies to all pages on AI Deck.
            </p>
            <p className="text-muted-foreground text-sm mt-4">
              We are committed to transparency and will always clearly identify any sponsored content,
              paid placements, or affiliate relationships. Our editorial opinions remain our own and are
              not influenced by advertisers or affiliate partners.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Your Choice */}
      <div className="max-w-3xl mx-auto mb-12">
        <Card className="bg-gradient-to-br from-primary/5 via-background to-blue-500/5 border-primary/20">
          <CardContent className="p-6 md:p-8">
            <h2 className="text-xl font-bold mb-4">It Is Always Your Choice</h2>
            <p className="text-muted-foreground mb-4">
              You are never obligated to use our affiliate links. If you prefer, you can:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">→</span>
                Search for the tool directly in your browser
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">→</span>
                Use the tool direct website URL
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">→</span>
                Compare with other review sites before deciding
              </li>
            </ul>
            <p className="text-muted-foreground mt-4">
              We appreciate when you use our links (it helps us keep the service free!),
              but we want you to make the choice that is best for you.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Contact */}
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardContent className="p-6 md:p-8">
            <h2 className="text-xl font-bold mb-4">Questions?</h2>
            <p className="text-muted-foreground mb-4">
              If you have any questions about our affiliate relationships or want to know
              whether a specific tool is an affiliate partner, just ask:
            </p>
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              <a href="mailto:transparency@aideck.io" className="text-primary hover:underline">
                transparency@aideck.io
              </a>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Related Links */}
      <div className="max-w-3xl mx-auto mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          See also: <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
          {' | '}
          <a href="/terms" className="text-primary hover:underline">Terms of Service</a>
        </p>
      </div>
    </div>
  )
}
