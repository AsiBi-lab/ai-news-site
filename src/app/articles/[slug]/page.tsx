import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { RelatedArticles } from '@/components/articles'
import { ShareButtons } from '@/components/shared'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeft } from 'lucide-react'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

interface Props {
  params: Promise<{ slug: string }>
}

// Revalidate every hour
export const revalidate = 3600

async function getArticle(slug: string) {
  const supabase = await createClient()

  const { data } = await supabase
    .from('articles')
    .select('*, category:categories(*)')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  return data
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const article = await getArticle(resolvedParams.slug)
  if (!article) return { title: 'Article Not Found' }

  const canonicalUrl = `${BASE_URL}/articles/${article.slug}`
  const ogImage = article.featured_image || '/og-default.png'

  return {
    title: article.seo_title || article.title,
    description: article.seo_description || article.excerpt,
    authors: [{ name: 'AI News Team' }],
    openGraph: {
      type: 'article',
      url: canonicalUrl,
      title: article.seo_title || article.title,
      description: article.seo_description || article.excerpt || '',
      publishedTime: article.published_at,
      modifiedTime: article.updated_at,
      section: article.category?.name || 'AI News',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.seo_title || article.title,
      description: article.seo_description || article.excerpt || '',
      images: [ogImage],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const resolvedParams = await params
  const article = await getArticle(resolvedParams.slug)
  if (!article) notFound()

  // NewsArticle JSON-LD Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt || '',
    image: article.featured_image ? [article.featured_image] : [],
    datePublished: article.published_at,
    dateModified: article.updated_at || article.published_at,
    author: {
      '@type': 'Organization',
      name: 'AI News',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'NewsMediaOrganization',
      name: 'AI News',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logo.png`,
        width: 512,
        height: 512,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/articles/${article.slug}`,
    },
    articleSection: article.category?.name || 'AI News',
    isAccessibleForFree: true,
  }

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: BASE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Articles',
        item: `${BASE_URL}/articles`,
      },
      ...(article.category
        ? [
            {
              '@type': 'ListItem',
              position: 3,
              name: article.category.name,
              item: `${BASE_URL}/categories/${article.category.slug}`,
            },
            {
              '@type': 'ListItem',
              position: 4,
              name: article.title,
              item: `${BASE_URL}/articles/${article.slug}`,
            },
          ]
        : [
            {
              '@type': 'ListItem',
              position: 3,
              name: article.title,
              item: `${BASE_URL}/articles/${article.slug}`,
            },
          ]),
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <article className="container max-w-4xl py-8">
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/articles">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Articles
        </Link>
      </Button>

      <header className="mb-8">
        {article.category && (
          <Link href={`/categories/${article.category.slug}`}>
            <Badge variant="secondary" className="mb-4 hover:bg-secondary/80">
              {article.category.name}
            </Badge>
          </Link>
        )}

        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
          {article.title}
        </h1>

        {article.excerpt && (
          <p className="text-xl text-muted-foreground mb-4">
            {article.excerpt}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
          {article.published_at && (
            <time>
              {new Date(article.published_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          )}
          {article.ai_generated && (
            <Badge variant="outline" className="text-xs">
              AI Generated
            </Badge>
          )}
        </div>

        <ShareButtons
          url={`${BASE_URL}/articles/${article.slug}`}
          title={article.title}
          description={article.excerpt || undefined}
        />
      </header>

      {article.featured_image && (
        <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
          <Image
            src={article.featured_image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div
        className="prose prose-2xl md:prose-3xl dark:prose-invert max-w-4xl mx-auto text-center prose-headings:font-bold prose-headings:text-center prose-a:text-primary prose-img:rounded-lg prose-p:text-2xl md:prose-p:text-3xl prose-li:text-2xl md:prose-li:text-3xl prose-dd:text-2xl md:prose-dd:text-3xl prose-strong:text-4xl md:prose-strong:text-5xl prose-strong:font-bold prose-ul:list-disc prose-ul:pl-6 prose-ol:list-decimal prose-ol:pl-6"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {article.source_url && (
        <div className="mt-8 pt-8 border-t">
          <p className="text-sm text-muted-foreground">
            Source:{' '}
            <a
              href={article.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {new URL(article.source_url).hostname}
            </a>
          </p>
        </div>
      )}

      <RelatedArticles
        currentArticleId={article.id}
        categoryId={article.category_id}
      />
    </article>
    </>
  )
}
