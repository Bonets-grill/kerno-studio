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

export const saasTemplate: TemplateDefinition = {
  meta: {
    id: 'saas',
    name: 'SaaS / Plataforma Digital',
    industries: ['saas', 'software', 'app', 'aplicación', 'plataforma', 'startup', 'fintech', 'edtech', 'healthtech', 'marketplace', 'erp', 'crm'],
    projectTypes: ['mvp', 'system', 'saas'],
    sections: ['hero', 'dashboard', 'users', 'features', 'api', 'analytics', 'billing', 'onboarding', 'settings'],
    description: 'Plantilla premium para SaaS, apps y plataformas digitales. Dashboard con MRR/churn/usuarios, gestión de usuarios, feature flags, uso de API, analytics de conversión, billing y onboarding.',
  },

  render(c: TemplateCustomization): string {
    const md = c.mockData as SaaSMockData

    // ── Nav
    const nav = navBar(c.businessName, [
      { id: 'hero', label: 'Inicio' },
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'users', label: 'Usuarios' },
      { id: 'features', label: 'Módulos' },
      { id: 'api', label: 'API' },
      { id: 'analytics', label: 'Analytics' },
      { id: 'billing', label: 'Billing' },
      { id: 'onboarding', label: 'Onboarding' },
      { id: 'settings', label: 'Config' },
    ])

    // ── Hero
    const hero = heroSection(
      c.businessName,
      md?.heroTagline || c.businessName,
      md?.heroSubtitle || 'Plataforma inteligente que automatiza, escala y transforma tu negocio.',
      [
        { value: md?.totalUsers || 2400, label: 'Usuarios' },
        { value: md?.mrr || 18500, label: 'MRR', prefix: '€' },
        { value: md?.uptime || '99.9%', label: 'Uptime' },
        { value: md?.nps || 72, label: 'NPS Score' },
      ],
      `Demo Interactivo — ${c.businessType || 'SaaS'}`
    )

    // ── Dashboard
    const dashKpis: KpiData[] = [
      { icon: '💰', label: 'MRR', value: md?.mrr || 18500, prefix: '€', trend: { value: '+8.3%', direction: 'up' } },
      { icon: '👥', label: 'Usuarios Activos', value: md?.dau || 1847, trend: { value: '+12%', direction: 'up' } },
      { icon: '📉', label: 'Churn Rate', value: md?.churn || 2.1, decimals: 1, suffix: '%', trend: { value: '-0.3%', direction: 'down' } },
      { icon: '💳', label: 'ARPU', value: md?.arpu || 24.50, prefix: '€', decimals: 2, trend: { value: '+€1.20', direction: 'up' } },
    ]

    const signupsBySource: BarChartItem[] = md?.signupsBySource || [
      { label: 'Orgánico / SEO', value: 420, color: 'var(--primary-light)' },
      { label: 'Google Ads', value: 280, color: 'var(--accent)' },
      { label: 'Referral', value: 190, color: 'var(--primary-light)' },
      { label: 'Social Media', value: 140, color: 'var(--accent)' },
      { label: 'Directo', value: 95, color: 'var(--primary-light)' },
    ]

    const dashAlerts = [
      alertRow('🚀', md?.alert1 || '142 signups hoy — récord mensual', 'Récord', 'badge-green'),
      alertRow('⚠️', md?.alert2 || '3 usuarios enterprise con trial expirando mañana', 'Urgente', 'badge-red'),
      alertRow('📊', md?.alert3 || 'Feature "AI Assistant" tiene 89% de adoption rate', '89%', 'badge-blue'),
      alertRow('💳', md?.alert4 || '5 pagos fallidos pendientes de retry', 'Retry', 'badge-yellow'),
    ]

    const dashContent = `
      ${kpiGrid(dashKpis)}
      <div class="grid-2" style="margin-top:1.5rem">
        <div class="card">
          <div class="card-header"><h3>Signups por Canal</h3><span class="badge badge-accent">Último mes</span></div>
          ${horizontalBarChart(signupsBySource)}
        </div>
        <div class="card">
          <div class="card-header"><h3>Alertas</h3><span class="badge badge-primary">${md?.alertCount || 4} activas</span></div>
          ${dashAlerts.join('')}
        </div>
      </div>`

    const dashSection = section('dashboard', 'SAAS METRICS', 'Panel de Control',
      'Métricas clave de tu plataforma en tiempo real.',
      dashContent)

    // ── Users
    const userCols: TableColumn[] = [
      { label: 'Usuario', key: 'user' },
      { label: 'Plan', key: 'plan' },
      { label: 'MRR', key: 'mrr', align: 'right' },
      { label: 'Último acceso', key: 'lastLogin' },
      { label: 'Estado', key: 'status' },
      { label: 'Health', key: 'health' },
    ]
    const userRows = md?.users || [
      { user: 'TechCorp S.L.', plan: '<span class="badge badge-purple">Enterprise</span>', mrr: '€890', lastLogin: 'Hace 1h', status: '<span class="badge badge-green">Activo</span>', health: '🟢 98' },
      { user: 'DesignHub', plan: '<span class="badge badge-blue">Pro</span>', mrr: '€49', lastLogin: 'Hace 3h', status: '<span class="badge badge-green">Activo</span>', health: '🟢 92' },
      { user: 'StartupXYZ', plan: '<span class="badge badge-blue">Pro</span>', mrr: '€49', lastLogin: 'Hoy', status: '<span class="badge badge-green">Activo</span>', health: '🟡 74' },
      { user: 'María García', plan: '<span class="badge badge-primary">Starter</span>', mrr: '€19', lastLogin: 'Ayer', status: '<span class="badge badge-green">Activo</span>', health: '🟢 85' },
      { user: 'DataFlow Inc.', plan: '<span class="badge badge-purple">Enterprise</span>', mrr: '€890', lastLogin: 'Hace 2 días', status: '<span class="badge badge-yellow">En riesgo</span>', health: '🔴 35' },
      { user: 'Carlos López', plan: '<span class="badge badge-primary">Starter</span>', mrr: '€19', lastLogin: 'Hace 5 días', status: '<span class="badge badge-yellow">En riesgo</span>', health: '🔴 28' },
      { user: 'AppWorks', plan: '<span class="badge badge-blue">Pro</span>', mrr: '€49', lastLogin: 'Hace 1h', status: '<span class="badge badge-green">Activo</span>', health: '🟢 95' },
    ]

    const userKpis: KpiData[] = [
      { icon: '👥', label: 'Total Usuarios', value: md?.totalUsers || 2400 },
      { icon: '🟢', label: 'Activos (30d)', value: md?.activeUsers30d || 1847 },
      { icon: '⚠️', label: 'En Riesgo', value: md?.atRisk || 43 },
      { icon: '📈', label: 'Nuevos (7d)', value: md?.newUsers7d || 89 },
    ]

    const usersContent = `
      ${kpiGrid(userKpis)}
      <div class="card" style="margin-top:1rem">${dataTable(userCols, userRows)}</div>`

    const usersSection = section('users', 'USUARIOS', 'Gestión de Usuarios',
      'Seguimiento de usuarios, health scores y riesgo de churn.',
      usersContent)

    // ── Features/Modules
    const modules = c.modules.length > 0 ? c.modules : [
      { name: 'Dashboard Analytics', description: 'KPIs y métricas en tiempo real', icon: '📊', status: 'active' as const },
      { name: 'User Management', description: 'Roles, permisos y equipos', icon: '👥', status: 'active' as const },
      { name: 'API REST', description: 'Endpoints para integraciones', icon: '🔗', status: 'active' as const },
      { name: 'AI Assistant', description: 'Asistente inteligente integrado', icon: '🤖', status: 'active' as const },
      { name: 'Webhooks', description: 'Eventos en tiempo real', icon: '⚡', status: 'active' as const },
      { name: 'White Label', description: 'Personalización de marca', icon: '🎨', status: 'coming_soon' as const },
    ]

    const featureCards = modules.map(m => `
      <div class="card" style="padding:1.2rem">
        <div style="font-size:1.6rem;margin-bottom:0.5rem">${m.icon}</div>
        <h4 style="font-size:0.9rem;font-weight:700;margin-bottom:0.3rem">${m.name}</h4>
        <p style="font-size:0.78rem;color:var(--text-muted);line-height:1.5">${m.description}</p>
        <div style="margin-top:0.6rem;display:flex;align-items:center;gap:6px">
          <span class="badge ${m.status === 'active' ? 'badge-green' : 'badge-yellow'}">${m.status === 'active' ? 'Activo' : 'Próximamente'}</span>
          ${m.status === 'active' ? `<span style="font-size:0.62rem;color:var(--text-dim)">v2.1</span>` : ''}
        </div>
      </div>`).join('')

    const featContent = `<div class="grid-3">${featureCards}</div>`
    const featSection = section('features', 'MÓDULOS', 'Funcionalidades',
      `Todos los módulos de ${c.businessName}.`,
      featContent)

    // ── API section
    const apiEndpoints: Record<string, string>[] = md?.apiEndpoints || [
      { method: '<span class="badge badge-green">GET</span>', endpoint: '/api/v2/users', calls: '12,340', latency: '45ms', status: '<span class="badge badge-green">OK</span>' },
      { method: '<span class="badge badge-blue">POST</span>', endpoint: '/api/v2/users', calls: '3,210', latency: '120ms', status: '<span class="badge badge-green">OK</span>' },
      { method: '<span class="badge badge-green">GET</span>', endpoint: '/api/v2/analytics', calls: '8,920', latency: '89ms', status: '<span class="badge badge-green">OK</span>' },
      { method: '<span class="badge badge-yellow">PUT</span>', endpoint: '/api/v2/settings', calls: '1,450', latency: '67ms', status: '<span class="badge badge-green">OK</span>' },
      { method: '<span class="badge badge-red">DELETE</span>', endpoint: '/api/v2/users/:id', calls: '230', latency: '55ms', status: '<span class="badge badge-green">OK</span>' },
      { method: '<span class="badge badge-blue">POST</span>', endpoint: '/api/v2/webhooks', calls: '5,670', latency: '34ms', status: '<span class="badge badge-yellow">Degraded</span>' },
    ]

    const apiContent = `
      <div class="grid-2" style="margin-bottom:1.5rem">
        ${kpiGrid([
          { icon: '🔗', label: 'API Calls/Día', value: md?.apiCallsDay || 34200 },
          { icon: '⚡', label: 'Latencia P95', value: md?.p95Latency || '89ms' },
          { icon: '✅', label: 'Success Rate', value: md?.successRate || 99.7, suffix: '%', decimals: 1 },
          { icon: '🔑', label: 'API Keys Activas', value: md?.activeKeys || 156 },
        ])}
      </div>
      <div class="card">${dataTable(
        [
          { label: 'Método', key: 'method' },
          { label: 'Endpoint', key: 'endpoint' },
          { label: 'Calls (24h)', key: 'calls', align: 'right' },
          { label: 'Latencia', key: 'latency', align: 'right' },
          { label: 'Estado', key: 'status' },
        ],
        apiEndpoints
      )}</div>`

    const apiSection = section('api', 'API', 'API & Integraciones',
      'Monitorización de endpoints, uso y rendimiento de la API.',
      apiContent)

    // ── Analytics
    const conversionFunnel: BarChartItem[] = md?.conversionFunnel || [
      { label: 'Visitantes', value: 12400, color: 'var(--text-muted)' },
      { label: 'Signups', value: 1240, color: 'var(--info)' },
      { label: 'Activados', value: 820, color: 'var(--primary-light)' },
      { label: 'Trial → Paid', value: 380, color: 'var(--accent)' },
      { label: 'Retained (M3)', value: 310, color: 'var(--success)' },
    ]

    const analyticsContent = `
      <div class="grid-2">
        <div class="card">
          <div class="card-header"><h3>Funnel de Conversión</h3></div>
          ${horizontalBarChart(conversionFunnel, 12400)}
        </div>
        <div class="card">
          <div class="card-header"><h3>Métricas de Producto</h3></div>
          ${progressBar('Activation Rate', md?.activationRate || 66, 'primary')}
          ${progressBar('Feature Adoption', md?.featureAdoption || 78, 'ok')}
          ${progressBar('DAU/MAU Ratio', md?.dauMauRatio || 42, 'accent')}
          ${progressBar('Customer Satisfaction', md?.csat || 88, 'ok')}
        </div>
      </div>
      <div style="margin-top:1.5rem">
        ${bigResult(
          md?.arrValue || '€222,000',
          md?.arrLabel || 'ARR Proyectado',
          [
            { title: md?.ltv || '€580', subtitle: 'LTV medio' },
            { title: md?.cac || '€45', subtitle: 'CAC' },
            { title: md?.ltvCacRatio || '12.9x', subtitle: 'LTV/CAC' },
          ]
        )}
      </div>`

    const anaSection = section('analytics', 'ANALYTICS', 'Métricas de Producto',
      'Funnel de conversión, adoption y métricas SaaS clave.',
      analyticsContent)

    // ── Billing
    const planBreakdown: BarChartItem[] = md?.planBreakdown || [
      { label: 'Enterprise (€890)', value: 12, color: 'var(--accent)' },
      { label: 'Pro (€49)', value: 340, color: 'var(--primary-light)' },
      { label: 'Starter (€19)', value: 890, color: 'var(--info)' },
      { label: 'Free', value: 1158, color: 'var(--text-muted)' },
    ]

    const billingContent = `
      <div class="grid-2" style="margin-bottom:1.5rem">
        ${kpiGrid([
          { icon: '💰', label: 'MRR', value: md?.mrr || 18500, prefix: '€' },
          { icon: '📈', label: 'Net Revenue Retention', value: md?.nrr || 112, suffix: '%' },
          { icon: '💳', label: 'Pagos Exitosos', value: md?.successfulPayments || '99.2%' },
          { icon: '🔄', label: 'Upgrades (30d)', value: md?.upgrades || 28 },
        ])}
      </div>
      <div class="grid-2">
        <div class="card">
          <div class="card-header"><h3>Distribución por Plan</h3></div>
          ${horizontalBarChart(planBreakdown)}
        </div>
        <div class="card">
          <div class="card-header"><h3>Revenue Breakdown</h3></div>
          ${progressBar('Enterprise', md?.enterprisePct || 58, 'accent')}
          ${progressBar('Pro', md?.proPct || 30, 'primary')}
          ${progressBar('Starter', md?.starterPct || 12, 'ok')}
        </div>
      </div>`

    const billSection = section('billing', 'BILLING', 'Facturación y Planes',
      'Distribución de planes, MRR y métricas de revenue.',
      billingContent)

    // ── Onboarding
    const onboardingSteps: StepData[] = md?.onboardingSteps || [
      { title: 'Registro', description: 'Usuario crea cuenta con email o Google SSO.', detail: 'Tiempo medio: 45 segundos. Tasa: 92% completado.', icon: '📝' },
      { title: 'Setup inicial', description: 'Wizard guiado para configurar workspace y preferencias.', icon: '⚙️' },
      { title: 'Primera acción clave', description: 'El usuario realiza la acción de valor principal (crear, conectar, importar).', detail: 'Aha moment: usuarios que completan este paso retienen 3.2x más.', icon: '🎯' },
      { title: 'Invitar equipo', description: 'El admin invita a compañeros para uso colaborativo.', icon: '👥' },
      { title: 'Integrar herramientas', description: 'Conexión con APIs y servicios externos (Slack, CRM, etc).', icon: '🔗' },
      { title: 'Upgrade a plan de pago', description: 'Conversión a plan Pro o Enterprise tras validar valor.', icon: '💎' },
    ]

    const waMessages: WAChatMessage[] = md?.waMessages || [
      { from: 'client', text: `Hola, tengo problemas para conectar la API`, time: '14:22' },
      { from: 'bot', text: `¡Hola! Soy el soporte de ${c.businessName} 🤖 Voy a ayudarte. ¿Qué error ves exactamente?`, time: '14:22' },
      { from: 'client', text: 'Error 401 cuando hago el POST a /api/v2/users', time: '14:23' },
      { from: 'bot', text: '🔑 Error 401 = problema de autenticación. Verifica:\n\n1. API key en el header Authorization\n2. Formato: Bearer YOUR_API_KEY\n3. Que la key tenga permisos de escritura\n\n¿Quieres que regenere tu API key?', time: '14:23' },
      { from: 'client', text: 'Ahh era el Bearer, no lo tenía. Funciona! Gracias!', time: '14:24' },
      { from: 'bot', text: '¡Perfecto! 🎉 Si necesitas más ayuda, aquí estoy 24/7. También puedes consultar nuestra documentación online.', time: '14:24' },
    ]

    const onboardingContent = `
      <div class="grid-2" style="align-items:start">
        <div>
          <h3 style="font-size:0.9rem;font-weight:700;margin-bottom:1rem">Flujo de Onboarding</h3>
          ${stepProcess(onboardingSteps)}
        </div>
        <div>
          <h3 style="font-size:0.9rem;font-weight:700;margin-bottom:1rem">Soporte IA</h3>
          ${whatsappChat('wa-support', c.businessName + ' Support', '🤖', waMessages)}
          <div style="margin-top:1.5rem">
            ${kpiGrid([
              { icon: '⏱️', label: 'Time to Value', value: md?.timeToValue || '4.2 min' },
              { icon: '✅', label: 'Completion Rate', value: md?.completionRate || 78, suffix: '%' },
            ])}
          </div>
        </div>
      </div>`

    const onbSection = section('onboarding', 'ONBOARDING', 'Experiencia de Usuario',
      'Flujo optimizado para activar usuarios y soporte IA.',
      onboardingContent)

    // ── Settings
    const settingsFields: SettingsField[] = [
      { label: 'Nombre de la plataforma', value: c.businessName, type: 'text' },
      { label: 'Dominio personalizado', value: md?.domain || `app.${c.businessName.toLowerCase().replace(/\s/g, '')}.com`, type: 'text' },
      { label: 'Email de soporte', value: md?.supportEmail || `support@${c.businessName.toLowerCase().replace(/\s/g, '')}.com`, type: 'email' },
      { label: 'SSO / Google Auth', value: '', type: 'toggle', enabled: true },
      { label: 'Webhooks activos', value: '', type: 'toggle', enabled: true },
      { label: 'Rate limiting API', value: '', type: 'toggle', enabled: true },
      { label: 'Modo mantenimiento', value: '', type: 'toggle', enabled: false },
    ]

    const settContent = settingsForm(settingsFields)
    const settSection = section('settings', 'CONFIGURACIÓN', 'Ajustes de la Plataforma',
      'Dominio, autenticación, API y configuración general.',
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
<style>${designSystemCSS(c.primaryColor, c.accentColor, c.theme || 'neon')}</style>
</head>
<body>
${nav}
${notificationContainer()}
${hero}
${dashSection}
${usersSection}
${featSection}
${apiSection}
${anaSection}
${billSection}
${onbSection}
${settSection}
${footer}
<script>${allScripts()}</script>
</body>
</html>`
  },
}

interface SaaSMockData {
  heroTagline?: string
  heroSubtitle?: string
  totalUsers?: number
  mrr?: number
  uptime?: string
  nps?: number
  dau?: number
  churn?: number
  arpu?: number
  signupsBySource?: BarChartItem[]
  alert1?: string
  alert2?: string
  alert3?: string
  alert4?: string
  alertCount?: number
  users?: Record<string, string>[]
  activeUsers30d?: number
  atRisk?: number
  newUsers7d?: number
  apiEndpoints?: Record<string, string>[]
  apiCallsDay?: number
  p95Latency?: string
  successRate?: number
  activeKeys?: number
  conversionFunnel?: BarChartItem[]
  activationRate?: number
  featureAdoption?: number
  dauMauRatio?: number
  csat?: number
  arrValue?: string
  arrLabel?: string
  ltv?: string
  cac?: string
  ltvCacRatio?: string
  planBreakdown?: BarChartItem[]
  nrr?: number
  successfulPayments?: string
  upgrades?: number
  enterprisePct?: number
  proPct?: number
  starterPct?: number
  onboardingSteps?: StepData[]
  waMessages?: WAChatMessage[]
  timeToValue?: string
  completionRate?: number
  domain?: string
  supportEmail?: string
}
