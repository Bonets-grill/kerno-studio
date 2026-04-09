'use client'

import { useState, useEffect } from 'react'
import type { ProjectSummary } from '@/types/database'
import { useI18n } from '@/lib/i18n/context'

interface Addon {
  id: string
  label: string
  description: string
  price: number
  icon: string
}

const ADDON_POOL: Addon[] = [
  { id: 'analytics', label: 'Dashboard Analytics', description: 'Métricas en tiempo real de ingresos, reservas y ocupación', price: 400, icon: '📊' },
  { id: 'multiLang', label: 'Multi-idioma', description: 'Interfaz en español, inglés, alemán y francés para turistas', price: 350, icon: '🌍' },
  { id: 'reviews', label: 'Sistema de reseñas', description: 'Los clientes pueden dejar valoraciones después del alquiler', price: 250, icon: '⭐' },
  { id: 'loyalty', label: 'Programa de fidelización', description: 'Puntos y descuentos para clientes que repiten', price: 400, icon: '🎁' },
  { id: 'chatbot', label: 'Chatbot IA 24/7', description: 'Asistente automático para preguntas frecuentes en tu web', price: 500, icon: '🤖' },
  { id: 'seo', label: 'SEO optimizado', description: 'Posicionamiento en Google para "alquiler coches Tenerife"', price: 300, icon: '🔍' },
  { id: 'notifications', label: 'Push notifications', description: 'Avisos al móvil del cliente sobre su reserva', price: 200, icon: '🔔' },
  { id: 'reports', label: 'Informes PDF mensuales', description: 'Resumen automático de ingresos, gastos y ocupación', price: 300, icon: '📄' },
  { id: 'compare', label: 'Comparador de vehículos', description: 'Los clientes comparan modelos lado a lado', price: 250, icon: '🔄' },
  { id: 'insurance', label: 'Gestor de seguros', description: 'Control de pólizas, siniestros y partes por vehículo', price: 350, icon: '🛡️' },
]

const BUILDING_TIPS = [
  '¿Sabías que el 73% de turistas reserva desde el móvil? Tu app estará optimizada para ello.',
  'Un sistema de reseñas puede aumentar las conversiones hasta un 35%.',
  'Los recordatorios por WhatsApp reducen los no-shows en un 60%.',
  'Un dashboard de analytics te ayudará a saber qué categoría de coche es más rentable.',
  'El programa de fidelización retiene al 40% de los clientes que repiten destino.',
  'Un chatbot IA puede resolver el 80% de las consultas sin intervención humana.',
  'Las fotos del check-in/check-out eliminan el 95% de las disputas por daños.',
  'Un comparador de vehículos aumenta el tiempo en la web y las reservas.',
]

interface BuildingPreviewProps {
  summary: ProjectSummary
  selectedAddons: string[]
  onToggleAddon: (id: string) => void
  progress: number
}

export default function BuildingPreview({ summary, selectedAddons, onToggleAddon, progress }: BuildingPreviewProps) {
  const { t } = useI18n()
  const [tipIndex, setTipIndex] = useState(0)
  const [fadeIn, setFadeIn] = useState(true)

  // Rotate tips
  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false)
      setTimeout(() => {
        setTipIndex((prev) => (prev + 1) % BUILDING_TIPS.length)
        setFadeIn(true)
      }, 300)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Pick 5 relevant addons
  const addons = ADDON_POOL.slice(0, 5)
  const addonsTotal = addons.filter(a => selectedAddons.includes(a.id)).reduce((sum, a) => sum + a.price, 0)

  return (
    <div className="flex flex-col h-full">
      {/* Building animation */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        {/* Animated construction icon */}
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-neon-cyan/20 to-neon-green/20 border border-neon-cyan/30 flex items-center justify-center animate-pulse">
            <span className="text-4xl">🏗️</span>
          </div>
          {/* Orbiting dots */}
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s' }}>
            <div className="absolute -top-1 left-1/2 w-2 h-2 rounded-full bg-neon-cyan" />
          </div>
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse' }}>
            <div className="absolute -bottom-1 left-1/2 w-2 h-2 rounded-full bg-neon-green" />
          </div>
        </div>

        <h3 className="text-xl font-bold mb-2">{t.building_title}</h3>
        <p className="text-muted text-sm mb-6">
          {t.building_subtitle} <span className="text-neon-cyan font-medium">{summary.name}</span>
        </p>

        {/* Progress bar */}
        <div className="w-full max-w-xs mb-8">
          <div className="flex justify-between text-xs text-muted mb-1">
            <span>{t.building_generating}</span>
            <span>{Math.round(Math.min(progress, 100))}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-surface-3">
            <div
              className="h-full rounded-full bg-gradient-to-r from-neon-cyan to-neon-green transition-all duration-500"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>

        {/* Rotating tip */}
        <div className={`max-w-sm transition-opacity duration-300 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
          <div className="p-4 rounded-xl bg-neon-cyan/5 border border-neon-cyan/10">
            <span className="text-xs text-neon-cyan font-medium block mb-1">💡 {t.building_tip_label}</span>
            <p className="text-sm text-muted">{BUILDING_TIPS[tipIndex]}</p>
          </div>
        </div>
      </div>

      {/* Upsell add-ons */}
      <div className="border-t border-border p-5">
        <h4 className="text-sm font-semibold mb-3">
          {t.building_upsell_title} <span className="text-muted font-normal">· {t.building_upsell_subtitle}</span>
        </h4>
        <div className="space-y-2 max-h-[250px] overflow-y-auto">
          {addons.map((addon) => {
            const selected = selectedAddons.includes(addon.id)
            return (
              <button
                key={addon.id}
                onClick={() => onToggleAddon(addon.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                  selected
                    ? 'bg-neon-cyan/10 border border-neon-cyan/30'
                    : 'bg-surface-3 border border-border hover:border-neon-cyan/20'
                }`}
              >
                <span className="text-lg">{addon.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{addon.label}</div>
                  <div className="text-xs text-muted truncate">{addon.description}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className={`text-sm font-mono ${selected ? 'text-neon-green' : 'text-muted'}`}>+{addon.price}€</div>
                  <div className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] ${
                    selected ? 'bg-neon-cyan border-neon-cyan text-black' : 'border-border'
                  }`}>
                    {selected && '✓'}
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {addonsTotal > 0 && (
          <div className="mt-3 pt-3 border-t border-border flex justify-between items-center">
            <span className="text-sm text-muted">Extras seleccionados</span>
            <span className="font-bold text-neon-green">+{addonsTotal.toLocaleString()}€</span>
          </div>
        )}
      </div>
    </div>
  )
}

export { ADDON_POOL }
export type { Addon }
