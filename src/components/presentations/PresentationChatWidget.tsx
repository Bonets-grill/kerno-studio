'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import type { PresentationBrief } from '@/types/presentations'
import type { PrototypePage } from '@/types/database'
import BriefCard from './BriefCard'
import PriceBreakdown from './PriceBreakdown'
import PrototypeViewer from '@/components/prototype/PrototypeViewer'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

type Phase = 'chat' | 'building' | 'preview'

export default function PresentationChatWidget() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [streamingText, setStreamingText] = useState('')
  const [brief, setBrief] = useState<PresentationBrief | null>(null)
  const [phase, setPhase] = useState<Phase>('chat')
  const [buildProgress, setBuildProgress] = useState(0)
  const [pages, setPages] = useState<PrototypePage[]>([])
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [price, setPrice] = useState<{ costUsd: number; priceUsd: number; priceCents: number } | null>(null)
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = useCallback(() => {
    if (messagesRef.current) messagesRef.current.scrollTop = messagesRef.current.scrollHeight
  }, [])

  useEffect(() => { scrollToBottom() }, [messages, streamingText, scrollToBottom])

  const extractBrief = (text: string): PresentationBrief | null => {
    const match = text.match(/```json:brief\n([\s\S]*?)```/)
    if (match) {
      try { return JSON.parse(match[1]) as PresentationBrief } catch { /* try repair */ }
      try {
        let json = match[1].trim().replace(/,\s*$/, '')
        const opens = (json.match(/\[/g) || []).length - (json.match(/\]/g) || []).length
        const braces = (json.match(/\{/g) || []).length - (json.match(/\}/g) || []).length
        const quotes = (json.match(/"/g) || []).length
        if (quotes % 2 !== 0) json += '"'
        for (let i = 0; i < opens; i++) json += ']'
        for (let i = 0; i < braces; i++) json += '}'
        const parsed = JSON.parse(json) as PresentationBrief
        if (parsed.title && parsed.type) return parsed
      } catch { /* give up */ }
    }
    // Try unclosed
    const unclosed = text.match(/```json:brief\n([\s\S]*)$/)
    if (unclosed) {
      try {
        let json = unclosed[1].trim().replace(/,\s*$/, '')
        const quotes = (json.match(/"/g) || []).length
        if (quotes % 2 !== 0) json += '"'
        const opens = (json.match(/\[/g) || []).length - (json.match(/\]/g) || []).length
        const braces = (json.match(/\{/g) || []).length - (json.match(/\}/g) || []).length
        for (let i = 0; i < opens; i++) json += ']'
        for (let i = 0; i < braces; i++) json += '}'
        const parsed = JSON.parse(json) as PresentationBrief
        if (parsed.title && parsed.type) return parsed
      } catch { /* give up */ }
    }
    return null
  }

  const cleanContent = (text: string): string =>
    text.replace(/```json:brief\n[\s\S]*?```/, '').trim()

  const sendMessage = async (content: string) => {
    if (!content.trim() || loading) return
    const userMsg: Message = { role: 'user', content: content.trim() }
    const updated = [...messages, userMsg]
    setMessages(updated)
    setInput('')
    setLoading(true)
    setStreamingText('')

    try {
      const response = await fetch('/api/presentations/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated, sessionId }),
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
        for (const line of chunk.split('\n')) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)
            if (data === '[DONE]') continue
            try {
              const parsed = JSON.parse(data)
              if (parsed.sessionId) {
                setSessionId(parsed.sessionId)
              } else if (parsed.text) {
                fullText += parsed.text
                setStreamingText(fullText)
              }
            } catch { /* skip */ }
          }
        }
      }

      const extracted = extractBrief(fullText)
      if (extracted) setBrief(extracted)

      setMessages(prev => [...prev, { role: 'assistant', content: cleanContent(fullText) }])
      setStreamingText('')
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Lo siento, ha ocurrido un error. Inténtalo de nuevo.' }])
    } finally {
      setLoading(false)
    }
  }

  const handleGenerate = async () => {
    if (!brief || !sessionId) return
    setPhase('building')
    setBuildProgress(0)
    setError(null)

    const progressInterval = setInterval(() => {
      setBuildProgress(prev => prev >= 90 ? prev : prev + Math.random() * 10)
    }, 600)

    try {
      const response = await fetch('/api/presentations/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, brief }),
      })
      if (!response.ok) throw new Error('Generation failed')

      const reader = response.body?.getReader()
      if (!reader) throw new Error('No reader')
      const decoder = new TextDecoder()
      let fullText = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        for (const line of chunk.split('\n')) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)
            if (data === '[DONE]') continue
            try {
              const parsed = JSON.parse(data)
              if (parsed.price) {
                setPrice(parsed.price)
              } else if (parsed.text) {
                fullText += parsed.text
              }
            } catch { /* skip */ }
          }
        }
      }

      clearInterval(progressInterval)
      setBuildProgress(100)

      // Parse pages
      let parsedPages: PrototypePage[] = []
      try { parsedPages = JSON.parse(fullText) } catch { /* skip */ }
      if (parsedPages.length === 0) {
        const match = fullText.match(/\[\s*\{[\s\S]*\}\s*\]/)
        if (match) try { parsedPages = JSON.parse(match[0]) } catch { /* skip */ }
      }
      if (parsedPages.length === 0) throw new Error('Could not parse presentation')

      setPages(parsedPages.map((p, i) => ({ ...p, order: i })))
      setTimeout(() => setPhase('preview'), 500)
    } catch {
      clearInterval(progressInterval)
      setError('Error generando la presentación. Inténtalo de nuevo.')
      setPhase('chat')
    }
  }

  const handleCheckout = async () => {
    if (!sessionId) return
    setCheckoutLoading(true)
    try {
      const email = prompt('Tu email para recibir la presentación:')
      if (!email) { setCheckoutLoading(false); return }

      const response = await fetch('/api/presentations/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, customerEmail: email }),
      })
      const { url } = await response.json()
      if (url) window.location.href = url
    } catch {
      setError('Error procesando el pago.')
    } finally {
      setCheckoutLoading(false)
    }
  }

  const handleReset = () => {
    setBrief(null)
    setPages([])
    setError(null)
    setPrice(null)
    setPhase('chat')
    inputRef.current?.focus()
  }

  // ── PREVIEW PHASE
  if (phase === 'preview' && pages.length > 0 && brief) {
    return (
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Tu <span className="gradient-text">presentación</span> está lista
            </h2>
            <p className="text-muted">{brief.title}</p>
          </div>

          <PrototypeViewer
            pages={pages}
            projectName={brief.title}
            onApprove={handleCheckout}
            onRequestChanges={handleReset}
          />

          {price && (
            <div className="mt-6 max-w-md mx-auto">
              <PriceBreakdown
                costUsd={price.costUsd}
                priceUsd={price.priceUsd}
                priceCents={price.priceCents}
                onCheckout={handleCheckout}
                loading={checkoutLoading}
              />
            </div>
          )}
        </div>
      </section>
    )
  }

  // ── BUILDING PHASE
  if (phase === 'building') {
    return (
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-neon-cyan to-neon-green flex items-center justify-center text-3xl mx-auto mb-4 animate-pulse">
              📊
            </div>
            <h2 className="text-2xl font-bold mb-2">Generando tu presentación...</h2>
            <p className="text-muted">{brief?.title}</p>
          </div>
          <div className="w-full bg-surface-3 rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-neon-cyan to-neon-green rounded-full transition-all duration-500"
              style={{ width: `${buildProgress}%` }}
            />
          </div>
          <p className="text-sm text-muted mt-3">{Math.round(buildProgress)}% — Creando slides premium con IA...</p>
        </div>
      </section>
    )
  }

  // ── CHAT PHASE
  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="rounded-2xl bg-surface-2 border border-border overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-border flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-neon-green animate-pulse" />
            <span className="text-sm text-muted">Kerno Presentations — Describe tu presentación</span>
          </div>

          {/* Messages */}
          <div ref={messagesRef} className="p-6 min-h-[350px] max-h-[500px] overflow-y-auto space-y-4">
            {messages.length === 0 && !loading && (
              <div className="text-center text-muted py-12">
                <p className="text-lg mb-2">¿Qué presentación necesitas?</p>
                <p className="text-sm">Pitch deck, trabajo escolar, propuesta comercial... describe tu idea.</p>
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

          {/* Brief card */}
          {brief && (
            <BriefCard
              brief={brief}
              onGenerate={handleGenerate}
              onEdit={handleReset}
              loading={loading}
            />
          )}

          {error && (
            <div className="mx-6 mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Input */}
          <form onSubmit={(e) => { e.preventDefault(); sendMessage(input) }} className="p-4 border-t border-border">
            <div className="flex gap-3">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe tu presentación..."
                disabled={loading}
                className="flex-1 px-4 py-3 rounded-xl bg-surface-3 border border-border text-foreground placeholder:text-muted/50 focus:outline-none focus:border-neon-cyan/50 transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-green text-black font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
