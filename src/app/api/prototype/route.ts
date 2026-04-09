import { renderPrototype } from '@/lib/templates'
import { renderPresentation } from '@/lib/templates/presentations'
import type { ProjectSummary } from '@/types/database'
import type { PresentationBrief } from '@/types/presentations'
import type { TemplateCustomization } from '@/lib/templates/types'
import type { PresentationCustomization } from '@/lib/templates/presentation-types'

export const maxDuration = 60

// ── Deterministic template selection — NO Claude dependency ──

const RESTAURANT_KEYWORDS = ['restaurant', 'restaurante', 'bar ', 'café', 'cafe', 'pizz', 'hostelería', 'hotel', 'comida', 'food', 'cocina', 'kitchen', 'carta digital', 'menú digital', 'catering', 'gastronom']
const SAAS_KEYWORDS = ['saas', 'platform', 'plataforma', 'software', 'app', 'dashboard', 'api', 'crm', 'erp', 'startup', 'fintech', 'marketplace', 'subscription', 'suscripción']

// Color palettes per industry for variety
const COLOR_PALETTES: Record<string, { primary: string; accent: string }[]> = {
  restaurant: [
    { primary: '#1a5c38', accent: '#d4a843' },
    { primary: '#8b2500', accent: '#f0c040' },
    { primary: '#2d3e50', accent: '#e67e22' },
  ],
  saas: [
    { primary: '#6366f1', accent: '#f59e0b' },
    { primary: '#0ea5e9', accent: '#22c55e' },
    { primary: '#8b5cf6', accent: '#ec4899' },
  ],
  generic: [
    { primary: '#3b82f6', accent: '#f59e0b' },
    { primary: '#059669', accent: '#d97706' },
    { primary: '#7c3aed', accent: '#06b6d4' },
    { primary: '#dc2626', accent: '#fbbf24' },
    { primary: '#0891b2', accent: '#f97316' },
  ],
}

function selectTemplateId(summary: ProjectSummary): string {
  const text = `${summary.name} ${summary.description} ${summary.features.join(' ')} ${summary.type}`.toLowerCase()
  if (RESTAURANT_KEYWORDS.some(k => text.includes(k))) return 'restaurant'
  if (summary.type === 'saas' || SAAS_KEYWORDS.some(k => text.includes(k))) return 'saas'
  return 'generic'
}

function pickColors(templateId: string, name: string): { primary: string; accent: string } {
  const palettes = COLOR_PALETTES[templateId] || COLOR_PALETTES.generic
  // Use name hash to pick a consistent but varied palette
  const hash = name.split('').reduce((h, c) => h + c.charCodeAt(0), 0)
  return palettes[hash % palettes.length]
}

function buildCustomization(summary: ProjectSummary, branding?: { primaryColor?: string; companyName?: string }): TemplateCustomization {
  const templateId = selectTemplateId(summary)
  const name = branding?.companyName || summary.name
  const colors = pickColors(templateId, name)
  const primary = branding?.primaryColor || colors.primary
  const accent = colors.accent

  // Industry-specific icons
  const iconSets: Record<string, string[]> = {
    restaurant: ['🍽️', '📋', '💬', '⭐', '📊', '📧', '🎂', '🍷'],
    saas: ['📊', '👥', '🔗', '🤖', '⚡', '🎨', '💳', '🔐'],
    generic: ['🚀', '📊', '🔗', '💡', '🛡️', '⚙️', '📱', '🎯'],
  }
  const icons = iconSets[templateId] || iconSets.generic

  // Build personalized mock data from the summary
  const featureList = summary.features.length > 0 ? summary.features : ['Módulo principal']
  const moduleList = summary.estimated_modules.length > 0 ? summary.estimated_modules : [{ name: 'Core', description: 'Funcionalidad principal', price: 500, days: 5 }]

  const mockData: Record<string, unknown> = {
    heroTagline: `${name} — ${summary.description.split('.')[0]}`,
    heroSubtitle: summary.features.slice(0, 3).join(' · '),
    revenue: summary.total_price * 3,
    activeUsers: 200 + Math.floor(summary.total_price / 10),
    pendingTasks: moduleList.length * 3,
    efficiency: 85 + (moduleList.length % 10),
    // Personalize alerts with actual features
    alert1: `${featureList[0]} — 3 tareas pendientes de configuración`,
    alert2: `Objetivo de ${featureList[1] || featureList[0]} alcanzado al 87%`,
    alert3: `Backup automático de ${name} completado`,
    alert4: `Renovación del módulo ${moduleList[0].name} en 15 días`,
    // Personalize metrics
    metric1Label: featureList[0] || 'Rendimiento',
    metric1: 88,
    metric2Label: featureList[1] || 'Eficiencia',
    metric2: 75,
    metric3Label: featureList[2] || 'Satisfacción',
    metric3: 92,
    metric4Label: 'Retención',
    metric4: 82,
    // Personalize table with actual modules
    tableRows: moduleList.map((m, i) => ({
      id: `#${1042 - i}`,
      name: m.name,
      status: i === 0 ? '<span class="badge badge-green">Activo</span>' : i === 1 ? '<span class="badge badge-yellow">En curso</span>' : '<span class="badge badge-blue">Revisión</span>',
      date: `0${9 - i}/04/2026`,
      value: `€${m.price.toLocaleString()}`,
    })),
    // Personalize WhatsApp with business context
    waMessages: [
      { from: 'client', text: `Hola, necesito información sobre ${featureList[0]}`, time: '10:23' },
      { from: 'bot', text: `¡Hola! Soy el asistente de ${name}. Te ayudo encantado. ¿Qué necesitas exactamente?`, time: '10:23' },
      { from: 'client', text: `Quiero saber el estado de ${featureList[1] || 'mi solicitud'}`, time: '10:24' },
      { from: 'bot', text: `📋 ${featureList[1] || 'Tu solicitud'} está activa y en progreso. ¿Necesitas algo más?`, time: '10:24' },
      { from: 'client', text: 'Perfecto, gracias! 👍', time: '10:25' },
      { from: 'bot', text: `¡De nada! Estoy aquí 24/7 para ${name}. 😊`, time: '10:25' },
    ],
    // Personalize big result
    bigResultValue: `€${(summary.total_price * 12).toLocaleString()}`,
    bigResultLabel: `Valor proyectado anual de ${name}`,
    bigItem1: `${moduleList.length} módulos`,
    bigItem2: `${summary.timeline_days} días`,
    bigItem3: `${summary.features.length} features`,
    email: `info@${name.toLowerCase().replace(/\s+/g, '')}.com`,
  }

  // Assign visual theme — each template type looks different
  const themeMap: Record<string, 'executive' | 'neon' | 'warm' | 'minimal' | 'bold'> = {
    restaurant: 'warm',
    saas: 'neon',
    generic: 'executive',
  }
  // Further vary within generic based on name hash
  const genericThemes: ('executive' | 'minimal' | 'bold')[] = ['executive', 'minimal', 'bold']
  const theme = templateId === 'generic'
    ? genericThemes[name.split('').reduce((h, c) => h + c.charCodeAt(0), 0) % genericThemes.length]
    : themeMap[templateId] || 'executive'

  return {
    templateId,
    businessName: name,
    businessType: summary.type === 'saas' ? 'Plataforma SaaS' : summary.type === 'system' ? 'Sistema' : summary.type === 'mvp' ? 'MVP' : 'Landing',
    primaryColor: primary,
    accentColor: accent,
    modules: summary.estimated_modules.map((m, i) => ({
      name: m.name,
      description: m.description,
      icon: icons[i % icons.length],
      status: 'active' as const,
    })),
    features: summary.features,
    mockData,
    locale: 'es',
    theme,
  }
}

