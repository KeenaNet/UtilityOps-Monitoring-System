import type { AppPage } from '@/context/AppState'

export type ThemeMode = 'dark' | 'light'
export type AppLanguage = 'id' | 'en'

const KEYS = {
  theme: 'utilityops-theme',
  language: 'utilityops-language',
  defaultView: 'utilityops-default-view',
} as const

const VALID_PAGES: AppPage[] = [
  'executive',
  'dashboard',
  'shift',
  'analytics',
  'anomaly',
  'manual-input',
  'alarm-center',
  'reporting',
  'master-data',
  'settings',
]

export function readTheme(): ThemeMode {
  const v = localStorage.getItem(KEYS.theme)
  return v === 'light' ? 'light' : 'dark'
}

export function readLanguage(): AppLanguage {
  const v = localStorage.getItem(KEYS.language)
  return v === 'en' ? 'en' : 'id'
}

export function readDefaultView(): AppPage {
  const v = localStorage.getItem(KEYS.defaultView)
  if (v && VALID_PAGES.includes(v as AppPage)) return v as AppPage
  return 'dashboard'
}

export function writeTheme(theme: ThemeMode) {
  localStorage.setItem(KEYS.theme, theme)
}

export function writeLanguage(language: AppLanguage) {
  localStorage.setItem(KEYS.language, language)
}

export function writeDefaultView(page: AppPage) {
  localStorage.setItem(KEYS.defaultView, page)
}

export function applyThemeToDocument(theme: ThemeMode) {
  document.documentElement.dataset.theme = theme
  document.documentElement.style.colorScheme = theme
}
