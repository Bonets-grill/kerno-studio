export interface Lead {
  id: string
  name: string
  email: string
  phone?: string
  conversation: Message[]
  summary?: ProjectSummary
  status: 'new' | 'chatting' | 'summarized' | 'prototype_sent' | 'approved' | 'paid' | 'in_progress' | 'delivered'
  created_at: string
}

export interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export interface ProjectSummary {
  name: string
  type: 'landing' | 'mvp' | 'system' | 'saas'
  description: string
  features: string[]
  tech_requirements: string[]
  estimated_modules: ModuleEstimate[]
  total_price: number
  timeline_days: number
}

export interface ModuleEstimate {
  name: string
  description: string
  price: number
  days: number
}

export interface Prototype {
  id: string
  lead_id: string
  pages: PrototypePage[]
  preview_url?: string
  approved: boolean
  created_at: string
}

export interface PrototypePage {
  name: string
  slug: string
  html: string
  order: number
}

export interface Project {
  id: string
  lead_id: string
  name: string
  price: number
  status: 'pending' | 'in_progress' | 'staging' | 'review' | 'delivered'
  progress: number
  staging_url?: string
  created_at: string
}

export interface ProjectModule {
  id: string
  project_id: string
  name: string
  status: 'pending' | 'in_progress' | 'completed'
  order: number
}

export interface Payment {
  id: string
  project_id: string
  amount: number
  type: 'deposit' | 'final'
  stripe_id?: string
  paid: boolean
  created_at: string
}

export interface ChatMessage {
  id: string
  project_id: string
  sender: 'client' | 'team'
  text: string
  created_at: string
}
