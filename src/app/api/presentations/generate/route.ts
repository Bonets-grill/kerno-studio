import { claude } from '@/lib/claude'
import { buildPresentationSelectorPrompt } from '@/lib/templates/presentation-selector-prompt'
import { renderPresentation, listPresentationTemplateMetas } from '@/lib/templates/presentations'
import { trackClaudeCost, calculateSessionPrice } from '@/lib/cost-tracker'
import { getSession, updateSessionBrief, updateSessionHtml } from '@/lib/presentation-sessions'
import type { PresentationBrief } from '@/types/presentations'
import type { PresentationCustomization } from '@/lib/templates/presentation-types'

export const maxDuration = 60

export async function POST(req: Request) {
  const { sessionId, brief } = await req.json() as {
    sessionId: string
    brief: PresentationBrief
  }

  const session = getSession(sessionId)
  if (!session) {
    return Response.json({ error: 'Session not found' }, { status: 404 })
  }

  // Store brief in session
  updateSessionBrief(sessionId, brief)

  const model = 'claude-sonnet-4-20250514'

  try {
    const selectorPrompt = buildPresentationSelectorPrompt(brief, listPresentationTemplateMetas())

    const selectorResponse = await claude.messages.create({
      model,
      max_tokens: 4096, // Higher than prototype — presentations need real content
      messages: [{ role: 'user', content: selectorPrompt }],
    })

    const responseText = selectorResponse.content[0].type === 'text'
      ? selectorResponse.content[0].text
      : ''

    // Track cost with session ID
    trackClaudeCost('presentation-generate', selectorResponse.usage.input_tokens, selectorResponse.usage.output_tokens, model, sessionId)

    // Parse customization JSON
    let customization: PresentationCustomization
    try {
      customization = JSON.parse(responseText)
    } catch {
      const jsonMatch = responseText.match(/```(?:json)?\n?([\s\S]*?)```/)
      if (jsonMatch) {
        customization = JSON.parse(jsonMatch[1])
      } else {
        const objMatch = responseText.match(/\{[\s\S]*\}/)
        if (objMatch) {
          customization = JSON.parse(objMatch[0])
        } else {
          throw new Error('Failed to parse presentation customization')
        }
      }
    }

    // Render the presentation (instant)
    const html = renderPresentation(customization)

    // Store HTML and calculate price
    updateSessionHtml(sessionId, html)
    const price = calculateSessionPrice(sessionId)

    // Return as SSE (compatible with PresentationChatWidget)
    const result = JSON.stringify([{
      name: brief.title,
      slug: 'presentation',
      html,
      order: 0,
    }])

    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: result })}\n\n`))
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ price })}\n\n`))
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
    console.error('Presentation generation error:', error)
    return Response.json({ error: 'Failed to generate presentation' }, { status: 500 })
  }
}
