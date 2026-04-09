'use client'

import { useState, useEffect } from 'react'

interface CostEntry {
  id: string
  timestamp: string
  type: 'chat' | 'prototype' | 'voice'
  input_tokens?: number
  output_tokens?: number
  model?: string
  claude_cost_usd?: number
  duration_seconds?: number
  elevenlabs_cost_usd?: number
  total_cost_usd: number
}

interface ElevenLabsConversation {
  id: string
  status: string
  duration_secs: number
  cost: number
  created_at: string
}

interface CostData {
  claude: {
    total_usd: number
    chat: { count: number; total_usd: number; total_tokens: number }
    prototype: { count: number; total_usd: number; total_tokens: number }
    voice: { count: number; total_usd: number; total_minutes: number }
    entries: number
  }
  claude_entries: CostEntry[]
  elevenlabs: {
    agent_name: string
    total_conversations: number
    total_duration_minutes: number
    total_cost_usd: number
    conversations: ElevenLabsConversation[]
  } | null
}

export default function CostsPage() {
  const [data, setData] = useState<CostData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/costs')
      .then((r) => r.json())
      .then((d) => { setData(d as CostData); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <svg className="animate-spin w-8 h-8 text-neon-cyan" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    )
  }

  if (!data) return <p className="text-muted text-center py-20">Error cargando datos</p>

  const grandTotal = (data.claude.total_usd + (data.elevenlabs?.total_cost_usd || 0))

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Costos por Cliente</h2>
        <p className="text-muted text-sm">Gastos de Claude API + ElevenLabs por cada interacción</p>
      </div>

      {/* Grand total */}
      <div className="p-6 rounded-2xl bg-surface-2 border border-neon-cyan/20 glow-box-cyan">
        <div className="text-sm text-muted mb-1">Gasto total acumulado</div>
        <div className="text-4xl font-bold gradient-text">${grandTotal.toFixed(4)} USD</div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-surface-2 border border-border">
          <div className="text-xs text-muted mb-1">Chat IA (Claude)</div>
          <div className="text-2xl font-bold text-neon-cyan">${data.claude.chat.total_usd.toFixed(4)}</div>
          <div className="text-xs text-muted mt-1">{data.claude.chat.count} conversaciones · {data.claude.chat.total_tokens.toLocaleString()} tokens</div>
        </div>

        <div className="p-5 rounded-2xl bg-surface-2 border border-border">
          <div className="text-xs text-muted mb-1">Prototipos (Claude)</div>
          <div className="text-2xl font-bold text-neon-green">${data.claude.prototype.total_usd.toFixed(4)}</div>
          <div className="text-xs text-muted mt-1">{data.claude.prototype.count} prototipos · {data.claude.prototype.total_tokens.toLocaleString()} tokens</div>
        </div>

        <div className="p-5 rounded-2xl bg-surface-2 border border-border">
          <div className="text-xs text-muted mb-1">Agente Voz (ElevenLabs)</div>
          <div className="text-2xl font-bold text-neon-purple">
            ${data.elevenlabs?.total_cost_usd.toFixed(4) || '0.0000'}
          </div>
          <div className="text-xs text-muted mt-1">
            {data.elevenlabs?.total_conversations || 0} llamadas · {data.elevenlabs?.total_duration_minutes.toFixed(1) || 0} min
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-surface-2 border border-border">
          <div className="text-xs text-muted mb-1">Costo promedio/lead</div>
          <div className="text-2xl font-bold text-yellow-400">
            ${data.claude.entries > 0 ? (grandTotal / Math.max(data.claude.chat.count, 1)).toFixed(4) : '0.0000'}
          </div>
          <div className="text-xs text-muted mt-1">chat + prototipo + voz</div>
        </div>
      </div>

      {/* ElevenLabs conversations */}
      {data.elevenlabs && data.elevenlabs.conversations.length > 0 && (
        <div className="p-6 rounded-2xl bg-surface-2 border border-border">
          <h3 className="text-lg font-semibold mb-4">Llamadas de Voz — ElevenLabs</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 text-muted font-medium">ID</th>
                <th className="text-left py-2 text-muted font-medium">Estado</th>
                <th className="text-left py-2 text-muted font-medium">Duración</th>
                <th className="text-left py-2 text-muted font-medium">Costo</th>
                <th className="text-left py-2 text-muted font-medium">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {data.elevenlabs.conversations.map((conv) => (
                <tr key={conv.id} className="border-b border-border/50">
                  <td className="py-2 font-mono text-xs text-muted">{conv.id?.slice(0, 12)}...</td>
                  <td className="py-2">
                    <span className={`text-xs ${conv.status === 'done' ? 'text-neon-green' : 'text-yellow-400'}`}>
                      {conv.status}
                    </span>
                  </td>
                  <td className="py-2">{conv.duration_secs ? `${Math.round(conv.duration_secs)}s` : '—'}</td>
                  <td className="py-2 font-mono">${conv.cost?.toFixed(4) || '—'}</td>
                  <td className="py-2 text-muted">{conv.created_at ? new Date(conv.created_at).toLocaleString() : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Claude API entries */}
      {data.claude_entries.length > 0 && (
        <div className="p-6 rounded-2xl bg-surface-2 border border-border">
          <h3 className="text-lg font-semibold mb-4">Historial Claude API</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 text-muted font-medium">Tipo</th>
                <th className="text-left py-2 text-muted font-medium">Modelo</th>
                <th className="text-left py-2 text-muted font-medium">Tokens In</th>
                <th className="text-left py-2 text-muted font-medium">Tokens Out</th>
                <th className="text-left py-2 text-muted font-medium">Costo</th>
                <th className="text-left py-2 text-muted font-medium">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {data.claude_entries.map((entry) => (
                <tr key={entry.id} className="border-b border-border/50">
                  <td className="py-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs border ${
                      entry.type === 'chat' ? 'bg-neon-cyan/10 text-neon-cyan border-neon-cyan/20' : 'bg-neon-green/10 text-neon-green border-neon-green/20'
                    }`}>
                      {entry.type === 'chat' ? 'Chat' : 'Prototipo'}
                    </span>
                  </td>
                  <td className="py-2 text-xs font-mono text-muted">{entry.model?.split('-').slice(-1)[0]}</td>
                  <td className="py-2 font-mono">{entry.input_tokens?.toLocaleString()}</td>
                  <td className="py-2 font-mono">{entry.output_tokens?.toLocaleString()}</td>
                  <td className="py-2 font-mono text-neon-green">${entry.total_cost_usd.toFixed(4)}</td>
                  <td className="py-2 text-muted">{new Date(entry.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {data.claude_entries.length === 0 && !data.elevenlabs?.conversations.length && (
        <div className="text-center py-12 text-muted">
          <div className="text-4xl mb-3">📊</div>
          <p>No hay datos de costos todavía</p>
          <p className="text-sm mt-1">Los costos aparecerán aquí cuando los clientes usen el chat o el agente de voz</p>
        </div>
      )}

      {/* Pricing reference */}
      <div className="p-5 rounded-2xl bg-surface-2 border border-border">
        <h4 className="text-sm font-semibold mb-3">Referencia de precios</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-muted mb-1">Claude Sonnet 4 (chat/prototipos)</div>
            <div className="font-mono">Input: $3.00 / 1M tokens</div>
            <div className="font-mono">Output: $15.00 / 1M tokens</div>
          </div>
          <div>
            <div className="text-muted mb-1">ElevenLabs (agente voz)</div>
            <div className="font-mono">~$0.07 / minuto de conversación</div>
            <div className="text-xs text-muted mt-1">Varía según plan y modelo de voz</div>
          </div>
        </div>
      </div>
    </div>
  )
}
