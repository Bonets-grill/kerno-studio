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

export const gymTemplate: TemplateDefinition = {
  meta: {
    id: 'gym',
    name: 'Gimnasio Premium',
    industries: ['gym', 'gimnasio', 'fitness', 'crossfit', 'yoga', 'pilates', 'deporte', 'sport', 'entrenamiento', 'training'],
    projectTypes: ['landing', 'mvp', 'system', 'saas'],
    sections: ['hero', 'dashboard', 'members', 'classes', 'access-log', 'trainers', 'analytics', 'settings'],
    description: 'Plantilla premium para gimnasios, centros de fitness y deportivos. Dashboard de miembros y clases, control de accesos, gestión de entrenadores, horarios de actividades y analytics de rendimiento.',
  },

  render(c: TemplateCustomization): string {
    const md = c.mockData as GymMockData

    // ── Override CSS for sporty feel
    const overrideCSS = `
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&display=swap');
body { font-family: 'Rajdhani', sans-serif !important; }
.s-title, .hero-h1, .kpi-val, .hero-stat-val { font-family: 'Rajdhani', sans-serif !important; text-transform: uppercase; letter-spacing: 1px; }
.nav-link { text-transform: uppercase; letter-spacing: 1.5px; font-family: 'Rajdhani', sans-serif !important; font-weight: 700; }
.nav-brand { font-family: 'Rajdhani', sans-serif !important; letter-spacing: 3px; text-transform: uppercase; }
.nav { border-bottom: 3px solid var(--accent) !important; }
.nav-link.active { border-bottom: 3px solid var(--accent); background: none !important; color: var(--accent) !important; border-radius: 0; }
.card { border-left: 3px solid var(--accent); }
.kpi { border-left: 4px solid var(--accent) !important; }
.s-label { color: var(--accent); font-family: 'Rajdhani', sans-serif; font-weight: 700; }
.hero-btn { text-transform: uppercase; letter-spacing: 2px; font-family: 'Rajdhani', sans-serif; border-radius: 4px !important; }
.badge { text-transform: uppercase; letter-spacing: 0.5px; }
:root { --bg: #080808 !important; --bg-elevated: #0e0e0e !important; --bg-card: #141414 !important; --bg-card-hover: #1a1a1a !important; }

.class-grid { display: grid; grid-template-columns: 80px repeat(5, 1fr); gap: 1px; background: var(--border); border-radius: 12px; overflow: hidden; font-size: 0.78rem; }
.class-grid-header { background: rgba(var(--accent-rgb, 255,107,0), 0.15); padding: 10px 8px; text-align: center; font-weight: 700; text-transform: uppercase; font-size: 0.66rem; letter-spacing: 1px; color: var(--accent); }
.class-grid-time { background: var(--bg-elevated); padding: 10px 8px; text-align: center; font-weight: 700; color: var(--text-muted); font-size: 0.72rem; }
.class-grid-cell { background: var(--bg-card); padding: 8px 6px; text-align: center; min-height: 50px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px; }
.class-grid-cell .class-name { font-weight: 700; font-size: 0.72rem; color: var(--text); }
.class-grid-cell .class-trainer { font-size: 0.62rem; color: var(--text-muted); }
.class-grid-cell.highlight { background: rgba(var(--accent-rgb, 255,107,0), 0.08); border: 1px solid var(--accent); }
.class-grid-cell.empty { opacity: 0.3; }

.trainer-card { background: var(--bg-card); border-radius: 12px; border-left: 4px solid var(--accent); padding: 1.2rem; transition: all 0.3s; }
.trainer-card:hover { background: var(--bg-card-hover); transform: translateY(-2px); }
.trainer-avatar { width: 56px; height: 56px; border-radius: 50%; background: linear-gradient(135deg, var(--primary), var(--accent)); display: flex; align-items: center; justify-content: center; font-size: 1.4rem; font-weight: 800; color: #fff; }
.trainer-name { font-size: 1rem; font-weight: 700; text-transform: uppercase; }
.trainer-spec { font-size: 0.72rem; color: var(--accent); text-transform: uppercase; letter-spacing: 1px; }
.trainer-bio { font-size: 0.78rem; color: var(--text-muted); line-height: 1.5; margin-top: 6px; }
.trainer-stats { display: flex; gap: 1rem; margin-top: 8px; }
.trainer-stat { text-align: center; }
.trainer-stat-val { font-size: 1.1rem; font-weight: 800; color: var(--accent); }
.trainer-stat-lbl { font-size: 0.58rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; }

@media (max-width: 768px) {
  .class-grid { grid-template-columns: 60px repeat(5, 1fr); font-size: 0.64rem; }
  .trainer-card { padding: 1rem; }
}
`

    // ── Nav
    const nav = navBar(c.businessName, [
      { id: 'hero', label: 'Inicio' },
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'members', label: 'Miembros' },
      { id: 'classes', label: 'Clases' },
      { id: 'access-log', label: 'Accesos' },
      { id: 'trainers', label: 'Entrenadores' },
      { id: 'analytics', label: 'Analytics' },
      { id: 'settings', label: 'Config' },
    ])

    // ── Hero
    const hero = heroSection(
      c.businessName,
      md?.heroTagline || 'Entrena sin límites. Supera tus metas.',
      md?.heroSubtitle || 'Gestión integral de tu centro deportivo: miembros, clases, accesos y rendimiento en tiempo real.',
      [
        { value: md?.totalMembers || 1247, label: 'Miembros Activos' },
        { value: md?.monthlyRevenue || 38500, label: 'Ingresos/Mes', prefix: '€' },
        { value: md?.classesPerWeek || 86, label: 'Clases/Semana' },
        { value: md?.retentionRate || '94%', label: 'Retención' },
      ],
      `Demo Interactivo — ${c.businessType || 'Gimnasio'}`
    )

    // ── Dashboard
    const dashKpis: KpiData[] = [
      { icon: '💪', label: 'Miembros Activos', value: md?.totalMembers || 1247, trend: { value: '+32 este mes', direction: 'up' } },
      { icon: '📅', label: 'Clases Hoy', value: md?.classesToday || 14, trend: { value: '3 llenas', direction: 'neutral' } },
      { icon: '💰', label: 'Ingresos Mes', value: md?.monthlyRevenue || 38500, prefix: '€', trend: { value: '+12%', direction: 'up' } },
      { icon: '🚪', label: 'Check-ins Hoy', value: md?.checkinsToday || 187, trend: { value: '+23 vs ayer', direction: 'up' } },
    ]

    const classPopularity: BarChartItem[] = md?.classPopularity || [
      { label: 'CrossFit', value: 94, color: 'var(--accent)' },
      { label: 'Yoga Flow', value: 87, color: 'var(--primary-light)' },
      { label: 'HIIT', value: 82, color: 'var(--accent)' },
      { label: 'Boxing', value: 76, color: 'var(--primary-light)' },
      { label: 'Spinning', value: 71, color: 'var(--accent)' },
      { label: 'Pilates', value: 65, color: 'var(--primary-light)' },
    ]

    const dashAlerts = [
      alertRow('🔴', md?.alert1 || 'Sala 2 — clase de CrossFit completa (25/25)', 'Lleno', 'badge-red'),
      alertRow('⚠️', md?.alert2 || 'Mantenimiento cinta #7 programado para mañana', 'Manten.', 'badge-yellow'),
      alertRow('🎉', md?.alert3 || 'Meta mensual de nuevas altas alcanzada (+50)', 'Meta', 'badge-green'),
      alertRow('💳', md?.alert4 || '3 cuotas vencidas pendientes de cobro', 'Cobro', 'badge-red'),
    ]

    const dashContent = `
      ${kpiGrid(dashKpis)}
      <div class="grid-2" style="margin-top:1.5rem">
        <div class="card">
          <div class="card-header"><h3>Popularidad de Clases</h3><span class="badge badge-accent">Esta semana</span></div>
          ${horizontalBarChart(classPopularity, 100)}
        </div>
        <div class="card">
          <div class="card-header"><h3>Alertas del Centro</h3><span class="badge badge-primary">${md?.alertCount || 4} activas</span></div>
          ${dashAlerts.join('')}
        </div>
      </div>`

    const dashSection = section('dashboard', c.businessType?.toUpperCase() || 'GIMNASIO', 'Panel de Control',
      'Vista en tiempo real del rendimiento de tu centro deportivo.',
      dashContent)

    // ── Members
    const memberCols: TableColumn[] = [
      { label: 'Miembro', key: 'name' },
      { label: 'Plan', key: 'plan' },
      { label: 'Inicio', key: 'startDate' },
      { label: 'Vencimiento', key: 'endDate' },
      { label: 'Estado', key: 'status' },
      { label: 'Visitas/Mes', key: 'visits', align: 'center' },
    ]
    const memberRows = md?.members || [
      { name: 'Carlos Martínez', plan: '<span class="badge badge-accent">Premium</span>', startDate: '15/01/2026', endDate: '15/01/2027', status: '<span class="badge badge-green">Activo</span>', visits: '22' },
      { name: 'Ana García López', plan: '<span class="badge badge-purple">VIP</span>', startDate: '03/03/2026', endDate: '03/03/2027', status: '<span class="badge badge-green">Activo</span>', visits: '18' },
      { name: 'Miguel Fernández', plan: '<span class="badge badge-primary">Básico</span>', startDate: '20/09/2025', endDate: '20/09/2026', status: '<span class="badge badge-green">Activo</span>', visits: '12' },
      { name: 'Laura Sánchez', plan: '<span class="badge badge-accent">Premium</span>', startDate: '01/02/2026', endDate: '01/02/2027', status: '<span class="badge badge-green">Activo</span>', visits: '26' },
      { name: 'Pedro Rodríguez', plan: '<span class="badge badge-primary">Básico</span>', startDate: '10/06/2025', endDate: '10/06/2026', status: '<span class="badge badge-yellow">Por vencer</span>', visits: '8' },
      { name: 'Sofía López Torres', plan: '<span class="badge badge-accent">Premium</span>', startDate: '22/11/2025', endDate: '22/11/2026', status: '<span class="badge badge-green">Activo</span>', visits: '20' },
      { name: 'Javier Díaz Ruiz', plan: '<span class="badge badge-primary">Básico</span>', startDate: '05/04/2025', endDate: '05/04/2026', status: '<span class="badge badge-red">Vencido</span>', visits: '3' },
      { name: 'María Torres Gil', plan: '<span class="badge badge-purple">VIP</span>', startDate: '18/12/2025', endDate: '18/12/2026', status: '<span class="badge badge-green">Activo</span>', visits: '24' },
    ]

    const planDistribution: BarChartItem[] = md?.planDistribution || [
      { label: 'Premium (€59/mes)', value: 487, color: 'var(--accent)' },
      { label: 'Básico (€29/mes)', value: 534, color: 'var(--primary-light)' },
      { label: 'VIP (€89/mes)', value: 156, color: '#a855f7' },
      { label: 'Estudiante (€19/mes)', value: 70, color: 'var(--success)' },
    ]

    const membersContent = `
      <div class="card" style="margin-bottom:1.5rem">${dataTable(memberCols, memberRows)}</div>
      <div class="grid-2">
        <div class="card">
          <div class="card-header"><h3>Distribución de Planes</h3></div>
          ${horizontalBarChart(planDistribution)}
        </div>
        <div class="card">
          <div class="card-header"><h3>Resumen</h3></div>
          ${kpiGrid([
            { icon: '👥', label: 'Total Miembros', value: md?.totalMembers || 1247 },
            { icon: '🆕', label: 'Altas Mes', value: md?.newMembers || 52 },
            { icon: '🚪', label: 'Bajas Mes', value: md?.churnMembers || 18 },
            { icon: '💰', label: 'MRR', value: md?.mrr || 52300, prefix: '€' },
          ])}
        </div>
      </div>`

    const membersSection = section('members', 'MIEMBROS', 'Gestión de Miembros',
      'Control completo de membresías, planes y actividad de tus socios.',
      membersContent)

    // ── Classes (Schedule Grid)
    const days = ['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE']
    const times = ['07:00', '09:00', '10:30', '12:00', '17:00', '18:30', '20:00']
    const schedule: Record<string, Record<string, { name: string; trainer: string; highlight?: boolean }>> = md?.schedule || {
      '07:00': { 'LUN': { name: 'CrossFit', trainer: 'Carlos M.' }, 'MAR': { name: 'Running', trainer: 'Ana G.' }, 'MIÉ': { name: 'CrossFit', trainer: 'Carlos M.', highlight: true }, 'JUE': { name: 'Running', trainer: 'Ana G.' }, 'VIE': { name: 'CrossFit', trainer: 'Carlos M.' } },
      '09:00': { 'LUN': { name: 'Yoga Flow', trainer: 'María T.' }, 'MAR': { name: 'Pilates', trainer: 'Sofía L.' }, 'MIÉ': { name: 'Yoga Flow', trainer: 'María T.' }, 'JUE': { name: 'Pilates', trainer: 'Sofía L.' }, 'VIE': { name: 'Yoga Flow', trainer: 'María T.' } },
      '10:30': { 'LUN': { name: 'HIIT', trainer: 'Pedro R.', highlight: true }, 'MAR': { name: 'Spinning', trainer: 'Javier D.' }, 'MIÉ': { name: 'HIIT', trainer: 'Pedro R.' }, 'JUE': { name: 'Spinning', trainer: 'Javier D.' }, 'VIE': { name: 'HIIT', trainer: 'Pedro R.' } },
      '12:00': { 'LUN': { name: 'Boxing', trainer: 'Miguel F.' }, 'MIÉ': { name: 'Boxing', trainer: 'Miguel F.' }, 'VIE': { name: 'Boxing', trainer: 'Miguel F.' } },
      '17:00': { 'LUN': { name: 'Spinning', trainer: 'Javier D.' }, 'MAR': { name: 'Zumba', trainer: 'Laura S.' }, 'MIÉ': { name: 'Spinning', trainer: 'Javier D.' }, 'JUE': { name: 'Zumba', trainer: 'Laura S.' }, 'VIE': { name: 'Body Pump', trainer: 'Carlos M.' } },
      '18:30': { 'LUN': { name: 'CrossFit', trainer: 'Carlos M.', highlight: true }, 'MAR': { name: 'Yoga Power', trainer: 'María T.' }, 'MIÉ': { name: 'CrossFit', trainer: 'Carlos M.' }, 'JUE': { name: 'Yoga Power', trainer: 'María T.' }, 'VIE': { name: 'CrossFit', trainer: 'Carlos M.', highlight: true } },
      '20:00': { 'LUN': { name: 'HIIT', trainer: 'Pedro R.' }, 'MAR': { name: 'Boxing', trainer: 'Miguel F.' }, 'MIÉ': { name: 'Funcional', trainer: 'Pedro R.' }, 'JUE': { name: 'Boxing', trainer: 'Miguel F.' }, 'VIE': { name: 'Open Gym', trainer: '—' } },
    }

    let gridCells = `<div class="class-grid-header"></div>`
    days.forEach(d => { gridCells += `<div class="class-grid-header">${d}</div>` })
    times.forEach(t => {
      gridCells += `<div class="class-grid-time">${t}</div>`
      days.forEach(d => {
        const cell = schedule[t]?.[d]
        if (cell) {
          gridCells += `<div class="class-grid-cell${cell.highlight ? ' highlight' : ''}"><span class="class-name">${cell.name}</span><span class="class-trainer">${cell.trainer}</span></div>`
        } else {
          gridCells += `<div class="class-grid-cell empty">—</div>`
        }
      })
    })

    const classesContent = `
      <div class="card" style="margin-bottom:1.5rem">
        <div class="card-header"><h3>Horario Semanal</h3><span class="badge badge-accent">Semana actual</span></div>
        <div class="class-grid">${gridCells}</div>
      </div>
      <div class="grid-2">
        <div class="card">
          <div class="card-header"><h3>Ocupación por Clase</h3></div>
          ${progressBar('CrossFit (25/25)', 100, 'accent')}
          ${progressBar('HIIT (22/25)', 88, 'primary')}
          ${progressBar('Yoga Flow (18/20)', 90, 'ok')}
          ${progressBar('Boxing (15/20)', 75, 'primary')}
          ${progressBar('Spinning (20/25)', 80, 'accent')}
          ${progressBar('Pilates (12/15)', 80, 'ok')}
        </div>
        <div class="card">
          <div class="card-header"><h3>Esta Semana</h3></div>
          ${kpiGrid([
            { icon: '📅', label: 'Clases Programadas', value: 86 },
            { icon: '👥', label: 'Reservas Totales', value: 1420 },
            { icon: '❌', label: 'Cancelaciones', value: 23 },
            { icon: '📊', label: 'Asistencia Media', value: 87, suffix: '%' },
          ])}
        </div>
      </div>`

    const classesSection = section('classes', 'CLASES', 'Horario de Actividades',
      'Planificación semanal de todas las clases y actividades dirigidas.',
      classesContent)

    // ── Access Log
    const accessCols: TableColumn[] = [
      { label: 'Hora', key: 'time' },
      { label: 'Miembro', key: 'name' },
      { label: 'Plan', key: 'plan' },
      { label: 'Acceso', key: 'type' },
      { label: 'Estado', key: 'status' },
    ]
    const accessRows = md?.accessLog || [
      { time: '06:45', name: 'Carlos Martínez', plan: 'Premium', type: '🚪 Entrada', status: '<span class="badge badge-green">OK</span>' },
      { time: '06:52', name: 'Laura Sánchez', plan: 'Premium', type: '🚪 Entrada', status: '<span class="badge badge-green">OK</span>' },
      { time: '07:01', name: 'Miguel Fernández', plan: 'Básico', type: '🚪 Entrada', status: '<span class="badge badge-green">OK</span>' },
      { time: '07:15', name: 'Ana García', plan: 'VIP', type: '🚪 Entrada', status: '<span class="badge badge-green">OK</span>' },
      { time: '07:32', name: 'Pedro Rodríguez', plan: 'Básico', type: '🚪 Entrada', status: '<span class="badge badge-red">Vencido</span>' },
      { time: '08:10', name: 'Carlos Martínez', plan: 'Premium', type: '🚶 Salida', status: '<span class="badge badge-blue">1h 25min</span>' },
      { time: '08:15', name: 'Sofía López', plan: 'Premium', type: '🚪 Entrada', status: '<span class="badge badge-green">OK</span>' },
      { time: '08:22', name: 'Javier Díaz', plan: 'Básico', type: '🚪 Entrada', status: '<span class="badge badge-yellow">Última semana</span>' },
      { time: '08:30', name: 'María Torres', plan: 'VIP', type: '🚪 Entrada', status: '<span class="badge badge-green">OK</span>' },
      { time: '08:45', name: 'Laura Sánchez', plan: 'Premium', type: '🚶 Salida', status: '<span class="badge badge-blue">1h 53min</span>' },
    ]

    const peakHours: BarChartItem[] = md?.peakHours || [
      { label: '06:00 - 08:00', value: 87, color: 'var(--accent)' },
      { label: '08:00 - 10:00', value: 64, color: 'var(--primary-light)' },
      { label: '10:00 - 12:00', value: 42, color: 'var(--primary-light)' },
      { label: '12:00 - 14:00', value: 38, color: 'var(--primary-light)' },
      { label: '17:00 - 19:00', value: 92, color: 'var(--accent)' },
      { label: '19:00 - 21:00', value: 78, color: 'var(--accent)' },
    ]

    const accessContent = `
      <div class="card" style="margin-bottom:1.5rem">
        <div class="card-header"><h3>Registro de Accesos — Hoy</h3><span class="badge badge-green">${md?.checkinsToday || 187} check-ins</span></div>
        ${dataTable(accessCols, accessRows)}
      </div>
      <div class="grid-2">
        <div class="card">
          <div class="card-header"><h3>Horas Punta</h3></div>
          ${horizontalBarChart(peakHours, 100)}
        </div>
        <div class="card">
          <div class="card-header"><h3>Estadísticas de Acceso</h3></div>
          ${kpiGrid([
            { icon: '🚪', label: 'Entradas Hoy', value: md?.checkinsToday || 187 },
            { icon: '⏱️', label: 'Estancia Media', value: md?.avgStay || '1h 24m' },
            { icon: '🔄', label: 'Recurrencia', value: md?.recurrence || '3.2x/sem' },
            { icon: '🚫', label: 'Accesos Denegados', value: md?.deniedAccess || 4 },
          ])}
        </div>
      </div>`

    const accessSection = section('access-log', 'ACCESOS', 'Control de Accesos',
      'Registro en tiempo real de entradas y salidas con análisis de afluencia.',
      accessContent)

    // ── Trainers
    const trainers = md?.trainers || [
      { initials: 'CM', name: 'Carlos Martínez', specialty: 'CrossFit & Funcional', bio: 'Ex-atleta profesional con 8 años de experiencia en entrenamiento funcional de alta intensidad. Certificado CrossFit Level 3.', clients: 45, rating: 4.9, classes: 18 },
      { initials: 'MT', name: 'María Torres', specialty: 'Yoga & Mindfulness', bio: 'Instructora certificada RYT-500 con formación en India. Especialista en Vinyasa Flow y Yoga restaurativo.', clients: 38, rating: 4.8, classes: 14 },
      { initials: 'PR', name: 'Pedro Rodríguez', specialty: 'HIIT & Cardio', bio: 'Licenciado en CCAFD. Especialista en programas de pérdida de peso y acondicionamiento cardiovascular.', clients: 52, rating: 4.7, classes: 16 },
      { initials: 'MF', name: 'Miguel Fernández', specialty: 'Boxing & Artes Marciales', bio: 'Campeón regional de boxeo amateur. Entrenador de boxeo fitness y defensa personal.', clients: 30, rating: 4.9, classes: 12 },
      { initials: 'SL', name: 'Sofía López', specialty: 'Pilates & Rehabilitación', bio: 'Fisioterapeuta y máster en Pilates terapéutico. Especialista en recuperación de lesiones deportivas.', clients: 28, rating: 4.8, classes: 10 },
      { initials: 'JD', name: 'Javier Díaz', specialty: 'Spinning & Resistencia', bio: 'Ciclista profesional retirado. Diseña programas de resistencia cardiovascular con potenciómetro.', clients: 34, rating: 4.6, classes: 12 },
    ]

    const trainerCards = trainers.map((t: Record<string, unknown>) => `
      <div class="trainer-card">
        <div style="display:flex;align-items:center;gap:14px;margin-bottom:10px">
          <div class="trainer-avatar">${t.initials}</div>
          <div>
            <div class="trainer-name">${t.name}</div>
            <div class="trainer-spec">${t.specialty}</div>
          </div>
        </div>
        <div class="trainer-bio">${t.bio}</div>
        <div class="trainer-stats">
          <div class="trainer-stat"><div class="trainer-stat-val">${t.clients}</div><div class="trainer-stat-lbl">Clientes</div></div>
          <div class="trainer-stat"><div class="trainer-stat-val">${t.rating}</div><div class="trainer-stat-lbl">Rating</div></div>
          <div class="trainer-stat"><div class="trainer-stat-val">${t.classes}</div><div class="trainer-stat-lbl">Clases/Sem</div></div>
        </div>
      </div>
    `).join('')

    const trainersContent = `
      <div class="grid-3">${trainerCards}</div>`

    const trainersSection = section('trainers', 'EQUIPO', 'Nuestros Entrenadores',
      'Profesionales certificados especializados en cada disciplina.',
      trainersContent)

    // ── Analytics
    const revenueByMonth: BarChartItem[] = md?.revenueByMonth || [
      { label: 'Enero', value: 34200 },
      { label: 'Febrero', value: 35800 },
      { label: 'Marzo', value: 38500 },
      { label: 'Abril', value: 36900 },
    ]

    const anaContent = `
      ${bigResult(
        md?.annualRevenue || '€462.000',
        md?.annualRevenueLabel || 'Facturación Anual Proyectada',
        [
          { title: md?.avgTicket || '€47/mes', subtitle: 'Ticket Medio' },
          { title: md?.lifetimeValue || '€846', subtitle: 'Lifetime Value' },
          { title: md?.churnRate || '4.8%', subtitle: 'Tasa de Baja' },
        ]
      )}
      <div class="grid-2" style="margin-top:1.5rem">
        <div class="card">
          <div class="card-header"><h3>Ingresos Mensuales</h3></div>
          ${horizontalBarChart(revenueByMonth)}
        </div>
        <div class="card">
          <div class="card-header"><h3>Indicadores Clave</h3></div>
          ${progressBar('Retención 12 meses', md?.retention12 || 94, 'ok')}
          ${progressBar('Satisfacción (NPS)', md?.nps || 82, 'ok')}
          ${progressBar('Ocupación media salas', md?.roomOccupancy || 76, 'primary')}
          ${progressBar('Uso zona pesas', md?.weightsUsage || 88, 'accent')}
          ${progressBar('Clases grupales llenas', md?.fullClasses || 42, 'warn')}
        </div>
      </div>`

    const anaSection = section('analytics', 'ANALYTICS', 'Rendimiento del Centro',
      'Métricas clave de negocio, retención y satisfacción de miembros.',
      anaContent)

    // ── Settings
    const settingsFields: SettingsField[] = [
      { label: 'Nombre del centro', value: c.businessName, type: 'text' },
      { label: 'Email de contacto', value: md?.email || 'info@' + c.businessName.toLowerCase().replace(/\s/g, '') + '.com', type: 'email' },
      { label: 'Hora apertura', value: md?.openTime || '06:00', type: 'text' },
      { label: 'Hora cierre', value: md?.closeTime || '22:00', type: 'text' },
      { label: 'Control de acceso automático', value: '', type: 'toggle', enabled: true },
      { label: 'Notificaciones de vencimiento', value: '', type: 'toggle', enabled: true },
      { label: 'Reserva de clases online', value: '', type: 'toggle', enabled: true },
      { label: 'Modo mantenimiento', value: '', type: 'toggle', enabled: false },
    ]

    const settContent = settingsForm(settingsFields)
    const settSection = section('settings', 'CONFIGURACIÓN', 'Ajustes del Centro',
      'Personaliza horarios, accesos y automatizaciones.',
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
<style>${designSystemCSS(c.primaryColor, c.accentColor, c.theme || 'bold')}
${overrideCSS}</style>
</head>
<body>
${nav}
${notificationContainer()}
${hero}
${dashSection}
${membersSection}
${classesSection}
${accessSection}
${trainersSection}
${anaSection}
${settSection}
${footer}
<script>${allScripts()}</script>
</body>
</html>`
  },
}

interface GymMockData {
  heroTagline?: string
  heroSubtitle?: string
  totalMembers?: number
  monthlyRevenue?: number
  classesPerWeek?: number
  retentionRate?: string
  classesToday?: number
  checkinsToday?: number
  classPopularity?: BarChartItem[]
  alert1?: string
  alert2?: string
  alert3?: string
  alert4?: string
  alertCount?: number
  members?: Record<string, string>[]
  planDistribution?: BarChartItem[]
  newMembers?: number
  churnMembers?: number
  mrr?: number
  schedule?: Record<string, Record<string, { name: string; trainer: string; highlight?: boolean }>>
  accessLog?: Record<string, string>[]
  peakHours?: BarChartItem[]
  avgStay?: string
  recurrence?: string
  deniedAccess?: number
  trainers?: Record<string, unknown>[]
  revenueByMonth?: BarChartItem[]
  annualRevenue?: string
  annualRevenueLabel?: string
  avgTicket?: string
  lifetimeValue?: string
  churnRate?: string
  retention12?: number
  nps?: number
  roomOccupancy?: number
  weightsUsage?: number
  fullClasses?: number
  email?: string
  openTime?: string
  closeTime?: string
}
