'use client'

const modules = [
  { name: 'Auth & Registro', status: 'completed' as const, progress: 100, days: 3 },
  { name: 'Dashboard Principal', status: 'in_progress' as const, progress: 70, days: 5 },
  { name: 'Gestión de Usuarios', status: 'in_progress' as const, progress: 30, days: 4 },
  { name: 'API & Integraciones', status: 'pending' as const, progress: 0, days: 4 },
  { name: 'Pagos & Facturación', status: 'pending' as const, progress: 0, days: 3 },
  { name: 'Testing & Deploy', status: 'pending' as const, progress: 0, days: 2 },
]

const statusConfig = {
  completed: { label: 'Completado', color: 'text-neon-green', bg: 'bg-neon-green/10 border-neon-green/20' },
  in_progress: { label: 'En progreso', color: 'text-neon-cyan', bg: 'bg-neon-cyan/10 border-neon-cyan/20' },
  pending: { label: 'Pendiente', color: 'text-muted', bg: 'bg-surface-3 border-border' },
}

export default function ProgressPage() {
  const totalDays = modules.reduce((sum, m) => sum + m.days, 0)
  const completedDays = modules.reduce((sum, m) => sum + (m.progress / 100) * m.days, 0)

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Progreso del Proyecto</h2>
        <p className="text-muted">Timeline detallado por módulo</p>
      </div>

      {/* Overall progress */}
      <div className="p-6 rounded-2xl bg-surface-2 border border-border">
        <div className="flex justify-between text-sm mb-3">
          <span className="text-muted">Progreso general</span>
          <span className="font-mono text-neon-cyan">{Math.round((completedDays / totalDays) * 100)}%</span>
        </div>
        <div className="w-full h-4 rounded-full bg-surface-3">
          <div
            className="h-full rounded-full bg-gradient-to-r from-neon-cyan to-neon-green"
            style={{ width: `${(completedDays / totalDays) * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted mt-2">
          <span>{Math.round(completedDays)} días completados</span>
          <span>{totalDays} días totales</span>
        </div>
      </div>

      {/* Module timeline */}
      <div className="space-y-4">
        {modules.map((mod, i) => {
          const config = statusConfig[mod.status]
          return (
            <div key={mod.name} className="p-5 rounded-2xl bg-surface-2 border border-border">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${config.bg} border`}>
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold">{mod.name}</h3>
                    <span className="text-xs text-muted">{mod.days} días estimados</span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs ${config.bg} ${config.color} border`}>
                  {config.label}
                </span>
              </div>

              {mod.status !== 'pending' && (
                <div className="ml-11">
                  <div className="w-full h-2 rounded-full bg-surface-3">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${
                        mod.status === 'completed'
                          ? 'bg-neon-green'
                          : 'bg-gradient-to-r from-neon-cyan to-neon-green'
                      }`}
                      style={{ width: `${mod.progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted mt-1 block">{mod.progress}%</span>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
