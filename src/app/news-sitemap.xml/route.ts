import { createClient } from '@/lib/supabase/server'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export async function GET() {
  const supabase = await createClient()

  // Google News sitemap should only include articles from the last 48-72 hours
  const cutoffDate = new Date()
  cutoffDate.setHours(cutoffDate.getHours() - 72)

  const { data: articles } = await supabase
    .from('articles')
    .select('*, category:categories(name)')
    .eq('status', 'published')
    .gte('published_at', cutoffDate.toISOString())
    .order('published_at', { ascending: false })
    .limit(1000) // Google News sitemap max 1000 URLs

  const escapeXml = (str: string) => {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;')
  }

  const newsItems = (articles || [])
    .map((article) => {
      const pubDate = article.published_at
        ? new Date(article.published_at).toISOString()
        : new Date().toISOString()

      return `
  <url>
    <loc>${BASE_URL}/articles/${article.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>AI News</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${pubDate}</news:publication_date>
      <news:title>${escapeXml(article.title)}</news:title>
    </news:news>
    <lastmod>${pubDate}</lastmod>
    <changefreq>hourly</changefreq>
  </url>`
    })
    .join('')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${newsItems}
</urlset>`

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=300, s-maxage=300',
    },
  })
}
