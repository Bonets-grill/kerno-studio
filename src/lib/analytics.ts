// Conversion analytics — in-memory (replace with Supabase later)

export type AnalyticsEvent =
  | 'page_view'
  | 'chat_start'
  | 'template_selected'
  | 'summary_generated'
  | 'brief_generated'
  | 'prototype_generated'
  | 'prototype_shared'
  | 'prototype_approved'
  | 'payment_started'

interface EventEntry {
  event: AnalyticsEvent
  data?: Record<string, unknown>
  timestamp: string
}

const events: EventEntry[] = []

export function trackEvent(event: AnalyticsEvent, data?: Record<string, unknown>) {
  events.push({ event, data, timestamp: new Date().toISOString() })
}

export function getEvents(): EventEntry[] {
  return [...events]
}

export function getConversionFunnel() {
  const count = (e: AnalyticsEvent) => events.filter(ev => ev.event === e).length
  return {
    page_views: count('page_view'),
    chat_starts: count('chat_start'),
    templates_selected: count('template_selected'),
    summaries: count('summary_generated'),
    briefs: count('brief_generated'),
    prototypes: count('prototype_generated'),
    shared: count('prototype_shared'),
    approved: count('prototype_approved'),
    payments: count('payment_started'),
    total_events: events.length,
  }
}