function buildPresentationCustomization(brief: PresentationBrief): PresentationCustomization {
  const typeMap: Record<string, string[]> = {
    'pitch-deck': ['hero', 'problem', 'solution', 'market', 'business-model', 'traction', 'team', 'financials', 'ask'],
    'school-project': ['cover', 'introduction', 'context', 'research', 'data', 'analysis', 'conclusions', 'references'],
    'business-proposal': ['cover', 'executive-summary', 'scope', 'deliverables', 'timeline', 'investment', 'team', 'next-steps'],
  }
  const slideIds = typeMap[brief.type] || typeMap['pitch-deck']
  return {
    templateId: brief.type,
    title: brief.title,
    subtitle: brief.description,
    author: brief.audience,
    primaryColor: brief.primaryColor || '#22c55e',
    accentColor: brief.accentColor || '#d4a843',
    slides: slideIds.map((id, i) => ({
      id,
      title: brief.sections[i] || id,
      content: {},
      order: i,
    })),
    locale: brief.locale || 'es',
  }
}

function sseResponse(pages: string): Response {
  const encoder = new TextEncoder()
  // Send in small chunks (~4KB each) to prevent SSE line splitting
  // when the network chunks the HTTP response mid-line
  const CHUNK_SIZE = 4096
  const readable = new ReadableStream({
    start(controller) {
      for (let i = 0; i < pages.length; i += CHUNK_SIZE) {
        const chunk = pages.substring(i, i + CHUNK_SIZE)
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: chunk })}\n\n`))
      }
      controller.enqueue(encoder.encode('data: [DONE]\n\n'))
      controller.close()
    },
  })
  return new Response(readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
}

// ── Main handler ──

export async function POST(req: Request) {
  try {
    const body = await req.json() as {
      summary?: ProjectSummary
      branding?: { primaryColor?: string; logo?: string; companyName?: string }
      brief?: PresentationBrief
      mode?: 'presentation' | 'prototype'
    }

    const { summary, branding, brief, mode } = body

    // ── Presentation mode ──
    if (mode === 'presentation' && brief) {
      const customization = buildPresentationCustomization(brief)
      const html = renderPresentation(customization)
      const pages = JSON.stringify([{ name: brief.title, slug: 'presentation', html, order: 0 }])
      return sseResponse(pages)
    }

    // ── Prototype mode ──
    if (!summary) {
      return Response.json({ error: 'Missing summary or brief' }, { status: 400 })
    }

    const customization = buildCustomization(summary, branding)
    const html = renderPrototype(customization)
    const pages = JSON.stringify([{ name: customization.businessName, slug: 'demo', html, order: 0 }])
    return sseResponse(pages)

  } catch (error) {
    console.error('Prototype generation error:', error)
    return Response.json({ error: 'Failed to generate prototype' }, { status: 500 })
  }
}
