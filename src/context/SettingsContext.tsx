import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { AppPage } from '@/context/AppState'
import {
  type AppLanguage,
  type ThemeMode,
  applyThemeToDocument,
  readDefaultView,
  readLanguage,
  readTheme,
  writeDefaultView,
  writeLanguage,
  writeTheme,
} from '@/lib/settingsStorage'
import { translate, type TranslationKey } from '@/lib/i18n'

type SettingsContextValue = {
  theme: ThemeMode
  language: AppLanguage
  defaultView: AppPage
  setTheme: (theme: ThemeMode) => void
  setLanguage: (language: AppLanguage) => void
  setDefaultView: (page: AppPage) => void
  t: (key: TranslationKey) => string
}

const SettingsContext = createContext<SettingsContextValue | null>(null)

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>(() => readTheme())
  const [language, setLanguageState] = useState<AppLanguage>(() => readLanguage())
  const [defaultView, setDefaultViewState] = useState<AppPage>(() => readDefaultView())

  useEffect(() => {
    applyThemeToDocument(theme)
    writeTheme(theme)
  }, [theme])

  useEffect(() => {
    writeLanguage(language)
  }, [language])

  useEffect(() => {
    writeDefaultView(defaultView)
  }, [defaultView])

  const setTheme = useCallback((next: ThemeMode) => setThemeState(next), [])
  const setLanguage = useCallback((next: AppLanguage) => setLanguageState(next), [])
  const setDefaultView = useCallback((next: AppPage) => setDefaultViewState(next), [])

  const t = useCallback((key: TranslationKey) => translate(key, language), [language])

  const value = useMemo(
    () => ({
      theme,
      language,
      defaultView,
      setTheme,
      setLanguage,
      setDefaultView,
      t,
    }),
    [theme, language, defaultView, setTheme, setLanguage, setDefaultView, t]
  )

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

export function useSettings() {
  const ctx = useContext(SettingsContext)
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider')
  return ctx
}
