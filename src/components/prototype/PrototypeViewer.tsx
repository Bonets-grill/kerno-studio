'use client'

import { useState } from 'react'
import type { PrototypePage } from '@/types/database'

interface PrototypeViewerProps {
  pages: PrototypePage[]
  projectName: string
  onApprove?: () => void
  onRequestChanges?: () => void
}

export default function PrototypeViewer({ pages, projectName, onApprove, onRequestChanges }: PrototypeViewerProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [shareUrl, setShareUrl] = useState<string | null>(null)
  const [sharing, setSharing] = useState(false)

  const handleShare = async () => {
    setSharing(true)
    try {
      const res = await fetch('/api/demos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ html: pages[currentPage].html, name: projectName }),
      })
      const { url } = await res.json()
      await navigator.clipboard.writeText(url)
      setShareUrl(url)
      setTimeout(() => setShareUrl(null), 3000)
    } catch { /* skip */ }
    setSharing(false)
  }

  const widthClass = {
    desktop: 'w-full',
    tablet: 'w-[768px]',
    mobile: 'w-[375px]',
  }

  if (pages.length === 0) return null

  return (
    <div className="rounded-2xl bg-surface-2 border border-border overflow-hidden">
      {/* Toolbar */}
      <div className="px-6 py-3 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          <span className="text-sm text-muted font-mono">
            {projectName.toLowerCase().replace(/\s/g, '-')}.kerno.studio / {pages[currentPage].slug}
          </span>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-1 bg-surface-3 rounded-lg p-1">
          {(['desktop', 'tablet', 'mobile'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-3 py-1 rounded-md text-xs transition-colors ${
                viewMode === mode ? 'bg-neon-cyan/20 text-neon-cyan' : 'text-muted hover:text-foreground'
              }`}
            >
              {mode === 'desktop' ? '🖥️' : mode === 'tablet' ? '📱' : '📲'}
            </button>
          ))}
        </div>
      </div>

      {/* Page tabs (hidden for single-page premium demos) */}
      {pages.length > 1 && (
        <div className="px-6 py-2 border-b border-border flex gap-1 overflow-x-auto">
          {pages.map((page, i) => (
            <button
              key={page.slug}
              onClick={() => setCurrentPage(i)}
              className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                i === currentPage
                  ? 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30'
                  : 'text-muted hover:text-foreground hover:bg-surface-3'
              }`}
            >
              {page.name}
            </button>
          ))}
        </div>
      )}

      {/* Preview iframe */}
      <div className="flex justify-center bg-surface-3 p-4 min-h-[600px]">
        <div className={`${widthClass[viewMode]} max-w-full transition-all duration-300`}>
          <iframe
            srcDoc={pages[currentPage].html}
            className={`w-full rounded-lg border border-border ${pages.length === 1 ? 'h-[90vh]' : 'h-[600px]'}`}
            style={{ background: '#08090d' }}
            title={`Preview: ${pages[currentPage].name}`}
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="px-6 py-4 border-t border-border flex items-center justify-between">
        <span className="text-sm text-muted">
          Página {currentPage + 1} de {pages.length}
        </span>
        <div className="flex gap-3">
          <button
            onClick={handleShare}
            disabled={sharing}
            className="px-6 py-2.5 rounded-xl border border-neon-green/30 hover:border-neon-green/60 text-neon-green text-sm transition-all disabled:opacity-50"
          >
            {shareUrl ? '✓ Link copiado' : sharing ? 'Compartiendo...' : '🔗 Compartir'}
          </button>
          {onRequestChanges && (
            <button
              onClick={onRequestChanges}
              className="px-6 py-2.5 rounded-xl border border-border hover:border-neon-cyan/50 text-foreground text-sm transition-all"
            >
              Cambiar cosas
            </button>
          )}
          {onApprove && (
            <button
              onClick={onApprove}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-green text-black font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Me gusta, aprobar
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
