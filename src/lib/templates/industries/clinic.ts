import type { TemplateDefinition, TemplateCustomization } from '../types'
import { designSystemCSS } from '../shared/design-system'
import { allScripts } from '../shared/scripts'
import {
  navBar, heroSection, notificationContainer, section,
  kpiGrid, dataTable, progressBar, horizontalBarChart,
  settingsForm, alertRow, bigResult,
  type KpiData, type TableColumn, type SettingsField, type BarChartItem,
} from '../shared/components'

export const clinicTemplate: TemplateDefinition = {
  meta: {
    id: 'clinic',
    name: 'Clínica Salud Pro',
    industries: ['clinic', 'clínica', 'dental', 'médico', 'doctor', 'hospital', 'salud', 'health', 'citas', 'appointments', 'pacientes', 'patients', 'veterinari'],
    projectTypes: ['landing', 'mvp', 'system', 'saas'],
    sections: ['hero', 'dashboard', 'appointments', 'patients', 'medical-records', 'billing', 'analytics', 'settings'],
    description: 'Plantilla profesional para clínicas y centros de salud. Dashboard con KPIs de pacientes y citas, agenda visual con franjas horarias, gestión de pacientes, historial clínico, facturación con seguros, analytics de rendimiento y configuración.',
  },

  render(c: TemplateCustomization): string {
    const md = c.mockData as ClinicMockData

    // ── Nav
    const nav = navBar(c.businessName, [
      { id: 'hero', label: 'Inicio' },
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'appointments', label: 'Citas' },
      { id: 'patients', label: 'Pacientes' },
      { id: 'medical-records', label: 'Historial' },
      { id: 'billing', label: 'Facturación' },
      { id: 'analytics', label: 'Analytics' },
      { id: 'settings', label: 'Config' },
    ])

    // ── Hero
    const hero = heroSection(
      c.businessName,
      md?.heroTagline || `${c.businessName} — Gestión clínica inteligente`,
      md?.heroSubtitle || 'Agenda de citas, historial clínico digital, facturación automática y analytics de tu clínica.',
      [
        { value: md?.patientsTotal || 2840, label: 'Pacientes' },
        { value: md?.monthlyAppointments || 486, label: 'Citas/Mes' },
        { value: md?.satisfaction || 96, label: 'Satisfacción', suffix: '%' },
        { value: md?.monthlyRevenue || 68500, label: 'Ingresos/Mes', prefix: '€' },
      ],
      `Demo Interactivo — ${c.businessType || 'Clínica'}`
    )

    // ── Dashboard
    const dashKpis: KpiData[] = [
      { icon: '🩺', label: 'Pacientes Hoy', value: md?.patientsToday || 24, trend: { value: '+3 vs ayer', direction: 'up' } },
      { icon: '📅', label: 'Citas Hoy', value: md?.appointmentsToday || 28, trend: { value: '2 libres', direction: 'neutral' } },
      { icon: '😊', label: 'Satisfacción', value: md?.satisfactionScore || 96, suffix: '%', trend: { value: '+2%', direction: 'up' } },
      { icon: '💰', label: 'Facturación Hoy', value: md?.revenueToday || 3420, prefix: '€', trend: { value: '+18%', direction: 'up' } },
    ]

    const appointmentsByType: BarChartItem[] = md?.appointmentsByType || [
      { label: 'Revisión general', value: 42, color: 'var(--primary)' },
      { label: 'Tratamiento dental', value: 35, color: 'var(--accent)' },
      { label: 'Ortodoncia', value: 28, color: 'var(--primary-light)' },
      { label: 'Limpieza', value: 24, color: 'var(--accent)' },
      { label: 'Urgencias', value: 12, color: 'var(--danger)' },
    ]

    const dashAlerts = [
      alertRow('🔴', md?.alert1 || 'Paciente López Ruiz — alergia a penicilina (cita 11:30)', 'Alerta', 'badge-red'),
      alertRow('📋', md?.alert2 || 'Resultados de laboratorio pendientes: García M.', 'Lab', 'badge-yellow'),
      alertRow('🎂', md?.alert3 || 'Cumpleaños paciente VIP: Sra. Fernández (revisión hoy)', 'VIP', 'badge-purple'),
      alertRow('⏰', md?.alert4 || 'Recordatorio: Dr. Martín — guardia mañana 08:00', 'Staff', 'badge-blue'),
    ]

    const dashContent = `
      ${kpiGrid(dashKpis)}
      <div class="grid-2" style="margin-top:1.5rem">
        <div class="card">
          <div class="card-header"><h3>Citas por Tipo</h3><span class="badge badge-accent">Este mes</span></div>
          ${horizontalBarChart(appointmentsByType)}
        </div>
        <div class="card">
          <div class="card-header"><h3>Alertas del Día</h3><span class="badge badge-primary">${md?.alertCount || 4} activas</span></div>
          ${dashAlerts.join('')}
        </div>
      </div>`

    const dashSection = section('dashboard', c.businessType?.toUpperCase() || 'CLÍNICA', 'Panel de Control',
      'Vista en tiempo real de citas, pacientes y rendimiento de tu clínica.',
      dashContent)

    // ── Appointments (timeline view with time slots)
    const timeSlots = md?.timeSlots || [
      { time: '08:30', patient: 'Ana García Moreno', type: 'Revisión general', doctor: 'Dra. Martín', duration: '30 min', status: 'completed', notes: 'Control semestral' },
      { time: '09:00', patient: 'Pedro Sánchez López', type: 'Tratamiento dental', doctor: 'Dr. Ruiz', duration: '45 min', status: 'completed', notes: 'Empaste molar 36' },
      { time: '09:45', patient: 'María Fernández Vila', type: 'Ortodoncia', doctor: 'Dra. López', duration: '30 min', status: 'in-progress', notes: 'Ajuste brackets — mes 8' },
      { time: '10:15', patient: 'Carlos López Ruiz', type: 'Limpieza dental', doctor: 'Dra. Martín', duration: '30 min', status: 'waiting', notes: 'Alergia penicilina' },
      { time: '10:45', patient: 'Laura Díaz Torres', type: 'Revisión general', doctor: 'Dr. Ruiz', duration: '30 min', status: 'confirmed', notes: 'Primera visita' },
      { time: '11:15', patient: 'Javier Rodríguez Pérez', type: 'Tratamiento dental', doctor: 'Dra. López', duration: '60 min', status: 'confirmed', notes: 'Endodoncia pieza 14' },
      { time: '12:15', patient: 'Sofía Martínez García', type: 'Urgencia', doctor: 'Dra. Martín', duration: '30 min', status: 'confirmed', notes: 'Dolor agudo — posible fractura' },
      { time: '12:45', patient: '—', type: 'Libre', doctor: '', duration: '45 min', status: 'free', notes: '' },
    ]

    const statusConfig: Record<string, { badge: string; color: string; label: string }> = {
      completed: { badge: 'badge-green', color: 'var(--success)', label: 'Completada' },
      'in-progress': { badge: 'badge-accent', color: 'var(--accent)', label: 'En curso' },
      waiting: { badge: 'badge-yellow', color: 'var(--warning)', label: 'En sala' },
      confirmed: { badge: 'badge-blue', color: 'var(--info)', label: 'Confirmada' },
      free: { badge: 'badge-primary', color: 'var(--text-dim)', label: 'Libre' },
    }

    const timelineHtml = (timeSlots as TimeSlot[]).map(slot => {
      const st = statusConfig[slot.status] || statusConfig.confirmed
      return `
      <div style="display:flex;gap:16px;padding:12px 0;border-bottom:1px solid var(--border);align-items:center;${slot.status === 'in-progress' ? 'background:rgba(var(--accent-rgb,100,200,180),0.04);border-radius:10px;padding:12px;margin:4px -12px' : ''}">
        <div style="min-width:60px;text-align:center">
          <div style="font-size:1.1rem;font-weight:800;color:${slot.status === 'free' ? 'var(--text-dim)' : 'var(--text)'}">${slot.time}</div>
          <div style="font-size:0.6rem;color:var(--text-dim)">${slot.duration}</div>
        </div>
        <div style="width:3px;height:48px;border-radius:2px;background:${st.color};flex-shrink:0"></div>
        <div style="flex:1">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
            <span style="font-weight:700;font-size:0.85rem">${slot.patient}</span>
            <span class="badge ${st.badge}">${st.label}</span>
          </div>
          <div style="font-size:0.75rem;color:var(--text-muted)">${slot.type}${slot.doctor ? ` · ${slot.doctor}` : ''}</div>
          ${slot.notes ? `<div style="font-size:0.68rem;color:var(--text-dim);margin-top:2px">${slot.notes}</div>` : ''}
        </div>
      </div>`
    }).join('')

    const appointmentsContent = `
      <div class="grid-2" style="margin-bottom:1.5rem">
        ${kpiGrid([
          { icon: '📅', label: 'Citas Hoy', value: md?.appointmentsToday || 28 },
          { icon: '✅', label: 'Completadas', value: md?.completedToday || 8 },
          { icon: '⏳', label: 'Pendientes', value: md?.pendingToday || 18 },
          { icon: '🟢', label: 'Huecos Libres', value: md?.freeSlots || 2 },
        ])}
      </div>
      <div class="card">
        <div class="card-header"><h3>Agenda del Día</h3><span class="badge badge-accent">Hoy — ${new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}</span></div>
        ${timelineHtml}
      </div>
      <div style="margin-top:1rem;display:flex;gap:0.5rem">
        <button class="hero-btn" style="font-size:0.78rem;padding:8px 18px" onclick="showNotif('📅','Cita','Nueva cita programada')">Nueva Cita</button>
        <button class="hero-btn" style="font-size:0.78rem;padding:8px 18px;background:var(--bg-card);border:1px solid var(--border);color:var(--text)" onclick="showNotif('📱','SMS','Recordatorios enviados a pacientes')">Enviar Recordatorios</button>
      </div>`

    const appointmentsSection = section('appointments', 'AGENDA', 'Gestión de Citas',
      'Agenda visual con franjas horarias, estado en tiempo real y recordatorios automáticos.',
      appointmentsContent)

    // ── Patients
    const patientCols: TableColumn[] = [
      { label: 'Paciente', key: 'patient' },
      { label: 'DNI', key: 'dni' },
      { label: 'Edad', key: 'age', align: 'center' },
      { label: 'Teléfono', key: 'phone' },
      { label: 'Última visita', key: 'lastVisit' },
      { label: 'Seguro', key: 'insurance' },
    ]
    const patientRows = md?.patients || [
      { patient: '<div style="display:flex;align-items:center;gap:8px"><div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,var(--primary),var(--accent));display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.7rem;color:#fff">AG</div>Ana García Moreno</div>', dni: '12345678A', age: '42', phone: '612 345 678', lastVisit: 'Hoy', insurance: '<span class="badge badge-blue">Sanitas</span>' },
      { patient: '<div style="display:flex;align-items:center;gap:8px"><div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#6366f1,#8b5cf6);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.7rem;color:#fff">PS</div>Pedro Sánchez López</div>', dni: '23456789B', age: '35', phone: '623 456 789', lastVisit: 'Hoy', insurance: '<span class="badge badge-green">Adeslas</span>' },
      { patient: '<div style="display:flex;align-items:center;gap:8px"><div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#ec4899,#f43f5e);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.7rem;color:#fff">MF</div>María Fernández Vila</div>', dni: '34567890C', age: '28', phone: '634 567 890', lastVisit: 'Hoy', insurance: '<span class="badge badge-purple">DKV</span>' },
      { patient: '<div style="display:flex;align-items:center;gap:8px"><div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#14b8a6,#06b6d4);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.7rem;color:#fff">CL</div>Carlos López Ruiz</div>', dni: '45678901D', age: '56', phone: '645 678 901', lastVisit: 'Hace 3 días', insurance: '<span class="badge badge-yellow">Privado</span>' },
      { patient: '<div style="display:flex;align-items:center;gap:8px"><div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#f59e0b,#f97316);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.7rem;color:#fff">LD</div>Laura Díaz Torres</div>', dni: '56789012E', age: '31', phone: '656 789 012', lastVisit: 'Hace 1 semana', insurance: '<span class="badge badge-blue">Sanitas</span>' },
      { patient: '<div style="display:flex;align-items:center;gap:8px"><div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#a855f7,#7c3aed);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.7rem;color:#fff">JR</div>Javier Rodríguez Pérez</div>', dni: '67890123F', age: '48', phone: '667 890 123', lastVisit: 'Hace 2 semanas', insurance: '<span class="badge badge-green">Adeslas</span>' },
    ]

    const patientsContent = `
      <div class="grid-2" style="margin-bottom:1.5rem">
        ${kpiGrid([
          { icon: '👥', label: 'Total Pacientes', value: md?.patientsTotal || 2840 },
          { icon: '🆕', label: 'Nuevos este mes', value: md?.newPatientsMonth || 34 },
          { icon: '🔄', label: 'Recurrentes', value: md?.recurringPct || 78, suffix: '%' },
          { icon: '📋', label: 'Con seguro', value: md?.insuredPct || 82, suffix: '%' },
        ])}
      </div>
      <div class="card">${dataTable(patientCols, patientRows)}</div>
      <div style="margin-top:1rem;display:flex;gap:0.5rem">
        <button class="hero-btn" style="font-size:0.78rem;padding:8px 18px" onclick="showNotif('➕','Paciente','Nuevo paciente registrado')">Nuevo Paciente</button>
        <button class="hero-btn" style="font-size:0.78rem;padding:8px 18px;background:var(--bg-card);border:1px solid var(--border);color:var(--text)" onclick="showNotif('🔍','Búsqueda','Buscando paciente...')">Buscar Paciente</button>
      </div>`

    const patientsSection = section('patients', 'PACIENTES', 'Gestión de Pacientes',
      'Base de datos de pacientes con historial, contacto y seguro médico.',
      patientsContent)

    // ── Medical Records (card with patient detail)
    const selectedPatient = md?.selectedPatient || {
      name: 'Ana García Moreno',
      age: 42,
      dni: '12345678A',
      phone: '612 345 678',
      insurance: 'Sanitas — Póliza Premium',
      allergies: 'Ninguna conocida',
      bloodType: 'A+',
      nextAppointment: '15 Abril 2026 — Revisión semestral',
    }

    const treatmentHistory = md?.treatmentHistory || [
      { date: '09/04/2026', type: 'Revisión general', doctor: 'Dra. Martín', notes: 'Control semestral. Todo correcto. Próxima revisión en 6 meses.', cost: '€60' },
      { date: '15/10/2025', type: 'Limpieza dental', doctor: 'Dra. Martín', notes: 'Limpieza profunda. Recomendada revisión periodontal.', cost: '€80' },
      { date: '22/06/2025', type: 'Empaste', doctor: 'Dr. Ruiz', notes: 'Empaste composite pieza 26. Sin complicaciones.', cost: '€95' },
      { date: '10/03/2025', type: 'Revisión general', doctor: 'Dra. Martín', notes: 'Control rutinario. Detectada caries incipiente pieza 26.', cost: '€60' },
      { date: '12/09/2024', type: 'Radiografía', doctor: 'Dr. Ruiz', notes: 'Ortopantomografía de control. Resultados normales.', cost: '€45' },
    ]

    const sp = selectedPatient as PatientDetail
    const treatmentHtml = (treatmentHistory as TreatmentRecord[]).map(t => `
      <div style="display:flex;gap:12px;padding:10px 0;border-bottom:1px solid var(--border)">
        <div style="min-width:85px">
          <div style="font-weight:700;font-size:0.78rem">${t.date}</div>
          <div style="font-size:0.62rem;color:var(--text-dim)">${t.cost}</div>
        </div>
        <div style="width:3px;border-radius:2px;background:var(--primary);flex-shrink:0"></div>
        <div>
          <div style="font-weight:600;font-size:0.8rem">${t.type}</div>
          <div style="font-size:0.7rem;color:var(--text-muted)">${t.doctor}</div>
          <div style="font-size:0.72rem;color:var(--text-muted);margin-top:3px">${t.notes}</div>
        </div>
      </div>
    `).join('')

    const medicalContent = `
      <div class="grid-2" style="align-items:start">
        <div class="card">
          <div class="card-header"><h3>Ficha del Paciente</h3><span class="badge badge-accent">Activo</span></div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:1rem">
            <div>
              <div style="font-size:0.62rem;color:var(--text-dim);text-transform:uppercase;letter-spacing:1px">Nombre</div>
              <div style="font-weight:700;font-size:0.88rem;margin-top:2px">${sp.name}</div>
            </div>
            <div>
              <div style="font-size:0.62rem;color:var(--text-dim);text-transform:uppercase;letter-spacing:1px">Edad</div>
              <div style="font-weight:700;font-size:0.88rem;margin-top:2px">${sp.age} años</div>
            </div>
            <div>
              <div style="font-size:0.62rem;color:var(--text-dim);text-transform:uppercase;letter-spacing:1px">DNI</div>
              <div style="font-weight:700;font-size:0.88rem;margin-top:2px">${sp.dni}</div>
            </div>
            <div>
              <div style="font-size:0.62rem;color:var(--text-dim);text-transform:uppercase;letter-spacing:1px">Teléfono</div>
              <div style="font-weight:700;font-size:0.88rem;margin-top:2px">${sp.phone}</div>
            </div>
            <div>
              <div style="font-size:0.62rem;color:var(--text-dim);text-transform:uppercase;letter-spacing:1px">Grupo Sanguíneo</div>
              <div style="font-weight:700;font-size:0.88rem;margin-top:2px;color:var(--accent)">${sp.bloodType}</div>
            </div>
            <div>
              <div style="font-size:0.62rem;color:var(--text-dim);text-transform:uppercase;letter-spacing:1px">Alergias</div>
              <div style="font-weight:700;font-size:0.88rem;margin-top:2px">${sp.allergies}</div>
            </div>
            <div style="grid-column:1/-1">
              <div style="font-size:0.62rem;color:var(--text-dim);text-transform:uppercase;letter-spacing:1px">Seguro</div>
              <div style="font-weight:700;font-size:0.88rem;margin-top:2px">${sp.insurance}</div>
            </div>
            <div style="grid-column:1/-1">
              <div style="font-size:0.62rem;color:var(--text-dim);text-transform:uppercase;letter-spacing:1px">Próxima cita</div>
              <div style="font-weight:700;font-size:0.88rem;margin-top:2px;color:var(--primary)">${sp.nextAppointment}</div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header"><h3>Historial de Tratamientos</h3><span class="badge badge-primary">${treatmentHistory.length} registros</span></div>
          ${treatmentHtml}
        </div>
      </div>`

    const medicalSection = section('medical-records', 'HISTORIAL CLÍNICO', 'Historia Médica',
      'Historial completo del paciente con tratamientos, notas y documentación.',
      medicalContent)

    // ── Billing
    const billCols: TableColumn[] = [
      { label: 'Factura', key: 'invoice' },
      { label: 'Paciente', key: 'patient' },
      { label: 'Tratamiento', key: 'treatment' },
      { label: 'Importe', key: 'amount', align: 'right' },
      { label: 'Seguro', key: 'insurance' },
      { label: 'Estado', key: 'status' },
    ]
    const billRows = md?.invoices || [
      { invoice: '<strong>FAC-2026-0412</strong>', patient: 'Ana García M.', treatment: 'Revisión general', amount: '<strong style="color:var(--accent)">€60.00</strong>', insurance: 'Sanitas (80%)', status: '<span class="badge badge-green">Pagada</span>' },
      { invoice: '<strong>FAC-2026-0411</strong>', patient: 'Pedro Sánchez L.', treatment: 'Empaste molar 36', amount: '<strong style="color:var(--accent)">€95.00</strong>', insurance: 'Adeslas (70%)', status: '<span class="badge badge-green">Pagada</span>' },
      { invoice: '<strong>FAC-2026-0410</strong>', patient: 'María Fernández V.', treatment: 'Ortodoncia — ajuste', amount: '<strong style="color:var(--accent)">€120.00</strong>', insurance: 'DKV (60%)', status: '<span class="badge badge-green">Pagada</span>' },
      { invoice: '<strong>FAC-2026-0409</strong>', patient: 'Carlos López R.', treatment: 'Limpieza dental', amount: '<strong style="color:var(--accent)">€80.00</strong>', insurance: 'Privado', status: '<span class="badge badge-yellow">Pendiente</span>' },
      { invoice: '<strong>FAC-2026-0408</strong>', patient: 'Laura Díaz T.', treatment: 'Radiografía + revisión', amount: '<strong style="color:var(--accent)">€105.00</strong>', insurance: 'Sanitas (80%)', status: '<span class="badge badge-green">Pagada</span>' },
      { invoice: '<strong>FAC-2026-0407</strong>', patient: 'Javier Rodríguez P.', treatment: 'Endodoncia pieza 14', amount: '<strong style="color:var(--accent)">€350.00</strong>', insurance: 'Adeslas (70%)', status: '<span class="badge badge-blue">En proceso</span>' },
    ]

    const billingContent = `
      <div class="grid-2" style="margin-bottom:1.5rem">
        ${kpiGrid([
          { icon: '💰', label: 'Facturado Mes', value: md?.monthlyBilling || 68500, prefix: '€' },
          { icon: '✅', label: 'Cobrado', value: md?.collected || 58200, prefix: '€' },
          { icon: '⏳', label: 'Pendiente', value: md?.pendingBilling || 10300, prefix: '€' },
          { icon: '🏥', label: 'Vía Seguro', value: md?.insurancePct || 74, suffix: '%' },
        ])}
      </div>
      <div class="card">${dataTable(billCols, billRows)}</div>
      <div style="margin-top:1rem;display:flex;gap:0.5rem">
        <button class="hero-btn" style="font-size:0.78rem;padding:8px 18px" onclick="showNotif('🧾','Factura','Nueva factura generada')">Nueva Factura</button>
        <button class="hero-btn" style="font-size:0.78rem;padding:8px 18px;background:var(--bg-card);border:1px solid var(--border);color:var(--text)" onclick="showNotif('📊','Informe','Informe fiscal generado')">Informe Fiscal</button>
      </div>`

    const billingSection = section('billing', 'FACTURACIÓN', 'Facturación y Cobros',
      'Gestión de facturas, cobros y liquidación con compañías aseguradoras.',
      billingContent)

    // ── Analytics
    const revenueByMonth: BarChartItem[] = md?.revenueByMonth || [
      { label: 'Oct 2025', value: 58000 },
      { label: 'Nov 2025', value: 62000 },
      { label: 'Dic 2025', value: 54000 },
      { label: 'Ene 2026', value: 61000 },
      { label: 'Feb 2026', value: 65000 },
      { label: 'Mar 2026', value: 68500, color: 'var(--accent)' },
    ]

    const analyticsContent = `
      <div class="grid-2">
        <div class="card">
          <div class="card-header"><h3>Facturación Mensual</h3></div>
          ${horizontalBarChart(revenueByMonth)}
        </div>
        <div class="card">
          <div class="card-header"><h3>Métricas Clave</h3></div>
          ${progressBar('Ocupación agenda', md?.agendaOccupancy || 88, 'primary')}
          ${progressBar('Satisfacción pacientes', md?.satisfactionPct || 96, 'ok')}
          ${progressBar('Retención pacientes', md?.retentionPct || 82, 'accent')}
          ${progressBar('Puntualidad citas', md?.punctuality || 91, 'ok')}
        </div>
      </div>
      <div style="margin-top:1.5rem">
        ${bigResult(
          md?.yearlyRevenueStr || '€820,000',
          md?.yearlyRevenueLabel || 'Facturación anual proyectada',
          [
            { title: md?.avgVisitValue || '€142', subtitle: 'Valor medio/visita' },
            { title: md?.yearlyPatients || '5,832', subtitle: 'Visitas/año' },
            { title: md?.retentionStr || '82%', subtitle: 'Retención' },
          ]
        )}
      </div>`

    const anaSection = section('analytics', 'ANALYTICS', 'Rendimiento de la Clínica',
      'Análisis de facturación, ocupación, satisfacción y rendimiento del equipo.',
      analyticsContent)

    // ── Settings
    const settingsFields: SettingsField[] = [
      { label: 'Nombre de la clínica', value: c.businessName, type: 'text' },
      { label: 'Email de contacto', value: md?.settingsEmail || `citas@${c.businessName.toLowerCase().replace(/\s/g, '')}.com`, type: 'email' },
      { label: 'Hora apertura', value: md?.openTime || '08:00', type: 'text' },
      { label: 'Hora cierre', value: md?.closeTime || '20:00', type: 'text' },
      { label: 'Recordatorio SMS automático', value: '', type: 'toggle', enabled: true },
      { label: 'Confirmación cita por email', value: '', type: 'toggle', enabled: true },
      { label: 'Historial clínico digital', value: '', type: 'toggle', enabled: true },
      { label: 'Recetas electrónicas', value: '', type: 'toggle', enabled: false },
    ]

    const settContent = settingsForm(settingsFields)
    const settSection = section('settings', 'CONFIGURACIÓN', 'Ajustes de la Clínica',
      'Personaliza horarios, notificaciones, integraciones y automatizaciones.',
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
</head>
<body>
${nav}
${notificationContainer()}
${hero}
${dashSection}
${appointmentsSection}
${patientsSection}
${medicalSection}
${billingSection}
${anaSection}
${settSection}
${footer}
<script>${allScripts()}</script>
</body>
</html>`
  },
}

interface TimeSlot {
  time: string
  patient: string
  type: string
  doctor: string
  duration: string
  status: string
  notes: string
}

interface PatientDetail {
  name: string
  age: number
  dni: string
  phone: string
  insurance: string
  allergies: string
  bloodType: string
  nextAppointment: string
}

interface TreatmentRecord {
  date: string
  type: string
  doctor: string
  notes: string
  cost: string
}

interface ClinicMockData {
  heroTagline?: string
  heroSubtitle?: string
  patientsTotal?: number
  monthlyAppointments?: number
  satisfaction?: number
  monthlyRevenue?: number
  patientsToday?: number
  appointmentsToday?: number
  satisfactionScore?: number
  revenueToday?: number
  appointmentsByType?: BarChartItem[]
  alert1?: string
  alert2?: string
  alert3?: string
  alert4?: string
  alertCount?: number
  timeSlots?: TimeSlot[]
  completedToday?: number
  pendingToday?: number
  freeSlots?: number
  patients?: Record<string, string>[]
  newPatientsMonth?: number
  recurringPct?: number
  insuredPct?: number
  selectedPatient?: PatientDetail
  treatmentHistory?: TreatmentRecord[]
  invoices?: Record<string, string>[]
  monthlyBilling?: number
  collected?: number
  pendingBilling?: number
  insurancePct?: number
  revenueByMonth?: BarChartItem[]
  agendaOccupancy?: number
  satisfactionPct?: number
  retentionPct?: number
  punctuality?: number
  yearlyRevenueStr?: string
  yearlyRevenueLabel?: string
  avgVisitValue?: string
  yearlyPatients?: string
  retentionStr?: string
  settingsEmail?: string
  openTime?: string
  closeTime?: string
}
