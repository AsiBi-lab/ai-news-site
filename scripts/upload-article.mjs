import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { marked } from 'marked'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Load environment variables
dotenv.config({ path: '.env.local' })

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('❌ Error: Missing environment variables.')
    console.error('   Please ensure .env.local contains NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY')
    process.exit(1)
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Initialize Supabase Admin Client
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
)

// Read markdown file
const mdPath = path.join(__dirname, '..', '..', 'tasks', 'REVIEW_NANO_BANANA_PRO.md')
try {
    if (!fs.existsSync(mdPath)) {
        throw new Error(`Markdown file not found at: ${mdPath}`)
    }
} catch (e) {
    console.error(e.message)
    process.exit(1)
}

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
    // category_id should ideally be fetched dynamically, but keeping as string for now
    category_id: '4074f06a-2adf-4b57-a920-6c30ea6fb203',
    seo_title: 'Nano Banana Pro Review 2025: Google\'s Best AI Image Generator',
    seo_description: 'Complete review of Nano Banana Pro (Gemini 3 Pro Image) - 4K resolution, accurate text, search grounding. Compared to Flux 2, Reve Image, Seedream 4.0.',
    featured_image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop',
}

async function upload() {
    console.log('🚀 Uploading article via Admin API...')

    const { data, error } = await supabase
        .from('articles')
        .insert(article)
        .select()
        .single()

    if (error) {
        console.error('❌ Error uploading article:', error.message)
        return null
    }

    console.log('✅ Article created successfully!')
    console.log('   ID:', data.id)
    console.log('   Slug:', data.slug)
    return data
}

upload()
