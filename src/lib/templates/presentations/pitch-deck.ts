import type { PresentationTemplateDefinition, PresentationCustomization, SlideCustomization } from '../presentation-types'
import { designSystemCSS } from '../shared/design-system'
import { allScripts } from '../shared/scripts'
import {
  navBar, heroSection, notificationContainer, section,
  kpiGrid, dataTable, horizontalBarChart, stepProcess, bigResult,
  type KpiData, type BarChartItem, type StepData, type TableColumn,
} from '../shared/components'

export const pitchDeckTemplate: PresentationTemplateDefinition = {
  meta: {
    id: 'pitch-deck',
    name: 'Pitch Deck',
    types: ['pitch-deck'],
    slides: ['hero', 'problem', 'solution', 'market', 'business-model', 'traction', 'team', 'financials', 'ask'],
    description: 'Pitch deck profesional para inversores y stakeholders. 9 slides: hero, problema, solución, mercado (TAM/SAM/SOM), modelo de negocio, tracción, equipo, finanzas y ask.',
  },

  render(c: PresentationCustomization): string {
    const slideMap = new Map<string, SlideCustomization>()
    c.slides.forEach(s => slideMap.set(s.id, s))

    const getSlide = (id: string) => slideMap.get(id)?.content as Record<string, unknown> | undefined

    // ── Nav
    const nav = navBar(c.title, [
      { id: 'hero', label: 'Inicio' },
      { id: 'problem', label: 'Problema' },
      { id: 'solution', label: 'Solución' },
      { id: 'market', label: 'Mercado' },
      { id: 'business-model', label: 'Modelo' },
      { id: 'traction', label: 'Tracción' },
      { id: 'team', label: 'Equipo' },
      { id: 'financials', label: 'Finanzas' },
      { id: 'ask', label: 'Inversión' },
    ])

    // ── Hero
    const heroData = getSlide('hero')
    const heroStats = (heroData?.stats as { value: string; label: string }[] || [
      { value: '$2M', label: 'ARR' },
      { value: '10K+', label: 'Usuarios' },
      { value: '3x', label: 'Crecimiento' },
      { value: '85%', label: 'Retención' },
    ])
    const hero = heroSection(
      c.title,
      (heroData?.tagline as string) || c.subtitle || c.title,
      c.subtitle,
      heroStats.map(s => ({ value: s.value, label: s.label })),
      `Pitch Deck — ${c.author}`
    )

    // ── Problem
    const probData = getSlide('problem')
    const problemPoints = (probData?.points as string[]) || ['Pain point 1', 'Pain point 2', 'Pain point 3']
    const problemContent = `
      <div class="card" style="padding:2rem;margin-bottom:1.5rem">
        <h3 style="font-size:1.3rem;font-weight:800;margin-bottom:1rem;color:var(--danger)">${(probData?.headline as string) || 'El problema es real'}</h3>
        <div style="display:flex;flex-direction:column;gap:1rem">
          ${problemPoints.map((p, i) => `
            <div style="display:flex;align-items:start;gap:12px">
              <div style="width:32px;height:32px;border-radius:50%;background:rgba(239,68,68,0.15);display:flex;align-items:center;justify-content:center;font-weight:800;color:var(--danger);flex-shrink:0">${i + 1}</div>
              <p style="font-size:0.95rem;color:var(--text-muted);line-height:1.6">${p}</p>
            </div>
          `).join('')}
        </div>
      </div>
      ${probData?.impact ? `
        ${bigResult(
          probData.impact as string,
          'Impacto del problema',
        )}` : ''}`
    const probSection = section('problem', 'EL PROBLEMA', (probData?.headline as string) || 'Un problema que necesita solución',
      'El dolor que experimentan millones de personas y empresas hoy.',
      problemContent)

    // ── Solution
    const solData = getSlide('solution')
    const features = (solData?.features as { name: string; desc: string; icon: string }[]) || [
      { name: 'Feature 1', desc: 'Description', icon: '🚀' },
      { name: 'Feature 2', desc: 'Description', icon: '⚡' },
      { name: 'Feature 3', desc: 'Description', icon: '🎯' },
    ]
    const solutionContent = `
      <div class="card" style="padding:2rem;margin-bottom:1.5rem">
        <p style="font-size:1.05rem;color:var(--text);line-height:1.7;margin-bottom:1.5rem">${(solData?.description as string) || 'Nuestra solución transforma el problema en oportunidad.'}</p>
      </div>
      <div class="grid-3">
        ${features.map(f => `
          <div class="card" style="padding:1.3rem;text-align:center">
            <div style="font-size:2rem;margin-bottom:0.6rem">${f.icon}</div>
            <h4 style="font-size:0.95rem;font-weight:700;margin-bottom:0.3rem">${f.name}</h4>
            <p style="font-size:0.8rem;color:var(--text-muted);line-height:1.5">${f.desc}</p>
          </div>
        `).join('')}
      </div>`
    const solSection = section('solution', 'LA SOLUCIÓN', (solData?.headline as string) || 'Nuestra propuesta de valor',
      'Cómo resolvemos el problema de forma única.',
      solutionContent)

    // ── Market
    const mktData = getSlide('market')
    const marketContent = `
      <div class="grid-3" style="margin-bottom:1.5rem">
        <div class="card" style="text-align:center;padding:2rem">
          <div style="font-size:0.68rem;text-transform:uppercase;letter-spacing:2px;color:var(--text-muted);margin-bottom:0.4rem">TAM</div>
          <div style="font-size:2.2rem;font-weight:900;color:var(--accent)">${(mktData?.tam as string) || '$50B'}</div>
          <div style="font-size:0.78rem;color:var(--text-muted);margin-top:0.3rem">Total Addressable Market</div>
        </div>
        <div class="card" style="text-align:center;padding:2rem">
          <div style="font-size:0.68rem;text-transform:uppercase;letter-spacing:2px;color:var(--text-muted);margin-bottom:0.4rem">SAM</div>
          <div style="font-size:2.2rem;font-weight:900;color:var(--primary-light)">${(mktData?.sam as string) || '$8B'}</div>
          <div style="font-size:0.78rem;color:var(--text-muted);margin-top:0.3rem">Serviceable Addressable Market</div>
        </div>
        <div class="card" style="text-align:center;padding:2rem">
          <div style="font-size:0.68rem;text-transform:uppercase;letter-spacing:2px;color:var(--text-muted);margin-bottom:0.4rem">SOM</div>
          <div style="font-size:2.2rem;font-weight:900;color:var(--success)">${(mktData?.som as string) || '$500M'}</div>
          <div style="font-size:0.78rem;color:var(--text-muted);margin-top:0.3rem">Serviceable Obtainable Market</div>
        </div>
      </div>
      ${mktData?.description ? `<div class="card" style="padding:1.5rem"><p style="font-size:0.9rem;color:var(--text-muted);line-height:1.6">${mktData.description}</p></div>` : ''}`
    const mktSection = section('market', 'MERCADO', 'Oportunidad de Mercado',
      'Un mercado grande y en crecimiento.',
      marketContent)

    // ── Business Model
    const bmData = getSlide('business-model')
    const streams = (bmData?.streams as { name: string; description: string; icon: string }[]) || [
      { name: 'Suscripción', description: 'MRR recurrente por plan mensual/anual', icon: '💳' },
      { name: 'Enterprise', description: 'Contratos personalizados para grandes cuentas', icon: '🏢' },
      { name: 'API/Platform', description: 'Revenue por uso de API de terceros', icon: '🔗' },
    ]
    const bmContent = `
      <div class="card" style="padding:2rem;margin-bottom:1.5rem">
        <h3 style="font-size:1.1rem;font-weight:700;margin-bottom:1rem">${(bmData?.headline as string) || 'Cómo generamos revenue'}</h3>
      </div>
      <div class="grid-3">
        ${streams.map(s => `
          <div class="card" style="padding:1.3rem">
            <div style="font-size:1.8rem;margin-bottom:0.5rem">${s.icon}</div>
            <h4 style="font-size:0.95rem;font-weight:700;margin-bottom:0.3rem">${s.name}</h4>
            <p style="font-size:0.8rem;color:var(--text-muted);line-height:1.5">${s.description}</p>
          </div>
        `).join('')}
      </div>`
    const bmSection = section('business-model', 'MODELO DE NEGOCIO', (bmData?.headline as string) || 'Revenue Streams',
      'Un modelo escalable y recurrente.',
      bmContent)

    // ── Traction
    const trData = getSlide('traction')
    const trMetrics: KpiData[] = ((trData?.metrics as { icon: string; label: string; value: string | number }[]) || [
      { icon: '👥', label: 'Usuarios', value: 10000 },
      { icon: '💰', label: 'ARR', value: '$2M' },
      { icon: '📈', label: 'MoM Growth', value: '15%' },
      { icon: '🤝', label: 'NPS', value: 72 },
    ]).map(m => ({ icon: m.icon, label: m.label, value: m.value }))

    const milestones: StepData[] = ((trData?.milestones as { title: string; date: string }[]) || [
      { title: 'MVP Launch', date: 'Q1 2025' },
      { title: 'Product-Market Fit', date: 'Q3 2025' },
      { title: 'Series A', date: 'Q1 2026' },
    ]).map(m => ({ title: m.title, description: m.date, icon: '🎯' }))

    const trContent = `
      ${kpiGrid(trMetrics)}
      <div class="sep"></div>
      <h3 style="font-size:0.9rem;font-weight:700;margin-bottom:1rem">Milestones</h3>
      ${stepProcess(milestones)}`
    const trSection = section('traction', 'TRACCIÓN', 'Métricas y Milestones',
      'Resultados que demuestran product-market fit.',
      trContent)

    // ── Team
    const teamData = getSlide('team')
    const members = (teamData?.members as { name: string; role: string; bio: string }[]) || [
      { name: 'CEO', role: 'CEO & Co-founder', bio: '10+ años de experiencia en la industria' },
      { name: 'CTO', role: 'CTO & Co-founder', bio: 'Ex-engineer en empresas tech líderes' },
      { name: 'COO', role: 'COO', bio: 'MBA, experiencia en operaciones y scaling' },
    ]
    const teamContent = `
      <div class="grid-3">
        ${members.map(m => `
          <div class="card" style="padding:1.5rem;text-align:center">
            <div style="width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,var(--primary),var(--accent));display:flex;align-items:center;justify-content:center;font-size:1.5rem;font-weight:800;color:#fff;margin:0 auto 0.8rem">${m.name[0]}</div>
            <h4 style="font-size:0.95rem;font-weight:700">${m.name}</h4>
            <div style="font-size:0.75rem;color:var(--primary-light);margin-bottom:0.4rem">${m.role}</div>
            <p style="font-size:0.78rem;color:var(--text-muted);line-height:1.5">${m.bio}</p>
          </div>
        `).join('')}
      </div>`
    const teamSection = section('team', 'EQUIPO', 'Nuestro Equipo',
      'Las personas detrás del proyecto.',
      teamContent)

    // ── Financials
    const finData = getSlide('financials')
    const finRows = (finData?.rows as { label: string; y1: string; y2: string; y3: string }[]) || [
      { label: 'Revenue', y1: '$500K', y2: '$2M', y3: '$8M' },
      { label: 'Costes', y1: '$800K', y2: '$1.5M', y3: '$4M' },
      { label: 'EBITDA', y1: '-$300K', y2: '$500K', y3: '$4M' },
      { label: 'Usuarios', y1: '5K', y2: '25K', y3: '100K' },
    ]
    const finCols: TableColumn[] = [
      { label: 'Métrica', key: 'label' },
      { label: 'Año 1', key: 'y1', align: 'right' },
      { label: 'Año 2', key: 'y2', align: 'right' },
      { label: 'Año 3', key: 'y3', align: 'right' },
    ]
    const finContent = `
      <div class="card" style="padding:1.5rem;margin-bottom:1.5rem">
        <h3 style="font-size:1rem;font-weight:700;margin-bottom:1rem">${(finData?.headline as string) || 'Proyecciones financieras a 3 años'}</h3>
        ${dataTable(finCols, finRows)}
      </div>`
    const finSection = section('financials', 'FINANZAS', (finData?.headline as string) || 'Proyecciones Financieras',
      'Proyecciones conservadoras con camino claro a rentabilidad.',
      finContent)

    // ── The Ask
    const askData = getSlide('ask')
    const useFunds: BarChartItem[] = ((askData?.use_of_funds as { label: string; percentage: number }[]) || [
      { label: 'Producto & Tech', percentage: 40 },
      { label: 'Ventas & Marketing', percentage: 30 },
      { label: 'Equipo', percentage: 20 },
      { label: 'Operaciones', percentage: 10 },
    ]).map(f => ({ label: f.label, value: f.percentage }))

    const askContent = `
      ${bigResult(
        (askData?.amount as string) || '$1.5M',
        'Ronda de Inversión',
      )}
      <div class="grid-2" style="margin-top:1.5rem">
        <div class="card">
          <div class="card-header"><h3>Uso de Fondos</h3></div>
          ${horizontalBarChart(useFunds, 100)}
        </div>
        <div class="card" style="display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:2rem">
          <p style="font-size:1.1rem;font-weight:600;line-height:1.6;margin-bottom:1.5rem">${(askData?.cta as string) || 'Únete a nosotros en esta oportunidad.'}</p>
          <button class="hero-btn" onclick="showNotif('📧','Contacto','Gracias por tu interés. Te contactaremos pronto.')">Contactar</button>
        </div>
      </div>`
    const askSection = section('ask', 'INVERSIÓN', 'The Ask',
      'Lo que necesitamos y cómo lo usaremos.',
      askContent)

    // ── Footer
    const footer = `<div class="footer">© 2026 ${c.title} — Generado con <strong style="color:var(--accent)">Kerno Presentations</strong></div>`

    return `<!DOCTYPE html>
<html lang="${c.locale || 'es'}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${c.title} — Pitch Deck</title>
<style>${designSystemCSS(c.primaryColor, c.accentColor)}</style>
</head>
<body>
${nav}
${notificationContainer()}
${hero}
${probSection}
${solSection}
${mktSection}
${bmSection}
${trSection}
${teamSection}
${finSection}
${askSection}
${footer}
<script>${allScripts()}</script>
</body>
</html>`
  },
}
