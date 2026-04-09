/**
 * Premium Design System CSS
 * Generates the full CSS block with customizable colors via CSS variables.
 * Inspired by the Sigfredo AI Demo — glassmorphism, dark theme, Inter font, premium animations.
 */

export type VisualTheme = 'executive' | 'neon' | 'warm' | 'minimal' | 'bold'

interface ThemeConfig {
  font: string
  fontImport: string
  bg: string
  bgElevated: string
  bgCard: string
  bgCardHover: string
  text: string
  textMuted: string
  textDim: string
  borderStyle: string
  borderLight: string
  cardRadius: string
  cardBorder: string
  cardShadow: string
  navStyle: string
  heroAlign: string
  heroTitleSize: string
  badgeRadius: string
  buttonRadius: string
  kpiStyle: string
}

const THEMES: Record<VisualTheme, ThemeConfig> = {
  executive: {
    font: "'DM Sans', sans-serif",
    fontImport: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&display=swap",
    bg: '#0c0f14', bgElevated: '#121620', bgCard: '#161b28', bgCardHover: '#1c2233',
    text: '#e4e7f0', textMuted: '#7a82a0', textDim: '#4e5470',
    borderStyle: 'rgba(255,255,255,0.06)', borderLight: 'rgba(255,255,255,0.1)',
    cardRadius: '20px', cardBorder: '1px solid rgba(255,255,255,0.06)',
    cardShadow: '0 4px 30px rgba(0,0,0,0.2)',
    navStyle: 'border-bottom', heroAlign: 'left', heroTitleSize: 'clamp(2.4rem, 5vw, 3.6rem)',
    badgeRadius: '8px', buttonRadius: '14px', kpiStyle: 'border-left: 3px solid var(--primary)',
  },
  neon: {
    font: "'Space Grotesk', sans-serif",
    fontImport: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap",
    bg: '#050508', bgElevated: '#0a0a12', bgCard: '#0f0f1a', bgCardHover: '#14142a',
    text: '#eef0ff', textMuted: '#6670a0', textDim: '#3e4570',
    borderStyle: 'rgba(255,255,255,0.08)', borderLight: 'rgba(255,255,255,0.14)',
    cardRadius: '12px', cardBorder: '1px solid rgba(255,255,255,0.08)',
    cardShadow: 'none',
    navStyle: 'glow-bottom', heroAlign: 'center', heroTitleSize: 'clamp(2.8rem, 7vw, 5rem)',
    badgeRadius: '100px', buttonRadius: '12px', kpiStyle: '',
  },
  warm: {
    font: "'Poppins', sans-serif",
    fontImport: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap",
    bg: '#0f0d0a', bgElevated: '#171410', bgCard: '#1e1a14', bgCardHover: '#25201a',
    text: '#f0ece4', textMuted: '#8a8070', textDim: '#5a5040',
    borderStyle: 'rgba(255,220,180,0.08)', borderLight: 'rgba(255,220,180,0.14)',
    cardRadius: '24px', cardBorder: 'none',
    cardShadow: '0 8px 40px rgba(0,0,0,0.25)',
    navStyle: 'floating', heroAlign: 'center', heroTitleSize: 'clamp(2.6rem, 6vw, 4rem)',
    badgeRadius: '12px', buttonRadius: '100px', kpiStyle: '',
  },
  minimal: {
    font: "'Inter', sans-serif",
    fontImport: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap",
    bg: '#0a0a0e', bgElevated: '#101014', bgCard: '#16161c', bgCardHover: '#1c1c24',
    text: '#d8dae0', textMuted: '#70727e', textDim: '#484a56',
    borderStyle: 'rgba(255,255,255,0.05)', borderLight: 'rgba(255,255,255,0.08)',
    cardRadius: '8px', cardBorder: '1px solid rgba(255,255,255,0.05)',
    cardShadow: 'none',
    navStyle: 'thin', heroAlign: 'center', heroTitleSize: 'clamp(2rem, 4vw, 3rem)',
    badgeRadius: '4px', buttonRadius: '8px', kpiStyle: '',
  },
  bold: {
    font: "'Sora', sans-serif",
    fontImport: "https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap",
    bg: '#08060e', bgElevated: '#0e0c16', bgCard: '#141220', bgCardHover: '#1a182c',
    text: '#f0ecff', textMuted: '#7e78a0', textDim: '#504a70',
    borderStyle: 'rgba(200,180,255,0.08)', borderLight: 'rgba(200,180,255,0.14)',
    cardRadius: '16px', cardBorder: '2px solid rgba(200,180,255,0.06)',
    cardShadow: '0 2px 20px rgba(100,80,200,0.08)',
    navStyle: 'border-bottom', heroAlign: 'center', heroTitleSize: 'clamp(3rem, 7vw, 5rem)',
    badgeRadius: '100px', buttonRadius: '16px', kpiStyle: '',
  },
}

