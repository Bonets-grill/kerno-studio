import type { TemplateDefinition, TemplateCustomization } from '../types'

export const projectmgmtTemplate: TemplateDefinition = {
  meta: {
    id: 'projectmgmt',
    name: 'Gestión de Proyectos',
    industries: ['project', 'proyecto', 'tasks', 'tareas', 'gestión de proyectos', 'project management', 'agile', 'scrum', 'kanban'],
    projectTypes: ['landing', 'mvp', 'system', 'saas'],
    sections: ['dashboard', 'projects', 'tasks', 'team', 'timeline', 'analytics', 'settings'],
    description: 'Plantilla premium para gestión de proyectos con sidebar. Dashboard con KPIs de proyectos y tareas, vista de proyectos con progreso, tablero kanban, equipo con asignaciones, timeline tipo Gantt, analytics de productividad y configuración.',
  },

  render(c: TemplateCustomization): string {
    const p = c.primaryColor || '#6366f1'
    const a = c.accentColor || '#8b5cf6'
    const biz = c.businessName || 'Project Hub'

    return `<!DOCTYPE html>
<html lang="${c.locale || 'es'}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${biz} — Project Management</title>
<link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --primary:${p};
  --accent:${a};
  --sidebar-bg:#12111e;
  --content-bg:#0e0d1a;
  --card-bg:#18172a;
  --card-border:#252340;
  --text:#e8e6f0;
  --text-dim:#8b87a8;
  --text-muted:#5a5680;
  --success:#10b981;
  --warning:#f59e0b;
  --danger:#ef4444;
  --info:#3b82f6;
  --purple:#a78bfa;
  --sidebar-w:250px;
  --navbar-h:56px;
}
html{scroll-behavior:smooth}
body{font-family:'Work Sans',sans-serif;background:var(--content-bg);color:var(--text);height:100vh;overflow:hidden;}

/* ── SIDEBAR ── */
.sidebar{width:var(--sidebar-w);min-width:var(--sidebar-w);height:100vh;background:var(--sidebar-bg);border-right:1px solid var(--card-border);z-index:100;display:flex;flex-direction:column;transition:transform .3s}
.sidebar-brand{padding:20px 24px;font-size:1.1rem;font-weight:800;color:var(--primary);border-bottom:1px solid var(--card-border);letter-spacing:-0.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sidebar-nav{flex:1;padding:12px 0;overflow-y:auto}
.sidebar-link{display:flex;align-items:center;gap:12px;padding:11px 24px;color:var(--text-dim);font-size:0.85rem;font-weight:500;cursor:pointer;transition:all .2s;border-left:3px solid transparent;text-decoration:none}
.sidebar-link:hover{color:var(--text);background:rgba(255,255,255,0.04)}
.sidebar-link.active{color:var(--primary);background:rgba(99,102,241,0.08);border-left-color:var(--primary)}
.sidebar-link .icon{font-size:1rem;width:20px;text-align:center}
.sidebar-footer{padding:16px 24px;border-top:1px solid var(--card-border);font-size:0.7rem;color:var(--text-muted)}

/* ── NAVBAR ── */
.navbar{position:fixed;top:0;left:var(--sidebar-w);right:0;height:var(--navbar-h);background:var(--sidebar-bg);border-bottom:1px solid var(--card-border);display:flex;align-items:center;justify-content:space-between;padding:0 28px;z-index:99}
.navbar-title{font-size:0.95rem;font-weight:600;color:var(--text)}
.navbar-right{display:flex;align-items:center;gap:16px}
.navbar-badge{background:var(--primary);color:#fff;font-size:0.65rem;padding:3px 10px;border-radius:20px;font-weight:700}
.navbar-avatar{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,var(--primary),var(--accent));display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:700;color:#fff}
.menu-toggle{display:none;background:none;border:none;color:var(--text);font-size:1.3rem;cursor:pointer}

/* ── MAIN CONTENT ── */
.main{flex:1;overflow-y:auto;padding:28px;min-height:calc(100vh - var(--navbar-h))}
.page-section{display:none;animation:fadeUp .4s ease}
.page-section.active{display:block}
@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}

/* ── SECTION HEADER ── */
.section-header{margin-bottom:24px}
.section-header .label{font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:var(--primary);margin-bottom:6px}
.section-header h2{font-size:1.6rem;font-weight:800;letter-spacing:-0.5px;margin-bottom:4px}
.section-header p{font-size:0.85rem;color:var(--text-dim)}

/* ── CARDS ── */
.card{background:var(--card-bg);border:1px solid var(--card-border);border-radius:16px;padding:20px;margin-bottom:16px;transition:border-color .2s}
.card:hover{border-color:rgba(255,255,255,0.1)}
.card-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
.card-header h3{font-size:0.95rem;font-weight:700}

/* ── KPI GRID ── */
.kpi-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:20px}
.kpi{background:var(--card-bg);border:1px solid var(--card-border);border-radius:16px;padding:20px;text-align:center;position:relative;overflow:hidden}
.kpi::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--primary),var(--accent));opacity:0;transition:opacity .3s}
.kpi:hover::before{opacity:1}
.kpi .kpi-icon{font-size:1.5rem;margin-bottom:8px}
.kpi .kpi-value{font-size:1.8rem;font-weight:800;color:var(--text);letter-spacing:-1px}
.kpi .kpi-value.counter{color:var(--primary)}
.kpi .kpi-label{font-size:0.72rem;color:var(--text-dim);margin-top:4px;font-weight:500}
.kpi .kpi-trend{font-size:0.65rem;margin-top:6px;font-weight:600}
.kpi .kpi-trend.up{color:var(--success)}
.kpi .kpi-trend.down{color:var(--danger)}

/* ── GRIDS ── */
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}

/* ── BADGES ── */
.badge{display:inline-block;padding:3px 10px;border-radius:20px;font-size:0.65rem;font-weight:700}
.badge-green{background:rgba(16,185,129,0.15);color:#34d399}
.badge-red{background:rgba(239,68,68,0.15);color:#f87171}
.badge-yellow{background:rgba(245,158,11,0.15);color:#fbbf24}
.badge-blue{background:rgba(59,130,246,0.15);color:#60a5fa}
.badge-purple{background:rgba(167,139,250,0.15);color:#a78bfa}
.badge-primary{background:rgba(99,102,241,0.15);color:var(--primary)}
.badge-accent{background:rgba(139,92,246,0.15);color:var(--accent)}
.badge-indigo{background:rgba(99,102,241,0.15);color:#818cf8}

/* ── HORIZONTAL BAR ── */
.hbar{margin-bottom:12px}
.hbar-label{display:flex;justify-content:space-between;font-size:0.75rem;margin-bottom:4px}
.hbar-label span:first-child{color:var(--text-dim)}
.hbar-label span:last-child{color:var(--text);font-weight:600}
.hbar-track{height:8px;background:rgba(255,255,255,0.06);border-radius:8px;overflow:hidden}
.hbar-fill{height:100%;border-radius:8px;transition:width 1s ease;background:var(--primary)}

/* ── PROGRESS BAR ── */
.progress-row{margin-bottom:14px}
.progress-label{display:flex;justify-content:space-between;font-size:0.75rem;margin-bottom:4px}
.progress-label span:first-child{color:var(--text-dim)}
.progress-label span:last-child{font-weight:700;color:var(--text)}
.progress-track{height:6px;background:rgba(255,255,255,0.06);border-radius:6px;overflow:hidden}
.progress-fill{height:100%;border-radius:6px;transition:width 1.2s ease}

/* ── TABLES ── */
.data-tbl{width:100%;border-collapse:collapse;font-size:0.8rem}
.data-tbl thead th{text-align:left;padding:10px 14px;font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--text-muted);border-bottom:1px solid var(--card-border)}
.data-tbl tbody td{padding:12px 14px;border-bottom:1px solid rgba(255,255,255,0.04);color:var(--text-dim)}
.data-tbl tbody tr:hover{background:rgba(255,255,255,0.02)}

/* ── PROJECT CARDS ── */
.project-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.project-card{background:var(--card-bg);border:1px solid var(--card-border);border-radius:16px;padding:20px;transition:all .2s;cursor:pointer}
.project-card:hover{border-color:var(--primary);transform:translateY(-2px);box-shadow:0 8px 30px rgba(99,102,241,0.1)}
.project-card .pc-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}
.project-card .pc-title{font-size:0.92rem;font-weight:700;color:var(--text)}
.project-card .pc-desc{font-size:0.75rem;color:var(--text-dim);margin-bottom:14px;line-height:1.4}
.project-card .pc-progress{margin-bottom:12px}
.project-card .pc-progress-label{display:flex;justify-content:space-between;font-size:0.7rem;color:var(--text-dim);margin-bottom:4px}
.project-card .pc-progress-track{height:6px;background:rgba(255,255,255,0.06);border-radius:6px;overflow:hidden}
.project-card .pc-progress-fill{height:100%;border-radius:6px;transition:width 1.2s ease;background:var(--primary)}
.project-card .pc-footer{display:flex;align-items:center;justify-content:space-between}
.project-card .pc-team{display:flex}
.project-card .pc-avatar{width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,var(--primary),var(--accent));display:flex;align-items:center;justify-content:center;font-size:0.55rem;font-weight:700;color:#fff;margin-left:-6px;border:2px solid var(--card-bg)}
.project-card .pc-avatar:first-child{margin-left:0}
.project-card .pc-deadline{font-size:0.68rem;color:var(--text-muted)}

/* ── KANBAN ── */
.kanban{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;min-height:400px}
.kanban-col{background:rgba(255,255,255,0.02);border-radius:14px;padding:14px;border:1px solid var(--card-border)}
.kanban-col-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;padding-bottom:10px;border-bottom:1px solid var(--card-border)}
.kanban-col-title{font-size:0.78rem;font-weight:700;color:var(--text)}
.kanban-col-count{font-size:0.65rem;background:rgba(255,255,255,0.08);padding:2px 8px;border-radius:10px;color:var(--text-dim)}
.kanban-card{background:var(--card-bg);border:1px solid var(--card-border);border-radius:12px;padding:14px;margin-bottom:10px;cursor:grab;transition:all .2s;box-shadow:0 2px 8px rgba(0,0,0,0.15)}
.kanban-card:hover{border-color:var(--primary);box-shadow:0 4px 16px rgba(99,102,241,0.15);transform:translateY(-1px)}
.kanban-card .kc-title{font-size:0.8rem;font-weight:600;color:var(--text);margin-bottom:8px}
.kanban-card .kc-meta{display:flex;align-items:center;justify-content:space-between;font-size:0.68rem;color:var(--text-dim)}
.kanban-card .kc-assignee{display:flex;align-items:center;gap:6px}
.kanban-card .kc-avatar{width:20px;height:20px;border-radius:50%;background:linear-gradient(135deg,var(--primary),var(--accent));display:flex;align-items:center;justify-content:center;font-size:0.5rem;font-weight:700;color:#fff}
.kanban-card .kc-due{font-size:0.62rem;color:var(--text-muted)}
.priority-high{border-left:3px solid var(--danger)}
.priority-medium{border-left:3px solid var(--warning)}
.priority-low{border-left:3px solid var(--success)}

/* ── TEAM CARDS ── */
.team-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.team-card{background:var(--card-bg);border:1px solid var(--card-border);border-radius:16px;padding:20px;text-align:center;transition:border-color .2s}
.team-card:hover{border-color:var(--primary)}
.team-card .tc-avatar{width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,var(--primary),var(--accent));display:flex;align-items:center;justify-content:center;font-size:1rem;font-weight:700;color:#fff;margin:0 auto 12px}
.team-card .tc-name{font-size:0.88rem;font-weight:700;color:var(--text)}
.team-card .tc-role{font-size:0.72rem;color:var(--text-dim);margin-top:2px}
.team-card .tc-task{font-size:0.7rem;color:var(--text-muted);margin-top:10px;padding:8px;background:rgba(255,255,255,0.03);border-radius:8px}
.team-card .tc-capacity{margin-top:12px}
.team-card .tc-cap-label{display:flex;justify-content:space-between;font-size:0.65rem;color:var(--text-dim);margin-bottom:4px}
.team-card .tc-cap-track{height:5px;background:rgba(255,255,255,0.06);border-radius:5px;overflow:hidden}
.team-card .tc-cap-fill{height:100%;border-radius:5px;transition:width 1.2s ease}

/* ── GANTT / TIMELINE ── */
.gantt{overflow-x:auto}
.gantt-table{width:100%;min-width:700px;border-collapse:collapse}
.gantt-table th{font-size:0.65rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.8px;padding:8px 12px;border-bottom:1px solid var(--card-border);text-align:center}
.gantt-table th:first-child{text-align:left;width:180px}
.gantt-table td{padding:10px 12px;border-bottom:1px solid rgba(255,255,255,0.03);position:relative;height:42px}
.gantt-table td:first-child{font-size:0.78rem;font-weight:600;color:var(--text)}
.gantt-bar{position:absolute;top:50%;transform:translateY(-50%);height:22px;border-radius:6px;opacity:0.8;transition:opacity .2s}
.gantt-bar:hover{opacity:1}
.gantt-month{background:rgba(255,255,255,0.02)}

/* ── ALERT ROWS ── */
.alert-row{display:flex;align-items:center;gap:12px;padding:12px;border-bottom:1px solid rgba(255,255,255,0.04);font-size:0.8rem}
.alert-row:last-child{border-bottom:none}
.alert-row .alert-icon{font-size:1.1rem}
.alert-row .alert-text{flex:1;color:var(--text-dim)}
.alert-row .alert-badge{flex-shrink:0}

/* ── SETTINGS ── */
.settings-group{margin-bottom:20px}
.setting-row{display:flex;align-items:center;justify-content:space-between;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.04)}
.setting-row:last-child{border-bottom:none}
.setting-label{font-size:0.82rem;color:var(--text-dim);font-weight:500}
.setting-input{background:rgba(255,255,255,0.06);border:1px solid var(--card-border);color:var(--text);padding:8px 14px;border-radius:10px;font-size:0.8rem;font-family:'Work Sans',sans-serif;width:240px}
.setting-input:focus{outline:none;border-color:var(--primary)}
.toggle{width:44px;height:24px;background:rgba(255,255,255,0.1);border-radius:24px;position:relative;cursor:pointer;transition:background .3s;border:none}
.toggle.on{background:var(--primary)}
.toggle::after{content:'';position:absolute;top:3px;left:3px;width:18px;height:18px;border-radius:50%;background:#fff;transition:transform .3s}
.toggle.on::after{transform:translateX(20px)}

/* ── NOTIFICATION ── */
.notif-container{position:fixed;top:70px;right:20px;z-index:200;display:flex;flex-direction:column;gap:8px}
.notif{background:var(--card-bg);border:1px solid var(--card-border);border-radius:12px;padding:12px 18px;display:flex;align-items:center;gap:10px;font-size:0.8rem;animation:slideIn .3s ease;box-shadow:0 8px 30px rgba(0,0,0,0.4);min-width:280px}
.notif .notif-icon{font-size:1.1rem}
.notif .notif-text{flex:1}
.notif .notif-title{font-weight:700;font-size:0.78rem}
.notif .notif-msg{color:var(--text-dim);font-size:0.7rem;margin-top:2px}
@keyframes slideIn{from{opacity:0;transform:translateX(30px)}to{opacity:1;transform:translateX(0)}}

/* ── FOOTER ── */
.footer{text-align:center;padding:28px;color:var(--text-muted);font-size:0.72rem;border-top:1px solid var(--card-border);margin-top:40px}

/* ── RESPONSIVE ── */
@media(max-width:1200px){
  .project-grid{grid-template-columns:repeat(2,1fr)}
  .team-grid{grid-template-columns:repeat(2,1fr)}
  .kanban{grid-template-columns:repeat(2,1fr)}
}
@media(max-width:1024px){
  .kpi-grid{grid-template-columns:repeat(2,1fr)}
  .grid-2{grid-template-columns:1fr}
}
@media(max-width:768px){
  .sidebar{display:none}
  .navbar{left:0}
  .main{margin-left:0;width:100%;padding:16px;padding-bottom:70px}
  .bottom-nav{display:flex}
  .kpi-grid{grid-template-columns:1fr 1fr}
  .project-grid{grid-template-columns:1fr}
  .team-grid{grid-template-columns:1fr 1fr}
  .kanban{grid-template-columns:1fr}
  .setting-input{width:160px}
}
@media(max-width:480px){
  .kpi-grid{grid-template-columns:1fr}
  .team-grid{grid-template-columns:1fr}
}
.bottom-nav{
  display:none;position:fixed;bottom:0;left:0;right:0;height:60px;
  background:var(--sidebar-bg);border-top:1px solid var(--card-border);
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
</style>
</head>
<body>

<!-- SIDEBAR -->
<div class="app-layout">
<aside class="sidebar" id="sidebar">
  <div class="sidebar-brand">${biz}</div>
  <nav class="sidebar-nav">
    <a class="sidebar-link active" data-section="dashboard" onclick="showSection('dashboard')">
      <span class="icon">◉</span> Dashboard
    </a>
    <a class="sidebar-link" data-section="projects" onclick="showSection('projects')">
      <span class="icon">▤</span> Proyectos
    </a>
    <a class="sidebar-link" data-section="tasks" onclick="showSection('tasks')">
      <span class="icon">☰</span> Tareas
    </a>
    <a class="sidebar-link" data-section="team" onclick="showSection('team')">
      <span class="icon">◎</span> Equipo
    </a>
    <a class="sidebar-link" data-section="timeline" onclick="showSection('timeline')">
      <span class="icon">⊞</span> Timeline
    </a>
    <a class="sidebar-link" data-section="analytics" onclick="showSection('analytics')">
      <span class="icon">◈</span> Analytics
    </a>
    <a class="sidebar-link" data-section="settings" onclick="showSection('settings')">
      <span class="icon">⚙</span> Config
    </a>
  </nav>
  <div class="sidebar-footer">Powered by <strong style="color:var(--primary)">Kerno Studio</strong></div>
</aside>

<!-- NAVBAR -->
<header class="navbar">
  <div style="display:flex;align-items:center;gap:14px">
    <button class="menu-toggle" onclick="document.getElementById('sidebar').classList.toggle('open')">☰</button>
    <span class="navbar-title" id="navTitle">Dashboard</span>
  </div>
  <div class="navbar-right">
    <span class="navbar-badge">Sprint 14</span>
    <div class="navbar-avatar">${biz.charAt(0).toUpperCase()}</div>
  </div>
</header>

<!-- NOTIFICATION CONTAINER -->
<div class="notif-container" id="notifContainer"></div>

<!-- MAIN CONTENT -->
<main class="main">

  <!-- ═══ DASHBOARD ═══ -->
  <div class="page-section active" id="sec-dashboard">
    <div class="section-header">
      <div class="label">PROYECTOS</div>
      <h2>Panel de Control</h2>
      <p>Vista general de proyectos, tareas activas y rendimiento del equipo.</p>
    </div>

    <div class="kpi-grid">
      <div class="kpi">
        <div class="kpi-icon">📁</div>
        <div class="kpi-value counter" data-target="8">0</div>
        <div class="kpi-label">Proyectos Activos</div>
        <div class="kpi-trend up">+2 este mes</div>
      </div>
      <div class="kpi">
        <div class="kpi-icon">📋</div>
        <div class="kpi-value counter" data-target="156">0</div>
        <div class="kpi-label">Tareas Totales</div>
        <div class="kpi-trend up">23 nuevas</div>
      </div>
      <div class="kpi">
        <div class="kpi-icon">✅</div>
        <div class="kpi-value"><span class="counter" data-target="67">0</span>%</div>
        <div class="kpi-label">Completadas</div>
        <div class="kpi-trend up">+12% vs sprint anterior</div>
      </div>
      <div class="kpi">
        <div class="kpi-icon">👥</div>
        <div class="kpi-value counter" data-target="14">0</div>
        <div class="kpi-label">Miembros Equipo</div>
      </div>
    </div>

    <div class="grid-2">
      <div class="card">
        <div class="card-header">
          <h3>Progreso del Sprint 14</h3>
          <span class="badge badge-primary">2 semanas</span>
        </div>
        <div class="progress-row"><div class="progress-label"><span>Sprint Progress</span><span>67%</span></div><div class="progress-track"><div class="progress-fill" style="width:0%;background:var(--primary)" data-width="67%"></div></div></div>
        <div style="margin-top:16px">
          <div class="hbar"><div class="hbar-label"><span>Completadas</span><span>42</span></div><div class="hbar-track"><div class="hbar-fill" style="width:0%;background:var(--success)" data-width="67%"></div></div></div>
          <div class="hbar"><div class="hbar-label"><span>En Progreso</span><span>18</span></div><div class="hbar-track"><div class="hbar-fill" style="width:0%" data-width="29%"></div></div></div>
          <div class="hbar"><div class="hbar-label"><span>Por Hacer</span><span>12</span></div><div class="hbar-track"><div class="hbar-fill" style="width:0%;background:var(--text-muted)" data-width="19%"></div></div></div>
          <div class="hbar"><div class="hbar-label"><span>En Revisión</span><span>8</span></div><div class="hbar-track"><div class="hbar-fill" style="width:0%;background:var(--warning)" data-width="13%"></div></div></div>
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <h3>Tareas Vencidas</h3>
          <span class="badge badge-red">5 vencidas</span>
        </div>
        <div class="alert-row"><span class="alert-icon">🔴</span><span class="alert-text">Integración API pagos — <strong>vence hoy</strong></span><span class="alert-badge"><span class="badge badge-red">Alta</span></span></div>
        <div class="alert-row"><span class="alert-icon">🔴</span><span class="alert-text">Testing E2E módulo checkout — <strong>1 día</strong></span><span class="alert-badge"><span class="badge badge-red">Alta</span></span></div>
        <div class="alert-row"><span class="alert-icon">🟡</span><span class="alert-text">Diseño onboarding flow — <strong>2 días</strong></span><span class="alert-badge"><span class="badge badge-yellow">Media</span></span></div>
        <div class="alert-row"><span class="alert-icon">🟡</span><span class="alert-text">Documentación API v2 — <strong>3 días</strong></span><span class="alert-badge"><span class="badge badge-yellow">Media</span></span></div>
        <div class="alert-row"><span class="alert-icon">🟢</span><span class="alert-text">Actualizar dependencias — <strong>5 días</strong></span><span class="alert-badge"><span class="badge badge-green">Baja</span></span></div>
      </div>
    </div>
  </div>

  <!-- ═══ PROYECTOS ═══ -->
  <div class="page-section" id="sec-projects">
    <div class="section-header">
      <div class="label">PROYECTOS</div>
      <h2>Proyectos Activos</h2>
      <p>Gestiona todos los proyectos con seguimiento de progreso, equipo y deadlines.</p>
    </div>

    <div class="project-grid">
      <div class="project-card">
        <div class="pc-header"><span class="pc-title">App Móvil v2</span><span class="badge badge-green">Activo</span></div>
        <div class="pc-desc">Rediseño completo de la app móvil con nuevo sistema de navegación y funcionalidades premium.</div>
        <div class="pc-progress"><div class="pc-progress-label"><span>Progreso</span><span>78%</span></div><div class="pc-progress-track"><div class="pc-progress-fill" style="width:0%" data-width="78%"></div></div></div>
        <div class="pc-footer"><div class="pc-team"><div class="pc-avatar">AG</div><div class="pc-avatar">MT</div><div class="pc-avatar">SD</div></div><span class="pc-deadline">15 May 2026</span></div>
      </div>
      <div class="project-card">
        <div class="pc-header"><span class="pc-title">Portal Clientes</span><span class="badge badge-green">Activo</span></div>
        <div class="pc-desc">Nuevo portal self-service para clientes con dashboard personalizado y gestión de suscripciones.</div>
        <div class="pc-progress"><div class="pc-progress-label"><span>Progreso</span><span>45%</span></div><div class="pc-progress-track"><div class="pc-progress-fill" style="width:0%" data-width="45%"></div></div></div>
        <div class="pc-footer"><div class="pc-team"><div class="pc-avatar">CM</div><div class="pc-avatar">LF</div></div><span class="pc-deadline">30 Jun 2026</span></div>
      </div>
      <div class="project-card">
        <div class="pc-header"><span class="pc-title">API v3</span><span class="badge badge-green">Activo</span></div>
        <div class="pc-desc">Migración a nueva versión de API con GraphQL, rate limiting mejorado y documentación automática.</div>
        <div class="pc-progress"><div class="pc-progress-label"><span>Progreso</span><span>62%</span></div><div class="pc-progress-track"><div class="pc-progress-fill" style="width:0%" data-width="62%"></div></div></div>
        <div class="pc-footer"><div class="pc-team"><div class="pc-avatar">MT</div><div class="pc-avatar">JS</div><div class="pc-avatar">ER</div><div class="pc-avatar">DL</div></div><span class="pc-deadline">20 May 2026</span></div>
      </div>
      <div class="project-card">
        <div class="pc-header"><span class="pc-title">Dashboard Analytics</span><span class="badge badge-yellow">On Hold</span></div>
        <div class="pc-desc">Panel de analytics avanzado con visualizaciones interactivas, exportación y alertas inteligentes.</div>
        <div class="pc-progress"><div class="pc-progress-label"><span>Progreso</span><span>25%</span></div><div class="pc-progress-track"><div class="pc-progress-fill" style="width:0%;background:var(--warning)" data-width="25%"></div></div></div>
        <div class="pc-footer"><div class="pc-team"><div class="pc-avatar">SD</div><div class="pc-avatar">AG</div></div><span class="pc-deadline">15 Jul 2026</span></div>
      </div>
      <div class="project-card">
        <div class="pc-header"><span class="pc-title">Migración Cloud</span><span class="badge badge-green">Activo</span></div>
        <div class="pc-desc">Migración de infraestructura on-premise a AWS con containers y CI/CD automatizado.</div>
        <div class="pc-progress"><div class="pc-progress-label"><span>Progreso</span><span>88%</span></div><div class="pc-progress-track"><div class="pc-progress-fill" style="width:0%;background:var(--success)" data-width="88%"></div></div></div>
        <div class="pc-footer"><div class="pc-team"><div class="pc-avatar">MT</div><div class="pc-avatar">DL</div></div><span class="pc-deadline">30 Abr 2026</span></div>
      </div>
      <div class="project-card">
        <div class="pc-header"><span class="pc-title">Sistema de Pagos</span><span class="badge badge-blue">Completed</span></div>
        <div class="pc-desc">Integración de pasarela de pagos con Stripe, facturación automática y sistema de suscripciones.</div>
        <div class="pc-progress"><div class="pc-progress-label"><span>Progreso</span><span>100%</span></div><div class="pc-progress-track"><div class="pc-progress-fill" style="width:0%;background:var(--success)" data-width="100%"></div></div></div>
        <div class="pc-footer"><div class="pc-team"><div class="pc-avatar">JS</div><div class="pc-avatar">ER</div><div class="pc-avatar">CM</div></div><span class="pc-deadline">Completado</span></div>
      </div>
    </div>
  </div>

  <!-- ═══ TAREAS (KANBAN) ═══ -->
  <div class="page-section" id="sec-tasks">
    <div class="section-header">
      <div class="label">TAREAS</div>
      <h2>Tablero Kanban</h2>
      <p>Gestiona tareas del sprint actual con vista kanban interactiva.</p>
    </div>

    <div class="kanban">
      <!-- POR HACER -->
      <div class="kanban-col">
        <div class="kanban-col-header"><span class="kanban-col-title">Por Hacer</span><span class="kanban-col-count">5</span></div>
        <div class="kanban-card priority-high">
          <div class="kc-title">Implementar autenticación OAuth</div>
          <div class="kc-meta"><div class="kc-assignee"><div class="kc-avatar">MT</div>Miguel T.</div><span class="badge badge-red">Alta</span></div>
          <div class="kc-due" style="margin-top:6px">Vence: 14 Abr</div>
        </div>
        <div class="kanban-card priority-medium">
          <div class="kc-title">Diseñar pantalla de onboarding</div>
          <div class="kc-meta"><div class="kc-assignee"><div class="kc-avatar">SD</div>Sara D.</div><span class="badge badge-yellow">Media</span></div>
          <div class="kc-due" style="margin-top:6px">Vence: 16 Abr</div>
        </div>
        <div class="kanban-card priority-low">
          <div class="kc-title">Actualizar documentación API</div>
          <div class="kc-meta"><div class="kc-assignee"><div class="kc-avatar">DL</div>David L.</div><span class="badge badge-green">Baja</span></div>
          <div class="kc-due" style="margin-top:6px">Vence: 20 Abr</div>
        </div>
        <div class="kanban-card priority-medium">
          <div class="kc-title">Tests unitarios módulo users</div>
          <div class="kc-meta"><div class="kc-assignee"><div class="kc-avatar">AG</div>Ana G.</div><span class="badge badge-yellow">Media</span></div>
          <div class="kc-due" style="margin-top:6px">Vence: 18 Abr</div>
        </div>
        <div class="kanban-card priority-low">
          <div class="kc-title">Optimizar queries dashboard</div>
          <div class="kc-meta"><div class="kc-assignee"><div class="kc-avatar">ER</div>Elena R.</div><span class="badge badge-green">Baja</span></div>
          <div class="kc-due" style="margin-top:6px">Vence: 22 Abr</div>
        </div>
      </div>
      <!-- EN PROGRESO -->
      <div class="kanban-col">
        <div class="kanban-col-header"><span class="kanban-col-title">En Progreso</span><span class="kanban-col-count">4</span></div>
        <div class="kanban-card priority-high">
          <div class="kc-title">Integración API de pagos</div>
          <div class="kc-meta"><div class="kc-assignee"><div class="kc-avatar">JS</div>Javier S.</div><span class="badge badge-red">Alta</span></div>
          <div class="kc-due" style="margin-top:6px;color:var(--danger)">Vence: Hoy</div>
        </div>
        <div class="kanban-card priority-high">
          <div class="kc-title">Migración base de datos</div>
          <div class="kc-meta"><div class="kc-assignee"><div class="kc-avatar">MT</div>Miguel T.</div><span class="badge badge-red">Alta</span></div>
          <div class="kc-due" style="margin-top:6px">Vence: 12 Abr</div>
        </div>
        <div class="kanban-card priority-medium">
          <div class="kc-title">Rediseño página de perfil</div>
          <div class="kc-meta"><div class="kc-assignee"><div class="kc-avatar">LF</div>Laura F.</div><span class="badge badge-yellow">Media</span></div>
          <div class="kc-due" style="margin-top:6px">Vence: 15 Abr</div>
        </div>
        <div class="kanban-card priority-low">
          <div class="kc-title">Configurar CI/CD pipeline</div>
          <div class="kc-meta"><div class="kc-assignee"><div class="kc-avatar">DL</div>David L.</div><span class="badge badge-green">Baja</span></div>
          <div class="kc-due" style="margin-top:6px">Vence: 18 Abr</div>
        </div>
      </div>
      <!-- REVISION -->
      <div class="kanban-col">
        <div class="kanban-col-header"><span class="kanban-col-title">Revisión</span><span class="kanban-col-count">3</span></div>
        <div class="kanban-card priority-high">
          <div class="kc-title">Sistema de notificaciones push</div>
          <div class="kc-meta"><div class="kc-assignee"><div class="kc-avatar">AG</div>Ana G.</div><span class="badge badge-red">Alta</span></div>
          <div class="kc-due" style="margin-top:6px">Vence: 11 Abr</div>
        </div>
        <div class="kanban-card priority-medium">
          <div class="kc-title">Refactoring módulo auth</div>
          <div class="kc-meta"><div class="kc-assignee"><div class="kc-avatar">CM</div>Carlos M.</div><span class="badge badge-yellow">Media</span></div>
          <div class="kc-due" style="margin-top:6px">Vence: 13 Abr</div>
        </div>
        <div class="kanban-card priority-low">
          <div class="kc-title">Mejorar accesibilidad formularios</div>
          <div class="kc-meta"><div class="kc-assignee"><div class="kc-avatar">SD</div>Sara D.</div><span class="badge badge-green">Baja</span></div>
          <div class="kc-due" style="margin-top:6px">Vence: 16 Abr</div>
        </div>
      </div>
      <!-- HECHO -->
      <div class="kanban-col">
        <div class="kanban-col-header"><span class="kanban-col-title">Hecho</span><span class="kanban-col-count">6</span></div>
        <div class="kanban-card" style="opacity:0.7;border-left:3px solid var(--success)">
          <div class="kc-title">Setup proyecto monorepo</div>
          <div class="kc-meta"><div class="kc-assignee"><div class="kc-avatar">MT</div>Miguel T.</div><span class="badge badge-green">Done</span></div>
        </div>
        <div class="kanban-card" style="opacity:0.7;border-left:3px solid var(--success)">
          <div class="kc-title">Diseño sistema de componentes</div>
          <div class="kc-meta"><div class="kc-assignee"><div class="kc-avatar">SD</div>Sara D.</div><span class="badge badge-green">Done</span></div>
        </div>
        <div class="kanban-card" style="opacity:0.7;border-left:3px solid var(--success)">
          <div class="kc-title">Integración con Stripe</div>
          <div class="kc-meta"><div class="kc-assignee"><div class="kc-avatar">JS</div>Javier S.</div><span class="badge badge-green">Done</span></div>
        </div>
        <div class="kanban-card" style="opacity:0.7;border-left:3px solid var(--success)">
          <div class="kc-title">Landing page v2</div>
          <div class="kc-meta"><div class="kc-assignee"><div class="kc-avatar">LF</div>Laura F.</div><span class="badge badge-green">Done</span></div>
        </div>
        <div class="kanban-card" style="opacity:0.7;border-left:3px solid var(--success)">
          <div class="kc-title">Configurar monitoring</div>
          <div class="kc-meta"><div class="kc-assignee"><div class="kc-avatar">DL</div>David L.</div><span class="badge badge-green">Done</span></div>
        </div>
        <div class="kanban-card" style="opacity:0.7;border-left:3px solid var(--success)">
          <div class="kc-title">Email templates transaccionales</div>
          <div class="kc-meta"><div class="kc-assignee"><div class="kc-avatar">ER</div>Elena R.</div><span class="badge badge-green">Done</span></div>
        </div>
      </div>
    </div>
  </div>

  <!-- ═══ EQUIPO ═══ -->
  <div class="page-section" id="sec-team">
    <div class="section-header">
      <div class="label">EQUIPO</div>
      <h2>Miembros del Equipo</h2>
      <p>Visualiza la capacidad, asignaciones y rendimiento de cada miembro.</p>
    </div>

    <div class="team-grid">
      <div class="team-card">
        <div class="tc-avatar">MT</div>
        <div class="tc-name">Miguel Torres</div>
        <div class="tc-role">Tech Lead</div>
        <div class="tc-task">Migración base de datos</div>
        <div class="tc-capacity"><div class="tc-cap-label"><span>Capacidad</span><span>92%</span></div><div class="tc-cap-track"><div class="tc-cap-fill" style="width:0%;background:var(--danger)" data-width="92%"></div></div></div>
      </div>
      <div class="team-card">
        <div class="tc-avatar">AG</div>
        <div class="tc-name">Ana García</div>
        <div class="tc-role">Senior Developer</div>
        <div class="tc-task">Sistema notificaciones push</div>
        <div class="tc-capacity"><div class="tc-cap-label"><span>Capacidad</span><span>78%</span></div><div class="tc-cap-track"><div class="tc-cap-fill" style="width:0%;background:var(--primary)" data-width="78%"></div></div></div>
      </div>
      <div class="team-card">
        <div class="tc-avatar">JS</div>
        <div class="tc-name">Javier Sánchez</div>
        <div class="tc-role">Backend Developer</div>
        <div class="tc-task">Integración API pagos</div>
        <div class="tc-capacity"><div class="tc-cap-label"><span>Capacidad</span><span>95%</span></div><div class="tc-cap-track"><div class="tc-cap-fill" style="width:0%;background:var(--danger)" data-width="95%"></div></div></div>
      </div>
      <div class="team-card">
        <div class="tc-avatar">SD</div>
        <div class="tc-name">Sara Díaz</div>
        <div class="tc-role">Frontend Developer</div>
        <div class="tc-task">Diseño onboarding flow</div>
        <div class="tc-capacity"><div class="tc-cap-label"><span>Capacidad</span><span>65%</span></div><div class="tc-cap-track"><div class="tc-cap-fill" style="width:0%;background:var(--success)" data-width="65%"></div></div></div>
      </div>
      <div class="team-card">
        <div class="tc-avatar">CM</div>
        <div class="tc-name">Carlos Martínez</div>
        <div class="tc-role">Product Manager</div>
        <div class="tc-task">Refactoring módulo auth</div>
        <div class="tc-capacity"><div class="tc-cap-label"><span>Capacidad</span><span>72%</span></div><div class="tc-cap-track"><div class="tc-cap-fill" style="width:0%;background:var(--primary)" data-width="72%"></div></div></div>
      </div>
      <div class="team-card">
        <div class="tc-avatar">LF</div>
        <div class="tc-name">Laura Fernández</div>
        <div class="tc-role">UX Designer</div>
        <div class="tc-task">Rediseño página perfil</div>
        <div class="tc-capacity"><div class="tc-cap-label"><span>Capacidad</span><span>58%</span></div><div class="tc-cap-track"><div class="tc-cap-fill" style="width:0%;background:var(--success)" data-width="58%"></div></div></div>
      </div>
      <div class="team-card">
        <div class="tc-avatar">DL</div>
        <div class="tc-name">David López</div>
        <div class="tc-role">DevOps Engineer</div>
        <div class="tc-task">Configurar CI/CD pipeline</div>
        <div class="tc-capacity"><div class="tc-cap-label"><span>Capacidad</span><span>81%</span></div><div class="tc-cap-track"><div class="tc-cap-fill" style="width:0%;background:var(--warning)" data-width="81%"></div></div></div>
      </div>
      <div class="team-card">
        <div class="tc-avatar">ER</div>
        <div class="tc-name">Elena Rodríguez</div>
        <div class="tc-role">QA Engineer</div>
        <div class="tc-task">Optimizar queries dashboard</div>
        <div class="tc-capacity"><div class="tc-cap-label"><span>Capacidad</span><span>45%</span></div><div class="tc-cap-track"><div class="tc-cap-fill" style="width:0%;background:var(--success)" data-width="45%"></div></div></div>
      </div>
    </div>
  </div>

  <!-- ═══ TIMELINE (GANTT) ═══ -->
  <div class="page-section" id="sec-timeline">
    <div class="section-header">
      <div class="label">TIMELINE</div>
      <h2>Cronograma de Proyectos</h2>
      <p>Vista temporal de todos los proyectos con duraciones y solapamientos.</p>
    </div>

    <div class="card">
      <div class="card-header"><h3>Gantt — 2026</h3><span class="badge badge-primary">8 proyectos</span></div>
      <div class="gantt">
        <table class="gantt-table">
          <thead>
            <tr>
              <th>Proyecto</th>
              <th class="gantt-month">Ene</th>
              <th class="gantt-month">Feb</th>
              <th class="gantt-month">Mar</th>
              <th class="gantt-month">Abr</th>
              <th class="gantt-month">May</th>
              <th class="gantt-month">Jun</th>
              <th class="gantt-month">Jul</th>
              <th class="gantt-month">Ago</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>App Móvil v2</td>
              <td class="gantt-month"></td>
              <td class="gantt-month" style="position:relative"><div class="gantt-bar" style="background:var(--primary);left:0;right:-100%;width:calc(300% + 24px)"></div></td>
              <td class="gantt-month"></td>
              <td class="gantt-month"></td>
              <td class="gantt-month"></td>
              <td class="gantt-month"></td>
              <td class="gantt-month"></td>
              <td class="gantt-month"></td>
            </tr>
            <tr>
              <td>Portal Clientes</td>
              <td class="gantt-month"></td>
              <td class="gantt-month"></td>
              <td class="gantt-month" style="position:relative"><div class="gantt-bar" style="background:var(--accent);left:0;width:calc(400% + 36px)"></div></td>
              <td class="gantt-month"></td>
              <td class="gantt-month"></td>
              <td class="gantt-month"></td>
              <td class="gantt-month"></td>
              <td class="gantt-month"></td>
            </tr>
            <tr>
              <td>API v3</td>
              <td class="gantt-month"></td>
              <td class="gantt-month"></td>
              <td class="gantt-month" style="position:relative"><div class="gantt-bar" style="background:var(--info);left:50%;width:calc(200% + 12px)"></div></td>
              <td class="gantt-month"></td>
              <td class="gantt-month"></td>
              <td class="gantt-month"></td>
              <td class="gantt-month"></td>
              <td class="gantt-month"></td>
            </tr>
            <tr>
              <td>Dashboard Analytics</td>
              <td class="gantt-month"></td>
              <td class="gantt-month"></td>
              <td class="gantt-month"></td>
              <td class="gantt-month"></td>
              <td class="gantt-month" style="position:relative"><div class="gantt-bar" style="background:var(--warning);left:0;width:calc(300% + 24px)"></div></td>
              <td class="gantt-month"></td>
              <td class="gantt-month"></td>
              <td class="gantt-month"></td>
            </tr>
            <tr>
              <td>Migración Cloud</td>
              <td class="gantt-month" style="position:relative"><div class="gantt-bar" style="background:var(--success);left:0;width:calc(400% + 36px)"></div></td>
              <td class="gantt-month"></td>
              <td class="gantt-month"></td>
              <td class="gantt-month"></td>
              <td class="gantt-month"></td>
              <td class="gantt-month"></td>
              <td class="gantt-month"></td>
              <td class="gantt-month"></td>
            </tr>
            <tr>
              <td>Sistema de Pagos</td>
              <td class="gantt-month" style="position:relative"><div class="gantt-bar" style="background:var(--purple);left:0;width:calc(200% + 12px);opacity:0.5"></div></td>
              <td class="gantt-month"></td>
              <td class="gantt-month"></td>
              <td class="gantt-month"></td>
              <td class="gantt-month"></td>
              <td class="gantt-month"></td>
              <td class="gantt-month"></td>
              <td class="gantt-month"></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style="display:flex;gap:16px;flex-wrap:wrap;margin-top:16px;font-size:0.65rem;color:var(--text-dim)">
        <span><span style="display:inline-block;width:12px;height:4px;border-radius:2px;background:var(--primary);margin-right:4px"></span>App Móvil</span>
        <span><span style="display:inline-block;width:12px;height:4px;border-radius:2px;background:var(--accent);margin-right:4px"></span>Portal</span>
        <span><span style="display:inline-block;width:12px;height:4px;border-radius:2px;background:var(--info);margin-right:4px"></span>API v3</span>
        <span><span style="display:inline-block;width:12px;height:4px;border-radius:2px;background:var(--warning);margin-right:4px"></span>Analytics</span>
        <span><span style="display:inline-block;width:12px;height:4px;border-radius:2px;background:var(--success);margin-right:4px"></span>Cloud</span>
        <span><span style="display:inline-block;width:12px;height:4px;border-radius:2px;background:var(--purple);opacity:0.5;margin-right:4px"></span>Pagos (done)</span>
      </div>
    </div>
  </div>

  <!-- ═══ ANALYTICS ═══ -->
  <div class="page-section" id="sec-analytics">
    <div class="section-header">
      <div class="label">ANALYTICS</div>
      <h2>Productividad y Métricas</h2>
      <p>Análisis detallado del rendimiento del equipo y estado de proyectos.</p>
    </div>

    <div class="card" style="text-align:center;padding:32px;margin-bottom:20px;background:linear-gradient(135deg,rgba(99,102,241,0.08),rgba(139,92,246,0.08))">
      <div style="font-size:3rem;font-weight:800;color:var(--primary);letter-spacing:-2px"><span class="counter" data-target="67">0</span>%</div>
      <div style="font-size:0.85rem;color:var(--text-dim);margin-top:4px">Sprint Completion Rate</div>
      <div style="display:flex;gap:32px;justify-content:center;margin-top:20px">
        <div><div style="font-size:1.3rem;font-weight:800;color:var(--text)">42</div><div style="font-size:0.7rem;color:var(--text-dim)">Tareas Completadas</div></div>
        <div><div style="font-size:1.3rem;font-weight:800;color:var(--text)">2.4 días</div><div style="font-size:0.7rem;color:var(--text-dim)">Cycle Time Medio</div></div>
        <div><div style="font-size:1.3rem;font-weight:800;color:var(--text)">94%</div><div style="font-size:0.7rem;color:var(--text-dim)">On-Time Delivery</div></div>
      </div>
    </div>

    <div class="grid-2">
      <div class="card">
        <div class="card-header"><h3>Velocidad por Sprint</h3><span class="badge badge-primary">Story Points</span></div>
        <div class="hbar"><div class="hbar-label"><span>Sprint 11</span><span>34 pts</span></div><div class="hbar-track"><div class="hbar-fill" style="width:0%" data-width="68%"></div></div></div>
        <div class="hbar"><div class="hbar-label"><span>Sprint 12</span><span>41 pts</span></div><div class="hbar-track"><div class="hbar-fill" style="width:0%" data-width="82%"></div></div></div>
        <div class="hbar"><div class="hbar-label"><span>Sprint 13</span><span>38 pts</span></div><div class="hbar-track"><div class="hbar-fill" style="width:0%;background:var(--accent)" data-width="76%"></div></div></div>
        <div class="hbar"><div class="hbar-label"><span>Sprint 14 (actual)</span><span>45 pts</span></div><div class="hbar-track"><div class="hbar-fill" style="width:0%;background:var(--success)" data-width="90%"></div></div></div>
      </div>
      <div class="card">
        <div class="card-header"><h3>Distribución por Prioridad</h3></div>
        <div class="progress-row"><div class="progress-label"><span>Alta</span><span>28 tareas</span></div><div class="progress-track"><div class="progress-fill" style="width:0%;background:var(--danger)" data-width="35%"></div></div></div>
        <div class="progress-row"><div class="progress-label"><span>Media</span><span>52 tareas</span></div><div class="progress-track"><div class="progress-fill" style="width:0%;background:var(--warning)" data-width="65%"></div></div></div>
        <div class="progress-row"><div class="progress-label"><span>Baja</span><span>24 tareas</span></div><div class="progress-track"><div class="progress-fill" style="width:0%;background:var(--success)" data-width="30%"></div></div></div>
      </div>
    </div>

    <div class="grid-2" style="margin-top:16px">
      <div class="card">
        <div class="card-header"><h3>Rendimiento por Miembro</h3></div>
        <div class="hbar"><div class="hbar-label"><span>Miguel Torres</span><span>18 tareas</span></div><div class="hbar-track"><div class="hbar-fill" style="width:0%" data-width="100%"></div></div></div>
        <div class="hbar"><div class="hbar-label"><span>Ana García</span><span>15 tareas</span></div><div class="hbar-track"><div class="hbar-fill" style="width:0%;background:var(--accent)" data-width="83%"></div></div></div>
        <div class="hbar"><div class="hbar-label"><span>Javier Sánchez</span><span>14 tareas</span></div><div class="hbar-track"><div class="hbar-fill" style="width:0%" data-width="78%"></div></div></div>
        <div class="hbar"><div class="hbar-label"><span>Sara Díaz</span><span>12 tareas</span></div><div class="hbar-track"><div class="hbar-fill" style="width:0%;background:var(--accent)" data-width="67%"></div></div></div>
        <div class="hbar"><div class="hbar-label"><span>David López</span><span>11 tareas</span></div><div class="hbar-track"><div class="hbar-fill" style="width:0%" data-width="61%"></div></div></div>
        <div class="hbar"><div class="hbar-label"><span>Elena Rodríguez</span><span>10 tareas</span></div><div class="hbar-track"><div class="hbar-fill" style="width:0%;background:var(--accent)" data-width="56%"></div></div></div>
      </div>
      <div class="card">
        <div class="card-header"><h3>Estado de Proyectos</h3></div>
        <div class="progress-row"><div class="progress-label"><span>Migración Cloud</span><span>88%</span></div><div class="progress-track"><div class="progress-fill" style="width:0%;background:var(--success)" data-width="88%"></div></div></div>
        <div class="progress-row"><div class="progress-label"><span>App Móvil v2</span><span>78%</span></div><div class="progress-track"><div class="progress-fill" style="width:0%;background:var(--primary)" data-width="78%"></div></div></div>
        <div class="progress-row"><div class="progress-label"><span>API v3</span><span>62%</span></div><div class="progress-track"><div class="progress-fill" style="width:0%;background:var(--info)" data-width="62%"></div></div></div>
        <div class="progress-row"><div class="progress-label"><span>Portal Clientes</span><span>45%</span></div><div class="progress-track"><div class="progress-fill" style="width:0%;background:var(--accent)" data-width="45%"></div></div></div>
        <div class="progress-row"><div class="progress-label"><span>Dashboard Analytics</span><span>25%</span></div><div class="progress-track"><div class="progress-fill" style="width:0%;background:var(--warning)" data-width="25%"></div></div></div>
      </div>
    </div>
  </div>

  <!-- ═══ CONFIG ═══ -->
  <div class="page-section" id="sec-settings">
    <div class="section-header">
      <div class="label">CONFIGURACION</div>
      <h2>Ajustes del Proyecto</h2>
      <p>Configura el entorno de trabajo, notificaciones y preferencias del equipo.</p>
    </div>

    <div class="card">
      <div class="card-header"><h3>General</h3></div>
      <div class="settings-group">
        <div class="setting-row"><span class="setting-label">Nombre del Workspace</span><input class="setting-input" type="text" value="${biz}"></div>
        <div class="setting-row"><span class="setting-label">Metodología</span><select class="setting-input"><option>Scrum</option><option>Kanban</option><option>Híbrido</option></select></div>
        <div class="setting-row"><span class="setting-label">Duración del Sprint</span><select class="setting-input"><option>1 semana</option><option selected>2 semanas</option><option>3 semanas</option><option>4 semanas</option></select></div>
        <div class="setting-row"><span class="setting-label">Zona Horaria</span><select class="setting-input"><option>Europe/Madrid (UTC+2)</option><option>America/New_York</option><option>Asia/Tokyo</option></select></div>
      </div>
    </div>
    <div class="card">
      <div class="card-header"><h3>Notificaciones y Automatización</h3></div>
      <div class="settings-group">
        <div class="setting-row"><span class="setting-label">Notificaciones de tareas vencidas</span><button class="toggle on" onclick="this.classList.toggle('on')"></button></div>
        <div class="setting-row"><span class="setting-label">Resumen diario por email</span><button class="toggle on" onclick="this.classList.toggle('on')"></button></div>
        <div class="setting-row"><span class="setting-label">Alertas de bloqueos</span><button class="toggle on" onclick="this.classList.toggle('on')"></button></div>
        <div class="setting-row"><span class="setting-label">Auto-asignar reviewer</span><button class="toggle" onclick="this.classList.toggle('on')"></button></div>
        <div class="setting-row"><span class="setting-label">Integración Slack</span><button class="toggle on" onclick="this.classList.toggle('on')"></button></div>
      </div>
    </div>
    <div style="margin-top:20px;text-align:right">
      <button style="background:var(--primary);color:#fff;border:none;padding:10px 28px;border-radius:12px;font-size:0.85rem;font-weight:700;cursor:pointer;font-family:'Work Sans',sans-serif;transition:opacity .2s" onmouseover="this.style.opacity='0.85'" onmouseout="this.style.opacity='1'" onclick="showNotif('saved')">Guardar Cambios</button>
    </div>
  </div>

  <!-- FOOTER -->
  <div class="footer">Powered by <strong style="color:var(--primary)">Kerno Studio</strong></div>
</main>

</div><!-- /main-area -->
</div><!-- /app-layout -->
 Nav (mobile only) -->
<nav class="bottom-nav">
  <button class="active" onclick="showSection('dashboard')"><span class="bnav-icon">◉</span>Inicio</button>
  <button onclick="showSection('projects')"><span class="bnav-icon">◎</span>Proyectos</button>
  <button onclick="showSection('tasks')"><span class="bnav-icon">☰</span>Tareas</button>
  <button onclick="showSection('team')"><span class="bnav-icon">▤</span>Equipo</button>
  <button onclick="showSection('timeline')"><span class="bnav-icon">⊞</span>Timeline</button>
  <button onclick="showSection('analytics')"><span class="bnav-icon">◈</span>Analytics</button>
</nav>

<script>
// ── Section Navigation
function showSection(id) {
  document.querySelectorAll('.page-section').forEach(function(s){s.classList.remove('active')});
  document.querySelectorAll('.bottom-nav button').forEach(b=>b.classList.remove('active'));
  var sec = document.getElementById('sec-'+id);
  if(sec) sec.classList.add('active');
  document.querySelectorAll('.sidebar-link').forEach(function(l){l.classList.remove('active')});
  var link = document.querySelector('.sidebar-link[data-section="'+id+'"]');
  if(link) link.classList.add('active');
  var bnav=document.querySelector('.bottom-nav button[onclick*="'+id+'"]');
  if(bnav) bnav.classList.add('active');
  var titles = {dashboard:'Dashboard',projects:'Proyectos',tasks:'Tareas',team:'Equipo',timeline:'Timeline',analytics:'Analytics',settings:'Configuración'};
  var navT = document.getElementById('navTitle');
  if(navT) navT.textContent = titles[id]||id;
  window.scrollTo(0,0);
  animateCounters();
  animateBars();
}

// ── Counter Animation
function animateCounters(){
  document.querySelectorAll('.page-section.active .counter').forEach(function(el){
    var target = parseFloat(el.getAttribute('data-target'));
    var decimals = parseInt(el.getAttribute('data-decimals'))||0;
    if(isNaN(target)) return;
    var duration = 1200;
    var start = 0;
    var startTime = null;
    function step(ts){
      if(!startTime) startTime=ts;
      var progress = Math.min((ts-startTime)/duration,1);
      var eased = 1-Math.pow(1-progress,3);
      var current = start + (target-start)*eased;
      if(target>=1000){
        el.textContent = Math.round(current).toLocaleString('es-ES');
      } else if(decimals>0){
        el.textContent = current.toFixed(decimals);
      } else {
        el.textContent = Math.round(current);
      }
      if(progress<1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
}

// ── Bar Animation
function animateBars(){
  setTimeout(function(){
    document.querySelectorAll('.page-section.active .hbar-fill, .page-section.active .progress-fill, .page-section.active .pc-progress-fill, .page-section.active .tc-cap-fill').forEach(function(bar){
      var w = bar.getAttribute('data-width');
      if(w) bar.style.width = w;
    });
  },100);
}

// ── Notifications
function showNotif(type){
  var container = document.getElementById('notifContainer');
  var n = document.createElement('div');
  n.className = 'notif';
  if(type==='saved'){
    n.innerHTML='<span class="notif-icon">✅</span><div class="notif-text"><div class="notif-title">Guardado</div><div class="notif-msg">Los cambios se han guardado correctamente.</div></div>';
  }
  container.appendChild(n);
  setTimeout(function(){n.style.opacity='0';n.style.transition='opacity .3s';setTimeout(function(){n.remove()},300)},3500);
}

// ── Init
document.addEventListener('DOMContentLoaded',function(){
  animateCounters();
  animateBars();
});
</script>
</body>
</html>`
  },
}
