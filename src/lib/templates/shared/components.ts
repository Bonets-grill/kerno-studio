/**
 * Reusable HTML component builders for premium templates.
 * Each returns an HTML string fragment.
 */

// ─── KPI Card ───

export interface KpiData {
  icon: string
  label: string
  value: string | number
  trend?: { value: string; direction: 'up' | 'down' | 'neutral' }
  prefix?: string
  suffix?: string
  decimals?: number
}

export function kpiCard(kpi: KpiData): string {
  const trendHtml = kpi.trend
    ? `<div class="kpi-trend ${kpi.trend.direction}">
        ${kpi.trend.direction === 'up' ? '↑' : kpi.trend.direction === 'down' ? '↓' : '→'} ${kpi.trend.value}
      </div>`
    : ''
  const isNumber = typeof kpi.value === 'number'
  return `
<div class="kpi">
  <div class="kpi-icon">${kpi.icon}</div>
  <div class="kpi-lbl">${kpi.label}</div>
  <div class="kpi-val${isNumber ? ' counter' : ''}"${isNumber ? ` data-target="${kpi.value}" data-prefix="${kpi.prefix || ''}" data-suffix="${kpi.suffix || ''}" data-decimals="${kpi.decimals || 0}"` : ''}>${isNumber ? '0' : kpi.value}</div>
  ${trendHtml}
</div>`
}

export function kpiGrid(kpis: KpiData[]): string {
  return `<div class="kpi-grid">${kpis.map(kpiCard).join('')}</div>`
}

// ─── Data Table ───

export interface TableColumn {
  label: string
  key: string
  align?: 'left' | 'center' | 'right'
}

export function dataTable(columns: TableColumn[], rows: Record<string, string>[]): string {
  const ths = columns.map(c => `<th style="text-align:${c.align || 'left'}">${c.label}</th>`).join('')
  const trs = rows.map(row =>
    `<tr>${columns.map(c => `<td style="text-align:${c.align || 'left'}">${row[c.key] || ''}</td>`).join('')}</tr>`
  ).join('')
  return `
<div style="overflow-x:auto">
  <table class="data-tbl">
    <thead><tr>${ths}</tr></thead>
    <tbody>${trs}</tbody>
  </table>
</div>`
}

// ─── Progress Bar ───

export function progressBar(label: string, percent: number, variant: string = 'primary'): string {
  return `
<div style="margin-bottom:0.8rem">
  <div style="display:flex;justify-content:space-between;margin-bottom:4px">
    <span style="font-size:0.76rem;color:var(--text-muted)">${label}</span>
    <span style="font-size:0.76rem;font-weight:600">${percent}%</span>
  </div>
  <div class="bar-bg"><div class="bar-fill bar-${variant}" data-width="${percent}%" style="width:0%"></div></div>
</div>`
}

// ─── Horizontal Bar Chart ───

export interface BarChartItem {
  label: string
  value: number
  color?: string
}

export function horizontalBarChart(items: BarChartItem[], maxValue?: number): string {
  const max = maxValue || Math.max(...items.map(i => i.value))
  return `
<div style="display:flex;flex-direction:column;gap:0.6rem">
  ${items.map(item => {
    const pct = Math.round((item.value / max) * 100)
    const color = item.color || 'var(--primary-light)'
    return `
    <div>
      <div style="display:flex;justify-content:space-between;margin-bottom:3px">
        <span style="font-size:0.76rem;color:var(--text-muted)">${item.label}</span>
        <span style="font-size:0.76rem;font-weight:600">${item.value.toLocaleString()}</span>
      </div>
      <div class="bar-bg"><div class="bar-fill" data-width="${pct}%" style="width:0%;background:${color}"></div></div>
    </div>`
  }).join('')}
</div>`
}

// ─── WhatsApp Chat Simulation ───

export interface WAChatMessage {
  from: 'client' | 'bot'
  text: string
  time: string
}

