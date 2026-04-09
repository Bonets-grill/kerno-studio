'use client'

const stats = [
  { label: 'Leads totales', value: 47, change: '+12%', color: 'text-neon-cyan' },
  { label: 'Prototipos generados', value: 23, change: '+8%', color: 'text-neon-green' },
  { label: 'Proyectos activos', value: 8, change: '+3', color: 'text-neon-purple' },
  { label: 'Ingresos (mes)', value: '€24.5K', change: '+18%', color: 'text-yellow-400' },
]

const recentLeads = [
  { name: 'María García', email: 'maria@ejemplo.com', type: 'SaaS', status: 'chatting', date: '2026-04-07' },
  { name: 'Carlos López', email: 'carlos@test.com', type: 'MVP', status: 'prototype_sent', date: '2026-04-06' },
  { name: 'Ana Martín', email: 'ana@corp.com', type: 'Landing', status: 'approved', date: '2026-04-05' },
  { name: 'Pedro Ruiz', email: 'pedro@startup.io', type: 'Sistema', status: 'paid', date: '2026-04-04' },
  { name: 'Laura Sanz', email: 'laura@biz.com', type: 'SaaS', status: 'new', date: '2026-04-07' },
]

const statusBadge: Record<string, { text: string; class: string }> = {
  new: { text: 'Nuevo', class: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  chatting: { text: 'Chateando', class: 'bg-neon-cyan/10 text-neon-cyan border-neon-cyan/20' },
  prototype_sent: { text: 'Prototipo', class: 'bg-neon-purple/10 text-neon-purple border-neon-purple/20' },
  approved: { text: 'Aprobado', class: 'bg-neon-green/10 text-neon-green border-neon-green/20' },
  paid: { text: 'Pagado', class: 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20' },
}

export default function AdminDashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="p-5 rounded-2xl bg-surface-2 border border-border">
            <div className="text-sm text-muted mb-1">{stat.label}</div>
            <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-xs text-neon-green mt-1">{stat.change}</div>
          </div>
        ))}
      </div>

      {/* Conversion funnel */}
      <div className="p-6 rounded-2xl bg-surface-2 border border-border">
        <h3 className="text-lg font-semibold mb-6">Embudo de Conversión</h3>
        <div className="flex items-end gap-4 h-40">
          {[
            { label: 'Leads', value: 47, pct: 100 },
            { label: 'Prototipos', value: 23, pct: 49 },
            { label: 'Aprobados', value: 15, pct: 32 },
            { label: 'Pagados', value: 8, pct: 17 },
            { label: 'Entregados', value: 6, pct: 13 },
          ].map((step) => (
            <div key={step.label} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-sm font-bold">{step.value}</span>
              <div className="w-full rounded-t-lg bg-gradient-to-t from-neon-cyan to-neon-green" style={{ height: `${step.pct}%` }} />
              <span className="text-xs text-muted">{step.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent leads */}
      <div className="p-6 rounded-2xl bg-surface-2 border border-border">
        <h3 className="text-lg font-semibold mb-4">Leads Recientes</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 text-muted font-medium">Nombre</th>
                <th className="text-left py-3 text-muted font-medium">Email</th>
                <th className="text-left py-3 text-muted font-medium">Tipo</th>
                <th className="text-left py-3 text-muted font-medium">Estado</th>
                <th className="text-left py-3 text-muted font-medium">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {recentLeads.map((lead) => {
                const badge = statusBadge[lead.status]
                return (
                  <tr key={lead.email} className="border-b border-border/50 hover:bg-surface-3/50">
                    <td className="py-3 font-medium">{lead.name}</td>
                    <td className="py-3 text-muted">{lead.email}</td>
                    <td className="py-3">
                      <span className="text-xs font-mono text-neon-cyan">{lead.type}</span>
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs border ${badge.class}`}>{badge.text}</span>
                    </td>
                    <td className="py-3 text-muted">{lead.date}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
