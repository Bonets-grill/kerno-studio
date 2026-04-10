import type { TemplateDefinition, TemplateCustomization } from '../types'

export const clinicTemplate: TemplateDefinition = {
  meta: {
    id: 'clinic',
    name: 'Clínica Salud Pro',
    industries: ['clinic', 'clínica', 'dental', 'médico', 'doctor', 'hospital', 'salud', 'health', 'pacientes', 'patients', 'veterinari'],
    projectTypes: ['landing', 'mvp', 'system', 'saas'],
    sections: ['dashboard', 'citas', 'pacientes', 'historial', 'facturacion', 'analytics', 'configuracion'],
    description: 'Dashboard profesional para clínicas y centros de salud con sidebar, KPIs, agenda, pacientes, historial, facturación y analytics.',
  },

  render(c: TemplateCustomization): string {
    const name = c.businessName
    const primary = c.primaryColor || '#0d9488'
    const accent = c.accentColor || '#f59e0b'

    return `<!DOCTYPE html>
<html lang="${c.locale || 'es'}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${name} — Dashboard</title>
<link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;600;700;800;900&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --primary:${primary};
  --accent:${accent};
  --sidebar-bg:#0f1923;
  --content-bg:#0c1520;
  --card-bg:#111d2b;
  --card-hover:#162536;
  --border:#1c2e42;
  --text:#e8ecf1;
  --text-muted:#8fa3b8;
  --text-dim:#5a7490;
  --green:#10b981;
  --red:#ef4444;
  --yellow:#f59e0b;
  --blue:#3b82f6;
  --purple:#a855f7;
}
html{scroll-behavior:smooth}
body{font-family:'Nunito Sans',sans-serif;background:var(--content-bg);color:var(--text);display:flex;min-height:100vh;overflow-x:hidden;font-size:14px;line-height:1.5}

/* ── SIDEBAR ── */
.sidebar{width:250px;background:var(--sidebar-bg);position:fixed;top:0;left:0;height:100vh;display:flex;flex-direction:column;border-right:1px solid var(--border);z-index:100}
.sidebar-brand{padding:24px 20px;border-bottom:1px solid var(--border)}
.sidebar-brand h1{font-size:1.1rem;font-weight:800;color:var(--text);letter-spacing:-0.3px}
.sidebar-brand span{font-size:0.65rem;color:var(--text-dim);display:block;margin-top:2px}
.sidebar-nav{flex:1;padding:12px 0;overflow-y:auto}
.sidebar-link{display:flex;align-items:center;gap:12px;padding:10px 20px;color:var(--text-muted);font-size:0.82rem;font-weight:600;cursor:pointer;transition:all .2s;border-left:3px solid transparent;text-decoration:none}
.sidebar-link:hover{color:var(--text);background:rgba(255,255,255,0.03)}
.sidebar-link.active{color:var(--primary);background:rgba(13,148,136,0.08);border-left-color:var(--primary)}
.sidebar-link .icon{font-size:1rem;width:20px;text-align:center}
.sidebar-footer{padding:16px 20px;border-top:1px solid var(--border);font-size:0.65rem;color:var(--text-dim)}

/* ── TOP NAVBAR ── */
.topbar{position:fixed;top:0;left:250px;right:0;height:56px;background:var(--sidebar-bg);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;padding:0 28px;z-index:99}
.topbar-title{font-size:0.88rem;font-weight:700;color:var(--text)}
.topbar-right{display:flex;align-items:center;gap:16px}
.topbar-avatar{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,var(--primary),var(--accent));display:flex;align-items:center;justify-content:center;font-weight:800;font-size:0.7rem;color:#fff}
.topbar-badge{background:var(--red);color:#fff;font-size:0.6rem;padding:2px 6px;border-radius:10px;font-weight:700}
.topbar-search{background:var(--content-bg);border:1px solid var(--border);border-radius:8px;padding:6px 14px;color:var(--text);font-size:0.78rem;width:220px;outline:none;font-family:inherit}
.topbar-search:focus{border-color:var(--primary)}

/* ── MAIN CONTENT ── */
.main{margin-left:250px;margin-top:56px;padding:28px;min-height:calc(100vh - 56px);width:calc(100% - 250px)}
.page{display:none}
.page.active{display:block}

/* ── CARDS ── */
.card{background:var(--card-bg);border-radius:14px;padding:22px;border:1px solid var(--border);transition:all .25s}
.card:hover{border-color:rgba(13,148,136,0.3);background:var(--card-hover)}
.card-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px}
.card-header h3{font-size:0.88rem;font-weight:700}

/* ── KPI ── */
.kpi-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px}
.kpi{background:var(--card-bg);border-radius:14px;padding:20px;border:1px solid var(--border);transition:all .25s}
.kpi:hover{border-color:var(--primary);transform:translateY(-2px)}
.kpi-icon{font-size:1.5rem;margin-bottom:8px}
.kpi-value{font-size:1.8rem;font-weight:900;color:var(--text);line-height:1}
.kpi-label{font-size:0.72rem;color:var(--text-muted);margin-top:4px;font-weight:600}
.kpi-trend{font-size:0.65rem;margin-top:6px;font-weight:700}
.kpi-trend.up{color:var(--green)}
.kpi-trend.down{color:var(--red)}

/* ── BADGES ── */
.badge{display:inline-block;padding:3px 10px;border-radius:20px;font-size:0.68rem;font-weight:700;letter-spacing:0.3px}
.badge-green{background:rgba(16,185,129,0.15);color:var(--green)}
.badge-red{background:rgba(239,68,68,0.15);color:var(--red)}
.badge-yellow{background:rgba(245,158,11,0.15);color:var(--yellow)}
.badge-blue{background:rgba(59,130,246,0.15);color:var(--blue)}
.badge-purple{background:rgba(168,85,247,0.15);color:var(--purple)}
.badge-teal{background:rgba(13,148,136,0.15);color:var(--primary)}

/* ── TABLE ── */
.table-wrap{overflow-x:auto}
table{width:100%;border-collapse:collapse}
th{text-align:left;padding:10px 14px;font-size:0.68rem;font-weight:700;color:var(--text-dim);text-transform:uppercase;letter-spacing:0.8px;border-bottom:1px solid var(--border)}
td{padding:12px 14px;font-size:0.8rem;border-bottom:1px solid rgba(28,46,66,0.5);vertical-align:middle}
tr:hover td{background:rgba(255,255,255,0.02)}
.avatar{width:32px;height:32px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-weight:800;font-size:0.65rem;color:#fff;margin-right:10px;vertical-align:middle;flex-shrink:0}

/* ── TIMELINE ── */
.timeline-item{display:flex;gap:14px;padding:12px 0;border-bottom:1px solid rgba(28,46,66,0.4)}
.timeline-time{min-width:55px;font-weight:800;font-size:0.88rem;color:var(--primary)}
.timeline-bar{width:3px;border-radius:2px;background:var(--primary);flex-shrink:0}
.timeline-content{flex:1}
.timeline-title{font-weight:700;font-size:0.82rem}
.timeline-sub{font-size:0.72rem;color:var(--text-muted)}

/* ── ALERTS ── */
.alert-item{display:flex;align-items:center;gap:12px;padding:10px 14px;border-radius:10px;margin-bottom:6px;background:rgba(255,255,255,0.02);border:1px solid rgba(28,46,66,0.4)}
.alert-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}

/* ── GRID ── */
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}

/* ── DETAIL GRID ── */
.detail-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.detail-item label{font-size:0.6rem;color:var(--text-dim);text-transform:uppercase;letter-spacing:1px;display:block;margin-bottom:2px}
.detail-item span{font-weight:700;font-size:0.85rem}

/* ── BAR CHART ── */
.bar-chart-item{margin-bottom:12px}
.bar-chart-label{display:flex;justify-content:space-between;font-size:0.75rem;margin-bottom:4px}
.bar-chart-track{height:8px;background:rgba(255,255,255,0.05);border-radius:4px;overflow:hidden}
.bar-chart-fill{height:100%;border-radius:4px;transition:width .8s ease}

/* ── BUTTON ── */
.btn{padding:8px 20px;border-radius:10px;border:none;font-family:inherit;font-size:0.78rem;font-weight:700;cursor:pointer;transition:all .2s}
.btn-primary{background:var(--primary);color:#fff}
.btn-primary:hover{opacity:0.85;transform:translateY(-1px)}
.btn-ghost{background:transparent;border:1px solid var(--border);color:var(--text-muted)}
.btn-ghost:hover{border-color:var(--primary);color:var(--primary)}

/* ── SETTINGS ── */
.setting-row{display:flex;justify-content:space-between;align-items:center;padding:14px 0;border-bottom:1px solid rgba(28,46,66,0.4)}
.setting-label{font-size:0.82rem;font-weight:600}
.setting-input{background:var(--content-bg);border:1px solid var(--border);border-radius:8px;padding:7px 14px;color:var(--text);font-size:0.8rem;width:240px;outline:none;font-family:inherit}
.setting-input:focus{border-color:var(--primary)}
.toggle{width:42px;height:22px;border-radius:11px;background:var(--border);position:relative;cursor:pointer;transition:all .3s}
.toggle.on{background:var(--primary)}
.toggle::after{content:'';position:absolute;width:18px;height:18px;border-radius:50%;background:#fff;top:2px;left:2px;transition:all .3s}
.toggle.on::after{left:22px}

/* ── FOOTER ── */
.main-footer{text-align:center;padding:32px 0 16px;font-size:0.7rem;color:var(--text-dim)}

/* ── NOTIFICATION ── */
.notif{position:fixed;top:70px;right:20px;background:var(--card-bg);border:1px solid var(--primary);border-radius:12px;padding:14px 20px;z-index:9999;display:none;animation:slideIn .3s ease;box-shadow:0 8px 32px rgba(0,0,0,0.4)}
@keyframes slideIn{from{transform:translateX(100px);opacity:0}to{transform:translateX(0);opacity:1}}

@media(max-width:900px){
  .kpi-grid{grid-template-columns:repeat(2,1fr)}
  .grid-2,.grid-3{grid-template-columns:1fr}
}
@media(max-width:700px){
  .sidebar{width:60px}
  .sidebar-brand h1,.sidebar-link span,.sidebar-footer{display:none}
  .sidebar-link{justify-content:center;padding:12px 0}
  .topbar{left:60px}
  .main{margin-left:60px;width:calc(100% - 60px);padding:16px}
}
</style>
</head>
<body>

<!-- SIDEBAR -->
<aside class="sidebar">
  <div class="sidebar-brand">
    <h1>${name}</h1>
    <span>Panel de Gestión Clínica</span>
  </div>
  <nav class="sidebar-nav">
    <a class="sidebar-link active" onclick="showPage('dashboard')" data-page="dashboard"><span class="icon">◉</span><span>Dashboard</span></a>
    <a class="sidebar-link" onclick="showPage('citas')" data-page="citas"><span class="icon">◎</span><span>Citas</span></a>
    <a class="sidebar-link" onclick="showPage('pacientes')" data-page="pacientes"><span class="icon">☰</span><span>Pacientes</span></a>
    <a class="sidebar-link" onclick="showPage('historial')" data-page="historial"><span class="icon">▤</span><span>Historial</span></a>
    <a class="sidebar-link" onclick="showPage('facturacion')" data-page="facturacion"><span class="icon">⊞</span><span>Facturación</span></a>
    <a class="sidebar-link" onclick="showPage('analytics')" data-page="analytics"><span class="icon">◈</span><span>Analytics</span></a>
    <a class="sidebar-link" onclick="showPage('configuracion')" data-page="configuracion"><span class="icon">⚙</span><span>Configuración</span></a>
  </nav>
  <div class="sidebar-footer">v2.1 · ${name}</div>
</aside>

<!-- TOPBAR -->
<header class="topbar">
  <div class="topbar-title" id="topbar-title">Dashboard</div>
  <div class="topbar-right">
    <input class="topbar-search" type="text" placeholder="Buscar paciente, cita...">
    <span class="topbar-badge">3</span>
    <div class="topbar-avatar">DR</div>
  </div>
</header>

<!-- NOTIFICATION -->
<div class="notif" id="notif"></div>

<!-- MAIN CONTENT -->
<main class="main">

<!-- ═══════════════ DASHBOARD ═══════════════ -->
<div class="page active" id="page-dashboard">
  <div class="kpi-grid">
    <div class="kpi">
      <div class="kpi-icon">📅</div>
      <div class="kpi-value">18</div>
      <div class="kpi-label">Citas Hoy</div>
      <div class="kpi-trend up">+4 vs ayer</div>
    </div>
    <div class="kpi">
      <div class="kpi-icon">👥</div>
      <div class="kpi-value">342</div>
      <div class="kpi-label">Pacientes Activos</div>
      <div class="kpi-trend up">+12 este mes</div>
    </div>
    <div class="kpi">
      <div class="kpi-icon">⭐</div>
      <div class="kpi-value">96%</div>
      <div class="kpi-label">Satisfacción</div>
      <div class="kpi-trend up">+2% vs mes anterior</div>
    </div>
    <div class="kpi">
      <div class="kpi-icon">💰</div>
      <div class="kpi-value">€12,450</div>
      <div class="kpi-label">Ingresos Mes</div>
      <div class="kpi-trend up">+8% crecimiento</div>
    </div>
  </div>

  <div class="grid-2">
    <!-- Appointments timeline -->
    <div class="card">
      <div class="card-header"><h3>Próximas Citas</h3><span class="badge badge-teal">Hoy</span></div>
      <div class="timeline-item">
        <div class="timeline-time">09:00</div><div class="timeline-bar"></div>
        <div class="timeline-content"><div class="timeline-title">Ana García Moreno</div><div class="timeline-sub">Revisión general · Dra. Martín · 30 min</div></div>
      </div>
      <div class="timeline-item">
        <div class="timeline-time">09:45</div><div class="timeline-bar"></div>
        <div class="timeline-content"><div class="timeline-title">Pedro Sánchez López</div><div class="timeline-sub">Tratamiento dental · Dr. Ruiz · 45 min</div></div>
      </div>
      <div class="timeline-item">
        <div class="timeline-time">10:30</div><div class="timeline-bar"></div>
        <div class="timeline-content"><div class="timeline-title">María Fernández Vila</div><div class="timeline-sub">Ortodoncia ajuste · Dra. López · 30 min</div></div>
      </div>
      <div class="timeline-item">
        <div class="timeline-time">11:15</div><div class="timeline-bar"></div>
        <div class="timeline-content"><div class="timeline-title">Carlos López Ruiz</div><div class="timeline-sub">Limpieza dental · Dra. Martín · 30 min</div></div>
      </div>
      <div class="timeline-item" style="border-bottom:none">
        <div class="timeline-time">12:00</div><div class="timeline-bar"></div>
        <div class="timeline-content"><div class="timeline-title">Laura Díaz Torres</div><div class="timeline-sub">Revisión + radiografía · Dr. Ruiz · 45 min</div></div>
      </div>
    </div>

    <!-- Alerts -->
    <div class="card">
      <div class="card-header"><h3>Alertas del Día</h3><span class="badge badge-red">3 activas</span></div>
      <div class="alert-item">
        <div class="alert-dot" style="background:var(--red)"></div>
        <div style="flex:1;font-size:0.8rem">Paciente López Ruiz — alergia a penicilina (cita 11:15)</div>
        <span class="badge badge-red">Urgente</span>
      </div>
      <div class="alert-item">
        <div class="alert-dot" style="background:var(--yellow)"></div>
        <div style="flex:1;font-size:0.8rem">Resultados de laboratorio pendientes: García M.</div>
        <span class="badge badge-yellow">Lab</span>
      </div>
      <div class="alert-item">
        <div class="alert-dot" style="background:var(--blue)"></div>
        <div style="flex:1;font-size:0.8rem">3 pacientes sin confirmar cita de mañana</div>
        <span class="badge badge-blue">Recordatorio</span>
      </div>
    </div>
  </div>
</div>

<!-- ═══════════════ CITAS ═══════════════ -->
<div class="page" id="page-citas">
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
    <h2 style="font-size:1.1rem;font-weight:800">Agenda de Citas — Hoy</h2>
    <button class="btn btn-primary" onclick="showNotif('Nueva cita programada correctamente')">+ Nueva Cita</button>
  </div>
  <div class="card">
    <div class="table-wrap">
      <table>
        <thead><tr><th>Hora</th><th>Paciente</th><th>Tratamiento</th><th>Doctor</th><th>Duración</th><th>Estado</th></tr></thead>
        <tbody>
          <tr><td style="font-weight:800;color:var(--primary)">08:30</td><td><span class="avatar" style="background:linear-gradient(135deg,var(--primary),#06b6d4)">AG</span>Ana García Moreno</td><td>Revisión general</td><td>Dra. Martín</td><td>30 min</td><td><span class="badge badge-green">Completada</span></td></tr>
          <tr><td style="font-weight:800;color:var(--primary)">09:00</td><td><span class="avatar" style="background:linear-gradient(135deg,#6366f1,#8b5cf6)">PS</span>Pedro Sánchez López</td><td>Empaste molar 36</td><td>Dr. Ruiz</td><td>45 min</td><td><span class="badge badge-green">Completada</span></td></tr>
          <tr style="background:rgba(13,148,136,0.04)"><td style="font-weight:800;color:var(--accent)">09:45</td><td><span class="avatar" style="background:linear-gradient(135deg,#ec4899,#f43f5e)">MF</span>María Fernández Vila</td><td>Ortodoncia — ajuste</td><td>Dra. López</td><td>30 min</td><td><span class="badge badge-yellow">En sala</span></td></tr>
          <tr><td style="font-weight:800;color:var(--primary)">10:30</td><td><span class="avatar" style="background:linear-gradient(135deg,#14b8a6,#06b6d4)">CL</span>Carlos López Ruiz</td><td>Limpieza dental</td><td>Dra. Martín</td><td>30 min</td><td><span class="badge badge-blue">Confirmada</span></td></tr>
          <tr><td style="font-weight:800;color:var(--primary)">11:15</td><td><span class="avatar" style="background:linear-gradient(135deg,#f59e0b,#f97316)">LD</span>Laura Díaz Torres</td><td>Revisión + radiografía</td><td>Dr. Ruiz</td><td>45 min</td><td><span class="badge badge-blue">Confirmada</span></td></tr>
          <tr><td style="font-weight:800;color:var(--primary)">12:00</td><td><span class="avatar" style="background:linear-gradient(135deg,#a855f7,#7c3aed)">JR</span>Javier Rodríguez Pérez</td><td>Endodoncia pieza 14</td><td>Dra. López</td><td>60 min</td><td><span class="badge badge-blue">Confirmada</span></td></tr>
          <tr><td style="font-weight:800;color:var(--primary)">13:00</td><td><span class="avatar" style="background:linear-gradient(135deg,#10b981,#34d399)">SM</span>Sofía Martínez García</td><td>Urgencia — dolor agudo</td><td>Dra. Martín</td><td>30 min</td><td><span class="badge badge-blue">Confirmada</span></td></tr>
          <tr><td style="font-weight:800;color:var(--text-dim)">14:00</td><td><span class="avatar" style="background:var(--border)">RN</span>Roberto Navarro Pinto</td><td>Implante — valoración</td><td>Dr. Ruiz</td><td>45 min</td><td><span class="badge badge-red">No show</span></td></tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

<!-- ═══════════════ PACIENTES ═══════════════ -->
<div class="page" id="page-pacientes">
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
    <h2 style="font-size:1.1rem;font-weight:800">Gestión de Pacientes</h2>
    <div style="display:flex;gap:8px"><button class="btn btn-ghost" onclick="showNotif('Buscando paciente...')">Buscar</button><button class="btn btn-primary" onclick="showNotif('Nuevo paciente registrado')">+ Nuevo Paciente</button></div>
  </div>
  <div class="card">
    <div class="table-wrap">
      <table>
        <thead><tr><th>Paciente</th><th>DNI</th><th>Teléfono</th><th>Última Visita</th><th>Seguro</th><th>Estado</th></tr></thead>
        <tbody>
          <tr><td><span class="avatar" style="background:linear-gradient(135deg,var(--primary),#06b6d4)">AG</span>Ana García Moreno</td><td>12345678A</td><td>612 345 678</td><td>Hoy</td><td><span class="badge badge-blue">Sanitas</span></td><td><span class="badge badge-green">Activo</span></td></tr>
          <tr><td><span class="avatar" style="background:linear-gradient(135deg,#6366f1,#8b5cf6)">PS</span>Pedro Sánchez López</td><td>23456789B</td><td>623 456 789</td><td>Hoy</td><td><span class="badge badge-green">Adeslas</span></td><td><span class="badge badge-green">Activo</span></td></tr>
          <tr><td><span class="avatar" style="background:linear-gradient(135deg,#ec4899,#f43f5e)">MF</span>María Fernández Vila</td><td>34567890C</td><td>634 567 890</td><td>Hoy</td><td><span class="badge badge-purple">DKV</span></td><td><span class="badge badge-green">Activo</span></td></tr>
          <tr><td><span class="avatar" style="background:linear-gradient(135deg,#14b8a6,#06b6d4)">CL</span>Carlos López Ruiz</td><td>45678901D</td><td>645 678 901</td><td>Hace 3 días</td><td><span class="badge badge-yellow">Privado</span></td><td><span class="badge badge-green">Activo</span></td></tr>
          <tr><td><span class="avatar" style="background:linear-gradient(135deg,#f59e0b,#f97316)">LD</span>Laura Díaz Torres</td><td>56789012E</td><td>656 789 012</td><td>Hace 1 semana</td><td><span class="badge badge-blue">Sanitas</span></td><td><span class="badge badge-green">Activo</span></td></tr>
          <tr><td><span class="avatar" style="background:linear-gradient(135deg,#a855f7,#7c3aed)">JR</span>Javier Rodríguez Pérez</td><td>67890123F</td><td>667 890 123</td><td>Hace 2 semanas</td><td><span class="badge badge-green">Adeslas</span></td><td><span class="badge badge-green">Activo</span></td></tr>
          <tr><td><span class="avatar" style="background:linear-gradient(135deg,#10b981,#34d399)">SM</span>Sofía Martínez García</td><td>78901234G</td><td>678 901 234</td><td>Hace 1 mes</td><td><span class="badge badge-purple">DKV</span></td><td><span class="badge badge-yellow">Inactivo</span></td></tr>
          <tr><td><span class="avatar" style="background:linear-gradient(135deg,#ef4444,#f97316)">RN</span>Roberto Navarro Pinto</td><td>89012345H</td><td>689 012 345</td><td>Hace 3 meses</td><td><span class="badge badge-yellow">Privado</span></td><td><span class="badge badge-red">Baja</span></td></tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

<!-- ═══════════════ HISTORIAL ═══════════════ -->
<div class="page" id="page-historial">
  <h2 style="font-size:1.1rem;font-weight:800;margin-bottom:20px">Historial Clínico</h2>
  <div class="grid-2" style="align-items:start">
    <!-- Patient card -->
    <div class="card">
      <div class="card-header"><h3>Ficha del Paciente</h3><span class="badge badge-green">Activo</span></div>
      <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px">
        <div class="avatar" style="width:56px;height:56px;font-size:1.1rem;background:linear-gradient(135deg,var(--primary),#06b6d4)">AG</div>
        <div><div style="font-weight:800;font-size:1.05rem">Ana García Moreno</div><div style="font-size:0.75rem;color:var(--text-muted)">42 años · DNI: 12345678A</div></div>
      </div>
      <div class="detail-grid">
        <div class="detail-item"><label>Teléfono</label><span>612 345 678</span></div>
        <div class="detail-item"><label>Grupo Sanguíneo</label><span style="color:var(--accent)">A+</span></div>
        <div class="detail-item"><label>Seguro</label><span>Sanitas Premium</span></div>
        <div class="detail-item"><label>Alergias</label><span>Ninguna conocida</span></div>
        <div class="detail-item" style="grid-column:1/-1"><label>Próxima Cita</label><span style="color:var(--primary)">15 Abril 2026 — Revisión semestral</span></div>
      </div>
    </div>

    <!-- Treatment timeline -->
    <div class="card">
      <div class="card-header"><h3>Historial de Tratamientos</h3><span class="badge badge-teal">6 registros</span></div>
      <div class="timeline-item">
        <div style="min-width:80px"><div style="font-weight:800;font-size:0.78rem">09/04/2026</div><div style="font-size:0.62rem;color:var(--text-dim)">€60</div></div>
        <div class="timeline-bar"></div>
        <div><div style="font-weight:700;font-size:0.82rem">Revisión general</div><div style="font-size:0.72rem;color:var(--text-muted)">Dra. Martín</div><div style="font-size:0.72rem;color:var(--text-dim);margin-top:2px">Control semestral. Todo correcto. Próxima revisión en 6 meses.</div></div>
      </div>
      <div class="timeline-item">
        <div style="min-width:80px"><div style="font-weight:800;font-size:0.78rem">15/10/2025</div><div style="font-size:0.62rem;color:var(--text-dim)">€80</div></div>
        <div class="timeline-bar"></div>
        <div><div style="font-weight:700;font-size:0.82rem">Limpieza dental</div><div style="font-size:0.72rem;color:var(--text-muted)">Dra. Martín</div><div style="font-size:0.72rem;color:var(--text-dim);margin-top:2px">Limpieza profunda. Recomendada revisión periodontal.</div></div>
      </div>
      <div class="timeline-item">
        <div style="min-width:80px"><div style="font-weight:800;font-size:0.78rem">22/06/2025</div><div style="font-size:0.62rem;color:var(--text-dim)">€95</div></div>
        <div class="timeline-bar"></div>
        <div><div style="font-weight:700;font-size:0.82rem">Empaste composite</div><div style="font-size:0.72rem;color:var(--text-muted)">Dr. Ruiz</div><div style="font-size:0.72rem;color:var(--text-dim);margin-top:2px">Empaste pieza 26. Sin complicaciones.</div></div>
      </div>
      <div class="timeline-item">
        <div style="min-width:80px"><div style="font-weight:800;font-size:0.78rem">10/03/2025</div><div style="font-size:0.62rem;color:var(--text-dim)">€60</div></div>
        <div class="timeline-bar"></div>
        <div><div style="font-weight:700;font-size:0.82rem">Revisión general</div><div style="font-size:0.72rem;color:var(--text-muted)">Dra. Martín</div><div style="font-size:0.72rem;color:var(--text-dim);margin-top:2px">Control rutinario. Detectada caries incipiente pieza 26.</div></div>
      </div>
      <div class="timeline-item">
        <div style="min-width:80px"><div style="font-weight:800;font-size:0.78rem">12/09/2024</div><div style="font-size:0.62rem;color:var(--text-dim)">€45</div></div>
        <div class="timeline-bar"></div>
        <div><div style="font-weight:700;font-size:0.82rem">Radiografía</div><div style="font-size:0.72rem;color:var(--text-muted)">Dr. Ruiz</div><div style="font-size:0.72rem;color:var(--text-dim);margin-top:2px">Ortopantomografía de control. Resultados normales.</div></div>
      </div>
      <div class="timeline-item" style="border-bottom:none">
        <div style="min-width:80px"><div style="font-weight:800;font-size:0.78rem">03/04/2024</div><div style="font-size:0.62rem;color:var(--text-dim)">€60</div></div>
        <div class="timeline-bar"></div>
        <div><div style="font-weight:700;font-size:0.82rem">Revisión general</div><div style="font-size:0.72rem;color:var(--text-muted)">Dra. Martín</div><div style="font-size:0.72rem;color:var(--text-dim);margin-top:2px">Primera visita. Historia clínica creada.</div></div>
      </div>
    </div>
  </div>
</div>

<!-- ═══════════════ FACTURACION ═══════════════ -->
<div class="page" id="page-facturacion">
  <h2 style="font-size:1.1rem;font-weight:800;margin-bottom:20px">Facturación y Cobros</h2>
  <div class="card" style="margin-bottom:20px">
    <div class="table-wrap">
      <table>
        <thead><tr><th>Factura</th><th>Paciente</th><th>Tratamiento</th><th style="text-align:right">Importe</th><th>Seguro</th><th>Estado</th></tr></thead>
        <tbody>
          <tr><td><strong>FAC-2026-0412</strong></td><td>Ana García M.</td><td>Revisión general</td><td style="text-align:right;font-weight:800;color:var(--accent)">€60.00</td><td>Sanitas (80%)</td><td><span class="badge badge-green">Pagada</span></td></tr>
          <tr><td><strong>FAC-2026-0411</strong></td><td>Pedro Sánchez L.</td><td>Empaste molar 36</td><td style="text-align:right;font-weight:800;color:var(--accent)">€95.00</td><td>Adeslas (70%)</td><td><span class="badge badge-green">Pagada</span></td></tr>
          <tr><td><strong>FAC-2026-0410</strong></td><td>María Fernández V.</td><td>Ortodoncia — ajuste</td><td style="text-align:right;font-weight:800;color:var(--accent)">€120.00</td><td>DKV (60%)</td><td><span class="badge badge-green">Pagada</span></td></tr>
          <tr><td><strong>FAC-2026-0409</strong></td><td>Carlos López R.</td><td>Limpieza dental</td><td style="text-align:right;font-weight:800;color:var(--accent)">€80.00</td><td>Privado (0%)</td><td><span class="badge badge-yellow">Pendiente</span></td></tr>
          <tr><td><strong>FAC-2026-0408</strong></td><td>Laura Díaz T.</td><td>Radiografía + revisión</td><td style="text-align:right;font-weight:800;color:var(--accent)">€105.00</td><td>Sanitas (80%)</td><td><span class="badge badge-green">Pagada</span></td></tr>
          <tr><td><strong>FAC-2026-0407</strong></td><td>Javier Rodríguez P.</td><td>Endodoncia pieza 14</td><td style="text-align:right;font-weight:800;color:var(--accent)">€350.00</td><td>Adeslas (70%)</td><td><span class="badge badge-yellow">Pendiente</span></td></tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="grid-3">
    <div class="kpi" style="text-align:center"><div class="kpi-icon">💰</div><div class="kpi-value" style="color:var(--green)">€810.00</div><div class="kpi-label">Total Facturado</div></div>
    <div class="kpi" style="text-align:center"><div class="kpi-icon">✅</div><div class="kpi-value" style="color:var(--primary)">€380.00</div><div class="kpi-label">Cobrado</div></div>
    <div class="kpi" style="text-align:center"><div class="kpi-icon">⏳</div><div class="kpi-value" style="color:var(--yellow)">€430.00</div><div class="kpi-label">Pendiente</div></div>
  </div>
</div>

<!-- ═══════════════ ANALYTICS ═══════════════ -->
<div class="page" id="page-analytics">
  <h2 style="font-size:1.1rem;font-weight:800;margin-bottom:20px">Analytics de la Clínica</h2>
  <div class="kpi-grid" style="grid-template-columns:repeat(3,1fr);margin-bottom:24px">
    <div class="kpi" style="text-align:center"><div class="kpi-icon">🆕</div><div class="kpi-value">28</div><div class="kpi-label">Pacientes Nuevos/Mes</div></div>
    <div class="kpi" style="text-align:center"><div class="kpi-icon">🔄</div><div class="kpi-value">73%</div><div class="kpi-label">Tasa de Retorno</div></div>
    <div class="kpi" style="text-align:center"><div class="kpi-icon">💶</div><div class="kpi-value">€245</div><div class="kpi-label">Ingreso/Paciente</div></div>
  </div>
  <div class="grid-2">
    <!-- Patients by type -->
    <div class="card">
      <div class="card-header"><h3>Pacientes por Tipo</h3></div>
      <div class="bar-chart-item"><div class="bar-chart-label"><span>Revisiones</span><span style="font-weight:700">42%</span></div><div class="bar-chart-track"><div class="bar-chart-fill" style="width:42%;background:var(--primary)"></div></div></div>
      <div class="bar-chart-item"><div class="bar-chart-label"><span>Tratamientos dentales</span><span style="font-weight:700">28%</span></div><div class="bar-chart-track"><div class="bar-chart-fill" style="width:28%;background:var(--accent)"></div></div></div>
      <div class="bar-chart-item"><div class="bar-chart-label"><span>Ortodoncia</span><span style="font-weight:700">15%</span></div><div class="bar-chart-track"><div class="bar-chart-fill" style="width:15%;background:var(--blue)"></div></div></div>
      <div class="bar-chart-item"><div class="bar-chart-label"><span>Limpiezas</span><span style="font-weight:700">10%</span></div><div class="bar-chart-track"><div class="bar-chart-fill" style="width:10%;background:var(--green)"></div></div></div>
      <div class="bar-chart-item"><div class="bar-chart-label"><span>Urgencias</span><span style="font-weight:700">5%</span></div><div class="bar-chart-track"><div class="bar-chart-fill" style="width:5%;background:var(--red)"></div></div></div>
    </div>
    <!-- Monthly revenue -->
    <div class="card">
      <div class="card-header"><h3>Ingresos Mensuales</h3></div>
      <div class="bar-chart-item"><div class="bar-chart-label"><span>Oct 2025</span><span style="font-weight:700">€9,800</span></div><div class="bar-chart-track"><div class="bar-chart-fill" style="width:72%;background:var(--primary)"></div></div></div>
      <div class="bar-chart-item"><div class="bar-chart-label"><span>Nov 2025</span><span style="font-weight:700">€10,200</span></div><div class="bar-chart-track"><div class="bar-chart-fill" style="width:75%;background:var(--primary)"></div></div></div>
      <div class="bar-chart-item"><div class="bar-chart-label"><span>Dic 2025</span><span style="font-weight:700">€8,900</span></div><div class="bar-chart-track"><div class="bar-chart-fill" style="width:65%;background:var(--primary)"></div></div></div>
      <div class="bar-chart-item"><div class="bar-chart-label"><span>Ene 2026</span><span style="font-weight:700">€11,100</span></div><div class="bar-chart-track"><div class="bar-chart-fill" style="width:81%;background:var(--primary)"></div></div></div>
      <div class="bar-chart-item"><div class="bar-chart-label"><span>Feb 2026</span><span style="font-weight:700">€11,800</span></div><div class="bar-chart-track"><div class="bar-chart-fill" style="width:87%;background:var(--primary)"></div></div></div>
      <div class="bar-chart-item"><div class="bar-chart-label"><span>Mar 2026</span><span style="font-weight:700">€12,450</span></div><div class="bar-chart-track"><div class="bar-chart-fill" style="width:92%;background:var(--accent)"></div></div></div>
    </div>
  </div>
</div>

<!-- ═══════════════ CONFIGURACION ═══════════════ -->
<div class="page" id="page-configuracion">
  <h2 style="font-size:1.1rem;font-weight:800;margin-bottom:20px">Configuración de la Clínica</h2>
  <div class="card">
    <div class="setting-row"><span class="setting-label">Nombre de la clínica</span><input class="setting-input" type="text" value="${name}"></div>
    <div class="setting-row"><span class="setting-label">Email de contacto</span><input class="setting-input" type="email" value="citas@${name.toLowerCase().replace(/\\s+/g, '')}.com"></div>
    <div class="setting-row"><span class="setting-label">Hora apertura</span><input class="setting-input" type="text" value="08:00"></div>
    <div class="setting-row"><span class="setting-label">Hora cierre</span><input class="setting-input" type="text" value="20:00"></div>
    <div class="setting-row"><span class="setting-label">Duración cita por defecto</span><input class="setting-input" type="text" value="30 minutos"></div>
    <div class="setting-row"><span class="setting-label">Recordatorio SMS automático</span><div class="toggle on" onclick="this.classList.toggle('on')"></div></div>
    <div class="setting-row"><span class="setting-label">Confirmación cita por email</span><div class="toggle on" onclick="this.classList.toggle('on')"></div></div>
    <div class="setting-row"><span class="setting-label">Historial clínico digital</span><div class="toggle on" onclick="this.classList.toggle('on')"></div></div>
    <div class="setting-row"><span class="setting-label">Recetas electrónicas</span><div class="toggle" onclick="this.classList.toggle('on')"></div></div>
    <div style="margin-top:20px;display:flex;gap:10px">
      <button class="btn btn-primary" onclick="showNotif('Configuración guardada correctamente')">Guardar Cambios</button>
      <button class="btn btn-ghost">Cancelar</button>
    </div>
  </div>
</div>

<!-- FOOTER -->
<div class="main-footer">&copy; 2026 ${name} &mdash; Powered by <strong style="color:var(--primary)">Kerno Studio</strong></div>
</main>

<script>
function showPage(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.sidebar-link').forEach(l=>l.classList.remove('active'));
  var page=document.getElementById('page-'+id);
  if(page)page.classList.add('active');
  var link=document.querySelector('[data-page="'+id+'"]');
  if(link)link.classList.add('active');
  var titles={dashboard:'Dashboard',citas:'Citas',pacientes:'Pacientes',historial:'Historial Clínico',facturacion:'Facturación',analytics:'Analytics',configuracion:'Configuración'};
  document.getElementById('topbar-title').textContent=titles[id]||id;
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
