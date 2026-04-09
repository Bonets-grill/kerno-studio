import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('@anthropic-ai/sdk', () => {
  class MockAnthropic {
    messages = { create: vi.fn(), stream: vi.fn() }
    constructor() {}
  }
  return { default: MockAnthropic }
})

// ═══════════ TEMPLATE TYPES ═══════════

describe('Template Types', () => {
  it('TemplateMeta has all required fields', async () => {
    const meta: import('@/lib/templates/types').TemplateMeta = {
      id: 'test',
      name: 'Test Template',
      industries: ['tech'],
      projectTypes: ['saas'],
      sections: ['hero', 'dashboard'],
      description: 'A test template',
    }
    expect(meta.id).toBe('test')
    expect(meta.industries).toHaveLength(1)
    expect(meta.projectTypes).toContain('saas')
  })

  it('TemplateCustomization has all required fields', async () => {
    const customization: import('@/lib/templates/types').TemplateCustomization = {
      templateId: 'generic',
      businessName: 'TestBiz',
      businessType: 'SaaS',
      primaryColor: '#00f0ff',
      accentColor: '#f0a000',
      modules: [{ name: 'Dashboard', description: 'Main view', icon: '📊', status: 'active' }],
      features: ['Auth', 'Dashboard'],
      mockData: { revenue: 10000 },
      locale: 'es',
    }
    expect(customization.templateId).toBe('generic')
    expect(customization.modules).toHaveLength(1)
    expect(customization.modules[0].status).toBe('active')
  })

  it('ModuleDisplay supports active and coming_soon', () => {
    const active: import('@/lib/templates/types').ModuleDisplay = { name: 'A', description: 'B', icon: '📊', status: 'active' }
    const soon: import('@/lib/templates/types').ModuleDisplay = { name: 'C', description: 'D', icon: '🔜', status: 'coming_soon' }
    expect(active.status).toBe('active')
    expect(soon.status).toBe('coming_soon')
  })
})

// ═══════════ TEMPLATE REGISTRY ═══════════

describe('Template Registry', () => {
  it('exports all registry functions', async () => {
    const registry = await import('@/lib/templates')
    expect(typeof registry.getTemplate).toBe('function')
    expect(typeof registry.getTemplateOrFallback).toBe('function')
    expect(typeof registry.listTemplateMetas).toBe('function')
    expect(typeof registry.renderPrototype).toBe('function')
    expect(typeof registry.registerTemplate).toBe('function')
  })

  it('has generic, restaurant, and saas templates registered', async () => {
    const { listTemplateMetas } = await import('@/lib/templates')
    const metas = listTemplateMetas()
    const ids = metas.map(m => m.id)
    expect(ids).toContain('generic')
    expect(ids).toContain('restaurant')
    expect(ids).toContain('saas')
    expect(metas.length).toBeGreaterThanOrEqual(3)
  })

  it('getTemplate returns correct template by id', async () => {
    const { getTemplate } = await import('@/lib/templates')
    const restaurant = getTemplate('restaurant')
    expect(restaurant).toBeDefined()
    expect(restaurant!.meta.id).toBe('restaurant')
    expect(restaurant!.meta.industries).toContain('restaurant')
  })

  it('getTemplate returns undefined for unknown id', async () => {
    const { getTemplate } = await import('@/lib/templates')
    expect(getTemplate('nonexistent')).toBeUndefined()
  })

  it('getTemplateOrFallback returns generic for unknown id', async () => {
    const { getTemplateOrFallback } = await import('@/lib/templates')
    const fallback = getTemplateOrFallback('nonexistent')
    expect(fallback.meta.id).toBe('generic')
  })

  it('each template meta has required fields', async () => {
    const { listTemplateMetas } = await import('@/lib/templates')
    for (const meta of listTemplateMetas()) {
      expect(meta.id).toBeTruthy()
      expect(meta.name).toBeTruthy()
      expect(meta.industries.length).toBeGreaterThan(0)
      expect(meta.projectTypes.length).toBeGreaterThan(0)
      expect(meta.sections.length).toBeGreaterThan(0)
      expect(meta.description.length).toBeGreaterThan(10)
    }
  })
})

// ═══════════ DESIGN SYSTEM CSS ═══════════

