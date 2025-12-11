'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { containerVariants, itemVariants, statVariants, EASE_SMOOTH } from '@/lib/animations/variants'

const stats = [
  { number: '500+', label: 'Curated Tools' },
  { number: '50K+', label: 'Happy Users' },
  { number: '4.9', label: 'Avg Rating' },
  { number: '<30s', label: 'To Find Your Tool' },
]

const trustedBy = ['Google', 'Microsoft', 'Shopify', 'Stripe', 'Notion', 'Figma']

export function HeroSection() {
  return (
    <section className="relative z-10 py-20 px-6">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Tagline */}
        <motion.div variants={itemVariants}>
          <p className="text-sm font-medium tracking-genesis text-genesis-muted uppercase mb-6">
            STOP WASTING TIME ON AI TOOL RESEARCH
          </p>
        </motion.div>

        {/* 3D Title with pulse effect */}
        <motion.h1
          variants={itemVariants}
          className="mb-4"
        >
          <motion.span
            className="title-3d inline-block"
            animate={{
              filter: [
                'drop-shadow(0 4px 15px rgba(107, 140, 206, 0.3))',
                'drop-shadow(0 4px 25px rgba(200, 139, 168, 0.4))',
                'drop-shadow(0 4px 15px rgba(107, 140, 206, 0.3))',
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            AI DECK
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-2xl md:text-3xl text-genesis mb-6 font-medium leading-tight"
        >
          Find the Perfect AI Tool
          <br />
          <span className="text-genesis-muted font-light">in Under 30 Seconds</span>
        </motion.p>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-base text-genesis-muted max-w-lg mx-auto mb-8 leading-relaxed font-light"
        >
          500+ hand-curated tools, rated by experts. Not just another list —
          personalized recommendations based on your actual needs.
        </motion.p>

        {/* CTA */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center gap-4"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15 }}
          >
            <Link
              href="/tools"
              className="btn-genesis font-semibold px-10 py-4 rounded-full text-lg inline-flex items-center gap-3 group"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Find My AI Tool</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
          <motion.p
            className="text-genesis-muted text-sm font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            Free forever - No signup required
          </motion.p>
        </motion.div>

        {/* Trusted By */}
        <motion.div
          variants={itemVariants}
          className="mt-16"
        >
          <p className="text-genesis-muted text-xs uppercase tracking-wider mb-4">Trusted by teams at</p>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {trustedBy.map((company, index) => (
              <motion.span
                key={company}
                className="text-genesis font-semibold text-sm opacity-60 hover:opacity-100 transition-opacity duration-300 cursor-default"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.6, y: 0 }}
                whileHover={{ opacity: 1, scale: 1.1 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.4 }}
              >
                {company}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        className="max-w-4xl mx-auto mt-16 px-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6, ease: EASE_SMOOTH }}
      >
        <div className="card-genesis rounded-3xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center group cursor-default"
                variants={statVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 1 + index * 0.15 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="stat-number"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + index * 0.15, duration: 0.5, type: 'spring', stiffness: 200 }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-genesis-muted text-sm font-medium mt-1 group-hover:text-genesis transition-colors duration-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
