import type { TemplateDefinition, TemplateCustomization } from '../types'
import { designSystemCSS } from '../shared/design-system'
import { allScripts } from '../shared/scripts'
import {
  navBar, heroSection, notificationContainer, section,
  kpiGrid, dataTable, progressBar, horizontalBarChart,
  settingsForm, alertRow, bigResult,
  type KpiData, type TableColumn, type BarChartItem,
  type SettingsField,
} from '../shared/components'

export const analyticsTemplate: TemplateDefinition = {
  meta: {
    id: 'analytics',
    name: 'Analytics & Business Intelligence',
    industries: ['analytics', 'analítica', 'data', 'datos', 'bi', 'business intelligence', 'dashboard', 'métricas', 'metrics', 'reporting', 'reportes'],
    projectTypes: ['landing', 'mvp', 'system', 'saas'],
    sections: ['hero', 'dashboard', 'funnel', 'segments', 'events', 'cohorts', 'reports', 'settings'],
    description: 'Plantilla data-dense para plataformas de analytics, BI y dashboards de métricas. Tipografía monospace para datos, funnel de conversión, segmentos, event log, cohortes de retención y reportes.',
  },

  render(c: TemplateCustomization): string {
    const md = c.mockData as AnalyticsMockData

    // ── Nav
    const nav = navBar(c.businessName, [
      { id: 'hero', label: 'Inicio' },
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'funnel', label: 'Funnel' },
      { id: 'segments', label: 'Segmentos' },
      { id: 'events', label: 'Eventos' },
      { id: 'cohorts', label: 'Cohortes' },
      { id: 'reports', label: 'Reportes' },
      { id: 'settings', label: 'Config' },
    ])

    // ── Hero
    const hero = heroSection(
      c.businessName,
      md?.heroTagline || 'Datos que impulsan decisiones',
      md?.heroSubtitle || 'Plataforma de analytics en tiempo real. Eventos, funnels, cohortes y segmentos para entender a tus usuarios.',
      [
        { value: md?.totalEvents || 2_840_000, label: 'Eventos/día' },
        { value: md?.activeUsers || 18400, label: 'Usuarios Activos' },
        { value: md?.conversionRate || '4.7%', label: 'Conversión' },
        { value: md?.mrr || 34200, label: 'MRR', prefix: '€' },
      ],
      `Demo Interactivo — ${c.businessType || 'Analytics'}`
    )

    // ── Dashboard
    const dashKpis: KpiData[] = [
      { icon: '📊', label: 'Eventos Hoy', value: md?.eventsToday || 284000, trend: { value: '+12.4%', direction: 'up' } },
      { icon: '👥', label: 'Usuarios Únicos', value: md?.uniqueUsers || 18400, trend: { value: '+8.1%', direction: 'up' } },
      { icon: '🎯', label: 'Conversión', value: md?.conversion || 4.7, decimals: 1, suffix: '%', trend: { value: '+0.3%', direction: 'up' } },
      { icon: '💰', label: 'Revenue', value: md?.revenue || 127500, prefix: '€', trend: { value: '+15.2%', direction: 'up' } },
    ]

    const eventsByType: BarChartItem[] = md?.eventsByType || [
      { label: 'page_view', value: 142000, color: 'var(--primary-light)' },
      { label: 'click', value: 84200, color: 'var(--accent)' },
      { label: 'signup', value: 3200, color: 'var(--primary-light)' },
      { label: 'purchase', value: 1480, color: 'var(--accent)' },
      { label: 'add_to_cart', value: 6700, color: 'var(--primary-light)' },
      { label: 'search', value: 28400, color: 'var(--accent)' },
    ]

    const dashAlerts = [
      alertRow('🚀', md?.alert1 || 'Tráfico récord: 284K eventos en las últimas 24h', 'Récord', 'badge-green'),
      alertRow('⚠️', md?.alert2 || 'Caída de conversión del -1.2% en checkout mobile', 'Alerta', 'badge-red'),
      alertRow('📈', md?.alert3 || 'Segmento "Power Users" creció un 18% esta semana', '+18%', 'badge-blue'),
      alertRow('🔔', md?.alert4 || 'Reporte semanal listo para descargar', 'Nuevo', 'badge-purple'),
    ]

    const sparklineBars = `
      <div class="card" style="grid-column:span 2">
        <div class="card-header"><h3>Eventos por Tipo (24h)</h3><span class="badge badge-accent">Tiempo real</span></div>
        ${horizontalBarChart(eventsByType)}
      </div>`

    const dashContent = `
      ${kpiGrid(dashKpis)}
      <div class="grid-2" style="margin-top:1.5rem">
        ${sparklineBars}
      </div>
      <div class="card" style="margin-top:1.5rem">
        <div class="card-header"><h3>Alertas del Sistema</h3><span class="badge badge-primary">${md?.alertCount || 4} activas</span></div>
        ${dashAlerts.join('')}
      </div>`

    const dashSection = section('dashboard', 'DASHBOARD', 'Vista General de Métricas',
      'KPIs principales, distribución de eventos y alertas en tiempo real.',
      dashContent)

    // ── Funnel
    const funnelSteps = md?.funnelSteps || [
      { label: 'Visita Landing', value: 100, users: 42000 },
      { label: 'Registro', value: 24, users: 10080 },
      { label: 'Activación', value: 15, users: 6300 },
      { label: 'Primera Compra', value: 7.2, users: 3024 },
      { label: 'Compra Recurrente', value: 4.7, users: 1974 },
    ]

    const funnelHtml = funnelSteps.map((step: FunnelStep, i: number) => {
      const width = Math.max(step.value, 8)
      const dropoff = i > 0 ? ((1 - step.value / funnelSteps[i - 1].value) * 100).toFixed(1) : null
      return `
      <div style="display:flex;align-items:center;gap:1rem;margin-bottom:0.6rem">
        <div style="width:140px;font-size:0.78rem;color:var(--text-muted);text-align:right;font-family:'JetBrains Mono',monospace">${step.label}</div>
        <div style="flex:1;position:relative">
          <div class="bar-bg" style="height:32px;border-radius:6px">
            <div class="bar-fill bar-primary" data-width="${width}%" style="width:0%;height:100%;border-radius:6px;display:flex;align-items:center;padding-left:10px">
              <span style="font-size:0.72rem;font-weight:700;color:#fff;font-family:'JetBrains Mono',monospace">${step.value}%</span>
            </div>
          </div>
        </div>
        <div style="width:90px;text-align:right">
          <span style="font-size:0.82rem;font-weight:700;font-family:'JetBrains Mono',monospace">${step.users.toLocaleString()}</span>
          <span style="font-size:0.62rem;color:var(--text-dim);display:block">usuarios</span>
        </div>
        ${dropoff !== null ? `<div style="width:60px;text-align:center"><span class="badge badge-red" style="font-family:'JetBrains Mono',monospace">-${dropoff}%</span></div>` : '<div style="width:60px"></div>'}
      </div>`
    }).join('')

    const funnelContent = `
      <div class="card">
        <div class="card-header"><h3>Funnel de Conversión</h3><span class="badge badge-accent">Últimos 30 días</span></div>
        ${funnelHtml}
      </div>
      ${bigResult(md?.overallConversion || '4.7%', 'Tasa de Conversión Global (Visita → Compra Recurrente)', [
        { title: md?.avgTimeToConvert || '3.2 días', subtitle: 'Tiempo medio a conversión' },
        { title: md?.topChannel || 'Orgánico', subtitle: 'Canal con más conversión' },
        { title: md?.funnelImprovement || '+0.8%', subtitle: 'Mejora vs. mes anterior' },
      ])}`

    const funnelSection = section('funnel', 'FUNNEL', 'Embudo de Conversión',
      'Analiza cada paso del funnel, identifica dónde pierdes usuarios y optimiza tasas.',
      funnelContent)

    // ── Segments
    const segmentRows = md?.segments || [
      { name: 'Power Users', users: '2,340', engagement: '92%', revenue: '€68,400', growth: '+14%', status: '<span class="badge badge-green">Activo</span>' },
      { name: 'Casual Browsers', users: '8,120', engagement: '34%', revenue: '€12,800', growth: '+3%', status: '<span class="badge badge-blue">Activo</span>' },
      { name: 'Churning', users: '1,680', engagement: '8%', revenue: '€2,100', growth: '-22%', status: '<span class="badge badge-red">Alerta</span>' },
      { name: 'New Signups (7d)', users: '890', engagement: '67%', revenue: '€4,200', growth: '+28%', status: '<span class="badge badge-green">Creciendo</span>' },
      { name: 'Enterprise', users: '420', engagement: '88%', revenue: '€42,000', growth: '+9%', status: '<span class="badge badge-purple">Premium</span>' },
      { name: 'Mobile Only', users: '5,200', engagement: '41%', revenue: '€18,600', growth: '+6%', status: '<span class="badge badge-blue">Estable</span>' },
    ]

    const segmentCols: TableColumn[] = [
      { label: 'Segmento', key: 'name' },
      { label: 'Usuarios', key: 'users', align: 'right' },
      { label: 'Engagement', key: 'engagement', align: 'right' },
      { label: 'Revenue', key: 'revenue', align: 'right' },
      { label: 'Crecimiento', key: 'growth', align: 'right' },
      { label: 'Estado', key: 'status', align: 'center' },
    ]

    const segContent = `
      <div class="card">
        <div class="card-header"><h3>Segmentos de Usuario</h3><span class="badge badge-accent">${segmentRows.length} segmentos</span></div>
        ${dataTable(segmentCols, segmentRows)}
      </div>
      <div class="grid-3" style="margin-top:1.5rem">
        <div class="card" style="text-align:center">
          <div style="font-size:0.66rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:0.3rem">Segmento Más Rentable</div>
          <div style="font-size:1.4rem;font-weight:800;color:var(--accent);font-family:'JetBrains Mono',monospace">Power Users</div>
          <div style="font-size:0.72rem;color:var(--text-muted)">€68,400 en revenue</div>
        </div>
        <div class="card" style="text-align:center">
          <div style="font-size:0.66rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:0.3rem">Mayor Crecimiento</div>
          <div style="font-size:1.4rem;font-weight:800;color:var(--success);font-family:'JetBrains Mono',monospace">+28%</div>
          <div style="font-size:0.72rem;color:var(--text-muted)">New Signups (7d)</div>
        </div>
        <div class="card" style="text-align:center">
          <div style="font-size:0.66rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:0.3rem">Riesgo de Churn</div>
          <div style="font-size:1.4rem;font-weight:800;color:var(--danger);font-family:'JetBrains Mono',monospace">1,680</div>
          <div style="font-size:0.72rem;color:var(--text-muted)">usuarios en riesgo</div>
        </div>
      </div>`

    const segSection = section('segments', 'SEGMENTOS', 'Segmentación de Usuarios',
      'Grupos de usuarios basados en comportamiento, engagement y valor comercial.',
      segContent)

    // ── Events
    const eventRows = md?.events || [
      { timestamp: '2026-04-09 14:32:18', event: 'purchase', user: 'usr_8f2a1', properties: 'amount: €89.00, plan: pro', source: 'web' },
      { timestamp: '2026-04-09 14:32:15', event: 'page_view', user: 'usr_3c9b7', properties: 'path: /pricing', source: 'mobile' },
      { timestamp: '2026-04-09 14:32:12', event: 'signup', user: 'usr_d4e2f', properties: 'method: google_oauth', source: 'web' },
      { timestamp: '2026-04-09 14:32:08', event: 'click', user: 'usr_a1b3c', properties: 'element: cta_hero_button', source: 'web' },
      { timestamp: '2026-04-09 14:31:55', event: 'add_to_cart', user: 'usr_7e4d2', properties: 'product: enterprise_plan', source: 'web' },
      { timestamp: '2026-04-09 14:31:42', event: 'search', user: 'usr_f9c1a', properties: 'query: "integrations API"', source: 'mobile' },
      { timestamp: '2026-04-09 14:31:38', event: 'page_view', user: 'usr_2b8e6', properties: 'path: /docs/webhooks', source: 'web' },
      { timestamp: '2026-04-09 14:31:20', event: 'purchase', user: 'usr_c5a9d', properties: 'amount: €249.00, plan: enterprise', source: 'web' },
    ]

    const eventCols: TableColumn[] = [
      { label: 'Timestamp', key: 'timestamp' },
      { label: 'Evento', key: 'event' },
      { label: 'Usuario', key: 'user' },
      { label: 'Propiedades', key: 'properties' },
      { label: 'Fuente', key: 'source', align: 'center' },
    ]

    const eventContent = `
      <div class="card">
        <div class="card-header"><h3>Event Stream</h3><span class="badge badge-green" style="animation:dotPulse 2s infinite">LIVE</span></div>
        <div style="font-family:'JetBrains Mono',monospace;font-size:0.72rem">
          ${dataTable(eventCols, eventRows)}
        </div>
      </div>
      <div class="grid-2" style="margin-top:1.5rem">
        <div class="card">
          <div class="card-header"><h3>Eventos por Hora</h3></div>
          ${horizontalBarChart([
            { label: '08:00', value: 12400 },
            { label: '10:00', value: 28600 },
            { label: '12:00', value: 34200 },
            { label: '14:00', value: 31800 },
            { label: '16:00', value: 26400 },
            { label: '18:00', value: 18200 },
            { label: '20:00', value: 14800 },
            { label: '22:00', value: 8400 },
          ])}
        </div>
        <div class="card">
          <div class="card-header"><h3>Top Propiedades</h3></div>
          ${progressBar('path: /pricing', 84, 'primary')}
          ${progressBar('method: google_oauth', 72, 'accent')}
          ${progressBar('plan: pro', 61, 'primary')}
          ${progressBar('source: organic', 58, 'accent')}
          ${progressBar('device: mobile', 45, 'primary')}
        </div>
      </div>`

    const eventSection = section('events', 'EVENTOS', 'Event Log en Tiempo Real',
      'Stream de eventos con timestamps, propiedades y fuentes. Monitoriza cada acción.',
      eventContent)

    // ── Cohorts
    const weeks = ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8']
    const cohortData = md?.cohortData || [
      { cohort: 'Mar W1', users: 1200, retention: [100, 68, 52, 41, 35, 30, 27, 24] },
      { cohort: 'Mar W2', users: 1340, retention: [100, 72, 58, 46, 38, 33, 29, null] },
      { cohort: 'Mar W3', users: 980, retention: [100, 65, 48, 38, 31, 28, null, null] },
      { cohort: 'Mar W4', users: 1150, retention: [100, 70, 54, 43, 36, null, null, null] },
      { cohort: 'Abr W1', users: 1420, retention: [100, 74, 59, 48, null, null, null, null] },
      { cohort: 'Abr W2', users: 1080, retention: [100, 71, 55, null, null, null, null, null] },
    ]

    const getCellColor = (val: number | null) => {
      if (val === null) return 'background:transparent;color:var(--text-dim)'
      if (val >= 70) return 'background:rgba(34,197,94,0.25);color:var(--success)'
      if (val >= 50) return 'background:rgba(34,197,94,0.15);color:#4ade80'
      if (val >= 30) return 'background:rgba(245,158,11,0.15);color:var(--warning)'
      return 'background:rgba(239,68,68,0.12);color:var(--danger)'
    }

    const cohortGrid = `
      <div class="card">
        <div class="card-header"><h3>Retención por Cohorte</h3><span class="badge badge-accent">Semanal</span></div>
        <div style="overflow-x:auto">
          <table class="data-tbl" style="font-family:'JetBrains Mono',monospace;font-size:0.72rem">
            <thead>
              <tr>
                <th>Cohorte</th>
                <th style="text-align:right">Usuarios</th>
                ${weeks.map(w => `<th style="text-align:center">${w}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${cohortData.map((row: CohortRow) => `
                <tr>
                  <td style="font-weight:600">${row.cohort}</td>
                  <td style="text-align:right">${row.users.toLocaleString()}</td>
                  ${row.retention.map((val: number | null) => `
                    <td style="text-align:center;${getCellColor(val)};border-radius:4px;font-weight:600">
                      ${val !== null ? val + '%' : '—'}
                    </td>`).join('')}
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>
      <div class="grid-3" style="margin-top:1.5rem">
        <div class="card" style="text-align:center">
          <div style="font-size:0.66rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:0.3rem">Retención Sem 1</div>
          <div style="font-size:1.8rem;font-weight:800;color:var(--success);font-family:'JetBrains Mono',monospace" class="counter" data-target="${md?.retWeek1 || 70}" data-suffix="%">0</div>
        </div>
        <div class="card" style="text-align:center">
          <div style="font-size:0.66rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:0.3rem">Retención Sem 4</div>
          <div style="font-size:1.8rem;font-weight:800;color:var(--warning);font-family:'JetBrains Mono',monospace" class="counter" data-target="${md?.retWeek4 || 43}" data-suffix="%">0</div>
        </div>
        <div class="card" style="text-align:center">
          <div style="font-size:0.66rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:0.3rem">Retención Sem 8</div>
          <div style="font-size:1.8rem;font-weight:800;color:var(--danger);font-family:'JetBrains Mono',monospace" class="counter" data-target="${md?.retWeek8 || 24}" data-suffix="%">0</div>
        </div>
      </div>`

    const cohortSection = section('cohorts', 'COHORTES', 'Análisis de Retención',
      'Grid de retención semanal por cohorte. Visualiza la curva de retención y detecta patrones.',
      cohortGrid)

    // ── Reports
    const reportsList = md?.reports || [
      { name: 'Weekly KPI Summary', type: 'Automático', schedule: 'Lunes 9:00', status: '<span class="badge badge-green">Activo</span>', lastRun: '2026-04-07', recipients: '4 usuarios' },
      { name: 'Funnel Drop-off Analysis', type: 'Bajo demanda', schedule: '—', status: '<span class="badge badge-blue">Manual</span>', lastRun: '2026-04-05', recipients: '2 usuarios' },
      { name: 'Monthly Revenue Report', type: 'Automático', schedule: '1er día del mes', status: '<span class="badge badge-green">Activo</span>', lastRun: '2026-04-01', recipients: '6 usuarios' },
      { name: 'Cohort Retention Trends', type: 'Automático', schedule: 'Viernes 17:00', status: '<span class="badge badge-green">Activo</span>', lastRun: '2026-04-04', recipients: '3 usuarios' },
      { name: 'Anomaly Detection Alert', type: 'Trigger', schedule: 'En tiempo real', status: '<span class="badge badge-purple">Trigger</span>', lastRun: '2026-04-09', recipients: '1 usuario' },
      { name: 'User Segment Comparison', type: 'Bajo demanda', schedule: '—', status: '<span class="badge badge-blue">Manual</span>', lastRun: '2026-03-28', recipients: '2 usuarios' },
    ]

    const reportCols: TableColumn[] = [
      { label: 'Reporte', key: 'name' },
      { label: 'Tipo', key: 'type' },
      { label: 'Programación', key: 'schedule' },
      { label: 'Estado', key: 'status', align: 'center' },
      { label: 'Última Ejecución', key: 'lastRun' },
      { label: 'Destinatarios', key: 'recipients', align: 'center' },
    ]

    const reportContent = `
      <div class="card">
        <div class="card-header"><h3>Reportes Guardados</h3><span class="badge badge-accent">${reportsList.length} reportes</span></div>
        ${dataTable(reportCols, reportsList)}
      </div>
      <div class="grid-2" style="margin-top:1.5rem">
        <div class="card">
          <div class="card-header"><h3>Distribución por Tipo</h3></div>
          ${horizontalBarChart([
            { label: 'Automáticos', value: 3, color: 'var(--success)' },
            { label: 'Manuales', value: 2, color: 'var(--info)' },
            { label: 'Triggers', value: 1, color: '#a855f7' },
          ])}
        </div>
        <div class="card">
          <div class="card-header"><h3>Estadísticas</h3></div>
          ${progressBar('Reportes enviados este mes', 78, 'primary')}
          ${progressBar('Tasa de apertura', 64, 'ok')}
          ${progressBar('Datos procesados (TB)', 42, 'accent')}
        </div>
      </div>`

    const reportSection = section('reports', 'REPORTES', 'Reportes y Exportaciones',
      'Reportes automáticos, bajo demanda y triggers inteligentes para tu equipo.',
      reportContent)

    // ── Settings
    const settingsFields: SettingsField[] = [
      { label: 'Nombre del proyecto', value: c.businessName, type: 'text' },
      { label: 'Zona horaria', value: md?.timezone || 'Europe/Madrid (UTC+2)', type: 'text' },
      { label: 'Email de alertas', value: md?.alertEmail || `alerts@${c.businessName.toLowerCase().replace(/\s/g, '')}.com`, type: 'email' },
      { label: 'Retención de datos (meses)', value: md?.dataRetention || '24', type: 'text' },
      { label: 'Tracking automático', value: '', type: 'toggle', enabled: true },
      { label: 'Alertas de anomalías', value: '', type: 'toggle', enabled: true },
      { label: 'Exportación CSV programada', value: '', type: 'toggle', enabled: false },
      { label: 'IP Anonymization', value: '', type: 'toggle', enabled: true },
    ]

    const settContent = settingsForm(settingsFields)
    const settSection = section('settings', 'CONFIGURACION', 'Ajustes del Proyecto',
      'Zona horaria, retención de datos, tracking y privacidad.',
      settContent)

    // ── Footer
    const footer = `<div class="footer">&copy; 2026 ${c.businessName} — Prototipo generado por <strong style="color:var(--accent)">Kerno Studio</strong></div>`

    // ── Extra CSS overrides for analytics-specific styling
    const analyticsCSS = `
      /* Analytics-specific: JetBrains Mono for data elements */
      @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap');

      .kpi-val, .hero-stat-val, .counter, .data-tbl tbody td {
        font-family: 'JetBrains Mono', monospace !important;
      }
      .data-tbl {
        font-family: 'JetBrains Mono', monospace;
      }
      .bar-fill {
        transition: width 1.2s cubic-bezier(0.22,1,0.36,1);
      }
      /* Subtle scanline effect for data-dense feel */
      body::after {
        content: '';
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: repeating-linear-gradient(
          0deg, transparent, transparent 2px,
          rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px
        );
        pointer-events: none; z-index: 9999;
      }
    `

    // ── Assemble
    return `<!DOCTYPE html>
<html lang="${c.locale || 'es'}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${c.businessName} — Analytics Demo</title>
<style>${designSystemCSS(c.primaryColor || '#6366f1', c.accentColor || '#06b6d4', c.theme || 'neon')}${analyticsCSS}</style>
</head>
<body>
${nav}
${notificationContainer()}
${hero}
${dashSection}
${funnelSection}
${segSection}
${eventSection}
${cohortSection}
${reportSection}
${settSection}
${footer}
<script>${allScripts()}</script>
</body>
</html>`
  },
}

interface FunnelStep {
  label: string
  value: number
  users: number
}

interface CohortRow {
  cohort: string
  users: number
  retention: (number | null)[]
}

interface AnalyticsMockData {
  heroTagline?: string
  heroSubtitle?: string
  totalEvents?: number
  activeUsers?: number
  conversionRate?: string
  mrr?: number
  eventsToday?: number
  uniqueUsers?: number
  conversion?: number
  revenue?: number
  eventsByType?: BarChartItem[]
  alert1?: string
  alert2?: string
  alert3?: string
  alert4?: string
  alertCount?: number
  funnelSteps?: FunnelStep[]
  overallConversion?: string
  avgTimeToConvert?: string
  topChannel?: string
  funnelImprovement?: string
  segments?: Record<string, string>[]
  events?: Record<string, string>[]
  cohortData?: CohortRow[]
  retWeek1?: number
  retWeek4?: number
  retWeek8?: number
  reports?: Record<string, string>[]
  timezone?: string
  alertEmail?: string
  dataRetention?: string
}
