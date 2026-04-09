'use client'

interface PriceBreakdownProps {
  costUsd: number
  priceUsd: number
  priceCents: number
  onCheckout: () => void
  loading: boolean
}

export default function PriceBreakdown({ costUsd, priceUsd, onCheckout, loading }: PriceBreakdownProps) {
  const priceEur = priceUsd // Approximate 1:1 for display

  return (
    <div className="p-5 rounded-2xl bg-surface-2 border border-neon-green/20">
      <h4 className="text-sm font-semibold mb-3">Tu presentación está lista</h4>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted">Coste de generación</span>
          <span className="text-muted">${costUsd.toFixed(4)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted">Servicio (×7)</span>
          <span className="text-muted">${(priceUsd - costUsd).toFixed(2)}</span>
        </div>
        <div className="h-px bg-border" />
        <div className="flex justify-between items-center">
          <span className="font-semibold">Total</span>
          <span className="text-2xl font-bold gradient-text">€{priceEur.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={onCheckout}
        disabled={loading}
        className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-green text-black font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {loading ? 'Procesando...' : `Pagar €${priceEur.toFixed(2)} y Descargar`}
      </button>

      <p className="text-xs text-muted text-center mt-2">
        Pago seguro con Stripe. Acceso inmediato tras el pago.
      </p>
    </div>
  )
}
