import { I18nProvider } from '@/lib/i18n/context'

export function TestWrapper({ children }: { children: React.ReactNode }) {
  return <I18nProvider>{children}</I18nProvider>
}
