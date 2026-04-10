import type { TemplateDefinition, TemplateCustomization } from '../types'
import { designSystemCSS } from '../shared/design-system'
import { allScripts } from '../shared/scripts'
import {
  navBar, heroSection, notificationContainer, section,
  kpiGrid, dataTable, progressBar, horizontalBarChart,
  settingsForm, alertRow, bigResult,
  type KpiData, type TableColumn, type BarChartItem, type SettingsField,
} from '../shared/components'

export const accountingTemplate: TemplateDefinition = {
  meta: {
    id: 'accounting',
    name: 'Contabilidad & Finanzas',
    industries: ['accounting', 'contabilidad', 'facturación', 'invoicing', 'impuestos', 'taxes', 'fiscal', 'finanzas', 'finance', 'bookkeeping'],
    projectTypes: ['landing', 'mvp', 'system', 'saas'],
    sections: ['hero', 'dashboard', 'invoices', 'expenses', 'tax-summary', 'bank', 'analytics', 'settings'],
    description: 'Plantilla premium para contabilidad y finanzas. Dashboard con KPIs de ingresos y gastos, gestión de facturas, control de gastos por categoría, resumen fiscal con IGIC/IVA, movimientos bancarios, analytics financieros y configuración.',
  },

  render(c: TemplateCustomization): string {
    const md = c.mockData as AccountingMockData

    // ── Nav
    const nav = navBar(c.businessName, [
      { id: 'hero', label: 'Inicio' },
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'invoices', label: 'Facturas' },
      { id: 'expenses', label: 'Gastos' },
      { id: 'tax-summary', label: 'Impuestos' },
      { id: 'bank', label: 'Banco' },
      { id: 'analytics', label: 'Analytics' },
      { id: 'settings', label: 'Config' },
    ])

    // ── Hero
    const hero = heroSection(
      c.businessName,
      md?.heroTagline || `${c.businessName} — Control Financiero Total`,
      md?.heroSubtitle || 'Facturación, gastos, impuestos y conciliación bancaria automatizada. Todo en un solo panel.',
      [
        { value: md?.monthlyRevenue || 127450, label: 'Ingresos/Mes', prefix: '€' },
        { value: md?.monthlyExpenses || 82300, label: 'Gastos/Mes', prefix: '€' },
        { value: md?.profit || 45150, label: 'Beneficio', prefix: '€' },
        { value: md?.pendingInvoices || 18, label: 'Facturas Pendientes' },
      ],
      `Demo Interactivo — ${c.businessType || 'Contabilidad'}`
    )

    // ── Dashboard
    const dashKpis: KpiData[] = [
      { icon: '📈', label: 'Ingresos (Abril)', value: md?.monthlyRevenue || 127450, prefix: '€', trend: { value: '+12.4%', direction: 'up' } },
      { icon: '📉', label: 'Gastos (Abril)', value: md?.monthlyExpenses || 82300, prefix: '€', trend: { value: '+3.2%', direction: 'up' } },
      { icon: '💰', label: 'Beneficio Neto', value: md?.profit || 45150, prefix: '€', trend: { value: '+28.1%', direction: 'up' } },
      { icon: '🏛️', label: 'Impuestos Pendientes', value: md?.taxDue || 14280, prefix: '€', trend: { value: 'Vence 20/04', direction: 'neutral' } },
    ]

    const revenueByMonth: BarChartItem[] = md?.revenueByMonth || [
      { label: 'Enero', value: 98200, color: 'var(--primary-light)' },
      { label: 'Febrero', value: 105400, color: 'var(--primary-light)' },
      { label: 'Marzo', value: 118900, color: 'var(--primary-light)' },
      { label: 'Abril', value: 127450, color: 'var(--accent)' },
    ]

    const dashAlerts = [
      alertRow('⚠️', md?.alert1 || '8 facturas vencidas por cobrar — 23.400 €', 'Cobros', 'badge-red'),
      alertRow('🏛️', md?.alert2 || 'Modelo 303 (IVA/IGIC) — vence 20/04/2026', 'Fiscal', 'badge-yellow'),
      alertRow('🏦', md?.alert3 || '3 movimientos bancarios sin conciliar', 'Banco', 'badge-blue'),
      alertRow('📄', md?.alert4 || '2 facturas borrador pendientes de envío', 'Facturas', 'badge-purple'),
    ]

    const dashContent = `
      ${kpiGrid(dashKpis)}
      <div class="grid-2" style="margin-top:1.5rem">
        <div class="card">
          <div class="card-header"><h3>Evolución Ingresos</h3><span class="badge badge-accent">2026</span></div>
          ${horizontalBarChart(revenueByMonth, 140000)}
        </div>
        <div class="card">
          <div class="card-header"><h3>Alertas Financieras</h3><span class="badge badge-primary">${md?.alertCount || 4} activas</span></div>
          ${dashAlerts.join('')}
        </div>
      </div>`

    const dashSection = section('dashboard', c.businessType?.toUpperCase() || 'CONTABILIDAD', 'Panel de Control',
      'Vista en tiempo real de la salud financiera de tu negocio.',
      dashContent)

    // ── Invoices
    const invCols: TableColumn[] = [
      { label: 'N.o Factura', key: 'number' },
      { label: 'Cliente', key: 'client' },
      { label: 'Fecha', key: 'date' },
      { label: 'Vencimiento', key: 'due' },
      { label: 'Base', key: 'base', align: 'right' },
      { label: 'IGIC/IVA', key: 'tax', align: 'right' },
      { label: 'Total', key: 'total', align: 'right' },
      { label: 'Estado', key: 'status' },
    ]
    const invRows = md?.invoices || [
      { number: 'FAC-2026-001', client: 'TechSoluciones SL', date: '01/04/2026', due: '01/05/2026', base: '8.500,00 €', tax: '595,00 €', total: '9.095,00 €', status: '<span class="badge badge-green">Cobrada</span>' },
      { number: 'FAC-2026-002', client: 'Distribuciones Canarias', date: '03/04/2026', due: '03/05/2026', base: '12.300,00 €', tax: '861,00 €', total: '13.161,00 €', status: '<span class="badge badge-green">Cobrada</span>' },
      { number: 'FAC-2026-003', client: 'Hotel Atlántico Premium', date: '05/04/2026', due: '05/05/2026', base: '5.800,00 €', tax: '406,00 €', total: '6.206,00 €', status: '<span class="badge badge-yellow">Pendiente</span>' },
      { number: 'FAC-2026-004', client: 'Restaurante El Faro', date: '08/04/2026', due: '08/05/2026', base: '3.200,00 €', tax: '224,00 €', total: '3.424,00 €', status: '<span class="badge badge-yellow">Pendiente</span>' },
      { number: 'FAC-2026-005', client: 'Clínica Bienestar', date: '10/04/2026', due: '25/03/2026', base: '15.600,00 €', tax: '1.092,00 €', total: '16.692,00 €', status: '<span class="badge badge-red">Vencida</span>' },
      { number: 'FAC-2026-006', client: 'Constructora Meridiano', date: '12/04/2026', due: '12/05/2026', base: '22.100,00 €', tax: '1.547,00 €', total: '23.647,00 €', status: '<span class="badge badge-blue">Borrador</span>' },
      { number: 'FAC-2026-007', client: 'Academia Digital Pro', date: '14/04/2026', due: '14/05/2026', base: '4.750,00 €', tax: '332,50 €', total: '5.082,50 €', status: '<span class="badge badge-green">Cobrada</span>' },
      { number: 'FAC-2026-008', client: 'Logística Express', date: '15/04/2026', due: '15/05/2026', base: '9.400,00 €', tax: '658,00 €', total: '10.058,00 €', status: '<span class="badge badge-yellow">Pendiente</span>' },
    ]

    const invContent = `
      ${kpiGrid([
        { icon: '📄', label: 'Facturas Emitidas (Abril)', value: md?.issuedInvoices || 28, trend: { value: '+5 vs marzo', direction: 'up' } },
        { icon: '✅', label: 'Cobradas', value: md?.paidInvoices || 18 },
        { icon: '⏳', label: 'Pendientes de Cobro', value: md?.pendingAmount || 42580, prefix: '€' },
        { icon: '🔴', label: 'Vencidas', value: md?.overdueAmount || 23400, prefix: '€', trend: { value: '3 facturas', direction: 'down' } },
      ])}
      <div class="card" style="margin-top:1.5rem">
        <div class="card-header"><h3>Facturas Recientes</h3><span class="badge badge-primary">Abril 2026</span></div>
        ${dataTable(invCols, invRows)}
      </div>`

    const invSection = section('invoices', 'FACTURACIÓN', 'Gestión de Facturas',
      'Emite, gestiona y controla el cobro de todas tus facturas.',
      invContent)

    // ── Expenses
    const expCategories: BarChartItem[] = md?.expCategories || [
      { label: 'Salarios y SS', value: 48200, color: 'var(--primary-light)' },
      { label: 'Alquiler Oficina', value: 4500, color: 'var(--accent)' },
      { label: 'Proveedores', value: 12800, color: 'var(--primary-light)' },
      { label: 'Software y Licencias', value: 3200, color: 'var(--accent)' },
      { label: 'Marketing', value: 5600, color: 'var(--primary-light)' },
      { label: 'Suministros', value: 2100, color: 'var(--accent)' },
      { label: 'Viajes y Dietas', value: 3400, color: 'var(--primary-light)' },
      { label: 'Otros', value: 2500, color: 'var(--text-muted)' },
    ]

    const expCols: TableColumn[] = [
      { label: 'Fecha', key: 'date' },
      { label: 'Concepto', key: 'concept' },
      { label: 'Categoría', key: 'category' },
      { label: 'Proveedor', key: 'provider' },
      { label: 'Importe', key: 'amount', align: 'right' },
      { label: 'Estado', key: 'status' },
    ]
    const expRows = md?.expenses || [
      { date: '01/04/2026', concept: 'Nóminas Marzo', category: 'Salarios', provider: 'Nóminas SL', amount: '48.200,00 €', status: '<span class="badge badge-green">Pagado</span>' },
      { date: '01/04/2026', concept: 'Alquiler Oficina Abril', category: 'Alquiler', provider: 'Inmobiliaria Centro', amount: '4.500,00 €', status: '<span class="badge badge-green">Pagado</span>' },
      { date: '03/04/2026', concept: 'Licencias Adobe CC', category: 'Software', provider: 'Adobe Systems', amount: '890,00 €', status: '<span class="badge badge-green">Pagado</span>' },
      { date: '05/04/2026', concept: 'Campaña Google Ads', category: 'Marketing', provider: 'Google Ireland', amount: '2.800,00 €', status: '<span class="badge badge-green">Pagado</span>' },
      { date: '07/04/2026', concept: 'Material Oficina', category: 'Suministros', provider: 'Office Depot', amount: '345,60 €', status: '<span class="badge badge-yellow">Pendiente</span>' },
      { date: '10/04/2026', concept: 'Viaje comercial Madrid', category: 'Viajes', provider: 'Iberia + Hotel', amount: '1.240,00 €', status: '<span class="badge badge-yellow">Pendiente</span>' },
      { date: '12/04/2026', concept: 'Servidores AWS', category: 'Software', provider: 'Amazon Web Services', amount: '1.680,00 €', status: '<span class="badge badge-green">Pagado</span>' },
      { date: '14/04/2026', concept: 'Consultoría Legal', category: 'Otros', provider: 'Bufete Pérez & Asociados', amount: '2.500,00 €', status: '<span class="badge badge-blue">Factura recibida</span>' },
    ]

    const expContent = `
      ${kpiGrid([
        { icon: '💸', label: 'Gastos Totales (Abril)', value: md?.totalExpenses || 82300, prefix: '€', trend: { value: '+3.2%', direction: 'up' } },
        { icon: '📊', label: 'Gasto Medio Diario', value: md?.dailyExpAvg || 2743, prefix: '€' },
        { icon: '📋', label: 'Facturas Proveedor', value: md?.supplierInvoices || 34 },
        { icon: '⏳', label: 'Pagos Pendientes', value: md?.pendingPayments || 6840, prefix: '€' },
      ])}
      <div class="grid-2" style="margin-top:1.5rem">
        <div class="card">
          <div class="card-header"><h3>Gastos por Categoría</h3><span class="badge badge-accent">Abril 2026</span></div>
          ${horizontalBarChart(expCategories, 50000)}
        </div>
        <div class="card" style="grid-column:1/-1">
          <div class="card-header"><h3>Últimos Gastos</h3></div>
          ${dataTable(expCols, expRows)}
        </div>
      </div>`

    const expSection = section('expenses', 'GASTOS', 'Control de Gastos',
      'Registra y categoriza todos los gastos del negocio para un control financiero preciso.',
      expContent)

    // ── Tax Summary
    const taxCols: TableColumn[] = [
      { label: 'Trimestre', key: 'quarter' },
      { label: 'Base Imponible', key: 'base', align: 'right' },
      { label: 'IVA/IGIC Repercutido', key: 'taxCollected', align: 'right' },
      { label: 'IVA/IGIC Soportado', key: 'taxPaid', align: 'right' },
      { label: 'A Ingresar', key: 'toPay', align: 'right' },
      { label: 'Estado', key: 'status' },
    ]
    const taxRows = md?.taxQuarters || [
      { quarter: 'Q1 2026 (Ene-Mar)', base: '352.500,00 €', taxCollected: '24.675,00 €', taxPaid: '14.820,00 €', toPay: '9.855,00 €', status: '<span class="badge badge-green">Presentado</span>' },
      { quarter: 'Q2 2026 (Abr-Jun)', base: '127.450,00 €', taxCollected: '8.921,50 €', taxPaid: '5.761,00 €', toPay: '3.160,50 €', status: '<span class="badge badge-yellow">En curso</span>' },
      { quarter: 'Q3 2026 (Jul-Sep)', base: '—', taxCollected: '—', taxPaid: '—', toPay: '—', status: '<span class="badge badge-blue">Futuro</span>' },
      { quarter: 'Q4 2026 (Oct-Dic)', base: '—', taxCollected: '—', taxPaid: '—', toPay: '—', status: '<span class="badge badge-blue">Futuro</span>' },
    ]

    const taxModels: TableColumn[] = [
      { label: 'Modelo', key: 'model' },
      { label: 'Descripción', key: 'desc' },
      { label: 'Periodo', key: 'period' },
      { label: 'Importe', key: 'amount', align: 'right' },
      { label: 'Vencimiento', key: 'due' },
      { label: 'Estado', key: 'status' },
    ]
    const taxModelRows = md?.taxModels || [
      { model: '303', desc: 'IVA / IGIC Trimestral', period: 'Q1 2026', amount: '9.855,00 €', due: '20/04/2026', status: '<span class="badge badge-green">Presentado</span>' },
      { model: '111', desc: 'Retenciones IRPF', period: 'Q1 2026', amount: '4.320,00 €', due: '20/04/2026', status: '<span class="badge badge-green">Presentado</span>' },
      { model: '115', desc: 'Retenciones Alquileres', period: 'Q1 2026', amount: '2.700,00 €', due: '20/04/2026', status: '<span class="badge badge-green">Presentado</span>' },
      { model: '130', desc: 'Pago Fraccionado IRPF', period: 'Q1 2026', amount: '3.840,00 €', due: '20/04/2026', status: '<span class="badge badge-yellow">Pendiente</span>' },
      { model: '200', desc: 'Impuesto Sociedades', period: 'Anual 2025', amount: '18.450,00 €', due: '25/07/2026', status: '<span class="badge badge-blue">Futuro</span>' },
    ]

    const taxContent = `
      ${kpiGrid([
        { icon: '🏛️', label: 'IGIC/IVA Repercutido (Q2)', value: md?.taxCollectedQ2 || 8921, prefix: '€' },
        { icon: '📥', label: 'IGIC/IVA Soportado (Q2)', value: md?.taxPaidQ2 || 5761, prefix: '€' },
        { icon: '💳', label: 'A Ingresar (Q2)', value: md?.taxDueQ2 || 3160, prefix: '€', trend: { value: 'Vence 20/07', direction: 'neutral' } },
        { icon: '📊', label: 'Tipo Aplicado', value: md?.taxRate || '7%', prefix: '' },
      ])}
      <div class="card" style="margin:1.5rem 0">
        <div class="card-header"><h3>Resumen Trimestral IGIC/IVA</h3><span class="badge badge-accent">2026</span></div>
        ${dataTable(taxCols, taxRows)}
      </div>
      <div class="card">
        <div class="card-header"><h3>Modelos Fiscales</h3><span class="badge badge-primary">Obligaciones</span></div>
        ${dataTable(taxModels, taxModelRows)}
      </div>`

    const taxSection = section('tax-summary', 'IMPUESTOS', 'Resumen Fiscal',
      'Control completo de obligaciones fiscales, modelos trimestrales y anuales.',
      taxContent)

    // ── Bank
    const bankCols: TableColumn[] = [
      { label: 'Fecha', key: 'date' },
      { label: 'Concepto', key: 'concept' },
      { label: 'Referencia', key: 'ref' },
      { label: 'Cargo', key: 'debit', align: 'right' },
      { label: 'Abono', key: 'credit', align: 'right' },
      { label: 'Saldo', key: 'balance', align: 'right' },
      { label: 'Conciliado', key: 'reconciled', align: 'center' },
    ]
    const bankRows = md?.bankTransactions || [
      { date: '15/04/2026', concept: 'Cobro FAC-2026-007 — Academia Digital Pro', ref: 'TRF-8842', debit: '', credit: '5.082,50 €', balance: '89.340,20 €', reconciled: '<span class="badge badge-green">Si</span>' },
      { date: '14/04/2026', concept: 'Pago Consultoría Legal', ref: 'TRF-8841', debit: '2.500,00 €', credit: '', balance: '84.257,70 €', reconciled: '<span class="badge badge-green">Si</span>' },
      { date: '12/04/2026', concept: 'Pago AWS Servidores', ref: 'DD-4421', debit: '1.680,00 €', credit: '', balance: '86.757,70 €', reconciled: '<span class="badge badge-green">Si</span>' },
      { date: '10/04/2026', concept: 'Cobro FAC-2026-002 — Distribuciones Canarias', ref: 'TRF-8838', debit: '', credit: '13.161,00 €', balance: '88.437,70 €', reconciled: '<span class="badge badge-green">Si</span>' },
      { date: '08/04/2026', concept: 'Transferencia recibida — sin identificar', ref: 'TRF-8835', debit: '', credit: '3.200,00 €', balance: '75.276,70 €', reconciled: '<span class="badge badge-yellow">No</span>' },
      { date: '05/04/2026', concept: 'Google Ads — Campaña Abril', ref: 'DD-4418', debit: '2.800,00 €', credit: '', balance: '72.076,70 €', reconciled: '<span class="badge badge-green">Si</span>' },
      { date: '03/04/2026', concept: 'Movimiento desconocido', ref: 'TRF-8830', debit: '450,00 €', credit: '', balance: '74.876,70 €', reconciled: '<span class="badge badge-yellow">No</span>' },
      { date: '01/04/2026', concept: 'Nóminas Marzo — Transferencia masiva', ref: 'TRF-8828', debit: '48.200,00 €', credit: '', balance: '75.326,70 €', reconciled: '<span class="badge badge-green">Si</span>' },
    ]

    const bankContent = `
      ${kpiGrid([
        { icon: '🏦', label: 'Saldo Actual', value: md?.currentBalance || 89340, prefix: '€', trend: { value: '+14.2% vs mes ant.', direction: 'up' } },
        { icon: '📥', label: 'Ingresos (Abril)', value: md?.bankIncome || 34620, prefix: '€' },
        { icon: '📤', label: 'Pagos (Abril)', value: md?.bankOutcome || 58430, prefix: '€' },
        { icon: '⚠️', label: 'Sin Conciliar', value: md?.unreconciled || 3, trend: { value: '3.650 €', direction: 'neutral' } },
      ])}
      <div class="card" style="margin-top:1.5rem">
        <div class="card-header"><h3>Movimientos Bancarios</h3><span class="badge badge-accent">CaixaBank ****4821</span></div>
        ${dataTable(bankCols, bankRows)}
      </div>`

    const bankSection = section('bank', 'BANCO', 'Conciliación Bancaria',
      'Sincroniza movimientos bancarios y concilia automáticamente con facturas y gastos.',
      bankContent)

    // ── Analytics
    const marginByMonth: BarChartItem[] = md?.marginByMonth || [
      { label: 'Enero', value: 32, color: 'var(--success)' },
      { label: 'Febrero', value: 34, color: 'var(--success)' },
      { label: 'Marzo', value: 30, color: 'var(--warning)' },
      { label: 'Abril', value: 35, color: 'var(--success)' },
    ]

    const anaContent = `
      ${bigResult(
        md?.annualProfit || '€ 168.240',
        md?.annualProfitLabel || 'Beneficio Neto Acumulado (2026)',
        [
          { title: '€ 478.500', subtitle: 'Ingresos Acumulados' },
          { title: '€ 310.260', subtitle: 'Gastos Acumulados' },
          { title: '35,1%', subtitle: 'Margen Neto' },
        ]
      )}
      <div class="grid-2" style="margin-top:1.5rem">
        <div class="card">
          <div class="card-header"><h3>Margen Neto Mensual (%)</h3><span class="badge badge-green">2026</span></div>
          ${horizontalBarChart(marginByMonth, 50)}
        </div>
        <div class="card">
          <div class="card-header"><h3>Indicadores Financieros</h3></div>
          ${progressBar('Ratio de Cobro', md?.collectionRate || 82, 'primary')}
          ${progressBar('Margen Operativo', md?.operatingMargin || 38, 'accent')}
          ${progressBar('Liquidez Corriente', md?.currentRatio || 72, 'ok')}
          ${progressBar('Endeudamiento', md?.debtRatio || 24, 'warn')}
          ${progressBar('Rentabilidad (ROE)', md?.roe || 45, 'primary')}
        </div>
      </div>
      <div class="grid-2" style="margin-top:1.5rem">
        <div class="card">
          <div class="card-header"><h3>Top Clientes por Facturación</h3></div>
          ${horizontalBarChart([
            { label: 'Constructora Meridiano', value: 42300, color: 'var(--accent)' },
            { label: 'Distribuciones Canarias', value: 38600, color: 'var(--primary-light)' },
            { label: 'Hotel Atlántico Premium', value: 28400, color: 'var(--accent)' },
            { label: 'Clínica Bienestar', value: 22100, color: 'var(--primary-light)' },
            { label: 'TechSoluciones SL', value: 18500, color: 'var(--accent)' },
          ])}
        </div>
        <div class="card">
          <div class="card-header"><h3>Ingresos vs Gastos</h3></div>
          ${horizontalBarChart([
            { label: 'Ingresos Enero', value: 98200, color: 'var(--success)' },
            { label: 'Gastos Enero', value: 66800, color: 'var(--danger)' },
            { label: 'Ingresos Febrero', value: 105400, color: 'var(--success)' },
            { label: 'Gastos Febrero', value: 69500, color: 'var(--danger)' },
            { label: 'Ingresos Marzo', value: 118900, color: 'var(--success)' },
            { label: 'Gastos Marzo', value: 83200, color: 'var(--danger)' },
            { label: 'Ingresos Abril', value: 127450, color: 'var(--success)' },
            { label: 'Gastos Abril', value: 82300, color: 'var(--danger)' },
          ], 140000)}
        </div>
      </div>`

    const anaSection = section('analytics', 'ANALYTICS', 'Análisis Financiero',
      'Métricas avanzadas de rentabilidad, liquidez y rendimiento financiero.',
      anaContent)

    // ── Settings
    const settFields: SettingsField[] = [
      { label: 'Razón Social', value: c.businessName, type: 'text' },
      { label: 'CIF / NIF', value: md?.taxId || 'B-12345678', type: 'text' },
      { label: 'Email Facturación', value: md?.billingEmail || 'facturacion@empresa.com', type: 'email' },
      { label: 'Tipo Impositivo por Defecto', value: md?.defaultTaxRate || '7% IGIC', type: 'select', options: ['7% IGIC', '3% IGIC Reducido', '0% IGIC Exento', '21% IVA', '10% IVA Reducido', '4% IVA Superreducido'] },
      { label: 'Numeración Automática de Facturas', value: '', type: 'toggle', enabled: true },
      { label: 'Conciliación Bancaria Automática', value: '', type: 'toggle', enabled: true },
      { label: 'Alertas de Vencimiento', value: '', type: 'toggle', enabled: true },
      { label: 'Moneda', value: 'EUR (€)', type: 'select', options: ['EUR (€)', 'USD ($)', 'GBP (£)'] },
    ]

    const settContent = settingsForm(settFields)

    const settSection = section('settings', 'CONFIGURACIÓN', 'Ajustes de Contabilidad',
      'Personaliza datos fiscales, numeración de facturas y automatizaciones.',
      settContent)

    // ── Footer
    const footer = `<div class="footer">&copy; 2026 ${c.businessName} — Prototipo generado por <strong style="color:var(--accent)">Kerno Studio</strong></div>`

    // ── Assemble
    return `<!DOCTYPE html>
<html lang="${c.locale || 'es'}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${c.businessName} — Demo Interactivo</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@300;400;500;600;700;800;900&display=swap');
${designSystemCSS(c.primaryColor, c.accentColor, c.theme || 'minimal')}
body { font-family: 'Source Sans 3', sans-serif; background: #0c0e12; }
.data-tbl { font-family: 'Source Sans 3', sans-serif; }
.data-tbl td[style*="text-align:right"], .data-tbl td[style*="text-align: right"] {
  font-variant-numeric: tabular-nums;
  font-feature-settings: 'tnum';
  letter-spacing: 0.02em;
}
.kpi-val { font-variant-numeric: tabular-nums; letter-spacing: -0.02em; }
.card { border-radius: 10px; }
.kpi { border-radius: 10px; }
</style>
</head>
<body>
${nav}
${notificationContainer()}
${hero}
${dashSection}
${invSection}
${expSection}
${taxSection}
${bankSection}
${anaSection}
${settSection}
${footer}
<script>${allScripts()}</script>
</body>
</html>`
  },
}

