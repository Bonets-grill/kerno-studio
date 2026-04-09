'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { useConversation } from '@elevenlabs/react'
import { useI18n } from '@/lib/i18n/context'

interface SalesAgentProps {
  agentId: string
}

export default function SalesAgent({ agentId }: SalesAgentProps) {
  const { lang } = useI18n()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: 'agent' | 'user'; text: string }[]>([])
  const [inputText, setInputText] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const conversation = useConversation({
    onConnect: () => {
      console.log('ElevenLabs connected')
    },
    onDisconnect: () => {
      console.log('ElevenLabs disconnected')
    },
    onMessage: (message) => {
      if (message.source === 'ai') {
        setMessages((prev) => [...prev, { role: 'agent', text: message.message }])
      } else if (message.source === 'user') {
        setMessages((prev) => [...prev, { role: 'user', text: message.message }])
      }
    },
    onError: (error) => {
      console.error('ElevenLabs error:', error)
    },
  })

  // Auto-scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const startConversation = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true })

      // Get signed URL from our API
      const tokenRes = await fetch('/api/elevenlabs/token')
      const tokenData = await tokenRes.json() as { signed_url?: string }

      if (tokenData.signed_url) {
        await conversation.startSession({
          signedUrl: tokenData.signed_url,
        })
      } else {
        // Fallback to direct agent ID
        await conversation.startSession({
          agentId,
        })
      }
    } catch (err) {
      console.error('Failed to start conversation:', err)
    }
  }, [agentId, conversation])

  const stopConversation = useCallback(async () => {
    await conversation.endSession()
  }, [conversation])

  const handleOpen = useCallback(() => {
    setOpen(true)
    if (conversation.status !== 'connected') {
      startConversation()
    }
  }, [conversation.status, startConversation])

  const handleClose = useCallback(() => {
    setOpen(false)
    if (conversation.status === 'connected') {
      stopConversation()
    }
  }, [conversation.status, stopConversation])

  const handleSendText = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (!inputText.trim()) return
    conversation.sendUserMessage(inputText.trim())
    setMessages((prev) => [...prev, { role: 'user', text: inputText.trim() }])
    setInputText('')
  }, [inputText, conversation])

  const statusLabels: Record<string, Record<string, string>> = {
    connected: { es: 'Conectado', en: 'Connected', fr: 'Connecté', de: 'Verbunden', it: 'Connesso', pt: 'Conectado', ca: 'Connectat', gl: 'Conectado' },
    connecting: { es: 'Conectando...', en: 'Connecting...', fr: 'Connexion...', de: 'Verbinden...', it: 'Connessione...', pt: 'Conectando...', ca: 'Connectant...', gl: 'Conectando...' },
    disconnected: { es: 'Desconectado', en: 'Disconnected', fr: 'Déconnecté', de: 'Getrennt', it: 'Disconnesso', pt: 'Desconectado', ca: 'Desconnectat', gl: 'Desconectado' },
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={open ? handleClose : handleOpen}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center safe-bottom ${
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

      {/* Pulse ring when closed */}
      {!open && (
        <div className="fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full pointer-events-none">
          <div className="absolute inset-0 rounded-full bg-neon-cyan/30 animate-ping" />
        </div>
      )}

      {/* Agent panel */}
      {open && (
        <div className="fixed bottom-24 right-4 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[550px] max-h-[calc(100vh-8rem)] rounded-2xl bg-surface border border-border shadow-2xl overflow-hidden flex flex-col safe-bottom"
          style={{ animation: 'slideUp 0.3s ease-out' }}
        >
          {/* Header */}
          <div className="px-5 py-4 border-b border-border bg-surface-2 flex items-center gap-3 shrink-0">
            <div className="relative">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                conversation.isSpeaking
                  ? 'bg-gradient-to-br from-neon-cyan to-neon-green animate-pulse'
                  : 'bg-gradient-to-br from-neon-cyan/60 to-neon-green/60'
              }`}>
                <span className="text-black font-bold text-sm">K</span>
              </div>
              <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-surface-2 ${
                conversation.status === 'connected' ? 'bg-neon-green' : 'bg-muted'
              }`} />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-sm">Kerno Studio AI</div>
              <div className="text-xs text-muted">
                {conversation.status === 'connected'
                  ? conversation.isSpeaking
                    ? '🔊 Hablando...'
                    : '🎤 Escuchando...'
                  : statusLabels[conversation.status]?.[lang] || conversation.status
                }
              </div>
            </div>
            <button onClick={handleClose} className="p-1.5 rounded-lg hover:bg-surface-3" aria-label="Close">
              <svg className="w-5 h-5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Voice visualizer */}
          {conversation.status === 'connected' && (
            <div className="px-5 py-3 border-b border-border bg-surface-2/50 flex items-center justify-center gap-1">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className={`w-1 rounded-full transition-all duration-150 ${
                    conversation.isSpeaking ? 'bg-neon-cyan' : 'bg-neon-green/40'
                  }`}
                  style={{
                    height: conversation.isSpeaking
                      ? `${12 + Math.random() * 20}px`
                      : '4px',
                    animationDelay: `${i * 50}ms`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto scroll-native space-y-3">
            {messages.length === 0 && conversation.status !== 'connected' && (
              <div className="text-center text-muted py-8">
                <div className="text-3xl mb-3">🎙️</div>
                <p className="text-sm font-medium mb-1">Habla con nuestro agente IA</p>
                <p className="text-xs">Pulsa el botón para iniciar la conversación por voz</p>
              </div>
            )}

            {messages.length === 0 && conversation.status === 'connected' && (
              <div className="text-center text-muted py-8">
                <div className="text-3xl mb-3 animate-pulse">🎤</div>
                <p className="text-sm">Escuchando... habla ahora</p>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-neon-cyan to-neon-green text-black'
                    : 'bg-surface-3 text-foreground border border-border'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Text input (can also type) */}
          <form onSubmit={handleSendText} className="p-3 border-t border-border bg-surface-2 flex gap-2 shrink-0">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="O escribe aquí..."
              className="flex-1 px-3 py-2 rounded-xl bg-surface-3 border border-border text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:border-neon-cyan/50"
            />

            {/* Mic toggle */}
            <button
              type="button"
              onClick={conversation.status === 'connected' ? stopConversation : startConversation}
              className={`p-2 rounded-xl transition-all ${
                conversation.status === 'connected'
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                  : 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30 hover:bg-neon-cyan/20'
              }`}
            >
              {conversation.status === 'connected' ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="6" y="6" width="12" height="12" rx="2" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                </svg>
              )}
            </button>

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="px-3 py-2 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-green text-black text-sm font-semibold disabled:opacity-50"
            >
              ↑
            </button>
          </form>

          {/* Bottom CTA */}
          <div className="px-4 py-2.5 border-t border-border bg-surface shrink-0">
            <a
              href="#chat"
              onClick={() => { setOpen(false); if (conversation.status === 'connected') stopConversation() }}
              className="block w-full text-center py-2 rounded-xl bg-gradient-to-r from-neon-cyan/10 to-neon-green/10 border border-neon-cyan/20 text-neon-cyan text-xs font-medium hover:bg-neon-cyan/20 transition-colors"
            >
              ✨ Probar el generador de prototipos gratis
            </a>
          </div>
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
