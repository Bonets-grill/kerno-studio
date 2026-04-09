'use client'

import { useState } from 'react'

interface Message {
  id: string
  sender: 'client' | 'team'
  text: string
  timestamp: string
}

const mockMessages: Message[] = [
  { id: '1', sender: 'team', text: 'Hola! Hemos empezado con el módulo de Auth. ¿Prefieres login con email/password o Google OAuth?', timestamp: '2026-04-05 10:30' },
  { id: '2', sender: 'client', text: 'Ambos por favor, email+password como principal y Google como opción', timestamp: '2026-04-05 11:15' },
  { id: '3', sender: 'team', text: 'Perfecto, implementamos ambos. El módulo de Auth estará listo mañana.', timestamp: '2026-04-05 11:20' },
  { id: '4', sender: 'team', text: 'Auth completado! Puedes verlo en staging. Ahora empezamos con el Dashboard.', timestamp: '2026-04-06 09:00' },
]

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [input, setInput] = useState('')

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setMessages((prev) => [
      ...prev,
      {
        id: `msg_${Date.now()}`,
        sender: 'client',
        text: input.trim(),
        timestamp: new Date().toLocaleString(),
      },
    ])
    setInput('')
  }

  return (
    <div className="max-w-3xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Mensajes</h2>
        <p className="text-muted text-sm">Chat en tiempo real con el equipo de desarrollo</p>
      </div>

      <div className="flex-1 rounded-2xl bg-surface-2 border border-border flex flex-col overflow-hidden">
        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'client' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] ${msg.sender === 'client' ? '' : ''}`}>
                <div
                  className={`px-4 py-3 rounded-2xl text-sm ${
                    msg.sender === 'client'
                      ? 'bg-gradient-to-r from-neon-cyan to-neon-green text-black'
                      : 'bg-surface-3 text-foreground border border-border'
                  }`}
                >
                  {msg.text}
                </div>
                <div className={`text-xs text-muted mt-1 ${msg.sender === 'client' ? 'text-right' : ''}`}>
                  {msg.sender === 'team' ? 'Equipo Kerno' : 'Tú'} · {msg.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-4 border-t border-border">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe un mensaje..."
              className="flex-1 px-4 py-3 rounded-xl bg-surface-3 border border-border text-foreground placeholder:text-muted/50 focus:outline-none focus:border-neon-cyan/50"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-green text-black font-semibold hover:opacity-90 disabled:opacity-50"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
