import { createClient } from '@/lib/supabase/server'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { Newspaper, BookOpen, Star, Building2 } from 'lucide-react'

const categoryIcons: Record<string, React.ReactNode> = {
  'ai-news': <Newspaper className="h-6 w-6" />,
  'tutorials': <BookOpen className="h-6 w-6" />,
  'reviews': <Star className="h-6 w-6" />,
  'industry': <Building2 className="h-6 w-6" />,
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
    <section className="py-16 md:py-24 relative bg-neutral-950/50">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center font-display text-white">
          Explore by Category
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/categories/${category.slug}`}>
              <Card className="group h-full border-white/10 bg-neutral-900/50 hover:bg-neutral-800/80 hover:border-indigo-500/50 transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardContent className="p-6 flex flex-col items-center text-center h-full justify-center relative z-10">
                  <div className="w-16 h-16 mb-6 rounded-2xl bg-neutral-800 border border-white/5 flex items-center justify-center text-indigo-400 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-indigo-500/20 group-hover:text-indigo-300 transition-all duration-300 shadow-lg">
                    {categoryIcons[category.slug] || <Newspaper className="h-8 w-8" />}
                  </div>
                  <h3 className="font-bold text-xl mb-2 text-white group-hover:text-indigo-300 transition-colors font-display">
                    {category.name}
                  </h3>
                  {category.description && (
                    <p className="text-sm text-neutral-400 line-clamp-2 group-hover:text-neutral-300 transition-colors">
                      {category.description}
                    </p>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
