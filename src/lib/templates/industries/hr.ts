import type { TemplateDefinition, TemplateCustomization } from '../types'

export const hrTemplate: TemplateDefinition = {
  meta: {
    id: 'hr',
    name: 'Recursos Humanos Premium',
    industries: ['hr', 'rrhh', 'recursos humanos', 'human resources', 'nóminas', 'payroll', 'talento', 'talent', 'empleados'],
    projectTypes: ['landing', 'mvp', 'system', 'saas'],
    sections: ['dashboard', 'directory', 'recruitment', 'payroll', 'timeoff', 'analytics', 'settings'],
    description: 'Plantilla premium para gestión de recursos humanos con sidebar. Dashboard con KPIs de empleados y rotación, directorio de personal, pipeline de reclutamiento, gestión de nóminas, solicitudes de vacaciones, analytics de equipo y configuración.',
  },

  render(c: TemplateCustomization): string {
    const p = c.primaryColor || '#10b981'
    const a = c.accentColor || '#06b6d4'
    const biz = c.businessName || 'HR Portal'

    return `<!DOCTYPE html>
<html lang="${c.locale || 'es'}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${biz} — RRHH Dashboard</title>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --primary:${p};
  --accent:${a};
  --sidebar-bg:#121828;
  --content-bg:#0e1320;
  --card-bg:#161d2f;
  --card-border:#1e2740;
  --text:#e8eaf0;
  --text-dim:#8892a8;
  --text-muted:#5a6480;
  --success:#10b981;
  --warning:#f59e0b;
  --danger:#ef4444;
  --info:#3b82f6;
  --purple:#a78bfa;
  --sidebar-w:250px;
  --navbar-h:56px;
}
html{scroll-behavior:smooth}
body{font-family:'Manrope',sans-serif;background:var(--content-bg);color:var(--text);min-height:100vh;overflow-x:hidden}

/* ── SIDEBAR ── */
.sidebar{position:fixed;top:0;left:0;width:var(--sidebar-w);height:100vh;background:var(--sidebar-bg);border-right:1px solid var(--card-border);z-index:100;display:flex;flex-direction:column;transition:transform .3s}
.sidebar-brand{padding:20px 24px;font-size:1.1rem;font-weight:800;color:var(--primary);border-bottom:1px solid var(--card-border);letter-spacing:-0.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sidebar-nav{flex:1;padding:12px 0;overflow-y:auto}
.sidebar-link{display:flex;align-items:center;gap:12px;padding:11px 24px;color:var(--text-dim);font-size:0.85rem;font-weight:500;cursor:pointer;transition:all .2s;border-left:3px solid transparent;text-decoration:none}
.sidebar-link:hover{color:var(--text);background:rgba(255,255,255,0.04)}
.sidebar-link.active{color:var(--primary);background:rgba(16,185,129,0.08);border-left-color:var(--primary)}
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
.main{margin-left:var(--sidebar-w);margin-top:var(--navbar-h);padding:28px;min-height:calc(100vh - var(--navbar-h))}
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

/* ── TABLES ── */
.data-tbl{width:100%;border-collapse:collapse;font-size:0.8rem}
.data-tbl thead th{text-align:left;padding:10px 14px;font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--text-muted);border-bottom:1px solid var(--card-border)}
.data-tbl tbody td{padding:12px 14px;border-bottom:1px solid rgba(255,255,255,0.04);color:var(--text-dim)}
.data-tbl tbody tr:hover{background:rgba(255,255,255,0.02)}
.data-tbl .emp-cell{display:flex;align-items:center;gap:10px}
.data-tbl .avatar{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,var(--primary),var(--accent));display:flex;align-items:center;justify-content:center;font-size:0.65rem;font-weight:700;color:#fff;flex-shrink:0}
.data-tbl .emp-name{font-weight:600;color:var(--text)}

/* ── BADGES ── */
.badge{display:inline-block;padding:3px 10px;border-radius:20px;font-size:0.65rem;font-weight:700}
.badge-green{background:rgba(16,185,129,0.15);color:#34d399}
.badge-red{background:rgba(239,68,68,0.15);color:#f87171}
.badge-yellow{background:rgba(245,158,11,0.15);color:#fbbf24}
.badge-blue{background:rgba(59,130,246,0.15);color:#60a5fa}
.badge-purple{background:rgba(167,139,250,0.15);color:#a78bfa}
.badge-primary{background:rgba(16,185,129,0.15);color:var(--primary)}
.badge-accent{background:rgba(6,182,212,0.15);color:var(--accent)}

/* ── HORIZONTAL BAR ── */
.hbar{margin-bottom:12px}
.hbar-label{display:flex;justify-content:space-between;font-size:0.75rem;margin-bottom:4px}
.hbar-label span:first-child{color:var(--text-dim)}
.hbar-label span:last-child{color:var(--text);font-weight:600}
.hbar-track{height:8px;background:rgba(255,255,255,0.06);border-radius:8px;overflow:hidden}
.hbar-fill{height:100%;border-radius:8px;transition:width 1s ease;background:var(--primary)}

/* ── PIPELINE ── */
.pipeline{display:flex;gap:12px;margin-bottom:20px}
.pipeline-stage{flex:1;background:var(--card-bg);border:1px solid var(--card-border);border-radius:14px;padding:16px;text-align:center;position:relative}
.pipeline-stage .stage-count{font-size:1.8rem;font-weight:800;color:var(--primary);letter-spacing:-1px}
.pipeline-stage .stage-label{font-size:0.7rem;color:var(--text-dim);margin-top:4px;font-weight:500}
.pipeline-stage .stage-arrow{position:absolute;right:-10px;top:50%;transform:translateY(-50%);color:var(--text-muted);font-size:0.9rem}

/* ── PROGRESS BAR ── */
.progress-row{margin-bottom:14px}
.progress-label{display:flex;justify-content:space-between;font-size:0.75rem;margin-bottom:4px}
.progress-label span:first-child{color:var(--text-dim)}
.progress-label span:last-child{font-weight:700;color:var(--text)}
.progress-track{height:6px;background:rgba(255,255,255,0.06);border-radius:6px;overflow:hidden}
.progress-fill{height:100%;border-radius:6px;transition:width 1.2s ease}

/* ── ACTION BTNS ── */
.btn-approve{background:rgba(16,185,129,0.15);color:#34d399;border:none;padding:5px 14px;border-radius:20px;font-size:0.68rem;font-weight:700;cursor:pointer;transition:all .2s;font-family:'Manrope',sans-serif}
.btn-approve:hover{background:rgba(16,185,129,0.3)}
.btn-deny{background:rgba(239,68,68,0.15);color:#f87171;border:none;padding:5px 14px;border-radius:20px;font-size:0.68rem;font-weight:700;cursor:pointer;transition:all .2s;font-family:'Manrope',sans-serif}
.btn-deny:hover{background:rgba(239,68,68,0.3)}

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
.setting-input{background:rgba(255,255,255,0.06);border:1px solid var(--card-border);color:var(--text);padding:8px 14px;border-radius:10px;font-size:0.8rem;font-family:'Manrope',sans-serif;width:240px}
.setting-input:focus{outline:none;border-color:var(--primary)}
.toggle{width:44px;height:24px;background:rgba(255,255,255,0.1);border-radius:24px;position:relative;cursor:pointer;transition:background .3s;border:none}
.toggle.on{background:var(--primary)}
.toggle::after{content:'';position:absolute;top:3px;left:3px;width:18px;height:18px;border-radius:50%;background:#fff;transition:transform .3s}
.toggle.on::after{transform:translateX(20px)}

/* ── CALENDAR ── */
.mini-cal{display:grid;grid-template-columns:repeat(7,1fr);gap:3px}
.mini-cal .cal-header{font-size:0.6rem;font-weight:700;color:var(--text-muted);text-align:center;padding:4px}
.mini-cal .cal-day{font-size:0.7rem;text-align:center;padding:6px;border-radius:6px;color:var(--text-dim)}
.mini-cal .cal-day.absent{background:rgba(239,68,68,0.12);color:var(--danger)}
.mini-cal .cal-day.pending{background:rgba(245,158,11,0.12);color:var(--warning)}

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
@media(max-width:1024px){
  .kpi-grid{grid-template-columns:repeat(2,1fr)}
  .grid-2{grid-template-columns:1fr}
  .pipeline{flex-wrap:wrap}
  .pipeline-stage{flex:1 1 45%}
}
@media(max-width:768px){
  .sidebar{transform:translateX(-100%)}
  .sidebar.open{transform:translateX(0)}
  .navbar{left:0}
  .main{margin-left:0}
  .menu-toggle{display:block}
  .kpi-grid{grid-template-columns:1fr 1fr}
  .setting-input{width:160px}
  .pipeline-stage{flex:1 1 100%}
}
@media(max-width:480px){
  .kpi-grid{grid-template-columns:1fr}
  .main{padding:16px}
  .data-tbl{font-size:0.7rem}
  .data-tbl thead th,.data-tbl tbody td{padding:8px 10px}
}
</style>
</head>
<body>

<!-- SIDEBAR -->
<aside class="sidebar" id="sidebar">
  <div class="sidebar-brand">${biz}</div>
  <nav class="sidebar-nav">
    <a class="sidebar-link active" data-section="dashboard" onclick="showSection('dashboard')">
      <span class="icon">◉</span> Dashboard
    </a>
    <a class="sidebar-link" data-section="directory" onclick="showSection('directory')">
      <span class="icon">☰</span> Directorio
    </a>
    <a class="sidebar-link" data-section="recruitment" onclick="showSection('recruitment')">
      <span class="icon">▤</span> Reclutamiento
    </a>
    <a class="sidebar-link" data-section="payroll" onclick="showSection('payroll')">
      <span class="icon">⊞</span> Nóminas
    </a>
    <a class="sidebar-link" data-section="timeoff" onclick="showSection('timeoff')">
      <span class="icon">◎</span> Vacaciones
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
    <span class="navbar-badge">RRHH</span>
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
      <div class="label">RRHH</div>
      <h2>Panel de Control</h2>
      <p>Vista general del equipo, vacantes abiertas y métricas clave de personas.</p>
    </div>

    <div class="kpi-grid">
      <div class="kpi">
        <div class="kpi-icon">👥</div>
        <div class="kpi-value counter" data-target="248">0</div>
        <div class="kpi-label">Empleados Activos</div>
        <div class="kpi-trend up">+6 este mes</div>
      </div>
      <div class="kpi">
        <div class="kpi-icon">📋</div>
        <div class="kpi-value counter" data-target="12">0</div>
        <div class="kpi-label">Vacantes Abiertas</div>
        <div class="kpi-trend up">3 nuevas</div>
      </div>
      <div class="kpi">
        <div class="kpi-icon">🔄</div>
        <div class="kpi-value"><span class="counter" data-target="4.2" data-decimals="1">0</span>%</div>
        <div class="kpi-label">Rotación Anual</div>
        <div class="kpi-trend down">-1.2% vs anterior</div>
      </div>
      <div class="kpi">
        <div class="kpi-icon">📊</div>
        <div class="kpi-value"><span class="counter" data-target="62">0</span></div>
        <div class="kpi-label">eNPS Score</div>
        <div class="kpi-trend up">+8 vs Q1</div>
      </div>
    </div>

    <div class="grid-2">
      <div class="card">
        <div class="card-header">
          <h3>Distribución por Departamento</h3>
          <span class="badge badge-primary">248 total</span>
        </div>
        <div class="hbar"><div class="hbar-label"><span>Engineering</span><span>82</span></div><div class="hbar-track"><div class="hbar-fill" style="width:0%" data-width="82%"></div></div></div>
        <div class="hbar"><div class="hbar-label"><span>Sales</span><span>54</span></div><div class="hbar-track"><div class="hbar-fill" style="width:0%;background:var(--accent)" data-width="54%"></div></div></div>
        <div class="hbar"><div class="hbar-label"><span>Marketing</span><span>38</span></div><div class="hbar-track"><div class="hbar-fill" style="width:0%" data-width="38%"></div></div></div>
        <div class="hbar"><div class="hbar-label"><span>Finance</span><span>28</span></div><div class="hbar-track"><div class="hbar-fill" style="width:0%;background:var(--accent)" data-width="28%"></div></div></div>
        <div class="hbar"><div class="hbar-label"><span>Operations</span><span>28</span></div><div class="hbar-track"><div class="hbar-fill" style="width:0%" data-width="28%"></div></div></div>
        <div class="hbar"><div class="hbar-label"><span>HR</span><span>18</span></div><div class="hbar-track"><div class="hbar-fill" style="width:0%;background:var(--accent)" data-width="18%"></div></div></div>
      </div>
      <div class="card">
        <div class="card-header">
          <h3>Alertas de RRHH</h3>
          <span class="badge badge-yellow">4 activas</span>
        </div>
        <div class="alert-row"><span class="alert-icon">🎂</span><span class="alert-text">3 cumpleaños esta semana — enviar felicitaciones</span><span class="alert-badge"><span class="badge badge-purple">Evento</span></span></div>
        <div class="alert-row"><span class="alert-icon">📄</span><span class="alert-text">5 contratos por renovar antes del 30/04</span><span class="alert-badge"><span class="badge badge-red">Urgente</span></span></div>
        <div class="alert-row"><span class="alert-icon">🏖️</span><span class="alert-text">12 solicitudes de vacaciones pendientes</span><span class="alert-badge"><span class="badge badge-yellow">Pendiente</span></span></div>
        <div class="alert-row"><span class="alert-icon">🎯</span><span class="alert-text">Evaluación trimestral Q2 — programar reuniones</span><span class="alert-badge"><span class="badge badge-blue">Planning</span></span></div>
      </div>
    </div>
  </div>

  <!-- ═══ DIRECTORIO ═══ -->
  <div class="page-section" id="sec-directory">
    <div class="section-header">
      <div class="label">EQUIPO</div>
      <h2>Directorio de Empleados</h2>
      <p>Consulta y gestiona toda la información del personal de la empresa.</p>
    </div>

    <div class="kpi-grid" style="margin-bottom:20px">
      <div class="kpi"><div class="kpi-icon">🏢</div><div class="kpi-value counter" data-target="186">0</div><div class="kpi-label">Presencial</div></div>
      <div class="kpi"><div class="kpi-icon">🏠</div><div class="kpi-value counter" data-target="42">0</div><div class="kpi-label">Remoto</div></div>
      <div class="kpi"><div class="kpi-icon">🌍</div><div class="kpi-value counter" data-target="20">0</div><div class="kpi-label">Híbrido</div></div>
      <div class="kpi"><div class="kpi-icon">📝</div><div class="kpi-value counter" data-target="8">0</div><div class="kpi-label">Periodo Prueba</div></div>
    </div>

    <div class="card">
      <div class="card-header"><h3>Empleados</h3><span class="badge badge-primary">248 registros</span></div>
      <table class="data-tbl">
        <thead><tr><th>Empleado</th><th>Departamento</th><th>Puesto</th><th>Email</th><th>Teléfono</th><th>Estado</th></tr></thead>
        <tbody>
          <tr><td><div class="emp-cell"><div class="avatar">AG</div><div><div class="emp-name">Ana García López</div></div></div></td><td>Engineering</td><td>Senior Developer</td><td>a.garcia@empresa.com</td><td>+34 612 345 678</td><td><span class="badge badge-green">Activo</span></td></tr>
          <tr><td><div class="emp-cell"><div class="avatar">CM</div><div><div class="emp-name">Carlos Martínez Ruiz</div></div></div></td><td>Marketing</td><td>Marketing Manager</td><td>c.martinez@empresa.com</td><td>+34 623 456 789</td><td><span class="badge badge-green">Activo</span></td></tr>
          <tr><td><div class="emp-cell"><div class="avatar">LF</div><div><div class="emp-name">Laura Fernández Vila</div></div></div></td><td>Sales</td><td>Account Executive</td><td>l.fernandez@empresa.com</td><td>+34 634 567 890</td><td><span class="badge badge-green">Activo</span></td></tr>
          <tr><td><div class="emp-cell"><div class="avatar">MT</div><div><div class="emp-name">Miguel Torres Sanz</div></div></div></td><td>Engineering</td><td>Tech Lead</td><td>m.torres@empresa.com</td><td>+34 645 678 901</td><td><span class="badge badge-green">Activo</span></td></tr>
          <tr><td><div class="emp-cell"><div class="avatar">ER</div><div><div class="emp-name">Elena Rodríguez Pérez</div></div></div></td><td>HR</td><td>HR Business Partner</td><td>e.rodriguez@empresa.com</td><td>+34 656 789 012</td><td><span class="badge badge-green">Activo</span></td></tr>
          <tr><td><div class="emp-cell"><div class="avatar">DL</div><div><div class="emp-name">David López Navarro</div></div></div></td><td>Finance</td><td>Financial Controller</td><td>d.lopez@empresa.com</td><td>+34 667 890 123</td><td><span class="badge badge-green">Activo</span></td></tr>
          <tr><td><div class="emp-cell"><div class="avatar">SD</div><div><div class="emp-name">Sara Díaz Moreno</div></div></div></td><td>Engineering</td><td>Frontend Developer</td><td>s.diaz@empresa.com</td><td>+34 678 901 234</td><td><span class="badge badge-blue">Remoto</span></td></tr>
          <tr><td><div class="emp-cell"><div class="avatar">JS</div><div><div class="emp-name">Javier Sánchez Gil</div></div></div></td><td>Sales</td><td>Sales Director</td><td>j.sanchez@empresa.com</td><td>+34 689 012 345</td><td><span class="badge badge-green">Activo</span></td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- ═══ RECLUTAMIENTO ═══ -->
  <div class="page-section" id="sec-recruitment">
    <div class="section-header">
      <div class="label">RECLUTAMIENTO</div>
      <h2>Pipeline de Talento</h2>
      <p>Seguimiento del proceso de selección, desde la candidatura hasta la contratación.</p>
    </div>

    <div class="pipeline">
      <div class="pipeline-stage"><div class="stage-count counter" data-target="145">0</div><div class="stage-label">Aplicados</div><span class="stage-arrow">▸</span></div>
      <div class="pipeline-stage"><div class="stage-count counter" data-target="68">0</div><div class="stage-label">Screening</div><span class="stage-arrow">▸</span></div>
      <div class="pipeline-stage"><div class="stage-count counter" data-target="34">0</div><div class="stage-label">Entrevista</div><span class="stage-arrow">▸</span></div>
      <div class="pipeline-stage"><div class="stage-count counter" data-target="8">0</div><div class="stage-label">Oferta</div><span class="stage-arrow">▸</span></div>
      <div class="pipeline-stage"><div class="stage-count" style="color:var(--success)"><span class="counter" data-target="5">0</span></div><div class="stage-label">Contratado</div></div>
    </div>

    <div class="grid-2" style="margin-bottom:20px">
      <div class="card">
        <div class="card-header"><h3>Métricas de Hiring</h3></div>
        <div class="kpi-grid" style="grid-template-columns:1fr 1fr;margin-bottom:0">
          <div class="kpi"><div class="kpi-icon">⏱️</div><div class="kpi-value"><span class="counter" data-target="28">0</span> <small style="font-size:0.6rem;color:var(--text-dim)">días</small></div><div class="kpi-label">Tiempo Medio Contratación</div></div>
          <div class="kpi"><div class="kpi-icon">💰</div><div class="kpi-value">€<span class="counter" data-target="3200">0</span></div><div class="kpi-label">Coste por Contratación</div></div>
          <div class="kpi"><div class="kpi-icon">📊</div><div class="kpi-value"><span class="counter" data-target="78">0</span>%</div><div class="kpi-label">Tasa Aceptación</div></div>
          <div class="kpi"><div class="kpi-icon">🎯</div><div class="kpi-value"><span class="counter" data-target="8.4" data-decimals="1">0</span>/10</div><div class="kpi-label">Quality of Hire</div></div>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><h3>Pipeline Visual</h3><span class="badge badge-accent">Este mes</span></div>
        <div class="hbar"><div class="hbar-label"><span>Candidaturas Recibidas</span><span>145</span></div><div class="hbar-track"><div class="hbar-fill" style="width:0%" data-width="100%"></div></div></div>
        <div class="hbar"><div class="hbar-label"><span>Screening Telefónico</span><span>68</span></div><div class="hbar-track"><div class="hbar-fill" style="width:0%;background:var(--info)" data-width="47%"></div></div></div>
        <div class="hbar"><div class="hbar-label"><span>Entrevista Técnica</span><span>34</span></div><div class="hbar-track"><div class="hbar-fill" style="width:0%" data-width="23%"></div></div></div>
        <div class="hbar"><div class="hbar-label"><span>Entrevista Cultural</span><span>18</span></div><div class="hbar-track"><div class="hbar-fill" style="width:0%;background:var(--accent)" data-width="12%"></div></div></div>
        <div class="hbar"><div class="hbar-label"><span>Oferta Enviada</span><span>8</span></div><div class="hbar-track"><div class="hbar-fill" style="width:0%;background:var(--warning)" data-width="6%"></div></div></div>
        <div class="hbar"><div class="hbar-label"><span>Contratados</span><span>5</span></div><div class="hbar-track"><div class="hbar-fill" style="width:0%;background:var(--success)" data-width="3.5%"></div></div></div>
      </div>
    </div>

    <div class="card">
      <div class="card-header"><h3>Posiciones Abiertas</h3><span class="badge badge-primary">12 activas</span></div>
      <table class="data-tbl">
        <thead><tr><th>Puesto</th><th>Departamento</th><th style="text-align:center">Candidatos</th><th>Fase</th><th>Prioridad</th></tr></thead>
        <tbody>
          <tr><td style="font-weight:600;color:var(--text)">Senior Backend Developer</td><td>Engineering</td><td style="text-align:center">24</td><td><span class="badge badge-blue">Entrevistas</span></td><td><span class="badge badge-red">Alta</span></td></tr>
          <tr><td style="font-weight:600;color:var(--text)">Product Designer</td><td>Engineering</td><td style="text-align:center">18</td><td><span class="badge badge-yellow">Screening</span></td><td><span class="badge badge-yellow">Media</span></td></tr>
          <tr><td style="font-weight:600;color:var(--text)">Sales Representative</td><td>Sales</td><td style="text-align:center">31</td><td><span class="badge badge-green">Oferta</span></td><td><span class="badge badge-red">Alta</span></td></tr>
          <tr><td style="font-weight:600;color:var(--text)">Content Marketing Specialist</td><td>Marketing</td><td style="text-align:center">22</td><td><span class="badge badge-blue">Entrevistas</span></td><td><span class="badge badge-yellow">Media</span></td></tr>
          <tr><td style="font-weight:600;color:var(--text)">DevOps Engineer</td><td>Engineering</td><td style="text-align:center">15</td><td><span class="badge badge-yellow">Screening</span></td><td><span class="badge badge-red">Alta</span></td></tr>
          <tr><td style="font-weight:600;color:var(--text)">HR Coordinator</td><td>HR</td><td style="text-align:center">12</td><td><span class="badge badge-purple">Cultural</span></td><td><span class="badge badge-green">Normal</span></td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- ═══ NÓMINAS ═══ -->
  <div class="page-section" id="sec-payroll">
    <div class="section-header">
      <div class="label">NÓMINAS</div>
      <h2>Gestión de Nóminas</h2>
      <p>Resumen de nóminas mensuales con desglose de salario bruto, seguridad social e IRPF.</p>
    </div>

    <div class="kpi-grid">
      <div class="kpi"><div class="kpi-icon">💶</div><div class="kpi-value">€<span class="counter" data-target="285400">0</span></div><div class="kpi-label">Masa Salarial Bruta</div><div class="kpi-trend up">+2.1% vs mes anterior</div></div>
      <div class="kpi"><div class="kpi-icon">🏦</div><div class="kpi-value">€<span class="counter" data-target="91328">0</span></div><div class="kpi-label">SS Empresa Total</div></div>
      <div class="kpi"><div class="kpi-icon">📊</div><div class="kpi-value">€<span class="counter" data-target="4580">0</span></div><div class="kpi-label">Coste Medio/Empleado</div></div>
      <div class="kpi"><div class="kpi-icon">✅</div><div class="kpi-value"><span class="counter" data-target="242">0</span>/248</div><div class="kpi-label">Nóminas Procesadas</div></div>
    </div>

    <div class="card">
      <div class="card-header"><h3>Nóminas — Abril 2026</h3><span class="badge badge-green">96% procesadas</span></div>
      <table class="data-tbl">
        <thead><tr><th>Empleado</th><th>Departamento</th><th style="text-align:right">Salario Bruto</th><th style="text-align:right">SS Empresa</th><th style="text-align:right">IRPF</th><th style="text-align:right">Neto</th><th>Estado</th></tr></thead>
        <tbody>
          <tr><td><div class="emp-cell"><div class="avatar">AG</div><div class="emp-name">Ana García López</div></div></td><td>Engineering</td><td style="text-align:right">4.200,00 &euro;</td><td style="text-align:right">1.344,00 &euro;</td><td style="text-align:right">756,00 &euro;</td><td style="text-align:right;font-weight:700;color:var(--text)">3.100,00 &euro;</td><td><span class="badge badge-green">Pagada</span></td></tr>
          <tr><td><div class="emp-cell"><div class="avatar">CM</div><div class="emp-name">Carlos Martínez Ruiz</div></div></td><td>Marketing</td><td style="text-align:right">3.600,00 &euro;</td><td style="text-align:right">1.152,00 &euro;</td><td style="text-align:right">612,00 &euro;</td><td style="text-align:right;font-weight:700;color:var(--text)">2.836,00 &euro;</td><td><span class="badge badge-green">Pagada</span></td></tr>
          <tr><td><div class="emp-cell"><div class="avatar">MT</div><div class="emp-name">Miguel Torres Sanz</div></div></td><td>Engineering</td><td style="text-align:right">5.100,00 &euro;</td><td style="text-align:right">1.632,00 &euro;</td><td style="text-align:right">1.071,00 &euro;</td><td style="text-align:right;font-weight:700;color:var(--text)">3.397,00 &euro;</td><td><span class="badge badge-green">Pagada</span></td></tr>
          <tr><td><div class="emp-cell"><div class="avatar">LF</div><div class="emp-name">Laura Fernández Vila</div></div></td><td>Sales</td><td style="text-align:right">3.200,00 &euro;</td><td style="text-align:right">1.024,00 &euro;</td><td style="text-align:right">512,00 &euro;</td><td style="text-align:right;font-weight:700;color:var(--text)">2.664,00 &euro;</td><td><span class="badge badge-yellow">Pendiente</span></td></tr>
          <tr><td><div class="emp-cell"><div class="avatar">ER</div><div class="emp-name">Elena Rodríguez Pérez</div></div></td><td>HR</td><td style="text-align:right">3.800,00 &euro;</td><td style="text-align:right">1.216,00 &euro;</td><td style="text-align:right">646,00 &euro;</td><td style="text-align:right;font-weight:700;color:var(--text)">2.938,00 &euro;</td><td><span class="badge badge-green">Pagada</span></td></tr>
          <tr><td><div class="emp-cell"><div class="avatar">DL</div><div class="emp-name">David López Navarro</div></div></td><td>Finance</td><td style="text-align:right">4.500,00 &euro;</td><td style="text-align:right">1.440,00 &euro;</td><td style="text-align:right">855,00 &euro;</td><td style="text-align:right;font-weight:700;color:var(--text)">3.205,00 &euro;</td><td><span class="badge badge-green">Pagada</span></td></tr>
          <tr><td><div class="emp-cell"><div class="avatar">SD</div><div class="emp-name">Sara Díaz Moreno</div></div></td><td>Engineering</td><td style="text-align:right">3.400,00 &euro;</td><td style="text-align:right">1.088,00 &euro;</td><td style="text-align:right">544,00 &euro;</td><td style="text-align:right;font-weight:700;color:var(--text)">2.768,00 &euro;</td><td><span class="badge badge-yellow">Pendiente</span></td></tr>
          <tr><td><div class="emp-cell"><div class="avatar">JS</div><div class="emp-name">Javier Sánchez Gil</div></div></td><td>Sales</td><td style="text-align:right">5.800,00 &euro;</td><td style="text-align:right">1.856,00 &euro;</td><td style="text-align:right">1.334,00 &euro;</td><td style="text-align:right;font-weight:700;color:var(--text)">3.610,00 &euro;</td><td><span class="badge badge-green">Pagada</span></td></tr>
        </tbody>
      </table>
    </div>

    <div class="card" style="margin-top:16px">
      <div class="card-header"><h3>Resumen de Nómina</h3></div>
      <div class="grid-2">
        <div>
          <div class="hbar"><div class="hbar-label"><span>Total Bruto</span><span>€285.400</span></div><div class="hbar-track"><div class="hbar-fill" style="width:0%" data-width="100%"></div></div></div>
          <div class="hbar"><div class="hbar-label"><span>SS Empresa</span><span>€91.328</span></div><div class="hbar-track"><div class="hbar-fill" style="width:0%;background:var(--warning)" data-width="32%"></div></div></div>
          <div class="hbar"><div class="hbar-label"><span>IRPF Total</span><span>€48.230</span></div><div class="hbar-track"><div class="hbar-fill" style="width:0%;background:var(--danger)" data-width="17%"></div></div></div>
          <div class="hbar"><div class="hbar-label"><span>Neto Total</span><span>€195.842</span></div><div class="hbar-track"><div class="hbar-fill" style="width:0%;background:var(--success)" data-width="69%"></div></div></div>
        </div>
        <div>
          <div class="hbar"><div class="hbar-label"><span>Engineering</span><span>€124K</span></div><div class="hbar-track"><div class="hbar-fill" style="width:0%" data-width="100%"></div></div></div>
          <div class="hbar"><div class="hbar-label"><span>Sales</span><span>€68K</span></div><div class="hbar-track"><div class="hbar-fill" style="width:0%;background:var(--accent)" data-width="55%"></div></div></div>
          <div class="hbar"><div class="hbar-label"><span>Marketing</span><span>€42K</span></div><div class="hbar-track"><div class="hbar-fill" style="width:0%" data-width="34%"></div></div></div>
          <div class="hbar"><div class="hbar-label"><span>Finance</span><span>€28K</span></div><div class="hbar-track"><div class="hbar-fill" style="width:0%;background:var(--accent)" data-width="23%"></div></div></div>
        </div>
      </div>
    </div>
  </div>

  <!-- ═══ VACACIONES ═══ -->
  <div class="page-section" id="sec-timeoff">
    <div class="section-header">
      <div class="label">AUSENCIAS</div>
      <h2>Control de Vacaciones</h2>
      <p>Gestiona solicitudes de vacaciones, bajas y permisos del equipo.</p>
    </div>

    <div class="kpi-grid">
      <div class="kpi"><div class="kpi-icon">📋</div><div class="kpi-value counter" data-target="12">0</div><div class="kpi-label">Solicitudes Pendientes</div><div class="kpi-trend up">+4 hoy</div></div>
      <div class="kpi"><div class="kpi-icon">✅</div><div class="kpi-value counter" data-target="34">0</div><div class="kpi-label">Aprobadas Este Mes</div></div>
      <div class="kpi"><div class="kpi-icon">🏖️</div><div class="kpi-value counter" data-target="8">0</div><div class="kpi-label">Ausentes Hoy</div></div>
      <div class="kpi"><div class="kpi-icon">📅</div><div class="kpi-value"><span class="counter" data-target="12">0</span>/22</div><div class="kpi-label">Días Vac. Usados (Media)</div></div>
    </div>

    <div class="card">
      <div class="card-header"><h3>Solicitudes Recientes</h3><span class="badge badge-yellow">12 pendientes</span></div>
      <table class="data-tbl">
        <thead><tr><th>Empleado</th><th>Tipo</th><th>Desde</th><th>Hasta</th><th style="text-align:center">Días</th><th>Estado</th><th style="text-align:center">Acciones</th></tr></thead>
        <tbody>
          <tr><td><div class="emp-cell"><div class="avatar">AG</div><div class="emp-name">Ana García López</div></div></td><td>Vacaciones</td><td>21/04/2026</td><td>25/04/2026</td><td style="text-align:center">5</td><td><span class="badge badge-yellow">Pendiente</span></td><td style="text-align:center"><button class="btn-approve" onclick="approveLeave(this,'Ana')">Aprobar</button> <button class="btn-deny" onclick="denyLeave(this,'Ana')">Denegar</button></td></tr>
          <tr><td><div class="emp-cell"><div class="avatar">CM</div><div class="emp-name">Carlos Martínez Ruiz</div></div></td><td>Baja Médica</td><td>07/04/2026</td><td>11/04/2026</td><td style="text-align:center">5</td><td><span class="badge badge-green">Aprobada</span></td><td style="text-align:center">—</td></tr>
          <tr><td><div class="emp-cell"><div class="avatar">LF</div><div class="emp-name">Laura Fernández Vila</div></div></td><td>Vacaciones</td><td>28/04/2026</td><td>09/05/2026</td><td style="text-align:center">10</td><td><span class="badge badge-yellow">Pendiente</span></td><td style="text-align:center"><button class="btn-approve" onclick="approveLeave(this,'Laura')">Aprobar</button> <button class="btn-deny" onclick="denyLeave(this,'Laura')">Denegar</button></td></tr>
          <tr><td><div class="emp-cell"><div class="avatar">MT</div><div class="emp-name">Miguel Torres Sanz</div></div></td><td>Paternidad</td><td>01/05/2026</td><td>16/06/2026</td><td style="text-align:center">35</td><td><span class="badge badge-green">Aprobada</span></td><td style="text-align:center">—</td></tr>
          <tr><td><div class="emp-cell"><div class="avatar">SD</div><div class="emp-name">Sara Díaz Moreno</div></div></td><td>Formación</td><td>14/04/2026</td><td>16/04/2026</td><td style="text-align:center">3</td><td><span class="badge badge-yellow">Pendiente</span></td><td style="text-align:center"><button class="btn-approve" onclick="approveLeave(this,'Sara')">Aprobar</button> <button class="btn-deny" onclick="denyLeave(this,'Sara')">Denegar</button></td></tr>
          <tr><td><div class="emp-cell"><div class="avatar">DL</div><div class="emp-name">David López Navarro</div></div></td><td>Vacaciones</td><td>05/05/2026</td><td>09/05/2026</td><td style="text-align:center">5</td><td><span class="badge badge-blue">En revisión</span></td><td style="text-align:center"><button class="btn-approve" onclick="approveLeave(this,'David')">Aprobar</button> <button class="btn-deny" onclick="denyLeave(this,'David')">Denegar</button></td></tr>
        </tbody>
      </table>
    </div>

    <div class="grid-2" style="margin-top:16px">
      <div class="card">
        <div class="card-header"><h3>Ausencias por Tipo</h3><span class="badge badge-accent">Este año</span></div>
        <div class="hbar"><div class="hbar-label"><span>Vacaciones</span><span>68</span></div><div class="hbar-track"><div class="hbar-fill" style="width:0%" data-width="100%"></div></div></div>
        <div class="hbar"><div class="hbar-label"><span>Asuntos Propios</span><span>22</span></div><div class="hbar-track"><div class="hbar-fill" style="width:0%;background:var(--warning)" data-width="32%"></div></div></div>
        <div class="hbar"><div class="hbar-label"><span>Baja Médica</span><span>14</span></div><div class="hbar-track"><div class="hbar-fill" style="width:0%;background:var(--danger)" data-width="21%"></div></div></div>
        <div class="hbar"><div class="hbar-label"><span>Formación</span><span>12</span></div><div class="hbar-track"><div class="hbar-fill" style="width:0%;background:var(--info)" data-width="18%"></div></div></div>
        <div class="hbar"><div class="hbar-label"><span>Paternidad/Maternidad</span><span>8</span></div><div class="hbar-track"><div class="hbar-fill" style="width:0%;background:var(--accent)" data-width="12%"></div></div></div>
      </div>
      <div class="card">
        <div class="card-header"><h3>Calendario Abril 2026</h3></div>
        <div class="mini-cal">
          <div class="cal-header">L</div><div class="cal-header">M</div><div class="cal-header">X</div><div class="cal-header">J</div><div class="cal-header">V</div><div class="cal-header">S</div><div class="cal-header">D</div>
          <div class="cal-day"></div><div class="cal-day"></div><div class="cal-day">1</div><div class="cal-day">2</div><div class="cal-day">3</div><div class="cal-day">4</div><div class="cal-day">5</div>
          <div class="cal-day">6</div><div class="cal-day absent">7</div><div class="cal-day absent">8</div><div class="cal-day absent">9</div><div class="cal-day absent">10</div><div class="cal-day absent">11</div><div class="cal-day">12</div>
          <div class="cal-day">13</div><div class="cal-day pending">14</div><div class="cal-day pending">15</div><div class="cal-day pending">16</div><div class="cal-day">17</div><div class="cal-day">18</div><div class="cal-day">19</div>
          <div class="cal-day">20</div><div class="cal-day pending">21</div><div class="cal-day pending">22</div><div class="cal-day pending">23</div><div class="cal-day pending">24</div><div class="cal-day pending">25</div><div class="cal-day">26</div>
          <div class="cal-day">27</div><div class="cal-day pending">28</div><div class="cal-day pending">29</div><div class="cal-day pending">30</div><div class="cal-day"></div><div class="cal-day"></div><div class="cal-day"></div>
        </div>
        <div style="display:flex;gap:16px;justify-content:center;margin-top:12px;font-size:0.65rem;color:var(--text-dim)">
          <span><span style="display:inline-block;width:8px;height:8px;border-radius:2px;background:rgba(239,68,68,0.12);margin-right:4px"></span>Aprobada</span>
          <span><span style="display:inline-block;width:8px;height:8px;border-radius:2px;background:rgba(245,158,11,0.12);margin-right:4px"></span>Pendiente</span>
        </div>
      </div>
    </div>
  </div>

  <!-- ═══ ANALYTICS ═══ -->
  <div class="page-section" id="sec-analytics">
    <div class="section-header">
      <div class="label">ANALYTICS</div>
      <h2>People Analytics</h2>
      <p>Métricas avanzadas de retención, engagement y rendimiento del equipo.</p>
    </div>

    <div class="card" style="text-align:center;padding:32px;margin-bottom:20px;background:linear-gradient(135deg,rgba(16,185,129,0.08),rgba(6,182,212,0.08))">
      <div style="font-size:3rem;font-weight:800;color:var(--primary);letter-spacing:-2px">+62</div>
      <div style="font-size:0.85rem;color:var(--text-dim);margin-top:4px">Employee Net Promoter Score (eNPS)</div>
      <div style="display:flex;gap:32px;justify-content:center;margin-top:20px">
        <div><div style="font-size:1.3rem;font-weight:800;color:var(--text)">94%</div><div style="font-size:0.7rem;color:var(--text-dim)">Retención Anual</div></div>
        <div><div style="font-size:1.3rem;font-weight:800;color:var(--text)">28 días</div><div style="font-size:0.7rem;color:var(--text-dim)">Tiempo Medio Contratación</div></div>
        <div><div style="font-size:1.3rem;font-weight:800;color:var(--text)">8.7/10</div><div style="font-size:0.7rem;color:var(--text-dim)">Satisfacción General</div></div>
      </div>
    </div>

    <div class="grid-2">
      <div class="card">
        <div class="card-header"><h3>Retención por Departamento</h3><span class="badge badge-green">Anual</span></div>
        <div class="hbar"><div class="hbar-label"><span>HR</span><span>96%</span></div><div class="hbar-track"><div class="hbar-fill" style="width:0%;background:var(--success)" data-width="96%"></div></div></div>
        <div class="hbar"><div class="hbar-label"><span>Engineering</span><span>94%</span></div><div class="hbar-track"><div class="hbar-fill" style="width:0%;background:var(--success)" data-width="94%"></div></div></div>
        <div class="hbar"><div class="hbar-label"><span>Finance</span><span>91%</span></div><div class="hbar-track"><div class="hbar-fill" style="width:0%" data-width="91%"></div></div></div>
        <div class="hbar"><div class="hbar-label"><span>Marketing</span><span>88%</span></div><div class="hbar-track"><div class="hbar-fill" style="width:0%" data-width="88%"></div></div></div>
        <div class="hbar"><div class="hbar-label"><span>Operations</span><span>87%</span></div><div class="hbar-track"><div class="hbar-fill" style="width:0%;background:var(--accent)" data-width="87%"></div></div></div>
        <div class="hbar"><div class="hbar-label"><span>Sales</span><span>82%</span></div><div class="hbar-track"><div class="hbar-fill" style="width:0%;background:var(--warning)" data-width="82%"></div></div></div>
      </div>
      <div class="card">
        <div class="card-header"><h3>Métricas de Engagement</h3></div>
        <div class="progress-row"><div class="progress-label"><span>Participación en Encuestas</span><span>87%</span></div><div class="progress-track"><div class="progress-fill" style="width:0%;background:var(--primary)" data-width="87%"></div></div></div>
        <div class="progress-row"><div class="progress-label"><span>Uso de Beneficios</span><span>72%</span></div><div class="progress-track"><div class="progress-fill" style="width:0%;background:var(--accent)" data-width="72%"></div></div></div>
        <div class="progress-row"><div class="progress-label"><span>Formación Completada</span><span>64%</span></div><div class="progress-track"><div class="progress-fill" style="width:0%;background:var(--success)" data-width="64%"></div></div></div>
        <div class="progress-row"><div class="progress-label"><span>Objetivos Cumplidos (OKRs)</span><span>78%</span></div><div class="progress-track"><div class="progress-fill" style="width:0%;background:var(--primary)" data-width="78%"></div></div></div>
        <div class="progress-row"><div class="progress-label"><span>Asistencia a Eventos</span><span>55%</span></div><div class="progress-track"><div class="progress-fill" style="width:0%;background:var(--accent)" data-width="55%"></div></div></div>
      </div>
    </div>

    <div class="grid-2" style="margin-top:16px">
      <div class="card">
        <div class="card-header"><h3>Headcount Mensual</h3></div>
        <div class="hbar"><div class="hbar-label"><span>Enero</span><span>232</span></div><div class="hbar-track"><div class="hbar-fill" style="width:0%" data-width="89%"></div></div></div>
        <div class="hbar"><div class="hbar-label"><span>Febrero</span><span>235</span></div><div class="hbar-track"><div class="hbar-fill" style="width:0%" data-width="90%"></div></div></div>
        <div class="hbar"><div class="hbar-label"><span>Marzo</span><span>240</span></div><div class="hbar-track"><div class="hbar-fill" style="width:0%" data-width="92%"></div></div></div>
        <div class="hbar"><div class="hbar-label"><span>Abril</span><span>248</span></div><div class="hbar-track"><div class="hbar-fill" style="width:0%;background:var(--success)" data-width="95%"></div></div></div>
      </div>
      <div class="card">
        <div class="card-header"><h3>Coste Salarial por Departamento</h3></div>
        <div class="hbar"><div class="hbar-label"><span>Engineering</span><span>€124K</span></div><div class="hbar-track"><div class="hbar-fill" style="width:0%" data-width="100%"></div></div></div>
        <div class="hbar"><div class="hbar-label"><span>Sales</span><span>€68K</span></div><div class="hbar-track"><div class="hbar-fill" style="width:0%;background:var(--accent)" data-width="55%"></div></div></div>
        <div class="hbar"><div class="hbar-label"><span>Marketing</span><span>€42K</span></div><div class="hbar-track"><div class="hbar-fill" style="width:0%" data-width="34%"></div></div></div>
        <div class="hbar"><div class="hbar-label"><span>Finance</span><span>€28K</span></div><div class="hbar-track"><div class="hbar-fill" style="width:0%;background:var(--accent)" data-width="23%"></div></div></div>
        <div class="hbar"><div class="hbar-label"><span>HR</span><span>€18K</span></div><div class="hbar-track"><div class="hbar-fill" style="width:0%" data-width="15%"></div></div></div>
        <div class="hbar"><div class="hbar-label"><span>Operations</span><span>€22K</span></div><div class="hbar-track"><div class="hbar-fill" style="width:0%;background:var(--accent)" data-width="18%"></div></div></div>
      </div>
    </div>
  </div>

  <!-- ═══ CONFIG ═══ -->
  <div class="page-section" id="sec-settings">
    <div class="section-header">
      <div class="label">CONFIGURACION</div>
      <h2>Ajustes de RRHH</h2>
      <p>Personaliza el portal de recursos humanos, notificaciones y políticas.</p>
    </div>

    <div class="card">
      <div class="card-header"><h3>General</h3></div>
      <div class="settings-group">
        <div class="setting-row"><span class="setting-label">Nombre de la Empresa</span><input class="setting-input" type="text" value="${biz}"></div>
        <div class="setting-row"><span class="setting-label">Email RRHH</span><input class="setting-input" type="email" value="rrhh@empresa.com"></div>
        <div class="setting-row"><span class="setting-label">Días de Vacaciones por Defecto</span><input class="setting-input" type="text" value="22"></div>
        <div class="setting-row"><span class="setting-label">Idioma del Portal</span><select class="setting-input"><option>Español</option><option>English</option><option>Português</option></select></div>
      </div>
    </div>
    <div class="card">
      <div class="card-header"><h3>Notificaciones y Automatización</h3></div>
      <div class="settings-group">
        <div class="setting-row"><span class="setting-label">Aprobación Automática (&lt;3 días)</span><button class="toggle on" onclick="this.classList.toggle('on')"></button></div>
        <div class="setting-row"><span class="setting-label">Notificaciones por Email</span><button class="toggle on" onclick="this.classList.toggle('on')"></button></div>
        <div class="setting-row"><span class="setting-label">Recordatorios de Cumpleaños</span><button class="toggle on" onclick="this.classList.toggle('on')"></button></div>
        <div class="setting-row"><span class="setting-label">Alertas de Renovación de Contrato</span><button class="toggle on" onclick="this.classList.toggle('on')"></button></div>
        <div class="setting-row"><span class="setting-label">Recordatorio de Evaluaciones</span><button class="toggle" onclick="this.classList.toggle('on')"></button></div>
      </div>
    </div>
    <div style="margin-top:20px;text-align:right">
      <button style="background:var(--primary);color:#fff;border:none;padding:10px 28px;border-radius:12px;font-size:0.85rem;font-weight:700;cursor:pointer;font-family:'Manrope',sans-serif;transition:opacity .2s" onmouseover="this.style.opacity='0.85'" onmouseout="this.style.opacity='1'" onclick="showNotif('saved')">Guardar Cambios</button>
    </div>
  </div>

  <!-- FOOTER -->
  <div class="footer">Powered by <strong style="color:var(--primary)">Kerno Studio</strong></div>
</main>

<script>
// ── Section Navigation
function showSection(id) {
  document.querySelectorAll('.page-section').forEach(function(s){s.classList.remove('active')});
  var sec = document.getElementById('sec-'+id);
  if(sec) sec.classList.add('active');
  document.querySelectorAll('.sidebar-link').forEach(function(l){l.classList.remove('active')});
  var link = document.querySelector('.sidebar-link[data-section="'+id+'"]');
  if(link) link.classList.add('active');
  var titles = {dashboard:'Dashboard',directory:'Directorio',recruitment:'Reclutamiento',payroll:'Nóminas',timeoff:'Vacaciones',analytics:'Analytics',settings:'Configuración'};
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
    document.querySelectorAll('.page-section.active .hbar-fill, .page-section.active .progress-fill').forEach(function(bar){
      var w = bar.getAttribute('data-width');
      if(w) bar.style.width = w;
    });
  },100);
}

// ── Notifications
function showNotif(type, title, msg){
  var container = document.getElementById('notifContainer');
  var n = document.createElement('div');
  n.className = 'notif';
  if(type==='saved'){
    n.innerHTML='<span class="notif-icon">✅</span><div class="notif-text"><div class="notif-title">Guardado</div><div class="notif-msg">Los cambios se han guardado correctamente.</div></div>';
  } else {
    n.innerHTML='<span class="notif-icon">'+(title||'')+'</span><div class="notif-text"><div class="notif-title">'+(title||'')+'</div><div class="notif-msg">'+(msg||'')+'</div></div>';
  }
  container.appendChild(n);
  setTimeout(function(){n.style.opacity='0';n.style.transition='opacity .3s';setTimeout(function(){n.remove()},300)},3500);
}

// ── Leave Actions
function approveLeave(btn,name){
  var row = btn.closest('tr');
  if(row){
    var statusCell = row.querySelectorAll('td');
    statusCell[5].innerHTML='<span class="badge badge-green">Aprobada</span>';
    statusCell[6].innerHTML='—';
  }
  showNotif('ok','Aprobada','Solicitud de '+name+' aprobada correctamente.');
}
function denyLeave(btn,name){
  var row = btn.closest('tr');
  if(row){
    var statusCell = row.querySelectorAll('td');
    statusCell[5].innerHTML='<span class="badge badge-red">Denegada</span>';
    statusCell[6].innerHTML='—';
  }
  showNotif('ok','Denegada','Solicitud de '+name+' denegada.');
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
