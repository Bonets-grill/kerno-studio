'use client'

import { useState } from 'react'

interface OnboardingWizardProps {
  onComplete: (prompt: string) => void
}

const INDUSTRIES = [
  { id: 'restaurant', icon: '🍽️', label: 'Restaurante / Bar' },
  { id: 'clinic', icon: '🏥', label: 'Clínica / Salud' },
  { id: 'ecommerce', icon: '🛒', label: 'Tienda Online' },
  { id: 'gym', icon: '💪', label: 'Gimnasio / Fitness' },
  { id: 'realestate', icon: '🏠', label: 'Inmobiliaria' },
  { id: 'lms', icon: '🎓', label: 'Cursos / Educación' },
  { id: 'booking', icon: '🏨', label: 'Hotel / Booking' },
  { id: 'crm', icon: '💼', label: 'CRM / Ventas' },
  { id: 'delivery', icon: '🚚', label: 'Delivery / Envíos' },
  { id: 'erp', icon: '🏢', label: 'ERP Empresarial' },
  { id: 'accounting', icon: '📊', label: 'Contabilidad' },
  { id: 'hr', icon: '👥', label: 'Recursos Humanos' },
  { id: 'projectmgmt', icon: '📋', label: 'Gestión Proyectos' },
  { id: 'other', icon: '✨', label: 'Otro tipo' },
]

const FEATURE_MAP: Record<string, string[]> = {
  restaurant: ['Gestión de reservas', 'Carta digital QR', 'Pedidos por mesa', 'Reseñas y valoraciones', 'Analytics de facturación'],
  clinic: ['Gestión de citas', 'Historial clínico', 'Facturación con seguros', 'Portal de pacientes', 'Recordatorios SMS'],
  ecommerce: ['Catálogo de productos', 'Carrito de compras', 'Gestión de inventario', 'Seguimiento de pedidos', 'Analytics de ventas'],
  gym: ['Control de acceso QR', 'Gestión de membresías', 'Reserva de clases', 'Seguimiento de progreso', 'Panel de entrenadores'],
  realestate: ['Listado de propiedades', 'CRM de clientes', 'Agenda de visitas', 'Valoración automática', 'Alertas de propiedades'],
  lms: ['Catálogo de cursos', 'Gestión de alumnos', 'Sistema de lecciones', 'Emisión de certificados', 'Analytics de progreso'],
  booking: ['Gestión de habitaciones', 'Sistema de reservas', 'Calendario de ocupación', 'Ficha de huéspedes', 'Revenue analytics'],
  crm: ['Pipeline de ventas', 'Gestión de contactos', 'Seguimiento de deals', 'Email tracking', 'Reportes del equipo'],
  delivery: ['Gestión de pedidos', 'Asignación de rutas', 'Tracking en tiempo real', 'Control de repartidores', 'Analytics de entregas'],
  erp: ['Facturación con IVA', 'Control de inventario', 'Gestión de RRHH', 'Informes financieros', 'Dashboard general'],
  accounting: ['Facturación', 'Control de gastos', 'Liquidación de impuestos', 'Conciliación bancaria', 'Reportes financieros'],
  hr: ['Directorio de empleados', 'Reclutamiento', 'Gestión de nóminas', 'Control de vacaciones', 'Analytics de personas'],
  projectmgmt: ['Tablero Kanban', 'Gestión de tareas', 'Equipos y roles', 'Timeline / Gantt', 'Sprint analytics'],
  other: ['Dashboard principal', 'Gestión de datos', 'Analytics', 'Configuración', 'Usuarios y roles'],
}

export default function OnboardingWizard({ onComplete }: OnboardingWizardProps) {
  const [step, setStep] = useState(1)
  const [industry, setIndustry] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])

  const features = FEATURE_MAP[industry] || FEATURE_MAP.other

  const handleFinish = () => {
    const industryLabel = INDUSTRIES.find(i => i.id === industry)?.label || industry
    const featureList = selectedFeatures.length > 0 ? selectedFeatures.join(', ') : features.join(', ')
    const prompt = `Necesito un sistema para mi negocio ${businessName || 'mi empresa'}. Es un ${industryLabel}. Necesito estas funciones: ${featureList}.`
    onComplete(prompt)
  }

  const toggleFeature = (f: string) => {
    setSelectedFeatures(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f])
  }

  return (
    <div className="py-6 px-2">
      {/* Step indicators */}
      <div className="flex justify-center gap-2 mb-6">
        {[1, 2, 3].map(s => (
          <div key={s} className={`w-8 h-1 rounded-full transition-colors ${s <= step ? 'bg-gradient-to-r from-neon-cyan to-neon-green' : 'bg-surface-3'}`} />
        ))}
      </div>

      {/* Step 1: Industry */}
      {step === 1 && (
        <div>
          <h3 className="text-lg font-bold text-center mb-1">¿Qué tipo de negocio tienes?</h3>
          <p className="text-sm text-muted text-center mb-4">Selecciona tu industria para personalizar el sistema</p>
          <div className="grid grid-cols-2 gap-2">
            {INDUSTRIES.map(ind => (
              <button
                key={ind.id}
                onClick={() => { setIndustry(ind.id); setStep(2) }}
                className={`p-3 rounded-xl border text-left transition-all hover:border-neon-cyan/50 ${
                  industry === ind.id ? 'border-neon-cyan bg-neon-cyan/5' : 'border-border bg-surface-3'
                }`}
              >
                <span className="text-xl">{ind.icon}</span>
                <span className="text-sm ml-2">{ind.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Name */}
      {step === 2 && (
        <div>
          <h3 className="text-lg font-bold text-center mb-1">¿Cómo se llama tu negocio?</h3>
          <p className="text-sm text-muted text-center mb-4">El nombre aparecerá en el prototipo</p>
          <input
            type="text"
            value={businessName}
            onChange={e => setBusinessName(e.target.value)}
            placeholder="Ej: La Trattoria, SmileCare, FitZone..."
            className="w-full px-4 py-3 rounded-xl bg-surface-3 border border-border text-foreground placeholder:text-muted/50 focus:outline-none focus:border-neon-cyan/50 mb-4"
            autoFocus
          />
          <div className="flex gap-2">
            <button onClick={() => setStep(1)} className="px-4 py-2.5 rounded-xl border border-border text-sm text-muted">← Atrás</button>
            <button
              onClick={() => setStep(3)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-green text-black font-semibold text-sm"
            >
              Siguiente →
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Features */}
      {step === 3 && (
        <div>
          <h3 className="text-lg font-bold text-center mb-1">¿Qué funciones necesitas?</h3>
          <p className="text-sm text-muted text-center mb-4">Selecciona las que aplican (puedes elegir todas)</p>
          <div className="flex flex-col gap-2 mb-4">
            {features.map(f => (
              <button
                key={f}
                onClick={() => toggleFeature(f)}
                className={`px-4 py-2.5 rounded-xl border text-sm text-left transition-all ${
                  selectedFeatures.includes(f) ? 'border-neon-green bg-neon-green/5 text-neon-green' : 'border-border text-muted hover:border-neon-cyan/30'
                }`}
              >
                {selectedFeatures.includes(f) ? '✓ ' : '○ '}{f}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={() => setStep(2)} className="px-4 py-2.5 rounded-xl border border-border text-sm text-muted">← Atrás</button>
            <button
              onClick={handleFinish}
              className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-green text-black font-semibold text-sm"
            >
              Generar mi sistema →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
