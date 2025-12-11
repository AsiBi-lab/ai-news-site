/**
 * SEO Schema Implementation Examples for Next.js 15
 *
 * This file demonstrates how to implement the JSON-LD schemas from seo-schemas.json
 * in Next.js 15 with App Router.
 *
 * Location: Create lib/seo/schemas.ts in your project
 */

import type { Article, AITool, Category } from '@/types/database';

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

interface ArticleSchema {
  '@context': string;
  '@type': 'Article' | 'NewsArticle' | 'TechArticle';
  headline: string;
  description: string;
  image: {
    '@type': string;
    url: string;
    width: number;
    height: number;
  };
  datePublished: string;
  dateModified: string;
  author: {
    '@type': string;
    name: string;
  };
  publisher: {
    '@type': string;
    name: string;
    logo: {
      '@type': string;
      url: string;
      width: number;
      height: number;
    };
  };
}

interface BreadcrumbItem {
  '@type': 'ListItem';
  position: number;
  name: string;
  item?: string;
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Renders JSON-LD schema as a script tag
 * Use in page.tsx or layout.tsx
 */
export function JsonLd({ data }: { data: Record<string, any> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// =============================================================================
// WEBSITE SCHEMA (Homepage & Global Layout)
// =============================================================================

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AI Deck',
    alternateName: 'AI Deck - AI Tools Directory',
    url: 'https://aideck.io',
    description: 'Discover and compare the best AI tools. Professional reviews, ratings, and news about artificial intelligence tools and technologies.',
    inLanguage: 'en-US',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://aideck.io/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: 'AI Deck',
      logo: {
        '@type': 'ImageObject',
        url: 'https://aideck.io/logo.png',
        width: 600,
        height: 60,
      },
    },
  };
}

// =============================================================================
// ORGANIZATION SCHEMA (Homepage & About)
// =============================================================================

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AI Deck',
    legalName: 'AI Deck',
    url: 'https://aideck.io',
    logo: {
      '@type': 'ImageObject',
      url: 'https://aideck.io/logo.png',
      width: 600,
      height: 60,
      caption: 'AI Deck Logo',
    },
    description: 'Professional AI tools directory and news platform. We help businesses and professionals discover, compare, and choose the right AI tools.',
    foundingDate: '2025',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'contact@aideck.io',
      availableLanguage: ['English'],
    },
    sameAs: [
      'https://twitter.com/aideck',
      'https://linkedin.com/company/aideck',
      'https://facebook.com/aideck',
    ],
  };
}

// =============================================================================
// ARTICLE SCHEMA (Blog Posts & News Articles)
// =============================================================================

export function generateArticleSchema(article: Article) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://aideck.io/articles/${article.slug}`,
    },
    headline: article.title,
    description: article.excerpt || article.seo_description,
    image: {
      '@type': 'ImageObject',
      url: article.featured_image || 'https://aideck.io/default-og.png',
      width: 1200,
      height: 675,
    },
    datePublished: article.published_at || article.created_at,
    dateModified: article.updated_at || article.created_at,
    author: {
      '@type': 'Person',
      name: 'AI Deck Editorial Team',
      url: 'https://aideck.io/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'AI Deck',
      logo: {
        '@type': 'ImageObject',
        url: 'https://aideck.io/logo.png',
        width: 600,
        height: 60,
      },
    },
    articleSection: article.category?.name || 'AI News',
    keywords: article.tags?.map((t: any) => t.name).join(', ') || '',
    wordCount: article.content?.split(/\s+/).length || 0,
    inLanguage: 'en-US',
  };
}

// =============================================================================
// BREADCRUMB SCHEMA (All Pages)
// =============================================================================

export function generateBreadcrumbSchema(items: Array<{ name: string; url?: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url && { item: item.url }),
    })),
  };
}