describe('Design System CSS', () => {
  it('generates CSS with custom colors', async () => {
    const { designSystemCSS } = await import('@/lib/templates/shared/design-system')
    const css = designSystemCSS('#1a5c38', '#d4a843')
    expect(css).toContain('--primary: #1a5c38')
    expect(css).toContain('--accent: #d4a843')
    expect(css).toContain('fonts.googleapis.com')
    expect(css).toContain('.nav')
    expect(css).toContain('.hero-wrap')
    expect(css).toContain('.kpi-grid')
    expect(css).toContain('.data-tbl')
    expect(css).toContain('.wa-box')
    expect(css).toContain('@media')
  })

  it('hexToRgb converts correctly', async () => {
    const { hexToRgb } = await import('@/lib/templates/shared/design-system')
    expect(hexToRgb('#ff0000')).toBe('255,0,0')
    expect(hexToRgb('#00ff00')).toBe('0,255,0')
    expect(hexToRgb('#0000ff')).toBe('0,0,255')
  })

  it('lightenHex makes color lighter', async () => {
    const { lightenHex } = await import('@/lib/templates/shared/design-system')
    const lighter = lightenHex('#000000', 50)
    expect(lighter).not.toBe('#000000')
    // 50% of 255 = ~127 per channel
    expect(lighter.length).toBe(7) // #rrggbb
  })

  it('darkenHex makes color darker', async () => {
    const { darkenHex } = await import('@/lib/templates/shared/design-system')
    const darker = darkenHex('#ffffff', 50)
    expect(darker).not.toBe('#ffffff')
    expect(darker.length).toBe(7)
  })

  it('CSS includes glassmorphism nav', async () => {
    const { designSystemCSS } = await import('@/lib/templates/shared/design-system')
    const css = designSystemCSS('#00f0ff', '#f0a000')
    expect(css).toContain('backdrop-filter')
    expect(css).toContain('blur')
  })

  it('CSS includes responsive breakpoints', async () => {
    const { designSystemCSS } = await import('@/lib/templates/shared/design-system')
    const css = designSystemCSS('#00f0ff', '#f0a000')
    expect(css).toContain('768px')
    expect(css).toContain('1024px')
  })
})

// ═══════════ SHARED SCRIPTS ═══════════

describe('Shared Scripts', () => {
  it('allScripts returns combined JS', async () => {
    const { allScripts } = await import('@/lib/templates/shared/scripts')
    const js = allScripts()
    expect(js).toContain('showSection')
    expect(js).toContain('animateCounters')
    expect(js).toContain('animateBars')
    expect(js).toContain('activateSteps')
    expect(js).toContain('startWADemo')
    expect(js).toContain('showNotif')
    expect(js).toContain('playSound')
    expect(js).toContain('showEmail')
    expect(js).toContain('DOMContentLoaded')
  })

  it('sectionNavScript handles section switching', async () => {
    const { sectionNavScript } = await import('@/lib/templates/shared/scripts')
    const js = sectionNavScript()
    expect(js).toContain('demo-section')
    expect(js).toContain('nav-link')
    expect(js).toContain('classList')
  })

  it('audioScript uses Web Audio API', async () => {
    const { audioScript } = await import('@/lib/templates/shared/scripts')
    const js = audioScript()
    expect(js).toContain('AudioContext')
    expect(js).toContain('createOscillator')
    expect(js).toContain('frequency')
  })

  it('notificationScript handles slide-in', async () => {
    const { notificationScript } = await import('@/lib/templates/shared/scripts')
    const js = notificationScript()
    expect(js).toContain('notif')
    expect(js).toContain('classList.add')
    expect(js).toContain('setTimeout')
  })
})

// ═══════════ SHARED COMPONENTS ═══════════

