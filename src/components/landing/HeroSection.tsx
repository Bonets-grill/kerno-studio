'use client'

import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import Typewriter from './Typewriter'
import { useI18n } from '@/lib/i18n/context'

const ParticleField = dynamic(() => import('./ParticleField'), { ssr: false })

export default function HeroSection() {
  const { t } = useI18n()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleField />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 mb-8">
            <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
            <span className="text-sm text-neon-cyan">{t.hero_badge}</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] mb-6"
        >
          <Typewriter />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10 font-[family-name:var(--font-inter)]"
        >
          {t.hero_description}{' '}
          <span className="text-foreground font-medium">{t.hero_description_free}</span>.{' '}
          Sistemas, apps, SaaS y{' '}
          <span className="text-neon-green font-medium">presentaciones premium con IA</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#chat"
            className="group px-8 py-4 rounded-full bg-gradient-to-r from-neon-cyan to-neon-green text-black font-semibold text-lg hover:opacity-90 transition-all glow-box-cyan"
          >
            {t.hero_cta_primary}
            <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">
              &rarr;
            </span>
          </a>
          <a
            href="#proceso"
            className="px-8 py-4 rounded-full border border-border text-foreground font-medium text-lg hover:border-neon-cyan/50 hover:bg-neon-cyan/5 transition-all"
          >
            {t.hero_cta_secondary}
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto"
        >
          {[
            { value: t.hero_stat_prototype, label: t.hero_stat_prototype_label },
            { value: t.hero_stat_ai, label: t.hero_stat_ai_label },
            { value: t.hero_stat_price, label: t.hero_stat_price_label },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</div>
              <div className="text-xs text-muted mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-border flex items-start justify-center p-1.5"
        >
          <div className="w-1.5 h-3 rounded-full bg-neon-cyan" />
        </motion.div>
      </motion.div>
    </section>
  )
}