export function whatsappChat(
  boxId: string,
  businessName: string,
  businessInitial: string,
  messages: WAChatMessage[]
): string {
  const msgHtml = messages.map(m =>
    `<div class="wa-m ${m.from}"><div>${m.text}</div><div class="ts">${m.time}</div></div>`
  ).join('')
  return `
<div class="wa-box" id="${boxId}">
  <div class="wa-hdr">
    <div class="wa-av">${businessInitial}</div>
    <div>
      <div class="wa-nm">${businessName}</div>
      <div class="wa-st">en línea</div>
    </div>
  </div>
  <div class="wa-chat">${msgHtml}</div>
</div>
<button class="hero-btn" style="margin-top:1rem;font-size:0.82rem;padding:10px 22px" onclick="startWADemo('${boxId}')">
  ▶ Simular conversación
</button>`
}

// ─── Step Process ───

export interface StepData {
  title: string
  description: string
  detail?: string
  icon?: string
}

export function stepProcess(steps: StepData[], colorVar: string = 'var(--primary)'): string {
  return `
<div class="steps">
  ${steps.map((s, i) => `
  <div class="step">
    <div class="step-dot" style="${i === 0 ? `background:${colorVar};border-color:${colorVar}` : ''}">${s.icon || (i + 1)}</div>
    <div class="step-line-col"><div class="step-line" style="background:${colorVar}"></div></div>
    <div class="step-content">
      <div class="step-title">${s.title}</div>
      <div class="step-desc">${s.description}</div>
      ${s.detail ? `<div class="step-detail">${s.detail}</div>` : ''}
    </div>
  </div>`).join('')}
</div>`
}

// ─── Email Preview ───

export interface EmailData {
  type: string
  label: string
  icon: string
  subject: string
  body: string
  badgeClass?: string
}

export function emailPreview(emails: EmailData[], businessName: string): string {
  const first = emails[0]
  const options = emails.map(e =>
    `<button class="email-opt card ${e.type === first.type ? 'active' : ''}" data-type="${e.type}" onclick="showEmail('${e.type}')" style="cursor:pointer;text-align:left;padding:0.8rem">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
        <span>${e.icon}</span>
        <span class="badge ${e.badgeClass || 'badge-primary'}" style="font-size:0.62rem">${e.label}</span>
      </div>
    </button>`
  ).join('')

  const emailDataObj: Record<string, { subject: string; body: string }> = {}
  emails.forEach(e => { emailDataObj[e.type] = { subject: e.subject, body: e.body } })

  return `
<div class="grid-2" style="align-items:start">
  <div style="display:flex;flex-direction:column;gap:0.5rem">${options}</div>
  <div class="email-box">
    <div class="email-hdr">
      <div class="email-row"><span class="email-lbl">De:</span><span class="email-val">${businessName} &lt;info@${businessName.toLowerCase().replace(/\s/g, '')}.com&gt;</span></div>
      <div class="email-row"><span class="email-lbl">Asunto:</span><span class="email-val" id="email-subject">${first.subject}</span></div>
    </div>
    <div class="email-body" id="email-body">${first.body}</div>
  </div>
</div>
<script>window._emailData = ${JSON.stringify(emailDataObj)};</script>`
}

// ─── Section Wrapper ───

export function section(
  id: string,
  label: string,
  title: string,
  description: string,
  content: string,
  isActive: boolean = false
): string {
  return `
<div class="demo-section${isActive ? ' active' : ''}" id="sec-${id}" data-section-name="${label}">
  <div class="s-label">${label}</div>
  <div class="s-title">${title}</div>
  <div class="s-desc">${description}</div>
  ${content}
</div>`
}

// ─── Hero Section ───

export interface HeroStat {
  value: string | number
  label: string
  prefix?: string
  suffix?: string
}

