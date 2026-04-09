'use client'

import type { ProjectSummary } from '@/types/database'

interface SummaryCardProps {
  summary: ProjectSummary
  onApprove?: () => void
  onRequestChanges?: () => void
  loading?: boolean
}

export default function SummaryCard({ summary, onApprove, onRequestChanges, loading }: SummaryCardProps) {
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
        <button
          onClick={onApprove}
          disabled={loading}
          className="flex-1 py-3 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-green text-black font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Generando prototipo...
            </span>
          ) : (
            'Me gusta, ver prototipo'
          )}
        </button>
        <button
          onClick={onRequestChanges}
          disabled={loading}
          className="px-6 py-3 rounded-xl border border-border hover:border-neon-cyan/50 text-foreground transition-all disabled:opacity-50"
        >
          Cambiar cosas
        </button>
      </div>
    </div>
  )
}
