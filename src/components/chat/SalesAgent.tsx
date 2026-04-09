'use client'

import { useState, useEffect, useCallback } from 'react'
import { useI18n } from '@/lib/i18n/context'

interface SalesAgentProps {
  agentId: string
}

export default function SalesAgent({ agentId }: SalesAgentProps) {
  const { lang } = useI18n()
  const [open, setOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)

  // Load ElevenLabs widget script
  useEffect(() => {
    if (loaded) return
    const script = document.createElement('script')
    script.src = 'https://elevenlabs.io/convai-widget/index.js'
    script.async = true
    script.onload = () => setLoaded(true)
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [loaded])

  const toggleAgent = useCallback(() => {
    setOpen((prev) => !prev)
  }, [])

  return (
    <>
      {/* Floating button */}
      <button
        onClick={toggleAgent}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center ${
          open
            ? 'bg-red-500 hover:bg-red-600 scale-90'
            : 'bg-gradient-to-r from-neon-cyan to-neon-green hover:scale-110 glow-box-cyan'
        }`}
        aria-label={open ? 'Close agent' : 'Talk to agent'}
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

      {/* Pulse ring animation when closed */}
      {!open && (
        <div className="fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full pointer-events-none">
          <div className="absolute inset-0 rounded-full bg-neon-cyan/30 animate-ping" />
        </div>
      )}

      {/* Agent panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-8rem)] rounded-2xl bg-surface border border-border shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-4">
          {/* Header */}
          <div className="px-5 py-4 border-b border-border bg-surface-2 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-cyan to-neon-green flex items-center justify-center">
              <span className="text-black font-bold text-sm">K</span>
            </div>
            <div className="flex-1">
              <div className="font-semibold text-sm">Kerno Studio AI</div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
                <span className="text-xs text-neon-green">Online</span>
              </div>
            </div>
            <button
              onClick={toggleAgent}
              className="p-1 rounded-lg hover:bg-surface-3 transition-colors"
              aria-label="Close"
            >
              <svg className="w-5 h-5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* ElevenLabs widget */}
          <div className="flex-1 relative">
            {loaded ? (
              <elevenlabs-convai
                agent-id={agentId}
                language={lang}
              />
            ) : (
              <div className="flex-1 flex items-center justify-center h-full">
                <div className="text-center text-muted">
                  <svg className="animate-spin w-8 h-8 mx-auto mb-3 text-neon-cyan" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <p className="text-sm">Loading agent...</p>
                </div>
              </div>
            )}
          </div>

          {/* Bottom CTA */}
          <div className="px-5 py-3 border-t border-border bg-surface-2">
            <a
              href="#chat"
              onClick={() => setOpen(false)}
              className="block w-full text-center py-2.5 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-green text-black text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Probar el chat de prototipos gratis
            </a>
          </div>
        </div>
      )}

      {/* Custom styles for ElevenLabs widget */}
      <style jsx global>{`
        elevenlabs-convai {
          display: block;
          width: 100%;
          height: 100%;
          --el-color-primary: #00f0ff;
          --el-color-background: #0a0a0a;
        }

        @keyframes slide-in-from-bottom-4 {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-in {
          animation: slide-in-from-bottom-4 0.3s ease-out;
        }
      `}</style>
    </>
  )
}
