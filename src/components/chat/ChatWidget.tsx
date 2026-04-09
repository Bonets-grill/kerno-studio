'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { useI18n } from '@/lib/i18n/context'
import type { ProjectSummary, PrototypePage } from '@/types/database'
import VoiceButton from './VoiceButton'
import SummaryCard from './SummaryCard'
import PrototypeViewer from '@/components/prototype/PrototypeViewer'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function ChatWidget() {
  const { t } = useI18n()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [streamingText, setStreamingText] = useState('')
  const [summary, setSummary] = useState<ProjectSummary | null>(null)
  const [generatingPrototype, setGeneratingPrototype] = useState(false)
  const [prototypePages, setPrototypePages] = useState<PrototypePage[]>([])
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
    setGeneratingPrototype(true)
    setPrototypeError(null)

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

      const data = await response.json() as { pages: PrototypePage[] }
      setPrototypePages(data.pages)
    } catch {
      setPrototypeError('Error generando el prototipo. Inténtalo de nuevo.')
    } finally {
      setGeneratingPrototype(false)
    }
  }

  const handleRequestChanges = () => {
    setSummary(null)
    setPrototypePages([])
    setPrototypeError(null)
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

  // Show prototype viewer if pages are generated
  if (prototypePages.length > 0 && summary) {
    return (
      <section id="chat" className="py-32 px-6 bg-surface">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Tu <span className="gradient-text">prototipo</span>
            </h2>
            <p className="text-muted text-lg">
              {summary.name} — {prototypePages.length} pantallas generadas con IA
            </p>
          </div>

          <PrototypeViewer
            pages={prototypePages}
            projectName={summary.name}
            onApprove={() => {
              const section = document.getElementById('chat')
              if (section) {
                section.innerHTML = '<div class="py-32 px-6 text-center"><div class="max-w-md mx-auto"><div class="w-20 h-20 rounded-full bg-neon-green/20 flex items-center justify-center mx-auto mb-6"><svg class="w-10 h-10 text-neon-green" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg></div><h2 class="text-3xl font-bold mb-3">Prototipo aprobado</h2><p class="text-muted">Te contactaremos pronto para iniciar el desarrollo. Recibirás un email con los próximos pasos y el enlace de pago.</p></div></div>'
              }
            }}
            onRequestChanges={handleRequestChanges}
          />
        </div>
      </section>
    )
  }

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
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-neon-cyan to-neon-green text-black'
                      : 'bg-surface-3 text-foreground border border-border'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Streaming text */}
            {streamingText && (
              <div className="flex justify-start">
                <div className="max-w-[80%] px-4 py-3 rounded-2xl text-sm bg-surface-3 text-foreground border border-border whitespace-pre-wrap">
                  {cleanContent(streamingText)}
                  <span className="animate-pulse text-neon-cyan">|</span>
                </div>
              </div>
            )}

            {/* Loading dots */}
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

          {/* Summary card */}
          {summary && (
            <SummaryCard
              summary={summary}
              onApprove={handleGeneratePrototype}
              onRequestChanges={handleRequestChanges}
              loading={generatingPrototype}
            />
          )}

          {/* Prototype error */}
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
                disabled={loading || generatingPrototype}
                className="flex-1 px-4 py-3 rounded-xl bg-surface-3 border border-border text-foreground placeholder:text-muted/50 focus:outline-none focus:border-neon-cyan/50 transition-colors disabled:opacity-50"
              />
              <VoiceButton onResult={handleVoiceResult} disabled={loading || generatingPrototype} />
              <button
                type="submit"
                disabled={!input.trim() || loading || generatingPrototype}
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
