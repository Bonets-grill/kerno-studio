import type { ProjectSummary } from '@/types/database'

export function buildPrototypePrompt(summary: ProjectSummary, branding?: { primaryColor?: string; logo?: string; companyName?: string }) {
  const primary = branding?.primaryColor || '#00f0ff'
  const name = branding?.companyName || summary.name
  const features = summary.features.slice(0, 3).join(', ')

  return `Create 3 ultra-compact HTML mockup pages for "${name}".
Type: ${summary.type}. Features: ${features}.

ABSOLUTE RULES:
1. Each HTML page MAX 1500 characters. Keep it TINY.
2. Only use: div, h1, h2, h3, p, span, table, tr, td, ul, li, input, button
3. Style: background:#0a0a0a; color:#eee; font-family:system-ui; accent:${primary}
4. NO <script>, NO animations, NO media queries
5. Simple inline styles ONLY
6. Navigation: 3 links at top of each page
7. Mock data: use realistic but short text

PAGE 1 "Dashboard": Header with logo (letter ${name[0]} in ${primary} circle), 4 stat cards in a row, simple 5-row table below
PAGE 2 "Main": The core feature — a form OR list relevant to "${features}"
PAGE 3 "Settings": 4 labeled input fields, 2 toggle-like checkboxes, save button

RESPOND WITH ONLY THE RAW JSON ARRAY. No backticks. No markdown. Start with [ end with ]:
[{"name":"Dashboard","slug":"dashboard","html":"<!DOCTYPE html><html>TINY HTML HERE</html>"},{"name":"Main","slug":"main","html":"<!DOCTYPE html><html>TINY HTML HERE</html>"},{"name":"Settings","slug":"settings","html":"<!DOCTYPE html><html>TINY HTML HERE</html>"}]`
}
