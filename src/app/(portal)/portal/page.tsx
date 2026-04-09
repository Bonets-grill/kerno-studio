'use client'

const mockProject = {
  name: 'Mi Proyecto SaaS',
  status: 'in_progress' as const,
  progress: 65,
  startDate: '2026-03-20',
  estimatedDelivery: '2026-04-10',
  depositPaid: true,
  finalPaid: false,
  totalPrice: 4990,
}

const recentActivity = [
  { date: '2026-04-06', text: 'Módulo Auth completado', type: 'completed' },
  { date: '2026-04-05', text: 'Dashboard en progreso', type: 'progress' },
  { date: '2026-04-03', text: 'Prototipo aprobado', type: 'milestone' },
  { date: '2026-03-28', text: 'Depósito recibido', type: 'payment' },
  { date: '2026-03-25', text: 'Proyecto iniciado', type: 'milestone' },
]

const statusColors: Record<string, string> = {
  completed: 'text-neon-green',
  progress: 'text-neon-cyan',
  milestone: 'text-neon-purple',
  payment: 'text-yellow-400',
}

export default function PortalDashboard() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Project overview */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 p-6 rounded-2xl bg-surface-2 border border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">{mockProject.name}</h2>
            <span className="px-3 py-1 rounded-full text-xs bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20">
              En progreso
            </span>
          </div>

          {/* Progress bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted">Progreso general</span>
              <span className="font-mono text-neon-cyan">{mockProject.progress}%</span>
            </div>
            <div className="w-full h-3 rounded-full bg-surface-3">
              <div
                className="h-full rounded-full bg-gradient-to-r from-neon-cyan to-neon-green transition-all duration-1000"
                style={{ width: `${mockProject.progress}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted">Inicio</span>
              <div className="font-medium">{mockProject.startDate}</div>
            </div>
            <div>
              <span className="text-muted">Entrega estimada</span>
              <div className="font-medium">{mockProject.estimatedDelivery}</div>
            </div>
          </div>
        </div>

        {/* Payment status */}
        <div className="p-6 rounded-2xl bg-surface-2 border border-border">
          <h3 className="text-sm font-semibold mb-4">Pagos</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted">Depósito 50%</span>
              <span className={`text-sm font-medium ${mockProject.depositPaid ? 'text-neon-green' : 'text-yellow-400'}`}>
                {mockProject.depositPaid ? 'Pagado' : 'Pendiente'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted">Final 50%</span>
              <span className={`text-sm font-medium ${mockProject.finalPaid ? 'text-neon-green' : 'text-muted'}`}>
                {mockProject.finalPaid ? 'Pagado' : 'A la entrega'}
              </span>
            </div>
            <div className="pt-3 border-t border-border">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Total</span>
                <span className="font-bold gradient-text">{mockProject.totalPrice.toLocaleString()}€</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div className="p-6 rounded-2xl bg-surface-2 border border-border">
        <h3 className="text-lg font-semibold mb-6">Actividad reciente</h3>
        <div className="space-y-4">
          {recentActivity.map((item, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="w-2 h-2 rounded-full bg-neon-cyan mt-2 shrink-0" />
              <div className="flex-1">
                <div className={`text-sm font-medium ${statusColors[item.type]}`}>{item.text}</div>
                <div className="text-xs text-muted">{item.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
