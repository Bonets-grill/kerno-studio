'use client'

import { motion } from 'framer-motion'
import { useI18n } from '@/lib/i18n/context'

const cases = [
  {
    name: 'RestoPro',
    type: 'SaaS',
    description: 'Sistema de gestión para restaurantes con pedidos online, KDS y analytics.',
    tags: ['Next.js', 'Supabase', 'IA'],
    gradient: 'from-neon-cyan to-blue-500',
  },
  {
    name: 'EcoCharge Pitch',
    type: 'Pitch Deck',
    description: 'Presentación interactiva para inversores con métricas de tracción, financials y TAM/SAM/SOM.',
    tags: ['Pitch Deck', 'Inversores', 'IA'],
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    name: 'LegalBot',
    type: 'MVP',
    description: 'Asistente legal IA para PYMEs que automatiza contratos y consultas.',
    tags: ['Claude AI', 'RAG', 'Multi-tenant'],
    gradient: 'from-neon-purple to-pink-500',
  },
  {
    name: 'Propuesta TechCo',
    type: 'Propuesta Comercial',
    description: 'Propuesta de proyecto premium con timeline, entregables, inversión y equipo.',
    tags: ['Propuesta', 'Interactiva', 'IA'],
    gradient: 'from-orange-500 to-amber-500',
  },
  {
    name: 'FitTrack',
    type: 'App',
    description: 'Plataforma de seguimiento fitness con planes personalizados por IA.',
    tags: ['React Native', 'OpenAI', 'Stripe'],
    gradient: 'from-neon-green to-emerald-500',
  },
  {
    name: 'Tesis Energías',
    type: 'Trabajo Académico',
    description: 'Presentación de tesis sobre energías renovables con datos, gráficos y bibliografía.',
    tags: ['Académico', 'Investigación', 'IA'],
    gradient: 'from-blue-500 to-indigo-500',
  },
]

export default function CasesSection() {
  const { t } = useI18n()

  return (
    <section id="casos" className="py-32 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t.cases_title} <span className="gradient-text">cobran vida</span>
          </h2>
          <p className="text-muted text-lg max-w-xl mx-auto">
            {t.cases_subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {cases.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1 }}
              className="group relative p-8 rounded-2xl bg-surface-2 border border-border hover:border-neon-cyan/30 transition-all duration-500 overflow-hidden"
            >
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient} opacity-50 group-hover:opacity-100 transition-opacity`} />

              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold">{item.name}</h3>
                  <span className="text-xs text-neon-cyan font-mono uppercase tracking-wider">
                    {item.type}
                  </span>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} opacity-20 group-hover:opacity-40 transition-opacity`} />
              </div>

              <p className="text-muted mb-6 leading-relaxed">{item.description}</p>

              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs bg-surface-3 text-muted border border-border"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
