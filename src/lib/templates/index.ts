import { genericTemplate } from './industries/generic'
import { restaurantTemplate } from './industries/restaurant'
import { saasTemplate } from './industries/saas'
import { crmTemplate } from './industries/crm'
import { ecommerceTemplate } from './industries/ecommerce'
import { clinicTemplate } from './industries/clinic'
import { lmsTemplate } from './industries/lms'
import { bookingTemplate } from './industries/booking'
import { deliveryTemplate } from './industries/delivery'
import { gymTemplate } from './industries/gym'
import { realestateTemplate } from './industries/realestate'
import { erpTemplate } from './industries/erp'
import { hrTemplate } from './industries/hr'
import { accountingTemplate } from './industries/accounting'
import { projectmgmtTemplate } from './industries/projectmgmt'
import { marketplaceTemplate } from './industries/marketplace'
import { helpdeskTemplate } from './industries/helpdesk'
import { socialTemplate } from './industries/social'
import { analyticsTemplate } from './industries/analytics'
import { servicesTemplate } from './industries/services'
import { fleetTemplate } from './industries/fleet'
import type { TemplateDefinition, TemplateCustomization, TemplateMeta } from './types'

const TEMPLATES: Record<string, TemplateDefinition> = {
  generic: genericTemplate,
  restaurant: restaurantTemplate,
  saas: saasTemplate,
  crm: crmTemplate,
  ecommerce: ecommerceTemplate,
  clinic: clinicTemplate,
  lms: lmsTemplate,
  booking: bookingTemplate,
  delivery: deliveryTemplate,
  gym: gymTemplate,
  realestate: realestateTemplate,
  erp: erpTemplate,
  hr: hrTemplate,
  accounting: accountingTemplate,
  projectmgmt: projectmgmtTemplate,
  marketplace: marketplaceTemplate,
  helpdesk: helpdeskTemplate,
  social: socialTemplate,
  analytics: analyticsTemplate,
  services: servicesTemplate,
  fleet: fleetTemplate,
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
