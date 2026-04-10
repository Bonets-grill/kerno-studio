import type { TemplateDefinition, TemplateCustomization } from '../types'

export const crmTemplate: TemplateDefinition = {
  meta: {
    id: 'crm',
    name: 'CRM Premium',
    industries: ['crm', 'ventas', 'sales', 'clientes', 'customers', 'leads'],
    projectTypes: ['landing', 'mvp', 'system', 'saas'],
    sections: ['dashboard', 'contacts', 'pipeline', 'deals', 'activities', 'reports', 'settings'],
    description: 'CRM profesional con pipeline de ventas, contactos y analytics.',
  },

  render(c: TemplateCustomization): string {
    const name = c.businessName
    const primary = c.primaryColor || '#5e72e4'
    const accent = c.accentColor || '#f5365c'

    // Derive lighter/darker variants
    const primaryRgb = hexToRgb(primary)
    const accentRgb = hexToRgb(accent)

    function hexToRgb(hex: string): string {
      const h = hex.replace('#', '')
      const r = parseInt(h.substring(0, 2), 16)
      const g = parseInt(h.substring(2, 4), 16)
      const b = parseInt(h.substring(4, 6), 16)
      return `${r},${g},${b}`
    }

    return `<!DOCTYPE html>
<html lang="${c.locale || 'es'}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${name} — CRM Dashboard</title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --primary:${primary};
  --primary-rgb:${primaryRgb};
  --accent:${accent};
  --accent-rgb:${accentRgb};
  --bg:#1e1e2f;
  --sidebar-bg:#1a1e2e;
  --card-bg:#27293d;
  --card-border:rgba(255,255,255,0.05);
  --text:#fff;
  --text-secondary:rgba(255,255,255,0.6);
  --text-dim:rgba(255,255,255,0.35);
  --success:#2dce89;
  --danger:#f5365c;
  --warning:#fb6340;
  --info:#11cdef;
  --radius:8px;
  --shadow:0 1px 20px rgba(0,0,0,0.1);
  --transition:0.15s ease;
}
html{font-size:14px}
body{font-family:'Poppins',system-ui,-apple-system,sans-serif;background:var(--bg);color:var(--text);min-height:100vh;overflow-x:hidden}
a{color:inherit;text-decoration:none}

/* ── Sidebar ── */
.sidebar{position:fixed;top:0;left:0;width:250px;height:100vh;background:var(--sidebar-bg);z-index:100;display:flex;flex-direction:column;border-right:1px solid var(--card-border);transition:transform .25s ease}
.sidebar-brand{padding:24px 20px;display:flex;align-items:center;gap:12px;border-bottom:1px solid var(--card-border)}
.sidebar-brand .brand-icon{width:36px;height:36px;border-radius:8px;background:linear-gradient(135deg,var(--primary),${primary}cc);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:15px;color:#fff;flex-shrink:0}
.sidebar-brand .brand-name{font-weight:700;font-size:15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sidebar-nav{flex:1;padding:16px 0;overflow-y:auto}
.sidebar-link{display:flex;align-items:center;gap:14px;padding:11px 20px;margin:2px 12px;border-radius:6px;color:var(--text-secondary);cursor:pointer;transition:all var(--transition);font-size:13px;font-weight:500;border-left:3px solid transparent;position:relative}
.sidebar-link:hover{color:var(--text);background:rgba(255,255,255,0.04)}
.sidebar-link.active{color:var(--text);background:rgba(var(--primary-rgb),0.12);border-left-color:var(--primary)}
.sidebar-link .link-icon{font-size:16px;width:22px;text-align:center;flex-shrink:0;opacity:0.7}
.sidebar-link.active .link-icon{opacity:1}
.sidebar-link .link-badge{margin-left:auto;background:var(--accent);color:#fff;font-size:10px;font-weight:700;padding:2px 7px;border-radius:10px;min-width:20px;text-align:center}
.sidebar-footer{padding:16px 20px;border-top:1px solid var(--card-border)}
.btn-upgrade{width:100%;padding:10px;border:0;border-radius:6px;background:linear-gradient(135deg,var(--primary),#825ee4);color:#fff;font-family:inherit;font-size:12px;font-weight:600;cursor:pointer;transition:all var(--transition);text-align:center}
.btn-upgrade:hover{transform:translateY(-1px);box-shadow:0 4px 15px rgba(var(--primary-rgb),0.4)}

/* ── Topbar ── */
.topbar{position:fixed;top:0;left:250px;right:0;height:64px;background:var(--sidebar-bg);z-index:90;display:flex;align-items:center;justify-content:space-between;padding:0 30px;border-bottom:1px solid var(--card-border)}
.topbar-title{font-size:17px;font-weight:700}
.topbar-right{display:flex;align-items:center;gap:16px}
.search-box{background:rgba(255,255,255,0.06);border:1px solid var(--card-border);border-radius:6px;padding:7px 14px;color:var(--text);font-family:inherit;font-size:12px;width:200px;outline:none;transition:all var(--transition)}
.search-box:focus{border-color:var(--primary);background:rgba(255,255,255,0.08);width:240px}
.search-box::placeholder{color:var(--text-dim)}
.notif-bell{position:relative;cursor:pointer;font-size:18px;padding:4px;opacity:0.7;transition:opacity var(--transition)}
.notif-bell:hover{opacity:1}
.notif-dot{position:absolute;top:2px;right:2px;width:8px;height:8px;background:var(--danger);border-radius:50%;border:2px solid var(--sidebar-bg)}
.user-avatar{width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,var(--primary),var(--accent));display:flex;align-items:center;justify-content:center;font-weight:700;font-size:12px;cursor:pointer;transition:transform var(--transition)}
.user-avatar:hover{transform:scale(1.05)}

/* ── Main ── */
.main-content{margin-left:250px;margin-top:64px;padding:30px;min-height:calc(100vh - 64px)}
.main-section{display:none;animation:fadeUp .3s ease}
.main-section.active{display:block}
@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}

/* ── Cards ── */
.card{background:var(--card-bg);border:1px solid var(--card-border);border-radius:var(--radius);padding:20px;box-shadow:var(--shadow);transition:all var(--transition)}
.card:hover{border-color:rgba(255,255,255,0.08)}
.card-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
.card-header h3{font-size:14px;font-weight:600;color:var(--text)}
.card-header .subtitle{font-size:11px;color:var(--text-dim)}

/* ── Stat cards ── */
.stat-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px}
.stat-card{background:var(--card-bg);border:1px solid var(--card-border);border-radius:var(--radius);padding:20px;position:relative;overflow:hidden;box-shadow:var(--shadow)}
.stat-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px}
.stat-card:nth-child(1)::before{background:var(--primary)}
.stat-card:nth-child(2)::before{background:var(--success)}
.stat-card:nth-child(3)::before{background:var(--warning)}
.stat-card:nth-child(4)::before{background:var(--info)}
.stat-label{font-size:11px;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-secondary);font-weight:500;margin-bottom:8px}
.stat-value{font-size:26px;font-weight:800;letter-spacing:-0.5px;line-height:1.1}
.stat-trend{display:inline-flex;align-items:center;gap:4px;font-size:11px;font-weight:600;margin-top:8px;padding:3px 8px;border-radius:4px}
.stat-trend.up{color:var(--success);background:rgba(45,206,137,0.1)}
.stat-trend.down{color:var(--danger);background:rgba(245,54,92,0.1)}

/* ── Grid layouts ── */
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}

/* ── Tables ── */
.table-wrap{overflow-x:auto}
table{width:100%;border-collapse:collapse}
th{text-align:left;padding:12px 16px;font-size:10px;text-transform:uppercase;letter-spacing:1px;color:var(--text-dim);font-weight:600;border-bottom:1px solid var(--card-border)}
td{padding:12px 16px;font-size:13px;color:var(--text-secondary);border-bottom:1px solid rgba(255,255,255,0.03)}
tr:hover td{background:rgba(255,255,255,0.02)}
tr:nth-child(even) td{background:rgba(255,255,255,0.01)}
tr:nth-child(even):hover td{background:rgba(255,255,255,0.03)}
.text-right{text-align:right}
.text-center{text-align:center}

/* ── Badges ── */
.badge{display:inline-block;padding:3px 10px;border-radius:4px;font-size:11px;font-weight:600;letter-spacing:0.3px}
.badge-green{background:rgba(45,206,137,0.15);color:var(--success)}
.badge-blue{background:rgba(17,205,239,0.15);color:var(--info)}
.badge-gray{background:rgba(255,255,255,0.08);color:var(--text-secondary)}
.badge-red{background:rgba(245,54,92,0.15);color:var(--danger)}
.badge-orange{background:rgba(251,99,64,0.15);color:var(--warning)}
.badge-purple{background:rgba(var(--primary-rgb),0.15);color:var(--primary)}

/* ── Avatar ── */
.avatar{width:32px;height:32px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-weight:700;font-size:11px;color:#fff;flex-shrink:0}
.avatar-row{display:flex;align-items:center;gap:10px}

/* ── Bar chart ── */
.bar-chart{display:flex;flex-direction:column;gap:10px}
.bar-row{display:flex;align-items:center;gap:12px}
.bar-label{font-size:12px;color:var(--text-secondary);width:70px;flex-shrink:0;text-align:right}
.bar-track{flex:1;height:24px;background:rgba(255,255,255,0.04);border-radius:4px;overflow:hidden;position:relative}
.bar-fill{height:100%;border-radius:4px;transition:width 1s ease;display:flex;align-items:center;padding-left:8px;font-size:10px;font-weight:600;color:#fff}
.bar-value{font-size:12px;color:var(--text-secondary);width:60px;flex-shrink:0}

/* ── Activity feed ── */
.activity-item{display:flex;gap:14px;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.03);position:relative}
.activity-item:last-child{border-bottom:0}
.activity-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0;margin-top:5px}
.activity-line{position:relative}
.activity-line::before{content:'';position:absolute;left:4px;top:18px;bottom:-14px;width:2px;background:rgba(255,255,255,0.06)}
.activity-item:last-child .activity-line::before{display:none}
.activity-content{flex:1}
.activity-text{font-size:13px;color:var(--text-secondary);line-height:1.5}
.activity-text strong{color:var(--text);font-weight:600}
.activity-time{font-size:11px;color:var(--text-dim);margin-top:3px}
.activity-tag{display:inline-block;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:600;background:rgba(var(--primary-rgb),0.12);color:var(--primary);margin-left:6px}

/* ── Pipeline ── */
.pipeline-board{display:flex;gap:14px;overflow-x:auto;padding-bottom:8px}
.pipeline-col{min-width:250px;flex:1;background:rgba(255,255,255,0.02);border-radius:var(--radius);padding:14px}
.pipeline-header{padding:10px 14px;border-radius:6px;margin-bottom:12px;font-weight:700;font-size:13px;display:flex;justify-content:space-between;align-items:center}
.pipeline-count{font-size:11px;font-weight:500;opacity:0.8}
.deal-card{background:var(--card-bg);border:1px solid var(--card-border);border-radius:6px;padding:14px;margin-bottom:10px;cursor:pointer;transition:all var(--transition);border-left:3px solid transparent}
.deal-card:hover{transform:translateY(-2px);box-shadow:0 4px 20px rgba(0,0,0,0.2);border-color:rgba(255,255,255,0.1)}
.deal-name{font-size:13px;font-weight:600;margin-bottom:6px;color:var(--text)}
.deal-value{font-size:18px;font-weight:800;margin-bottom:8px}
.deal-meta{display:flex;justify-content:space-between;align-items:center;font-size:11px;color:var(--text-dim)}
.deal-prob{font-weight:600;padding:2px 6px;border-radius:3px;font-size:10px}

/* ── Timeline ── */
.timeline{position:relative;padding-left:28px}
.timeline::before{content:'';position:absolute;left:8px;top:0;bottom:0;width:2px;background:rgba(255,255,255,0.06)}
.timeline-item{position:relative;padding:16px 0;border-bottom:1px solid rgba(255,255,255,0.03)}
.timeline-item:last-child{border-bottom:0}
.timeline-dot{position:absolute;left:-24px;top:20px;width:12px;height:12px;border-radius:50%;border:2px solid var(--card-bg)}
.timeline-header{display:flex;align-items:center;gap:10px;margin-bottom:6px}
.timeline-type{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px}
.timeline-date{font-size:11px;color:var(--text-dim);margin-left:auto}
.timeline-desc{font-size:13px;color:var(--text-secondary);line-height:1.5}
.timeline-contact{display:inline-block;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:600;background:rgba(var(--primary-rgb),0.1);color:var(--primary);margin-top:6px}

/* ── Metric cards ── */
.metric-card{background:var(--card-bg);border:1px solid var(--card-border);border-radius:var(--radius);padding:24px;text-align:center;box-shadow:var(--shadow)}
.metric-value{font-size:36px;font-weight:800;letter-spacing:-1px;margin-bottom:4px}
.metric-label{font-size:12px;color:var(--text-secondary);font-weight:500}

/* ── Top performers ── */
.performer-row{display:flex;align-items:center;gap:14px;padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.03)}
.performer-row:last-child{border-bottom:0}
.performer-stats{margin-left:auto;display:flex;gap:24px;text-align:right}
.performer-stat-val{font-size:14px;font-weight:700}
.performer-stat-label{font-size:10px;color:var(--text-dim);text-transform:uppercase}

/* ── Settings ── */
.form-group{margin-bottom:20px}
.form-label{display:block;font-size:12px;font-weight:600;color:var(--text-secondary);margin-bottom:6px;text-transform:uppercase;letter-spacing:0.5px}
.form-input{width:100%;padding:10px 14px;background:rgba(255,255,255,0.04);border:1px solid var(--card-border);border-radius:6px;color:var(--text);font-family:inherit;font-size:13px;outline:none;transition:all var(--transition)}
.form-input:focus{border-color:var(--primary);background:rgba(255,255,255,0.06)}
.toggle-row{display:flex;align-items:center;justify-content:space-between;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.03)}
.toggle-label{font-size:13px;color:var(--text-secondary)}
.toggle{position:relative;width:44px;height:24px;cursor:pointer}
.toggle input{display:none}
.toggle-slider{position:absolute;inset:0;background:rgba(255,255,255,0.1);border-radius:24px;transition:all var(--transition)}
.toggle-slider::before{content:'';position:absolute;width:18px;height:18px;border-radius:50%;background:#fff;top:3px;left:3px;transition:all var(--transition)}
.toggle input:checked+.toggle-slider{background:var(--primary)}
.toggle input:checked+.toggle-slider::before{transform:translateX(20px)}
.btn-save{padding:12px 32px;border:0;border-radius:6px;background:linear-gradient(135deg,var(--primary),#825ee4);color:#fff;font-family:inherit;font-size:13px;font-weight:600;cursor:pointer;transition:all var(--transition)}
.btn-save:hover{transform:translateY(-1px);box-shadow:0 4px 15px rgba(var(--primary-rgb),0.4)}
.btn-action{padding:8px 18px;border:0;border-radius:6px;color:#fff;font-family:inherit;font-size:12px;font-weight:600;cursor:pointer;transition:all var(--transition)}
.btn-primary{background:linear-gradient(135deg,var(--primary),#825ee4)}
.btn-primary:hover{box-shadow:0 4px 15px rgba(var(--primary-rgb),0.4);transform:translateY(-1px)}

/* ── Footer ── */
.footer{padding:30px;text-align:center;font-size:12px;color:var(--text-dim);border-top:1px solid var(--card-border);margin-top:40px}

/* ── Mobile ── */
.mobile-toggle{display:none;position:fixed;top:16px;left:16px;z-index:200;background:var(--primary);border:0;color:#fff;width:36px;height:36px;border-radius:8px;font-size:18px;cursor:pointer;align-items:center;justify-content:center}
.sidebar-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:99}
@media(max-width:768px){
  .sidebar{display:none}
  .topbar{left:0}
  .main-content{margin-left:0;width:100%;padding:16px;padding-bottom:70px}
  .bottom-nav{display:flex}
  .stat-grid{grid-template-columns:repeat(2,1fr)}
  .grid-2,.grid-3{grid-template-columns:1fr}
  .pipeline-board{flex-direction:column}
  .pipeline-col{min-width:100%}
}
@media(max-width:480px){
  .stat-grid{grid-template-columns:1fr}
  .topbar-right .search-box{display:none}
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

<!-- Mobile toggle -->
<button class="mobile-toggle" onclick="toggleSidebar()">&#9776;</button>
<div class="sidebar-overlay" id="sidebarOverlay" onclick="toggleSidebar()"></div>

<!-- Sidebar -->
<aside class="sidebar" id="sidebar">
  <div class="sidebar-brand">
    <div class="brand-icon">${name.charAt(0).toUpperCase()}</div>
    <div class="brand-name">${name}</div>
  </div>
  <nav class="sidebar-nav">
    <div class="sidebar-link active" data-section="dashboard" onclick="showSection('dashboard')">
      <span class="link-icon">&#9635;</span> Dashboard
    </div>
    <div class="sidebar-link" data-section="contacts" onclick="showSection('contacts')">
      <span class="link-icon">&#9673;</span> Contactos
      <span class="link-badge">342</span>
    </div>
    <div class="sidebar-link" data-section="pipeline" onclick="showSection('pipeline')">
      <span class="link-icon">&#9646;</span> Pipeline
    </div>
    <div class="sidebar-link" data-section="deals" onclick="showSection('deals')">
      <span class="link-icon">&#9670;</span> Deals
      <span class="link-badge">7</span>
    </div>
    <div class="sidebar-link" data-section="activities" onclick="showSection('activities')">
      <span class="link-icon">&#9201;</span> Actividades
    </div>
    <div class="sidebar-link" data-section="reports" onclick="showSection('reports')">
      <span class="link-icon">&#9638;</span> Reportes
    </div>
    <div class="sidebar-link" data-section="settings" onclick="showSection('settings')">
      <span class="link-icon">&#9881;</span> Ajustes
    </div>
  </nav>
  <div class="sidebar-footer">
    <button class="btn-upgrade" onclick="alert('Upgrade to Pro!')">&#9733; Upgrade Pro</button>
  </div>
</aside>

<!-- Topbar -->
<header class="topbar">
  <div class="topbar-title" id="section-title">Dashboard</div>
  <div class="topbar-right">
    <input type="text" class="search-box" placeholder="Buscar contactos, deals...">
    <div class="notif-bell" title="Notificaciones">
      &#128276;
      <div class="notif-dot"></div>
    </div>
    <div class="user-avatar" title="Mi perfil">MR</div>
  </div>
</header>

<!-- Main Content -->
<main class="main-content">

  <!-- ═══════════ DASHBOARD ═══════════ -->
  <div class="main-section active" id="section-dashboard">
    <div class="stat-grid">
      <div class="stat-card">
        <div class="stat-label">Leads</div>
        <div class="stat-value"><span class="counter" data-target="1247">0</span></div>
        <div class="stat-trend up">&#9650; +12.5% este mes</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Revenue</div>
        <div class="stat-value"><span class="counter" data-target="47350" data-prefix="&euro;">0</span></div>
        <div class="stat-trend up">&#9650; +8.3% vs anterior</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Deals Cerrados</div>
        <div class="stat-value"><span class="counter" data-target="23">0</span></div>
        <div class="stat-trend up">&#9650; +4 este mes</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Conversi&oacute;n</div>
        <div class="stat-value"><span class="counter" data-target="18.5" data-suffix="%" data-decimals="1">0</span></div>
        <div class="stat-trend up">&#9650; +2.1pp</div>
      </div>
    </div>

    <div class="grid-2">
      <!-- Revenue chart -->
      <div class="card">
        <div class="card-header">
          <div>
            <h3>Revenue Overview</h3>
            <span class="subtitle">Ingresos mensuales (miles &euro;)</span>
          </div>
          <span class="badge badge-green">+18%</span>
        </div>
        <div class="bar-chart">
          <div class="bar-row"><span class="bar-label">Oct</span><div class="bar-track"><div class="bar-fill" style="width:52%;background:linear-gradient(90deg,var(--primary),rgba(var(--primary-rgb),0.6))">&euro;18.5K</div></div></div>
          <div class="bar-row"><span class="bar-label">Nov</span><div class="bar-track"><div class="bar-fill" style="width:60%;background:linear-gradient(90deg,var(--primary),rgba(var(--primary-rgb),0.6))">&euro;21.0K</div></div></div>
          <div class="bar-row"><span class="bar-label">Dic</span><div class="bar-track"><div class="bar-fill" style="width:55%;background:linear-gradient(90deg,var(--primary),rgba(var(--primary-rgb),0.6))">&euro;19.5K</div></div></div>
          <div class="bar-row"><span class="bar-label">Ene</span><div class="bar-track"><div class="bar-fill" style="width:72%;background:linear-gradient(90deg,var(--primary),rgba(var(--primary-rgb),0.6))">&euro;28.4K</div></div></div>
          <div class="bar-row"><span class="bar-label">Feb</span><div class="bar-track"><div class="bar-fill" style="width:80%;background:linear-gradient(90deg,var(--primary),rgba(var(--primary-rgb),0.6))">&euro;35.2K</div></div></div>
          <div class="bar-row"><span class="bar-label">Mar</span><div class="bar-track"><div class="bar-fill" style="width:95%;background:linear-gradient(135deg,var(--accent),rgba(var(--accent-rgb),0.7))">&euro;47.3K</div></div></div>
        </div>
      </div>

      <!-- Recent activity -->
      <div class="card">
        <div class="card-header">
          <div>
            <h3>Actividad Reciente</h3>
            <span class="subtitle">&Uacute;ltimas 24 horas</span>
          </div>
          <span class="badge badge-purple">8 nuevos</span>
        </div>
        <div>
          <div class="activity-item">
            <div class="activity-line"><div class="activity-dot" style="background:var(--success)"></div></div>
            <div class="activity-content">
              <div class="activity-text"><strong>Deal cerrado</strong> &mdash; MegaCorp Contrato Anual por <strong>&euro;150,000</strong></div>
              <div class="activity-time">Hace 25 min</div>
            </div>
          </div>
          <div class="activity-item">
            <div class="activity-line"><div class="activity-dot" style="background:var(--info)"></div></div>
            <div class="activity-content">
              <div class="activity-text"><strong>Email abierto</strong> &mdash; Propuesta enviada a <strong>Ana S&aacute;nchez</strong></div>
              <div class="activity-time">Hace 1h</div>
            </div>
          </div>
          <div class="activity-item">
            <div class="activity-line"><div class="activity-dot" style="background:var(--warning)"></div></div>
            <div class="activity-content">
              <div class="activity-text"><strong>Llamada programada</strong> con <strong>Javier Ruiz</strong> &mdash; TechCorp</div>
              <div class="activity-time">Hace 2h</div>
            </div>
          </div>
          <div class="activity-item">
            <div class="activity-line"><div class="activity-dot" style="background:var(--primary)"></div></div>
            <div class="activity-content">
              <div class="activity-text"><strong>Nuevo lead</strong> &mdash; Laura Torres de InnovaGroup</div>
              <div class="activity-time">Hace 3h</div>
            </div>
          </div>
          <div class="activity-item">
            <div class="activity-line"><div class="activity-dot" style="background:var(--danger)"></div></div>
            <div class="activity-content">
              <div class="activity-text"><strong>Deal perdido</strong> &mdash; SmallTech Licencias (&euro;12,000)</div>
              <div class="activity-time">Hace 5h</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ═══════════ CONTACTS ═══════════ -->
  <div class="main-section" id="section-contacts">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap;gap:12px">
      <input type="text" class="search-box" placeholder="Buscar contactos..." style="width:300px;max-width:100%">
      <button class="btn-action btn-primary" onclick="alert('Nuevo contacto')">+ A&ntilde;adir Contacto</button>
    </div>
    <div class="card">
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Empresa</th>
              <th>Email</th>
              <th>Tel&eacute;fono</th>
              <th>Estado</th>
              <th>Contacto</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><div class="avatar-row"><div class="avatar" style="background:linear-gradient(135deg,#e91e63,#9c27b0)">ML</div> Mar&iacute;a L&oacute;pez</div></td>
              <td>Acme Corp</td>
              <td>maria@acmecorp.es</td>
              <td>+34 612 345 678</td>
              <td><span class="badge badge-green">Activo</span></td>
              <td>Hoy</td>
            </tr>
            <tr>
              <td><div class="avatar-row"><div class="avatar" style="background:linear-gradient(135deg,#2196f3,#00bcd4)">JR</div> Javier Ruiz</div></td>
              <td>TechCorp</td>
              <td>javier@techcorp.com</td>
              <td>+34 623 456 789</td>
              <td><span class="badge badge-green">Activo</span></td>
              <td>Ayer</td>
            </tr>
            <tr>
              <td><div class="avatar-row"><div class="avatar" style="background:linear-gradient(135deg,#ff9800,#f44336)">AS</div> Ana S&aacute;nchez</div></td>
              <td>GlobalTech</td>
              <td>ana@globaltech.es</td>
              <td>+34 634 567 890</td>
              <td><span class="badge badge-blue">Nuevo</span></td>
              <td>Hace 3 d&iacute;as</td>
            </tr>
            <tr>
              <td><div class="avatar-row"><div class="avatar" style="background:linear-gradient(135deg,#4caf50,#009688)">CF</div> Carlos Fern&aacute;ndez</div></td>
              <td>DataSystems</td>
              <td>carlos@datasystems.es</td>
              <td>+34 645 678 901</td>
              <td><span class="badge badge-gray">Inactivo</span></td>
              <td>Hace 12 d&iacute;as</td>
            </tr>
            <tr>
              <td><div class="avatar-row"><div class="avatar" style="background:linear-gradient(135deg,#673ab7,#3f51b5)">LT</div> Laura Torres</div></td>
              <td>InnovaGroup</td>
              <td>laura@innovagroup.com</td>
              <td>+34 656 789 012</td>
              <td><span class="badge badge-green">Activo</span></td>
              <td>Hoy</td>
            </tr>
            <tr>
              <td><div class="avatar-row"><div class="avatar" style="background:linear-gradient(135deg,#ff5722,#e91e63)">PG</div> Pedro Garc&iacute;a</div></td>
              <td>NexTech Solutions</td>
              <td>pedro@nextech.es</td>
              <td>+34 667 890 123</td>
              <td><span class="badge badge-green">Activo</span></td>
              <td>Hace 2 d&iacute;as</td>
            </tr>
            <tr>
              <td><div class="avatar-row"><div class="avatar" style="background:linear-gradient(135deg,#00bcd4,#03a9f4)">EM</div> Elena Mart&iacute;nez</div></td>
              <td>MegaCorp</td>
              <td>elena@megacorp.com</td>
              <td>+34 678 901 234</td>
              <td><span class="badge badge-blue">Nuevo</span></td>
              <td>Hace 1 d&iacute;a</td>
            </tr>
            <tr>
              <td><div class="avatar-row"><div class="avatar" style="background:linear-gradient(135deg,#795548,#607d8b)">RD</div> Ra&uacute;l Dom&iacute;nguez</div></td>
              <td>BioTech Labs</td>
              <td>raul@biotech.es</td>
              <td>+34 689 012 345</td>
              <td><span class="badge badge-gray">Inactivo</span></td>
              <td>Hace 20 d&iacute;as</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- ═══════════ PIPELINE ═══════════ -->
  <div class="main-section" id="section-pipeline">
    <div class="pipeline-board">
      <!-- Prospecto -->
      <div class="pipeline-col">
        <div class="pipeline-header" style="background:rgba(var(--primary-rgb),0.15);color:var(--primary)">
          Prospecto <span class="pipeline-count">3 deals &middot; &euro;75K</span>
        </div>
        <div class="deal-card" style="border-left-color:var(--primary)">
          <div class="deal-name">Acme Corp &mdash; Plataforma</div>
          <div class="deal-value" style="color:var(--primary)">&euro;35,000</div>
          <div class="deal-meta">
            <span>Mar&iacute;a L&oacute;pez</span>
            <span class="deal-prob" style="background:rgba(var(--primary-rgb),0.15);color:var(--primary)">20%</span>
          </div>
        </div>
        <div class="deal-card" style="border-left-color:var(--primary)">
          <div class="deal-name">DataSystems &mdash; Licencias</div>
          <div class="deal-value" style="color:var(--primary)">&euro;22,000</div>
          <div class="deal-meta">
            <span>Carlos Fern&aacute;ndez</span>
            <span class="deal-prob" style="background:rgba(var(--primary-rgb),0.15);color:var(--primary)">15%</span>
          </div>
        </div>
        <div class="deal-card" style="border-left-color:var(--primary)">
          <div class="deal-name">Retail Plus &mdash; CRM</div>
          <div class="deal-value" style="color:var(--primary)">&euro;18,000</div>
          <div class="deal-meta">
            <span>Sof&iacute;a Ram&iacute;rez</span>
            <span class="deal-prob" style="background:rgba(var(--primary-rgb),0.15);color:var(--primary)">25%</span>
          </div>
        </div>
      </div>

      <!-- Cualificado -->
      <div class="pipeline-col">
        <div class="pipeline-header" style="background:rgba(17,205,239,0.15);color:var(--info)">
          Cualificado <span class="pipeline-count">2 deals &middot; &euro;127K</span>
        </div>
        <div class="deal-card" style="border-left-color:var(--info)">
          <div class="deal-name">TechCorp &mdash; Suite Enterprise</div>
          <div class="deal-value" style="color:var(--info)">&euro;85,000</div>
          <div class="deal-meta">
            <span>Javier Ruiz</span>
            <span class="deal-prob" style="background:rgba(17,205,239,0.15);color:var(--info)">50%</span>
          </div>
        </div>
        <div class="deal-card" style="border-left-color:var(--info)">
          <div class="deal-name">InnovaGroup &mdash; Marketing</div>
          <div class="deal-value" style="color:var(--info)">&euro;42,000</div>
          <div class="deal-meta">
            <span>Laura Torres</span>
            <span class="deal-prob" style="background:rgba(17,205,239,0.15);color:var(--info)">45%</span>
          </div>
        </div>
      </div>

      <!-- Propuesta -->
      <div class="pipeline-col">
        <div class="pipeline-header" style="background:rgba(251,99,64,0.15);color:var(--warning)">
          Propuesta <span class="pipeline-count">2 deals &middot; &euro;215K</span>
        </div>
        <div class="deal-card" style="border-left-color:var(--warning)">
          <div class="deal-name">GlobalTech &mdash; Infraestructura</div>
          <div class="deal-value" style="color:var(--warning)">&euro;120,000</div>
          <div class="deal-meta">
            <span>Ana S&aacute;nchez</span>
            <span class="deal-prob" style="background:rgba(251,99,64,0.15);color:var(--warning)">70%</span>
          </div>
        </div>
        <div class="deal-card" style="border-left-color:var(--warning)">
          <div class="deal-name">NexTech &mdash; Migraci&oacute;n Cloud</div>
          <div class="deal-value" style="color:var(--warning)">&euro;95,000</div>
          <div class="deal-meta">
            <span>Pedro Garc&iacute;a</span>
            <span class="deal-prob" style="background:rgba(251,99,64,0.15);color:var(--warning)">65%</span>
          </div>
        </div>
      </div>

      <!-- Negociacion -->
      <div class="pipeline-col">
        <div class="pipeline-header" style="background:rgba(45,206,137,0.15);color:var(--success)">
          Negociaci&oacute;n <span class="pipeline-count">3 deals &middot; &euro;268K</span>
        </div>
        <div class="deal-card" style="border-left-color:var(--success)">
          <div class="deal-name">MegaCorp &mdash; Contrato Anual</div>
          <div class="deal-value" style="color:var(--success)">&euro;150,000</div>
          <div class="deal-meta">
            <span>Elena Mart&iacute;nez</span>
            <span class="deal-prob" style="background:rgba(45,206,137,0.15);color:var(--success)">85%</span>
          </div>
        </div>
        <div class="deal-card" style="border-left-color:var(--success)">
          <div class="deal-name">BioTech &mdash; Laboratorio</div>
          <div class="deal-value" style="color:var(--success)">&euro;68,000</div>
          <div class="deal-meta">
            <span>Ra&uacute;l Dom&iacute;nguez</span>
            <span class="deal-prob" style="background:rgba(45,206,137,0.15);color:var(--success)">80%</span>
          </div>
        </div>
        <div class="deal-card" style="border-left-color:var(--success)">
          <div class="deal-name">SolarTech &mdash; ERP</div>
          <div class="deal-value" style="color:var(--success)">&euro;50,000</div>
          <div class="deal-meta">
            <span>Isabel Vega</span>
            <span class="deal-prob" style="background:rgba(45,206,137,0.15);color:var(--success)">90%</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ═══════════ DEALS ═══════════ -->
  <div class="main-section" id="section-deals">
    <div class="card">
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Deal</th>
              <th>Empresa</th>
              <th class="text-right">Valor</th>
              <th>Etapa</th>
              <th class="text-center">Probabilidad</th>
              <th>Cierre</th>
              <th>Responsable</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Suite Enterprise</strong></td>
              <td>TechCorp</td>
              <td class="text-right" style="font-weight:700;color:var(--success)">&euro;85,000</td>
              <td><span class="badge badge-blue">Cualificado</span></td>
              <td class="text-center">60%</td>
              <td>15 May 2026</td>
              <td>Alejandro M.</td>
            </tr>
            <tr>
              <td><strong>Infraestructura Cloud</strong></td>
              <td>GlobalTech</td>
              <td class="text-right" style="font-weight:700;color:var(--success)">&euro;120,000</td>
              <td><span class="badge badge-orange">Propuesta</span></td>
              <td class="text-center">75%</td>
              <td>30 Abr 2026</td>
              <td>Beatriz C.</td>
            </tr>
            <tr>
              <td><strong>Contrato Anual</strong></td>
              <td>MegaCorp</td>
              <td class="text-right" style="font-weight:700;color:var(--success)">&euro;150,000</td>
              <td><span class="badge badge-green">Negociaci&oacute;n</span></td>
              <td class="text-center">85%</td>
              <td>20 Abr 2026</td>
              <td>Alejandro M.</td>
            </tr>
            <tr>
              <td><strong>Plataforma CRM</strong></td>
              <td>Acme Corp</td>
              <td class="text-right" style="font-weight:700;color:var(--success)">&euro;35,000</td>
              <td><span class="badge badge-purple">Prospecto</span></td>
              <td class="text-center">25%</td>
              <td>10 Jun 2026</td>
              <td>David L.</td>
            </tr>
            <tr>
              <td><strong>Marketing Suite</strong></td>
              <td>InnovaGroup</td>
              <td class="text-right" style="font-weight:700;color:var(--success)">&euro;42,000</td>
              <td><span class="badge badge-blue">Cualificado</span></td>
              <td class="text-center">50%</td>
              <td>25 May 2026</td>
              <td>Elena R.</td>
            </tr>
            <tr>
              <td><strong>Migraci&oacute;n Cloud</strong></td>
              <td>NexTech Solutions</td>
              <td class="text-right" style="font-weight:700;color:var(--success)">&euro;95,000</td>
              <td><span class="badge badge-orange">Propuesta</span></td>
              <td class="text-center">70%</td>
              <td>5 May 2026</td>
              <td>Beatriz C.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- ═══════════ ACTIVITIES ═══════════ -->
  <div class="main-section" id="section-activities">
    <div class="card">
      <div class="timeline">
        <div class="timeline-item">
          <div class="timeline-dot" style="background:var(--success)"></div>
          <div class="timeline-header">
            <span class="timeline-type" style="color:var(--success)">&#9993; Email enviado</span>
            <span class="timeline-date">Hoy, 10:30</span>
          </div>
          <div class="timeline-desc">Propuesta comercial enviada a <strong>Javier Ruiz</strong> de TechCorp con presupuesto actualizado para Suite Enterprise.</div>
          <span class="timeline-contact">Javier Ruiz</span>
        </div>
        <div class="timeline-item">
          <div class="timeline-dot" style="background:var(--info)"></div>
          <div class="timeline-header">
            <span class="timeline-type" style="color:var(--info)">&#9742; Llamada realizada</span>
            <span class="timeline-date">Hoy, 09:15</span>
          </div>
          <div class="timeline-desc">Llamada de seguimiento con <strong>Ana S&aacute;nchez</strong> &mdash; confirmada reuni&oacute;n para revisar propuesta de infraestructura la pr&oacute;xima semana.</div>
          <span class="timeline-contact">Ana S&aacute;nchez</span>
        </div>
        <div class="timeline-item">
          <div class="timeline-dot" style="background:var(--warning)"></div>
          <div class="timeline-header">
            <span class="timeline-type" style="color:var(--warning)">&#128197; Reuni&oacute;n programada</span>
            <span class="timeline-date">Ayer, 16:00</span>
          </div>
          <div class="timeline-desc">Demo de producto agendada con <strong>Laura Torres</strong> de InnovaGroup para el viernes 11 de abril a las 11:00.</div>
          <span class="timeline-contact">Laura Torres</span>
        </div>
        <div class="timeline-item">
          <div class="timeline-dot" style="background:var(--primary)"></div>
          <div class="timeline-header">
            <span class="timeline-type" style="color:var(--primary)">&#9670; Deal actualizado</span>
            <span class="timeline-date">Ayer, 11:30</span>
          </div>
          <div class="timeline-desc">Deal <strong>MegaCorp &mdash; Contrato Anual</strong> movido a etapa Negociaci&oacute;n. Probabilidad actualizada al 85%.</div>
          <span class="timeline-contact">Elena Mart&iacute;nez</span>
        </div>
        <div class="timeline-item">
          <div class="timeline-dot" style="background:var(--text-dim)"></div>
          <div class="timeline-header">
            <span class="timeline-type" style="color:var(--text-secondary)">&#9998; Nota a&ntilde;adida</span>
            <span class="timeline-date">Lun, 14:20</span>
          </div>
          <div class="timeline-desc">Nota interna: <strong>Carlos Fern&aacute;ndez</strong> de DataSystems menciona inter&eacute;s en ampliar licencias a 50 usuarios el pr&oacute;ximo trimestre.</div>
          <span class="timeline-contact">Carlos Fern&aacute;ndez</span>
        </div>
        <div class="timeline-item">
          <div class="timeline-dot" style="background:var(--success)"></div>
          <div class="timeline-header">
            <span class="timeline-type" style="color:var(--success)">&#9993; Email enviado</span>
            <span class="timeline-date">Lun, 10:00</span>
          </div>
          <div class="timeline-desc">Caso de &eacute;xito compartido con <strong>Pedro Garc&iacute;a</strong> &mdash; incluye m&eacute;tricas de ROI del proyecto de migraci&oacute;n cloud.</div>
          <span class="timeline-contact">Pedro Garc&iacute;a</span>
        </div>
        <div class="timeline-item">
          <div class="timeline-dot" style="background:var(--info)"></div>
          <div class="timeline-header">
            <span class="timeline-type" style="color:var(--info)">&#9742; Llamada realizada</span>
            <span class="timeline-date">Dom, 17:45</span>
          </div>
          <div class="timeline-desc">Follow-up con <strong>Mar&iacute;a L&oacute;pez</strong> de Acme Corp &mdash; solicita demo personalizada para su equipo directivo.</div>
          <span class="timeline-contact">Mar&iacute;a L&oacute;pez</span>
        </div>
      </div>
    </div>
  </div>

  <!-- ═══════════ REPORTS ═══════════ -->
  <div class="main-section" id="section-reports">
    <div class="grid-3" style="margin-bottom:24px">
      <div class="metric-card">
        <div class="metric-value" style="color:var(--primary)"><span class="counter" data-target="34" data-suffix="%">0</span></div>
        <div class="metric-label">Win Rate</div>
      </div>
      <div class="metric-card">
        <div class="metric-value" style="color:var(--success)"><span class="counter" data-target="4850" data-prefix="&euro;">0</span></div>
        <div class="metric-label">Deal Medio</div>
      </div>
      <div class="metric-card">
        <div class="metric-value" style="color:var(--info)"><span class="counter" data-target="28" data-suffix=" d&iacute;as">0</span></div>
        <div class="metric-label">Ciclo de Venta</div>
      </div>
    </div>

    <div class="grid-2">
      <div class="card">
        <div class="card-header">
          <h3>Deals por Etapa</h3>
        </div>
        <div class="bar-chart">
          <div class="bar-row"><span class="bar-label">Prospecto</span><div class="bar-track"><div class="bar-fill" style="width:85%;background:var(--primary)">12</div></div></div>
          <div class="bar-row"><span class="bar-label">Cualificado</span><div class="bar-track"><div class="bar-fill" style="width:60%;background:var(--info)">8</div></div></div>
          <div class="bar-row"><span class="bar-label">Propuesta</span><div class="bar-track"><div class="bar-fill" style="width:42%;background:var(--warning)">6</div></div></div>
          <div class="bar-row"><span class="bar-label">Negociaci&oacute;n</span><div class="bar-track"><div class="bar-fill" style="width:28%;background:var(--success)">4</div></div></div>
          <div class="bar-row"><span class="bar-label">Cerrado</span><div class="bar-track"><div class="bar-fill" style="width:20%;background:var(--accent)">3</div></div></div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3>Top Performers</h3>
        </div>
        <div>
          <div class="performer-row">
            <div class="avatar" style="background:linear-gradient(135deg,var(--primary),#825ee4)">AM</div>
            <div>
              <div style="font-weight:600;font-size:13px">Alejandro Moreno</div>
              <div style="font-size:11px;color:var(--text-dim)">Senior Account Executive</div>
            </div>
            <div class="performer-stats">
              <div><div class="performer-stat-val">12</div><div class="performer-stat-label">Deals</div></div>
              <div><div class="performer-stat-val" style="color:var(--success)">&euro;320K</div><div class="performer-stat-label">Revenue</div></div>
            </div>
          </div>
          <div class="performer-row">
            <div class="avatar" style="background:linear-gradient(135deg,#e91e63,#9c27b0)">BC</div>
            <div>
              <div style="font-weight:600;font-size:13px">Beatriz Campos</div>
              <div style="font-size:11px;color:var(--text-dim)">Account Executive</div>
            </div>
            <div class="performer-stats">
              <div><div class="performer-stat-val">9</div><div class="performer-stat-label">Deals</div></div>
              <div><div class="performer-stat-val" style="color:var(--success)">&euro;285K</div><div class="performer-stat-label">Revenue</div></div>
            </div>
          </div>
          <div class="performer-row">
            <div class="avatar" style="background:linear-gradient(135deg,#ff9800,#f44336)">DL</div>
            <div>
              <div style="font-weight:600;font-size:13px">David L&oacute;pez</div>
              <div style="font-size:11px;color:var(--text-dim)">Business Development</div>
            </div>
            <div class="performer-stats">
              <div><div class="performer-stat-val">7</div><div class="performer-stat-label">Deals</div></div>
              <div><div class="performer-stat-val" style="color:var(--success)">&euro;248K</div><div class="performer-stat-label">Revenue</div></div>
            </div>
          </div>
          <div class="performer-row">
            <div class="avatar" style="background:linear-gradient(135deg,#4caf50,#009688)">ER</div>
            <div>
              <div style="font-weight:600;font-size:13px">Elena Rodr&iacute;guez</div>
              <div style="font-size:11px;color:var(--text-dim)">Account Manager</div>
            </div>
            <div class="performer-stats">
              <div><div class="performer-stat-val">6</div><div class="performer-stat-label">Deals</div></div>
              <div><div class="performer-stat-val" style="color:var(--success)">&euro;195K</div><div class="performer-stat-label">Revenue</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ═══════════ SETTINGS ═══════════ -->
  <div class="main-section" id="section-settings">
    <div class="grid-2">
      <div class="card">
        <div class="card-header"><h3>General</h3></div>
        <div class="form-group">
          <label class="form-label">Nombre de la empresa</label>
          <input type="text" class="form-input" value="${name}">
        </div>
        <div class="form-group">
          <label class="form-label">Email principal</label>
          <input type="email" class="form-input" value="ventas@${name.toLowerCase().replace(/\s+/g, '')}.com">
        </div>
        <div class="form-group">
          <label class="form-label">Etapas del pipeline</label>
          <input type="text" class="form-input" value="Prospecto, Cualificado, Propuesta, Negociaci&oacute;n, Cerrado">
        </div>
        <div class="form-group">
          <label class="form-label">Moneda por defecto</label>
          <input type="text" class="form-input" value="EUR (&euro;)">
        </div>
        <button class="btn-save" onclick="alert('Ajustes guardados')" style="margin-top:8px">Guardar cambios</button>
      </div>

      <div class="card">
        <div class="card-header"><h3>Notificaciones</h3></div>
        <div class="toggle-row">
          <span class="toggle-label">Notificaciones por email</span>
          <label class="toggle"><input type="checkbox" checked><span class="toggle-slider"></span></label>
        </div>
        <div class="toggle-row">
          <span class="toggle-label">Auto-asignar leads nuevos</span>
          <label class="toggle"><input type="checkbox" checked><span class="toggle-slider"></span></label>
        </div>
        <div class="toggle-row">
          <span class="toggle-label">Reportes semanales</span>
          <label class="toggle"><input type="checkbox"><span class="toggle-slider"></span></label>
        </div>
        <div class="toggle-row">
          <span class="toggle-label">Alertas de deals pr&oacute;ximos a vencer</span>
          <label class="toggle"><input type="checkbox" checked><span class="toggle-slider"></span></label>
        </div>
        <div class="toggle-row">
          <span class="toggle-label">Resumen diario de actividades</span>
          <label class="toggle"><input type="checkbox"><span class="toggle-slider"></span></label>
        </div>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <div class="footer">&copy; 2026 ${name} &mdash; Powered by <strong>Kerno Studio</strong></div>
</main>

<!-- Bottom Nav (mobile only) -->
<nav class="bottom-nav">
  <button class="active" onclick="showSection('dashboard')"><span class="bnav-icon">◉</span>Inicio</button>
  <button onclick="showSection('contacts')"><span class="bnav-icon">◎</span>Contactos</button>
  <button onclick="showSection('pipeline')"><span class="bnav-icon">☰</span>Pipeline</button>
  <button onclick="showSection('deals')"><span class="bnav-icon">▤</span>Deals</button>
  <button onclick="showSection('activities')"><span class="bnav-icon">⊞</span>Actividades</button>
  <button onclick="showSection('reports')"><span class="bnav-icon">◈</span>Reportes</button>
</nav>

<script>
function showSection(id){
  document.querySelectorAll('.main-section').forEach(function(s){s.style.display='none';s.classList.remove('active')});
  document.querySelectorAll('.sidebar-link').forEach(function(l){l.classList.remove('active')});
  document.querySelectorAll('.bottom-nav button').forEach(b=>b.classList.remove('active'));
  var sec=document.getElementById('section-'+id);
  if(sec){sec.style.display='block';sec.classList.add('active')}
  var link=document.querySelector('[data-section="'+id+'"]');
  if(link) link.classList.add('active');
  var bnav=document.querySelector('.bottom-nav button[onclick*="'+id+'"]');
  if(bnav) bnav.classList.add('active');
  var title=document.getElementById('section-title');
  if(title){
    var titles={'dashboard':'Dashboard','contacts':'Contactos','pipeline':'Pipeline','deals':'Deals','activities':'Actividades','reports':'Reportes','settings':'Ajustes'};
    title.textContent=titles[id]||id.charAt(0).toUpperCase()+id.slice(1);
  }
  window.scrollTo(0,0);
  // Close mobile sidebar
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('open');
  // Re-run counters for newly visible section
  runCounters(sec);
}

function toggleSidebar(){
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sidebarOverlay').classList.toggle('open');
}

function runCounters(container){
  var scope=container||document;
  scope.querySelectorAll('.counter').forEach(function(el){
    if(el.dataset.done) return;
    el.dataset.done='1';
    var target=parseFloat(el.dataset.target)||0;
    var prefix=el.dataset.prefix||'';
    var suffix=el.dataset.suffix||'';
    var decimals=parseInt(el.dataset.decimals)||0;
    var current=0;
    var step=target/40;
    var timer=setInterval(function(){
      current+=step;
      if(current>=target){current=target;clearInterval(timer)}
      var formatted=decimals>0?current.toFixed(decimals):Math.round(current).toLocaleString('es-ES');
      el.textContent=prefix+formatted+suffix;
    },30);
  });
}

document.addEventListener('DOMContentLoaded',function(){
  runCounters(document.getElementById('section-dashboard'));
});
</script>
</body>
</html>`
  },
}
