import type { PresentationType } from '@/types/presentations'

export interface PresentationTemplateMeta {
  id: string
  name: string
  types: PresentationType[]
  slides: string[]
  description: string
}

export interface SlideCustomization {
  id: string
  title: string
  content: Record<string, unknown>
  order: number
}

export interface PresentationCustomization {
  templateId: string
  title: string
  subtitle: string
  author: string
  primaryColor: string
  accentColor: string
  slides: SlideCustomization[]
  locale: string
}

export interface PresentationTemplateDefinition {
  meta: PresentationTemplateMeta
  render: (customization: PresentationCustomization) => string
}
