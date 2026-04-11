import { groq } from '@/lib/claude'
import { CHAT_SYSTEM_PROMPT } from '@/lib/chat-system-prompt'
import { trackClaudeCost } from '@/lib/cost-tracker'

export async function POST(req: Request) {
  const { messages } = await req.json() as {
    messages: { role: 'user' | 'assistant'; content: string }[]
  }

  const model = 'llama-3.3-70b-versatile'

  try {
    const stream = await groq.chat.completions.create({
      model,
      max_tokens: 1024,
      stream: true,
      messages: [
        { role: 'system', content: CHAT_SYSTEM_PROMPT },
        ...messages.map(m => ({ role: m.role as 'user' | 'assistant', content: m.content })),
      ],
    })

    const encoder = new TextEncoder()
    let inputTokens = 0
    let outputTokens = 0

    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const delta = chunk.choices?.[0]?.delta?.content
          if (delta) {
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ text: delta })}\n\n`)
            )
          }
          // Track usage from final chunk
          if (chunk.x_groq?.usage) {
            inputTokens = chunk.x_groq.usage.prompt_tokens || 0
            outputTokens = chunk.x_groq.usage.completion_tokens || 0
          }
        }

        // Track cost (Groq pricing: ~$0.59/$0.79 per 1M tokens for 70B)
        if (inputTokens || outputTokens) {
          trackClaudeCost('chat', inputTokens, outputTokens, model)
        }

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
    console.error('Chat error (Groq):', error)
    return Response.json({ error: 'Chat failed' }, { status: 500 })
  }
}
