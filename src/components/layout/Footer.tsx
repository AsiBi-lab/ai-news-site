import Link from 'next/link'

const footerLinks = {
  content: [
    { href: '/articles', label: 'Articles' },
    { href: '/tools', label: 'AI Tools' },
    { href: '/about', label: 'About' },
  ],
  categories: [
    { href: '/categories/ai-news', label: 'AI News' },
    { href: '/categories/tutorials', label: 'Tutorials' },
    { href: '/categories/reviews', label: 'Reviews' },
  ],
  social: [
    { href: 'https://twitter.com', label: 'Twitter' },
    { href: 'https://github.com', label: 'GitHub' },
    { href: 'https://linkedin.com', label: 'LinkedIn' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-neutral-950">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group w-fit">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors border border-indigo-500/20">
                <span className="text-lg font-bold text-indigo-400">AI</span>
              </div>
              <span className="text-xl font-bold font-display text-white group-hover:text-indigo-300 transition-colors">
                News
              </span>
            </Link>
            <p className="text-sm text-neutral-400 max-w-xs">
              Your daily source for AI news, tutorials, and tool reviews. Stay ahead of the curve.
            </p>
          </div>

          {/* Content */}
          <div>
            <h4 className="font-bold mb-4 font-display text-white">Content</h4>
            <ul className="space-y-3">
              {footerLinks.content.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 hover:text-indigo-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold mb-4 font-display text-white">Categories</h4>
            <ul className="space-y-3">
              {footerLinks.categories.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 hover:text-indigo-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold mb-4 font-display text-white">Follow Us</h4>
            <ul className="space-y-3">
              {footerLinks.social.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-neutral-400 hover:text-indigo-300 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-neutral-500">
          <p>© {new Date().getFullYear()} AI News. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
