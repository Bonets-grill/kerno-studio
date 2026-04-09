import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { TestWrapper } from './i18n-wrapper'

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    nav: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <nav {...props}>{children}</nav>,
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <p {...props}>{children}</p>,
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
}))

// Mock Three.js canvas
vi.mock('next/dynamic', () => ({
  default: () => {
    const MockComponent = () => <div data-testid="particle-field">3D Particles</div>
    MockComponent.displayName = 'MockDynamic'
    return MockComponent
  },
}))

describe('Navbar — Smoke Tests', () => {
  it('renders brand name', async () => {
    const Navbar = (await import('@/components/landing/Navbar')).default
    render(<Navbar />, { wrapper: TestWrapper })
    expect(screen.getByText('K')).toBeInTheDocument()
    expect(screen.getByText('Studio')).toBeInTheDocument()
  })

  it('renders all navigation links', async () => {
    const Navbar = (await import('@/components/landing/Navbar')).default
    render(<Navbar />, { wrapper: TestWrapper })
    expect(screen.getByText('Proceso')).toBeInTheDocument()
    expect(screen.getByText('Casos')).toBeInTheDocument()
    expect(screen.getByText('Pricing')).toBeInTheDocument()
  })

  it('renders CTA button', async () => {
    const Navbar = (await import('@/components/landing/Navbar')).default
    render(<Navbar />, { wrapper: TestWrapper })
    expect(screen.getAllByText('Empezar gratis').length).toBeGreaterThan(0)
  })

  it('has mobile hamburger button', async () => {
    const Navbar = (await import('@/components/landing/Navbar')).default
    render(<Navbar />, { wrapper: TestWrapper })
    expect(screen.getByLabelText('Menu')).toBeInTheDocument()
  })

  it('toggles mobile menu on click', async () => {
    const Navbar = (await import('@/components/landing/Navbar')).default
    render(<Navbar />, { wrapper: TestWrapper })
    const menuBtn = screen.getByLabelText('Menu')
    fireEvent.click(menuBtn)
    // Mobile menu shows duplicated links
    const procesoLinks = screen.getAllByText('Proceso')
    expect(procesoLinks.length).toBeGreaterThanOrEqual(2)
  })
})

describe('Typewriter — Smoke Tests', () => {
  it('renders initial text', async () => {
    const Typewriter = (await import('@/components/landing/Typewriter')).default
    render(<Typewriter />, { wrapper: TestWrapper })
    // Should show cursor
    expect(screen.getByText('|')).toBeInTheDocument()
  })

  it('starts typing first phrase', async () => {
    const Typewriter = (await import('@/components/landing/Typewriter')).default
    render(<Typewriter />, { wrapper: TestWrapper })
    // After some time, should have partial text
    await waitFor(
      () => {
        const container = screen.getByText('|').parentElement
        expect(container?.textContent?.length).toBeGreaterThan(1)
      },
      { timeout: 2000 }
    )
  })
})

describe('HeroSection — Smoke Tests', () => {
  it('renders hero badge', async () => {
    const HeroSection = (await import('@/components/landing/HeroSection')).default
    render(<HeroSection />, { wrapper: TestWrapper })
    expect(screen.getByText('Prototipo gratis en 24h')).toBeInTheDocument()
  })

  it('renders hero description', async () => {
    const HeroSection = (await import('@/components/landing/HeroSection')).default
    render(<HeroSection />, { wrapper: TestWrapper })
    expect(screen.getByText(/presentaciones premium/i)).toBeInTheDocument()
  })

  it('renders both CTA buttons', async () => {
    const HeroSection = (await import('@/components/landing/HeroSection')).default
    render(<HeroSection />, { wrapper: TestWrapper })
    expect(screen.getByText(/Describe tu idea/)).toBeInTheDocument()
    expect(screen.getByText(/Ver cómo funciona/)).toBeInTheDocument()
  })

  it('renders stats row', async () => {
    const HeroSection = (await import('@/components/landing/HeroSection')).default
    render(<HeroSection />, { wrapper: TestWrapper })
    expect(screen.getByText('48h')).toBeInTheDocument()
    expect(screen.getByText('100%')).toBeInTheDocument()
    expect(screen.getByText('0€')).toBeInTheDocument()
  })

  it('CTA links point to correct anchors', async () => {
    const HeroSection = (await import('@/components/landing/HeroSection')).default
    render(<HeroSection />, { wrapper: TestWrapper })
    const chatLink = screen.getByText(/Describe tu idea/).closest('a')
    expect(chatLink?.getAttribute('href')).toBe('#chat')
    const processLink = screen.getByText(/Ver cómo funciona/).closest('a')
    expect(processLink?.getAttribute('href')).toBe('#proceso')
  })
})

