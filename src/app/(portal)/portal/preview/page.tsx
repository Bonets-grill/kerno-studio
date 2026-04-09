'use client'

import { useState } from 'react'

export default function PreviewPage() {
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')

  const widthClass = {
    desktop: 'w-full',
    tablet: 'max-w-[768px]',
    mobile: 'max-w-[375px]',
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Preview en Staging</h2>
          <p className="text-muted text-sm">Vista en tiempo real de tu proyecto en desarrollo</p>
        </div>
        <div className="flex items-center gap-1 bg-surface-2 rounded-lg p-1 border border-border">
          {(['desktop', 'tablet', 'mobile'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-4 py-2 rounded-md text-sm transition-colors ${
                viewMode === mode ? 'bg-neon-cyan/20 text-neon-cyan' : 'text-muted hover:text-foreground'
              }`}
            >
              {mode === 'desktop' ? 'Desktop' : mode === 'tablet' ? 'Tablet' : 'Mobile'}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-surface-2 border border-border">
        {/* Browser chrome */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          <div className="flex-1 px-4 py-1.5 rounded-lg bg-surface-3 border border-border">
            <span className="text-xs text-muted font-mono">mi-proyecto.staging.kerno.studio</span>
          </div>
        </div>

        <div className={`mx-auto transition-all duration-300 ${widthClass[viewMode]}`}>
          <div className="w-full h-[600px] rounded-lg bg-surface-3 border border-border flex items-center justify-center">
            <div className="text-center text-muted">
              <div className="text-4xl mb-4">🚧</div>
              <p className="text-lg font-medium">Preview de staging</p>
              <p className="text-sm mt-1">Se conectará al URL de staging cuando el proyecto esté en desarrollo</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
