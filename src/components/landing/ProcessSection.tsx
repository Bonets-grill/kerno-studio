'use client'

import { motion } from 'framer-motion'
import { useI18n } from '@/lib/i18n/context'

const icons = ['💬', '🎨', '✅', '🚀']

export default function ProcessSection() {
  const { t } = useI18n()

  const steps = [
    { number: '01', title: t.process_step1_title, description: t.process_step1_desc, icon: icons[0] },
    { number: '02', title: t.process_step2_title, description: t.process_step2_desc, icon: icons[1] },
    { number: '03', title: t.process_step3_title, description: t.process_step3_desc, icon: icons[2] },
    { number: '04', title: t.process_step4_title, description: t.process_step4_desc, icon: icons[3] },
  ]

  return (
    <section id="proceso" className="py-32 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t.process_title} <span className="gradient-text">funciona</span>
          </h2>
          <p className="text-muted text-lg max-w-xl mx-auto">
            {t.process_subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.15 }}
              className="group relative p-8 rounded-2xl bg-surface-2 border border-border hover:border-neon-cyan/30 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{step.icon}</div>
              <div className="text-sm text-neon-cyan font-mono mb-2">{step.number}</div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{step.description}</p>

              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none glow-box-cyan" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
