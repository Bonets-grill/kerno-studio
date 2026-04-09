'use client'

import { useState, useEffect } from 'react'
import { useI18n } from '@/lib/i18n/context'

const LABELS: Record<string, { need_help: string; talk: string }> = {
  es: { need_help: '¿Necesitas ayuda?', talk: 'Habla con nosotros' },
  en: { need_help: 'Need help?', talk: 'Talk to us' },
  fr: { need_help: "Besoin d'aide ?", talk: 'Parlez-nous' },
  de: { need_help: 'Hilfe nötig?', talk: 'Sprich mit uns' },
  it: { need_help: 'Hai bisogno di aiuto?', talk: 'Parla con noi' },
  pt: { need_help: 'Precisa de ajuda?', talk: 'Fale conosco' },
  ca: { need_help: 'Necessites ajuda?', talk: 'Parla amb nosaltres' },
  gl: { need_help: 'Precisas axuda?', talk: 'Fala connosco' },
}

interface SalesAgentProps {
  agentId: string
}

export default function SalesAgent({ agentId }: SalesAgentProps) {
  const { lang } = useI18n()
  const l = LABELS[lang] || LABELS.es
  const [open, setOpen] = useState(false)
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const [showTooltip, setShowTooltip] = useState(true)

  // Load widget script
  useEffect(() => {
    if (document.querySelector('script[data-elevenlabs-widget]')) {
      setScriptLoaded(true)
      return
    }
    const script = document.createElement('script')
    script.src = 'https://elevenlabs.io/convai-widget/index.js'
    script.async = true
    script.setAttribute('data-elevenlabs-widget', 'true')
    script.onload = () => setScriptLoaded(true)
    document.head.appendChild(script)
  }, [])

  // Hide tooltip after 5s
  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* Tooltip */}
      {!open && showTooltip && (
        <div className="fixed bottom-24 right-6 z-50 pointer-events-none" style={{ animation: 'slideUp 0.5s ease-out' }}>
          <div className="bg-surface-2 border border-border rounded-xl px-4 py-2.5 shadow-xl">
            <p className="text-sm font-medium text-foreground">{l.need_help}</p>
            <p className="text-xs text-muted">{l.talk}</p>
            {/* Arrow */}
            <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-surface-2 border-r border-b border-border rotate-45" />
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => { setOpen(!open); setShowTooltip(false) }}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center ${
          open
            ? 'bg-surface-2 border border-border scale-90'
            : 'bg-gradient-to-r from-neon-cyan to-neon-green hover:scale-110 glow-box-cyan'
        }`}
        aria-label={open ? 'Close' : l.talk}
      >
        {open ? (
          <svg className="w-5 h-5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
        <div className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full pointer-events-none">
          <div className="absolute inset-0 rounded-full bg-neon-cyan/20 animate-ping" />
        </div>
      )}

      {/* Widget panel */}
      {open && scriptLoaded && (
        <div
          className="fixed bottom-24 right-4 z-50 w-[360px] max-w-[calc(100vw-2rem)] rounded-2xl overflow-hidden shadow-2xl border border-neon-cyan/20 glow-box-cyan"
          style={{ animation: 'slideUp 0.3s ease-out', height: '450px' }}
        >
          <elevenlabs-convai
            agent-id={agentId}
            style={{ width: '100%', height: '100%', display: 'block' } as React.CSSProperties}
          />
        </div>
      )}

      <style jsx global>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        /* Override ElevenLabs widget styles to match dark theme */
        elevenlabs-convai {
          --el-widget-bg: #0a0a0a !important;
          --el-widget-text: #ededed !important;
        }
        elevenlabs-convai::part(widget) {
          background: #0a0a0a !important;
          border: none !important;
          border-radius: 0 !important;
        }
      `}</style>
    </>
  )
}
