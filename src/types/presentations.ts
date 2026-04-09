export type PresentationType = 'pitch-deck' | 'school-project' | 'business-proposal' | 'report'
export type PresentationStyle = 'professional' | 'academic' | 'creative' | 'minimal'

export interface PresentationBrief {
  title: string
  type: PresentationType
  description: string
  audience: string
  sections: string[]
  keyPoints: string[]
  style: PresentationStyle
  primaryColor: string
  accentColor: string
  locale: string
}

export interface PresentationMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export interface PresentationSession {
  id: string
  status: 'chatting' | 'generating' | 'ready' | 'paid'
  brief: PresentationBrief | null
  conversation: PresentationMessage[]
  html: string | null
  costUsd: number
  priceUsd: number
  priceCents: number
  stripeSessionId: string | null
  created_at: string
  updated_at: string
}
