'use client'

import { useI18n } from '@/lib/i18n/context'

export default function Footer() {
  const { t } = useI18n()

  return (
    <footer className="py-16 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-green flex items-center justify-center">
                <span className="text-black font-bold text-sm">K</span>
              </div>
              <span className="text-xl font-bold">
                Kerno <span className="gradient-text">Studio</span>
              </span>
            </div>
            <p className="text-muted text-sm max-w-sm leading-relaxed">
              {t.footer_description}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-foreground">{t.footer_product}</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><a href="#proceso" className="hover:text-foreground transition-colors">{t.nav_process}</a></li>
              <li><a href="#casos" className="hover:text-foreground transition-colors">{t.nav_cases}</a></li>
              <li><a href="#pricing" className="hover:text-foreground transition-colors">{t.nav_pricing}</a></li>
              <li><a href="#chat" className="hover:text-foreground transition-colors">{t.footer_start}</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-foreground">{t.footer_legal}</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><a href="/legal/privacy" className="hover:text-foreground transition-colors">{t.footer_privacy}</a></li>
              <li><a href="/legal/terms" className="hover:text-foreground transition-colors">{t.footer_terms}</a></li>
              <li><a href="/legal/cookies" className="hover:text-foreground transition-colors">{t.footer_cookies}</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} Kerno Studio. {t.footer_copyright}
          </p>
          <div className="flex items-center gap-1 text-sm text-muted">
            {t.footer_made_with} <span className="gradient-text mx-1">IA</span> {t.footer_in_canarias}
          </div>
        </div>
      </div>
    </footer>
  )
}
