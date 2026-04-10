'use client'

import { motion } from 'framer-motion'
import { useI18n } from '@/lib/i18n/context'

const templates = [
  { id: 'crm', name: 'CRM & Ventas', icon: '💼', desc: 'Pipeline, contactos, deals, email tracking', gradient: 'from-blue-600 to-indigo-600', industry: 'Ventas' },
  { id: 'ecommerce', name: 'Tienda Online', icon: '🛒', desc: 'Productos, pedidos, inventario, clientes', gradient: 'from-purple-600 to-pink-600', industry: 'Comercio' },
  { id: 'restaurant', name: 'Restaurante', icon: '🍽️', desc: 'Reservas, carta digital, pedidos, reseñas', gradient: 'from-amber-600 to-orange-600', industry: 'Hostelería' },
  { id: 'clinic', name: 'Clínica / Salud', icon: '🏥', desc: 'Citas, pacientes, historial, facturación', gradient: 'from-teal-600 to-cyan-600', industry: 'Salud' },
  { id: 'gym', name: 'Gimnasio / Fitness', icon: '💪', desc: 'Socios, clases, acceso QR, entrenadores', gradient: 'from-red-600 to-orange-600', industry: 'Deportes' },
  { id: 'realestate', name: 'Inmobiliaria', icon: '🏠', desc: 'Propiedades, clientes, visitas, valoraciones', gradient: 'from-yellow-700 to-amber-600', industry: 'Inmuebles' },
  { id: 'lms', name: 'Cursos Online', icon: '🎓', desc: 'Cursos, alumnos, lecciones, certificados', gradient: 'from-indigo-600 to-violet-600', industry: 'Educación' },
  { id: 'booking', name: 'Hotel / Booking', icon: '🏨', desc: 'Habitaciones, reservas, calendario, huéspedes', gradient: 'from-sky-600 to-blue-600', industry: 'Turismo' },
  { id: 'delivery', name: 'Delivery / Envíos', icon: '🚚', desc: 'Pedidos, rutas, repartidores, tracking', gradient: 'from-green-600 to-emerald-600', industry: 'Logística' },
  { id: 'erp', name: 'ERP Empresarial', icon: '🏢', desc: 'Facturación, inventario, RRHH, informes', gradient: 'from-slate-600 to-gray-600', industry: 'Empresa' },
  { id: 'accounting', name: 'Contabilidad', icon: '📊', desc: 'Facturas, gastos, impuestos, banco', gradient: 'from-emerald-700 to-green-600', industry: 'Finanzas' },
  { id: 'hr', name: 'Recursos Humanos', icon: '👥', desc: 'Directorio, reclutamiento, nóminas, vacaciones', gradient: 'from-green-600 to-teal-600', industry: 'RRHH' },
  { id: 'projectmgmt', name: 'Gestión Proyectos', icon: '📋', desc: 'Kanban, tareas, equipo, timeline Gantt', gradient: 'from-violet-600 to-purple-600', industry: 'Proyectos' },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function TemplateGallery() {
  const { t } = useI18n()

  const handleSelect = (templateId: string, templateName: string) => {
    window.dispatchEvent(new CustomEvent('kerno:select-template', {
      detail: { templateId, templateName }
    }))
    document.getElementById('chat')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="templates" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Elige tu <span className="gradient-text">sistema</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-muted text-lg max-w-2xl mx-auto"
          >
            Plantillas premium listas para personalizar. Elige una y hazla tuya.
          </motion.p>
        </div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {templates.map((template) => (
            <motion.div
              key={template.id}
              variants={cardVariants}
              className="rounded-2xl bg-surface-2 border border-border hover:border-neon-cyan/30 overflow-hidden transition-colors group"
            >
              {/* Gradient header */}
              <div className={`relative h-32 bg-gradient-to-br ${template.gradient} flex items-center justify-center`}>
                <span className="text-4xl">{template.icon}</span>
                <span className="absolute top-3 right-3 text-xs px-2 py-0.5 rounded-full bg-black/30 text-white/90 font-medium">
                  {template.industry}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col gap-3">
                <h3 className="font-bold text-lg">{template.name}</h3>
                <p className="text-muted text-sm leading-relaxed">{template.desc}</p>
                <button
                  onClick={() => handleSelect(template.id, template.name)}
                  className="mt-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-green text-black font-semibold text-sm hover:opacity-90 transition-opacity"
                >
                  Elegir este sistema &rarr;
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
