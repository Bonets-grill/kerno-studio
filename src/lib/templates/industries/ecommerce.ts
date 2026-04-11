import type { TemplateDefinition, TemplateCustomization } from '../types'

export const ecommerceTemplate: TemplateDefinition = {
  meta: {
    id: 'ecommerce',
    name: 'E-Commerce Pro',
    industries: ['ecommerce', 'tienda', 'shop', 'store', 'venta online', 'catálogo', 'catalog', 'carrito', 'cart', 'productos'],
    projectTypes: ['landing', 'mvp', 'system', 'saas'],
    sections: ['dashboard', 'products', 'orders', 'inventory', 'customers', 'analytics', 'settings'],
    description: 'Plantilla e-commerce profesional con dashboard de ventas, catálogo de productos, gestión de pedidos, control de inventario, base de clientes, analytics de conversión y configuración de tienda.',
  },

  render(c: TemplateCustomization): string {
    const name = c.businessName
    const primary = c.primaryColor || '#7c3aed'
    const accent = c.accentColor || '#f59e0b'

    return `<!DOCTYPE html>
<html lang="${c.locale || 'es'}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${name} — Dashboard</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

:root {
  --primary: ${primary};
  --accent: ${accent};
  --sidebar-bg: #1b1f2d;
  --content-bg: #171b29;
  --card-bg: #1e2235;
  --card-hover: #242840;
  --border: rgba(255,255,255,0.06);
  --text: #e8eaf0;
  --text-muted: #9ca3af;
  --text-dim: #6b7280;
  --success: #22c55e;
  --warning: #f59e0b;
  --danger: #ef4444;
  --info: #3b82f6;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
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
.sidebar-nav {
  flex: 1;
  padding: 16px 0;
}
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
  background: rgba(124,58,237,0.08);
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
.topbar-title {
  font-size: 1rem;
  font-weight: 700;
}
.topbar-right {
  display: flex;
  align-items: center;
  gap: 16px;
}
.topbar-badge {
  background: var(--primary);
  color: #fff;
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
  cursor: pointer;
}
.content {
  flex: 1;
  padding: 28px;
}

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
  top: 0;
  left: 0;
  right: 0;
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
.badge-accent { background: rgba(245,158,11,0.12); color: var(--accent); }

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
.bar-label { font-size: 0.72rem; color: var(--text-muted); min-width: 60px; text-align: right; }
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

/* ── Progress ── */
.progress-track { height: 8px; background: rgba(255,255,255,0.06); border-radius: 4px; overflow: hidden; }
.progress-fill { height: 100%; border-radius: 4px; transition: width 0.8s ease; }
.progress-fill.green { background: var(--success); }
.progress-fill.yellow { background: var(--warning); }
.progress-fill.red { background: var(--danger); }

/* ── Product cards ── */
.product-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.product-card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s, border-color 0.2s;
}
.product-card:hover { transform: translateY(-2px); border-color: rgba(255,255,255,0.12); }
.product-thumb {
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.product-thumb-initials { font-size: 2.2rem; font-weight: 800; color: rgba(255,255,255,0.08); }
.product-info { padding: 16px; }
.product-category { font-size: 0.62rem; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 4px; }
.product-name { font-size: 0.85rem; font-weight: 700; margin-bottom: 8px; }
.product-price { font-size: 1.05rem; font-weight: 800; color: var(--accent); }
.product-stock { font-size: 0.7rem; font-weight: 600; }

/* ── Mini orders table ── */
.mini-table td { padding: 8px 10px; font-size: 0.75rem; }
.mini-table th { padding: 8px 10px; }

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

/* ── Review card ── */
.review-card { margin-bottom: 12px; }
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

.footer {
  padding: 20px 28px;
  text-align: center;
  font-size: 0.72rem;
  color: var(--text-dim);
  border-top: 1px solid var(--border);
}

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
.btn-primary { background: var(--primary); color: #fff; }
.btn-ghost { background: transparent; border: 1px solid var(--border); color: var(--text); }

@media (max-width: 900px) {
  .sidebar { display: none; }
  .topbar { left: 0; }
  .main { margin-left: 0; width: 100%; padding: 16px; padding-bottom: 70px; }
  .bottom-nav { display: flex; }
  .kpi-grid { grid-template-columns: repeat(2, 1fr); }
  .grid-2, .product-grid, .grid-3 { grid-template-columns: 1fr; }
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
    <a class="sidebar-link" onclick="showSection('products')"><span class="icon">\u25A4</span><span>Productos</span></a>
    <a class="sidebar-link" onclick="showSection('orders')"><span class="icon">\u2630</span><span>Pedidos</span></a>
    <a class="sidebar-link" onclick="showSection('inventory')"><span class="icon">\u229E</span><span>Inventario</span></a>
    <a class="sidebar-link" onclick="showSection('customers')"><span class="icon">\u25CE</span><span>Clientes</span></a>
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
      <span class="topbar-badge">Pro</span>
      <div class="topbar-avatar">${name.charAt(0).toUpperCase()}</div>
    </div>
  </header>

  <div class="content">

    <!-- ══ DASHBOARD ══ -->
    <div class="section active" id="sec-dashboard">
      <div class="section-header">
        <h1>Panel de Control</h1>
        <p>Vista en tiempo real de ventas, pedidos y conversión.</p>
      </div>
      <div class="kpi-grid">
        <div class="kpi-card">
          <div class="kpi-label">Ventas Hoy</div>
          <div class="kpi-value" data-count="3240" data-prefix="\u20AC">\u20AC0</div>
          <div class="kpi-trend up">\u25B2 +18% vs ayer</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Pedidos</div>
          <div class="kpi-value" data-count="47">0</div>
          <div class="kpi-trend up">\u25B2 +12 hoy</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Productos Activos</div>
          <div class="kpi-value" data-count="156">0</div>
          <div class="kpi-trend up">\u25B2 +3 nuevos</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Tasa Conversión</div>
          <div class="kpi-value" data-count="3.2" data-suffix="%" data-decimals="1">0%</div>
          <div class="kpi-trend up">\u25B2 +0.4%</div>
        </div>
      </div>

      <div class="grid-2" style="margin-top:20px">
        <div class="card">
          <div class="card-header"><h3>Ingresos Semanal</h3><span class="badge badge-accent">Esta semana</span></div>
          <div class="bar-chart">
            <div class="bar-row"><span class="bar-label">Lun</span><div class="bar-track"><div class="bar-fill" style="width:58%">\u20AC2,840</div></div></div>
            <div class="bar-row"><span class="bar-label">Mar</span><div class="bar-track"><div class="bar-fill" style="width:72%">\u20AC3,520</div></div></div>
            <div class="bar-row"><span class="bar-label">Mié</span><div class="bar-track"><div class="bar-fill" style="width:65%">\u20AC3,180</div></div></div>
            <div class="bar-row"><span class="bar-label">Jue</span><div class="bar-track"><div class="bar-fill" style="width:80%">\u20AC3,900</div></div></div>
            <div class="bar-row"><span class="bar-label">Vie</span><div class="bar-track"><div class="bar-fill" style="width:95%;background:linear-gradient(90deg,var(--accent),#fbbf24)">\u20AC4,650</div></div></div>
            <div class="bar-row"><span class="bar-label">Sáb</span><div class="bar-track"><div class="bar-fill" style="width:100%;background:linear-gradient(90deg,var(--accent),#fbbf24)">\u20AC4,880</div></div></div>
            <div class="bar-row"><span class="bar-label">Dom</span><div class="bar-track"><div class="bar-fill" style="width:48%">\u20AC2,340</div></div></div>
          </div>
        </div>
        <div class="card">
          <div class="card-header"><h3>Pedidos Recientes</h3><span class="badge badge-green">Hoy</span></div>
          <div class="table-wrap">
            <table class="mini-table">
              <thead><tr><th>Pedido</th><th>Cliente</th><th style="text-align:right">Total</th><th>Estado</th></tr></thead>
              <tbody>
                <tr><td style="font-weight:600">#4523</td><td>Elena M.</td><td style="text-align:right;color:var(--accent);font-weight:700">\u20AC189.97</td><td><span class="badge badge-green">Completado</span></td></tr>
                <tr><td style="font-weight:600">#4522</td><td>Pablo R.</td><td style="text-align:right;color:var(--accent);font-weight:700">\u20AC249.00</td><td><span class="badge badge-blue">Enviado</span></td></tr>
                <tr><td style="font-weight:600">#4521</td><td>Lucía G.</td><td style="text-align:right;color:var(--accent);font-weight:700">\u20AC94.94</td><td><span class="badge badge-yellow">Pendiente</span></td></tr>
                <tr><td style="font-weight:600">#4520</td><td>Miguel T.</td><td style="text-align:right;color:var(--accent);font-weight:700">\u20AC312.85</td><td><span class="badge badge-green">Completado</span></td></tr>
                <tr><td style="font-weight:600">#4519</td><td>Carmen L.</td><td style="text-align:right;color:var(--accent);font-weight:700">\u20AC79.98</td><td><span class="badge badge-red">Cancelado</span></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- ══ PRODUCTOS ══ -->
    <div class="section" id="sec-products">
      <div class="section-header">
        <h1>Productos</h1>
        <p>Catálogo completo con precios, stock y categorías.</p>
      </div>
      <div class="product-grid">
        <div class="product-card">
          <div class="product-thumb" style="background:linear-gradient(135deg,#7c3aed22,#a855f722)">
            <div class="product-thumb-initials">CP</div>
            <span class="badge badge-accent" style="position:absolute;top:10px;right:10px">Bestseller</span>
          </div>
          <div class="product-info">
            <div class="product-category">Ropa</div>
            <div class="product-name">Camiseta Premium</div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
              <span class="product-price">\u20AC34.95</span>
              <span class="product-stock" style="color:var(--success)">124 uds</span>
            </div>
          </div>
        </div>
        <div class="product-card">
          <div class="product-thumb" style="background:linear-gradient(135deg,#3b82f622,#06b6d422)">
            <div class="product-thumb-initials">ZS</div>
            <span class="badge badge-green" style="position:absolute;top:10px;right:10px">Nuevo</span>
          </div>
          <div class="product-info">
            <div class="product-category">Calzado</div>
            <div class="product-name">Zapatillas Sport</div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
              <span class="product-price">\u20AC89.99</span>
              <span class="product-stock" style="color:var(--success)">67 uds</span>
            </div>
          </div>
        </div>
        <div class="product-card">
          <div class="product-thumb" style="background:linear-gradient(135deg,#f59e0b22,#ef444422)">
            <div class="product-thumb-initials">MU</div>
          </div>
          <div class="product-info">
            <div class="product-category">Accesorios</div>
            <div class="product-name">Mochila Urban</div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
              <span class="product-price">\u20AC59.90</span>
              <span class="product-stock" style="color:var(--warning)">28 uds</span>
            </div>
          </div>
        </div>
        <div class="product-card">
          <div class="product-thumb" style="background:linear-gradient(135deg,#64748b22,#94a3b822)">
            <div class="product-thumb-initials">RC</div>
            <span class="badge badge-purple" style="position:absolute;top:10px;right:10px">Premium</span>
          </div>
          <div class="product-info">
            <div class="product-category">Accesorios</div>
            <div class="product-name">Reloj Classic</div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
              <span class="product-price">\u20AC149.00</span>
              <span class="product-stock" style="color:var(--success)">42 uds</span>
            </div>
          </div>
        </div>
        <div class="product-card">
          <div class="product-thumb" style="background:linear-gradient(135deg,#22c55e22,#3b82f622)">
            <div class="product-thumb-initials">GS</div>
          </div>
          <div class="product-info">
            <div class="product-category">Accesorios</div>
            <div class="product-name">Gafas Sol Pro</div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
              <span class="product-price">\u20AC45.00</span>
              <span class="product-stock" style="color:var(--danger)">8 uds</span>
            </div>
          </div>
        </div>
        <div class="product-card">
          <div class="product-thumb" style="background:linear-gradient(135deg,#a855f722,#ec489922)">
            <div class="product-thumb-initials">ST</div>
            <span class="badge badge-blue" style="position:absolute;top:10px;right:10px">-20%</span>
          </div>
          <div class="product-info">
            <div class="product-category">Ropa</div>
            <div class="product-name">Sudadera Tech</div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
              <span class="product-price">\u20AC64.95</span>
              <span class="product-stock" style="color:var(--success)">93 uds</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ══ PEDIDOS ══ -->
    <div class="section" id="sec-orders">
      <div class="section-header">
        <h1>Pedidos</h1>
        <p>Control de todos los pedidos con estado y seguimiento.</p>
      </div>
      <div class="card">
        <div class="table-wrap">
          <table>
            <thead>
              <tr><th>Pedido</th><th>Cliente</th><th style="text-align:center">Productos</th><th style="text-align:right">Total</th><th>Estado</th><th>Fecha</th></tr>
            </thead>
            <tbody>
              <tr><td style="font-weight:700">#4523</td><td>Elena Martínez</td><td style="text-align:center">3</td><td style="text-align:right;color:var(--accent);font-weight:700">\u20AC189.97</td><td><span class="badge badge-green">Completado</span></td><td>Hoy 11:20</td></tr>
              <tr><td style="font-weight:700">#4522</td><td>Pablo Rodríguez</td><td style="text-align:center">1</td><td style="text-align:right;color:var(--accent);font-weight:700">\u20AC249.00</td><td><span class="badge badge-yellow">Pendiente</span></td><td>Hoy 10:45</td></tr>
              <tr><td style="font-weight:700">#4521</td><td>Lucía Gómez</td><td style="text-align:center">2</td><td style="text-align:right;color:var(--accent);font-weight:700">\u20AC94.94</td><td><span class="badge badge-blue">Enviado</span></td><td>Hoy 09:30</td></tr>
              <tr><td style="font-weight:700">#4520</td><td>Miguel Á. Torres</td><td style="text-align:center">5</td><td style="text-align:right;color:var(--accent);font-weight:700">\u20AC312.85</td><td><span class="badge badge-green">Completado</span></td><td>Ayer 18:15</td></tr>
              <tr><td style="font-weight:700">#4519</td><td>Carmen López</td><td style="text-align:center">2</td><td style="text-align:right;color:var(--accent);font-weight:700">\u20AC79.98</td><td><span class="badge badge-green">Completado</span></td><td>Ayer 14:20</td></tr>
              <tr><td style="font-weight:700">#4518</td><td>Roberto Díaz</td><td style="text-align:center">1</td><td style="text-align:right;color:var(--accent);font-weight:700">\u20AC119.00</td><td><span class="badge badge-red">Cancelado</span></td><td>Ayer 12:05</td></tr>
              <tr><td style="font-weight:700">#4517</td><td>Sara Navarro</td><td style="text-align:center">4</td><td style="text-align:right;color:var(--accent);font-weight:700">\u20AC198.93</td><td><span class="badge badge-blue">Enviado</span></td><td>07/04 16:30</td></tr>
              <tr><td style="font-weight:700">#4516</td><td>Andrés Moreno</td><td style="text-align:center">2</td><td style="text-align:right;color:var(--accent);font-weight:700">\u20AC154.90</td><td><span class="badge badge-yellow">Pendiente</span></td><td>07/04 10:12</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- ══ INVENTARIO ══ -->
    <div class="section" id="sec-inventory">
      <div class="section-header">
        <h1>Inventario</h1>
        <p>Control de niveles de stock con alertas automáticas.</p>
      </div>
      <div class="card">
        <div class="table-wrap">
          <table>
            <thead>
              <tr><th>SKU</th><th>Producto</th><th style="text-align:center">Stock</th><th style="text-align:center">Mínimo</th><th style="min-width:180px">Estado</th></tr>
            </thead>
            <tbody>
              <tr><td style="font-weight:600;color:var(--text-dim)">RPR-001</td><td>Camiseta Premium</td><td style="text-align:center">124</td><td style="text-align:center">20</td><td><div class="progress-track"><div class="progress-fill green" style="width:82%"></div></div></td></tr>
              <tr><td style="font-weight:600;color:var(--text-dim)">CLZ-012</td><td>Zapatillas Sport</td><td style="text-align:center">67</td><td style="text-align:center">15</td><td><div class="progress-track"><div class="progress-fill green" style="width:67%"></div></div></td></tr>
              <tr><td style="font-weight:600;color:var(--text-dim)">ACC-022</td><td>Mochila Urban</td><td style="text-align:center">28</td><td style="text-align:center">10</td><td><div class="progress-track"><div class="progress-fill yellow" style="width:35%"></div></div></td></tr>
              <tr><td style="font-weight:600;color:var(--text-dim)">ACC-033</td><td>Reloj Classic</td><td style="text-align:center">42</td><td style="text-align:center">10</td><td><div class="progress-track"><div class="progress-fill green" style="width:56%"></div></div></td></tr>
              <tr><td style="font-weight:600;color:var(--text-dim)">ACC-041</td><td>Gafas Sol Pro</td><td style="text-align:center">8</td><td style="text-align:center">15</td><td><div class="progress-track"><div class="progress-fill red" style="width:10%"></div></div></td></tr>
              <tr><td style="font-weight:600;color:var(--text-dim)">RPR-045</td><td>Sudadera Tech</td><td style="text-align:center">93</td><td style="text-align:center">20</td><td><div class="progress-track"><div class="progress-fill green" style="width:62%"></div></div></td></tr>
              <tr><td style="font-weight:600;color:var(--text-dim)">ELC-001</td><td>Auriculares Pro</td><td style="text-align:center">14</td><td style="text-align:center">15</td><td><div class="progress-track"><div class="progress-fill red" style="width:14%"></div></div></td></tr>
              <tr><td style="font-weight:600;color:var(--text-dim)">ELC-019</td><td>Altavoz Mini</td><td style="text-align:center">53</td><td style="text-align:center">15</td><td><div class="progress-track"><div class="progress-fill green" style="width:66%"></div></div></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- ══ CLIENTES ══ -->
    <div class="section" id="sec-customers">
      <div class="section-header">
        <h1>Clientes</h1>
        <p>Base de clientes con segmentación y valor de vida.</p>
      </div>
      <div class="card">
        <div class="table-wrap">
          <table>
            <thead>
              <tr><th>Cliente</th><th>Email</th><th style="text-align:center">Pedidos</th><th style="text-align:right">Total gastado</th><th>Último pedido</th><th>Segmento</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><div style="display:flex;align-items:center;gap:10px"><div class="review-avatar" style="width:32px;height:32px;font-size:0.7rem;background:linear-gradient(135deg,var(--primary),var(--accent))">EM</div><span style="font-weight:600">Elena Martínez</span></div></td>
                <td>elena@email.com</td><td style="text-align:center">24</td><td style="text-align:right;font-weight:700;color:var(--accent)">\u20AC2,340</td><td>Hoy</td><td><span class="badge badge-purple">VIP</span></td>
              </tr>
              <tr>
                <td><div style="display:flex;align-items:center;gap:10px"><div class="review-avatar" style="width:32px;height:32px;font-size:0.7rem;background:linear-gradient(135deg,#3b82f6,#06b6d4)">PR</div><span style="font-weight:600">Pablo Rodríguez</span></div></td>
                <td>pablo@email.com</td><td style="text-align:center">18</td><td style="text-align:right;font-weight:700;color:var(--accent)">\u20AC1,890</td><td>Hoy</td><td><span class="badge badge-purple">VIP</span></td>
              </tr>
              <tr>
                <td><div style="display:flex;align-items:center;gap:10px"><div class="review-avatar" style="width:32px;height:32px;font-size:0.7rem;background:linear-gradient(135deg,#22c55e,#16a34a)">LG</div><span style="font-weight:600">Lucía Gómez</span></div></td>
                <td>lucia@email.com</td><td style="text-align:center">12</td><td style="text-align:right;font-weight:700;color:var(--accent)">\u20AC980</td><td>Hoy</td><td><span class="badge badge-green">Regular</span></td>
              </tr>
              <tr>
                <td><div style="display:flex;align-items:center;gap:10px"><div class="review-avatar" style="width:32px;height:32px;font-size:0.7rem;background:linear-gradient(135deg,#f59e0b,#ef4444)">MT</div><span style="font-weight:600">Miguel Á. Torres</span></div></td>
                <td>miguel@email.com</td><td style="text-align:center">8</td><td style="text-align:right;font-weight:700;color:var(--accent)">\u20AC645</td><td>Ayer</td><td><span class="badge badge-green">Regular</span></td>
              </tr>
              <tr>
                <td><div style="display:flex;align-items:center;gap:10px"><div class="review-avatar" style="width:32px;height:32px;font-size:0.7rem;background:linear-gradient(135deg,#ec4899,#a855f7)">CL</div><span style="font-weight:600">Carmen López</span></div></td>
                <td>carmen@email.com</td><td style="text-align:center">5</td><td style="text-align:right;font-weight:700;color:var(--accent)">\u20AC312</td><td>Ayer</td><td><span class="badge badge-green">Regular</span></td>
              </tr>
              <tr>
                <td><div style="display:flex;align-items:center;gap:10px"><div class="review-avatar" style="width:32px;height:32px;font-size:0.7rem;background:linear-gradient(135deg,#64748b,#94a3b8)">RD</div><span style="font-weight:600">Roberto Díaz</span></div></td>
                <td>roberto@email.com</td><td style="text-align:center">2</td><td style="text-align:right;font-weight:700;color:var(--accent)">\u20AC168</td><td>Hace 2 días</td><td><span class="badge badge-yellow">Nuevo</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- ══ ANALYTICS ══ -->
    <div class="section" id="sec-analytics">
      <div class="section-header">
        <h1>Analytics</h1>
        <p>Análisis de ventas, conversión y comportamiento de clientes.</p>
      </div>
      <div class="grid-3" style="margin-bottom:20px">
        <div class="kpi-card">
          <div class="kpi-label">AOV (Pedido Medio)</div>
          <div class="kpi-value">\u20AC68.50</div>
          <div class="kpi-trend up">\u25B2 +\u20AC4.20 este mes</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Abandono Carrito</div>
          <div class="kpi-value" style="color:var(--warning)">71%</div>
          <div class="kpi-trend down">\u25BC -2.3% vs anterior</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Tasa Devolución</div>
          <div class="kpi-value" style="color:var(--success)">4.2%</div>
          <div class="kpi-trend up">\u25B2 Estable</div>
        </div>
      </div>
      <div class="grid-2">
        <div class="card">
          <div class="card-header"><h3>Ventas por Categoría</h3><span class="badge badge-accent">Mensual</span></div>
          <div class="bar-chart">
            <div class="bar-row"><span class="bar-label">Electrónica</span><div class="bar-track"><div class="bar-fill" style="width:100%;background:linear-gradient(90deg,var(--accent),#fbbf24)">\u20AC42,300</div></div></div>
            <div class="bar-row"><span class="bar-label">Ropa</span><div class="bar-track"><div class="bar-fill" style="width:72%">\u20AC30,450</div></div></div>
            <div class="bar-row"><span class="bar-label">Calzado</span><div class="bar-track"><div class="bar-fill" style="width:55%">\u20AC23,200</div></div></div>
            <div class="bar-row"><span class="bar-label">Accesorios</span><div class="bar-track"><div class="bar-fill" style="width:48%">\u20AC20,100</div></div></div>
            <div class="bar-row"><span class="bar-label">Hogar</span><div class="bar-track"><div class="bar-fill" style="width:28%">\u20AC11,800</div></div></div>
          </div>
        </div>
        <div class="card">
          <div class="card-header"><h3>Top Productos</h3><span class="badge badge-green">Mejor rendimiento</span></div>
          <div class="table-wrap">
            <table class="mini-table">
              <thead><tr><th>Producto</th><th style="text-align:center">Uds</th><th style="text-align:right">Ingresos</th></tr></thead>
              <tbody>
                <tr><td style="font-weight:600">Auriculares Pro X1</td><td style="text-align:center">342</td><td style="text-align:right;color:var(--accent);font-weight:700">\u20AC30,764</td></tr>
                <tr><td style="font-weight:600">Smart Watch Ultra</td><td style="text-align:center">234</td><td style="text-align:right;color:var(--accent);font-weight:700">\u20AC58,266</td></tr>
                <tr><td style="font-weight:600">Camiseta Técnica</td><td style="text-align:center">289</td><td style="text-align:right;color:var(--accent);font-weight:700">\u20AC10,107</td></tr>
                <tr><td style="font-weight:600">Zapatillas Running</td><td style="text-align:center">198</td><td style="text-align:right;color:var(--accent);font-weight:700">\u20AC23,562</td></tr>
                <tr><td style="font-weight:600">Mochila Urban 30L</td><td style="text-align:center">167</td><td style="text-align:right;color:var(--accent);font-weight:700">\u20AC10,003</td></tr>
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
        <p>Ajustes de la tienda, notificaciones y automatizaciones.</p>
      </div>
      <div class="grid-2">
        <div class="card">
          <div class="card-header"><h3>Datos de la Tienda</h3></div>
          <div class="form-group">
            <label class="form-label">Nombre de la tienda</label>
            <input class="form-input" type="text" value="${name}" readonly>
          </div>
          <div class="form-group">
            <label class="form-label">Email de contacto</label>
            <input class="form-input" type="email" value="info@${name.toLowerCase().replace(/\\s/g, '')}.com" readonly>
          </div>
          <div class="form-group">
            <label class="form-label">Moneda</label>
            <input class="form-input" type="text" value="EUR (\u20AC)" readonly>
          </div>
          <div class="form-group">
            <label class="form-label">Envío gratuito desde</label>
            <input class="form-input" type="text" value="\u20AC50" readonly>
          </div>
        </div>
        <div class="card">
          <div class="card-header"><h3>Notificaciones</h3></div>
          <div class="toggle-row">
            <span class="toggle-label">Notificaciones de pedidos</span>
            <div class="toggle on" onclick="this.classList.toggle('on')"></div>
          </div>
          <div class="toggle-row">
            <span class="toggle-label">Alertas de stock bajo</span>
            <div class="toggle on" onclick="this.classList.toggle('on')"></div>
          </div>
          <div class="toggle-row">
            <span class="toggle-label">Emails carrito abandonado</span>
            <div class="toggle on" onclick="this.classList.toggle('on')"></div>
          </div>
          <div class="toggle-row">
            <span class="toggle-label">Resumen diario por email</span>
            <div class="toggle" onclick="this.classList.toggle('on')"></div>
          </div>
          <div class="toggle-row">
            <span class="toggle-label">Modo mantenimiento</span>
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
  <button onclick="showSection('products')"><span class="bnav-icon">◎</span>Productos</button>
  <button onclick="showSection('orders')"><span class="bnav-icon">☰</span>Pedidos</button>
  <button onclick="showSection('inventory')"><span class="bnav-icon">▤</span>Inventario</button>
  <button onclick="showSection('customers')"><span class="bnav-icon">⊞</span>Clientes</button>
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
    products: 'Productos',
    orders: 'Pedidos',
    inventory: 'Inventario',
    customers: 'Clientes',
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
