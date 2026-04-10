import type { TemplateDefinition, TemplateCustomization } from '../types'

export const bookingTemplate: TemplateDefinition = {
  meta: {
    id: 'booking',
    name: 'Reservas / Alojamiento',
    industries: ['booking', 'reservas', 'hotel', 'hostal', 'alojamiento', 'accommodation', 'turismo', 'tourism', 'tours', 'vacation'],
    projectTypes: ['landing', 'mvp', 'system', 'saas'],
    sections: ['dashboard', 'rooms', 'reservations', 'calendar', 'guests', 'analytics', 'settings'],
    description: 'Plantilla premium para hoteles, hostales y alojamientos turísticos. Dashboard con ocupación, reservas, habitaciones, calendario, huéspedes y analytics de revenue.',
  },

  render(c: TemplateCustomization): string {
    const p = c.primaryColor || '#0ea5e9'
    const a = c.accentColor || '#f59e0b'
    const bn = c.businessName || 'Mi Hotel'

    // Calendar generation
    const calDays: { day: string; occ: number; bk: number }[] = []
    const occs = [72,68,85,92,95,55,48,62,70,78,88,94,52,45,58,65,75,90,96,50,42,55,68,80,92,98,48,40,52,65]
    // April 2026 starts on Wednesday, pad Mon+Tue
    calDays.push({ day: '', occ: 0, bk: 0 })
    calDays.push({ day: '', occ: 0, bk: 0 })
    for (let i = 0; i < 30; i++) {
      const o = occs[i] || 50
      calDays.push({ day: String(i + 1), occ: o, bk: Math.round(o * 42 / 100) })
    }

    const calGrid = calDays.map(d => {
      if (!d.day) return '<div></div>'
      const bg = d.occ >= 80 ? 'rgba(239,68,68,0.2)' : d.occ >= 50 ? 'rgba(245,158,11,0.2)' : 'rgba(34,197,94,0.15)'
      const bc = d.occ >= 80 ? '#ef4444' : d.occ >= 50 ? '#f59e0b' : '#22c55e'
      return `<div style="background:${bg};border:1px solid ${bc}40;border-radius:10px;padding:8px;text-align:center;min-height:60px">
        <div style="font-size:0.72rem;font-weight:700;margin-bottom:2px">${d.day}</div>
        <div style="font-size:1.1rem;font-weight:800;color:${bc}">${d.occ}%</div>
        <div style="font-size:0.58rem;color:#64748b">${d.bk} res.</div>
      </div>`
    }).join('')

    return `<!DOCTYPE html>
<html lang="${c.locale || 'es'}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${bn} — Panel de Gestión</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
/* ═══════════ BOOKING DASHBOARD — FULL SELF-CONTAINED ═══════════ */
:root {
  --primary: ${p};
  --accent: ${a};
  --sidebar-bg: #0f1a24;
  --content-bg: #0a1520;
  --card-bg: rgba(15,26,36,0.85);
  --card-border: rgba(14,165,233,0.08);
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
  font-family: 'Quicksand', sans-serif;
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
  border-bottom: 1px solid rgba(14,165,233,0.08);
  display: flex;
  align-items: center;
  gap: 10px;
}
.sidebar-logo-icon {
  width: 36px; height: 36px;
  background: linear-gradient(135deg, var(--primary), var(--accent));
  border-radius: 10px;
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
  background: rgba(14,165,233,0.06);
}
.sidebar-link.active {
  color: var(--primary);
  background: rgba(14,165,233,0.1);
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
  border-top: 1px solid rgba(14,165,233,0.08);
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
  background: rgba(10,21,32,0.92);
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
  border-radius: 100px;
  font-size: 0.62rem;
  font-weight: 700;
  background: rgba(14,165,233,0.12);
  color: var(--primary);
  border: 1px solid rgba(14,165,233,0.2);
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
.section-header {
  margin-bottom: 1.5rem;
}
.section-label {
  font-size: 0.62rem;
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
  border-radius: 16px;
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
  background: linear-gradient(135deg, rgba(15,26,36,0.9), rgba(20,35,50,0.7));
  border: 1px solid var(--card-border);
  border-radius: 16px;
  padding: 1.2rem;
  position: relative;
  overflow: hidden;
}
.kpi::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--primary), var(--accent));
  opacity: 0.6;
}
.kpi-icon { font-size: 1.4rem; margin-bottom: 0.5rem; }
.kpi-value {
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--text);
  line-height: 1;
}
.kpi-label {
  font-size: 0.7rem;
  color: var(--text-dim);
  margin-top: 0.3rem;
}
.kpi-trend {
  font-size: 0.65rem;
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
  font-size: 0.65rem;
  font-weight: 700;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: 1px;
  border-bottom: 1px solid rgba(14,165,233,0.1);
}
.data-table td {
  padding: 0.7rem 0.8rem;
  border-bottom: 1px solid rgba(14,165,233,0.04);
  color: var(--text-muted);
}
.data-table tr:hover td {
  background: rgba(14,165,233,0.03);
}

/* ─── BADGES ─── */
.badge {
  display: inline-block;
  padding: 0.22rem 0.6rem;
  border-radius: 100px;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.3px;
}
.badge-green { background: rgba(34,197,94,0.12); color: #22c55e; }
.badge-yellow { background: rgba(245,158,11,0.12); color: #f59e0b; }
.badge-red { background: rgba(239,68,68,0.12); color: #ef4444; }
.badge-blue { background: rgba(59,130,246,0.12); color: #3b82f6; }
.badge-purple { background: rgba(168,85,247,0.12); color: #a855f7; }
.badge-accent { background: rgba(245,158,11,0.12); color: ${a}; }
.badge-primary { background: rgba(14,165,233,0.12); color: ${p}; }

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
  min-width: 120px;
  text-align: right;
}
.bar-track {
  flex: 1;
  height: 22px;
  background: rgba(14,165,233,0.06);
  border-radius: 6px;
  overflow: hidden;
  position: relative;
}
.bar-fill {
  height: 100%;
  border-radius: 6px;
  transition: width 1.2s ease;
  display: flex;
  align-items: center;
  padding-left: 8px;
  font-size: 0.62rem;
  font-weight: 700;
  color: #fff;
}
.bar-value {
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--text);
  min-width: 50px;
}

/* ─── GRID LAYOUTS ─── */
.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }

/* ─── ROOM CARDS ─── */
.room-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 16px;
  padding: 1.2rem;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}
.room-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 32px rgba(14,165,233,0.1);
}
.room-status-bar {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 4px;
}

/* ─── ALERT ROW ─── */
.alert-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0.7rem 0;
  border-bottom: 1px solid rgba(14,165,233,0.04);
}
.alert-row:last-child { border-bottom: none; }
.alert-icon { font-size: 1rem; }
.alert-text { flex: 1; font-size: 0.78rem; color: var(--text-muted); }

/* ─── CHECKIN LIST ─── */
.checkin-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.7rem 0;
  border-bottom: 1px solid rgba(14,165,233,0.04);
}
.checkin-item:last-child { border-bottom: none; }

/* ─── SETTINGS ─── */
.settings-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.9rem 0;
  border-bottom: 1px solid rgba(14,165,233,0.04);
}
.settings-label { font-size: 0.82rem; color: var(--text-muted); }
.settings-input {
  background: rgba(14,165,233,0.06);
  border: 1px solid rgba(14,165,233,0.12);
  border-radius: 8px;
  padding: 0.5rem 0.8rem;
  color: var(--text);
  font-size: 0.78rem;
  font-family: 'Quicksand', sans-serif;
  width: 260px;
}
.toggle {
  width: 40px; height: 22px;
  background: rgba(14,165,233,0.15);
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
  background: rgba(14,165,233,0.08);
  border-radius: 100px;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  border-radius: 100px;
  transition: width 1.2s ease;
}

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
  .sidebar { transform: translateX(-100%); }
  .sidebar.open { transform: translateX(0); }
  .topbar { left: 0; }
  .main { margin-left: 0; }
  .hamburger { display: block; }
  .kpi-grid { grid-template-columns: 1fr 1fr; }
  .grid-3 { grid-template-columns: 1fr; }
  .settings-input { width: 160px; }
  .bar-label { min-width: 80px; font-size: 0.65rem; }
}
@media (max-width: 480px) {
  .kpi-grid { grid-template-columns: 1fr; }
  .settings-input { width: 120px; }
}
</style>
</head>
<body>

<!-- ═══════════ SIDEBAR ═══════════ -->
<aside class="sidebar" id="sidebar">
  <div class="sidebar-logo">
    <div class="sidebar-logo-icon">${bn.charAt(0).toUpperCase()}</div>
    <div class="sidebar-logo-text">${bn}</div>
  </div>
  <nav class="sidebar-nav">
    <div class="sidebar-link active" onclick="showSection('dashboard')">
      <span class="sidebar-link-icon">◉</span> Dashboard
    </div>
    <div class="sidebar-link" onclick="showSection('rooms')">
      <span class="sidebar-link-icon">▤</span> Habitaciones
    </div>
    <div class="sidebar-link" onclick="showSection('reservations')">
      <span class="sidebar-link-icon">⊞</span> Reservas
    </div>
    <div class="sidebar-link" onclick="showSection('calendar')">
      <span class="sidebar-link-icon">◎</span> Calendario
    </div>
    <div class="sidebar-link" onclick="showSection('guests')">
      <span class="sidebar-link-icon">☰</span> Huéspedes
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
<header class="topbar">
  <div style="display:flex;align-items:center;gap:12px">
    <button class="hamburger" onclick="document.getElementById('sidebar').classList.toggle('open')">☰</button>
    <span class="topbar-title" id="topbar-title">Dashboard</span>
  </div>
  <div class="topbar-right">
    <span class="topbar-badge">Alojamiento</span>
    <div class="topbar-avatar">${bn.charAt(0).toUpperCase()}</div>
  </div>
</header>

<!-- ═══════════ MAIN CONTENT ═══════════ -->
<div class="main">
<div class="main-inner">

  <!-- ── DASHBOARD ── -->
  <div class="section active" id="sec-dashboard">
    <div class="section-header">
      <div class="section-label">ALOJAMIENTO</div>
      <div class="section-title">Panel de Control</div>
      <div class="section-desc">Métricas clave de ocupación, reservas y revenue en tiempo real.</div>
    </div>

    <div class="kpi-grid">
      <div class="kpi">
        <div class="kpi-icon">📅</div>
        <div class="kpi-value" data-counter="34">0</div>
        <div class="kpi-label">Reservas Hoy</div>
        <div class="kpi-trend up">▲ +6 vs ayer</div>
      </div>
      <div class="kpi">
        <div class="kpi-icon">🏨</div>
        <div class="kpi-value" data-counter="82" data-suffix="%">0%</div>
        <div class="kpi-label">Ocupación</div>
        <div class="kpi-trend up">▲ +4% semanal</div>
      </div>
      <div class="kpi">
        <div class="kpi-icon">💰</div>
        <div class="kpi-value" data-counter="142" data-prefix="€">€0</div>
        <div class="kpi-label">RevPAR</div>
        <div class="kpi-trend up">▲ +€12</div>
      </div>
      <div class="kpi">
        <div class="kpi-icon">⭐</div>
        <div class="kpi-value" data-counter="4.8" data-decimals="1">0</div>
        <div class="kpi-label">Reseñas</div>
        <div class="kpi-trend up">▲ +0.1</div>
      </div>
    </div>

    <div class="grid-2" style="margin-top:1.5rem">
      <div class="card">
        <div class="card-header">
          <h3>Ocupación por Tipo de Habitación</h3>
          <span class="badge badge-accent">Este mes</span>
        </div>
        <div class="bar-row">
          <span class="bar-label">Suite</span>
          <div class="bar-track"><div class="bar-fill" style="width:0;background:${p}" data-width="95%">95%</div></div>
          <span class="bar-value">95%</span>
        </div>
        <div class="bar-row">
          <span class="bar-label">Deluxe</span>
          <div class="bar-track"><div class="bar-fill" style="width:0;background:${a}" data-width="82%">82%</div></div>
          <span class="bar-value">82%</span>
        </div>
        <div class="bar-row">
          <span class="bar-label">Standard</span>
          <div class="bar-track"><div class="bar-fill" style="width:0;background:${p}" data-width="68%">68%</div></div>
          <span class="bar-value">68%</span>
        </div>
        <div class="bar-row">
          <span class="bar-label">Económica</span>
          <div class="bar-track"><div class="bar-fill" style="width:0;background:${a}" data-width="74%">74%</div></div>
          <span class="bar-value">74%</span>
        </div>
        <div class="bar-row">
          <span class="bar-label">Familiar</span>
          <div class="bar-track"><div class="bar-fill" style="width:0;background:${p}" data-width="88%">88%</div></div>
          <span class="bar-value">88%</span>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3>Check-ins Próximos</h3>
          <span class="badge badge-primary">Hoy</span>
        </div>
        <div class="checkin-item">
          <div>
            <div style="font-size:0.85rem;font-weight:700">Hans Müller</div>
            <div style="font-size:0.68rem;color:var(--text-dim)">Suite Presidencial · 4 noches</div>
          </div>
          <div style="text-align:right">
            <div style="font-size:0.78rem;font-weight:600;color:var(--primary)">14:00</div>
            <span class="badge badge-green">Confirmado</span>
          </div>
        </div>
        <div class="checkin-item">
          <div>
            <div style="font-size:0.85rem;font-weight:700">Marie Dubois</div>
            <div style="font-size:0.68rem;color:var(--text-dim)">Suite Junior · 5 noches</div>
          </div>
          <div style="text-align:right">
            <div style="font-size:0.78rem;font-weight:600;color:var(--primary)">15:30</div>
            <span class="badge badge-green">Confirmado</span>
          </div>
        </div>
        <div class="checkin-item">
          <div>
            <div style="font-size:0.85rem;font-weight:700">James Smith</div>
            <div style="font-size:0.68rem;color:var(--text-dim)">Deluxe Doble · 3 noches</div>
          </div>
          <div style="text-align:right">
            <div style="font-size:0.78rem;font-weight:600;color:var(--warning)">16:00</div>
            <span class="badge badge-yellow">Pendiente</span>
          </div>
        </div>
        <div class="checkin-item">
          <div>
            <div style="font-size:0.85rem;font-weight:700">Ana López</div>
            <div style="font-size:0.68rem;color:var(--text-dim)">Standard Doble · 4 noches</div>
          </div>
          <div style="text-align:right">
            <div style="font-size:0.78rem;font-weight:600;color:var(--primary)">17:00</div>
            <span class="badge badge-green">Confirmado</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ── HABITACIONES ── -->
  <div class="section" id="sec-rooms">
    <div class="section-header">
      <div class="section-label">HABITACIONES</div>
      <div class="section-title">Gestión de Habitaciones</div>
      <div class="section-desc">Estado, disponibilidad y precios de todas las habitaciones.</div>
    </div>
    <div class="grid-3">
      <div class="room-card">
        <div class="room-status-bar" style="background:#3b82f6"></div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:6px;margin-bottom:0.5rem">
          <span class="badge badge-blue">Ocupada</span>
          <span style="font-size:0.68rem;color:var(--text-dim)">5a planta</span>
        </div>
        <h4 style="font-size:0.92rem;font-weight:700;margin-bottom:0.2rem">Suite Presidencial</h4>
        <p style="font-size:0.72rem;color:var(--text-muted);margin-bottom:0.4rem">Suite · 4 personas</p>
        <div style="font-size:0.68rem;color:var(--text-dim);margin-bottom:0.7rem">🛁 Jacuzzi &nbsp; 🌅 Terraza &nbsp; 🍷 Minibar</div>
        <div style="display:flex;justify-content:space-between;align-items:flex-end">
          <div><span style="font-size:1.3rem;font-weight:800;color:var(--primary)">€320</span><span style="font-size:0.68rem;color:var(--text-dim)">/noche</span></div>
          <div style="width:60px;height:6px;border-radius:100px;background:rgba(59,130,246,0.2)"><div style="width:100%;height:100%;border-radius:100px;background:#3b82f6"></div></div>
        </div>
      </div>

      <div class="room-card">
        <div class="room-status-bar" style="background:#3b82f6"></div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:6px;margin-bottom:0.5rem">
          <span class="badge badge-blue">Ocupada</span>
          <span style="font-size:0.68rem;color:var(--text-dim)">4a planta</span>
        </div>
        <h4 style="font-size:0.92rem;font-weight:700;margin-bottom:0.2rem">Suite Junior</h4>
        <p style="font-size:0.72rem;color:var(--text-muted);margin-bottom:0.4rem">Suite · 2 personas</p>
        <div style="font-size:0.68rem;color:var(--text-dim);margin-bottom:0.7rem">🌊 Vista al mar &nbsp; 🍷 Minibar &nbsp; 📺 Smart TV</div>
        <div style="display:flex;justify-content:space-between;align-items:flex-end">
          <div><span style="font-size:1.3rem;font-weight:800;color:var(--primary)">€195</span><span style="font-size:0.68rem;color:var(--text-dim)">/noche</span></div>
          <div style="width:60px;height:6px;border-radius:100px;background:rgba(59,130,246,0.2)"><div style="width:100%;height:100%;border-radius:100px;background:#3b82f6"></div></div>
        </div>
      </div>

      <div class="room-card">
        <div class="room-status-bar" style="background:#22c55e"></div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:6px;margin-bottom:0.5rem">
          <span class="badge badge-green">Disponible</span>
          <span style="font-size:0.68rem;color:var(--text-dim)">3a planta</span>
        </div>
        <h4 style="font-size:0.92rem;font-weight:700;margin-bottom:0.2rem">Deluxe Doble</h4>
        <p style="font-size:0.72rem;color:var(--text-muted);margin-bottom:0.4rem">Deluxe · 2 personas</p>
        <div style="font-size:0.68rem;color:var(--text-dim);margin-bottom:0.7rem">🏖 Balcón &nbsp; 📺 Smart TV &nbsp; ☕ Nespresso</div>
        <div style="display:flex;justify-content:space-between;align-items:flex-end">
          <div><span style="font-size:1.3rem;font-weight:800;color:var(--primary)">€145</span><span style="font-size:0.68rem;color:var(--text-dim)">/noche</span></div>
          <div style="width:60px;height:6px;border-radius:100px;background:rgba(34,197,94,0.2)"><div style="width:30%;height:100%;border-radius:100px;background:#22c55e"></div></div>
        </div>
      </div>

      <div class="room-card">
        <div class="room-status-bar" style="background:#22c55e"></div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:6px;margin-bottom:0.5rem">
          <span class="badge badge-green">Disponible</span>
          <span style="font-size:0.68rem;color:var(--text-dim)">3a planta</span>
        </div>
        <h4 style="font-size:0.92rem;font-weight:700;margin-bottom:0.2rem">Deluxe Individual</h4>
        <p style="font-size:0.72rem;color:var(--text-muted);margin-bottom:0.4rem">Deluxe · 1 persona</p>
        <div style="font-size:0.68rem;color:var(--text-dim);margin-bottom:0.7rem">📺 Smart TV &nbsp; 💻 Escritorio &nbsp; 🛋 Sofá</div>
        <div style="display:flex;justify-content:space-between;align-items:flex-end">
          <div><span style="font-size:1.3rem;font-weight:800;color:var(--primary)">€110</span><span style="font-size:0.68rem;color:var(--text-dim)">/noche</span></div>
          <div style="width:60px;height:6px;border-radius:100px;background:rgba(34,197,94,0.2)"><div style="width:45%;height:100%;border-radius:100px;background:#22c55e"></div></div>
        </div>
      </div>

      <div class="room-card">
        <div class="room-status-bar" style="background:#f59e0b"></div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:6px;margin-bottom:0.5rem">
          <span class="badge badge-yellow">Mantenimiento</span>
          <span style="font-size:0.68rem;color:var(--text-dim)">2a planta</span>
        </div>
        <h4 style="font-size:0.92rem;font-weight:700;margin-bottom:0.2rem">Standard Doble</h4>
        <p style="font-size:0.72rem;color:var(--text-muted);margin-bottom:0.4rem">Standard · 2 personas</p>
        <div style="font-size:0.68rem;color:var(--text-dim);margin-bottom:0.7rem">📺 TV &nbsp; ❄ A/C &nbsp; 🚿 Baño completo</div>
        <div style="display:flex;justify-content:space-between;align-items:flex-end">
          <div><span style="font-size:1.3rem;font-weight:800;color:var(--primary)">€85</span><span style="font-size:0.68rem;color:var(--text-dim)">/noche</span></div>
          <div style="width:60px;height:6px;border-radius:100px;background:rgba(245,158,11,0.2)"><div style="width:100%;height:100%;border-radius:100px;background:#f59e0b"></div></div>
        </div>
      </div>

      <div class="room-card">
        <div class="room-status-bar" style="background:#22c55e"></div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:6px;margin-bottom:0.5rem">
          <span class="badge badge-green">Disponible</span>
          <span style="font-size:0.68rem;color:var(--text-dim)">2a planta</span>
        </div>
        <h4 style="font-size:0.92rem;font-weight:700;margin-bottom:0.2rem">Standard Individual</h4>
        <p style="font-size:0.72rem;color:var(--text-muted);margin-bottom:0.4rem">Standard · 1 persona</p>
        <div style="font-size:0.68rem;color:var(--text-dim);margin-bottom:0.7rem">📺 TV &nbsp; ❄ A/C &nbsp; 🧳 Armario</div>
        <div style="display:flex;justify-content:space-between;align-items:flex-end">
          <div><span style="font-size:1.3rem;font-weight:800;color:var(--primary)">€65</span><span style="font-size:0.68rem;color:var(--text-dim)">/noche</span></div>
          <div style="width:60px;height:6px;border-radius:100px;background:rgba(34,197,94,0.2)"><div style="width:20%;height:100%;border-radius:100px;background:#22c55e"></div></div>
        </div>
      </div>
    </div>
  </div>

  <!-- ── RESERVAS ── -->
  <div class="section" id="sec-reservations">
    <div class="section-header">
      <div class="section-label">RESERVAS</div>
      <div class="section-title">Gestión de Reservas</div>
      <div class="section-desc">Todas las reservas con fechas, canal de origen y estado actual.</div>
    </div>
    <div class="card">
      <table class="data-table">
        <thead>
          <tr>
            <th>Ref#</th>
            <th>Huésped</th>
            <th>Habitación</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th style="text-align:center">Noches</th>
            <th style="text-align:right">Total</th>
            <th>Canal</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="font-family:monospace;font-size:0.72rem;color:var(--primary)">RES-4201</td>
            <td style="font-weight:600;color:var(--text)">Hans Müller</td>
            <td>Suite Presidencial</td>
            <td>08 Abr</td>
            <td>12 Abr</td>
            <td style="text-align:center">4</td>
            <td style="text-align:right;font-weight:700;color:var(--text)">€1,280</td>
            <td><span class="badge badge-blue">booking.com</span></td>
            <td><span class="badge badge-green">Confirmada</span></td>
          </tr>
          <tr>
            <td style="font-family:monospace;font-size:0.72rem;color:var(--primary)">RES-4202</td>
            <td style="font-weight:600;color:var(--text)">Marie Dubois</td>
            <td>Suite Junior</td>
            <td>09 Abr</td>
            <td>14 Abr</td>
            <td style="text-align:center">5</td>
            <td style="text-align:right;font-weight:700;color:var(--text)">€975</td>
            <td><span class="badge badge-primary">directa</span></td>
            <td><span class="badge badge-green">Confirmada</span></td>
          </tr>
          <tr>
            <td style="font-family:monospace;font-size:0.72rem;color:var(--primary)">RES-4203</td>
            <td style="font-weight:600;color:var(--text)">James Smith</td>
            <td>Deluxe Doble</td>
            <td>10 Abr</td>
            <td>13 Abr</td>
            <td style="text-align:center">3</td>
            <td style="text-align:right;font-weight:700;color:var(--text)">€435</td>
            <td><span class="badge badge-purple">airbnb</span></td>
            <td><span class="badge badge-yellow">Pendiente</span></td>
          </tr>
          <tr>
            <td style="font-family:monospace;font-size:0.72rem;color:var(--primary)">RES-4204</td>
            <td style="font-weight:600;color:var(--text)">Ana López</td>
            <td>Standard Doble</td>
            <td>11 Abr</td>
            <td>15 Abr</td>
            <td style="text-align:center">4</td>
            <td style="text-align:right;font-weight:700;color:var(--text)">€340</td>
            <td><span class="badge badge-primary">directa</span></td>
            <td><span class="badge badge-green">Confirmada</span></td>
          </tr>
          <tr>
            <td style="font-family:monospace;font-size:0.72rem;color:var(--primary)">RES-4205</td>
            <td style="font-weight:600;color:var(--text)">Marco Rossi</td>
            <td>Deluxe Individual</td>
            <td>12 Abr</td>
            <td>16 Abr</td>
            <td style="text-align:center">4</td>
            <td style="text-align:right;font-weight:700;color:var(--text)">€440</td>
            <td><span class="badge badge-blue">booking.com</span></td>
            <td><span class="badge badge-green">Confirmada</span></td>
          </tr>
          <tr>
            <td style="font-family:monospace;font-size:0.72rem;color:var(--primary)">RES-4206</td>
            <td style="font-weight:600;color:var(--text)">Sofia Petersen</td>
            <td>Standard Individual</td>
            <td>14 Abr</td>
            <td>17 Abr</td>
            <td style="text-align:center">3</td>
            <td style="text-align:right;font-weight:700;color:var(--text)">€195</td>
            <td><span class="badge badge-purple">airbnb</span></td>
            <td><span class="badge badge-yellow">Pendiente</span></td>
          </tr>
          <tr>
            <td style="font-family:monospace;font-size:0.72rem;color:var(--primary)">RES-4207</td>
            <td style="font-weight:600;color:var(--text)">Luca Bianchi</td>
            <td>Suite Presidencial</td>
            <td>13 Abr</td>
            <td>18 Abr</td>
            <td style="text-align:center">5</td>
            <td style="text-align:right;font-weight:700;color:var(--text)">€1,600</td>
            <td><span class="badge badge-primary">directa</span></td>
            <td><span class="badge badge-green">Confirmada</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- ── CALENDARIO ── -->
  <div class="section" id="sec-calendar">
    <div class="section-header">
      <div class="section-label">CALENDARIO</div>
      <div class="section-title">Calendario de Ocupación</div>
      <div class="section-desc">Vista mensual de ocupación con indicadores de disponibilidad por día.</div>
    </div>
    <div class="card">
      <div class="card-header">
        <h3>Abril 2026</h3>
        <div style="display:flex;gap:14px;align-items:center">
          <span style="display:flex;align-items:center;gap:4px;font-size:0.62rem;color:var(--text-dim)"><span style="width:8px;height:8px;border-radius:3px;background:#22c55e"></span> 0-50%</span>
          <span style="display:flex;align-items:center;gap:4px;font-size:0.62rem;color:var(--text-dim)"><span style="width:8px;height:8px;border-radius:3px;background:#f59e0b"></span> 50-80%</span>
          <span style="display:flex;align-items:center;gap:4px;font-size:0.62rem;color:var(--text-dim)"><span style="width:8px;height:8px;border-radius:3px;background:#ef4444"></span> 80-100%</span>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:6px;margin-bottom:8px">
        <div style="text-align:center;font-size:0.62rem;font-weight:600;color:var(--text-dim);padding:4px 0">Lun</div>
        <div style="text-align:center;font-size:0.62rem;font-weight:600;color:var(--text-dim);padding:4px 0">Mar</div>
        <div style="text-align:center;font-size:0.62rem;font-weight:600;color:var(--text-dim);padding:4px 0">Mié</div>
        <div style="text-align:center;font-size:0.62rem;font-weight:600;color:var(--text-dim);padding:4px 0">Jue</div>
        <div style="text-align:center;font-size:0.62rem;font-weight:600;color:var(--text-dim);padding:4px 0">Vie</div>
        <div style="text-align:center;font-size:0.62rem;font-weight:600;color:var(--text-dim);padding:4px 0">Sáb</div>
        <div style="text-align:center;font-size:0.62rem;font-weight:600;color:var(--text-dim);padding:4px 0">Dom</div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:6px">
        ${calGrid}
      </div>
    </div>
  </div>

  <!-- ── HUÉSPEDES ── -->
  <div class="section" id="sec-guests">
    <div class="section-header">
      <div class="section-label">HUÉSPEDES</div>
      <div class="section-title">Gestión de Huéspedes</div>
      <div class="section-desc">Historial de huéspedes, visitas, gasto acumulado y valoraciones.</div>
    </div>
    <div class="card">
      <table class="data-table">
        <thead>
          <tr>
            <th>Huésped</th>
            <th>País</th>
            <th style="text-align:center">Visitas</th>
            <th style="text-align:right">Gasto Total</th>
            <th style="text-align:center">Rating</th>
            <th>Última Estancia</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="font-weight:600;color:var(--text)">Hans Müller</td>
            <td>&#127465;&#127466; Alemania</td>
            <td style="text-align:center">5</td>
            <td style="text-align:right;font-weight:700;color:var(--text)">€6,240</td>
            <td style="text-align:center"><span class="badge badge-green">5.0</span></td>
            <td>Abr 2026</td>
          </tr>
          <tr>
            <td style="font-weight:600;color:var(--text)">Marie Dubois</td>
            <td>&#127467;&#127479; Francia</td>
            <td style="text-align:center">3</td>
            <td style="text-align:right;font-weight:700;color:var(--text)">€3,120</td>
            <td style="text-align:center"><span class="badge badge-green">4.8</span></td>
            <td>Abr 2026</td>
          </tr>
          <tr>
            <td style="font-weight:600;color:var(--text)">James Smith</td>
            <td>&#127468;&#127463; Reino Unido</td>
            <td style="text-align:center">2</td>
            <td style="text-align:right;font-weight:700;color:var(--text)">€1,680</td>
            <td style="text-align:center"><span class="badge badge-green">4.7</span></td>
            <td>Mar 2026</td>
          </tr>
          <tr>
            <td style="font-weight:600;color:var(--text)">Ana López</td>
            <td>&#127466;&#127480; España</td>
            <td style="text-align:center">4</td>
            <td style="text-align:right;font-weight:700;color:var(--text)">€1,920</td>
            <td style="text-align:center"><span class="badge badge-green">4.9</span></td>
            <td>Abr 2026</td>
          </tr>
          <tr>
            <td style="font-weight:600;color:var(--text)">Marco Rossi</td>
            <td>&#127470;&#127481; Italia</td>
            <td style="text-align:center">1</td>
            <td style="text-align:right;font-weight:700;color:var(--text)">€780</td>
            <td style="text-align:center"><span class="badge badge-blue">4.5</span></td>
            <td>Abr 2026</td>
          </tr>
          <tr>
            <td style="font-weight:600;color:var(--text)">Sofia Petersen</td>
            <td>&#127480;&#127466; Suecia</td>
            <td style="text-align:center">2</td>
            <td style="text-align:right;font-weight:700;color:var(--text)">€2,100</td>
            <td style="text-align:center"><span class="badge badge-green">4.8</span></td>
            <td>Feb 2026</td>
          </tr>
          <tr>
            <td style="font-weight:600;color:var(--text)">Yuki Tanaka</td>
            <td>&#127471;&#127477; Japón</td>
            <td style="text-align:center">1</td>
            <td style="text-align:right;font-weight:700;color:var(--text)">€960</td>
            <td style="text-align:center"><span class="badge badge-green">5.0</span></td>
            <td>Mar 2026</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- ── ANALYTICS ── -->
  <div class="section" id="sec-analytics">
    <div class="section-header">
      <div class="section-label">ANALYTICS</div>
      <div class="section-title">Métricas de Revenue</div>
      <div class="section-desc">Ocupación estacional, ADR, RevPAR y métricas hoteleras clave.</div>
    </div>
    <div class="grid-2">
      <div class="card">
        <div class="card-header"><h3>Ocupación por Mes (%)</h3></div>
        <div class="bar-row">
          <span class="bar-label">Enero</span>
          <div class="bar-track"><div class="bar-fill" style="width:0;background:#3b82f6" data-width="45%">45%</div></div>
          <span class="bar-value">45%</span>
        </div>
        <div class="bar-row">
          <span class="bar-label">Febrero</span>
          <div class="bar-track"><div class="bar-fill" style="width:0;background:#3b82f6" data-width="52%">52%</div></div>
          <span class="bar-value">52%</span>
        </div>
        <div class="bar-row">
          <span class="bar-label">Marzo</span>
          <div class="bar-track"><div class="bar-fill" style="width:0;background:${p}" data-width="68%">68%</div></div>
          <span class="bar-value">68%</span>
        </div>
        <div class="bar-row">
          <span class="bar-label">Abril</span>
          <div class="bar-track"><div class="bar-fill" style="width:0;background:${a}" data-width="82%">82%</div></div>
          <span class="bar-value">82%</span>
        </div>
        <div class="bar-row">
          <span class="bar-label">Mayo</span>
          <div class="bar-track"><div class="bar-fill" style="width:0;background:${p}" data-width="78%">78%</div></div>
          <span class="bar-value">78%</span>
        </div>
        <div class="bar-row">
          <span class="bar-label">Junio</span>
          <div class="bar-track"><div class="bar-fill" style="width:0;background:${a}" data-width="92%">92%</div></div>
          <span class="bar-value">92%</span>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><h3>Métricas de Revenue</h3></div>
        <div class="progress-row">
          <div class="progress-label"><span>ADR (Avg Daily Rate)</span><span>74%</span></div>
          <div class="progress-track"><div class="progress-fill" style="width:0;background:${p}" data-width="74%"></div></div>
        </div>
        <div class="progress-row">
          <div class="progress-label"><span>RevPAR</span><span>62%</span></div>
          <div class="progress-track"><div class="progress-fill" style="width:0;background:${a}" data-width="62%"></div></div>
        </div>
        <div class="progress-row">
          <div class="progress-label"><span>Direct Booking %</span><span>48%</span></div>
          <div class="progress-track"><div class="progress-fill" style="width:0;background:#22c55e" data-width="48%"></div></div>
        </div>
        <div class="progress-row">
          <div class="progress-label"><span>Repeat Guest Rate</span><span>34%</span></div>
          <div class="progress-track"><div class="progress-fill" style="width:0;background:${p}" data-width="34%"></div></div>
        </div>
      </div>
    </div>
    <div class="card" style="margin-top:1.5rem;text-align:center;padding:2rem">
      <div style="font-size:0.65rem;text-transform:uppercase;letter-spacing:2px;color:var(--text-dim);margin-bottom:0.5rem">Revenue Anual Proyectado</div>
      <div style="font-size:2.8rem;font-weight:800;color:var(--primary);margin-bottom:1rem" data-counter-big="820800" data-prefix="€">€0</div>
      <div style="display:flex;justify-content:center;gap:3rem">
        <div style="text-align:center"><div style="font-size:1.2rem;font-weight:700;color:var(--text)">€142</div><div style="font-size:0.65rem;color:var(--text-dim)">ADR</div></div>
        <div style="text-align:center"><div style="font-size:1.2rem;font-weight:700;color:var(--text)">€116</div><div style="font-size:0.65rem;color:var(--text-dim)">RevPAR</div></div>
        <div style="text-align:center"><div style="font-size:1.2rem;font-weight:700;color:var(--text)">3.4 noches</div><div style="font-size:0.65rem;color:var(--text-dim)">Estancia media</div></div>
      </div>
    </div>
  </div>

  <!-- ── CONFIG ── -->
  <div class="section" id="sec-settings">
    <div class="section-header">
      <div class="section-label">CONFIGURACIÓN</div>
      <div class="section-title">Ajustes del Alojamiento</div>
      <div class="section-desc">Check-in digital, sincronización con OTAs y configuración general.</div>
    </div>
    <div class="card">
      <div class="settings-row">
        <span class="settings-label">Nombre del alojamiento</span>
        <input class="settings-input" type="text" value="${bn}" readonly>
      </div>
      <div class="settings-row">
        <span class="settings-label">URL de reservas</span>
        <input class="settings-input" type="text" value="reservas.${bn.toLowerCase().replace(/\s+/g, '')}.com" readonly>
      </div>
      <div class="settings-row">
        <span class="settings-label">Email de recepción</span>
        <input class="settings-input" type="email" value="recepcion@${bn.toLowerCase().replace(/\s+/g, '')}.com" readonly>
      </div>
      <div class="settings-row">
        <span class="settings-label">Check-in digital</span>
        <div class="toggle on" onclick="this.classList.toggle('on')"><div class="toggle-knob"></div></div>
      </div>
      <div class="settings-row">
        <span class="settings-label">Notificaciones de reserva</span>
        <div class="toggle on" onclick="this.classList.toggle('on')"><div class="toggle-knob"></div></div>
      </div>
      <div class="settings-row">
        <span class="settings-label">Sincronización OTAs</span>
        <div class="toggle on" onclick="this.classList.toggle('on')"><div class="toggle-knob"></div></div>
      </div>
      <div class="settings-row">
        <span class="settings-label">Modo temporada baja</span>
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

<script>
/* ═══════════ BOOKING DASHBOARD SCRIPTS ═══════════ */

// Section switching
function showSection(id) {
  document.querySelectorAll('.section').forEach(function(s) { s.classList.remove('active'); });
  var sec = document.getElementById('sec-' + id);
  if (sec) {
    sec.classList.add('active');
    window.scrollTo(0, 0);
  }
  // Update sidebar active
  document.querySelectorAll('.sidebar-link').forEach(function(l) { l.classList.remove('active'); });
  var links = document.querySelectorAll('.sidebar-link');
  var sectionIds = ['dashboard','rooms','reservations','calendar','guests','analytics','settings'];
  var idx = sectionIds.indexOf(id);
  if (idx >= 0 && links[idx]) links[idx].classList.add('active');
  // Update topbar title
  var titles = { dashboard:'Dashboard', rooms:'Habitaciones', reservations:'Reservas', calendar:'Calendario', guests:'Huéspedes', analytics:'Analytics', settings:'Configuración' };
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
