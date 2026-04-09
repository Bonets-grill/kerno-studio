'use client'

const prototypes = [
  { name: 'RestoCRM', lead: 'María García', pages: 6, status: 'sent', date: '2026-04-06' },
  { name: 'FitApp', lead: 'Carlos López', pages: 5, status: 'approved', date: '2026-04-05' },
  { name: 'AnaWeb', lead: 'Ana Martín', pages: 4, status: 'approved', date: '2026-04-04' },
  { name: 'ElenaLanding', lead: 'Elena Torres', pages: 3, status: 'sent', date: '2026-04-04' },
]

const statusLabels: Record<string, { text: string; class: string }> = {
  generating: { text: 'Generando', class: 'text-yellow-400' },
  sent: { text: 'Enviado', class: 'text-neon-cyan' },
  approved: { text: 'Aprobado', class: 'text-neon-green' },
  rejected: { text: 'Rechazado', class: 'text-red-400' },
}

export default function PrototypesPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Prototipos Generados</h2>
        <p className="text-muted text-sm">Todos los prototipos IA generados para leads</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {prototypes.map((proto) => {
          const status = statusLabels[proto.status]
          return (
            <div key={proto.name} className="p-6 rounded-2xl bg-surface-2 border border-border hover:border-neon-cyan/30 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-lg">{proto.name}</h3>
                  <span className="text-xs text-muted">Lead: {proto.lead}</span>
                </div>
                <span className={`text-xs font-medium ${status.class}`}>{status.text}</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted">
                <span>{proto.pages} páginas</span>
                <span>{proto.date}</span>
              </div>
              <button className="mt-4 w-full py-2 rounded-xl border border-border text-sm hover:border-neon-cyan/50 hover:bg-neon-cyan/5 transition-colors">
                Ver prototipo
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
