import type { ProjectSummary } from '@/types/database'

export function buildPrototypePrompt(summary: ProjectSummary, branding?: { primaryColor?: string; logo?: string; companyName?: string }) {
  const primary = branding?.primaryColor || '#00f0ff'
  const name = branding?.companyName || summary.name

  return `Generate a complete prototype for the project "${name}".

## Project Details
- Type: ${summary.type}
- Description: ${summary.description}
- Features: ${summary.features.join(', ')}
- Tech: ${summary.tech_requirements.join(', ')}

## Requirements
Generate between 5 and 8 HTML pages. Each page must be:
1. A COMPLETE standalone HTML file (with embedded CSS, no external dependencies)
2. Modern, dark-theme design with primary color: ${primary}
3. Responsive (mobile-first)
4. Include realistic mock data relevant to the business type
5. Include working navigation between pages (use relative anchors like page-slug.html)

## Pages to generate (adapt based on project type):
- Home / Dashboard
- Login / Register
- Main feature page 1
- Main feature page 2
- Settings / Profile
- Additional pages based on features

## Branding
- Company name: ${name}
- Primary color: ${primary}
- Style: Modern, clean, professional
${branding?.logo ? `- Logo URL: ${branding.logo}` : '- Use the first letter of the company name as logo'}

## Output Format
Respond with EXACTLY this JSON structure:
\`\`\`json
[
  {
    "name": "Page Title",
    "slug": "page-slug",
    "html": "<!DOCTYPE html>... complete HTML ..."
  },
  ...
]
\`\`\`

Make each page beautiful, realistic, and functional-looking. Include hover effects, transitions, and modern UI patterns.`
}
