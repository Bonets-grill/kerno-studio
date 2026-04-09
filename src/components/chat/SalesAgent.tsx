'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { ConversationProvider, useConversation } from '@elevenlabs/react'
import { useI18n } from '@/lib/i18n/context'

const LABELS: Record<string, Record<string, string>> = {
  es: { help: '¿Necesitas ayuda?', talk: 'Hablar con ventas', start: 'Iniciar llamada', end: 'Colgar', connecting: 'Conectando...', listening: 'Escuchando...', speaking: 'Hablando...', type: 'O escribe aquí...', cta: 'Probar el generador de prototipos gratis' },
  en: { help: 'Need help?', talk: 'Talk to sales', start: 'Start call', end: 'End call', connecting: 'Connecting...', listening: 'Listening...', speaking: 'Speaking...', type: 'Or type here...', cta: 'Try the free prototype generator' },
  fr: { help: "Besoin d'aide ?", talk: 'Parlez-nous', start: 'Démarrer', end: 'Raccrocher', connecting: 'Connexion...', listening: 'Écoute...', speaking: 'Parle...', type: 'Ou écrivez ici...', cta: 'Essayez le générateur gratuit' },
  de: { help: 'Hilfe nötig?', talk: 'Sprich mit uns', start: 'Anruf starten', end: 'Auflegen', connecting: 'Verbinden...', listening: 'Zuhören...', speaking: 'Sprechen...', type: 'Oder schreib hier...', cta: 'Kostenlosen Prototyp-Generator testen' },
  it: { help: 'Bisogno di aiuto?', talk: 'Parla con noi', start: 'Avvia', end: 'Riagganciare', connecting: 'Connessione...', listening: 'Ascolto...', speaking: 'Parla...', type: 'O scrivi qui...', cta: 'Prova il generatore gratuito' },
  pt: { help: 'Precisa de ajuda?', talk: 'Fale conosco', start: 'Iniciar', end: 'Desligar', connecting: 'Conectando...', listening: 'Ouvindo...', speaking: 'Falando...', type: 'Ou escreva aqui...', cta: 'Experimente o gerador gratuito' },
  ca: { help: 'Necessites ajuda?', talk: 'Parla amb nosaltres', start: 'Iniciar', end: 'Penjar', connecting: 'Connectant...', listening: 'Escoltant...', speaking: 'Parlant...', type: 'O escriu aquí...', cta: 'Prova el generador gratuït' },
  gl: { help: 'Precisas axuda?', talk: 'Fala connosco', start: 'Iniciar', end: 'Colgar', connecting: 'Conectando...', listening: 'Escoitando...', speaking: 'Falando...', type: 'Ou escribe aquí...', cta: 'Proba o xerador gratuíto' },
}

interface SalesAgentProps {
  agentId: string
}

export default function SalesAgent({ agentId }: SalesAgentProps) {
  return (
    <ConversationProvider>
      <SalesAgentInner agentId={agentId} />
    </ConversationProvider>
  )
}

