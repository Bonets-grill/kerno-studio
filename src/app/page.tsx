'use client'

import { useEffect } from 'react'
import { I18nProvider } from '@/lib/i18n/context'
import Navbar from '@/components/landing/Navbar'
import HeroSection from '@/components/landing/HeroSection'
import ProcessSection from '@/components/landing/ProcessSection'
import StatsSection from '@/components/landing/StatsSection'
import CasesSection from '@/components/landing/CasesSection'
import PricingSection from '@/components/landing/PricingSection'
import ChatWidget from '@/components/chat/ChatWidget'
import Footer from '@/components/landing/Footer'

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
    </I18nProvider>
  )
}
