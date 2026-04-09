'use client'

import { useState, useRef, useEffect } from 'react'
import { useI18n } from '@/lib/i18n/context'
import { LANGS, LANG_LABELS, LANG_FLAGS, type Lang } from '@/lib/i18n/types'

export default function LangSelector() {
  const { lang, setLang } = useI18n()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-2 border border-border hover:border-neon-cyan/30 transition-colors text-sm"
        aria-label="Select language"
      >
        <span>{LANG_FLAGS[lang]}</span>
        <span className="hidden sm:inline text-muted">{lang.toUpperCase()}</span>
        <svg className={`w-3 h-3 text-muted transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-surface-2 border border-border shadow-xl z-50 overflow-hidden">
          {LANGS.map((l: Lang) => (
            <button
              key={l}
              onClick={() => {
                setLang(l)
                setOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-surface-3 transition-colors ${
                l === lang ? 'text-neon-cyan bg-neon-cyan/5' : 'text-foreground'
              }`}
            >
              <span>{LANG_FLAGS[l]}</span>
              <span>{LANG_LABELS[l]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
