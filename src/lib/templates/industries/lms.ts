import type { TemplateDefinition, TemplateCustomization } from '../types'

export const lmsTemplate: TemplateDefinition = {
  meta: {
    id: 'lms',
    name: 'Plataforma Educativa / LMS',
    industries: ['lms', 'educación', 'education', 'cursos', 'courses', 'academia', 'escuela', 'school', 'formación', 'e-learning'],
    projectTypes: ['landing', 'mvp', 'system', 'saas'],
    sections: ['dashboard', 'courses', 'students', 'lessons', 'certificates', 'analytics', 'settings'],
    description: 'Dashboard premium para plataformas de e-learning. Cursos, alumnos, lecciones, certificados y analytics educativas.',
  },

  render(c: TemplateCustomization): string {
    const name = c.businessName
    const primary = c.primaryColor || '#6366f1'
    const accent = c.accentColor || '#8b5cf6'

    return `<!DOCTYPE html>
<html lang="${c.locale || 'es'}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${name} — Dashboard</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
:root {
  --primary: ${primary};
  --accent: ${accent};
  --sidebar-bg: #161332;
  --content-bg: #110e28;
  --card-bg: #1c1840;
  --card-hover: #221e4a;
  --border: rgba(99,102,241,0.12);
  --text: #e4e0f8;
  --text-muted: #9592b8;
  --text-dim: #6560888;
  --success: #22c55e;
  --warning: #f59e0b;
  --danger: #ef4444;
}
body { font-family: 'Lexend', sans-serif; background: var(--content-bg); color: var(--text); min-height: 100vh; overflow-x: hidden; }

/* ═══ SIDEBAR ═══ */
.sidebar {
  position: fixed; left: 0; top: 0; bottom: 0; width: 250px; background: var(--sidebar-bg);
  border-right: 1px solid var(--border); display: flex; flex-direction: column; z-index: 100;
  transition: transform 0.3s;
}
.sidebar-brand {
  padding: 24px 20px 20px; border-bottom: 1px solid var(--border);
  font-size: 1.1rem; font-weight: 700; color: var(--primary); letter-spacing: 0.5px;
}
.sidebar-brand span { font-size: 0.62rem; display: block; color: var(--text-dim); letter-spacing: 2px; text-transform: uppercase; margin-top: 4px; font-weight: 500; }
.sidebar-nav { flex: 1; padding: 12px 0; overflow-y: auto; }
.sidebar-link {
  display: flex; align-items: center; gap: 12px; padding: 11px 20px;
  color: var(--text-muted); text-decoration: none; font-size: 0.82rem; font-weight: 500;
  transition: all 0.2s; cursor: pointer; border-left: 3px solid transparent;
}
.sidebar-link:hover { color: var(--text); background: rgba(99,102,241,0.08); }
.sidebar-link.active { color: var(--primary); background: rgba(99,102,241,0.1); border-left-color: var(--primary); }
.sidebar-link .icon { font-size: 1rem; width: 20px; text-align: center; }
.sidebar-footer { padding: 16px 20px; border-top: 1px solid var(--border); font-size: 0.68rem; color: var(--text-dim); }

/* ═══ TOPBAR ═══ */
.topbar {
  position: fixed; top: 0; left: 250px; right: 0; height: 60px; background: rgba(17,14,40,0.92);
  backdrop-filter: blur(12px); border-bottom: 1px solid var(--border); display: flex;
  align-items: center; justify-content: space-between; padding: 0 28px; z-index: 99;
}
.topbar-title { font-size: 1.05rem; font-weight: 600; }
.topbar-right { display: flex; align-items: center; gap: 16px; }
.topbar-avatar { width: 34px; height: 34px; border-radius: 50%; background: linear-gradient(135deg, var(--primary), var(--accent)); display: flex; align-items: center; justify-content: center; font-size: 0.72rem; font-weight: 700; color: #fff; }
.topbar-search {
  background: var(--card-bg); border: 1px solid var(--border); border-radius: 8px; padding: 7px 14px;
  color: var(--text); font-size: 0.78rem; outline: none; width: 220px; font-family: 'Lexend', sans-serif;
}
.topbar-search::placeholder { color: var(--text-dim); }

/* ═══ MAIN CONTENT ═══ */
.main { margin-left: 250px; margin-top: 60px; padding: 28px; min-height: calc(100vh - 60px); }
.page-section { display: none; }
.page-section.active { display: block; }
.section-header { margin-bottom: 24px; }
.section-header h2 { font-size: 1.5rem; font-weight: 700; margin-bottom: 4px; }
.section-header p { color: var(--text-muted); font-size: 0.82rem; }

/* ═══ CARDS & KPIs ═══ */
.kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
.kpi {
  background: var(--card-bg); border: 1px solid var(--border); border-radius: 16px; padding: 20px;
  transition: all 0.3s;
}
.kpi:hover { border-color: rgba(99,102,241,0.3); transform: translateY(-2px); box-shadow: 0 8px 30px rgba(99,102,241,0.1); }
.kpi-icon { font-size: 1.3rem; margin-bottom: 8px; }
.kpi-value { font-size: 1.7rem; font-weight: 800; color: var(--primary); }
.kpi-label { font-size: 0.72rem; color: var(--text-muted); margin-top: 2px; font-weight: 400; }
.kpi-trend { font-size: 0.68rem; margin-top: 6px; font-weight: 500; }
.kpi-trend.up { color: var(--success); }

.card {
  background: var(--card-bg); border: 1px solid var(--border); border-radius: 16px;
  overflow: hidden; transition: all 0.3s;
}
.card:hover { border-color: rgba(99,102,241,0.2); }
.card-header { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; border-bottom: 1px solid var(--border); }
.card-header h3 { font-size: 0.95rem; font-weight: 600; }
.card-body { padding: 20px; }

.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }

/* ═══ BADGES ═══ */
.badge { display: inline-block; padding: 3px 10px; border-radius: 100px; font-size: 0.68rem; font-weight: 600; letter-spacing: 0.3px; }
.badge-green { background: rgba(34,197,94,0.15); color: #4ade80; }
.badge-yellow { background: rgba(245,158,11,0.15); color: #fbbf24; }
.badge-red { background: rgba(239,68,68,0.15); color: #f87171; }
.badge-blue { background: rgba(59,130,246,0.15); color: #60a5fa; }
.badge-purple { background: rgba(168,85,247,0.15); color: #c084fc; }
.badge-indigo { background: rgba(99,102,241,0.15); color: #818cf8; }

/* ═══ TABLE ═══ */
.data-table { width: 100%; border-collapse: collapse; }
.data-table th { text-align: left; padding: 10px 14px; font-size: 0.68rem; font-weight: 600; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid var(--border); }
.data-table td { padding: 12px 14px; font-size: 0.8rem; border-bottom: 1px solid rgba(99,102,241,0.06); }
.data-table tr:hover td { background: rgba(99,102,241,0.04); }
.data-table tr:last-child td { border-bottom: none; }

/* ═══ COURSE CARDS ═══ */
.course-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.course-card {
  background: var(--card-bg); border: 1px solid var(--border); border-radius: 16px;
  overflow: hidden; transition: all 0.4s; cursor: pointer;
}
.course-card:hover { transform: translateY(-4px); border-color: rgba(99,102,241,0.3); box-shadow: 0 16px 48px rgba(99,102,241,0.12); }
.course-header { height: 120px; display: flex; align-items: center; justify-content: center; font-size: 2rem; color: rgba(255,255,255,0.5); position: relative; }
.course-body { padding: 16px; }
.course-title { font-size: 0.92rem; font-weight: 700; margin-bottom: 4px; }
.course-instructor { font-size: 0.72rem; color: var(--text-muted); margin-bottom: 10px; }
.course-stats { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
.course-stats span { font-size: 0.72rem; color: var(--text-muted); }
.progress-bar { height: 6px; background: rgba(255,255,255,0.06); border-radius: 3px; overflow: hidden; margin: 8px 0; }
.progress-fill { height: 100%; border-radius: 3px; transition: width 0.6s; }
.course-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 8px; }
.course-price { font-size: 1.05rem; font-weight: 800; color: var(--primary); }
.course-rating { font-size: 0.78rem; color: #fbbf24; }

/* ═══ LESSON LIST ═══ */
.module-block { margin-bottom: 20px; }
.module-header { background: rgba(99,102,241,0.08); padding: 12px 16px; border-radius: 10px; font-weight: 600; font-size: 0.88rem; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center; }
.module-header span { font-size: 0.7rem; color: var(--text-muted); font-weight: 400; }
.lesson-item { display: flex; align-items: center; gap: 12px; padding: 10px 16px; border-bottom: 1px solid rgba(99,102,241,0.05); transition: background 0.2s; cursor: pointer; }
.lesson-item:hover { background: rgba(99,102,241,0.04); }
.lesson-item:last-child { border-bottom: none; }
.lesson-icon { font-size: 1.1rem; width: 28px; text-align: center; }
.lesson-info { flex: 1; }
.lesson-title { font-size: 0.82rem; font-weight: 500; }
.lesson-dur { font-size: 0.68rem; color: var(--text-dim); }
.lesson-check { width: 20px; height: 20px; border-radius: 50%; border: 2px solid var(--border); display: flex; align-items: center; justify-content: center; font-size: 0.6rem; cursor: pointer; transition: all 0.2s; }
.lesson-check.done { background: var(--success); border-color: var(--success); color: #fff; }

/* ═══ CERTIFICATE CARDS ═══ */
.cert-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.cert-card { background: var(--card-bg); border: 1px solid var(--border); border-radius: 16px; padding: 20px; transition: all 0.3s; }
.cert-card:hover { border-color: rgba(99,102,241,0.25); }
.cert-id { font-size: 0.65rem; color: var(--text-dim); font-family: monospace; margin-bottom: 8px; }
.cert-student { font-size: 0.92rem; font-weight: 700; margin-bottom: 2px; }
.cert-course { font-size: 0.78rem; color: var(--text-muted); margin-bottom: 8px; }
.cert-date { font-size: 0.72rem; color: var(--text-dim); margin-bottom: 12px; }
.cert-footer { display: flex; justify-content: space-between; align-items: center; }
.btn { padding: 7px 16px; border: none; border-radius: 8px; font-size: 0.74rem; font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: 'Lexend', sans-serif; }
.btn-primary { background: var(--primary); color: #fff; }
.btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }
.btn-sm { padding: 5px 12px; font-size: 0.68rem; }
.btn-outline { background: transparent; border: 1px solid var(--border); color: var(--text-muted); }
.btn-outline:hover { border-color: var(--primary); color: var(--primary); }

/* ═══ BAR CHART ═══ */
.bar-chart { display: flex; flex-direction: column; gap: 10px; }
.bar-item { display: flex; align-items: center; gap: 12px; }
.bar-label { font-size: 0.74rem; color: var(--text-muted); min-width: 110px; text-align: right; }
.bar-track { flex: 1; height: 8px; background: rgba(255,255,255,0.05); border-radius: 4px; overflow: hidden; }
.bar-fill { height: 100%; border-radius: 4px; transition: width 0.6s; }
.bar-val { font-size: 0.72rem; font-weight: 600; min-width: 40px; }

/* ═══ MINI CARDS (dashboard) ═══ */
.mini-course-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.mini-course { background: rgba(255,255,255,0.03); border: 1px solid var(--border); border-radius: 12px; padding: 14px; cursor: pointer; transition: all 0.3s; }
.mini-course:hover { border-color: rgba(99,102,241,0.25); background: rgba(99,102,241,0.06); }
.mini-course .mc-name { font-size: 0.82rem; font-weight: 600; margin-bottom: 4px; }
.mini-course .mc-info { font-size: 0.7rem; color: var(--text-muted); }

.enroll-list { display: flex; flex-direction: column; }
.enroll-item { display: flex; align-items: center; gap: 12px; padding: 9px 0; border-bottom: 1px solid rgba(99,102,241,0.05); }
.enroll-item:last-child { border-bottom: none; }
.enroll-avatar { width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.65rem; font-weight: 700; color: #fff; }
.enroll-info { flex: 1; }
.enroll-name { font-size: 0.8rem; font-weight: 600; }
.enroll-detail { font-size: 0.68rem; color: var(--text-muted); }

/* ═══ SETTINGS ═══ */
.settings-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.setting-item { display: flex; flex-direction: column; gap: 6px; }
.setting-label { font-size: 0.74rem; color: var(--text-muted); font-weight: 500; }
.setting-input {
  background: rgba(255,255,255,0.04); border: 1px solid var(--border); border-radius: 8px;
  padding: 10px 14px; color: var(--text); font-size: 0.82rem; font-family: 'Lexend', sans-serif;
  outline: none; transition: border-color 0.2s;
}
.setting-input:focus { border-color: var(--primary); }
.toggle-row { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid rgba(99,102,241,0.06); }
.toggle-label { font-size: 0.82rem; }
.toggle { width: 40px; height: 22px; border-radius: 11px; background: rgba(255,255,255,0.1); position: relative; cursor: pointer; transition: background 0.3s; }
.toggle.on { background: ${primary}; }
.toggle::after { content: ''; position: absolute; top: 3px; left: 3px; width: 16px; height: 16px; border-radius: 50%; background: #fff; transition: transform 0.3s; }
.toggle.on::after { transform: translateX(18px); }

.footer { text-align: center; padding: 24px; font-size: 0.7rem; color: var(--text-dim); margin-top: 40px; }

@media (max-width: 1200px) { .course-grid, .cert-grid, .grid-3 { grid-template-columns: repeat(2, 1fr); } .kpi-grid { grid-template-columns: repeat(2, 1fr); } .mini-course-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 768px) {
  .sidebar { display: none; }
  .main { margin-left: 0; width: 100%; padding: 16px; padding-bottom: 70px; }
  .topbar { left: 0; }
  .bottom-nav { display: flex; }
  .course-grid, .cert-grid, .grid-2, .grid-3 { grid-template-columns: 1fr; }
  .kpi-grid { grid-template-columns: repeat(2, 1fr); }
  .mini-course-grid { grid-template-columns: 1fr; }
  .settings-grid { grid-template-columns: 1fr; }
}
.bottom-nav{
  display:none;position:fixed;bottom:0;left:0;right:0;height:60px;
  background:var(--sidebar-bg);border-top:1px solid var(--border);
  justify-content:space-around;align-items:center;z-index:999;padding:0 8px;
}
.bottom-nav button{
  display:flex;flex-direction:column;align-items:center;gap:2px;
  background:none;border:none;color:var(--text-muted);cursor:pointer;
  font-size:0.58rem;font-family:inherit;padding:6px 8px;border-radius:8px;
  transition:all .2s;min-width:44px;
}
.bottom-nav button .bnav-icon{font-size:1.1rem;line-height:1}
.bottom-nav button.active{color:var(--primary)}

@media(max-width:700px){
  .sidebar{display:none}
  .topbar{left:0}
  .main{margin-left:0;width:100%;padding:16px;padding-bottom:70px}
  .bottom-nav{display:flex}
  .kpi-grid{grid-template-columns:1fr}
  .grid-2,.grid-3{grid-template-columns:1fr}
}
</style>
</head>
<body>

<!-- ═══ SIDEBAR ═══ -->
<aside class="sidebar">
  <div class="sidebar-brand">${name}<span>Plataforma Educativa</span></div>
  <nav class="sidebar-nav">
    <a class="sidebar-link active" onclick="showSection('dashboard')"><span class="icon">\u25c9</span> Dashboard</a>
    <a class="sidebar-link" onclick="showSection('courses')"><span class="icon">\u25a4</span> Cursos</a>
    <a class="sidebar-link" onclick="showSection('students')"><span class="icon">\u2630</span> Alumnos</a>
    <a class="sidebar-link" onclick="showSection('lessons')"><span class="icon">\u25ce</span> Lecciones</a>
    <a class="sidebar-link" onclick="showSection('certificates')"><span class="icon">\u229e</span> Certificados</a>
    <a class="sidebar-link" onclick="showSection('analytics')"><span class="icon">\u25c8</span> Analytics</a>
    <a class="sidebar-link" onclick="showSection('settings')"><span class="icon">\u2699</span> Configuraci\u00f3n</a>
  </nav>
  <div class="sidebar-footer">\u00a9 2026 ${name}<br>Powered by <strong style="color:var(--primary)">Kerno Studio</strong></div>
</aside>

<!-- ═══ TOPBAR ═══ -->
<header class="topbar">
  <div class="topbar-title">Dashboard</div>
  <div class="topbar-right">
    <input class="topbar-search" placeholder="Buscar cursos, alumnos..." />
    <div class="topbar-avatar">${name.charAt(0)}</div>
  </div>
</header>

<!-- ═══ MAIN CONTENT ═══ -->
<main class="main">

  <!-- ─── DASHBOARD ─── -->
  <div id="sec-dashboard" class="page-section active">
    <div class="section-header"><h2>Panel de Control</h2><p>M\u00e9tricas clave de tu plataforma educativa</p></div>
    <div class="kpi-grid">
      <div class="kpi"><div class="kpi-icon">\u25c9</div><div class="kpi-value">1,247</div><div class="kpi-label">Alumnos</div><div class="kpi-trend up">\u2191 +89 esta semana</div></div>
      <div class="kpi"><div class="kpi-icon">\u25a4</div><div class="kpi-value">18</div><div class="kpi-label">Cursos Activos</div><div class="kpi-trend up">\u2191 +2 nuevos</div></div>
      <div class="kpi"><div class="kpi-icon">\u25ce</div><div class="kpi-value">72%</div><div class="kpi-label">Tasa Completado</div><div class="kpi-trend up">\u2191 +3.2%</div></div>
      <div class="kpi"><div class="kpi-icon">\u25c8</div><div class="kpi-value">\u20ac34,200</div><div class="kpi-label">Ingresos</div><div class="kpi-trend up">\u2191 +18%</div></div>
    </div>
    <div class="grid-2">
      <div class="card">
        <div class="card-header"><h3>Cursos Populares</h3><span class="badge badge-indigo">Top 3</span></div>
        <div class="card-body">
          <div class="mini-course-grid">
            <div class="mini-course"><div class="mc-name">Marketing Digital</div><div class="mc-info">342 alumnos \u00b7 4.8 \u2605</div></div>
            <div class="mini-course"><div class="mc-name">Python Avanzado</div><div class="mc-info">289 alumnos \u00b7 4.9 \u2605</div></div>
            <div class="mini-course"><div class="mc-name">Dise\u00f1o UX/UI</div><div class="mc-info">198 alumnos \u00b7 4.7 \u2605</div></div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><h3>Inscripciones Recientes</h3><span class="badge badge-green">Hoy</span></div>
        <div class="card-body">
          <div class="enroll-list">
            <div class="enroll-item"><div class="enroll-avatar" style="background:linear-gradient(135deg,${primary},${accent})">AM</div><div class="enroll-info"><div class="enroll-name">Ana Mart\u00ednez</div><div class="enroll-detail">Marketing Digital \u00b7 Hace 2h</div></div></div>
            <div class="enroll-item"><div class="enroll-avatar" style="background:linear-gradient(135deg,#ec4899,#f43f5e)">CR</div><div class="enroll-info"><div class="enroll-name">Carlos Rodr\u00edguez</div><div class="enroll-detail">Python Avanzado \u00b7 Hace 4h</div></div></div>
            <div class="enroll-item"><div class="enroll-avatar" style="background:linear-gradient(135deg,#14b8a6,#06b6d4)">LS</div><div class="enroll-info"><div class="enroll-name">Laura S\u00e1nchez</div><div class="enroll-detail">Data Science \u00b7 Hace 6h</div></div></div>
            <div class="enroll-item"><div class="enroll-avatar" style="background:linear-gradient(135deg,#f59e0b,#f97316)">MT</div><div class="enroll-info"><div class="enroll-name">Miguel Torres</div><div class="enroll-detail">React & Next.js \u00b7 Ayer</div></div></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ─── CURSOS ─── -->
  <div id="sec-courses" class="page-section">
    <div class="section-header"><h2>Cat\u00e1logo de Cursos</h2><p>Gestiona y supervisa todos los cursos de la plataforma</p></div>
    <div class="course-grid">
      <div class="course-card">
        <div class="course-header" style="background:linear-gradient(135deg,#6366f1,#8b5cf6)">\u25a4</div>
        <div class="course-body">
          <div class="course-title">Marketing Digital</div>
          <div class="course-instructor">Prof. Laura G\u00f3mez</div>
          <div class="course-stats"><span>342 alumnos</span><span>48 lecciones</span></div>
          <div class="progress-bar"><div class="progress-fill" style="width:84%;background:${primary}"></div></div>
          <div class="course-footer"><span class="course-price">\u20ac49</span><span class="course-rating">\u2605\u2605\u2605\u2605\u2606 4.8</span></div>
        </div>
      </div>
      <div class="course-card">
        <div class="course-header" style="background:linear-gradient(135deg,#14b8a6,#06b6d4)">\u25a4</div>
        <div class="course-body">
          <div class="course-title">Python Avanzado</div>
          <div class="course-instructor">Prof. Javier Ruiz</div>
          <div class="course-stats"><span>289 alumnos</span><span>62 lecciones</span></div>
          <div class="progress-bar"><div class="progress-fill" style="width:76%;background:#14b8a6"></div></div>
          <div class="course-footer"><span class="course-price">\u20ac59</span><span class="course-rating">\u2605\u2605\u2605\u2605\u2605 4.9</span></div>
        </div>
      </div>
      <div class="course-card">
        <div class="course-header" style="background:linear-gradient(135deg,#ec4899,#f43f5e)">\u25a4</div>
        <div class="course-body">
          <div class="course-title">Dise\u00f1o UX/UI</div>
          <div class="course-instructor">Prof. Marta Fern\u00e1ndez</div>
          <div class="course-stats"><span>198 alumnos</span><span>36 lecciones</span></div>
          <div class="progress-bar"><div class="progress-fill" style="width:91%;background:#ec4899"></div></div>
          <div class="course-footer"><span class="course-price">\u20ac39</span><span class="course-rating">\u2605\u2605\u2605\u2605\u2606 4.7</span></div>
        </div>
      </div>
      <div class="course-card">
        <div class="course-header" style="background:linear-gradient(135deg,#f59e0b,#f97316)">\u25a4</div>
        <div class="course-body">
          <div class="course-title">Data Science</div>
          <div class="course-instructor">Prof. Carlos Vega</div>
          <div class="course-stats"><span>156 alumnos</span><span>54 lecciones</span></div>
          <div class="progress-bar"><div class="progress-fill" style="width:68%;background:#f59e0b"></div></div>
          <div class="course-footer"><span class="course-price">\u20ac69</span><span class="course-rating">\u2605\u2605\u2605\u2605\u2606 4.6</span></div>
        </div>
      </div>
      <div class="course-card">
        <div class="course-header" style="background:linear-gradient(135deg,#22c55e,#16a34a)">\u25a4</div>
        <div class="course-body">
          <div class="course-title">React & Next.js</div>
          <div class="course-instructor">Prof. Pablo S\u00e1nchez</div>
          <div class="course-stats"><span>124 alumnos</span><span>44 lecciones</span></div>
          <div class="progress-bar"><div class="progress-fill" style="width:58%;background:#22c55e"></div></div>
          <div class="course-footer"><span class="course-price">\u20ac59</span><span class="course-rating">\u2605\u2605\u2605\u2605\u2606 4.7</span></div>
        </div>
      </div>
      <div class="course-card">
        <div class="course-header" style="background:linear-gradient(135deg,#3b82f6,#1d4ed8)">\u25a4</div>
        <div class="course-body">
          <div class="course-title">Ingl\u00e9s Business</div>
          <div class="course-instructor">Prof. Sarah Mitchell</div>
          <div class="course-stats"><span>98 alumnos</span><span>30 lecciones</span></div>
          <div class="progress-bar"><div class="progress-fill" style="width:72%;background:#3b82f6"></div></div>
          <div class="course-footer"><span class="course-price">\u20ac29</span><span class="course-rating">\u2605\u2605\u2605\u2605\u2606 4.5</span></div>
        </div>
      </div>
    </div>
  </div>

  <!-- ─── ALUMNOS ─── -->
  <div id="sec-students" class="page-section">
    <div class="section-header"><h2>Gesti\u00f3n de Alumnos</h2><p>Seguimiento del progreso y actividad de cada estudiante</p></div>
    <div class="card">
      <div class="card-header"><h3>Alumnos</h3><span class="badge badge-indigo">1,247 registrados</span></div>
      <div class="card-body" style="overflow-x:auto">
        <table class="data-table">
          <thead><tr><th>Alumno</th><th>Email</th><th>Cursos</th><th>Progreso</th><th>Certificados</th><th>\u00daltimo acceso</th></tr></thead>
          <tbody>
            <tr><td><span style="display:inline-flex;align-items:center;gap:8px"><span style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,${primary},${accent});display:inline-flex;align-items:center;justify-content:center;font-size:0.6rem;font-weight:700;color:#fff">AM</span><b>Ana Mart\u00ednez</b></span></td><td>ana@email.com</td><td>4</td><td><div class="progress-bar" style="width:100px;display:inline-block"><div class="progress-fill" style="width:92%;background:${primary}"></div></div> 92%</td><td>3</td><td>Hace 1h</td></tr>
            <tr><td><span style="display:inline-flex;align-items:center;gap:8px"><span style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#ec4899,#f43f5e);display:inline-flex;align-items:center;justify-content:center;font-size:0.6rem;font-weight:700;color:#fff">CR</span><b>Carlos Rodr\u00edguez</b></span></td><td>carlos@email.com</td><td>3</td><td><div class="progress-bar" style="width:100px;display:inline-block"><div class="progress-fill" style="width:78%;background:${primary}"></div></div> 78%</td><td>2</td><td>Hace 3h</td></tr>
            <tr><td><span style="display:inline-flex;align-items:center;gap:8px"><span style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#14b8a6,#06b6d4);display:inline-flex;align-items:center;justify-content:center;font-size:0.6rem;font-weight:700;color:#fff">LS</span><b>Laura S\u00e1nchez</b></span></td><td>laura@email.com</td><td>5</td><td><div class="progress-bar" style="width:100px;display:inline-block"><div class="progress-fill" style="width:95%;background:var(--success)"></div></div> 95%</td><td>5</td><td>Hoy</td></tr>
            <tr><td><span style="display:inline-flex;align-items:center;gap:8px"><span style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#f59e0b,#f97316);display:inline-flex;align-items:center;justify-content:center;font-size:0.6rem;font-weight:700;color:#fff">MT</span><b>Miguel Torres</b></span></td><td>miguel@email.com</td><td>2</td><td><div class="progress-bar" style="width:100px;display:inline-block"><div class="progress-fill" style="width:45%;background:var(--warning)"></div></div> 45%</td><td>0</td><td>Ayer</td></tr>
            <tr><td><span style="display:inline-flex;align-items:center;gap:8px"><span style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#22c55e,#16a34a);display:inline-flex;align-items:center;justify-content:center;font-size:0.6rem;font-weight:700;color:#fff">EG</span><b>Elena Garc\u00eda</b></span></td><td>elena@email.com</td><td>6</td><td><div class="progress-bar" style="width:100px;display:inline-block"><div class="progress-fill" style="width:88%;background:${primary}"></div></div> 88%</td><td>4</td><td>Hace 2h</td></tr>
            <tr><td><span style="display:inline-flex;align-items:center;gap:8px"><span style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#3b82f6,#1d4ed8);display:inline-flex;align-items:center;justify-content:center;font-size:0.6rem;font-weight:700;color:#fff">PF</span><b>Pablo Fern\u00e1ndez</b></span></td><td>pablo@email.com</td><td>1</td><td><div class="progress-bar" style="width:100px;display:inline-block"><div class="progress-fill" style="width:22%;background:var(--danger)"></div></div> 22%</td><td>0</td><td>Hace 8 d\u00edas</td></tr>
            <tr><td><span style="display:inline-flex;align-items:center;gap:8px"><span style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#a855f7,#7c3aed);display:inline-flex;align-items:center;justify-content:center;font-size:0.6rem;font-weight:700;color:#fff">SL</span><b>Sof\u00eda L\u00f3pez</b></span></td><td>sofia@email.com</td><td>3</td><td><div class="progress-bar" style="width:100px;display:inline-block"><div class="progress-fill" style="width:67%;background:${primary}"></div></div> 67%</td><td>1</td><td>Hace 1 d\u00eda</td></tr>
            <tr><td><span style="display:inline-flex;align-items:center;gap:8px"><span style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#f43f5e,#e11d48);display:inline-flex;align-items:center;justify-content:center;font-size:0.6rem;font-weight:700;color:#fff">DN</span><b>Daniel N\u00fa\u00f1ez</b></span></td><td>daniel@email.com</td><td>2</td><td><div class="progress-bar" style="width:100px;display:inline-block"><div class="progress-fill" style="width:56%;background:${primary}"></div></div> 56%</td><td>1</td><td>Hace 2 d\u00edas</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- ─── LECCIONES ─── -->
  <div id="sec-lessons" class="page-section">
    <div class="section-header"><h2>Contenido de Lecciones</h2><p>M\u00f3dulos, videos, quizzes y ejercicios pr\u00e1cticos</p></div>
    <div class="card">
      <div class="card-body">

        <div class="module-block">
          <div class="module-header">M\u00f3dulo 1: Fundamentos de Marketing Digital <span>4 lecciones \u00b7 1h 45min</span></div>
          <div class="lesson-item"><span class="lesson-icon">\u25b6</span><div class="lesson-info"><div class="lesson-title">Introducci\u00f3n al Marketing Digital</div><div class="lesson-dur">Video \u00b7 12:30</div></div><div class="lesson-check done">\u2713</div></div>
          <div class="lesson-item"><span class="lesson-icon">\u25b6</span><div class="lesson-info"><div class="lesson-title">Fundamentos de SEO</div><div class="lesson-dur">Video \u00b7 18:45</div></div><div class="lesson-check done">\u2713</div></div>
          <div class="lesson-item"><span class="lesson-icon">\u270d</span><div class="lesson-info"><div class="lesson-title">Quiz: Conceptos B\u00e1sicos</div><div class="lesson-dur">Quiz \u00b7 15 min</div></div><div class="lesson-check done">\u2713</div></div>
          <div class="lesson-item"><span class="lesson-icon">\u2328</span><div class="lesson-info"><div class="lesson-title">Ejercicio: An\u00e1lisis de Competencia</div><div class="lesson-dur">Ejercicio \u00b7 30 min</div></div><div class="lesson-check" onclick="this.classList.toggle('done');this.textContent=this.classList.contains('done')?'\u2713':''"></div></div>
        </div>

        <div class="module-block">
          <div class="module-header">M\u00f3dulo 2: Programaci\u00f3n con Python <span>4 lecciones \u00b7 2h 10min</span></div>
          <div class="lesson-item"><span class="lesson-icon">\u25b6</span><div class="lesson-info"><div class="lesson-title">Variables y Tipos de Datos</div><div class="lesson-dur">Video \u00b7 22:10</div></div><div class="lesson-check done">\u2713</div></div>
          <div class="lesson-item"><span class="lesson-icon">\u25b6</span><div class="lesson-info"><div class="lesson-title">Estructuras de Control</div><div class="lesson-dur">Video \u00b7 28:00</div></div><div class="lesson-check" onclick="this.classList.toggle('done');this.textContent=this.classList.contains('done')?'\u2713':''"></div></div>
          <div class="lesson-item"><span class="lesson-icon">\u270d</span><div class="lesson-info"><div class="lesson-title">Quiz: Python B\u00e1sico</div><div class="lesson-dur">Quiz \u00b7 20 min</div></div><div class="lesson-check" onclick="this.classList.toggle('done');this.textContent=this.classList.contains('done')?'\u2713':''"></div></div>
          <div class="lesson-item"><span class="lesson-icon">\u2328</span><div class="lesson-info"><div class="lesson-title">Proyecto: Calculadora CLI</div><div class="lesson-dur">Ejercicio \u00b7 45 min</div></div><div class="lesson-check" onclick="this.classList.toggle('done');this.textContent=this.classList.contains('done')?'\u2713':''"></div></div>
        </div>

        <div class="module-block">
          <div class="module-header">M\u00f3dulo 3: Dise\u00f1o de Interfaces <span>3 lecciones \u00b7 1h 30min</span></div>
          <div class="lesson-item"><span class="lesson-icon">\u25b6</span><div class="lesson-info"><div class="lesson-title">Principios de Dise\u00f1o UI</div><div class="lesson-dur">Video \u00b7 28:00</div></div><div class="lesson-check" onclick="this.classList.toggle('done');this.textContent=this.classList.contains('done')?'\u2713':''"></div></div>
          <div class="lesson-item"><span class="lesson-icon">\u2328</span><div class="lesson-info"><div class="lesson-title">Ejercicio Pr\u00e1ctico: Wireframes</div><div class="lesson-dur">Ejercicio \u00b7 45 min</div></div><div class="lesson-check" onclick="this.classList.toggle('done');this.textContent=this.classList.contains('done')?'\u2713':''"></div></div>
          <div class="lesson-item"><span class="lesson-icon">\u270d</span><div class="lesson-info"><div class="lesson-title">Examen: Dise\u00f1o Responsive</div><div class="lesson-dur">Quiz \u00b7 25 min</div></div><div class="lesson-check" onclick="this.classList.toggle('done');this.textContent=this.classList.contains('done')?'\u2713':''"></div></div>
        </div>

      </div>
    </div>
  </div>

  <!-- ─── CERTIFICADOS ─── -->
  <div id="sec-certificates" class="page-section">
    <div class="section-header"><h2>Certificados Emitidos</h2><p>Historial de certificaciones de la plataforma</p></div>
    <div class="cert-grid">
      <div class="cert-card">
        <div class="cert-id">CERT-MKT-2026-0892</div>
        <div class="cert-student">Laura S\u00e1nchez</div>
        <div class="cert-course">Marketing Digital</div>
        <div class="cert-date">08/04/2026</div>
        <div class="cert-footer"><span class="badge badge-green">Emitido</span><button class="btn btn-sm btn-outline">Descargar</button></div>
      </div>
      <div class="cert-card">
        <div class="cert-id">CERT-PYT-2026-0891</div>
        <div class="cert-student">Elena Garc\u00eda</div>
        <div class="cert-course">Python Avanzado</div>
        <div class="cert-date">07/04/2026</div>
        <div class="cert-footer"><span class="badge badge-green">Emitido</span><button class="btn btn-sm btn-outline">Descargar</button></div>
      </div>
      <div class="cert-card">
        <div class="cert-id">CERT-UX-2026-0890</div>
        <div class="cert-student">Ana Mart\u00ednez</div>
        <div class="cert-course">Dise\u00f1o UX/UI</div>
        <div class="cert-date">06/04/2026</div>
        <div class="cert-footer"><span class="badge badge-green">Emitido</span><button class="btn btn-sm btn-outline">Descargar</button></div>
      </div>
      <div class="cert-card">
        <div class="cert-id">CERT-DS-2026-0889</div>
        <div class="cert-student">Carlos Rodr\u00edguez</div>
        <div class="cert-course">Data Science</div>
        <div class="cert-date">05/04/2026</div>
        <div class="cert-footer"><span class="badge badge-yellow">Pendiente</span><button class="btn btn-sm btn-outline">Descargar</button></div>
      </div>
      <div class="cert-card">
        <div class="cert-id">CERT-MKT-2026-0888</div>
        <div class="cert-student">Sof\u00eda L\u00f3pez</div>
        <div class="cert-course">Marketing Digital</div>
        <div class="cert-date">04/04/2026</div>
        <div class="cert-footer"><span class="badge badge-green">Emitido</span><button class="btn btn-sm btn-outline">Descargar</button></div>
      </div>
      <div class="cert-card">
        <div class="cert-id">CERT-ENG-2026-0887</div>
        <div class="cert-student">Elena Garc\u00eda</div>
        <div class="cert-course">Ingl\u00e9s Business</div>
        <div class="cert-date">03/04/2026</div>
        <div class="cert-footer"><span class="badge badge-green">Emitido</span><button class="btn btn-sm btn-outline">Descargar</button></div>
      </div>
    </div>
  </div>

  <!-- ─── ANALYTICS ─── -->
  <div id="sec-analytics" class="page-section">
    <div class="section-header"><h2>M\u00e9tricas de Aprendizaje</h2><p>Rendimiento de cursos, engagement y m\u00e9tricas educativas</p></div>
    <div class="kpi-grid" style="grid-template-columns:repeat(3,1fr)">
      <div class="kpi"><div class="kpi-icon">\u25c9</div><div class="kpi-value">78%</div><div class="kpi-label">Engagement</div></div>
      <div class="kpi"><div class="kpi-icon">\u25ce</div><div class="kpi-value">82</div><div class="kpi-label">NPS Score</div></div>
      <div class="kpi"><div class="kpi-icon">\u25c8</div><div class="kpi-value">\u20ac42</div><div class="kpi-label">Revenue/Student</div></div>
    </div>
    <div class="grid-2">
      <div class="card">
        <div class="card-header"><h3>Inscripciones por Mes</h3></div>
        <div class="card-body">
          <div class="bar-chart">
            <div class="bar-item"><span class="bar-label">Enero</span><div class="bar-track"><div class="bar-fill" style="width:55%;background:${primary}"></div></div><span class="bar-val">156</span></div>
            <div class="bar-item"><span class="bar-label">Febrero</span><div class="bar-track"><div class="bar-fill" style="width:68%;background:${primary}"></div></div><span class="bar-val">198</span></div>
            <div class="bar-item"><span class="bar-label">Marzo</span><div class="bar-track"><div class="bar-fill" style="width:82%;background:${primary}"></div></div><span class="bar-val">234</span></div>
            <div class="bar-item"><span class="bar-label">Abril</span><div class="bar-track"><div class="bar-fill" style="width:92%;background:${accent}"></div></div><span class="bar-val">289</span></div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><h3>Completado por Curso</h3></div>
        <div class="card-body">
          <div class="bar-chart">
            <div class="bar-item"><span class="bar-label">Dise\u00f1o UX</span><div class="bar-track"><div class="bar-fill" style="width:91%;background:#ec4899"></div></div><span class="bar-val">91%</span></div>
            <div class="bar-item"><span class="bar-label">Marketing</span><div class="bar-track"><div class="bar-fill" style="width:84%;background:${primary}"></div></div><span class="bar-val">84%</span></div>
            <div class="bar-item"><span class="bar-label">Python</span><div class="bar-track"><div class="bar-fill" style="width:76%;background:#14b8a6"></div></div><span class="bar-val">76%</span></div>
            <div class="bar-item"><span class="bar-label">Ingl\u00e9s</span><div class="bar-track"><div class="bar-fill" style="width:72%;background:#3b82f6"></div></div><span class="bar-val">72%</span></div>
            <div class="bar-item"><span class="bar-label">Data Science</span><div class="bar-track"><div class="bar-fill" style="width:68%;background:#f59e0b"></div></div><span class="bar-val">68%</span></div>
            <div class="bar-item"><span class="bar-label">React</span><div class="bar-track"><div class="bar-fill" style="width:58%;background:#22c55e"></div></div><span class="bar-val">58%</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ─── CONFIGURACI\u00d3N ─── -->
  <div id="sec-settings" class="page-section">
    <div class="section-header"><h2>Ajustes de la Plataforma</h2><p>Configuraci\u00f3n general de la academia</p></div>
    <div class="card">
      <div class="card-header"><h3>Datos de la Plataforma</h3></div>
      <div class="card-body">
        <div class="settings-grid">
          <div class="setting-item"><label class="setting-label">Nombre de la plataforma</label><input class="setting-input" value="${name}" /></div>
          <div class="setting-item"><label class="setting-label">URL de la academia</label><input class="setting-input" value="academy.${name.toLowerCase().replace(/\\s/g, '')}.com" /></div>
          <div class="setting-item"><label class="setting-label">Email de soporte</label><input class="setting-input" value="soporte@${name.toLowerCase().replace(/\\s/g, '')}.com" /></div>
          <div class="setting-item"><label class="setting-label">Idioma por defecto</label><input class="setting-input" value="Espa\u00f1ol" /></div>
          <div class="setting-item"><label class="setting-label">Moneda</label><input class="setting-input" value="EUR (\u20ac)" /></div>
          <div class="setting-item"><label class="setting-label">Zona horaria</label><input class="setting-input" value="Europe/Madrid" /></div>
        </div>
        <div style="margin-top:24px;border-top:1px solid var(--border);padding-top:16px">
          <div class="toggle-row"><span class="toggle-label">Certificados autom\u00e1ticos al completar</span><div class="toggle on" onclick="this.classList.toggle('on')"></div></div>
          <div class="toggle-row"><span class="toggle-label">Notificaciones de progreso</span><div class="toggle on" onclick="this.classList.toggle('on')"></div></div>
          <div class="toggle-row"><span class="toggle-label">Gamificaci\u00f3n activa</span><div class="toggle on" onclick="this.classList.toggle('on')"></div></div>
          <div class="toggle-row"><span class="toggle-label">Modo mantenimiento</span><div class="toggle" onclick="this.classList.toggle('on')"></div></div>
        </div>
        <div style="margin-top:20px;text-align:right"><button class="btn btn-primary">Guardar Cambios</button></div>
      </div>
    </div>
  </div>

</main>

<div class="footer">Prototipo generado por <strong style="color:${primary}">Kerno Studio</strong></div>

<!-- Bottom Nav (mobile only) -->
<nav class="bottom-nav">
  <button class="active" onclick="showSection('dashboard')"><span class="bnav-icon">◉</span>Inicio</button>
  <button onclick="showSection('courses')"><span class="bnav-icon">◎</span>Cursos</button>
  <button onclick="showSection('students')"><span class="bnav-icon">☰</span>Alumnos</button>
  <button onclick="showSection('lessons')"><span class="bnav-icon">▤</span>Lecciones</button>
  <button onclick="showSection('certificates')"><span class="bnav-icon">⊞</span>Certificados</button>
  <button onclick="showSection('analytics')"><span class="bnav-icon">◈</span>Analytics</button>
</nav>

<script>
function showSection(id) {
  document.querySelectorAll('.page-section').forEach(function(s) { s.classList.remove('active'); });
  document.getElementById('sec-' + id).classList.add('active');
  document.querySelectorAll('.sidebar-link').forEach(function(l) { l.classList.remove('active'); });
  document.querySelectorAll('.bottom-nav button').forEach(b=>b.classList.remove('active'));
  var bnav = document.querySelector('.bottom-nav button[onclick*="' + id + '"]');
  if(bnav) bnav.classList.add('active');
  document.querySelector('.topbar-title').textContent =
    id === 'dashboard' ? 'Dashboard' :
    id === 'courses' ? 'Cursos' :
    id === 'students' ? 'Alumnos' :
    id === 'lessons' ? 'Lecciones' :
    id === 'certificates' ? 'Certificados' :
    id === 'analytics' ? 'Analytics' : 'Configuraci\u00f3n';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>
</body>
</html>`
  },
}
