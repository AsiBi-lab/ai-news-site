import { Card, CardContent } from '@/components/ui/card'
import { HelpCircle, Mail } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about AI Deck - the AI tools discovery platform.',
}

const faqs = [
  {
    question: 'What is AI Deck?',
    answer: 'AI Deck is a comprehensive directory of AI tools, designed to help you find the perfect AI solution for any task. We organize thousands of tools by category, use case, profession, and more - so you can stop endless searching and start building.',
  },
  {
    question: 'Is AI Deck free to use?',
    answer: 'Yes! The core AI Deck experience is completely free. You can browse, search, filter, and compare AI tools without paying anything. In the future, we may offer premium features, but the main directory will always be free.',
  },
  {
    question: 'How do you select which tools to include?',
    answer: 'We continuously research and discover new AI tools. Each tool goes through an evaluation process where we assess its features, usability, pricing, and reliability. We include both well-known tools and hidden gems that might help our users.',
  },
  {
    question: 'Are your reviews honest and unbiased?',
    answer: 'Absolutely. We never accept payment for positive reviews or let affiliate relationships influence our opinions. Our evaluations are based on genuine testing and research. Read our Affiliate Disclosure for full transparency on how we make money.',
  },
  {
    question: 'How do you make money?',
    answer: 'We earn revenue through affiliate links (when you click through and sign up for a tool), display advertising, and exclusive coupon partnerships. None of this ever affects our reviews or recommendations. See our Affiliate Disclosure for complete transparency.',
  },
  {
    question: 'How can I submit an AI tool to be listed?',
    answer: 'We are always looking for great AI tools to add! Send us the tool details at submit@aideck.io and we will review it. Note: We do not guarantee listing, and we do not accept payment for inclusion in our directory.',
  },
  {
    question: 'How often is the directory updated?',
    answer: 'We update our directory regularly - adding new tools, updating information, and removing tools that are no longer available. The AI landscape moves fast, and we work hard to keep up!',
  },
  {
    question: 'Can I trust the pricing information?',
    answer: 'We do our best to keep pricing accurate, but AI tools frequently change their pricing. Always verify current pricing on the official tool website before making a purchase decision.',
  },
  {
    question: 'Do you test every tool personally?',
    answer: 'We aim to test as many tools as possible, but with thousands of AI tools available, we cannot test every single one in depth. Our listings include both tools we have personally tested and tools we have researched thoroughly.',
  },
  {
    question: 'How do I report an error or outdated information?',
    answer: 'We appreciate your help keeping AI Deck accurate! Send corrections to feedback@aideck.io with the tool name and what needs to be updated. We review all feedback and make corrections quickly.',
  },
  {
    question: 'Do you have an API?',
    answer: 'Not currently, but we are considering it for the future. If you are interested in API access for your project, let us know at api@aideck.io.',
  },
  {
    question: 'How can I contact AI Deck?',
    answer: 'You can reach us at hello@aideck.io for general inquiries, submit@aideck.io for tool submissions, and feedback@aideck.io for corrections or suggestions. We try to respond within 48 hours.',
  },
]

export default function FAQPage() {
  return (
    <div className="container py-12 md:py-16">
      {/* Hero */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
          <HelpCircle className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-muted-foreground">
          Everything you need to know about AI Deck
        </p>
      </div>

      {/* FAQ List */}
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-3 flex items-start gap-3">
                <span className="text-primary font-bold shrink-0">Q:</span>
                {faq.question}
              </h2>
              <p className="text-muted-foreground pl-7">
                {faq.answer}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Still have questions */}
      <div className="max-w-3xl mx-auto mt-12">
        <Card className="bg-gradient-to-br from-primary/5 via-background to-blue-500/5 border-primary/20">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-muted-foreground mb-6">
              We are here to help. Reach out and we will get back to you as soon as possible.
            </p>
            <a
              href="mailto:hello@aideck.io"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              <Mail className="h-4 w-4" />
              Contact Us
            </a>
          </CardContent>
        </Card>
      </div>

      {/* Related Links */}
      <div className="max-w-3xl mx-auto mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          See also: <a href="/about" className="text-primary hover:underline">About AI Deck</a>
          {' | '}
          <a href="/disclosure" className="text-primary hover:underline">Affiliate Disclosure</a>
          {' | '}
          <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
        </p>
      </div>
    </div>
  )
}
