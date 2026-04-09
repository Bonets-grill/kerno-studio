import { describe, it, expect, vi } from 'vitest'

// Mock Anthropic SDK (blocks browser-like env in jsdom)
vi.mock('@anthropic-ai/sdk', () => {
  class MockAnthropic {
    messages = { create: vi.fn() }
    constructor() {}
  }
  return { default: MockAnthropic }
})

// Mock env vars before imports
vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', 'https://test.supabase.co')
vi.stubEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', 'test-anon-key')
vi.stubEnv('SUPABASE_SERVICE_ROLE_KEY', 'test-service-key')
vi.stubEnv('STRIPE_SECRET_KEY', 'sk_test_123')
vi.stubEnv('ANTHROPIC_API_KEY', 'sk-ant-test-123')

describe('Lib Clients — Smoke Tests', () => {
  it('Supabase client exports correctly', async () => {
    const { supabase, getServiceClient } = await import('@/lib/supabase')
    expect(supabase).toBeDefined()
    expect(typeof supabase.from).toBe('function')
    expect(typeof supabase.auth).toBe('object')
    expect(typeof getServiceClient).toBe('function')
  })

  it('Supabase service client creates separate instance', async () => {
    const { supabase, getServiceClient } = await import('@/lib/supabase')
    const serviceClient = getServiceClient()
    expect(serviceClient).toBeDefined()
    expect(serviceClient).not.toBe(supabase)
  })

  it('Stripe client exports correctly', async () => {
    const { stripe } = await import('@/lib/stripe')
    expect(stripe).toBeDefined()
    expect(typeof stripe.customers).toBe('object')
    expect(typeof stripe.paymentIntents).toBe('object')
    expect(typeof stripe.checkout).toBe('object')
  })

  it('Claude module exports correctly', async () => {
    const { claude } = await import('@/lib/claude')
    expect(claude).toBeDefined()
    expect(typeof claude.messages).toBe('object')
  })

  it('cn utility merges classes', async () => {
    const { cn } = await import('@/lib/cn')
    expect(cn('foo', 'bar')).toBe('foo bar')
    expect(cn('foo', false && 'bar')).toBe('foo')
    expect(cn('foo', undefined, 'bar')).toBe('foo bar')
    expect(cn('foo', null, 'bar')).toBe('foo bar')
  })
})