export function designSystemCSS(primary: string, accent: string, theme: VisualTheme = 'neon'): string {
  const t = THEMES[theme]
  // Derive lighter/darker variants from hex
  const primaryLight = lightenHex(primary, 25)
  const primaryDark = darkenHex(primary, 20)
  const accentLight = lightenHex(accent, 20)

  const navCSS = t.navStyle === 'floating'
    ? `background: rgba(15,13,10,0.7); border-radius: 16px; margin: 10px 2rem 0; border: 1px solid ${t.borderStyle};`
    : t.navStyle === 'thin'
    ? `background: ${t.bg}; border-bottom: 1px solid ${t.borderStyle}; height: 48px;`
    : t.navStyle === 'glow-bottom'
    ? `background: rgba(5,5,8,0.92); border-bottom: 1px solid rgba(${hexToRgb(primary)},0.15); box-shadow: 0 2px 20px rgba(${hexToRgb(primary)},0.05);`
    : `background: rgba(12,15,20,0.9); border-bottom: 1px solid ${t.borderStyle};`

  return `
@import url('${t.fontImport}');

:root {
  --primary: ${primary};
  --primary-light: ${primaryLight};
  --primary-dark: ${primaryDark};
  --accent: ${accent};
  --accent-light: ${accentLight};
  --bg: ${t.bg};
  --bg-elevated: ${t.bgElevated};
  --bg-card: ${t.bgCard};
  --bg-card-hover: ${t.bgCardHover};
  --text: ${t.text};
  --text-muted: ${t.textMuted};
  --text-dim: ${t.textDim};
  --border: ${t.borderStyle};
  --border-light: ${t.borderLight};
  --success: #22c55e;
  --warning: #f59e0b;
  --danger: #ef4444;
  --info: #3b82f6;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: ${t.font};
  background: var(--bg);
  color: var(--text);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* ═══════════ NAV ═══════════ */
.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 200;
  ${navCSS}
  backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 2rem; height: 56px;
}
.nav-brand {
  font-weight: 800; font-size: 1rem;
  background: linear-gradient(135deg, var(--primary-light), var(--accent));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text; letter-spacing: 0.5px;
}
.nav-links { display: flex; gap: 2px; overflow-x: auto; scrollbar-width: none; }
.nav-links::-webkit-scrollbar { display: none; }
.nav-link {
  padding: 6px 14px; border-radius: 8px; font-size: 0.72rem; font-weight: 600;
  color: var(--text-muted); cursor: pointer; transition: all 0.25s;
  border: none; background: none; white-space: nowrap;
}
.nav-link:hover { background: rgba(${hexToRgb(primary)},0.15); color: var(--primary-light); }
.nav-link.active { background: rgba(${hexToRgb(primary)},0.2); color: var(--primary-light); }

/* ═══════════ SECTIONS ═══════════ */
.demo-section {
  display: none; min-height: 100vh; padding: 76px 2rem 3rem;
  max-width: 1300px; margin: 0 auto;
  animation: sectionFadeIn 0.45s cubic-bezier(0.22,1,0.36,1);
}
.demo-section.active { display: block; }

@keyframes sectionFadeIn {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ═══════════ SECTION HEADERS ═══════════ */
.s-label {
  font-size: 0.68rem; text-transform: uppercase; letter-spacing: 3px;
  color: var(--accent); margin-bottom: 0.5rem; font-weight: 600;
}
.s-title {
  font-size: clamp(1.8rem, 4vw, 2.6rem); font-weight: 800;
  margin-bottom: 0.6rem; line-height: 1.12;
}
.s-desc {
  font-size: 0.95rem; color: var(--text-muted);
  max-width: 680px; margin-bottom: 2rem; line-height: 1.6;
}

/* ═══════════ HERO ═══════════ */
.hero-wrap {
  display: flex; flex-direction: column;
  align-items: ${t.heroAlign === 'left' ? 'flex-start' : 'center'};
  justify-content: center;
  text-align: ${t.heroAlign};
  min-height: calc(100vh - 76px); position: relative;
}
.hero-wrap::before {
  content: ''; position: absolute; top: -30%; left: -30%; width: 160%; height: 160%;
  background: radial-gradient(ellipse at 35% 50%, rgba(${hexToRgb(primary)},0.1) 0%, transparent 60%),
              radial-gradient(ellipse at 65% 50%, rgba(${hexToRgb(accent)},0.06) 0%, transparent 60%);
  animation: heroGlow 8s ease-in-out infinite alternate;
}
@keyframes heroGlow { 0% { transform: translate(0,0); } 100% { transform: translate(-3%,2%); } }

.hero-badge {
  position: relative; z-index: 1;
  display: inline-flex; align-items: center; gap: 8px;
  padding: 6px 18px; background: rgba(${hexToRgb(primary)},0.12);
  border: 1px solid rgba(${hexToRgb(primary)},0.3);
  border-radius: 100px; font-size: 0.78rem; color: var(--primary-light);
  margin-bottom: 1.5rem;
}
.dot-pulse {
  width: 7px; height: 7px; background: var(--success);
  border-radius: 50%; animation: dotPulse 2s infinite;
}
@keyframes dotPulse { 0%,100% { opacity:1; } 50% { opacity:0.35; } }

.hero-logo {
  position: relative; z-index: 1;
  font-size: 1rem; letter-spacing: 5px; text-transform: uppercase;
  color: var(--accent); font-weight: 300; margin-bottom: 0.6rem;
}
.hero-h1 {
  position: relative; z-index: 1;
  font-size: ${t.heroTitleSize}; font-weight: 900; line-height: 1.05;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #fff 0%, var(--primary-light) 50%, var(--accent) 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.hero-sub {
  position: relative; z-index: 1;
  font-size: 1.1rem; color: var(--text-muted); max-width: 560px; margin-bottom: 2rem; line-height: 1.6;
}
.hero-btn {
  position: relative; z-index: 1;
  display: inline-flex; align-items: center; justify-content: center;
  padding: 14px 32px; background: linear-gradient(135deg, var(--primary), var(--primary-light));
  color: white; font-size: 0.9rem; font-weight: 700; border-radius: ${t.buttonRadius};
  border: none; cursor: pointer; transition: all 0.3s;
  box-shadow: 0 4px 24px rgba(${hexToRgb(primary)},0.3);
}
.hero-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(${hexToRgb(primary)},0.4); }
.hero-btn-alt {
  position: relative; z-index: 1;
  display: inline-flex; align-items: center; justify-content: center;
  padding: 14px 32px; background: linear-gradient(135deg, var(--accent), ${darkenHex(accent, 15)});
  color: var(--bg); font-size: 0.9rem; font-weight: 700; border-radius: ${t.buttonRadius};
  border: none; cursor: pointer; transition: all 0.3s;
  box-shadow: 0 4px 24px rgba(${hexToRgb(accent)},0.25);
}
.hero-btn-alt:hover { transform: translateY(-2px); }

.hero-stats {
  position: relative; z-index: 1;
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem;
  margin-top: 3rem; max-width: 750px; width: 100%;
}
.hero-stat { text-align: center; }
.hero-stat-val { font-size: 2.2rem; font-weight: 800; color: var(--accent); }
.hero-stat-lbl { font-size: 0.68rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1.5px; margin-top: 2px; }

/* ═══════════ CARDS ═══════════ */
.card {
  background: var(--bg-card); ${t.cardBorder};
  border-radius: ${t.cardRadius}; padding: 1.5rem; transition: all 0.3s;
  ${t.cardShadow !== 'none' ? `box-shadow: ${t.cardShadow};` : ''}
}
.card:hover { border-color: rgba(${hexToRgb(primary)},0.3); background: var(--bg-card-hover); }
.card-header {
  display: flex; align-items: center; justify-content: space-between;
  padding-bottom: 1rem; margin-bottom: 1rem; border-bottom: 1px solid var(--border);
}
.card-header h3 { font-size: 1rem; font-weight: 700; }

/* ═══════════ KPI CARDS ═══════════ */
.kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 1.5rem; }
.kpi {
  background: var(--bg-card); ${t.cardBorder};
  border-radius: ${t.cardRadius}; padding: 1.2rem; transition: all 0.3s;
  ${t.kpiStyle}
  ${t.cardShadow !== 'none' ? `box-shadow: ${t.cardShadow};` : ''}
}
.kpi:hover { border-color: rgba(${hexToRgb(primary)},0.3); }
.kpi-icon { font-size: 1.4rem; margin-bottom: 0.5rem; }
.kpi-lbl { font-size: 0.66rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 0.3rem; }
.kpi-val { font-size: 1.7rem; font-weight: 800; line-height: 1; }
.kpi-trend { font-size: 0.7rem; margin-top: 4px; display: flex; align-items: center; gap: 4px; }
.kpi-trend.up { color: var(--success); }
.kpi-trend.down { color: var(--danger); }
.kpi-trend.neutral { color: var(--text-muted); }

/* ═══════════ BADGES ═══════════ */
.badge { padding: 3px 10px; border-radius: ${t.badgeRadius}; font-size: 0.66rem; font-weight: 600; }
.badge-green { background: rgba(34,197,94,0.12); color: var(--success); }
.badge-yellow { background: rgba(245,158,11,0.12); color: var(--warning); }
.badge-red { background: rgba(239,68,68,0.12); color: var(--danger); }
.badge-blue { background: rgba(59,130,246,0.12); color: var(--info); }
.badge-purple { background: rgba(168,85,247,0.12); color: #a855f7; }
.badge-primary { background: rgba(${hexToRgb(primary)},0.12); color: var(--primary-light); }
.badge-accent { background: rgba(${hexToRgb(accent)},0.12); color: var(--accent); }

/* ═══════════ DATA TABLE ═══════════ */
.data-tbl { width: 100%; border-collapse: separate; border-spacing: 0; font-size: 0.78rem; }
.data-tbl thead th {
  background: rgba(${hexToRgb(primary)},0.06); padding: 11px 14px; text-align: left;
  font-weight: 600; font-size: 0.64rem; text-transform: uppercase; letter-spacing: 1px;
  color: var(--primary-light); border-bottom: 1px solid var(--border);
}
.data-tbl thead th:first-child { border-radius: 10px 0 0 0; }
.data-tbl thead th:last-child { border-radius: 0 10px 0 0; }
.data-tbl tbody td { padding: 11px 14px; border-bottom: 1px solid var(--border); color: var(--text-muted); }
.data-tbl tbody tr:hover td { background: rgba(${hexToRgb(primary)},0.03); color: var(--text); }

/* ═══════════ PROGRESS BARS ═══════════ */
.bar-bg { height: 8px; background: rgba(255,255,255,0.05); border-radius: 4px; overflow: hidden; }
.bar-fill { height: 100%; border-radius: 4px; transition: width 1.8s cubic-bezier(0.22,1,0.36,1); }
.bar-ok { background: linear-gradient(90deg, var(--success), #4ade80); }
.bar-warn { background: linear-gradient(90deg, var(--warning), #fbbf24); }
.bar-crit { background: linear-gradient(90deg, var(--danger), #f87171); }
.bar-primary { background: linear-gradient(90deg, var(--primary), var(--primary-light)); }
.bar-accent { background: linear-gradient(90deg, var(--accent), var(--accent-light)); }

/* ═══════════ GRIDS ═══════════ */
.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
.grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }

/* ═══════════ WHATSAPP SIM ═══════════ */
.wa-box { max-width: 420px; background: #0b141a; border-radius: 14px; overflow: hidden; border: 1px solid rgba(${hexToRgb(primary)},0.2); }
.wa-hdr { background: #1f2c34; padding: 10px 14px; display: flex; align-items: center; gap: 10px; }
.wa-av {
  width: 36px; height: 36px; border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), var(--accent));
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: 0.8rem; color: #fff;
}
.wa-nm { font-weight: 600; font-size: 0.88rem; }
.wa-st { font-size: 0.62rem; color: var(--success); }
.wa-chat { padding: 14px; display: flex; flex-direction: column; gap: 6px; min-height: 200px; }
.wa-m {
  max-width: 85%; padding: 8px 11px; border-radius: 8px;
  font-size: 0.8rem; line-height: 1.45;
  opacity: 0; transform: translateY(8px); transition: all 0.4s ease;
}
.wa-m.show { opacity: 1; transform: none; }
.wa-m.client { background: #1d3d2e; align-self: flex-end; border-radius: 8px 0 8px 8px; }
.wa-m.bot { background: #1f2c34; align-self: flex-start; border-radius: 0 8px 8px 8px; }
.wa-m .ts { font-size: 0.56rem; color: rgba(255,255,255,0.3); text-align: right; margin-top: 3px; }
.wa-typing { display: inline-flex; gap: 3px; padding: 10px 14px; align-self: flex-start; }
.wa-typing span {
  width: 6px; height: 6px; background: rgba(255,255,255,0.3);
  border-radius: 50%; animation: typingBounce 1.4s infinite;
}
.wa-typing span:nth-child(2) { animation-delay: 0.2s; }
.wa-typing span:nth-child(3) { animation-delay: 0.4s; }
@keyframes typingBounce { 0%,60%,100% { transform: translateY(0); } 30% { transform: translateY(-6px); } }

/* ═══════════ STEP PROCESS ═══════════ */
.steps { display: flex; flex-direction: column; }
.step {
  display: grid; grid-template-columns: 40px 3px 1fr; gap: 0 14px;
  align-items: start; opacity: 0.25; transition: opacity 0.5s;
}
.step.active { opacity: 1; }
.step-dot {
  width: 34px; height: 34px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-weight: 800; font-size: 0.72rem; color: #fff;
  background: var(--bg-card); border: 2px solid var(--border);
}
.step.active .step-dot { background: var(--primary); border-color: var(--primary-light); }
.step-line { width: 3px; flex: 1; min-height: 20px; background: var(--border); opacity: 0.4; }
.step-content { padding-bottom: 20px; }
.step-title { font-weight: 700; font-size: 0.88rem; margin-bottom: 3px; }
.step-desc { font-size: 0.78rem; color: var(--text-muted); line-height: 1.5; }
.step-detail {
  margin-top: 8px; padding: 10px 14px;
  background: var(--bg-elevated); border: 1px solid var(--border);
  border-radius: 8px; font-size: 0.76rem; color: var(--text-muted);
  border-left: 3px solid var(--primary-light);
}

/* ═══════════ EMAIL PREVIEW ═══════════ */
.email-box { background: var(--bg-card); border: 1px solid var(--border); border-radius: 14px; overflow: hidden; }
.email-hdr { padding: 14px 18px; border-bottom: 1px solid var(--border); background: rgba(0,0,0,0.2); }
.email-row { display: flex; font-size: 0.78rem; padding: 3px 0; }
.email-lbl { color: var(--text-dim); width: 55px; flex-shrink: 0; }
.email-val { color: var(--text); flex: 1; }
.email-body { padding: 18px; font-size: 0.84rem; line-height: 1.7; color: var(--text-muted); }

/* ═══════════ NOTIFICATION ═══════════ */
.notif {
  position: fixed; top: 70px; right: 20px; z-index: 300;
  background: var(--bg-card); border: 1px solid var(--primary-light);
  border-radius: 14px; padding: 14px 20px; max-width: 340px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.5);
  transform: translateX(400px); transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
  display: flex; align-items: start; gap: 10px;
}
.notif.show { transform: translateX(0); }
.notif-icon { font-size: 1.2rem; flex-shrink: 0; }
.notif-text { font-size: 0.78rem; line-height: 1.45; }
.notif-title { font-weight: 700; margin-bottom: 2px; }
.notif-body { color: var(--text-muted); }

/* ═══════════ BIG RESULT HIGHLIGHT ═══════════ */
.big-result {
  background: linear-gradient(135deg, rgba(${hexToRgb(primary)},0.12), rgba(${hexToRgb(accent)},0.08));
  border: 2px solid var(--primary); border-radius: 20px;
  padding: 2.5rem; text-align: center; margin: 2rem 0;
}
.big-val {
  font-size: clamp(2.5rem, 6vw, 3.8rem); font-weight: 900; line-height: 1;
  background: linear-gradient(135deg, var(--success), var(--accent));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.big-lbl { font-size: 1rem; color: var(--text-muted); margin-top: 0.4rem; }

/* ═══════════ SEPARATOR ═══════════ */
.sep { height: 1px; background: linear-gradient(90deg, transparent, var(--border), transparent); margin: 2rem 0; }

/* ═══════════ FOOTER ═══════════ */
.footer {
  text-align: center; padding: 2rem; color: var(--text-dim);
  font-size: 0.72rem; border-top: 1px solid var(--border);
}

/* ═══════════ FORM ELEMENTS ═══════════ */
.form-group { margin-bottom: 1rem; }
.form-label { display: block; font-size: 0.72rem; color: var(--text-muted); margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600; }
.form-input {
  width: 100%; padding: 10px 14px; background: var(--bg-elevated);
  border: 1px solid var(--border); border-radius: 10px; color: var(--text);
  font-size: 0.85rem; font-family: inherit; transition: border-color 0.25s;
}
.form-input:focus { outline: none; border-color: var(--primary-light); }
.form-toggle {
  display: flex; align-items: center; gap: 10px; cursor: pointer; font-size: 0.85rem;
}
.toggle-track {
  width: 40px; height: 22px; border-radius: 11px;
  background: var(--border); position: relative; transition: background 0.3s;
}
.toggle-track.on { background: var(--primary); }
.toggle-thumb {
  position: absolute; top: 2px; left: 2px; width: 18px; height: 18px;
  border-radius: 50%; background: white; transition: transform 0.3s;
}
.toggle-track.on .toggle-thumb { transform: translateX(18px); }
.btn-save {
  padding: 10px 28px; background: linear-gradient(135deg, var(--primary), var(--primary-light));
  color: white; font-weight: 700; font-size: 0.85rem; border: none;
  border-radius: ${t.buttonRadius}; cursor: pointer; transition: all 0.3s;
}
.btn-save:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(${hexToRgb(primary)},0.3); }

/* ═══════════ RESPONSIVE ═══════════ */
@media (max-width: 1024px) {
  .kpi-grid { grid-template-columns: repeat(2, 1fr); }
  .grid-3, .grid-4 { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  .hero-stats { grid-template-columns: repeat(2, 1fr); }
  .kpi-grid { grid-template-columns: 1fr; }
  .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; }
  .nav-links { max-width: 60vw; }
  .nav { padding: 0 1rem; }
  .demo-section { padding: 76px 1rem 2rem; }
}
`
}

// ─── Color utility helpers ───

function hexToRgb(hex: string): string {
  const h = hex.replace('#', '')
  const r = parseInt(h.substring(0, 2), 16)
  const g = parseInt(h.substring(2, 4), 16)
  const b = parseInt(h.substring(4, 6), 16)
  return `${r},${g},${b}`
}

function lightenHex(hex: string, percent: number): string {
  const h = hex.replace('#', '')
  const r = Math.min(255, parseInt(h.substring(0, 2), 16) + Math.round(255 * percent / 100))
  const g = Math.min(255, parseInt(h.substring(2, 4), 16) + Math.round(255 * percent / 100))
  const b = Math.min(255, parseInt(h.substring(4, 6), 16) + Math.round(255 * percent / 100))
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

function darkenHex(hex: string, percent: number): string {
  const h = hex.replace('#', '')
  const r = Math.max(0, parseInt(h.substring(0, 2), 16) - Math.round(255 * percent / 100))
  const g = Math.max(0, parseInt(h.substring(2, 4), 16) - Math.round(255 * percent / 100))
  const b = Math.max(0, parseInt(h.substring(4, 6), 16) - Math.round(255 * percent / 100))
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

export { hexToRgb, lightenHex, darkenHex }
