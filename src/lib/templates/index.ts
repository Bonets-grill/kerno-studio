import { genericTemplate } from './industries/generic'
import { restaurantTemplate } from './industries/restaurant'
import { saasTemplate } from './industries/saas'
import type { TemplateDefinition, TemplateCustomization, TemplateMeta } from './types'

const TEMPLATES: Record<string, TemplateDefinition> = {
  generic: genericTemplate,
  restaurant: restaurantTemplate,
  saas: saasTemplate,
}

export function getTemplate(id: string): TemplateDefinition | undefined {
  return TEMPLATES[id]
}

export function getTemplateOrFallback(id: string): TemplateDefinition {
  return TEMPLATES[id] ?? TEMPLATES.generic
}

export function listTemplateMetas(): TemplateMeta[] {
  return Object.values(TEMPLATES).map(t => t.meta)
}

export function renderPrototype(customization: TemplateCustomization): string {
  const template = getTemplateOrFallback(customization.templateId)
  return template.render(customization)
}

export function registerTemplate(template: TemplateDefinition): void {
  TEMPLATES[template.meta.id] = template
}

export type { TemplateDefinition, TemplateCustomization, TemplateMeta }
