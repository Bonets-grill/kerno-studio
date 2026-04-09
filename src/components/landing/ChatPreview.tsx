'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useI18n } from '@/lib/i18n/context'

export default function ChatPreview() {
  const { t } = useI18n()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([])
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || loading) return

    const userMsg = message.trim()
    setMessage('')
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }])
    setLoading(true)

    // Simulated response for now — will connect to /api/chat
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'Interesante proyecto. Para entenderlo mejor, necesito hacerte algunas preguntas. Conecta con nosotros para recibir tu prototipo gratuito en menos de 48h.',
        },
      ])
      setLoading(false)
    }, 1500)
  }

  return (
    <section id="chat" className="py-32 px-6 bg-surface">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t.chat_title} <span className="gradient-text">idea</span>
          </h2>
          <p className="text-muted text-lg">
            {t.chat_subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl bg-surface-2 border border-border overflow-hidden"
        >
          {/* Chat header */}
          <div className="px-6 py-4 border-b border-border flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-neon-green animate-pulse" />
            <span className="text-sm text-muted">{t.chat_header}</span>
          </div>

          {/* Messages */}
          <div className="p-6 min-h-[300px] max-h-[400px] overflow-y-auto space-y-4">
            {messages.length === 0 && (
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
                  className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-neon-cyan to-neon-green text-black'
                      : 'bg-surface-3 text-foreground border border-border'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
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

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-border">
            <div className="flex gap-3">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t.chat_placeholder}
                className="flex-1 px-4 py-3 rounded-xl bg-surface-3 border border-border text-foreground placeholder:text-muted/50 focus:outline-none focus:border-neon-cyan/50 transition-colors"
              />
              <button
                type="submit"
                disabled={!message.trim() || loading}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-green text-black font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {t.chat_send}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
