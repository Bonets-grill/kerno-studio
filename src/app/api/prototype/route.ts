import { claude } from '@/lib/claude'
import { buildPrototypePrompt } from '@/lib/prototype-prompt'
import { trackClaudeCost } from '@/lib/cost-tracker'
import type { ProjectSummary } from '@/types/database'

export const maxDuration = 60

export async function POST(req: Request) {
  const { summary, branding } = await req.json() as {
    summary: ProjectSummary
    branding?: { primaryColor?: string; logo?: string; companyName?: string }
  }

  const model = 'claude-sonnet-4-20250514'

  try {
    const stream = claude.messages.stream({
      model,
      max_tokens: 8192,
      messages: [
        {
          role: 'user',
          content: buildPrototypePrompt(summary, branding),
        },
      ],
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

        // Track cost
        try {
          const finalMessage = await stream.finalMessage()
          trackClaudeCost('prototype', finalMessage.usage.input_tokens, finalMessage.usage.output_tokens, model)
        } catch { /* skip */ }

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
  } catch (error) {
    console.error('Prototype generation error:', error)
    return Response.json({ error: 'Failed to generate prototype' }, { status: 500 })
  }
}
