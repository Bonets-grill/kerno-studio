import { claude } from '@/lib/claude'
import { buildPrototypePrompt } from '@/lib/prototype-prompt'
import { buildSelectorPrompt } from '@/lib/templates/selector-prompt'
import { buildPresentationSelectorPrompt } from '@/lib/templates/presentation-selector-prompt'
import { renderPrototype, listTemplateMetas } from '@/lib/templates'
import { renderPresentation, listPresentationTemplateMetas } from '@/lib/templates/presentations'
import { trackClaudeCost } from '@/lib/cost-tracker'
import type { ProjectSummary } from '@/types/database'
import type { PresentationBrief } from '@/types/presentations'
import type { TemplateCustomization } from '@/lib/templates/types'
import type { PresentationCustomization } from '@/lib/templates/presentation-types'

export const maxDuration = 60

export async function POST(req: Request) {
  const body = await req.json() as {
    summary?: ProjectSummary
    branding?: { primaryColor?: string; logo?: string; companyName?: string }
    brief?: PresentationBrief
    mode?: 'presentation' | 'prototype'
  }

  const { summary, branding, brief, mode } = body

  // Route to presentation generation if brief is provided
  if (mode === 'presentation' && brief) {
    return generatePresentation(brief)
  }

  if (!summary) {
    return Response.json({ error: 'Missing summary or brief' }, { status: 400 })
  }

  const model = 'claude-sonnet-4-20250514'

  try {
    // ── New flow: template selection + hydration ──
    const selectorPrompt = buildSelectorPrompt(summary, {
      primaryColor: branding?.primaryColor,
      companyName: branding?.companyName,
    }, listTemplateMetas())

    const selectorResponse = await claude.messages.create({
      model,
      max_tokens: 1024,
      messages: [{ role: 'user', content: selectorPrompt }],
    })

    const responseText = selectorResponse.content[0].type === 'text'
      ? selectorResponse.content[0].text
      : ''

    // Track cost (much cheaper than before: ~300 output tokens vs ~6000)
    trackClaudeCost('prototype', selectorResponse.usage.input_tokens, selectorResponse.usage.output_tokens, model)

    // Parse customization JSON — try raw first, then extract from markdown
    let customization: TemplateCustomization
    try {
      customization = JSON.parse(responseText)
    } catch {
      const jsonMatch = responseText.match(/```(?:json)?\n?([\s\S]*?)```/)
      if (jsonMatch) {
        customization = JSON.parse(jsonMatch[1])
      } else {
        const arrayMatch = responseText.match(/\{[\s\S]*\}/)
        if (arrayMatch) {
          customization = JSON.parse(arrayMatch[0])
        } else {
          throw new Error('Failed to parse template customization')
        }
      }
    }

    // Render the premium template (instant, no AI)
    const html = renderPrototype(customization)

    // Return as SSE stream (maintains ChatWidget compatibility)
    const pages = JSON.stringify([{
      name: customization.businessName || summary.name,
      slug: 'demo',
      html,
      order: 0,
    }])

    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: pages })}\n\n`))
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
    console.error('Template prototype error, falling back to legacy generation:', error)
    // ── Fallback: legacy Claude HTML generation ──
    if (!summary) return Response.json({ error: 'Failed to generate' }, { status: 500 })
    return legacyGeneration(summary, branding, model)
  }
}

async function legacyGeneration(
  summary: ProjectSummary,
  branding: { primaryColor?: string; logo?: string; companyName?: string } | undefined,
  model: string
) {
  try {
    const stream = claude.messages.stream({
      model,
      max_tokens: 8192,
      messages: [{ role: 'user', content: buildPrototypePrompt(summary, branding) }],
    })

    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        for await (const event of stream) {
          if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`))
          }
        }
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
    console.error('Legacy prototype generation error:', error)
    return Response.json({ error: 'Failed to generate prototype' }, { status: 500 })
  }
}

async function generatePresentation(brief: PresentationBrief) {
  const model = 'claude-sonnet-4-20250514'

  try {
    const selectorPrompt = buildPresentationSelectorPrompt(brief, listPresentationTemplateMetas())

    const selectorResponse = await claude.messages.create({
      model,
      max_tokens: 4096,
      messages: [{ role: 'user', content: selectorPrompt }],
    })

    const responseText = selectorResponse.content[0].type === 'text'
      ? selectorResponse.content[0].text
      : ''

    trackClaudeCost('presentation-generate', selectorResponse.usage.input_tokens, selectorResponse.usage.output_tokens, model)

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

    const html = renderPresentation(customization)

    const pages = JSON.stringify([{
      name: brief.title,
      slug: 'presentation',
      html,
      order: 0,
    }])

    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: pages })}\n\n`))
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
