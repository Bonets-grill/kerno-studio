import { renderPrototype } from '@/lib/templates'
import { renderPresentation } from '@/lib/templates/presentations'
import type { ProjectSummary } from '@/types/database'
import type { PresentationBrief } from '@/types/presentations'
import type { TemplateCustomization } from '@/lib/templates/types'
import type { PresentationCustomization } from '@/lib/templates/presentation-types'

export const maxDuration = 60

// ── Deterministic template selection — NO Claude dependency ──

const RESTAURANT_KEYWORDS = ['restaurant', 'restaurante', 'bar', 'café', 'cafe', 'pizz', 'hostel', 'hotel', 'comida', 'food', 'cocina', 'kitchen', 'menu', 'menú', 'reserva', 'catering']
const SAAS_KEYWORDS = ['saas', 'platform', 'plataforma', 'software', 'app', 'dashboard', 'api', 'crm', 'erp', 'startup', 'fintech', 'marketplace', 'subscription', 'suscripción']

function selectTemplateId(summary: ProjectSummary): string {
  const text = `${summary.name} ${summary.description} ${summary.features.join(' ')} ${summary.type}`.toLowerCase()
  if (RESTAURANT_KEYWORDS.some(k => text.includes(k))) return 'restaurant'
  if (summary.type === 'saas' || SAAS_KEYWORDS.some(k => text.includes(k))) return 'saas'
  return 'generic'
}

function buildCustomization(summary: ProjectSummary, branding?: { primaryColor?: string; companyName?: string }): TemplateCustomization {
  const templateId = selectTemplateId(summary)
  const icons = ['🚀', '📊', '🔗', '💡', '🛡️', '⚙️', '📱', '🎯']
  return {
    templateId,
    businessName: branding?.companyName || summary.name,
    businessType: summary.type === 'saas' ? 'Plataforma SaaS' : summary.type === 'system' ? 'Sistema' : summary.type === 'mvp' ? 'MVP' : 'Landing',
    primaryColor: branding?.primaryColor || '#00f0ff',
    accentColor: '#f0a000',
    modules: summary.estimated_modules.map((m, i) => ({
      name: m.name,
      description: m.description,
      icon: icons[i % icons.length],
      status: 'active' as const,
    })),
    features: summary.features,
    mockData: {},
    locale: 'es',
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
  const readable = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: pages })}\n\n`))
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
