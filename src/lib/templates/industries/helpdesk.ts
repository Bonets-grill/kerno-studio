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

export const helpdeskTemplate: TemplateDefinition = {
  meta: {
    id: 'helpdesk',
    name: 'Helpdesk Premium',
    industries: ['helpdesk', 'soporte', 'support', 'tickets', 'customer service', 'atención al cliente', 'mesa de ayuda', 'incidencias'],
    projectTypes: ['landing', 'mvp', 'system', 'saas'],
    sections: ['hero', 'dashboard', 'tickets', 'agents', 'knowledge-base', 'sla', 'analytics', 'settings'],
    description: 'Plantilla premium para helpdesk y soporte al cliente. Dashboard con KPIs de tickets, gestión de agentes, base de conocimiento, métricas SLA, analytics de rendimiento y configuración.',
  },

  render(c: TemplateCustomization): string {
    const md = c.mockData as HelpdeskMockData

    // ── Nav
    const nav = navBar(c.businessName, [
      { id: 'hero', label: 'Inicio' },
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'tickets', label: 'Tickets' },
      { id: 'agents', label: 'Agentes' },
      { id: 'knowledge-base', label: 'Knowledge Base' },
      { id: 'sla', label: 'SLA' },
      { id: 'analytics', label: 'Analytics' },
      { id: 'settings', label: 'Config' },
    ])

    // ── Hero
    const hero = heroSection(
      c.businessName,
      md?.heroTagline || `${c.businessName} — Soporte que Enamora`,
      md?.heroSubtitle || 'Gestión de tickets inteligente, tiempos de respuesta récord, agentes empoderados y clientes satisfechos.',
      [
        { value: md?.ticketsResolved || 12840, label: 'Tickets Resueltos' },
        { value: md?.avgResponseTime || 4.2, label: 'Min Respuesta', suffix: 'min' },
        { value: md?.satisfactionScore || 98, label: 'Satisfacción', suffix: '%' },
        { value: md?.agentCount || 24, label: 'Agentes Activos' },
      ],
      `Demo Interactivo — ${c.businessType || 'Helpdesk'}`
    )

    // ── Dashboard
    const dashKpis: KpiData[] = [
      { icon: '🎫', label: 'Tickets Abiertos', value: md?.openTickets || 47, trend: { value: '-12 vs ayer', direction: 'down' } },
      { icon: '⏱️', label: 'Resp. Media', value: md?.avgResponse || 4.2, suffix: 'min', decimals: 1, trend: { value: '-18%', direction: 'up' } },
      { icon: '😊', label: 'Satisfacción', value: md?.satisfaction || 98, suffix: '%', trend: { value: '+2%', direction: 'up' } },
      { icon: '👨‍💻', label: 'Agentes Online', value: md?.agentsOnline || 18, trend: { value: '24 total', direction: 'neutral' } },
    ]

    const ticketsByChannel: BarChartItem[] = md?.ticketsByChannel || [
      { label: 'Email', value: 342, color: 'var(--primary-light)' },
      { label: 'Chat en vivo', value: 278, color: 'var(--accent)' },
      { label: 'WhatsApp', value: 156, color: 'var(--success)' },
      { label: 'Teléfono', value: 89, color: 'var(--primary-light)' },
      { label: 'Formulario web', value: 64, color: 'var(--accent)' },
    ]

    const dashAlerts = [
      alertRow('🔴', md?.alert1 || 'Ticket #8923 — SLA crítico: 2min para vencimiento', 'Urgente', 'badge-red'),
      alertRow('🟡', md?.alert2 || '12 tickets sin asignar en cola "Facturación"', 'Pendiente', 'badge-yellow'),
      alertRow('🟢', md?.alert3 || 'Agente Diana resolvió 34 tickets hoy — récord personal', 'Logro', 'badge-green'),
      alertRow('📊', md?.alert4 || 'Satisfacción semanal al 98% — objetivo superado', 'KPI', 'badge-blue'),
    ]

    const dashContent = `
      ${kpiGrid(dashKpis)}
      <div class="grid-2" style="margin-top:1.5rem">
        <div class="card">
          <div class="card-header"><h3>Tickets por Canal</h3><span class="badge badge-accent">Últimos 7 días</span></div>
          ${horizontalBarChart(ticketsByChannel)}
        </div>
        <div class="card">
          <div class="card-header"><h3>Alertas del Sistema</h3><span class="badge badge-primary">${md?.alertCount || 4} activas</span></div>
          ${dashAlerts.join('')}
        </div>
      </div>`

    const dashSection = section('dashboard', c.businessType?.toUpperCase() || 'HELPDESK', 'Panel de Control',
      'Vista en tiempo real del estado de soporte y rendimiento del equipo.',
      dashContent)

    // ── Tickets
    const ticketCols: TableColumn[] = [
      { label: 'ID', key: 'id' },
      { label: 'Asunto', key: 'subject' },
      { label: 'Solicitante', key: 'requester' },
      { label: 'Prioridad', key: 'priority', align: 'center' },
      { label: 'Asignado', key: 'assignee' },
      { label: 'Tiempo', key: 'time', align: 'center' },
      { label: 'Estado', key: 'status' },
    ]
    const ticketRows = md?.tickets || [
      { id: '#8923', subject: 'No puedo acceder a mi cuenta', requester: 'María López', priority: '<span class="badge badge-red">Urgente</span>', assignee: 'Diana R.', time: '4min', status: '<span class="badge badge-yellow">En progreso</span>' },
      { id: '#8922', subject: 'Error al procesar pago con tarjeta', requester: 'Carlos Ruiz', priority: '<span class="badge badge-red">Alta</span>', assignee: 'Miguel S.', time: '12min', status: '<span class="badge badge-yellow">En progreso</span>' },
      { id: '#8921', subject: '¿Cómo exporto mis datos a CSV?', requester: 'Ana García', priority: '<span class="badge badge-blue">Normal</span>', assignee: 'Laura P.', time: '22min', status: '<span class="badge badge-yellow">En progreso</span>' },
      { id: '#8920', subject: 'Factura duplicada mes de marzo', requester: 'Pedro Martínez', priority: '<span class="badge badge-blue">Normal</span>', assignee: 'Diana R.', time: '1h', status: '<span class="badge badge-green">Resuelto</span>' },
      { id: '#8919', subject: 'Integración Slack no funciona', requester: 'TechCo SL', priority: '<span class="badge badge-red">Alta</span>', assignee: 'Javier M.', time: '35min', status: '<span class="badge badge-yellow">En progreso</span>' },
      { id: '#8918', subject: 'Solicitud de nueva funcionalidad: reportes', requester: 'Elena Vidal', priority: '<span class="badge badge-green">Baja</span>', assignee: 'Sin asignar', time: '2h', status: '<span class="badge badge-purple">Backlog</span>' },
      { id: '#8917', subject: 'Lentitud en carga de dashboard', requester: 'Jorge Pérez', priority: '<span class="badge badge-red">Alta</span>', assignee: 'Miguel S.', time: '45min', status: '<span class="badge badge-green">Resuelto</span>' },
      { id: '#8916', subject: 'Cambio de plan a Enterprise', requester: 'Empresa ABC', priority: '<span class="badge badge-blue">Normal</span>', assignee: 'Laura P.', time: '3h', status: '<span class="badge badge-green">Resuelto</span>' },
    ]

    const ticketsContent = `
      <div class="card">${dataTable(ticketCols, ticketRows)}</div>
      <div style="margin-top:1.5rem">
        ${kpiGrid([
          { icon: '🎫', label: 'Abiertos', value: md?.openCount || 47 },
          { icon: '⏳', label: 'En Progreso', value: md?.inProgressCount || 23 },
          { icon: '✅', label: 'Resueltos Hoy', value: md?.resolvedToday || 64 },
          { icon: '🔄', label: 'Reabiertos', value: md?.reopenedCount || 3 },
        ])}
      </div>`

    const ticketsSection = section('tickets', 'TICKETS', 'Cola de Soporte',
      'Todos los tickets con prioridad, estado y tiempo de respuesta en tiempo real.',
      ticketsContent)

    // ── Agents
    const agentsData = md?.agents || [
      { name: 'Diana Rodríguez', role: 'Senior', avatar: 'DR', active: 8, resolved: 34, satisfaction: 99, status: 'online' },
      { name: 'Miguel Sánchez', role: 'Senior', avatar: 'MS', active: 6, resolved: 28, satisfaction: 97, status: 'online' },
      { name: 'Laura Pérez', role: 'Junior', avatar: 'LP', active: 5, resolved: 19, satisfaction: 96, status: 'online' },
      { name: 'Javier Moreno', role: 'Mid', avatar: 'JM', active: 4, resolved: 22, satisfaction: 95, status: 'online' },
      { name: 'Sofía Torres', role: 'Mid', avatar: 'ST', active: 3, resolved: 18, satisfaction: 98, status: 'break' },
      { name: 'Pablo García', role: 'Junior', avatar: 'PG', active: 0, resolved: 12, satisfaction: 94, status: 'offline' },
    ]

    const agentCards = agentsData.map((a: Record<string, string | number>) => {
      const statusColor = a.status === 'online' ? 'var(--success)' : a.status === 'break' ? 'var(--warning)' : 'var(--text-dim)'
      const statusLabel = a.status === 'online' ? 'En línea' : a.status === 'break' ? 'Descanso' : 'Offline'
      return `
      <div class="card" style="padding:1.5rem;text-align:center">
        <div style="width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,var(--primary),var(--accent));display:flex;align-items:center;justify-content:center;font-weight:700;font-size:1rem;color:#fff;margin:0 auto 0.8rem;position:relative">
          ${a.avatar}
          <div style="position:absolute;bottom:2px;right:2px;width:12px;height:12px;border-radius:50%;background:${statusColor};border:2px solid var(--bg-card)"></div>
        </div>
        <h4 style="font-size:0.9rem;font-weight:700">${a.name}</h4>
        <span class="badge badge-primary" style="margin-top:4px;display:inline-block">${a.role}</span>
        <div style="font-size:0.68rem;color:${statusColor};margin-top:6px;font-weight:600">${statusLabel}</div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:0.5rem;margin-top:1rem;padding-top:1rem;border-top:1px solid var(--border)">
          <div>
            <div style="font-size:1.1rem;font-weight:800;color:var(--warning)">${a.active}</div>
            <div style="font-size:0.6rem;color:var(--text-dim)">Activos</div>
          </div>
          <div>
            <div style="font-size:1.1rem;font-weight:800;color:var(--success)">${a.resolved}</div>
            <div style="font-size:0.6rem;color:var(--text-dim)">Resueltos</div>
          </div>
          <div>
            <div style="font-size:1.1rem;font-weight:800;color:var(--accent)">${a.satisfaction}%</div>
            <div style="font-size:0.6rem;color:var(--text-dim)">CSAT</div>
          </div>
        </div>
      </div>`
    }).join('')

    const agentsContent = `
      <div class="grid-3">${agentCards}</div>
      <div style="margin-top:1.5rem">
        ${kpiGrid([
          { icon: '👨‍💻', label: 'Online', value: md?.onlineAgents || 18 },
          { icon: '☕', label: 'En Descanso', value: md?.breakAgents || 3 },
          { icon: '🏠', label: 'Offline', value: md?.offlineAgents || 3 },
          { icon: '📊', label: 'CSAT Equipo', value: md?.teamCSAT || 96.5, suffix: '%', decimals: 1 },
        ])}
      </div>`

    const agentsSection = section('agents', 'EQUIPO', 'Agentes de Soporte',
      'Rendimiento individual de cada agente con métricas en tiempo real.',
      agentsContent)

    // ── Knowledge Base
    const kbArticles = md?.articles || [
      { title: 'Cómo restablecer tu contraseña', category: 'Cuenta', views: '4,230', helpful: '96%', icon: '🔑' },
      { title: 'Guía de facturación y pagos', category: 'Facturación', views: '3,890', helpful: '94%', icon: '💳' },
      { title: 'Configurar integración con Slack', category: 'Integraciones', views: '2,450', helpful: '91%', icon: '🔗' },
      { title: 'Exportar datos a CSV/Excel', category: 'Datos', views: '2,120', helpful: '89%', icon: '📊' },
      { title: 'Primeros pasos: tutorial completo', category: 'Onboarding', views: '5,670', helpful: '97%', icon: '🚀' },
      { title: 'Política de reembolsos', category: 'Facturación', views: '1,890', helpful: '88%', icon: '💰' },
      { title: 'Solucionar problemas de rendimiento', category: 'Técnico', views: '1,340', helpful: '85%', icon: '⚡' },
      { title: 'Gestión de permisos y roles', category: 'Admin', views: '980', helpful: '92%', icon: '🔐' },
    ]

    const articleRows = kbArticles.map((a: Record<string, string>) => `
      <div style="display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid var(--border)">
        <span style="font-size:1.3rem">${a.icon}</span>
        <div style="flex:1">
          <h4 style="font-size:0.85rem;font-weight:600">${a.title}</h4>
          <span style="font-size:0.68rem;color:var(--text-dim)">${a.category} · ${a.views} vistas</span>
        </div>
        <div style="text-align:right">
          <span class="badge badge-green">${a.helpful} útil</span>
        </div>
      </div>
    `).join('')

    const kbContent = `
      <div class="card" style="padding:1.5rem">
        <div class="card-header"><h3>Artículos Populares</h3><span class="badge badge-accent">${kbArticles.length} artículos</span></div>
        ${articleRows}
      </div>
      <div style="margin-top:1.5rem">
        ${kpiGrid([
          { icon: '📚', label: 'Total Artículos', value: md?.totalArticles || 142 },
          { icon: '👁️', label: 'Vistas/Mes', value: md?.monthlyViews || 28400 },
          { icon: '✅', label: 'Deflection Rate', value: md?.deflectionRate || 34, suffix: '%' },
          { icon: '📝', label: 'Nuevos Este Mes', value: md?.newArticles || 8 },
        ])}
      </div>`

    const kbSection = section('knowledge-base', 'KNOWLEDGE BASE', 'Base de Conocimiento',
      'Artículos de ayuda que reducen tickets y empoderan a tus clientes.',
      kbContent)

    // ── SLA
    const slaContent = `
      <div class="grid-2">
        <div class="card">
          <div class="card-header"><h3>Cumplimiento SLA por Prioridad</h3></div>
          ${progressBar('Urgente (< 15min)', md?.slaUrgent || 94, 'ok')}
          ${progressBar('Alta (< 1h)', md?.slaHigh || 97, 'ok')}
          ${progressBar('Normal (< 4h)', md?.slaNormal || 99, 'ok')}
          ${progressBar('Baja (< 24h)', md?.slaLow || 100, 'ok')}
        </div>
        <div class="card">
          <div class="card-header"><h3>Tiempos de Respuesta</h3></div>
          ${horizontalBarChart([
            { label: 'Primera respuesta', value: md?.firstResponse || 4.2, color: 'var(--success)' },
            { label: 'Tiempo asignación', value: md?.assignTime || 1.8, color: 'var(--primary-light)' },
            { label: 'Tiempo resolución', value: md?.resolveTime || 45, color: 'var(--accent)' },
            { label: 'Tiempo reapertura', value: md?.reopenTime || 120, color: 'var(--warning)' },
          ])}
          <p style="font-size:0.68rem;color:var(--text-dim);margin-top:0.5rem">Valores en minutos</p>
        </div>
      </div>
      <div style="margin-top:1.5rem">
        ${bigResult(
          md?.slaOverall || '97.2%',
          md?.slaLabel || 'Cumplimiento SLA Global — Últimos 30 días',
          [
            { title: md?.ticketsInSLA || '3,842', subtitle: 'Tickets dentro de SLA' },
            { title: md?.ticketsBreached || '112', subtitle: 'SLA incumplido' },
            { title: md?.avgFirstResp || '4.2min', subtitle: 'Primera respuesta media' },
          ]
        )}
      </div>`

    const slaSection = section('sla', 'SLA', 'Acuerdos de Nivel de Servicio',
      'Cumplimiento de SLA por prioridad con tiempos de respuesta y resolución.',
      slaContent)

    // ── Analytics
    const ticketsByDay: BarChartItem[] = md?.ticketsByDay || [
      { label: 'Lunes', value: 89 },
      { label: 'Martes', value: 102 },
      { label: 'Miércoles', value: 95 },
      { label: 'Jueves', value: 78 },
      { label: 'Viernes', value: 67 },
      { label: 'Sábado', value: 23, color: 'var(--text-dim)' },
      { label: 'Domingo', value: 12, color: 'var(--text-dim)' },
    ]

    const analyticsContent = `
      <div class="grid-2">
        <div class="card">
          <div class="card-header"><h3>Volumen de Tickets Semanal</h3></div>
          ${horizontalBarChart(ticketsByDay)}
        </div>
        <div class="card">
          <div class="card-header"><h3>Métricas de Rendimiento</h3></div>
          ${progressBar('First Contact Resolution', md?.fcrRate || 72, 'primary')}
          ${progressBar('Satisfacción CSAT', md?.csatPct || 98, 'ok')}
          ${progressBar('Net Promoter Score', md?.npsPct || 78, 'accent')}
          ${progressBar('Agent Utilization', md?.agentUtil || 84, 'primary')}
        </div>
      </div>
      <div style="margin-top:1.5rem">
        ${kpiGrid([
          { icon: '📈', label: 'Tickets/Mes', value: md?.monthlyTickets || 2840 },
          { icon: '⏱️', label: 'MTTR', value: md?.mttr || '45min' },
          { icon: '🔄', label: 'Tasa Reapertura', value: md?.reopenRate || 3.2, suffix: '%', decimals: 1 },
          { icon: '💰', label: 'Coste/Ticket', value: md?.costPerTicket || 4.80, prefix: '€', decimals: 2 },
        ])}
      </div>`

    const anaSection = section('analytics', 'RENDIMIENTO', 'Analytics de Soporte',
      'Análisis detallado de volumen, tiempos y satisfacción del cliente.',
      analyticsContent)

    // ── Settings
    const settingsFields: SettingsField[] = [
      { label: 'Nombre del helpdesk', value: c.businessName, type: 'text' },
      { label: 'Email de soporte', value: md?.email || `soporte@${c.businessName.toLowerCase().replace(/\s/g, '')}.com`, type: 'email' },
      { label: 'SLA Urgente (minutos)', value: md?.slaUrgentMin || '15', type: 'text' },
      { label: 'SLA Alta (minutos)', value: md?.slaHighMin || '60', type: 'text' },
      { label: 'Asignación automática', value: '', type: 'toggle', enabled: true },
      { label: 'Respuesta automática IA', value: '', type: 'toggle', enabled: true },
      { label: 'Encuesta CSAT post-resolución', value: '', type: 'toggle', enabled: true },
      { label: 'Escalamiento automático SLA', value: '', type: 'toggle', enabled: true },
    ]

    const settContent = settingsForm(settingsFields)
    const settSection = section('settings', 'CONFIGURACIÓN', 'Ajustes del Helpdesk',
      'Personaliza SLAs, asignación automática y automatizaciones.',
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
<style>${designSystemCSS(c.primaryColor, c.accentColor, c.theme || 'executive')}</style>
<style>
@import url('https://fonts.googleapis.com/css2?family=Figtree:wght@300;400;500;600;700;800;900&display=swap');
body { font-family: 'Figtree', sans-serif; background: #0c0d11; }
</style>
</head>
<body>
${nav}
${notificationContainer()}
${hero}
${dashSection}
${ticketsSection}
${agentsSection}
${kbSection}
${slaSection}
${anaSection}
${settSection}
${footer}
<script>${allScripts()}</script>
</body>
</html>`
  },
}

interface HelpdeskMockData {
  heroTagline?: string
  heroSubtitle?: string
  ticketsResolved?: number
  avgResponseTime?: number
  satisfactionScore?: number
  agentCount?: number
  openTickets?: number
  avgResponse?: number
  satisfaction?: number
  agentsOnline?: number
  ticketsByChannel?: BarChartItem[]
  alert1?: string
  alert2?: string
  alert3?: string
  alert4?: string
  alertCount?: number
  tickets?: Record<string, string>[]
  openCount?: number
  inProgressCount?: number
  resolvedToday?: number
  reopenedCount?: number
  agents?: Record<string, string | number>[]
  onlineAgents?: number
  breakAgents?: number
  offlineAgents?: number
  teamCSAT?: number
  articles?: Record<string, string>[]
  totalArticles?: number
  monthlyViews?: number
  deflectionRate?: number
  newArticles?: number
  slaUrgent?: number
  slaHigh?: number
  slaNormal?: number
  slaLow?: number
  firstResponse?: number
  assignTime?: number
  resolveTime?: number
  reopenTime?: number
  slaOverall?: string
  slaLabel?: string
  ticketsInSLA?: string
  ticketsBreached?: string
  avgFirstResp?: string
  ticketsByDay?: BarChartItem[]
  fcrRate?: number
  csatPct?: number
  npsPct?: number
  agentUtil?: number
  monthlyTickets?: number
  mttr?: string
  reopenRate?: number
  costPerTicket?: number
  email?: string
  slaUrgentMin?: string
  slaHighMin?: string
}