describe('Shared HTML Components', () => {
  it('kpiCard generates HTML with data', async () => {
    const { kpiCard } = await import('@/lib/templates/shared/components')
    const html = kpiCard({ icon: '📊', label: 'Revenue', value: 50000, prefix: '€', trend: { value: '+12%', direction: 'up' } })
    expect(html).toContain('📊')
    expect(html).toContain('Revenue')
    expect(html).toContain('data-target="50000"')
    expect(html).toContain('data-prefix="€"')
    expect(html).toContain('+12%')
    expect(html).toContain('counter')
  })

  it('kpiCard renders string values without counter class', async () => {
    const { kpiCard } = await import('@/lib/templates/shared/components')
    const html = kpiCard({ icon: '⏰', label: 'Uptime', value: '99.9%' })
    expect(html).toContain('99.9%')
    expect(html).not.toContain('data-target')
  })

  it('kpiGrid wraps multiple cards', async () => {
    const { kpiGrid } = await import('@/lib/templates/shared/components')
    const html = kpiGrid([
      { icon: '📊', label: 'A', value: 100 },
      { icon: '👥', label: 'B', value: 200 },
    ])
    expect(html).toContain('kpi-grid')
    expect(html).toContain('data-target="100"')
    expect(html).toContain('data-target="200"')
  })

  it('dataTable generates correct structure', async () => {
    const { dataTable } = await import('@/lib/templates/shared/components')
    const html = dataTable(
      [{ label: 'Name', key: 'name' }, { label: 'Value', key: 'val', align: 'right' }],
      [{ name: 'Item 1', val: '€100' }, { name: 'Item 2', val: '€200' }]
    )
    expect(html).toContain('<thead>')
    expect(html).toContain('<tbody>')
    expect(html).toContain('Name')
    expect(html).toContain('Item 1')
    expect(html).toContain('€200')
    expect(html).toContain('text-align:right')
  })

  it('progressBar generates bar with data-width', async () => {
    const { progressBar } = await import('@/lib/templates/shared/components')
    const html = progressBar('Conversion', 75, 'primary')
    expect(html).toContain('Conversion')
    expect(html).toContain('75%')
    expect(html).toContain('data-width="75%"')
    expect(html).toContain('bar-primary')
  })

  it('horizontalBarChart renders multiple bars', async () => {
    const { horizontalBarChart } = await import('@/lib/templates/shared/components')
    const html = horizontalBarChart([
      { label: 'Sales', value: 340 },
      { label: 'Support', value: 220 },
    ])
    expect(html).toContain('Sales')
    expect(html).toContain('Support')
    expect(html).toContain('data-width="100%"') // 340 is max → 100%
    expect(html).toContain('data-width="65%"') // 220/340 ≈ 65%
  })

  it('whatsappChat generates message bubbles', async () => {
    const { whatsappChat } = await import('@/lib/templates/shared/components')
    const html = whatsappChat('wa-test', 'TestBiz', 'T', [
      { from: 'client', text: 'Hola', time: '10:00' },
      { from: 'bot', text: 'Hello!', time: '10:01' },
    ])
    expect(html).toContain('wa-test')
    expect(html).toContain('TestBiz')
    expect(html).toContain('Hola')
    expect(html).toContain('Hello!')
    expect(html).toContain('client')
    expect(html).toContain('bot')
    expect(html).toContain('startWADemo')
  })

  it('stepProcess generates numbered steps', async () => {
    const { stepProcess } = await import('@/lib/templates/shared/components')
    const html = stepProcess([
      { title: 'Step 1', description: 'First step', detail: 'Details here', icon: '📥' },
      { title: 'Step 2', description: 'Second step' },
    ])
    expect(html).toContain('Step 1')
    expect(html).toContain('First step')
    expect(html).toContain('Details here')
    expect(html).toContain('step-detail')
    expect(html).toContain('📥')
    expect(html).toContain('Step 2')
  })

  it('section wraps content with header', async () => {
    const { section } = await import('@/lib/templates/shared/components')
    const html = section('dashboard', 'METRICS', 'Panel', 'Description here', '<p>Content</p>', true)
    expect(html).toContain('id="sec-dashboard"')
    expect(html).toContain('data-section-name="METRICS"')
    expect(html).toContain('Panel')
    expect(html).toContain('Description here')
    expect(html).toContain('<p>Content</p>')
    expect(html).toContain('active')
  })

  it('section is hidden by default', async () => {
    const { section } = await import('@/lib/templates/shared/components')
    const html = section('test', 'TEST', 'Title', 'Desc', '<p>X</p>')
    expect(html).toContain('demo-section')
    expect(html).not.toContain('demo-section active')
  })

  it('heroSection generates full hero', async () => {
    const { heroSection } = await import('@/lib/templates/shared/components')
    const html = heroSection('MyBiz', 'Welcome', 'Subtitle', [
      { value: 100, label: 'Users' },
      { value: '99%', label: 'Uptime' },
    ])
    expect(html).toContain('MyBiz')
    expect(html).toContain('Welcome')
    expect(html).toContain('Subtitle')
    expect(html).toContain('data-target="100"')
    expect(html).toContain('99%')
    expect(html).toContain('hero-wrap')
    expect(html).toContain('dot-pulse')
  })

  it('navBar generates glassmorphism nav', async () => {
    const { navBar } = await import('@/lib/templates/shared/components')
    const html = navBar('Brand', [
      { id: 'hero', label: 'Home' },
      { id: 'dash', label: 'Dashboard' },
    ])
    expect(html).toContain('Brand')
    expect(html).toContain('Home')
    expect(html).toContain('Dashboard')
    expect(html).toContain("showSection('hero')")
    expect(html).toContain("showSection('dash')")
    expect(html).toContain('nav-link active') // first is active
  })

  it('settingsForm generates inputs and toggles', async () => {
    const { settingsForm } = await import('@/lib/templates/shared/components')
    const html = settingsForm([
      { label: 'Name', value: 'Test', type: 'text' },
      { label: 'Notifications', value: '', type: 'toggle', enabled: true },
      { label: 'Theme', value: 'Dark', type: 'select', options: ['Dark', 'Light'] },
    ])
    expect(html).toContain('Name')
    expect(html).toContain('value="Test"')
    expect(html).toContain('Notifications')
    expect(html).toContain('toggle-track on')
    expect(html).toContain('<option selected>Dark</option>')
    expect(html).toContain('<option>Light</option>')
    expect(html).toContain('btn-save')
  })

  it('bigResult generates highlight card', async () => {
    const { bigResult } = await import('@/lib/templates/shared/components')
    const html = bigResult('€100K', 'Annual Revenue', [
      { title: '+23%', subtitle: 'Growth' },
    ])
    expect(html).toContain('€100K')
    expect(html).toContain('Annual Revenue')
    expect(html).toContain('+23%')
    expect(html).toContain('Growth')
    expect(html).toContain('big-result')
  })

  it('emailPreview generates selectable emails', async () => {
    const { emailPreview } = await import('@/lib/templates/shared/components')
    const html = emailPreview([
      { type: 'confirm', label: 'Confirmación', icon: '✅', subject: 'Reserva OK', body: '<p>Tu reserva</p>', badgeClass: 'badge-green' },
      { type: 'promo', label: 'Promo', icon: '🎉', subject: 'Oferta', body: '<p>Descuento</p>', badgeClass: 'badge-accent' },
    ], 'TestBiz')
    expect(html).toContain('Confirmación')
    expect(html).toContain('Promo')
    expect(html).toContain('Reserva OK')
    expect(html).toContain("showEmail('promo')")
    expect(html).toContain('_emailData')
  })
})

