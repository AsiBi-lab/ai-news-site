'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Meteors } from '@/components/ui/meteors'
import type { Article, Category } from '@/types/database'

interface FeaturedArticlesClientProps {
    articles: (Article & { category: Category | null })[]
}

export function FeaturedArticlesClient({ articles }: FeaturedArticlesClientProps) {
    if (!articles || articles.length === 0) {
        return (
            <section className="py-16 md:py-24 bg-neutral-950">
                <div className="container">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 font-display text-white">Featured Articles</h2>
                    <div className="glass-card p-8 rounded-xl text-center border-neutral-800">
                        <p className="text-muted-foreground">No featured articles yet. Check back soon!</p>
                    </div>
                </div>
            </section>
        )
    }

    const mainArticle = articles[0]
    const sideArticles = articles.slice(1, 3)

    return (
        <section className="py-16 md:py-24 bg-neutral-950 relative overflow-hidden">
            <div className="container relative z-10">
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold font-display text-white">Featured Articles</h2>
                    <Button asChild variant="ghost" className="group text-neutral-400 hover:text-white hover:bg-white/10">
                        <Link href="/articles" className="flex items-center gap-2">
                            View All <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Hero Article */}
                    <Link href={`/articles/${mainArticle.slug}`} className="lg:col-span-2 group relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                        <div className="relative h-full min-h-[500px] rounded-3xl overflow-hidden border border-white/10 bg-neutral-900/50 shadow-2xl transition-transform duration-300 group-hover:scale-[1.01]">
                            {mainArticle.featured_image && (
                                <div className="absolute inset-0">
                                    <Image
                                        src={mainArticle.featured_image}
                                        alt={mainArticle.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />
                                </div>
                            )}

                            <div className="absolute inset-0">
                                <Meteors number={20} />
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 z-20">
                                {mainArticle.category && (
                                    <Badge className="mb-4 bg-indigo-500/20 text-indigo-300 border-indigo-500/30 backdrop-blur-md">
                                        {mainArticle.category.name}
                                    </Badge>
                                )}
                                <h3 className="text-3xl md:text-5xl font-bold mb-4 text-white group-hover:text-indigo-300 transition-colors font-display leading-tight">
                                    {mainArticle.title}
                                </h3>
                                <p className="text-neutral-300 line-clamp-2 md:text-lg max-w-2xl mb-6">
                                    {mainArticle.excerpt}
                                </p>
                                <div className="flex items-center text-sm text-neutral-400 font-medium">
                                    Read Article <ArrowRight className="ml-2 w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Side Articles */}
                    <div className="flex flex-col gap-6">
                        {sideArticles.map((article) => (
                            <Link key={article.id} href={`/articles/${article.slug}`} className="flex-1 group relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 transform scale-[0.80] rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                                <Card className="h-full border-white/10 bg-neutral-900/50 overflow-hidden hover:border-indigo-500/50 transition-colors duration-300 relative z-10">
                                    <div className="flex h-full flex-col">
                                        {article.featured_image && (
                                            <div className="relative h-48 w-full shrink-0 overflow-hidden">
                                                <Image
                                                    src={article.featured_image}
                                                    alt={article.title}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent opacity-60" />
                                            </div>
                                        )}
                                        <CardHeader className="flex-1 p-6">
                                            {article.category && (
                                                <div className="mb-2">
                                                    <span className="text-xs font-bold tracking-wider text-indigo-400 uppercase">
                                                        {article.category.name}
                                                    </span>
                                                </div>
                                            )}
                                            <h3 className="font-bold text-xl mb-3 text-white group-hover:text-indigo-300 transition-colors font-display line-clamp-2">
                                                {article.title}
                                            </h3>
                                            <p className="text-sm text-neutral-400 line-clamp-2">
                                                {article.excerpt}
                                            </p>
                                        </CardHeader>
                                    </div>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