/**
 * Example usage:
 *
 * // For article page: Home > Articles > Category > Article Title
 * generateBreadcrumbSchema([
 *   { name: 'Home', url: 'https://aideck.io' },
 *   { name: 'Articles', url: 'https://aideck.io/articles' },
 *   { name: 'AI Writing Tools', url: 'https://aideck.io/categories/ai-writing' },
 *   { name: 'Best AI Writing Tools 2025' }, // Last item has no URL
 * ]);
 */

// =============================================================================
// SOFTWARE APPLICATION SCHEMA (AI Tool Pages)
// =============================================================================

export function generateSoftwareSchema(tool: AITool) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description,
    url: `https://aideck.io/tools/${tool.slug}`,
    applicationCategory: tool.category || 'AI Tools',
    operatingSystem: 'Web, Windows, macOS, Linux, iOS, Android',
  };

  // Add image if available
  if (tool.logo_url) {
    schema.image = {
      '@type': 'ImageObject',
      url: tool.logo_url,
      width: 400,
      height: 400,
    };
  }

  // Add rating if available
  if (tool.rating && tool.rating > 0) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: tool.rating,
      bestRating: 5,
      worstRating: 1,
    };
  }

  // Add features if available
  if (tool.features && Array.isArray(tool.features)) {
    schema.featureList = tool.features;
  }

  // Add pricing if available
  if (tool.pricing) {
    schema.offers = {
      '@type': 'Offer',
      price: tool.pricing === 'Free' ? '0' : tool.pricing,
      priceCurrency: 'USD',
    };
  }

  // Add pros/cons as review notes
  if (tool.pros && tool.pros.length > 0) {
    schema.positiveNotes = {
      '@type': 'ItemList',
      itemListElement: tool.pros,
    };
  }

  if (tool.cons && tool.cons.length > 0) {
    schema.negativeNotes = {
      '@type': 'ItemList',
      itemListElement: tool.cons,
    };
  }

  return schema;
}

// =============================================================================
// FAQ SCHEMA (FAQ Pages)
// =============================================================================

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// =============================================================================
// ITEM LIST SCHEMA (Category Pages, Search Results)
// =============================================================================

export function generateItemListSchema(
  items: Array<{ name: string; url: string; description?: string; image?: string }>,
  listTitle: string,
  listDescription?: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: listTitle,
    description: listDescription,
    numberOfItems: items.length,
    itemListOrder: 'https://schema.org/ItemListOrderDescending',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Thing',
        name: item.name,
        url: item.url,
        ...(item.description && { description: item.description }),
        ...(item.image && { image: item.image }),
      },
    })),
  };
}

// =============================================================================
// COLLECTION PAGE SCHEMA (Category Pages)
// =============================================================================

export function generateCollectionPageSchema(
  category: Category,
  itemsCount: number
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category.name} - AI Tools`,
    description: category.description,
    url: `https://aideck.io/categories/${category.slug}`,
    breadcrumb: generateBreadcrumbSchema([
      { name: 'Home', url: 'https://aideck.io' },
      { name: category.name },
    ]),
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: itemsCount,
    },
  };
}

// =============================================================================
// NEXT.JS 15 IMPLEMENTATION EXAMPLES
// =============================================================================

/**
 * Example 1: Homepage (app/page.tsx)
 */
export function HomepageSchemas() {
  return (
    <>
      <JsonLd data={generateWebsiteSchema()} />
      <JsonLd data={generateOrganizationSchema()} />
    </>
  );
}

/**
 * Example 2: Article Page (app/articles/[slug]/page.tsx)
 */
export function ArticlePageSchemas({ article }: { article: Article }) {
  const breadcrumbs = [
    { name: 'Home', url: 'https://aideck.io' },
    { name: 'Articles', url: 'https://aideck.io/articles' },
    { name: article.category?.name || 'Uncategorized', url: `https://aideck.io/categories/${article.category?.slug}` },
    { name: article.title },
  ];

  return (
    <>
      <JsonLd data={generateArticleSchema(article)} />
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
    </>
  );
}

