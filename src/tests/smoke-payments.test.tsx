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

vi.stubEnv('STRIPE_SECRET_KEY', 'sk_test_123')
vi.stubEnv('STRIPE_WEBHOOK_SECRET', 'whsec_test')

describe('Stripe Checkout API', () => {
  it('exports POST handler', async () => {
    const mod = await import('@/app/api/stripe/checkout/route')
    expect(typeof mod.POST).toBe('function')
  })
})

describe('Stripe Webhook API', () => {
  it('exports POST handler', async () => {
    const mod = await import('@/app/api/stripe/webhook/route')
    expect(typeof mod.POST).toBe('function')
  })

  it('rejects missing signature', async () => {
    const { POST } = await import('@/app/api/stripe/webhook/route')
    const req = new Request('http://localhost/api/stripe/webhook', {
      method: 'POST',
      body: '{}',
      headers: {},
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
    const data = await res.json() as { error: string }
    expect(data.error).toBe('Missing signature')
  })
})

describe('ProposalCard Component', () => {
  const mockSummary = {
    name: 'TestApp',
    type: 'saas' as const,
    description: 'A test SaaS platform',
    features: ['Auth', 'Dashboard'],
    tech_requirements: ['Next.js'],
    estimated_modules: [
      { name: 'Auth Module', description: 'Login/registro', price: 500, days: 3 },
      { name: 'Dashboard', description: 'Main panel', price: 800, days: 5 },
    ],
    total_price: 1300,
    timeline_days: 8,
  }

  it('renders project name and type', async () => {
    const ProposalCard = (await import('@/components/prototype/ProposalCard')).default
    render(<ProposalCard summary={mockSummary} />)
    expect(screen.getByText('TestApp')).toBeInTheDocument()
    expect(screen.getByText('saas')).toBeInTheDocument()
  })

  it('renders module breakdown', async () => {
    const ProposalCard = (await import('@/components/prototype/ProposalCard')).default
    render(<ProposalCard summary={mockSummary} />)
    expect(screen.getByText('Auth Module')).toBeInTheDocument()
    expect(screen.getByText('500€')).toBeInTheDocument()
    expect(screen.getByText('800€')).toBeInTheDocument()
  })

  it('calculates 50/50 split correctly', async () => {
    const ProposalCard = (await import('@/components/prototype/ProposalCard')).default
    render(<ProposalCard summary={mockSummary} />)
    // Deposit = 650 and final = 650 both shown
    const matches = screen.getAllByText(/650/)
    expect(matches.length).toBeGreaterThanOrEqual(2)
  })

  it('renders total price', async () => {
    const ProposalCard = (await import('@/components/prototype/ProposalCard')).default
    const { container } = render(<ProposalCard summary={mockSummary} />)
    // Total 1300 rendered somewhere
    expect(container.textContent).toContain('1,300')
  })

  it('renders timeline', async () => {
    const ProposalCard = (await import('@/components/prototype/ProposalCard')).default
    render(<ProposalCard summary={mockSummary} />)
    expect(screen.getByText(/8 días/)).toBeInTheDocument()
  })

  it('renders terms checkbox', async () => {
    const ProposalCard = (await import('@/components/prototype/ProposalCard')).default
    render(<ProposalCard summary={mockSummary} />)
    expect(screen.getByText(/términos y condiciones/)).toBeInTheDocument()
  })

  it('pay button disabled until terms accepted', async () => {
    const ProposalCard = (await import('@/components/prototype/ProposalCard')).default
    render(<ProposalCard summary={mockSummary} customerEmail="test@test.com" />)
    const payBtn = screen.getByText(/Pagar depósito/)
    expect(payBtn).toBeDisabled()
  })

  it('pay button enables after accepting terms', async () => {
    const ProposalCard = (await import('@/components/prototype/ProposalCard')).default
    render(<ProposalCard summary={mockSummary} customerEmail="test@test.com" />)
    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)
    const payBtn = screen.getByText(/Pagar depósito/)
    expect(payBtn).not.toBeDisabled()
  })

  it('renders Stripe security note', async () => {
    const ProposalCard = (await import('@/components/prototype/ProposalCard')).default
    render(<ProposalCard summary={mockSummary} />)
    expect(screen.getByText(/Pago seguro con Stripe/)).toBeInTheDocument()
  })
})

describe('Payment Pages', () => {
  it('success page renders confirmation', async () => {
    const PaymentSuccess = (await import('@/app/payment/success/page')).default
    render(<PaymentSuccess />)
    expect(screen.getByText('Pago confirmado')).toBeInTheDocument()
    expect(screen.getByText('Volver al inicio')).toBeInTheDocument()
  })

  it('cancel page renders cancellation', async () => {
    const PaymentCancel = (await import('@/app/payment/cancel/page')).default
    render(<PaymentCancel />)
    expect(screen.getByText('Pago cancelado')).toBeInTheDocument()
    expect(screen.getByText('Volver al inicio')).toBeInTheDocument()
  })

  it('success page links to home', async () => {
    const PaymentSuccess = (await import('@/app/payment/success/page')).default
    render(<PaymentSuccess />)
    const link = screen.getByText('Volver al inicio').closest('a')
    expect(link?.getAttribute('href')).toBe('/')
  })
})
