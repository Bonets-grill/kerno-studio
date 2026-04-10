import type { TemplateDefinition, TemplateCustomization } from '../types'
import { designSystemCSS } from '../shared/design-system'
import { allScripts } from '../shared/scripts'
import {
  navBar, heroSection, notificationContainer, section,
  kpiGrid, dataTable, progressBar, horizontalBarChart,
  stepProcess, settingsForm, alertRow, bigResult,
  type KpiData, type TableColumn,
  type StepData, type SettingsField, type BarChartItem,
} from '../shared/components'

export const realestateTemplate: TemplateDefinition = {
  meta: {
    id: 'realestate',
    name: 'Inmobiliaria Premium',
    industries: ['inmobiliaria', 'real estate', 'propiedades', 'properties', 'vivienda', 'housing', 'agencia inmobiliaria', 'pisos', 'apartments'],
    projectTypes: ['landing', 'mvp', 'system', 'saas'],
    sections: ['hero', 'dashboard', 'properties', 'leads', 'viewings', 'valuations', 'analytics', 'settings'],
    description: 'Plantilla premium para agencias inmobiliarias. Dashboard de propiedades y leads, cartera de inmuebles, gestión de visitas, valoraciones comparativas, analytics de mercado y configuración.',
  },

  render(c: TemplateCustomization): string {
    const md = c.mockData as RealestateMockData

    // ── Override CSS for elegant luxury feel
    const overrideCSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
body { font-family: 'Inter', sans-serif !important; }
.s-title, .hero-h1, .hero-logo { font-family: 'Cormorant Garamond', serif !important; text-transform: none; letter-spacing: -0.5px; font-weight: 600; }
.hero-h1 { font-weight: 300 !important; font-style: italic; }
.nav-brand { font-family: 'Cormorant Garamond', serif !important; font-size: 1.2rem !important; letter-spacing: 2px !important; font-weight: 600; }
.nav-link { font-family: 'Inter', sans-serif !important; font-weight: 500; font-size: 0.7rem !important; letter-spacing: 0.5px; }
.nav { border-bottom: 1px solid rgba(212,175,55,0.2) !important; }
.nav-link.active { border-bottom: 2px solid var(--accent); background: none !important; color: var(--accent) !important; border-radius: 0; }
:root { --bg: #0c0b0e !important; --bg-elevated: #12111a !important; --bg-card: #16141e !important; --bg-card-hover: #1c1a26 !important; }
.card { border: 1px solid rgba(212,175,55,0.08) !important; border-radius: 16px !important; }
.card:hover { border-color: rgba(212,175,55,0.2) !important; }
.kpi { border-left: 2px solid var(--accent) !important; border: 1px solid rgba(212,175,55,0.08); }
.badge { border-radius: 4px; }
.s-label { font-family: 'Inter', sans-serif; font-weight: 600; letter-spacing: 4px; }

.prop-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.2rem; }
.prop-card { background: var(--bg-card); border: 1px solid rgba(212,175,55,0.08); border-radius: 16px; overflow: hidden; transition: all 0.4s; cursor: pointer; }
.prop-card:hover { transform: translateY(-4px); border-color: rgba(212,175,55,0.25); box-shadow: 0 12px 40px rgba(0,0,0,0.4); }
.prop-img { height: 180px; background: linear-gradient(135deg, rgba(212,175,55,0.15), rgba(100,80,160,0.1)); display: flex; align-items: center; justify-content: center; font-size: 3rem; position: relative; }
.prop-img .prop-badge { position: absolute; top: 10px; right: 10px; padding: 4px 12px; border-radius: 4px; font-size: 0.62rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
.prop-img .prop-badge.new { background: rgba(34,197,94,0.9); color: #fff; }
.prop-img .prop-badge.exclusive { background: rgba(212,175,55,0.9); color: #000; }
.prop-img .prop-badge.reduced { background: rgba(239,68,68,0.9); color: #fff; }
.prop-info { padding: 1rem 1.2rem; }
.prop-price { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; font-weight: 700; color: var(--accent); }
.prop-address { font-size: 0.82rem; color: var(--text); margin: 4px 0; font-weight: 500; }
.prop-location { font-size: 0.72rem; color: var(--text-muted); margin-bottom: 8px; }
.prop-details { display: flex; gap: 14px; padding-top: 8px; border-top: 1px solid var(--border); }
.prop-detail { display: flex; align-items: center; gap: 4px; font-size: 0.72rem; color: var(--text-muted); }
.prop-detail span { font-weight: 600; color: var(--text); }

.val-card { background: var(--bg-card); border: 1px solid rgba(212,175,55,0.08); border-radius: 16px; padding: 1.5rem; }
.val-card:hover { border-color: rgba(212,175,55,0.2); }
.val-title { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; font-weight: 600; margin-bottom: 4px; }
.val-address { font-size: 0.78rem; color: var(--text-muted); margin-bottom: 12px; }
.val-price { font-family: 'Cormorant Garamond', serif; font-size: 2rem; font-weight: 700; color: var(--accent); }
.val-per-m2 { font-size: 0.78rem; color: var(--text-muted); }
.val-comp { margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--border); }
.val-comp-row { display: flex; justify-content: space-between; padding: 4px 0; font-size: 0.78rem; }
.val-comp-row .label { color: var(--text-muted); }
.val-comp-row .value { font-weight: 600; }

@media (max-width: 1024px) { .prop-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 768px) { .prop-grid { grid-template-columns: 1fr; } }
`

    // ── Nav
    const nav = navBar(c.businessName, [
      { id: 'hero', label: 'Inicio' },
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'properties', label: 'Propiedades' },
      { id: 'leads', label: 'Leads' },
      { id: 'viewings', label: 'Visitas' },
      { id: 'valuations', label: 'Valoraciones' },
      { id: 'analytics', label: 'Analytics' },
      { id: 'settings', label: 'Config' },
    ])

    // ── Hero
    const hero = heroSection(
      c.businessName,
      md?.heroTagline || 'El arte de encontrar tu hogar perfecto',
      md?.heroSubtitle || 'Gestión integral de propiedades, leads cualificados, visitas programadas y análisis de mercado en tiempo real.',
      [
        { value: md?.totalListings || 147, label: 'Propiedades Activas' },
        { value: md?.monthlyRevenue || 125000, label: 'Comisiones/Mes', prefix: '€' },
        { value: md?.conversionRate || '12.4%', label: 'Conversión' },
        { value: md?.avgDaysOnMarket || 34, label: 'Días en Mercado' },
      ],
      `Demo Interactivo — ${c.businessType || 'Inmobiliaria'}`
    )

    // ── Dashboard
    const dashKpis: KpiData[] = [
      { icon: '🏠', label: 'Propiedades Activas', value: md?.totalListings || 147, trend: { value: '+8 esta semana', direction: 'up' } },
      { icon: '👀', label: 'Visitas al Portal', value: md?.portalViews || 12480, trend: { value: '+18%', direction: 'up' } },
      { icon: '📩', label: 'Leads Nuevos', value: md?.newLeads || 67, trend: { value: '+12 vs semana pasada', direction: 'up' } },
      { icon: '💰', label: 'Ventas Cerradas', value: md?.salesClosed || 8, trend: { value: '€2.1M volumen', direction: 'up' } },
    ]

    const propertyTypes: BarChartItem[] = md?.propertyTypes || [
      { label: 'Pisos', value: 68, color: 'var(--accent)' },
      { label: 'Chalets', value: 32, color: 'var(--primary-light)' },
      { label: 'Áticos', value: 18, color: 'var(--accent)' },
      { label: 'Locales', value: 15, color: 'var(--primary-light)' },
      { label: 'Oficinas', value: 9, color: 'var(--accent)' },
      { label: 'Terrenos', value: 5, color: 'var(--primary-light)' },
    ]

    const dashAlerts = [
      alertRow('🔑', md?.alert1 || 'Piso C/ Gran Vía 45 — oferta aceptada, pendiente escritura', 'Venta', 'badge-green'),
      alertRow('📞', md?.alert2 || '3 leads sin contactar desde hace +48h', 'Urgente', 'badge-red'),
      alertRow('📸', md?.alert3 || 'Reportaje fotográfico pendiente: Chalet Pozuelo', 'Fotos', 'badge-yellow'),
      alertRow('💎', md?.alert4 || 'Nuevo ático exclusivo captado en Salamanca', 'Exclusiva', 'badge-purple'),
    ]

    const dashContent = `
      ${kpiGrid(dashKpis)}
      <div class="grid-2" style="margin-top:1.5rem">
        <div class="card">
          <div class="card-header"><h3>Cartera por Tipo</h3><span class="badge badge-accent">Activas</span></div>
          ${horizontalBarChart(propertyTypes)}
        </div>
        <div class="card">
          <div class="card-header"><h3>Alertas</h3><span class="badge badge-primary">${md?.alertCount || 4} activas</span></div>
          ${dashAlerts.join('')}
        </div>
      </div>`

    const dashSection = section('dashboard', c.businessType?.toUpperCase() || 'INMOBILIARIA', 'Panel de Control',
      'Vista general del negocio inmobiliario en tiempo real.',
      dashContent)

    // ── Properties
    const properties = md?.properties || [
      { emoji: '🏢', price: '€485.000', address: 'Piso en C/ Serrano 78, 4o A', location: 'Salamanca, Madrid', beds: '3', baths: '2', m2: '120', badge: 'exclusive', badgeLabel: 'Exclusiva' },
      { emoji: '🏡', price: '€790.000', address: 'Chalet adosado en Pozuelo', location: 'Pozuelo de Alarcón, Madrid', beds: '5', baths: '3', m2: '280', badge: 'new', badgeLabel: 'Nuevo' },
      { emoji: '🌇', price: '€650.000', address: 'Ático con terraza en Chamberí', location: 'Chamberí, Madrid', beds: '2', baths: '2', m2: '95', badge: 'exclusive', badgeLabel: 'Exclusiva' },
      { emoji: '🏠', price: '€320.000', address: 'Piso reformado en Prosperidad', location: 'Chamartín, Madrid', beds: '3', baths: '1', m2: '85', badge: 'reduced', badgeLabel: '-15%' },
      { emoji: '🏢', price: '€175.000', address: 'Estudio en Malasaña', location: 'Centro, Madrid', beds: '1', baths: '1', m2: '42', badge: 'new', badgeLabel: 'Nuevo' },
      { emoji: '🏡', price: '€425.000', address: 'Casa unifamiliar en Las Rozas', location: 'Las Rozas, Madrid', beds: '4', baths: '2', m2: '210', badge: '', badgeLabel: '' },
    ]

    const propCards = properties.map((p: Record<string, string>) => `
      <div class="prop-card">
        <div class="prop-img">
          ${p.emoji}
          ${p.badge ? `<div class="prop-badge ${p.badge}">${p.badgeLabel}</div>` : ''}
        </div>
        <div class="prop-info">
          <div class="prop-price">${p.price}</div>
          <div class="prop-address">${p.address}</div>
          <div class="prop-location">📍 ${p.location}</div>
          <div class="prop-details">
            <div class="prop-detail">🛏️ <span>${p.beds}</span> hab.</div>
            <div class="prop-detail">🚿 <span>${p.baths}</span> baños</div>
            <div class="prop-detail">📐 <span>${p.m2}</span> m²</div>
          </div>
        </div>
      </div>
    `).join('')

    const propContent = `
      <div class="prop-grid">${propCards}</div>
      <div style="margin-top:1.5rem">
        ${kpiGrid([
          { icon: '🏠', label: 'Total Cartera', value: md?.totalListings || 147 },
          { icon: '💰', label: 'Valor Cartera', value: md?.portfolioValue || '€48.2M' },
          { icon: '📊', label: 'Precio Medio', value: md?.avgPrice || '€328K' },
          { icon: '📈', label: 'Nuevas/Semana', value: md?.newListingsWeek || 12 },
        ])}
      </div>`

    const propSection = section('properties', 'CARTERA', 'Propiedades en Cartera',
      'Gestión completa de tu portfolio de propiedades en venta y alquiler.',
      propContent)

    // ── Leads
    const leadCols: TableColumn[] = [
      { label: 'Contacto', key: 'name' },
      { label: 'Teléfono', key: 'phone' },
      { label: 'Interés', key: 'interest' },
      { label: 'Presupuesto', key: 'budget' },
      { label: 'Nivel', key: 'level' },
      { label: 'Origen', key: 'source' },
      { label: 'Último Contacto', key: 'lastContact' },
    ]
    const leadRows = md?.leads || [
      { name: 'Elena Martínez', phone: '+34 612 345 678', interest: 'Piso 3 hab. Salamanca', budget: '€400K-500K', level: '<span class="badge badge-green">Caliente</span>', source: 'Idealista', lastContact: 'Hoy' },
      { name: 'Roberto García', phone: '+34 698 765 432', interest: 'Chalet Pozuelo', budget: '€700K-900K', level: '<span class="badge badge-green">Caliente</span>', source: 'Referido', lastContact: 'Ayer' },
      { name: 'Carmen López', phone: '+34 655 123 456', interest: 'Ático Chamberí', budget: '€500K-700K', level: '<span class="badge badge-yellow">Tibio</span>', source: 'Web', lastContact: 'Hace 2 días' },
      { name: 'Antonio Ruiz', phone: '+34 622 987 654', interest: 'Estudio Centro', budget: '€150K-200K', level: '<span class="badge badge-yellow">Tibio</span>', source: 'Fotocasa', lastContact: 'Hace 3 días' },
      { name: 'Isabel Torres', phone: '+34 677 456 789', interest: 'Piso Chamartín', budget: '€300K-400K', level: '<span class="badge badge-red">Frío</span>', source: 'Idealista', lastContact: 'Hace 5 días' },
      { name: 'Francisco Díaz', phone: '+34 644 321 098', interest: 'Casa Las Rozas', budget: '€400K-500K', level: '<span class="badge badge-green">Caliente</span>', source: 'Referido', lastContact: 'Hoy' },
      { name: 'Lucía Navarro', phone: '+34 633 789 012', interest: 'Cualquier zona Madrid', budget: '€250K-350K', level: '<span class="badge badge-yellow">Tibio</span>', source: 'Web', lastContact: 'Hace 4 días' },
    ]

    const leadsBySource: BarChartItem[] = md?.leadsBySource || [
      { label: 'Idealista', value: 34, color: 'var(--accent)' },
      { label: 'Web propia', value: 18, color: 'var(--primary-light)' },
      { label: 'Referidos', value: 15, color: 'var(--accent)' },
      { label: 'Fotocasa', value: 12, color: 'var(--primary-light)' },
      { label: 'Redes sociales', value: 8, color: 'var(--accent)' },
    ]

    const leadsContent = `
      <div class="card" style="margin-bottom:1.5rem">
        <div class="card-header"><h3>Pipeline de Leads</h3><span class="badge badge-accent">${md?.totalLeads || 67} activos</span></div>
        ${dataTable(leadCols, leadRows)}
      </div>
      <div class="grid-2">
        <div class="card">
          <div class="card-header"><h3>Leads por Origen</h3></div>
          ${horizontalBarChart(leadsBySource)}
        </div>
        <div class="card">
          <div class="card-header"><h3>Embudo de Ventas</h3></div>
          ${progressBar('Leads captados (67)', 100, 'accent')}
          ${progressBar('Contactados (52)', 78, 'primary')}
          ${progressBar('Visita realizada (28)', 42, 'primary')}
          ${progressBar('Oferta presentada (12)', 18, 'ok')}
          ${progressBar('Venta cerrada (8)', 12, 'ok')}
        </div>
      </div>`

    const leadsSection = section('leads', 'LEADS', 'Gestión de Leads',
      'Pipeline completo de contactos interesados con seguimiento automatizado.',
      leadsContent)

    // ── Viewings
    const viewingCols: TableColumn[] = [
      { label: 'Fecha', key: 'date' },
      { label: 'Hora', key: 'time' },
      { label: 'Propiedad', key: 'property' },
      { label: 'Cliente', key: 'client' },
      { label: 'Agente', key: 'agent' },
      { label: 'Estado', key: 'status' },
    ]
    const viewingRows = md?.viewings || [
      { date: '09/04/2026', time: '10:00', property: 'Piso Serrano 78', client: 'Elena Martínez', agent: 'Pablo Herrero', status: '<span class="badge badge-green">Confirmada</span>' },
      { date: '09/04/2026', time: '11:30', property: 'Chalet Pozuelo', client: 'Roberto García', agent: 'Ana Vidal', status: '<span class="badge badge-green">Confirmada</span>' },
      { date: '09/04/2026', time: '16:00', property: 'Ático Chamberí', client: 'Carmen López', agent: 'Pablo Herrero', status: '<span class="badge badge-yellow">Pendiente</span>' },
      { date: '10/04/2026', time: '10:00', property: 'Estudio Malasaña', client: 'Antonio Ruiz', agent: 'Ana Vidal', status: '<span class="badge badge-green">Confirmada</span>' },
      { date: '10/04/2026', time: '12:00', property: 'Casa Las Rozas', client: 'Francisco Díaz', agent: 'Pablo Herrero', status: '<span class="badge badge-green">Confirmada</span>' },
      { date: '10/04/2026', time: '17:00', property: 'Piso Prosperidad', client: 'Lucía Navarro', agent: 'Ana Vidal', status: '<span class="badge badge-yellow">Pendiente</span>' },
      { date: '11/04/2026', time: '10:30', property: 'Piso Serrano 78', client: 'Roberto García', agent: 'Pablo Herrero', status: '<span class="badge badge-blue">2a visita</span>' },
    ]

    const viewingSteps: StepData[] = [
      { title: 'Solicitud de visita recibida', description: 'El cliente solicita visitar la propiedad a través del portal o llamada.', detail: 'Tiempo medio de respuesta: 2 horas', icon: '📩' },
      { title: 'Confirmación y preparación', description: 'Se confirma la cita con el cliente y se prepara la documentación del inmueble.', detail: 'Se envía recordatorio automático 24h antes', icon: '✅' },
      { title: 'Visita guiada', description: 'El agente muestra la propiedad destacando puntos clave y resolviendo dudas.', detail: 'Duración media: 45 minutos', icon: '🏠' },
      { title: 'Feedback y seguimiento', description: 'Se recoge la valoración del cliente y se programa seguimiento si hay interés.', detail: 'El 42% solicita segunda visita', icon: '📋' },
    ]

    const viewingsContent = `
      <div class="card" style="margin-bottom:1.5rem">
        <div class="card-header"><h3>Agenda de Visitas</h3><span class="badge badge-accent">Esta semana</span></div>
        ${dataTable(viewingCols, viewingRows)}
      </div>
      <div class="grid-2">
        <div class="card">
          <div class="card-header"><h3>Proceso de Visita</h3></div>
          ${stepProcess(viewingSteps, 'var(--accent)')}
        </div>
        <div class="card">
          <div class="card-header"><h3>Resumen Visitas</h3></div>
          ${kpiGrid([
            { icon: '📅', label: 'Visitas Semana', value: md?.viewingsWeek || 18 },
            { icon: '✅', label: 'Confirmadas', value: md?.viewingsConfirmed || 14 },
            { icon: '🔄', label: '2a Visita', value: md?.secondViewings || 5 },
            { icon: '📊', label: 'Conversión', value: md?.viewingConversion || 28, suffix: '%' },
          ])}
        </div>
      </div>`

    const viewingsSection = section('viewings', 'VISITAS', 'Agenda de Visitas',
      'Programación y seguimiento de todas las visitas a propiedades.',
      viewingsContent)

    // ── Valuations
    const valuations = md?.valuations || [
      {
        title: 'Piso en Serrano 78',
        address: 'Salamanca, Madrid — 120 m²',
        price: '€485.000',
        perm2: '€4.042/m²',
        comparisons: [
          { label: 'Media zona', value: '€4.200/m²' },
          { label: 'Variación anual', value: '+6.8%' },
          { label: 'Tiempo medio venta', value: '42 días' },
          { label: 'Nº comparables', value: '23' },
        ],
      },
      {
        title: 'Chalet en Pozuelo',
        address: 'Pozuelo de Alarcón — 280 m²',
        price: '€790.000',
        perm2: '€2.821/m²',
        comparisons: [
          { label: 'Media zona', value: '€2.950/m²' },
          { label: 'Variación anual', value: '+4.2%' },
          { label: 'Tiempo medio venta', value: '68 días' },
          { label: 'Nº comparables', value: '15' },
        ],
      },
      {
        title: 'Ático en Chamberí',
        address: 'Chamberí, Madrid — 95 m²',
        price: '€650.000',
        perm2: '€6.842/m²',
        comparisons: [
          { label: 'Media zona', value: '€5.800/m²' },
          { label: 'Variación anual', value: '+9.1%' },
          { label: 'Tiempo medio venta', value: '28 días' },
          { label: 'Nº comparables', value: '11' },
        ],
      },
    ]

    const valCards = valuations.map((v: Record<string, unknown>) => {
      const comps = (v.comparisons as { label: string; value: string }[]).map(
        (comp) => `<div class="val-comp-row"><span class="label">${comp.label}</span><span class="value">${comp.value}</span></div>`
      ).join('')
      return `
      <div class="val-card">
        <div class="val-title">${v.title}</div>
        <div class="val-address">📍 ${v.address}</div>
        <div class="val-price">${v.price}</div>
        <div class="val-per-m2">${v.perm2}</div>
        <div class="val-comp">${comps}</div>
      </div>`
    }).join('')

    const priceByZone: BarChartItem[] = md?.priceByZone || [
      { label: 'Salamanca', value: 5200, color: 'var(--accent)' },
      { label: 'Chamberí', value: 4800, color: 'var(--accent)' },
      { label: 'Chamartín', value: 4100, color: 'var(--primary-light)' },
      { label: 'Retiro', value: 3900, color: 'var(--primary-light)' },
      { label: 'Pozuelo', value: 2950, color: 'var(--primary-light)' },
      { label: 'Las Rozas', value: 2400, color: 'var(--primary-light)' },
    ]

    const valContent = `
      <div class="grid-3">${valCards}</div>
      <div class="grid-2" style="margin-top:1.5rem">
        <div class="card">
          <div class="card-header"><h3>Precio €/m² por Zona</h3></div>
          ${horizontalBarChart(priceByZone)}
        </div>
        <div class="card">
          <div class="card-header"><h3>Mercado</h3></div>
          ${kpiGrid([
            { icon: '📊', label: 'Precio Medio/m²', value: md?.avgPriceM2 || 3850, prefix: '€' },
            { icon: '📈', label: 'Variación Anual', value: md?.yearlyChange || '+5.4%' },
            { icon: '🏗️', label: 'Obra Nueva', value: md?.newBuild || '€4.200/m²' },
            { icon: '⏱️', label: 'Días en Mercado', value: md?.avgDaysOnMarket || 34 },
          ])}
        </div>
      </div>`

    const valSection = section('valuations', 'VALORACIONES', 'Análisis Comparativo de Mercado',
      'Valoraciones basadas en datos reales de transacciones y comparables de la zona.',
      valContent)

    // ── Analytics
    const salesByMonth: BarChartItem[] = md?.salesByMonth || [
      { label: 'Enero', value: 6 },
      { label: 'Febrero', value: 4 },
      { label: 'Marzo', value: 9 },
      { label: 'Abril', value: 8 },
    ]

    const anaContent = `
      ${bigResult(
        md?.annualCommissions || '€1.48M',
        md?.annualLabel || 'Comisiones Anuales Proyectadas',
        [
          { title: md?.avgCommission || '€18.500', subtitle: 'Comisión Media' },
          { title: md?.closingRate || '12.4%', subtitle: 'Tasa de Cierre' },
          { title: md?.portfolioGrowth || '+23%', subtitle: 'Crecimiento Cartera' },
        ]
      )}
      <div class="grid-2" style="margin-top:1.5rem">
        <div class="card">
          <div class="card-header"><h3>Ventas Cerradas por Mes</h3></div>
          ${horizontalBarChart(salesByMonth)}
        </div>
        <div class="card">
          <div class="card-header"><h3>Performance Agentes</h3></div>
          ${progressBar('Pablo Herrero (18 ventas)', 90, 'accent')}
          ${progressBar('Ana Vidal (14 ventas)', 70, 'primary')}
          ${progressBar('Carlos Ruiz (11 ventas)', 55, 'primary')}
          ${progressBar('María Santos (8 ventas)', 40, 'primary')}
        </div>
      </div>`

    const anaSection = section('analytics', 'ANALYTICS', 'Rendimiento del Negocio',
      'Métricas clave de ventas, comisiones y rendimiento del equipo.',
      anaContent)

    // ── Settings
    const settingsFields: SettingsField[] = [
      { label: 'Nombre de la agencia', value: c.businessName, type: 'text' },
      { label: 'Email de contacto', value: md?.email || 'info@' + c.businessName.toLowerCase().replace(/\s/g, '') + '.com', type: 'email' },
      { label: 'Comisión por defecto (%)', value: md?.defaultCommission || '3', type: 'text' },
      { label: 'Zona principal', value: md?.mainArea || 'Madrid Centro', type: 'text' },
      { label: 'Publicación automática en portales', value: '', type: 'toggle', enabled: true },
      { label: 'Alertas de nuevos leads', value: '', type: 'toggle', enabled: true },
      { label: 'Recordatorio de visitas', value: '', type: 'toggle', enabled: true },
      { label: 'Modo vacaciones', value: '', type: 'toggle', enabled: false },
    ]

    const settContent = settingsForm(settingsFields)
    const settSection = section('settings', 'CONFIGURACIÓN', 'Ajustes de la Agencia',
      'Personaliza comisiones, zonas y automatizaciones.',
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
<style>${designSystemCSS(c.primaryColor, c.accentColor, c.theme || 'executive')}
${overrideCSS}</style>
</head>
<body>
${nav}
${notificationContainer()}
${hero}
${dashSection}
${propSection}
${leadsSection}
${viewingsSection}
${valSection}
${anaSection}
${settSection}
${footer}
<script>${allScripts()}</script>
</body>
</html>`
  },
}

interface RealestateMockData {
  heroTagline?: string
  heroSubtitle?: string
  totalListings?: number
  monthlyRevenue?: number
  conversionRate?: string
  avgDaysOnMarket?: number
  portalViews?: number
  newLeads?: number
  salesClosed?: number
  propertyTypes?: BarChartItem[]
  alert1?: string
  alert2?: string
  alert3?: string
  alert4?: string
  alertCount?: number
  properties?: Record<string, string>[]
  portfolioValue?: string
  avgPrice?: string
  newListingsWeek?: number
  leads?: Record<string, string>[]
  totalLeads?: number
  leadsBySource?: BarChartItem[]
  viewings?: Record<string, string>[]
  viewingsWeek?: number
  viewingsConfirmed?: number
  secondViewings?: number
  viewingConversion?: number
  valuations?: Record<string, unknown>[]
  priceByZone?: BarChartItem[]
  avgPriceM2?: number
  yearlyChange?: string
  newBuild?: string
  salesByMonth?: BarChartItem[]
  annualCommissions?: string
  annualLabel?: string
  avgCommission?: string
  closingRate?: string
  portfolioGrowth?: string
  email?: string
  defaultCommission?: string
  mainArea?: string
}
