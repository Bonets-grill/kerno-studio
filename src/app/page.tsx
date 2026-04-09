'use client'

import React, { useEffect } from 'react'
import { I18nProvider } from '@/lib/i18n/context'
import Navbar from '@/components/landing/Navbar'
import HeroSection from '@/components/landing/HeroSection'
import ProcessSection from '@/components/landing/ProcessSection'
import StatsSection from '@/components/landing/StatsSection'
import CasesSection from '@/components/landing/CasesSection'
import PricingSection from '@/components/landing/PricingSection'
import ChatWidget from '@/components/chat/ChatWidget'
import Footer from '@/components/landing/Footer'
import dynamic from 'next/dynamic'

const SalesAgentDynamic = dynamic(
  () => import('@/components/chat/SalesAgent').catch(() => {
    return { default: () => null }
  }),
  { ssr: false }
)

function SalesAgentWrapper() {
  const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID
  if (!agentId) return null
  return (
    <ErrorBoundary>
      <SalesAgentDynamic agentId={agentId} />
    </ErrorBoundary>
  )
}

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() { return { hasError: true } }
  render() { return this.state.hasError ? null : this.props.children }
}

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <I18nProvider>
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <ProcessSection />
        <CasesSection />
        <PricingSection />
        <ChatWidget />
      </main>
      <Footer />
      <SalesAgentWrapper />
    </I18nProvider>
  )
}
