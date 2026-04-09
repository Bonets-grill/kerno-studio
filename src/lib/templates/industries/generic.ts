import type { TemplateDefinition, TemplateCustomization } from '../types'
import { designSystemCSS } from '../shared/design-system'
import { allScripts } from '../shared/scripts'
import {
  navBar, heroSection, notificationContainer, section,
  kpiGrid, dataTable, progressBar, horizontalBarChart,
  stepProcess, settingsForm, alertRow, bigResult,
  whatsappChat,
  type KpiData, type TableColumn, type WAChatMessage,
  type StepData, type SettingsField, type BarChartItem,
} from '../shared/components'

export const genericTemplate: TemplateDefinition = {
  meta: {
    id: 'generic',
    name: 'Universal Premium',
    industries: ['generic', 'technology', 'services', 'consulting', 'education', 'logistics', 'manufacturing'],
    projectTypes: ['landing', 'mvp', 'system', 'saas'],
    sections: ['hero', 'dashboard', 'features', 'data', 'process', 'analytics', 'notifications', 'settings'],
    description: 'Plantilla universal premium que se adapta a cualquier tipo de negocio. Dashboard, gestión de datos, procesos automatizados, analytics y configuración.',
  },

  render(c: TemplateCustomization): string {
    const md = c.mockData as GenericMockData
    const modules = c.modules || []
    const features = c.features || []

    // ── Nav
    const nav = navBar(c.businessName, [
      { id: 'hero', label: 'Inicio' },
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'features', label: 'Módulos' },
      { id: 'data', label: 'Datos' },
      { id: 'process', label: 'Procesos' },
      { id: 'analytics', label: 'Analytics' },
      { id: 'contact', label: 'Contacto' },
      { id: 'settings', label: 'Config' },
    ])

    // ── Hero
    const hero = heroSection(
      c.businessName,
      md?.heroTagline || c.businessName,
      md?.heroSubtitle || c.modules.map(m => m.name).join(' · '),
      [
        { value: modules.length || 6, label: 'Módulos' },
        { value: md?.totalUsers || 1200, label: 'Usuarios' },
        { value: md?.automatedTasks || 35, label: 'Procesos Auto' },
        { value: '99.9%', label: 'Uptime' },
      ],
      `Demo Interactivo — ${c.businessType}`
    )

    // ── Dashboard
    const dashKpis: KpiData[] = [
      { icon: '📊', label: 'Ingresos Mes', value: md?.revenue || 28450, prefix: '€', trend: { value: '+12.3%', direction: 'up' } },
      { icon: '👥', label: 'Usuarios Activos', value: md?.activeUsers || 847, trend: { value: '+5.2%', direction: 'up' } },
      { icon: '📋', label: 'Tareas Pendientes', value: md?.pendingTasks || 23, trend: { value: '-8%', direction: 'down' } },
      { icon: '⚡', label: 'Eficiencia', value: md?.efficiency || 94, suffix: '%', trend: { value: '+3.1%', direction: 'up' } },
    ]

    const activityItems: BarChartItem[] = md?.activityChart || [
      { label: 'Ventas', value: 340 },
      { label: 'Soporte', value: 220 },
      { label: 'Marketing', value: 180 },
      { label: 'Operaciones', value: 150 },
      { label: 'Admin', value: 95 },
    ]

    const dashAlerts = [
      alertRow('🔔', md?.alert1 || '3 tareas vencidas necesitan atención', 'Urgente', 'badge-red'),
      alertRow('📈', md?.alert2 || 'Objetivo mensual alcanzado al 87%', '87%', 'badge-green'),
      alertRow('🔄', md?.alert3 || 'Backup automático completado hace 2h', 'OK', 'badge-blue'),
      alertRow('⚠️', md?.alert4 || 'Renovación de licencia en 15 días', '15d', 'badge-yellow'),
    ]

    const dashboardContent = `
      ${kpiGrid(dashKpis)}
      <div class="grid-2" style="margin-top:1.5rem">
        <div class="card">
          <div class="card-header"><h3>Actividad por Área</h3></div>
          ${horizontalBarChart(activityItems)}
        </div>
        <div class="card">
          <div class="card-header"><h3>Alertas del Sistema</h3></div>
          ${dashAlerts.join('')}
        </div>
      </div>`

    const dashSection = section('dashboard', c.businessType.toUpperCase(), 'Panel de Control',
      'Vista general del rendimiento de tu negocio en tiempo real.',
      dashboardContent)

    // ── Features / Modules
    const moduleCards = modules.length > 0
      ? modules.map(m => `
        <div class="card" style="padding:1.2rem">
          <div style="font-size:1.6rem;margin-bottom:0.5rem">${m.icon || '⚙️'}</div>
          <h4 style="font-size:0.9rem;font-weight:700;margin-bottom:0.3rem">${m.name}</h4>
          <p style="font-size:0.78rem;color:var(--text-muted);line-height:1.5">${m.description}</p>
          <span class="badge ${m.status === 'active' ? 'badge-green' : 'badge-yellow'}" style="margin-top:0.6rem;display:inline-block">${m.status === 'active' ? 'Activo' : 'Próximamente'}</span>
        </div>`)
      : features.map((f, i) => `
        <div class="card" style="padding:1.2rem">
          <div style="font-size:1.6rem;margin-bottom:0.5rem">${['🚀','📊','🔗','💡','🛡️','⚙️'][i % 6]}</div>
          <h4 style="font-size:0.9rem;font-weight:700;margin-bottom:0.3rem">${f}</h4>
          <p style="font-size:0.78rem;color:var(--text-muted);line-height:1.5">Funcionalidad integrada en el sistema.</p>
          <span class="badge badge-green" style="margin-top:0.6rem;display:inline-block">Activo</span>
        </div>`)

    const featuresContent = `<div class="grid-3">${moduleCards.join('')}</div>`
    const featSection = section('features', 'MÓDULOS', 'Funcionalidades del Sistema',
      `Todos los módulos de ${c.businessName} trabajando en conjunto.`,
      featuresContent)

    // ── Data section (table)
    const tableCols: TableColumn[] = md?.tableColumns || [
      { label: 'ID', key: 'id' },
      { label: 'Nombre', key: 'name' },
      { label: 'Estado', key: 'status' },
      { label: 'Fecha', key: 'date' },
      { label: 'Valor', key: 'value', align: 'right' },
    ]
    const tableRows = md?.tableRows || [
      { id: '#1042', name: 'Proyecto Alpha', status: '<span class="badge badge-green">Activo</span>', date: '08/04/2026', value: '€2,450' },
      { id: '#1041', name: 'Migración Base Datos', status: '<span class="badge badge-yellow">En curso</span>', date: '05/04/2026', value: '€1,800' },
      { id: '#1040', name: 'Integración API', status: '<span class="badge badge-blue">Revisión</span>', date: '03/04/2026', value: '€3,200' },
      { id: '#1039', name: 'Auditoría Seguridad', status: '<span class="badge badge-green">Activo</span>', date: '01/04/2026', value: '€950' },
      { id: '#1038', name: 'Redesign Portal', status: '<span class="badge badge-red">Bloqueado</span>', date: '28/03/2026', value: '€4,100' },
      { id: '#1037', name: 'Campaña Q2', status: '<span class="badge badge-green">Activo</span>', date: '25/03/2026', value: '€1,600' },
    ]

    const dataContent = `
      <div class="card">${dataTable(tableCols, tableRows)}</div>
      <div style="margin-top:1rem;display:flex;gap:0.5rem">
        <button class="hero-btn" style="font-size:0.78rem;padding:8px 18px" onclick="showNotif('✅','Exportado','Datos exportados a CSV')">Exportar CSV</button>
        <button class="hero-btn" style="font-size:0.78rem;padding:8px 18px;background:var(--bg-card);border:1px solid var(--border);color:var(--text)" onclick="showNotif('🔄','Actualizado','Datos sincronizados')">Sincronizar</button>
      </div>`
    const dataSection = section('data', 'GESTIÓN', 'Datos y Registros',
      'Accede y gestiona toda la información centralizada de tu negocio.',
      dataContent)

    // ── Process section
    const processSteps: StepData[] = md?.processSteps || [
      { title: 'Solicitud entrante', description: 'El sistema detecta una nueva solicitud y la clasifica automáticamente.', detail: 'IA analiza el contenido y asigna prioridad y categoría.', icon: '📥' },
      { title: 'Validación automática', description: 'Se verifican los datos, documentos y requisitos necesarios.', icon: '✅' },
      { title: 'Procesamiento', description: 'El módulo correspondiente procesa la solicitud según las reglas definidas.', detail: 'Incluye cálculos, integraciones con terceros y generación de documentos.', icon: '⚙️' },
      { title: 'Revisión (si aplica)', description: 'Los casos que requieren supervisión pasan a un revisor humano.', icon: '👁️' },
      { title: 'Notificación', description: 'Se notifica al usuario y partes interesadas del resultado.', detail: 'Email automático, WhatsApp y push notification.', icon: '🔔' },
      { title: 'Archivo y seguimiento', description: 'El registro se archiva con trazabilidad completa para auditoría.', icon: '📁' },
    ]

    const waMessages: WAChatMessage[] = md?.waMessages || [
      { from: 'client', text: `Hola, necesito información sobre ${features[0] || 'el servicio'}`, time: '10:23' },
      { from: 'bot', text: `¡Hola! Soy el asistente de ${c.businessName}. Te ayudo encantado. ¿Qué necesitas exactamente?`, time: '10:23' },
      { from: 'client', text: 'Quiero saber el estado de mi solicitud #1042', time: '10:24' },
      { from: 'bot', text: '📋 Tu solicitud #1042 "Proyecto Alpha" está activa y en progreso. Avance: 72%. ¿Necesitas algo más?', time: '10:24' },
      { from: 'client', text: 'Perfecto, gracias! 👍', time: '10:25' },
      { from: 'bot', text: '¡De nada! Estoy aquí 24/7 si necesitas algo. 😊', time: '10:25' },
    ]

    const processContent = `
      <div class="grid-2" style="align-items:start">
        <div>
          <h3 style="font-size:0.9rem;font-weight:700;margin-bottom:1rem">Flujo Automatizado</h3>
          ${stepProcess(processSteps)}
        </div>
        <div>
          <h3 style="font-size:0.9rem;font-weight:700;margin-bottom:1rem">Atención al Cliente IA</h3>
          ${whatsappChat('wa-demo', c.businessName, c.businessName[0], waMessages)}
        </div>
      </div>`
    const procSection = section('process', 'AUTOMATIZACIÓN', 'Procesos Inteligentes',
      'Flujos automatizados con IA que reducen tiempos y errores.',
      processContent)

    // ── Analytics section
    const topMetrics = [
      progressBar(md?.metric1Label || 'Satisfacción cliente', md?.metric1 || 92, 'ok'),
      progressBar(md?.metric2Label || 'Tiempo respuesta', md?.metric2 || 78, 'primary'),
      progressBar(md?.metric3Label || 'Tasa conversión', md?.metric3 || 65, 'accent'),
      progressBar(md?.metric4Label || 'Retención mensual', md?.metric4 || 88, 'ok'),
    ]

    const monthlyChart: BarChartItem[] = md?.monthlyRevenue || [
      { label: 'Ene', value: 22000 },
      { label: 'Feb', value: 24500 },
      { label: 'Mar', value: 28000 },
      { label: 'Abr', value: 31200 },
    ]

    const analyticsContent = `
      <div class="grid-2">
        <div class="card">
          <div class="card-header"><h3>Métricas Clave</h3></div>
          ${topMetrics.join('')}
        </div>
        <div class="card">
          <div class="card-header"><h3>Ingresos Mensuales</h3></div>
          ${horizontalBarChart(monthlyChart)}
        </div>
      </div>
      <div style="margin-top:1.5rem">
        ${bigResult(
          md?.bigResultValue || '€112,400',
          md?.bigResultLabel || 'Ingresos proyectados este trimestre',
          [
            { title: md?.bigItem1 || '+23%', subtitle: 'vs trimestre anterior' },
            { title: md?.bigItem2 || '847', subtitle: 'clientes activos' },
            { title: md?.bigItem3 || '94%', subtitle: 'tasa de retención' },
          ]
        )}
      </div>`
    const analyticsSection = section('analytics', 'RENDIMIENTO', 'Analytics y Métricas',
      'Análisis detallado del rendimiento de tu negocio.',
      analyticsContent)

    // ── Contact / WhatsApp notifications section
    const contactContent = `
      <div class="grid-2" style="align-items:start">
        <div class="card">
          <div class="card-header"><h3>Canales Activos</h3></div>
          ${alertRow('💬', 'WhatsApp Business con IA — respuestas automáticas 24/7', 'Activo', 'badge-green')}
          ${alertRow('📧', 'Email automático — confirmaciones, facturas, recordatorios', 'Activo', 'badge-green')}
          ${alertRow('🔔', 'Push Notifications — alertas en tiempo real', 'Activo', 'badge-green')}
          ${alertRow('📱', 'SMS — verificación y alertas urgentes', 'Próx.', 'badge-yellow')}
        </div>
        <div class="card">
          <div class="card-header"><h3>Estadísticas de Contacto</h3></div>
          ${kpiGrid([
            { icon: '💬', label: 'Mensajes/día', value: md?.messagesPerDay || 156 },
            { icon: '⏱️', label: 'Resp. media', value: md?.avgResponse || '< 30s' },
            { icon: '😊', label: 'Satisfacción', value: md?.satisfaction || '4.8/5' },
            { icon: '🤖', label: 'Auto-resueltos', value: md?.autoResolved || 84, suffix: '%' },
          ])}
        </div>
      </div>`
    const contactSection = section('contact', 'COMUNICACIÓN', 'Centro de Contacto',
      'Todos los canales de comunicación integrados con IA.',
      contactContent)

    // ── Settings section
    const settingsFields: SettingsField[] = [
      { label: 'Nombre del negocio', value: c.businessName, type: 'text' },
      { label: 'Email de contacto', value: md?.email || `info@${c.businessName.toLowerCase().replace(/\s/g, '')}.com`, type: 'email' },
      { label: 'Idioma por defecto', value: c.locale === 'es' ? 'Español' : 'English', type: 'select', options: ['Español', 'English', 'Français', 'Deutsch'] },
      { label: 'Notificaciones por email', value: '', type: 'toggle', enabled: true },
      { label: 'Notificaciones push', value: '', type: 'toggle', enabled: true },
      { label: 'Modo mantenimiento', value: '', type: 'toggle', enabled: false },
    ]

    const settingsContent = settingsForm(settingsFields)
    const settSection = section('settings', 'CONFIGURACIÓN', 'Ajustes del Sistema',
      'Personaliza el comportamiento y apariencia de tu plataforma.',
      settingsContent)

    // ── Footer
    const footer = `<div class="footer">© 2026 ${c.businessName} — Prototipo generado por <strong style="color:var(--accent)">Kerno Studio</strong></div>`

    // ── Assemble
    return `<!DOCTYPE html>
<html lang="${c.locale || 'es'}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${c.businessName} — Demo Interactivo</title>
<style>${designSystemCSS(c.primaryColor, c.accentColor)}</style>
</head>
<body>
${nav}
${notificationContainer()}
${hero}
${dashSection}
${featSection}
${dataSection}
${procSection}
${analyticsSection}
${contactSection}
${settSection}
${footer}
<script>${allScripts()}</script>
</body>
</html>`
  },
}

// Mock data type for better IDE support (optional fields)
interface GenericMockData {
  heroTagline?: string
  heroSubtitle?: string
  totalUsers?: number
  automatedTasks?: number
  revenue?: number
  activeUsers?: number
  pendingTasks?: number
  efficiency?: number
  activityChart?: BarChartItem[]
  alert1?: string
  alert2?: string
  alert3?: string
  alert4?: string
  tableColumns?: TableColumn[]
  tableRows?: Record<string, string>[]
  processSteps?: StepData[]
  waMessages?: WAChatMessage[]
  metric1Label?: string
  metric1?: number
  metric2Label?: string
  metric2?: number
  metric3Label?: string
  metric3?: number
  metric4Label?: string
  metric4?: number
  monthlyRevenue?: BarChartItem[]
  bigResultValue?: string
  bigResultLabel?: string
  bigItem1?: string
  bigItem2?: string
  bigItem3?: string
  messagesPerDay?: number
  avgResponse?: string
  satisfaction?: string
  autoResolved?: number
  email?: string
}
