import type { TemplateDefinition, TemplateCustomization } from '../types'

export const deliveryTemplate: TemplateDefinition = {
  meta: {
    id: 'delivery',
    name: 'Delivery / Logística',
    industries: ['delivery', 'envío', 'shipping', 'logística', 'logistics', 'transporte', 'courier', 'paquetería', 'reparto', 'fleet', 'flota'],
    projectTypes: ['landing', 'mvp', 'system', 'saas'],
    sections: ['dashboard', 'orders', 'routes', 'drivers', 'tracking', 'analytics', 'settings'],
    description: 'Plantilla premium para empresas de delivery, logística y transporte. Dashboard con entregas, rutas, conductores, tracking en tiempo real y analytics de operaciones.',
  },

  render(c: TemplateCustomization): string {
    const p = c.primaryColor || '#22c55e'
    const a = c.accentColor || '#f59e0b'
    const bn = c.businessName || 'Mi Delivery'

    return `<!DOCTYPE html>
<html lang="${c.locale || 'es'}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${bn} — Panel de Gestión</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
/* ═══════════ DELIVERY DASHBOARD — FULL SELF-CONTAINED ═══════════ */
:root {
  --primary: ${p};
  --accent: ${a};
  --sidebar-bg: #101214;
  --content-bg: #0c0e10;
  --card-bg: rgba(16,18,20,0.9);
  --card-border: rgba(34,197,94,0.07);
  --text: #e2e8f0;
  --text-muted: #94a3b8;
  --text-dim: #64748b;
  --success: #22c55e;
  --warning: #f59e0b;
  --danger: #ef4444;
  --info: #3b82f6;
}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: 'Barlow', sans-serif;
  background: var(--content-bg);
  color: var(--text);
  min-height: 100vh;
  overflow-x: hidden;
}
a { color: inherit; text-decoration: none; }

/* ─── SIDEBAR ─── */
.sidebar {
  position: fixed;
  top: 0; left: 0;
  width: 250px;
  height: 100vh;
  background: var(--sidebar-bg);
  border-right: 1px solid var(--card-border);
  display: flex;
  flex-direction: column;
  z-index: 100;
  transition: transform 0.3s;
}
.sidebar-logo {
  padding: 1.5rem 1.2rem;
  border-bottom: 1px solid rgba(34,197,94,0.07);
  display: flex;
  align-items: center;
  gap: 10px;
}
.sidebar-logo-icon {
  width: 36px; height: 36px;
  background: linear-gradient(135deg, var(--primary), var(--accent));
  border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.1rem; font-weight: 800; color: #fff;
}
.sidebar-logo-text {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.sidebar-nav {
  flex: 1;
  padding: 1rem 0;
  overflow-y: auto;
}
.sidebar-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0.75rem 1.2rem;
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.2s;
  border-left: 3px solid transparent;
}
.sidebar-link:hover {
  color: var(--text);
  background: rgba(34,197,94,0.06);
}
.sidebar-link.active {
  color: var(--primary);
  background: rgba(34,197,94,0.1);
  border-left-color: var(--primary);
  font-weight: 700;
}
.sidebar-link-icon {
  font-size: 1rem;
  width: 24px;
  text-align: center;
}
.sidebar-footer {
  padding: 1rem 1.2rem;
  border-top: 1px solid rgba(34,197,94,0.07);
  font-size: 0.62rem;
  color: var(--text-dim);
  text-align: center;
}

/* ─── TOP NAVBAR ─── */
.topbar {
  position: fixed;
  top: 0;
  left: 250px;
  right: 0;
  height: 56px;
  background: rgba(12,14,16,0.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--card-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  z-index: 99;
}
.topbar-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-muted);
}
.topbar-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.topbar-badge {
  padding: 0.3rem 0.7rem;
  border-radius: 6px;
  font-size: 0.6rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: rgba(34,197,94,0.1);
  color: var(--primary);
  border: 1px solid rgba(34,197,94,0.2);
}
.topbar-avatar {
  width: 32px; height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), var(--accent));
  display: flex; align-items: center; justify-content: center;
  font-size: 0.72rem; font-weight: 700; color: #fff;
}
.hamburger {
  display: none;
  background: none; border: none;
  font-size: 1.4rem; color: var(--text);
  cursor: pointer;
}

/* ─── MAIN CONTENT ─── */
.main {
  margin-left: 250px;
  padding-top: 56px;
  min-height: 100vh;
}
.main-inner {
  padding: 1.5rem;
  max-width: 1400px;
}

/* ─── SECTIONS ─── */
.section {
  display: none;
  animation: fadeUp 0.4s ease;
}
.section.active { display: block; }
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
.section-header { margin-bottom: 1.5rem; }
.section-label {
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 2px;
  color: var(--primary);
  text-transform: uppercase;
  margin-bottom: 0.3rem;
}
.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.3rem;
}
.section-desc {
  font-size: 0.82rem;
  color: var(--text-muted);
}

/* ─── CARDS ─── */
.card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 10px;
  padding: 1.2rem;
  margin-bottom: 1rem;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.card-header h3 {
  font-size: 0.92rem;
  font-weight: 700;
}

/* ─── KPI GRID ─── */
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}
.kpi {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-left: 3px solid var(--primary);
  border-radius: 10px;
  padding: 1.2rem;
  position: relative;
}
.kpi-icon { font-size: 1.4rem; margin-bottom: 0.5rem; }
.kpi-value {
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--text);
  line-height: 1;
}
.kpi-label {
  font-size: 0.68rem;
  color: var(--text-dim);
  margin-top: 0.3rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.kpi-trend {
  font-size: 0.62rem;
  font-weight: 700;
  margin-top: 0.4rem;
}
.kpi-trend.up { color: var(--success); }
.kpi-trend.down { color: var(--danger); }

/* ─── TABLE ─── */
.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.78rem;
}
.data-table th {
  text-align: left;
  padding: 0.7rem 0.8rem;
  font-size: 0.6rem;
  font-weight: 700;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: 1px;
  border-bottom: 1px solid rgba(34,197,94,0.1);
}
.data-table td {
  padding: 0.7rem 0.8rem;
  border-bottom: 1px solid rgba(34,197,94,0.04);
  color: var(--text-muted);
}
.data-table tr:hover td {
  background: rgba(34,197,94,0.03);
}

/* ─── BADGES ─── */
.badge {
  display: inline-block;
  padding: 0.22rem 0.6rem;
  border-radius: 6px;
  font-size: 0.6rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.badge-green { background: rgba(34,197,94,0.12); color: #22c55e; }
.badge-yellow { background: rgba(245,158,11,0.12); color: #f59e0b; }
.badge-red { background: rgba(239,68,68,0.12); color: #ef4444; }
.badge-blue { background: rgba(59,130,246,0.12); color: #3b82f6; }
.badge-purple { background: rgba(168,85,247,0.12); color: #a855f7; }
.badge-accent { background: rgba(245,158,11,0.12); color: ${a}; }
.badge-primary { background: rgba(34,197,94,0.12); color: ${p}; }
.badge-gray { background: rgba(100,116,139,0.12); color: #94a3b8; }

/* ─── BAR CHART ─── */
.bar-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 0.7rem;
}
.bar-label {
  font-size: 0.72rem;
  color: var(--text-muted);
  min-width: 110px;
  text-align: right;
}
.bar-track {
  flex: 1;
  height: 20px;
  background: rgba(34,197,94,0.06);
  border-radius: 3px;
  overflow: hidden;
  position: relative;
}
.bar-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 1.2s ease;
  display: flex;
  align-items: center;
  padding-left: 8px;
  font-size: 0.6rem;
  font-weight: 700;
  color: #fff;
}
.bar-value {
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--text);
  min-width: 40px;
}

/* ─── GRID LAYOUTS ─── */
.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }

/* ─── ROUTE CARD ─── */
.route-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 10px;
  padding: 1.2rem;
  margin-bottom: 0.8rem;
  transition: border-color 0.2s;
}
.route-card:hover {
  border-color: rgba(34,197,94,0.2);
}

/* ─── PROGRESS ─── */
.progress-row { margin-bottom: 0.8rem; }
.progress-label {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.3rem;
  font-size: 0.72rem;
  color: var(--text-muted);
}
.progress-track {
  height: 8px;
  background: rgba(34,197,94,0.08);
  border-radius: 3px;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 1.2s ease;
}

/* ─── TRACKING TIMELINE ─── */
.timeline {
  position: relative;
  padding-left: 40px;
}
.timeline::before {
  content: '';
  position: absolute;
  left: 15px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: rgba(34,197,94,0.15);
}
.timeline-step {
  position: relative;
  padding-bottom: 1.8rem;
}
.timeline-step:last-child { padding-bottom: 0; }
.timeline-dot {
  position: absolute;
  left: -33px;
  top: 2px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.68rem;
  font-weight: 700;
  z-index: 1;
}
.timeline-dot.done {
  background: var(--success);
  color: #fff;
}
.timeline-dot.pending {
  background: rgba(100,116,139,0.2);
  border: 2px solid var(--text-dim);
  color: var(--text-dim);
}
.timeline-title {
  font-size: 0.88rem;
  font-weight: 700;
  margin-bottom: 0.2rem;
}
.timeline-desc {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-bottom: 0.2rem;
}
.timeline-time {
  font-size: 0.65rem;
  color: var(--text-dim);
}

/* ─── STATUS CARDS ─── */
.status-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 12px;
}
.status-dot {
  width: 10px; height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}
.status-dot.green { background: #22c55e; box-shadow: 0 0 8px rgba(34,197,94,0.4); }
.status-dot.yellow { background: #f59e0b; box-shadow: 0 0 8px rgba(245,158,11,0.4); }
.status-dot.red { background: #ef4444; box-shadow: 0 0 8px rgba(239,68,68,0.4); }

/* ─── SETTINGS ─── */
.settings-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.9rem 0;
  border-bottom: 1px solid rgba(34,197,94,0.04);
}
.settings-label { font-size: 0.82rem; color: var(--text-muted); }
.settings-input {
  background: rgba(34,197,94,0.06);
  border: 1px solid rgba(34,197,94,0.12);
  border-radius: 6px;
  padding: 0.5rem 0.8rem;
  color: var(--text);
  font-size: 0.78rem;
  font-family: 'Barlow', sans-serif;
  width: 260px;
}
.toggle {
  width: 40px; height: 22px;
  background: rgba(34,197,94,0.15);
  border-radius: 100px;
  position: relative;
  cursor: pointer;
  transition: background 0.2s;
}
.toggle.on { background: var(--primary); }
.toggle-knob {
  width: 16px; height: 16px;
  background: #fff;
  border-radius: 50%;
  position: absolute;
  top: 3px; left: 3px;
  transition: transform 0.2s;
}
.toggle.on .toggle-knob { transform: translateX(18px); }

/* ─── ALERT ROW ─── */
.alert-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0.7rem 0;
  border-bottom: 1px solid rgba(34,197,94,0.04);
}
.alert-row:last-child { border-bottom: none; }
.alert-icon { font-size: 1rem; }
.alert-text { flex: 1; font-size: 0.78rem; color: var(--text-muted); }

/* ─── FOOTER ─── */
.footer {
  text-align: center;
  padding: 2rem 1rem;
  font-size: 0.7rem;
  color: var(--text-dim);
  border-top: 1px solid var(--card-border);
  margin-top: 2rem;
}

/* ─── RESPONSIVE ─── */
@media (max-width: 1024px) {
  .kpi-grid { grid-template-columns: repeat(2, 1fr); }
  .grid-2 { grid-template-columns: 1fr; }
  .grid-3 { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  .sidebar { display: none; }
  .topbar { left: 0; }
  .main { margin-left: 0; width: 100%; padding: 16px; padding-bottom: 70px; }
  .bottom-nav { display: flex; }
  .kpi-grid { grid-template-columns: 1fr 1fr; }
  .grid-3 { grid-template-columns: 1fr; }
  .settings-input { width: 160px; }
  .bar-label { min-width: 80px; font-size: 0.65rem; }
}
@media (max-width: 480px) {
  .kpi-grid { grid-template-columns: 1fr; }
  .settings-input { width: 120px; }
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

<!-- ═══════════ SIDEBAR ═══════════ -->
<div class="app-layout">
<aside class="sidebar" id="sidebar">
  <div class="sidebar-logo">
    <div class="sidebar-logo-icon">${bn.charAt(0).toUpperCase()}</div>
    <div class="sidebar-logo-text">${bn}</div>
  </div>
  <nav class="sidebar-nav">
    <div class="sidebar-link active" onclick="showSection('dashboard')">
      <span class="sidebar-link-icon">◉</span> Dashboard
    </div>
    <div class="sidebar-link" onclick="showSection('orders')">
      <span class="sidebar-link-icon">⊞</span> Pedidos
    </div>
    <div class="sidebar-link" onclick="showSection('routes')">
      <span class="sidebar-link-icon">▤</span> Rutas
    </div>
    <div class="sidebar-link" onclick="showSection('drivers')">
      <span class="sidebar-link-icon">☰</span> Repartidores
    </div>
    <div class="sidebar-link" onclick="showSection('tracking')">
      <span class="sidebar-link-icon">◎</span> Tracking
    </div>
    <div class="sidebar-link" onclick="showSection('analytics')">
      <span class="sidebar-link-icon">◈</span> Analytics
    </div>
    <div class="sidebar-link" onclick="showSection('settings')">
      <span class="sidebar-link-icon">⚙</span> Config
    </div>
  </nav>
  <div class="sidebar-footer">Powered by Kerno Studio</div>
</aside>

<!-- ═══════════ TOP NAVBAR ═══════════ -->
<div class="main-area">
>
  <div style="display:flex;align-items:center;gap:12px">
    <button class="hamburger" onclick="document.getElementById('sidebar').classList.toggle('open')">☰</button>
    <span class="topbar-title" id="topbar-title">Dashboard</span>
  </div>
  <div class="topbar-right">
    <span class="topbar-badge">Logística</span>
    <div class="topbar-avatar">${bn.charAt(0).toUpperCase()}</div>
  </div>
</header>

<!-- ═══════════ MAIN CONTENT ═══════════ -->
<div class="main">
<div class="main-inner">

  <!-- ── DASHBOARD ── -->
  <div class="section active" id="sec-dashboard">
    <div class="section-header">
      <div class="section-label">OPERACIONES</div>
      <div class="section-title">Panel de Control</div>
      <div class="section-desc">Métricas de entregas, repartidores y rendimiento en tiempo real.</div>
    </div>

    <div class="kpi-grid">
      <div class="kpi">
        <div class="kpi-icon">📦</div>
        <div class="kpi-value" data-counter="847">0</div>
        <div class="kpi-label">Entregas Hoy</div>
        <div class="kpi-trend up">▲ +23 vs ayer</div>
      </div>
      <div class="kpi">
        <div class="kpi-icon">⏱</div>
        <div class="kpi-value" data-counter="96" data-suffix="%">0%</div>
        <div class="kpi-label">Tasa Puntualidad</div>
        <div class="kpi-trend up">▲ +1.2%</div>
      </div>
      <div class="kpi">
        <div class="kpi-icon">🚗</div>
        <div class="kpi-value" data-counter="42">0</div>
        <div class="kpi-label">Repartidores</div>
        <div class="kpi-trend up">▲ +3 activos</div>
      </div>
      <div class="kpi">
        <div class="kpi-icon">💰</div>
        <div class="kpi-value" data-counter="12400" data-prefix="€">€0</div>
        <div class="kpi-label">Ingresos</div>
        <div class="kpi-trend up">▲ +€800</div>
      </div>
    </div>

    <div class="grid-2" style="margin-top:1.5rem">
      <div class="card">
        <div class="card-header">
          <h3>Entregas por Hora</h3>
          <span class="badge badge-accent">Hoy</span>
        </div>
        <div class="bar-row">
          <span class="bar-label">08:00-10:00</span>
          <div class="bar-track"><div class="bar-fill" style="width:0;background:${p}" data-width="51%">124</div></div>
          <span class="bar-value">124</span>
        </div>
        <div class="bar-row">
          <span class="bar-label">10:00-12:00</span>
          <div class="bar-track"><div class="bar-fill" style="width:0;background:${p}" data-width="81%">198</div></div>
          <span class="bar-value">198</span>
        </div>
        <div class="bar-row">
          <span class="bar-label">12:00-14:00</span>
          <div class="bar-track"><div class="bar-fill" style="width:0;background:${a}" data-width="100%">245</div></div>
          <span class="bar-value">245</span>
        </div>
        <div class="bar-row">
          <span class="bar-label">14:00-16:00</span>
          <div class="bar-track"><div class="bar-fill" style="width:0;background:${p}" data-width="73%">178</div></div>
          <span class="bar-value">178</span>
        </div>
        <div class="bar-row">
          <span class="bar-label">16:00-18:00</span>
          <div class="bar-track"><div class="bar-fill" style="width:0;background:${p}" data-width="64%">156</div></div>
          <span class="bar-value">156</span>
        </div>
        <div class="bar-row">
          <span class="bar-label">18:00-20:00</span>
          <div class="bar-track"><div class="bar-fill" style="width:0;background:${a}" data-width="36%">89</div></div>
          <span class="bar-value">89</span>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3>Estado en Tiempo Real</h3>
          <span class="badge badge-primary">Live</span>
        </div>
        <div style="display:grid;gap:0.7rem">
          <div class="status-card">
            <div class="status-dot green"></div>
            <div style="flex:1">
              <div style="font-size:0.82rem;font-weight:600">38 repartidores activos</div>
              <div style="font-size:0.68rem;color:var(--text-dim)">En ruta ahora mismo</div>
            </div>
            <span class="badge badge-green">Online</span>
          </div>
          <div class="status-card">
            <div class="status-dot yellow"></div>
            <div style="flex:1">
              <div style="font-size:0.82rem;font-weight:600">3 entregas retrasadas</div>
              <div style="font-size:0.68rem;color:var(--text-dim)">Zona Norte - tráfico denso</div>
            </div>
            <span class="badge badge-yellow">Retraso</span>
          </div>
          <div class="status-card">
            <div class="status-dot green"></div>
            <div style="flex:1">
              <div style="font-size:0.82rem;font-weight:600">17 pedidos pendientes</div>
              <div style="font-size:0.68rem;color:var(--text-dim)">Asignación automática en curso</div>
            </div>
            <span class="badge badge-blue">En cola</span>
          </div>
          <div class="status-card">
            <div class="status-dot green"></div>
            <div style="flex:1">
              <div style="font-size:0.82rem;font-weight:600">847 completadas hoy</div>
              <div style="font-size:0.68rem;color:var(--text-dim)">Objetivo diario: 900</div>
            </div>
            <span class="badge badge-green">94%</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ── PEDIDOS ── -->
  <div class="section" id="sec-orders">
    <div class="section-header">
      <div class="section-label">PEDIDOS</div>
      <div class="section-title">Gestión de Pedidos</div>
      <div class="section-desc">Tracking, estado y prioridad de todos los pedidos activos.</div>
    </div>
    <div class="card">
      <table class="data-table">
        <thead>
          <tr>
            <th>Tracking#</th>
            <th>Cliente</th>
            <th>Dirección</th>
            <th>Estado</th>
            <th>Prioridad</th>
            <th>ETA</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span style="font-family:monospace;font-size:0.72rem;color:var(--primary);font-weight:600">TRK-48291</span></td>
            <td style="font-weight:600;color:var(--text)">María García</td>
            <td>C/ Gran Vía 42, Madrid</td>
            <td><span class="badge badge-green">Entregado</span></td>
            <td><span class="badge badge-blue">Normal</span></td>
            <td style="color:var(--success);font-weight:600">12:30</td>
          </tr>
          <tr>
            <td><span style="font-family:monospace;font-size:0.72rem;color:var(--primary);font-weight:600">TRK-48292</span></td>
            <td style="font-weight:600;color:var(--text)">Pedro Álvarez</td>
            <td>Av. Diagonal 156, Barcelona</td>
            <td><span class="badge badge-blue">En ruta</span></td>
            <td><span class="badge badge-blue">Normal</span></td>
            <td style="color:var(--primary);font-weight:600">13:15</td>
          </tr>
          <tr>
            <td><span style="font-family:monospace;font-size:0.72rem;color:var(--primary);font-weight:600">TRK-48293</span></td>
            <td style="font-weight:600;color:var(--text)">Laura Fernández</td>
            <td>C/ Sierpes 28, Sevilla</td>
            <td><span class="badge badge-blue">En ruta</span></td>
            <td><span class="badge badge-yellow">Urgente</span></td>
            <td style="color:var(--warning);font-weight:600">13:45</td>
          </tr>
          <tr>
            <td><span style="font-family:monospace;font-size:0.72rem;color:var(--primary);font-weight:600">TRK-48294</span></td>
            <td style="font-weight:600;color:var(--text)">Jorge Ruiz</td>
            <td>C/ Colón 8, Valencia</td>
            <td><span class="badge badge-purple">Recogido</span></td>
            <td><span class="badge badge-blue">Normal</span></td>
            <td style="color:var(--primary);font-weight:600">14:00</td>
          </tr>
          <tr>
            <td><span style="font-family:monospace;font-size:0.72rem;color:var(--primary);font-weight:600">TRK-48295</span></td>
            <td style="font-weight:600;color:var(--text)">Isabel Moreno</td>
            <td>Paseo del Prado 3, Madrid</td>
            <td><span class="badge badge-yellow">Pendiente</span></td>
            <td><span class="badge badge-red">Express</span></td>
            <td style="color:var(--danger);font-weight:600">14:30</td>
          </tr>
          <tr>
            <td><span style="font-family:monospace;font-size:0.72rem;color:var(--primary);font-weight:600">TRK-48296</span></td>
            <td style="font-weight:600;color:var(--text)">David Jiménez</td>
            <td>Rambla Catalunya 92, BCN</td>
            <td><span class="badge badge-yellow">Pendiente</span></td>
            <td><span class="badge badge-blue">Normal</span></td>
            <td style="color:var(--primary);font-weight:600">15:00</td>
          </tr>
          <tr>
            <td><span style="font-family:monospace;font-size:0.72rem;color:var(--primary);font-weight:600">TRK-48297</span></td>
            <td style="font-weight:600;color:var(--text)">Carmen Vega</td>
            <td>C/ Larios 5, Málaga</td>
            <td><span class="badge badge-green">Entregado</span></td>
            <td><span class="badge badge-blue">Normal</span></td>
            <td style="color:var(--success);font-weight:600">15:30</td>
          </tr>
          <tr>
            <td><span style="font-family:monospace;font-size:0.72rem;color:var(--primary);font-weight:600">TRK-48298</span></td>
            <td style="font-weight:600;color:var(--text)">Roberto Sanz</td>
            <td>C/ Princesa 14, Madrid</td>
            <td><span class="badge badge-red">Fallido</span></td>
            <td><span class="badge badge-yellow">Urgente</span></td>
            <td style="color:var(--danger);font-weight:600">--:--</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- ── RUTAS ── -->
  <div class="section" id="sec-routes">
    <div class="section-header">
      <div class="section-label">RUTAS</div>
      <div class="section-title">Rutas Activas</div>
      <div class="section-desc">Conductores asignados, zonas, paradas y progreso de cada ruta.</div>
    </div>

    <div class="grid-2">
      <div class="route-card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.6rem">
          <div style="display:flex;align-items:center;gap:8px">
            <div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,${p},${a});display:flex;align-items:center;justify-content:center;font-size:0.7rem;font-weight:700;color:#fff">CR</div>
            <div>
              <div style="font-size:0.88rem;font-weight:700">Carlos Ramírez</div>
              <div style="font-size:0.68rem;color:var(--text-dim)">Zona Norte · Furgoneta</div>
            </div>
          </div>
          <span class="badge badge-green">En ruta</span>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:0.72rem;color:var(--text-dim);margin-bottom:0.5rem">
          <span>18 paradas</span>
          <span>Ubicación: Av. Castellana</span>
        </div>
        <div class="progress-row" style="margin-bottom:0">
          <div class="progress-label"><span>16/18 completadas</span><span>89%</span></div>
          <div class="progress-track"><div class="progress-fill" style="width:0;background:${p}" data-width="89%"></div></div>
        </div>
      </div>

      <div class="route-card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.6rem">
          <div style="display:flex;align-items:center;gap:8px">
            <div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,${p},${a});display:flex;align-items:center;justify-content:center;font-size:0.7rem;font-weight:700;color:#fff">AM</div>
            <div>
              <div style="font-size:0.88rem;font-weight:700">Ana Martín</div>
              <div style="font-size:0.68rem;color:var(--text-dim)">Zona Centro · Moto</div>
            </div>
          </div>
          <span class="badge badge-blue">Completada</span>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:0.72rem;color:var(--text-dim);margin-bottom:0.5rem">
          <span>22 paradas</span>
          <span>Ubicación: Base</span>
        </div>
        <div class="progress-row" style="margin-bottom:0">
          <div class="progress-label"><span>22/22 completadas</span><span>100%</span></div>
          <div class="progress-track"><div class="progress-fill" style="width:0;background:var(--info)" data-width="100%"></div></div>
        </div>
      </div>

      <div class="route-card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.6rem">
          <div style="display:flex;align-items:center;gap:8px">
            <div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,${p},${a});display:flex;align-items:center;justify-content:center;font-size:0.7rem;font-weight:700;color:#fff">MT</div>
            <div>
              <div style="font-size:0.88rem;font-weight:700">Miguel Torres</div>
              <div style="font-size:0.68rem;color:var(--text-dim)">Zona Sur · Moto</div>
            </div>
          </div>
          <span class="badge badge-green">En ruta</span>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:0.72rem;color:var(--text-dim);margin-bottom:0.5rem">
          <span>15 paradas</span>
          <span>Ubicación: C/ Sierpes</span>
        </div>
        <div class="progress-row" style="margin-bottom:0">
          <div class="progress-label"><span>8/15 completadas</span><span>53%</span></div>
          <div class="progress-track"><div class="progress-fill" style="width:0;background:${a}" data-width="53%"></div></div>
        </div>
      </div>

      <div class="route-card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.6rem">
          <div style="display:flex;align-items:center;gap:8px">
            <div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,${p},${a});display:flex;align-items:center;justify-content:center;font-size:0.7rem;font-weight:700;color:#fff">ES</div>
            <div>
              <div style="font-size:0.88rem;font-weight:700">Elena Sánchez</div>
              <div style="font-size:0.68rem;color:var(--text-dim)">Zona Este · Furgoneta</div>
            </div>
          </div>
          <span class="badge badge-green">En ruta</span>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:0.72rem;color:var(--text-dim);margin-bottom:0.5rem">
          <span>20 paradas</span>
          <span>Ubicación: Av. del Puerto</span>
        </div>
        <div class="progress-row" style="margin-bottom:0">
          <div class="progress-label"><span>14/20 completadas</span><span>70%</span></div>
          <div class="progress-track"><div class="progress-fill" style="width:0;background:${p}" data-width="70%"></div></div>
        </div>
      </div>

      <div class="route-card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.6rem">
          <div style="display:flex;align-items:center;gap:8px">
            <div style="width:36px;height:36px;border-radius:50%;background:rgba(100,116,139,0.2);display:flex;align-items:center;justify-content:center;font-size:0.7rem;font-weight:700;color:var(--text-dim)">PF</div>
            <div>
              <div style="font-size:0.88rem;font-weight:700">Pablo Fernández</div>
              <div style="font-size:0.68rem;color:var(--text-dim)">Zona Oeste · Bici</div>
            </div>
          </div>
          <span class="badge badge-yellow">Pendiente</span>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:0.72rem;color:var(--text-dim);margin-bottom:0.5rem">
          <span>12 paradas</span>
          <span>Inicio: 14:00</span>
        </div>
        <div class="progress-row" style="margin-bottom:0">
          <div class="progress-label"><span>0/12 completadas</span><span>0%</span></div>
          <div class="progress-track"><div class="progress-fill" style="width:0;background:var(--text-dim)" data-width="0%"></div></div>
        </div>
      </div>

      <div class="route-card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.6rem">
          <div style="display:flex;align-items:center;gap:8px">
            <div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,${p},${a});display:flex;align-items:center;justify-content:center;font-size:0.7rem;font-weight:700;color:#fff">LG</div>
            <div>
              <div style="font-size:0.88rem;font-weight:700">Lucía Gómez</div>
              <div style="font-size:0.68rem;color:var(--text-dim)">Zona Centro · Furgoneta</div>
            </div>
          </div>
          <span class="badge badge-green">En ruta</span>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:0.72rem;color:var(--text-dim);margin-bottom:0.5rem">
          <span>24 paradas</span>
          <span>Ubicación: Gran Vía</span>
        </div>
        <div class="progress-row" style="margin-bottom:0">
          <div class="progress-label"><span>19/24 completadas</span><span>79%</span></div>
          <div class="progress-track"><div class="progress-fill" style="width:0;background:${p}" data-width="79%"></div></div>
        </div>
      </div>
    </div>
  </div>

  <!-- ── REPARTIDORES ── -->
  <div class="section" id="sec-drivers">
    <div class="section-header">
      <div class="section-label">REPARTIDORES</div>
      <div class="section-title">Gestión de Repartidores</div>
      <div class="section-desc">Rendimiento, vehículo, rating y estado de cada repartidor.</div>
    </div>
    <div class="card">
      <table class="data-table">
        <thead>
          <tr>
            <th>Repartidor</th>
            <th>Vehículo</th>
            <th style="text-align:center">Entregas Hoy</th>
            <th style="text-align:center">Rating</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="font-weight:600;color:var(--text)">Carlos Ramírez</td>
            <td><span class="badge badge-blue">Furgoneta</span></td>
            <td style="text-align:center;font-weight:700;color:var(--text)">38</td>
            <td style="text-align:center"><span style="color:${a}">★</span> 4.9</td>
            <td><span class="badge badge-green">Activo</span></td>
          </tr>
          <tr>
            <td style="font-weight:600;color:var(--text)">Ana Martín</td>
            <td><span class="badge badge-purple">Moto</span></td>
            <td style="text-align:center;font-weight:700;color:var(--text)">34</td>
            <td style="text-align:center"><span style="color:${a}">★</span> 4.8</td>
            <td><span class="badge badge-blue">Descanso</span></td>
          </tr>
          <tr>
            <td style="font-weight:600;color:var(--text)">Miguel Torres</td>
            <td><span class="badge badge-purple">Moto</span></td>
            <td style="text-align:center;font-weight:700;color:var(--text)">22</td>
            <td style="text-align:center"><span style="color:${a}">★</span> 4.7</td>
            <td><span class="badge badge-green">Activo</span></td>
          </tr>
          <tr>
            <td style="font-weight:600;color:var(--text)">Elena Sánchez</td>
            <td><span class="badge badge-blue">Furgoneta</span></td>
            <td style="text-align:center;font-weight:700;color:var(--text)">28</td>
            <td style="text-align:center"><span style="color:${a}">★</span> 4.8</td>
            <td><span class="badge badge-green">Activo</span></td>
          </tr>
          <tr>
            <td style="font-weight:600;color:var(--text)">Pablo Fernández</td>
            <td><span class="badge badge-green">Bici</span></td>
            <td style="text-align:center;font-weight:700;color:var(--text)">0</td>
            <td style="text-align:center"><span style="color:${a}">★</span> 4.5</td>
            <td><span class="badge badge-gray">Offline</span></td>
          </tr>
          <tr>
            <td style="font-weight:600;color:var(--text)">Lucía Gómez</td>
            <td><span class="badge badge-blue">Furgoneta</span></td>
            <td style="text-align:center;font-weight:700;color:var(--text)">31</td>
            <td style="text-align:center"><span style="color:${a}">★</span> 4.9</td>
            <td><span class="badge badge-green">Activo</span></td>
          </tr>
          <tr>
            <td style="font-weight:600;color:var(--text)">Diego Ruiz</td>
            <td><span class="badge badge-purple">Moto</span></td>
            <td style="text-align:center;font-weight:700;color:var(--text)">26</td>
            <td style="text-align:center"><span style="color:${a}">★</span> 4.6</td>
            <td><span class="badge badge-green">Activo</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- ── TRACKING ── -->
  <div class="section" id="sec-tracking">
    <div class="section-header">
      <div class="section-label">TRACKING</div>
      <div class="section-title">Seguimiento en Tiempo Real</div>
      <div class="section-desc">Estado detallado de la entrega con progreso paso a paso.</div>
    </div>

    <div class="grid-2" style="align-items:start">
      <div>
        <div class="card" style="margin-bottom:1rem">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.8rem">
            <span style="font-family:monospace;font-size:1rem;font-weight:800;color:var(--primary)">TRK-48293</span>
            <span class="badge badge-blue">En Ruta</span>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem;font-size:0.78rem">
            <div><span style="color:var(--text-dim)">Cliente:</span> Laura Fernández</div>
            <div><span style="color:var(--text-dim)">Repartidor:</span> Miguel Torres</div>
            <div><span style="color:var(--text-dim)">Origen:</span> Almacén Central</div>
            <div><span style="color:var(--text-dim)">Destino:</span> C/ Sierpes 28</div>
            <div><span style="color:var(--text-dim)">Prioridad:</span> <span class="badge badge-yellow">Urgente</span></div>
            <div><span style="color:var(--text-dim)">ETA:</span> <span style="color:var(--success);font-weight:700">13:45</span></div>
          </div>
        </div>

        <h3 style="font-size:0.9rem;font-weight:700;margin-bottom:1.2rem">Progreso de Entrega</h3>
        <div class="timeline">
          <div class="timeline-step">
            <div class="timeline-dot done">✓</div>
            <div class="timeline-title">Pedido recibido</div>
            <div class="timeline-desc">El pedido ha sido registrado en el sistema.</div>
            <div class="timeline-time">09 Abr 2026 — 09:12</div>
          </div>
          <div class="timeline-step">
            <div class="timeline-dot done">✓</div>
            <div class="timeline-title">Recogido</div>
            <div class="timeline-desc">Miguel Torres ha recogido el paquete en Almacén Central.</div>
            <div class="timeline-time">09 Abr 2026 — 10:20</div>
          </div>
          <div class="timeline-step">
            <div class="timeline-dot done">✓</div>
            <div class="timeline-title">En ruta</div>
            <div class="timeline-desc">El paquete está en camino hacia C/ Sierpes 28, Sevilla.</div>
            <div class="timeline-time">09 Abr 2026 — 10:35</div>
          </div>
          <div class="timeline-step">
            <div class="timeline-dot done">✓</div>
            <div class="timeline-title">En reparto</div>
            <div class="timeline-desc">El repartidor ha llegado a la zona de entrega.</div>
            <div class="timeline-time">09 Abr 2026 — 13:20</div>
          </div>
          <div class="timeline-step">
            <div class="timeline-dot pending">5</div>
            <div class="timeline-title" style="color:var(--text-dim)">Entregado</div>
            <div class="timeline-desc">Pendiente de confirmación con firma digital.</div>
            <div class="timeline-time">ETA: 13:45</div>
          </div>
        </div>
      </div>

      <div>
        <div class="card" style="text-align:center;padding:1.5rem">
          <div style="font-size:0.65rem;text-transform:uppercase;letter-spacing:1px;color:var(--text-dim);margin-bottom:1rem">Mapa de Ruta (Simulado)</div>
          <div style="background:rgba(34,197,94,0.04);border:1px solid rgba(34,197,94,0.12);border-radius:10px;padding:2rem;min-height:260px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem">
            <div style="font-size:2.5rem">🗺️</div>
            <div style="font-size:0.82rem;color:var(--text-muted)">Almacén Central → C/ Sierpes 28</div>
            <div style="display:flex;gap:2rem;margin-top:0.5rem">
              <div style="text-align:center">
                <div style="font-size:1.4rem;font-weight:800;color:var(--success)">24km</div>
                <div style="font-size:0.6rem;color:var(--text-dim);text-transform:uppercase">Distancia</div>
              </div>
              <div style="text-align:center">
                <div style="font-size:1.4rem;font-weight:800;color:var(--primary)">25min</div>
                <div style="font-size:0.6rem;color:var(--text-dim);text-transform:uppercase">Restante</div>
              </div>
              <div style="text-align:center">
                <div style="font-size:1.4rem;font-weight:800;color:${a}">4/5</div>
                <div style="font-size:0.6rem;color:var(--text-dim);text-transform:uppercase">Pasos</div>
              </div>
            </div>
          </div>
        </div>

        <div class="kpi-grid" style="grid-template-columns:1fr 1fr;margin-top:1rem">
          <div class="kpi">
            <div class="kpi-icon">⏱</div>
            <div style="font-size:1.4rem;font-weight:800">25 min</div>
            <div class="kpi-label">Tiempo Restante</div>
          </div>
          <div class="kpi">
            <div class="kpi-icon">📍</div>
            <div style="font-size:1.4rem;font-weight:800">24 km</div>
            <div class="kpi-label">Distancia Total</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ── ANALYTICS ── -->
  <div class="section" id="sec-analytics">
    <div class="section-header">
      <div class="section-label">ANALYTICS</div>
      <div class="section-title">Métricas Operativas</div>
      <div class="section-desc">Rendimiento por franjas horarias, eficiencia y métricas de entrega.</div>
    </div>
    <div class="grid-2">
      <div class="card">
        <div class="card-header"><h3>Entregas por Zona</h3></div>
        <div class="bar-row">
          <span class="bar-label">Zona Norte</span>
          <div class="bar-track"><div class="bar-fill" style="width:0;background:${p}" data-width="100%">245</div></div>
          <span class="bar-value">245</span>
        </div>
        <div class="bar-row">
          <span class="bar-label">Zona Centro</span>
          <div class="bar-track"><div class="bar-fill" style="width:0;background:${p}" data-width="81%">198</div></div>
          <span class="bar-value">198</span>
        </div>
        <div class="bar-row">
          <span class="bar-label">Zona Sur</span>
          <div class="bar-track"><div class="bar-fill" style="width:0;background:${a}" data-width="72%">176</div></div>
          <span class="bar-value">176</span>
        </div>
        <div class="bar-row">
          <span class="bar-label">Zona Este</span>
          <div class="bar-track"><div class="bar-fill" style="width:0;background:${p}" data-width="55%">134</div></div>
          <span class="bar-value">134</span>
        </div>
        <div class="bar-row">
          <span class="bar-label">Zona Oeste</span>
          <div class="bar-track"><div class="bar-fill" style="width:0;background:${a}" data-width="38%">94</div></div>
          <span class="bar-value">94</span>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><h3>Métricas Operativas</h3></div>
        <div class="progress-row">
          <div class="progress-label"><span>Tasa A Tiempo</span><span>96%</span></div>
          <div class="progress-track"><div class="progress-fill" style="width:0;background:${p}" data-width="96%"></div></div>
        </div>
        <div class="progress-row">
          <div class="progress-label"><span>Satisfacción Cliente</span><span>94%</span></div>
          <div class="progress-track"><div class="progress-fill" style="width:0;background:${p}" data-width="94%"></div></div>
        </div>
        <div class="progress-row">
          <div class="progress-label"><span>Eficiencia de Ruta</span><span>88%</span></div>
          <div class="progress-track"><div class="progress-fill" style="width:0;background:${a}" data-width="88%"></div></div>
        </div>
        <div class="progress-row">
          <div class="progress-label"><span>Utilización Flota</span><span>91%</span></div>
          <div class="progress-track"><div class="progress-fill" style="width:0;background:${p}" data-width="91%"></div></div>
        </div>
      </div>
    </div>
    <div class="card" style="margin-top:1.5rem;text-align:center;padding:2rem">
      <div style="font-size:0.65rem;text-transform:uppercase;letter-spacing:2px;color:var(--text-dim);margin-bottom:0.5rem">Revenue Mensual</div>
      <div style="font-size:2.8rem;font-weight:800;color:var(--primary);margin-bottom:1rem" data-counter-big="372000" data-prefix="€">€0</div>
      <div style="display:flex;justify-content:center;gap:3rem">
        <div style="text-align:center"><div style="font-size:1.2rem;font-weight:700;color:var(--text)">€4.20</div><div style="font-size:0.65rem;color:var(--text-dim)">Coste/entrega</div></div>
        <div style="text-align:center"><div style="font-size:1.2rem;font-weight:700;color:var(--text)">42 min</div><div style="font-size:0.65rem;color:var(--text-dim)">Tiempo medio</div></div>
        <div style="text-align:center"><div style="font-size:1.2rem;font-weight:700;color:var(--text)">25,410</div><div style="font-size:0.65rem;color:var(--text-dim)">Entregas/mes</div></div>
      </div>
    </div>
  </div>

  <!-- ── CONFIG ── -->
  <div class="section" id="sec-settings">
    <div class="section-header">
      <div class="section-label">CONFIGURACIÓN</div>
      <div class="section-title">Ajustes de Operaciones</div>
      <div class="section-desc">GPS, notificaciones, optimización de rutas y configuración general.</div>
    </div>
    <div class="card">
      <div class="settings-row">
        <span class="settings-label">Nombre de la empresa</span>
        <input class="settings-input" type="text" value="${bn}" readonly>
      </div>
      <div class="settings-row">
        <span class="settings-label">URL de tracking</span>
        <input class="settings-input" type="text" value="track.${bn.toLowerCase().replace(/\s+/g, '')}.com" readonly>
      </div>
      <div class="settings-row">
        <span class="settings-label">Email de operaciones</span>
        <input class="settings-input" type="email" value="ops@${bn.toLowerCase().replace(/\s+/g, '')}.com" readonly>
      </div>
      <div class="settings-row">
        <span class="settings-label">Notificaciones SMS</span>
        <div class="toggle on" onclick="this.classList.toggle('on')"><div class="toggle-knob"></div></div>
      </div>
      <div class="settings-row">
        <span class="settings-label">GPS tracking activo</span>
        <div class="toggle on" onclick="this.classList.toggle('on')"><div class="toggle-knob"></div></div>
      </div>
      <div class="settings-row">
        <span class="settings-label">Optimización de rutas IA</span>
        <div class="toggle on" onclick="this.classList.toggle('on')"><div class="toggle-knob"></div></div>
      </div>
      <div class="settings-row">
        <span class="settings-label">Modo nocturno (rutas 20-06h)</span>
        <div class="toggle" onclick="this.classList.toggle('on')"><div class="toggle-knob"></div></div>
      </div>
    </div>
  </div>

</div>
</div>

<!-- ═══════════ FOOTER ═══════════ -->
<div class="footer" style="margin-left:250px">
  © 2026 ${bn} — Powered by <strong style="color:var(--accent)">Kerno Studio</strong>
</div>

</div><!-- /main-area -->
</div><!-- /app-layout -->
 Nav (mobile only) -->
<nav class="bottom-nav">
  <button class="active" onclick="showSection('dashboard')"><span class="bnav-icon">◉</span>Inicio</button>
  <button onclick="showSection('orders')"><span class="bnav-icon">◎</span>Pedidos</button>
  <button onclick="showSection('routes')"><span class="bnav-icon">☰</span>Rutas</button>
  <button onclick="showSection('drivers')"><span class="bnav-icon">▤</span>Repartidores</button>
  <button onclick="showSection('tracking')"><span class="bnav-icon">⊞</span>Tracking</button>
  <button onclick="showSection('analytics')"><span class="bnav-icon">◈</span>Analytics</button>
</nav>

<script>
/* ═══════════ DELIVERY DASHBOARD SCRIPTS ═══════════ */

// Section switching
function showSection(id) {
  document.querySelectorAll('.section').forEach(function(s) { s.classList.remove('active'); });
  document.querySelectorAll('.bottom-nav button').forEach(b=>b.classList.remove('active'));
  var sec = document.getElementById('sec-' + id);
  if (sec) {
    sec.classList.add('active');
    window.scrollTo(0, 0);
  }
  // Update sidebar active
  document.querySelectorAll('.sidebar-link').forEach(function(l) { l.classList.remove('active'); });
  var links = document.querySelectorAll('.sidebar-link');
  var sectionIds = ['dashboard','orders','routes','drivers','tracking','analytics','settings'];
  var idx = sectionIds.indexOf(id);
  if (idx >= 0 && links[idx]) links[idx].classList.add('active');
  var bnav = document.querySelector('.bottom-nav button[onclick*="'+id+'"]');
  if(bnav) bnav.classList.add('active');
  // Update topbar title
  var titles = { dashboard:'Dashboard', orders:'Pedidos', routes:'Rutas', drivers:'Repartidores', tracking:'Tracking', analytics:'Analytics', settings:'Configuración' };
  var topTitle = document.getElementById('topbar-title');
  if (topTitle) topTitle.textContent = titles[id] || id;
  // Close sidebar on mobile
  document.getElementById('sidebar').classList.remove('open');
  // Trigger animations for new section
  setTimeout(function() { animateBars(); animateCounters(); }, 100);
}

// Counter animation
function animateCounters() {
  document.querySelectorAll('.section.active [data-counter]').forEach(function(el) {
    if (el.dataset.animated) return;
    el.dataset.animated = '1';
    var target = parseFloat(el.dataset.counter);
    var decimals = parseInt(el.dataset.decimals || '0');
    var prefix = el.dataset.prefix || '';
    var suffix = el.dataset.suffix || '';
    var start = 0;
    var duration = 1200;
    var startTime = performance.now();
    function tick(now) {
      var elapsed = now - startTime;
      var progress = Math.min(elapsed / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = start + (target - start) * eased;
      el.textContent = prefix + current.toFixed(decimals).replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',') + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
  // Big counter
  document.querySelectorAll('.section.active [data-counter-big]').forEach(function(el) {
    if (el.dataset.animated) return;
    el.dataset.animated = '1';
    var target = parseFloat(el.dataset.counterBig);
    var prefix = el.dataset.prefix || '';
    var duration = 1800;
    var startTime = performance.now();
    function tick(now) {
      var elapsed = now - startTime;
      var progress = Math.min(elapsed / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.round(target * eased);
      el.textContent = prefix + current.toLocaleString('es-ES');
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}

// Bar chart animation
function animateBars() {
  document.querySelectorAll('.section.active .bar-fill[data-width]').forEach(function(bar) {
    bar.style.width = '0';
    setTimeout(function() { bar.style.width = bar.dataset.width; }, 50);
  });
  document.querySelectorAll('.section.active .progress-fill[data-width]').forEach(function(bar) {
    bar.style.width = '0';
    setTimeout(function() { bar.style.width = bar.dataset.width; }, 50);
  });
}

// Init on load
document.addEventListener('DOMContentLoaded', function() {
  animateCounters();
  animateBars();
});
</script>
</body>
</html>`
  },
}
