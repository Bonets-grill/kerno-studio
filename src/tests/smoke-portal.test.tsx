import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/portal',
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), back: vi.fn() }),
}))

vi.mock('@anthropic-ai/sdk', () => {
  class MockAnthropic { messages = { create: vi.fn() }; constructor() {} }
  return { default: MockAnthropic }
})

vi.mock('groq-sdk', () => {
  class MockGroq {
    chat = { completions: { create: vi.fn() } }
    constructor() {}
  }
  return { default: MockGroq }
})

describe('Portal Layout', () => {
  it('renders sidebar with nav items', async () => {
    const PortalLayout = (await import('@/app/(portal)/layout')).default
    render(<PortalLayout><div>content</div></PortalLayout>)
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Progreso')).toBeInTheDocument()
    expect(screen.getByText('Preview')).toBeInTheDocument()
    expect(screen.getByText('Mensajes')).toBeInTheDocument()
    expect(screen.getByText('Documentos')).toBeInTheDocument()
    expect(screen.getByText('Ajustes')).toBeInTheDocument()
  })

  it('renders brand logo', async () => {
    const PortalLayout = (await import('@/app/(portal)/layout')).default
    render(<PortalLayout><div>test</div></PortalLayout>)
    expect(screen.getByText('K')).toBeInTheDocument()
    expect(screen.getByText('Studio')).toBeInTheDocument()
  })

  it('renders top bar with title', async () => {
    const PortalLayout = (await import('@/app/(portal)/layout')).default
    render(<PortalLayout><div>test</div></PortalLayout>)
    expect(screen.getByText('Portal del Cliente')).toBeInTheDocument()
  })

  it('renders children', async () => {
    const PortalLayout = (await import('@/app/(portal)/layout')).default
    render(<PortalLayout><div data-testid="child">Hello</div></PortalLayout>)
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })

  it('has mobile menu toggle', async () => {
    const PortalLayout = (await import('@/app/(portal)/layout')).default
    render(<PortalLayout><div>test</div></PortalLayout>)
    expect(screen.getByLabelText('Open sidebar')).toBeInTheDocument()
  })
})

describe('Portal Dashboard', () => {
  it('renders project name', async () => {
    const Dashboard = (await import('@/app/(portal)/portal/page')).default
    render(<Dashboard />)
    expect(screen.getByText('Mi Proyecto SaaS')).toBeInTheDocument()
  })

  it('renders progress bar', async () => {
    const Dashboard = (await import('@/app/(portal)/portal/page')).default
    render(<Dashboard />)
    expect(screen.getByText('65%')).toBeInTheDocument()
  })

  it('renders payment status', async () => {
    const Dashboard = (await import('@/app/(portal)/portal/page')).default
    render(<Dashboard />)
    expect(screen.getByText('Pagado')).toBeInTheDocument()
    expect(screen.getByText('A la entrega')).toBeInTheDocument()
  })

  it('renders recent activity', async () => {
    const Dashboard = (await import('@/app/(portal)/portal/page')).default
    render(<Dashboard />)
    expect(screen.getByText('Módulo Auth completado')).toBeInTheDocument()
    expect(screen.getByText('Proyecto iniciado')).toBeInTheDocument()
  })
})

describe('Progress Page', () => {
  it('renders all modules', async () => {
    const Progress = (await import('@/app/(portal)/portal/progress/page')).default
    render(<Progress />)
    expect(screen.getByText('Auth & Registro')).toBeInTheDocument()
    expect(screen.getByText('Dashboard Principal')).toBeInTheDocument()
    expect(screen.getByText('API & Integraciones')).toBeInTheDocument()
  })

  it('renders module statuses', async () => {
    const Progress = (await import('@/app/(portal)/portal/progress/page')).default
    render(<Progress />)
    expect(screen.getByText('Completado')).toBeInTheDocument()
    expect(screen.getAllByText('En progreso').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Pendiente').length).toBeGreaterThanOrEqual(1)
  })
})

describe('Preview Page', () => {
  it('renders view mode toggles', async () => {
    const Preview = (await import('@/app/(portal)/portal/preview/page')).default
    render(<Preview />)
    expect(screen.getByText('Desktop')).toBeInTheDocument()
    expect(screen.getByText('Tablet')).toBeInTheDocument()
    expect(screen.getByText('Mobile')).toBeInTheDocument()
  })

  it('renders staging placeholder', async () => {
    const Preview = (await import('@/app/(portal)/portal/preview/page')).default
    render(<Preview />)
    expect(screen.getByText('Preview de staging')).toBeInTheDocument()
  })
})

describe('Messages Page', () => {
  it('renders chat messages', async () => {
    const Messages = (await import('@/app/(portal)/portal/messages/page')).default
    render(<Messages />)
    expect(screen.getByText(/login con email/)).toBeInTheDocument()
    expect(screen.getByText(/Auth completado/)).toBeInTheDocument()
  })

  it('allows sending a message', async () => {
    const Messages = (await import('@/app/(portal)/portal/messages/page')).default
    render(<Messages />)
    const input = screen.getByPlaceholderText(/Escribe un mensaje/)
    fireEvent.change(input, { target: { value: 'Hola equipo' } })
    fireEvent.submit(input.closest('form')!)
    expect(screen.getByText('Hola equipo')).toBeInTheDocument()
  })
})

describe('Documents Page', () => {
  it('renders all documents', async () => {
    const Documents = (await import('@/app/(portal)/portal/documents/page')).default
    render(<Documents />)
    expect(screen.getByText('Contrato de Desarrollo')).toBeInTheDocument()
    expect(screen.getByText(/Depósito 50%/)).toBeInTheDocument()
    expect(screen.getByText('Resumen del Proyecto')).toBeInTheDocument()
  })

  it('renders document statuses', async () => {
    const Documents = (await import('@/app/(portal)/portal/documents/page')).default
    render(<Documents />)
    expect(screen.getByText('Firmado')).toBeInTheDocument()
    expect(screen.getAllByText('Pagado').length).toBeGreaterThanOrEqual(1)
  })

  it('renders download buttons for available docs', async () => {
    const Documents = (await import('@/app/(portal)/portal/documents/page')).default
    render(<Documents />)
    const buttons = screen.getAllByText('Descargar')
    expect(buttons.length).toBe(3) // all except pending
  })
})

describe('Settings Page', () => {
  it('renders profile fields', async () => {
    const Settings = (await import('@/app/(portal)/portal/settings/page')).default
    render(<Settings />)
    expect(screen.getByLabelText('Nombre')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })

  it('renders notification checkboxes', async () => {
    const Settings = (await import('@/app/(portal)/portal/settings/page')).default
    render(<Settings />)
    expect(screen.getByLabelText(/Actualizaciones de progreso/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Nuevos mensajes/)).toBeInTheDocument()
  })

  it('renders save button', async () => {
    const Settings = (await import('@/app/(portal)/portal/settings/page')).default
    render(<Settings />)
    expect(screen.getByText('Guardar cambios')).toBeInTheDocument()
  })
})
