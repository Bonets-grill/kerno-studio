'use client'

import { useState, useEffect, useRef } from 'react'
import { useI18n } from '@/lib/i18n/context'

const LABELS: Record<string, { talk: string; help: string }> = {
  es: { talk: 'Hablar con ventas', help: '¿Necesitas ayuda?' },
  en: { talk: 'Talk to sales', help: 'Need help?' },
  fr: { talk: 'Parler aux ventes', help: "Besoin d'aide ?" },
  de: { talk: 'Mit Vertrieb sprechen', help: 'Hilfe nötig?' },
  it: { talk: 'Parla con le vendite', help: 'Hai bisogno di aiuto?' },
  pt: { talk: 'Falar com vendas', help: 'Precisa de ajuda?' },
  ca: { talk: 'Parlar amb vendes', help: 'Necessites ajuda?' },
  gl: { talk: 'Falar con vendas', help: 'Precisas axuda?' },
}

interface SalesAgentProps {
  agentId: string
}

export default function SalesAgent({ agentId }: SalesAgentProps) {
  const { lang } = useI18n()
  const l = LABELS[lang] || LABELS.es
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Inject widget into container when opened
  useEffect(() => {
    if (!open || !containerRef.current) return

    // Load script if not loaded
    if (!document.querySelector('script[data-el-widget]')) {
      const script = document.createElement('script')
      script.src = 'https://elevenlabs.io/convai-widget/index.js'
      script.async = true
      script.setAttribute('data-el-widget', '1')
      document.head.appendChild(script)
    }

    // Create widget inside our container
    const container = containerRef.current
    container.innerHTML = ''
    const el = document.createElement('elevenlabs-convai')
    el.setAttribute('agent-id', agentId)
    el.style.display = 'block'
    el.style.width = '100%'
    el.style.height = '100%'
    container.appendChild(el)

    return () => {
      container.innerHTML = ''
    }
  }, [open, agentId])

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center ${
          open
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-gradient-to-r from-neon-cyan to-neon-green hover:scale-110 glow-box-cyan'
        }`}
        aria-label={open ? 'Close' : l.talk}
      >
        {open ? (
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
          </svg>
        )}
      </button>

      {/* Pulse */}
      {!open && (
        <div className="fixed bottom-6 right-6 z-[9998] w-14 h-14 rounded-full pointer-events-none">
          <div className="absolute inset-0 rounded-full bg-neon-cyan/20 animate-ping" />
        </div>
      )}

      {/* Widget panel */}
      {open && (
        <div
          className="fixed bottom-24 right-4 z-[9999] w-[360px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-8rem)] rounded-2xl overflow-hidden shadow-2xl border border-neon-cyan/20 bg-black"
          style={{ animation: 'slideUp 0.3s ease-out' }}
        >
          <div ref={containerRef} className="w-full h-full" />
        </div>
      )}

      <style jsx global>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        /* Hide the default ElevenLabs floating button */
        elevenlabs-convai > div[style*="position: fixed"] {
          display: none !important;
        }
      `}</style>
    </>
  )
}
