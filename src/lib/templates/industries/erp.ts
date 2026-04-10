import type { TemplateDefinition, TemplateCustomization } from '../types'

export const erpTemplate: TemplateDefinition = {
  meta: {
    id: 'erp',
    name: 'ERP Empresarial',
    industries: ['erp', 'enterprise', 'gestión empresarial', 'business management', 'inventario', 'inventory'],
    projectTypes: ['landing', 'mvp', 'system', 'saas'],
    sections: ['dashboard', 'invoicing', 'inventory', 'hr', 'reports', 'analytics', 'settings'],
    description: 'Plantilla premium ERP empresarial con sidebar. Dashboard con KPIs financieros, facturación con IVA, inventario con alertas de stock, RRHH, informes financieros, analytics avanzados y configuración.',
  },

  render(c: TemplateCustomization): string {
    const p = c.primaryColor || '#3b82f6'
    const a = c.accentColor || '#8b5cf6'
    const bn = c.businessName || 'Mi Empresa'

    return `<!DOCTYPE html>
<html lang="${c.locale || 'es'}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${bn} — ERP</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --primary:${p};
  --accent:${a};
  --sidebar-bg:#141821;
  --content-bg:#0f1318;
  --card-bg:#181d27;
  --card-border:#232a3a;
  --topbar-bg:#141821;
  --text:#e8eaf0;
  --text-muted:#8892a4;
  --text-dim:#5a6478;
  --success:#22c55e;
  --warning:#f59e0b;
  --danger:#ef4444;
  --info:#3b82f6;
  --sidebar-w:250px;
  --topbar-h:56px;
}
html{scroll-behavior:smooth}
body{font-family:'IBM Plex Sans',sans-serif;background:var(--content-bg);color:var(--text);overflow-x:hidden;min-height:100vh}

/* ── Sidebar ── */
.sidebar{position:fixed;left:0;top:0;width:var(--sidebar-w);height:100vh;background:var(--sidebar-bg);border-right:1px solid var(--card-border);display:flex;flex-direction:column;z-index:100;overflow-y:auto}
.sidebar-logo{padding:18px 20px;border-bottom:1px solid var(--card-border);display:flex;align-items:center;gap:10px}
.sidebar-logo .logo-icon{width:34px;height:34px;border-radius:8px;background:var(--primary);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:15px;color:#fff;flex-shrink:0}
.sidebar-logo .logo-text{font-weight:700;font-size:14px;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sidebar-nav{flex:1;padding:12px 0}
.sidebar-nav a{display:flex;align-items:center;gap:12px;padding:10px 20px;color:var(--text-muted);text-decoration:none;font-size:13.5px;font-weight:500;transition:all .2s;cursor:pointer;border-left:3px solid transparent}
.sidebar-nav a:hover{color:var(--text);background:rgba(255,255,255,.04)}
.sidebar-nav a.active{color:var(--primary);background:rgba(59,130,246,.08);border-left-color:var(--primary)}
.sidebar-nav a .nav-icon{font-size:16px;width:22px;text-align:center;flex-shrink:0}
.sidebar-footer{padding:16px 20px;border-top:1px solid var(--card-border);font-size:11px;color:var(--text-dim)}

/* ── Topbar ── */
.topbar{position:fixed;top:0;left:var(--sidebar-w);right:0;height:var(--topbar-h);background:var(--topbar-bg);border-bottom:1px solid var(--card-border);display:flex;align-items:center;justify-content:space-between;padding:0 28px;z-index:90}
.topbar-title{font-size:15px;font-weight:600;color:var(--text)}
.topbar-right{display:flex;align-items:center;gap:16px}
.topbar-right .notif{width:34px;height:34px;border-radius:8px;background:var(--card-bg);border:1px solid var(--card-border);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:14px;position:relative}
.topbar-right .notif .dot{position:absolute;top:6px;right:6px;width:7px;height:7px;border-radius:50%;background:var(--danger)}
.topbar-avatar{width:34px;height:34px;border-radius:50%;background:var(--primary);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;color:#fff;cursor:pointer}

/* ── Main Content ── */
.main{margin-left:var(--sidebar-w);margin-top:var(--topbar-h);padding:28px;min-height:calc(100vh - var(--topbar-h))}
.page-section{display:none}
.page-section.active{display:block}
.section-header{margin-bottom:24px}
.section-header .section-tag{font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:var(--primary);margin-bottom:6px}
.section-header h2{font-size:22px;font-weight:700;color:var(--text);margin-bottom:4px}
.section-header p{font-size:13.5px;color:var(--text-muted)}

/* ── Cards ── */
.card{background:var(--card-bg);border:1px solid var(--card-border);border-radius:10px;padding:20px;margin-bottom:16px}
.card-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
.card-header h3{font-size:14px;font-weight:600;color:var(--text)}
.badge{display:inline-flex;align-items:center;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600}
.badge-primary{background:rgba(59,130,246,.15);color:var(--primary)}
.badge-accent{background:rgba(139,92,246,.15);color:var(--accent)}
.badge-green{background:rgba(34,197,94,.12);color:var(--success)}
.badge-yellow{background:rgba(245,158,11,.12);color:var(--warning)}
.badge-red{background:rgba(239,68,68,.12);color:var(--danger)}
.badge-blue{background:rgba(59,130,246,.12);color:var(--info)}

/* ── KPI Grid ── */
.kpi-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:20px}
.kpi{background:var(--card-bg);border:1px solid var(--card-border);border-radius:10px;padding:18px 20px}
.kpi-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px}
.kpi-icon{font-size:20px}
.kpi-trend{font-size:11px;font-weight:600;padding:2px 8px;border-radius:12px}
.kpi-trend.up{background:rgba(34,197,94,.12);color:var(--success)}
.kpi-trend.down{background:rgba(239,68,68,.12);color:var(--danger)}
.kpi-trend.neutral{background:rgba(245,158,11,.12);color:var(--warning)}
.kpi-value{font-size:26px;font-weight:700;color:var(--text);font-variant-numeric:tabular-nums;font-feature-settings:'tnum';font-family:'IBM Plex Sans',monospace;letter-spacing:-0.03em}
.kpi-label{font-size:12px;color:var(--text-muted);margin-top:4px;font-weight:500}

/* ── Data Table ── */
.tbl-wrap{overflow-x:auto;margin-top:8px}
.data-tbl{width:100%;border-collapse:collapse;font-size:13px}
.data-tbl thead th{text-align:left;padding:10px 14px;font-weight:600;font-size:11.5px;text-transform:uppercase;letter-spacing:.8px;color:var(--text-muted);border-bottom:1px solid var(--card-border);white-space:nowrap}
.data-tbl tbody td{padding:10px 14px;border-bottom:1px solid rgba(255,255,255,.04);color:var(--text);vertical-align:middle}
.data-tbl tbody tr:hover{background:rgba(255,255,255,.02)}
.data-tbl .num{text-align:right;font-variant-numeric:tabular-nums;font-feature-settings:'tnum';font-family:'IBM Plex Sans',monospace;letter-spacing:0.01em}
.data-tbl .center{text-align:center}

/* ── Bar Chart ── */
.bar-chart{display:flex;flex-direction:column;gap:10px;padding:4px 0}
.bar-row{display:flex;align-items:center;gap:12px}
.bar-label{width:120px;font-size:12px;color:var(--text-muted);text-align:right;flex-shrink:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.bar-track{flex:1;height:24px;background:rgba(255,255,255,.04);border-radius:4px;overflow:hidden;position:relative}
.bar-fill{height:100%;border-radius:4px;transition:width 1.2s cubic-bezier(.4,0,.2,1);display:flex;align-items:center;padding-left:8px}
.bar-val{font-size:11px;font-weight:600;color:#fff;white-space:nowrap;font-variant-numeric:tabular-nums}

/* ── Progress Bar ── */
.progress-item{margin-bottom:14px}
.progress-top{display:flex;justify-content:space-between;margin-bottom:5px}
.progress-label{font-size:12px;color:var(--text-muted)}
.progress-pct{font-size:12px;font-weight:600;color:var(--text);font-variant-numeric:tabular-nums}
.progress-track{height:8px;background:rgba(255,255,255,.06);border-radius:4px;overflow:hidden}
.progress-fill{height:100%;border-radius:4px;transition:width 1s ease}

/* ── Alerts ── */
.alert-row{display:flex;align-items:center;gap:12px;padding:10px 14px;border-bottom:1px solid rgba(255,255,255,.04)}
.alert-row:last-child{border-bottom:none}
.alert-icon{font-size:18px;flex-shrink:0}
.alert-text{flex:1;font-size:13px;color:var(--text)}
.alert-badge{flex-shrink:0}

/* ── Grid layouts ── */
.grid-2{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}

/* ── Footer ── */
.footer{margin-left:var(--sidebar-w);padding:24px 28px;text-align:center;font-size:12px;color:var(--text-dim);border-top:1px solid var(--card-border)}

/* ── Settings Form ── */
.form-group{margin-bottom:16px}
.form-label{display:block;font-size:12px;font-weight:600;color:var(--text-muted);margin-bottom:6px;text-transform:uppercase;letter-spacing:.6px}
.form-input{width:100%;padding:10px 14px;background:rgba(255,255,255,.04);border:1px solid var(--card-border);border-radius:8px;color:var(--text);font-size:13.5px;font-family:inherit;transition:border-color .2s}
.form-input:focus{outline:none;border-color:var(--primary)}
select.form-input{cursor:pointer;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%238892a4' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10z'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 12px center}
.toggle-row{display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid rgba(255,255,255,.04)}
.toggle-label{font-size:13.5px;color:var(--text)}
.toggle{width:42px;height:24px;border-radius:12px;position:relative;cursor:pointer;transition:background .2s}
.toggle.on{background:var(--primary)}
.toggle.off{background:var(--text-dim)}
.toggle::after{content:'';position:absolute;top:3px;width:18px;height:18px;border-radius:50%;background:#fff;transition:left .2s}
.toggle.on::after{left:21px}
.toggle.off::after{left:3px}
.form-btn{padding:10px 24px;border:none;border-radius:8px;font-size:13.5px;font-weight:600;cursor:pointer;font-family:inherit;transition:opacity .2s}
.form-btn.primary{background:var(--primary);color:#fff}
.form-btn.primary:hover{opacity:.85}

/* ── Responsive ── */
@media(max-width:1200px){.kpi-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:900px){
  .sidebar{transform:translateX(-100%);transition:transform .3s}
  .sidebar.open{transform:translateX(0)}
  .topbar{left:0}
  .main{margin-left:0}
  .footer{margin-left:0}
  .grid-2{grid-template-columns:1fr}
  .grid-3{grid-template-columns:1fr}
  .kpi-grid{grid-template-columns:repeat(2,1fr)}
  .menu-toggle{display:flex!important}
}
@media(max-width:600px){
  .kpi-grid{grid-template-columns:1fr}
  .main{padding:16px}
  .kpi-value{font-size:22px}
}
.menu-toggle{display:none;width:34px;height:34px;border-radius:8px;background:var(--card-bg);border:1px solid var(--card-border);align-items:center;justify-content:center;cursor:pointer;font-size:18px;color:var(--text)}
</style>
</head>
<body>

<!-- Sidebar -->
<aside class="sidebar" id="sidebar">
  <div class="sidebar-logo">
    <div class="logo-icon">${bn.charAt(0).toUpperCase()}</div>
    <div class="logo-text">${bn}</div>
  </div>
  <nav class="sidebar-nav">
    <a class="active" onclick="showSection('dashboard')" data-section="dashboard"><span class="nav-icon">◉</span>Dashboard</a>
    <a onclick="showSection('invoicing')" data-section="invoicing"><span class="nav-icon">⊞</span>Facturación</a>
    <a onclick="showSection('inventory')" data-section="inventory"><span class="nav-icon">▤</span>Inventario</a>
    <a onclick="showSection('hr')" data-section="hr"><span class="nav-icon">☰</span>RRHH</a>
    <a onclick="showSection('reports')" data-section="reports"><span class="nav-icon">◎</span>Informes</a>
    <a onclick="showSection('analytics')" data-section="analytics"><span class="nav-icon">◈</span>Analytics</a>
    <a onclick="showSection('settings')" data-section="settings"><span class="nav-icon">⚙</span>Config</a>
  </nav>
  <div class="sidebar-footer">Powered by <strong style="color:var(--accent)">Kerno Studio</strong></div>
</aside>

<!-- Topbar -->
<header class="topbar">
  <div style="display:flex;align-items:center;gap:12px">
    <div class="menu-toggle" onclick="document.getElementById('sidebar').classList.toggle('open')">☰</div>
    <div class="topbar-title" id="topbar-title">Dashboard</div>
  </div>
  <div class="topbar-right">
    <div class="notif"><span>🔔</span><span class="dot"></span></div>
    <div class="topbar-avatar">${bn.charAt(0).toUpperCase()}</div>
  </div>
</header>

<!-- Main -->
<main class="main">

  <!-- DASHBOARD -->
  <div class="page-section active" id="sec-dashboard">
    <div class="section-header">
      <div class="section-tag">${(c.businessType || 'ERP').toUpperCase()}</div>
      <h2>Panel de Control</h2>
      <p>Vista general del rendimiento empresarial en tiempo real.</p>
    </div>
    <div class="kpi-grid">
      <div class="kpi"><div class="kpi-top"><span class="kpi-icon">📈</span><span class="kpi-trend up">+12.4%</span></div><div class="kpi-value" data-count="348500" data-prefix="€ ">€ 0</div><div class="kpi-label">Ingresos (Abril)</div></div>
      <div class="kpi"><div class="kpi-top"><span class="kpi-icon">📉</span><span class="kpi-trend up">+3.2%</span></div><div class="kpi-value" data-count="214800" data-prefix="€ ">€ 0</div><div class="kpi-label">Gastos (Abril)</div></div>
      <div class="kpi"><div class="kpi-top"><span class="kpi-icon">💰</span><span class="kpi-trend up">+28.1%</span></div><div class="kpi-value" data-count="133700" data-prefix="€ ">€ 0</div><div class="kpi-label">Beneficio Neto</div></div>
      <div class="kpi"><div class="kpi-top"><span class="kpi-icon">👥</span><span class="kpi-trend neutral">+2 este mes</span></div><div class="kpi-value" data-count="47">0</div><div class="kpi-label">Empleados</div></div>
    </div>
    <div class="grid-2">
      <div class="card">
        <div class="card-header"><h3>PyG Mensual (2026)</h3><span class="badge badge-accent">Acumulado</span></div>
        <div class="bar-chart">
          <div class="bar-row"><div class="bar-label">Enero</div><div class="bar-track"><div class="bar-fill" style="width:0;background:var(--primary)" data-width="68%"><span class="bar-val">€ 272.000</span></div></div></div>
          <div class="bar-row"><div class="bar-label">Febrero</div><div class="bar-track"><div class="bar-fill" style="width:0;background:var(--primary)" data-width="74%"><span class="bar-val">€ 295.400</span></div></div></div>
          <div class="bar-row"><div class="bar-label">Marzo</div><div class="bar-track"><div class="bar-fill" style="width:0;background:var(--primary)" data-width="82%"><span class="bar-val">€ 326.800</span></div></div></div>
          <div class="bar-row"><div class="bar-label">Abril</div><div class="bar-track"><div class="bar-fill" style="width:0;background:var(--accent)" data-width="88%"><span class="bar-val">€ 348.500</span></div></div></div>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><h3>Alertas Recientes</h3><span class="badge badge-primary">5 activas</span></div>
        <div class="alert-row"><span class="alert-icon">⚠️</span><span class="alert-text">6 facturas vencidas — 42.800 € pendiente de cobro</span><span class="alert-badge"><span class="badge badge-red">Cobros</span></span></div>
        <div class="alert-row"><span class="alert-icon">📦</span><span class="alert-text">Stock bajo en 4 productos — reposición urgente</span><span class="alert-badge"><span class="badge badge-yellow">Inventario</span></span></div>
        <div class="alert-row"><span class="alert-icon">🏛️</span><span class="alert-text">Modelo 303 IVA trimestral — vence 20/04/2026</span><span class="alert-badge"><span class="badge badge-yellow">Fiscal</span></span></div>
        <div class="alert-row"><span class="alert-icon">👥</span><span class="alert-text">3 contratos pendientes de renovación</span><span class="alert-badge"><span class="badge badge-blue">RRHH</span></span></div>
        <div class="alert-row"><span class="alert-icon">📊</span><span class="alert-text">Margen operativo por debajo del objetivo (32% vs 35%)</span><span class="alert-badge"><span class="badge badge-accent">Finanzas</span></span></div>
      </div>
    </div>
    <div class="card">
      <div class="card-header"><h3>Facturas Recientes</h3><span class="badge badge-accent">Abril 2026</span></div>
      <div class="tbl-wrap">
        <table class="data-tbl">
          <thead><tr><th>N.º Factura</th><th>Cliente</th><th>Fecha</th><th style="text-align:right">Base</th><th style="text-align:right">IVA</th><th style="text-align:right">Total</th><th>Estado</th></tr></thead>
          <tbody>
            <tr><td>FAC-2026-041</td><td>Grupo Industrial Norte SL</td><td>14/04/2026</td><td class="num">28.500,00 €</td><td class="num">5.985,00 €</td><td class="num">34.485,00 €</td><td><span class="badge badge-green">Cobrada</span></td></tr>
            <tr><td>FAC-2026-040</td><td>Distribuciones Canarias SA</td><td>12/04/2026</td><td class="num">18.200,00 €</td><td class="num">3.822,00 €</td><td class="num">22.022,00 €</td><td><span class="badge badge-green">Cobrada</span></td></tr>
            <tr><td>FAC-2026-039</td><td>Hotel Atlántico Premium</td><td>10/04/2026</td><td class="num">12.800,00 €</td><td class="num">2.688,00 €</td><td class="num">15.488,00 €</td><td><span class="badge badge-yellow">Pendiente</span></td></tr>
            <tr><td>FAC-2026-038</td><td>Constructora Meridiano SL</td><td>08/04/2026</td><td class="num">45.600,00 €</td><td class="num">9.576,00 €</td><td class="num">55.176,00 €</td><td><span class="badge badge-yellow">Pendiente</span></td></tr>
            <tr><td>FAC-2026-037</td><td>TechSoluciones Europa</td><td>05/04/2026</td><td class="num">8.400,00 €</td><td class="num">1.764,00 €</td><td class="num">10.164,00 €</td><td><span class="badge badge-red">Vencida</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- FACTURACION -->
  <div class="page-section" id="sec-invoicing">
    <div class="section-header">
      <div class="section-tag">FACTURACIÓN</div>
      <h2>Gestión de Facturas</h2>
      <p>Control completo de emisión, cobro y estado de todas las facturas.</p>
    </div>
    <div class="kpi-grid">
      <div class="kpi"><div class="kpi-top"><span class="kpi-icon">📄</span><span class="kpi-trend up">+8 vs marzo</span></div><div class="kpi-value" data-count="41">0</div><div class="kpi-label">Facturas Emitidas (Abril)</div></div>
      <div class="kpi"><div class="kpi-top"><span class="kpi-icon">✅</span></div><div class="kpi-value" data-count="29">0</div><div class="kpi-label">Cobradas</div></div>
      <div class="kpi"><div class="kpi-top"><span class="kpi-icon">⏳</span></div><div class="kpi-value" data-count="86450" data-prefix="€ ">€ 0</div><div class="kpi-label">Pendientes de Cobro</div></div>
      <div class="kpi"><div class="kpi-top"><span class="kpi-icon">🔴</span><span class="kpi-trend down">6 facturas</span></div><div class="kpi-value" data-count="42800" data-prefix="€ ">€ 0</div><div class="kpi-label">Vencidas</div></div>
    </div>
    <div class="card">
      <div class="card-header"><h3>Todas las Facturas</h3><span class="badge badge-primary">Abril 2026</span></div>
      <div class="tbl-wrap">
        <table class="data-tbl">
          <thead><tr><th>N.º Factura</th><th>Cliente</th><th>Fecha Emisión</th><th>Vencimiento</th><th style="text-align:right">Base Imponible</th><th style="text-align:right">IVA (21%)</th><th style="text-align:right">Total</th><th>Estado</th></tr></thead>
          <tbody>
            <tr><td>FAC-2026-041</td><td>Grupo Industrial Norte SL</td><td>14/04/2026</td><td>14/05/2026</td><td class="num">28.500,00 €</td><td class="num">5.985,00 €</td><td class="num">34.485,00 €</td><td><span class="badge badge-green">Cobrada</span></td></tr>
            <tr><td>FAC-2026-040</td><td>Distribuciones Canarias SA</td><td>12/04/2026</td><td>12/05/2026</td><td class="num">18.200,00 €</td><td class="num">3.822,00 €</td><td class="num">22.022,00 €</td><td><span class="badge badge-green">Cobrada</span></td></tr>
            <tr><td>FAC-2026-039</td><td>Hotel Atlántico Premium</td><td>10/04/2026</td><td>10/05/2026</td><td class="num">12.800,00 €</td><td class="num">2.688,00 €</td><td class="num">15.488,00 €</td><td><span class="badge badge-yellow">Pendiente</span></td></tr>
            <tr><td>FAC-2026-038</td><td>Constructora Meridiano SL</td><td>08/04/2026</td><td>08/05/2026</td><td class="num">45.600,00 €</td><td class="num">9.576,00 €</td><td class="num">55.176,00 €</td><td><span class="badge badge-yellow">Pendiente</span></td></tr>
            <tr><td>FAC-2026-037</td><td>TechSoluciones Europa</td><td>05/04/2026</td><td>20/03/2026</td><td class="num">8.400,00 €</td><td class="num">1.764,00 €</td><td class="num">10.164,00 €</td><td><span class="badge badge-red">Vencida</span></td></tr>
            <tr><td>FAC-2026-036</td><td>Logística Express SL</td><td>03/04/2026</td><td>03/05/2026</td><td class="num">15.600,00 €</td><td class="num">3.276,00 €</td><td class="num">18.876,00 €</td><td><span class="badge badge-green">Cobrada</span></td></tr>
            <tr><td>FAC-2026-035</td><td>Clínica Bienestar Plus</td><td>01/04/2026</td><td>15/03/2026</td><td class="num">22.400,00 €</td><td class="num">4.704,00 €</td><td class="num">27.104,00 €</td><td><span class="badge badge-red">Vencida</span></td></tr>
            <tr><td>FAC-2026-034</td><td>Academia Digital Pro</td><td>28/03/2026</td><td>28/04/2026</td><td class="num">6.800,00 €</td><td class="num">1.428,00 €</td><td class="num">8.228,00 €</td><td><span class="badge badge-green">Cobrada</span></td></tr>
            <tr><td>FAC-2026-033</td><td>Restaurante El Faro SL</td><td>25/03/2026</td><td>25/04/2026</td><td class="num">4.200,00 €</td><td class="num">882,00 €</td><td class="num">5.082,00 €</td><td><span class="badge badge-yellow">Pendiente</span></td></tr>
            <tr><td>FAC-2026-032</td><td>Inmobiliaria Costa Sur</td><td>22/03/2026</td><td>22/04/2026</td><td class="num">32.100,00 €</td><td class="num">6.741,00 €</td><td class="num">38.841,00 €</td><td><span class="badge badge-blue">Borrador</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- INVENTARIO -->
  <div class="page-section" id="sec-inventory">
    <div class="section-header">
      <div class="section-tag">INVENTARIO</div>
      <h2>Control de Stock</h2>
      <p>Gestión de productos, niveles de stock y alertas de reposición.</p>
    </div>
    <div class="kpi-grid">
      <div class="kpi"><div class="kpi-top"><span class="kpi-icon">📦</span></div><div class="kpi-value" data-count="1284">0</div><div class="kpi-label">Productos Activos</div></div>
      <div class="kpi"><div class="kpi-top"><span class="kpi-icon">⚠️</span><span class="kpi-trend down">Urgente</span></div><div class="kpi-value" data-count="4">0</div><div class="kpi-label">Stock Bajo</div></div>
      <div class="kpi"><div class="kpi-top"><span class="kpi-icon">🔄</span></div><div class="kpi-value" data-count="23">0</div><div class="kpi-label">Pedidos en Tránsito</div></div>
      <div class="kpi"><div class="kpi-top"><span class="kpi-icon">💎</span></div><div class="kpi-value" data-count="892400" data-prefix="€ ">€ 0</div><div class="kpi-label">Valor Total Stock</div></div>
    </div>
    <div class="card">
      <div class="card-header"><h3>Productos</h3><span class="badge badge-accent">1.284 activos</span></div>
      <div class="tbl-wrap">
        <table class="data-tbl">
          <thead><tr><th>SKU</th><th>Producto</th><th>Categoría</th><th style="text-align:right">Precio</th><th style="text-align:right">Stock</th><th>Nivel</th><th style="text-align:right">Min.</th><th>Estado</th></tr></thead>
          <tbody>
            <tr><td style="font-family:monospace;font-size:12px">SKU-001</td><td>Servidor Dell PowerEdge R750</td><td>Hardware</td><td class="num">4.280,00 €</td><td class="num">42</td><td><div style="width:100px;height:8px;background:rgba(255,255,255,.06);border-radius:4px;overflow:hidden"><div style="width:84%;height:100%;background:var(--success);border-radius:4px"></div></div></td><td class="num">10</td><td><span class="badge badge-green">OK</span></td></tr>
            <tr><td style="font-family:monospace;font-size:12px">SKU-002</td><td>Switch Cisco Catalyst 9300</td><td>Redes</td><td class="num">2.150,00 €</td><td class="num">18</td><td><div style="width:100px;height:8px;background:rgba(255,255,255,.06);border-radius:4px;overflow:hidden"><div style="width:60%;height:100%;background:var(--success);border-radius:4px"></div></div></td><td class="num">8</td><td><span class="badge badge-green">OK</span></td></tr>
            <tr><td style="font-family:monospace;font-size:12px">SKU-003</td><td>Monitor LG UltraWide 34"</td><td>Periféricos</td><td class="num">680,00 €</td><td class="num">5</td><td><div style="width:100px;height:8px;background:rgba(255,255,255,.06);border-radius:4px;overflow:hidden"><div style="width:17%;height:100%;background:var(--warning);border-radius:4px"></div></div></td><td class="num">12</td><td><span class="badge badge-yellow">Bajo</span></td></tr>
            <tr><td style="font-family:monospace;font-size:12px">SKU-004</td><td>Licencia Microsoft 365 E3</td><td>Software</td><td class="num">264,00 €</td><td class="num">120</td><td><div style="width:100px;height:8px;background:rgba(255,255,255,.06);border-radius:4px;overflow:hidden"><div style="width:80%;height:100%;background:var(--success);border-radius:4px"></div></div></td><td class="num">30</td><td><span class="badge badge-green">OK</span></td></tr>
            <tr><td style="font-family:monospace;font-size:12px">SKU-005</td><td>Cable Cat6 UTP (305m)</td><td>Cableado</td><td class="num">85,00 €</td><td class="num">3</td><td><div style="width:100px;height:8px;background:rgba(255,255,255,.06);border-radius:4px;overflow:hidden"><div style="width:10%;height:100%;background:var(--danger);border-radius:4px"></div></div></td><td class="num">15</td><td><span class="badge badge-red">Crítico</span></td></tr>
            <tr><td style="font-family:monospace;font-size:12px">SKU-006</td><td>Rack 42U con ventilación</td><td>Infraestructura</td><td class="num">1.420,00 €</td><td class="num">8</td><td><div style="width:100px;height:8px;background:rgba(255,255,255,.06);border-radius:4px;overflow:hidden"><div style="width:40%;height:100%;background:var(--success);border-radius:4px"></div></div></td><td class="num">5</td><td><span class="badge badge-green">OK</span></td></tr>
            <tr><td style="font-family:monospace;font-size:12px">SKU-007</td><td>UPS APC Smart 3000VA</td><td>Energía</td><td class="num">890,00 €</td><td class="num">2</td><td><div style="width:100px;height:8px;background:rgba(255,255,255,.06);border-radius:4px;overflow:hidden"><div style="width:8%;height:100%;background:var(--danger);border-radius:4px"></div></div></td><td class="num">6</td><td><span class="badge badge-red">Crítico</span></td></tr>
            <tr><td style="font-family:monospace;font-size:12px">SKU-008</td><td>Teclado Logitech MX Keys</td><td>Periféricos</td><td class="num">110,00 €</td><td class="num">34</td><td><div style="width:100px;height:8px;background:rgba(255,255,255,.06);border-radius:4px;overflow:hidden"><div style="width:68%;height:100%;background:var(--success);border-radius:4px"></div></div></td><td class="num">10</td><td><span class="badge badge-green">OK</span></td></tr>
            <tr><td style="font-family:monospace;font-size:12px">SKU-009</td><td>Disco SSD Samsung 2TB</td><td>Almacenamiento</td><td class="num">220,00 €</td><td class="num">4</td><td><div style="width:100px;height:8px;background:rgba(255,255,255,.06);border-radius:4px;overflow:hidden"><div style="width:13%;height:100%;background:var(--warning);border-radius:4px"></div></div></td><td class="num">15</td><td><span class="badge badge-yellow">Bajo</span></td></tr>
            <tr><td style="font-family:monospace;font-size:12px">SKU-010</td><td>Webcam Poly Studio P15</td><td>Videoconf.</td><td class="num">540,00 €</td><td class="num">22</td><td><div style="width:100px;height:8px;background:rgba(255,255,255,.06);border-radius:4px;overflow:hidden"><div style="width:73%;height:100%;background:var(--success);border-radius:4px"></div></div></td><td class="num">8</td><td><span class="badge badge-green">OK</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- RRHH -->
  <div class="page-section" id="sec-hr">
    <div class="section-header">
      <div class="section-tag">RECURSOS HUMANOS</div>
      <h2>Gestión de Personal</h2>
      <p>Directorio de empleados, departamentos, roles y nóminas.</p>
    </div>
    <div class="kpi-grid">
      <div class="kpi"><div class="kpi-top"><span class="kpi-icon">👥</span></div><div class="kpi-value" data-count="47">0</div><div class="kpi-label">Empleados Activos</div></div>
      <div class="kpi"><div class="kpi-top"><span class="kpi-icon">🏢</span></div><div class="kpi-value" data-count="6">0</div><div class="kpi-label">Departamentos</div></div>
      <div class="kpi"><div class="kpi-top"><span class="kpi-icon">💼</span></div><div class="kpi-value" data-count="148200" data-prefix="€ ">€ 0</div><div class="kpi-label">Coste Nómina Mensual</div></div>
      <div class="kpi"><div class="kpi-top"><span class="kpi-icon">📋</span><span class="kpi-trend neutral">3 activas</span></div><div class="kpi-value" data-count="3">0</div><div class="kpi-label">Vacantes Abiertas</div></div>
    </div>
    <div class="card">
      <div class="card-header"><h3>Plantilla</h3><span class="badge badge-primary">47 empleados</span></div>
      <div class="tbl-wrap">
        <table class="data-tbl">
          <thead><tr><th>ID</th><th>Nombre</th><th>Departamento</th><th>Puesto</th><th>Antigüedad</th><th style="text-align:right">Salario Bruto</th><th>Contrato</th><th>Estado</th></tr></thead>
          <tbody>
            <tr><td style="font-family:monospace;font-size:12px">EMP-001</td><td>Carlos Méndez García</td><td>Dirección</td><td>CEO</td><td>8 años</td><td class="num">6.800,00 €</td><td>Indefinido</td><td><span class="badge badge-green">Activo</span></td></tr>
            <tr><td style="font-family:monospace;font-size:12px">EMP-002</td><td>Laura Pérez Domínguez</td><td>Finanzas</td><td>CFO</td><td>6 años</td><td class="num">5.400,00 €</td><td>Indefinido</td><td><span class="badge badge-green">Activo</span></td></tr>
            <tr><td style="font-family:monospace;font-size:12px">EMP-003</td><td>Miguel Ángel Rodríguez</td><td>Tecnología</td><td>CTO</td><td>5 años</td><td class="num">5.200,00 €</td><td>Indefinido</td><td><span class="badge badge-green">Activo</span></td></tr>
            <tr><td style="font-family:monospace;font-size:12px">EMP-004</td><td>Ana Belén Torres Ruiz</td><td>Comercial</td><td>Dir. Comercial</td><td>4 años</td><td class="num">4.600,00 €</td><td>Indefinido</td><td><span class="badge badge-green">Activo</span></td></tr>
            <tr><td style="font-family:monospace;font-size:12px">EMP-005</td><td>David Hernández López</td><td>Tecnología</td><td>Lead Developer</td><td>3 años</td><td class="num">3.800,00 €</td><td>Indefinido</td><td><span class="badge badge-green">Activo</span></td></tr>
            <tr><td style="font-family:monospace;font-size:12px">EMP-006</td><td>María José Sánchez</td><td>RRHH</td><td>Dir. RRHH</td><td>4 años</td><td class="num">4.200,00 €</td><td>Indefinido</td><td><span class="badge badge-green">Activo</span></td></tr>
            <tr><td style="font-family:monospace;font-size:12px">EMP-007</td><td>Pablo Gutiérrez Navarro</td><td>Comercial</td><td>Account Manager</td><td>2 años</td><td class="num">2.800,00 €</td><td>Indefinido</td><td><span class="badge badge-green">Activo</span></td></tr>
            <tr><td style="font-family:monospace;font-size:12px">EMP-008</td><td>Sofía Ramírez Delgado</td><td>Tecnología</td><td>Full Stack Dev</td><td>1 año</td><td class="num">3.200,00 €</td><td>Temporal</td><td><span class="badge badge-yellow">Renovación</span></td></tr>
            <tr><td style="font-family:monospace;font-size:12px">EMP-009</td><td>Jorge Martín Alonso</td><td>Operaciones</td><td>Logistics Manager</td><td>3 años</td><td class="num">3.400,00 €</td><td>Indefinido</td><td><span class="badge badge-green">Activo</span></td></tr>
            <tr><td style="font-family:monospace;font-size:12px">EMP-010</td><td>Elena Díaz Moreno</td><td>Finanzas</td><td>Contable Senior</td><td>5 años</td><td class="num">3.000,00 €</td><td>Indefinido</td><td><span class="badge badge-green">Activo</span></td></tr>
            <tr><td style="font-family:monospace;font-size:12px">EMP-011</td><td>Roberto Vega Castro</td><td>Comercial</td><td>Sales Rep</td><td>1 año</td><td class="num">2.400,00 €</td><td>Temporal</td><td><span class="badge badge-yellow">Renovación</span></td></tr>
            <tr><td style="font-family:monospace;font-size:12px">EMP-012</td><td>Carmen Ortiz Jiménez</td><td>Operaciones</td><td>Supply Chain</td><td>2 años</td><td class="num">2.600,00 €</td><td>Indefinido</td><td><span class="badge badge-green">Activo</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- INFORMES -->
  <div class="page-section" id="sec-reports">
    <div class="section-header">
      <div class="section-tag">INFORMES</div>
      <h2>Informes Financieros</h2>
      <p>Resumen financiero consolidado y desglose trimestral.</p>
    </div>
    <div class="kpi-grid">
      <div class="kpi"><div class="kpi-top"><span class="kpi-icon">📊</span></div><div class="kpi-value" data-count="1242700" data-prefix="€ ">€ 0</div><div class="kpi-label">Ingresos Acumulados 2026</div></div>
      <div class="kpi"><div class="kpi-top"><span class="kpi-icon">📉</span></div><div class="kpi-value" data-count="824500" data-prefix="€ ">€ 0</div><div class="kpi-label">Gastos Acumulados</div></div>
      <div class="kpi"><div class="kpi-top"><span class="kpi-icon">💰</span><span class="kpi-trend up">+18.3%</span></div><div class="kpi-value" data-count="418200" data-prefix="€ ">€ 0</div><div class="kpi-label">Beneficio Neto</div></div>
      <div class="kpi"><div class="kpi-top"><span class="kpi-icon">📐</span></div><div class="kpi-value" data-count="33" data-suffix="%">0%</div><div class="kpi-label">Margen Neto</div></div>
    </div>
    <div class="card">
      <div class="card-header"><h3>Desglose Trimestral</h3><span class="badge badge-accent">2026</span></div>
      <div class="tbl-wrap">
        <table class="data-tbl">
          <thead><tr><th>Periodo</th><th style="text-align:right">Ingresos</th><th style="text-align:right">Gastos Operativos</th><th style="text-align:right">Nóminas</th><th style="text-align:right">Impuestos</th><th style="text-align:right">Beneficio Neto</th><th style="text-align:right">Margen</th></tr></thead>
          <tbody>
            <tr><td><strong>Q1 (Ene-Mar)</strong></td><td class="num">894.200,00 €</td><td class="num">312.400,00 €</td><td class="num">444.600,00 €</td><td class="num">28.450,00 €</td><td class="num">108.750,00 €</td><td class="num" style="color:var(--success)">12,2%</td></tr>
            <tr><td><strong>Q2 (Abr-Jun)</strong></td><td class="num">348.500,00 €</td><td class="num">66.600,00 €</td><td class="num">148.200,00 €</td><td class="num">—</td><td class="num">133.700,00 €</td><td class="num" style="color:var(--success)">38,4%</td></tr>
            <tr style="color:var(--text-dim)"><td>Q3 (Jul-Sep)</td><td class="num">—</td><td class="num">—</td><td class="num">—</td><td class="num">—</td><td class="num">—</td><td class="num">—</td></tr>
            <tr style="color:var(--text-dim)"><td>Q4 (Oct-Dic)</td><td class="num">—</td><td class="num">—</td><td class="num">—</td><td class="num">—</td><td class="num">—</td><td class="num">—</td></tr>
            <tr style="font-weight:700;border-top:2px solid var(--card-border)"><td>TOTAL 2026</td><td class="num">1.242.700,00 €</td><td class="num">379.000,00 €</td><td class="num">592.800,00 €</td><td class="num">28.450,00 €</td><td class="num" style="color:var(--success)">418.200,00 €</td><td class="num" style="color:var(--success)">33,6%</td></tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="grid-2">
      <div class="card">
        <div class="card-header"><h3>Ingresos por Trimestre</h3></div>
        <div class="bar-chart">
          <div class="bar-row"><div class="bar-label">Q1 2026</div><div class="bar-track"><div class="bar-fill" style="width:0;background:var(--primary)" data-width="89%"><span class="bar-val">€ 894.200</span></div></div></div>
          <div class="bar-row"><div class="bar-label">Q2 2026</div><div class="bar-track"><div class="bar-fill" style="width:0;background:var(--accent)" data-width="35%"><span class="bar-val">€ 348.500</span></div></div></div>
          <div class="bar-row"><div class="bar-label">Q3 2026</div><div class="bar-track"><div class="bar-fill" style="width:0;background:var(--primary);opacity:.3" data-width="0%"><span class="bar-val">—</span></div></div></div>
          <div class="bar-row"><div class="bar-label">Q4 2026</div><div class="bar-track"><div class="bar-fill" style="width:0;background:var(--primary);opacity:.3" data-width="0%"><span class="bar-val">—</span></div></div></div>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><h3>Distribución de Gastos</h3></div>
        <div class="bar-chart">
          <div class="bar-row"><div class="bar-label">Nóminas</div><div class="bar-track"><div class="bar-fill" style="width:0;background:var(--primary)" data-width="72%"><span class="bar-val">€ 592.800</span></div></div></div>
          <div class="bar-row"><div class="bar-label">Proveedores</div><div class="bar-track"><div class="bar-fill" style="width:0;background:var(--accent)" data-width="28%"><span class="bar-val">€ 128.400</span></div></div></div>
          <div class="bar-row"><div class="bar-label">Alquileres</div><div class="bar-track"><div class="bar-fill" style="width:0;background:var(--primary)" data-width="14%"><span class="bar-val">€ 54.000</span></div></div></div>
          <div class="bar-row"><div class="bar-label">Marketing</div><div class="bar-track"><div class="bar-fill" style="width:0;background:var(--accent)" data-width="10%"><span class="bar-val">€ 42.800</span></div></div></div>
          <div class="bar-row"><div class="bar-label">Impuestos</div><div class="bar-track"><div class="bar-fill" style="width:0;background:var(--warning)" data-width="6%"><span class="bar-val">€ 28.450</span></div></div></div>
        </div>
      </div>
    </div>
  </div>

  <!-- ANALYTICS -->
  <div class="page-section" id="sec-analytics">
    <div class="section-header">
      <div class="section-tag">ANALYTICS</div>
      <h2>Análisis Avanzado</h2>
      <p>Métricas de rendimiento, eficiencia operativa y tendencias.</p>
    </div>
    <div class="kpi-grid">
      <div class="kpi"><div class="kpi-top"><span class="kpi-icon">🎯</span></div><div class="kpi-value" data-count="33" data-suffix="%">0%</div><div class="kpi-label">Margen Neto</div></div>
      <div class="kpi"><div class="kpi-top"><span class="kpi-icon">🔄</span></div><div class="kpi-value" data-count="78" data-suffix="%">0%</div><div class="kpi-label">Ratio Cobro</div></div>
      <div class="kpi"><div class="kpi-top"><span class="kpi-icon">📦</span></div><div class="kpi-value" data-count="4.2">0</div><div class="kpi-label">Rotación Inventario</div></div>
      <div class="kpi"><div class="kpi-top"><span class="kpi-icon">⚡</span></div><div class="kpi-value" data-count="92" data-suffix="%">0%</div><div class="kpi-label">Eficiencia Operativa</div></div>
    </div>
    <div class="grid-2">
      <div class="card">
        <div class="card-header"><h3>Indicadores Clave</h3></div>
        <div class="progress-item"><div class="progress-top"><span class="progress-label">Margen Operativo</span><span class="progress-pct">38%</span></div><div class="progress-track"><div class="progress-fill" style="width:0;background:var(--primary)" data-width="38%"></div></div></div>
        <div class="progress-item"><div class="progress-top"><span class="progress-label">Ratio de Cobro</span><span class="progress-pct">78%</span></div><div class="progress-track"><div class="progress-fill" style="width:0;background:var(--accent)" data-width="78%"></div></div></div>
        <div class="progress-item"><div class="progress-top"><span class="progress-label">Liquidez Corriente</span><span class="progress-pct">68%</span></div><div class="progress-track"><div class="progress-fill" style="width:0;background:var(--success)" data-width="68%"></div></div></div>
        <div class="progress-item"><div class="progress-top"><span class="progress-label">Endeudamiento</span><span class="progress-pct">22%</span></div><div class="progress-track"><div class="progress-fill" style="width:0;background:var(--warning)" data-width="22%"></div></div></div>
        <div class="progress-item"><div class="progress-top"><span class="progress-label">ROE</span><span class="progress-pct">41%</span></div><div class="progress-track"><div class="progress-fill" style="width:0;background:var(--primary)" data-width="41%"></div></div></div>
        <div class="progress-item"><div class="progress-top"><span class="progress-label">Eficiencia Operativa</span><span class="progress-pct">92%</span></div><div class="progress-track"><div class="progress-fill" style="width:0;background:var(--success)" data-width="92%"></div></div></div>
      </div>
      <div class="card">
        <div class="card-header"><h3>Top Clientes por Facturación</h3></div>
        <div class="bar-chart">
          <div class="bar-row"><div class="bar-label">Constructora Meridiano</div><div class="bar-track"><div class="bar-fill" style="width:0;background:var(--accent)" data-width="100%"><span class="bar-val">€ 124.800</span></div></div></div>
          <div class="bar-row"><div class="bar-label">Grupo Industrial Norte</div><div class="bar-track"><div class="bar-fill" style="width:0;background:var(--primary)" data-width="82%"><span class="bar-val">€ 102.400</span></div></div></div>
          <div class="bar-row"><div class="bar-label">Distrib. Canarias</div><div class="bar-track"><div class="bar-fill" style="width:0;background:var(--accent)" data-width="68%"><span class="bar-val">€ 84.600</span></div></div></div>
          <div class="bar-row"><div class="bar-label">Hotel Atlántico</div><div class="bar-track"><div class="bar-fill" style="width:0;background:var(--primary)" data-width="52%"><span class="bar-val">€ 64.200</span></div></div></div>
          <div class="bar-row"><div class="bar-label">TechSoluciones</div><div class="bar-track"><div class="bar-fill" style="width:0;background:var(--accent)" data-width="38%"><span class="bar-val">€ 47.800</span></div></div></div>
        </div>
      </div>
    </div>
    <div class="grid-2">
      <div class="card">
        <div class="card-header"><h3>Ingresos vs Gastos Mensual</h3></div>
        <div class="bar-chart">
          <div class="bar-row"><div class="bar-label">Ing. Enero</div><div class="bar-track"><div class="bar-fill" style="width:0;background:var(--success)" data-width="68%"><span class="bar-val">€ 272.000</span></div></div></div>
          <div class="bar-row"><div class="bar-label">Gas. Enero</div><div class="bar-track"><div class="bar-fill" style="width:0;background:var(--danger)" data-width="52%"><span class="bar-val">€ 208.400</span></div></div></div>
          <div class="bar-row"><div class="bar-label">Ing. Febrero</div><div class="bar-track"><div class="bar-fill" style="width:0;background:var(--success)" data-width="74%"><span class="bar-val">€ 295.400</span></div></div></div>
          <div class="bar-row"><div class="bar-label">Gas. Febrero</div><div class="bar-track"><div class="bar-fill" style="width:0;background:var(--danger)" data-width="54%"><span class="bar-val">€ 216.200</span></div></div></div>
          <div class="bar-row"><div class="bar-label">Ing. Marzo</div><div class="bar-track"><div class="bar-fill" style="width:0;background:var(--success)" data-width="82%"><span class="bar-val">€ 326.800</span></div></div></div>
          <div class="bar-row"><div class="bar-label">Gas. Marzo</div><div class="bar-track"><div class="bar-fill" style="width:0;background:var(--danger)" data-width="50%"><span class="bar-val">€ 199.100</span></div></div></div>
          <div class="bar-row"><div class="bar-label">Ing. Abril</div><div class="bar-track"><div class="bar-fill" style="width:0;background:var(--success)" data-width="88%"><span class="bar-val">€ 348.500</span></div></div></div>
          <div class="bar-row"><div class="bar-label">Gas. Abril</div><div class="bar-track"><div class="bar-fill" style="width:0;background:var(--danger)" data-width="54%"><span class="bar-val">€ 214.800</span></div></div></div>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><h3>Rendimiento por Departamento</h3></div>
        <div class="bar-chart">
          <div class="bar-row"><div class="bar-label">Comercial</div><div class="bar-track"><div class="bar-fill" style="width:0;background:var(--primary)" data-width="94%"><span class="bar-val">94% objetivo</span></div></div></div>
          <div class="bar-row"><div class="bar-label">Tecnología</div><div class="bar-track"><div class="bar-fill" style="width:0;background:var(--accent)" data-width="88%"><span class="bar-val">88% objetivo</span></div></div></div>
          <div class="bar-row"><div class="bar-label">Operaciones</div><div class="bar-track"><div class="bar-fill" style="width:0;background:var(--primary)" data-width="82%"><span class="bar-val">82% objetivo</span></div></div></div>
          <div class="bar-row"><div class="bar-label">Finanzas</div><div class="bar-track"><div class="bar-fill" style="width:0;background:var(--accent)" data-width="96%"><span class="bar-val">96% objetivo</span></div></div></div>
          <div class="bar-row"><div class="bar-label">RRHH</div><div class="bar-track"><div class="bar-fill" style="width:0;background:var(--primary)" data-width="85%"><span class="bar-val">85% objetivo</span></div></div></div>
        </div>
      </div>
    </div>
  </div>

  <!-- CONFIG -->
  <div class="page-section" id="sec-settings">
    <div class="section-header">
      <div class="section-tag">CONFIGURACIÓN</div>
      <h2>Ajustes del Sistema</h2>
      <p>Personaliza los parámetros generales del ERP.</p>
    </div>
    <div class="grid-2">
      <div class="card">
        <div class="card-header"><h3>Datos de Empresa</h3></div>
        <div class="form-group"><label class="form-label">Razón Social</label><input class="form-input" type="text" value="${bn}"></div>
        <div class="form-group"><label class="form-label">CIF / NIF</label><input class="form-input" type="text" value="B-76543210"></div>
        <div class="form-group"><label class="form-label">Email Corporativo</label><input class="form-input" type="email" value="admin@empresa.com"></div>
        <div class="form-group"><label class="form-label">Dirección Fiscal</label><input class="form-input" type="text" value="C/ Gran Vía 42, 28013 Madrid"></div>
        <div class="form-group"><label class="form-label">Moneda</label><select class="form-input"><option>EUR (€)</option><option>USD ($)</option><option>GBP (£)</option></select></div>
        <div class="form-group"><label class="form-label">Tipo Impositivo</label><select class="form-input"><option>21% IVA</option><option>10% IVA Reducido</option><option>4% IVA Superreducido</option><option>7% IGIC</option><option>3% IGIC Reducido</option></select></div>
      </div>
      <div class="card">
        <div class="card-header"><h3>Preferencias</h3></div>
        <div class="toggle-row"><span class="toggle-label">Facturación automática</span><div class="toggle on" onclick="this.classList.toggle('on');this.classList.toggle('off')"></div></div>
        <div class="toggle-row"><span class="toggle-label">Alertas de stock bajo</span><div class="toggle on" onclick="this.classList.toggle('on');this.classList.toggle('off')"></div></div>
        <div class="toggle-row"><span class="toggle-label">Recordatorios de cobro</span><div class="toggle on" onclick="this.classList.toggle('on');this.classList.toggle('off')"></div></div>
        <div class="toggle-row"><span class="toggle-label">Informes mensuales automáticos</span><div class="toggle on" onclick="this.classList.toggle('on');this.classList.toggle('off')"></div></div>
        <div class="toggle-row"><span class="toggle-label">Notificaciones por email</span><div class="toggle off" onclick="this.classList.toggle('on');this.classList.toggle('off')"></div></div>
        <div class="toggle-row"><span class="toggle-label">Modo oscuro</span><div class="toggle on" onclick="this.classList.toggle('on');this.classList.toggle('off')"></div></div>
        <div style="margin-top:20px;display:flex;gap:12px">
          <button class="form-btn primary">Guardar Cambios</button>
        </div>
      </div>
    </div>
  </div>

</main>

<div class="footer">&copy; 2026 ${bn} — Powered by <strong style="color:var(--accent)">Kerno Studio</strong></div>

<script>
(function(){
  var sections=['dashboard','invoicing','inventory','hr','reports','analytics','settings'];
  var titles={dashboard:'Dashboard',invoicing:'Facturación',inventory:'Inventario',hr:'RRHH',reports:'Informes',analytics:'Analytics',settings:'Configuración'};

  window.showSection=function(id){
    sections.forEach(function(s){
      var el=document.getElementById('sec-'+s);
      var link=document.querySelector('[data-section="'+s+'"]');
      if(el)el.classList.remove('active');
      if(link)link.classList.remove('active');
    });
    var target=document.getElementById('sec-'+id);
    var activeLink=document.querySelector('[data-section="'+id+'"]');
    if(target)target.classList.add('active');
    if(activeLink)activeLink.classList.add('active');
    var tt=document.getElementById('topbar-title');
    if(tt)tt.textContent=titles[id]||id;
    window.scrollTo(0,0);
    animateCounters();
    animateBars();
    animateProgress();
  };

  function formatNum(n,prefix,suffix){
    prefix=prefix||'';suffix=suffix||'';
    if(n>=1000){
      var s=Math.round(n).toString();
      var parts=[];
      for(var i=s.length;i>0;i-=3){parts.unshift(s.substring(Math.max(0,i-3),i));}
      return prefix+parts.join('.')+suffix;
    }
    return prefix+(n%1===0?n.toFixed(0):n.toFixed(1))+suffix;
  }

  function animateCounters(){
    var els=document.querySelectorAll('.page-section.active .kpi-value[data-count]');
    els.forEach(function(el){
      var target=parseFloat(el.getAttribute('data-count'));
      var prefix=el.getAttribute('data-prefix')||'';
      var suffix=el.getAttribute('data-suffix')||'';
      var start=0;var dur=1200;var startTime=null;
      function step(ts){
        if(!startTime)startTime=ts;
        var prog=Math.min((ts-startTime)/dur,1);
        var ease=1-Math.pow(1-prog,3);
        var current=start+(target-start)*ease;
        el.textContent=formatNum(current,prefix,suffix);
        if(prog<1)requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }

  function animateBars(){
    var bars=document.querySelectorAll('.page-section.active .bar-fill[data-width]');
    bars.forEach(function(b,i){
      setTimeout(function(){b.style.width=b.getAttribute('data-width');},80*i);
    });
  }

  function animateProgress(){
    var fills=document.querySelectorAll('.page-section.active .progress-fill[data-width]');
    fills.forEach(function(f,i){
      setTimeout(function(){f.style.width=f.getAttribute('data-width');},100*i);
    });
  }

  setTimeout(function(){animateCounters();animateBars();animateProgress();},200);
})();
</script>
</body>
</html>`
  },
}
