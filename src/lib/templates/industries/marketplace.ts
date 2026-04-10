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

export const marketplaceTemplate: TemplateDefinition = {
  meta: {
    id: 'marketplace',
    name: 'Marketplace Premium',
    industries: ['marketplace', 'mercado', 'compra-venta', 'buy-sell', 'classified', 'anuncios', 'listings', 'segunda mano', 'auction', 'subasta'],
    projectTypes: ['landing', 'mvp', 'system', 'saas'],
    sections: ['hero', 'dashboard', 'listings', 'users', 'transactions', 'disputes', 'analytics', 'settings'],
    description: 'Plantilla premium para marketplaces y plataformas de compra-venta. Dashboard con KPIs de listings y transacciones, gestión de usuarios buyer/seller, disputas, analytics de GMV y configuración.',
  },

  render(c: TemplateCustomization): string {
    const md = c.mockData as MarketplaceMockData

    // ── Nav
    const nav = navBar(c.businessName, [
      { id: 'hero', label: 'Inicio' },
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'listings', label: 'Anuncios' },
      { id: 'users', label: 'Usuarios' },
      { id: 'transactions', label: 'Transacciones' },
      { id: 'disputes', label: 'Disputas' },
      { id: 'analytics', label: 'Analytics' },
      { id: 'settings', label: 'Config' },
    ])

    // ── Hero
    const hero = heroSection(
      c.businessName,
      md?.heroTagline || `${c.businessName} — Tu Marketplace de Confianza`,
      md?.heroSubtitle || 'Conecta compradores y vendedores con transacciones seguras, valoraciones verificadas y pagos protegidos.',
      [
        { value: md?.totalListings || 12480, label: 'Anuncios Activos' },
        { value: md?.monthlyGMV || 385000, label: 'GMV/Mes', prefix: '€' },
        { value: md?.totalUsers || 28500, label: 'Usuarios' },
        { value: md?.avgRating || 4.8, label: 'Confianza', suffix: '/5' },
      ],
      `Demo Interactivo — ${c.businessType || 'Marketplace'}`
    )

    // ── Dashboard
    const dashKpis: KpiData[] = [
      { icon: '📦', label: 'Anuncios Activos', value: md?.activeListings || 3842, trend: { value: '+124 hoy', direction: 'up' } },
      { icon: '💳', label: 'Transacciones Hoy', value: md?.transactionsToday || 267, trend: { value: '+18%', direction: 'up' } },
      { icon: '👥', label: 'Usuarios Activos', value: md?.activeUsers || 5420, trend: { value: '+340', direction: 'up' } },
      { icon: '💰', label: 'GMV Hoy', value: md?.gmvToday || 42800, prefix: '€', trend: { value: '+22%', direction: 'up' } },
    ]

    const topCategories: BarChartItem[] = md?.topCategories || [
      { label: 'Electrónica', value: 1240, color: 'var(--accent)' },
      { label: 'Moda & Accesorios', value: 980, color: 'var(--primary-light)' },
      { label: 'Hogar & Jardín', value: 720, color: 'var(--accent)' },
      { label: 'Motor', value: 560, color: 'var(--primary-light)' },
      { label: 'Deporte', value: 342, color: 'var(--accent)' },
    ]

    const dashAlerts = [
      alertRow('🔴', md?.alert1 || 'Anuncio #4521 reportado por contenido sospechoso', 'Urgente', 'badge-red'),
      alertRow('💳', md?.alert2 || 'Pago retenido TX-8923: verificación pendiente', 'Escrow', 'badge-yellow'),
      alertRow('⭐', md?.alert3 || 'Vendedor "TechDeals" alcanza 500 ventas — badge Top Seller', 'Hito', 'badge-purple'),
      alertRow('📈', md?.alert4 || 'GMV supera €40K hoy — nuevo récord diario', 'Record', 'badge-green'),
    ]

    const dashContent = `
      ${kpiGrid(dashKpis)}
      <div class="grid-2" style="margin-top:1.5rem">
        <div class="card">
          <div class="card-header"><h3>Top Categorías</h3><span class="badge badge-accent">Esta semana</span></div>
          ${horizontalBarChart(topCategories)}
        </div>
        <div class="card">
          <div class="card-header"><h3>Alertas del Marketplace</h3><span class="badge badge-primary">${md?.alertCount || 4} activas</span></div>
          ${dashAlerts.join('')}
        </div>
      </div>`

    const dashSection = section('dashboard', c.businessType?.toUpperCase() || 'MARKETPLACE', 'Panel de Control',
      'Vista en tiempo real del rendimiento de tu marketplace.',
      dashContent)

    // ── Listings
    const listingsData = md?.listings || [
      { title: 'iPhone 15 Pro 256GB', seller: 'TechDeals', price: '€899', rating: '4.9★', views: '2,340', status: '<span class="badge badge-green">Activo</span>', category: 'Electrónica' },
      { title: 'Bicicleta Montaña Trek X-Caliber', seller: 'SportLife', price: '€650', rating: '4.7★', views: '1,120', status: '<span class="badge badge-green">Activo</span>', category: 'Deporte' },
      { title: 'Sofá Modular 3 Plazas', seller: 'HomeStyle', price: '€1,200', rating: '4.8★', views: '890', status: '<span class="badge badge-yellow">Reservado</span>', category: 'Hogar' },
      { title: 'PS5 + 2 Mandos', seller: 'GameZone', price: '€420', rating: '4.6★', views: '3,450', status: '<span class="badge badge-green">Activo</span>', category: 'Electrónica' },
      { title: 'Chaqueta North Face XL', seller: 'OutdoorPro', price: '€180', rating: '4.9★', views: '670', status: '<span class="badge badge-green">Activo</span>', category: 'Moda' },
      { title: 'MacBook Air M2 2023', seller: 'TechDeals', price: '€1,050', rating: '4.9★', views: '4,210', status: '<span class="badge badge-blue">Destacado</span>', category: 'Electrónica' },
    ]

    const listingCards = listingsData.map((item: Record<string, string>) => `
      <div class="card" style="padding:1.2rem;border-left:3px solid var(--primary)">
        <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:0.5rem">
          <div>
            <span style="font-size:0.62rem;color:var(--text-dim);text-transform:uppercase;letter-spacing:1px">${item.category}</span>
            <h4 style="font-size:0.9rem;font-weight:700;margin-top:2px">${item.title}</h4>
            <span style="font-size:0.72rem;color:var(--text-muted)">por <span style="color:var(--primary-light)">${item.seller}</span> · ${item.rating}</span>
          </div>
          <div style="text-align:right">
            <span style="font-size:1.2rem;font-weight:800;color:var(--accent)">${item.price}</span>
            <div style="margin-top:4px">${item.status}</div>
          </div>
        </div>
        <div style="display:flex;gap:1rem;font-size:0.7rem;color:var(--text-dim)">
          <span>👁️ ${item.views} vistas</span>
        </div>
      </div>
    `).join('')

    const listingsContent = `
      <div class="grid-2">${listingCards}</div>
      <div style="margin-top:1.5rem">
        ${kpiGrid([
          { icon: '📦', label: 'Total Anuncios', value: md?.totalListingsCount || 12480 },
          { icon: '✅', label: 'Activos', value: md?.activeListingsCount || 9840 },
          { icon: '🔒', label: 'Reservados', value: md?.reservedCount || 1420 },
          { icon: '🚫', label: 'Reportados', value: md?.reportedCount || 23 },
        ])}
      </div>`

    const listSection = section('listings', 'ANUNCIOS', 'Catálogo del Marketplace',
      'Todos los anuncios activos con filtros por categoría, precio y vendedor.',
      listingsContent)

    // ── Users
    const userCols: TableColumn[] = [
      { label: 'Usuario', key: 'name' },
      { label: 'Tipo', key: 'type' },
      { label: 'Rating', key: 'rating', align: 'center' },
      { label: 'Ventas', key: 'sales', align: 'center' },
      { label: 'Compras', key: 'purchases', align: 'center' },
      { label: 'Volumen', key: 'volume', align: 'right' },
      { label: 'Estado', key: 'status' },
    ]
    const userRows = md?.users || [
      { name: '🟢 TechDeals', type: '<span class="badge badge-blue">Vendedor Pro</span>', rating: '4.9★', sales: '524', purchases: '12', volume: '€89,400', status: '<span class="badge badge-purple">Top Seller</span>' },
      { name: '🟢 María García', type: '<span class="badge badge-green">Comprador</span>', rating: '4.8★', sales: '3', purchases: '67', volume: '€12,300', status: '<span class="badge badge-green">Verificado</span>' },
      { name: '🟢 SportLife', type: '<span class="badge badge-blue">Vendedor Pro</span>', rating: '4.7★', sales: '312', purchases: '5', volume: '€56,200', status: '<span class="badge badge-green">Verificado</span>' },
      { name: '🟡 Carlos López', type: '<span class="badge badge-green">Comprador</span>', rating: '4.5★', sales: '8', purchases: '34', volume: '€5,600', status: '<span class="badge badge-green">Verificado</span>' },
      { name: '🟢 HomeStyle', type: '<span class="badge badge-blue">Vendedor</span>', rating: '4.6★', sales: '178', purchases: '2', volume: '€34,800', status: '<span class="badge badge-green">Verificado</span>' },
      { name: '🔴 QuickSell23', type: '<span class="badge badge-blue">Vendedor</span>', rating: '2.1★', sales: '14', purchases: '0', volume: '€1,200', status: '<span class="badge badge-red">Suspendido</span>' },
    ]

    const usersContent = `
      <div class="card">${dataTable(userCols, userRows)}</div>
      <div class="grid-2" style="margin-top:1.5rem">
        <div class="card">
          <div class="card-header"><h3>Distribución de Usuarios</h3></div>
          ${horizontalBarChart([
            { label: 'Compradores', value: md?.buyerCount || 18200, color: 'var(--success)' },
            { label: 'Vendedores', value: md?.sellerCount || 6400, color: 'var(--info)' },
            { label: 'Mixtos', value: md?.mixedCount || 3900, color: 'var(--accent)' },
          ])}
        </div>
        <div class="card">
          <div class="card-header"><h3>Actividad de Usuarios</h3></div>
          ${progressBar('Tasa de verificación', md?.verificationRate || 87, 'ok')}
          ${progressBar('Usuarios activos (30d)', md?.activeRate || 62, 'primary')}
          ${progressBar('Retención mensual', md?.retentionRate || 74, 'accent')}
        </div>
      </div>`

    const usersSection = section('users', 'USUARIOS', 'Gestión de Usuarios',
      'Compradores y vendedores con ratings, volumen de transacciones y estado.',
      usersContent)

    // ── Transactions
    const txCols: TableColumn[] = [
      { label: 'ID', key: 'id' },
      { label: 'Producto', key: 'product' },
      { label: 'Comprador', key: 'buyer' },
      { label: 'Vendedor', key: 'seller' },
      { label: 'Importe', key: 'amount', align: 'right' },
      { label: 'Comisión', key: 'fee', align: 'right' },
      { label: 'Estado', key: 'status' },
    ]
    const txRows = md?.transactions || [
      { id: 'TX-9847', product: 'iPhone 15 Pro', buyer: 'María G.', seller: 'TechDeals', amount: '€899', fee: '€44.95', status: '<span class="badge badge-green">Completada</span>' },
      { id: 'TX-9846', product: 'Trek X-Caliber 8', buyer: 'Pedro R.', seller: 'SportLife', amount: '€650', fee: '€32.50', status: '<span class="badge badge-green">Completada</span>' },
      { id: 'TX-9845', product: 'PS5 Bundle', buyer: 'Laura M.', seller: 'GameZone', amount: '€420', fee: '€21.00', status: '<span class="badge badge-yellow">En envío</span>' },
      { id: 'TX-9844', product: 'MacBook Air M2', buyer: 'Carlos L.', seller: 'TechDeals', amount: '€1,050', fee: '€52.50', status: '<span class="badge badge-blue">Escrow</span>' },
      { id: 'TX-9843', product: 'Sofá Modular', buyer: 'Ana S.', seller: 'HomeStyle', amount: '€1,200', fee: '€60.00', status: '<span class="badge badge-yellow">En envío</span>' },
      { id: 'TX-9842', product: 'Chaqueta NF', buyer: 'Jorge P.', seller: 'OutdoorPro', amount: '€180', fee: '€9.00', status: '<span class="badge badge-green">Completada</span>' },
      { id: 'TX-9841', product: 'Cámara Sony A7IV', buyer: 'Elena V.', seller: 'PhotoPro', amount: '€2,100', fee: '€105.00', status: '<span class="badge badge-red">Disputa</span>' },
    ]

    const txContent = `
      <div class="card">${dataTable(txCols, txRows)}</div>
      <div style="margin-top:1.5rem">
        ${kpiGrid([
          { icon: '💳', label: 'Transacciones/Día', value: md?.txPerDay || 267 },
          { icon: '💰', label: 'Comisión Media', value: md?.avgFee || 5, suffix: '%' },
          { icon: '📦', label: 'En Escrow', value: md?.escrowCount || 34 },
          { icon: '⏱️', label: 'Tiempo Medio Entrega', value: md?.avgDelivery || '2.4d' },
        ])}
      </div>`

    const txSection = section('transactions', 'TRANSACCIONES', 'Historial de Transacciones',
      'Todas las transacciones con estado, comisiones y seguimiento de pagos.',
      txContent)

    // ── Disputes
    const disputeData = md?.disputes || [
      { id: 'DIS-142', product: 'Cámara Sony A7IV', buyer: 'Elena V.', seller: 'PhotoPro', reason: 'Producto no coincide con la descripción', amount: '€2,100', status: '<span class="badge badge-red">Abierta</span>', date: 'Hace 2h' },
      { id: 'DIS-141', product: 'Zapatillas Nike Air', buyer: 'Marcos T.', seller: 'SneakerHub', reason: 'No recibido tras 15 días', amount: '€145', status: '<span class="badge badge-yellow">En revisión</span>', date: 'Hace 1d' },
      { id: 'DIS-140', product: 'Tablet Samsung', buyer: 'Lucía R.', seller: 'TechDeals', reason: 'Pantalla con rayón no declarado', amount: '€320', status: '<span class="badge badge-green">Resuelta</span>', date: 'Hace 3d' },
      { id: 'DIS-139', product: 'Bolso Gucci', buyer: 'Sonia M.', seller: 'LuxuryFinds', reason: 'Sospecha de falsificación', amount: '€580', status: '<span class="badge badge-green">Resuelta — reembolso</span>', date: 'Hace 5d' },
    ]

    const disputeCards = disputeData.map((d: Record<string, string>) => `
      <div class="card" style="padding:1.2rem;border-left:3px solid var(--danger)">
        <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:0.5rem">
          <div>
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
              <span style="font-size:0.72rem;font-weight:700;color:var(--text-dim)">${d.id}</span>
              ${d.status}
            </div>
            <h4 style="font-size:0.88rem;font-weight:700">${d.product}</h4>
            <p style="font-size:0.76rem;color:var(--text-muted);margin-top:3px">${d.reason}</p>
          </div>
          <div style="text-align:right">
            <span style="font-size:1.05rem;font-weight:800;color:var(--danger)">${d.amount}</span>
            <div style="font-size:0.62rem;color:var(--text-dim);margin-top:4px">${d.date}</div>
          </div>
        </div>
        <div style="display:flex;gap:1rem;font-size:0.7rem;color:var(--text-dim)">
          <span>🛒 ${d.buyer}</span>
          <span>🏪 ${d.seller}</span>
        </div>
      </div>
    `).join('')

    const disputesContent = `
      <div class="grid-2">${disputeCards}</div>
      <div style="margin-top:1.5rem">
        ${kpiGrid([
          { icon: '⚠️', label: 'Disputas Abiertas', value: md?.openDisputes || 8 },
          { icon: '✅', label: 'Resueltas (30d)', value: md?.resolvedDisputes || 42 },
          { icon: '⏱️', label: 'Tiempo Resolución', value: md?.avgResolution || '1.8d' },
          { icon: '💸', label: 'Reembolsos (30d)', value: md?.refundAmount || 4200, prefix: '€' },
        ])}
      </div>`

    const dispSection = section('disputes', 'DISPUTAS', 'Centro de Resolución',
      'Gestión de disputas entre compradores y vendedores con mediación automática.',
      disputesContent)

    // ── Analytics
    const gmvByDay: BarChartItem[] = md?.gmvByDay || [
      { label: 'Lunes', value: 32000 },
      { label: 'Martes', value: 38000 },
      { label: 'Miércoles', value: 41000 },
      { label: 'Jueves', value: 46000 },
      { label: 'Viernes', value: 58000, color: 'var(--accent)' },
      { label: 'Sábado', value: 72000, color: 'var(--accent)' },
      { label: 'Domingo', value: 48000 },
    ]

    const analyticsContent = `
      <div class="grid-2">
        <div class="card">
          <div class="card-header"><h3>GMV Semanal</h3></div>
          ${horizontalBarChart(gmvByDay)}
        </div>
        <div class="card">
          <div class="card-header"><h3>Métricas Clave</h3></div>
          ${progressBar('Tasa de conversión', md?.conversionRate || 12, 'primary')}
          ${progressBar('Satisfacción compradores', md?.buyerSat || 92, 'ok')}
          ${progressBar('Satisfacción vendedores', md?.sellerSat || 88, 'accent')}
          ${progressBar('Tasa de recompra', md?.reorderRate || 34, 'primary')}
        </div>
      </div>
      <div style="margin-top:1.5rem">
        ${bigResult(
          md?.monthlyGMVStr || '€385,000',
          md?.monthlyGMVLabel || 'GMV mensual — Volumen Bruto de Mercancía',
          [
            { title: md?.avgOrderValue || '€142', subtitle: 'Ticket medio' },
            { title: md?.monthlyTx || '2,710', subtitle: 'Transacciones/mes' },
            { title: md?.commissionRevenue || '€19,250', subtitle: 'Ingresos por comisión' },
          ]
        )}
      </div>`

    const anaSection = section('analytics', 'RENDIMIENTO', 'Analytics del Marketplace',
      'Análisis detallado de GMV, transacciones, usuarios y rendimiento.',
      analyticsContent)

    // ── Settings
    const settingsFields: SettingsField[] = [
      { label: 'Nombre del marketplace', value: c.businessName, type: 'text' },
      { label: 'Email de soporte', value: md?.email || `soporte@${c.businessName.toLowerCase().replace(/\s/g, '')}.com`, type: 'email' },
      { label: 'Comisión sobre ventas', value: md?.commissionPct || '5%', type: 'text' },
      { label: 'Moneda por defecto', value: 'EUR', type: 'select', options: ['EUR', 'USD', 'GBP'] },
      { label: 'Verificación de identidad obligatoria', value: '', type: 'toggle', enabled: true },
      { label: 'Escrow automático', value: '', type: 'toggle', enabled: true },
      { label: 'Notificaciones de disputas', value: '', type: 'toggle', enabled: true },
      { label: 'Modo mantenimiento', value: '', type: 'toggle', enabled: false },
    ]

    const settContent = settingsForm(settingsFields)
    const settSection = section('settings', 'CONFIGURACIÓN', 'Ajustes del Marketplace',
      'Personaliza comisiones, verificaciones y automatizaciones.',
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
<style>
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700;800;900&display=swap');
body { font-family: 'Rubik', sans-serif; background: #09090f; }
</style>
</head>
<body>
${nav}
${notificationContainer()}
${hero}
${dashSection}
${listSection}
${usersSection}
${txSection}
${dispSection}
${anaSection}
${settSection}
${footer}
<script>${allScripts()}</script>
</body>
</html>`
  },
}

interface MarketplaceMockData {
  heroTagline?: string
  heroSubtitle?: string
  totalListings?: number
  monthlyGMV?: number
  totalUsers?: number
  avgRating?: number
  activeListings?: number
  transactionsToday?: number
  activeUsers?: number
  gmvToday?: number
  topCategories?: BarChartItem[]
  alert1?: string
  alert2?: string
  alert3?: string
  alert4?: string
  alertCount?: number
  listings?: Record<string, string>[]
  totalListingsCount?: number
  activeListingsCount?: number
  reservedCount?: number
  reportedCount?: number
  users?: Record<string, string>[]
  buyerCount?: number
  sellerCount?: number
  mixedCount?: number
  verificationRate?: number
  activeRate?: number
  retentionRate?: number
  transactions?: Record<string, string>[]
  txPerDay?: number
  avgFee?: number
  escrowCount?: number
  avgDelivery?: string
  disputes?: Record<string, string>[]
  openDisputes?: number
  resolvedDisputes?: number
  avgResolution?: string
  refundAmount?: number
  gmvByDay?: BarChartItem[]
  conversionRate?: number
  buyerSat?: number
  sellerSat?: number
  reorderRate?: number
  monthlyGMVStr?: string
  monthlyGMVLabel?: string
  avgOrderValue?: string
  monthlyTx?: string
  commissionRevenue?: string
  email?: string
  commissionPct?: string
}
