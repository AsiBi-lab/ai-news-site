# SEO Schema Cheat Sheet - AI Deck

Quick reference for implementing JSON-LD schemas on AI Deck.

---

## Page Type → Schema Mapping

| Page Type | Required Schemas | Optional Schemas |
|-----------|-----------------|------------------|
| **Homepage** | WebSite + Organization | - |
| **Article** | Article + Breadcrumb | Organization |
| **AI Tool** | SoftwareApplication + Breadcrumb | Review, FAQ |
| **Category** | CollectionPage + ItemList + Breadcrumb | - |
| **About** | Organization | - |
| **Search Results** | ItemList | - |

---

## Quick Copy-Paste Examples

### Homepage (app/page.tsx)
```tsx
import { JsonLd, generateWebsiteSchema, generateOrganizationSchema } from '@/lib/seo/schemas';

export default function HomePage() {
  return (
    <>
      <JsonLd data={generateWebsiteSchema()} />
      <JsonLd data={generateOrganizationSchema()} />
      <main>{/* content */}</main>
    </>
  );
}
```

### Article Page (app/articles/[slug]/page.tsx)
```tsx
import { JsonLd, generateArticleSchema, generateBreadcrumbSchema } from '@/lib/seo/schemas';

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);

  return (
    <>
      <JsonLd data={generateArticleSchema(article)} />
      <JsonLd data={generateBreadcrumbSchema([
        { name: 'Home', url: 'https://aideck.io' },
        { name: 'Articles', url: 'https://aideck.io/articles' },
        { name: article.title }
      ])} />
      <article>{/* content */}</article>
    </>
  );
}
```

### Tool Page (app/tools/[slug]/page.tsx)
```tsx
import { JsonLd, generateSoftwareSchema, generateBreadcrumbSchema } from '@/lib/seo/schemas';

export default async function ToolPage({ params }: { params: { slug: string } }) {
  const tool = await getTool(params.slug);

  return (
    <>
      <JsonLd data={generateSoftwareSchema(tool)} />
      <JsonLd data={generateBreadcrumbSchema([
        { name: 'Home', url: 'https://aideck.io' },
        { name: 'AI Tools', url: 'https://aideck.io/tools' },
        { name: tool.name }
      ])} />
      <div>{/* content */}</div>
    </>
  );
}
```

### Category Page (app/categories/[slug]/page.tsx)
```tsx
import { JsonLd, generateCollectionPageSchema, generateItemListSchema, generateBreadcrumbSchema } from '@/lib/seo/schemas';

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const category = await getCategory(params.slug);
  const tools = await getToolsByCategory(category.id);

  const items = tools.map(t => ({
    name: t.name,
    url: `https://aideck.io/tools/${t.slug}`,
    description: t.description,
    image: t.logo_url
  }));

  return (
    <>
      <JsonLd data={generateCollectionPageSchema(category, tools.length)} />
      <JsonLd data={generateItemListSchema(items, `${category.name} Tools`)} />
      <JsonLd data={generateBreadcrumbSchema([
        { name: 'Home', url: 'https://aideck.io' },
        { name: category.name }
      ])} />
      <div>{/* content */}</div>
    </>
  );
}
```

---

## Required Field Checklist

### Article Schema
- ✅ headline (max 110 chars)
- ✅ datePublished (ISO 8601)
- ✅ dateModified (ISO 8601)
- ✅ author (Person with name)
- ✅ publisher (Organization with logo)
- ✅ image (1200x675px)

### SoftwareApplication Schema
- ✅ name
- ✅ description
- ✅ applicationCategory
- ✅ operatingSystem
- ⚠️ aggregateRating (if you have ratings)
- ⚠️ offers (if you have pricing)

### Breadcrumb Schema
- ✅ itemListElement array
- ✅ Each item: position, name
- ✅ Last item: no URL (current page)

---

## Date Format (ISO 8601)

```typescript
// ✅ CORRECT
"2025-12-10T10:30:00Z"
"2025-12-10T10:30:00+00:00"
article.published_at // Supabase returns ISO format

// ❌ WRONG
"12/10/2025"
"2025-12-10"
"Dec 10, 2025"
```

---

## Image Specifications

| Schema Type | Recommended Size | Aspect Ratio |
|-------------|-----------------|--------------|
| Article | 1200 x 675px | 16:9 |
| Tool Logo | 400 x 400px | 1:1 |
| Organization Logo | 600 x 60px | 10:1 |

---

## Validation Commands

```bash
# Test locally
npm run build && npm start
curl http://localhost:3000 | grep 'application/ld+json'

# Validate online
# 1. https://search.google.com/test/rich-results
# 2. https://validator.schema.org/
```

---

## Common Errors & Fixes

### Error: "Missing required field: publisher.logo"
```typescript
// Add logo to publisher
publisher: {
  '@type': 'Organization',
  name: 'AI Deck',
  logo: {
    '@type': 'ImageObject',
    url: 'https://aideck.io/logo.png',
    width: 600,
    height: 60
  }
}
```

### Error: "Invalid date format"
```typescript
// Use ISO 8601
datePublished: new Date(article.published_at).toISOString()
// or
datePublished: article.published_at // If Supabase
```

### Error: "Headline too long"
```typescript
// Truncate to 110 chars
headline: article.title.slice(0, 110)
```

---

## Testing Checklist

- [ ] Run `npm run build` (no errors)
- [ ] View page source, find `<script type="application/ld+json">`
- [ ] Copy JSON, paste into https://validator.schema.org/
- [ ] Test URL in https://search.google.com/test/rich-results
- [ ] Check Google Search Console (after deployment)

---

## Performance Tips

- Generate schemas server-side (already done in Next.js App Router)
- Cache schema generation for static content
- ~1-3KB per schema (negligible impact)
- No effect on Core Web Vitals

---

## Priority Implementation Order

1. **Homepage** (WebSite + Organization) - 10 minutes
2. **Article pages** (Article + Breadcrumb) - 15 minutes
3. **Tool pages** (SoftwareApplication + Breadcrumb) - 15 minutes
4. **Category pages** (CollectionPage + ItemList) - 20 minutes
5. **About page** (Organization) - 5 minutes

**Total estimated time:** ~1 hour

---

## Resources

- **Templates:** `/tasks/seo-schemas.json`
- **Implementation:** `/tasks/seo-schemas-implementation-example.ts`
- **Full Guide:** `/tasks/SEO_SCHEMAS_README.md`

---

**Quick Reference Version 1.0**
**Last Updated:** 2025-12-10
