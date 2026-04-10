import type { TemplateDefinition, TemplateCustomization } from '../types'
import { designSystemCSS } from '../shared/design-system'
import { allScripts } from '../shared/scripts'
import {
  navBar, heroSection, notificationContainer, section,
  kpiGrid, dataTable, progressBar, horizontalBarChart,
  settingsForm, alertRow, bigResult,
  type KpiData, type TableColumn, type BarChartItem, type SettingsField,
} from '../shared/components'

export const hrTemplate: TemplateDefinition = {
  meta: {
    id: 'hr',
    name: 'Recursos Humanos Premium',
    industries: ['hr', 'rrhh', 'recursos humanos', 'human resources', 'nóminas', 'payroll', 'talento', 'talent', 'empleados', 'employees'],
    projectTypes: ['landing', 'mvp', 'system', 'saas'],
    sections: ['hero', 'dashboard', 'directory', 'recruitment', 'payroll', 'timeoff', 'analytics', 'settings'],
    description: 'Plantilla premium para gestión de recursos humanos. Dashboard con KPIs de empleados y rotación, directorio de personal, pipeline de reclutamiento, gestión de nóminas, solicitudes de vacaciones, analytics de equipo y configuración.',
  },

  render(c: TemplateCustomization): string {
    const md = c.mockData as HRMockData

    // ── Nav
    const nav = navBar(c.businessName, [
      { id: 'hero', label: 'Inicio' },
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'directory', label: 'Directorio' },
      { id: 'recruitment', label: 'Reclutamiento' },
      { id: 'payroll', label: 'Nóminas' },
      { id: 'timeoff', label: 'Ausencias' },
      { id: 'analytics', label: 'Analytics' },
      { id: 'settings', label: 'Config' },
    ])

    // ── Hero
    const hero = heroSection(
      c.businessName,
      md?.heroTagline || `${c.businessName} — Gestión de Personas`,
      md?.heroSubtitle || 'Directorio de empleados, reclutamiento, nóminas y control de ausencias en una sola plataforma.',
      [
        { value: md?.totalEmployees || 248, label: 'Empleados' },
        { value: md?.openPositions || 12, label: 'Vacantes' },
        { value: md?.turnoverRate || 4.2, label: 'Rotación %', suffix: '%' },
        { value: md?.satisfaction || 8.7, label: 'Satisfacción', suffix: '/10' },
      ],
      `Demo Interactivo — ${c.businessType || 'RRHH'}`
    )

    // ── Dashboard
    const dashKpis: KpiData[] = [
      { icon: '👥', label: 'Empleados Activos', value: md?.totalEmployees || 248, trend: { value: '+6 este mes', direction: 'up' } },
      { icon: '📋', label: 'Posiciones Abiertas', value: md?.openPositions || 12, trend: { value: '3 nuevas', direction: 'up' } },
      { icon: '🔄', label: 'Rotación Anual', value: md?.turnoverRate || 4.2, suffix: '%', decimals: 1, trend: { value: '-1.2%', direction: 'down' } },
      { icon: '😊', label: 'Satisfacción', value: md?.satisfaction || 8.7, suffix: '/10', decimals: 1, trend: { value: '+0.3', direction: 'up' } },
    ]

    const deptDistribution: BarChartItem[] = md?.deptDistribution || [
      { label: 'Engineering', value: 82, color: 'var(--primary-light)' },
      { label: 'Marketing', value: 38, color: 'var(--accent)' },
      { label: 'Sales', value: 54, color: 'var(--primary-light)' },
      { label: 'HR', value: 18, color: 'var(--accent)' },
      { label: 'Finance', value: 28, color: 'var(--primary-light)' },
      { label: 'Operations', value: 28, color: 'var(--accent)' },
    ]

    const dashAlerts = [
      alertRow('🎂', md?.alert1 || '3 cumpleaños esta semana — enviar felicitaciones', 'Evento', 'badge-purple'),
      alertRow('📄', md?.alert2 || '5 contratos por renovar antes del 30/04', 'Urgente', 'badge-red'),
      alertRow('🏖️', md?.alert3 || '12 solicitudes de vacaciones pendientes', 'Pendiente', 'badge-yellow'),
      alertRow('🎯', md?.alert4 || 'Evaluación trimestral Q2 — programar reuniones', 'Planning', 'badge-blue'),
    ]

    const dashContent = `
      ${kpiGrid(dashKpis)}
      <div class="grid-2" style="margin-top:1.5rem">
        <div class="card">
          <div class="card-header"><h3>Distribución por Departamento</h3><span class="badge badge-accent">248 total</span></div>
          ${horizontalBarChart(deptDistribution)}
        </div>
        <div class="card">
          <div class="card-header"><h3>Alertas de RRHH</h3><span class="badge badge-primary">${md?.alertCount || 4} activas</span></div>
          ${dashAlerts.join('')}
        </div>
      </div>`

    const dashSection = section('dashboard', c.businessType?.toUpperCase() || 'RRHH', 'Panel de Control',
      'Vista general del equipo, vacantes abiertas y métricas clave de personas.',
      dashContent)

    // ── Directory
    const dirCols: TableColumn[] = [
      { label: 'Empleado', key: 'name' },
      { label: 'Departamento', key: 'department' },
      { label: 'Puesto', key: 'role' },
      { label: 'Email', key: 'email' },
      { label: 'Inicio', key: 'startDate' },
      { label: 'Estado', key: 'status' },
    ]
    const dirRows = md?.employees || [
      { name: 'Ana García López', department: 'Engineering', role: 'Senior Developer', email: 'a.garcia@empresa.com', startDate: '15/03/2022', status: '<span class="badge badge-green">Activo</span>' },
      { name: 'Carlos Martínez Ruiz', department: 'Marketing', role: 'Marketing Manager', email: 'c.martinez@empresa.com', startDate: '08/01/2021', status: '<span class="badge badge-green">Activo</span>' },
      { name: 'Laura Fernández Vila', department: 'Sales', role: 'Account Executive', email: 'l.fernandez@empresa.com', startDate: '22/06/2023', status: '<span class="badge badge-green">Activo</span>' },
      { name: 'Miguel Torres Sanz', department: 'Engineering', role: 'Tech Lead', email: 'm.torres@empresa.com', startDate: '03/09/2020', status: '<span class="badge badge-green">Activo</span>' },
      { name: 'Elena Rodríguez Pérez', department: 'HR', role: 'HR Business Partner', email: 'e.rodriguez@empresa.com', startDate: '11/02/2022', status: '<span class="badge badge-green">Activo</span>' },
      { name: 'David López Navarro', department: 'Finance', role: 'Financial Controller', email: 'd.lopez@empresa.com', startDate: '29/07/2021', status: '<span class="badge badge-green">Activo</span>' },
      { name: 'Sara Díaz Moreno', department: 'Engineering', role: 'Frontend Developer', email: 's.diaz@empresa.com', startDate: '14/11/2023', status: '<span class="badge badge-blue">Remoto</span>' },
      { name: 'Javier Sánchez Gil', department: 'Sales', role: 'Sales Director', email: 'j.sanchez@empresa.com', startDate: '05/04/2019', status: '<span class="badge badge-green">Activo</span>' },
    ]

    const dirContent = `
      <div class="card" style="margin-bottom:1.5rem">
        ${dataTable(dirCols, dirRows)}
      </div>
      <div class="grid-4">
        ${kpiGrid([
          { icon: '🏢', label: 'Presencial', value: md?.onsite || 186 },
          { icon: '🏠', label: 'Remoto', value: md?.remote || 42 },
          { icon: '🌍', label: 'Híbrido', value: md?.hybrid || 20 },
          { icon: '📝', label: 'Periodo Prueba', value: md?.probation || 8 },
        ])}
      </div>`

    const dirSection = section('directory', 'EQUIPO', 'Directorio de Empleados',
      'Consulta y gestiona toda la información del personal de la empresa.',
      dirContent)

    // ── Recruitment
    const pipelineStages: BarChartItem[] = md?.pipeline || [
      { label: 'Candidaturas Recibidas', value: 145, color: 'var(--text-muted)' },
      { label: 'Screening Telefónico', value: 68, color: 'var(--info)' },
      { label: 'Entrevista Técnica', value: 34, color: 'var(--primary-light)' },
      { label: 'Entrevista Cultural', value: 18, color: 'var(--accent)' },
      { label: 'Oferta Enviada', value: 8, color: 'var(--warning)' },
      { label: 'Contratados', value: 5, color: 'var(--success)' },
    ]

    const openRoles: TableColumn[] = [
      { label: 'Puesto', key: 'role' },
      { label: 'Departamento', key: 'dept' },
      { label: 'Candidatos', key: 'candidates', align: 'center' },
      { label: 'Fase', key: 'stage' },
      { label: 'Prioridad', key: 'priority' },
    ]
    const openRolesRows = md?.openRoles || [
      { role: 'Senior Backend Developer', dept: 'Engineering', candidates: '24', stage: '<span class="badge badge-blue">Entrevistas</span>', priority: '<span class="badge badge-red">Alta</span>' },
      { role: 'Product Designer', dept: 'Engineering', candidates: '18', stage: '<span class="badge badge-yellow">Screening</span>', priority: '<span class="badge badge-yellow">Media</span>' },
      { role: 'Sales Representative', dept: 'Sales', candidates: '31', stage: '<span class="badge badge-green">Oferta</span>', priority: '<span class="badge badge-red">Alta</span>' },
      { role: 'Content Marketing Specialist', dept: 'Marketing', candidates: '22', stage: '<span class="badge badge-blue">Entrevistas</span>', priority: '<span class="badge badge-yellow">Media</span>' },
      { role: 'DevOps Engineer', dept: 'Engineering', candidates: '15', stage: '<span class="badge badge-yellow">Screening</span>', priority: '<span class="badge badge-red">Alta</span>' },
      { role: 'HR Coordinator', dept: 'HR', candidates: '12', stage: '<span class="badge badge-purple">Cultural</span>', priority: '<span class="badge badge-green">Normal</span>' },
    ]

    const recContent = `
      <div class="grid-2" style="margin-bottom:1.5rem">
        <div class="card">
          <div class="card-header"><h3>Pipeline de Reclutamiento</h3><span class="badge badge-accent">Este mes</span></div>
          ${horizontalBarChart(pipelineStages, 145)}
        </div>
        <div class="card">
          <div class="card-header"><h3>Métricas de Hiring</h3></div>
          ${kpiGrid([
            { icon: '⏱️', label: 'Tiempo Medio Contratación', value: md?.avgHireTime || 28, suffix: ' días' },
            { icon: '💰', label: 'Coste por Contratación', value: md?.costPerHire || 3200, prefix: '€' },
            { icon: '📊', label: 'Tasa Aceptación', value: md?.acceptRate || 78, suffix: '%' },
            { icon: '🎯', label: 'Quality of Hire', value: md?.qualityHire || 8.4, suffix: '/10', decimals: 1 },
          ])}
        </div>
      </div>
      <div class="card">
        <div class="card-header"><h3>Posiciones Abiertas</h3><span class="badge badge-primary">${md?.openPositions || 12} activas</span></div>
        ${dataTable(openRoles, openRolesRows)}
      </div>`

    const recSection = section('recruitment', 'RECLUTAMIENTO', 'Pipeline de Talento',
      'Seguimiento completo del proceso de selección, desde la candidatura hasta la contratación.',
      recContent)

    // ── Payroll
    const payCols: TableColumn[] = [
      { label: 'Empleado', key: 'name' },
      { label: 'Departamento', key: 'dept' },
      { label: 'Salario Bruto', key: 'gross', align: 'right' },
      { label: 'SS Empresa', key: 'ss', align: 'right' },
      { label: 'IRPF', key: 'irpf', align: 'right' },
      { label: 'Neto', key: 'net', align: 'right' },
      { label: 'Estado', key: 'status' },
    ]
    const payRows = md?.payrollRows || [
      { name: 'Ana García López', dept: 'Engineering', gross: '4.200,00 €', ss: '1.344,00 €', irpf: '756,00 €', net: '3.100,00 €', status: '<span class="badge badge-green">Pagada</span>' },
      { name: 'Carlos Martínez Ruiz', dept: 'Marketing', gross: '3.600,00 €', ss: '1.152,00 €', irpf: '612,00 €', net: '2.836,00 €', status: '<span class="badge badge-green">Pagada</span>' },
      { name: 'Miguel Torres Sanz', dept: 'Engineering', gross: '5.100,00 €', ss: '1.632,00 €', irpf: '1.071,00 €', net: '3.397,00 €', status: '<span class="badge badge-green">Pagada</span>' },
      { name: 'Laura Fernández Vila', dept: 'Sales', gross: '3.200,00 €', ss: '1.024,00 €', irpf: '512,00 €', net: '2.664,00 €', status: '<span class="badge badge-yellow">Pendiente</span>' },
      { name: 'Elena Rodríguez Pérez', dept: 'HR', gross: '3.800,00 €', ss: '1.216,00 €', irpf: '646,00 €', net: '2.938,00 €', status: '<span class="badge badge-green">Pagada</span>' },
      { name: 'David López Navarro', dept: 'Finance', gross: '4.500,00 €', ss: '1.440,00 €', irpf: '855,00 €', net: '3.205,00 €', status: '<span class="badge badge-green">Pagada</span>' },
      { name: 'Sara Díaz Moreno', dept: 'Engineering', gross: '3.400,00 €', ss: '1.088,00 €', irpf: '544,00 €', net: '2.768,00 €', status: '<span class="badge badge-yellow">Pendiente</span>' },
      { name: 'Javier Sánchez Gil', dept: 'Sales', gross: '5.800,00 €', ss: '1.856,00 €', irpf: '1.334,00 €', net: '3.610,00 €', status: '<span class="badge badge-green">Pagada</span>' },
    ]

    const payContent = `
      ${kpiGrid([
        { icon: '💶', label: 'Masa Salarial Bruta', value: md?.totalGross || 285400, prefix: '€', trend: { value: '+2.1%', direction: 'up' } },
        { icon: '🏦', label: 'SS Empresa Total', value: md?.totalSS || 91328, prefix: '€' },
        { icon: '📊', label: 'Coste Medio/Empleado', value: md?.avgCost || 4580, prefix: '€' },
        { icon: '✅', label: 'Nóminas Procesadas', value: md?.processedPayrolls || 242, suffix: '/248' },
      ])}
      <div class="card" style="margin-top:1.5rem">
        <div class="card-header"><h3>Nóminas — Abril 2026</h3><span class="badge badge-green">96% procesadas</span></div>
        ${dataTable(payCols, payRows)}
      </div>`

    const paySection = section('payroll', 'NÓMINAS', 'Gestión de Nóminas',
      'Resumen de nóminas mensuales con desglose de salario bruto, seguridad social e IRPF.',
      payContent)

    // ── Time Off
    const toCols: TableColumn[] = [
      { label: 'Empleado', key: 'name' },
      { label: 'Tipo', key: 'type' },
      { label: 'Desde', key: 'from' },
      { label: 'Hasta', key: 'to' },
      { label: 'Días', key: 'days', align: 'center' },
      { label: 'Estado', key: 'status' },
      { label: 'Acciones', key: 'actions', align: 'center' },
    ]
    const toRows = md?.leaveRequests || [
      { name: 'Ana García López', type: '🏖️ Vacaciones', from: '21/04/2026', to: '25/04/2026', days: '5', status: '<span class="badge badge-yellow">Pendiente</span>', actions: '<button class="badge badge-green" style="cursor:pointer;border:none" onclick="showNotif(\'✅\',\'Aprobada\',\'Solicitud de Ana aprobada\')">Aprobar</button> <button class="badge badge-red" style="cursor:pointer;border:none" onclick="showNotif(\'❌\',\'Denegada\',\'Solicitud de Ana denegada\')">Denegar</button>' },
      { name: 'Carlos Martínez Ruiz', type: '🤒 Baja Médica', from: '07/04/2026', to: '11/04/2026', days: '5', status: '<span class="badge badge-green">Aprobada</span>', actions: '—' },
      { name: 'Laura Fernández Vila', type: '🏖️ Vacaciones', from: '28/04/2026', to: '09/05/2026', days: '10', status: '<span class="badge badge-yellow">Pendiente</span>', actions: '<button class="badge badge-green" style="cursor:pointer;border:none" onclick="showNotif(\'✅\',\'Aprobada\',\'Solicitud de Laura aprobada\')">Aprobar</button> <button class="badge badge-red" style="cursor:pointer;border:none" onclick="showNotif(\'❌\',\'Denegada\',\'Solicitud de Laura denegada\')">Denegar</button>' },
      { name: 'Miguel Torres Sanz', type: '👶 Paternidad', from: '01/05/2026', to: '16/06/2026', days: '35', status: '<span class="badge badge-green">Aprobada</span>', actions: '—' },
      { name: 'Sara Díaz Moreno', type: '📚 Formación', from: '14/04/2026', to: '16/04/2026', days: '3', status: '<span class="badge badge-yellow">Pendiente</span>', actions: '<button class="badge badge-green" style="cursor:pointer;border:none" onclick="showNotif(\'✅\',\'Aprobada\',\'Solicitud de Sara aprobada\')">Aprobar</button> <button class="badge badge-red" style="cursor:pointer;border:none" onclick="showNotif(\'❌\',\'Denegada\',\'Solicitud de Sara denegada\')">Denegar</button>' },
      { name: 'David López Navarro', type: '🏖️ Vacaciones', from: '05/05/2026', to: '09/05/2026', days: '5', status: '<span class="badge badge-blue">En revisión</span>', actions: '<button class="badge badge-green" style="cursor:pointer;border:none" onclick="showNotif(\'✅\',\'Aprobada\',\'Solicitud de David aprobada\')">Aprobar</button> <button class="badge badge-red" style="cursor:pointer;border:none" onclick="showNotif(\'❌\',\'Denegada\',\'Solicitud de David denegada\')">Denegar</button>' },
    ]

    const leaveTypes: BarChartItem[] = md?.leaveTypes || [
      { label: 'Vacaciones', value: 68, color: 'var(--primary-light)' },
      { label: 'Baja Médica', value: 14, color: 'var(--danger)' },
      { label: 'Paternidad/Maternidad', value: 8, color: 'var(--accent)' },
      { label: 'Formación', value: 12, color: 'var(--info)' },
      { label: 'Asuntos Propios', value: 22, color: 'var(--warning)' },
    ]

    const toContent = `
      ${kpiGrid([
        { icon: '📋', label: 'Solicitudes Pendientes', value: md?.pendingLeaves || 12, trend: { value: '+4 hoy', direction: 'up' } },
        { icon: '✅', label: 'Aprobadas Este Mes', value: md?.approvedLeaves || 34 },
        { icon: '🏖️', label: 'Empleados Ausentes Hoy', value: md?.absentToday || 8 },
        { icon: '📅', label: 'Días Vacaciones Usados (Promedio)', value: md?.avgVacUsed || 12, suffix: '/22' },
      ])}
      <div class="card" style="margin:1.5rem 0">
        <div class="card-header"><h3>Solicitudes Recientes</h3><span class="badge badge-yellow">${md?.pendingLeaves || 12} pendientes</span></div>
        ${dataTable(toCols, toRows)}
      </div>
      <div class="grid-2">
        <div class="card">
          <div class="card-header"><h3>Ausencias por Tipo</h3><span class="badge badge-accent">Este año</span></div>
          ${horizontalBarChart(leaveTypes)}
        </div>
        <div class="card">
          <div class="card-header"><h3>Calendario de Ausencias</h3></div>
          <div style="padding:1rem;text-align:center;color:var(--text-muted);font-size:0.85rem">
            <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px;margin-top:0.5rem">
              ${['L','M','X','J','V','S','D'].map(d => `<div style="font-size:0.65rem;font-weight:700;color:var(--text-dim);padding:4px">${d}</div>`).join('')}
              ${Array.from({length: 30}, (_, i) => {
                const day = i + 1
                const isAbsent = [7,8,9,10,11,21,22,23,24,25].includes(day)
                const isPending = [14,15,16,28,29,30].includes(day)
                const bg = isAbsent ? 'var(--danger)' : isPending ? 'var(--warning)' : 'transparent'
                const opacity = isAbsent || isPending ? '0.3' : '0.1'
                return `<div style="padding:6px;border-radius:6px;font-size:0.72rem;background:${bg};opacity:${isAbsent || isPending ? '1' : '0.6'};${isAbsent || isPending ? `background:rgba(${isAbsent ? '239,68,68' : '245,158,11'},0.15);color:${isAbsent ? 'var(--danger)' : 'var(--warning)'}` : ''}">${day}</div>`
              }).join('')}
            </div>
            <div style="display:flex;gap:1rem;justify-content:center;margin-top:0.8rem;font-size:0.65rem">
              <span><span style="display:inline-block;width:8px;height:8px;border-radius:2px;background:rgba(239,68,68,0.15);margin-right:4px"></span>Aprobada</span>
              <span><span style="display:inline-block;width:8px;height:8px;border-radius:2px;background:rgba(245,158,11,0.15);margin-right:4px"></span>Pendiente</span>
            </div>
          </div>
        </div>
      </div>`

    const toSection = section('timeoff', 'AUSENCIAS', 'Control de Ausencias',
      'Gestiona solicitudes de vacaciones, bajas y permisos del equipo.',
      toContent)

    // ── Analytics
    const retentionByDept: BarChartItem[] = md?.retentionByDept || [
      { label: 'Engineering', value: 94, color: 'var(--success)' },
      { label: 'Marketing', value: 88, color: 'var(--primary-light)' },
      { label: 'Sales', value: 82, color: 'var(--warning)' },
      { label: 'HR', value: 96, color: 'var(--success)' },
      { label: 'Finance', value: 91, color: 'var(--primary-light)' },
      { label: 'Operations', value: 87, color: 'var(--accent)' },
    ]

    const anaContent = `
      ${bigResult(
        md?.eNPS || '+62',
        md?.eNPSLabel || 'Employee Net Promoter Score (eNPS)',
        [
          { title: '94%', subtitle: 'Retención Anual' },
          { title: '28 días', subtitle: 'Tiempo Medio Contratación' },
          { title: '8.7/10', subtitle: 'Satisfacción General' },
        ]
      )}
      <div class="grid-2" style="margin-top:1.5rem">
        <div class="card">
          <div class="card-header"><h3>Retención por Departamento</h3><span class="badge badge-green">Anual</span></div>
          ${horizontalBarChart(retentionByDept, 100)}
        </div>
        <div class="card">
          <div class="card-header"><h3>Métricas de Engagement</h3></div>
          ${progressBar('Participación en Encuestas', md?.surveyParticipation || 87, 'primary')}
          ${progressBar('Uso de Beneficios', md?.benefitsUsage || 72, 'accent')}
          ${progressBar('Formación Completada', md?.trainingCompletion || 64, 'ok')}
          ${progressBar('Objetivos Cumplidos (OKRs)', md?.okrCompletion || 78, 'primary')}
          ${progressBar('Asistencia a Eventos', md?.eventAttendance || 55, 'accent')}
        </div>
      </div>
      <div class="grid-2" style="margin-top:1.5rem">
        <div class="card">
          <div class="card-header"><h3>Headcount Mensual</h3></div>
          ${horizontalBarChart([
            { label: 'Enero', value: 232 },
            { label: 'Febrero', value: 235 },
            { label: 'Marzo', value: 240 },
            { label: 'Abril', value: 248 },
          ], 260)}
        </div>
        <div class="card">
          <div class="card-header"><h3>Coste Salarial por Departamento</h3></div>
          ${horizontalBarChart([
            { label: 'Engineering', value: 124, color: 'var(--primary-light)' },
            { label: 'Sales', value: 68, color: 'var(--accent)' },
            { label: 'Marketing', value: 42, color: 'var(--primary-light)' },
            { label: 'Finance', value: 28, color: 'var(--accent)' },
            { label: 'HR', value: 18, color: 'var(--primary-light)' },
            { label: 'Operations', value: 22, color: 'var(--accent)' },
          ])}
          <div style="font-size:0.65rem;color:var(--text-dim);margin-top:0.5rem">* Miles de euros / mes</div>
        </div>
      </div>`

    const anaSection = section('analytics', 'ANALYTICS', 'People Analytics',
      'Métricas avanzadas de retención, engagement y rendimiento del equipo.',
      anaContent)

    // ── Settings
    const settFields: SettingsField[] = [
      { label: 'Nombre de la Empresa', value: c.businessName, type: 'text' },
      { label: 'Email RRHH', value: md?.hrEmail || 'rrhh@empresa.com', type: 'email' },
      { label: 'Días de Vacaciones por Defecto', value: md?.defaultVacDays || '22', type: 'text' },
      { label: 'Aprobación Automática (<3 días)', value: '', type: 'toggle', enabled: true },
      { label: 'Notificaciones por Email', value: '', type: 'toggle', enabled: true },
      { label: 'Recordatorios de Cumpleaños', value: '', type: 'toggle', enabled: true },
      { label: 'Idioma del Portal', value: 'Español', type: 'select', options: ['Español', 'English', 'Português'] },
    ]

    const settContent = settingsForm(settFields)

    const settSection = section('settings', 'CONFIGURACIÓN', 'Ajustes de RRHH',
      'Personaliza el portal de recursos humanos, notificaciones y políticas.',
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
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap');
${designSystemCSS(c.primaryColor, c.accentColor, c.theme || 'executive')}
body { font-family: 'Manrope', sans-serif; background: #0d0e16; }
.kpi { border-radius: 16px; }
.card { border-radius: 16px; }
.data-tbl tbody td { font-family: 'Manrope', sans-serif; }
</style>
</head>
<body>
${nav}
${notificationContainer()}
${hero}
${dashSection}
${dirSection}
${recSection}
${paySection}
${toSection}
${anaSection}
${settSection}
${footer}
<script>${allScripts()}</script>
</body>
</html>`
  },
}

interface HRMockData {
  heroTagline?: string
  heroSubtitle?: string
  totalEmployees?: number
  openPositions?: number
  turnoverRate?: number
  satisfaction?: number
  deptDistribution?: BarChartItem[]
  alert1?: string
  alert2?: string
  alert3?: string
  alert4?: string
  alertCount?: number
  employees?: Record<string, string>[]
  onsite?: number
  remote?: number
  hybrid?: number
  probation?: number
  pipeline?: BarChartItem[]
  openRoles?: Record<string, string>[]
  avgHireTime?: number
  costPerHire?: number
  acceptRate?: number
  qualityHire?: number
  payrollRows?: Record<string, string>[]
  totalGross?: number
  totalSS?: number
  avgCost?: number
  processedPayrolls?: number
  leaveRequests?: Record<string, string>[]
  leaveTypes?: BarChartItem[]
  pendingLeaves?: number
  approvedLeaves?: number
  absentToday?: number
  avgVacUsed?: number
  retentionByDept?: BarChartItem[]
  surveyParticipation?: number
  benefitsUsage?: number
  trainingCompletion?: number
  okrCompletion?: number
  eventAttendance?: number
  eNPS?: string
  eNPSLabel?: string
  hrEmail?: string
  defaultVacDays?: string
}