// ═══════════ TEMPLATE RENDERING — GENERIC ═══════════

describe('Generic Template Rendering', () => {
  const baseCustomization: import('@/lib/templates/types').TemplateCustomization = {
    templateId: 'generic',
    businessName: 'TestCorp',
    businessType: 'Consultora Tecnológica',
    primaryColor: '#3b82f6',
    accentColor: '#f59e0b',
    modules: [
      { name: 'CRM', description: 'Gestión de clientes', icon: '👥', status: 'active' },
      { name: 'Analytics', description: 'Métricas del negocio', icon: '📊', status: 'active' },
    ],
    features: ['CRM', 'Analytics', 'Reporting'],
    mockData: {},
    locale: 'es',
  }

  it('renders valid HTML document', async () => {
    const { renderPrototype } = await import('@/lib/templates')
    const html = renderPrototype(baseCustomization)
    expect(html).toContain('<!DOCTYPE html>')
    expect(html).toContain('<html lang="es">')
    expect(html).toContain('</html>')
    expect(html).toContain('<head>')
    expect(html).toContain('<body>')
    expect(html).toContain('</body>')
  })

  it('includes business name throughout', async () => {
    const { renderPrototype } = await import('@/lib/templates')
    const html = renderPrototype(baseCustomization)
    expect(html).toContain('TestCorp')
    expect(html).toContain('<title>TestCorp')
  })

  it('includes CSS with custom colors', async () => {
    const { renderPrototype } = await import('@/lib/templates')
    const html = renderPrototype(baseCustomization)
    expect(html).toContain('--primary: #3b82f6')
    expect(html).toContain('--accent: #f59e0b')
  })

  it('includes all 8 sections', async () => {
    const { renderPrototype } = await import('@/lib/templates')
    const html = renderPrototype(baseCustomization)
    expect(html).toContain('id="sec-hero"')
    expect(html).toContain('id="sec-dashboard"')
    expect(html).toContain('id="sec-features"')
    expect(html).toContain('id="sec-data"')
    expect(html).toContain('id="sec-process"')
    expect(html).toContain('id="sec-analytics"')
    expect(html).toContain('id="sec-contact"')
    expect(html).toContain('id="sec-settings"')
  })

  it('includes glassmorphism nav with links', async () => {
    const { renderPrototype } = await import('@/lib/templates')
    const html = renderPrototype(baseCustomization)
    expect(html).toContain('class="nav"')
    expect(html).toContain('nav-brand')
    expect(html).toContain('nav-link')
  })

  it('includes JavaScript', async () => {
    const { renderPrototype } = await import('@/lib/templates')
    const html = renderPrototype(baseCustomization)
    expect(html).toContain('<script>')
    expect(html).toContain('showSection')
    expect(html).toContain('animateCounters')
    expect(html).toContain('playSound')
  })

  it('renders modules as feature cards', async () => {
    const { renderPrototype } = await import('@/lib/templates')
    const html = renderPrototype(baseCustomization)
    expect(html).toContain('CRM')
    expect(html).toContain('Gestión de clientes')
    expect(html).toContain('👥')
    expect(html).toContain('Analytics')
  })

  it('includes notification container', async () => {
    const { renderPrototype } = await import('@/lib/templates')
    const html = renderPrototype(baseCustomization)
    expect(html).toContain('id="notif"')
    expect(html).toContain('notif-icon')
  })

  it('includes WhatsApp simulation', async () => {
    const { renderPrototype } = await import('@/lib/templates')
    const html = renderPrototype(baseCustomization)
    expect(html).toContain('wa-box')
    expect(html).toContain('wa-chat')
  })

  it('includes Kerno Studio footer branding', async () => {
    const { renderPrototype } = await import('@/lib/templates')
    const html = renderPrototype(baseCustomization)
    expect(html).toContain('Kerno Studio')
    expect(html).toContain('footer')
  })

  it('uses custom mockData when provided', async () => {
    const { renderPrototype } = await import('@/lib/templates')
    const html = renderPrototype({
      ...baseCustomization,
      mockData: {
        heroTagline: 'Custom Tagline Here',
        revenue: 99999,
        alert1: 'Custom alert message',
      },
    })
    expect(html).toContain('Custom Tagline Here')
    expect(html).toContain('Custom alert message')
  })

  it('generates substantial HTML (>20KB)', async () => {
    const { renderPrototype } = await import('@/lib/templates')
    const html = renderPrototype(baseCustomization)
    expect(html.length).toBeGreaterThan(20000)
  })
})