/**
 * Example 3: AI Tool Page (app/tools/[slug]/page.tsx)
 */
export function ToolPageSchemas({ tool }: { tool: AITool }) {
  const breadcrumbs = [
    { name: 'Home', url: 'https://aideck.io' },
    { name: 'AI Tools', url: 'https://aideck.io/tools' },
    { name: tool.category || 'Tools', url: `https://aideck.io/tools?category=${tool.category}` },
    { name: tool.name },
  ];

  return (
    <>
      <JsonLd data={generateSoftwareSchema(tool)} />
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
    </>
  );
}

/**
 * Example 4: Category Page (app/categories/[slug]/page.tsx)
 */
export function CategoryPageSchemas({
  category,
  tools
}: {
  category: Category;
  tools: AITool[]
}) {
  const items = tools.map(tool => ({
    name: tool.name,
    url: `https://aideck.io/tools/${tool.slug}`,
    description: tool.description,
    image: tool.logo_url,
  }));

  return (
    <>
      <JsonLd data={generateCollectionPageSchema(category, tools.length)} />
      <JsonLd data={generateItemListSchema(items, `${category.name} Tools`, category.description)} />
    </>
  );
}

// =============================================================================
// METADATA API INTEGRATION (Next.js 15)
// =============================================================================

/**
 * Example: generateMetadata with JSON-LD
 *
 * In app/articles/[slug]/page.tsx:
 */
export async function generateArticleMetadata(article: Article) {
  return {
    title: article.seo_title || article.title,
    description: article.seo_description || article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.published_at,
      modifiedTime: article.updated_at,
      authors: ['AI Deck Editorial Team'],
      images: [
        {
          url: article.featured_image || 'https://aideck.io/default-og.png',
          width: 1200,
          height: 675,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.featured_image || 'https://aideck.io/default-og.png'],
    },
  };
}

// =============================================================================
// USAGE IN PAGE COMPONENTS
// =============================================================================

/**
 * Full Example: Article Page Component
 *
 * // app/articles/[slug]/page.tsx
 *
 * import { generateArticleMetadata } from '@/lib/seo/schemas';
 * import { ArticlePageSchemas } from '@/lib/seo/schemas';
 *
 * export async function generateMetadata({ params }) {
 *   const article = await getArticle(params.slug);
 *   return generateArticleMetadata(article);
 * }
 *
 * export default async function ArticlePage({ params }) {
 *   const article = await getArticle(params.slug);
 *
 *   return (
 *     <>
 *       <ArticlePageSchemas article={article} />
 *       <article>
 *         <h1>{article.title}</h1>
 *         <div dangerouslySetInnerHTML={{ __html: article.content }} />
 *       </article>
 *     </>
 *   );
 * }
 */

// =============================================================================
// VALIDATION & TESTING
// =============================================================================

/**
 * After implementing schemas:
 *
 * 1. Build your Next.js app: npm run build
 * 2. Start production server: npm start
 * 3. Test with Google Rich Results Test:
 *    https://search.google.com/test/rich-results
 * 4. Validate with Schema.org validator:
 *    https://validator.schema.org/
 * 5. Check in Google Search Console after deployment
 */

// =============================================================================
// BEST PRACTICES
// =============================================================================

/**
 * 1. Always generate schemas server-side (avoid client-side generation)
 * 2. Include multiple schemas per page (e.g., Article + Breadcrumb)
 * 3. Keep headline under 110 characters for better SERP display
 * 4. Use high-quality images (1200x675px for articles)
 * 5. Include dateModified whenever content is updated
 * 6. Validate all schemas before production deployment
 * 7. Monitor performance in Google Search Console
 * 8. Update schemas when Schema.org vocabulary changes
 */

export default {
  generateWebsiteSchema,
  generateOrganizationSchema,
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateSoftwareSchema,
  generateFAQSchema,
  generateItemListSchema,
  generateCollectionPageSchema,
  JsonLd,
};
