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
    <section className="py-16">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          Explore by Category
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link key={category.id} href={`/categories/${category.slug}`}>
              <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary/50">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {categoryIcons[category.slug] || <Newspaper className="h-6 w-6" />}
                  </div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  {category.description && (
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
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