describe('ProcessSection — Smoke Tests', () => {
  it('renders section title', async () => {
    const ProcessSection = (await import('@/components/landing/ProcessSection')).default
    render(<ProcessSection />, { wrapper: TestWrapper })
    expect(screen.getByText('Cómo', { exact: false })).toBeInTheDocument()
  })

  it('renders all 4 steps', async () => {
    const ProcessSection = (await import('@/components/landing/ProcessSection')).default
    render(<ProcessSection />, { wrapper: TestWrapper })
    expect(screen.getByText('Describe tu idea')).toBeInTheDocument()
    expect(screen.getByText('Prototipo IA gratis')).toBeInTheDocument()
    expect(screen.getByText('Aprueba y paga')).toBeInTheDocument()
    expect(screen.getByText('Lo construimos')).toBeInTheDocument()
  })

  it('renders step numbers', async () => {
    const ProcessSection = (await import('@/components/landing/ProcessSection')).default
    render(<ProcessSection />, { wrapper: TestWrapper })
    expect(screen.getByText('01')).toBeInTheDocument()
    expect(screen.getByText('02')).toBeInTheDocument()
    expect(screen.getByText('03')).toBeInTheDocument()
    expect(screen.getByText('04')).toBeInTheDocument()
  })

  it('has correct section id', async () => {
    const ProcessSection = (await import('@/components/landing/ProcessSection')).default
    const { container } = render(<ProcessSection />, { wrapper: TestWrapper })
    expect(container.querySelector('#proceso')).toBeInTheDocument()
  })
})

