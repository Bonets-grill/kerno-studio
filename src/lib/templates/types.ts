export interface TemplateMeta {
  id: string
  name: string
  industries: string[]
  projectTypes: ('landing' | 'mvp' | 'system' | 'saas')[]
  sections: string[]
  description: string
}

export interface TemplateCustomization {
  templateId: string
  businessName: string
  businessType: string
  primaryColor: string
  accentColor: string
  modules: ModuleDisplay[]
  features: string[]
  mockData: Record<string, unknown>
  locale: string
  theme?: 'executive' | 'neon' | 'warm' | 'minimal' | 'bold'
}

export interface ModuleDisplay {
  name: string
  description: string
  icon: string
  status: 'active' | 'coming_soon'
}

export interface TemplateDefinition {
  meta: TemplateMeta
  render: (customization: TemplateCustomization) => string
}
