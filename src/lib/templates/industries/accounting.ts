import type { TemplateDefinition, TemplateCustomization } from '../types'

export const accountingTemplate: TemplateDefinition = {
  meta: {
    id: 'accounting',
    name: 'Contabilidad & Finanzas',
    industries: ['accounting', 'contabilidad', 'facturación', 'invoicing', 'impuestos', 'taxes', 'fiscal', 'finanzas', 'finance'],
    projectTypes: ['landing', 'mvp', 'system', 'saas'],
    sections: ['dashboard', 'invoices', 'expenses', 'taxes', 'bank', 'analytics', 'settings'],
    description: 'Plantilla premium para contabilidad y finanzas con sidebar. Dashboard con KPIs de ingresos/gastos, gestión de facturas, control de gastos por categoría, resumen fiscal con IGIC/IVA y modelos 303/111/115, movimientos bancarios con saldo acumulado, analytics financieros y configuración.',
  },

  render(c: TemplateCustomization): string {
    const p = c.primaryColor || '#059669'
    const a = c.accentColor || '#8b5cf6'
    const bn = c.businessName || 'Mi Empresa'

    return `<!DOCTYPE html>
<html lang="${c.locale || 'es'}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${bn} — Contabilidad</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --primary:${p};
  --accent:${a};
  --sidebar-bg:#111418;
  --content-bg:#0d1014;
  --card-bg:#161a20;
  --card-border:#21272f;
  --topbar-bg:#111418;
  --text:#e6e8ed;
  --text-muted:#828a9a;
  --text-dim:#555d6e;
  --success:#22c55e;
  --warning:#f59e0b;
  --danger:#ef4444;
  --info:#3b82f6;
  --sidebar-w:250px;
  --topbar-h:54px;
}
html{scroll-behavior:smooth}
body{font-family:'Source Sans 3',sans-serif;background:var(--content-bg);color:var(--text);overflow-x:hidden;min-height:100vh}

/* ── Sidebar ── */
.sidebar{position:fixed;left:0;top:0;width:var(--sidebar-w);height:100vh;background:var(--sidebar-bg);border-right:1px solid var(--card-border);display:flex;flex-direction:column;z-index:100;overflow-y:auto}
.sidebar-logo{padding:16px 18px;border-bottom:1px solid var(--card-border);display:flex;align-items:center;gap:10px}
.sidebar-logo .logo-icon{width:32px;height:32px;border-radius:7px;background:var(--primary);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;color:#fff;flex-shrink:0}
.sidebar-logo .logo-text{font-weight:700;font-size:13.5px;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sidebar-nav{flex:1;padding:10px 0}
.sidebar-nav a{display:flex;align-items:center;gap:11px;padding:9px 18px;color:var(--text-muted);text-decoration:none;font-size:13px;font-weight:500;transition:all .2s;cursor:pointer;border-left:3px solid transparent}
.sidebar-nav a:hover{color:var(--text);background:rgba(255,255,255,.03)}
.sidebar-nav a.active{color:var(--primary);background:rgba(5,150,105,.08);border-left-color:var(--primary)}
.sidebar-nav a .nav-icon{font-size:15px;width:20px;text-align:center;flex-shrink:0}
.sidebar-footer{padding:14px 18px;border-top:1px solid var(--card-border);font-size:10.5px;color:var(--text-dim)}

/* ── Topbar ── */
.topbar{position:fixed;top:0;left:var(--sidebar-w);right:0;height:var(--topbar-h);background:var(--topbar-bg);border-bottom:1px solid var(--card-border);display:flex;align-items:center;justify-content:space-between;padding:0 24px;z-index:90}
.topbar-title{font-size:14.5px;font-weight:600;color:var(--text)}
.topbar-right{display:flex;align-items:center;gap:14px}
.topbar-right .notif{width:32px;height:32px;border-radius:7px;background:var(--card-bg);border:1px solid var(--card-border);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:13px;position:relative}
.topbar-right .notif .dot{position:absolute;top:5px;right:5px;width:6px;height:6px;border-radius:50%;background:var(--danger)}
.topbar-avatar{width:32px;height:32px;border-radius:50%;background:var(--primary);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:12px;color:#fff;cursor:pointer}

/* ── Main ── */
.main{margin-left:var(--sidebar-w);margin-top:var(--topbar-h);padding:24px;min-height:calc(100vh - var(--topbar-h))}
.page-section{display:none}
.page-section.active{display:block}
.section-header{margin-bottom:22px}
.section-header .section-tag{font-size:10.5px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;color:var(--primary);margin-bottom:5px}
.section-header h2{font-size:21px;font-weight:700;color:var(--text);margin-bottom:3px}
.section-header p{font-size:13px;color:var(--text-muted)}

/* ── Cards ── */
.card{background:var(--card-bg);border:1px solid var(--card-border);border-radius:9px;padding:18px;margin-bottom:14px}
.card-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px}
.card-header h3{font-size:13.5px;font-weight:600;color:var(--text)}
.badge{display:inline-flex;align-items:center;padding:2px 9px;border-radius:20px;font-size:10.5px;font-weight:600}
.badge-primary{background:rgba(5,150,105,.14);color:var(--primary)}
.badge-accent{background:rgba(139,92,246,.14);color:var(--accent)}
.badge-green{background:rgba(34,197,94,.11);color:var(--success)}
.badge-yellow{background:rgba(245,158,11,.11);color:var(--warning)}
.badge-red{background:rgba(239,68,68,.11);color:var(--danger)}
.badge-blue{background:rgba(59,130,246,.11);color:var(--info)}

/* ── KPI Grid ── */
.kpi-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:18px}
.kpi{background:var(--card-bg);border:1px solid var(--card-border);border-radius:9px;padding:16px 18px}
.kpi-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}
.kpi-icon{font-size:18px}
.kpi-trend{font-size:10.5px;font-weight:600;padding:2px 7px;border-radius:10px}
.kpi-trend.up{background:rgba(34,197,94,.11);color:var(--success)}
.kpi-trend.down{background:rgba(239,68,68,.11);color:var(--danger)}
.kpi-trend.neutral{background:rgba(245,158,11,.11);color:var(--warning)}
.kpi-value{font-size:24px;font-weight:700;color:var(--text);font-variant-numeric:tabular-nums;font-feature-settings:'tnum';letter-spacing:-0.03em}
.kpi-label{font-size:11.5px;color:var(--text-muted);margin-top:3px;font-weight:500}

/* ── Data Table ── */
.tbl-wrap{overflow-x:auto;margin-top:6px}
.data-tbl{width:100%;border-collapse:collapse;font-size:12.5px}
.data-tbl thead th{text-align:left;padding:8px 12px;font-weight:600;font-size:10.5px;text-transform:uppercase;letter-spacing:.8px;color:var(--text-muted);border-bottom:1px solid var(--card-border);white-space:nowrap}
.data-tbl tbody td{padding:8px 12px;border-bottom:1px solid rgba(255,255,255,.03);color:var(--text);vertical-align:middle}
.data-tbl tbody tr:hover{background:rgba(255,255,255,.02)}
.data-tbl .num{text-align:right;font-variant-numeric:tabular-nums;font-feature-settings:'tnum';letter-spacing:0.01em}
.data-tbl .center{text-align:center}

/* ── Bar Chart ── */
.bar-chart{display:flex;flex-direction:column;gap:9px;padding:3px 0}
.bar-row{display:flex;align-items:center;gap:10px}
.bar-label{width:110px;font-size:11.5px;color:var(--text-muted);text-align:right;flex-shrink:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.bar-track{flex:1;height:22px;background:rgba(255,255,255,.03);border-radius:4px;overflow:hidden}
.bar-fill{height:100%;border-radius:4px;transition:width 1.2s cubic-bezier(.4,0,.2,1);display:flex;align-items:center;padding-left:7px}
.bar-val{font-size:10.5px;font-weight:600;color:#fff;white-space:nowrap;font-variant-numeric:tabular-nums}

/* ── Progress ── */
.progress-item{margin-bottom:12px}
.progress-top{display:flex;justify-content:space-between;margin-bottom:4px}
.progress-label{font-size:11.5px;color:var(--text-muted)}
.progress-pct{font-size:11.5px;font-weight:600;color:var(--text);font-variant-numeric:tabular-nums}
.progress-track{height:7px;background:rgba(255,255,255,.05);border-radius:4px;overflow:hidden}
.progress-fill{height:100%;border-radius:4px;transition:width 1s ease}

/* ── Alerts ── */
.alert-row{display:flex;align-items:center;gap:10px;padding:9px 12px;border-bottom:1px solid rgba(255,255,255,.03)}
.alert-row:last-child{border-bottom:none}
.alert-icon{font-size:16px;flex-shrink:0}
.alert-text{flex:1;font-size:12.5px;color:var(--text)}
.alert-badge{flex-shrink:0}

/* ── Grids ── */
.grid-2{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}
.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}

/* ── Footer ── */
.footer{margin-left:var(--sidebar-w);padding:22px 24px;text-align:center;font-size:11px;color:var(--text-dim);border-top:1px solid var(--card-border)}

/* ── Settings ── */
.form-group{margin-bottom:14px}
.form-label{display:block;font-size:11px;font-weight:600;color:var(--text-muted);margin-bottom:5px;text-transform:uppercase;letter-spacing:.6px}
.form-input{width:100%;padding:9px 12px;background:rgba(255,255,255,.03);border:1px solid var(--card-border);border-radius:7px;color:var(--text);font-size:13px;font-family:inherit;transition:border-color .2s}
.form-input:focus{outline:none;border-color:var(--primary)}
select.form-input{cursor:pointer;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%23828a9a' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10z'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 10px center}
.toggle-row{display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid rgba(255,255,255,.03)}
.toggle-label{font-size:13px;color:var(--text)}
.toggle{width:40px;height:22px;border-radius:11px;position:relative;cursor:pointer;transition:background .2s}
.toggle.on{background:var(--primary)}
.toggle.off{background:var(--text-dim)}
.toggle::after{content:'';position:absolute;top:3px;width:16px;height:16px;border-radius:50%;background:#fff;transition:left .2s}
.toggle.on::after{left:21px}
.toggle.off::after{left:3px}
.form-btn{padding:9px 22px;border:none;border-radius:7px;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;transition:opacity .2s}
.form-btn.primary{background:var(--primary);color:#fff}
.form-btn.primary:hover{opacity:.85}

/* ── Responsive ── */
@media(max-width:1200px){.kpi-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:900px){
  .sidebar{display:none}
  .topbar{left:0}
  .main{margin-left:0;width:100%;padding:16px;padding-bottom:70px}
  .footer{margin-left:0}
  .bottom-nav{display:flex}
  .grid-2{grid-template-columns:1fr}
  .grid-3{grid-template-columns:1fr}
  .kpi-grid{grid-template-columns:repeat(2,1fr)}
}
@media(max-width:600px){
  .kpi-grid{grid-template-columns:1fr}
  .kpi-value{font-size:20px}
}
.menu-toggle{display:none;width:32px;height:32px;border-radius:7px;background:var(--card-bg);border:1px solid var(--card-border);align-items:center;justify-content:center;cursor:pointer;font-size:16px;color:var(--text)}
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

<!-- Sidebar -->
<aside class="sidebar" id="sidebar">
  <div class="sidebar-logo">
    <div class="logo-icon">${bn.charAt(0).toUpperCase()}</div>
    <div class="logo-text">${bn}</div>
  </div>
  <nav class="sidebar-nav">
    <a class="active" onclick="showSection('dashboard')" data-section="dashboard"><span class="nav-icon">◉</span>Dashboard</a>
    <a onclick="showSection('invoices')" data-section="invoices"><span class="nav-icon">⊞</span>Facturas</a>
    <a onclick="showSection('expenses')" data-section="expenses"><span class="nav-icon">▤</span>Gastos</a>
    <a onclick="showSection('taxes')" data-section="taxes"><span class="nav-icon">☰</span>Impuestos</a>
    <a onclick="showSection('bank')" data-section="bank"><span class="nav-icon">◎</span>Banco</a>
    <a onclick="showSection('analytics')" data-section="analytics"><span class="nav-icon">◈</span>Analytics</a>
    <a onclick="showSection('settings')" data-section="settings"><span class="nav-icon">⚙</span>Config</a>
  </nav>
  <div class="sidebar-footer">Powered by <strong style="color:var(--accent)">Kerno Studio</strong></div>
</aside>

<!-- Topbar -->
<header class="topbar">
  <div style="display:flex;align-items:center;gap:10px">
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
      <div class="section-tag">${(c.businessType || 'CONTABILIDAD').toUpperCase()}</div>
      <h2>Panel de Control</h2>
      <p>Vista en tiempo real de la salud financiera de tu negocio.</p>
    </div>
    <div class="kpi-grid">
      <div class="kpi"><div class="kpi-top"><span class="kpi-icon">📈</span><span class="kpi-trend up">+12.4%</span></div><div class="kpi-value" data-count="127450" data-prefix="€ ">€ 0</div><div class="kpi-label">Ingresos (Abril)</div></div>
      <div class="kpi"><div class="kpi-top"><span class="kpi-icon">📉</span><span class="kpi-trend up">+3.2%</span></div><div class="kpi-value" data-count="82300" data-prefix="€ ">€ 0</div><div class="kpi-label">Gastos (Abril)</div></div>
      <div class="kpi"><div class="kpi-top"><span class="kpi-icon">💰</span><span class="kpi-trend up">+28.1%</span></div><div class="kpi-value" data-count="45150" data-prefix="€ ">€ 0</div><div class="kpi-label">Beneficio Neto</div></div>
      <div class="kpi"><div class="kpi-top"><span class="kpi-icon">🏛️</span><span class="kpi-trend neutral">Vence 20/04</span></div><div class="kpi-value" data-count="14280" data-prefix="€ ">€ 0</div><div class="kpi-label">IVA/IGIC Pendiente</div></div>
    </div>
    <div class="grid-2">
      <div class="card">
        <div class="card-header"><h3>Evolución Ingresos Mensual</h3><span class="badge badge-accent">2026</span></div>
        <div class="bar-chart">
          <div class="bar-row"><div class="bar-label">Enero</div><div class="bar-track"><div class="bar-fill" style="width:0;background:var(--primary)" data-width="70%"><span class="bar-val">€ 98.200</span></div></div></div>
          <div class="bar-row"><div class="bar-label">Febrero</div><div class="bar-track"><div class="bar-fill" style="width:0;background:var(--primary)" data-width="75%"><span class="bar-val">€ 105.400</span></div></div></div>
          <div class="bar-row"><div class="bar-label">Marzo</div><div class="bar-track"><div class="bar-fill" style="width:0;background:var(--primary)" data-width="85%"><span class="bar-val">€ 118.900</span></div></div></div>
          <div class="bar-row"><div class="bar-label">Abril</div><div class="bar-track"><div class="bar-fill" style="width:0;background:var(--accent)" data-width="91%"><span class="bar-val">€ 127.450</span></div></div></div>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><h3>Alertas Financieras</h3><span class="badge badge-primary">4 activas</span></div>
        <div class="alert-row"><span class="alert-icon">⚠️</span><span class="alert-text">8 facturas vencidas por cobrar — 23.400 €</span><span class="alert-badge"><span class="badge badge-red">Cobros</span></span></div>
        <div class="alert-row"><span class="alert-icon">🏛️</span><span class="alert-text">Modelo 303 (IVA/IGIC) — vence 20/04/2026</span><span class="alert-badge"><span class="badge badge-yellow">Fiscal</span></span></div>
        <div class="alert-row"><span class="alert-icon">🏦</span><span class="alert-text">3 movimientos bancarios sin conciliar</span><span class="alert-badge"><span class="badge badge-blue">Banco</span></span></div>
        <div class="alert-row"><span class="alert-icon">📄</span><span class="alert-text">2 facturas borrador pendientes de envío</span><span class="alert-badge"><span class="badge badge-accent">Facturas</span></span></div>
      </div>
    </div>
    <div class="card">
      <div class="card-header"><h3>Facturas Vencidas</h3><span class="badge badge-red">Atención</span></div>
      <div class="tbl-wrap">
        <table class="data-tbl">
          <thead><tr><th>N.º Factura</th><th>Cliente</th><th>Importe</th><th>Vencimiento</th><th>Días Vencida</th><th>Estado</th></tr></thead>
          <tbody>
            <tr><td>FAC-2026-005</td><td>Clínica Bienestar</td><td class="num">16.692,00 €</td><td>25/03/2026</td><td class="num" style="color:var(--danger)">15 días</td><td><span class="badge badge-red">Vencida</span></td></tr>
            <tr><td>FAC-2026-011</td><td>Restaurante El Faro</td><td class="num">3.424,00 €</td><td>28/03/2026</td><td class="num" style="color:var(--danger)">12 días</td><td><span class="badge badge-red">Vencida</span></td></tr>
            <tr><td>FAC-2026-014</td><td>Logística Express</td><td class="num">3.284,00 €</td><td>02/04/2026</td><td class="num" style="color:var(--warning)">7 días</td><td><span class="badge badge-red">Vencida</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- FACTURAS -->
  <div class="page-section" id="sec-invoices">
    <div class="section-header">
      <div class="section-tag">FACTURACIÓN</div>
      <h2>Gestión de Facturas</h2>
      <p>Emite, gestiona y controla el cobro de todas tus facturas.</p>
    </div>
    <div class="kpi-grid">
      <div class="kpi"><div class="kpi-top"><span class="kpi-icon">📄</span><span class="kpi-trend up">+5 vs marzo</span></div><div class="kpi-value" data-count="28">0</div><div class="kpi-label">Facturas Emitidas (Abril)</div></div>
      <div class="kpi"><div class="kpi-top"><span class="kpi-icon">✅</span></div><div class="kpi-value" data-count="18">0</div><div class="kpi-label">Cobradas</div></div>
      <div class="kpi"><div class="kpi-top"><span class="kpi-icon">⏳</span></div><div class="kpi-value" data-count="42580" data-prefix="€ ">€ 0</div><div class="kpi-label">Pendientes de Cobro</div></div>
      <div class="kpi"><div class="kpi-top"><span class="kpi-icon">🔴</span><span class="kpi-trend down">3 facturas</span></div><div class="kpi-value" data-count="23400" data-prefix="€ ">€ 0</div><div class="kpi-label">Vencidas</div></div>
    </div>
    <div class="card">
      <div class="card-header"><h3>Facturas Recientes</h3><span class="badge badge-primary">Abril 2026</span></div>
      <div class="tbl-wrap">
        <table class="data-tbl">
          <thead><tr><th>N.º Factura</th><th>Cliente</th><th>Fecha</th><th>Vencimiento</th><th style="text-align:right">Base</th><th style="text-align:right">IGIC/IVA</th><th style="text-align:right">Total</th><th>Estado</th></tr></thead>
          <tbody>
            <tr><td>FAC-2026-001</td><td>TechSoluciones SL</td><td>01/04/2026</td><td>01/05/2026</td><td class="num">8.500,00 €</td><td class="num">595,00 €</td><td class="num">9.095,00 €</td><td><span class="badge badge-green">Cobrada</span></td></tr>
            <tr><td>FAC-2026-002</td><td>Distribuciones Canarias</td><td>03/04/2026</td><td>03/05/2026</td><td class="num">12.300,00 €</td><td class="num">861,00 €</td><td class="num">13.161,00 €</td><td><span class="badge badge-green">Cobrada</span></td></tr>
            <tr><td>FAC-2026-003</td><td>Hotel Atlántico Premium</td><td>05/04/2026</td><td>05/05/2026</td><td class="num">5.800,00 €</td><td class="num">406,00 €</td><td class="num">6.206,00 €</td><td><span class="badge badge-yellow">Pendiente</span></td></tr>
            <tr><td>FAC-2026-004</td><td>Restaurante El Faro</td><td>08/04/2026</td><td>08/05/2026</td><td class="num">3.200,00 €</td><td class="num">224,00 €</td><td class="num">3.424,00 €</td><td><span class="badge badge-yellow">Pendiente</span></td></tr>
            <tr><td>FAC-2026-005</td><td>Clínica Bienestar</td><td>10/04/2026</td><td>25/03/2026</td><td class="num">15.600,00 €</td><td class="num">1.092,00 €</td><td class="num">16.692,00 €</td><td><span class="badge badge-red">Vencida</span></td></tr>
            <tr><td>FAC-2026-006</td><td>Constructora Meridiano</td><td>12/04/2026</td><td>12/05/2026</td><td class="num">22.100,00 €</td><td class="num">1.547,00 €</td><td class="num">23.647,00 €</td><td><span class="badge badge-blue">Borrador</span></td></tr>
            <tr><td>FAC-2026-007</td><td>Academia Digital Pro</td><td>14/04/2026</td><td>14/05/2026</td><td class="num">4.750,00 €</td><td class="num">332,50 €</td><td class="num">5.082,50 €</td><td><span class="badge badge-green">Cobrada</span></td></tr>
            <tr><td>FAC-2026-008</td><td>Logística Express</td><td>15/04/2026</td><td>15/05/2026</td><td class="num">9.400,00 €</td><td class="num">658,00 €</td><td class="num">10.058,00 €</td><td><span class="badge badge-yellow">Pendiente</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- GASTOS -->
  <div class="page-section" id="sec-expenses">
    <div class="section-header">
      <div class="section-tag">GASTOS</div>
      <h2>Control de Gastos</h2>
      <p>Registra y categoriza todos los gastos del negocio para un control financiero preciso.</p>
    </div>
    <div class="kpi-grid">
      <div class="kpi"><div class="kpi-top"><span class="kpi-icon">💸</span><span class="kpi-trend up">+3.2%</span></div><div class="kpi-value" data-count="82300" data-prefix="€ ">€ 0</div><div class="kpi-label">Gastos Totales (Abril)</div></div>
      <div class="kpi"><div class="kpi-top"><span class="kpi-icon">📊</span></div><div class="kpi-value" data-count="2743" data-prefix="€ ">€ 0</div><div class="kpi-label">Gasto Medio Diario</div></div>
      <div class="kpi"><div class="kpi-top"><span class="kpi-icon">📋</span></div><div class="kpi-value" data-count="34">0</div><div class="kpi-label">Facturas Proveedor</div></div>
      <div class="kpi"><div class="kpi-top"><span class="kpi-icon">⏳</span></div><div class="kpi-value" data-count="6840" data-prefix="€ ">€ 0</div><div class="kpi-label">Pagos Pendientes</div></div>
    </div>
    <div class="grid-2">
      <div class="card">
        <div class="card-header"><h3>Gastos por Categoría</h3><span class="badge badge-accent">Abril 2026</span></div>
        <div class="bar-chart">
          <div class="bar-row"><div class="bar-label">Nóminas y SS</div><div class="bar-track"><div class="bar-fill" style="width:0;background:var(--primary)" data-width="96%"><span class="bar-val">€ 48.200</span></div></div></div>
          <div class="bar-row"><div class="bar-label">Proveedores</div><div class="bar-track"><div class="bar-fill" style="width:0;background:var(--accent)" data-width="26%"><span class="bar-val">€ 12.800</span></div></div></div>
          <div class="bar-row"><div class="bar-label">Marketing</div><div class="bar-track"><div class="bar-fill" style="width:0;background:var(--primary)" data-width="11%"><span class="bar-val">€ 5.600</span></div></div></div>
          <div class="bar-row"><div class="bar-label">Alquiler</div><div class="bar-track"><div class="bar-fill" style="width:0;background:var(--accent)" data-width="9%"><span class="bar-val">€ 4.500</span></div></div></div>
          <div class="bar-row"><div class="bar-label">Viajes y Dietas</div><div class="bar-track"><div class="bar-fill" style="width:0;background:var(--primary)" data-width="7%"><span class="bar-val">€ 3.400</span></div></div></div>
          <div class="bar-row"><div class="bar-label">Software</div><div class="bar-track"><div class="bar-fill" style="width:0;background:var(--accent)" data-width="6%"><span class="bar-val">€ 3.200</span></div></div></div>
          <div class="bar-row"><div class="bar-label">Suministros</div><div class="bar-track"><div class="bar-fill" style="width:0;background:var(--primary)" data-width="4%"><span class="bar-val">€ 2.100</span></div></div></div>
          <div class="bar-row"><div class="bar-label">Otros</div><div class="bar-track"><div class="bar-fill" style="width:0;background:var(--text-dim)" data-width="5%"><span class="bar-val">€ 2.500</span></div></div></div>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><h3>Resumen por Categoría</h3></div>
        <div class="tbl-wrap">
          <table class="data-tbl">
            <thead><tr><th>Categoría</th><th style="text-align:right">Importe</th><th style="text-align:right">% del Total</th><th>Tendencia</th></tr></thead>
            <tbody>
              <tr><td>Nóminas y Seguridad Social</td><td class="num">48.200,00 €</td><td class="num">58,6%</td><td><span class="badge badge-green">Estable</span></td></tr>
              <tr><td>Proveedores</td><td class="num">12.800,00 €</td><td class="num">15,6%</td><td><span class="badge badge-yellow">+4.2%</span></td></tr>
              <tr><td>Marketing</td><td class="num">5.600,00 €</td><td class="num">6,8%</td><td><span class="badge badge-red">+18%</span></td></tr>
              <tr><td>Alquiler Oficina</td><td class="num">4.500,00 €</td><td class="num">5,5%</td><td><span class="badge badge-green">Estable</span></td></tr>
              <tr><td>Viajes y Dietas</td><td class="num">3.400,00 €</td><td class="num">4,1%</td><td><span class="badge badge-yellow">+8%</span></td></tr>
              <tr><td>Software y Licencias</td><td class="num">3.200,00 €</td><td class="num">3,9%</td><td><span class="badge badge-green">Estable</span></td></tr>
              <tr><td>Suministros</td><td class="num">2.100,00 €</td><td class="num">2,6%</td><td><span class="badge badge-green">-5%</span></td></tr>
              <tr><td>Otros</td><td class="num">2.500,00 €</td><td class="num">3,0%</td><td><span class="badge badge-green">Estable</span></td></tr>
              <tr style="font-weight:700;border-top:2px solid var(--card-border)"><td>TOTAL</td><td class="num">82.300,00 €</td><td class="num">100%</td><td></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-header"><h3>Últimos Gastos</h3></div>
      <div class="tbl-wrap">
        <table class="data-tbl">
          <thead><tr><th>Fecha</th><th>Concepto</th><th>Categoría</th><th>Proveedor</th><th style="text-align:right">Importe</th><th>Estado</th></tr></thead>
          <tbody>
            <tr><td>01/04/2026</td><td>Nóminas Marzo</td><td>Nóminas</td><td>Nóminas SL</td><td class="num">48.200,00 €</td><td><span class="badge badge-green">Pagado</span></td></tr>
            <tr><td>01/04/2026</td><td>Alquiler Oficina Abril</td><td>Alquiler</td><td>Inmobiliaria Centro</td><td class="num">4.500,00 €</td><td><span class="badge badge-green">Pagado</span></td></tr>
            <tr><td>03/04/2026</td><td>Licencias Adobe CC</td><td>Software</td><td>Adobe Systems</td><td class="num">890,00 €</td><td><span class="badge badge-green">Pagado</span></td></tr>
            <tr><td>05/04/2026</td><td>Campaña Google Ads</td><td>Marketing</td><td>Google Ireland</td><td class="num">2.800,00 €</td><td><span class="badge badge-green">Pagado</span></td></tr>
            <tr><td>07/04/2026</td><td>Material Oficina</td><td>Suministros</td><td>Office Depot</td><td class="num">345,60 €</td><td><span class="badge badge-yellow">Pendiente</span></td></tr>
            <tr><td>10/04/2026</td><td>Viaje comercial Madrid</td><td>Viajes</td><td>Iberia + Hotel</td><td class="num">1.240,00 €</td><td><span class="badge badge-yellow">Pendiente</span></td></tr>
            <tr><td>12/04/2026</td><td>Servidores AWS</td><td>Software</td><td>Amazon Web Services</td><td class="num">1.680,00 €</td><td><span class="badge badge-green">Pagado</span></td></tr>
            <tr><td>14/04/2026</td><td>Consultoría Legal</td><td>Otros</td><td>Bufete Pérez & Asociados</td><td class="num">2.500,00 €</td><td><span class="badge badge-blue">Factura recibida</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- IMPUESTOS -->
  <div class="page-section" id="sec-taxes">
    <div class="section-header">
      <div class="section-tag">IMPUESTOS</div>
      <h2>Resumen Fiscal</h2>
      <p>Control completo de obligaciones fiscales, modelos trimestrales y anuales.</p>
    </div>
    <div class="kpi-grid">
      <div class="kpi"><div class="kpi-top"><span class="kpi-icon">🏛️</span></div><div class="kpi-value" data-count="8921" data-prefix="€ ">€ 0</div><div class="kpi-label">IGIC/IVA Repercutido (Q2)</div></div>
      <div class="kpi"><div class="kpi-top"><span class="kpi-icon">📥</span></div><div class="kpi-value" data-count="5761" data-prefix="€ ">€ 0</div><div class="kpi-label">IGIC/IVA Soportado (Q2)</div></div>
      <div class="kpi"><div class="kpi-top"><span class="kpi-icon">💳</span><span class="kpi-trend neutral">Vence 20/07</span></div><div class="kpi-value" data-count="3160" data-prefix="€ ">€ 0</div><div class="kpi-label">A Ingresar (Q2)</div></div>
      <div class="kpi"><div class="kpi-top"><span class="kpi-icon">📊</span></div><div class="kpi-value" data-count="7" data-suffix="%">0%</div><div class="kpi-label">Tipo Aplicado</div></div>
    </div>
    <div class="card">
      <div class="card-header"><h3>Resumen Trimestral IGIC/IVA</h3><span class="badge badge-accent">2026</span></div>
      <div class="tbl-wrap">
        <table class="data-tbl">
          <thead><tr><th>Trimestre</th><th style="text-align:right">Base Imponible</th><th style="text-align:right">IVA/IGIC Repercutido</th><th style="text-align:right">IVA/IGIC Soportado</th><th style="text-align:right">A Ingresar</th><th>Estado</th></tr></thead>
          <tbody>
            <tr><td>Q1 2026 (Ene-Mar)</td><td class="num">352.500,00 €</td><td class="num">24.675,00 €</td><td class="num">14.820,00 €</td><td class="num">9.855,00 €</td><td><span class="badge badge-green">Presentado</span></td></tr>
            <tr><td>Q2 2026 (Abr-Jun)</td><td class="num">127.450,00 €</td><td class="num">8.921,50 €</td><td class="num">5.761,00 €</td><td class="num">3.160,50 €</td><td><span class="badge badge-yellow">En curso</span></td></tr>
            <tr style="color:var(--text-dim)"><td>Q3 2026 (Jul-Sep)</td><td class="num">—</td><td class="num">—</td><td class="num">—</td><td class="num">—</td><td><span class="badge badge-blue">Futuro</span></td></tr>
            <tr style="color:var(--text-dim)"><td>Q4 2026 (Oct-Dic)</td><td class="num">—</td><td class="num">—</td><td class="num">—</td><td class="num">—</td><td><span class="badge badge-blue">Futuro</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="card">
      <div class="card-header"><h3>Modelos Fiscales</h3><span class="badge badge-primary">Obligaciones</span></div>
      <div class="tbl-wrap">
        <table class="data-tbl">
          <thead><tr><th>Modelo</th><th>Descripción</th><th>Periodo</th><th style="text-align:right">Importe</th><th>Vencimiento</th><th>Estado</th></tr></thead>
          <tbody>
            <tr><td><strong>303</strong></td><td>IVA / IGIC Trimestral</td><td>Q1 2026</td><td class="num">9.855,00 €</td><td>20/04/2026</td><td><span class="badge badge-green">Presentado</span></td></tr>
            <tr><td><strong>111</strong></td><td>Retenciones IRPF</td><td>Q1 2026</td><td class="num">4.320,00 €</td><td>20/04/2026</td><td><span class="badge badge-green">Presentado</span></td></tr>
            <tr><td><strong>115</strong></td><td>Retenciones Alquileres</td><td>Q1 2026</td><td class="num">2.700,00 €</td><td>20/04/2026</td><td><span class="badge badge-green">Presentado</span></td></tr>
            <tr><td><strong>130</strong></td><td>Pago Fraccionado IRPF</td><td>Q1 2026</td><td class="num">3.840,00 €</td><td>20/04/2026</td><td><span class="badge badge-yellow">Pendiente</span></td></tr>
            <tr><td><strong>200</strong></td><td>Impuesto Sociedades</td><td>Anual 2025</td><td class="num">18.450,00 €</td><td>25/07/2026</td><td><span class="badge badge-blue">Futuro</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- BANCO -->
  <div class="page-section" id="sec-bank">
    <div class="section-header">
      <div class="section-tag">BANCO</div>
      <h2>Conciliación Bancaria</h2>
      <p>Sincroniza movimientos bancarios y concilia automáticamente con facturas y gastos.</p>
    </div>
    <div class="kpi-grid">
      <div class="kpi"><div class="kpi-top"><span class="kpi-icon">🏦</span><span class="kpi-trend up">+14.2% vs mes ant.</span></div><div class="kpi-value" data-count="89340" data-prefix="€ ">€ 0</div><div class="kpi-label">Saldo Actual</div></div>
      <div class="kpi"><div class="kpi-top"><span class="kpi-icon">📥</span></div><div class="kpi-value" data-count="34620" data-prefix="€ ">€ 0</div><div class="kpi-label">Ingresos (Abril)</div></div>
      <div class="kpi"><div class="kpi-top"><span class="kpi-icon">📤</span></div><div class="kpi-value" data-count="58430" data-prefix="€ ">€ 0</div><div class="kpi-label">Pagos (Abril)</div></div>
      <div class="kpi"><div class="kpi-top"><span class="kpi-icon">⚠️</span><span class="kpi-trend neutral">3.650 €</span></div><div class="kpi-value" data-count="3">0</div><div class="kpi-label">Sin Conciliar</div></div>
    </div>
    <div class="card">
      <div class="card-header"><h3>Movimientos Bancarios</h3><span class="badge badge-accent">CaixaBank ****4821</span></div>
      <div class="tbl-wrap">
        <table class="data-tbl">
          <thead><tr><th>Fecha</th><th>Concepto</th><th>Referencia</th><th style="text-align:right">Cargo</th><th style="text-align:right">Abono</th><th style="text-align:right">Saldo</th><th class="center">Conciliado</th></tr></thead>
          <tbody>
            <tr><td>15/04/2026</td><td>Cobro FAC-2026-007 — Academia Digital Pro</td><td style="font-family:monospace;font-size:11px">TRF-8842</td><td class="num"></td><td class="num" style="color:var(--success)">5.082,50 €</td><td class="num" style="font-weight:600">89.340,20 €</td><td class="center"><span class="badge badge-green">Sí</span></td></tr>
            <tr><td>14/04/2026</td><td>Pago Consultoría Legal</td><td style="font-family:monospace;font-size:11px">TRF-8841</td><td class="num" style="color:var(--danger)">2.500,00 €</td><td class="num"></td><td class="num">84.257,70 €</td><td class="center"><span class="badge badge-green">Sí</span></td></tr>
            <tr><td>12/04/2026</td><td>Pago AWS Servidores</td><td style="font-family:monospace;font-size:11px">DD-4421</td><td class="num" style="color:var(--danger)">1.680,00 €</td><td class="num"></td><td class="num">86.757,70 €</td><td class="center"><span class="badge badge-green">Sí</span></td></tr>
            <tr><td>10/04/2026</td><td>Cobro FAC-2026-002 — Distribuciones Canarias</td><td style="font-family:monospace;font-size:11px">TRF-8838</td><td class="num"></td><td class="num" style="color:var(--success)">13.161,00 €</td><td class="num">88.437,70 €</td><td class="center"><span class="badge badge-green">Sí</span></td></tr>
            <tr><td>08/04/2026</td><td>Transferencia recibida — sin identificar</td><td style="font-family:monospace;font-size:11px">TRF-8835</td><td class="num"></td><td class="num" style="color:var(--success)">3.200,00 €</td><td class="num">75.276,70 €</td><td class="center"><span class="badge badge-yellow">No</span></td></tr>
            <tr><td>05/04/2026</td><td>Google Ads — Campaña Abril</td><td style="font-family:monospace;font-size:11px">DD-4418</td><td class="num" style="color:var(--danger)">2.800,00 €</td><td class="num"></td><td class="num">72.076,70 €</td><td class="center"><span class="badge badge-green">Sí</span></td></tr>
            <tr><td>03/04/2026</td><td>Movimiento desconocido</td><td style="font-family:monospace;font-size:11px">TRF-8830</td><td class="num" style="color:var(--danger)">450,00 €</td><td class="num"></td><td class="num">74.876,70 €</td><td class="center"><span class="badge badge-yellow">No</span></td></tr>
            <tr><td>01/04/2026</td><td>Nóminas Marzo — Transferencia masiva</td><td style="font-family:monospace;font-size:11px">TRF-8828</td><td class="num" style="color:var(--danger)">48.200,00 €</td><td class="num"></td><td class="num">75.326,70 €</td><td class="center"><span class="badge badge-green">Sí</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- ANALYTICS -->
  <div class="page-section" id="sec-analytics">
    <div class="section-header">
      <div class="section-tag">ANALYTICS</div>
      <h2>Análisis Financiero</h2>
      <p>Métricas avanzadas de rentabilidad, liquidez y rendimiento financiero.</p>
    </div>
    <div class="kpi-grid">
      <div class="kpi" style="text-align:center;grid-column:1/-1;padding:28px">
        <div class="kpi-label" style="font-size:13px;margin-bottom:8px">Beneficio Neto Acumulado (2026)</div>
        <div class="kpi-value" style="font-size:38px" data-count="168240" data-prefix="€ ">€ 0</div>
        <div style="display:flex;justify-content:center;gap:40px;margin-top:16px">
          <div><div style="font-size:18px;font-weight:700;color:var(--text);font-variant-numeric:tabular-nums">€ 478.500</div><div style="font-size:11px;color:var(--text-muted);margin-top:2px">Ingresos Acumulados</div></div>
          <div><div style="font-size:18px;font-weight:700;color:var(--text);font-variant-numeric:tabular-nums">€ 310.260</div><div style="font-size:11px;color:var(--text-muted);margin-top:2px">Gastos Acumulados</div></div>
          <div><div style="font-size:18px;font-weight:700;color:var(--success);font-variant-numeric:tabular-nums">35,1%</div><div style="font-size:11px;color:var(--text-muted);margin-top:2px">Margen Neto</div></div>
        </div>
      </div>
    </div>
    <div class="grid-2">
      <div class="card">
        <div class="card-header"><h3>Margen Neto Mensual (%)</h3><span class="badge badge-green">2026</span></div>
        <div class="bar-chart">
          <div class="bar-row"><div class="bar-label">Enero</div><div class="bar-track"><div class="bar-fill" style="width:0;background:var(--success)" data-width="64%"><span class="bar-val">32%</span></div></div></div>
          <div class="bar-row"><div class="bar-label">Febrero</div><div class="bar-track"><div class="bar-fill" style="width:0;background:var(--success)" data-width="68%"><span class="bar-val">34%</span></div></div></div>
          <div class="bar-row"><div class="bar-label">Marzo</div><div class="bar-track"><div class="bar-fill" style="width:0;background:var(--warning)" data-width="60%"><span class="bar-val">30%</span></div></div></div>
          <div class="bar-row"><div class="bar-label">Abril</div><div class="bar-track"><div class="bar-fill" style="width:0;background:var(--success)" data-width="70%"><span class="bar-val">35%</span></div></div></div>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><h3>Indicadores Financieros</h3></div>
        <div class="progress-item"><div class="progress-top"><span class="progress-label">Ratio de Cobro</span><span class="progress-pct">82%</span></div><div class="progress-track"><div class="progress-fill" style="width:0;background:var(--primary)" data-width="82%"></div></div></div>
        <div class="progress-item"><div class="progress-top"><span class="progress-label">Margen Operativo</span><span class="progress-pct">38%</span></div><div class="progress-track"><div class="progress-fill" style="width:0;background:var(--accent)" data-width="38%"></div></div></div>
        <div class="progress-item"><div class="progress-top"><span class="progress-label">Liquidez Corriente</span><span class="progress-pct">72%</span></div><div class="progress-track"><div class="progress-fill" style="width:0;background:var(--success)" data-width="72%"></div></div></div>
        <div class="progress-item"><div class="progress-top"><span class="progress-label">Endeudamiento</span><span class="progress-pct">24%</span></div><div class="progress-track"><div class="progress-fill" style="width:0;background:var(--warning)" data-width="24%"></div></div></div>
        <div class="progress-item"><div class="progress-top"><span class="progress-label">Rentabilidad (ROE)</span><span class="progress-pct">45%</span></div><div class="progress-track"><div class="progress-fill" style="width:0;background:var(--primary)" data-width="45%"></div></div></div>
      </div>
    </div>
    <div class="grid-2">
      <div class="card">
        <div class="card-header"><h3>Top Clientes por Facturación</h3></div>
        <div class="bar-chart">
          <div class="bar-row"><div class="bar-label">Constructora Meridiano</div><div class="bar-track"><div class="bar-fill" style="width:0;background:var(--accent)" data-width="100%"><span class="bar-val">€ 42.300</span></div></div></div>
          <div class="bar-row"><div class="bar-label">Distrib. Canarias</div><div class="bar-track"><div class="bar-fill" style="width:0;background:var(--primary)" data-width="91%"><span class="bar-val">€ 38.600</span></div></div></div>
          <div class="bar-row"><div class="bar-label">Hotel Atlántico</div><div class="bar-track"><div class="bar-fill" style="width:0;background:var(--accent)" data-width="67%"><span class="bar-val">€ 28.400</span></div></div></div>
          <div class="bar-row"><div class="bar-label">Clínica Bienestar</div><div class="bar-track"><div class="bar-fill" style="width:0;background:var(--primary)" data-width="52%"><span class="bar-val">€ 22.100</span></div></div></div>
          <div class="bar-row"><div class="bar-label">TechSoluciones SL</div><div class="bar-track"><div class="bar-fill" style="width:0;background:var(--accent)" data-width="44%"><span class="bar-val">€ 18.500</span></div></div></div>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><h3>Ingresos vs Gastos</h3></div>
        <div class="bar-chart">
          <div class="bar-row"><div class="bar-label">Ing. Enero</div><div class="bar-track"><div class="bar-fill" style="width:0;background:var(--success)" data-width="70%"><span class="bar-val">€ 98.200</span></div></div></div>
          <div class="bar-row"><div class="bar-label">Gas. Enero</div><div class="bar-track"><div class="bar-fill" style="width:0;background:var(--danger)" data-width="48%"><span class="bar-val">€ 66.800</span></div></div></div>
          <div class="bar-row"><div class="bar-label">Ing. Febrero</div><div class="bar-track"><div class="bar-fill" style="width:0;background:var(--success)" data-width="75%"><span class="bar-val">€ 105.400</span></div></div></div>
          <div class="bar-row"><div class="bar-label">Gas. Febrero</div><div class="bar-track"><div class="bar-fill" style="width:0;background:var(--danger)" data-width="50%"><span class="bar-val">€ 69.500</span></div></div></div>
          <div class="bar-row"><div class="bar-label">Ing. Marzo</div><div class="bar-track"><div class="bar-fill" style="width:0;background:var(--success)" data-width="85%"><span class="bar-val">€ 118.900</span></div></div></div>
          <div class="bar-row"><div class="bar-label">Gas. Marzo</div><div class="bar-track"><div class="bar-fill" style="width:0;background:var(--danger)" data-width="60%"><span class="bar-val">€ 83.200</span></div></div></div>
          <div class="bar-row"><div class="bar-label">Ing. Abril</div><div class="bar-track"><div class="bar-fill" style="width:0;background:var(--success)" data-width="91%"><span class="bar-val">€ 127.450</span></div></div></div>
          <div class="bar-row"><div class="bar-label">Gas. Abril</div><div class="bar-track"><div class="bar-fill" style="width:0;background:var(--danger)" data-width="59%"><span class="bar-val">€ 82.300</span></div></div></div>
        </div>
      </div>
    </div>
  </div>

  <!-- CONFIG -->
  <div class="page-section" id="sec-settings">
    <div class="section-header">
      <div class="section-tag">CONFIGURACIÓN</div>
      <h2>Ajustes de Contabilidad</h2>
      <p>Personaliza datos fiscales, numeración de facturas y automatizaciones.</p>
    </div>
    <div class="grid-2">
      <div class="card">
        <div class="card-header"><h3>Datos Fiscales</h3></div>
        <div class="form-group"><label class="form-label">Razón Social</label><input class="form-input" type="text" value="${bn}"></div>
        <div class="form-group"><label class="form-label">CIF / NIF</label><input class="form-input" type="text" value="B-12345678"></div>
        <div class="form-group"><label class="form-label">Email Facturación</label><input class="form-input" type="email" value="facturacion@empresa.com"></div>
        <div class="form-group"><label class="form-label">Tipo Impositivo por Defecto</label><select class="form-input"><option>7% IGIC</option><option>3% IGIC Reducido</option><option>0% IGIC Exento</option><option>21% IVA</option><option>10% IVA Reducido</option><option>4% IVA Superreducido</option></select></div>
        <div class="form-group"><label class="form-label">Moneda</label><select class="form-input"><option>EUR (€)</option><option>USD ($)</option><option>GBP (£)</option></select></div>
        <div class="form-group"><label class="form-label">Serie de Facturación</label><input class="form-input" type="text" value="FAC-2026-"></div>
      </div>
      <div class="card">
        <div class="card-header"><h3>Automatizaciones</h3></div>
        <div class="toggle-row"><span class="toggle-label">Numeración automática de facturas</span><div class="toggle on" onclick="this.classList.toggle('on');this.classList.toggle('off')"></div></div>
        <div class="toggle-row"><span class="toggle-label">Conciliación bancaria automática</span><div class="toggle on" onclick="this.classList.toggle('on');this.classList.toggle('off')"></div></div>
        <div class="toggle-row"><span class="toggle-label">Alertas de vencimiento</span><div class="toggle on" onclick="this.classList.toggle('on');this.classList.toggle('off')"></div></div>
        <div class="toggle-row"><span class="toggle-label">Recordatorios de cobro automáticos</span><div class="toggle on" onclick="this.classList.toggle('on');this.classList.toggle('off')"></div></div>
        <div class="toggle-row"><span class="toggle-label">Informe mensual automático</span><div class="toggle off" onclick="this.classList.toggle('on');this.classList.toggle('off')"></div></div>
        <div class="toggle-row"><span class="toggle-label">Cálculo automático de IVA/IGIC</span><div class="toggle on" onclick="this.classList.toggle('on');this.classList.toggle('off')"></div></div>
        <div style="margin-top:18px;display:flex;gap:10px">
          <button class="form-btn primary">Guardar Cambios</button>
        </div>
      </div>
    </div>
  </div>

</main>

<div class="footer">&copy; 2026 ${bn} — Powered by <strong style="color:var(--accent)">Kerno Studio</strong></div>

<!-- Bottom Nav (mobile only) -->
<nav class="bottom-nav">
  <button class="active" onclick="showSection('dashboard')"><span class="bnav-icon">◉</span>Inicio</button>
  <button onclick="showSection('invoices')"><span class="bnav-icon">◎</span>Facturas</button>
  <button onclick="showSection('expenses')"><span class="bnav-icon">☰</span>Gastos</button>
  <button onclick="showSection('taxes')"><span class="bnav-icon">▤</span>Impuestos</button>
  <button onclick="showSection('bank')"><span class="bnav-icon">⊞</span>Banco</button>
  <button onclick="showSection('analytics')"><span class="bnav-icon">◈</span>Analytics</button>
</nav>

<script>
(function(){
  var sections=['dashboard','invoices','expenses','taxes','bank','analytics','settings'];
  var titles={dashboard:'Dashboard',invoices:'Facturas',expenses:'Gastos',taxes:'Impuestos',bank:'Banco',analytics:'Analytics',settings:'Configuración'};

  window.showSection=function(id){
    document.querySelectorAll('.bottom-nav button').forEach(function(b){b.classList.remove('active')});
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
    var bnav=document.querySelector('.bottom-nav button[onclick*="'+id+'"]');
    if(bnav)bnav.classList.add('active');
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
