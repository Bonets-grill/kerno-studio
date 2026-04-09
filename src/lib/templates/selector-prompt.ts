import type { ProjectSummary } from '@/types/database'
import type { TemplateMeta } from './types'

export function buildSelectorPrompt(
  summary: ProjectSummary,
  branding: { primaryColor?: string; companyName?: string },
  templates: TemplateMeta[]
): string {
  const name = branding?.companyName || summary.name
  const primary = branding?.primaryColor || '#00f0ff'

  const templateList = templates.map(t =>
    `- ${t.id}: ${t.description} (industries: ${t.industries.join(', ')})`
  ).join('\n')

  return `Select the best template and generate customization data for this project.

PROJECT:
- Name: "${name}"
- Type: ${summary.type}
- Description: ${summary.description}
- Features: ${summary.features.join(', ')}
- Modules: ${summary.estimated_modules.map(m => `${m.name} (${m.description})`).join(', ')}

AVAILABLE TEMPLATES:
${templateList}

Return ONLY raw JSON (no markdown, no backticks, no explanation). The JSON must match this exact structure:
{
  "templateId": "one of the template IDs above — pick the best match",
  "businessName": "${name}",
  "businessType": "specific business type in Spanish, e.g. 'Restaurante Italiano', 'Clínica Dental', 'Plataforma SaaS'",
  "primaryColor": "${primary}",
  "accentColor": "a complementary accent color hex that pairs well with ${primary}",
  "modules": [
    {"name": "module name", "description": "what it does (max 10 words)", "icon": "relevant emoji", "status": "active"}
  ],
  "features": ["feature 1 contextualized to this business", "feature 2", ...],
  "mockData": {
    "heroTagline": "catchy tagline for the hero section",
    "heroSubtitle": "one-line description of the platform value",
    "totalUsers": realistic_number,
    "revenue": realistic_monthly_revenue,
    "activeUsers": realistic_number,
    "pendingTasks": realistic_number,
    "efficiency": percentage_number,
    "alert1": "relevant alert for this business",
    "alert2": "relevant alert for this business",
    "alert3": "relevant alert for this business",
    "alert4": "relevant alert for this business",
    "metric1Label": "relevant metric name",
    "metric1": percentage,
    "metric2Label": "relevant metric name",
    "metric2": percentage,
    "metric3Label": "relevant metric name",
    "metric3": percentage,
    "metric4Label": "relevant metric name",
    "metric4": percentage,
    "bigResultValue": "€XX,XXX or relevant big number",
    "bigResultLabel": "what this number represents",
    "email": "info@business.com"
  },
  "locale": "es"
}

IMPORTANT:
- Generate realistic mock data that makes sense for this specific business
- Module icons should be relevant emojis
- All text in the same language as the project description (default Spanish)
- Keep mockData values realistic for the business size and type
- The accentColor should complement the primaryColor (warm accent for cool primary, or gold/amber for dark themes)`
}
