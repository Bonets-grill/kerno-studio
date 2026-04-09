'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { useI18n } from '@/lib/i18n/context'
import type { ProjectSummary, PrototypePage } from '@/types/database'
import VoiceButton from './VoiceButton'
import SummaryCard from './SummaryCard'
import BuildingPreview, { ADDON_POOL } from './BuildingPreview'
import PrototypeViewer from '@/components/prototype/PrototypeViewer'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

type Phase = 'chat' | 'building' | 'preview'

export default function ChatWidget() {
  const { t } = useI18n()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [streamingText, setStreamingText] = useState('')
  const [summary, setSummary] = useState<ProjectSummary | null>(null)
  const [phase, setPhase] = useState<Phase>('chat')
  const [buildProgress, setBuildProgress] = useState(0)
  const [prototypePages, setPrototypePages] = useState<PrototypePage[]>([])
  const [selectedAddons, setSelectedAddons] = useState<string[]>([])
  const [prototypeError, setPrototypeError] = useState<string | null>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = useCallback(() => {
    const container = messagesContainerRef.current
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, streamingText, scrollToBottom])

  const extractSummary = (text: string): ProjectSummary | null => {
    const match = text.match(/```json:summary\n([\s\S]*?)```/)
    if (!match) return null
    try {
      return JSON.parse(match[1]) as ProjectSummary
    } catch {
      return null
    }
  }

  const cleanContent = (text: string): string => {
    return text.replace(/```json:summary\n[\s\S]*?```/, '').trim()
  }

  const sendMessage = async (content: string) => {
    if (!content.trim() || loading) return

    const userMessage: Message = { role: 'user', content: content.trim() }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setLoading(true)
    setStreamingText('')

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      })

      if (!response.ok) throw new Error('Chat request failed')

      const reader = response.body?.getReader()
      if (!reader) throw new Error('No reader')

      const decoder = new TextDecoder()
      let fullText = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)
            if (data === '[DONE]') continue
            try {
              const parsed = JSON.parse(data) as { text: string }
              fullText += parsed.text
              setStreamingText(fullText)
            } catch {
              // Skip malformed chunks
            }
          }
        }
      }

      const extracted = extractSummary(fullText)
      if (extracted) setSummary(extracted)

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: cleanContent(fullText) },
      ])
      setStreamingText('')
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Lo siento, ha ocurrido un error. Por favor, inténtalo de nuevo.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleGeneratePrototype = async () => {
    if (!summary) return
    setPhase('building')
    setBuildProgress(0)
    setPrototypeError(null)

    // Simulate progress while streaming
    const progressInterval = setInterval(() => {
      setBuildProgress((prev) => {
        if (prev >= 90) return prev
        return prev + Math.random() * 8
      })
    }, 800)

    try {
      const response = await fetch('/api/prototype', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          summary,
          branding: { companyName: summary.name, primaryColor: '#00f0ff' },
        }),
      })

      if (!response.ok) throw new Error('Prototype generation failed')

      const reader = response.body?.getReader()
      if (!reader) throw new Error('No reader')

      const decoder = new TextDecoder()
      let fullText = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split('\n')
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)
            if (data === '[DONE]') continue
            try {
              const parsed = JSON.parse(data) as { text: string }
              fullText += parsed.text
            } catch { /* skip */ }
          }
        }
      }

      clearInterval(progressInterval)
      setBuildProgress(100)

      // Extract JSON from streamed text
      const jsonMatch = fullText.match(/```json\n?([\s\S]*?)```/)
      if (!jsonMatch) {
        // Try parsing the entire text as JSON array
        const arrayMatch = fullText.match(/\[\s*\{[\s\S]*\}\s*\]/)
        if (!arrayMatch) throw new Error('No valid JSON found')
        const pages = JSON.parse(arrayMatch[0]) as PrototypePage[]
        setPrototypePages(pages.map((p, i) => ({ ...p, order: i })))
      } else {
        const pages = JSON.parse(jsonMatch[1]) as PrototypePage[]
        setPrototypePages(pages.map((p, i) => ({ ...p, order: i })))
      }

      setTimeout(() => setPhase('preview'), 500)
    } catch {
      clearInterval(progressInterval)
      setPrototypeError('Error generando el prototipo. Inténtalo de nuevo.')
      setPhase('chat')
    }
  }

  const handleToggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    )
  }

  const handleRequestChanges = () => {
    setSummary(null)
    setPrototypePages([])
    setPrototypeError(null)
    setPhase('chat')
    setSelectedAddons([])
    inputRef.current?.focus()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  const handleVoiceResult = (transcript: string) => {
    setInput(transcript)
    sendMessage(transcript)
  }

  const addonsTotal = ADDON_POOL.filter(a => selectedAddons.includes(a.id)).reduce((sum, a) => sum + a.price, 0)

  // PHASE: PREVIEW — full-width prototype viewer
  if (phase === 'preview' && prototypePages.length > 0 && summary) {
    return (
      <section id="chat" className="py-20 px-6 bg-surface">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Tu <span className="gradient-text">prototipo</span> está listo
            </h2>
            <p className="text-muted">
              {summary.name} — {prototypePages.length} pantallas generadas con IA
            </p>
          </div>

          <PrototypeViewer
            pages={prototypePages}
            projectName={summary.name}
            onApprove={() => {
              setPhase('chat')
              setMessages((prev) => [
                ...prev,
                { role: 'assistant', content: `¡Prototipo aprobado! 🎉\n\nTu proyecto "${summary.name}" está listo para comenzar.\n\nTotal: ${(summary.total_price + addonsTotal).toLocaleString()}€${addonsTotal > 0 ? ` (incluye extras por ${addonsTotal.toLocaleString()}€)` : ''}\n\nTe contactaremos pronto con los próximos pasos y el enlace de pago del depósito (50%).` },
              ])
              setSummary(null)
              setPrototypePages([])
            }}
            onRequestChanges={handleRequestChanges}
          />

          {/* Selected addons summary below viewer */}
          {selectedAddons.length > 0 && (
            <div className="mt-6 p-5 rounded-2xl bg-surface-2 border border-neon-green/20">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold">Extras incluidos</h4>
                <span className="text-neon-green font-bold">+{addonsTotal.toLocaleString()}€</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {ADDON_POOL.filter(a => selectedAddons.includes(a.id)).map((a) => (
                  <span key={a.id} className="px-3 py-1 rounded-full text-xs bg-neon-green/10 text-neon-green border border-neon-green/20">
                    {a.icon} {a.label} (+{a.price}€)
                  </span>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-border flex justify-between">
                <span className="text-muted text-sm">Nuevo total del proyecto</span>
                <span className="text-xl font-bold gradient-text">{(summary.total_price + addonsTotal).toLocaleString()}€</span>
              </div>
            </div>
          )}
        </div>
      </section>
    )
  }

  // PHASE: BUILDING — split screen chat + building preview
  if (phase === 'building' && summary) {
    return (
      <section id="chat" className="py-20 px-6 bg-surface">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left: Chat recap */}
            <div className="rounded-2xl bg-surface-2 border border-border overflow-hidden flex flex-col">
              <div className="px-6 py-4 border-b border-border flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-neon-green animate-pulse" />
                <span className="text-sm text-muted">{t.chat_header}</span>
              </div>
              <div className="p-6 flex-1 max-h-[600px] overflow-y-auto space-y-4">
                {messages.slice(-6).map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-neon-cyan to-neon-green text-black'
                        : 'bg-surface-3 text-foreground border border-border'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary mini */}
              <div className="p-4 border-t border-border bg-surface-3/50">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold">{summary.name}</div>
                    <div className="text-xs text-muted">{summary.estimated_modules.length} módulos · {summary.timeline_days} días</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold gradient-text">
                      {(summary.total_price + addonsTotal).toLocaleString()}€
                    </div>
                    {addonsTotal > 0 && (
                      <div className="text-xs text-neon-green">+{addonsTotal.toLocaleString()}€ extras</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Building preview with upsells */}
            <div className="rounded-2xl bg-surface-2 border border-border overflow-hidden">
              <BuildingPreview
                summary={summary}
                selectedAddons={selectedAddons}
                onToggleAddon={handleToggleAddon}
                progress={buildProgress}
              />
            </div>
          </div>
        </div>
      </section>
    )
  }

  // PHASE: CHAT — normal chat flow
  return (
    <section id="chat" className="py-32 px-6 bg-surface">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t.chat_title} <span className="gradient-text">idea</span>
          </h2>
          <p className="text-muted text-lg">{t.chat_subtitle}</p>
        </div>

        <div className="rounded-2xl bg-surface-2 border border-border overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-border flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-neon-green animate-pulse" />
            <span className="text-sm text-muted">{t.chat_header}</span>
          </div>

          {/* Messages */}
          <div ref={messagesContainerRef} className="p-6 min-h-[350px] max-h-[500px] overflow-y-auto space-y-4">
            {messages.length === 0 && !loading && (
              <div className="text-center text-muted py-12">
                <p className="text-lg mb-2">{t.chat_empty_greeting}</p>
                <p className="text-sm">{t.chat_empty_instruction}</p>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-neon-cyan to-neon-green text-black'
                    : 'bg-surface-3 text-foreground border border-border'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}

            {streamingText && (
              <div className="flex justify-start">
                <div className="max-w-[80%] px-4 py-3 rounded-2xl text-sm bg-surface-3 text-foreground border border-border whitespace-pre-wrap">
                  {cleanContent(streamingText)}
                  <span className="animate-pulse text-neon-cyan">|</span>
                </div>
              </div>
            )}

            {loading && !streamingText && (
              <div className="flex justify-start">
                <div className="bg-surface-3 px-4 py-3 rounded-2xl border border-border">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-neon-cyan animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-neon-cyan animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-neon-cyan animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Summary card with addon chips */}
          {summary && (
            <>
              <SummaryCard
                summary={summary}
                onApprove={handleGeneratePrototype}
                onRequestChanges={handleRequestChanges}
                loading={false}
              />

              {/* Addon chips below summary */}
              <div className="mx-6 mb-4">
                <p className="text-xs text-muted mb-2">Añade extras a tu proyecto:</p>
                <div className="flex flex-wrap gap-2">
                  {ADDON_POOL.slice(0, 5).map((addon) => {
                    const selected = selectedAddons.includes(addon.id)
                    return (
                      <button
                        key={addon.id}
                        onClick={() => handleToggleAddon(addon.id)}
                        className={`px-3 py-1.5 rounded-full text-xs transition-all ${
                          selected
                            ? 'bg-neon-green/20 text-neon-green border border-neon-green/30'
                            : 'bg-surface-3 text-muted border border-border hover:border-neon-cyan/30'
                        }`}
                      >
                        {addon.icon} {addon.label} <span className="font-mono">+{addon.price}€</span>
                      </button>
                    )
                  })}
                </div>
                {addonsTotal > 0 && (
                  <div className="mt-2 text-sm">
                    <span className="text-muted">Nuevo total: </span>
                    <span className="font-bold gradient-text">{(summary.total_price + addonsTotal).toLocaleString()}€</span>
                  </div>
                )}
              </div>
            </>
          )}

          {prototypeError && (
            <div className="mx-6 mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {prototypeError}
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-border">
            <div className="flex gap-3">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.chat_placeholder}
                disabled={loading}
                className="flex-1 px-4 py-3 rounded-xl bg-surface-3 border border-border text-foreground placeholder:text-muted/50 focus:outline-none focus:border-neon-cyan/50 transition-colors disabled:opacity-50"
              />
              <VoiceButton onResult={handleVoiceResult} disabled={loading} />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-green text-black font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {t.chat_send}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
