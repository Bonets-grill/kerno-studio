'use client'

const documents = [
  { name: 'Contrato de Desarrollo', type: 'contract', date: '2026-03-25', status: 'signed' },
  { name: 'Factura — Depósito 50%', type: 'invoice', date: '2026-03-28', status: 'paid' },
  { name: 'Resumen del Proyecto', type: 'summary', date: '2026-03-25', status: 'available' },
  { name: 'Factura — Pago Final 50%', type: 'invoice', date: '', status: 'pending' },
]

const typeIcons: Record<string, string> = {
  contract: '📝',
  invoice: '🧾',
  summary: '📋',
}

const statusLabels: Record<string, { text: string; class: string }> = {
  signed: { text: 'Firmado', class: 'text-neon-green' },
  paid: { text: 'Pagado', class: 'text-neon-green' },
  available: { text: 'Disponible', class: 'text-neon-cyan' },
  pending: { text: 'Pendiente', class: 'text-muted' },
}

export default function DocumentsPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Documentos</h2>
        <p className="text-muted text-sm">Contratos, facturas y documentación del proyecto</p>
      </div>

      <div className="space-y-3">
        {documents.map((doc) => {
          const status = statusLabels[doc.status]
          return (
            <div key={doc.name} className="p-5 rounded-2xl bg-surface-2 border border-border flex items-center justify-between hover:border-neon-cyan/30 transition-colors">
              <div className="flex items-center gap-4">
                <div className="text-2xl">{typeIcons[doc.type]}</div>
                <div>
                  <h3 className="font-medium text-sm">{doc.name}</h3>
                  <span className="text-xs text-muted">{doc.date || 'Fecha pendiente'}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-xs font-medium ${status.class}`}>{status.text}</span>
                {doc.status !== 'pending' && (
                  <button className="px-4 py-2 rounded-lg border border-border text-xs hover:border-neon-cyan/50 hover:bg-neon-cyan/5 transition-colors">
                    Descargar
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
