'use client'

import { motion } from 'framer-motion'
import { useI18n } from '@/lib/i18n/context'

const cards = [
  {
    icon: '🎯',
    titleKey: 'pres_pitch' as const,
    desc: 'Para inversores y stakeholders. Problema, solución, mercado, tracción, finanzas y ask.',
    color: 'from-purple-500/20 to-purple-600/5',
    border: 'border-purple-500/20 hover:border-purple-500/40',
  },
  {
    icon: '🎓',
    titleKey: 'pres_school' as const,
    desc: 'Para escuela y universidad. Investigación, datos, análisis, conclusiones y referencias.',
    color: 'from-blue-500/20 to-blue-600/5',
    border: 'border-blue-500/20 hover:border-blue-500/40',
  },
  {
    icon: '💼',
    titleKey: 'pres_proposal' as const,
    desc: 'Para clientes. Alcance, entregables, timeline, inversión, equipo y próximos pasos.',
    color: 'from-neon-cyan/20 to-neon-green/5',
    border: 'border-neon-cyan/20 hover:border-neon-cyan/40',
  },
]

export default function PresentationsSection() {
  const { t } = useI18n()

  return (
    <section id="presentaciones" className="py-24 px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-radial from-neon-cyan/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-neon-green/10 text-neon-green border border-neon-green/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
            Nuevo
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t.pres_title.split(' ').slice(0, -2).join(' ')}{' '}
            <span className="gradient-text">{t.pres_title.split(' ').slice(-2).join(' ')}</span>
          </h2>
          <p className="text-lg text-muted max-w-xl mx-auto">
            {t.pres_subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {cards.map((card, i) => (
            <motion.div
              key={card.titleKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`p-6 rounded-2xl bg-gradient-to-br ${card.color} border ${card.border} transition-all duration-300`}
            >
              <div className="text-4xl mb-4">{card.icon}</div>
              <h3 className="text-xl font-bold mb-2">{t[card.titleKey]}</h3>
              <p className="text-sm text-muted leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <a
            href="/presentations"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-neon-cyan to-neon-green text-black font-bold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-neon-cyan/20"
          >
            Crear Presentación Gratis →
          </a>
          <p className="text-sm text-muted mt-3">
            Solo pagas si te gusta el resultado. Desde €0.99.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
