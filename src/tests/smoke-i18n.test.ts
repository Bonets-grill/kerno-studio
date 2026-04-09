import { describe, it, expect } from 'vitest'
import { T, type Translations } from '@/lib/i18n/translations'
import { LANGS, LANG_LABELS, LANG_FLAGS, type Lang } from '@/lib/i18n/types'

describe('i18n — Smoke Tests', () => {
  it('supports 8 languages', () => {
    expect(LANGS).toHaveLength(8)
    expect(LANGS).toEqual(['es', 'en', 'fr', 'de', 'it', 'pt', 'ca', 'gl'])
  })

  it('all languages have labels and flags', () => {
    for (const lang of LANGS) {
      expect(LANG_LABELS[lang]).toBeTruthy()
      expect(LANG_FLAGS[lang]).toBeTruthy()
    }
  })

  it('all languages have complete translations', () => {
    const esKeys = Object.keys(T.es) as (keyof Translations)[]

    for (const lang of LANGS) {
      const langKeys = Object.keys(T[lang]) as (keyof Translations)[]
      const missing = esKeys.filter((k) => !langKeys.includes(k))
      expect(missing, `${lang} missing keys: ${missing.join(', ')}`).toEqual([])
    }
  })

  it('no translation value is empty', () => {
    for (const lang of LANGS) {
      const t = T[lang]
      for (const [key, value] of Object.entries(t)) {
        if (typeof value === 'string') {
          expect(value.trim().length, `${lang}.${key} is empty`).toBeGreaterThan(0)
        } else if (Array.isArray(value)) {
          expect(value.length, `${lang}.${key} array is empty`).toBeGreaterThan(0)
          for (const item of value) {
            expect(typeof item === 'string' && item.trim().length > 0, `${lang}.${key} has empty item`).toBe(true)
          }
        }
      }
    }
  })

  it('hero_phrases has exactly 4 phrases for each language', () => {
    for (const lang of LANGS) {
      expect(T[lang].hero_phrases, `${lang} hero_phrases`).toHaveLength(4)
    }
  })

  it('pricing features have 6 items each for all languages', () => {
    for (const lang of LANGS) {
      expect(T[lang].pricing_features_landing, `${lang} landing features`).toHaveLength(6)
      expect(T[lang].pricing_features_mvp, `${lang} mvp features`).toHaveLength(6)
      expect(T[lang].pricing_features_saas, `${lang} saas features`).toHaveLength(6)
    }
  })

  it('ES translations match expected values', () => {
    expect(T.es.nav_start_free).toBe('Empezar gratis')
    expect(T.es.hero_badge).toBe('Prototipo gratis en 24h')
    expect(T.es.chat_send).toBe('Enviar')
  })

  it('EN translations match expected values', () => {
    expect(T.en.nav_start_free).toBe('Start free')
    expect(T.en.hero_badge).toBe('Free prototype in 24h')
    expect(T.en.chat_send).toBe('Send')
  })

  it('CA translations are in Catalan', () => {
    expect(T.ca.nav_start_free).toBe('Comença gratis')
    expect(T.ca.hero_cta_primary).toBe('Descriu la teva idea')
  })

  it('GL translations are in Galician', () => {
    expect(T.gl.nav_start_free).toBe('Comezar gratis')
    expect(T.gl.hero_cta_primary).toBe('Describe a túa idea')
  })

  it('PT translations use Brazilian Portuguese', () => {
    expect(T.pt.hero_stat_price).toBe('R$0')
    expect(T.pt.chat_send).toBe('Enviar')
  })

  it('all languages have consistent key structure', () => {
    const esKeyCount = Object.keys(T.es).length
    for (const lang of LANGS) {
      expect(
        Object.keys(T[lang]).length,
        `${lang} has different number of keys than es`
      ).toBe(esKeyCount)
    }
  })
})
