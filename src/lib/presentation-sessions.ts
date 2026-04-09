import type { PresentationSession, PresentationBrief } from '@/types/presentations'
import { calculateSessionPrice } from './cost-tracker'

// In-memory store (replace with Supabase later)
const sessions = new Map<string, PresentationSession>()

export function createSession(): PresentationSession {
  const id = `pres_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
  const session: PresentationSession = {
    id,
    status: 'chatting',
    brief: null,
    conversation: [],
    html: null,
    costUsd: 0,
    priceUsd: 0,
    priceCents: 0,
    stripeSessionId: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
  sessions.set(id, session)
  return session
}

export function getSession(id: string): PresentationSession | undefined {
  return sessions.get(id)
}

export function updateSession(id: string, updates: Partial<PresentationSession>): PresentationSession | undefined {
  const session = sessions.get(id)
  if (!session) return undefined
  const updated = { ...session, ...updates, updated_at: new Date().toISOString() }
  sessions.set(id, updated)
  return updated
}

export function updateSessionBrief(id: string, brief: PresentationBrief): PresentationSession | undefined {
  return updateSession(id, { brief, status: 'generating' })
}

export function updateSessionHtml(id: string, html: string): PresentationSession | undefined {
  const price = calculateSessionPrice(id)
  return updateSession(id, {
    html,
    status: 'ready',
    costUsd: price.costUsd,
    priceUsd: price.priceUsd,
    priceCents: price.priceCents,
  })
}

export function markSessionPaid(id: string, stripeSessionId: string): PresentationSession | undefined {
  return updateSession(id, { status: 'paid', stripeSessionId })
}
