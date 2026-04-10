import { claude } from '@/lib/claude'
import { trackClaudeCost } from '@/lib/cost-tracker'

export const maxDuration = 60

export async function POST(req: Request) {
  const { html, instruction } = await req.json() as {
    html: string
    instruction: string
  }

  if (!html || !instruction) {
    return Response.json({ error: 'Missing html or instruction' }, { status: 400 })
  }

  const model = 'claude-sonnet-4-20250514'

  try {
    // Truncate HTML to fit context (keep first 60KB)
    const truncatedHtml = html.length > 60000 ? html.substring(0, 60000) + '\n<!-- truncated -->' : html

    const response = await claude.messages.create({
      model,
      max_tokens: 16384,
      messages: [{
        role: 'user',
        content: `You are an expert HTML/CSS editor. Modify this HTML according to the instruction below.

INSTRUCTION: "${instruction}"

RULES:
- Return ONLY the complete modified HTML document
- Do NOT add markdown, backticks, or explanations
- Start with <!DOCTYPE html> and end with </html>
- Keep all existing functionality (JavaScript, sections, navigation)
- Only change what the instruction asks for
- If the instruction asks to change colors, update CSS variables
- If it asks to change text, update the text content
- If it asks to add/remove sections, modify the HTML structure

HTML TO MODIFY:
${truncatedHtml}`,
      }],
    })

    const responseText = response.content[0].type === 'text' ? response.content[0].text : ''
    trackClaudeCost('prototype', response.usage.input_tokens, response.usage.output_tokens, model)

    // Extract HTML from response (remove any markdown wrapping)
    let modifiedHtml = responseText
    const htmlMatch = responseText.match(/<!DOCTYPE html>[\s\S]*<\/html>/i)
    if (htmlMatch) {
      modifiedHtml = htmlMatch[0]
    }

    // Return as chunked SSE (same pattern as prototype generation)
    const CHUNK_SIZE = 4096
    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      start(controller) {
        for (let i = 0; i < modifiedHtml.length; i += CHUNK_SIZE) {
          const chunk = modifiedHtml.substring(i, i + CHUNK_SIZE)
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: chunk })}\n\n`))
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
    console.error('Prototype edit error:', error)
    return Response.json({ error: 'Failed to edit prototype' }, { status: 500 })
  }
}
