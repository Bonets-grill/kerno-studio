import type { TemplateDefinition, TemplateCustomization } from '../types'

export const gymTemplate: TemplateDefinition = {
  meta: {
    id: 'gym',
    name: 'Gimnasio Premium',
    industries: ['gym', 'gimnasio', 'fitness', 'crossfit', 'yoga', 'pilates', 'deporte', 'sport', 'entrenamiento'],
    projectTypes: ['landing', 'mvp', 'system', 'saas'],
    sections: ['dashboard', 'socios', 'clases', 'accesos', 'entrenadores', 'analytics', 'configuracion'],
    description: 'Dashboard premium para gimnasios y centros fitness con sidebar, KPIs, gestión de socios, horarios de clases, control de accesos, entrenadores y analytics.',
  },

  render(c: TemplateCustomization): string {
    const name = c.businessName
    const primary = c.primaryColor || '#ef4444'
    const accent = c.accentColor || '#f97316'

    return `<!DOCTYPE html>
<html lang="${c.locale || 'es'}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${name} — Dashboard</title>
<link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --primary:${primary};
  --accent:${accent};
  --sidebar-bg:#1a1a1a;
  --content-bg:#111111;
  --card-bg:#1e1e1e;
  --card-hover:#252525;
  --border:#2a2a2a;
  --text:#f0f0f0;
  --text-muted:#999;
  --text-dim:#666;
  --green:#10b981;
  --red:#ef4444;
  --yellow:#f59e0b;
  --blue:#3b82f6;
  --purple:#a855f7;
}
html{scroll-behavior:smooth}
body{font-family:'Rajdhani',sans-serif;background:var(--content-bg);color:var(--text);display:flex;min-height:100vh;overflow-x:hidden;font-size:14px;line-height:1.5}

/* ── SIDEBAR ── */
.sidebar{width:250px;background:var(--sidebar-bg);position:fixed;top:0;left:0;height:100vh;display:flex;flex-direction:column;border-right:1px solid var(--border);z-index:100}
.sidebar-brand{padding:24px 20px;border-bottom:2px solid var(--primary)}
.sidebar-brand h1{font-size:1.2rem;font-weight:700;color:var(--text);text-transform:uppercase;letter-spacing:3px}
.sidebar-brand span{font-size:0.62rem;color:var(--text-dim);display:block;margin-top:2px;text-transform:uppercase;letter-spacing:2px}
.sidebar-nav{flex:1;padding:12px 0;overflow-y:auto}
.sidebar-link{display:flex;align-items:center;gap:12px;padding:11px 20px;color:var(--text-muted);font-size:0.85rem;font-weight:600;cursor:pointer;transition:all .2s;border-left:3px solid transparent;text-decoration:none;text-transform:uppercase;letter-spacing:1.5px}
.sidebar-link:hover{color:var(--text);background:rgba(255,255,255,0.04)}
.sidebar-link.active{color:var(--primary);background:rgba(239,68,68,0.08);border-left-color:var(--primary)}
.sidebar-link .icon{font-size:1rem;width:20px;text-align:center}
.sidebar-footer{padding:16px 20px;border-top:1px solid var(--border);font-size:0.6rem;color:var(--text-dim);text-transform:uppercase;letter-spacing:1px}

/* ── TOP NAVBAR ── */
.topbar{position:fixed;top:0;left:250px;right:0;height:56px;background:var(--sidebar-bg);border-bottom:2px solid var(--primary);display:flex;align-items:center;justify-content:space-between;padding:0 28px;z-index:99}
.topbar-title{font-size:0.95rem;font-weight:700;color:var(--text);text-transform:uppercase;letter-spacing:2px}
.topbar-right{display:flex;align-items:center;gap:16px}
.topbar-avatar{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,var(--primary),var(--accent));display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.7rem;color:#fff}
.topbar-badge{background:var(--primary);color:#fff;font-size:0.6rem;padding:2px 6px;border-radius:10px;font-weight:700}
.topbar-search{background:var(--content-bg);border:1px solid var(--border);border-radius:4px;padding:6px 14px;color:var(--text);font-size:0.78rem;width:220px;outline:none;font-family:inherit;text-transform:uppercase;letter-spacing:0.5px}
.topbar-search:focus{border-color:var(--primary)}

/* ── MAIN ── */
.main{margin-left:250px;margin-top:56px;padding:28px;min-height:calc(100vh - 56px);width:calc(100% - 250px)}
.page{display:none}
.page.active{display:block}

/* ── CARDS ── */
.card{background:var(--card-bg);border-radius:6px;padding:22px;border:1px solid var(--border);border-left:3px solid var(--primary);transition:all .25s}
.card:hover{border-color:rgba(239,68,68,0.4);background:var(--card-hover)}
.card-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px}
.card-header h3{font-size:0.9rem;font-weight:700;text-transform:uppercase;letter-spacing:1px}

/* ── KPI ── */
.kpi-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px}
.kpi{background:var(--card-bg);border-radius:6px;padding:20px;border:1px solid var(--border);border-left:4px solid var(--primary);transition:all .25s}
.kpi:hover{border-color:var(--primary);transform:translateY(-2px)}
.kpi-icon{font-size:1.5rem;margin-bottom:8px}
.kpi-value{font-size:1.9rem;font-weight:700;color:var(--text);line-height:1;text-transform:uppercase}
.kpi-label{font-size:0.7rem;color:var(--text-muted);margin-top:4px;font-weight:600;text-transform:uppercase;letter-spacing:1px}
.kpi-trend{font-size:0.65rem;margin-top:6px;font-weight:700;text-transform:uppercase}
.kpi-trend.up{color:var(--green)}

/* ── BADGES ── */
.badge{display:inline-block;padding:3px 10px;border-radius:4px;font-size:0.65rem;font-weight:700;letter-spacing:0.5px;text-transform:uppercase}
.badge-green{background:rgba(16,185,129,0.15);color:var(--green)}
.badge-red{background:rgba(239,68,68,0.15);color:var(--red)}
.badge-yellow{background:rgba(245,158,11,0.15);color:var(--yellow)}
.badge-blue{background:rgba(59,130,246,0.15);color:var(--blue)}
.badge-purple{background:rgba(168,85,247,0.15);color:var(--purple)}
.badge-orange{background:rgba(249,115,22,0.15);color:var(--accent)}

/* ── TABLE ── */
.table-wrap{overflow-x:auto}
table{width:100%;border-collapse:collapse}
th{text-align:left;padding:10px 14px;font-size:0.66rem;font-weight:700;color:var(--text-dim);text-transform:uppercase;letter-spacing:1.2px;border-bottom:2px solid var(--border)}
td{padding:12px 14px;font-size:0.8rem;border-bottom:1px solid rgba(42,42,42,0.6);vertical-align:middle}
tr:hover td{background:rgba(255,255,255,0.02)}
.avatar{width:32px;height:32px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-weight:700;font-size:0.65rem;color:#fff;margin-right:10px;vertical-align:middle;flex-shrink:0}

/* ── GRID ── */
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}

/* ── BAR CHART ── */
.bar-chart-item{margin-bottom:14px}
.bar-chart-label{display:flex;justify-content:space-between;font-size:0.75rem;margin-bottom:4px;text-transform:uppercase;letter-spacing:0.5px}
.bar-chart-track{height:10px;background:rgba(255,255,255,0.05);border-radius:2px;overflow:hidden}
.bar-chart-fill{height:100%;border-radius:2px;transition:width .8s ease}

/* ── CAPACITY BAR ── */
.cap-bar{height:6px;background:rgba(255,255,255,0.08);border-radius:3px;overflow:hidden;margin-top:4px}
.cap-fill{height:100%;border-radius:3px}

/* ── CLASS SCHEDULE ── */
.schedule-grid{display:grid;grid-template-columns:70px repeat(6,1fr);gap:1px;background:var(--border);border-radius:6px;overflow:hidden}
.sched-header{background:rgba(239,68,68,0.12);padding:10px 6px;text-align:center;font-weight:700;text-transform:uppercase;font-size:0.62rem;letter-spacing:1.5px;color:var(--primary)}
.sched-time{background:var(--sidebar-bg);padding:10px 6px;text-align:center;font-weight:700;color:var(--text-dim);font-size:0.72rem}
.sched-cell{background:var(--card-bg);padding:8px 6px;text-align:center;min-height:65px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;transition:all .2s}
.sched-cell:hover{background:var(--card-hover)}
.sched-cell .cls-name{font-weight:700;font-size:0.72rem;text-transform:uppercase}
.sched-cell .cls-info{font-size:0.58rem;color:var(--text-muted)}
.sched-cell.empty{opacity:0.3}

/* ── TRAINER CARDS ── */
.trainer-card{background:var(--card-bg);border-radius:6px;border-left:4px solid var(--primary);padding:20px;transition:all .3s}
.trainer-card:hover{background:var(--card-hover);transform:translateY(-2px)}
.trainer-avatar{width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,var(--primary),var(--accent));display:flex;align-items:center;justify-content:center;font-size:1.3rem;font-weight:700;color:#fff}
.trainer-name{font-size:1rem;font-weight:700;text-transform:uppercase;letter-spacing:1px}
.trainer-spec{font-size:0.68rem;color:var(--primary);text-transform:uppercase;letter-spacing:1.5px}
.trainer-stats{display:flex;gap:16px;margin-top:10px}
.trainer-stat{text-align:center}
.trainer-stat-val{font-size:1.1rem;font-weight:700;color:var(--primary)}
.trainer-stat-lbl{font-size:0.55rem;color:var(--text-dim);text-transform:uppercase;letter-spacing:0.5px}

/* ── BUTTON ── */
.btn{padding:8px 20px;border-radius:4px;border:none;font-family:inherit;font-size:0.78rem;font-weight:700;cursor:pointer;transition:all .2s;text-transform:uppercase;letter-spacing:1.5px}
.btn-primary{background:var(--primary);color:#fff}
.btn-primary:hover{opacity:0.85;transform:translateY(-1px)}
.btn-ghost{background:transparent;border:1px solid var(--border);color:var(--text-muted)}
.btn-ghost:hover{border-color:var(--primary);color:var(--primary)}

/* ── SETTINGS ── */
.setting-row{display:flex;justify-content:space-between;align-items:center;padding:14px 0;border-bottom:1px solid rgba(42,42,42,0.5)}
.setting-label{font-size:0.82rem;font-weight:600;text-transform:uppercase;letter-spacing:0.5px}
.setting-input{background:var(--content-bg);border:1px solid var(--border);border-radius:4px;padding:7px 14px;color:var(--text);font-size:0.8rem;width:240px;outline:none;font-family:inherit}
.setting-input:focus{border-color:var(--primary)}
.toggle{width:42px;height:22px;border-radius:4px;background:var(--border);position:relative;cursor:pointer;transition:all .3s}
.toggle.on{background:var(--primary)}
.toggle::after{content:'';position:absolute;width:18px;height:18px;border-radius:3px;background:#fff;top:2px;left:2px;transition:all .3s}
.toggle.on::after{left:22px}

/* ── STARS ── */
.stars{color:var(--yellow);font-size:0.8rem;letter-spacing:1px}

/* ── FOOTER ── */
.main-footer{text-align:center;padding:32px 0 16px;font-size:0.65rem;color:var(--text-dim);text-transform:uppercase;letter-spacing:1px}

/* ── NOTIFICATION ── */
.notif{position:fixed;top:70px;right:20px;background:var(--card-bg);border:1px solid var(--primary);border-radius:4px;padding:14px 20px;z-index:9999;display:none;animation:slideIn .3s ease;box-shadow:0 8px 32px rgba(0,0,0,0.5);text-transform:uppercase;letter-spacing:0.5px;font-size:0.8rem}
@keyframes slideIn{from{transform:translateX(100px);opacity:0}to{transform:translateX(0);opacity:1}}

@media(max-width:900px){
  .kpi-grid{grid-template-columns:repeat(2,1fr)}
  .grid-2,.grid-3{grid-template-columns:1fr}
  .schedule-grid{font-size:0.6rem}
}
@media(max-width:700px){
  .sidebar{display:none}
  .topbar{left:0}
  .main{margin-left:0;width:100%;padding:16px;padding-bottom:70px}
  .bottom-nav{display:flex}
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
</style>
</head>
<body>

<!-- SIDEBAR -->
<aside class="sidebar">
  <div class="sidebar-brand">
    <h1>${name}</h1>
    <span>Fitness Center</span>
  </div>
  <nav class="sidebar-nav">
    <a class="sidebar-link active" onclick="showPage('dashboard')" data-page="dashboard"><span class="icon">◉</span><span>Dashboard</span></a>
    <a class="sidebar-link" onclick="showPage('socios')" data-page="socios"><span class="icon">☰</span><span>Socios</span></a>
    <a class="sidebar-link" onclick="showPage('clases')" data-page="clases"><span class="icon">▤</span><span>Clases</span></a>
    <a class="sidebar-link" onclick="showPage('accesos')" data-page="accesos"><span class="icon">⊞</span><span>Accesos</span></a>
    <a class="sidebar-link" onclick="showPage('entrenadores')" data-page="entrenadores"><span class="icon">◎</span><span>Entrenadores</span></a>
    <a class="sidebar-link" onclick="showPage('analytics')" data-page="analytics"><span class="icon">◈</span><span>Analytics</span></a>
    <a class="sidebar-link" onclick="showPage('configuracion')" data-page="configuracion"><span class="icon">⚙</span><span>Configuración</span></a>
  </nav>
  <div class="sidebar-footer">v3.0 · ${name}</div>
</aside>

<!-- TOPBAR -->
<header class="topbar">
  <div class="topbar-title" id="topbar-title">Dashboard</div>
  <div class="topbar-right">
    <input class="topbar-search" type="text" placeholder="Buscar socio...">
    <span class="topbar-badge">5</span>
    <div class="topbar-avatar">GM</div>
  </div>
</header>

<!-- NOTIFICATION -->
<div class="notif" id="notif"></div>

<!-- MAIN CONTENT -->
<main class="main">

<!-- ═══════════════ DASHBOARD ═══════════════ -->
<div class="page active" id="page-dashboard">
  <div class="kpi-grid">
    <div class="kpi"><div class="kpi-icon">💪</div><div class="kpi-value">847</div><div class="kpi-label">Socios Activos</div><div class="kpi-trend up">+38 este mes</div></div>
    <div class="kpi"><div class="kpi-icon">🚪</div><div class="kpi-value">234</div><div class="kpi-label">Check-ins Hoy</div><div class="kpi-trend up">+27 vs ayer</div></div>
    <div class="kpi"><div class="kpi-icon">📅</div><div class="kpi-value">12</div><div class="kpi-label">Clases Hoy</div><div class="kpi-trend up">4 llenas</div></div>
    <div class="kpi"><div class="kpi-icon">💰</div><div class="kpi-value">€28,400</div><div class="kpi-label">Ingresos Mes</div><div class="kpi-trend up">+14% vs anterior</div></div>
  </div>

  <div class="grid-2">
    <!-- Class schedule mini -->
    <div class="card">
      <div class="card-header"><h3>Próximas Clases</h3><span class="badge badge-orange">Hoy</span></div>
      <div style="display:flex;gap:12px;padding:10px 0;border-bottom:1px solid var(--border);align-items:center">
        <div style="min-width:50px;font-weight:700;color:var(--primary)">09:00</div>
        <div style="width:3px;height:36px;border-radius:2px;background:var(--primary);flex-shrink:0"></div>
        <div style="flex:1"><div style="font-weight:700;font-size:0.82rem;text-transform:uppercase">CrossFit</div><div style="font-size:0.7rem;color:var(--text-muted)">Carlos M. · Sala 1 · 22/25</div></div>
        <span class="badge badge-red">Casi llena</span>
      </div>
      <div style="display:flex;gap:12px;padding:10px 0;border-bottom:1px solid var(--border);align-items:center">
        <div style="min-width:50px;font-weight:700;color:var(--primary)">10:30</div>
        <div style="width:3px;height:36px;border-radius:2px;background:var(--accent);flex-shrink:0"></div>
        <div style="flex:1"><div style="font-weight:700;font-size:0.82rem;text-transform:uppercase">Yoga Flow</div><div style="font-size:0.7rem;color:var(--text-muted)">María T. · Sala 2 · 14/20</div></div>
        <span class="badge badge-green">Disponible</span>
      </div>
      <div style="display:flex;gap:12px;padding:10px 0;border-bottom:1px solid var(--border);align-items:center">
        <div style="min-width:50px;font-weight:700;color:var(--primary)">12:00</div>
        <div style="width:3px;height:36px;border-radius:2px;background:var(--primary);flex-shrink:0"></div>
        <div style="flex:1"><div style="font-weight:700;font-size:0.82rem;text-transform:uppercase">HIIT</div><div style="font-size:0.7rem;color:var(--text-muted)">Pedro R. · Sala 1 · 25/25</div></div>
        <span class="badge badge-red">Llena</span>
      </div>
      <div style="display:flex;gap:12px;padding:10px 0;border-bottom:1px solid var(--border);align-items:center">
        <div style="min-width:50px;font-weight:700;color:var(--primary)">17:00</div>
        <div style="width:3px;height:36px;border-radius:2px;background:var(--accent);flex-shrink:0"></div>
        <div style="flex:1"><div style="font-weight:700;font-size:0.82rem;text-transform:uppercase">Boxing</div><div style="font-size:0.7rem;color:var(--text-muted)">Miguel F. · Ring · 16/20</div></div>
        <span class="badge badge-green">Disponible</span>
      </div>
      <div style="display:flex;gap:12px;padding:10px 0;align-items:center">
        <div style="min-width:50px;font-weight:700;color:var(--primary)">18:30</div>
        <div style="width:3px;height:36px;border-radius:2px;background:var(--primary);flex-shrink:0"></div>
        <div style="flex:1"><div style="font-weight:700;font-size:0.82rem;text-transform:uppercase">Spinning</div><div style="font-size:0.7rem;color:var(--text-muted)">Javier D. · Ciclo · 18/25</div></div>
        <span class="badge badge-green">Disponible</span>
      </div>
    </div>

    <!-- Recent check-ins -->
    <div class="card">
      <div class="card-header"><h3>Últimos Check-ins</h3><span class="badge badge-green">En vivo</span></div>
      <div style="display:flex;align-items:center;gap:12px;padding:8px 0;border-bottom:1px solid rgba(42,42,42,0.5)"><span style="font-weight:700;color:var(--primary);min-width:45px">08:42</span><span class="avatar" style="background:linear-gradient(135deg,var(--primary),var(--accent));width:28px;height:28px;font-size:0.55rem">CM</span><span style="flex:1;font-size:0.8rem">Carlos Martínez</span><span class="badge badge-green">QR</span></div>
      <div style="display:flex;align-items:center;gap:12px;padding:8px 0;border-bottom:1px solid rgba(42,42,42,0.5)"><span style="font-weight:700;color:var(--primary);min-width:45px">08:38</span><span class="avatar" style="background:linear-gradient(135deg,#6366f1,#8b5cf6);width:28px;height:28px;font-size:0.55rem">LS</span><span style="flex:1;font-size:0.8rem">Laura Sánchez</span><span class="badge badge-blue">Huella</span></div>
      <div style="display:flex;align-items:center;gap:12px;padding:8px 0;border-bottom:1px solid rgba(42,42,42,0.5)"><span style="font-weight:700;color:var(--primary);min-width:45px">08:35</span><span class="avatar" style="background:linear-gradient(135deg,#10b981,#34d399);width:28px;height:28px;font-size:0.55rem">AG</span><span style="flex:1;font-size:0.8rem">Ana García López</span><span class="badge badge-green">QR</span></div>
      <div style="display:flex;align-items:center;gap:12px;padding:8px 0;border-bottom:1px solid rgba(42,42,42,0.5)"><span style="font-weight:700;color:var(--primary);min-width:45px">08:31</span><span class="avatar" style="background:linear-gradient(135deg,#f59e0b,#f97316);width:28px;height:28px;font-size:0.55rem">MF</span><span style="flex:1;font-size:0.8rem">Miguel Fernández</span><span class="badge badge-blue">Huella</span></div>
      <div style="display:flex;align-items:center;gap:12px;padding:8px 0"><span style="font-weight:700;color:var(--primary);min-width:45px">08:28</span><span class="avatar" style="background:linear-gradient(135deg,#a855f7,#7c3aed);width:28px;height:28px;font-size:0.55rem">SL</span><span style="flex:1;font-size:0.8rem">Sofía López Torres</span><span class="badge badge-yellow">Manual</span></div>
    </div>
  </div>
</div>

<!-- ═══════════════ SOCIOS ═══════════════ -->
<div class="page" id="page-socios">
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
    <h2 style="font-size:1.1rem;font-weight:700;text-transform:uppercase;letter-spacing:2px">Gestión de Socios</h2>
    <button class="btn btn-primary" onclick="showNotif('Nuevo socio registrado')">+ Nuevo Socio</button>
  </div>
  <div class="card">
    <div class="table-wrap">
      <table>
        <thead><tr><th>Socio</th><th>Plan</th><th>Fecha Alta</th><th>Vencimiento</th><th>Estado</th><th>Pagos</th></tr></thead>
        <tbody>
          <tr><td><span class="avatar" style="background:linear-gradient(135deg,var(--primary),var(--accent))">CM</span>Carlos Martínez</td><td><span class="badge badge-orange">Premium</span></td><td>15/01/2026</td><td>15/01/2027</td><td><span class="badge badge-green">Activo</span></td><td style="font-weight:700;color:var(--green)">Al día</td></tr>
          <tr><td><span class="avatar" style="background:linear-gradient(135deg,#6366f1,#8b5cf6)">AG</span>Ana García López</td><td><span class="badge badge-orange">Premium</span></td><td>03/03/2026</td><td>03/03/2027</td><td><span class="badge badge-green">Activo</span></td><td style="font-weight:700;color:var(--green)">Al día</td></tr>
          <tr><td><span class="avatar" style="background:linear-gradient(135deg,#10b981,#34d399)">MF</span>Miguel Fernández</td><td><span class="badge badge-blue">Standard</span></td><td>20/09/2025</td><td>20/09/2026</td><td><span class="badge badge-green">Activo</span></td><td style="font-weight:700;color:var(--green)">Al día</td></tr>
          <tr><td><span class="avatar" style="background:linear-gradient(135deg,#ec4899,#f43f5e)">LS</span>Laura Sánchez</td><td><span class="badge badge-orange">Premium</span></td><td>01/02/2026</td><td>01/02/2027</td><td><span class="badge badge-green">Activo</span></td><td style="font-weight:700;color:var(--green)">Al día</td></tr>
          <tr><td><span class="avatar" style="background:linear-gradient(135deg,#f59e0b,#f97316)">PR</span>Pedro Rodríguez</td><td><span class="badge badge-purple">Basic</span></td><td>10/06/2025</td><td>10/06/2026</td><td><span class="badge badge-yellow">Vencido</span></td><td style="font-weight:700;color:var(--red)">1 pendiente</td></tr>
          <tr><td><span class="avatar" style="background:linear-gradient(135deg,#a855f7,#7c3aed)">SL</span>Sofía López Torres</td><td><span class="badge badge-blue">Standard</span></td><td>22/11/2025</td><td>22/11/2026</td><td><span class="badge badge-green">Activo</span></td><td style="font-weight:700;color:var(--green)">Al día</td></tr>
          <tr><td><span class="avatar" style="background:linear-gradient(135deg,#14b8a6,#06b6d4)">JD</span>Javier Díaz Ruiz</td><td><span class="badge badge-purple">Basic</span></td><td>05/04/2025</td><td>05/04/2026</td><td><span class="badge badge-red">Vencido</span></td><td style="font-weight:700;color:var(--red)">3 pendientes</td></tr>
          <tr><td><span class="avatar" style="background:linear-gradient(135deg,#3b82f6,#6366f1)">MT</span>María Torres Gil</td><td><span class="badge badge-orange">Premium</span></td><td>18/12/2025</td><td>18/12/2026</td><td><span class="badge badge-blue">Congelado</span></td><td style="font-weight:700;color:var(--yellow)">Pausado</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

<!-- ═══════════════ CLASES ═══════════════ -->
<div class="page" id="page-clases">
  <h2 style="font-size:1.1rem;font-weight:700;text-transform:uppercase;letter-spacing:2px;margin-bottom:20px">Horario de Clases</h2>
  <div class="card" style="margin-bottom:20px">
    <div class="card-header"><h3>Semana Actual</h3><span class="badge badge-orange">6 actividades</span></div>
    <div class="schedule-grid">
      <div class="sched-header"></div><div class="sched-header">CrossFit</div><div class="sched-header">Yoga</div><div class="sched-header">HIIT</div><div class="sched-header">Boxing</div><div class="sched-header">Pilates</div><div class="sched-header">Spinning</div>

      <div class="sched-time">07:00</div>
      <div class="sched-cell"><span class="cls-name">CrossFit</span><span class="cls-info">Carlos M.</span><div class="cap-bar" style="width:60px"><div class="cap-fill" style="width:88%;background:var(--primary)"></div></div><span class="cls-info">22/25</span></div>
      <div class="sched-cell empty">—</div>
      <div class="sched-cell"><span class="cls-name">HIIT</span><span class="cls-info">Pedro R.</span><div class="cap-bar" style="width:60px"><div class="cap-fill" style="width:60%;background:var(--accent)"></div></div><span class="cls-info">15/25</span></div>
      <div class="sched-cell empty">—</div>
      <div class="sched-cell empty">—</div>
      <div class="sched-cell empty">—</div>

      <div class="sched-time">09:00</div>
      <div class="sched-cell empty">—</div>
      <div class="sched-cell"><span class="cls-name">Yoga</span><span class="cls-info">María T.</span><div class="cap-bar" style="width:60px"><div class="cap-fill" style="width:70%;background:var(--green)"></div></div><span class="cls-info">14/20</span></div>
      <div class="sched-cell empty">—</div>
      <div class="sched-cell empty">—</div>
      <div class="sched-cell"><span class="cls-name">Pilates</span><span class="cls-info">Sofía L.</span><div class="cap-bar" style="width:60px"><div class="cap-fill" style="width:80%;background:var(--accent)"></div></div><span class="cls-info">12/15</span></div>
      <div class="sched-cell empty">—</div>

      <div class="sched-time">10:30</div>
      <div class="sched-cell"><span class="cls-name">CrossFit</span><span class="cls-info">Carlos M.</span><div class="cap-bar" style="width:60px"><div class="cap-fill" style="width:100%;background:var(--red)"></div></div><span class="cls-info">25/25</span></div>
      <div class="sched-cell empty">—</div>
      <div class="sched-cell"><span class="cls-name">HIIT</span><span class="cls-info">Pedro R.</span><div class="cap-bar" style="width:60px"><div class="cap-fill" style="width:100%;background:var(--red)"></div></div><span class="cls-info">25/25</span></div>
      <div class="sched-cell"><span class="cls-name">Boxing</span><span class="cls-info">Miguel F.</span><div class="cap-bar" style="width:60px"><div class="cap-fill" style="width:75%;background:var(--accent)"></div></div><span class="cls-info">15/20</span></div>
      <div class="sched-cell empty">—</div>
      <div class="sched-cell"><span class="cls-name">Spinning</span><span class="cls-info">Javier D.</span><div class="cap-bar" style="width:60px"><div class="cap-fill" style="width:72%;background:var(--accent)"></div></div><span class="cls-info">18/25</span></div>

      <div class="sched-time">12:00</div>
      <div class="sched-cell empty">—</div>
      <div class="sched-cell"><span class="cls-name">Yoga</span><span class="cls-info">María T.</span><div class="cap-bar" style="width:60px"><div class="cap-fill" style="width:55%;background:var(--green)"></div></div><span class="cls-info">11/20</span></div>
      <div class="sched-cell empty">—</div>
      <div class="sched-cell"><span class="cls-name">Boxing</span><span class="cls-info">Miguel F.</span><div class="cap-bar" style="width:60px"><div class="cap-fill" style="width:60%;background:var(--accent)"></div></div><span class="cls-info">12/20</span></div>
      <div class="sched-cell"><span class="cls-name">Pilates</span><span class="cls-info">Sofía L.</span><div class="cap-bar" style="width:60px"><div class="cap-fill" style="width:67%;background:var(--accent)"></div></div><span class="cls-info">10/15</span></div>
      <div class="sched-cell empty">—</div>

      <div class="sched-time">17:00</div>
      <div class="sched-cell"><span class="cls-name">CrossFit</span><span class="cls-info">Carlos M.</span><div class="cap-bar" style="width:60px"><div class="cap-fill" style="width:80%;background:var(--primary)"></div></div><span class="cls-info">20/25</span></div>
      <div class="sched-cell empty">—</div>
      <div class="sched-cell"><span class="cls-name">HIIT</span><span class="cls-info">Pedro R.</span><div class="cap-bar" style="width:60px"><div class="cap-fill" style="width:92%;background:var(--primary)"></div></div><span class="cls-info">23/25</span></div>
      <div class="sched-cell empty">—</div>
      <div class="sched-cell empty">—</div>
      <div class="sched-cell"><span class="cls-name">Spinning</span><span class="cls-info">Javier D.</span><div class="cap-bar" style="width:60px"><div class="cap-fill" style="width:80%;background:var(--accent)"></div></div><span class="cls-info">20/25</span></div>

      <div class="sched-time">18:30</div>
      <div class="sched-cell"><span class="cls-name">CrossFit</span><span class="cls-info">Carlos M.</span><div class="cap-bar" style="width:60px"><div class="cap-fill" style="width:100%;background:var(--red)"></div></div><span class="cls-info">25/25</span></div>
      <div class="sched-cell"><span class="cls-name">Yoga</span><span class="cls-info">María T.</span><div class="cap-bar" style="width:60px"><div class="cap-fill" style="width:90%;background:var(--green)"></div></div><span class="cls-info">18/20</span></div>
      <div class="sched-cell empty">—</div>
      <div class="sched-cell"><span class="cls-name">Boxing</span><span class="cls-info">Miguel F.</span><div class="cap-bar" style="width:60px"><div class="cap-fill" style="width:100%;background:var(--red)"></div></div><span class="cls-info">20/20</span></div>
      <div class="sched-cell"><span class="cls-name">Pilates</span><span class="cls-info">Sofía L.</span><div class="cap-bar" style="width:60px"><div class="cap-fill" style="width:100%;background:var(--red)"></div></div><span class="cls-info">15/15</span></div>
      <div class="sched-cell"><span class="cls-name">Spinning</span><span class="cls-info">Javier D.</span><div class="cap-bar" style="width:60px"><div class="cap-fill" style="width:84%;background:var(--accent)"></div></div><span class="cls-info">21/25</span></div>
    </div>
  </div>
</div>

<!-- ═══════════════ ACCESOS ═══════════════ -->
<div class="page" id="page-accesos">
  <h2 style="font-size:1.1rem;font-weight:700;text-transform:uppercase;letter-spacing:2px;margin-bottom:20px">Control de Accesos</h2>
  <div class="card">
    <div class="card-header"><h3>Registro de Check-ins — Hoy</h3><span class="badge badge-green">234 entradas</span></div>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Hora</th><th>Socio</th><th>Plan</th><th>Método</th></tr></thead>
        <tbody>
          <tr><td style="font-weight:700;color:var(--primary)">08:42</td><td><span class="avatar" style="background:linear-gradient(135deg,var(--primary),var(--accent));width:28px;height:28px;font-size:0.55rem">CM</span>Carlos Martínez</td><td><span class="badge badge-orange">Premium</span></td><td><span class="badge badge-green">QR</span></td></tr>
          <tr><td style="font-weight:700;color:var(--primary)">08:38</td><td><span class="avatar" style="background:linear-gradient(135deg,#ec4899,#f43f5e);width:28px;height:28px;font-size:0.55rem">LS</span>Laura Sánchez</td><td><span class="badge badge-orange">Premium</span></td><td><span class="badge badge-blue">Huella</span></td></tr>
          <tr><td style="font-weight:700;color:var(--primary)">08:35</td><td><span class="avatar" style="background:linear-gradient(135deg,#6366f1,#8b5cf6);width:28px;height:28px;font-size:0.55rem">AG</span>Ana García López</td><td><span class="badge badge-orange">Premium</span></td><td><span class="badge badge-green">QR</span></td></tr>
          <tr><td style="font-weight:700;color:var(--primary)">08:31</td><td><span class="avatar" style="background:linear-gradient(135deg,#10b981,#34d399);width:28px;height:28px;font-size:0.55rem">MF</span>Miguel Fernández</td><td><span class="badge badge-blue">Standard</span></td><td><span class="badge badge-blue">Huella</span></td></tr>
          <tr><td style="font-weight:700;color:var(--primary)">08:28</td><td><span class="avatar" style="background:linear-gradient(135deg,#a855f7,#7c3aed);width:28px;height:28px;font-size:0.55rem">SL</span>Sofía López Torres</td><td><span class="badge badge-blue">Standard</span></td><td><span class="badge badge-yellow">Manual</span></td></tr>
          <tr><td style="font-weight:700;color:var(--primary)">08:22</td><td><span class="avatar" style="background:linear-gradient(135deg,#f59e0b,#f97316);width:28px;height:28px;font-size:0.55rem">PR</span>Pedro Rodríguez</td><td><span class="badge badge-purple">Basic</span></td><td><span class="badge badge-green">QR</span></td></tr>
          <tr><td style="font-weight:700;color:var(--primary)">08:15</td><td><span class="avatar" style="background:linear-gradient(135deg,#14b8a6,#06b6d4);width:28px;height:28px;font-size:0.55rem">JD</span>Javier Díaz Ruiz</td><td><span class="badge badge-purple">Basic</span></td><td><span class="badge badge-blue">Huella</span></td></tr>
          <tr><td style="font-weight:700;color:var(--primary)">08:10</td><td><span class="avatar" style="background:linear-gradient(135deg,#3b82f6,#6366f1);width:28px;height:28px;font-size:0.55rem">MT</span>María Torres Gil</td><td><span class="badge badge-orange">Premium</span></td><td><span class="badge badge-green">QR</span></td></tr>
          <tr><td style="font-weight:700;color:var(--primary)">07:58</td><td><span class="avatar" style="background:linear-gradient(135deg,#ef4444,#f97316);width:28px;height:28px;font-size:0.55rem">RV</span>Roberto Vega</td><td><span class="badge badge-blue">Standard</span></td><td><span class="badge badge-yellow">Manual</span></td></tr>
          <tr><td style="font-weight:700;color:var(--primary)">07:45</td><td><span class="avatar" style="background:linear-gradient(135deg,#10b981,#06b6d4);width:28px;height:28px;font-size:0.55rem">EP</span>Elena Prieto</td><td><span class="badge badge-orange">Premium</span></td><td><span class="badge badge-green">QR</span></td></tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

<!-- ═══════════════ ENTRENADORES ═══════════════ -->
<div class="page" id="page-entrenadores">
  <h2 style="font-size:1.1rem;font-weight:700;text-transform:uppercase;letter-spacing:2px;margin-bottom:20px">Nuestros Entrenadores</h2>
  <div class="grid-3">
    <div class="trainer-card">
      <div style="display:flex;align-items:center;gap:14px;margin-bottom:10px">
        <div class="trainer-avatar">CM</div>
        <div><div class="trainer-name">Carlos Martínez</div><div class="trainer-spec">CrossFit & Funcional</div></div>
      </div>
      <div class="stars">★★★★★</div>
      <div class="trainer-stats">
        <div class="trainer-stat"><div class="trainer-stat-val">18</div><div class="trainer-stat-lbl">Clases/Sem</div></div>
        <div class="trainer-stat"><div class="trainer-stat-val">45</div><div class="trainer-stat-lbl">Clientes</div></div>
        <div class="trainer-stat"><div class="trainer-stat-val">4.9</div><div class="trainer-stat-lbl">Rating</div></div>
      </div>
    </div>
    <div class="trainer-card">
      <div style="display:flex;align-items:center;gap:14px;margin-bottom:10px">
        <div class="trainer-avatar" style="background:linear-gradient(135deg,#a855f7,#ec4899)">MT</div>
        <div><div class="trainer-name">María Torres</div><div class="trainer-spec">Yoga & Mindfulness</div></div>
      </div>
      <div class="stars">★★★★★</div>
      <div class="trainer-stats">
        <div class="trainer-stat"><div class="trainer-stat-val">14</div><div class="trainer-stat-lbl">Clases/Sem</div></div>
        <div class="trainer-stat"><div class="trainer-stat-val">38</div><div class="trainer-stat-lbl">Clientes</div></div>
        <div class="trainer-stat"><div class="trainer-stat-val">4.8</div><div class="trainer-stat-lbl">Rating</div></div>
      </div>
    </div>
    <div class="trainer-card">
      <div style="display:flex;align-items:center;gap:14px;margin-bottom:10px">
        <div class="trainer-avatar" style="background:linear-gradient(135deg,#f59e0b,#ef4444)">PR</div>
        <div><div class="trainer-name">Pedro Rodríguez</div><div class="trainer-spec">HIIT & Cardio</div></div>
      </div>
      <div class="stars">★★★★☆</div>
      <div class="trainer-stats">
        <div class="trainer-stat"><div class="trainer-stat-val">16</div><div class="trainer-stat-lbl">Clases/Sem</div></div>
        <div class="trainer-stat"><div class="trainer-stat-val">52</div><div class="trainer-stat-lbl">Clientes</div></div>
        <div class="trainer-stat"><div class="trainer-stat-val">4.7</div><div class="trainer-stat-lbl">Rating</div></div>
      </div>
    </div>
    <div class="trainer-card">
      <div style="display:flex;align-items:center;gap:14px;margin-bottom:10px">
        <div class="trainer-avatar" style="background:linear-gradient(135deg,#3b82f6,#6366f1)">MF</div>
        <div><div class="trainer-name">Miguel Fernández</div><div class="trainer-spec">Boxing & MMA</div></div>
      </div>
      <div class="stars">★★★★★</div>
      <div class="trainer-stats">
        <div class="trainer-stat"><div class="trainer-stat-val">12</div><div class="trainer-stat-lbl">Clases/Sem</div></div>
        <div class="trainer-stat"><div class="trainer-stat-val">30</div><div class="trainer-stat-lbl">Clientes</div></div>
        <div class="trainer-stat"><div class="trainer-stat-val">4.9</div><div class="trainer-stat-lbl">Rating</div></div>
      </div>
    </div>
    <div class="trainer-card">
      <div style="display:flex;align-items:center;gap:14px;margin-bottom:10px">
        <div class="trainer-avatar" style="background:linear-gradient(135deg,#10b981,#14b8a6)">SL</div>
        <div><div class="trainer-name">Sofía López</div><div class="trainer-spec">Pilates & Rehab</div></div>
      </div>
      <div class="stars">★★★★★</div>
      <div class="trainer-stats">
        <div class="trainer-stat"><div class="trainer-stat-val">10</div><div class="trainer-stat-lbl">Clases/Sem</div></div>
        <div class="trainer-stat"><div class="trainer-stat-val">28</div><div class="trainer-stat-lbl">Clientes</div></div>
        <div class="trainer-stat"><div class="trainer-stat-val">4.8</div><div class="trainer-stat-lbl">Rating</div></div>
      </div>
    </div>
    <div class="trainer-card">
      <div style="display:flex;align-items:center;gap:14px;margin-bottom:10px">
        <div class="trainer-avatar" style="background:linear-gradient(135deg,#06b6d4,#3b82f6)">JD</div>
        <div><div class="trainer-name">Javier Díaz</div><div class="trainer-spec">Spinning & Resistencia</div></div>
      </div>
      <div class="stars">★★★★☆</div>
      <div class="trainer-stats">
        <div class="trainer-stat"><div class="trainer-stat-val">12</div><div class="trainer-stat-lbl">Clases/Sem</div></div>
        <div class="trainer-stat"><div class="trainer-stat-val">34</div><div class="trainer-stat-lbl">Clientes</div></div>
        <div class="trainer-stat"><div class="trainer-stat-val">4.6</div><div class="trainer-stat-lbl">Rating</div></div>
      </div>
    </div>
  </div>
</div>

<!-- ═══════════════ ANALYTICS ═══════════════ -->
<div class="page" id="page-analytics">
  <h2 style="font-size:1.1rem;font-weight:700;text-transform:uppercase;letter-spacing:2px;margin-bottom:20px">Analytics del Centro</h2>
  <div class="kpi-grid" style="grid-template-columns:repeat(3,1fr);margin-bottom:24px">
    <div class="kpi" style="text-align:center"><div class="kpi-icon">🔄</div><div class="kpi-value">82%</div><div class="kpi-label">Retención</div></div>
    <div class="kpi" style="text-align:center"><div class="kpi-icon">📊</div><div class="kpi-value">67%</div><div class="kpi-label">Asistencia Media</div></div>
    <div class="kpi" style="text-align:center"><div class="kpi-icon">⭐</div><div class="kpi-value">72</div><div class="kpi-label">NPS Score</div></div>
  </div>
  <div class="grid-2">
    <!-- Attendance by hour -->
    <div class="card">
      <div class="card-header"><h3>Asistencia por Hora</h3></div>
      <div class="bar-chart-item"><div class="bar-chart-label"><span>06:00 - 08:00</span><span style="font-weight:700">87%</span></div><div class="bar-chart-track"><div class="bar-chart-fill" style="width:87%;background:var(--primary)"></div></div></div>
      <div class="bar-chart-item"><div class="bar-chart-label"><span>08:00 - 10:00</span><span style="font-weight:700">64%</span></div><div class="bar-chart-track"><div class="bar-chart-fill" style="width:64%;background:var(--accent)"></div></div></div>
      <div class="bar-chart-item"><div class="bar-chart-label"><span>10:00 - 12:00</span><span style="font-weight:700">42%</span></div><div class="bar-chart-track"><div class="bar-chart-fill" style="width:42%;background:var(--accent)"></div></div></div>
      <div class="bar-chart-item"><div class="bar-chart-label"><span>12:00 - 14:00</span><span style="font-weight:700">38%</span></div><div class="bar-chart-track"><div class="bar-chart-fill" style="width:38%;background:var(--accent)"></div></div></div>
      <div class="bar-chart-item"><div class="bar-chart-label"><span>17:00 - 19:00</span><span style="font-weight:700">92%</span></div><div class="bar-chart-track"><div class="bar-chart-fill" style="width:92%;background:var(--primary)"></div></div></div>
      <div class="bar-chart-item"><div class="bar-chart-label"><span>19:00 - 21:00</span><span style="font-weight:700">78%</span></div><div class="bar-chart-track"><div class="bar-chart-fill" style="width:78%;background:var(--primary)"></div></div></div>
    </div>
    <!-- Popular classes -->
    <div class="card">
      <div class="card-header"><h3>Clases Populares</h3></div>
      <div class="bar-chart-item"><div class="bar-chart-label"><span>CrossFit</span><span style="font-weight:700">94%</span></div><div class="bar-chart-track"><div class="bar-chart-fill" style="width:94%;background:var(--primary)"></div></div></div>
      <div class="bar-chart-item"><div class="bar-chart-label"><span>HIIT</span><span style="font-weight:700">88%</span></div><div class="bar-chart-track"><div class="bar-chart-fill" style="width:88%;background:var(--primary)"></div></div></div>
      <div class="bar-chart-item"><div class="bar-chart-label"><span>Yoga Flow</span><span style="font-weight:700">82%</span></div><div class="bar-chart-track"><div class="bar-chart-fill" style="width:82%;background:var(--accent)"></div></div></div>
      <div class="bar-chart-item"><div class="bar-chart-label"><span>Boxing</span><span style="font-weight:700">76%</span></div><div class="bar-chart-track"><div class="bar-chart-fill" style="width:76%;background:var(--accent)"></div></div></div>
      <div class="bar-chart-item"><div class="bar-chart-label"><span>Spinning</span><span style="font-weight:700">71%</span></div><div class="bar-chart-track"><div class="bar-chart-fill" style="width:71%;background:var(--accent)"></div></div></div>
      <div class="bar-chart-item"><div class="bar-chart-label"><span>Pilates</span><span style="font-weight:700">65%</span></div><div class="bar-chart-track"><div class="bar-chart-fill" style="width:65%;background:var(--accent)"></div></div></div>
    </div>
  </div>
</div>

<!-- ═══════════════ CONFIGURACION ═══════════════ -->
<div class="page" id="page-configuracion">
  <h2 style="font-size:1.1rem;font-weight:700;text-transform:uppercase;letter-spacing:2px;margin-bottom:20px">Configuración</h2>
  <div class="card">
    <div class="setting-row"><span class="setting-label">Nombre del centro</span><input class="setting-input" type="text" value="${name}"></div>
    <div class="setting-row"><span class="setting-label">Email de contacto</span><input class="setting-input" type="email" value="info@${name.toLowerCase().replace(/\\s+/g, '')}.com"></div>
    <div class="setting-row"><span class="setting-label">Hora apertura</span><input class="setting-input" type="text" value="06:00"></div>
    <div class="setting-row"><span class="setting-label">Hora cierre</span><input class="setting-input" type="text" value="23:00"></div>
    <div class="setting-row"><span class="setting-label">Capacidad máxima</span><input class="setting-input" type="text" value="150 personas"></div>
    <div class="setting-row"><span class="setting-label">Acceso QR automático</span><div class="toggle on" onclick="this.classList.toggle('on')"></div></div>
    <div class="setting-row"><span class="setting-label">Notificaciones de vencimiento</span><div class="toggle on" onclick="this.classList.toggle('on')"></div></div>
    <div class="setting-row"><span class="setting-label">Reserva clases online</span><div class="toggle on" onclick="this.classList.toggle('on')"></div></div>
    <div class="setting-row"><span class="setting-label">Modo mantenimiento</span><div class="toggle" onclick="this.classList.toggle('on')"></div></div>
    <div style="margin-top:20px;display:flex;gap:10px">
      <button class="btn btn-primary" onclick="showNotif('Configuración guardada correctamente')">Guardar Cambios</button>
      <button class="btn btn-ghost">Cancelar</button>
    </div>
  </div>
</div>

<!-- FOOTER -->
<div class="main-footer">&copy; 2026 ${name} &mdash; Powered by <strong style="color:var(--primary)">Kerno Studio</strong></div>
</main>

<!-- Bottom Nav (mobile only) -->
<nav class="bottom-nav">
  <button class="active" onclick="showPage('dashboard')"><span class="bnav-icon">◉</span>Inicio</button>
  <button onclick="showPage('socios')"><span class="bnav-icon">◎</span>Socios</button>
  <button onclick="showPage('clases')"><span class="bnav-icon">☰</span>Clases</button>
  <button onclick="showPage('accesos')"><span class="bnav-icon">▤</span>Accesos</button>
  <button onclick="showPage('entrenadores')"><span class="bnav-icon">⊞</span>Trainers</button>
  <button onclick="showPage('analytics')"><span class="bnav-icon">◈</span>Analytics</button>
</nav>

<script>
function showPage(id){window.scrollTo(0,0);
  document.querySelectorAll('.page').forEach(function(p){p.classList.remove('active')});
  document.querySelectorAll('.sidebar-link').forEach(function(l){l.classList.remove('active')});
  document.querySelectorAll('.bottom-nav button').forEach(b=>b.classList.remove('active'));
  var page=document.getElementById('page-'+id);
  if(page)page.classList.add('active');
  var link=document.querySelector('[data-page="'+id+'"]');
  if(link)link.classList.add('active');
  var bnav=document.querySelector('.bottom-nav button[onclick*="'+id+'"]');
  if(bnav)bnav.classList.add('active');
  var titles={dashboard:'DASHBOARD',socios:'SOCIOS',clases:'CLASES',accesos:'ACCESOS',entrenadores:'ENTRENADORES',analytics:'ANALYTICS',configuracion:'CONFIGURACIÓN'};
  document.getElementById('topbar-title').textContent=titles[id]||id.toUpperCase();
}
function showNotif(msg){
  var n=document.getElementById('notif');
  n.textContent=msg;
  n.style.display='block';
  setTimeout(function(){n.style.display='none'},2500);
}
</script>
</body>
</html>`
  },
}
