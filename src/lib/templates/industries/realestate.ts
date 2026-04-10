import type { TemplateDefinition, TemplateCustomization } from '../types'

export const realestateTemplate: TemplateDefinition = {
  meta: {
    id: 'realestate',
    name: 'Inmobiliaria Premium',
    industries: ['inmobiliaria', 'real estate', 'propiedades', 'properties', 'vivienda', 'pisos', 'apartments', 'agencia inmobiliaria'],
    projectTypes: ['landing', 'mvp', 'system', 'saas'],
    sections: ['dashboard', 'properties', 'clients', 'viewings', 'valuations', 'analytics', 'settings'],
    description: 'Dashboard premium para agencias inmobiliarias con sidebar. Propiedades, clientes, visitas, valoraciones y analytics.',
  },

  render(c: TemplateCustomization): string {
    const name = c.businessName
    const primary = c.primaryColor || '#d4a843'
    const accent = c.accentColor || '#f59e0b'

    return `<!DOCTYPE html>
<html lang="${c.locale || 'es'}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${name} — Dashboard</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
:root {
  --primary: ${primary};
  --accent: ${accent};
  --sidebar-bg: #1a1520;
  --content-bg: #14101a;
  --card-bg: #1e1a28;
  --card-hover: #252030;
  --border: rgba(212,168,67,0.1);
  --text: #e8e4f0;
  --text-muted: #9a93a8;
  --text-dim: #6b6478;
  --success: #22c55e;
  --warning: #f59e0b;
  --danger: #ef4444;
}
body { font-family: 'Inter', sans-serif; background: var(--content-bg); color: var(--text); min-height: 100vh; overflow-x: hidden; }
h1, h2, h3, h4 { font-family: 'Cormorant Garamond', serif; font-weight: 600; letter-spacing: -0.3px; }

/* ═══ SIDEBAR ═══ */
.sidebar {
  position: fixed; left: 0; top: 0; bottom: 0; width: 250px; background: var(--sidebar-bg);
  border-right: 1px solid var(--border); display: flex; flex-direction: column; z-index: 100;
  transition: transform 0.3s;
}
.sidebar-brand {
  padding: 24px 20px 20px; border-bottom: 1px solid var(--border);
  font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; font-weight: 700;
  color: var(--primary); letter-spacing: 1px;
}
.sidebar-brand span { font-size: 0.65rem; display: block; color: var(--text-dim); font-family: 'Inter', sans-serif; letter-spacing: 2px; text-transform: uppercase; margin-top: 4px; }
.sidebar-nav { flex: 1; padding: 12px 0; overflow-y: auto; }
.sidebar-link {
  display: flex; align-items: center; gap: 12px; padding: 11px 20px;
  color: var(--text-muted); text-decoration: none; font-size: 0.82rem; font-weight: 500;
  transition: all 0.2s; cursor: pointer; border-left: 3px solid transparent;
}
.sidebar-link:hover { color: var(--text); background: rgba(212,168,67,0.06); }
.sidebar-link.active { color: var(--primary); background: rgba(212,168,67,0.08); border-left-color: var(--primary); }
.sidebar-link .icon { font-size: 1rem; width: 20px; text-align: center; }
.sidebar-footer { padding: 16px 20px; border-top: 1px solid var(--border); font-size: 0.68rem; color: var(--text-dim); }

/* ═══ TOPBAR ═══ */
.topbar {
  position: fixed; top: 0; left: 250px; right: 0; height: 60px; background: rgba(20,16,26,0.92);
  backdrop-filter: blur(12px); border-bottom: 1px solid var(--border); display: flex;
  align-items: center; justify-content: space-between; padding: 0 28px; z-index: 99;
}
.topbar-title { font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; font-weight: 600; }
.topbar-right { display: flex; align-items: center; gap: 16px; }
.topbar-avatar { width: 34px; height: 34px; border-radius: 50%; background: linear-gradient(135deg, var(--primary), var(--accent)); display: flex; align-items: center; justify-content: center; font-size: 0.72rem; font-weight: 700; color: #000; }
.topbar-search {
  background: var(--card-bg); border: 1px solid var(--border); border-radius: 8px; padding: 7px 14px;
  color: var(--text); font-size: 0.78rem; outline: none; width: 220px; font-family: 'Inter', sans-serif;
}
.topbar-search::placeholder { color: var(--text-dim); }

/* ═══ MAIN CONTENT ═══ */
.main { margin-left: 250px; margin-top: 60px; padding: 28px; min-height: calc(100vh - 60px); }
.page-section { display: none; }
.page-section.active { display: block; }
.section-header { margin-bottom: 24px; }
.section-header h2 { font-size: 1.6rem; margin-bottom: 4px; }
.section-header p { color: var(--text-muted); font-size: 0.82rem; }

/* ═══ CARDS & KPIs ═══ */
.kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
.kpi {
  background: var(--card-bg); border: 1px solid var(--border); border-radius: 14px; padding: 20px;
  transition: all 0.3s;
}
.kpi:hover { border-color: rgba(212,168,67,0.25); transform: translateY(-2px); }
.kpi-icon { font-size: 1.3rem; margin-bottom: 8px; }
.kpi-value { font-family: 'Cormorant Garamond', serif; font-size: 1.8rem; font-weight: 700; color: var(--primary); }
.kpi-label { font-size: 0.72rem; color: var(--text-muted); margin-top: 2px; }
.kpi-trend { font-size: 0.68rem; margin-top: 6px; }
.kpi-trend.up { color: var(--success); }
.kpi-trend.down { color: var(--danger); }

.card {
  background: var(--card-bg); border: 1px solid var(--border); border-radius: 14px;
  overflow: hidden; transition: all 0.3s;
}
.card:hover { border-color: rgba(212,168,67,0.2); }
.card-header { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; border-bottom: 1px solid var(--border); }
.card-header h3 { font-size: 1rem; }
.card-body { padding: 20px; }

.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }

/* ═══ BADGES ═══ */
.badge { display: inline-block; padding: 3px 10px; border-radius: 6px; font-size: 0.68rem; font-weight: 600; letter-spacing: 0.3px; }
.badge-green { background: rgba(34,197,94,0.15); color: #4ade80; }
.badge-yellow { background: rgba(245,158,11,0.15); color: #fbbf24; }
.badge-red { background: rgba(239,68,68,0.15); color: #f87171; }
.badge-blue { background: rgba(59,130,246,0.15); color: #60a5fa; }
.badge-purple { background: rgba(168,85,247,0.15); color: #c084fc; }
.badge-gold { background: rgba(212,168,67,0.15); color: ${primary}; }

/* ═══ TABLE ═══ */
.data-table { width: 100%; border-collapse: collapse; }
.data-table th { text-align: left; padding: 10px 14px; font-size: 0.68rem; font-weight: 600; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid var(--border); }
.data-table td { padding: 12px 14px; font-size: 0.8rem; border-bottom: 1px solid rgba(212,168,67,0.05); }
.data-table tr:hover td { background: rgba(212,168,67,0.03); }
.data-table tr:last-child td { border-bottom: none; }

/* ═══ PROPERTY GRID ═══ */
.prop-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.prop-card {
  background: var(--card-bg); border: 1px solid var(--border); border-radius: 14px;
  overflow: hidden; transition: all 0.4s; cursor: pointer;
}
.prop-card:hover { transform: translateY(-4px); border-color: rgba(212,168,67,0.3); box-shadow: 0 16px 48px rgba(0,0,0,0.4); }
.prop-img {
  height: 170px; position: relative; display: flex; align-items: center; justify-content: center;
  font-size: 2.2rem; color: rgba(255,255,255,0.3);
}
.prop-img .prop-status {
  position: absolute; top: 10px; right: 10px; padding: 4px 12px; border-radius: 4px;
  font-size: 0.62rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;
}
.prop-info { padding: 14px 16px; }
.prop-price { font-family: 'Cormorant Garamond', serif; font-size: 1.45rem; font-weight: 700; color: var(--primary); }
.prop-addr { font-size: 0.8rem; color: var(--text); margin: 3px 0; font-weight: 500; }
.prop-meta { display: flex; gap: 14px; margin-top: 10px; padding-top: 10px; border-top: 1px solid var(--border); }
.prop-meta span { font-size: 0.72rem; color: var(--text-muted); display: flex; align-items: center; gap: 4px; }
.prop-meta span b { color: var(--text); font-weight: 600; }

/* ═══ VALUATION CARDS ═══ */
.val-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
.val-card { background: var(--card-bg); border: 1px solid var(--border); border-radius: 14px; padding: 20px; transition: all 0.3s; }
.val-card:hover { border-color: rgba(212,168,67,0.25); }
.val-addr { font-family: 'Cormorant Garamond', serif; font-size: 1.15rem; font-weight: 600; margin-bottom: 4px; }
.val-loc { font-size: 0.74rem; color: var(--text-muted); margin-bottom: 14px; }
.val-price { font-family: 'Cormorant Garamond', serif; font-size: 1.7rem; font-weight: 700; color: var(--primary); }
.val-perm2 { font-size: 0.76rem; color: var(--text-muted); margin-bottom: 12px; }
.val-row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 0.76rem; border-bottom: 1px solid rgba(212,168,67,0.05); }
.val-row:last-child { border-bottom: none; }
.val-row .lbl { color: var(--text-muted); }
.val-row .val { font-weight: 600; }

/* ═══ CHART BAR ═══ */
.bar-chart { display: flex; flex-direction: column; gap: 10px; }
.bar-item { display: flex; align-items: center; gap: 12px; }
.bar-label { font-size: 0.74rem; color: var(--text-muted); min-width: 100px; text-align: right; }
.bar-track { flex: 1; height: 8px; background: rgba(255,255,255,0.05); border-radius: 4px; overflow: hidden; }
.bar-fill { height: 100%; border-radius: 4px; transition: width 0.6s; }
.bar-val { font-size: 0.72rem; font-weight: 600; min-width: 40px; }

/* ═══ MINI-GRID (dashboard) ═══ */
.mini-prop-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
.mini-prop { background: rgba(255,255,255,0.03); border: 1px solid var(--border); border-radius: 10px; padding: 12px; cursor: pointer; transition: all 0.3s; }
.mini-prop:hover { border-color: rgba(212,168,67,0.2); background: rgba(212,168,67,0.04); }
.mini-prop .mp-price { font-family: 'Cormorant Garamond', serif; font-size: 1.05rem; font-weight: 700; color: var(--primary); }
.mini-prop .mp-addr { font-size: 0.7rem; color: var(--text-muted); margin-top: 2px; }
.mini-prop .mp-info { font-size: 0.65rem; color: var(--text-dim); margin-top: 4px; }

.lead-list { display: flex; flex-direction: column; gap: 0; }
.lead-item { display: flex; align-items: center; gap: 12px; padding: 10px 0; border-bottom: 1px solid rgba(212,168,67,0.05); }
.lead-item:last-child { border-bottom: none; }
.lead-avatar { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 700; color: #000; }
.lead-info { flex: 1; }
.lead-name { font-size: 0.82rem; font-weight: 600; }
.lead-detail { font-size: 0.7rem; color: var(--text-muted); }

/* ═══ SETTINGS ═══ */
.settings-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.setting-item { display: flex; flex-direction: column; gap: 6px; }
.setting-label { font-size: 0.74rem; color: var(--text-muted); font-weight: 500; }
.setting-input {
  background: rgba(255,255,255,0.04); border: 1px solid var(--border); border-radius: 8px;
  padding: 10px 14px; color: var(--text); font-size: 0.82rem; font-family: 'Inter', sans-serif;
  outline: none; transition: border-color 0.2s;
}
.setting-input:focus { border-color: var(--primary); }
.toggle-row { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid rgba(212,168,67,0.05); }
.toggle-label { font-size: 0.82rem; }
.toggle { width: 40px; height: 22px; border-radius: 11px; background: rgba(255,255,255,0.1); position: relative; cursor: pointer; transition: background 0.3s; }
.toggle.on { background: ${primary}; }
.toggle::after { content: ''; position: absolute; top: 3px; left: 3px; width: 16px; height: 16px; border-radius: 50%; background: #fff; transition: transform 0.3s; }
.toggle.on::after { transform: translateX(18px); }

.btn { padding: 8px 18px; border: none; border-radius: 8px; font-size: 0.78rem; font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: 'Inter', sans-serif; }
.btn-primary { background: var(--primary); color: #000; }
.btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }

.footer { text-align: center; padding: 24px; font-size: 0.7rem; color: var(--text-dim); margin-top: 40px; }

@media (max-width: 1200px) { .prop-grid, .grid-3 { grid-template-columns: repeat(2, 1fr); } .kpi-grid { grid-template-columns: repeat(2, 1fr); } .mini-prop-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 768px) {
  .sidebar { display: none; }
  .main { margin-left: 0; width: 100%; padding: 16px; padding-bottom: 70px; }
  .topbar { left: 0; }
  .bottom-nav { display: flex; }
  .prop-grid, .grid-2, .grid-3, .val-grid { grid-template-columns: 1fr; }
  .kpi-grid { grid-template-columns: repeat(2, 1fr); }
  .mini-prop-grid { grid-template-columns: 1fr 1fr; }
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
  <div class="sidebar-brand">${name}<span>Panel Inmobiliario</span></div>
  <nav class="sidebar-nav">
    <a class="sidebar-link active" onclick="showSection('dashboard')"><span class="icon">◉</span> Dashboard</a>
    <a class="sidebar-link" onclick="showSection('properties')"><span class="icon">▤</span> Propiedades</a>
    <a class="sidebar-link" onclick="showSection('clients')"><span class="icon">☰</span> Clientes</a>
    <a class="sidebar-link" onclick="showSection('viewings')"><span class="icon">◎</span> Visitas</a>
    <a class="sidebar-link" onclick="showSection('valuations')"><span class="icon">⊞</span> Valoraciones</a>
    <a class="sidebar-link" onclick="showSection('analytics')"><span class="icon">◈</span> Analytics</a>
    <a class="sidebar-link" onclick="showSection('settings')"><span class="icon">⚙</span> Configuraci\u00f3n</a>
  </nav>
  <div class="sidebar-footer">\u00a9 2026 ${name}<br>Powered by <strong style="color:var(--primary)">Kerno Studio</strong></div>
</aside>

<!-- ═══ TOPBAR ═══ -->
<header class="topbar">
  <div class="topbar-title">Dashboard</div>
  <div class="topbar-right">
    <input class="topbar-search" placeholder="Buscar propiedades, clientes..." />
    <div class="topbar-avatar">${name.charAt(0)}</div>
  </div>
</header>

<!-- ═══ MAIN CONTENT ═══ -->
<main class="main">

  <!-- ─── DASHBOARD ─── -->
  <div id="sec-dashboard" class="page-section active">
    <div class="section-header"><h2>Panel de Control</h2><p>Resumen de tu agencia inmobiliaria en tiempo real</p></div>
    <div class="kpi-grid">
      <div class="kpi"><div class="kpi-icon">&#9670;</div><div class="kpi-value">89</div><div class="kpi-label">Propiedades</div><div class="kpi-trend up">\u2191 +5 esta semana</div></div>
      <div class="kpi"><div class="kpi-icon">&#9733;</div><div class="kpi-value">34</div><div class="kpi-label">Leads Activos</div><div class="kpi-trend up">\u2191 +8 nuevos</div></div>
      <div class="kpi"><div class="kpi-icon">&#9673;</div><div class="kpi-value">67</div><div class="kpi-label">Visitas Mes</div><div class="kpi-trend up">\u2191 +12%</div></div>
      <div class="kpi"><div class="kpi-icon">&#9830;</div><div class="kpi-value">\u20ac1.2M</div><div class="kpi-label">Ventas Mes</div><div class="kpi-trend up">\u2191 +22%</div></div>
    </div>
    <div class="grid-2">
      <div class="card">
        <div class="card-header"><h3>Propiedades Recientes</h3><span class="badge badge-gold">4 nuevas</span></div>
        <div class="card-body">
          <div class="mini-prop-grid">
            <div class="mini-prop"><div class="mp-price">\u20ac485.000</div><div class="mp-addr">C/ Serrano 78</div><div class="mp-info">3 hab \u00b7 120 m\u00b2</div></div>
            <div class="mini-prop"><div class="mp-price">\u20ac790.000</div><div class="mp-addr">Chalet Pozuelo</div><div class="mp-info">5 hab \u00b7 280 m\u00b2</div></div>
            <div class="mini-prop"><div class="mp-price">\u20ac320.000</div><div class="mp-addr">Piso Prosperidad</div><div class="mp-info">3 hab \u00b7 85 m\u00b2</div></div>
            <div class="mini-prop"><div class="mp-price">\u20ac650.000</div><div class="mp-addr">\u00c1tico Chamber\u00ed</div><div class="mp-info">2 hab \u00b7 95 m\u00b2</div></div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><h3>Leads Calientes</h3><span class="badge badge-red">Requiere acci\u00f3n</span></div>
        <div class="card-body">
          <div class="lead-list">
            <div class="lead-item"><div class="lead-avatar" style="background:linear-gradient(135deg,${primary},${accent})">EM</div><div class="lead-info"><div class="lead-name">Elena Mart\u00ednez</div><div class="lead-detail">Busca 3 hab. Salamanca \u00b7 \u20ac400K-500K</div></div><span class="badge badge-green">Caliente</span></div>
            <div class="lead-item"><div class="lead-avatar" style="background:linear-gradient(135deg,#6366f1,#8b5cf6)">RG</div><div class="lead-info"><div class="lead-name">Roberto Garc\u00eda</div><div class="lead-detail">Chalet Pozuelo \u00b7 \u20ac700K-900K</div></div><span class="badge badge-green">Caliente</span></div>
            <div class="lead-item"><div class="lead-avatar" style="background:linear-gradient(135deg,#ec4899,#f43f5e)">CL</div><div class="lead-info"><div class="lead-name">Carmen L\u00f3pez</div><div class="lead-detail">\u00c1tico Chamber\u00ed \u00b7 \u20ac500K-700K</div></div><span class="badge badge-yellow">Tibio</span></div>
            <div class="lead-item"><div class="lead-avatar" style="background:linear-gradient(135deg,#14b8a6,#06b6d4)">FD</div><div class="lead-info"><div class="lead-name">Francisco D\u00edaz</div><div class="lead-detail">Casa Las Rozas \u00b7 \u20ac400K-500K</div></div><span class="badge badge-green">Caliente</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ─── PROPIEDADES ─── -->
  <div id="sec-properties" class="page-section">
    <div class="section-header"><h2>Propiedades en Cartera</h2><p>Gesti\u00f3n completa de tu portfolio inmobiliario</p></div>
    <div class="prop-grid">
      <div class="prop-card">
        <div class="prop-img" style="background:linear-gradient(135deg,rgba(212,168,67,0.2),rgba(139,92,246,0.15))">&#9632;<div class="prop-status badge-green" style="background:rgba(34,197,94,0.9);color:#fff">En venta</div></div>
        <div class="prop-info"><div class="prop-price">\u20ac485.000</div><div class="prop-addr">Piso en C/ Serrano 78, 4\u00ba A</div><div class="prop-meta"><span>&#9632; <b>3</b> hab</span><span>&#9679; <b>2</b> ba\u00f1os</span><span>&#9634; <b>120</b> m\u00b2</span></div></div>
      </div>
      <div class="prop-card">
        <div class="prop-img" style="background:linear-gradient(135deg,rgba(99,102,241,0.2),rgba(212,168,67,0.12))">&#9632;<div class="prop-status" style="background:rgba(245,158,11,0.9);color:#000">Reservado</div></div>
        <div class="prop-info"><div class="prop-price">\u20ac750.000</div><div class="prop-addr">Chalet adosado en Pozuelo de Alarc\u00f3n</div><div class="prop-meta"><span>&#9632; <b>5</b> hab</span><span>&#9679; <b>3</b> ba\u00f1os</span><span>&#9634; <b>280</b> m\u00b2</span></div></div>
      </div>
      <div class="prop-card">
        <div class="prop-img" style="background:linear-gradient(135deg,rgba(236,72,153,0.15),rgba(212,168,67,0.12))">&#9632;<div class="prop-status badge-green" style="background:rgba(34,197,94,0.9);color:#fff">En venta</div></div>
        <div class="prop-info"><div class="prop-price">\u20ac320.000</div><div class="prop-addr">Piso reformado en Prosperidad</div><div class="prop-meta"><span>&#9632; <b>3</b> hab</span><span>&#9679; <b>1</b> ba\u00f1o</span><span>&#9634; <b>85</b> m\u00b2</span></div></div>
      </div>
      <div class="prop-card">
        <div class="prop-img" style="background:linear-gradient(135deg,rgba(20,184,166,0.18),rgba(212,168,67,0.1))">&#9632;<div class="prop-status" style="background:rgba(99,102,241,0.9);color:#fff">Vendido</div></div>
        <div class="prop-info"><div class="prop-price">\u20ac650.000</div><div class="prop-addr">\u00c1tico con terraza en Chamber\u00ed</div><div class="prop-meta"><span>&#9632; <b>2</b> hab</span><span>&#9679; <b>2</b> ba\u00f1os</span><span>&#9634; <b>95</b> m\u00b2</span></div></div>
      </div>
      <div class="prop-card">
        <div class="prop-img" style="background:linear-gradient(135deg,rgba(250,204,21,0.12),rgba(139,92,246,0.15))">&#9632;<div class="prop-status badge-green" style="background:rgba(34,197,94,0.9);color:#fff">En venta</div></div>
        <div class="prop-info"><div class="prop-price">\u20ac185.000</div><div class="prop-addr">Estudio amplio en Malasa\u00f1a</div><div class="prop-meta"><span>&#9632; <b>1</b> hab</span><span>&#9679; <b>1</b> ba\u00f1o</span><span>&#9634; <b>42</b> m\u00b2</span></div></div>
      </div>
      <div class="prop-card">
        <div class="prop-img" style="background:linear-gradient(135deg,rgba(212,168,67,0.18),rgba(6,182,212,0.12))">&#9632;<div class="prop-status" style="background:rgba(245,158,11,0.9);color:#000">Reservado</div></div>
        <div class="prop-info"><div class="prop-price">\u20ac425.000</div><div class="prop-addr">Casa unifamiliar en Las Rozas</div><div class="prop-meta"><span>&#9632; <b>4</b> hab</span><span>&#9679; <b>2</b> ba\u00f1os</span><span>&#9634; <b>210</b> m\u00b2</span></div></div>
      </div>
    </div>
  </div>

  <!-- ─── CLIENTES ─── -->
  <div id="sec-clients" class="page-section">
    <div class="section-header"><h2>Gesti\u00f3n de Clientes</h2><p>Pipeline de compradores y vendedores</p></div>
    <div class="card">
      <div class="card-header"><h3>Clientes</h3><span class="badge badge-gold">8 activos</span></div>
      <div class="card-body" style="overflow-x:auto">
        <table class="data-table">
          <thead><tr><th>Nombre</th><th>Tipo</th><th>Presupuesto</th><th>Zona Inter\u00e9s</th><th>Estado</th><th>\u00daltimo Contacto</th></tr></thead>
          <tbody>
            <tr><td style="font-weight:600">Elena Mart\u00ednez</td><td><span class="badge badge-blue">Comprador</span></td><td>\u20ac400K-500K</td><td>Salamanca</td><td><span class="badge badge-green">Caliente</span></td><td>Hoy</td></tr>
            <tr><td style="font-weight:600">Roberto Garc\u00eda</td><td><span class="badge badge-blue">Comprador</span></td><td>\u20ac700K-900K</td><td>Pozuelo</td><td><span class="badge badge-green">Caliente</span></td><td>Ayer</td></tr>
            <tr><td style="font-weight:600">Carmen L\u00f3pez</td><td><span class="badge badge-purple">Vendedor</span></td><td>\u20ac500K-700K</td><td>Chamber\u00ed</td><td><span class="badge badge-yellow">Activo</span></td><td>Hace 2 d\u00edas</td></tr>
            <tr><td style="font-weight:600">Antonio Ruiz</td><td><span class="badge badge-blue">Comprador</span></td><td>\u20ac150K-200K</td><td>Centro</td><td><span class="badge badge-yellow">Activo</span></td><td>Hace 3 d\u00edas</td></tr>
            <tr><td style="font-weight:600">Isabel Torres</td><td><span class="badge badge-purple">Vendedor</span></td><td>\u20ac300K-400K</td><td>Chamart\u00edn</td><td><span class="badge badge-red">Fr\u00edo</span></td><td>Hace 5 d\u00edas</td></tr>
            <tr><td style="font-weight:600">Francisco D\u00edaz</td><td><span class="badge badge-blue">Comprador</span></td><td>\u20ac400K-500K</td><td>Las Rozas</td><td><span class="badge badge-green">Caliente</span></td><td>Hoy</td></tr>
            <tr><td style="font-weight:600">Luc\u00eda Navarro</td><td><span class="badge badge-blue">Comprador</span></td><td>\u20ac250K-350K</td><td>Madrid Centro</td><td><span class="badge badge-yellow">Activo</span></td><td>Hace 4 d\u00edas</td></tr>
            <tr><td style="font-weight:600">Marta Fern\u00e1ndez</td><td><span class="badge badge-purple">Vendedor</span></td><td>\u20ac600K-800K</td><td>Retiro</td><td><span class="badge badge-green">Caliente</span></td><td>Ayer</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- ─── VISITAS ─── -->
  <div id="sec-viewings" class="page-section">
    <div class="section-header"><h2>Agenda de Visitas</h2><p>Programaci\u00f3n y seguimiento de visitas a propiedades</p></div>
    <div class="card">
      <div class="card-header"><h3>Pr\u00f3ximas Visitas</h3><span class="badge badge-gold">Esta semana</span></div>
      <div class="card-body" style="overflow-x:auto">
        <table class="data-table">
          <thead><tr><th>Fecha</th><th>Hora</th><th>Propiedad</th><th>Cliente</th><th>Agente</th><th>Estado</th></tr></thead>
          <tbody>
            <tr><td>09/04/2026</td><td>10:00</td><td>Piso Serrano 78</td><td>Elena Mart\u00ednez</td><td>Pablo Herrero</td><td><span class="badge badge-green">Confirmada</span></td></tr>
            <tr><td>09/04/2026</td><td>11:30</td><td>Chalet Pozuelo</td><td>Roberto Garc\u00eda</td><td>Ana Vidal</td><td><span class="badge badge-green">Confirmada</span></td></tr>
            <tr><td>09/04/2026</td><td>16:00</td><td>\u00c1tico Chamber\u00ed</td><td>Carmen L\u00f3pez</td><td>Pablo Herrero</td><td><span class="badge badge-blue">Completada</span></td></tr>
            <tr><td>10/04/2026</td><td>10:00</td><td>Estudio Malasa\u00f1a</td><td>Antonio Ruiz</td><td>Ana Vidal</td><td><span class="badge badge-green">Confirmada</span></td></tr>
            <tr><td>10/04/2026</td><td>12:00</td><td>Casa Las Rozas</td><td>Francisco D\u00edaz</td><td>Pablo Herrero</td><td><span class="badge badge-red">Cancelada</span></td></tr>
            <tr><td>11/04/2026</td><td>17:00</td><td>Piso Prosperidad</td><td>Luc\u00eda Navarro</td><td>Ana Vidal</td><td><span class="badge badge-green">Confirmada</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- ─── VALORACIONES ─── -->
  <div id="sec-valuations" class="page-section">
    <div class="section-header"><h2>An\u00e1lisis Comparativo</h2><p>Valoraciones basadas en datos reales de mercado</p></div>
    <div class="val-grid">
      <div class="val-card">
        <div class="val-addr">Piso en Serrano 78</div>
        <div class="val-loc">Salamanca, Madrid \u2014 120 m\u00b2</div>
        <div class="val-price">\u20ac485.000</div>
        <div class="val-perm2">\u20ac4.042/m\u00b2</div>
        <div style="margin-top:12px;padding-top:12px;border-top:1px solid var(--border)">
          <div class="val-row"><span class="lbl">Comparables</span><span class="val">23 inmuebles</span></div>
          <div class="val-row"><span class="lbl">Media zona</span><span class="val">\u20ac4.200/m\u00b2</span></div>
          <div class="val-row"><span class="lbl">Confianza</span><span class="val"><span class="badge badge-green">Alta (94%)</span></span></div>
        </div>
      </div>
      <div class="val-card">
        <div class="val-addr">Chalet en Pozuelo</div>
        <div class="val-loc">Pozuelo de Alarc\u00f3n \u2014 280 m\u00b2</div>
        <div class="val-price">\u20ac790.000</div>
        <div class="val-perm2">\u20ac2.821/m\u00b2</div>
        <div style="margin-top:12px;padding-top:12px;border-top:1px solid var(--border)">
          <div class="val-row"><span class="lbl">Comparables</span><span class="val">15 inmuebles</span></div>
          <div class="val-row"><span class="lbl">Media zona</span><span class="val">\u20ac2.950/m\u00b2</span></div>
          <div class="val-row"><span class="lbl">Confianza</span><span class="val"><span class="badge badge-green">Alta (88%)</span></span></div>
        </div>
      </div>
      <div class="val-card">
        <div class="val-addr">\u00c1tico en Chamber\u00ed</div>
        <div class="val-loc">Chamber\u00ed, Madrid \u2014 95 m\u00b2</div>
        <div class="val-price">\u20ac650.000</div>
        <div class="val-perm2">\u20ac6.842/m\u00b2</div>
        <div style="margin-top:12px;padding-top:12px;border-top:1px solid var(--border)">
          <div class="val-row"><span class="lbl">Comparables</span><span class="val">11 inmuebles</span></div>
          <div class="val-row"><span class="lbl">Media zona</span><span class="val">\u20ac5.800/m\u00b2</span></div>
          <div class="val-row"><span class="lbl">Confianza</span><span class="val"><span class="badge badge-yellow">Media (72%)</span></span></div>
        </div>
      </div>
      <div class="val-card">
        <div class="val-addr">Estudio en Malasa\u00f1a</div>
        <div class="val-loc">Centro, Madrid \u2014 42 m\u00b2</div>
        <div class="val-price">\u20ac185.000</div>
        <div class="val-perm2">\u20ac4.405/m\u00b2</div>
        <div style="margin-top:12px;padding-top:12px;border-top:1px solid var(--border)">
          <div class="val-row"><span class="lbl">Comparables</span><span class="val">31 inmuebles</span></div>
          <div class="val-row"><span class="lbl">Media zona</span><span class="val">\u20ac4.600/m\u00b2</span></div>
          <div class="val-row"><span class="lbl">Confianza</span><span class="val"><span class="badge badge-green">Alta (91%)</span></span></div>
        </div>
      </div>
    </div>
  </div>

  <!-- ─── ANALYTICS ─── -->
  <div id="sec-analytics" class="page-section">
    <div class="section-header"><h2>Rendimiento del Negocio</h2><p>M\u00e9tricas clave de ventas, comisiones y mercado</p></div>
    <div class="kpi-grid" style="grid-template-columns:repeat(3,1fr)">
      <div class="kpi"><div class="kpi-icon">&#9670;</div><div class="kpi-value">\u20ac245K</div><div class="kpi-label">Precio Medio</div></div>
      <div class="kpi"><div class="kpi-icon">&#9201;</div><div class="kpi-value">45 d\u00edas</div><div class="kpi-label">Tiempo Medio Venta</div></div>
      <div class="kpi"><div class="kpi-icon">&#9733;</div><div class="kpi-value">3.5%</div><div class="kpi-label">Comisi\u00f3n Media</div></div>
    </div>
    <div class="grid-2">
      <div class="card">
        <div class="card-header"><h3>Ventas por Zona</h3></div>
        <div class="card-body">
          <div class="bar-chart">
            <div class="bar-item"><span class="bar-label">Salamanca</span><div class="bar-track"><div class="bar-fill" style="width:92%;background:${primary}"></div></div><span class="bar-val">12</span></div>
            <div class="bar-item"><span class="bar-label">Chamber\u00ed</span><div class="bar-track"><div class="bar-fill" style="width:78%;background:${primary}"></div></div><span class="bar-val">9</span></div>
            <div class="bar-item"><span class="bar-label">Chamart\u00edn</span><div class="bar-track"><div class="bar-fill" style="width:60%;background:${accent}"></div></div><span class="bar-val">7</span></div>
            <div class="bar-item"><span class="bar-label">Pozuelo</span><div class="bar-track"><div class="bar-fill" style="width:48%;background:${accent}"></div></div><span class="bar-val">5</span></div>
            <div class="bar-item"><span class="bar-label">Centro</span><div class="bar-track"><div class="bar-fill" style="width:42%;background:${accent}"></div></div><span class="bar-val">4</span></div>
            <div class="bar-item"><span class="bar-label">Las Rozas</span><div class="bar-track"><div class="bar-fill" style="width:30%;background:${accent}"></div></div><span class="bar-val">3</span></div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><h3>Evoluci\u00f3n Precio Medio</h3></div>
        <div class="card-body">
          <div class="bar-chart">
            <div class="bar-item"><span class="bar-label">Ene 2026</span><div class="bar-track"><div class="bar-fill" style="width:68%;background:${primary}"></div></div><span class="bar-val">\u20ac228K</span></div>
            <div class="bar-item"><span class="bar-label">Feb 2026</span><div class="bar-track"><div class="bar-fill" style="width:72%;background:${primary}"></div></div><span class="bar-val">\u20ac232K</span></div>
            <div class="bar-item"><span class="bar-label">Mar 2026</span><div class="bar-track"><div class="bar-fill" style="width:80%;background:${primary}"></div></div><span class="bar-val">\u20ac240K</span></div>
            <div class="bar-item"><span class="bar-label">Abr 2026</span><div class="bar-track"><div class="bar-fill" style="width:88%;background:${accent}"></div></div><span class="bar-val">\u20ac245K</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ─── CONFIGURACI\u00d3N ─── -->
  <div id="sec-settings" class="page-section">
    <div class="section-header"><h2>Ajustes de la Agencia</h2><p>Personaliza tu configuraci\u00f3n</p></div>
    <div class="card">
      <div class="card-header"><h3>Datos de la Agencia</h3></div>
      <div class="card-body">
        <div class="settings-grid">
          <div class="setting-item"><label class="setting-label">Nombre de la agencia</label><input class="setting-input" value="${name}" /></div>
          <div class="setting-item"><label class="setting-label">Email de contacto</label><input class="setting-input" value="info@${name.toLowerCase().replace(/\\s/g, '')}.com" /></div>
          <div class="setting-item"><label class="setting-label">Tel\u00e9fono</label><input class="setting-input" value="+34 91 234 5678" /></div>
          <div class="setting-item"><label class="setting-label">Comisi\u00f3n por defecto (%)</label><input class="setting-input" value="3.5" /></div>
          <div class="setting-item"><label class="setting-label">Zona principal</label><input class="setting-input" value="Madrid Centro" /></div>
          <div class="setting-item"><label class="setting-label">Idioma</label><input class="setting-input" value="Espa\u00f1ol" /></div>
        </div>
        <div style="margin-top:24px;border-top:1px solid var(--border);padding-top:16px">
          <div class="toggle-row"><span class="toggle-label">Publicaci\u00f3n autom\u00e1tica en portales</span><div class="toggle on" onclick="this.classList.toggle('on')"></div></div>
          <div class="toggle-row"><span class="toggle-label">Alertas de nuevos leads</span><div class="toggle on" onclick="this.classList.toggle('on')"></div></div>
          <div class="toggle-row"><span class="toggle-label">Recordatorio de visitas (24h antes)</span><div class="toggle on" onclick="this.classList.toggle('on')"></div></div>
          <div class="toggle-row"><span class="toggle-label">Modo vacaciones</span><div class="toggle" onclick="this.classList.toggle('on')"></div></div>
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
  <button onclick="showSection('properties')"><span class="bnav-icon">◎</span>Propiedades</button>
  <button onclick="showSection('clients')"><span class="bnav-icon">☰</span>Clientes</button>
  <button onclick="showSection('viewings')"><span class="bnav-icon">▤</span>Visitas</button>
  <button onclick="showSection('valuations')"><span class="bnav-icon">⊞</span>Valoraciones</button>
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
    id === 'properties' ? 'Propiedades' :
    id === 'clients' ? 'Clientes' :
    id === 'viewings' ? 'Visitas' :
    id === 'valuations' ? 'Valoraciones' :
    id === 'analytics' ? 'Analytics' : 'Configuraci\u00f3n';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>
</body>
</html>`
  },
}
