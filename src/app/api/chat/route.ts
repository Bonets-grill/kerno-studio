import { claude } from '@/lib/claude'
import { CHAT_SYSTEM_PROMPT } from '@/lib/chat-system-prompt'
import { trackClaudeCost } from '@/lib/cost-tracker'

export async function POST(req: Request) {
  const { messages } = await req.json() as {
    messages: { role: 'user' | 'assistant'; content: string }[]
  }

  const model = 'claude-sonnet-4-20250514'

  const stream = claude.messages.stream({
    model,
    max_tokens: 1024,
    system: CHAT_SYSTEM_PROMPT,
    messages: messages.map((m) => ({
      role: m.role,
      content: m.content,
    })),
  })

  const encoder = new TextEncoder()
  const readable = new ReadableStream({
    async start(controller) {
      for await (const event of stream) {
        if (
          event.type === 'content_block_delta' &&
          event.delta.type === 'text_delta'
        ) {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`)
          )
        }
      }

      // Track cost from final message
      try {
        const finalMessage = await stream.finalMessage()
        trackClaudeCost('chat', finalMessage.usage.input_tokens, finalMessage.usage.output_tokens, model)
      } catch { /* skip tracking on error */ }

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
