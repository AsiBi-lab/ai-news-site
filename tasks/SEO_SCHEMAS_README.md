# SEO Schema Implementation Guide

**Created:** 2025-12-10
**For:** AI Deck (aideck.io)
**Purpose:** Professional JSON-LD structured data for SEO optimization

---

## Files in This Directory

### 1. `seo-schemas.json` - Schema Templates
**Type:** JSON (production-ready templates)
**Size:** ~15KB
**Contains:**
- 11 complete Schema.org JSON-LD templates
- Implementation guide for Next.js 15
- Complete placeholder reference
- Validation instructions
- Best practices documentation

**Schemas Included:**
1. **WebSite** - Homepage with SearchAction
2. **Organization** - Company info with social profiles
3. **Article** - Blog posts and content
4. **NewsArticle** - Time-sensitive news
5. **BreadcrumbList** - Navigation breadcrumbs
6. **SoftwareApplication** - AI tool pages
7. **FAQPage** - FAQ sections
8. **ItemList** - Category and listing pages
9. **CollectionPage** - Category archives
10. **TechArticle** - Technical tutorials
11. **Review** - Tool reviews

### 2. `seo-schemas-implementation-example.ts` - TypeScript Implementation
**Type:** TypeScript (copy-paste ready code)
**Size:** ~12KB
**Contains:**
- TypeScript helper functions for all schema types
- Type definitions
- Next.js 15 integration examples
- Full page component examples
- Metadata API integration
- Validation instructions

---

## Quick Start

### Step 1: Copy the Implementation File
```bash
# From project root
cp tasks/seo-schemas-implementation-example.ts src/lib/seo/schemas.ts
```

### Step 2: Update Your Types
Make sure you have proper types for `Article`, `AITool`, `Category` in `src/types/database.ts`

### Step 3: Add to Homepage
```tsx
// src/app/page.tsx
import { JsonLd, generateWebsiteSchema, generateOrganizationSchema } from '@/lib/seo/schemas';

export default function HomePage() {
  return (
    <>
      <JsonLd data={generateWebsiteSchema()} />
      <JsonLd data={generateOrganizationSchema()} />
      <main>
        {/* Your homepage content */}
      </main>
    </>
  );
}
```

### Step 4: Add to Article Pages
```tsx
// src/app/articles/[slug]/page.tsx
import { JsonLd, generateArticleSchema, generateBreadcrumbSchema } from '@/lib/seo/schemas';

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);

  const breadcrumbs = [
    { name: 'Home', url: 'https://aideck.io' },
    { name: 'Articles', url: 'https://aideck.io/articles' },
    { name: article.title },
  ];

  return (
    <>
      <JsonLd data={generateArticleSchema(article)} />
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <article>
        <h1>{article.title}</h1>
        {/* Article content */}
      </article>
    </>
  );
}
```

### Step 5: Add to Tool Pages
```tsx
// src/app/tools/[slug]/page.tsx
import { JsonLd, generateSoftwareSchema, generateBreadcrumbSchema } from '@/lib/seo/schemas';

export default async function ToolPage({ params }: { params: { slug: string } }) {
  const tool = await getTool(params.slug);

  const breadcrumbs = [
    { name: 'Home', url: 'https://aideck.io' },
    { name: 'AI Tools', url: 'https://aideck.io/tools' },
    { name: tool.name },
  ];

  return (
    <>
      <JsonLd data={generateSoftwareSchema(tool)} />
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <div>
        <h1>{tool.name}</h1>
        {/* Tool details */}
      </div>
    </>
  );
}
```

---

## Testing & Validation

### Before Deployment
```bash
# Build the project
npm run build

# Start production server
npm start

# Test a page
curl http://localhost:3000 | grep 'application/ld+json'
```

### Online Validation Tools

1. **Google Rich Results Test** (Primary)
   - URL: https://search.google.com/test/rich-results
   - Tests: Article, Breadcrumb, FAQ, Organization
   - Use this FIRST before deployment

2. **Schema.org Validator** (Secondary)
   - URL: https://validator.schema.org/
   - Tests: All schema types
   - Use for comprehensive validation

3. **Google Search Console** (Post-deployment)
   - Monitor "Enhancements" section
   - Check for structured data errors
   - View rich results performance

### Testing Checklist
- [ ] Homepage has WebSite + Organization schemas
- [ ] Article pages have Article + Breadcrumb schemas
- [ ] Tool pages have SoftwareApplication + Breadcrumb schemas
- [ ] Category pages have CollectionPage + ItemList schemas
- [ ] All schemas pass Google Rich Results Test
- [ ] No validation errors in Schema.org Validator
- [ ] Images are proper size (1200x675 for articles, 400x400 for tools)
- [ ] Dates are in ISO 8601 format
- [ ] All required fields are populated

---

## Schema Priority by Page Type

### Homepage
**Priority 1:** Required
- `WebSite` (with SearchAction)
- `Organization`