interface AccountingMockData {
  heroTagline?: string
  heroSubtitle?: string
  monthlyRevenue?: number
  monthlyExpenses?: number
  profit?: number
  pendingInvoices?: number
  taxDue?: number
  revenueByMonth?: BarChartItem[]
  alert1?: string
  alert2?: string
  alert3?: string
  alert4?: string
  alertCount?: number
  invoices?: Record<string, string>[]
  issuedInvoices?: number
  paidInvoices?: number
  pendingAmount?: number
  overdueAmount?: number
  expCategories?: BarChartItem[]
  expenses?: Record<string, string>[]
  totalExpenses?: number
  dailyExpAvg?: number
  supplierInvoices?: number
  pendingPayments?: number
  taxQuarters?: Record<string, string>[]
  taxModels?: Record<string, string>[]
  taxCollectedQ2?: number
  taxPaidQ2?: number
  taxDueQ2?: number
  taxRate?: string
  bankTransactions?: Record<string, string>[]
  currentBalance?: number
  bankIncome?: number
  bankOutcome?: number
  unreconciled?: number
  marginByMonth?: BarChartItem[]
  annualProfit?: string
  annualProfitLabel?: string
  collectionRate?: number
  operatingMargin?: number
  currentRatio?: number
  debtRatio?: number
  roe?: number
  taxId?: string
  billingEmail?: string
  defaultTaxRate?: string
}
