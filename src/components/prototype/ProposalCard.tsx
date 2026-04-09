'use client'

import { useState } from 'react'
import type { ProjectSummary } from '@/types/database'

interface ProposalCardProps {
  summary: ProjectSummary
  customerEmail?: string
}

export default function ProposalCard({ summary, customerEmail }: ProposalCardProps) {
  const [loading, setLoading] = useState(false)
  const [accepted, setAccepted] = useState(false)
  const deposit = Math.round(summary.total_price / 2)
  const final = summary.total_price - deposit

  const handlePay = async () => {
    if (!customerEmail) {
      alert('Email requerido para procesar el pago')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectName: summary.name,
          amount: deposit * 100, // cents
          type: 'deposit',
          projectId: `proj_${Date.now()}`,
          customerEmail,
        }),
      })

      const { url } = await response.json() as { url: string }
      if (url) window.location.href = url
    } catch {
      alert('Error al procesar el pago')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-surface-2 border border-border">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-neon-cyan to-neon-green flex items-center justify-center">
          <span className="text-black text-2xl font-bold">{summary.name[0]}</span>
        </div>
        <div>
          <h2 className="text-2xl font-bold">{summary.name}</h2>
          <span className="text-sm text-neon-cyan font-mono uppercase">{summary.type}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-muted mb-6">{summary.description}</p>

      {/* Module breakdown */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-3 text-foreground">Desglose de Módulos</h3>
        <div className="space-y-3">
          {summary.estimated_modules.map((mod) => (
            <div key={mod.name} className="flex items-center justify-between p-3 rounded-xl bg-surface-3 border border-border">
              <div>
                <span className="text-sm font-medium">{mod.name}</span>
                <span className="text-xs text-muted ml-2">{mod.description}</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-neon-green">{mod.price}€</div>
                <div className="text-xs text-muted">{mod.days} días</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Price summary */}
      <div className="p-6 rounded-xl bg-surface-3 border border-neon-cyan/20 mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-muted">Subtotal</span>
          <span className="font-mono">{summary.total_price.toLocaleString()}€</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-muted">Depósito (50%)</span>
          <span className="font-mono text-neon-cyan">{deposit.toLocaleString()}€</span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="text-muted">Pago final (50%)</span>
          <span className="font-mono">{final.toLocaleString()}€</span>
        </div>
        <div className="border-t border-border pt-4 flex justify-between">
          <span className="font-semibold">Total</span>
          <span className="text-2xl font-bold gradient-text">{summary.total_price.toLocaleString()}€</span>
        </div>
      </div>

      {/* Timeline */}
      <div className="flex items-center gap-2 mb-8 text-sm text-muted">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Plazo estimado: <span className="text-foreground font-medium">{summary.timeline_days} días</span>
      </div>

      {/* Terms */}
      <label className="flex items-start gap-3 mb-6 cursor-pointer">
        <input
          type="checkbox"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
          className="mt-1 w-4 h-4 rounded border-border accent-neon-cyan"
        />
        <span className="text-sm text-muted">
          Acepto los <a href="/legal/terms" className="text-neon-cyan hover:underline">términos y condiciones</a> y
          la <a href="/legal/privacy" className="text-neon-cyan hover:underline">política de privacidad</a>.
          Entiendo que pagaré 50% ahora y 50% a la entrega del proyecto.
        </span>
      </label>

      {/* Pay button */}
      <button
        onClick={handlePay}
        disabled={!accepted || loading}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-green text-black font-semibold text-lg hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {loading ? 'Procesando...' : `Pagar depósito de ${deposit.toLocaleString()}€`}
      </button>

      <p className="text-xs text-muted text-center mt-3">
        Pago seguro con Stripe. Factura generada automáticamente.
      </p>
    </div>
  )
}
