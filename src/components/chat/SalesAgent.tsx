'use client'

import { useState, useEffect } from 'react'

interface SalesAgentProps {
  agentId: string
}

export default function SalesAgent({ agentId }: SalesAgentProps) {
  const [open, setOpen] = useState(false)
  const [widgetLoaded, setWidgetLoaded] = useState(false)

  // Load ElevenLabs widget script once
  useEffect(() => {
    if (document.querySelector('script[src*="elevenlabs.io/convai-widget"]')) {
      setWidgetLoaded(true)
      return
    }
    const script = document.createElement('script')
    script.src = 'https://elevenlabs.io/convai-widget/index.js'
    script.async = true
    script.onload = () => setWidgetLoaded(true)
    script.onerror = () => console.error('Failed to load ElevenLabs widget')
    document.head.appendChild(script)
  }, [])

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center ${
          open
            ? 'bg-red-500 hover:bg-red-600 scale-90'
            : 'bg-gradient-to-r from-neon-cyan to-neon-green hover:scale-110 glow-box-cyan'
        }`}
        aria-label={open ? 'Cerrar agente' : 'Hablar con agente'}
      >
        {open ? (
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-7 h-7 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
          </svg>
        )}
      </button>

      {/* Pulse ring when closed */}
      {!open && (
        <div className="fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full pointer-events-none">
          <div className="absolute inset-0 rounded-full bg-neon-cyan/30 animate-ping" />
        </div>
      )}

      {/* Widget container */}
      {open && (
        <div
          className="fixed bottom-24 right-4 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-8rem)] rounded-2xl overflow-hidden shadow-2xl border border-border"
          style={{ animation: 'slideUp 0.3s ease-out' }}
        >
          {widgetLoaded ? (
            <elevenlabs-convai
              agent-id={agentId}
              style={{ width: '100%', height: '100%' } as React.CSSProperties}
            />
          ) : (
            <div className="w-full h-full bg-surface flex items-center justify-center">
              <div className="text-center text-muted">
                <svg className="animate-spin w-8 h-8 mx-auto mb-3 text-neon-cyan" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <p className="text-sm">Cargando agente...</p>
              </div>
            </div>
          )}
        </div>
      )}

      <style jsx global>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  )
}
