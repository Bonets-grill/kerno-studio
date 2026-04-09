'use client'

import type { PresentationBrief } from '@/types/presentations'

interface BriefCardProps {
  brief: PresentationBrief
  onGenerate: () => void
  onEdit: () => void
  loading: boolean
}

const TYPE_LABELS: Record<string, string> = {
  'pitch-deck': 'Pitch Deck',
  'school-project': 'Trabajo Académico',
  'business-proposal': 'Propuesta Comercial',
  'report': 'Reporte',
}

const STYLE_LABELS: Record<string, string> = {
  professional: 'Profesional',
  academic: 'Académico',
  creative: 'Creativo',
  minimal: 'Minimalista',
}

export default function BriefCard({ brief, onGenerate, onEdit, loading }: BriefCardProps) {
  return (
    <div className="mx-6 mb-4 p-5 rounded-2xl bg-surface-3 border border-border">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-bold">{brief.title}</h3>
          <div className="flex gap-2 mt-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20">
              {TYPE_LABELS[brief.type] || brief.type}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs bg-surface-2 text-muted border border-border">
              {STYLE_LABELS[brief.style] || brief.style}
            </span>
          </div>
        </div>
        <div className="flex gap-1.5">
          <div className="w-6 h-6 rounded-full border-2 border-border" style={{ background: brief.primaryColor }} />
          <div className="w-6 h-6 rounded-full border-2 border-border" style={{ background: brief.accentColor }} />
        </div>
      </div>

      <p className="text-sm text-muted mb-3">{brief.description}</p>

      <div className="mb-3">
        <span className="text-xs text-muted font-semibold uppercase tracking-wider">Audiencia:</span>
        <span className="text-sm text-foreground ml-2">{brief.audience}</span>
      </div>

      {brief.keyPoints.length > 0 && (
        <div className="mb-3">
          <span className="text-xs text-muted font-semibold uppercase tracking-wider">Puntos clave:</span>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {brief.keyPoints.map((point, i) => (
              <span key={i} className="px-2 py-1 rounded-lg text-xs bg-surface-2 text-muted border border-border">
                {point}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mb-4">
        <span className="text-xs text-muted font-semibold uppercase tracking-wider">Secciones ({brief.sections.length}):</span>
        <div className="flex flex-wrap gap-1.5 mt-1">
          {brief.sections.map((sec, i) => (
            <span key={i} className="px-2 py-1 rounded-lg text-xs bg-neon-green/5 text-neon-green/80 border border-neon-green/10">
              {sec}
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onGenerate}
          disabled={loading}
          className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-green text-black font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? 'Generando...' : 'Generar Presentación'}
        </button>
        <button
          onClick={onEdit}
          disabled={loading}
          className="px-6 py-3 rounded-xl border border-border hover:border-neon-cyan/50 text-foreground text-sm transition-all disabled:opacity-50"
        >
          Editar
        </button>
      </div>
    </div>
  )
}
