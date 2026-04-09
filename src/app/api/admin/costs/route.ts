import { getCosts, getCostSummary } from '@/lib/cost-tracker'

export async function GET() {
  // Fetch ElevenLabs conversation stats too
  let elevenLabsStats = null
  const apiKey = process.env.ELEVENLABS_API_KEY
  const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID

  if (apiKey && agentId) {
    try {
      const res = await fetch(
        `https://api.elevenlabs.io/v1/convai/agents/${agentId}`,
        { headers: { 'xi-api-key': apiKey } }
      )
      if (res.ok) {
        const agent = await res.json() as Record<string, unknown>
        // Fetch recent conversations
        const convRes = await fetch(
          `https://api.elevenlabs.io/v1/convai/conversations?agent_id=${agentId}`,
          { headers: { 'xi-api-key': apiKey } }
        )
        if (convRes.ok) {
          const convData = await convRes.json() as { conversations?: Array<Record<string, unknown>> }
          const conversations = convData.conversations || []

          let totalDuration = 0
          let totalCost = 0

          for (const conv of conversations) {
            const duration = (conv.call_duration_secs as number) || 0
            totalDuration += duration
            const cost = (conv.cost as number) || (duration / 60) * 0.07
            totalCost += cost
          }

          elevenLabsStats = {
            agent_name: agent.name,
            total_conversations: conversations.length,
            total_duration_minutes: Math.round(totalDuration / 60 * 100) / 100,
            total_cost_usd: Math.round(totalCost * 10000) / 10000,
            conversations: conversations.slice(0, 20).map((c) => ({
              id: c.conversation_id,
              status: c.status,
              duration_secs: c.call_duration_secs,
              cost: c.cost,
              created_at: c.start_time_unix_secs
                ? new Date((c.start_time_unix_secs as number) * 1000).toISOString()
                : null,
            })),
          }
        }
      }
    } catch {
      // ElevenLabs API error — continue without it
    }
  }

  return Response.json({
    claude: getCostSummary(),
    claude_entries: getCosts().slice(0, 50),
    elevenlabs: elevenLabsStats,
  })
}
