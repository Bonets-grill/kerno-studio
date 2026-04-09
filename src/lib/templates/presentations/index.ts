import { pitchDeckTemplate } from './pitch-deck'
import { schoolProjectTemplate } from './school-project'
import { businessProposalTemplate } from './business-proposal'
import type { PresentationTemplateDefinition, PresentationCustomization, PresentationTemplateMeta } from '../presentation-types'

const PRESENTATION_TEMPLATES: Record<string, PresentationTemplateDefinition> = {
  'pitch-deck': pitchDeckTemplate,
  'school-project': schoolProjectTemplate,
  'business-proposal': businessProposalTemplate,
}

export function getPresentationTemplate(id: string): PresentationTemplateDefinition | undefined {
  return PRESENTATION_TEMPLATES[id]
}

export function getPresentationTemplateOrFallback(id: string): PresentationTemplateDefinition {
  return PRESENTATION_TEMPLATES[id] ?? PRESENTATION_TEMPLATES['pitch-deck']
}

export function listPresentationTemplateMetas(): PresentationTemplateMeta[] {
  return Object.values(PRESENTATION_TEMPLATES).map(t => t.meta)
}

export function renderPresentation(customization: PresentationCustomization): string {
  const template = getPresentationTemplateOrFallback(customization.templateId)
  return template.render(customization)
}

export type { PresentationTemplateDefinition, PresentationCustomization, PresentationTemplateMeta }
