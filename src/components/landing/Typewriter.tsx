'use client'

import { useState, useEffect } from 'react'
import { useI18n } from '@/lib/i18n/context'

export default function Typewriter() {
  const { t } = useI18n()
  const phrases = t.hero_phrases
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  // Reset on language change
  useEffect(() => {
    setPhraseIndex(0)
    setCharIndex(0)
    setDeleting(false)
  }, [t])

  useEffect(() => {
    const phrase = phrases[phraseIndex]
    const speed = deleting ? 30 : 60

    if (!deleting && charIndex === phrase.length) {
      const timeout = setTimeout(() => setDeleting(true), 2000)
      return () => clearTimeout(timeout)
    }

    if (deleting && charIndex === 0) {
      setDeleting(false)
      setPhraseIndex((prev) => (prev + 1) % phrases.length)
      return
    }

    const timeout = setTimeout(() => {
      setCharIndex((prev) => prev + (deleting ? -1 : 1))
    }, speed)

    return () => clearTimeout(timeout)
  }, [charIndex, deleting, phraseIndex, phrases])

  return (
    <span className="gradient-text">
      {phrases[phraseIndex].slice(0, charIndex)}
      <span className="animate-pulse text-neon-cyan">|</span>
    </span>
  )
}
