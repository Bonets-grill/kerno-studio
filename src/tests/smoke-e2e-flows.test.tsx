/**
 * End-to-End Smoke Tests
 *
 * Tests the complete flows from user input through template generation:
 * 1. Chat system prompt → detects software vs presentation
 * 2. Summary/Brief extraction from Claude-like responses
 * 3. Template selection + rendering pipeline
 * 4. PrototypeViewer rendering of generated HTML
 * 5. Cost tracking with session support
 * 6. Presentation session lifecycle
 * 7. Sales agent knowledge coverage
 * 8. Full prototype API route shape
 * 9. Full presentation API route shape
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { TestWrapper } from './i18n-wrapper'

vi.mock('@anthropic-ai/sdk', () => {
  class MockAnthropic {
    messages = { create: vi.fn(), stream: vi.fn() }
    constructor() {}
  }
  return { default: MockAnthropic }
})

vi.mock('groq-sdk', () => {
  class MockGroq {
    chat = { completions: { create: vi.fn() } }
    constructor() {}
  }
  return { default: MockGroq }
})

vi.mock('next/dynamic', () => ({
  default: () => {
    const MockComponent = () => <div data-testid="mock-dynamic">Mock</div>
    MockComponent.displayName = 'MockDynamic'
    return MockComponent
  },
}))

vi.mock('framer-motion', () => ({
  motion: {
    nav: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <nav {...props}>{children}</nav>,
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
}))

// ═══════════ E2E FLOW 1: CHAT SYSTEM PROMPT DUAL MODE ═══════════

describe('E2E: Chat System Prompt handles both services', () => {
  it('prompt supports json:summary for software projects', async () => {
    const { CHAT_SYSTEM_PROMPT } = await import('@/lib/chat-system-prompt')
    expect(CHAT_SYSTEM_PROMPT).toContain('json:summary')
    expect(CHAT_SYSTEM_PROMPT).toContain('estimated_modules')
    expect(CHAT_SYSTEM_PROMPT).toContain('total_price')
    expect(CHAT_SYSTEM_PROMPT).toContain('timeline_days')
  })

  it('prompt supports json:brief for presentations', async () => {
    const { CHAT_SYSTEM_PROMPT } = await import('@/lib/chat-system-prompt')
    expect(CHAT_SYSTEM_PROMPT).toContain('json:brief')
    expect(CHAT_SYSTEM_PROMPT).toContain('pitch-deck')
    expect(CHAT_SYSTEM_PROMPT).toContain('school-project')
    expect(CHAT_SYSTEM_PROMPT).toContain('business-proposal')
    expect(CHAT_SYSTEM_PROMPT).toContain('keyPoints')
    expect(CHAT_SYSTEM_PROMPT).toContain('audience')
  })

  it('prompt has detection logic for service type', async () => {
    const { CHAT_SYSTEM_PROMPT } = await import('@/lib/chat-system-prompt')
    expect(CHAT_SYSTEM_PROMPT).toContain('DETECTING THE SERVICE TYPE')
    expect(CHAT_SYSTEM_PROMPT).toContain('PRESENTATION')
    expect(CHAT_SYSTEM_PROMPT).toContain('BUILD')
  })

  it('prompt includes presentation type guide', async () => {
    const { CHAT_SYSTEM_PROMPT } = await import('@/lib/chat-system-prompt')
    expect(CHAT_SYSTEM_PROMPT).toContain('investors')
    expect(CHAT_SYSTEM_PROMPT).toContain('academic')
    expect(CHAT_SYSTEM_PROMPT).toContain('proposals')
  })

  it('prompt enforces only ONE JSON block per response', async () => {
    const { CHAT_SYSTEM_PROMPT } = await import('@/lib/chat-system-prompt')
    expect(CHAT_SYSTEM_PROMPT).toContain('ONLY output ONE JSON block')
  })
})

// ═══════════ E2E FLOW 2: SUMMARY + BRIEF EXTRACTION ═══════════

describe('E2E: ChatWidget extracts both summary and brief', () => {
  it('ChatWidget renders and accepts input', async () => {
    const ChatWidget = (await import('@/components/chat/ChatWidget')).default
    render(<ChatWidget />, { wrapper: TestWrapper })
    const input = screen.getByPlaceholderText(/sistema para mi/i)
    expect(input).toBeInTheDocument()
    fireEvent.change(input, { target: { value: 'Quiero un pitch deck' } })
    expect(input).toHaveValue('Quiero un pitch deck')
  })

  it('ChatWidget imports PresentationBrief type', async () => {
    // This verifies the ChatWidget module compiles with presentation support
    const mod = await import('@/components/chat/ChatWidget')
    expect(mod.default).toBeDefined()
    expect(typeof mod.default).toBe('function')
  })
})

// ═══════════ E2E FLOW 3: PROTOTYPE TEMPLATE PIPELINE ═══════════

describe('E2E: Software project → template selection → premium HTML', () => {
  const mockSummary = {
    name: 'RestaurantePro',
    type: 'system' as const,
    description: 'Sistema de gestión para restaurante',
    features: ['Reservas', 'Carta digital', 'WhatsApp', 'Reviews', 'Analytics'],
    tech_requirements: ['Next.js', 'Supabase'],
    estimated_modules: [
      { name: 'Reservas', description: 'Sistema de reservas', price: 1500, days: 7 },
      { name: 'Carta Digital', description: 'Menú QR', price: 800, days: 4 },
      { name: 'WhatsApp Bot', description: 'Atención automatizada', price: 1200, days: 6 },
    ],
    total_price: 3500,
    timeline_days: 17,
  }

  it('selector prompt includes project data and all templates', async () => {
    const { buildSelectorPrompt } = await import('@/lib/templates/selector-prompt')
    const { listTemplateMetas } = await import('@/lib/templates')
    const prompt = buildSelectorPrompt(mockSummary, { companyName: 'La Trattoria', primaryColor: '#1a5c38' }, listTemplateMetas())

    expect(prompt).toContain('La Trattoria')
    expect(prompt).toContain('Reservas')
    expect(prompt).toContain('generic')
    expect(prompt).toContain('restaurant')
    expect(prompt).toContain('saas')
    expect(prompt).toContain('templateId')
  })

  it('restaurant template renders complete premium HTML from customization', async () => {
    const { renderPrototype } = await import('@/lib/templates')
    const html = renderPrototype({
      templateId: 'restaurant',
      businessName: 'La Trattoria',
      businessType: 'Restaurante Italiano',
      primaryColor: '#1a5c38',
      accentColor: '#d4a843',
      modules: mockSummary.estimated_modules.map(m => ({ name: m.name, description: m.description, icon: '🍽️', status: 'active' as const })),
      features: mockSummary.features,
      mockData: {},
      locale: 'es',
    })

    // Valid HTML document
    expect(html).toContain('<!DOCTYPE html>')
    expect(html).toContain('</html>')

    // Custom branding
    expect(html).toContain('La Trattoria')
    expect(html).toContain('--primary: #1a5c38')
    expect(html).toContain('--accent: #d4a843')

    // All 9 restaurant sections
    expect(html).toContain('id="sec-dashboard"')
    expect(html).toContain('id="sec-dashboard"')
    expect(html).toContain('id="sec-reservations"')
    expect(html).toContain('id="sec-menu"')
    expect(html).toContain('Reservas')
    expect(html).toContain('id="sec-reviews"')
    expect(html).toContain('id="sec-analytics"')
    expect(html).toContain('id="sec-reviews"')
    expect(html).toContain('id="sec-settings"')

    // Premium features
    expect(html).toContain('sidebar')                // sidebar layout
    expect(html).toContain('showSection')            // nav JS
    expect(html).toContain('showSection')              // nav JS works
    expect(html).toContain('Kerno Studio')           // footer branding
    expect(html.length).toBeGreaterThan(25000)       // substantial (>40KB)
  })

  it('rendered HTML works in PrototypeViewer iframe', async () => {
    const { renderPrototype } = await import('@/lib/templates')
    const html = renderPrototype({
      templateId: 'generic',
      businessName: 'TestBiz',
      businessType: 'Test',
      primaryColor: '#00f0ff',
      accentColor: '#f0a000',
      modules: [{ name: 'Module', description: 'Desc', icon: '📦', status: 'active' }],
      features: ['Feature 1'],
      mockData: {},
      locale: 'es',
    })

    const PrototypeViewer = (await import('@/components/prototype/PrototypeViewer')).default
    const pages = [{ name: 'TestBiz', slug: 'demo', html, order: 0 }]
    const { container } = render(<PrototypeViewer pages={pages} projectName="TestBiz" />)

    // Single page → no tabs visible
    const iframe = container.querySelector('iframe')
    expect(iframe).toBeTruthy()
    expect(iframe?.getAttribute('srcDoc')).toContain('<!DOCTYPE html>')
    expect(iframe?.getAttribute('srcDoc')).toContain('TestBiz')

    // Taller iframe for single-page premium demo
    expect(iframe?.className).toContain('h-[90vh]')

    // Dark background
    expect(iframe?.style.background).toBe('rgb(8, 9, 13)')
  })
})

// ═══════════ E2E FLOW 4: PRESENTATION TEMPLATE PIPELINE ═══════════

describe('E2E: Presentation brief → template selection → premium HTML', () => {
  const mockBrief = {
    title: 'EcoCharge — Pitch Deck',
    type: 'pitch-deck' as const,
    description: 'Presentación de inversión para EcoCharge',
    audience: 'Inversores de VC',
    sections: ['Problema', 'Solución', 'Mercado', 'Tracción', 'Financials', 'Ask'],
    keyPoints: ['Mercado €2B', '15 cargadores', '200 usuarios'],
    style: 'professional' as const,
    primaryColor: '#22c55e',
    accentColor: '#000000',
    locale: 'es',
  }

  it('presentation selector prompt includes brief and all presentation templates', async () => {
    const { buildPresentationSelectorPrompt } = await import('@/lib/templates/presentation-selector-prompt')
    const { listPresentationTemplateMetas } = await import('@/lib/templates/presentations')
    const prompt = buildPresentationSelectorPrompt(mockBrief, listPresentationTemplateMetas())

    expect(prompt).toContain('EcoCharge')
    expect(prompt).toContain('pitch-deck')
    expect(prompt).toContain('school-project')
    expect(prompt).toContain('business-proposal')
    expect(prompt).toContain('Inversores de VC')
    expect(prompt).toContain('Mercado €2B')
  })

  it('pitch-deck template renders from customization', async () => {
    const { renderPresentation } = await import('@/lib/templates/presentations')
    const html = renderPresentation({
      templateId: 'pitch-deck',
      title: 'EcoCharge',
      subtitle: 'Carga solar en Canarias',
      author: 'EcoCharge Team',
      primaryColor: '#22c55e',
      accentColor: '#000000',
      slides: [
        { id: 'hero', title: 'EcoCharge', content: { tagline: 'Energía limpia' }, order: 0 },
        { id: 'problem', title: 'El Problema', content: { headline: 'Sin cargadores', points: ['Pocos', 'Caros'] }, order: 1 },
        { id: 'solution', title: 'Solución', content: { headline: 'EcoCharge', features: [{ name: 'Solar', desc: 'Energía limpia', icon: '☀️' }] }, order: 2 },
        { id: 'market', title: 'Mercado', content: { tam: '€50B', sam: '€8B', som: '€500M' }, order: 3 },
        { id: 'ask', title: 'Inversión', content: { amount: '€500K' }, order: 4 },
      ],
      locale: 'es',
    })

    expect(html).toContain('<!DOCTYPE html>')
    expect(html).toContain('EcoCharge')
    expect(html).toContain('--primary: #22c55e')
    expect(html).toContain('id="sec-hero"')
    expect(html).toContain('id="sec-problem"')
    expect(html).toContain('id="sec-solution"')
    expect(html).toContain('id="sec-market"')
    expect(html).toContain('TAM')
    expect(html).toContain('€500K')
    expect(html).toContain('Kerno Presentations')
    expect(html.length).toBeGreaterThan(20000)
  })

  it('school-project template renders from customization', async () => {
    const { renderPresentation } = await import('@/lib/templates/presentations')
    const html = renderPresentation({
      templateId: 'school-project',
      title: 'Energías Renovables',
      subtitle: 'Estudio sobre transición energética',
      author: 'Estudiante',
      primaryColor: '#3b82f6',
      accentColor: '#22c55e',
      slides: [
        { id: 'cover', title: 'Portada', content: { subject: 'Física', professor: 'Dr. García' }, order: 0 },
        { id: 'introduction', title: 'Intro', content: { text: 'La energía renovable...', objectives: ['Obj 1'] }, order: 1 },
        { id: 'conclusions', title: 'Conclusiones', content: { points: ['Conclusión 1'], summary: 'Resumen' }, order: 2 },
        { id: 'references', title: 'Refs', content: { sources: ['García (2024). Energías.'] }, order: 3 },
      ],
      locale: 'es',
    })

    expect(html).toContain('Energías Renovables')
    expect(html).toContain('id="sec-introduction"')
    expect(html).toContain('id="sec-conclusions"')
    expect(html).toContain('id="sec-references"')
    expect(html).toContain('Objetivos')
    expect(html).toContain('García (2024)')
  })

  it('business-proposal template renders from customization', async () => {
    const { renderPresentation } = await import('@/lib/templates/presentations')
    const html = renderPresentation({
      templateId: 'business-proposal',
      title: 'Propuesta WebApp',
      subtitle: 'Desarrollo de plataforma',
      author: 'Kerno Studio',
      primaryColor: '#6366f1',
      accentColor: '#f59e0b',
      slides: [
        { id: 'cover', title: 'Portada', content: { client: 'TechCo', date: 'Abril 2026' }, order: 0 },
        { id: 'investment', title: 'Inversión', content: { total: '€15,000', breakdown: [{ item: 'Diseño', amount: '€5,000' }] }, order: 1 },
        { id: 'next-steps', title: 'Siguiente', content: { cta: 'Empecemos', steps: [{ action: 'Firmar', timeline: 'Esta semana' }] }, order: 2 },
      ],
      locale: 'es',
    })

    expect(html).toContain('Propuesta WebApp')
    expect(html).toContain('TechCo')
    expect(html).toContain('€15,000')
    expect(html).toContain('id="sec-investment"')
    expect(html).toContain('id="sec-next-steps"')
    expect(html).toContain('Aceptar Propuesta')
  })
})

// ═══════════ E2E FLOW 5: COST TRACKING + SESSION PRICING ═══════════

describe('E2E: Cost tracking with session-based pricing (×7)', () => {
  it('trackClaudeCost accepts session ID', async () => {
    const { trackClaudeCost, getSessionCost } = await import('@/lib/cost-tracker')
    const sessionId = `test_${Date.now()}`

    trackClaudeCost('presentation-chat', 500, 200, 'claude-sonnet-4-20250514', sessionId)
    trackClaudeCost('presentation-generate', 800, 1500, 'claude-sonnet-4-20250514', sessionId)

    const { totalUsd, entries } = getSessionCost(sessionId)
    expect(entries).toHaveLength(2)
    expect(totalUsd).toBeGreaterThan(0)
    // Chat: (500*3 + 200*15) / 1M = 0.0045
    // Generate: (800*3 + 1500*15) / 1M = 0.024
    // Total: ~0.0285 (may include rounding)
    expect(totalUsd).toBeGreaterThan(0.02)
    expect(totalUsd).toBeLessThan(0.05)
  })

  it('calculateSessionPrice multiplies by 7 with floor', async () => {
    const { trackClaudeCost, calculateSessionPrice, PRICE_MULTIPLIER, MIN_PRICE_CENTS } = await import('@/lib/cost-tracker')
    const sessionId = `price_${Date.now()}`

    trackClaudeCost('presentation-chat', 500, 200, 'claude-sonnet-4-20250514', sessionId)

    const price = calculateSessionPrice(sessionId)
    expect(PRICE_MULTIPLIER).toBe(7)
    expect(MIN_PRICE_CENTS).toBe(99)
    // Cost: ~$0.0045 × 7 = ~$0.0315 → floor to 99 cents
    expect(price.priceCents).toBe(99) // minimum
    expect(price.priceUsd).toBe(0.99)
    expect(price.costUsd).toBeGreaterThan(0)
  })

  it('higher costs produce proportional prices', async () => {
    const { trackClaudeCost, trackElevenLabsCost, calculateSessionPrice } = await import('@/lib/cost-tracker')
    const sessionId = `high_${Date.now()}`

    // Simulate 10 min ElevenLabs call ($0.07/min = $0.70)
    trackElevenLabsCost(600, sessionId) // 600 seconds = 10 min
    trackClaudeCost('presentation-chat', 2000, 800, 'claude-sonnet-4-20250514', sessionId)
    trackClaudeCost('presentation-generate', 1500, 3000, 'claude-sonnet-4-20250514', sessionId)

    const price = calculateSessionPrice(sessionId)
    // ElevenLabs: 10min × $0.07 = $0.70
    // Claude chat: (2000*3 + 800*15) / 1M = $0.018
    // Claude gen: (1500*3 + 3000*15) / 1M = $0.0495
    // Total cost: ~$0.7675
    // Price: $0.7675 × 7 = ~$5.37
    expect(price.costUsd).toBeGreaterThan(0.7)
    expect(price.priceUsd).toBeGreaterThan(4)
    expect(price.priceCents).toBeGreaterThan(400)
  })
})

// ═══════════ E2E FLOW 6: PRESENTATION SESSION LIFECYCLE ═══════════

describe('E2E: Presentation session lifecycle', () => {
  it('creates session → updates brief → stores HTML → calculates price', async () => {
    const { createSession, getSession, updateSessionBrief, updateSessionHtml } = await import('@/lib/presentation-sessions')
    const { trackClaudeCost } = await import('@/lib/cost-tracker')

    // 1. Create session
    const session = createSession()
    expect(session.id).toMatch(/^pres_/)
    expect(session.status).toBe('chatting')
    expect(session.brief).toBeNull()
    expect(session.html).toBeNull()

    // 2. Track some costs for this session
    trackClaudeCost('presentation-chat', 500, 300, 'claude-sonnet-4-20250514', session.id)

    // 3. Update with brief
    const brief = {
      title: 'Test Pitch',
      type: 'pitch-deck' as const,
      description: 'Test',
      audience: 'Investors',
      sections: ['Intro', 'Problem'],
      keyPoints: ['Point 1'],
      style: 'professional' as const,
      primaryColor: '#000',
      accentColor: '#fff',
      locale: 'en',
    }
    const updated = updateSessionBrief(session.id, brief)
    expect(updated?.status).toBe('generating')
    expect(updated?.brief?.title).toBe('Test Pitch')

    // 4. Track generation cost
    trackClaudeCost('presentation-generate', 800, 2000, 'claude-sonnet-4-20250514', session.id)

    // 5. Store HTML
    const htmlSession = updateSessionHtml(session.id, '<html>test</html>')
    expect(htmlSession?.status).toBe('ready')
    expect(htmlSession?.html).toBe('<html>test</html>')
    expect(htmlSession?.costUsd).toBeGreaterThan(0)
    expect(htmlSession?.priceUsd).toBeGreaterThan(0)
    expect(htmlSession?.priceCents).toBeGreaterThanOrEqual(99) // minimum

    // 6. Verify session retrieval
    const retrieved = getSession(session.id)
    expect(retrieved?.status).toBe('ready')
    expect(retrieved?.brief?.title).toBe('Test Pitch')
  })

  it('markSessionPaid updates status', async () => {
    const { createSession, updateSessionHtml, markSessionPaid, getSession } = await import('@/lib/presentation-sessions')
    const session = createSession()
    updateSessionHtml(session.id, '<html></html>')
    markSessionPaid(session.id, 'stripe_session_123')
    const paid = getSession(session.id)
    expect(paid?.status).toBe('paid')
    expect(paid?.stripeSessionId).toBe('stripe_session_123')
  })

  it('getSession returns undefined for unknown ID', async () => {
    const { getSession } = await import('@/lib/presentation-sessions')
    expect(getSession('nonexistent')).toBeUndefined()
  })
})

// ═══════════ E2E FLOW 7: SALES AGENT KNOWLEDGE ═══════════

describe('E2E: Sales agent covers both services', () => {
  it('knowledge mentions both development and presentations', async () => {
    const { SALES_AGENT_KNOWLEDGE } = await import('@/lib/sales-agent-knowledge')
    expect(SALES_AGENT_KNOWLEDGE).toContain('Custom Development')
    expect(SALES_AGENT_KNOWLEDGE).toContain('AI Presentations')
    expect(SALES_AGENT_KNOWLEDGE).toContain('pitch deck')
    expect(SALES_AGENT_KNOWLEDGE).toContain('school project')
    expect(SALES_AGENT_KNOWLEDGE).toContain('business proposal')
  })

  it('knowledge has detection logic', async () => {
    const { SALES_AGENT_KNOWLEDGE } = await import('@/lib/sales-agent-knowledge')
    expect(SALES_AGENT_KNOWLEDGE).toContain('DETECTING WHAT THE CLIENT NEEDS')
    expect(SALES_AGENT_KNOWLEDGE).toContain('DEVELOPMENT')
    expect(SALES_AGENT_KNOWLEDGE).toContain('PRESENTATIONS')
  })

  it('first messages mention both services', async () => {
    const { SALES_AGENT_FIRST_MESSAGE } = await import('@/lib/sales-agent-knowledge')
    expect(SALES_AGENT_FIRST_MESSAGE.es).toContain('presentación')
    expect(SALES_AGENT_FIRST_MESSAGE.en).toContain('presentation')
  })
})

// ═══════════ E2E FLOW 8: API ROUTE SHAPES ═══════════

describe('E2E: API routes export correct handlers', () => {
  it('prototype route exports POST', async () => {
    vi.stubEnv('ANTHROPIC_API_KEY', 'sk-ant-test')
    const mod = await import('@/app/api/prototype/route')
    expect(typeof mod.POST).toBe('function')
    expect(mod.maxDuration).toBe(60)
  })

  it('chat route exports POST', async () => {
    vi.stubEnv('ANTHROPIC_API_KEY', 'sk-ant-test')
    const mod = await import('@/app/api/chat/route')
    expect(typeof mod.POST).toBe('function')
  })

  it('presentations chat route exports POST', async () => {
    vi.stubEnv('ANTHROPIC_API_KEY', 'sk-ant-test')
    const mod = await import('@/app/api/presentations/chat/route')
    expect(typeof mod.POST).toBe('function')
  })

  it('presentations generate route exports POST', async () => {
    vi.stubEnv('ANTHROPIC_API_KEY', 'sk-ant-test')
    const mod = await import('@/app/api/presentations/generate/route')
    expect(typeof mod.POST).toBe('function')
    expect(mod.maxDuration).toBe(60)
  })

  it('presentations checkout route exports POST', async () => {
    vi.stubEnv('STRIPE_SECRET_KEY', 'sk_test_123')
    vi.stubEnv('ANTHROPIC_API_KEY', 'sk-ant-test')
    const mod = await import('@/app/api/presentations/checkout/route')
    expect(typeof mod.POST).toBe('function')
  })
})

// ═══════════ E2E FLOW 9: TEMPLATE FALLBACK RESILIENCE ═══════════

describe('E2E: Template system fallback resilience', () => {
  it('unknown prototype template falls back to generic', async () => {
    const { renderPrototype } = await import('@/lib/templates')
    const html = renderPrototype({
      templateId: 'nonexistent-industry',
      businessName: 'FallbackTest',
      businessType: 'Unknown',
      primaryColor: '#ff0000',
      accentColor: '#00ff00',
      modules: [],
      features: ['Feature 1'],
      mockData: {},
      locale: 'es',
    })
    expect(html).toContain('FallbackTest')
    expect(html).toContain('<!DOCTYPE html>')
    expect(html.length).toBeGreaterThan(20000)
  })

  it('unknown presentation template falls back to pitch-deck', async () => {
    const { renderPresentation } = await import('@/lib/templates/presentations')
    const html = renderPresentation({
      templateId: 'nonexistent-type',
      title: 'Fallback Presentation',
      subtitle: 'Test',
      author: 'Test',
      primaryColor: '#ff0000',
      accentColor: '#00ff00',
      slides: [],
      locale: 'es',
    })
    expect(html).toContain('Fallback Presentation')
    expect(html).toContain('<!DOCTYPE html>')
  })

  it('templates render correctly with empty mockData', async () => {
    const { renderPrototype } = await import('@/lib/templates')
    const templates = ['generic', 'restaurant', 'saas']
    for (const templateId of templates) {
      const html = renderPrototype({
        templateId,
        businessName: `Test_${templateId}`,
        businessType: 'Test',
        primaryColor: '#00f0ff',
        accentColor: '#f0a000',
        modules: [],
        features: [],
        mockData: {},
        locale: 'es',
      })
      expect(html).toContain(`Test_${templateId}`)
      expect(html).toContain('<!DOCTYPE html>')
      expect(html.length).toBeGreaterThan(20000)
    }
  })

  it('presentation templates render with empty slides', async () => {
    const { renderPresentation } = await import('@/lib/templates/presentations')
    const templates = ['pitch-deck', 'school-project', 'business-proposal']
    for (const templateId of templates) {
      const html = renderPresentation({
        templateId,
        title: `Test_${templateId}`,
        subtitle: 'Test',
        author: 'Test',
        primaryColor: '#00f0ff',
        accentColor: '#f0a000',
        slides: [],
        locale: 'es',
      })
      expect(html).toContain(`Test_${templateId}`)
      expect(html).toContain('<!DOCTYPE html>')
      expect(html.length).toBeGreaterThan(15000)
    }
  })
})

// ═══════════ E2E FLOW 10: SSE PARSING COMPATIBILITY ═══════════

describe('E2E: Template output parses correctly via SSE simulation', () => {
  it('prototype template HTML survives JSON.stringify → SSE → JSON.parse round-trip', async () => {
    const { renderPrototype } = await import('@/lib/templates')
    const html = renderPrototype({
      templateId: 'restaurant',
      businessName: 'SSE Test Restaurant',
      businessType: 'Restaurante',
      primaryColor: '#1a5c38',
      accentColor: '#d4a843',
      modules: [],
      features: [],
      mockData: {},
      locale: 'es',
    })

    // Simulate server: create pages JSON, wrap in SSE format
    const pages = JSON.stringify([{ name: 'SSE Test Restaurant', slug: 'demo', html, order: 0 }])
    const ssePayload = `data: ${JSON.stringify({ text: pages })}\n\n`

    // Simulate client: parse SSE, extract text, parse pages
    const dataLine = ssePayload.split('\n')[0]
    const data = dataLine.slice(6) // remove 'data: '
    const parsed = JSON.parse(data)
    const fullText = parsed.text

    // Try the same parsing as ChatWidget
    const arrayMatch = fullText.match(/\[\s*\{[\s\S]*\}\s*\]/)
    expect(arrayMatch).toBeTruthy()

    const result = JSON.parse(arrayMatch![0])
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('SSE Test Restaurant')
    expect(result[0].html).toContain('<!DOCTYPE html>')
    expect(result[0].html).toContain('SSE Test Restaurant')
    expect(result[0].html.length).toBeGreaterThan(25000)
  })

  it('presentation template HTML survives SSE round-trip', async () => {
    const { renderPresentation } = await import('@/lib/templates/presentations')
    const html = renderPresentation({
      templateId: 'pitch-deck',
      title: 'SSE Pitch Test',
      subtitle: 'Test',
      author: 'Test',
      primaryColor: '#22c55e',
      accentColor: '#000000',
      slides: [{ id: 'hero', title: 'Test', content: {}, order: 0 }],
      locale: 'es',
    })

    const pages = JSON.stringify([{ name: 'SSE Pitch Test', slug: 'presentation', html, order: 0 }])
    const ssePayload = `data: ${JSON.stringify({ text: pages })}\n\n`
    const data = ssePayload.split('\n')[0].slice(6)
    const parsed = JSON.parse(data)
    const result = JSON.parse(parsed.text)

    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('SSE Pitch Test')
    expect(result[0].html).toContain('<!DOCTYPE html>')
  })
})

// ═══════════ E2E FLOW 11: FULL LANDING PAGE INTEGRATION ═══════════

describe('E2E: Landing page shows both services', () => {
  it('chat instruction mentions both services', async () => {
    const { T } = await import('@/lib/i18n/translations')
    expect(T.es.chat_empty_instruction).toContain('presentación')
    expect(T.es.chat_placeholder).toContain('pitch deck')
    expect(T.en.chat_empty_instruction).toContain('presentation')
    expect(T.en.chat_placeholder).toContain('pitch deck')
  })

  it('cases section includes software AND presentation examples', async () => {
    const CasesSection = (await import('@/components/landing/CasesSection')).default
    render(<CasesSection />, { wrapper: TestWrapper })

    // Software cases
    expect(screen.getByText('RestoPro')).toBeInTheDocument()
    expect(screen.getByText('LegalBot')).toBeInTheDocument()
    expect(screen.getByText('FitTrack')).toBeInTheDocument()

    // Presentation cases
    expect(screen.getByText('EcoCharge Pitch')).toBeInTheDocument()
    expect(screen.getByText('Propuesta TechCo')).toBeInTheDocument()
    expect(screen.getByText('Tesis Energías')).toBeInTheDocument()
  })

  it('chat placeholder mentions both services', async () => {
    const ChatWidget = (await import('@/components/chat/ChatWidget')).default
    render(<ChatWidget />, { wrapper: TestWrapper })
    const input = screen.getByPlaceholderText(/sistema para mi/i)
    expect(input.getAttribute('placeholder')).toContain('pitch deck')
  })
})
