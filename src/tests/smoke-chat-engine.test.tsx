import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { TestWrapper } from './i18n-wrapper'

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    nav: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <nav {...props}>{children}</nav>,
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
}))

describe('Chat System Prompt', () => {
  it('exports CHAT_SYSTEM_PROMPT string', async () => {
    const { CHAT_SYSTEM_PROMPT } = await import('@/lib/chat-system-prompt')
    expect(typeof CHAT_SYSTEM_PROMPT).toBe('string')
    expect(CHAT_SYSTEM_PROMPT.length).toBeGreaterThan(100)
  })

  it('prompt includes classification instructions', async () => {
    const { CHAT_SYSTEM_PROMPT } = await import('@/lib/chat-system-prompt')
    expect(CHAT_SYSTEM_PROMPT).toContain('landing')
    expect(CHAT_SYSTEM_PROMPT).toContain('mvp')
    expect(CHAT_SYSTEM_PROMPT).toContain('system')
    expect(CHAT_SYSTEM_PROMPT).toContain('saas')
  })

  it('prompt includes summary JSON format', async () => {
    const { CHAT_SYSTEM_PROMPT } = await import('@/lib/chat-system-prompt')
    expect(CHAT_SYSTEM_PROMPT).toContain('json:summary')
    expect(CHAT_SYSTEM_PROMPT).toContain('estimated_modules')
    expect(CHAT_SYSTEM_PROMPT).toContain('total_price')
    expect(CHAT_SYSTEM_PROMPT).toContain('timeline_days')
  })

  it('prompt enforces one question at a time', async () => {
    const { CHAT_SYSTEM_PROMPT } = await import('@/lib/chat-system-prompt')
    expect(CHAT_SYSTEM_PROMPT).toContain('ONE question at a time')
  })

  it('prompt respects multilanguage', async () => {
    const { CHAT_SYSTEM_PROMPT } = await import('@/lib/chat-system-prompt')
    expect(CHAT_SYSTEM_PROMPT).toContain('same language')
  })
})

describe('ChatWidget Component', () => {
  it('renders chat section with correct id', async () => {
    const ChatWidget = (await import('@/components/chat/ChatWidget')).default
    const { container } = render(<ChatWidget />, { wrapper: TestWrapper })
    expect(container.querySelector('#chat')).toBeTruthy()
  })

  it('renders chat header', async () => {
    const ChatWidget = (await import('@/components/chat/ChatWidget')).default
    render(<ChatWidget />, { wrapper: TestWrapper })
    expect(screen.getByText('Kerno Studio AI')).toBeInTheDocument()
  })

  it('renders empty state', async () => {
    const ChatWidget = (await import('@/components/chat/ChatWidget')).default
    render(<ChatWidget />, { wrapper: TestWrapper })
    expect(screen.getByText(/soy el asistente/)).toBeInTheDocument()
  })

  it('renders input and send button', async () => {
    const ChatWidget = (await import('@/components/chat/ChatWidget')).default
    render(<ChatWidget />, { wrapper: TestWrapper })
    expect(screen.getByPlaceholderText(/Describe tu proyecto/)).toBeInTheDocument()
    expect(screen.getByText('Enviar')).toBeInTheDocument()
  })

  it('send button disabled when empty', async () => {
    const ChatWidget = (await import('@/components/chat/ChatWidget')).default
    render(<ChatWidget />, { wrapper: TestWrapper })
    expect(screen.getByText('Enviar')).toBeDisabled()
  })

  it('allows typing and enables send', async () => {
    const ChatWidget = (await import('@/components/chat/ChatWidget')).default
    render(<ChatWidget />, { wrapper: TestWrapper })
    const input = screen.getByPlaceholderText(/Describe tu proyecto/)
    fireEvent.change(input, { target: { value: 'Quiero un CRM' } })
    expect(screen.getByText('Enviar')).not.toBeDisabled()
  })
})

describe('VoiceButton Component', () => {
  it('returns null when SpeechRecognition not supported', async () => {
    const VoiceButton = (await import('@/components/chat/VoiceButton')).default
    const { container } = render(<VoiceButton onResult={() => {}} />)
    // jsdom has no SpeechRecognition, so button should not render
    expect(container.innerHTML).toBe('')
  })
})

describe('SummaryCard Component', () => {
  const mockSummary = {
    name: 'TestApp',
    type: 'saas' as const,
    description: 'A test SaaS platform',
    features: ['Auth', 'Dashboard', 'API'],
    tech_requirements: ['Next.js', 'Supabase'],
    estimated_modules: [
      { name: 'Auth Module', description: 'Login/registro', price: 500, days: 3 },
      { name: 'Dashboard', description: 'Main dashboard', price: 800, days: 5 },
    ],
    total_price: 1300,
    timeline_days: 8,
  }

  it('renders project name and type', async () => {
    const SummaryCard = (await import('@/components/chat/SummaryCard')).default
    render(<SummaryCard summary={mockSummary} />)
    expect(screen.getByText('TestApp')).toBeInTheDocument()
    expect(screen.getByText('saas')).toBeInTheDocument()
  })

  it('renders description', async () => {
    const SummaryCard = (await import('@/components/chat/SummaryCard')).default
    render(<SummaryCard summary={mockSummary} />)
    expect(screen.getByText('A test SaaS platform')).toBeInTheDocument()
  })

  it('renders all features as tags', async () => {
    const SummaryCard = (await import('@/components/chat/SummaryCard')).default
    render(<SummaryCard summary={mockSummary} />)
    expect(screen.getByText('Auth')).toBeInTheDocument()
    expect(screen.getAllByText('Dashboard').length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText('API')).toBeInTheDocument()
  })

  it('renders module breakdown with prices', async () => {
    const SummaryCard = (await import('@/components/chat/SummaryCard')).default
    render(<SummaryCard summary={mockSummary} />)
    expect(screen.getByText('Auth Module')).toBeInTheDocument()
    expect(screen.getByText('500€')).toBeInTheDocument()
    expect(screen.getByText('800€')).toBeInTheDocument()
  })

  it('renders total price', async () => {
    const SummaryCard = (await import('@/components/chat/SummaryCard')).default
    render(<SummaryCard summary={mockSummary} />)
    expect(screen.getByText(/1.*300€/)).toBeInTheDocument()
  })

  it('renders timeline', async () => {
    const SummaryCard = (await import('@/components/chat/SummaryCard')).default
    render(<SummaryCard summary={mockSummary} />)
    expect(screen.getByText(/8 días/)).toBeInTheDocument()
  })

  it('renders action buttons', async () => {
    const SummaryCard = (await import('@/components/chat/SummaryCard')).default
    render(<SummaryCard summary={mockSummary} />)
    expect(screen.getByText('Me gusta, ver prototipo')).toBeInTheDocument()
    expect(screen.getByText('Cambiar cosas')).toBeInTheDocument()
  })
})

describe('API Route — Chat', () => {
  it('route module exports POST handler', async () => {
    vi.stubEnv('ANTHROPIC_API_KEY', 'sk-ant-test')
    vi.mock('@anthropic-ai/sdk', () => {
      class MockAnthropic {
        messages = {
          create: vi.fn(),
          stream: vi.fn(),
        }
        constructor() {}
      }
      return { default: MockAnthropic }
    })

    const mod = await import('@/app/api/chat/route')
    expect(typeof mod.POST).toBe('function')
  })
})
