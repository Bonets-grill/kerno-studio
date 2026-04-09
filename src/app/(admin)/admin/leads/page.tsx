'use client'

const leads = [
  { name: 'Laura Sanz', email: 'laura@biz.com', type: 'SaaS', status: 'new', messages: 0, date: '2026-04-07' },
  { name: 'María García', email: 'maria@ejemplo.com', type: 'SaaS', status: 'chatting', messages: 5, date: '2026-04-06' },
  { name: 'Carlos López', email: 'carlos@test.com', type: 'MVP', status: 'prototype_sent', messages: 8, date: '2026-04-05' },
  { name: 'Ana Martín', email: 'ana@corp.com', type: 'Landing', status: 'approved', messages: 4, date: '2026-04-04' },
  { name: 'Pedro Ruiz', email: 'pedro@startup.io', type: 'Sistema', status: 'paid', messages: 12, date: '2026-04-03' },
  { name: 'Elena Torres', email: 'elena@design.co', type: 'Landing', status: 'prototype_sent', messages: 6, date: '2026-04-04' },
]

const statusConfig: Record<string, { text: string; class: string }> = {
  new: { text: 'Nuevo', class: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  chatting: { text: 'Chateando', class: 'bg-neon-cyan/10 text-neon-cyan border-neon-cyan/20' },
  prototype_sent: { text: 'Prototipo', class: 'bg-neon-purple/10 text-neon-purple border-neon-purple/20' },
  approved: { text: 'Aprobado', class: 'bg-neon-green/10 text-neon-green border-neon-green/20' },
  paid: { text: 'Pagado', class: 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20' },
}

export default function LeadsPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Leads</h2>
          <p className="text-muted text-sm">Todos los leads y sus conversaciones IA</p>
        </div>
        <div className="text-sm text-muted">
          Total: <span className="text-foreground font-bold">{leads.length}</span>
        </div>
      </div>

      <div className="space-y-3">
        {leads.map((lead) => {
          const status = statusConfig[lead.status]
          return (
            <div key={lead.email} className="p-5 rounded-2xl bg-surface-2 border border-border hover:border-neon-cyan/30 transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-cyan/20 to-neon-green/20 flex items-center justify-center text-sm font-bold">
                    {lead.name[0]}
                  </div>
                  <div>
                    <div className="font-medium">{lead.name}</div>
                    <div className="text-xs text-muted">{lead.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-neon-cyan">{lead.type}</span>
                  <span className="text-xs text-muted">{lead.messages} msgs</span>
                  <span className={`px-2 py-1 rounded-full text-xs border ${status.class}`}>{status.text}</span>
                  <span className="text-xs text-muted">{lead.date}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