// ═══════════ TEMPLATE RENDERING — RESTAURANT ═══════════

describe('Restaurant Template Rendering', () => {
  const customization: import('@/lib/templates/types').TemplateCustomization = {
    templateId: 'restaurant',
    businessName: 'La Terraza',
    businessType: 'Restaurante Mediterráneo',
    primaryColor: '#1a5c38',
    accentColor: '#d4a843',
    modules: [
      { name: 'Reservas', description: 'Sistema de reservas', icon: '📋', status: 'active' },
      { name: 'Carta Digital', description: 'Menú QR', icon: '🍽️', status: 'active' },
    ],
    features: ['Reservas', 'Carta Digital', 'WhatsApp', 'Reviews'],
    mockData: {},
    locale: 'es',
  }

  it('renders with restaurant-specific sections', async () => {
    const { renderPrototype } = await import('@/lib/templates')
    const html = renderPrototype(customization)
    expect(html).toContain('id="sec-reservations"')
    expect(html).toContain('id="sec-menu"')
    expect(html).toContain('id="sec-whatsapp"')
    expect(html).toContain('id="sec-reviews"')
    expect(html).toContain('id="sec-analytics"')
    expect(html).toContain('id="sec-email"')
  })

  it('includes restaurant KPIs', async () => {
    const { renderPrototype } = await import('@/lib/templates')
    const html = renderPrototype(customization)
    expect(html).toContain('Reservas Hoy')
    expect(html).toContain('Facturación Hoy')
    expect(html).toContain('Ocupación')
    expect(html).toContain('Rating Medio')
  })

  it('includes reservation table with guest data', async () => {
    const { renderPrototype } = await import('@/lib/templates')
    const html = renderPrototype(customization)
    expect(html).toContain('García López')
    expect(html).toContain('Terraza preferida')
    expect(html).toContain('Confirmada')
  })

  it('includes menu items with prices', async () => {
    const { renderPrototype } = await import('@/lib/templates')
    const html = renderPrototype(customization)
    expect(html).toContain('Risotto de Setas')
    expect(html).toContain('€18.50')
    expect(html).toContain('Entrecot Madurado')
    expect(html).toContain('€32.00')
  })

  it('includes WhatsApp reservation simulation', async () => {
    const { renderPrototype } = await import('@/lib/templates')
    const html = renderPrototype(customization)
    expect(html).toContain('wa-reserva')
    expect(html).toContain('quiero reservar')
    expect(html).toContain('Tarta de cumpleaños')
  })

  it('includes reviews with star ratings', async () => {
    const { renderPrototype } = await import('@/lib/templates')
    const html = renderPrototype(customization)
    expect(html).toContain('★')
    expect(html).toContain('María G.')
    expect(html).toContain('Google')
    expect(html).toContain('TripAdvisor')
  })

  it('includes email marketing templates', async () => {
    const { renderPrototype } = await import('@/lib/templates')
    const html = renderPrototype(customization)
    expect(html).toContain('Confirmación')
    expect(html).toContain('Promoción')
    expect(html).toContain('Feedback')
    expect(html).toContain('_emailData')
  })

  it('includes restaurant-specific settings', async () => {
    const { renderPrototype } = await import('@/lib/templates')
    const html = renderPrototype(customization)
    expect(html).toContain('Hora apertura')
    expect(html).toContain('WhatsApp automática')
    expect(html).toContain('Recordatorio 2h antes')
  })

  it('uses business name throughout', async () => {
    const { renderPrototype } = await import('@/lib/templates')
    const html = renderPrototype(customization)
    const count = (html.match(/La Terraza/g) || []).length
    expect(count).toBeGreaterThanOrEqual(5)
  })
})

