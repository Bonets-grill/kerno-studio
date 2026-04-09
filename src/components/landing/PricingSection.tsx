'use client'

import { motion } from 'framer-motion'
import { useI18n } from '@/lib/i18n/context'

export default function PricingSection() {
  const { t } = useI18n()

  const plans = [
    {
      name: t.pricing_landing,
      price: t.pricing_landing_price,
      description: t.pricing_landing_desc,
      features: t.pricing_features_landing,
      popular: false,
    },
    {
      name: t.pricing_mvp,
      price: t.pricing_mvp_price,
      description: t.pricing_mvp_desc,
      features: t.pricing_features_mvp,
      popular: true,
    },
    {
      name: t.pricing_saas,
      price: t.pricing_saas_price,
      description: t.pricing_saas_desc,
      features: t.pricing_features_saas,
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t.pricing_title} <span className="gradient-text">transparentes</span>
          </h2>
          <p className="text-muted text-lg max-w-xl mx-auto">
            {t.pricing_subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.15 }}
              className={`relative p-8 rounded-2xl border transition-all duration-300 ${
                plan.popular
                  ? 'bg-surface-2 border-neon-cyan/50 glow-box-cyan'
                  : 'bg-surface-2 border-border hover:border-neon-cyan/30'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-neon-cyan to-neon-green text-black text-xs font-semibold">
                  {t.pricing_popular}
                </div>
              )}

              <h3 className="text-xl font-semibold mb-1">{plan.name}</h3>
              <div className="text-3xl font-bold gradient-text mb-3">{plan.price}</div>
              <p className="text-muted text-sm mb-6">{plan.description}</p>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <span className="w-5 h-5 rounded-full bg-neon-green/10 text-neon-green flex items-center justify-center text-xs">
                      &#10003;
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#chat"
                className={`block text-center py-3 rounded-full font-semibold transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-neon-cyan to-neon-green text-black hover:opacity-90'
                    : 'border border-border hover:border-neon-cyan/50 hover:bg-neon-cyan/5'
                }`}
              >
                {t.pricing_cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