### Article Pages
**Priority 1:** Required
- `Article` or `NewsArticle`
- `BreadcrumbList`

**Priority 2:** Optional
- `Organization` (if first visit)

### AI Tool Pages
**Priority 1:** Required
- `SoftwareApplication`
- `BreadcrumbList`

**Priority 2:** Optional (if available)
- `Review` (if you have user reviews)
- `FAQPage` (if tool page has FAQ section)

### Category Pages
**Priority 1:** Required
- `CollectionPage`
- `ItemList`
- `BreadcrumbList`

### About Page
**Priority 1:** Required
- `Organization`

---

## Common Pitfalls to Avoid

### 1. Missing Required Fields
```typescript
// ❌ WRONG - Missing publisher
{
  '@type': 'Article',
  headline: 'My Article',
  // Missing: datePublished, author, publisher, image
}

// ✅ CORRECT - All required fields
{
  '@type': 'Article',
  headline: 'My Article',
  datePublished: '2025-12-10T10:00:00Z',
  author: { '@type': 'Person', name: 'John Doe' },
  publisher: { '@type': 'Organization', name: 'AI Deck', logo: {...} },
  image: { '@type': 'ImageObject', url: '...', width: 1200, height: 675 }
}
```

### 2. Incorrect Date Format
```typescript
// ❌ WRONG
datePublished: '12/10/2025' // US format
datePublished: '2025-12-10' // Missing time

// ✅ CORRECT
datePublished: '2025-12-10T10:00:00Z' // ISO 8601 with timezone
datePublished: article.published_at // Supabase returns ISO format
```

### 3. Invalid Image Dimensions
```typescript
// ❌ WRONG - Too small or wrong aspect ratio
image: { url: 'logo.png', width: 100, height: 100 }

// ✅ CORRECT - Proper size for articles
image: { url: 'featured.jpg', width: 1200, height: 675 }
```

### 4. Headline Too Long
```typescript
// ❌ WRONG - Over 110 characters (Google truncates)
headline: 'This is an extremely long headline that exceeds the recommended character limit for SEO and will be truncated in search results'

// ✅ CORRECT - Under 110 characters
headline: 'Best AI Writing Tools 2025: Complete Guide'
```

### 5. Multiple Schemas Not Combined
```typescript
// ❌ WRONG - Separate scripts overwrite each other
<script type="application/ld+json">{articleSchema}</script>
<script type="application/ld+json">{breadcrumbSchema}</script>

// ✅ CORRECT - Use JsonLd component multiple times (it works!)
<JsonLd data={articleSchema} />
<JsonLd data={breadcrumbSchema} />
// Next.js renders both correctly
```

---

## Performance Notes

### Impact on Page Load
- **Size:** ~1-3KB per schema (minified JSON)
- **Rendering:** Server-side (no client-side JS)
- **HTTP/2:** Minimal impact with compression
- **Core Web Vitals:** No impact on LCP, FID, CLS

### Optimization Tips
1. **Cache schema generation** for static content
2. **Generate server-side** (already done in Next.js App Router)
3. **Minify JSON** in production (Next.js does this automatically)
4. **Use CDN URLs** for images (absolute URLs required anyway)

---

## Maintenance Schedule

### Monthly
- [ ] Check Google Search Console for structured data errors
- [ ] Verify rich snippets are appearing in search results
- [ ] Review click-through rates for pages with rich snippets

### Quarterly
- [ ] Update social profile URLs if changed
- [ ] Review Schema.org updates for new vocabulary
- [ ] Run validation on sample pages
- [ ] Update placeholder data in templates if needed

### Annually
- [ ] Full audit of all schema implementations
- [ ] Compare with competitors' structured data
- [ ] Update to latest Schema.org versions

---

## Support & Resources

### Official Documentation
- **Schema.org:** https://schema.org/
- **Google Search Central:** https://developers.google.com/search/docs/appearance/structured-data
- **Next.js Metadata:** https://nextjs.org/docs/app/api-reference/functions/generate-metadata

### Testing Tools
- **Rich Results Test:** https://search.google.com/test/rich-results
- **Schema Markup Validator:** https://validator.schema.org/
- **Google Search Console:** https://search.google.com/search-console

### AI Deck Specific
- **Main Templates:** `tasks/seo-schemas.json`
- **Implementation:** `src/lib/seo/schemas.ts` (after copying from tasks/)
- **Types:** `src/types/database.ts`

---

## Questions?

If you're implementing Phase 5 (SEO) of the comprehensive audit:
1. Read `tasks/COMPREHENSIVE_SITE_AUDIT_PROMPT.md` for context
2. Check `tasks/audit-reports/README.md` for status
3. Reference this file for all schema implementations
4. Create `tasks/audit-reports/05-seo.md` with your findings

---

**Document Version:** 1.0
**Last Updated:** 2025-12-10
**Author:** SEO Structure Architect Specialist
**Status:** Production Ready