describe('CasesSection — Smoke Tests', () => {
  it('renders section title', async () => {
    const CasesSection = (await import('@/components/landing/CasesSection')).default
    render(<CasesSection />, { wrapper: TestWrapper })
    expect(screen.getByText(/cobran vida/)).toBeInTheDocument()
  })

  it('renders case studies including presentations', async () => {
    const CasesSection = (await import('@/components/landing/CasesSection')).default
    render(<CasesSection />, { wrapper: TestWrapper })
    expect(screen.getByText('RestoPro')).toBeInTheDocument()
    expect(screen.getByText('FitTrack')).toBeInTheDocument()
    expect(screen.getByText('LegalBot')).toBeInTheDocument()
    expect(screen.getByText('EcoCharge Pitch')).toBeInTheDocument()
    expect(screen.getByText('Propuesta TechCo')).toBeInTheDocument()
    expect(screen.getByText('Tesis Energías')).toBeInTheDocument()
  })

  it('renders project types including presentations', async () => {
    const CasesSection = (await import('@/components/landing/CasesSection')).default
    render(<CasesSection />, { wrapper: TestWrapper })
    expect(screen.getByText('SaaS')).toBeInTheDocument()
    expect(screen.getByText('App')).toBeInTheDocument()
    expect(screen.getByText('MVP')).toBeInTheDocument()
    expect(screen.getAllByText('Pitch Deck').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Propuesta Comercial').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/Trabajo/).length).toBeGreaterThanOrEqual(1)
  })

  it('renders tech tags', async () => {
    const CasesSection = (await import('@/components/landing/CasesSection')).default
    render(<CasesSection />, { wrapper: TestWrapper })
    expect(screen.getByText('Next.js')).toBeInTheDocument()
    expect(screen.getByText('Supabase')).toBeInTheDocument()
    expect(screen.getByText('Claude AI')).toBeInTheDocument()
  })

  it('has correct section id', async () => {
    const CasesSection = (await import('@/components/landing/CasesSection')).default
    const { container } = render(<CasesSection />, { wrapper: TestWrapper })
    expect(container.querySelector('#casos')).toBeInTheDocument()
  })
})

describe('StatsSection — Smoke Tests', () => {
  it('renders all 4 stat labels', async () => {
    const StatsSection = (await import('@/components/landing/StatsSection')).default
    render(<StatsSection />, { wrapper: TestWrapper })
    expect(screen.getByText('Proyectos entregados')).toBeInTheDocument()
    expect(screen.getByText('Clientes satisfechos')).toBeInTheDocument()
    expect(screen.getByText('Prototipo listo')).toBeInTheDocument()
    expect(screen.getByText('Más rápido que agencias')).toBeInTheDocument()
  })
})

describe('PricingSection — Smoke Tests', () => {
  it('renders section title', async () => {
    const PricingSection = (await import('@/components/landing/PricingSection')).default
    render(<PricingSection />, { wrapper: TestWrapper })
    expect(screen.getByText(/transparentes/)).toBeInTheDocument()
  })

  it('renders all 3 plans', async () => {
    const PricingSection = (await import('@/components/landing/PricingSection')).default
    render(<PricingSection />, { wrapper: TestWrapper })
    expect(screen.getByText('Landing Page')).toBeInTheDocument()
    expect(screen.getByText('MVP / App')).toBeInTheDocument()
    expect(screen.getByText('Sistema / SaaS')).toBeInTheDocument()
  })

  it('renders prices', async () => {
    const PricingSection = (await import('@/components/landing/PricingSection')).default
    render(<PricingSection />, { wrapper: TestWrapper })
    expect(screen.getByText('Desde 990€')).toBeInTheDocument()
    expect(screen.getByText('Desde 2.990€')).toBeInTheDocument()
    expect(screen.getByText('Desde 7.990€')).toBeInTheDocument()
  })

  it('marks MVP plan as popular', async () => {
    const PricingSection = (await import('@/components/landing/PricingSection')).default
    render(<PricingSection />, { wrapper: TestWrapper })
    expect(screen.getByText('Popular')).toBeInTheDocument()
  })

  it('renders CTA buttons for all plans', async () => {
    const PricingSection = (await import('@/components/landing/PricingSection')).default
    render(<PricingSection />, { wrapper: TestWrapper })
    const ctas = screen.getAllByText('Empezar ahora')
    expect(ctas).toHaveLength(3)
  })

  it('has correct section id', async () => {
    const PricingSection = (await import('@/components/landing/PricingSection')).default
    const { container } = render(<PricingSection />, { wrapper: TestWrapper })
    expect(container.querySelector('#pricing')).toBeInTheDocument()
  })

  it('lists features for each plan', async () => {
    const PricingSection = (await import('@/components/landing/PricingSection')).default
    render(<PricingSection />, { wrapper: TestWrapper })
    expect(screen.getByText('Diseño personalizado')).toBeInTheDocument()
    expect(screen.getByText('Auth y base de datos')).toBeInTheDocument()
    expect(screen.getByText('Multi-tenant / multi-rol')).toBeInTheDocument()
  })
})

describe('ChatPreview — Smoke Tests', () => {
  it('renders chat section title', async () => {
    const ChatPreview = (await import('@/components/landing/ChatPreview')).default
    render(<ChatPreview />, { wrapper: TestWrapper })
    expect(screen.getByText(/Cuéntanos tu/)).toBeInTheDocument()
  })

  it('renders chat header with online indicator', async () => {
    const ChatPreview = (await import('@/components/landing/ChatPreview')).default
    render(<ChatPreview />, { wrapper: TestWrapper })
    expect(screen.getByText('Kerno Studio AI')).toBeInTheDocument()
  })

  it('renders empty state message', async () => {
    const ChatPreview = (await import('@/components/landing/ChatPreview')).default
    render(<ChatPreview />, { wrapper: TestWrapper })
    expect(screen.getByText(/soy el asistente/)).toBeInTheDocument()
  })

  it('renders input and send button', async () => {
    const ChatPreview = (await import('@/components/landing/ChatPreview')).default
    render(<ChatPreview />, { wrapper: TestWrapper })
    expect(screen.getByPlaceholderText(/sistema para mi/i)).toBeInTheDocument()
    expect(screen.getByText('Enviar')).toBeInTheDocument()
  })

  it('send button is disabled when input is empty', async () => {
    const ChatPreview = (await import('@/components/landing/ChatPreview')).default
    render(<ChatPreview />, { wrapper: TestWrapper })
    const sendBtn = screen.getByText('Enviar')
    expect(sendBtn).toBeDisabled()
  })

  it('allows typing a message', async () => {
    const ChatPreview = (await import('@/components/landing/ChatPreview')).default
    render(<ChatPreview />, { wrapper: TestWrapper })
    const input = screen.getByPlaceholderText(/sistema para mi/i)
    fireEvent.change(input, { target: { value: 'Quiero una app de reservas' } })
    expect(input).toHaveValue('Quiero una app de reservas')
    expect(screen.getByText('Enviar')).not.toBeDisabled()
  })

  it('sends message and shows user bubble', async () => {
    const ChatPreview = (await import('@/components/landing/ChatPreview')).default
    render(<ChatPreview />, { wrapper: TestWrapper })
    const input = screen.getByPlaceholderText(/sistema para mi/i)
    fireEvent.change(input, { target: { value: 'Quiero un CRM' } })
    fireEvent.submit(input.closest('form')!)
    expect(screen.getByText('Quiero un CRM')).toBeInTheDocument()
    // Input should be cleared
    expect(input).toHaveValue('')
  })

  it('shows loading dots after sending', async () => {
    const ChatPreview = (await import('@/components/landing/ChatPreview')).default
    const { container } = render(<ChatPreview />, { wrapper: TestWrapper })
    const input = screen.getByPlaceholderText(/sistema para mi/i)
    fireEvent.change(input, { target: { value: 'Test' } })
    fireEvent.submit(input.closest('form')!)
    // Loading dots should appear
    const dots = container.querySelectorAll('.animate-bounce')
    expect(dots.length).toBe(3)
  })

  it('shows assistant response after delay', async () => {
    const ChatPreview = (await import('@/components/landing/ChatPreview')).default
    render(<ChatPreview />, { wrapper: TestWrapper })
    const input = screen.getByPlaceholderText(/sistema para mi/i)
    fireEvent.change(input, { target: { value: 'Test' } })
    fireEvent.submit(input.closest('form')!)
    await waitFor(
      () => {
        expect(screen.getByText(/Interesante proyecto/)).toBeInTheDocument()
      },
      { timeout: 3000 }
    )
  })

  it('has correct section id', async () => {
    const ChatPreview = (await import('@/components/landing/ChatPreview')).default
    const { container } = render(<ChatPreview />, { wrapper: TestWrapper })
    expect(container.querySelector('#chat')).toBeInTheDocument()
  })
})

describe('Footer — Smoke Tests', () => {
  it('renders brand', async () => {
    const Footer = (await import('@/components/landing/Footer')).default
    render(<Footer />, { wrapper: TestWrapper })
    expect(screen.getByText('K')).toBeInTheDocument()
    expect(screen.getByText('Studio')).toBeInTheDocument()
  })

  it('renders product links', async () => {
    const Footer = (await import('@/components/landing/Footer')).default
    render(<Footer />, { wrapper: TestWrapper })
    expect(screen.getByText('Proceso')).toBeInTheDocument()
    expect(screen.getByText('Casos')).toBeInTheDocument()
    expect(screen.getByText('Pricing')).toBeInTheDocument()
    expect(screen.getByText('Empezar')).toBeInTheDocument()
  })

  it('renders legal links', async () => {
    const Footer = (await import('@/components/landing/Footer')).default
    render(<Footer />, { wrapper: TestWrapper })
    expect(screen.getByText('Privacidad')).toBeInTheDocument()
    expect(screen.getByText('Términos')).toBeInTheDocument()
    expect(screen.getByText('Cookies')).toBeInTheDocument()
  })

  it('renders copyright with current year', async () => {
    const Footer = (await import('@/components/landing/Footer')).default
    render(<Footer />, { wrapper: TestWrapper })
    const year = new Date().getFullYear().toString()
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument()
  })

  it('renders Canarias tagline', async () => {
    const Footer = (await import('@/components/landing/Footer')).default
    render(<Footer />, { wrapper: TestWrapper })
    expect(screen.getByText(/Canarias/)).toBeInTheDocument()
  })

  it('legal links point to correct paths', async () => {
    const Footer = (await import('@/components/landing/Footer')).default
    render(<Footer />, { wrapper: TestWrapper })
    const privacyLink = screen.getByText('Privacidad').closest('a')
    expect(privacyLink?.getAttribute('href')).toBe('/legal/privacy')
    const termsLink = screen.getByText('Términos').closest('a')
    expect(termsLink?.getAttribute('href')).toBe('/legal/terms')
  })
})
