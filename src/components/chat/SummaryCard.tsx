'use client'

import type { ProjectSummary } from '@/types/database'

interface SummaryCardProps {
  summary: ProjectSummary
}

export default function SummaryCard({ summary }: SummaryCardProps) {
  return (
    <div className="mx-6 mb-4 p-6 rounded-xl bg-surface-3 border border-neon-cyan/30 glow-box-cyan">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-green flex items-center justify-center">
          <span className="text-black text-lg font-bold">&#10003;</span>
        </div>
        <div>
          <h3 className="text-lg font-bold">{summary.name}</h3>
          <span className="text-xs text-neon-cyan font-mono uppercase">{summary.type}</span>
        </div>
      </div>

      <p className="text-muted text-sm mb-4">{summary.description}</p>

      <div className="mb-4">
        <h4 className="text-sm font-semibold mb-2">Funcionalidades</h4>
        <div className="flex flex-wrap gap-2">
          {summary.features.map((f) => (
            <span key={f} className="px-3 py-1 rounded-full text-xs bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20">
              {f}
            </span>
          ))}
        </div>
      </div>

      {summary.estimated_modules.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold mb-2">Desglose por Módulos</h4>
          <div className="space-y-2">
            {summary.estimated_modules.map((m) => (
              <div key={m.name} className="flex items-center justify-between text-sm">
                <div>
                  <span className="text-foreground">{m.name}</span>
                  <span className="text-muted ml-2">({m.days}d)</span>
                </div>
                <span className="text-neon-green font-mono">{m.price}€</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div>
          <span className="text-sm text-muted">Total estimado</span>
          <div className="text-2xl font-bold gradient-text">{summary.total_price.toLocaleString()}€</div>
        </div>
        <div className="text-right">
          <span className="text-sm text-muted">Plazo estimado</span>
          <div className="text-lg font-semibold">{summary.timeline_days} días</div>
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        <button className="flex-1 py-3 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-green text-black font-semibold hover:opacity-90 transition-opacity">
          Me gusta, continuar
        </button>
        <button className="px-6 py-3 rounded-xl border border-border hover:border-neon-cyan/50 text-foreground transition-all">
          Cambiar cosas
        </button>
      </div>
    </div>
  )
}
