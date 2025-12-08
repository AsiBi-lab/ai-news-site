import { Card, CardContent } from '@/components/ui/card'
import { Shield, Eye, Database, Globe, Clock, Mail } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'AI Deck Privacy Policy - Learn how we collect, use, and protect your personal data in compliance with GDPR.',
  robots: {
    index: true,
    follow: true,
  },
}

const sections = [
  {
    id: 'data-collection',
    icon: Database,
    title: 'Data We Collect',
    content: `We collect minimal data necessary to provide our services:

**Automatically Collected:**
- Browser type and version
- Device type (desktop/mobile)
- Pages visited and time spent
- Referring website
- Anonymous usage analytics via Vercel Analytics

**Voluntarily Provided:**
- Email address (newsletter signup only)
- Search queries (not linked to identity)

**We Do NOT Collect:**
- Names or personal identifiers (unless you provide them)
- Payment information (we don't sell anything yet)
- Location data beyond country-level
- Social media profiles`,
  },
  {
    id: 'how-we-use',
    icon: Eye,
    title: 'How We Use Your Data',
    content: `We use collected data for the following purposes:

**Analytics & Improvement:**
- Understand which tools and content are most useful
- Improve site performance and user experience
- Identify and fix technical issues

**Communication:**
- Send newsletter updates (only if you subscribed)
- Respond to your inquiries

**Legal Basis (GDPR Article 6):**
- Consent: Newsletter subscription
- Legitimate Interest: Analytics and site improvement
- Contract: Providing our directory services`,
  },
  {
    id: 'third-parties',
    icon: Globe,
    title: 'Third-Party Services',
    content: `We use trusted third-party services:

**Vercel** (Hosting & Analytics)
- Hosts our website
- Provides anonymous analytics
- Privacy: vercel.com/legal/privacy-policy

**Supabase** (Database)
- Stores tool directory data
- Processes newsletter signups
- GDPR compliant, EU data residency available
- Privacy: supabase.com/privacy

**We do NOT:**
- Sell your data to third parties
- Share personal data with advertisers
- Use tracking pixels from social networks`,
  },
  {
    id: 'cookies',
    icon: Shield,
    title: 'Cookies & Tracking',
    content: `**Essential Cookies:**
- Theme preference (light/dark mode)
- Cookie consent choice

**Analytics Cookies:**
- Vercel Analytics (anonymous, privacy-focused)
- No personal identifiers stored

**We do NOT use:**
- Third-party advertising cookies
- Social media tracking cookies
- Cross-site tracking

You can manage cookie preferences through your browser settings or our cookie banner.`,
  },
  {
    id: 'retention',
    icon: Clock,
    title: 'Data Retention',
    content: `We retain data only as long as necessary:

| Data Type | Retention Period |
|-----------|------------------|
| Analytics data | 26 months |
| Newsletter emails | Until unsubscribed |
| Search queries | 30 days (anonymized) |
| Cookie preferences | 1 year |

After these periods, data is automatically deleted or anonymized.`,
  },
  {
    id: 'your-rights',
    icon: Mail,
    title: 'Your Rights (GDPR)',
    content: `Under GDPR, you have the following rights:

**Right to Access** (Art. 15)
Request a copy of your personal data

**Right to Rectification** (Art. 16)
Correct inaccurate personal data

**Right to Erasure** (Art. 17)
Request deletion of your data ("Right to be Forgotten")

**Right to Restrict Processing** (Art. 18)
Limit how we use your data

**Right to Data Portability** (Art. 20)
Receive your data in a portable format

**Right to Object** (Art. 21)
Object to processing based on legitimate interests

**Right to Withdraw Consent**
Withdraw consent at any time (newsletter, cookies)

To exercise any right, contact us at: **privacy@aideck.io**
We will respond within 30 days.`,
  },
]

export default function PrivacyPage() {
  return (
    <div className="container py-12 md:py-16">
      {/* Hero */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
          <Shield className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Privacy Policy
        </h1>
        <p className="text-lg text-muted-foreground">
          Your privacy matters. Here&apos;s exactly how we handle your data.
        </p>
        <p className="text-sm text-muted-foreground mt-4">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </div>

      {/* Quick Summary */}
      <Card className="max-w-3xl mx-auto mb-12 bg-gradient-to-br from-green-500/10 via-background to-primary/5 border-green-500/20">
        <CardContent className="p-6 md:p-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="text-2xl">TL;DR</span>
          </h2>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              We collect minimal, anonymous analytics to improve the site
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              We only store your email if you subscribe to our newsletter
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              We never sell your data to anyone
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              You can request deletion of your data anytime
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              We&apos;re GDPR compliant
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Table of Contents */}
      <nav className="max-w-3xl mx-auto mb-12">
        <Card>
          <CardContent className="p-6">
            <h2 className="font-semibold mb-4">Contents</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {sections.map((section, index) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {index + 1}. {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </nav>

      {/* Sections */}
      <div className="max-w-3xl mx-auto space-y-8">
        {sections.map((section, index) => (
          <Card key={section.id} id={section.id} className="scroll-mt-24">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <section.icon className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold">
                  {index + 1}. {section.title}
                </h2>
              </div>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                {section.content.split('\n\n').map((paragraph, i) => (
                  <div key={i} className="mb-4 text-muted-foreground whitespace-pre-line">
                    {paragraph.split('\n').map((line, j) => {
                      if (line.startsWith('**') && line.endsWith('**')) {
                        return <p key={j} className="font-semibold text-foreground mt-4 mb-2">{line.replace(/\*\*/g, '')}</p>
                      }
                      if (line.startsWith('- ')) {
                        return <p key={j} className="ml-4">• {line.substring(2)}</p>
                      }
                      if (line.startsWith('|')) {
                        return null // Skip table syntax for now
                      }
                      return <p key={j}>{line}</p>
                    })}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Contact & Updates */}
      <div className="max-w-3xl mx-auto mt-12">
        <Card className="bg-gradient-to-br from-primary/5 via-background to-blue-500/5 border-primary/20">
          <CardContent className="p-6 md:p-8">
            <h2 className="text-xl font-bold mb-4">Questions or Concerns?</h2>
            <p className="text-muted-foreground mb-4">
              If you have any questions about this Privacy Policy or want to exercise your rights,
              please contact us:
            </p>
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:privacy@aideck.io" className="text-primary hover:underline">
                  privacy@aideck.io
                </a>
              </p>
            </div>
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground">
                <strong>Policy Updates:</strong> We may update this policy occasionally.
                Significant changes will be announced on our website. Continued use of AI Deck
                after changes constitutes acceptance of the updated policy.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Legal Footer */}
      <div className="max-w-3xl mx-auto mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          This Privacy Policy complies with the General Data Protection Regulation (GDPR)
          and applies to all users of AI Deck regardless of location.
        </p>
      </div>
    </div>
  )
}