export function heroSection(
  businessName: string,
  tagline: string,
  subtitle: string,
  stats: HeroStat[],
  badgeText: string = 'Demo Interactivo'
): string {
  const statsHtml = stats.map(s => {
    const isNum = typeof s.value === 'number'
    return `
    <div class="hero-stat">
      <div class="hero-stat-val${isNum ? ' counter' : ''}"${isNum ? ` data-target="${s.value}" data-prefix="${s.prefix || ''}" data-suffix="${s.suffix || ''}"` : ''}>${isNum ? '0' : s.value}</div>
      <div class="hero-stat-lbl">${s.label}</div>
    </div>`
  }).join('')

  return `
<div class="demo-section active" id="sec-hero">
  <div class="hero-wrap">
    <div class="hero-badge"><span class="dot-pulse"></span>${badgeText}</div>
    <div class="hero-logo">${businessName}</div>
    <h1 class="hero-h1">${tagline}</h1>
    <p class="hero-sub">${subtitle}</p>
    <div style="display:flex;gap:14px;flex-wrap:wrap;justify-content:center">
      <button class="hero-btn" onclick="showSection('dashboard')">Explorar Demo</button>
    </div>
    <div class="hero-stats">${statsHtml}</div>
  </div>
</div>`
}

// ─── Nav Bar ───

export interface NavItem {
  id: string
  label: string
}

export function navBar(brandName: string, items: NavItem[]): string {
  const links = items.map((item, i) =>
    `<button class="nav-link${i === 0 ? ' active' : ''}" data-section="${item.id}" onclick="showSection('${item.id}')">${item.label}</button>`
  ).join('')
  return `
<nav class="nav">
  <div class="nav-brand">${brandName}</div>
  <div class="nav-links">${links}</div>
</nav>`
}

// ─── Notification Container ───

export function notificationContainer(): string {
  return `
<div class="notif" id="notif">
  <div class="notif-icon">📦</div>
  <div class="notif-text">
    <div class="notif-title">Notificación</div>
    <div class="notif-body">Descripción</div>
  </div>
</div>`
}

// ─── Settings Form ───

export interface SettingsField {
  label: string
  value: string
  type: 'text' | 'email' | 'toggle' | 'color' | 'select'
  options?: string[]
  enabled?: boolean
}

export function settingsForm(fields: SettingsField[]): string {
  const fieldsHtml = fields.map(f => {
    if (f.type === 'toggle') {
      return `
      <div class="form-toggle" onclick="this.querySelector('.toggle-track').classList.toggle('on')">
        <div class="toggle-track${f.enabled ? ' on' : ''}"><div class="toggle-thumb"></div></div>
        <span>${f.label}</span>
      </div>`
    }
    if (f.type === 'select' && f.options) {
      return `
      <div class="form-group">
        <label class="form-label">${f.label}</label>
        <select class="form-input">${f.options.map(o => `<option${o === f.value ? ' selected' : ''}>${o}</option>`).join('')}</select>
      </div>`
    }
    return `
    <div class="form-group">
      <label class="form-label">${f.label}</label>
      <input class="form-input" type="${f.type}" value="${f.value}" />
    </div>`
  }).join('')

  return `
<div class="card" style="max-width:600px">
  ${fieldsHtml}
  <div style="margin-top:1.5rem"><button class="btn-save" onclick="showNotif('✅','Guardado','Configuración actualizada')">Guardar cambios</button></div>
</div>`
}

// ─── Alert/Info Row ───

export function alertRow(icon: string, text: string, badgeText: string, badgeClass: string = 'badge-yellow'): string {
  return `
<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border)">
  <span style="font-size:1.1rem">${icon}</span>
  <span style="flex:1;font-size:0.8rem;color:var(--text-muted)">${text}</span>
  <span class="badge ${badgeClass}">${badgeText}</span>
</div>`
}

// ─── Big Result Highlight ───

export function bigResult(value: string, label: string, items?: { title: string; subtitle: string }[]): string {
  const grid = items
    ? `<div class="grid-3" style="margin-top:1.5rem">${items.map(i =>
        `<div style="text-align:center"><h4 style="font-size:1.5rem;font-weight:800;color:var(--accent)">${i.title}</h4><p style="font-size:0.76rem;color:var(--text-muted)">${i.subtitle}</p></div>`
      ).join('')}</div>`
    : ''
  return `
<div class="big-result">
  <div class="big-val">${value}</div>
  <div class="big-lbl">${label}</div>
  ${grid}
</div>`
}
