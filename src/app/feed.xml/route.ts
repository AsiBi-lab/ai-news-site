import { createClient } from '@/lib/supabase/server'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export async function GET() {
  const supabase = await createClient()

  const { data: articles } = await supabase
    .from('articles')
    .select('*, category:categories(name)')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(50)

  const escapeXml = (str: string) => {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;')
  }

  const rssItems = (articles || [])
    .map((article) => {
      const pubDate = article.published_at
        ? new Date(article.published_at).toUTCString()
        : new Date().toUTCString()

      return `
    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${BASE_URL}/articles/${article.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/articles/${article.slug}</guid>
      <description>${escapeXml(article.excerpt || '')}</description>
      <pubDate>${pubDate}</pubDate>
      ${article.category ? `<category>${escapeXml(article.category.name)}</category>` : ''}
      <author>news@ainews.com (AI News Team)</author>
    </item>`
    })
    .join('')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>AI News - Latest in Artificial Intelligence</title>
    <link>${BASE_URL}</link>
    <description>Your trusted source for AI news, breakthroughs, tutorials, and tool reviews. Stay ahead with daily updates on artificial intelligence.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${BASE_URL}/logo.png</url>
      <title>AI News</title>
      <link>${BASE_URL}</link>
    </image>
    ${rssItems}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=300, s-maxage=300',
    },
  })
}
