export async function GET() {
  const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID
  const apiKey = process.env.ELEVENLABS_API_KEY

  if (!agentId || !apiKey) {
    return Response.json({ error: 'ElevenLabs not configured' }, { status: 500 })
  }

  const response = await fetch(
    `https://api.elevenlabs.io/v1/convai/conversation/get-signed-url?agent_id=${agentId}`,
    { headers: { 'xi-api-key': apiKey } }
  )

  if (!response.ok) {
    // Fallback: return agent_id for direct connection
    return Response.json({ agent_id: agentId })
  }

  const data = await response.json() as { signed_url: string }
  return Response.json(data)
}
