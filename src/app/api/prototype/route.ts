import { claude } from '@/lib/claude'
import { buildPrototypePrompt } from '@/lib/prototype-prompt'
import type { ProjectSummary, PrototypePage } from '@/types/database'

export async function POST(req: Request) {
  const { summary, branding } = await req.json() as {
    summary: ProjectSummary
    branding?: { primaryColor?: string; logo?: string; companyName?: string }
  }

  try {
    const response = await claude.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 16000,
      messages: [
        {
          role: 'user',
          content: buildPrototypePrompt(summary, branding),
        },
      ],
    })

    const text = response.content
      .filter((block) => block.type === 'text')
      .map((block) => block.text)
      .join('')

    // Extract JSON from response
    const jsonMatch = text.match(/```json\n?([\s\S]*?)```/)
    if (!jsonMatch) {
      return Response.json({ error: 'Failed to parse prototype pages' }, { status: 500 })
    }

    const pages = JSON.parse(jsonMatch[1]) as PrototypePage[]

    // Add order field
    const orderedPages = pages.map((page, i) => ({
      ...page,
      order: i,
    }))

    return Response.json({ pages: orderedPages })
  } catch (error) {
    console.error('Prototype generation error:', error)
    return Response.json({ error: 'Failed to generate prototype' }, { status: 500 })
  }
}
