import { marked } from 'marked'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Read markdown file
const mdPath = path.join(__dirname, '..', '..', 'tasks', 'REVIEW_SANER_AI.md')
const markdown = fs.readFileSync(mdPath, 'utf-8')

// Remove YAML frontmatter
const contentWithoutFrontmatter = markdown.replace(/^---[\s\S]*?---\n*/, '')

// Configure marked for better HTML output
marked.setOptions({
  gfm: true,
  breaks: false,
})

// Convert to HTML
let html = marked.parse(contentWithoutFrontmatter)

// Tool marker is already in the article content at the right place

// Add lead class to first paragraph (the tagline)
html = html.replace(
  /<p><em>A deep dive into the productivity tool/,
  '<p class="lead"><em>A deep dive into the productivity tool'
)

const article = {
  title: 'Saner.AI Review 2025: AI Assistant Built for ADHD Brains',
  slug: 'saner-ai-review-2025',
  excerpt: 'Saner.AI review: AI assistant built for ADHD brains. Features, $8-20 pricing, pros/cons, vs Motion & Notion AI. Is it worth it?',
  content: html,
  status: 'published',
  published_at: new Date().toISOString(),
  ai_generated: false,
  category_id: '4074f06a-2adf-4b57-a920-6c30ea6fb203', // Reviews category
  seo_title: 'Saner.AI Review 2025: AI Assistant Built for ADHD Brains',
  seo_description: 'Saner.AI review: AI assistant built for ADHD brains. Features, $8-20 pricing, pros/cons, vs Motion & Notion AI. Is it worth it?',
  featured_image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&h=630&fit=crop', // Brain/productivity themed image
}

import { config } from 'dotenv'
config({ path: '.env.local' })

const SUPABASE_URL = 'https://pqzkhatmoomleandvbov.supabase.co'
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

async function upload() {
  console.log('Uploading Saner.AI review article...\n')

  const response = await fetch(`${SUPABASE_URL}/rest/v1/articles`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_SERVICE_KEY,
      'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
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

  console.log('Article created successfully!')
  console.log('ID:', result[0]?.id)
  console.log('Slug:', result[0]?.slug)
  console.log('\nView at: https://your-site.com/articles/' + result[0]?.slug)
  return result[0]
}

upload()
