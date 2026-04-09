'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { useI18n } from '@/lib/i18n/context'

const LABELS: Record<string, { need_help: string; start_call: string; listening: string; speaking: string; connecting: string; end_call: string; or_type: string; send: string }> = {
  es: { need_help: '¿Necesitas ayuda?', start_call: 'Iniciar llamada', listening: 'Escuchando...', speaking: 'Hablando...', connecting: 'Conectando...', end_call: 'Colgar', or_type: 'O escribe aquí...', send: '↑' },
  en: { need_help: 'Need help?', start_call: 'Start a call', listening: 'Listening...', speaking: 'Speaking...', connecting: 'Connecting...', end_call: 'End call', or_type: 'Or type here...', send: '↑' },
  fr: { need_help: "Besoin d'aide ?", start_call: 'Démarrer un appel', listening: 'Écoute...', speaking: 'Parle...', connecting: 'Connexion...', end_call: 'Raccrocher', or_type: 'Ou écrivez ici...', send: '↑' },
  de: { need_help: 'Hilfe nötig?', start_call: 'Anruf starten', listening: 'Zuhören...', speaking: 'Sprechen...', connecting: 'Verbinden...', end_call: 'Auflegen', or_type: 'Oder schreib hier...', send: '↑' },
  it: { need_help: 'Hai bisogno di aiuto?', start_call: 'Avvia chiamata', listening: 'Ascolto...', speaking: 'Parla...', connecting: 'Connessione...', end_call: 'Riagganciare', or_type: 'O scrivi qui...', send: '↑' },
  pt: { need_help: 'Precisa de ajuda?', start_call: 'Iniciar chamada', listening: 'Ouvindo...', speaking: 'Falando...', connecting: 'Conectando...', end_call: 'Desligar', or_type: 'Ou escreva aqui...', send: '↑' },
  ca: { need_help: 'Necessites ajuda?', start_call: 'Iniciar trucada', listening: 'Escoltant...', speaking: 'Parlant...', connecting: 'Connectant...', end_call: 'Penjar', or_type: 'O escriu aquí...', send: '↑' },
  gl: { need_help: 'Precisas axuda?', start_call: 'Iniciar chamada', listening: 'Escoitando...', speaking: 'Falando...', connecting: 'Conectando...', end_call: 'Colgar', or_type: 'Ou escribe aquí...', send: '↑' },
}

interface SalesAgentProps {
  agentId: string
}

type Status = 'idle' | 'connecting' | 'connected' | 'error'

