'use client'

const payments = [
  { project: 'Pedro Ruiz — Sistema', type: 'deposit', amount: 3995, status: 'paid', date: '2026-04-03' },
  { project: 'Sofía Díaz — SaaS', type: 'deposit', amount: 4495, status: 'paid', date: '2026-03-20' },
  { project: 'Ana Martín — Landing', type: 'deposit', amount: 495, status: 'pending', date: '' },
  { project: 'Pedro Ruiz — Sistema', type: 'final', amount: 3995, status: 'pending', date: '' },
  { project: 'Sofía Díaz — SaaS', type: 'final', amount: 4495, status: 'pending', date: '' },
]

const totalReceived = payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0)
const totalPending = payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0)

export default function PaymentsPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Pagos</h2>
        <p className="text-muted text-sm">Historial de pagos y facturación</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-surface-2 border border-border">
          <div className="text-sm text-muted">Recibido</div>
          <div className="text-2xl font-bold text-neon-green">{totalReceived.toLocaleString()}€</div>
        </div>
        <div className="p-5 rounded-2xl bg-surface-2 border border-border">
          <div className="text-sm text-muted">Pendiente</div>
          <div className="text-2xl font-bold text-yellow-400">{totalPending.toLocaleString()}€</div>
        </div>
        <div className="p-5 rounded-2xl bg-surface-2 border border-border">
          <div className="text-sm text-muted">Total</div>
          <div className="text-2xl font-bold gradient-text">{(totalReceived + totalPending).toLocaleString()}€</div>
        </div>
      </div>

      {/* Payments table */}
      <div className="p-6 rounded-2xl bg-surface-2 border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 text-muted font-medium">Proyecto</th>
              <th className="text-left py-3 text-muted font-medium">Tipo</th>
              <th className="text-left py-3 text-muted font-medium">Monto</th>
              <th className="text-left py-3 text-muted font-medium">Estado</th>
              <th className="text-left py-3 text-muted font-medium">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p, i) => (
              <tr key={i} className="border-b border-border/50">
                <td className="py-3 font-medium">{p.project}</td>
                <td className="py-3">
                  <span className={`text-xs font-mono ${p.type === 'deposit' ? 'text-neon-cyan' : 'text-neon-purple'}`}>
                    {p.type === 'deposit' ? 'Depósito' : 'Final'}
                  </span>
                </td>
                <td className="py-3 font-mono">{p.amount.toLocaleString()}€</td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded-full text-xs border ${
                    p.status === 'paid'
                      ? 'bg-neon-green/10 text-neon-green border-neon-green/20'
                      : 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20'
                  }`}>
                    {p.status === 'paid' ? 'Pagado' : 'Pendiente'}
                  </span>
                </td>
                <td className="py-3 text-muted">{p.date || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
