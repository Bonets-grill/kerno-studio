import { describe, it, expect } from 'vitest'
import type {
  Lead,
  Message,
  ProjectSummary,
  ModuleEstimate,
  Prototype,
  PrototypePage,
  Project,
  ProjectModule,
  Payment,
  ChatMessage,
} from '@/types/database'

describe('Database Types — Smoke Tests', () => {
  it('Lead type has all required fields', () => {
    const lead: Lead = {
      id: 'lead-1',
      name: 'Mario',
      email: 'mario@test.com',
      conversation: [],
      status: 'new',
      created_at: new Date().toISOString(),
    }
    expect(lead.id).toBe('lead-1')
    expect(lead.status).toBe('new')
    expect(lead.phone).toBeUndefined()
    expect(lead.summary).toBeUndefined()
  })

  it('Lead status covers full lifecycle', () => {
    const statuses: Lead['status'][] = [
      'new', 'chatting', 'summarized', 'prototype_sent',
      'approved', 'paid', 'in_progress', 'delivered',
    ]
    expect(statuses).toHaveLength(8)
  })

  it('Message type is correct', () => {
    const msg: Message = { role: 'user', content: 'Hola', timestamp: new Date().toISOString() }
    expect(msg.role).toBe('user')
    const assistantMsg: Message = { role: 'assistant', content: 'Hola!', timestamp: new Date().toISOString() }
    expect(assistantMsg.role).toBe('assistant')
  })

  it('ProjectSummary has all fields for pricing', () => {
    const summary: ProjectSummary = {
      name: 'TestApp',
      type: 'saas',
      description: 'A test SaaS',
      features: ['Auth', 'Dashboard'],
      tech_requirements: ['Next.js', 'Supabase'],
      estimated_modules: [
        { name: 'Auth', description: 'Login/registro', price: 500, days: 2 },
      ],
      total_price: 500,
      timeline_days: 2,
    }
    expect(summary.type).toBe('saas')
    expect(summary.estimated_modules).toHaveLength(1)
    expect(summary.total_price).toBe(500)
  })

  it('ProjectSummary type covers all project types', () => {
    const types: ProjectSummary['type'][] = ['landing', 'mvp', 'system', 'saas']
    expect(types).toHaveLength(4)
  })

  it('ModuleEstimate has price and days', () => {
    const mod: ModuleEstimate = { name: 'Auth', description: 'Login', price: 500, days: 3 }
    expect(mod.price).toBeGreaterThan(0)
    expect(mod.days).toBeGreaterThan(0)
  })

  it('Prototype type links to lead', () => {
    const proto: Prototype = {
      id: 'proto-1',
      lead_id: 'lead-1',
      pages: [{ name: 'Home', slug: 'home', html: '<h1>Home</h1>', order: 0 }],
      approved: false,
      created_at: new Date().toISOString(),
    }
    expect(proto.lead_id).toBe('lead-1')
    expect(proto.pages).toHaveLength(1)
    expect(proto.preview_url).toBeUndefined()
  })

  it('PrototypePage has html content', () => {
    const page: PrototypePage = { name: 'Dashboard', slug: 'dashboard', html: '<div>Dashboard</div>', order: 1 }
    expect(page.html).toContain('Dashboard')
    expect(page.order).toBe(1)
  })

  it('Project tracks progress 0-100', () => {
    const project: Project = {
      id: 'proj-1',
      lead_id: 'lead-1',
      name: 'TestApp',
      price: 2990,
      status: 'in_progress',
      progress: 45,
      created_at: new Date().toISOString(),
    }
    expect(project.progress).toBeGreaterThanOrEqual(0)
    expect(project.progress).toBeLessThanOrEqual(100)
  })

  it('Project status covers full lifecycle', () => {
    const statuses: Project['status'][] = ['pending', 'in_progress', 'staging', 'review', 'delivered']
    expect(statuses).toHaveLength(5)
  })

  it('ProjectModule tracks module status', () => {
    const mod: ProjectModule = {
      id: 'mod-1',
      project_id: 'proj-1',
      name: 'Auth',
      status: 'completed',
      order: 1,
    }
    expect(mod.status).toBe('completed')
  })

  it('Payment supports deposit and final types', () => {
    const deposit: Payment = {
      id: 'pay-1',
      project_id: 'proj-1',
      amount: 1495,
      type: 'deposit',
      paid: true,
      created_at: new Date().toISOString(),
    }
    const final: Payment = {
      id: 'pay-2',
      project_id: 'proj-1',
      amount: 1495,
      type: 'final',
      paid: false,
      created_at: new Date().toISOString(),
    }
    expect(deposit.type).toBe('deposit')
    expect(final.type).toBe('final')
    expect(deposit.paid).toBe(true)
    expect(final.paid).toBe(false)
  })

  it('ChatMessage tracks sender correctly', () => {
    const clientMsg: ChatMessage = {
      id: 'msg-1',
      project_id: 'proj-1',
      sender: 'client',
      text: 'How is progress?',
      created_at: new Date().toISOString(),
    }
    const teamMsg: ChatMessage = {
      id: 'msg-2',
      project_id: 'proj-1',
      sender: 'team',
      text: 'Going great!',
      created_at: new Date().toISOString(),
    }
    expect(clientMsg.sender).toBe('client')
    expect(teamMsg.sender).toBe('team')
  })
})
