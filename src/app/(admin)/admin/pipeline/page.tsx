'use client'

const columns = [
  {
    title: 'Nuevos',
    color: 'border-blue-500',
    items: [
      { name: 'Laura Sanz', type: 'SaaS', date: '2026-04-07' },
      { name: 'Diego Fernández', type: 'MVP', date: '2026-04-07' },
    ],
  },
  {
    title: 'Chateando',
    color: 'border-neon-cyan',
    items: [
      { name: 'María García', type: 'SaaS', date: '2026-04-06' },
    ],
  },
  {
    title: 'Prototipo Enviado',
    color: 'border-neon-purple',
    items: [
      { name: 'Carlos López', type: 'MVP', date: '2026-04-05' },
      { name: 'Elena Torres', type: 'Landing', date: '2026-04-04' },
    ],
  },
  {
    title: 'Aprobado',
    color: 'border-neon-green',
    items: [
      { name: 'Ana Martín', type: 'Landing', date: '2026-04-04' },
    ],
  },
  {
    title: 'En Desarrollo',
    color: 'border-yellow-400',
    items: [
      { name: 'Pedro Ruiz', type: 'Sistema', date: '2026-03-25' },
      { name: 'Sofía Díaz', type: 'SaaS', date: '2026-03-20' },
    ],
  },
]

export default function PipelinePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Pipeline</h2>
        <p className="text-muted text-sm">Vista Kanban de todos los proyectos</p>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((col) => (
          <div key={col.title} className="flex-shrink-0 w-72">
            <div className={`border-t-2 ${col.color} rounded-t-none rounded-b-2xl bg-surface-2 border border-border`}>
              <div className="px-4 py-3 flex items-center justify-between">
                <h3 className="font-semibold text-sm">{col.title}</h3>
                <span className="text-xs text-muted bg-surface-3 px-2 py-0.5 rounded-full">{col.items.length}</span>
              </div>
              <div className="px-3 pb-3 space-y-2">
                {col.items.map((item) => (
                  <div key={item.name} className="p-3 rounded-xl bg-surface-3 border border-border hover:border-neon-cyan/30 transition-colors cursor-pointer">
                    <div className="font-medium text-sm">{item.name}</div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-neon-cyan font-mono">{item.type}</span>
                      <span className="text-xs text-muted">{item.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
