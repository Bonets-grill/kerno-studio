export type Lang = 'es' | 'en' | 'fr' | 'de' | 'it' | 'pt' | 'ca' | 'gl'

export const LANGS: Lang[] = ['es', 'en', 'fr', 'de', 'it', 'pt', 'ca', 'gl']

export const LANG_LABELS: Record<Lang, string> = {
  es: 'Español',
  en: 'English',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
  pt: 'Português',
  ca: 'Català',
  gl: 'Galego',
}

export const LANG_FLAGS: Record<Lang, string> = {
  es: '🇪🇸',
  en: '🇬🇧',
  fr: '🇫🇷',
  de: '🇩🇪',
  it: '🇮🇹',
  pt: '🇧🇷',
  ca: '🏳️',
  gl: '🏳️',
}