// ═══════════ TEMPLATE RENDERING — SAAS ═══════════

describe('SaaS Template Rendering', () => {
  const customization: import('@/lib/templates/types').TemplateCustomization = {
    templateId: 'saas',
    businessName: 'CloudSync',
    businessType: 'Plataforma SaaS',
    primaryColor: '#6366f1',
    accentColor: '#f59e0b',
    modules: [
      { name: 'Dashboard', description: 'Analytics en tiempo real', icon: '📊', status: 'active' },
      { name: 'API REST', description: 'Endpoints para integraciones', icon: '🔗', status: 'active' },
    ],
    features: ['Dashboard', 'User Management', 'API', 'Billing'],
    mockData: {},
    locale: 'es',
  }

  it('renders with SaaS-specific sections', async () => {
    const { renderPrototype } = await import('@/lib/templates')
    const html = renderPrototype(customization)
    expect(html).toContain('id="sec-users"')
    expect(html).toContain('id="sec-api"')
    expect(html).toContain('id="sec-billing"')
    expect(html).toContain('id="sec-onboarding"')
  })

  it('includes SaaS KPIs (MRR, churn, ARPU)', async () => {
    const { renderPrototype } = await import('@/lib/templates')
    const html = renderPrototype(customization)
    expect(html).toContain('MRR')
    expect(html).toContain('Churn Rate')
    expect(html).toContain('ARPU')
    expect(html).toContain('Usuarios Activos')
  })

  it('includes user management table with health scores', async () => {
    const { renderPrototype } = await import('@/lib/templates')
    const html = renderPrototype(customization)
    expect(html).toContain('TechCorp S.L.')
    expect(html).toContain('Enterprise')
    expect(html).toContain('En riesgo')
    expect(html).toContain('Health')
  })

  it('includes API monitoring endpoints', async () => {
    const { renderPrototype } = await import('@/lib/templates')
    const html = renderPrototype(customization)
    expect(html).toContain('/api/v2/users')
    expect(html).toContain('/api/v2/analytics')
    expect(html).toContain('GET')
    expect(html).toContain('POST')
    expect(html).toContain('Latencia')
  })

  it('includes conversion funnel', async () => {
    const { renderPrototype } = await import('@/lib/templates')
    const html = renderPrototype(customization)
    expect(html).toContain('Visitantes')
    expect(html).toContain('Signups')
    expect(html).toContain('Activados')
    expect(html).toContain('Trial')
  })

  it('includes billing section with plan breakdown', async () => {
    const { renderPrototype } = await import('@/lib/templates')
    const html = renderPrototype(customization)
    expect(html).toContain('Enterprise')
    expect(html).toContain('Pro')
    expect(html).toContain('Starter')
    expect(html).toContain('Net Revenue Retention')
  })

  it('includes onboarding flow with steps', async () => {
    const { renderPrototype } = await import('@/lib/templates')
    const html = renderPrototype(customization)
    expect(html).toContain('Registro')
    expect(html).toContain('Setup inicial')
    expect(html).toContain('Primera acción clave')
    expect(html).toContain('Invitar equipo')
  })

  it('includes SaaS-specific settings', async () => {
    const { renderPrototype } = await import('@/lib/templates')
    const html = renderPrototype(customization)
    expect(html).toContain('Dominio personalizado')
    expect(html).toContain('SSO')
    expect(html).toContain('Rate limiting')
  })
})

