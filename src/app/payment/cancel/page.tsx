export default function PaymentCancel() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-background">
      <div className="max-w-md text-center">
        <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-3">Pago cancelado</h1>
        <p className="text-muted mb-8">
          El pago no se ha procesado. Tu proyecto sigue disponible y puedes
          completar el pago cuando quieras.
        </p>
        <a
          href="/"
          className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-neon-cyan to-neon-green text-black font-semibold hover:opacity-90 transition-opacity"
        >
          Volver al inicio
        </a>
      </div>
    </div>
  )
}
