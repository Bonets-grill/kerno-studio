import Link from 'next/link'

export default function PresentationCancelPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <div className="max-w-lg text-center">
        <div className="text-5xl mb-6">😕</div>
        <h1 className="text-3xl font-bold mb-3">Pago cancelado</h1>
        <p className="text-muted mb-6">
          No se ha realizado ningún cargo. Tu presentación sigue disponible si quieres completar el pago.
        </p>
        <Link
          href="/presentations"
          className="inline-flex px-6 py-3 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-green text-black font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          Volver a presentaciones
        </Link>
      </div>
    </main>
  )
}
