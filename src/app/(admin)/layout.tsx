'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: '📊' },
  { label: 'Pipeline', href: '/admin/pipeline', icon: '🔄' },
  { label: 'Leads', href: '/admin/leads', icon: '🎯' },
  { label: 'Prototipos', href: '/admin/prototypes', icon: '🎨' },
  { label: 'Pagos', href: '/admin/payments', icon: '💰' },
  { label: 'Costos IA', href: '/admin/costs', icon: '📊' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background flex">
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-surface border-r border-border transform transition-transform duration-300 lg:translate-x-0 lg:static ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-green flex items-center justify-center">
              <span className="text-black font-bold text-sm">K</span>
            </div>
            <span className="text-lg font-bold">
              Kerno <span className="gradient-text">Studio</span>
            </span>
          </Link>
          <span className="text-xs text-neon-purple font-mono">ADMIN</span>

          <nav className="mt-8 space-y-1">
            {navItems.map((item) => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors ${
                    active
                      ? 'bg-neon-purple/10 text-neon-purple border border-neon-purple/20'
                      : 'text-muted hover:text-foreground hover:bg-surface-2'
                  }`}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-20 h-16 bg-background/80 backdrop-blur-xl border-b border-border flex items-center px-6">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 -ml-2 mr-4" aria-label="Open sidebar">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold">Panel de Administración</h1>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
