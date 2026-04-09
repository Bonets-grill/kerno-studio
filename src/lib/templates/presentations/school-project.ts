import type { PresentationTemplateDefinition, PresentationCustomization, SlideCustomization } from '../presentation-types'
import { designSystemCSS } from '../shared/design-system'
import { allScripts } from '../shared/scripts'
import {
  navBar, heroSection, notificationContainer, section,
  kpiGrid, dataTable, horizontalBarChart, bigResult,
  type BarChartItem, type TableColumn,
} from '../shared/components'

export const schoolProjectTemplate: PresentationTemplateDefinition = {
  meta: {
    id: 'school-project',
    name: 'Trabajo Escolar / Académico',
    types: ['school-project'],
    slides: ['cover', 'introduction', 'context', 'research', 'data', 'analysis', 'conclusions', 'references'],
    description: 'Presentación académica profesional. 8 slides: portada, introducción, contexto, investigación, datos/gráficos, análisis, conclusiones y referencias.',
  },

  render(c: PresentationCustomization): string {
    const slideMap = new Map<string, SlideCustomization>()
    c.slides.forEach(s => slideMap.set(s.id, s))
    const getSlide = (id: string) => slideMap.get(id)?.content as Record<string, unknown> | undefined

    // ── Nav
    const nav = navBar(c.title, [
      { id: 'hero', label: 'Portada' },
      { id: 'introduction', label: 'Introducción' },
      { id: 'context', label: 'Contexto' },
      { id: 'research', label: 'Investigación' },
      { id: 'data', label: 'Datos' },
      { id: 'analysis', label: 'Análisis' },
      { id: 'conclusions', label: 'Conclusiones' },
      { id: 'references', label: 'Referencias' },
    ])

    // ── Cover (Hero)
    const coverData = getSlide('cover')
    const hero = heroSection(
      c.title,
      c.title,
      c.subtitle,
      [
        { value: (coverData?.subject as string) || 'Investigación', label: 'Asignatura' },
        { value: (coverData?.professor as string) || 'Prof.', label: 'Profesor/a' },
        { value: (coverData?.date as string) || 'Abril 2026', label: 'Fecha' },
        { value: c.author || 'Estudiante', label: 'Autor/a' },
      ],
      'Presentación Académica'
    )

    // ── Introduction
    const introData = getSlide('introduction')
    const objectives = (introData?.objectives as string[]) || ['Objetivo 1', 'Objetivo 2', 'Objetivo 3']
    const introContent = `
      <div class="card" style="padding:2rem;margin-bottom:1.5rem">
        <p style="font-size:0.95rem;color:var(--text);line-height:1.8">${(introData?.text as string) || 'Introducción al tema de investigación.'}</p>
      </div>
      <div class="card" style="padding:1.5rem">
        <h3 style="font-size:1rem;font-weight:700;margin-bottom:1rem">Objetivos</h3>
        <div style="display:flex;flex-direction:column;gap:0.8rem">
          ${objectives.map((o, i) => `
            <div style="display:flex;align-items:start;gap:10px">
              <div style="width:28px;height:28px;border-radius:50%;background:rgba(var(--primary),0.15);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:0.72rem;color:var(--primary-light);flex-shrink:0;background:rgba(59,130,246,0.12)">${i + 1}</div>
              <p style="font-size:0.88rem;color:var(--text-muted);line-height:1.6">${o}</p>
            </div>
          `).join('')}
        </div>
      </div>`
    const introSection = section('introduction', 'INTRODUCCIÓN', 'Introducción',
      'Planteamiento del tema y objetivos de la investigación.',
      introContent)

    // ── Context
    const ctxData = getSlide('context')
    const facts = (ctxData?.facts as { label: string; value: string }[]) || [
      { label: 'Dato 1', value: 'Valor relevante' },
      { label: 'Dato 2', value: 'Otro dato' },
    ]
    const contextContent = `
      <div class="card" style="padding:2rem;margin-bottom:1.5rem">
        <p style="font-size:0.95rem;color:var(--text);line-height:1.8">${(ctxData?.text as string) || 'Marco teórico y contexto del tema.'}</p>
      </div>
      ${kpiGrid(facts.map(f => ({ icon: '📌', label: f.label, value: f.value })))}`
    const ctxSection = section('context', 'MARCO TEÓRICO', 'Contexto',
      'Antecedentes y marco teórico de la investigación.',
      contextContent)

    // ── Research
    const resData = getSlide('research')
    const findings = (resData?.findings as string[]) || ['Hallazgo 1', 'Hallazgo 2', 'Hallazgo 3']
    const researchContent = `
      <div class="card" style="padding:2rem;margin-bottom:1.5rem">
        <p style="font-size:0.95rem;color:var(--text);line-height:1.8">${(resData?.text as string) || 'Metodología y desarrollo de la investigación.'}</p>
      </div>
      <div class="card" style="padding:1.5rem">
        <h3 style="font-size:1rem;font-weight:700;margin-bottom:1rem">Hallazgos Principales</h3>
        ${findings.map(f => `
          <div style="display:flex;align-items:start;gap:10px;padding:8px 0;border-bottom:1px solid var(--border)">
            <span style="color:var(--success);font-size:1rem">✓</span>
            <p style="font-size:0.88rem;color:var(--text-muted);line-height:1.5">${f}</p>
          </div>
        `).join('')}
      </div>`
    const resSection = section('research', 'INVESTIGACIÓN', 'Desarrollo e Investigación',
      'Metodología empleada y hallazgos principales.',
      researchContent)

    // ── Data
    const dataSlide = getSlide('data')
    const chartItems: BarChartItem[] = ((dataSlide?.charts as { label: string; value: number }[]) || [
      { label: 'Variable A', value: 78 },
      { label: 'Variable B', value: 65 },
      { label: 'Variable C', value: 42 },
      { label: 'Variable D', value: 91 },
    ]).map(d => ({ label: d.label, value: d.value }))

    const dataContent = `
      ${(dataSlide?.description as string) ? `<div class="card" style="padding:1.5rem;margin-bottom:1.5rem"><p style="font-size:0.9rem;color:var(--text-muted);line-height:1.6">${dataSlide?.description}</p></div>` : ''}
      <div class="card" style="padding:1.5rem">
        <div class="card-header"><h3>Resultados</h3></div>
        ${horizontalBarChart(chartItems)}
      </div>`
    const dataSection = section('data', 'DATOS', 'Datos y Resultados',
      'Visualización de los datos recopilados.',
      dataContent)

    // ── Analysis
    const anaData = getSlide('analysis')
    const previewConc = (anaData?.conclusions_preview as string[]) || ['Conclusión preliminar 1', 'Conclusión preliminar 2']
    const analysisContent = `
      <div class="card" style="padding:2rem;margin-bottom:1.5rem">
        <p style="font-size:0.95rem;color:var(--text);line-height:1.8">${(anaData?.text as string) || 'Análisis e interpretación de los resultados obtenidos.'}</p>
      </div>
      <div class="card" style="padding:1.5rem">
        <h3 style="font-size:1rem;font-weight:700;margin-bottom:1rem">Observaciones Clave</h3>
        ${previewConc.map(c => `
          <div style="padding:10px 14px;margin-bottom:0.5rem;background:var(--bg-elevated);border-left:3px solid var(--primary-light);border-radius:0 8px 8px 0">
            <p style="font-size:0.85rem;color:var(--text-muted);line-height:1.5">${c}</p>
          </div>
        `).join('')}
      </div>`
    const anaSection = section('analysis', 'ANÁLISIS', 'Análisis de Resultados',
      'Interpretación y discusión de los datos.',
      analysisContent)

    // ── Conclusions
    const concData = getSlide('conclusions')
    const points = (concData?.points as string[]) || ['Conclusión 1', 'Conclusión 2', 'Conclusión 3']
    const conclusionsContent = `
      <div class="card" style="padding:2rem;margin-bottom:1.5rem">
        ${(concData?.summary as string) ? `<p style="font-size:0.95rem;color:var(--text);line-height:1.8;margin-bottom:1.5rem">${concData?.summary}</p>` : ''}
        <div style="display:flex;flex-direction:column;gap:1rem">
          ${points.map((p, i) => `
            <div style="display:flex;align-items:start;gap:12px">
              <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,var(--primary),var(--accent));display:flex;align-items:center;justify-content:center;font-weight:800;font-size:0.72rem;color:#fff;flex-shrink:0">${i + 1}</div>
              <p style="font-size:0.9rem;color:var(--text);line-height:1.6">${p}</p>
            </div>
          `).join('')}
        </div>
      </div>`
    const concSection = section('conclusions', 'CONCLUSIONES', 'Conclusiones',
      'Síntesis de los resultados y reflexiones finales.',
      conclusionsContent)

    // ── References
    const refData = getSlide('references')
    const sources = (refData?.sources as string[]) || [
      'Autor, A. (2024). Título del artículo. Revista, 10(2), 45-60.',
      'Autor, B. (2023). Título del libro. Editorial.',
    ]
    const referencesContent = `
      <div class="card" style="padding:2rem">
        <div style="display:flex;flex-direction:column;gap:0.8rem">
          ${sources.map(s => `
            <div style="padding:10px 0;border-bottom:1px solid var(--border)">
              <p style="font-size:0.82rem;color:var(--text-muted);line-height:1.6;font-style:italic">${s}</p>
            </div>
          `).join('')}
        </div>
      </div>`
    const refSection = section('references', 'BIBLIOGRAFÍA', 'Referencias',
      'Fuentes consultadas para esta investigación.',
      referencesContent)

    const footer = `<div class="footer">© 2026 ${c.title} — Generado con <strong style="color:var(--accent)">Kerno Presentations</strong></div>`

    return `<!DOCTYPE html>
<html lang="${c.locale || 'es'}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${c.title} — Presentación Académica</title>
<style>${designSystemCSS(c.primaryColor, c.accentColor, 'minimal')}</style>
</head>
<body>
${nav}
${notificationContainer()}
${hero}
${introSection}
${ctxSection}
${resSection}
${dataSection}
${anaSection}
${concSection}
${refSection}
${footer}
<script>${allScripts()}</script>
</body>
</html>`
  },
}
