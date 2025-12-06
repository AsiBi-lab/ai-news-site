import { HeroSection, FeaturedArticles, CategoryGrid, Newsletter } from '@/components/home'

// Revalidate every 5 minutes for fresh content
export const revalidate = 300

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedArticles />
      <CategoryGrid />
      <Newsletter />
    </>
  )
}
