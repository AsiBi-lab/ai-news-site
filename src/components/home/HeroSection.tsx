'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { HeroHighlight, Highlight } from '@/components/ui/hero-highlight'
import { Spotlight } from '@/components/ui/spotlight'

export function HeroSection() {
  return (
    <HeroHighlight containerClassName="h-[40rem] md:h-[50rem]">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm font-medium text-indigo-300 backdrop-blur-md shadow-[0_0_15px_rgba(99,102,241,0.3)]">
            <span className="flex h-2 w-2 rounded-full bg-indigo-400 mr-2 animate-pulse shadow-[0_0_10px_#818cf8]"></span>
            The #1 Source for AI News
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1], delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white max-w-4xl leading-relaxed lg:leading-snug mx-auto font-display mb-8"
        >
          The Future of{' '}
          <Highlight className="text-white">
            Artificial Intelligence
          </Highlight>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1], delay: 0.4 }}
          className="text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Stay ahead of the curve with daily insights, in-depth tutorials, and expert reviews of the latest AI tools.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1], delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <Button asChild size="lg" className="text-lg h-14 px-8 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-[0_0_20px_rgba(79,70,229,0.5)] hover:shadow-[0_0_30px_rgba(79,70,229,0.7)] transition-all duration-300 border border-indigo-500/50">
            <Link href="/articles">Start Reading</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-lg h-14 px-8 rounded-full border-neutral-700 bg-neutral-900/50 hover:bg-neutral-800 text-white backdrop-blur-sm transition-all duration-300">
            <Link href="/tools">Explore Tools</Link>
          </Button>
        </motion.div>
      </div>
    </HeroHighlight>
  )
}
