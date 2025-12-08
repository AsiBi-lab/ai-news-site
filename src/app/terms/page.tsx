import { Card, CardContent } from '@/components/ui/card'
import { FileText, AlertTriangle, Scale, Shield, RefreshCw, Mail } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'AI Deck Terms of Service - The rules and guidelines for using our AI tools directory.',
  robots: {
    index: true,
    follow: true,
  },
}

const sections = [
  {
    id: 'acceptance',
    icon: FileText,
    title: 'Acceptance of Terms',
    content: `By accessing and using AI Deck ("the Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the Service.

These Terms apply to all visitors, users, and others who access or use the Service.

**Who We Are:**
AI Deck is an online directory and discovery platform for artificial intelligence tools. We help users find, compare, and learn about AI tools for various purposes.`,
  },
  {
    id: 'service-description',
    icon: Scale,
    title: 'Description of Service',
    content: `AI Deck provides:

**Free Services:**
- AI tool directory with search and filtering
- Tool comparisons and information
- Educational content about AI tools
- Newsletter with AI updates

**What We Are NOT:**
- We are not the creators or owners of the AI tools listed
- We do not guarantee the accuracy of tool information
- We do not provide the tools themselves, only information about them
- We are not responsible for any tool's functionality, pricing, or availability

**Third-Party Tools:**
All AI tools listed on AI Deck are owned and operated by their respective companies. We provide links and information as a convenience. Your use of any third-party tool is subject to that tool's own terms and conditions.`,
  },
  {
    id: 'user-responsibilities',
    icon: Shield,
    title: 'User Responsibilities',
    content: `When using AI Deck, you agree to:

**Do:**
- Use the Service for lawful purposes only
- Provide accurate information when signing up for our newsletter
- Respect intellectual property rights
- Report any errors or issues you find

**Do Not:**
- Attempt to access restricted areas of the Service
- Use automated systems (bots, scrapers) without permission
- Interfere with the Service's security or functionality
- Reproduce, duplicate, or copy content for commercial purposes
- Impersonate others or provide false information
- Use the Service to promote illegal activities

**Account Termination:**
We reserve the right to terminate or restrict access to users who violate these Terms.`,
  },
  {
    id: 'disclaimers',
    icon: AlertTriangle,
    title: 'Disclaimers & Limitations',
    content: `**Information Accuracy:**
While we strive for accuracy, AI Deck does not guarantee that:
- Tool information is complete, current, or accurate
- Tool pricing or features are up to date
- Reviews or ratings reflect current tool quality
- Tools will meet your specific needs

**"As Is" Service:**
The Service is provided "AS IS" and "AS AVAILABLE" without warranties of any kind, either express or implied, including but not limited to:
- Merchantability
- Fitness for a particular purpose
- Non-infringement
- Availability or reliability

**Limitation of Liability:**
To the maximum extent permitted by law, AI Deck and its operators shall not be liable for:
- Any indirect, incidental, special, or consequential damages
- Loss of profits, data, or business opportunities
- Damages resulting from your use of any third-party tools
- Any amount exceeding $100 USD

**Your Responsibility:**
You are solely responsible for evaluating any AI tool before use. Always review a tool's own terms, privacy policy, and security practices before providing any data or making purchases.`,
  },
  {
    id: 'intellectual-property',
    icon: FileText,
    title: 'Intellectual Property',
    content: `**Our Content:**
The AI Deck website, including its design, text, graphics, and code, is owned by AI Deck and protected by intellectual property laws.

**Tool Listings:**
- Tool names, logos, and trademarks belong to their respective owners
- We display this information for informational purposes only
- If you believe we're infringing on your intellectual property, contact us

**Your Content:**
If you submit content (e.g., tool suggestions, feedback), you grant AI Deck a non-exclusive, royalty-free license to use, modify, and display that content in connection with the Service.

**Fair Use:**
You may share links to AI Deck content and quote brief excerpts for non-commercial purposes with attribution.`,
  },
  {
    id: 'affiliate-disclosure',
    icon: Scale,
    title: 'Affiliate Relationships',
    content: `**Transparency:**
AI Deck may earn commissions through affiliate links to some tools. This is how we support the free service.

**Our Promise:**
- Affiliate relationships NEVER influence our editorial content
- We don't accept payment for positive reviews
- Tool rankings and comparisons are based on objective criteria
- All sponsored content is clearly labeled

**Your Choice:**
You are never obligated to use our affiliate links. Direct links to tools are always available.

For full details, see our [Affiliate Disclosure](/disclosure).`,
  },
  {
    id: 'changes',
    icon: RefreshCw,
    title: 'Changes to Terms',
    content: `**Updates:**
We may update these Terms from time to time. When we do:
- The "Last updated" date will be revised
- Material changes will be announced on the website
- Continued use after changes constitutes acceptance

**Notification:**
For significant changes, we'll provide notice through:
- A banner on the website
- Email to newsletter subscribers (for major changes)

**Your Options:**
If you disagree with updated Terms, your remedy is to stop using the Service.`,
  },
  {
    id: 'governing-law',
    icon: Scale,
    title: 'Governing Law & Disputes',
    content: `**Jurisdiction:**
These Terms are governed by the laws of [Your Jurisdiction], without regard to conflict of law principles.

**Dispute Resolution:**
Before pursuing legal action, you agree to:
1. Contact us at legal@aideck.io to attempt resolution
2. Allow 30 days for us to respond and attempt to resolve the issue
3. Consider mediation or arbitration as alternatives to litigation

**Class Action Waiver:**
To the extent permitted by law, you agree to resolve disputes individually and waive any right to participate in class actions.

**Severability:**
If any provision of these Terms is found unenforceable, the remaining provisions will continue in effect.`,
  },
]

