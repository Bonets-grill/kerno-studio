import type { TemplateDefinition, TemplateCustomization } from '../types'
import { designSystemCSS } from '../shared/design-system'
import { allScripts } from '../shared/scripts'
import {
  navBar, heroSection, notificationContainer, section,
  kpiGrid, dataTable, progressBar, horizontalBarChart,
  settingsForm, alertRow, bigResult,
  type KpiData, type TableColumn, type SettingsField, type BarChartItem,
} from '../shared/components'

export const ecommerceTemplate: TemplateDefinition = {
  meta: {
    id: 'ecommerce',
    name: 'E-Commerce Pro',
    industries: ['ecommerce', 'tienda', 'shop', 'store', 'venta online', 'catálogo', 'catalog', 'carrito', 'cart', 'productos'],
    projectTypes: ['landing', 'mvp', 'system', 'saas'],
    sections: ['hero', 'dashboard', 'products', 'orders', 'inventory', 'customers', 'analytics', 'settings'],
    description: 'Plantilla e-commerce profesional con dashboard de ventas, catálogo de productos, gestión de pedidos, control de inventario, base de clientes, analytics de conversión y configuración de tienda.',
  },

  render(c: TemplateCustomization): string {
    const md = c.mockData as EcommerceMockData

    // ── Nav
    const nav = navBar(c.businessName, [
      { id: 'hero', label: 'Inicio' },
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'products', label: 'Productos' },
      { id: 'orders', label: 'Pedidos' },
      { id: 'inventory', label: 'Inventario' },
      { id: 'customers', label: 'Clientes' },
      { id: 'analytics', label: 'Analytics' },
      { id: 'settings', label: 'Config' },
    ])

    // ── Hero
    const hero = heroSection(
      c.businessName,
      md?.heroTagline || `${c.businessName} — Tu tienda online inteligente`,
      md?.heroSubtitle || 'Catálogo dinámico, gestión de pedidos automatizada, control de stock y analytics de conversión.',
      [
        { value: md?.monthlyOrders || 1842, label: 'Pedidos/Mes' },
        { value: md?.monthlyRevenue || 128500, label: 'Ventas/Mes', prefix: '€' },
        { value: md?.conversionRate || 3.2, label: 'Conversión', suffix: '%' },
        { value: md?.avgOrderValue || 69, label: 'Pedido Medio', prefix: '€' },
      ],
      `Demo Interactivo — ${c.businessType || 'E-Commerce'}`
    )

    // ── Dashboard
    const dashKpis: KpiData[] = [
      { icon: '💰', label: 'Ventas Hoy', value: md?.salesToday || 4280, prefix: '€', trend: { value: '+22% vs ayer', direction: 'up' } },
      { icon: '📦', label: 'Pedidos Hoy', value: md?.ordersToday || 63, trend: { value: '+15', direction: 'up' } },
      { icon: '📈', label: 'Conversión', value: md?.convToday || 3.4, suffix: '%', decimals: 1, trend: { value: '+0.3%', direction: 'up' } },
      { icon: '🛒', label: 'Carrito Medio', value: md?.cartAvg || 72, prefix: '€', trend: { value: '+€5', direction: 'up' } },
    ]

    const topProducts: BarChartItem[] = md?.topProducts || [
      { label: 'Auriculares Pro X1', value: 342, color: 'var(--accent)' },
      { label: 'Camiseta Técnica Sport', value: 289, color: 'var(--primary-light)' },
      { label: 'Smart Watch Ultra', value: 234, color: 'var(--accent)' },
      { label: 'Mochila Urban 30L', value: 198, color: 'var(--primary-light)' },
      { label: 'Botella Térmica 750ml', value: 167, color: 'var(--accent)' },
    ]

    const dashAlerts = [
      alertRow('🔴', md?.alert1 || 'Stock bajo: Auriculares Pro X1 (quedan 8 uds)', '⚠️ Stock', 'badge-red'),
      alertRow('📦', md?.alert2 || 'Pedido #4521 — Devolución solicitada', 'Devolución', 'badge-yellow'),
      alertRow('🎉', md?.alert3 || 'Record de ventas: mejor martes del año', 'Record', 'badge-green'),
      alertRow('💳', md?.alert4 || 'Pago fallido pedido #4518 — reintento pendiente', 'Pago', 'badge-red'),
    ]

    const dashContent = `
      ${kpiGrid(dashKpis)}
      <div class="grid-2" style="margin-top:1.5rem">
        <div class="card">
          <div class="card-header"><h3>Productos Más Vendidos</h3><span class="badge badge-accent">Este mes</span></div>
          ${horizontalBarChart(topProducts)}
        </div>
        <div class="card">
          <div class="card-header"><h3>Alertas</h3><span class="badge badge-primary">${md?.alertCount || 4} activas</span></div>
          ${dashAlerts.join('')}
        </div>
      </div>`

    const dashSection = section('dashboard', c.businessType?.toUpperCase() || 'E-COMMERCE', 'Panel de Control',
      'Vista en tiempo real de ventas, pedidos y conversión.',
      dashContent)

    // ── Products (grid with image placeholders)
    const products = md?.products || [
      { name: 'Auriculares Pro X1', price: '€89.99', category: 'Electrónica', stock: 8, badge: 'Bestseller', badgeClass: 'badge-accent', sku: 'ELC-001', rating: '4.8' },
      { name: 'Smart Watch Ultra', price: '€249.00', category: 'Electrónica', stock: 24, badge: 'Nuevo', badgeClass: 'badge-green', sku: 'ELC-012', rating: '4.6' },
      { name: 'Camiseta Técnica Sport', price: '€34.95', category: 'Ropa', stock: 156, badge: '', badgeClass: '', sku: 'RPR-045', rating: '4.5' },
      { name: 'Mochila Urban 30L', price: '€59.90', category: 'Accesorios', stock: 42, badge: '', badgeClass: '', sku: 'ACC-022', rating: '4.7' },
      { name: 'Botella Térmica 750ml', price: '€24.99', category: 'Accesorios', stock: 89, badge: 'Popular', badgeClass: 'badge-blue', sku: 'ACC-033', rating: '4.9' },
      { name: 'Zapatillas Running X', price: '€119.00', category: 'Calzado', stock: 31, badge: '', badgeClass: '', sku: 'CLZ-008', rating: '4.4' },
      { name: 'Gafas de Sol Polar', price: '€45.00', category: 'Accesorios', stock: 67, badge: '-20%', badgeClass: 'badge-red', sku: 'ACC-041', rating: '4.3' },
      { name: 'Altavoz Bluetooth Mini', price: '€39.99', category: 'Electrónica', stock: 53, badge: '', badgeClass: '', sku: 'ELC-019', rating: '4.5' },
    ]

    const productsHtml = (products as ProductItem[]).map(p => {
      const stockColor = p.stock < 15 ? 'var(--danger)' : p.stock < 50 ? 'var(--warning)' : 'var(--success)'
      const initials = p.name.split(' ').slice(0, 2).map((w: string) => w[0]).join('')
      return `
      <div class="card" style="padding:0;overflow:hidden">
        <div style="height:140px;background:linear-gradient(135deg,var(--bg-elevated),var(--bg-card-hover));display:flex;align-items:center;justify-content:center;position:relative">
          <div style="font-size:2.5rem;font-weight:800;color:var(--text-dim);opacity:0.3">${initials}</div>
          ${p.badge ? `<span class="badge ${p.badgeClass}" style="position:absolute;top:10px;right:10px">${p.badge}</span>` : ''}
        </div>
        <div style="padding:1rem">
          <div style="font-size:0.62rem;color:var(--text-dim);text-transform:uppercase;letter-spacing:1px;margin-bottom:2px">${p.category} · ${p.sku}</div>
          <div style="font-weight:700;font-size:0.85rem;margin-bottom:6px">${p.name}</div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
            <span style="font-size:1.1rem;font-weight:800;color:var(--accent)">${p.price}</span>
            <span style="font-size:0.7rem;color:var(--text-muted)">⭐ ${p.rating}</span>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="font-size:0.7rem;color:${stockColor};font-weight:600">${p.stock} en stock</span>
            <button style="background:var(--primary);color:#fff;border:none;padding:4px 12px;border-radius:6px;font-size:0.68rem;cursor:pointer;font-weight:600" onclick="showNotif('✏️','Producto','Editando ${p.name}')">Editar</button>
          </div>
        </div>
      </div>`
    }).join('')

    const productsContent = `
      <div class="grid-2" style="margin-bottom:1.5rem">
        ${kpiGrid([
          { icon: '📦', label: 'Total Productos', value: md?.totalProducts || 248 },
          { icon: '🟢', label: 'Activos', value: md?.activeProducts || 212 },
          { icon: '🔴', label: 'Stock Bajo', value: md?.lowStock || 12 },
          { icon: '⭐', label: 'Rating Medio', value: md?.avgRating || 4.6, decimals: 1 },
        ])}
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:1rem">
        ${productsHtml}
      </div>
      <div style="margin-top:1rem;display:flex;gap:0.5rem">
        <button class="hero-btn" style="font-size:0.78rem;padding:8px 18px" onclick="showNotif('➕','Producto','Nuevo producto creado')">Añadir Producto</button>
        <button class="hero-btn" style="font-size:0.78rem;padding:8px 18px;background:var(--bg-card);border:1px solid var(--border);color:var(--text)" onclick="showNotif('📥','Importar','Importación masiva iniciada')">Importar CSV</button>
      </div>`

    const productsSection = section('products', 'CATÁLOGO', 'Gestión de Productos',
      'Catálogo completo con precios, stock, categorías y ratings.',
      productsContent)

    // ── Orders
    const orderCols: TableColumn[] = [
      { label: 'Pedido', key: 'order' },
      { label: 'Cliente', key: 'customer' },
      { label: 'Productos', key: 'items', align: 'center' },
      { label: 'Total', key: 'total', align: 'right' },
      { label: 'Estado', key: 'status' },
      { label: 'Fecha', key: 'date' },
    ]
    const orderRows = md?.orders || [
      { order: '<strong>#4523</strong>', customer: 'Elena Martínez', items: '3', total: '<strong style="color:var(--accent)">€189.97</strong>', status: '<span class="badge badge-green">Enviado</span>', date: 'Hoy 11:20' },
      { order: '<strong>#4522</strong>', customer: 'Pablo Rodríguez', items: '1', total: '<strong style="color:var(--accent)">€249.00</strong>', status: '<span class="badge badge-blue">Preparando</span>', date: 'Hoy 10:45' },
      { order: '<strong>#4521</strong>', customer: 'Lucía Gómez', items: '2', total: '<strong style="color:var(--accent)">€94.94</strong>', status: '<span class="badge badge-red">Devolución</span>', date: 'Hoy 09:30' },
      { order: '<strong>#4520</strong>', customer: 'Miguel Ángel Torres', items: '5', total: '<strong style="color:var(--accent)">€312.85</strong>', status: '<span class="badge badge-green">Entregado</span>', date: 'Ayer' },
      { order: '<strong>#4519</strong>', customer: 'Carmen López', items: '2', total: '<strong style="color:var(--accent)">€79.98</strong>', status: '<span class="badge badge-green">Entregado</span>', date: 'Ayer' },
      { order: '<strong>#4518</strong>', customer: 'Roberto Díaz', items: '1', total: '<strong style="color:var(--accent)">€119.00</strong>', status: '<span class="badge badge-yellow">Pago pendiente</span>', date: 'Hace 2 días' },
      { order: '<strong>#4517</strong>', customer: 'Sara Navarro', items: '4', total: '<strong style="color:var(--accent)">€198.93</strong>', status: '<span class="badge badge-green">Entregado</span>', date: 'Hace 2 días' },
    ]

    const ordersContent = `
      <div class="grid-2" style="margin-bottom:1.5rem">
        ${kpiGrid([
          { icon: '📦', label: 'Pedidos Hoy', value: md?.ordersToday || 63 },
          { icon: '🚚', label: 'En Envío', value: md?.inShipping || 28 },
          { icon: '✅', label: 'Entregados', value: md?.delivered || 31 },
          { icon: '↩️', label: 'Devoluciones', value: md?.returns || 4 },
        ])}
      </div>
      <div class="card">${dataTable(orderCols, orderRows)}</div>`

    const ordersSection = section('orders', 'PEDIDOS', 'Gestión de Pedidos',
      'Control de todos los pedidos con estado, tracking y gestión de devoluciones.',
      ordersContent)

    // ── Inventory (stock levels with progress bars)
    const inventoryItems = md?.inventoryItems || [
      { name: 'Auriculares Pro X1', sku: 'ELC-001', stock: 8, max: 100, reorder: 15 },
      { name: 'Smart Watch Ultra', sku: 'ELC-012', stock: 24, max: 60, reorder: 10 },
      { name: 'Camiseta Técnica Sport', sku: 'RPR-045', stock: 156, max: 200, reorder: 30 },
      { name: 'Mochila Urban 30L', sku: 'ACC-022', stock: 42, max: 80, reorder: 15 },
      { name: 'Botella Térmica 750ml', sku: 'ACC-033', stock: 89, max: 150, reorder: 25 },
      { name: 'Zapatillas Running X', sku: 'CLZ-008', stock: 31, max: 70, reorder: 12 },
      { name: 'Gafas de Sol Polar', sku: 'ACC-041', stock: 67, max: 100, reorder: 20 },
      { name: 'Altavoz Bluetooth Mini', sku: 'ELC-019', stock: 53, max: 80, reorder: 15 },
    ]

    const inventoryHtml = (inventoryItems as InventoryItem[]).map(item => {
      const pct = Math.round((item.stock / item.max) * 100)
      const variant = item.stock <= item.reorder ? 'danger' : pct < 40 ? 'warning' : 'ok'
      const statusBadge = item.stock <= item.reorder
        ? '<span class="badge badge-red" style="font-size:0.6rem">Reordenar</span>'
        : pct < 40
          ? '<span class="badge badge-yellow" style="font-size:0.6rem">Bajo</span>'
          : '<span class="badge badge-green" style="font-size:0.6rem">OK</span>'
      return `
      <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--border)">
        <div style="flex:1;min-width:160px">
          <div style="font-weight:600;font-size:0.8rem">${item.name}</div>
          <div style="font-size:0.65rem;color:var(--text-dim)">${item.sku}</div>
        </div>
        <div style="flex:2;min-width:200px">
          ${progressBar(`${item.stock} / ${item.max} uds`, pct, variant)}
        </div>
        <div style="min-width:80px;text-align:right">
          ${statusBadge}
        </div>
      </div>`
    }).join('')

    const inventoryContent = `
      <div class="grid-2" style="margin-bottom:1.5rem">
        ${kpiGrid([
          { icon: '📦', label: 'SKUs Totales', value: md?.totalSkus || 248 },
          { icon: '🔴', label: 'Stock Bajo', value: md?.lowStockCount || 12 },
          { icon: '🟢', label: 'Stock OK', value: md?.stockOk || 228 },
          { icon: '📊', label: 'Valor Inventario', value: md?.inventoryValue || 142000, prefix: '€' },
        ])}
      </div>
      <div class="card">
        <div class="card-header"><h3>Niveles de Stock</h3><span class="badge badge-accent">Tiempo real</span></div>
        ${inventoryHtml}
      </div>
      <div style="margin-top:1rem">
        <button class="hero-btn" style="font-size:0.78rem;padding:8px 18px" onclick="showNotif('📋','Inventario','Reorden automático generado')">Generar Reorden</button>
      </div>`

    const inventorySection = section('inventory', 'INVENTARIO', 'Control de Stock',
      'Monitorización de niveles de stock con alertas automáticas de reorden.',
      inventoryContent)

    // ── Customers
    const customerCols: TableColumn[] = [
      { label: 'Cliente', key: 'name' },
      { label: 'Email', key: 'email' },
      { label: 'Pedidos', key: 'orders', align: 'center' },
      { label: 'Total gastado', key: 'spent', align: 'right' },
      { label: 'Último pedido', key: 'lastOrder' },
      { label: 'Segmento', key: 'segment' },
    ]
    const customerRows = md?.customers || [
      { name: 'Elena Martínez', email: 'elena@email.com', orders: '24', spent: '<strong style="color:var(--accent)">€2,340</strong>', lastOrder: 'Hoy', segment: '<span class="badge badge-purple">VIP</span>' },
      { name: 'Pablo Rodríguez', email: 'pablo@email.com', orders: '18', spent: '<strong style="color:var(--accent)">€1,890</strong>', lastOrder: 'Hoy', segment: '<span class="badge badge-purple">VIP</span>' },
      { name: 'Lucía Gómez', email: 'lucia@email.com', orders: '12', spent: '<strong style="color:var(--accent)">€980</strong>', lastOrder: 'Hoy', segment: '<span class="badge badge-blue">Frecuente</span>' },
      { name: 'Miguel Á. Torres', email: 'miguel@email.com', orders: '8', spent: '<strong style="color:var(--accent)">€645</strong>', lastOrder: 'Ayer', segment: '<span class="badge badge-blue">Frecuente</span>' },
      { name: 'Carmen López', email: 'carmen@email.com', orders: '5', spent: '<strong style="color:var(--accent)">€312</strong>', lastOrder: 'Ayer', segment: '<span class="badge badge-green">Regular</span>' },
      { name: 'Roberto Díaz', email: 'roberto@email.com', orders: '2', spent: '<strong style="color:var(--accent)">€168</strong>', lastOrder: 'Hace 2 días', segment: '<span class="badge badge-yellow">Nuevo</span>' },
    ]

    const customersContent = `
      <div class="grid-2" style="margin-bottom:1.5rem">
        ${kpiGrid([
          { icon: '👥', label: 'Total Clientes', value: md?.totalCustomers || 3842 },
          { icon: '👑', label: 'VIP', value: md?.vipCustomers || 186 },
          { icon: '🔄', label: 'Recurrentes', value: md?.recurringPct || 42, suffix: '%' },
          { icon: '📊', label: 'LTV Medio', value: md?.avgLtv || 285, prefix: '€' },
        ])}
      </div>
      <div class="card">${dataTable(customerCols, customerRows)}</div>`

    const customersSection = section('customers', 'CLIENTES', 'Base de Clientes',
      'Segmentación de clientes con historial de compras y valor de vida.',
      customersContent)

    // ── Analytics
    const salesByDay: BarChartItem[] = md?.salesByDay || [
      { label: 'Lunes', value: 14200 },
      { label: 'Martes', value: 16800 },
      { label: 'Miércoles', value: 15400 },
      { label: 'Jueves', value: 18200 },
      { label: 'Viernes', value: 22400, color: 'var(--accent)' },
      { label: 'Sábado', value: 24800, color: 'var(--accent)' },
      { label: 'Domingo', value: 16700 },
    ]

    const analyticsContent = `
      <div class="grid-2">
        <div class="card">
          <div class="card-header"><h3>Ventas por Día</h3></div>
          ${horizontalBarChart(salesByDay)}
        </div>
        <div class="card">
          <div class="card-header"><h3>Métricas de Conversión</h3></div>
          ${progressBar('Tasa de conversión', md?.convPct || 3.4, 'primary')}
          ${progressBar('Tasa de abandono carrito', md?.cartAbandon || 68, 'danger')}
          ${progressBar('Retorno de clientes', md?.returnCustomers || 42, 'accent')}
          ${progressBar('NPS Score', md?.nps || 72, 'ok')}
        </div>
      </div>
      <div style="margin-top:1.5rem">
        ${bigResult(
          md?.monthlyRevenueStr || '€128,500',
          md?.monthlyRevenueLabel || 'Facturación mensual',
          [
            { title: md?.avgOrderStr || '€69', subtitle: 'Pedido medio' },
            { title: md?.monthlyOrdersStr || '1,842', subtitle: 'Pedidos/mes' },
            { title: md?.marginStr || '34%', subtitle: 'Margen bruto' },
          ]
        )}
      </div>`

    const anaSection = section('analytics', 'ANALYTICS', 'Rendimiento de la Tienda',
      'Análisis de ventas, conversión, abandono de carrito y comportamiento de clientes.',
      analyticsContent)

    // ── Settings
    const settingsFields: SettingsField[] = [
      { label: 'Nombre de la tienda', value: c.businessName, type: 'text' },
      { label: 'Email de la tienda', value: md?.settingsEmail || `info@${c.businessName.toLowerCase().replace(/\s/g, '')}.com`, type: 'email' },
      { label: 'Moneda', value: md?.currency || 'EUR (€)', type: 'select', options: ['EUR (€)', 'USD ($)', 'GBP (£)', 'MXN ($)'] },
      { label: 'Envío gratuito desde', value: md?.freeShipping || '€50', type: 'text' },
      { label: 'Notificaciones de pedidos', value: '', type: 'toggle', enabled: true },
      { label: 'Alertas de stock bajo', value: '', type: 'toggle', enabled: true },
      { label: 'Emails de carrito abandonado', value: '', type: 'toggle', enabled: true },
      { label: 'Modo mantenimiento', value: '', type: 'toggle', enabled: false },
    ]

    const settContent = settingsForm(settingsFields)
    const settSection = section('settings', 'CONFIGURACIÓN', 'Ajustes de la Tienda',
      'Personaliza envíos, notificaciones, pagos y automatizaciones.',
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
<style>${designSystemCSS(c.primaryColor, c.accentColor, c.theme || 'bold')}</style>
</head>
<body>
${nav}
${notificationContainer()}
${hero}
${dashSection}
${productsSection}
${ordersSection}
${inventorySection}
${customersSection}
${anaSection}
${settSection}
${footer}
<script>${allScripts()}</script>
</body>
</html>`
  },
}

interface ProductItem {
  name: string
  price: string
  category: string
  stock: number
  badge: string
  badgeClass: string
  sku: string
  rating: string
}

interface InventoryItem {
  name: string
  sku: string
  stock: number
  max: number
  reorder: number
}

interface EcommerceMockData {
  heroTagline?: string
  heroSubtitle?: string
  monthlyOrders?: number
  monthlyRevenue?: number
  conversionRate?: number
  avgOrderValue?: number
  salesToday?: number
  ordersToday?: number
  convToday?: number
  cartAvg?: number
  topProducts?: BarChartItem[]
  alert1?: string
  alert2?: string
  alert3?: string
  alert4?: string
  alertCount?: number
  totalProducts?: number
  activeProducts?: number
  lowStock?: number
  avgRating?: number
  products?: ProductItem[]
  orders?: Record<string, string>[]
  inShipping?: number
  delivered?: number
  returns?: number
  inventoryItems?: InventoryItem[]
  totalSkus?: number
  lowStockCount?: number
  stockOk?: number
  inventoryValue?: number
  totalCustomers?: number
  vipCustomers?: number
  recurringPct?: number
  avgLtv?: number
  customers?: Record<string, string>[]
  salesByDay?: BarChartItem[]
  convPct?: number
  cartAbandon?: number
  returnCustomers?: number
  nps?: number
  monthlyRevenueStr?: string
  monthlyRevenueLabel?: string
  avgOrderStr?: string
  monthlyOrdersStr?: string
  marginStr?: string
  settingsEmail?: string
  currency?: string
  freeShipping?: string
}
