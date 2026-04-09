'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { Lang } from './types'
import { LANGS } from './types'
import { T, type Translations } from './translations'

interface I18nContextType {
  lang: Lang
  setLang: (lang: Lang) => void
  t: Translations
}

const I18nContext = createContext<I18nContextType>({
  lang: 'es',
  setLang: () => {},
  t: T.es,
})

function detectLang(): Lang {
  if (typeof window === 'undefined') return 'es'

  // Check localStorage
  const saved = localStorage.getItem('kerno_lang') as Lang | null
  if (saved && LANGS.includes(saved)) return saved

  // Check browser language
  const browserLang = navigator.language.split('-')[0] as Lang
  if (LANGS.includes(browserLang)) return browserLang

  return 'es'
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('es')

  useEffect(() => {
    setLangState(detectLang())
  }, [])

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang)
    localStorage.setItem('kerno_lang', newLang)
    document.documentElement.lang = newLang
  }, [])

  return (
    <I18nContext.Provider value={{ lang, setLang, t: T[lang] }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  return useContext(I18nContext)
}
