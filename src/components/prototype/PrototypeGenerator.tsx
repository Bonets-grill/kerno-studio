'use client'

import { useState } from 'react'
import type { ProjectSummary, PrototypePage } from '@/types/database'
import PrototypeViewer from './PrototypeViewer'

interface PrototypeGeneratorProps {
  summary: ProjectSummary
}

export default function PrototypeGenerator({ summary }: PrototypeGeneratorProps) {
  const [pages, setPages] = useState<PrototypePage[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [branding, setBranding] = useState({
    companyName: summary.name,
    primaryColor: '#00f0ff',
  })

  const generate = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/prototype', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ summary, branding }),
      })

      if (!response.ok) throw new Error('Generation failed')

      const data = await response.json() as { pages: PrototypePage[] }
      setPages(data.pages)
    } catch {
      setError('Error generando el prototipo. Inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  if (pages.length > 0) {
    return (
      <PrototypeViewer
        pages={pages}
        projectName={branding.companyName}
        onApprove={() => alert('Prototype approved! (Stripe integration coming)')}
        onRequestChanges={() => setPages([])}
      />
    )
  }

  return (
    <div className="p-8 rounded-2xl bg-surface-2 border border-border">
      <h3 className="text-xl font-bold mb-6">Personaliza tu prototipo</h3>

      <div className="space-y-4 mb-6">
        <div>
          <label htmlFor="proto-name" className="text-sm text-muted mb-1 block">Nombre del proyecto</label>
          <input
            id="proto-name"
            type="text"
            value={branding.companyName}
            onChange={(e) => setBranding({ ...branding, companyName: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-surface-3 border border-border text-foreground focus:outline-none focus:border-neon-cyan/50"
          />
        </div>

        <div>
          <label htmlFor="proto-color" className="text-sm text-muted mb-1 block">Color principal</label>
          <div className="flex gap-3 items-center">
            <input
              id="proto-color"
              type="color"
              value={branding.primaryColor}
              onChange={(e) => setBranding({ ...branding, primaryColor: e.target.value })}
              className="w-12 h-12 rounded-lg cursor-pointer border border-border"
            />
            <span className="text-sm text-muted font-mono">{branding.primaryColor}</span>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          {error}
        </div>
      )}

      <button
        onClick={generate}
        disabled={loading}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-green text-black font-semibold text-lg hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-3">
            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Generando prototipo con IA...
          </span>
        ) : (
          'Generar Prototipo'
        )}
      </button>

      <p className="text-xs text-muted text-center mt-3">
        La IA generará 5-8 pantallas completas con tu marca
      </p>
    </div>
  )
}