export default function SalesAgent({ agentId }: SalesAgentProps) {
  const { lang } = useI18n()
  const l = LABELS[lang] || LABELS.es
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [messages, setMessages] = useState<{ role: 'agent' | 'user'; text: string }[]>([])
  const [inputText, setInputText] = useState('')
  const [audioLevel, setAudioLevel] = useState(0)
  const wsRef = useRef<WebSocket | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Audio level animation
  useEffect(() => {
    if (status !== 'connected') return
    const interval = setInterval(() => {
      setAudioLevel(isSpeaking ? 0.3 + Math.random() * 0.7 : 0.05 + Math.random() * 0.15)
    }, 100)
    return () => clearInterval(interval)
  }, [status, isSpeaking])

  const startCall = useCallback(async () => {
    setStatus('connecting')
    setMessages([])

    try {
      // Get signed URL
      const tokenRes = await fetch('/api/elevenlabs/token')
      const tokenData = await tokenRes.json() as { signed_url?: string; error?: string }

      const wsUrl = tokenData.signed_url || `wss://api.elevenlabs.io/v1/convai/conversation?agent_id=${agentId}`
      const ws = new WebSocket(wsUrl)
      wsRef.current = ws

      // Get microphone
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      audioContextRef.current = new AudioContext({ sampleRate: 16000 })
      const source = audioContextRef.current.createMediaStreamSource(stream)
      const processor = audioContextRef.current.createScriptProcessor(4096, 1, 1)

      source.connect(processor)
      processor.connect(audioContextRef.current.destination)

      ws.onopen = () => {
        setStatus('connected')
        ws.send(JSON.stringify({
          type: 'conversation_initiation_client_data',
          conversation_config_override: {
            agent: { prompt: { prompt: '' }, language: lang },
          },
        }))
      }

      // Send audio chunks
      processor.onaudioprocess = (e) => {
        if (ws.readyState !== WebSocket.OPEN) return
        const inputData = e.inputBuffer.getChannelData(0)
        const pcm16 = new Int16Array(inputData.length)
        for (let i = 0; i < inputData.length; i++) {
          pcm16[i] = Math.max(-32768, Math.min(32767, Math.round(inputData[i] * 32767)))
        }
        const base64 = btoa(String.fromCharCode(...new Uint8Array(pcm16.buffer)))
        ws.send(JSON.stringify({ user_audio_chunk: base64 }))
      }

      // Handle messages
      const audioQueue: string[] = []
      let playing = false

      const playNextAudio = async () => {
        if (audioQueue.length === 0) { playing = false; setIsSpeaking(false); return }
        playing = true
        setIsSpeaking(true)
        const base64 = audioQueue.shift()!
        const bytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0))
        try {
          const audioBuffer = await audioContextRef.current!.decodeAudioData(bytes.buffer.slice(0))
          const src = audioContextRef.current!.createBufferSource()
          src.buffer = audioBuffer
          src.connect(audioContextRef.current!.destination)
          src.onended = () => playNextAudio()
          src.start()
        } catch {
          playNextAudio()
        }
      }

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data)
        switch (data.type) {
          case 'agent_response':
            setMessages(prev => [...prev, { role: 'agent', text: data.agent_response_event.agent_response }])
            break
          case 'user_transcript':
            if (data.user_transcription_event?.user_transcript) {
              setMessages(prev => [...prev, { role: 'user', text: data.user_transcription_event.user_transcript }])
            }
            break
          case 'audio':
            if (data.audio_event?.audio_base_64) {
              audioQueue.push(data.audio_event.audio_base_64)
              if (!playing) playNextAudio()
            }
            break
          case 'ping':
            setTimeout(() => {
              ws.send(JSON.stringify({ type: 'pong', event_id: data.ping_event.event_id }))
            }, data.ping_event.ping_ms)
            break
        }
      }

      ws.onerror = () => setStatus('error')
      ws.onclose = () => {
        setStatus('idle')
        setIsSpeaking(false)
        stream.getTracks().forEach(t => t.stop())
        processor.disconnect()
        source.disconnect()
      }
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 2000)
    }
  }, [agentId, lang])

  const endCall = useCallback(() => {
    wsRef.current?.close()
    audioContextRef.current?.close()
    setStatus('idle')
    setIsSpeaking(false)
  }, [])

  const handleSendText = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (!inputText.trim() || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return
    // Send as user input via contextual update
    wsRef.current.send(JSON.stringify({ type: 'contextual_update', text: `User typed: ${inputText.trim()}` }))
    setMessages(prev => [...prev, { role: 'user', text: inputText.trim() }])
    setInputText('')
  }, [inputText])

  const bars = 16

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => { setOpen(!open); if (open && status === 'connected') endCall() }}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center ${
          open ? 'bg-surface-2 border border-border scale-90' : 'bg-gradient-to-r from-neon-cyan to-neon-green hover:scale-110 glow-box-cyan'
        }`}
        aria-label={open ? 'Cerrar' : l.need_help}
      >
        {open ? (
          <svg className="w-5 h-5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" /></svg>
        )}
      </button>

      {/* Pulse */}
      {!open && (
        <div className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full pointer-events-none">
          <div className="absolute inset-0 rounded-full bg-neon-cyan/20 animate-ping" />
        </div>
      )}

      {/* Panel */}
      {open && (
        <div className="fixed bottom-[88px] right-4 z-50 w-[360px] max-w-[calc(100vw-2rem)] rounded-2xl bg-background border border-border shadow-2xl overflow-hidden flex flex-col" style={{ animation: 'slideUp 0.3s ease-out' }}>

          {/* Header */}
          <div className="px-5 py-4 flex items-center gap-3 border-b border-border">
            <div className="relative">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                status === 'connected' ? 'bg-gradient-to-br from-neon-cyan to-neon-green' : 'bg-surface-3'
              }`}>
                <span className={`font-bold text-sm ${status === 'connected' ? 'text-black' : 'text-muted'}`}>K</span>
              </div>
              {status === 'connected' && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-neon-green border-2 border-background" />
              )}
            </div>
            <div className="flex-1">
              <div className="font-semibold text-sm">Kerno Studio</div>
              <div className="text-xs text-muted">
                {status === 'connected' ? (isSpeaking ? l.speaking : l.listening) : status === 'connecting' ? l.connecting : l.need_help}
              </div>
            </div>
          </div>

          {/* Voice visualizer (only when connected) */}
          {status === 'connected' && (
            <div className="px-5 py-4 flex items-center justify-center gap-[3px] bg-surface/50">
              {Array.from({ length: bars }).map((_, i) => {
                const distance = Math.abs(i - bars / 2) / (bars / 2)
                const height = audioLevel * (1 - distance * 0.6) * 32 + 3
                return (
                  <div
                    key={i}
                    className={`w-[3px] rounded-full transition-all duration-100 ${isSpeaking ? 'bg-neon-cyan' : 'bg-neon-green/50'}`}
                    style={{ height: `${height}px` }}
                  />
                )
              })}
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 max-h-[280px] min-h-[120px] overflow-y-auto p-4 space-y-3 scroll-native">
            {messages.length === 0 && status === 'idle' && (
              <div className="text-center py-6 text-muted">
                <div className="text-3xl mb-2">🎙️</div>
                <p className="text-sm">{l.need_help}</p>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-3 py-2 rounded-2xl text-[13px] leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-neon-cyan to-neon-green text-black'
                    : 'bg-surface-2 text-foreground border border-border'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Controls */}
          <div className="p-4 border-t border-border space-y-3">
            {/* Call button */}
            {status === 'idle' || status === 'error' ? (
              <button
                onClick={startCall}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-green text-black font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                {l.start_call}
              </button>
            ) : status === 'connecting' ? (
              <button disabled className="w-full py-3 rounded-xl bg-surface-2 border border-border text-muted font-medium flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                {l.connecting}
              </button>
            ) : (
              <button
                onClick={endCall}
                className="w-full py-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 font-semibold flex items-center justify-center gap-2 hover:bg-red-500/30 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M12 12h.01M8.464 15.536a5 5 0 010-7.072M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {l.end_call}
              </button>
            )}

            {/* Text input (when connected) */}
            {status === 'connected' && (
              <form onSubmit={handleSendText} className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={l.or_type}
                  className="flex-1 px-3 py-2 rounded-xl bg-surface-2 border border-border text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:border-neon-cyan/50"
                />
                <button type="submit" disabled={!inputText.trim()} className="px-3 py-2 rounded-xl bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan text-sm font-bold disabled:opacity-30">
                  {l.send}
                </button>
              </form>
            )}
          </div>

          {/* CTA */}
          <div className="px-4 py-2.5 border-t border-border">
            <a
              href="#chat"
              onClick={() => { setOpen(false); if (status === 'connected') endCall() }}
              className="block text-center py-2 rounded-xl text-xs text-muted hover:text-neon-cyan transition-colors"
            >
              ✨ {lang === 'en' ? 'Try the free prototype generator' : lang === 'fr' ? 'Essayez le générateur gratuit' : lang === 'de' ? 'Kostenlosen Prototyp-Generator testen' : 'Probar el generador de prototipos gratis'}
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
