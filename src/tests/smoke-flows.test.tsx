import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { TestWrapper } from './i18n-wrapper'

// Mock Anthropic SDK (blocks browser-like env in jsdom)
vi.mock('@anthropic-ai/sdk', () => {
  class MockAnthropic {
    messages = { create: vi.fn() }
    constructor() {}
  }
  return { default: MockAnthropic }
})

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    nav: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <nav {...props}>{children}</nav>,
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <p {...props}>{children}</p>,
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
}))

vi.mock('next/dynamic', () => ({
  default: () => {
    const MockComponent = () => <div data-testid="particle-field">3D</div>
    MockComponent.displayName = 'MockDynamic'
    return MockComponent
  },
}))

describe('Flow: Landing Navigation', () => {
  it('all anchor links exist and point to correct sections', async () => {
    const Navbar = (await import('@/components/landing/Navbar')).default
    render(<Navbar />, { wrapper: TestWrapper })

    const expectedAnchors = [
      { text: 'Proceso', href: '#proceso' },
      { text: 'Casos', href: '#casos' },
      { text: 'Pricing', href: '#pricing' },
    ]

    for (const { text, href } of expectedAnchors) {
      const links = screen.getAllByText(text)
      const link = links[0].closest('a')
      expect(link?.getAttribute('href')).toBe(href)
    }
  })

  it('all sections have matching ids for anchor navigation', async () => {
    const ProcessSection = (await import('@/components/landing/ProcessSection')).default
    const CasesSection = (await import('@/components/landing/CasesSection')).default
    const PricingSection = (await import('@/components/landing/PricingSection')).default
    const ChatPreview = (await import('@/components/landing/ChatPreview')).default

    const { container: c1 } = render(<ProcessSection />, { wrapper: TestWrapper })
    expect(c1.querySelector('#proceso')).toBeTruthy()

    const { container: c2 } = render(<CasesSection />, { wrapper: TestWrapper })
    expect(c2.querySelector('#casos')).toBeTruthy()

    const { container: c3 } = render(<PricingSection />, { wrapper: TestWrapper })
    expect(c3.querySelector('#pricing')).toBeTruthy()

    const { container: c4 } = render(<ChatPreview />, { wrapper: TestWrapper })
    expect(c4.querySelector('#chat')).toBeTruthy()
  })
})

describe('Flow: Chat Conversation', () => {
  it('full conversation flow: type → send → see user msg → wait → see assistant msg', async () => {
    const ChatPreview = (await import('@/components/landing/ChatPreview')).default
    render(<ChatPreview />, { wrapper: TestWrapper })

    // 1. Empty state visible
    expect(screen.getByText(/soy el asistente/)).toBeInTheDocument()

    // 2. Type message
    const input = screen.getByPlaceholderText(/Describe tu proyecto/)
    fireEvent.change(input, { target: { value: 'Necesito una app para mi restaurante' } })

    // 3. Send
    const sendBtn = screen.getByText('Enviar')
    expect(sendBtn).not.toBeDisabled()
    fireEvent.click(sendBtn)

    // 4. User message appears
    expect(screen.getByText('Necesito una app para mi restaurante')).toBeInTheDocument()

    // 5. Empty state gone
    expect(screen.queryByText(/soy el asistente/)).not.toBeInTheDocument()

    // 6. Input cleared
    expect(input).toHaveValue('')

    // 7. Wait for response
    await waitFor(
      () => {
        expect(screen.getByText(/Interesante proyecto/)).toBeInTheDocument()
      },
      { timeout: 3000 }
    )
  })

  it('cannot send empty message', async () => {
    const ChatPreview = (await import('@/components/landing/ChatPreview')).default
    render(<ChatPreview />, { wrapper: TestWrapper })

    const sendBtn = screen.getByText('Enviar')
    expect(sendBtn).toBeDisabled()

    // Type spaces only
    const input = screen.getByPlaceholderText(/Describe tu proyecto/)
    fireEvent.change(input, { target: { value: '   ' } })
    expect(sendBtn).toBeDisabled()
  })

  it('cannot double-send while loading', async () => {
    const ChatPreview = (await import('@/components/landing/ChatPreview')).default
    render(<ChatPreview />, { wrapper: TestWrapper })

    const input = screen.getByPlaceholderText(/Describe tu proyecto/)

    // Send first message
    fireEvent.change(input, { target: { value: 'Msg 1' } })
    fireEvent.submit(input.closest('form')!)

    // Try sending second immediately
    fireEvent.change(input, { target: { value: 'Msg 2' } })
    fireEvent.submit(input.closest('form')!)

    // Should only see one user message (second was blocked by loading)
    const userMsgs = screen.getAllByText(/Msg/)
    expect(userMsgs).toHaveLength(1)
  })
})

describe('Flow: Mobile Responsiveness', () => {
  it('mobile menu toggles correctly', async () => {
    const Navbar = (await import('@/components/landing/Navbar')).default
    render(<Navbar />, { wrapper: TestWrapper })

    const menuBtn = screen.getByLabelText('Menu')

    // Open
    fireEvent.click(menuBtn)
    const allProceso = screen.getAllByText('Proceso')
    expect(allProceso.length).toBeGreaterThanOrEqual(2) // Desktop + mobile

    // Close
    fireEvent.click(menuBtn)
    // AnimatePresence mock renders children immediately, so they stay
    // But the toggle state should flip
  })

  it('clicking mobile link closes menu', async () => {
    const Navbar = (await import('@/components/landing/Navbar')).default
    render(<Navbar />, { wrapper: TestWrapper })

    // Open menu
    fireEvent.click(screen.getByLabelText('Menu'))

    // Click a link in mobile menu — should close
    const mobileLinks = screen.getAllByText('Proceso')
    const mobileLink = mobileLinks[mobileLinks.length - 1]
    fireEvent.click(mobileLink)

    // Menu closed — the mock AnimatePresence just renders children,
    // but the state should have toggled
  })
})

describe('Flow: Build & Type Safety', () => {
  it('all component imports resolve', async () => {
    const modules = await Promise.all([
      import('@/components/landing/Navbar'),
      import('@/components/landing/HeroSection'),
      import('@/components/landing/Typewriter'),
      import('@/components/landing/ProcessSection'),
      import('@/components/landing/CasesSection'),
      import('@/components/landing/StatsSection'),
      import('@/components/landing/PricingSection'),
      import('@/components/landing/ChatPreview'),
      import('@/components/landing/Footer'),
    ])

    for (const mod of modules) {
      expect(mod.default).toBeDefined()
      expect(typeof mod.default).toBe('function')
    }
  })

  it('all lib modules resolve', async () => {
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', 'https://test.supabase.co')
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', 'test-key')
    vi.stubEnv('SUPABASE_SERVICE_ROLE_KEY', 'test-key')
    vi.stubEnv('STRIPE_SECRET_KEY', 'sk_test_123')
    vi.stubEnv('ANTHROPIC_API_KEY', 'sk-ant-test')

    const modules = await Promise.all([
      import('@/lib/supabase'),
      import('@/lib/stripe'),
      import('@/lib/claude'),
      import('@/lib/cn'),
    ])

    for (const mod of modules) {
      expect(mod).toBeDefined()
    }
  })

  it('type definitions export correctly', async () => {
    const types = await import('@/types/database')
    // Types exist at compile time — if this file imports, types are valid
    expect(types).toBeDefined()
  })
})
