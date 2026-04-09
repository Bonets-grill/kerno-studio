'use client'

import PresentationChatWidget from '@/components/presentations/PresentationChatWidget'

export default function PresentationsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
            Kerno Presentations
          </span>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Presentaciones <span className="gradient-text">premium</span> con IA
          </h1>
          <p className="text-lg text-muted max-w-xl mx-auto">
            Describe tu idea y genera una presentación interactiva profesional en minutos.
            Pitch decks, trabajos académicos, propuestas comerciales.
          </p>
        </div>
      </section>

      {/* Chat */}
      <PresentationChatWidget />

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-surface-2 border border-border">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="font-bold mb-2">Pitch Decks</h3>
            <p className="text-sm text-muted">Para inversores y stakeholders. Problema, solución, mercado, tracción, finanzas.</p>
          </div>
          <div className="p-6 rounded-2xl bg-surface-2 border border-border">
            <div className="text-3xl mb-3">🎓</div>
            <h3 className="font-bold mb-2">Trabajos Académicos</h3>
            <p className="text-sm text-muted">Para escuela y universidad. Investigación, datos, análisis, conclusiones.</p>
          </div>
          <div className="p-6 rounded-2xl bg-surface-2 border border-border">
            <div className="text-3xl mb-3">💼</div>
            <h3 className="font-bold mb-2">Propuestas Comerciales</h3>
            <p className="text-sm text-muted">Para clientes. Alcance, entregables, timeline, inversión, equipo.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border text-center">
        <p className="text-sm text-muted">
          © 2026 <span className="font-semibold text-foreground">Kerno Presentations</span> — Generado con IA por Kerno Studio
        </p>
      </footer>
    </main>
  )
}