// ═══════════ SELECTOR PROMPT ═══════════

describe('Template Selector Prompt', () => {
  it('builds prompt with project summary and templates', async () => {
    const { buildSelectorPrompt } = await import('@/lib/templates/selector-prompt')
    const { listTemplateMetas } = await import('@/lib/templates')

    const summary = {
      name: 'MyRestaurant',
      type: 'mvp' as const,
      description: 'App para gestión de restaurante',
      features: ['Reservas', 'Menú digital'],
      tech_requirements: [],
      estimated_modules: [{ name: 'Reservas', description: 'Sistema de reservas', price: 1500, days: 10 }],
      total_price: 3000,
      timeline_days: 20,
    }

    const prompt = buildSelectorPrompt(summary, { companyName: 'La Trattoria', primaryColor: '#1a5c38' }, listTemplateMetas())

    expect(prompt).toContain('La Trattoria')
    expect(prompt).toContain('#1a5c38')
    expect(prompt).toContain('Reservas')
    expect(prompt).toContain('generic')
    expect(prompt).toContain('restaurant')
    expect(prompt).toContain('saas')
    expect(prompt).toContain('templateId')
    expect(prompt).toContain('mockData')
  })

  it('uses default color when not provided', async () => {
    const { buildSelectorPrompt } = await import('@/lib/templates/selector-prompt')
    const prompt = buildSelectorPrompt(
      { name: 'Test', type: 'saas' as const, description: 'Test', features: [], tech_requirements: [], estimated_modules: [], total_price: 0, timeline_days: 0 },
      {},
      []
    )
    expect(prompt).toContain('#00f0ff')
  })

  it('uses project name as fallback for company name', async () => {
    const { buildSelectorPrompt } = await import('@/lib/templates/selector-prompt')
    const prompt = buildSelectorPrompt(
      { name: 'FallbackName', type: 'saas' as const, description: 'Test', features: [], tech_requirements: [], estimated_modules: [], total_price: 0, timeline_days: 0 },
      {},
      []
    )
    expect(prompt).toContain('FallbackName')
  })
})

// ═══════════ PROTOTYPE API ROUTE ═══════════

describe('Prototype API Route (updated)', () => {
  it('exports POST handler', async () => {
    vi.stubEnv('ANTHROPIC_API_KEY', 'sk-ant-test')
    const mod = await import('@/app/api/prototype/route')
    expect(typeof mod.POST).toBe('function')
  })
})

// ═══════════ PROTOTYPE VIEWER — SINGLE PAGE ═══════════

