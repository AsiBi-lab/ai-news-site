# AI Deck - AI Tools Discovery Platform

A modern, SEO-optimized AI tools directory and news site built with Next.js 16, Supabase, and TypeScript.

## Features

- **AI Tools Directory**: Browse and discover AI tools organized by category
- **News & Articles**: Stay updated with the latest AI news and tutorials
- **Newsletter**: Subscribe for AI news updates
- **SEO Optimized**: Full SEO support with dynamic metadata, sitemaps, and structured data
- **GDPR Compliant**: Cookie consent and privacy policy included
- **Secure**: Rate limiting, CSRF protection, XSS prevention, CSP headers

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Testing**: [Vitest](https://vitest.dev/) + Testing Library
- **Deployment**: [Vercel](https://vercel.com/)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-org/ai-news-site.git
cd ai-news-site
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your `.env.local`:
```env
# Supabase (Required)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Rate Limiting (Optional - uses in-memory fallback if not set)
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm test` | Run tests |
| `npm run test:ui` | Run tests with UI |
| `npm run test:coverage` | Run tests with coverage |

## Project Structure

```
ai-news-site/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── api/            # API routes
│   │   ├── articles/       # Article pages
│   │   ├── categories/     # Category pages
│   │   ├── tools/          # AI tools pages
│   │   └── ...
│   ├── components/         # React components
│   │   ├── articles/       # Article components
│   │   ├── layout/         # Layout components
│   │   ├── tools/          # Tool components
│   │   └── ui/             # shadcn/ui components
│   ├── lib/                # Utilities and helpers
│   │   ├── supabase/       # Supabase clients
│   │   ├── rate-limit.ts   # Rate limiting
│   │   ├── csrf-protection.ts
│   │   └── ...
│   └── test/               # Test setup
├── public/                 # Static assets
└── ...
```

## Security Features

| Feature | Implementation |
|---------|---------------|
| **XSS Protection** | DOMPurify sanitization |
| **CSRF Protection** | Origin header validation |
| **Rate Limiting** | Upstash Redis / In-memory fallback |
| **CSP Headers** | Nonce-based Content Security Policy |
| **Input Validation** | Email, query validation |
| **Error Handling** | Sanitized error messages in production |

## SEO Features

- Dynamic metadata for all pages
- XML Sitemaps (`/sitemap.xml`, `/news-sitemap.xml`)
- RSS Feed (`/feed.xml`)
- Robots.txt with AI bot rules
- Structured data (NewsArticle, Organization, BreadcrumbList)
- Open Graph and Twitter Card support

## Testing

Run the test suite:
```bash
# Run all tests
npm test

# Run with UI
npm run test:ui

# Run with coverage
npm run test:coverage
```

Current test coverage: **75 tests passing**

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### Manual Deployment

```bash
npm run build
npm start
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/search` | GET | Search articles and tools |
| `/api/newsletter` | POST | Subscribe to newsletter |
| `/api/og` | GET | Dynamic OG images |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `npm test`
5. Submit a pull request

## License

MIT

## Audit Reports

- [Security Audit](./FINAL_SECURITY_AUDIT_REPORT.md)
- [Dependency Audit](./DEPENDENCY_AUDIT.md)
- [Performance Audit](./PERFORMANCE_AND_QUALITY_AUDIT.md)
- [Code Quality](./CODE_QUALITY_SCAN.md)

---

Built with by AI Deck Team
