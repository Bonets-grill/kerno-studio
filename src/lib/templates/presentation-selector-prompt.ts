import type { PresentationBrief } from '@/types/presentations'
import type { PresentationTemplateMeta } from './presentation-types'

export function buildPresentationSelectorPrompt(
  brief: PresentationBrief,
  templates: PresentationTemplateMeta[]
): string {
  const templateList = templates.map(t =>
    `- ${t.id}: ${t.description} (types: ${t.types.join(', ')}, slides: ${t.slides.join(', ')})`
  ).join('\n')

  return `Generate slide content for a premium interactive presentation.

BRIEF:
- Title: "${brief.title}"
- Type: ${brief.type}
- Description: ${brief.description}
- Audience: ${brief.audience}
- Sections: ${brief.sections.join(', ')}
- Key Points: ${brief.keyPoints.join(', ')}
- Style: ${brief.style}

AVAILABLE TEMPLATES:
${templateList}

Return ONLY raw JSON (no markdown, no backticks, no explanation):
{
  "templateId": "best matching template ID",
  "title": "${brief.title}",
  "subtitle": "compelling subtitle for the presentation",
  "author": "Presentation by [relevant name/org]",
  "primaryColor": "${brief.primaryColor}",
  "accentColor": "${brief.accentColor}",
  "slides": [
    {
      "id": "slide-id matching template slide names (lowercase, hyphenated)",
      "title": "Slide Title",
      "content": {
        slide-specific content fields (see below)
      },
      "order": 0
    }
  ],
  "locale": "${brief.locale}"
}

SLIDE CONTENT FIELDS BY TYPE:

For pitch-deck slides:
- hero: { "tagline": "...", "stats": [{"value": "...", "label": "..."}] }
- problem: { "headline": "...", "points": ["pain point 1", "pain point 2", "pain point 3"], "impact": "statistic about the problem" }
- solution: { "headline": "...", "description": "...", "features": [{"name": "...", "desc": "...", "icon": "emoji"}] }
- market: { "tam": "...", "sam": "...", "som": "...", "description": "..." }
- business-model: { "headline": "...", "streams": [{"name": "...", "description": "...", "icon": "emoji"}] }
- traction: { "metrics": [{"icon": "emoji", "label": "...", "value": number_or_string}], "milestones": [{"title": "...", "date": "..."}] }
- team: { "members": [{"name": "...", "role": "...", "bio": "short bio"}] }
- financials: { "rows": [{"label": "...", "y1": "...", "y2": "...", "y3": "..."}], "headline": "..." }
- ask: { "amount": "...", "use_of_funds": [{"label": "...", "percentage": number}], "cta": "..." }

For school-project slides:
- cover: { "subject": "...", "professor": "...", "date": "..." }
- introduction: { "text": "...", "objectives": ["..."] }
- context: { "text": "...", "facts": [{"label": "...", "value": "..."}] }
- research: { "text": "...", "findings": ["..."] }
- data: { "charts": [{"label": "...", "value": number}], "description": "..." }
- analysis: { "text": "...", "conclusions_preview": ["..."] }
- conclusions: { "points": ["..."], "summary": "..." }
- references: { "sources": ["APA formatted source 1", "source 2"] }

For business-proposal slides:
- cover: { "client": "...", "date": "...", "reference": "..." }
- executive-summary: { "text": "...", "highlights": [{"label": "...", "value": "..."}] }
- scope: { "description": "...", "inclusions": ["..."], "exclusions": ["..."] }
- deliverables: { "items": [{"name": "...", "description": "...", "icon": "emoji"}] }
- timeline: { "phases": [{"title": "...", "duration": "...", "description": "..."}] }
- investment: { "total": "...", "breakdown": [{"item": "...", "amount": "..."}], "payment_terms": "..." }
- team: { "members": [{"name": "...", "role": "...", "expertise": "..."}] }
- next-steps: { "steps": [{"action": "...", "timeline": "..."}], "cta": "..." }

IMPORTANT:
- Generate REAL, substantive content — not placeholder text
- All text in ${brief.locale === 'es' ? 'Spanish' : brief.locale === 'en' ? 'English' : brief.locale === 'fr' ? 'French' : brief.locale === 'de' ? 'German' : 'the language matching locale ' + brief.locale}
- Make numbers and data realistic for the topic
- Key points from the brief MUST appear in the slide content
- Generate ALL slides that the template expects`
}