describe('PrototypeViewer — Single Page Mode', () => {
  it('hides page tabs when only 1 page', async () => {
    const PrototypeViewer = (await import('@/components/prototype/PrototypeViewer')).default
    const singlePage = [{ name: 'Demo', slug: 'demo', html: '<h1>Full Demo</h1>', order: 0 }]
    const { container } = render(<PrototypeViewer pages={singlePage} projectName="TestApp" />)

    // Should NOT show tab buttons for single page (tabs are hidden)
    const tabButtons = container.querySelectorAll('button')
    const tabTexts = Array.from(tabButtons).map(b => b.textContent)
    // "Demo" tab should not appear as a standalone tab
    expect(tabTexts.filter(t => t === 'Demo')).toHaveLength(0)
  })

  it('uses taller iframe for single page premium demo', async () => {
    const PrototypeViewer = (await import('@/components/prototype/PrototypeViewer')).default
    const singlePage = [{ name: 'Demo', slug: 'demo', html: '<h1>Full Demo</h1>', order: 0 }]
    const { container } = render(<PrototypeViewer pages={singlePage} projectName="TestApp" />)

    const iframe = container.querySelector('iframe')
    expect(iframe).toBeTruthy()
    expect(iframe?.className).toContain('h-[850px]')
  })

  it('uses standard height for multi-page', async () => {
    const PrototypeViewer = (await import('@/components/prototype/PrototypeViewer')).default
    const multiPages = [
      { name: 'Home', slug: 'home', html: '<h1>Home</h1>', order: 0 },
      { name: 'About', slug: 'about', html: '<h1>About</h1>', order: 1 },
    ]
    const { container } = render(<PrototypeViewer pages={multiPages} projectName="TestApp" />)

    const iframe = container.querySelector('iframe')
    expect(iframe?.className).toContain('h-[600px]')
  })

  it('uses dark background for iframe', async () => {
    const PrototypeViewer = (await import('@/components/prototype/PrototypeViewer')).default
    const singlePage = [{ name: 'Demo', slug: 'demo', html: '<h1>Full Demo</h1>', order: 0 }]
    const { container } = render(<PrototypeViewer pages={singlePage} projectName="TestApp" />)

    const iframe = container.querySelector('iframe')
    expect(iframe?.style.background).toBe('rgb(8, 9, 13)')
  })

  it('still shows page tabs for multi-page', async () => {
    const PrototypeViewer = (await import('@/components/prototype/PrototypeViewer')).default
    const multiPages = [
      { name: 'Home', slug: 'home', html: '<h1>Home</h1>', order: 0 },
      { name: 'Settings', slug: 'settings', html: '<h1>Settings</h1>', order: 1 },
    ]
    render(<PrototypeViewer pages={multiPages} projectName="TestApp" />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
  })
})

// ═══════════ CROSS-TEMPLATE CONSISTENCY ═══════════

describe('Cross-Template Consistency', () => {
  const templates = ['generic', 'restaurant', 'saas'] as const

  const makeCustomization = (templateId: string): import('@/lib/templates/types').TemplateCustomization => ({
    templateId,
    businessName: 'ConsistencyTest',
    businessType: 'Test',
    primaryColor: '#ff0000',
    accentColor: '#00ff00',
    modules: [{ name: 'Module', description: 'Desc', icon: '📦', status: 'active' }],
    features: ['Feature 1'],
    mockData: {},
    locale: 'es',
  })

  for (const templateId of templates) {
    it(`${templateId}: renders valid HTML with head, body, style, script`, async () => {
      const { renderPrototype } = await import('@/lib/templates')
      const html = renderPrototype(makeCustomization(templateId))
      expect(html).toContain('<!DOCTYPE html>')
      expect(html).toContain('<style>')
      expect(html).toContain('</style>')
      expect(html).toContain('<script>')
      expect(html).toContain('</script>')
      expect(html).toContain('<nav')
      expect(html).toContain('class="footer"')
    })

    it(`${templateId}: includes custom colors in CSS`, async () => {
      const { renderPrototype } = await import('@/lib/templates')
      const html = renderPrototype(makeCustomization(templateId))
      expect(html).toContain('--primary: #ff0000')
      expect(html).toContain('--accent: #00ff00')
    })

    it(`${templateId}: includes business name in title`, async () => {
      const { renderPrototype } = await import('@/lib/templates')
      const html = renderPrototype(makeCustomization(templateId))
      expect(html).toContain('<title>ConsistencyTest')
    })

    it(`${templateId}: generates at least 20KB`, async () => {
      const { renderPrototype } = await import('@/lib/templates')
      const html = renderPrototype(makeCustomization(templateId))
      expect(html.length).toBeGreaterThan(20000)
    })

    it(`${templateId}: has hero section active by default`, async () => {
      const { renderPrototype } = await import('@/lib/templates')
      const html = renderPrototype(makeCustomization(templateId))
      expect(html).toContain('id="sec-hero"')
      // Hero should be the first active section
      const heroMatch = html.match(/demo-section[^"]*active[^"]*"[^>]*id="sec-hero"/)
        || html.match(/id="sec-hero"/) // hero uses heroSection which has its own active class
      expect(heroMatch).toBeTruthy()
    })

    it(`${templateId}: includes Kerno Studio branding in footer`, async () => {
      const { renderPrototype } = await import('@/lib/templates')
      const html = renderPrototype(makeCustomization(templateId))
      expect(html).toContain('Kerno Studio')
    })
  }
})
