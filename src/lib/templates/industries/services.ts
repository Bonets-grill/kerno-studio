import type { TemplateDefinition, TemplateCustomization } from '../types'
import { designSystemCSS } from '../shared/design-system'
import { allScripts } from '../shared/scripts'
import {
  navBar, heroSection, notificationContainer, section,
  kpiGrid, dataTable, progressBar, horizontalBarChart,
  settingsForm, alertRow, bigResult,
  type KpiData, type TableColumn,
  type SettingsField, type BarChartItem,
} from '../shared/components'

export const servicesTemplate: TemplateDefinition = {
  meta: {
    id: 'services',
    name: 'Servicios & Beauty Premium',
    industries: ['peluquería', 'barbería', 'beauty', 'belleza', 'spa', 'salon', 'nail', 'uñas', 'masaje', 'massage', 'servicios', 'citas de servicio'],
    projectTypes: ['landing', 'mvp', 'system', 'saas'],
    sections: ['hero', 'dashboard', 'appointments', 'services-menu', 'clients', 'staff', 'analytics', 'settings'],
    description: 'Plantilla premium para peluquerías, salones de belleza, spas y servicios con cita. Dashboard con KPIs de citas e ingresos, agenda visual, carta de servicios, gestión de clientes, equipo, analytics y configuración.',
  },

  render(c: TemplateCustomization): string {
    const md = c.mockData as ServicesMockData

    // ── Nav
    const nav = navBar(c.businessName, [
      { id: 'hero', label: 'Inicio' },
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'appointments', label: 'Citas' },
      { id: 'services-menu', label: 'Servicios' },
      { id: 'clients', label: 'Clientes' },
      { id: 'staff', label: 'Equipo' },
      { id: 'analytics', label: 'Analytics' },
      { id: 'settings', label: 'Config' },
    ])

    // ── Hero
    const hero = heroSection(
      c.businessName,
      md?.heroTagline || `${c.businessName} — Belleza y Bienestar`,
      md?.heroSubtitle || 'Gestiona citas, servicios y clientes con elegancia. Agenda inteligente, recordatorios automáticos y fidelización.',
      [
        { value: md?.dailyAppointments || 48, label: 'Citas/Día' },
        { value: md?.monthlyRevenue || 28500, label: 'Ingresos/Mes', prefix: '€' },
        { value: md?.totalClients || 2840, label: 'Clientes' },
        { value: md?.avgRating || 4.9, label: 'Valoración', suffix: '/5' },
      ],
      `Demo Interactivo — ${c.businessType || 'Salón de Belleza'}`
    )

    // ── Dashboard
    const dashKpis: KpiData[] = [
      { icon: '📅', label: 'Citas Hoy', value: md?.appointmentsToday || 48, trend: { value: '+6 vs ayer', direction: 'up' } },
      { icon: '💰', label: 'Facturación Hoy', value: md?.revenueToday || 3240, prefix: '€', trend: { value: '+12%', direction: 'up' } },
      { icon: '👥', label: 'Clientes Nuevos', value: md?.newClientsToday || 7, trend: { value: '+3', direction: 'up' } },
      { icon: '⭐', label: 'Rating', value: md?.rating || 4.9, decimals: 1, suffix: '/5', trend: { value: '+0.1', direction: 'up' } },
    ]

    const topServices: BarChartItem[] = md?.topServices || [
      { label: 'Corte + Peinado', value: 142, color: 'var(--accent)' },
      { label: 'Color Completo', value: 98, color: 'var(--primary-light)' },
      { label: 'Manicura Semipermanente', value: 87, color: 'var(--accent)' },
      { label: 'Tratamiento Facial', value: 64, color: 'var(--primary-light)' },
      { label: 'Masaje Relajante', value: 52, color: 'var(--accent)' },
    ]

    const dashAlerts = [
      alertRow('📅', md?.alert1 || 'Cita VIP: Sra. Martínez a las 16:00 — color + corte', 'VIP', 'badge-purple'),
      alertRow('⏰', md?.alert2 || 'Lucía tiene 15min libres a las 12:30 — optimizar agenda', 'Hueco', 'badge-yellow'),
      alertRow('🎂', md?.alert3 || 'Cumpleaños de Carmen Ruiz mañana — enviar felicitación', 'Birthday', 'badge-accent'),
      alertRow('📦', md?.alert4 || 'Stock bajo: Tinte L\'Oréal 7.1 — quedan 2 unidades', 'Stock', 'badge-red'),
    ]

    const dashContent = `
      ${kpiGrid(dashKpis)}
      <div class="grid-2" style="margin-top:1.5rem">
        <div class="card">
          <div class="card-header"><h3>Servicios Más Solicitados</h3><span class="badge badge-accent">Este mes</span></div>
          ${horizontalBarChart(topServices)}
        </div>
        <div class="card">
          <div class="card-header"><h3>Alertas del Día</h3><span class="badge badge-primary">${md?.alertCount || 4} activas</span></div>
          ${dashAlerts.join('')}
        </div>
      </div>`

    const dashSection = section('dashboard', c.businessType?.toUpperCase() || 'SALÓN', 'Panel de Control',
      'Vista en tiempo real del rendimiento de tu salón.',
      dashContent)

    // ── Appointments (timeline style)
    const appointmentsData = md?.appointments || [
      { time: '09:00', duration: '45min', client: 'María López', service: 'Corte + Peinado', stylist: 'Lucía', price: '€35', status: '<span class="badge badge-green">Confirmada</span>' },
      { time: '09:30', duration: '2h', client: 'Carmen Ruiz', service: 'Color Completo + Mechas', stylist: 'Ana', price: '€120', status: '<span class="badge badge-green">Confirmada</span>' },
      { time: '10:00', duration: '1h', client: 'Elena García', service: 'Manicura + Pedicura', stylist: 'Sara', price: '€55', status: '<span class="badge badge-green">Confirmada</span>' },
      { time: '10:30', duration: '30min', client: 'Pedro Sánchez', service: 'Corte Caballero + Barba', stylist: 'David', price: '€28', status: '<span class="badge badge-yellow">Pendiente</span>' },
      { time: '11:00', duration: '1h 30min', client: 'Laura Martínez', service: 'Tratamiento Facial Premium', stylist: 'Lucía', price: '€85', status: '<span class="badge badge-green">Confirmada</span>' },
      { time: '12:00', duration: '1h', client: 'Sofía Torres', service: 'Manicura Semipermanente', stylist: 'Sara', price: '€38', status: '<span class="badge badge-blue">WhatsApp</span>' },
      { time: '13:00', duration: '45min', client: 'Ana Fernández', service: 'Corte + Brushing', stylist: 'Ana', price: '€40', status: '<span class="badge badge-green">Confirmada</span>' },
      { time: '16:00', duration: '3h', client: 'Sra. Martínez', service: 'Color + Corte + Tratamiento', stylist: 'Lucía', price: '€180', status: '<span class="badge badge-purple">VIP</span>' },
    ]

    const timelineCards = appointmentsData.map((a: Record<string, string>) => `
      <div style="display:flex;gap:1rem;align-items:start;padding:1rem 0;border-bottom:1px solid var(--border)">
        <div style="min-width:70px;text-align:center">
          <div style="font-size:1.1rem;font-weight:800;color:var(--accent)">${a.time}</div>
          <div style="font-size:0.62rem;color:var(--text-dim)">${a.duration}</div>
        </div>
        <div style="width:3px;background:linear-gradient(180deg,var(--primary),var(--accent));border-radius:2px;align-self:stretch;min-height:40px"></div>
        <div style="flex:1">
          <div style="display:flex;justify-content:space-between;align-items:start">
            <div>
              <h4 style="font-size:0.88rem;font-weight:700">${a.client}</h4>
              <p style="font-size:0.76rem;color:var(--text-muted)">${a.service}</p>
              <span style="font-size:0.68rem;color:var(--text-dim)">con ${a.stylist}</span>
            </div>
            <div style="text-align:right">
              <span style="font-size:1rem;font-weight:800;color:var(--accent)">${a.price}</span>
              <div style="margin-top:4px">${a.status}</div>
            </div>
          </div>
        </div>
      </div>
    `).join('')

    const appointmentsContent = `
      <div class="card" style="padding:1.5rem">
        <div class="card-header"><h3>Agenda de Hoy</h3><span class="badge badge-accent">${appointmentsData.length} citas</span></div>
        ${timelineCards}
      </div>
      <div style="margin-top:1.5rem">
        ${kpiGrid([
          { icon: '📅', label: 'Total Citas', value: md?.totalAppointments || 48 },
          { icon: '✅', label: 'Confirmadas', value: md?.confirmedCount || 42 },
          { icon: '⏳', label: 'Pendientes', value: md?.pendingCount || 4 },
          { icon: '🕐', label: 'Ocupación', value: md?.occupancyPct || 92, suffix: '%' },
        ])}
      </div>`

    const appointmentsSection = section('appointments', 'AGENDA', 'Citas del Día',
      'Timeline visual de todas las citas con servicios, estilistas y estado.',
      appointmentsContent)

    // ── Services Menu
    const servicesData = md?.services || [
      { name: 'Corte + Peinado', duration: '45 min', price: '€35', category: 'Cabello', popular: true },
      { name: 'Corte Caballero + Barba', duration: '30 min', price: '€28', category: 'Cabello', popular: false },
      { name: 'Color Completo', duration: '2h', price: '€85', category: 'Color', popular: true },
      { name: 'Mechas Balayage', duration: '2h 30min', price: '€120', category: 'Color', popular: true },
      { name: 'Manicura Semipermanente', duration: '1h', price: '€38', category: 'Manicura', popular: true },
      { name: 'Pedicura Spa', duration: '1h', price: '€42', category: 'Manicura', popular: false },
      { name: 'Tratamiento Facial Premium', duration: '1h 30min', price: '€85', category: 'Facial', popular: true },
      { name: 'Masaje Relajante', duration: '1h', price: '€60', category: 'Bienestar', popular: false },
      { name: 'Depilación Láser (zona)', duration: '30 min', price: '€45', category: 'Depilación', popular: false },
      { name: 'Pack Novia Completo', duration: '4h', price: '€350', category: 'Packs', popular: true },
    ]

    const serviceCards = servicesData.map((s: Record<string, string | boolean>) => `
      <div class="card" style="padding:1.2rem;position:relative;overflow:hidden">
        ${s.popular ? '<div style="position:absolute;top:12px;right:12px"><span class="badge badge-accent">Popular</span></div>' : ''}
        <span style="font-size:0.62rem;color:var(--text-dim);text-transform:uppercase;letter-spacing:1px">${s.category}</span>
        <h4 style="font-size:0.9rem;font-weight:700;margin-top:4px;margin-bottom:0.5rem">${s.name}</h4>
        <div style="display:flex;justify-content:space-between;align-items:center">
          <span style="font-size:0.76rem;color:var(--text-muted)">⏱️ ${s.duration}</span>
          <span style="font-size:1.2rem;font-weight:800;color:var(--accent)">${s.price}</span>
        </div>
      </div>
    `).join('')

    const servicesContent = `
      <div class="grid-2">${serviceCards}</div>
      <div style="margin-top:1.5rem">
        ${kpiGrid([
          { icon: '💇', label: 'Total Servicios', value: md?.totalServices || 24 },
          { icon: '💰', label: 'Ticket Medio', value: md?.avgTicket || 62, prefix: '€' },
          { icon: '⏱️', label: 'Duración Media', value: md?.avgDuration || '1h 10min' },
          { icon: '📈', label: 'Servicio Estrella', value: md?.topService || 'Color' },
        ])}
      </div>`

    const servicesSection = section('services-menu', 'CARTA DE SERVICIOS', 'Menú de Servicios',
      'Todos los servicios con duración, precio y categoría.',
      servicesContent)

    // ── Clients
    const clientCols: TableColumn[] = [
      { label: 'Cliente', key: 'name' },
      { label: 'Teléfono', key: 'phone' },
      { label: 'Última Visita', key: 'lastVisit' },
      { label: 'Visitas', key: 'visits', align: 'center' },
      { label: 'Gasto Total', key: 'totalSpent', align: 'right' },
      { label: 'Servicio Favorito', key: 'favService' },
      { label: 'Fidelidad', key: 'loyalty' },
    ]
    const clientRows = md?.clients || [
      { name: '👩 María López', phone: '612 345 678', lastVisit: 'Hoy', visits: '24', totalSpent: '€1,840', favService: 'Corte + Peinado', loyalty: '<span class="badge badge-purple">VIP</span>' },
      { name: '👩 Carmen Ruiz', phone: '623 456 789', lastVisit: 'Hoy', visits: '18', totalSpent: '€2,160', favService: 'Color Completo', loyalty: '<span class="badge badge-purple">VIP</span>' },
      { name: '👩 Elena García', phone: '634 567 890', lastVisit: 'Hoy', visits: '12', totalSpent: '€890', favService: 'Manicura', loyalty: '<span class="badge badge-green">Frecuente</span>' },
      { name: '👨 Pedro Sánchez', phone: '645 678 901', lastVisit: 'Hoy', visits: '8', totalSpent: '€224', favService: 'Corte Caballero', loyalty: '<span class="badge badge-blue">Regular</span>' },
      { name: '👩 Laura Martínez', phone: '656 789 012', lastVisit: 'Hoy', visits: '15', totalSpent: '€1,275', favService: 'Facial Premium', loyalty: '<span class="badge badge-green">Frecuente</span>' },
      { name: '👩 Sofía Torres', phone: '667 890 123', lastVisit: 'Hace 2 sem', visits: '6', totalSpent: '€228', favService: 'Manicura Semi', loyalty: '<span class="badge badge-blue">Regular</span>' },
      { name: '👩 Ana Fernández', phone: '678 901 234', lastVisit: 'Hace 3 sem', visits: '3', totalSpent: '€120', favService: 'Corte', loyalty: '<span class="badge badge-primary">Nuevo</span>' },
    ]

    const clientsContent = `
      <div class="card">${dataTable(clientCols, clientRows)}</div>
      <div style="margin-top:1.5rem">
        ${kpiGrid([
          { icon: '👥', label: 'Total Clientes', value: md?.totalClients || 2840 },
          { icon: '⭐', label: 'Clientes VIP', value: md?.vipClients || 124 },
          { icon: '🔄', label: 'Tasa Retorno', value: md?.returnRate || 78, suffix: '%' },
          { icon: '🆕', label: 'Nuevos Este Mes', value: md?.newClientsMonth || 42 },
        ])}
      </div>`

    const clientsSection = section('clients', 'CLIENTES', 'Base de Clientes',
      'Historial de visitas, gasto y nivel de fidelización de cada cliente.',
      clientsContent)

    // ── Staff
    const staffData = md?.staff || [
      { name: 'Lucía Navarro', role: 'Directora & Estilista', avatar: 'LN', clients: 42, revenue: '€4,200', satisfaction: 4.9, specialties: 'Color, Corte, Tratamientos', schedule: '9:00-18:00' },
      { name: 'Ana Beltrán', role: 'Estilista Senior', avatar: 'AB', clients: 38, revenue: '€3,800', satisfaction: 4.8, specialties: 'Color, Mechas, Peinados', schedule: '9:00-17:00' },
      { name: 'Sara Molina', role: 'Manicurista', avatar: 'SM', clients: 34, revenue: '€2,100', satisfaction: 4.9, specialties: 'Manicura, Pedicura, Nail Art', schedule: '10:00-18:00' },
      { name: 'David Torres', role: 'Barbero', avatar: 'DT', clients: 28, revenue: '€1,960', satisfaction: 4.7, specialties: 'Corte Caballero, Barba, Afeitado', schedule: '9:30-17:30' },
    ]

    const staffCards = staffData.map((s: Record<string, string | number>) => `
      <div class="card" style="padding:1.5rem">
        <div style="display:flex;align-items:center;gap:14px;margin-bottom:1rem">
          <div style="width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,var(--primary),var(--accent));display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.9rem;color:#fff">${s.avatar}</div>
          <div>
            <h4 style="font-size:0.95rem;font-weight:700">${s.name}</h4>
            <span class="badge badge-accent" style="margin-top:2px;display:inline-block">${s.role}</span>
          </div>
        </div>
        <p style="font-size:0.76rem;color:var(--text-muted);margin-bottom:0.8rem">✨ ${s.specialties}</p>
        <p style="font-size:0.72rem;color:var(--text-dim);margin-bottom:1rem">🕐 ${s.schedule}</p>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:0.5rem;padding-top:1rem;border-top:1px solid var(--border)">
          <div style="text-align:center">
            <div style="font-size:1.1rem;font-weight:800;color:var(--primary-light)">${s.clients}</div>
            <div style="font-size:0.6rem;color:var(--text-dim)">Clientes/Sem</div>
          </div>
          <div style="text-align:center">
            <div style="font-size:1.1rem;font-weight:800;color:var(--accent)">${s.revenue}</div>
            <div style="font-size:0.6rem;color:var(--text-dim)">Ingresos/Sem</div>
          </div>
          <div style="text-align:center">
            <div style="font-size:1.1rem;font-weight:800;color:var(--success)">${s.satisfaction}★</div>
            <div style="font-size:0.6rem;color:var(--text-dim)">Valoración</div>
          </div>
        </div>
      </div>
    `).join('')

    const staffContent = `
      <div class="grid-2">${staffCards}</div>
      <div style="margin-top:1.5rem">
        ${kpiGrid([
          { icon: '💇', label: 'Equipo', value: md?.staffCount || 4 },
          { icon: '📊', label: 'Ocupación Media', value: md?.staffOccupancy || 88, suffix: '%' },
          { icon: '⭐', label: 'Rating Equipo', value: md?.staffRating || 4.8, decimals: 1 },
          { icon: '💰', label: 'Ingresos/Persona', value: md?.revenuePerStaff || 3015, prefix: '€' },
        ])}
      </div>`

    const staffSection = section('staff', 'EQUIPO', 'Tu Equipo',
      'Rendimiento individual, especialidades y agenda de cada profesional.',
      staffContent)

    // ── Analytics
    const revenueByDay: BarChartItem[] = md?.revenueByDay || [
      { label: 'Lunes', value: 2400 },
      { label: 'Martes', value: 2800 },
      { label: 'Miércoles', value: 3200 },
      { label: 'Jueves', value: 3600 },
      { label: 'Viernes', value: 5200, color: 'var(--accent)' },
      { label: 'Sábado', value: 6800, color: 'var(--accent)' },
      { label: 'Domingo', value: 0, color: 'var(--text-dim)' },
    ]

    const analyticsContent = `
      <div class="grid-2">
        <div class="card">
          <div class="card-header"><h3>Ingresos por Día</h3></div>
          ${horizontalBarChart(revenueByDay)}
        </div>
        <div class="card">
          <div class="card-header"><h3>Métricas Clave</h3></div>
          ${progressBar('Ticket medio vs objetivo', md?.avgTicketPct || 78, 'primary')}
          ${progressBar('Ocupación agenda', md?.occupancyAvg || 88, 'ok')}
          ${progressBar('Retorno de clientes', md?.returnRatePct || 78, 'accent')}
          ${progressBar('Uso de productos', md?.productUsage || 65, 'primary')}
        </div>
      </div>
      <div style="margin-top:1.5rem">
        ${bigResult(
          md?.monthlyRevenueStr || '€28,500',
          md?.monthlyRevenueLabel || 'Facturación mensual — Todos los servicios',
          [
            { title: md?.avgTicketStr || '€62', subtitle: 'Ticket medio' },
            { title: md?.monthlyClients || '460', subtitle: 'Clientes/mes' },
            { title: md?.productMargin || '42%', subtitle: 'Margen productos' },
          ]
        )}
      </div>`

    const anaSection = section('analytics', 'RENDIMIENTO', 'Analytics del Salón',
      'Análisis detallado de facturación, ocupación y rendimiento del equipo.',
      analyticsContent)

    // ── Settings
    const settingsFields: SettingsField[] = [
      { label: 'Nombre del salón', value: c.businessName, type: 'text' },
      { label: 'Email de contacto', value: md?.email || `citas@${c.businessName.toLowerCase().replace(/\s/g, '')}.com`, type: 'email' },
      { label: 'Hora de apertura', value: md?.openTime || '09:00', type: 'text' },
      { label: 'Hora de cierre', value: md?.closeTime || '18:00', type: 'text' },
      { label: 'Recordatorio WhatsApp automático', value: '', type: 'toggle', enabled: true },
      { label: 'Confirmación de cita por SMS', value: '', type: 'toggle', enabled: true },
      { label: 'Reserva online 24/7', value: '', type: 'toggle', enabled: true },
      { label: 'Día de descanso: Domingo', value: '', type: 'toggle', enabled: true },
    ]

    const settContent = settingsForm(settingsFields)
    const settSection = section('settings', 'CONFIGURACIÓN', 'Ajustes del Salón',
      'Personaliza horarios, recordatorios y reservas online.',
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
<style>${designSystemCSS(c.primaryColor, c.accentColor, c.theme || 'warm')}</style>
<style>
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700;800;900&display=swap');
body { font-family: 'Jost', sans-serif; background: #0d0a0e; }
</style>
</head>
<body>
${nav}
${notificationContainer()}
${hero}
${dashSection}
${appointmentsSection}
${servicesSection}
${clientsSection}
${staffSection}
${anaSection}
${settSection}
${footer}
<script>${allScripts()}</script>
</body>
</html>`
  },
}

interface ServicesMockData {
  heroTagline?: string
  heroSubtitle?: string
  dailyAppointments?: number
  monthlyRevenue?: number
  totalClients?: number
  avgRating?: number
  appointmentsToday?: number
  revenueToday?: number
  newClientsToday?: number
  rating?: number
  topServices?: BarChartItem[]
  alert1?: string
  alert2?: string
  alert3?: string
  alert4?: string
  alertCount?: number
  appointments?: Record<string, string>[]
  totalAppointments?: number
  confirmedCount?: number
  pendingCount?: number
  occupancyPct?: number
  services?: Record<string, string | boolean>[]
  totalServices?: number
  avgTicket?: number
  avgDuration?: string
  topService?: string
  clients?: Record<string, string>[]
  vipClients?: number
  returnRate?: number
  newClientsMonth?: number
  staff?: Record<string, string | number>[]
  staffCount?: number
  staffOccupancy?: number
  staffRating?: number
  revenuePerStaff?: number
  revenueByDay?: BarChartItem[]
  avgTicketPct?: number
  occupancyAvg?: number
  returnRatePct?: number
  productUsage?: number
  monthlyRevenueStr?: string
  monthlyRevenueLabel?: string
  avgTicketStr?: string
  monthlyClients?: string
  productMargin?: string
  email?: string
  openTime?: string
  closeTime?: string
}
