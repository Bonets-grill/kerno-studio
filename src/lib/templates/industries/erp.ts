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

export const erpTemplate: TemplateDefinition = {
  meta: {
    id: 'erp',
    name: 'ERP Empresarial',
    industries: ['erp', 'enterprise', 'gestión empresarial', 'business management', 'contabilidad', 'accounting', 'nóminas', 'payroll', 'inventario', 'inventory'],
    projectTypes: ['landing', 'mvp', 'system', 'saas'],
    sections: ['hero', 'dashboard', 'invoices', 'inventory', 'hr', 'reports', 'analytics', 'settings'],
    description: 'Plantilla premium para sistemas ERP y gestión empresarial. Dashboard financiero, facturación, control de inventario, gestión de RRHH, informes financieros y analytics de negocio.',
  },

  render(c: TemplateCustomization): string {
    const md = c.mockData as ErpMockData

    // ── Override CSS for corporate data-dense feel
    const overrideCSS = `
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');
body { font-family: 'IBM Plex Sans', sans-serif !important; }
.s-title, .hero-h1 { font-family: 'IBM Plex Sans', sans-serif !important; font-weight: 700; letter-spacing: -0.5px; }
.nav-brand { font-family: 'IBM Plex Sans', sans-serif !important; font-weight: 700; letter-spacing: 1px; }
.nav-link { font-family: 'IBM Plex Sans', sans-serif !important; font-weight: 500; font-size: 0.7rem !important; }
.nav { background: rgba(14,17,23,0.95) !important; border-bottom: 1px solid rgba(48,54,89,0.3) !important; height: 50px !important; }
.nav-links { gap: 0 !important; }
.nav-link { border-radius: 0 !important; padding: 6px 16px !important; border-bottom: 2px solid transparent; }
.nav-link.active { background: rgba(59,130,246,0.08) !important; color: var(--info) !important; border-bottom: 2px solid var(--info) !important; }
.nav-link:hover { background: rgba(59,130,246,0.05) !important; }
:root { --bg: #0e1117 !important; --bg-elevated: #151922 !important; --bg-card: #1a1f2e !important; --bg-card-hover: #1f2538 !important; }
.card { border: 1px solid rgba(48,54,89,0.3) !important; border-radius: 8px !important; }
.kpi { border: 1px solid rgba(48,54,89,0.3) !important; border-radius: 8px !important; border-left: 3px solid var(--info) !important; }
.badge { border-radius: 4px; font-family: 'IBM Plex Mono', monospace; }
.data-tbl { font-family: 'IBM Plex Sans', sans-serif; }
.data-tbl thead th { font-family: 'IBM Plex Sans', sans-serif; font-size: 0.62rem !important; }
.hero-btn { border-radius: 6px !important; text-transform: none; font-family: 'IBM Plex Sans', sans-serif; }
.s-label { font-family: 'IBM Plex Mono', monospace; letter-spacing: 3px; font-size: 0.62rem !important; }

.module-nav { display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 1rem; padding: 6px; background: var(--bg-elevated); border-radius: 8px; border: 1px solid rgba(48,54,89,0.2); }
.module-nav-item { padding: 6px 14px; border-radius: 6px; font-size: 0.68rem; font-weight: 600; color: var(--text-muted); cursor: pointer; transition: all 0.2s; background: none; border: none; font-family: 'IBM Plex Sans', sans-serif; }
.module-nav-item:hover { background: rgba(59,130,246,0.08); color: var(--text); }
.module-nav-item.active { background: rgba(59,130,246,0.15); color: var(--info); }

.inv-status { display: inline-flex; align-items: center; gap: 4px; }
.inv-dot { width: 6px; height: 6px; border-radius: 50%; }
.inv-dot.green { background: var(--success); }
.inv-dot.yellow { background: var(--warning); }
.inv-dot.red { background: var(--danger); }

.stock-alert { display: flex; align-items: center; gap: 8px; padding: 8px 12px; background: rgba(239,68,68,0.06); border: 1px solid rgba(239,68,68,0.15); border-radius: 6px; margin-bottom: 6px; font-size: 0.78rem; }
.stock-alert .stock-icon { color: var(--danger); font-weight: 700; }

.report-card { background: var(--bg-card); border: 1px solid rgba(48,54,89,0.3); border-radius: 8px; padding: 1.2rem; }
.report-label { font-size: 0.68rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; font-family: 'IBM Plex Mono', monospace; margin-bottom: 4px; }
.report-value { font-size: 1.6rem; font-weight: 700; }
.report-value.positive { color: var(--success); }
.report-value.negative { color: var(--danger); }
.report-change { font-size: 0.72rem; margin-top: 2px; }
.report-change.up { color: var(--success); }
.report-change.down { color: var(--danger); }

.hr-card { background: var(--bg-card); border: 1px solid rgba(48,54,89,0.3); border-radius: 8px; padding: 1rem; display: flex; align-items: center; gap: 12px; }
.hr-avatar { width: 40px; height: 40px; border-radius: 8px; background: linear-gradient(135deg, var(--primary), var(--info)); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.8rem; color: #fff; flex-shrink: 0; }
.hr-name { font-weight: 600; font-size: 0.88rem; }
.hr-dept { font-size: 0.72rem; color: var(--text-muted); }
.hr-salary { font-family: 'IBM Plex Mono', monospace; font-size: 0.82rem; font-weight: 600; color: var(--info); }

@media (max-width: 768px) {
  .module-nav { overflow-x: auto; flex-wrap: nowrap; }
}
`

    // ── Nav
    const nav = navBar(c.businessName, [
      { id: 'hero', label: 'Inicio' },
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'invoices', label: 'Facturación' },
      { id: 'inventory', label: 'Inventario' },
      { id: 'hr', label: 'RRHH' },
      { id: 'reports', label: 'Informes' },
      { id: 'analytics', label: 'Analytics' },
      { id: 'settings', label: 'Config' },
    ])

    // ── Module sub-nav (rendered inside hero)
    const moduleNav = `
    <div class="module-nav">
      <button class="module-nav-item active" onclick="showSection('dashboard')">📊 Finanzas</button>
      <button class="module-nav-item" onclick="showSection('invoices')">🧾 Facturación</button>
      <button class="module-nav-item" onclick="showSection('inventory')">📦 Inventario</button>
      <button class="module-nav-item" onclick="showSection('hr')">👥 RRHH</button>
      <button class="module-nav-item" onclick="showSection('reports')">📑 Informes</button>
      <button class="module-nav-item" onclick="showSection('analytics')">📈 Analytics</button>
    </div>`

    // ── Hero
    const hero = heroSection(
      c.businessName,
      md?.heroTagline || 'Tu empresa, bajo control total',
      md?.heroSubtitle || 'ERP integral: facturación, inventario, nóminas, contabilidad e informes financieros en una sola plataforma.',
      [
        { value: md?.monthlyRevenue || 284000, label: 'Facturación/Mes', prefix: '€' },
        { value: md?.monthlyProfit || 68500, label: 'Beneficio/Mes', prefix: '€' },
        { value: md?.totalEmployees || 47, label: 'Empleados' },
        { value: md?.activeProducts || 1284, label: 'Productos' },
      ],
      `Demo Interactivo — ${c.businessType || 'ERP'}`
    )

    // ── Dashboard
    const dashKpis: KpiData[] = [
      { icon: '💰', label: 'Ingresos Mes', value: md?.monthlyRevenue || 284000, prefix: '€', trend: { value: '+8.2% vs mes anterior', direction: 'up' } },
      { icon: '📉', label: 'Gastos Mes', value: md?.monthlyExpenses || 215500, prefix: '€', trend: { value: '+3.1%', direction: 'down' } },
      { icon: '📊', label: 'Beneficio Neto', value: md?.monthlyProfit || 68500, prefix: '€', trend: { value: '+18.4%', direction: 'up' } },
      { icon: '👥', label: 'Empleados', value: md?.totalEmployees || 47, trend: { value: '+2 este mes', direction: 'up' } },
    ]

    const revenueBreakdown: BarChartItem[] = md?.revenueBreakdown || [
      { label: 'Venta de productos', value: 184000, color: 'var(--info)' },
      { label: 'Servicios', value: 62000, color: 'var(--primary-light)' },
      { label: 'Suscripciones', value: 28000, color: 'var(--info)' },
      { label: 'Consultoría', value: 10000, color: 'var(--primary-light)' },
    ]

    const dashAlerts = [
      alertRow('🧾', md?.alert1 || '12 facturas pendientes de cobro por €34.200', 'Cobros', 'badge-red'),
      alertRow('📦', md?.alert2 || 'Stock bajo en 8 productos — pedido sugerido', 'Stock', 'badge-yellow'),
      alertRow('💳', md?.alert3 || 'Nóminas de abril pendientes de aprobación', 'Nóminas', 'badge-blue'),
      alertRow('📊', md?.alert4 || 'Cierre trimestral Q1 disponible para revisión', 'Contab.', 'badge-green'),
    ]

    const dashContent = `
      ${moduleNav}
      ${kpiGrid(dashKpis)}
      <div class="grid-2" style="margin-top:1.5rem">
        <div class="card">
          <div class="card-header"><h3>Desglose de Ingresos</h3><span class="badge badge-blue">Este mes</span></div>
          ${horizontalBarChart(revenueBreakdown)}
        </div>
        <div class="card">
          <div class="card-header"><h3>Alertas del Sistema</h3><span class="badge badge-primary">${md?.alertCount || 4} activas</span></div>
          ${dashAlerts.join('')}
        </div>
      </div>`

    const dashSection = section('dashboard', c.businessType?.toUpperCase() || 'ERP', 'Panel Financiero',
      'Vista consolidada de ingresos, gastos y métricas clave del negocio.',
      dashContent)

    // ── Invoices
    const invCols: TableColumn[] = [
      { label: 'Nº Factura', key: 'number' },
      { label: 'Cliente', key: 'client' },
      { label: 'Fecha', key: 'date' },
      { label: 'Vencimiento', key: 'due' },
      { label: 'Importe', key: 'amount', align: 'right' },
      { label: 'IVA', key: 'tax', align: 'right' },
      { label: 'Total', key: 'total', align: 'right' },
      { label: 'Estado', key: 'status' },
    ]
    const invRows = md?.invoices || [
      { number: '<span style="font-family:IBM Plex Mono,monospace">FAC-2026-0847</span>', client: 'TechSolutions S.L.', date: '01/04/2026', due: '01/05/2026', amount: '€12.500,00', tax: '€2.625,00', total: '€15.125,00', status: '<span class="badge badge-green">Cobrada</span>' },
      { number: '<span style="font-family:IBM Plex Mono,monospace">FAC-2026-0848</span>', client: 'Grupo Navarro S.A.', date: '03/04/2026', due: '03/05/2026', amount: '€8.400,00', tax: '€1.764,00', total: '€10.164,00', status: '<span class="badge badge-yellow">Pendiente</span>' },
      { number: '<span style="font-family:IBM Plex Mono,monospace">FAC-2026-0849</span>', client: 'María López (Autónoma)', date: '04/04/2026', due: '04/05/2026', amount: '€3.200,00', tax: '€672,00', total: '€3.872,00', status: '<span class="badge badge-green">Cobrada</span>' },
      { number: '<span style="font-family:IBM Plex Mono,monospace">FAC-2026-0850</span>', client: 'Distribuciones del Sur', date: '05/04/2026', due: '20/04/2026', amount: '€18.750,00', tax: '€3.937,50', total: '€22.687,50', status: '<span class="badge badge-red">Vencida</span>' },
      { number: '<span style="font-family:IBM Plex Mono,monospace">FAC-2026-0851</span>', client: 'Consultora Ibérica', date: '07/04/2026', due: '07/05/2026', amount: '€5.600,00', tax: '€1.176,00', total: '€6.776,00', status: '<span class="badge badge-yellow">Pendiente</span>' },
      { number: '<span style="font-family:IBM Plex Mono,monospace">FAC-2026-0852</span>', client: 'Ferretería Martín', date: '08/04/2026', due: '08/05/2026', amount: '€2.100,00', tax: '€441,00', total: '€2.541,00', status: '<span class="badge badge-green">Cobrada</span>' },
      { number: '<span style="font-family:IBM Plex Mono,monospace">FAC-2026-0853</span>', client: 'Industrias Prado S.L.', date: '09/04/2026', due: '09/05/2026', amount: '€27.300,00', tax: '€5.733,00', total: '€33.033,00', status: '<span class="badge badge-blue">Enviada</span>' },
    ]

    const invContent = `
      <div class="card" style="margin-bottom:1.5rem">
        <div class="card-header"><h3>Facturas Recientes</h3><span class="badge badge-blue">${md?.totalInvoices || 853} facturas</span></div>
        ${dataTable(invCols, invRows)}
      </div>
      <div class="grid-2">
        <div class="card">
          <div class="card-header"><h3>Estado de Facturación</h3></div>
          ${progressBar('Cobradas (€187.400)', 66, 'ok')}
          ${progressBar('Pendientes (€62.300)', 22, 'warn')}
          ${progressBar('Vencidas (€34.200)', 12, 'crit')}
        </div>
        <div class="card">
          <div class="card-header"><h3>Resumen Fiscal</h3></div>
          ${kpiGrid([
            { icon: '🧾', label: 'Emitidas Mes', value: md?.invoicesMonth || 47 },
            { icon: '💰', label: 'Facturado', value: md?.monthlyRevenue || 284000, prefix: '€' },
            { icon: '📊', label: 'IVA Repercutido', value: md?.vatCollected || 59640, prefix: '€' },
            { icon: '⏱️', label: 'Cobro Medio', value: md?.avgCollectionDays || '28 días' },
          ])}
        </div>
      </div>`

    const invSection = section('invoices', 'FACTURACIÓN', 'Gestión de Facturas',
      'Control completo de facturación, cobros y estado fiscal.',
      invContent)

    // ── Inventory
    const stockCols: TableColumn[] = [
      { label: 'SKU', key: 'sku' },
      { label: 'Producto', key: 'product' },
      { label: 'Categoría', key: 'category' },
      { label: 'Stock', key: 'stock', align: 'center' },
      { label: 'Mínimo', key: 'min', align: 'center' },
      { label: 'Precio', key: 'price', align: 'right' },
      { label: 'Estado', key: 'status' },
    ]
    const stockRows = md?.inventory || [
      { sku: '<span style="font-family:IBM Plex Mono,monospace">PRD-001</span>', product: 'Servidor Dell PowerEdge R750', category: 'Hardware', stock: '12', min: '5', price: '€4.850,00', status: '<span class="badge badge-green">OK</span>' },
      { sku: '<span style="font-family:IBM Plex Mono,monospace">PRD-002</span>', product: 'Licencia Microsoft 365 E3', category: 'Software', stock: '340', min: '50', price: '€264,00', status: '<span class="badge badge-green">OK</span>' },
      { sku: '<span style="font-family:IBM Plex Mono,monospace">PRD-003</span>', product: 'Monitor LG UltraWide 34"', category: 'Periféricos', stock: '3', min: '10', price: '€589,00', status: '<span class="badge badge-red">Bajo</span>' },
      { sku: '<span style="font-family:IBM Plex Mono,monospace">PRD-004</span>', product: 'Cable Cat6 (100m)', category: 'Infraestructura', stock: '45', min: '20', price: '€78,50', status: '<span class="badge badge-green">OK</span>' },
      { sku: '<span style="font-family:IBM Plex Mono,monospace">PRD-005</span>', product: 'Router Cisco Meraki MX68', category: 'Networking', stock: '2', min: '5', price: '€1.240,00', status: '<span class="badge badge-red">Bajo</span>' },
      { sku: '<span style="font-family:IBM Plex Mono,monospace">PRD-006</span>', product: 'Teclado Logitech MX Keys', category: 'Periféricos', stock: '28', min: '15', price: '€109,00', status: '<span class="badge badge-green">OK</span>' },
      { sku: '<span style="font-family:IBM Plex Mono,monospace">PRD-007</span>', product: 'SSD Samsung 1TB NVMe', category: 'Componentes', stock: '4', min: '10', price: '€128,00', status: '<span class="badge badge-yellow">Medio</span>' },
      { sku: '<span style="font-family:IBM Plex Mono,monospace">PRD-008</span>', product: 'Silla ergonómica Herman Miller', category: 'Mobiliario', stock: '7', min: '3', price: '€1.450,00', status: '<span class="badge badge-green">OK</span>' },
    ]

    const lowStockAlerts = `
      <div class="stock-alert"><span class="stock-icon">⚠️</span> <strong>Monitor LG UltraWide 34"</strong> — 3 uds. (mínimo: 10) <span class="badge badge-red" style="margin-left:auto">Pedir ahora</span></div>
      <div class="stock-alert"><span class="stock-icon">⚠️</span> <strong>Router Cisco Meraki MX68</strong> — 2 uds. (mínimo: 5) <span class="badge badge-red" style="margin-left:auto">Pedir ahora</span></div>
      <div class="stock-alert"><span class="stock-icon">⚠️</span> <strong>SSD Samsung 1TB NVMe</strong> — 4 uds. (mínimo: 10) <span class="badge badge-yellow" style="margin-left:auto">Reponer pronto</span></div>`

    const stockByCategory: BarChartItem[] = md?.stockByCategory || [
      { label: 'Software (licencias)', value: 340, color: 'var(--info)' },
      { label: 'Infraestructura', value: 45, color: 'var(--primary-light)' },
      { label: 'Periféricos', value: 31, color: 'var(--info)' },
      { label: 'Hardware', value: 12, color: 'var(--primary-light)' },
      { label: 'Mobiliario', value: 7, color: 'var(--info)' },
    ]

    const invtContent = `
      <div class="card" style="margin-bottom:1.5rem">
        <div class="card-header"><h3>Inventario</h3><span class="badge badge-blue">${md?.totalProducts || 1284} productos</span></div>
        ${dataTable(stockCols, stockRows)}
      </div>
      <div class="grid-2">
        <div class="card">
          <div class="card-header"><h3>Alertas de Stock</h3><span class="badge badge-red">${md?.lowStockCount || 3} bajo mínimo</span></div>
          ${lowStockAlerts}
        </div>
        <div class="card">
          <div class="card-header"><h3>Stock por Categoría</h3></div>
          ${horizontalBarChart(stockByCategory)}
        </div>
      </div>`

    const invtSection = section('inventory', 'INVENTARIO', 'Control de Inventario',
      'Gestión de stock en tiempo real con alertas automáticas de reposición.',
      invtContent)

    // ── HR
    const hrCols: TableColumn[] = [
      { label: 'Empleado', key: 'name' },
      { label: 'Departamento', key: 'dept' },
      { label: 'Puesto', key: 'role' },
      { label: 'Antigüedad', key: 'seniority' },
      { label: 'Salario Bruto', key: 'salary', align: 'right' },
      { label: 'Estado', key: 'status' },
    ]
    const hrRows = md?.employees || [
      { name: 'Alberto Fernández', dept: '<span class="badge badge-blue">Tecnología</span>', role: 'CTO', seniority: '6 años', salary: '€72.000', status: '<span class="badge badge-green">Activo</span>' },
      { name: 'Carmen Gutiérrez', dept: '<span class="badge badge-purple">Comercial</span>', role: 'Dir. Comercial', seniority: '4 años', salary: '€58.000', status: '<span class="badge badge-green">Activo</span>' },
      { name: 'David Morales', dept: '<span class="badge badge-blue">Tecnología</span>', role: 'Sr. Developer', seniority: '3 años', salary: '€48.000', status: '<span class="badge badge-green">Activo</span>' },
      { name: 'Elena Prieto', dept: '<span class="badge badge-yellow">Finanzas</span>', role: 'Controller', seniority: '5 años', salary: '€52.000', status: '<span class="badge badge-green">Activo</span>' },
      { name: 'Fernando Ruiz', dept: '<span class="badge badge-blue">Tecnología</span>', role: 'DevOps Engineer', seniority: '2 años', salary: '€44.000', status: '<span class="badge badge-green">Activo</span>' },
      { name: 'Gloria Martín', dept: '<span class="badge badge-green">RRHH</span>', role: 'HR Manager', seniority: '4 años', salary: '€46.000', status: '<span class="badge badge-green">Activo</span>' },
      { name: 'Hugo Navarro', dept: '<span class="badge badge-purple">Comercial</span>', role: 'Account Manager', seniority: '1 año', salary: '€34.000', status: '<span class="badge badge-green">Activo</span>' },
      { name: 'Irene Soto', dept: '<span class="badge badge-yellow">Finanzas</span>', role: 'Contable', seniority: '3 años', salary: '€36.000', status: '<span class="badge badge-blue">Vacaciones</span>' },
    ]

    const deptDistribution: BarChartItem[] = md?.deptDistribution || [
      { label: 'Tecnología', value: 18, color: 'var(--info)' },
      { label: 'Comercial', value: 12, color: '#a855f7' },
      { label: 'Finanzas', value: 7, color: 'var(--warning)' },
      { label: 'RRHH', value: 4, color: 'var(--success)' },
      { label: 'Operaciones', value: 6, color: 'var(--primary-light)' },
    ]

    const hrContent = `
      <div class="card" style="margin-bottom:1.5rem">
        <div class="card-header"><h3>Plantilla</h3><span class="badge badge-blue">${md?.totalEmployees || 47} empleados</span></div>
        ${dataTable(hrCols, hrRows)}
      </div>
      <div class="grid-2">
        <div class="card">
          <div class="card-header"><h3>Distribución por Departamento</h3></div>
          ${horizontalBarChart(deptDistribution)}
        </div>
        <div class="card">
          <div class="card-header"><h3>RRHH Resumen</h3></div>
          ${kpiGrid([
            { icon: '👥', label: 'Plantilla Total', value: md?.totalEmployees || 47 },
            { icon: '💰', label: 'Masa Salarial/Mes', value: md?.monthlySalary || 178000, prefix: '€' },
            { icon: '🏖️', label: 'De Vacaciones', value: md?.onVacation || 3 },
            { icon: '📋', label: 'Contrataciones Q2', value: md?.q2Hires || 5 },
          ])}
        </div>
      </div>`

    const hrSection = section('hr', 'RRHH', 'Gestión de Personal',
      'Nóminas, plantilla, vacaciones y organigrama empresarial.',
      hrContent)

    // ── Reports
    const reportCards = `
      <div class="grid-4" style="margin-bottom:1.5rem">
        <div class="report-card">
          <div class="report-label">Ingresos Q1</div>
          <div class="report-value positive">€842.000</div>
          <div class="report-change up">↑ +12.3% vs Q1 2025</div>
        </div>
        <div class="report-card">
          <div class="report-label">Gastos Q1</div>
          <div class="report-value">€638.400</div>
          <div class="report-change down">↑ +5.1% vs Q1 2025</div>
        </div>
        <div class="report-card">
          <div class="report-label">EBITDA Q1</div>
          <div class="report-value positive">€203.600</div>
          <div class="report-change up">↑ +28.7% vs Q1 2025</div>
        </div>
        <div class="report-card">
          <div class="report-label">Margen Neto</div>
          <div class="report-value positive">24.2%</div>
          <div class="report-change up">↑ +3.1pp vs Q1 2025</div>
        </div>
      </div>`

    const expenseBreakdown: BarChartItem[] = md?.expenseBreakdown || [
      { label: 'Nóminas y SS', value: 534000, color: 'var(--info)' },
      { label: 'Proveedores', value: 248000, color: 'var(--primary-light)' },
      { label: 'Alquiler oficinas', value: 72000, color: 'var(--info)' },
      { label: 'Marketing', value: 45000, color: 'var(--primary-light)' },
      { label: 'Software y licencias', value: 28000, color: 'var(--info)' },
      { label: 'Otros gastos', value: 18400, color: 'var(--primary-light)' },
    ]

    const plSteps: StepData[] = [
      { title: 'Facturación bruta: €842.000', description: 'Ingresos totales antes de impuestos y deducciones.', detail: 'Venta de productos: €552K | Servicios: €186K | Suscripciones: €84K | Consultoría: €20K', icon: '💰' },
      { title: 'Coste de ventas: -€312.000', description: 'Costes directos asociados a la producción y entrega.', detail: 'Margen bruto: €530.000 (63%)', icon: '📦' },
      { title: 'Gastos operativos: -€326.400', description: 'Nóminas, alquileres, marketing y gastos generales.', detail: 'Nóminas: €178K | Alquiler: €24K | Marketing: €15K | Otros: €109.4K', icon: '🏢' },
      { title: 'EBITDA: €203.600', description: 'Beneficio antes de intereses, impuestos, depreciación y amortización.', detail: 'Margen EBITDA: 24.2%', icon: '📊' },
    ]

    const repContent = `
      ${reportCards}
      <div class="grid-2">
        <div class="card">
          <div class="card-header"><h3>Desglose de Gastos Q1</h3></div>
          ${horizontalBarChart(expenseBreakdown)}
        </div>
        <div class="card">
          <div class="card-header"><h3>Cuenta de Resultados</h3></div>
          ${stepProcess(plSteps, 'var(--info)')}
        </div>
      </div>`

    const repSection = section('reports', 'INFORMES', 'Informes Financieros',
      'Cuenta de resultados, balance y KPIs financieros trimestrales.',
      repContent)

    // ── Analytics
    const revenueByMonth: BarChartItem[] = md?.revenueByMonth || [
      { label: 'Enero', value: 268000 },
      { label: 'Febrero', value: 274000 },
      { label: 'Marzo', value: 300000 },
      { label: 'Abril', value: 284000 },
    ]

    const anaContent = `
      ${bigResult(
        md?.annualRevenue || '€3.41M',
        md?.annualLabel || 'Facturación Anual Proyectada',
        [
          { title: md?.yearlyGrowth || '+14.2%', subtitle: 'Crecimiento Anual' },
          { title: md?.avgMargin || '24.2%', subtitle: 'Margen Neto' },
          { title: md?.cashflow || '€890K', subtitle: 'Cash Flow Libre' },
        ]
      )}
      <div class="grid-2" style="margin-top:1.5rem">
        <div class="card">
          <div class="card-header"><h3>Ingresos Mensuales</h3></div>
          ${horizontalBarChart(revenueByMonth)}
        </div>
        <div class="card">
          <div class="card-header"><h3>Indicadores Operativos</h3></div>
          ${progressBar('Eficiencia operativa', md?.opEfficiency || 87, 'ok')}
          ${progressBar('Satisfacción clientes (NPS)', md?.nps || 72, 'ok')}
          ${progressBar('Retención de clientes', md?.clientRetention || 91, 'ok')}
          ${progressBar('Utilización de recursos', md?.resourceUtil || 78, 'primary')}
          ${progressBar('Deuda / Patrimonio', md?.debtRatio || 32, 'ok')}
        </div>
      </div>`

    const anaSection = section('analytics', 'ANALYTICS', 'Rendimiento Global',
      'Métricas de negocio, crecimiento y eficiencia operativa.',
      anaContent)

    // ── Settings
    const settingsFields: SettingsField[] = [
      { label: 'Razón social', value: c.businessName, type: 'text' },
      { label: 'CIF', value: md?.cif || 'B-12345678', type: 'text' },
      { label: 'Email de facturación', value: md?.email || 'admin@' + c.businessName.toLowerCase().replace(/\s/g, '') + '.com', type: 'email' },
      { label: 'Moneda', value: md?.currency || 'EUR (€)', type: 'text' },
      { label: 'Facturación automática recurrente', value: '', type: 'toggle', enabled: true },
      { label: 'Alertas de stock bajo', value: '', type: 'toggle', enabled: true },
      { label: 'Aprobación de nóminas manual', value: '', type: 'toggle', enabled: true },
      { label: 'Cierre contable automático', value: '', type: 'toggle', enabled: false },
    ]

    const settContent = settingsForm(settingsFields)
    const settSection = section('settings', 'CONFIGURACIÓN', 'Ajustes del Sistema',
      'Personaliza facturación, inventario y procesos de RRHH.',
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
<style>${designSystemCSS(c.primaryColor, c.accentColor, c.theme || 'minimal')}
${overrideCSS}</style>
</head>
<body>
${nav}
${notificationContainer()}
${hero}
${dashSection}
${invSection}
${invtSection}
${hrSection}
${repSection}
${anaSection}
${settSection}
${footer}
<script>${allScripts()}</script>
</body>
</html>`
  },
}

interface ErpMockData {
  heroTagline?: string
  heroSubtitle?: string
  monthlyRevenue?: number
  monthlyExpenses?: number
  monthlyProfit?: number
  totalEmployees?: number
  activeProducts?: number
  revenueBreakdown?: BarChartItem[]
  alert1?: string
  alert2?: string
  alert3?: string
  alert4?: string
  alertCount?: number
  invoices?: Record<string, string>[]
  totalInvoices?: number
  invoicesMonth?: number
  vatCollected?: number
  avgCollectionDays?: string
  inventory?: Record<string, string>[]
  totalProducts?: number
  lowStockCount?: number
  stockByCategory?: BarChartItem[]
  employees?: Record<string, string>[]
  monthlySalary?: number
  onVacation?: number
  q2Hires?: number
  deptDistribution?: BarChartItem[]
  expenseBreakdown?: BarChartItem[]
  revenueByMonth?: BarChartItem[]
  annualRevenue?: string
  annualLabel?: string
  yearlyGrowth?: string
  avgMargin?: string
  cashflow?: string
  opEfficiency?: number
  nps?: number
  clientRetention?: number
  resourceUtil?: number
  debtRatio?: number
  email?: string
  cif?: string
  currency?: string
}
