/**
 * Cost tracking for Claude API and ElevenLabs usage.
 * Stores costs in memory (will move to Supabase when connected).
 */

export interface CostEntry {
  id: string
  timestamp: string
  type: 'chat' | 'prototype' | 'voice'
  // Claude
  input_tokens?: number
  output_tokens?: number
  model?: string
  claude_cost_usd?: number
  // ElevenLabs
  duration_seconds?: number
  elevenlabs_cost_usd?: number
  // General
  total_cost_usd: number
  session_id?: string
}

// Claude pricing (USD per 1M tokens) - Sonnet 4
const CLAUDE_PRICING: Record<string, { input: number; output: number }> = {
  'claude-sonnet-4-20250514': { input: 3.0, output: 15.0 },
  'claude-3-5-sonnet': { input: 3.0, output: 15.0 },
  default: { input: 3.0, output: 15.0 },
}

// ElevenLabs pricing (approx per minute of conversation)
const ELEVENLABS_COST_PER_MINUTE = 0.07 // ~$0.07/min for Turbo v2.5

// In-memory store (replace with Supabase later)
const costs: CostEntry[] = []

export function trackClaudeCost(
  type: 'chat' | 'prototype',
  inputTokens: number,
  outputTokens: number,
  model: string
): CostEntry {
  const pricing = CLAUDE_PRICING[model] || CLAUDE_PRICING.default
  const cost = (inputTokens * pricing.input + outputTokens * pricing.output) / 1_000_000

  const entry: CostEntry = {
    id: `cost_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    timestamp: new Date().toISOString(),
    type,
    input_tokens: inputTokens,
    output_tokens: outputTokens,
    model,
    claude_cost_usd: Math.round(cost * 10000) / 10000,
    total_cost_usd: Math.round(cost * 10000) / 10000,
  }

  costs.push(entry)
  return entry
}

export function trackElevenLabsCost(durationSeconds: number, sessionId?: string): CostEntry {
  const cost = (durationSeconds / 60) * ELEVENLABS_COST_PER_MINUTE

  const entry: CostEntry = {
    id: `cost_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    timestamp: new Date().toISOString(),
    type: 'voice',
    duration_seconds: durationSeconds,
    elevenlabs_cost_usd: Math.round(cost * 10000) / 10000,
    total_cost_usd: Math.round(cost * 10000) / 10000,
    session_id: sessionId,
  }

  costs.push(entry)
  return entry
}

export function getCosts(): CostEntry[] {
  return [...costs].sort((a, b) => b.timestamp.localeCompare(a.timestamp))
}

export function getCostSummary() {
  const chatCosts = costs.filter((c) => c.type === 'chat')
  const protoCosts = costs.filter((c) => c.type === 'prototype')
  const voiceCosts = costs.filter((c) => c.type === 'voice')

  return {
    total_usd: Math.round(costs.reduce((s, c) => s + c.total_cost_usd, 0) * 10000) / 10000,
    chat: {
      count: chatCosts.length,
      total_usd: Math.round(chatCosts.reduce((s, c) => s + c.total_cost_usd, 0) * 10000) / 10000,
      total_tokens: chatCosts.reduce((s, c) => s + (c.input_tokens || 0) + (c.output_tokens || 0), 0),
    },
    prototype: {
      count: protoCosts.length,
      total_usd: Math.round(protoCosts.reduce((s, c) => s + c.total_cost_usd, 0) * 10000) / 10000,
      total_tokens: protoCosts.reduce((s, c) => s + (c.input_tokens || 0) + (c.output_tokens || 0), 0),
    },
    voice: {
      count: voiceCosts.length,
      total_usd: Math.round(voiceCosts.reduce((s, c) => s + c.total_cost_usd, 0) * 10000) / 10000,
      total_minutes: Math.round(voiceCosts.reduce((s, c) => s + (c.duration_seconds || 0), 0) / 60 * 100) / 100,
    },
    entries: costs.length,
  }
}
