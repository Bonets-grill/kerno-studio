import type { TemplateDefinition, TemplateCustomization } from '../types'

export const restaurantTemplate: TemplateDefinition = {
  meta: {
    id: 'restaurant',
    name: 'Restaurante Premium',
    industries: ['restaurant', 'restaurante', 'bar', 'cafe', 'cafetería', 'pizzeria', 'hostelería', 'hotel', 'catering', 'food', 'comida'],
    projectTypes: ['landing', 'mvp', 'system', 'saas'],
    sections: ['dashboard', 'reservations', 'menu', 'orders', 'reviews', 'analytics', 'settings'],
    description: 'Plantilla premium para restaurantes con dashboard de reservas, carta digital, gestión de pedidos, reseñas, analytics y configuración.',
  },

  render(c: TemplateCustomization): string {
    const name = c.businessName
    const primary = c.primaryColor || '#d4a843'
    const accent = c.accentColor || '#e67e22'

    return `<!DOCTYPE html>
<html lang="${c.locale || 'es'}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${name} — Dashboard</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&display=swap');

*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

:root {
  --primary: ${primary};
  --accent: ${accent};
  --sidebar-bg: #1c1710;
  --content-bg: #171310;
  --card-bg: #211c14;
  --card-hover: #2a2318;
  --border: rgba(255,255,255,0.06);
  --text: #f0e8dc;
  --text-muted: #a89a86;
  --text-dim: #6d6050;
  --success: #22c55e;
  --warning: #f59e0b;
  --danger: #ef4444;
  --info: #3b82f6;
}

body {
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  background: var(--content-bg);
  color: var(--text);
  display: flex;
  min-height: 100vh;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

/* ── Sidebar ── */
.sidebar {
  width: 250px;
  min-height: 100vh;
  background: var(--sidebar-bg);
  border-right: 1px solid var(--border);
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
.sidebar-brand {
  padding: 24px 20px;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  gap: 12px;
}
.sidebar-brand-icon {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: linear-gradient(135deg, var(--primary), var(--accent));
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 1rem;
  color: #fff;
  flex-shrink: 0;
}
.sidebar-brand-name {
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.sidebar-nav { flex: 1; padding: 16px 0; }
.sidebar-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 20px;
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.82rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
  border-left: 3px solid transparent;
}
.sidebar-link:hover {
  color: var(--text);
  background: rgba(255,255,255,0.04);
}
.sidebar-link.active {
  color: var(--primary);
  background: rgba(212,168,67,0.08);
  border-left-color: var(--primary);
  font-weight: 600;
}
.sidebar-link .icon {
  font-size: 1rem;
  width: 22px;
  text-align: center;
  flex-shrink: 0;
}
.sidebar-footer {
  padding: 16px 20px;
  border-top: 1px solid var(--border);
  font-size: 0.68rem;
  color: var(--text-dim);
}

/* ── Main ── */
.main {
  margin-left: 250px;
  flex: 1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.topbar {
  height: 60px;
  background: var(--sidebar-bg);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px;
  position: sticky;
  top: 0;
  z-index: 50;
}
.topbar-title { font-size: 1rem; font-weight: 700; }
.topbar-right { display: flex; align-items: center; gap: 16px; }
.topbar-badge {
  background: var(--primary);
  color: #1c1710;
  font-size: 0.62rem;
  font-weight: 700;
  padding: 3px 9px;
  border-radius: 10px;
}
.topbar-avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), var(--accent));
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.75rem;
  color: #fff;
}
.content { flex: 1; padding: 28px; }

/* ── Section ── */
.section { display: none; }
.section.active { display: block; animation: fadeIn 0.25s ease; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

.section-header { margin-bottom: 24px; }
.section-header h1 { font-size: 1.5rem; font-weight: 800; margin-bottom: 4px; }
.section-header p { font-size: 0.82rem; color: var(--text-muted); }

/* ── Cards ── */
.card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
  transition: border-color 0.2s;
}
.card:hover { border-color: rgba(255,255,255,0.1); }

.kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.kpi-card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
  position: relative;
  overflow: hidden;
}
.kpi-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--primary), var(--accent));
  opacity: 0.7;
}
.kpi-label { font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600; }
.kpi-value { font-size: 1.75rem; font-weight: 800; margin: 8px 0 4px; }
.kpi-trend { font-size: 0.7rem; font-weight: 600; }
.kpi-trend.up { color: var(--success); }
.kpi-trend.down { color: var(--danger); }

.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.card-header h3 { font-size: 0.88rem; font-weight: 700; }

/* ── Badge ── */
.badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.3px;
}
.badge-green { background: rgba(34,197,94,0.15); color: #4ade80; }
.badge-red { background: rgba(239,68,68,0.15); color: #f87171; }
.badge-yellow { background: rgba(245,158,11,0.15); color: #fbbf24; }
.badge-blue { background: rgba(59,130,246,0.15); color: #60a5fa; }
.badge-purple { background: rgba(124,58,237,0.15); color: #a78bfa; }
.badge-accent { background: rgba(212,168,67,0.12); color: var(--primary); }
.badge-gold { background: rgba(212,168,67,0.15); color: #d4a843; }

/* ── Table ── */
.table-wrap { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; }
th {
  text-align: left;
  font-size: 0.68rem;
  font-weight: 600;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 10px 14px;
  border-bottom: 1px solid var(--border);
}
td {
  padding: 12px 14px;
  font-size: 0.8rem;
  border-bottom: 1px solid var(--border);
  color: var(--text-muted);
}
tr:hover td { background: rgba(255,255,255,0.02); }
tr:last-child td { border-bottom: none; }

/* ── Bar chart ── */
.bar-chart { display: flex; flex-direction: column; gap: 10px; }
.bar-row { display: flex; align-items: center; gap: 12px; }
.bar-label { font-size: 0.72rem; color: var(--text-muted); min-width: 70px; text-align: right; }
.bar-track { flex: 1; height: 26px; background: rgba(255,255,255,0.04); border-radius: 6px; overflow: hidden; position: relative; }
.bar-fill {
  height: 100%;
  border-radius: 6px;
  background: linear-gradient(90deg, var(--primary), color-mix(in srgb, var(--primary) 70%, var(--accent)));
  display: flex;
  align-items: center;
  padding-left: 10px;
  font-size: 0.68rem;
  font-weight: 700;
  color: #fff;
  transition: width 0.8s ease;
}

/* ── Menu cards ── */
.menu-card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
  transition: border-color 0.2s, transform 0.2s;
}
.menu-card:hover { border-color: rgba(212,168,67,0.2); transform: translateY(-1px); }
.menu-category { font-size: 0.62rem; color: var(--primary); text-transform: uppercase; letter-spacing: 1px; font-weight: 700; margin-bottom: 6px; }
.menu-name { font-size: 0.95rem; font-weight: 700; margin-bottom: 6px; }
.menu-desc { font-size: 0.78rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 10px; }
.menu-price { font-size: 1.15rem; font-weight: 800; color: var(--primary); }

/* ── Review card ── */
.review-card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 12px;
}
.review-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.8rem;
  color: #fff;
  flex-shrink: 0;
}
.review-stars { color: var(--primary); font-size: 0.9rem; letter-spacing: 1px; }

/* ── Settings ── */
.form-group { margin-bottom: 16px; }
.form-label { display: block; font-size: 0.75rem; font-weight: 600; color: var(--text-muted); margin-bottom: 6px; }
.form-input {
  width: 100%;
  padding: 10px 14px;
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text);
  font-size: 0.82rem;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s;
}
.form-input:focus { border-color: var(--primary); }

.toggle-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid var(--border);
}
.toggle-row:last-child { border-bottom: none; }
.toggle-label { font-size: 0.82rem; font-weight: 500; }
.toggle {
  width: 44px;
  height: 24px;
  background: rgba(255,255,255,0.1);
  border-radius: 12px;
  position: relative;
  cursor: pointer;
  transition: background 0.2s;
}
.toggle.on { background: var(--primary); }
.toggle::after {
  content: '';
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  position: absolute;
  top: 3px;
  left: 3px;
  transition: transform 0.2s;
}
.toggle.on::after { transform: translateX(20px); }

.btn {
  padding: 8px 18px;
  border-radius: 8px;
  font-size: 0.78rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  font-family: inherit;
  transition: opacity 0.2s;
}
.btn:hover { opacity: 0.85; }
.btn-primary { background: var(--primary); color: #1c1710; }
.btn-ghost { background: transparent; border: 1px solid var(--border); color: var(--text); }

.alert-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid var(--border);
  font-size: 0.8rem;
}
.alert-item:last-child { border-bottom: none; }
.alert-icon { font-size: 1.1rem; }

.footer {
  padding: 20px 28px;
  text-align: center;
  font-size: 0.72rem;
  color: var(--text-dim);
  border-top: 1px solid var(--border);
}

.mini-table td { padding: 8px 10px; font-size: 0.75rem; }
.mini-table th { padding: 8px 10px; }

@media (max-width: 900px) {
  .sidebar { display: none; }
  .topbar { left: 0; }
  .main { margin-left: 0; width: 100%; padding: 16px; padding-bottom: 70px; }
  .bottom-nav { display: flex; }
  .kpi-grid { grid-template-columns: repeat(2, 1fr); }
  .grid-2, .grid-3 { grid-template-columns: 1fr; }
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

<!-- Sidebar -->
<div class="app-layout">
<aside class="sidebar">
  <div class="sidebar-brand">
    <div class="sidebar-brand-icon">${name.charAt(0).toUpperCase()}</div>
    <div class="sidebar-brand-name">${name}</div>
  </div>
  <nav class="sidebar-nav">
    <a class="sidebar-link active" onclick="showSection('dashboard')"><span class="icon">\u25C9</span><span>Dashboard</span></a>
    <a class="sidebar-link" onclick="showSection('reservations')"><span class="icon">\u2630</span><span>Reservas</span></a>
    <a class="sidebar-link" onclick="showSection('menu')"><span class="icon">\u25A4</span><span>Carta</span></a>
    <a class="sidebar-link" onclick="showSection('orders')"><span class="icon">\u229E</span><span>Pedidos</span></a>
    <a class="sidebar-link" onclick="showSection('reviews')"><span class="icon">\u2605</span><span>Rese\u00F1as</span></a>
    <a class="sidebar-link" onclick="showSection('analytics')"><span class="icon">\u25C8</span><span>Analytics</span></a>
    <a class="sidebar-link" onclick="showSection('settings')"><span class="icon">\u2699</span><span>Configuraci\u00F3n</span></a>
  </nav>
  <div class="sidebar-footer">\u00A9 2026 ${name}<br>Powered by Kerno Studio</div>
</aside>

<!-- Main -->
<div class="main">
  <div class="main-area">
>
    <div class="topbar-title" id="topbar-title">Dashboard</div>
    <div class="topbar-right">
      <span class="topbar-badge">Premium</span>
      <div class="topbar-avatar">${name.charAt(0).toUpperCase()}</div>
    </div>
  </header>

  <div class="content">

    <!-- ══ DASHBOARD ══ -->
    <div class="section active" id="sec-dashboard">
      <div class="section-header">
        <h1>Panel de Control</h1>
        <p>Vista en tiempo real del rendimiento del restaurante.</p>
      </div>
      <div class="kpi-grid">
        <div class="kpi-card">
          <div class="kpi-label">Reservas Hoy</div>
          <div class="kpi-value" data-count="34">0</div>
          <div class="kpi-trend up">\u25B2 +8 vs ayer</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Facturación</div>
          <div class="kpi-value" data-count="4280" data-prefix="\u20AC">\u20AC0</div>
          <div class="kpi-trend up">\u25B2 +15% hoy</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Ocupación</div>
          <div class="kpi-value" data-count="87" data-suffix="%">0%</div>
          <div class="kpi-trend up">\u25B2 +5%</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Rating</div>
          <div class="kpi-value" data-count="4.8" data-suffix="\u2605" data-decimals="1">0\u2605</div>
          <div class="kpi-trend up">\u25B2 +0.2</div>
        </div>
      </div>

      <div class="grid-2" style="margin-top:20px">
        <div class="card">
          <div class="card-header"><h3>Ocupación por Hora</h3><span class="badge badge-accent">Hoy</span></div>
          <div class="bar-chart">
            <div class="bar-row"><span class="bar-label">12:00</span><div class="bar-track"><div class="bar-fill" style="width:45%">45%</div></div></div>
            <div class="bar-row"><span class="bar-label">13:00</span><div class="bar-track"><div class="bar-fill" style="width:92%;background:linear-gradient(90deg,var(--accent),#f59e0b)">92%</div></div></div>
            <div class="bar-row"><span class="bar-label">14:00</span><div class="bar-track"><div class="bar-fill" style="width:88%;background:linear-gradient(90deg,var(--accent),#f59e0b)">88%</div></div></div>
            <div class="bar-row"><span class="bar-label">20:00</span><div class="bar-track"><div class="bar-fill" style="width:95%;background:linear-gradient(90deg,var(--accent),#f59e0b)">95%</div></div></div>
            <div class="bar-row"><span class="bar-label">21:00</span><div class="bar-track"><div class="bar-fill" style="width:78%">78%</div></div></div>
            <div class="bar-row"><span class="bar-label">22:00</span><div class="bar-track"><div class="bar-fill" style="width:40%">40%</div></div></div>
          </div>
        </div>
        <div class="card">
          <div class="card-header"><h3>Alertas del Servicio</h3><span class="badge badge-yellow">4 activas</span></div>
          <div class="alert-item"><span class="alert-icon">\uD83D\uDD34</span><span style="flex:1">Mesa 7 — pedido especial: sin gluten</span><span class="badge badge-red">Alerta</span></div>
          <div class="alert-item"><span class="alert-icon">\uD83D\uDCE6</span><span style="flex:1">Stock bajo: Trufa negra (quedan 200g)</span><span class="badge badge-yellow">Stock</span></div>
          <div class="alert-item"><span class="alert-icon">\uD83C\uDF82</span><span style="flex:1">Cumplea\u00F1os mesa 12 — preparar tarta</span><span class="badge badge-purple">VIP</span></div>
          <div class="alert-item"><span class="alert-icon">\u23F0</span><span style="flex:1">Reserva grupo 20 pax a las 21:00</span><span class="badge badge-blue">Grupo</span></div>
        </div>
      </div>
    </div>

    <!-- ══ RESERVAS ══ -->
    <div class="section" id="sec-reservations">
      <div class="section-header">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div>
            <h1>Reservas</h1>
            <p>Gestión de reservas con confirmación automática.</p>
          </div>
          <button class="btn btn-primary">+ Nueva Reserva</button>
        </div>
      </div>
      <div class="card">
        <div class="table-wrap">
          <table>
            <thead>
              <tr><th>Hora</th><th>Nombre</th><th style="text-align:center">Personas</th><th style="text-align:center">Mesa</th><th>Estado</th><th>Notas</th></tr>
            </thead>
            <tbody>
              <tr><td style="font-weight:700">13:00</td><td>García López</td><td style="text-align:center">4</td><td style="text-align:center">3</td><td><span class="badge badge-green">Confirmada</span></td><td style="color:var(--text-dim)">Terraza preferida</td></tr>
              <tr><td style="font-weight:700">13:30</td><td>Martínez Ruiz</td><td style="text-align:center">2</td><td style="text-align:center">7</td><td><span class="badge badge-green">Confirmada</span></td><td style="color:var(--text-dim)">Aniversario</td></tr>
              <tr><td style="font-weight:700">14:00</td><td>Fernández Vila</td><td style="text-align:center">6</td><td style="text-align:center">12</td><td><span class="badge badge-yellow">Pendiente</span></td><td style="color:var(--text-dim)">Grupo empresa</td></tr>
              <tr><td style="font-weight:700">14:30</td><td>López Torres</td><td style="text-align:center">3</td><td style="text-align:center">5</td><td><span class="badge badge-green">Confirmada</span></td><td style="color:var(--text-dim)">Sin gluten</td></tr>
              <tr><td style="font-weight:700">20:00</td><td>Rodríguez Pérez</td><td style="text-align:center">8</td><td style="text-align:center">15-16</td><td><span class="badge badge-purple">VIP</span></td><td style="color:var(--text-dim)">Cumplea\u00F1os — tarta</td></tr>
              <tr><td style="font-weight:700">20:30</td><td>Sánchez Moreno</td><td style="text-align:center">2</td><td style="text-align:center">1</td><td><span class="badge badge-green">Confirmada</span></td><td style="color:var(--text-dim)">Vista al mar</td></tr>
              <tr><td style="font-weight:700">21:00</td><td>Empresa TechCo</td><td style="text-align:center">20</td><td style="text-align:center">Salón</td><td><span class="badge badge-purple">VIP</span></td><td style="color:var(--text-dim)">Menú cerrado</td></tr>
              <tr><td style="font-weight:700">21:30</td><td>Díaz Navarro</td><td style="text-align:center">4</td><td style="text-align:center">9</td><td><span class="badge badge-yellow">Pendiente</span></td><td style="color:var(--text-dim)">—</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- ══ CARTA ══ -->
    <div class="section" id="sec-menu">
      <div class="section-header">
        <h1>Carta</h1>
        <p>Menú digital actualizable en tiempo real.</p>
      </div>
      <div class="grid-2">
        <div class="menu-card">
          <div class="menu-category">Entrante</div>
          <div style="display:flex;justify-content:space-between;align-items:start">
            <div class="menu-name">Tartar de Atún Rojo</div>
            <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px">
              <span class="menu-price">\u20AC19.50</span>
              <span class="badge badge-green">Nuevo</span>
            </div>
          </div>
          <div class="menu-desc">Atún rojo de almadraba, aguacate, sésamo, ponzu casero.</div>
        </div>
        <div class="menu-card">
          <div class="menu-category">Entrante</div>
          <div style="display:flex;justify-content:space-between;align-items:start">
            <div class="menu-name">Carpaccio de Pulpo</div>
            <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px">
              <span class="menu-price">\u20AC16.00</span>
            </div>
          </div>
          <div class="menu-desc">Pulpo gallego laminado, aceite de pimentón, cítricos.</div>
        </div>
        <div class="menu-card">
          <div class="menu-category">Principal</div>
          <div style="display:flex;justify-content:space-between;align-items:start">
            <div class="menu-name">Risotto de Setas Silvestres</div>
            <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px">
              <span class="menu-price">\u20AC18.50</span>
              <span class="badge badge-accent">TOP</span>
            </div>
          </div>
          <div class="menu-desc">Arroz carnaroli, boletus, trufa negra, parmesano 24 meses.</div>
        </div>
        <div class="menu-card">
          <div class="menu-category">Principal</div>
          <div style="display:flex;justify-content:space-between;align-items:start">
            <div class="menu-name">Entrecot Madurado 45 Días</div>
            <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px">
              <span class="menu-price">\u20AC32.00</span>
              <span class="badge badge-purple">Premium</span>
            </div>
          </div>
          <div class="menu-desc">Ternera gallega, guarnición de temporada, salsa de oporto.</div>
        </div>
        <div class="menu-card">
          <div class="menu-category">Principal</div>
          <div style="display:flex;justify-content:space-between;align-items:start">
            <div class="menu-name">Lubina a la Brasa</div>
            <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px">
              <span class="menu-price">\u20AC24.00</span>
              <span class="badge badge-green">Nuevo</span>
            </div>
          </div>
          <div class="menu-desc">Lubina salvaje, verduras de temporada, salsa de azafrán.</div>
        </div>
        <div class="menu-card">
          <div class="menu-category">Principal</div>
          <div style="display:flex;justify-content:space-between;align-items:start">
            <div class="menu-name">Curry Verde Vegano</div>
            <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px">
              <span class="menu-price">\u20AC15.00</span>
              <span class="badge badge-green">Vegano</span>
            </div>
          </div>
          <div class="menu-desc">Leche de coco, tofu marinado, verduras asiáticas, arroz jazmín.</div>
        </div>
        <div class="menu-card">
          <div class="menu-category">Postre</div>
          <div style="display:flex;justify-content:space-between;align-items:start">
            <div class="menu-name">Tiramisú Casero</div>
            <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px">
              <span class="menu-price">\u20AC9.50</span>
              <span class="badge badge-accent">TOP</span>
            </div>
          </div>
          <div class="menu-desc">Receta tradicional italiana, mascarpone, café espresso.</div>
        </div>
        <div class="menu-card">
          <div class="menu-category">Postre</div>
          <div style="display:flex;justify-content:space-between;align-items:start">
            <div class="menu-name">Tarta de Queso Vasca</div>
            <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px">
              <span class="menu-price">\u20AC9.00</span>
            </div>
          </div>
          <div class="menu-desc">Textura cremosa, caramelo de fruta de la pasión.</div>
        </div>
      </div>
    </div>

    <!-- ══ PEDIDOS ══ -->
    <div class="section" id="sec-orders">
      <div class="section-header">
        <h1>Pedidos</h1>
        <p>Control de pedidos de mesas en tiempo real.</p>
      </div>
      <div class="card">
        <div class="table-wrap">
          <table>
            <thead>
              <tr><th>Mesa</th><th>Items</th><th style="text-align:right">Total</th><th>Estado</th><th>Hora</th><th>Camarero</th></tr>
            </thead>
            <tbody>
              <tr><td style="font-weight:700">Mesa 3</td><td>Risotto, Entrecot, Tiramisú x2</td><td style="text-align:right;font-weight:700;color:var(--primary)">\u20AC89.50</td><td><span class="badge badge-yellow">En cocina</span></td><td>13:15</td><td>Carlos</td></tr>
              <tr><td style="font-weight:700">Mesa 7</td><td>Tartar, Lubina, Tarta Queso</td><td style="text-align:right;font-weight:700;color:var(--primary)">\u20AC52.50</td><td><span class="badge badge-green">Servido</span></td><td>13:40</td><td>Ana</td></tr>
              <tr><td style="font-weight:700">Mesa 5</td><td>Carpaccio x2, Curry Verde, Tiramisú</td><td style="text-align:right;font-weight:700;color:var(--primary)">\u20AC56.50</td><td><span class="badge badge-yellow">En cocina</span></td><td>14:05</td><td>Marta</td></tr>
              <tr><td style="font-weight:700">Mesa 12</td><td>Menú cerrado x6</td><td style="text-align:right;font-weight:700;color:var(--primary)">\u20AC234.00</td><td><span class="badge badge-blue">Pagado</span></td><td>14:20</td><td>Carlos</td></tr>
              <tr><td style="font-weight:700">Mesa 1</td><td>Entrecot, Risotto, 2x Vino</td><td style="text-align:right;font-weight:700;color:var(--primary)">\u20AC98.00</td><td><span class="badge badge-green">Servido</span></td><td>20:35</td><td>Ana</td></tr>
              <tr><td style="font-weight:700">Mesa 9</td><td>Tartar x2, Lubina, Entrecot</td><td style="text-align:right;font-weight:700;color:var(--primary)">\u20AC95.00</td><td><span class="badge badge-yellow">En cocina</span></td><td>21:10</td><td>Marta</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- ══ RESEÑAS ══ -->
    <div class="section" id="sec-reviews">
      <div class="section-header">
        <h1>Rese\u00F1as</h1>
        <p>Opiniones de clientes en Google, TripAdvisor y redes.</p>
      </div>

      <div class="review-card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
          <div style="display:flex;align-items:center;gap:10px">
            <div class="review-avatar" style="background:linear-gradient(135deg,var(--primary),var(--accent))">MG</div>
            <div>
              <div style="font-weight:600;font-size:0.88rem">María García</div>
              <div style="font-size:0.65rem;color:var(--text-dim)">Hace 2 días</div>
            </div>
          </div>
          <div><span class="review-stars">\u2605\u2605\u2605\u2605\u2605</span> <span class="badge badge-blue" style="margin-left:6px">Google</span></div>
        </div>
        <p style="font-size:0.82rem;color:var(--text-muted);line-height:1.6">Increíble experiencia. El risotto de setas es el mejor que he probado en mucho tiempo. Servicio impecable y ambiente muy acogedor.</p>
      </div>

      <div class="review-card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
          <div style="display:flex;align-items:center;gap:10px">
            <div class="review-avatar" style="background:linear-gradient(135deg,#3b82f6,#06b6d4)">CR</div>
            <div>
              <div style="font-weight:600;font-size:0.88rem">Carlos Ruiz</div>
              <div style="font-size:0.65rem;color:var(--text-dim)">Hace 5 días</div>
            </div>
          </div>
          <div><span class="review-stars">\u2605\u2605\u2605\u2605\u2605</span> <span class="badge badge-green" style="margin-left:6px">TripAdvisor</span></div>
        </div>
        <p style="font-size:0.82rem;color:var(--text-muted);line-height:1.6">Cenamos para nuestro aniversario y fue perfecto. La terraza con vistas al atardecer es mágica. Volveremos seguro.</p>
      </div>

      <div class="review-card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
          <div style="display:flex;align-items:center;gap:10px">
            <div class="review-avatar" style="background:linear-gradient(135deg,#22c55e,#16a34a)">LM</div>
            <div>
              <div style="font-weight:600;font-size:0.88rem">Laura Moreno</div>
              <div style="font-size:0.65rem;color:var(--text-dim)">Hace 1 semana</div>
            </div>
          </div>
          <div><span class="review-stars">\u2605\u2605\u2605\u2605\u2606</span> <span class="badge badge-blue" style="margin-left:6px">Google</span></div>
        </div>
        <p style="font-size:0.82rem;color:var(--text-muted);line-height:1.6">Muy buena cocina y ambiente. Solo pongo 4 estrellas por el tiempo de espera, pero la calidad mereció la pena.</p>
      </div>

      <div class="review-card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
          <div style="display:flex;align-items:center;gap:10px">
            <div class="review-avatar" style="background:linear-gradient(135deg,#f59e0b,#ef4444)">PS</div>
            <div>
              <div style="font-weight:600;font-size:0.88rem">Pedro Sánchez</div>
              <div style="font-size:0.65rem;color:var(--text-dim)">Hace 1 semana</div>
            </div>
          </div>
          <div><span class="review-stars">\u2605\u2605\u2605\u2605\u2605</span> <span class="badge badge-blue" style="margin-left:6px">Google</span></div>
        </div>
        <p style="font-size:0.82rem;color:var(--text-muted);line-height:1.6">El sistema de reservas por WhatsApp es genial. Reservé en 30 segundos. El entrecot madurado es espectacular.</p>
      </div>

      <div class="review-card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
          <div style="display:flex;align-items:center;gap:10px">
            <div class="review-avatar" style="background:linear-gradient(135deg,#a855f7,#ec4899)">AF</div>
            <div>
              <div style="font-weight:600;font-size:0.88rem">Ana Fernández</div>
              <div style="font-size:0.65rem;color:var(--text-dim)">Hace 2 semanas</div>
            </div>
          </div>
          <div><span class="review-stars">\u2605\u2605\u2605\u2605\u2605</span> <span class="badge badge-green" style="margin-left:6px">TripAdvisor</span></div>
        </div>
        <p style="font-size:0.82rem;color:var(--text-muted);line-height:1.6">Fuimos con amigos y pedimos casi toda la carta. Todo exquisito. Las opciones veganas son de las mejores de la ciudad.</p>
      </div>
    </div>

    <!-- ══ ANALYTICS ══ -->
    <div class="section" id="sec-analytics">
      <div class="section-header">
        <h1>Analytics</h1>
        <p>Análisis de facturación, ocupación y rendimiento.</p>
      </div>
      <div class="grid-3" style="margin-bottom:20px">
        <div class="kpi-card">
          <div class="kpi-label">Ticket Medio</div>
          <div class="kpi-value">\u20AC38</div>
          <div class="kpi-trend up">\u25B2 +\u20AC3 este mes</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Platos/Mesa</div>
          <div class="kpi-value">2.4</div>
          <div class="kpi-trend up">\u25B2 +0.2</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Food Cost</div>
          <div class="kpi-value" style="color:var(--success)">28%</div>
          <div class="kpi-trend up">\u25B2 Objetivo: 30%</div>
        </div>
      </div>
      <div class="grid-2">
        <div class="card">
          <div class="card-header"><h3>Facturación por Día</h3><span class="badge badge-accent">Semanal</span></div>
          <div class="bar-chart">
            <div class="bar-row"><span class="bar-label">Lun</span><div class="bar-track"><div class="bar-fill" style="width:44%">\u20AC3,200</div></div></div>
            <div class="bar-row"><span class="bar-label">Mar</span><div class="bar-track"><div class="bar-fill" style="width:53%">\u20AC3,800</div></div></div>
            <div class="bar-row"><span class="bar-label">Mié</span><div class="bar-track"><div class="bar-fill" style="width:57%">\u20AC4,100</div></div></div>
            <div class="bar-row"><span class="bar-label">Jue</span><div class="bar-track"><div class="bar-fill" style="width:64%">\u20AC4,600</div></div></div>
            <div class="bar-row"><span class="bar-label">Vie</span><div class="bar-track"><div class="bar-fill" style="width:94%;background:linear-gradient(90deg,var(--accent),#f59e0b)">\u20AC6,800</div></div></div>
            <div class="bar-row"><span class="bar-label">Sáb</span><div class="bar-track"><div class="bar-fill" style="width:100%;background:linear-gradient(90deg,var(--accent),#f59e0b)">\u20AC7,200</div></div></div>
            <div class="bar-row"><span class="bar-label">Dom</span><div class="bar-track"><div class="bar-fill" style="width:75%">\u20AC5,400</div></div></div>
          </div>
        </div>
        <div class="card">
          <div class="card-header"><h3>Top Platos</h3><span class="badge badge-green">Más vendidos</span></div>
          <div class="table-wrap">
            <table class="mini-table">
              <thead><tr><th>Plato</th><th style="text-align:center">Pedidos</th><th style="text-align:right">Ingresos</th></tr></thead>
              <tbody>
                <tr><td style="font-weight:600">Risotto de Setas</td><td style="text-align:center">89</td><td style="text-align:right;color:var(--primary);font-weight:700">\u20AC1,646</td></tr>
                <tr><td style="font-weight:600">Entrecot Madurado</td><td style="text-align:center">76</td><td style="text-align:right;color:var(--primary);font-weight:700">\u20AC2,432</td></tr>
                <tr><td style="font-weight:600">Tartar de Atún</td><td style="text-align:center">64</td><td style="text-align:right;color:var(--primary);font-weight:700">\u20AC1,248</td></tr>
                <tr><td style="font-weight:600">Lubina a la Brasa</td><td style="text-align:center">52</td><td style="text-align:right;color:var(--primary);font-weight:700">\u20AC1,248</td></tr>
                <tr><td style="font-weight:600">Tiramisú Casero</td><td style="text-align:center">48</td><td style="text-align:right;color:var(--primary);font-weight:700">\u20AC456</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- ══ CONFIGURACIÓN ══ -->
    <div class="section" id="sec-settings">
      <div class="section-header">
        <h1>Configuración</h1>
        <p>Ajustes del restaurante, horarios y automatizaciones.</p>
      </div>
      <div class="grid-2">
        <div class="card">
          <div class="card-header"><h3>Datos del Restaurante</h3></div>
          <div class="form-group">
            <label class="form-label">Nombre del restaurante</label>
            <input class="form-input" type="text" value="${name}" readonly>
          </div>
          <div class="form-group">
            <label class="form-label">Email de contacto</label>
            <input class="form-input" type="email" value="reservas@${name.toLowerCase().replace(/\\s/g, '')}.com" readonly>
          </div>
          <div class="form-group">
            <label class="form-label">Hora apertura comida</label>
            <input class="form-input" type="text" value="12:30" readonly>
          </div>
          <div class="form-group">
            <label class="form-label">Hora apertura cena</label>
            <input class="form-input" type="text" value="20:00" readonly>
          </div>
          <div class="form-group">
            <label class="form-label">Teléfono WhatsApp</label>
            <input class="form-input" type="text" value="+34 612 345 678" readonly>
          </div>
        </div>
        <div class="card">
          <div class="card-header"><h3>Automatizaciones</h3></div>
          <div class="toggle-row">
            <span class="toggle-label">Confirmación WhatsApp automática</span>
            <div class="toggle on" onclick="this.classList.toggle('on')"></div>
          </div>
          <div class="toggle-row">
            <span class="toggle-label">Recordatorio 2h antes</span>
            <div class="toggle on" onclick="this.classList.toggle('on')"></div>
          </div>
          <div class="toggle-row">
            <span class="toggle-label">Email post-visita</span>
            <div class="toggle on" onclick="this.classList.toggle('on')"></div>
          </div>
          <div class="toggle-row">
            <span class="toggle-label">Reservas online</span>
            <div class="toggle on" onclick="this.classList.toggle('on')"></div>
          </div>
          <div class="toggle-row">
            <span class="toggle-label">Modo vacaciones</span>
            <div class="toggle" onclick="this.classList.toggle('on')"></div>
          </div>
        </div>
      </div>
    </div>

  </div>

  <div class="footer">\u00A9 2026 ${name} — Powered by Kerno Studio</div>
</div>

</div><!-- /main-area -->
</div><!-- /app-layout -->
 Nav (mobile only) -->
<nav class="bottom-nav">
  <button class="active" onclick="showSection('dashboard')"><span class="bnav-icon">◉</span>Inicio</button>
  <button onclick="showSection('reservations')"><span class="bnav-icon">◎</span>Reservas</button>
  <button onclick="showSection('menu')"><span class="bnav-icon">☰</span>Carta</button>
  <button onclick="showSection('orders')"><span class="bnav-icon">▤</span>Pedidos</button>
  <button onclick="showSection('reviews')"><span class="bnav-icon">⊞</span>Rese\u00F1as</button>
  <button onclick="showSection('analytics')"><span class="bnav-icon">◈</span>Analytics</button>
</nav>

<script>
function showSection(id) {
window.scrollTo(0,0);
  document.querySelectorAll('.section').forEach(function(s) { s.classList.remove('active'); });
  var sec = document.getElementById('sec-' + id);
  if (sec) sec.classList.add('active');

  document.querySelectorAll('.sidebar-link').forEach(function(l) { l.classList.remove('active'); });
  document.querySelectorAll('.bottom-nav button').forEach(b=>b.classList.remove('active'));
  var links = document.querySelectorAll('.sidebar-link');
  links.forEach(function(l) {
    if (l.getAttribute('onclick') && l.getAttribute('onclick').indexOf(id) !== -1) {
      l.classList.add('active');
    }
  });
  var bnav = document.querySelector('.bottom-nav button[onclick*="'+id+'"]');
  if(bnav) bnav.classList.add('active');

  var titles = {
    dashboard: 'Dashboard',
    reservations: 'Reservas',
    menu: 'Carta',
    orders: 'Pedidos',
    reviews: 'Rese\u00F1as',
    analytics: 'Analytics',
    settings: 'Configuraci\u00F3n'
  };
  var titleEl = document.getElementById('topbar-title');
  if (titleEl && titles[id]) titleEl.textContent = titles[id];
}

// Counter animation
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(function(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var prefix = el.getAttribute('data-prefix') || '';
    var suffix = el.getAttribute('data-suffix') || '';
    var decimals = parseInt(el.getAttribute('data-decimals') || '0');
    var duration = 1200;
    var start = 0;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = start + (target - start) * eased;
      if (decimals > 0) {
        el.textContent = prefix + current.toFixed(decimals) + suffix;
      } else {
        el.textContent = prefix + Math.round(current).toLocaleString('es-ES') + suffix;
      }
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
}
animateCounters();
</script>
</body>
</html>`
  },
}
