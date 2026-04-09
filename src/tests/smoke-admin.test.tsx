import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('next/navigation', () => ({
  usePathname: () => '/admin',
  useRouter: () => ({ push: vi.fn() }),
}))

vi.mock('@anthropic-ai/sdk', () => {
  class M { messages = { create: vi.fn() }; constructor() {} }
  return { default: M }
})

describe('Admin Layout', () => {
  it('renders sidebar nav items', async () => {
    const AdminLayout = (await import('@/app/(admin)/layout')).default
    render(<AdminLayout><div>test</div></AdminLayout>)
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Pipeline')).toBeInTheDocument()
    expect(screen.getByText('Leads')).toBeInTheDocument()
    expect(screen.getByText('Prototipos')).toBeInTheDocument()
    expect(screen.getByText('Pagos')).toBeInTheDocument()
  })

  it('renders ADMIN badge', async () => {
    const AdminLayout = (await import('@/app/(admin)/layout')).default
    render(<AdminLayout><div>test</div></AdminLayout>)
    expect(screen.getByText('ADMIN')).toBeInTheDocument()
  })

  it('renders title', async () => {
    const AdminLayout = (await import('@/app/(admin)/layout')).default
    render(<AdminLayout><div>test</div></AdminLayout>)
    expect(screen.getByText('Panel de Administración')).toBeInTheDocument()
  })
})

describe('Admin Dashboard', () => {
  it('renders stats', async () => {
    const Dashboard = (await import('@/app/(admin)/admin/page')).default
    render(<Dashboard />)
    expect(screen.getByText('Leads totales')).toBeInTheDocument()
    expect(screen.getAllByText('47').length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText('Proyectos activos')).toBeInTheDocument()
  })

  it('renders conversion funnel', async () => {
    const Dashboard = (await import('@/app/(admin)/admin/page')).default
    render(<Dashboard />)
    expect(screen.getByText('Embudo de Conversión')).toBeInTheDocument()
    expect(screen.getByText('Entregados')).toBeInTheDocument()
  })

  it('renders recent leads table', async () => {
    const Dashboard = (await import('@/app/(admin)/admin/page')).default
    render(<Dashboard />)
    expect(screen.getByText('Leads Recientes')).toBeInTheDocument()
    expect(screen.getByText('María García')).toBeInTheDocument()
    expect(screen.getByText('Laura Sanz')).toBeInTheDocument()
  })
})

describe('Pipeline Page', () => {
  it('renders kanban columns', async () => {
    const Pipeline = (await import('@/app/(admin)/admin/pipeline/page')).default
    render(<Pipeline />)
    expect(screen.getByText('Nuevos')).toBeInTheDocument()
    expect(screen.getByText('Chateando')).toBeInTheDocument()
    expect(screen.getByText('Prototipo Enviado')).toBeInTheDocument()
    expect(screen.getByText('Aprobado')).toBeInTheDocument()
    expect(screen.getByText('En Desarrollo')).toBeInTheDocument()
  })

  it('renders lead cards', async () => {
    const Pipeline = (await import('@/app/(admin)/admin/pipeline/page')).default
    render(<Pipeline />)
    expect(screen.getByText('Laura Sanz')).toBeInTheDocument()
    expect(screen.getByText('Pedro Ruiz')).toBeInTheDocument()
  })
})

describe('Leads Page', () => {
  it('renders all leads', async () => {
    const Leads = (await import('@/app/(admin)/admin/leads/page')).default
    render(<Leads />)
    expect(screen.getByText('Laura Sanz')).toBeInTheDocument()
    expect(screen.getByText('María García')).toBeInTheDocument()
    expect(screen.getByText('Pedro Ruiz')).toBeInTheDocument()
  })

  it('renders total count', async () => {
    const Leads = (await import('@/app/(admin)/admin/leads/page')).default
    render(<Leads />)
    expect(screen.getByText('6')).toBeInTheDocument()
  })
})

describe('Prototypes Page', () => {
  it('renders prototype cards', async () => {
    const Prototypes = (await import('@/app/(admin)/admin/prototypes/page')).default
    render(<Prototypes />)
    expect(screen.getByText('RestoCRM')).toBeInTheDocument()
    expect(screen.getByText('FitApp')).toBeInTheDocument()
  })

  it('renders page counts', async () => {
    const Prototypes = (await import('@/app/(admin)/admin/prototypes/page')).default
    render(<Prototypes />)
    expect(screen.getByText('6 páginas')).toBeInTheDocument()
    expect(screen.getByText('5 páginas')).toBeInTheDocument()
  })
})

describe('Payments Page', () => {
  it('renders payment summary', async () => {
    const Payments = (await import('@/app/(admin)/admin/payments/page')).default
    render(<Payments />)
    expect(screen.getByText('Recibido')).toBeInTheDocument()
    expect(screen.getAllByText(/Pendiente/).length).toBeGreaterThanOrEqual(1)
  })

  it('renders payments table', async () => {
    const Payments = (await import('@/app/(admin)/admin/payments/page')).default
    render(<Payments />)
    expect(screen.getAllByText(/Pedro Ruiz/).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/Sofía Díaz/).length).toBeGreaterThanOrEqual(1)
  })
})
