import { marked } from 'marked'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Read markdown file
const mdPath = path.join(__dirname, '..', '..', 'tasks', 'REVIEW_NANO_BANANA_PRO.md')
const markdown = fs.readFileSync(mdPath, 'utf-8')

// Configure marked for better HTML output
marked.setOptions({
  gfm: true,
  breaks: false,
})

// Convert to HTML
let html = marked.parse(markdown)

// Add tool marker after "The 30-Second Version" section (before "Wait, What's...")
html = html.replace(
  /<h2[^>]*>Wait, What/,
  '<!-- tool:nano-banana-pro type:featured -->\n\n<h2>Wait, What'
)

// Add lead class to first paragraph
html = html.replace(
  /<p>I&#39;ll be honest/,
  '<p class="lead">I\'ll be honest'
)

const article = {
  title: 'Nano Banana Pro: Google Just Made Every Other AI Image Generator Look Outdated',
  slug: 'nano-banana-pro-review-2025',
  excerpt: 'The weirdly-named tool that\'s quietly becoming the best image AI on the planet. A deep dive into Google\'s latest image generation model.',
  content: html,
  status: 'published',
  published_at: new Date().toISOString(),
  ai_generated: false,
  category_id: '4074f06a-2adf-4b57-a920-6c30ea6fb203',
  seo_title: 'Nano Banana Pro Review 2025: Google\'s Best AI Image Generator',
  seo_description: 'Complete review of Nano Banana Pro (Gemini 3 Pro Image) - 4K resolution, accurate text, search grounding. Compared to Flux 2, Reve Image, Seedream 4.0.',
  featured_image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop',
}

const SUPABASE_URL = 'https://pqzkhatmoomleandvbov.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxemtoYXRtb29tbGVhbmR2Ym92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2OTg4MTgsImV4cCI6MjA4MDI3NDgxOH0.w-v4K6t7GT4N-5mVQ6HH4AmtR6kXwelWUxJi3EuFe0A'

async function upload() {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/articles`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation',
    },
    body: JSON.stringify(article),
  })

  const result = await response.json()

  if (!response.ok) {
    console.error('Error:', result)
    return null
  }

  console.log('Article created:', result[0]?.id)
  console.log('Slug:', result[0]?.slug)
  return result[0]
}

upload()
