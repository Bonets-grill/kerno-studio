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

export const lmsTemplate: TemplateDefinition = {
  meta: {
    id: 'lms',
    name: 'Plataforma Educativa / LMS',
    industries: ['lms', 'educación', 'education', 'cursos', 'courses', 'academia', 'academy', 'escuela', 'school', 'formación', 'training', 'e-learning'],
    projectTypes: ['landing', 'mvp', 'system', 'saas'],
    sections: ['hero', 'dashboard', 'courses', 'students', 'lessons', 'certificates', 'analytics', 'settings'],
    description: 'Plantilla premium para plataformas de e-learning y academias digitales. Dashboard con estudiantes, cursos, progreso, certificados, lecciones y analytics de aprendizaje.',
  },

  render(c: TemplateCustomization): string {
    const md = c.mockData as LMSMockData

    // ── Nav
    const nav = navBar(c.businessName, [
      { id: 'hero', label: 'Inicio' },
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'courses', label: 'Cursos' },
      { id: 'students', label: 'Estudiantes' },
      { id: 'lessons', label: 'Lecciones' },
      { id: 'certificates', label: 'Certificados' },
      { id: 'analytics', label: 'Analytics' },
      { id: 'settings', label: 'Config' },
    ])

    // ── Hero
    const hero = heroSection(
      c.businessName,
      md?.heroTagline || 'Aprende sin límites',
      md?.heroSubtitle || 'Plataforma de formación online con cursos interactivos, seguimiento de progreso y certificaciones profesionales.',
      [
        { value: md?.totalStudents || 3240, label: 'Estudiantes' },
        { value: md?.totalCourses || 48, label: 'Cursos' },
        { value: md?.completionRate || '87%', label: 'Completados' },
        { value: md?.revenue || 24600, label: 'Ingresos', prefix: '€' },
      ],
      `Demo Interactivo — ${c.businessType || 'E-Learning'}`
    )

    // ── Dashboard
    const dashKpis: KpiData[] = [
      { icon: '🎓', label: 'Estudiantes Activos', value: md?.activeStudents || 1847, trend: { value: '+14%', direction: 'up' } },
      { icon: '📚', label: 'Cursos Publicados', value: md?.totalCourses || 48, trend: { value: '+3', direction: 'up' } },
      { icon: '✅', label: 'Tasa de Completado', value: md?.completionRate || 87, suffix: '%', trend: { value: '+2.4%', direction: 'up' } },
      { icon: '💰', label: 'Ingresos Mensuales', value: md?.revenue || 24600, prefix: '€', trend: { value: '+€3.2K', direction: 'up' } },
    ]

    const enrollmentsByCategory: BarChartItem[] = md?.enrollmentsByCategory || [
      { label: 'Marketing Digital', value: 620, color: 'var(--primary-light)' },
      { label: 'Programación', value: 540, color: 'var(--accent)' },
      { label: 'Diseño UX/UI', value: 380, color: 'var(--primary-light)' },
      { label: 'Data Science', value: 290, color: 'var(--accent)' },
      { label: 'Idiomas', value: 210, color: 'var(--primary-light)' },
    ]

    const dashAlerts = [
      alertRow('🎉', md?.alert1 || '89 nuevas inscripciones esta semana — récord mensual', 'Récord', 'badge-green'),
      alertRow('⚠️', md?.alert2 || '12 estudiantes llevan 2 semanas sin actividad', 'Inactivos', 'badge-yellow'),
      alertRow('📊', md?.alert3 || 'Curso "Python Avanzado" tiene 96% de satisfacción', '96%', 'badge-blue'),
      alertRow('🏆', md?.alert4 || '34 certificados emitidos hoy', 'Emitidos', 'badge-accent'),
    ]

    const dashContent = `
      ${kpiGrid(dashKpis)}
      <div class="grid-2" style="margin-top:1.5rem">
        <div class="card">
          <div class="card-header"><h3>Inscripciones por Categoría</h3><span class="badge badge-accent">Último mes</span></div>
          ${horizontalBarChart(enrollmentsByCategory)}
        </div>
        <div class="card">
          <div class="card-header"><h3>Alertas</h3><span class="badge badge-primary">${md?.alertCount || 4} activas</span></div>
          ${dashAlerts.join('')}
        </div>
      </div>`

    const dashSection = section('dashboard', 'APRENDIZAJE', 'Panel de Control',
      'Métricas clave de tu plataforma educativa en tiempo real.',
      dashContent)

    // ── Courses
    const courses = md?.courses || [
      { title: 'Marketing Digital Completo', category: 'Marketing', students: 342, lessons: 48, duration: '32h', completion: 84, price: '€49', rating: '4.8', status: 'active' },
      { title: 'Python desde Cero', category: 'Programación', students: 289, lessons: 62, duration: '45h', completion: 76, price: '€59', rating: '4.9', status: 'active' },
      { title: 'Diseño UX Profesional', category: 'Diseño', students: 198, lessons: 36, duration: '28h', completion: 91, price: '€39', rating: '4.7', status: 'active' },
      { title: 'Data Science con R', category: 'Data', students: 156, lessons: 54, duration: '40h', completion: 68, price: '€69', rating: '4.6', status: 'active' },
      { title: 'Inglés para Negocios', category: 'Idiomas', students: 124, lessons: 30, duration: '20h', completion: 92, price: '€29', rating: '4.5', status: 'active' },
      { title: 'Inteligencia Artificial', category: 'Programación', students: 0, lessons: 24, duration: '18h', completion: 0, price: '€79', rating: '-', status: 'draft' },
    ]

    const courseCards = courses.map((cr: CourseItem) => `
      <div class="card" style="padding:1.2rem">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.6rem">
          <span class="badge ${cr.status === 'active' ? 'badge-green' : 'badge-yellow'}">${cr.status === 'active' ? 'Activo' : 'Borrador'}</span>
          <span style="font-size:0.7rem;color:var(--text-dim)">${cr.duration}</span>
        </div>
        <h4 style="font-size:0.92rem;font-weight:700;margin-bottom:0.3rem">${cr.title}</h4>
        <p style="font-size:0.72rem;color:var(--text-muted);margin-bottom:0.6rem">${cr.category} · ${cr.lessons} lecciones</p>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem">
          <span style="font-size:0.72rem;color:var(--text-muted)">👥 ${cr.students} estudiantes</span>
          <span style="font-size:0.72rem;color:var(--accent)">⭐ ${cr.rating}</span>
        </div>
        ${progressBar(`Completado`, cr.completion, cr.completion >= 80 ? 'ok' : cr.completion >= 50 ? 'accent' : 'warn')}
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:0.4rem">
          <span style="font-size:1rem;font-weight:800;color:var(--primary-light)">${cr.price}</span>
          <button class="hero-btn" style="padding:6px 14px;font-size:0.68rem" onclick="showNotif('📚','Curso','Abriendo ${cr.title}...')">Ver Curso</button>
        </div>
      </div>`).join('')

    const coursesContent = `<div class="grid-3">${courseCards}</div>`
    const coursesSection = section('courses', 'CURSOS', 'Catálogo de Cursos',
      'Gestiona y supervisa todos los cursos disponibles en la plataforma.',
      coursesContent)

    // ── Students
    const studentCols: TableColumn[] = [
      { label: 'Estudiante', key: 'name' },
      { label: 'Email', key: 'email' },
      { label: 'Cursos', key: 'courses', align: 'center' },
      { label: 'Progreso', key: 'progress' },
      { label: 'Último Acceso', key: 'lastAccess' },
      { label: 'Estado', key: 'status' },
    ]
    const studentRows = md?.students || [
      { name: 'Ana Martínez', email: 'ana@email.com', courses: '4', progress: '<div class="bar-bg" style="width:80px;display:inline-block"><div class="bar-fill bar-ok" style="width:92%"></div></div> 92%', lastAccess: 'Hace 1h', status: '<span class="badge badge-green">Activo</span>' },
      { name: 'Carlos Rodríguez', email: 'carlos@email.com', courses: '3', progress: '<div class="bar-bg" style="width:80px;display:inline-block"><div class="bar-fill bar-primary" style="width:78%"></div></div> 78%', lastAccess: 'Hace 3h', status: '<span class="badge badge-green">Activo</span>' },
      { name: 'Laura Sánchez', email: 'laura@email.com', courses: '5', progress: '<div class="bar-bg" style="width:80px;display:inline-block"><div class="bar-fill bar-ok" style="width:95%"></div></div> 95%', lastAccess: 'Hoy', status: '<span class="badge badge-green">Activo</span>' },
      { name: 'Miguel Torres', email: 'miguel@email.com', courses: '2', progress: '<div class="bar-bg" style="width:80px;display:inline-block"><div class="bar-fill bar-accent" style="width:45%"></div></div> 45%', lastAccess: 'Ayer', status: '<span class="badge badge-yellow">En riesgo</span>' },
      { name: 'Elena García', email: 'elena@email.com', courses: '6', progress: '<div class="bar-bg" style="width:80px;display:inline-block"><div class="bar-fill bar-ok" style="width:88%"></div></div> 88%', lastAccess: 'Hace 2h', status: '<span class="badge badge-green">Activo</span>' },
      { name: 'Pablo Fernández', email: 'pablo@email.com', courses: '1', progress: '<div class="bar-bg" style="width:80px;display:inline-block"><div class="bar-fill bar-warn" style="width:22%"></div></div> 22%', lastAccess: 'Hace 8 días', status: '<span class="badge badge-red">Inactivo</span>' },
      { name: 'Sofía López', email: 'sofia@email.com', courses: '3', progress: '<div class="bar-bg" style="width:80px;display:inline-block"><div class="bar-fill bar-primary" style="width:67%"></div></div> 67%', lastAccess: 'Hace 1 día', status: '<span class="badge badge-green">Activo</span>' },
    ]

    const studentKpis: KpiData[] = [
      { icon: '👥', label: 'Total Estudiantes', value: md?.totalStudents || 3240 },
      { icon: '🟢', label: 'Activos (30d)', value: md?.activeStudents || 1847 },
      { icon: '⚠️', label: 'En Riesgo', value: md?.atRiskStudents || 56 },
      { icon: '📈', label: 'Nuevos (7d)', value: md?.newStudents7d || 124 },
    ]

    const studentsContent = `
      ${kpiGrid(studentKpis)}
      <div class="card" style="margin-top:1rem">${dataTable(studentCols, studentRows)}</div>`

    const studentsSection = section('students', 'ESTUDIANTES', 'Gestión de Estudiantes',
      'Seguimiento del progreso y actividad de cada estudiante.',
      studentsContent)

    // ── Lessons
    const lessons = md?.lessons || [
      { title: 'Introducción al Marketing Digital', type: 'video', duration: '12:30', course: 'Marketing Digital Completo', views: 1240, completion: 96 },
      { title: 'Fundamentos de SEO', type: 'video', duration: '18:45', course: 'Marketing Digital Completo', views: 1180, completion: 92 },
      { title: 'Variables y Tipos de Datos', type: 'video', duration: '22:10', course: 'Python desde Cero', views: 980, completion: 89 },
      { title: 'Quiz: Conceptos Básicos', type: 'quiz', duration: '15 min', course: 'Python desde Cero', views: 890, completion: 84 },
      { title: 'Principios de Diseño UI', type: 'video', duration: '28:00', course: 'Diseño UX Profesional', views: 760, completion: 91 },
      { title: 'Ejercicio Práctico: Wireframes', type: 'exercise', duration: '45 min', course: 'Diseño UX Profesional', views: 720, completion: 78 },
      { title: 'Introducción a Pandas', type: 'video', duration: '35:20', course: 'Data Science con R', views: 560, completion: 72 },
      { title: 'Examen Final: Marketing', type: 'quiz', duration: '30 min', course: 'Marketing Digital Completo', views: 450, completion: 68 },
    ]

    const typeIcon = (type: string) => {
      switch (type) {
        case 'video': return '🎬'
        case 'quiz': return '📝'
        case 'exercise': return '💻'
        default: return '📄'
      }
    }
    const typeBadge = (type: string) => {
      switch (type) {
        case 'video': return 'badge-blue'
        case 'quiz': return 'badge-purple'
        case 'exercise': return 'badge-accent'
        default: return 'badge-primary'
      }
    }

    const lessonItems = lessons.map((l: LessonItem) => `
      <div style="display:flex;align-items:center;gap:14px;padding:12px 0;border-bottom:1px solid var(--border)">
        <span style="font-size:1.4rem">${typeIcon(l.type)}</span>
        <div style="flex:1;min-width:0">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:2px">
            <span style="font-size:0.85rem;font-weight:600">${l.title}</span>
            <span class="badge ${typeBadge(l.type)}">${l.type === 'video' ? 'Video' : l.type === 'quiz' ? 'Quiz' : 'Ejercicio'}</span>
          </div>
          <div style="font-size:0.7rem;color:var(--text-muted)">${l.course} · ${l.duration} · ${l.views.toLocaleString()} visualizaciones</div>
        </div>
        <div style="text-align:right;min-width:80px">
          <div style="font-size:0.82rem;font-weight:700;color:${l.completion >= 80 ? 'var(--success)' : l.completion >= 50 ? 'var(--accent)' : 'var(--warning)'}">${l.completion}%</div>
          <div style="font-size:0.62rem;color:var(--text-dim)">completado</div>
        </div>
      </div>`).join('')

    const lessonsContent = `
      <div class="card">
        <div class="card-header">
          <h3>Contenido del Curso</h3>
          <span class="badge badge-primary">${lessons.length} lecciones</span>
        </div>
        ${lessonItems}
      </div>`

    const lessonsSection = section('lessons', 'LECCIONES', 'Gestión de Lecciones',
      'Contenido, videos, quizzes y ejercicios de los cursos.',
      lessonsContent)

    // ── Certificates
    const certificates = md?.certificates || [
      { student: 'Laura Sánchez', course: 'Marketing Digital Completo', date: '2026-04-08', grade: '9.4/10', certId: 'CERT-MKT-2024-0892' },
      { student: 'Elena García', course: 'Python desde Cero', date: '2026-04-07', grade: '9.1/10', certId: 'CERT-PYT-2024-0891' },
      { student: 'Ana Martínez', course: 'Diseño UX Profesional', date: '2026-04-06', grade: '9.7/10', certId: 'CERT-UX-2024-0890' },
      { student: 'Carlos Rodríguez', course: 'Data Science con R', date: '2026-04-05', grade: '8.8/10', certId: 'CERT-DS-2024-0889' },
      { student: 'Sofía López', course: 'Marketing Digital Completo', date: '2026-04-04', grade: '9.2/10', certId: 'CERT-MKT-2024-0888' },
      { student: 'Elena García', course: 'Inglés para Negocios', date: '2026-04-03', grade: '8.5/10', certId: 'CERT-ENG-2024-0887' },
    ]

    const certCols: TableColumn[] = [
      { label: 'Estudiante', key: 'student' },
      { label: 'Curso', key: 'course' },
      { label: 'Fecha', key: 'date' },
      { label: 'Nota', key: 'grade', align: 'center' },
      { label: 'ID Certificado', key: 'certId' },
      { label: 'Acción', key: 'action' },
    ]
    const certRows = certificates.map((cert: CertificateItem) => ({
      student: `🏆 ${cert.student}`,
      course: cert.course,
      date: cert.date,
      grade: `<span class="badge badge-green">${cert.grade}</span>`,
      certId: `<span style="font-family:monospace;font-size:0.7rem;color:var(--text-dim)">${cert.certId}</span>`,
      action: `<button class="hero-btn" style="padding:4px 12px;font-size:0.64rem" onclick="showNotif('📄','Certificado','Descargando PDF de ${cert.student}...')">PDF</button>`,
    }))

    const certKpis: KpiData[] = [
      { icon: '🏆', label: 'Total Emitidos', value: md?.totalCerts || 1456 },
      { icon: '📅', label: 'Este Mes', value: md?.certsThisMonth || 34 },
      { icon: '⭐', label: 'Nota Media', value: md?.avgGrade || '9.1/10' },
      { icon: '📊', label: 'Tasa de Aprobado', value: md?.passRate || 94, suffix: '%' },
    ]

    const certsContent = `
      ${kpiGrid(certKpis)}
      <div class="card" style="margin-top:1rem">${dataTable(certCols, certRows)}</div>`

    const certsSection = section('certificates', 'CERTIFICADOS', 'Certificados Emitidos',
      'Historial de certificaciones otorgadas a los estudiantes.',
      certsContent)

    // ── Analytics
    const coursePerformance: BarChartItem[] = md?.coursePerformance || [
      { label: 'Marketing Digital', value: 342, color: 'var(--primary-light)' },
      { label: 'Python desde Cero', value: 289, color: 'var(--accent)' },
      { label: 'Diseño UX', value: 198, color: 'var(--primary-light)' },
      { label: 'Data Science', value: 156, color: 'var(--accent)' },
      { label: 'Inglés Negocios', value: 124, color: 'var(--primary-light)' },
    ]

    const analyticsContent = `
      <div class="grid-2">
        <div class="card">
          <div class="card-header"><h3>Estudiantes por Curso</h3></div>
          ${horizontalBarChart(coursePerformance)}
        </div>
        <div class="card">
          <div class="card-header"><h3>Métricas de Aprendizaje</h3></div>
          ${progressBar('Engagement Rate', md?.engagement || 78, 'primary')}
          ${progressBar('Tasa de Completado', md?.completionPct || 87, 'ok')}
          ${progressBar('Satisfacción', md?.satisfaction || 92, 'accent')}
          ${progressBar('Retención (3 meses)', md?.retention || 71, 'primary')}
        </div>
      </div>
      <div style="margin-top:1.5rem">
        ${bigResult(
          md?.totalRevenueStr || '€295,200',
          md?.totalRevenueLabel || 'Ingresos Anuales Proyectados',
          [
            { title: md?.avgCourseValue || '€47', subtitle: 'Precio medio curso' },
            { title: md?.studentsPerCourse || '68', subtitle: 'Media alumnos/curso' },
            { title: md?.coursesCompleted || '2,840', subtitle: 'Cursos completados' },
          ]
        )}
      </div>`

    const anaSection = section('analytics', 'ANALYTICS', 'Métricas de Aprendizaje',
      'Rendimiento de cursos, engagement y métricas educativas clave.',
      analyticsContent)

    // ── Settings
    const settingsFields: SettingsField[] = [
      { label: 'Nombre de la plataforma', value: c.businessName, type: 'text' },
      { label: 'URL de la academia', value: md?.academyUrl || `academy.${c.businessName.toLowerCase().replace(/\s/g, '')}.com`, type: 'text' },
      { label: 'Email de soporte', value: md?.supportEmail || `soporte@${c.businessName.toLowerCase().replace(/\s/g, '')}.com`, type: 'email' },
      { label: 'Certificados automáticos', value: '', type: 'toggle', enabled: true },
      { label: 'Notificaciones de progreso', value: '', type: 'toggle', enabled: true },
      { label: 'Gamificación activa', value: '', type: 'toggle', enabled: true },
      { label: 'Modo mantenimiento', value: '', type: 'toggle', enabled: false },
    ]

    const settContent = settingsForm(settingsFields)
    const settSection = section('settings', 'CONFIGURACIÓN', 'Ajustes de la Plataforma',
      'Certificados, notificaciones, gamificación y configuración general.',
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
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
${designSystemCSS(c.primaryColor, c.accentColor, c.theme || 'neon')}

/* ═══════════ LMS OVERRIDES — Lexend font, indigo-tinted dark ═══════════ */
body {
  font-family: 'Lexend', sans-serif !important;
  background: #0c0d14 !important;
}
.nav { background: rgba(12,13,20,0.92) !important; border-bottom: 1px solid rgba(99,102,241,0.12) !important; }
.card { border-radius: 18px !important; }
.kpi { border-radius: 18px !important; }
.hero-h1 { font-family: 'Lexend', sans-serif !important; }
.badge { border-radius: 100px !important; }

/* Course card hover lift */
.grid-3 > .card { transition: transform 0.3s, box-shadow 0.3s; }
.grid-3 > .card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(99,102,241,0.15); }
</style>
</head>
<body>
${nav}
${notificationContainer()}
${hero}
${dashSection}
${coursesSection}
${studentsSection}
${lessonsSection}
${certsSection}
${anaSection}
${settSection}
${footer}
<script>${allScripts()}</script>
</body>
</html>`
  },
}

interface CourseItem {
  title: string
  category: string
  students: number
  lessons: number
  duration: string
  completion: number
  price: string
  rating: string
  status: string
}

interface LessonItem {
  title: string
  type: string
  duration: string
  course: string
  views: number
  completion: number
}

interface CertificateItem {
  student: string
  course: string
  date: string
  grade: string
  certId: string
}

interface LMSMockData {
  heroTagline?: string
  heroSubtitle?: string
  totalStudents?: number
  totalCourses?: number
  completionRate?: number | string
  revenue?: number
  activeStudents?: number
  enrollmentsByCategory?: BarChartItem[]
  alert1?: string
  alert2?: string
  alert3?: string
  alert4?: string
  alertCount?: number
  courses?: CourseItem[]
  students?: Record<string, string>[]
  atRiskStudents?: number
  newStudents7d?: number
  lessons?: LessonItem[]
  certificates?: CertificateItem[]
  totalCerts?: number
  certsThisMonth?: number
  avgGrade?: string
  passRate?: number
  coursePerformance?: BarChartItem[]
  engagement?: number
  completionPct?: number
  satisfaction?: number
  retention?: number
  totalRevenueStr?: string
  totalRevenueLabel?: string
  avgCourseValue?: string
  studentsPerCourse?: string
  coursesCompleted?: string
  academyUrl?: string
  supportEmail?: string
}
