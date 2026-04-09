import { claude } from '@/lib/claude'
import { PRESENTATION_CHAT_PROMPT } from '@/lib/presentation-chat-prompt'
import { trackClaudeCost } from '@/lib/cost-tracker'
import { createSession, getSession, updateSession } from '@/lib/presentation-sessions'

export async function POST(req: Request) {
  const { messages, sessionId } = await req.json() as {
    messages: { role: 'user' | 'assistant'; content: string }[]
    sessionId?: string
  }

  // Get or create session
  let session = sessionId ? getSession(sessionId) : undefined
  if (!session) {
    session = createSession()
  }

  // Store conversation
  const now = new Date().toISOString()
  const lastMsg = messages[messages.length - 1]
  if (lastMsg) {
    session.conversation.push({ role: lastMsg.role, content: lastMsg.content, timestamp: now })
  }
  updateSession(session.id, { conversation: session.conversation })

  const model = 'claude-sonnet-4-20250514'

  const stream = claude.messages.stream({
    model,
    max_tokens: 1024,
    system: PRESENTATION_CHAT_PROMPT,
    messages: messages.map(m => ({ role: m.role, content: m.content })),
  })

  const encoder = new TextEncoder()
  const readable = new ReadableStream({
    async start(controller) {
      for await (const event of stream) {
        if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`))
        }
      }

      // Track cost with session ID
      try {
        const finalMessage = await stream.finalMessage()
        trackClaudeCost('presentation-chat', finalMessage.usage.input_tokens, finalMessage.usage.output_tokens, model, session!.id)
      } catch { /* skip */ }

      // Send session ID before DONE
      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ sessionId: session!.id })}\n\n`))
      controller.enqueue(encoder.encode('data: [DONE]\n\n'))
      controller.close()
    },
  })

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
}