function SalesAgentInner({ agentId }: SalesAgentProps) {
  const { lang } = useI18n()
  const l = LABELS[lang] || LABELS.es
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: 'agent' | 'user'; text: string }[]>([])
  const [inputText, setInputText] = useState('')
  const [showTooltip, setShowTooltip] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const conversation = useConversation({
    clientTools: {
      send_to_chat: (params: { project_summary: string }) => {
        // This is called by the ElevenLabs agent when it has enough info
        const summary = params.project_summary
        if (summary) {
          // Dispatch event to ChatWidget
          window.dispatchEvent(
            new CustomEvent('kerno:agent-summary', {
              detail: { message: summary },
            })
          )
          // Scroll to chat
          setTimeout(() => {
            const chatSection = document.getElementById('chat')
            chatSection?.scrollIntoView({ behavior: 'smooth' })
          }, 500)
          return 'Proyecto enviado al generador de prototipos correctamente'
        }
        return 'Error: no se recibió el resumen del proyecto'
      },
    },
    onMessage: (msg) => {
      if (msg.source === 'ai') {
        setMessages((prev) => [...prev, { role: 'agent', text: msg.message }])
      } else if (msg.source === 'user') {
        setMessages((prev) => [...prev, { role: 'user', text: msg.message }])
      }
    },
    onError: (error) => {
      console.error('ElevenLabs error:', error)
    },
    onUnhandledClientToolCall: (toolCall) => {
      console.log('Unhandled tool call:', toolCall)
      // Fallback: if the tool name matches, handle it
      if (toolCall.tool_name === 'send_to_chat' && toolCall.parameters?.project_summary) {
        const summary = toolCall.parameters.project_summary as string
        window.dispatchEvent(
          new CustomEvent('kerno:agent-summary', { detail: { message: summary } })
        )
        setTimeout(() => {
          document.getElementById('chat')?.scrollIntoView({ behavior: 'smooth' })
        }, 500)
      }
    },
  })

  // Auto-scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Hide tooltip after 6s
  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 6000)
    return () => clearTimeout(timer)
  }, [])

  const startCall = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true })

      // Get signed URL from our API for secure connection
      let sessionConfig: Record<string, unknown> = { agentId }

      try {
        const tokenRes = await fetch('/api/elevenlabs/token')
        if (tokenRes.ok) {
          const tokenData = await tokenRes.json() as { signed_url?: string }
          if (tokenData.signed_url) {
            sessionConfig = { signedUrl: tokenData.signed_url }
          }
        }
      } catch {
        // Fallback to agentId
      }

      conversation.startSession(sessionConfig)
    } catch (err) {
      console.error('Failed to start:', err)
    }
  }, [agentId, conversation])

  const endCall = useCallback(() => {
    conversation.endSession()
  }, [conversation])

  const handleToggle = useCallback(() => {
    if (open) {
      if (conversation.status === 'connected') endCall()
      setOpen(false)
    } else {
      setOpen(true)
      setShowTooltip(false)
    }
  }, [open, conversation.status, endCall])

  const handleSendText = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (!inputText.trim()) return
    if (conversation.status === 'connected') {
      conversation.sendUserMessage(inputText.trim())
    }
    setMessages((prev) => [...prev, { role: 'user', text: inputText.trim() }])
    setInputText('')
  }, [inputText, conversation])

  const isConnected = conversation.status === 'connected'

  return (
    <>
      {/* Tooltip */}
      {!open && showTooltip && (
        <div className="fixed bottom-24 right-6 z-[9998] pointer-events-none" style={{ animation: 'slideUp 0.5s ease-out' }}>
          <div className="bg-surface-2 border border-border rounded-xl px-4 py-2.5 shadow-xl relative">
            <p className="text-sm font-medium">{l.help}</p>
            <p className="text-xs text-muted">{l.talk}</p>
            <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-surface-2 border-r border-b border-border rotate-45" />
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={handleToggle}
        className={`fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center ${
          open ? 'bg-surface-2 border border-border scale-90' : 'bg-gradient-to-r from-neon-cyan to-neon-green hover:scale-110 glow-box-cyan'
        }`}
        aria-label={open ? 'Close' : l.talk}
      >
        {open ? (
          <svg className="w-5 h-5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" /></svg>
        )}
      </button>

      {/* Pulse */}
      {!open && (
        <div className="fixed bottom-6 right-6 z-[9998] w-14 h-14 rounded-full pointer-events-none">
          <div className="absolute inset-0 rounded-full bg-neon-cyan/20 animate-ping" />
        </div>
      )}

      {/* Agent Panel */}
      {open && (
        <div className="fixed bottom-[88px] right-4 z-[9999] w-[360px] max-w-[calc(100vw-2rem)] rounded-2xl bg-background border border-border shadow-2xl overflow-hidden flex flex-col" style={{ animation: 'slideUp 0.3s ease-out', maxHeight: 'calc(100vh - 120px)' }}>

          {/* Header */}
          <div className="px-5 py-4 flex items-center gap-3 border-b border-border shrink-0">
            <div className="relative">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                isConnected ? 'bg-gradient-to-br from-neon-cyan to-neon-green' : 'bg-surface-3'
              } ${conversation.isSpeaking ? 'animate-pulse' : ''}`}>
                <span className={`font-bold text-sm ${isConnected ? 'text-black' : 'text-muted'}`}>K</span>
              </div>
              {isConnected && <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-neon-green border-2 border-background" />}
            </div>
            <div className="flex-1">
              <div className="font-semibold text-sm">Kerno Studio</div>
              <div className="text-xs text-muted">
                {isConnected ? (conversation.isSpeaking ? l.speaking : l.listening) : conversation.status === 'connecting' ? l.connecting : l.help}
              </div>
            </div>
          </div>

          {/* Voice visualizer */}
          {isConnected && (
            <VoiceVisualizer isSpeaking={conversation.isSpeaking} getOutputVolume={conversation.getOutputByteFrequencyData} />
          )}

          {/* Messages */}
          <div className="flex-1 min-h-[120px] max-h-[280px] overflow-y-auto p-4 space-y-3 scroll-native">
            {messages.length === 0 && !isConnected && (
              <div className="text-center py-6 text-muted">
                <div className="text-3xl mb-2">🎙️</div>
                <p className="text-sm font-medium mb-1">{l.help}</p>
                <p className="text-xs">{l.talk}</p>
              </div>
            )}
            {messages.length === 0 && isConnected && (
              <div className="text-center py-6 text-muted">
                <div className="text-3xl mb-2 animate-pulse">🎤</div>
                <p className="text-sm">{l.listening}</p>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-neon-cyan to-neon-green text-black'
                    : 'bg-surface-2 text-foreground border border-border'
                }`}>{msg.text}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Controls */}
          <div className="p-4 border-t border-border space-y-3 shrink-0">
            {!isConnected && conversation.status !== 'connecting' ? (
              <button onClick={startCall} className="w-full py-3 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-green text-black font-semibold flex items-center justify-center gap-2 hover:opacity-90">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                {l.start}
              </button>
            ) : conversation.status === 'connecting' ? (
              <button disabled className="w-full py-3 rounded-xl bg-surface-2 border border-border text-muted font-medium flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                {l.connecting}
              </button>
            ) : (
              <button onClick={endCall} className="w-full py-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 font-semibold flex items-center justify-center gap-2 hover:bg-red-500/30">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" rx="2" /></svg>
                {l.end}
              </button>
            )}

            {isConnected && (
              <form onSubmit={handleSendText} className="flex gap-2">
                <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder={l.type}
                  className="flex-1 px-3 py-2 rounded-xl bg-surface-2 border border-border text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:border-neon-cyan/50" />
                <button type="submit" disabled={!inputText.trim()} className="px-3 py-2 rounded-xl bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan text-sm font-bold disabled:opacity-30">↑</button>
              </form>
            )}
          </div>

          {/* CTA */}
          <div className="px-4 py-2.5 border-t border-border shrink-0">
            <a href="#chat" onClick={() => { setOpen(false); if (isConnected) endCall() }}
              className="block text-center py-2 rounded-xl text-xs text-muted hover:text-neon-cyan transition-colors">
              ✨ {l.cta}
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

function VoiceVisualizer({ isSpeaking, getOutputVolume }: { isSpeaking: boolean; getOutputVolume: () => Uint8Array }) {
  const [bars, setBars] = useState<number[]>(new Array(16).fill(3))
  const frameRef = useRef<number>(0)

  useEffect(() => {
    const animate = () => {
      try {
        const data = getOutputVolume()
        if (data.length > 0) {
          const newBars = Array.from({ length: 16 }, (_, i) => {
            const idx = Math.floor((i / 16) * data.length)
            return Math.max(3, (data[idx] / 255) * 32)
          })
          setBars(newBars)
        } else {
          setBars(new Array(16).fill(isSpeaking ? 8 + Math.random() * 12 : 3))
        }
      } catch {
        setBars(new Array(16).fill(isSpeaking ? 8 + Math.random() * 12 : 3))
      }
      frameRef.current = requestAnimationFrame(animate)
    }
    frameRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameRef.current)
  }, [isSpeaking, getOutputVolume])

  return (
    <div className="px-5 py-3 flex items-center justify-center gap-[3px] bg-surface/50 border-b border-border">
      {bars.map((h, i) => (
        <div key={i} className={`w-[3px] rounded-full transition-all duration-75 ${isSpeaking ? 'bg-neon-cyan' : 'bg-neon-green/40'}`} style={{ height: `${h}px` }} />
      ))}
    </div>
  )
}
