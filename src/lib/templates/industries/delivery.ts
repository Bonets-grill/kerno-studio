import type { TemplateDefinition, TemplateCustomization } from '../types'
import { designSystemCSS } from '../shared/design-system'
import { allScripts } from '../shared/scripts'
import {
  navBar, heroSection, notificationContainer, section,
  kpiGrid, dataTable, progressBar, horizontalBarChart,
  stepProcess, settingsForm, alertRow, bigResult,
  type KpiData, type TableColumn, type StepData,
  type SettingsField, type BarChartItem,
} from '../shared/components'

export const deliveryTemplate: TemplateDefinition = {
  meta: {
    id: 'delivery',
    name: 'Delivery / Logística',
    industries: ['delivery', 'envío', 'shipping', 'logística', 'logistics', 'transporte', 'transport', 'courier', 'paquetería', 'reparto', 'fleet', 'flota'],
    projectTypes: ['landing', 'mvp', 'system', 'saas'],
    sections: ['hero', 'dashboard', 'orders', 'routes', 'drivers', 'tracking', 'analytics', 'settings'],
    description: 'Plantilla premium para empresas de delivery, logística y transporte. Dashboard con entregas, rutas, conductores, tracking en tiempo real y analytics de operaciones.',
  },

  render(c: TemplateCustomization): string {
    const md = c.mockData as DeliveryMockData

    // ── Nav
    const nav = navBar(c.businessName, [
      { id: 'hero', label: 'Inicio' },
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'orders', label: 'Pedidos' },
      { id: 'routes', label: 'Rutas' },
      { id: 'drivers', label: 'Conductores' },
      { id: 'tracking', label: 'Tracking' },
      { id: 'analytics', label: 'Analytics' },
      { id: 'settings', label: 'Config' },
    ])

    // ── Hero
    const hero = heroSection(
      c.businessName,
      md?.heroTagline || 'Entrega inteligente',
      md?.heroSubtitle || 'Plataforma de gestión de entregas con tracking en tiempo real, optimización de rutas y control total de tu flota.',
      [
        { value: md?.deliveriesToday || 847, label: 'Entregas Hoy' },
        { value: md?.onTimeRate || '96%', label: 'A Tiempo' },
        { value: md?.activeDrivers || 42, label: 'Conductores' },
        { value: md?.dailyRevenue || 12400, label: 'Revenue', prefix: '€' },
      ],
      `Demo Interactivo — ${c.businessType || 'Delivery'}`
    )

    // ── Dashboard
    const dashKpis: KpiData[] = [
      { icon: '📦', label: 'Entregas Hoy', value: md?.deliveriesToday || 847, trend: { value: '+23', direction: 'up' } },
      { icon: '⏱️', label: 'Tasa A Tiempo', value: md?.onTimePct || 96, suffix: '%', trend: { value: '+1.2%', direction: 'up' } },
      { icon: '🚗', label: 'Conductores Activos', value: md?.activeDrivers || 42, trend: { value: '+3', direction: 'up' } },
      { icon: '💰', label: 'Revenue Diario', value: md?.dailyRevenue || 12400, prefix: '€', trend: { value: '+€800', direction: 'up' } },
    ]

    const deliveriesByZone: BarChartItem[] = md?.deliveriesByZone || [
      { label: 'Zona Norte', value: 245, color: 'var(--success)' },
      { label: 'Zona Centro', value: 198, color: 'var(--primary-light)' },
      { label: 'Zona Sur', value: 176, color: 'var(--success)' },
      { label: 'Zona Este', value: 134, color: 'var(--primary-light)' },
      { label: 'Zona Oeste', value: 94, color: 'var(--success)' },
    ]

    const dashAlerts = [
      alertRow('🟢', md?.alert1 || '847 entregas completadas — objetivo diario alcanzado', 'Meta', 'badge-green'),
      alertRow('⚠️', md?.alert2 || '3 entregas retrasadas en Zona Norte por tráfico', 'Retraso', 'badge-yellow'),
      alertRow('🚗', md?.alert3 || 'Conductor #12 ha completado 38 entregas hoy — récord', 'Récord', 'badge-blue'),
      alertRow('📊', md?.alert4 || 'Satisfacción del cliente al 4.7/5 esta semana', '4.7★', 'badge-accent'),
    ]

    const dashContent = `
      ${kpiGrid(dashKpis)}
      <div class="grid-2" style="margin-top:1.5rem">
        <div class="card">
          <div class="card-header"><h3>Entregas por Zona</h3><span class="badge badge-accent">Hoy</span></div>
          ${horizontalBarChart(deliveriesByZone)}
        </div>
        <div class="card">
          <div class="card-header"><h3>Alertas</h3><span class="badge badge-primary">${md?.alertCount || 4} activas</span></div>
          ${dashAlerts.join('')}
        </div>
      </div>`

    const dashSection = section('dashboard', 'OPERACIONES', 'Panel de Control',
      'Métricas de entregas, conductores y rendimiento en tiempo real.',
      dashContent)

    // ── Orders
    const orderCols: TableColumn[] = [
      { label: 'Tracking', key: 'tracking' },
      { label: 'Cliente', key: 'client' },
      { label: 'Dirección', key: 'address' },
      { label: 'Conductor', key: 'driver' },
      { label: 'ETA', key: 'eta' },
      { label: 'Estado', key: 'status' },
      { label: 'Prioridad', key: 'priority' },
    ]
    const orderRows = md?.orders || [
      { tracking: '<span style="font-family:monospace;font-size:0.72rem;color:var(--primary-light)">TRK-48291</span>', client: 'María García', address: 'C/ Gran Vía 42, Madrid', driver: 'Carlos R.', eta: '12:30', status: '<span class="badge badge-green">Entregado</span>', priority: '<span class="badge badge-blue">Normal</span>' },
      { tracking: '<span style="font-family:monospace;font-size:0.72rem;color:var(--primary-light)">TRK-48292</span>', client: 'Pedro Álvarez', address: 'Av. Diagonal 156, Barcelona', driver: 'Ana M.', eta: '13:15', status: '<span class="badge badge-blue">En tránsito</span>', priority: '<span class="badge badge-blue">Normal</span>' },
      { tracking: '<span style="font-family:monospace;font-size:0.72rem;color:var(--primary-light)">TRK-48293</span>', client: 'Laura Fernández', address: 'C/ Sierpes 28, Sevilla', driver: 'Miguel T.', eta: '13:45', status: '<span class="badge badge-blue">En tránsito</span>', priority: '<span class="badge badge-yellow">Urgente</span>' },
      { tracking: '<span style="font-family:monospace;font-size:0.72rem;color:var(--primary-light)">TRK-48294</span>', client: 'Jorge Ruiz', address: 'C/ Colón 8, Valencia', driver: 'Elena S.', eta: '14:00', status: '<span class="badge badge-purple">Recogido</span>', priority: '<span class="badge badge-blue">Normal</span>' },
      { tracking: '<span style="font-family:monospace;font-size:0.72rem;color:var(--primary-light)">TRK-48295</span>', client: 'Isabel Moreno', address: 'Paseo del Prado 3, Madrid', driver: 'Pablo F.', eta: '14:30', status: '<span class="badge badge-yellow">Pendiente</span>', priority: '<span class="badge badge-red">Express</span>' },
      { tracking: '<span style="font-family:monospace;font-size:0.72rem;color:var(--primary-light)">TRK-48296</span>', client: 'David Jiménez', address: 'Rambla Catalunya 92, Barcelona', driver: 'Carlos R.', eta: '15:00', status: '<span class="badge badge-yellow">Pendiente</span>', priority: '<span class="badge badge-blue">Normal</span>' },
      { tracking: '<span style="font-family:monospace;font-size:0.72rem;color:var(--primary-light)">TRK-48297</span>', client: 'Carmen Vega', address: 'C/ Larios 5, Málaga', driver: 'Ana M.', eta: '15:30', status: '<span class="badge badge-green">Entregado</span>', priority: '<span class="badge badge-blue">Normal</span>' },
    ]

    const orderKpis: KpiData[] = [
      { icon: '📦', label: 'Pedidos Hoy', value: md?.ordersToday || 892 },
      { icon: '✅', label: 'Entregados', value: md?.delivered || 847 },
      { icon: '🔵', label: 'En Tránsito', value: md?.inTransit || 28 },
      { icon: '⏳', label: 'Pendientes', value: md?.pending || 17 },
    ]

    const ordersContent = `
      ${kpiGrid(orderKpis)}
      <div class="card" style="margin-top:1rem">${dataTable(orderCols, orderRows)}</div>`

    const ordersSection = section('orders', 'PEDIDOS', 'Gestión de Pedidos',
      'Tracking, estado y prioridad de todos los pedidos activos.',
      ordersContent)

    // ── Routes
    const routes = md?.routes || [
      { id: 'R-001', driver: 'Carlos Ramírez', zone: 'Zona Norte', stops: 18, completed: 16, status: 'active', distance: '42 km', startTime: '08:00', estEnd: '14:30' },
      { id: 'R-002', driver: 'Ana Martín', zone: 'Zona Centro', stops: 22, completed: 22, status: 'completed', distance: '38 km', startTime: '07:30', estEnd: '13:00' },
      { id: 'R-003', driver: 'Miguel Torres', zone: 'Zona Sur', stops: 15, completed: 8, status: 'active', distance: '35 km', startTime: '09:00', estEnd: '15:00' },
      { id: 'R-004', driver: 'Elena Sánchez', zone: 'Zona Este', stops: 20, completed: 14, status: 'active', distance: '48 km', startTime: '08:30', estEnd: '15:30' },
      { id: 'R-005', driver: 'Pablo Fernández', zone: 'Zona Oeste', stops: 12, completed: 0, status: 'pending', distance: '28 km', startTime: '14:00', estEnd: '18:00' },
    ]

    const routeStatusBadge = (status: string) => {
      switch (status) {
        case 'active': return '<span class="badge badge-green">En ruta</span>'
        case 'completed': return '<span class="badge badge-blue">Completada</span>'
        case 'pending': return '<span class="badge badge-yellow">Pendiente</span>'
        default: return '<span class="badge badge-primary">' + status + '</span>'
      }
    }

    const routeItems = routes.map((r: RouteItem) => {
      const pct = r.stops > 0 ? Math.round((r.completed / r.stops) * 100) : 0
      return `
      <div class="card" style="padding:1.2rem;margin-bottom:0.8rem">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem">
          <div style="display:flex;align-items:center;gap:10px">
            <span style="font-family:monospace;font-size:0.72rem;color:var(--primary-light);font-weight:700">${r.id}</span>
            ${routeStatusBadge(r.status)}
          </div>
          <span style="font-size:0.68rem;color:var(--text-dim)">${r.startTime} → ${r.estEnd}</span>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem">
          <div>
            <span style="font-size:0.88rem;font-weight:700">🚗 ${r.driver}</span>
            <span style="font-size:0.72rem;color:var(--text-muted);margin-left:8px">${r.zone}</span>
          </div>
          <span style="font-size:0.72rem;color:var(--text-dim)">${r.distance}</span>
        </div>
        <div style="display:flex;align-items:center;gap:10px">
          <div style="flex:1">
            ${progressBar(`${r.completed}/${r.stops} paradas`, pct, pct === 100 ? 'ok' : pct >= 50 ? 'primary' : 'warn')}
          </div>
        </div>
      </div>`
    }).join('')

    const routesContent = `${routeItems}`
    const routesSection = section('routes', 'RUTAS', 'Rutas Activas',
      'Estado de las rutas, conductores asignados y progreso de paradas.',
      routesContent)

    // ── Drivers
    const driverCols: TableColumn[] = [
      { label: 'Conductor', key: 'name' },
      { label: 'Vehículo', key: 'vehicle' },
      { label: 'Entregas Hoy', key: 'deliveriesToday', align: 'center' },
      { label: 'Total (mes)', key: 'totalMonth', align: 'center' },
      { label: 'Rating', key: 'rating', align: 'center' },
      { label: 'A Tiempo', key: 'onTime' },
      { label: 'Estado', key: 'status' },
    ]
    const driverRows = md?.drivers || [
      { name: '🚗 Carlos Ramírez', vehicle: 'Furgoneta #F-12', deliveriesToday: '38', totalMonth: '624', rating: '<span class="badge badge-green">⭐ 4.9</span>', onTime: '98%', status: '<span class="badge badge-green">En ruta</span>' },
      { name: '🚗 Ana Martín', vehicle: 'Furgoneta #F-08', deliveriesToday: '34', totalMonth: '580', rating: '<span class="badge badge-green">⭐ 4.8</span>', onTime: '97%', status: '<span class="badge badge-blue">Completado</span>' },
      { name: '🚗 Miguel Torres', vehicle: 'Moto #M-03', deliveriesToday: '22', totalMonth: '410', rating: '<span class="badge badge-green">⭐ 4.7</span>', onTime: '95%', status: '<span class="badge badge-green">En ruta</span>' },
      { name: '🚗 Elena Sánchez', vehicle: 'Furgoneta #F-15', deliveriesToday: '28', totalMonth: '502', rating: '<span class="badge badge-green">⭐ 4.8</span>', onTime: '96%', status: '<span class="badge badge-green">En ruta</span>' },
      { name: '🚗 Pablo Fernández', vehicle: 'Moto #M-07', deliveriesToday: '0', totalMonth: '385', rating: '<span class="badge badge-blue">⭐ 4.5</span>', onTime: '93%', status: '<span class="badge badge-yellow">Pendiente</span>' },
      { name: '🚗 Lucía Gómez', vehicle: 'Furgoneta #F-20', deliveriesToday: '31', totalMonth: '548', rating: '<span class="badge badge-green">⭐ 4.9</span>', onTime: '99%', status: '<span class="badge badge-green">En ruta</span>' },
    ]

    const driverKpis: KpiData[] = [
      { icon: '🚗', label: 'Total Conductores', value: md?.totalDrivers || 42 },
      { icon: '🟢', label: 'Activos Ahora', value: md?.activeNow || 38 },
      { icon: '⭐', label: 'Rating Medio', value: md?.avgDriverRating || 4.7, decimals: 1 },
      { icon: '📦', label: 'Media Entregas/Día', value: md?.avgDeliveriesDay || 28 },
    ]

    const driversContent = `
      ${kpiGrid(driverKpis)}
      <div class="card" style="margin-top:1rem">${dataTable(driverCols, driverRows)}</div>`

    const driversSection = section('drivers', 'CONDUCTORES', 'Gestión de Conductores',
      'Rendimiento, rating y estado de cada conductor de la flota.',
      driversContent)

    // ── Tracking
    const trackingSteps: StepData[] = md?.trackingSteps || [
      { title: 'Pedido Recibido', description: 'El pedido TRK-48293 ha sido registrado en el sistema.', detail: '09 Abr 2026 — 09:12', icon: '📋' },
      { title: 'Preparación', description: 'El paquete ha sido preparado y etiquetado en el almacén central.', detail: '09 Abr 2026 — 09:45', icon: '📦' },
      { title: 'Recogido por Conductor', description: 'Miguel Torres ha recogido el paquete en Furgoneta #M-03.', detail: '09 Abr 2026 — 10:20', icon: '🚗' },
      { title: 'En Tránsito', description: 'El paquete está en camino hacia C/ Sierpes 28, Sevilla.', detail: '09 Abr 2026 — 10:35 · ETA: 13:45', icon: '🛣️' },
      { title: 'Llegada a Zona', description: 'El conductor ha llegado a la zona de entrega.', icon: '📍' },
      { title: 'Entregado', description: 'Entrega confirmada con firma digital del destinatario.', icon: '✅' },
    ]

    const trackingContent = `
      <div class="grid-2" style="align-items:start">
        <div>
          <div class="card" style="padding:1.2rem;margin-bottom:1rem">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.8rem">
              <span style="font-family:monospace;font-size:1rem;font-weight:800;color:var(--primary-light)">TRK-48293</span>
              <span class="badge badge-blue">En Tránsito</span>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem;font-size:0.78rem">
              <div><span style="color:var(--text-dim)">Cliente:</span> Laura Fernández</div>
              <div><span style="color:var(--text-dim)">Conductor:</span> Miguel Torres</div>
              <div><span style="color:var(--text-dim)">Origen:</span> Almacén Central</div>
              <div><span style="color:var(--text-dim)">Destino:</span> C/ Sierpes 28</div>
              <div><span style="color:var(--text-dim)">Prioridad:</span> <span class="badge badge-yellow">Urgente</span></div>
              <div><span style="color:var(--text-dim)">ETA:</span> <span style="color:var(--success);font-weight:700">13:45</span></div>
            </div>
          </div>
          <h3 style="font-size:0.9rem;font-weight:700;margin-bottom:1rem">Progreso de Entrega</h3>
          ${stepProcess(trackingSteps, 'var(--success)')}
        </div>
        <div>
          <div class="card" style="padding:1.5rem;text-align:center">
            <div style="font-size:0.72rem;color:var(--text-dim);text-transform:uppercase;letter-spacing:1px;margin-bottom:1rem">Mapa de Ruta (Simulado)</div>
            <div style="background:rgba(34,197,94,0.05);border:1px solid rgba(34,197,94,0.15);border-radius:14px;padding:2rem;min-height:280px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem">
              <div style="font-size:3rem">🗺️</div>
              <div style="font-size:0.82rem;color:var(--text-muted)">Almacén Central → C/ Sierpes 28, Sevilla</div>
              <div style="display:flex;gap:1.5rem;margin-top:0.5rem">
                <div style="text-align:center">
                  <div style="font-size:1.4rem;font-weight:800;color:var(--success)">24km</div>
                  <div style="font-size:0.62rem;color:var(--text-dim)">Distancia</div>
                </div>
                <div style="text-align:center">
                  <div style="font-size:1.4rem;font-weight:800;color:var(--primary-light)">35min</div>
                  <div style="font-size:0.62rem;color:var(--text-dim)">Tiempo restante</div>
                </div>
                <div style="text-align:center">
                  <div style="font-size:1.4rem;font-weight:800;color:var(--accent)">4/6</div>
                  <div style="font-size:0.62rem;color:var(--text-dim)">Pasos completados</div>
                </div>
              </div>
            </div>
          </div>
          <div style="margin-top:1rem">
            ${kpiGrid([
              { icon: '⏱️', label: 'Tiempo Estimado', value: '35 min' },
              { icon: '📍', label: 'Distancia', value: '24 km' },
            ])}
          </div>
        </div>
      </div>`

    const trackingSection = section('tracking', 'TRACKING', 'Seguimiento en Tiempo Real',
      'Estado detallado de la entrega con progreso paso a paso.',
      trackingContent)

    // ── Analytics
    const deliveriesByHour: BarChartItem[] = md?.deliveriesByHour || [
      { label: '08:00 - 10:00', value: 124, color: 'var(--success)' },
      { label: '10:00 - 12:00', value: 198, color: 'var(--success)' },
      { label: '12:00 - 14:00', value: 245, color: 'var(--primary-light)' },
      { label: '14:00 - 16:00', value: 178, color: 'var(--success)' },
      { label: '16:00 - 18:00', value: 156, color: 'var(--success)' },
      { label: '18:00 - 20:00', value: 89, color: 'var(--primary-light)' },
    ]

    const analyticsContent = `
      <div class="grid-2">
        <div class="card">
          <div class="card-header"><h3>Entregas por Franja Horaria</h3></div>
          ${horizontalBarChart(deliveriesByHour)}
        </div>
        <div class="card">
          <div class="card-header"><h3>Métricas Operativas</h3></div>
          ${progressBar('Tasa A Tiempo', md?.onTimePct || 96, 'ok')}
          ${progressBar('Satisfacción Cliente', md?.customerSat || 94, 'ok')}
          ${progressBar('Eficiencia de Ruta', md?.routeEfficiency || 88, 'primary')}
          ${progressBar('Utilización Flota', md?.fleetUtil || 91, 'accent')}
        </div>
      </div>
      <div style="margin-top:1.5rem">
        ${bigResult(
          md?.monthlyRevenueStr || '€372,000',
          md?.monthlyRevenueLabel || 'Revenue Mensual',
          [
            { title: md?.costPerDelivery || '€4.20', subtitle: 'Coste/entrega' },
            { title: md?.avgDeliveryTime || '42 min', subtitle: 'Tiempo medio' },
            { title: md?.monthlyDeliveries || '25,410', subtitle: 'Entregas/mes' },
          ]
        )}
      </div>`

    const anaSection = section('analytics', 'ANALYTICS', 'Métricas Operativas',
      'Rendimiento por franjas horarias, eficiencia y métricas de entrega.',
      analyticsContent)

    // ── Settings
    const settingsFields: SettingsField[] = [
      { label: 'Nombre de la empresa', value: c.businessName, type: 'text' },
      { label: 'URL de tracking', value: md?.trackingUrl || `track.${c.businessName.toLowerCase().replace(/\s/g, '')}.com`, type: 'text' },
      { label: 'Email de operaciones', value: md?.opsEmail || `ops@${c.businessName.toLowerCase().replace(/\s/g, '')}.com`, type: 'email' },
      { label: 'Notificaciones SMS', value: '', type: 'toggle', enabled: true },
      { label: 'GPS tracking activo', value: '', type: 'toggle', enabled: true },
      { label: 'Optimización de rutas IA', value: '', type: 'toggle', enabled: true },
      { label: 'Modo nocturno (rutas 20-06h)', value: '', type: 'toggle', enabled: false },
    ]

    const settContent = settingsForm(settingsFields)
    const settSection = section('settings', 'CONFIGURACIÓN', 'Ajustes de Operaciones',
      'GPS, notificaciones, optimización de rutas y configuración general.',
      settContent)

    // ── Footer
    const footer = `<div class="footer">© 2026 ${c.businessName} — Prototipo generado por <strong style="color:var(--accent)">Kerno Studio</strong></div>`

    // ── Assemble
    return `<!DOCTYPE html>
<html lang="${c.locale || 'es'}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${c.businessName} — Demo Interactivo</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
${designSystemCSS(c.primaryColor, c.accentColor, c.theme || 'neon')}

/* ═══════════ DELIVERY OVERRIDES — Barlow font, charcoal dark ═══════════ */
body {
  font-family: 'Barlow', sans-serif !important;
  background: #0b0c0f !important;
}
.nav { background: rgba(11,12,15,0.94) !important; border-bottom: 1px solid rgba(34,197,94,0.1) !important; }
.card { border-radius: 10px !important; border: 1px solid rgba(34,197,94,0.06) !important; }
.kpi { border-radius: 10px !important; border-left: 3px solid var(--success) !important; }
.hero-h1 { font-family: 'Barlow', sans-serif !important; }
.badge { border-radius: 6px !important; text-transform: uppercase !important; letter-spacing: 0.5px !important; font-size: 0.6rem !important; }

/* Functional delivery feel: sharper edges, green indicators */
.bar-bg { border-radius: 3px !important; }
.bar-fill { border-radius: 3px !important; }
.s-label { color: var(--success) !important; }
.hero-badge { border-color: rgba(34,197,94,0.3) !important; background: rgba(34,197,94,0.1) !important; color: var(--success) !important; }
</style>
</head>
<body>
${nav}
${notificationContainer()}
${hero}
${dashSection}
${ordersSection}
${routesSection}
${driversSection}
${trackingSection}
${anaSection}
${settSection}
${footer}
<script>${allScripts()}</script>
</body>
</html>`
  },
}

interface RouteItem {
  id: string
  driver: string
  zone: string
  stops: number
  completed: number
  status: string
  distance: string
  startTime: string
  estEnd: string
}

interface DeliveryMockData {
  heroTagline?: string
  heroSubtitle?: string
  deliveriesToday?: number
  onTimeRate?: string
  activeDrivers?: number
  dailyRevenue?: number
  onTimePct?: number
  deliveriesByZone?: BarChartItem[]
  alert1?: string
  alert2?: string
  alert3?: string
  alert4?: string
  alertCount?: number
  orders?: Record<string, string>[]
  ordersToday?: number
  delivered?: number
  inTransit?: number
  pending?: number
  routes?: RouteItem[]
  drivers?: Record<string, string>[]
  totalDrivers?: number
  activeNow?: number
  avgDriverRating?: number
  avgDeliveriesDay?: number
  trackingSteps?: StepData[]
  deliveriesByHour?: BarChartItem[]
  customerSat?: number
  routeEfficiency?: number
  fleetUtil?: number
  monthlyRevenueStr?: string
  monthlyRevenueLabel?: string
  costPerDelivery?: string
  avgDeliveryTime?: string
  monthlyDeliveries?: string
  trackingUrl?: string
  opsEmail?: string
}
