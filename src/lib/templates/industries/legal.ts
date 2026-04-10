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

export const legalTemplate: TemplateDefinition = {
  meta: {
    id: 'legal',
    name: 'Despacho Jurídico & Legal',
    industries: ['legal', 'abogado', 'lawyer', 'law firm', 'bufete', 'jurídico', 'expedientes', 'cases', 'notaría', 'notary'],
    projectTypes: ['landing', 'mvp', 'system', 'saas'],
    sections: ['hero', 'dashboard', 'cases', 'clients', 'documents', 'billing', 'analytics', 'settings'],
    description: 'Plantilla formal para despachos de abogados, bufetes y gestión jurídica. Dashboard con expedientes, clientes, documentos, facturación por horas, analytics y gestión de casos.',
  },

  render(c: TemplateCustomization): string {
    const md = c.mockData as LegalMockData

    // ── Nav
    const nav = navBar(c.businessName, [
      { id: 'hero', label: 'Inicio' },
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'cases', label: 'Expedientes' },
      { id: 'clients', label: 'Clientes' },
      { id: 'documents', label: 'Documentos' },
      { id: 'billing', label: 'Facturación' },
      { id: 'analytics', label: 'Analytics' },
      { id: 'settings', label: 'Config' },
    ])

    // ── Hero
    const hero = heroSection(
      c.businessName,
      md?.heroTagline || 'Gestión jurídica sin fricciones',
      md?.heroSubtitle || 'Plataforma integral para expedientes, clientes, documentos y facturación. Todo el despacho en una sola herramienta.',
      [
        { value: md?.totalCases || 234, label: 'Expedientes' },
        { value: md?.activeClients || 89, label: 'Clientes' },
        { value: md?.billableHours || 1240, label: 'Horas Facturables' },
        { value: md?.revenue || 186500, label: 'Facturación', prefix: '€' },
      ],
      `Demo Interactivo — ${c.businessType || 'Despacho Jurídico'}`
    )

    // ── Dashboard
    const dashKpis: KpiData[] = [
      { icon: '📂', label: 'Expedientes Activos', value: md?.activeCases || 47, trend: { value: '+5', direction: 'up' } },
      { icon: '👤', label: 'Clientes Activos', value: md?.activeClients || 89, trend: { value: '+12', direction: 'up' } },
      { icon: '⏱️', label: 'Horas Facturables', value: md?.billableHoursMonth || 312, trend: { value: '+8.2%', direction: 'up' } },
      { icon: '💰', label: 'Facturación Mes', value: md?.revenueMonth || 42800, prefix: '€', trend: { value: '+14.6%', direction: 'up' } },
    ]

    const casesByType: BarChartItem[] = md?.casesByType || [
      { label: 'Civil', value: 68, color: 'var(--primary-light)' },
      { label: 'Mercantil', value: 52, color: 'var(--accent)' },
      { label: 'Laboral', value: 41, color: 'var(--primary-light)' },
      { label: 'Penal', value: 28, color: 'var(--accent)' },
      { label: 'Administrativo', value: 24, color: 'var(--primary-light)' },
      { label: 'Familia', value: 21, color: 'var(--accent)' },
    ]

    const dashAlerts = [
      alertRow('⚖️', md?.alert1 || 'EXP-2026-189: Vista oral programada para mañana 10:00h', 'Urgente', 'badge-red'),
      alertRow('📄', md?.alert2 || 'Plazo de alegaciones para EXP-2026-201 vence en 3 días', 'Plazo', 'badge-yellow'),
      alertRow('💰', md?.alert3 || '3 facturas pendientes de cobro por importe total de €12,400', 'Cobros', 'badge-blue'),
      alertRow('✅', md?.alert4 || 'Sentencia favorable recibida en EXP-2026-156 (Civil)', 'Ganado', 'badge-green'),
    ]

    const dashContent = `
      ${kpiGrid(dashKpis)}
      <div class="grid-2" style="margin-top:1.5rem">
        <div class="card">
          <div class="card-header"><h3>Expedientes por Rama</h3><span class="badge badge-accent">Total: ${md?.totalCases || 234}</span></div>
          ${horizontalBarChart(casesByType)}
        </div>
        <div class="card">
          <div class="card-header"><h3>Alertas y Plazos</h3><span class="badge badge-primary">${md?.alertCount || 4} pendientes</span></div>
          ${dashAlerts.join('')}
        </div>
      </div>`

    const dashSection = section('dashboard', 'DASHBOARD', 'Panel del Despacho',
      'Vista general de expedientes, clientes, horas facturables y alertas de plazos.',
      dashContent)

    // ── Cases
    const caseRows = md?.cases || [
      { caseNumber: 'EXP-2026-201', client: 'Grupo Meridian S.L.', type: '<span class="badge badge-primary">Mercantil</span>', subject: 'Incumplimiento contractual', lawyer: 'Dr. Martínez', status: '<span class="badge badge-green">Activo</span>', priority: '<span class="badge badge-red">Alta</span>', opened: '2026-03-15' },
      { caseNumber: 'EXP-2026-198', client: 'María del Carmen Ruiz', type: '<span class="badge badge-accent">Civil</span>', subject: 'Reclamación de daños', lawyer: 'Dra. López', status: '<span class="badge badge-green">Activo</span>', priority: '<span class="badge badge-yellow">Media</span>', opened: '2026-03-10' },
      { caseNumber: 'EXP-2026-189', client: 'TechVentures Inc.', type: '<span class="badge badge-primary">Mercantil</span>', subject: 'Fusión y adquisiciones', lawyer: 'Dr. Martínez', status: '<span class="badge badge-yellow">Vista oral</span>', priority: '<span class="badge badge-red">Alta</span>', opened: '2026-02-28' },
      { caseNumber: 'EXP-2026-175', client: 'Antonio Pérez García', type: '<span class="badge badge-blue">Laboral</span>', subject: 'Despido improcedente', lawyer: 'Dra. Fernández', status: '<span class="badge badge-green">Activo</span>', priority: '<span class="badge badge-yellow">Media</span>', opened: '2026-02-14' },
      { caseNumber: 'EXP-2026-168', client: 'Construcciones Alva S.A.', type: '<span class="badge badge-accent">Civil</span>', subject: 'Vicios de construcción', lawyer: 'Dr. Navarro', status: '<span class="badge badge-green">Activo</span>', priority: '<span class="badge badge-blue">Normal</span>', opened: '2026-02-05' },
      { caseNumber: 'EXP-2026-156', client: 'Elena Rodríguez Soto', type: '<span class="badge badge-accent">Civil</span>', subject: 'Herencia y sucesiones', lawyer: 'Dra. López', status: '<span class="badge badge-green">Ganado</span>', priority: '<span class="badge badge-green">Baja</span>', opened: '2026-01-20' },
      { caseNumber: 'EXP-2026-142', client: 'LogiTrans España S.L.', type: '<span class="badge badge-purple">Penal</span>', subject: 'Delito contra seguridad vial', lawyer: 'Dr. Vega', status: '<span class="badge badge-yellow">En espera</span>', priority: '<span class="badge badge-yellow">Media</span>', opened: '2026-01-10' },
      { caseNumber: 'EXP-2026-131', client: 'Farmacia Central CB', type: '<span class="badge badge-blue">Laboral</span>', subject: 'Negociación colectiva', lawyer: 'Dra. Fernández', status: '<span class="badge badge-green">Activo</span>', priority: '<span class="badge badge-blue">Normal</span>', opened: '2025-12-18' },
    ]

    const caseCols: TableColumn[] = [
      { label: 'N.o Expediente', key: 'caseNumber' },
      { label: 'Cliente', key: 'client' },
      { label: 'Rama', key: 'type', align: 'center' },
      { label: 'Asunto', key: 'subject' },
      { label: 'Abogado', key: 'lawyer' },
      { label: 'Estado', key: 'status', align: 'center' },
      { label: 'Prioridad', key: 'priority', align: 'center' },
    ]

    const caseContent = `
      <div class="card">
        <div class="card-header"><h3>Expedientes</h3><span class="badge badge-accent">${caseRows.length} expedientes</span></div>
        ${dataTable(caseCols, caseRows)}
      </div>
      <div class="grid-4" style="margin-top:1.5rem">
        <div class="card" style="text-align:center">
          <div style="font-size:0.66rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:0.3rem">Activos</div>
          <div style="font-size:2rem;font-weight:800;color:var(--success)" class="counter" data-target="${md?.activeCasesCount || 47}">0</div>
        </div>
        <div class="card" style="text-align:center">
          <div style="font-size:0.66rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:0.3rem">En Espera</div>
          <div style="font-size:2rem;font-weight:800;color:var(--warning)" class="counter" data-target="${md?.waitingCases || 12}">0</div>
        </div>
        <div class="card" style="text-align:center">
          <div style="font-size:0.66rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:0.3rem">Ganados</div>
          <div style="font-size:2rem;font-weight:800;color:var(--accent)" class="counter" data-target="${md?.wonCases || 38}">0</div>
        </div>
        <div class="card" style="text-align:center">
          <div style="font-size:0.66rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:0.3rem">Tasa de Éxito</div>
          <div style="font-size:2rem;font-weight:800;color:var(--success)" class="counter" data-target="${md?.winRate || 82}" data-suffix="%">0</div>
        </div>
      </div>`

    const caseSection = section('cases', 'EXPEDIENTES', 'Gestión de Expedientes',
      'Todos los casos del despacho con número, cliente, rama jurídica, estado y abogado asignado.',
      caseContent)

    // ── Clients
    const clientRows = md?.clients || [
      { name: 'Grupo Meridian S.L.', type: 'Empresa', contact: 'Juan Morales', email: 'j.morales@meridian.es', phone: '+34 912 345 678', cases: '3', totalBilled: '€34,200', status: '<span class="badge badge-green">Activo</span>' },
      { name: 'María del Carmen Ruiz', type: 'Particular', contact: '—', email: 'mcarmen.ruiz@gmail.com', phone: '+34 654 321 098', cases: '1', totalBilled: '€4,800', status: '<span class="badge badge-green">Activo</span>' },
      { name: 'TechVentures Inc.', type: 'Empresa', contact: 'Sarah Johnson', email: 's.johnson@techventures.com', phone: '+1 555 0123', cases: '2', totalBilled: '€62,000', status: '<span class="badge badge-green">Activo</span>' },
      { name: 'Antonio Pérez García', type: 'Particular', contact: '—', email: 'aperez@outlook.es', phone: '+34 678 901 234', cases: '1', totalBilled: '€3,200', status: '<span class="badge badge-green">Activo</span>' },
      { name: 'Construcciones Alva S.A.', type: 'Empresa', contact: 'Roberto Alva', email: 'r.alva@constalva.com', phone: '+34 913 456 789', cases: '4', totalBilled: '€28,600', status: '<span class="badge badge-green">Activo</span>' },
      { name: 'Elena Rodríguez Soto', type: 'Particular', contact: '—', email: 'elena.rsoto@gmail.com', phone: '+34 612 345 678', cases: '1', totalBilled: '€8,400', status: '<span class="badge badge-blue">Caso cerrado</span>' },
      { name: 'LogiTrans España S.L.', type: 'Empresa', contact: 'Fernando Gil', email: 'f.gil@logitrans.es', phone: '+34 914 567 890', cases: '2', totalBilled: '€15,800', status: '<span class="badge badge-green">Activo</span>' },
      { name: 'Farmacia Central CB', type: 'Empresa', contact: 'Lucía Vega', email: 'l.vega@farmaciacentral.es', phone: '+34 915 678 901', cases: '1', totalBilled: '€6,200', status: '<span class="badge badge-green">Activo</span>' },
    ]

    const clientCols: TableColumn[] = [
      { label: 'Cliente', key: 'name' },
      { label: 'Tipo', key: 'type' },
      { label: 'Contacto', key: 'contact' },
      { label: 'Email', key: 'email' },
      { label: 'Expedientes', key: 'cases', align: 'center' },
      { label: 'Facturado', key: 'totalBilled', align: 'right' },
      { label: 'Estado', key: 'status', align: 'center' },
    ]

    const clientContent = `
      <div class="card">
        <div class="card-header"><h3>Directorio de Clientes</h3><span class="badge badge-accent">${clientRows.length} clientes</span></div>
        ${dataTable(clientCols, clientRows)}
      </div>
      <div class="grid-2" style="margin-top:1.5rem">
        <div class="card">
          <div class="card-header"><h3>Clientes por Tipo</h3></div>
          ${horizontalBarChart([
            { label: 'Empresas', value: md?.empresaClients || 5, color: 'var(--primary-light)' },
            { label: 'Particulares', value: md?.particularClients || 3, color: 'var(--accent)' },
          ])}
        </div>
        <div class="card">
          <div class="card-header"><h3>Top Clientes por Facturación</h3></div>
          ${progressBar('TechVentures Inc.', 100, 'accent')}
          ${progressBar('Grupo Meridian S.L.', 55, 'primary')}
          ${progressBar('Construcciones Alva S.A.', 46, 'primary')}
          ${progressBar('LogiTrans España S.L.', 25, 'primary')}
        </div>
      </div>`

    const clientSection = section('clients', 'CLIENTES', 'Gestión de Clientes',
      'Directorio completo con datos de contacto, expedientes asociados y facturación acumulada.',
      clientContent)

    // ── Documents
    const docRows = md?.documents || [
      { name: 'Demanda_EXP-2026-201.pdf', type: '<span class="badge badge-red">Demanda</span>', case: 'EXP-2026-201', author: 'Dr. Martínez', date: '2026-04-08', size: '2.4 MB' },
      { name: 'Contrato_Fusión_TechVentures.docx', type: '<span class="badge badge-primary">Contrato</span>', case: 'EXP-2026-189', author: 'Dr. Martínez', date: '2026-04-06', size: '1.8 MB' },
      { name: 'Escrito_Alegaciones_201.pdf', type: '<span class="badge badge-yellow">Alegaciones</span>', case: 'EXP-2026-201', author: 'Dra. López', date: '2026-04-05', size: '890 KB' },
      { name: 'Sentencia_EXP-2026-156.pdf', type: '<span class="badge badge-green">Sentencia</span>', case: 'EXP-2026-156', author: 'Juzgado N.o 4', date: '2026-04-03', size: '1.2 MB' },
      { name: 'Poder_Notarial_Meridian.pdf', type: '<span class="badge badge-accent">Poder</span>', case: 'EXP-2026-201', author: 'Notaría Álvarez', date: '2026-04-01', size: '540 KB' },
      { name: 'Informe_Pericial_Alva.pdf', type: '<span class="badge badge-blue">Pericial</span>', case: 'EXP-2026-168', author: 'Perito J. Ramos', date: '2026-03-28', size: '4.6 MB' },
      { name: 'Acta_Conciliación_175.pdf', type: '<span class="badge badge-purple">Acta</span>', case: 'EXP-2026-175', author: 'SMAC', date: '2026-03-22', size: '320 KB' },
      { name: 'Minuta_Honorarios_Q1.xlsx', type: '<span class="badge badge-primary">Factura</span>', case: 'General', author: 'Administración', date: '2026-03-31', size: '280 KB' },
    ]

    const docCols: TableColumn[] = [
      { label: 'Documento', key: 'name' },
      { label: 'Tipo', key: 'type', align: 'center' },
      { label: 'Expediente', key: 'case' },
      { label: 'Autor', key: 'author' },
      { label: 'Fecha', key: 'date' },
      { label: 'Tamaño', key: 'size', align: 'right' },
    ]

    const docContent = `
      <div class="card">
        <div class="card-header"><h3>Repositorio de Documentos</h3><span class="badge badge-accent">${docRows.length} documentos recientes</span></div>
        ${dataTable(docCols, docRows)}
      </div>
      <div class="grid-3" style="margin-top:1.5rem">
        <div class="card" style="text-align:center">
          <div style="font-size:0.66rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:0.3rem">Total Documentos</div>
          <div style="font-size:1.8rem;font-weight:800;color:var(--accent)" class="counter" data-target="${md?.totalDocs || 1284}">0</div>
        </div>
        <div class="card" style="text-align:center">
          <div style="font-size:0.66rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:0.3rem">Subidos Este Mes</div>
          <div style="font-size:1.8rem;font-weight:800;color:var(--primary-light)" class="counter" data-target="${md?.docsThisMonth || 42}">0</div>
        </div>
        <div class="card" style="text-align:center">
          <div style="font-size:0.66rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:0.3rem">Almacenamiento</div>
          <div style="font-size:1.8rem;font-weight:800;color:var(--warning)" class="counter" data-target="${md?.storageGB || 18}" data-suffix=" GB">0</div>
        </div>
      </div>`

    const docSection = section('documents', 'DOCUMENTOS', 'Gestión Documental',
      'Repositorio centralizado de demandas, contratos, sentencias, actas y toda la documentación del despacho.',
      docContent)

    // ── Billing
    const billingRows = md?.billing || [
      { date: '2026-04-08', lawyer: 'Dr. Martínez', case: 'EXP-2026-201', description: 'Redacción de demanda', hours: '4.5', rate: '€180/h', total: '€810' },
      { date: '2026-04-08', lawyer: 'Dra. López', case: 'EXP-2026-198', description: 'Revisión documentación', hours: '2.0', rate: '€160/h', total: '€320' },
      { date: '2026-04-07', lawyer: 'Dr. Martínez', case: 'EXP-2026-189', description: 'Preparación vista oral', hours: '6.0', rate: '€180/h', total: '€1,080' },
      { date: '2026-04-07', lawyer: 'Dra. Fernández', case: 'EXP-2026-175', description: 'Negociación con empresa', hours: '3.0', rate: '€150/h', total: '€450' },
      { date: '2026-04-06', lawyer: 'Dr. Navarro', case: 'EXP-2026-168', description: 'Análisis informe pericial', hours: '3.5', rate: '€170/h', total: '€595' },
      { date: '2026-04-05', lawyer: 'Dra. López', case: 'EXP-2026-201', description: 'Escrito de alegaciones', hours: '5.0', rate: '€160/h', total: '€800' },
      { date: '2026-04-04', lawyer: 'Dr. Vega', case: 'EXP-2026-142', description: 'Estudio jurisprudencia', hours: '2.5', rate: '€140/h', total: '€350' },
      { date: '2026-04-03', lawyer: 'Dra. Fernández', case: 'EXP-2026-131', description: 'Reunión negociación colectiva', hours: '4.0', rate: '€150/h', total: '€600' },
    ]

    const billingCols: TableColumn[] = [
      { label: 'Fecha', key: 'date' },
      { label: 'Abogado', key: 'lawyer' },
      { label: 'Expediente', key: 'case' },
      { label: 'Concepto', key: 'description' },
      { label: 'Horas', key: 'hours', align: 'right' },
      { label: 'Tarifa', key: 'rate', align: 'right' },
      { label: 'Importe', key: 'total', align: 'right' },
    ]

    const billingContent = `
      <div class="card">
        <div class="card-header"><h3>Time Tracking & Facturación</h3><span class="badge badge-accent">Abril 2026</span></div>
        ${dataTable(billingCols, billingRows)}
      </div>
      ${bigResult(md?.monthlyRevenue || '€42,800', 'Facturación Abril 2026', [
        { title: md?.totalHours || '312h', subtitle: 'Horas facturables' },
        { title: md?.avgRate || '€165/h', subtitle: 'Tarifa media' },
        { title: md?.billingGrowth || '+14.6%', subtitle: 'vs. mes anterior' },
      ])}
      <div class="grid-2" style="margin-top:1.5rem">
        <div class="card">
          <div class="card-header"><h3>Facturación por Abogado</h3></div>
          ${horizontalBarChart([
            { label: 'Dr. Martínez', value: 14200, color: 'var(--accent)' },
            { label: 'Dra. López', value: 11800, color: 'var(--primary-light)' },
            { label: 'Dra. Fernández', value: 8400, color: 'var(--accent)' },
            { label: 'Dr. Navarro', value: 5200, color: 'var(--primary-light)' },
            { label: 'Dr. Vega', value: 3200, color: 'var(--accent)' },
          ])}
        </div>
        <div class="card">
          <div class="card-header"><h3>Estado de Cobros</h3></div>
          ${progressBar('Cobrado', 72, 'ok')}
          ${progressBar('Pendiente de facturar', 18, 'warn')}
          ${progressBar('Facturado sin cobrar', 10, 'crit')}
          <div style="margin-top:1rem;padding:0.8rem;background:var(--bg-elevated);border-radius:8px;border-left:3px solid var(--warning)">
            <div style="font-size:0.72rem;color:var(--text-dim);text-transform:uppercase;letter-spacing:0.5px">Pendiente de Cobro</div>
            <div style="font-size:1.4rem;font-weight:800;color:var(--warning)">€12,400</div>
          </div>
        </div>
      </div>`

    const billingSection = section('billing', 'FACTURACION', 'Facturación y Time Tracking',
      'Registro de horas, tarifas, facturación por abogado y estado de cobros.',
      billingContent)

    // ── Analytics
    const analyticsContent = `
      <div class="grid-2">
        <div class="card">
          <div class="card-header"><h3>Casos por Resultado</h3></div>
          ${horizontalBarChart([
            { label: 'Ganados', value: md?.wonCases || 38, color: 'var(--success)' },
            { label: 'Acuerdo', value: md?.settledCases || 14, color: 'var(--accent)' },
            { label: 'En curso', value: md?.activeCasesCount || 47, color: 'var(--info)' },
            { label: 'Perdidos', value: md?.lostCases || 8, color: 'var(--danger)' },
            { label: 'Archivados', value: md?.archivedCases || 5, color: 'var(--text-dim)' },
          ])}
        </div>
        <div class="card">
          <div class="card-header"><h3>Rendimiento por Rama</h3></div>
          ${progressBar('Civil — Tasa de éxito', md?.civilWinRate || 86, 'ok')}
          ${progressBar('Mercantil — Tasa de éxito', md?.mercantilWinRate || 78, 'ok')}
          ${progressBar('Laboral — Tasa de éxito', md?.laboralWinRate || 91, 'ok')}
          ${progressBar('Penal — Tasa de éxito', md?.penalWinRate || 64, 'warn')}
          ${progressBar('Administrativo — Tasa de éxito', md?.adminWinRate || 72, 'ok')}
        </div>
      </div>
      ${bigResult(md?.winRateOverall || '82%', 'Tasa de Éxito Global del Despacho', [
        { title: md?.avgCaseDuration || '4.2 meses', subtitle: 'Duración media de caso' },
        { title: md?.clientSatisfaction || '4.8/5', subtitle: 'Satisfacción del cliente' },
        { title: md?.repeatClients || '67%', subtitle: 'Clientes recurrentes' },
      ])}
      <div class="grid-3" style="margin-top:1.5rem">
        <div class="card">
          <div class="card-header"><h3>Facturación Trimestral</h3></div>
          ${horizontalBarChart([
            { label: 'Q1 2026', value: 124000, color: 'var(--primary-light)' },
            { label: 'Q4 2025', value: 108000, color: 'var(--accent)' },
            { label: 'Q3 2025', value: 96000, color: 'var(--primary-light)' },
            { label: 'Q2 2025', value: 88000, color: 'var(--accent)' },
          ])}
        </div>
        <div class="card">
          <div class="card-header"><h3>Nuevos Clientes/Mes</h3></div>
          ${horizontalBarChart([
            { label: 'Abril', value: 8 },
            { label: 'Marzo', value: 12 },
            { label: 'Febrero', value: 6 },
            { label: 'Enero', value: 9 },
          ])}
        </div>
        <div class="card">
          <div class="card-header"><h3>Eficiencia</h3></div>
          ${progressBar('Utilización (horas fact./total)', md?.utilization || 78, 'primary')}
          ${progressBar('Casos cerrados en plazo', md?.onTimeCases || 85, 'ok')}
          ${progressBar('Documentos digitalizados', md?.digitalDocs || 94, 'ok')}
        </div>
      </div>`

    const anaSection = section('analytics', 'ANALYTICS', 'Métricas del Despacho',
      'Resultados de casos, rendimiento por rama, facturación trimestral y eficiencia operativa.',
      analyticsContent)

    // ── Settings
    const settingsFields: SettingsField[] = [
      { label: 'Nombre del despacho', value: c.businessName, type: 'text' },
      { label: 'CIF / NIF', value: md?.taxId || 'B-12345678', type: 'text' },
      { label: 'Email del despacho', value: md?.email || `info@${c.businessName.toLowerCase().replace(/\s/g, '')}.com`, type: 'email' },
      { label: 'Tarifa por defecto (€/h)', value: md?.defaultRate || '150', type: 'text' },
      { label: 'Alertas de plazos procesales', value: '', type: 'toggle', enabled: true },
      { label: 'Recordatorios de ITV/Caducidades', value: '', type: 'toggle', enabled: true },
      { label: 'Facturación automática mensual', value: '', type: 'toggle', enabled: false },
      { label: 'Firma digital integrada', value: '', type: 'toggle', enabled: true },
    ]

    const settContent = settingsForm(settingsFields)
    const settSection = section('settings', 'CONFIGURACION', 'Ajustes del Despacho',
      'Datos fiscales, tarifas, alertas y configuración de facturación.',
      settContent)

    // ── Footer
    const footer = `<div class="footer">&copy; 2026 ${c.businessName} — Prototipo generado por <strong style="color:var(--accent)">Kerno Studio</strong></div>`

    // ── Extra CSS overrides for legal-specific styling
    const legalCSS = `
      @import url('https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@300;400;500;600;700;800;900&display=swap');

      body { font-family: 'Libre Franklin', sans-serif !important; }
      .nav-brand, .s-title, .hero-h1 { font-family: 'Libre Franklin', sans-serif !important; }
      /* Serif-influenced headings for formal feel */
      .s-title, h3, .card-header h3 {
        letter-spacing: -0.3px;
      }
      /* Gold accent border on KPIs for premium feel */
      .kpi {
        border-top: 2px solid var(--accent);
      }
      /* Subtle parchment texture overlay */
      body::after {
        content: '';
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: radial-gradient(ellipse at 50% 0%, rgba(200,170,120,0.03) 0%, transparent 60%);
        pointer-events: none; z-index: 9999;
      }
      /* Document-style card borders */
      .card {
        border-top: 1px solid rgba(200,170,120,0.1);
      }
    `

    // ── Assemble
    return `<!DOCTYPE html>
<html lang="${c.locale || 'es'}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${c.businessName} — Legal Management Demo</title>
<style>${designSystemCSS(c.primaryColor || '#7c3aed', c.accentColor || '#d4a843', c.theme || 'bold')}${legalCSS}</style>
</head>
<body>
${nav}
${notificationContainer()}
${hero}
${dashSection}
${caseSection}
${clientSection}
${docSection}
${billingSection}
${anaSection}
${settSection}
${footer}
<script>${allScripts()}</script>
</body>
</html>`
  },
}

