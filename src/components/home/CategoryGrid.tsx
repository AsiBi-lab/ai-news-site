import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Newspaper, BookOpen, Star, Building2, Layers } from 'lucide-react'

const categoryIcons: Record<string, React.ReactNode> = {
  'ai-news': <Newspaper className="h-5 w-5" />,
  'tutorials': <BookOpen className="h-5 w-5" />,
  'reviews': <Star className="h-5 w-5" />,
  'industry': <Building2 className="h-5 w-5" />,
}

export async function CategoryGrid() {
  const supabase = await createClient()

  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('name')

  if (!categories || categories.length === 0) {
    return null
  }

  return (
    <section className="py-20 border-y border-border/50 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Layers className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary">Categories</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold">
            Explore by Topic
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group relative p-6 rounded-xl border border-border/50 bg-background hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {categoryIcons[category.slug] || <Newspaper className="h-5 w-5" />}
                </div>
              </div>
              <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                {category.name}
              </h3>
              {category.description && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {category.description}
                </p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