export default function TermsPage() {
  return (
    <div className="container py-12 md:py-16">
      {/* Hero */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
          <FileText className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Terms of Service
        </h1>
        <p className="text-lg text-muted-foreground">
          The rules and guidelines for using AI Deck.
        </p>
        <p className="text-sm text-muted-foreground mt-4">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </div>

      {/* Quick Summary */}
      <Card className="max-w-3xl mx-auto mb-12 bg-gradient-to-br from-blue-500/10 via-background to-primary/5 border-blue-500/20">
        <CardContent className="p-6 md:p-8">
          <h2 className="text-xl font-bold mb-4">The Short Version</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              AI Deck is a free directory to help you discover AI tools
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              We provide information, not the actual tools themselves
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              Always review a tool&apos;s own terms before using it
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              We may earn affiliate commissions (but stay objective)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              Use the site lawfully and don&apos;t scrape our content
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
                      if (line.match(/^\d+\./)) {
                        return <p key={j} className="ml-4">{line}</p>
                      }
                      // Handle links
                      if (line.includes('[') && line.includes('](/')) {
                        const parts = line.split(/\[([^\]]+)\]\(([^)]+)\)/)
                        return (
                          <p key={j}>
                            {parts.map((part, k) => {
                              if (k % 3 === 1) {
                                return <a key={k} href={parts[k + 1]} className="text-primary hover:underline">{part}</a>
                              }
                              if (k % 3 === 2) return null
                              return part
                            })}
                          </p>
                        )
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

      {/* Contact */}
      <div className="max-w-3xl mx-auto mt-12">
        <Card className="bg-gradient-to-br from-primary/5 via-background to-blue-500/5 border-primary/20">
          <CardContent className="p-6 md:p-8">
            <h2 className="text-xl font-bold mb-4">Questions About These Terms?</h2>
            <p className="text-muted-foreground mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:legal@aideck.io" className="text-primary hover:underline">
                  legal@aideck.io
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Related Links */}
      <div className="max-w-3xl mx-auto mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          See also: <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
          {' • '}
          <a href="/disclosure" className="text-primary hover:underline">Affiliate Disclosure</a>
        </p>
      </div>
    </div>
  )
}