interface LegalMockData {
  heroTagline?: string
  heroSubtitle?: string
  totalCases?: number
  activeClients?: number
  billableHours?: number
  revenue?: number
  activeCases?: number
  billableHoursMonth?: number
  revenueMonth?: number
  casesByType?: BarChartItem[]
  alert1?: string
  alert2?: string
  alert3?: string
  alert4?: string
  alertCount?: number
  cases?: Record<string, string>[]
  activeCasesCount?: number
  waitingCases?: number
  wonCases?: number
  winRate?: number
  clients?: Record<string, string>[]
  empresaClients?: number
  particularClients?: number
  documents?: Record<string, string>[]
  totalDocs?: number
  docsThisMonth?: number
  storageGB?: number
  billing?: Record<string, string>[]
  monthlyRevenue?: string
  totalHours?: string
  avgRate?: string
  billingGrowth?: string
  settledCases?: number
  lostCases?: number
  archivedCases?: number
  civilWinRate?: number
  mercantilWinRate?: number
  laboralWinRate?: number
  penalWinRate?: number
  adminWinRate?: number
  winRateOverall?: string
  avgCaseDuration?: string
  clientSatisfaction?: string
  repeatClients?: string
  utilization?: number
  onTimeCases?: number
  digitalDocs?: number
  taxId?: string
  email?: string
  defaultRate?: string
}
