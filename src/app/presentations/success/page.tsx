'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function SuccessContent() {
  const searchParams = useSearchParams()
  const presId = searchParams.get('pres_id')

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <div className="max-w-lg text-center">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-neon-cyan to-neon-green flex items-center justify-center text-4xl mx-auto mb-6">
          ✅
        </div>
        <h1 className="text-3xl font-bold mb-3">¡Pago confirmado!</h1>
        <p className="text-muted mb-6">
          Tu presentación ha sido generada y el pago procesado correctamente.
          {presId && <span className="block text-xs mt-2 text-muted/60">ID: {presId}</span>}
        </p>
        <div className="flex gap-3 justify-center">
          <a
            href="/presentations"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-green text-black font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Crear otra presentación
          </a>
          <a
            href="/"
            className="px-6 py-3 rounded-xl border border-border hover:border-neon-cyan/50 text-foreground text-sm transition-all"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    </main>
  )
}

export default function PresentationSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <SuccessContent />
    </Suspense>
  )
}
