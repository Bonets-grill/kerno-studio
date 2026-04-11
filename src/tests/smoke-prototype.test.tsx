import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

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

describe('Prototype Prompt Builder', () => {
  it('builds prompt with summary data', async () => {
    const { buildPrototypePrompt } = await import('@/lib/prototype-prompt')
    const summary = {
      name: 'TestApp',
      type: 'saas' as const,
      description: 'A test SaaS',
      features: ['Auth', 'Dashboard'],
      tech_requirements: ['Next.js'],
      estimated_modules: [],
      total_price: 1000,
      timeline_days: 10,
    }

    const prompt = buildPrototypePrompt(summary)
    expect(prompt).toContain('TestApp')
    expect(prompt).toContain('saas')
    expect(prompt).toContain('Auth, Dashboard')
    expect(prompt).toContain('#00f0ff') // default color
  })

  it('uses custom branding', async () => {
    const { buildPrototypePrompt } = await import('@/lib/prototype-prompt')
    const summary = {
      name: 'TestApp',
      type: 'mvp' as const,
      description: 'Test',
      features: ['Auth'],
      tech_requirements: [],
      estimated_modules: [],
      total_price: 500,
      timeline_days: 5,
    }

    const prompt = buildPrototypePrompt(summary, {
      primaryColor: '#ff0000',
      companyName: 'MyCorp',
      logo: 'https://example.com/logo.png',
    })
    expect(prompt).toContain('#ff0000')
    expect(prompt).toContain('MyCorp')
  })

  it('prompt requires JSON output format', async () => {
    const { buildPrototypePrompt } = await import('@/lib/prototype-prompt')
    const summary = {
      name: 'X',
      type: 'landing' as const,
      description: 'X',
      features: [],
      tech_requirements: [],
      estimated_modules: [],
      total_price: 0,
      timeline_days: 0,
    }
    const prompt = buildPrototypePrompt(summary)
    expect(prompt).toContain('"slug"')
    expect(prompt).toContain('"html"')
    expect(prompt).toContain('"name"')
  })
})

describe('Prototype API Route', () => {
  it('exports POST handler', async () => {
    vi.stubEnv('ANTHROPIC_API_KEY', 'sk-ant-test')
    const mod = await import('@/app/api/prototype/route')
    expect(typeof mod.POST).toBe('function')
  })
})

describe('PrototypeViewer Component', () => {
  const mockPages = [
    { name: 'Home', slug: 'home', html: '<h1>Home Page</h1>', order: 0 },
    { name: 'Dashboard', slug: 'dashboard', html: '<h1>Dashboard</h1>', order: 1 },
    { name: 'Settings', slug: 'settings', html: '<h1>Settings</h1>', order: 2 },
  ]

  it('renders page tabs', async () => {
    const PrototypeViewer = (await import('@/components/prototype/PrototypeViewer')).default
    render(<PrototypeViewer pages={mockPages} projectName="TestApp" />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
  })

  it('renders URL bar with project name', async () => {
    const PrototypeViewer = (await import('@/components/prototype/PrototypeViewer')).default
    render(<PrototypeViewer pages={mockPages} projectName="TestApp" />)
    expect(screen.getByText(/testapp.kerno.studio/)).toBeInTheDocument()
  })

  it('renders page counter', async () => {
    const PrototypeViewer = (await import('@/components/prototype/PrototypeViewer')).default
    render(<PrototypeViewer pages={mockPages} projectName="TestApp" />)
    expect(screen.getByText(/Página 1 de 3/)).toBeInTheDocument()
  })

  it('switches pages on tab click', async () => {
    const PrototypeViewer = (await import('@/components/prototype/PrototypeViewer')).default
    render(<PrototypeViewer pages={mockPages} projectName="TestApp" />)
    fireEvent.click(screen.getByText('Settings'))
    expect(screen.getByText(/Página 3 de 3/)).toBeInTheDocument()
    expect(screen.getByText(/settings/)).toBeInTheDocument()
  })

  it('renders view mode toggles', async () => {
    const PrototypeViewer = (await import('@/components/prototype/PrototypeViewer')).default
    render(<PrototypeViewer pages={mockPages} projectName="TestApp" />)
    // Desktop, tablet, mobile icons
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThanOrEqual(3)
  })

  it('renders approve and change buttons when callbacks provided', async () => {
    const PrototypeViewer = (await import('@/components/prototype/PrototypeViewer')).default
    const onApprove = vi.fn()
    const onRequestChanges = vi.fn()
    render(
      <PrototypeViewer
        pages={mockPages}
        projectName="TestApp"
        onApprove={onApprove}
        onRequestChanges={onRequestChanges}
      />
    )
    expect(screen.getByText('Me gusta, aprobar')).toBeInTheDocument()
    expect(screen.getByText('Cambiar cosas')).toBeInTheDocument()
  })

  it('calls onApprove when clicking approve', async () => {
    const PrototypeViewer = (await import('@/components/prototype/PrototypeViewer')).default
    const onApprove = vi.fn()
    render(<PrototypeViewer pages={mockPages} projectName="TestApp" onApprove={onApprove} />)
    fireEvent.click(screen.getByText('Me gusta, aprobar'))
    expect(onApprove).toHaveBeenCalledOnce()
  })

  it('returns null for empty pages', async () => {
    const PrototypeViewer = (await import('@/components/prototype/PrototypeViewer')).default
    const { container } = render(<PrototypeViewer pages={[]} projectName="TestApp" />)
    expect(container.innerHTML).toBe('')
  })

  it('renders iframe with page HTML', async () => {
    const PrototypeViewer = (await import('@/components/prototype/PrototypeViewer')).default
    const { container } = render(<PrototypeViewer pages={mockPages} projectName="TestApp" />)
    const iframe = container.querySelector('iframe')
    expect(iframe).toBeTruthy()
    expect(iframe?.getAttribute('srcDoc')).toBe('<h1>Home Page</h1>')
  })
})

describe('PrototypeGenerator Component', () => {
  const mockSummary = {
    name: 'TestApp',
    type: 'saas' as const,
    description: 'Test',
    features: ['Auth'],
    tech_requirements: ['Next.js'],
    estimated_modules: [],
    total_price: 1000,
    timeline_days: 10,
  }

  it('renders branding form', async () => {
    const PrototypeGenerator = (await import('@/components/prototype/PrototypeGenerator')).default
    render(<PrototypeGenerator summary={mockSummary} />)
    expect(screen.getByLabelText(/Nombre del proyecto/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Color principal/)).toBeInTheDocument()
  })

  it('renders generate button', async () => {
    const PrototypeGenerator = (await import('@/components/prototype/PrototypeGenerator')).default
    render(<PrototypeGenerator summary={mockSummary} />)
    expect(screen.getByText('Generar Prototipo')).toBeInTheDocument()
  })

  it('pre-fills project name from summary', async () => {
    const PrototypeGenerator = (await import('@/components/prototype/PrototypeGenerator')).default
    render(<PrototypeGenerator summary={mockSummary} />)
    const input = screen.getByLabelText(/Nombre del proyecto/) as HTMLInputElement
    expect(input.value).toBe('TestApp')
  })

  it('allows changing project name', async () => {
    const PrototypeGenerator = (await import('@/components/prototype/PrototypeGenerator')).default
    render(<PrototypeGenerator summary={mockSummary} />)
    const input = screen.getByLabelText(/Nombre del proyecto/)
    fireEvent.change(input, { target: { value: 'NewName' } })
    expect(input).toHaveValue('NewName')
  })
})
