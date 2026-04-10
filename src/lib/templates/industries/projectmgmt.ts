import type { TemplateDefinition, TemplateCustomization } from '../types'
import { designSystemCSS } from '../shared/design-system'
import { allScripts } from '../shared/scripts'
import {
  navBar, heroSection, notificationContainer, section,
  kpiGrid, dataTable, progressBar, horizontalBarChart,
  settingsForm, alertRow, bigResult,
  type KpiData, type TableColumn, type BarChartItem, type SettingsField,
} from '../shared/components'

export const projectmgmtTemplate: TemplateDefinition = {
  meta: {
    id: 'projectmgmt',
    name: 'Gestión de Proyectos',
    industries: ['project', 'proyecto', 'tasks', 'tareas', 'gestión de proyectos', 'project management', 'agile', 'scrum', 'kanban'],
    projectTypes: ['landing', 'mvp', 'system', 'saas'],
    sections: ['hero', 'dashboard', 'projects', 'tasks', 'team', 'timeline', 'analytics', 'settings'],
    description: 'Plantilla premium para gestión de proyectos. Dashboard con KPIs de proyectos y tareas, vista de proyectos con progreso, tablero kanban de tareas, equipo con asignaciones, timeline tipo Gantt, analytics de productividad y configuración.',
  },

  render(c: TemplateCustomization): string {
    const md = c.mockData as ProjectMgmtMockData

    // ── Nav
    const nav = navBar(c.businessName, [
      { id: 'hero', label: 'Inicio' },
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'projects', label: 'Proyectos' },
      { id: 'tasks', label: 'Tareas' },
      { id: 'team', label: 'Equipo' },
      { id: 'timeline', label: 'Timeline' },
      { id: 'analytics', label: 'Analytics' },
      { id: 'settings', label: 'Config' },
    ])

    // ── Hero
    const hero = heroSection(
      c.businessName,
      md?.heroTagline || `${c.businessName} — Proyectos bajo Control`,
      md?.heroSubtitle || 'Gestión ágil de proyectos, tareas, equipo y timeline. Todo sincronizado en tiempo real.',
      [
        { value: md?.activeProjects || 8, label: 'Proyectos Activos' },
        { value: md?.totalTasks || 156, label: 'Tareas Totales' },
        { value: md?.completedPct || 67, label: 'Completado', suffix: '%' },
        { value: md?.teamSize || 14, label: 'Miembros' },
      ],
      `Demo Interactivo — ${c.businessType || 'Project Management'}`
    )

    // ── Dashboard
    const dashKpis: KpiData[] = [
      { icon: '📂', label: 'Proyectos Activos', value: md?.activeProjects || 8, trend: { value: '+2 este mes', direction: 'up' } },
      { icon: '✅', label: 'Tareas Completadas', value: md?.tasksCompleted || 104, trend: { value: '+18 esta semana', direction: 'up' } },
      { icon: '⏳', label: 'Tareas En Progreso', value: md?.tasksInProgress || 32, trend: { value: '8 bloqueadas', direction: 'neutral' } },
      { icon: '🎯', label: 'Sprint Velocity', value: md?.velocity || 42, suffix: ' pts', trend: { value: '+5 vs anterior', direction: 'up' } },
    ]

    const projectProgress: BarChartItem[] = md?.projectProgress || [
      { label: 'Rediseño Web Corporativa', value: 85, color: 'var(--success)' },
      { label: 'App Móvil v2.0', value: 62, color: 'var(--primary-light)' },
      { label: 'Migración Cloud AWS', value: 45, color: 'var(--accent)' },
      { label: 'Portal de Clientes', value: 78, color: 'var(--success)' },
      { label: 'Sistema de Facturación', value: 30, color: 'var(--warning)' },
    ]

    const dashAlerts = [
      alertRow('🔴', md?.alert1 || 'App Móvil — 3 tareas bloqueadas por dependencias', 'Bloqueado', 'badge-red'),
      alertRow('⚠️', md?.alert2 || 'Migración Cloud — deadline en 5 días, 45% completado', 'Riesgo', 'badge-yellow'),
      alertRow('🎉', md?.alert3 || 'Portal de Clientes — sprint review mañana 10:00', 'Review', 'badge-blue'),
      alertRow('📋', md?.alert4 || 'Planificación Q3 — crear épicas antes del viernes', 'Planning', 'badge-purple'),
    ]

    const dashContent = `
      ${kpiGrid(dashKpis)}
      <div class="grid-2" style="margin-top:1.5rem">
        <div class="card">
          <div class="card-header"><h3>Progreso de Proyectos</h3><span class="badge badge-accent">Activos</span></div>
          ${horizontalBarChart(projectProgress, 100)}
        </div>
        <div class="card">
          <div class="card-header"><h3>Alertas del Equipo</h3><span class="badge badge-primary">${md?.alertCount || 4} activas</span></div>
          ${dashAlerts.join('')}
        </div>
      </div>`

    const dashSection = section('dashboard', c.businessType?.toUpperCase() || 'PROYECTOS', 'Panel de Control',
      'Vista general del estado de todos los proyectos, tareas y rendimiento del equipo.',
      dashContent)

    // ── Projects
    const projects = md?.projects || [
      { name: 'Rediseño Web Corporativa', status: 'active', progress: 85, tasks: '34/40', team: 4, deadline: '30/04/2026', priority: 'high', color: 'var(--success)' },
      { name: 'App Móvil v2.0', status: 'active', progress: 62, tasks: '28/45', team: 5, deadline: '15/06/2026', priority: 'high', color: 'var(--primary-light)' },
      { name: 'Migración Cloud AWS', status: 'at-risk', progress: 45, tasks: '18/40', team: 3, deadline: '14/04/2026', priority: 'critical', color: 'var(--warning)' },
      { name: 'Portal de Clientes', status: 'active', progress: 78, tasks: '23/30', team: 3, deadline: '20/05/2026', priority: 'medium', color: 'var(--success)' },
      { name: 'Sistema de Facturación', status: 'active', progress: 30, tasks: '9/30', team: 2, deadline: '31/07/2026', priority: 'medium', color: 'var(--accent)' },
      { name: 'Integración CRM', status: 'planning', progress: 10, tasks: '2/20', team: 2, deadline: '30/08/2026', priority: 'low', color: 'var(--text-muted)' },
    ]

    const priorityBadge = (p: string) => {
      if (p === 'critical') return '<span class="badge badge-red">Crítica</span>'
      if (p === 'high') return '<span class="badge badge-yellow">Alta</span>'
      if (p === 'medium') return '<span class="badge badge-blue">Media</span>'
      return '<span class="badge badge-green">Baja</span>'
    }
    const statusBadge = (s: string) => {
      if (s === 'active') return '<span class="badge badge-green">Activo</span>'
      if (s === 'at-risk') return '<span class="badge badge-red">En riesgo</span>'
      if (s === 'planning') return '<span class="badge badge-purple">Planificación</span>'
      return '<span class="badge badge-blue">' + s + '</span>'
    }

    const projectCards = projects.map((p: Record<string, unknown>) => `
      <div class="card" style="padding:1.2rem">
        <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:0.8rem">
          <div>
            <h4 style="font-size:0.95rem;font-weight:700;margin-bottom:4px">${p.name}</h4>
            <div style="display:flex;gap:6px;align-items:center">
              ${statusBadge(p.status as string)} ${priorityBadge(p.priority as string)}
            </div>
          </div>
          <div style="text-align:right;font-size:0.72rem;color:var(--text-muted)">
            <div>Deadline: <strong style="color:var(--text)">${p.deadline}</strong></div>
            <div style="margin-top:2px">👥 ${p.team} miembros</div>
          </div>
        </div>
        <div style="margin-bottom:0.5rem">
          <div style="display:flex;justify-content:space-between;margin-bottom:4px">
            <span style="font-size:0.72rem;color:var(--text-muted)">Tareas: ${p.tasks}</span>
            <span style="font-size:0.72rem;font-weight:700;color:${p.color}">${p.progress}%</span>
          </div>
          <div class="bar-bg"><div class="bar-fill" data-width="${p.progress}%" style="width:0%;background:${p.color}"></div></div>
        </div>
      </div>`
    ).join('')

    const projContent = `
      ${kpiGrid([
        { icon: '📂', label: 'Total Proyectos', value: md?.totalProjects || 12 },
        { icon: '🟢', label: 'En Tiempo', value: md?.onTrack || 5 },
        { icon: '🟡', label: 'En Riesgo', value: md?.atRisk || 2 },
        { icon: '🔵', label: 'Planificación', value: md?.planning || 3 },
      ])}
      <div class="grid-2" style="margin-top:1.5rem">
        ${projectCards}
      </div>`

    const projSection = section('projects', 'PROYECTOS', 'Vista de Proyectos',
      'Estado y progreso de todos los proyectos activos y en planificación.',
      projContent)

    // ── Tasks (Kanban)
    const kanbanColumns = md?.kanban || {
      todo: [
        { title: 'Diseñar página de pricing', project: 'Rediseño Web', assignee: 'Ana G.', priority: 'high', points: 5 },
        { title: 'Configurar CI/CD pipeline', project: 'Migración Cloud', assignee: 'Miguel T.', priority: 'critical', points: 8 },
        { title: 'Crear wireframes dashboard', project: 'Portal Clientes', assignee: 'Sara D.', priority: 'medium', points: 3 },
        { title: 'Documentar API endpoints', project: 'App Móvil v2.0', assignee: 'David L.', priority: 'low', points: 2 },
      ],
      inProgress: [
        { title: 'Implementar autenticación OAuth', project: 'App Móvil v2.0', assignee: 'Carlos M.', priority: 'high', points: 8 },
        { title: 'Migrar base de datos RDS', project: 'Migración Cloud', assignee: 'Miguel T.', priority: 'critical', points: 13 },
        { title: 'Maquetación responsive home', project: 'Rediseño Web', assignee: 'Sara D.', priority: 'medium', points: 5 },
      ],
      review: [
        { title: 'Testing E2E checkout flow', project: 'Portal Clientes', assignee: 'Laura F.', priority: 'high', points: 5 },
        { title: 'Optimizar queries SQL', project: 'Sistema Facturación', assignee: 'David L.', priority: 'medium', points: 3 },
      ],
      done: [
        { title: 'Setup repositorio monorepo', project: 'App Móvil v2.0', assignee: 'Carlos M.', priority: 'medium', points: 3 },
        { title: 'Diseñar sistema de design tokens', project: 'Rediseño Web', assignee: 'Ana G.', priority: 'high', points: 8 },
        { title: 'Configurar monitoring CloudWatch', project: 'Migración Cloud', assignee: 'Javier S.', priority: 'medium', points: 5 },
      ],
    }

    const taskPriorityDot = (p: string) => {
      if (p === 'critical') return '<span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--danger);margin-right:4px"></span>'
      if (p === 'high') return '<span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--warning);margin-right:4px"></span>'
      if (p === 'medium') return '<span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--info);margin-right:4px"></span>'
      return '<span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--success);margin-right:4px"></span>'
    }

    const renderKanbanCard = (task: Record<string, unknown>) => `
      <div style="background:var(--bg-elevated);border:1px solid var(--border);border-radius:10px;padding:0.8rem;margin-bottom:0.5rem">
        <div style="font-size:0.8rem;font-weight:600;margin-bottom:6px">${taskPriorityDot(task.priority as string)}${task.title}</div>
        <div style="font-size:0.65rem;color:var(--text-dim);margin-bottom:6px">${task.project}</div>
        <div style="display:flex;justify-content:space-between;align-items:center">
          <span style="font-size:0.65rem;color:var(--text-muted)">👤 ${task.assignee}</span>
          <span class="badge badge-primary" style="font-size:0.58rem">${task.points} pts</span>
        </div>
      </div>`

    const renderKanbanColumn = (title: string, tasks: Record<string, unknown>[], color: string, count: number) => `
      <div style="flex:1;min-width:220px">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:0.8rem;padding-bottom:0.5rem;border-bottom:2px solid ${color}">
          <span style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:1px">${title}</span>
          <span style="background:${color};color:#fff;font-size:0.6rem;font-weight:700;padding:2px 8px;border-radius:100px">${count}</span>
        </div>
        ${tasks.map(renderKanbanCard).join('')}
      </div>`

    const tasksContent = `
      ${kpiGrid([
        { icon: '📋', label: 'Total Tareas', value: md?.totalTasks || 156 },
        { icon: '🏃', label: 'En Progreso', value: md?.tasksInProgress || 32 },
        { icon: '👀', label: 'En Review', value: md?.tasksInReview || 12 },
        { icon: '✅', label: 'Completadas', value: md?.tasksCompleted || 104, trend: { value: '67%', direction: 'up' } },
      ])}
      <div class="card" style="margin-top:1.5rem;overflow-x:auto">
        <div class="card-header"><h3>Tablero Kanban</h3><span class="badge badge-accent">Sprint 14</span></div>
        <div style="display:flex;gap:1rem;min-width:900px;padding:0.5rem 0">
          ${renderKanbanColumn('Por Hacer', kanbanColumns.todo, 'var(--text-muted)', kanbanColumns.todo.length)}
          ${renderKanbanColumn('En Progreso', kanbanColumns.inProgress, 'var(--primary-light)', kanbanColumns.inProgress.length)}
          ${renderKanbanColumn('En Review', kanbanColumns.review, 'var(--warning)', kanbanColumns.review.length)}
          ${renderKanbanColumn('Hecho', kanbanColumns.done, 'var(--success)', kanbanColumns.done.length)}
        </div>
      </div>`

    const tasksSection = section('tasks', 'TAREAS', 'Tablero de Tareas',
      'Vista kanban con todas las tareas del sprint actual organizadas por estado.',
      tasksContent)

    // ── Team
    const teamMembers = md?.team || [
      { name: 'Ana García', role: 'UX/UI Designer', avatar: 'AG', currentTask: 'Diseñar página de pricing', project: 'Rediseño Web', capacity: 85, tasks: 6 },
      { name: 'Carlos Martínez', role: 'Senior Developer', avatar: 'CM', currentTask: 'Implementar autenticación OAuth', project: 'App Móvil v2.0', capacity: 92, tasks: 8 },
      { name: 'Miguel Torres', role: 'DevOps Engineer', avatar: 'MT', currentTask: 'Migrar base de datos RDS', project: 'Migración Cloud', capacity: 100, tasks: 7 },
      { name: 'Sara Díaz', role: 'Frontend Developer', avatar: 'SD', currentTask: 'Maquetación responsive home', project: 'Rediseño Web', capacity: 78, tasks: 5 },
      { name: 'Laura Fernández', role: 'QA Engineer', avatar: 'LF', currentTask: 'Testing E2E checkout flow', project: 'Portal Clientes', capacity: 65, tasks: 4 },
      { name: 'David López', role: 'Backend Developer', avatar: 'DL', currentTask: 'Optimizar queries SQL', project: 'Sistema Facturación', capacity: 70, tasks: 5 },
      { name: 'Javier Sánchez', role: 'Tech Lead', avatar: 'JS', currentTask: 'Code review PRs pendientes', project: 'Varios', capacity: 55, tasks: 3 },
      { name: 'Elena Rodríguez', role: 'Product Manager', avatar: 'ER', currentTask: 'Planificación Sprint 15', project: 'Todos', capacity: 60, tasks: 4 },
    ]

    const memberCards = teamMembers.map((m: Record<string, unknown>) => {
      const cap = m.capacity as number
      const capColor = cap >= 90 ? 'var(--danger)' : cap >= 70 ? 'var(--warning)' : 'var(--success)'
      return `
      <div class="card" style="padding:1.2rem">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:0.8rem">
          <div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,var(--primary),var(--accent));display:flex;align-items:center;justify-content:center;font-weight:800;font-size:0.75rem;color:#fff;flex-shrink:0">${m.avatar}</div>
          <div>
            <div style="font-weight:700;font-size:0.88rem">${m.name}</div>
            <div style="font-size:0.68rem;color:var(--text-muted)">${m.role}</div>
          </div>
        </div>
        <div style="font-size:0.72rem;color:var(--text-dim);margin-bottom:4px">Tarea actual:</div>
        <div style="font-size:0.78rem;color:var(--text);margin-bottom:2px;font-weight:500">${m.currentTask}</div>
        <div style="font-size:0.65rem;color:var(--accent);margin-bottom:0.8rem">${m.project}</div>
        <div style="display:flex;justify-content:space-between;margin-bottom:4px">
          <span style="font-size:0.65rem;color:var(--text-muted)">Capacidad</span>
          <span style="font-size:0.65rem;font-weight:700;color:${capColor}">${cap}%</span>
        </div>
        <div class="bar-bg"><div class="bar-fill" data-width="${cap}%" style="width:0%;background:${capColor}"></div></div>
        <div style="font-size:0.62rem;color:var(--text-dim);margin-top:6px">${m.tasks} tareas asignadas</div>
      </div>`
    }).join('')

    const teamContent = `
      ${kpiGrid([
        { icon: '👥', label: 'Miembros del Equipo', value: md?.teamSize || 14 },
        { icon: '📊', label: 'Capacidad Media', value: md?.avgCapacity || 76, suffix: '%' },
        { icon: '🔥', label: 'Sobrecargados', value: md?.overloaded || 2, trend: { value: '>90%', direction: 'down' } },
        { icon: '⚡', label: 'Productividad', value: md?.productivity || 94, suffix: '%', trend: { value: '+3%', direction: 'up' } },
      ])}
      <div class="grid-4" style="margin-top:1.5rem">
        ${memberCards}
      </div>`

    const teamSection = section('team', 'EQUIPO', 'Gestión del Equipo',
      'Visualiza la carga de trabajo, tareas asignadas y capacidad de cada miembro.',
      teamContent)

    // ── Timeline
    const timelineProjects = md?.timeline || [
      { name: 'Rediseño Web Corporativa', start: 'Feb 2026', end: 'Abr 2026', progress: 85, color: 'var(--success)', offset: 10, width: 55 },
      { name: 'App Móvil v2.0', start: 'Ene 2026', end: 'Jun 2026', progress: 62, color: 'var(--primary-light)', offset: 0, width: 80 },
      { name: 'Migración Cloud AWS', start: 'Mar 2026', end: 'Abr 2026', progress: 45, color: 'var(--warning)', offset: 25, width: 25 },
      { name: 'Portal de Clientes', start: 'Mar 2026', end: 'May 2026', progress: 78, color: 'var(--accent)', offset: 25, width: 40 },
      { name: 'Sistema de Facturación', start: 'Mar 2026', end: 'Jul 2026', progress: 30, color: 'var(--primary-light)', offset: 25, width: 60 },
      { name: 'Integración CRM', start: 'May 2026', end: 'Ago 2026', progress: 10, color: 'var(--text-muted)', offset: 50, width: 45 },
    ]

    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago']
    const monthHeaders = months.map(m => `<div style="flex:1;text-align:center;font-size:0.62rem;color:var(--text-dim);font-weight:600;text-transform:uppercase;letter-spacing:1px">${m}</div>`).join('')

    const ganttRows = timelineProjects.map((p: Record<string, unknown>) => `
      <div style="display:grid;grid-template-columns:200px 1fr;gap:1rem;align-items:center;padding:0.6rem 0;border-bottom:1px solid var(--border)">
        <div>
          <div style="font-size:0.78rem;font-weight:600">${p.name}</div>
          <div style="font-size:0.62rem;color:var(--text-muted)">${p.start} — ${p.end}</div>
        </div>
        <div style="position:relative;height:28px;background:rgba(255,255,255,0.02);border-radius:6px">
          <div style="position:absolute;left:${p.offset}%;width:${p.width}%;height:100%;background:rgba(255,255,255,0.04);border-radius:6px;overflow:hidden">
            <div class="bar-fill" data-width="${(p.progress as number)}%" style="width:0%;height:100%;background:${p.color};border-radius:6px;position:relative">
              <span style="position:absolute;right:6px;top:50%;transform:translateY(-50%);font-size:0.6rem;font-weight:700;color:#fff">${p.progress}%</span>
            </div>
          </div>
        </div>
      </div>`
    ).join('')

    const timelineContent = `
      <div class="card">
        <div class="card-header"><h3>Roadmap de Proyectos</h3><span class="badge badge-accent">2026</span></div>
        <div style="padding:0.5rem 0">
          <div style="display:grid;grid-template-columns:200px 1fr;gap:1rem;margin-bottom:0.5rem;padding-bottom:0.5rem;border-bottom:1px solid var(--border)">
            <div style="font-size:0.65rem;color:var(--text-dim);font-weight:700;text-transform:uppercase;letter-spacing:1px">Proyecto</div>
            <div style="display:flex">${monthHeaders}</div>
          </div>
          <div style="position:relative">
            <div style="position:absolute;left:200px;right:0;top:0;bottom:0;display:flex;pointer-events:none;z-index:0">
              ${months.map((_, i) => `<div style="flex:1;border-left:1px dashed rgba(255,255,255,0.04);${i === 3 ? 'border-left-color:rgba(239,68,68,0.3);' : ''}"></div>`).join('')}
            </div>
            ${ganttRows}
          </div>
          <div style="margin-top:0.8rem;display:flex;gap:1rem;font-size:0.62rem;color:var(--text-dim)">
            <span style="display:flex;align-items:center;gap:4px"><span style="width:10px;height:3px;background:rgba(239,68,68,0.3);border-radius:2px"></span>Hoy (Abril)</span>
            <span>Barra = duración planificada</span>
            <span>% = progreso real</span>
          </div>
        </div>
      </div>
      <div class="grid-2" style="margin-top:1.5rem">
        <div class="card">
          <div class="card-header"><h3>Próximos Deadlines</h3></div>
          ${alertRow('🔴', 'Migración Cloud AWS — 14/04/2026', '5 días', 'badge-red')}
          ${alertRow('🟡', 'Rediseño Web Corporativa — 30/04/2026', '21 días', 'badge-yellow')}
          ${alertRow('🟢', 'Portal de Clientes — 20/05/2026', '41 días', 'badge-green')}
          ${alertRow('🔵', 'App Móvil v2.0 — 15/06/2026', '67 días', 'badge-blue')}
          ${alertRow('🟣', 'Sistema de Facturación — 31/07/2026', '113 días', 'badge-purple')}
        </div>
        <div class="card">
          <div class="card-header"><h3>Hitos Completados</h3></div>
          ${alertRow('✅', 'Setup monorepo — App Móvil v2.0', 'Completado', 'badge-green')}
          ${alertRow('✅', 'Design system tokens — Rediseño Web', 'Completado', 'badge-green')}
          ${alertRow('✅', 'MVP Portal Clientes — Fase 1', 'Completado', 'badge-green')}
          ${alertRow('✅', 'Infraestructura base — Migración Cloud', 'Completado', 'badge-green')}
          ${alertRow('⏳', 'Auth module — App Móvil v2.0', 'En progreso', 'badge-yellow')}
        </div>
      </div>`

    const timelineSection = section('timeline', 'TIMELINE', 'Línea Temporal',
      'Visualización tipo Gantt del roadmap de proyectos con progreso real.',
      timelineContent)

    // ── Analytics
    const velocityByWeek: BarChartItem[] = md?.velocityByWeek || [
      { label: 'Semana 12', value: 35, color: 'var(--primary-light)' },
      { label: 'Semana 13', value: 38, color: 'var(--primary-light)' },
      { label: 'Semana 14', value: 42, color: 'var(--accent)' },
      { label: 'Semana 15 (actual)', value: 40, color: 'var(--accent)' },
    ]

    const anaContent = `
      ${bigResult(
        md?.totalDelivered || '342',
        md?.totalDeliveredLabel || 'Story Points Entregados (Q1-Q2 2026)',
        [
          { title: '28 días', subtitle: 'Tiempo Medio por Proyecto' },
          { title: '42 pts', subtitle: 'Velocity Promedio' },
          { title: '94%', subtitle: 'Entrega a Tiempo' },
        ]
      )}
      <div class="grid-2" style="margin-top:1.5rem">
        <div class="card">
          <div class="card-header"><h3>Velocity por Sprint</h3><span class="badge badge-accent">Últimas 4 semanas</span></div>
          ${horizontalBarChart(velocityByWeek, 50)}
        </div>
        <div class="card">
          <div class="card-header"><h3>Métricas de Equipo</h3></div>
          ${progressBar('Tareas Completadas a Tiempo', md?.onTimePct || 88, 'primary')}
          ${progressBar('Code Review < 24h', md?.reviewTimePct || 76, 'accent')}
          ${progressBar('Sprint Goal Achievement', md?.sprintGoalPct || 92, 'ok')}
          ${progressBar('Bug Fix Rate', md?.bugFixRate || 95, 'primary')}
          ${progressBar('Documentation Coverage', md?.docCoverage || 64, 'warn')}
        </div>
      </div>
      <div class="grid-2" style="margin-top:1.5rem">
        <div class="card">
          <div class="card-header"><h3>Tareas por Tipo</h3></div>
          ${horizontalBarChart([
            { label: 'Feature', value: 62, color: 'var(--primary-light)' },
            { label: 'Bug Fix', value: 28, color: 'var(--danger)' },
            { label: 'Improvement', value: 34, color: 'var(--accent)' },
            { label: 'Technical Debt', value: 18, color: 'var(--warning)' },
            { label: 'Documentation', value: 14, color: 'var(--info)' },
          ])}
        </div>
        <div class="card">
          <div class="card-header"><h3>Burndown Sprint 14</h3></div>
          ${horizontalBarChart([
            { label: 'Día 1 (Lunes)', value: 42, color: 'var(--text-muted)' },
            { label: 'Día 3 (Miércoles)', value: 34, color: 'var(--primary-light)' },
            { label: 'Día 5 (Viernes)', value: 26, color: 'var(--primary-light)' },
            { label: 'Día 8 (Miércoles)', value: 18, color: 'var(--accent)' },
            { label: 'Día 10 (Viernes)', value: 8, color: 'var(--success)' },
          ], 50)}
          <div style="font-size:0.65rem;color:var(--text-dim);margin-top:0.5rem">* Story points restantes</div>
        </div>
      </div>`

    const anaSection = section('analytics', 'ANALYTICS', 'Productividad del Equipo',
      'Métricas de velocity, delivery y rendimiento del equipo de desarrollo.',
      anaContent)

    // ── Settings
    const settFields: SettingsField[] = [
      { label: 'Nombre del Workspace', value: c.businessName, type: 'text' },
      { label: 'Email Project Manager', value: md?.pmEmail || 'pm@empresa.com', type: 'email' },
      { label: 'Duración del Sprint', value: md?.sprintDuration || '2 semanas', type: 'select', options: ['1 semana', '2 semanas', '3 semanas', '4 semanas'] },
      { label: 'Metodología', value: md?.methodology || 'Scrum', type: 'select', options: ['Scrum', 'Kanban', 'Scrumban', 'Waterfall'] },
      { label: 'Notificaciones de Deadline', value: '', type: 'toggle', enabled: true },
      { label: 'Daily Standup Automático', value: '', type: 'toggle', enabled: true },
      { label: 'Integración con Slack', value: '', type: 'toggle', enabled: false },
      { label: 'Idioma', value: 'Español', type: 'select', options: ['Español', 'English', 'Português'] },
    ]

    const settContent = settingsForm(settFields)

    const settSection = section('settings', 'CONFIGURACIÓN', 'Ajustes del Proyecto',
      'Personaliza sprints, metodología, notificaciones e integraciones.',
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
@import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500;600;700;800;900&display=swap');
${designSystemCSS(c.primaryColor, c.accentColor, c.theme || 'neon')}
body { font-family: 'Work Sans', sans-serif; background: #0e0f14; }
.data-tbl { font-family: 'Work Sans', sans-serif; }
.card { border-radius: 14px; }
.kpi { border-radius: 14px; }
.badge { letter-spacing: 0.5px; }
</style>
</head>
<body>
${nav}
${notificationContainer()}
${hero}
${dashSection}
${projSection}
${tasksSection}
${teamSection}
${timelineSection}
${anaSection}
${settSection}
${footer}
<script>${allScripts()}</script>
</body>
</html>`
  },
}

interface ProjectMgmtMockData {
  heroTagline?: string
  heroSubtitle?: string
  activeProjects?: number
  totalTasks?: number
  completedPct?: number
  teamSize?: number
  tasksCompleted?: number
  tasksInProgress?: number
  tasksInReview?: number
  velocity?: number
  projectProgress?: BarChartItem[]
  alert1?: string
  alert2?: string
  alert3?: string
  alert4?: string
  alertCount?: number
  projects?: Record<string, unknown>[]
  totalProjects?: number
  onTrack?: number
  atRisk?: number
  planning?: number
  kanban?: {
    todo: Record<string, unknown>[]
    inProgress: Record<string, unknown>[]
    review: Record<string, unknown>[]
    done: Record<string, unknown>[]
  }
  team?: Record<string, unknown>[]
  avgCapacity?: number
  overloaded?: number
  productivity?: number
  timeline?: Record<string, unknown>[]
  velocityByWeek?: BarChartItem[]
  totalDelivered?: string
  totalDeliveredLabel?: string
  onTimePct?: number
  reviewTimePct?: number
  sprintGoalPct?: number
  bugFixRate?: number
  docCoverage?: number
  pmEmail?: string
  sprintDuration?: string
  methodology?: string
}
