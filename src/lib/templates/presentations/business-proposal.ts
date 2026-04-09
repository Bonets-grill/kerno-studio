import type { PresentationTemplateDefinition, PresentationCustomization, SlideCustomization } from '../presentation-types'
import { designSystemCSS } from '../shared/design-system'
import { allScripts } from '../shared/scripts'
import {
  navBar, heroSection, notificationContainer, section,
  kpiGrid, dataTable, stepProcess, bigResult,
  type KpiData, type StepData, type TableColumn,
} from '../shared/components'

export const businessProposalTemplate: PresentationTemplateDefinition = {
  meta: {
    id: 'business-proposal',
    name: 'Propuesta Comercial',
    types: ['business-proposal'],
    slides: ['cover', 'executive-summary', 'scope', 'deliverables', 'timeline', 'investment', 'team', 'next-steps'],
    description: 'Propuesta comercial profesional para clientes. 8 slides: portada, resumen ejecutivo, alcance, entregables, timeline, inversión, equipo y próximos pasos.',
  },

  render(c: PresentationCustomization): string {
    const slideMap = new Map<string, SlideCustomization>()
    c.slides.forEach(s => slideMap.set(s.id, s))
    const getSlide = (id: string) => slideMap.get(id)?.content as Record<string, unknown> | undefined

    // ── Nav
    const nav = navBar(c.title, [
      { id: 'hero', label: 'Portada' },
      { id: 'executive-summary', label: 'Resumen' },
      { id: 'scope', label: 'Alcance' },
      { id: 'deliverables', label: 'Entregables' },
      { id: 'timeline', label: 'Timeline' },
      { id: 'investment', label: 'Inversión' },
      { id: 'team', label: 'Equipo' },
      { id: 'next-steps', label: 'Siguiente' },
    ])

    // ── Cover (Hero)
    const coverData = getSlide('cover')
    const hero = heroSection(
      c.title,
      c.title,
      c.subtitle,
      [
        { value: (coverData?.client as string) || 'Cliente', label: 'Para' },
        { value: c.author || 'Tu Empresa', label: 'De' },
        { value: (coverData?.date as string) || 'Abril 2026', label: 'Fecha' },
        { value: (coverData?.reference as string) || 'PROP-001', label: 'Ref.' },
      ],
      'Propuesta Comercial'
    )

    // ── Executive Summary
    const exData = getSlide('executive-summary')
    const highlights = (exData?.highlights as { label: string; value: string }[]) || [
      { label: 'Plazo', value: '8 semanas' },
      { label: 'Inversión', value: '€15,000' },
      { label: 'ROI estimado', value: '3.5x' },
    ]
    const exKpis: KpiData[] = highlights.map(h => ({ icon: '📌', label: h.label, value: h.value }))
    const exContent = `
      <div class="card" style="padding:2rem;margin-bottom:1.5rem">
        <p style="font-size:0.95rem;color:var(--text);line-height:1.8">${(exData?.text as string) || 'Resumen ejecutivo de la propuesta con los puntos clave del proyecto.'}</p>
      </div>
      ${kpiGrid(exKpis)}`
    const exSection = section('executive-summary', 'RESUMEN', 'Resumen Ejecutivo',
      'Los puntos clave de esta propuesta en un vistazo.',
      exContent)

    // ── Scope
    const scopeData = getSlide('scope')
    const inclusions = (scopeData?.inclusions as string[]) || ['Incluido 1', 'Incluido 2', 'Incluido 3']
    const exclusions = (scopeData?.exclusions as string[]) || ['No incluido 1', 'No incluido 2']
    const scopeContent = `
      <div class="card" style="padding:2rem;margin-bottom:1.5rem">
        <p style="font-size:0.95rem;color:var(--text);line-height:1.8">${(scopeData?.description as string) || 'Descripción del alcance del proyecto.'}</p>
      </div>
      <div class="grid-2">
        <div class="card" style="padding:1.5rem">
          <h3 style="font-size:0.9rem;font-weight:700;margin-bottom:1rem;color:var(--success)">✅ Incluido</h3>
          ${inclusions.map(i => `
            <div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid var(--border)">
              <span style="color:var(--success)">✓</span>
              <span style="font-size:0.85rem;color:var(--text-muted)">${i}</span>
            </div>
          `).join('')}
        </div>
        <div class="card" style="padding:1.5rem">
          <h3 style="font-size:0.9rem;font-weight:700;margin-bottom:1rem;color:var(--text-dim)">⊘ No incluido</h3>
          ${exclusions.map(e => `
            <div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid var(--border)">
              <span style="color:var(--text-dim)">—</span>
              <span style="font-size:0.85rem;color:var(--text-dim)">${e}</span>
            </div>
          `).join('')}
        </div>
      </div>`
    const scopeSection = section('scope', 'ALCANCE', 'Alcance del Proyecto',
      'Qué incluye y qué no incluye esta propuesta.',
      scopeContent)

    // ── Deliverables
    const delData = getSlide('deliverables')
    const items = (delData?.items as { name: string; description: string; icon: string }[]) || [
      { name: 'Entregable 1', description: 'Descripción del entregable', icon: '📦' },
      { name: 'Entregable 2', description: 'Descripción del entregable', icon: '🎯' },
      { name: 'Entregable 3', description: 'Descripción del entregable', icon: '⚡' },
    ]
    const delContent = `
      <div class="grid-3">
        ${items.map(item => `
          <div class="card" style="padding:1.3rem">
            <div style="font-size:1.8rem;margin-bottom:0.5rem">${item.icon}</div>
            <h4 style="font-size:0.95rem;font-weight:700;margin-bottom:0.3rem">${item.name}</h4>
            <p style="font-size:0.8rem;color:var(--text-muted);line-height:1.5">${item.description}</p>
          </div>
        `).join('')}
      </div>`
    const delSection = section('deliverables', 'ENTREGABLES', 'Entregables',
      'Lo que recibirás al finalizar el proyecto.',
      delContent)

    // ── Timeline
    const tlData = getSlide('timeline')
    const phases: StepData[] = ((tlData?.phases as { title: string; duration: string; description: string }[]) || [
      { title: 'Descubrimiento', duration: '1 semana', description: 'Análisis de requisitos y planificación' },
      { title: 'Diseño', duration: '2 semanas', description: 'Diseño de la solución y prototipado' },
      { title: 'Desarrollo', duration: '3 semanas', description: 'Implementación y construcción' },
      { title: 'Testing & QA', duration: '1 semana', description: 'Pruebas y control de calidad' },
      { title: 'Entrega', duration: '1 semana', description: 'Despliegue y formación' },
    ]).map(p => ({ title: `${p.title} (${p.duration})`, description: p.description, icon: '📅' }))

    const tlContent = `
      <div class="grid-2" style="align-items:start">
        <div class="card" style="padding:1.5rem">
          ${stepProcess(phases)}
        </div>
        <div class="card" style="padding:1.5rem">
          <h3 style="font-size:1rem;font-weight:700;margin-bottom:1rem">Hitos Clave</h3>
          ${kpiGrid([
            { icon: '🚀', label: 'Inicio', value: (tlData?.phases as { title: string }[])?.[0]?.title || 'Semana 1' },
            { icon: '📋', label: 'Revisión Media', value: 'Semana 4' },
            { icon: '✅', label: 'Entrega Final', value: 'Semana 8' },
            { icon: '🤝', label: 'Soporte Post', value: '30 días' },
          ])}
        </div>
      </div>`
    const tlSection = section('timeline', 'TIMELINE', 'Cronograma',
      'Fases del proyecto y plazos estimados.',
      tlContent)

    // ── Investment
    const invData = getSlide('investment')
    const breakdown = (invData?.breakdown as { item: string; amount: string }[]) || [
      { item: 'Diseño & UX', amount: '€4,000' },
      { item: 'Desarrollo', amount: '€8,000' },
      { item: 'Testing & QA', amount: '€2,000' },
      { item: 'Gestión & Soporte', amount: '€1,000' },
    ]
    const invCols: TableColumn[] = [
      { label: 'Concepto', key: 'item' },
      { label: 'Importe', key: 'amount', align: 'right' },
    ]
    const invContent = `
      ${bigResult(
        (invData?.total as string) || '€15,000',
        'Inversión Total',
      )}
      <div class="grid-2" style="margin-top:1.5rem">
        <div class="card" style="padding:1.5rem">
          <div class="card-header"><h3>Desglose</h3></div>
          ${dataTable(invCols, breakdown)}
        </div>
        <div class="card" style="padding:1.5rem">
          <h3 style="font-size:1rem;font-weight:700;margin-bottom:1rem">Condiciones de Pago</h3>
          <p style="font-size:0.9rem;color:var(--text-muted);line-height:1.7">${(invData?.payment_terms as string) || 'Pago en dos fases: 50% al inicio del proyecto y 50% a la entrega final. Facturación con IVA incluido.'}</p>
          <div style="margin-top:1rem;padding:12px;background:rgba(34,197,94,0.08);border:1px solid rgba(34,197,94,0.2);border-radius:10px">
            <p style="font-size:0.82rem;color:var(--success)">💰 Garantía de satisfacción: si no cumplimos los entregables, no pagas la segunda fase.</p>
          </div>
        </div>
      </div>`
    const invSection = section('investment', 'INVERSIÓN', 'Inversión',
      'Presupuesto detallado y condiciones de pago.',
      invContent)

    // ── Team
    const teamData = getSlide('team')
    const members = (teamData?.members as { name: string; role: string; expertise: string }[]) || [
      { name: 'Project Manager', role: 'Líder de Proyecto', expertise: 'Gestión ágil, stakeholder management' },
      { name: 'Lead Developer', role: 'Desarrollo', expertise: 'Full-stack, arquitectura cloud' },
      { name: 'Designer', role: 'UX/UI Design', expertise: 'User research, design systems' },
    ]
    const teamContent = `
      <div class="grid-3">
        ${members.map(m => `
          <div class="card" style="padding:1.5rem;text-align:center">
            <div style="width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,var(--primary),var(--accent));display:flex;align-items:center;justify-content:center;font-size:1.3rem;font-weight:800;color:#fff;margin:0 auto 0.8rem">${m.name[0]}</div>
            <h4 style="font-size:0.9rem;font-weight:700">${m.name}</h4>
            <div style="font-size:0.72rem;color:var(--primary-light);margin-bottom:0.4rem">${m.role}</div>
            <p style="font-size:0.76rem;color:var(--text-muted);line-height:1.5">${m.expertise}</p>
          </div>
        `).join('')}
      </div>`
    const teamSection = section('team', 'EQUIPO', 'Nuestro Equipo',
      'Los profesionales que llevarán a cabo el proyecto.',
      teamContent)

    // ── Next Steps
    const nsData = getSlide('next-steps')
    const steps: StepData[] = ((nsData?.steps as { action: string; timeline: string }[]) || [
      { action: 'Revisar y aprobar esta propuesta', timeline: 'Esta semana' },
      { action: 'Reunión de kick-off', timeline: 'Siguiente semana' },
      { action: 'Firma de contrato y primer pago', timeline: 'Día 1' },
      { action: 'Inicio del proyecto', timeline: 'Día 3' },
    ]).map(s => ({ title: s.action, description: s.timeline, icon: '→' }))

    const nsContent = `
      <div class="grid-2" style="align-items:start">
        <div class="card" style="padding:1.5rem">
          <h3 style="font-size:1rem;font-weight:700;margin-bottom:1rem">Pasos a seguir</h3>
          ${stepProcess(steps)}
        </div>
        <div class="card" style="display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:2.5rem">
          <div style="font-size:3rem;margin-bottom:1rem">🤝</div>
          <p style="font-size:1.1rem;font-weight:600;line-height:1.6;margin-bottom:1.5rem">${(nsData?.cta as string) || '¿Listo para empezar? Estamos a tu disposición.'}</p>
          <button class="hero-btn" onclick="showNotif('📧','Contacto','Gracias por tu interés. Te contactaremos en 24h.')">Aceptar Propuesta</button>
        </div>
      </div>`
    const nsSection = section('next-steps', 'SIGUIENTE PASO', 'Próximos Pasos',
      'Cómo avanzamos desde aquí.',
      nsContent)

    const footer = `<div class="footer">© 2026 ${c.title} — Generado con <strong style="color:var(--accent)">Kerno Presentations</strong></div>`

    return `<!DOCTYPE html>
<html lang="${c.locale || 'es'}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${c.title} — Propuesta Comercial</title>
<style>${designSystemCSS(c.primaryColor, c.accentColor, 'bold')}</style>
</head>
<body>
${nav}
${notificationContainer()}
${hero}
${exSection}
${scopeSection}
${delSection}
${tlSection}
${invSection}
${teamSection}
${nsSection}
${footer}
<script>${allScripts()}</script>
</body>
</html>`
  },
}
