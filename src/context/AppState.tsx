import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { DateRange } from 'react-day-picker'

export type AppPage =
  | 'executive'
  | 'dashboard'
  | 'shift'
  | 'analytics'
  | 'anomaly'
  | 'manual-input'
  | 'alarm-center'
  | 'reporting'
  | 'master-data'
  | 'settings'

export type UtilityFilter = 'all' | 'electricity' | 'water' | 'compressor'
export type AreaFilter = 'all' | 'line-a' | 'line-b' | 'utility' | 'main-dist'
export type StatusFilter =
  | 'all'
  | 'open'
  | 'acknowledged'
  | 'in progress'
  | 'closed'
  | 'active'
export type SeverityFilter = 'all' | 'critical' | 'high' | 'medium' | 'low'
export type PicFilter = 'all' | 'unassigned' | 'eng1' | 'util1'
export type PeriodFilter = 'today' | 'yesterday' | 'week' | 'month' | 'semester' | 'year'

export type AppFilters = {
  utilityType: UtilityFilter
  area: AreaFilter
  status: StatusFilter
  severity: SeverityFilter
  pic: PicFilter
  period: PeriodFilter
  dateRange?: DateRange
}

export const defaultFilters: AppFilters = {
  utilityType: 'all',
  area: 'all',
  status: 'all',
  severity: 'all',
  pic: 'all',
  period: 'week',
  dateRange: undefined,
}

export const pageTitles: Record<AppPage, string> = {
  executive: 'Executive Summary',
  dashboard: 'Operational Dashboard',
  shift: 'Shift Dashboard',
  analytics: 'Consumption Analytics',
  anomaly: 'Anomaly Dashboard',
  'manual-input': 'Manual Input',
  'alarm-center': 'Alarm Center',
  reporting: 'Reporting',
  'master-data': 'Master Data',
  settings: 'Settings',
}

type NavigateOptions = {
  filters?: Partial<AppFilters>
  mergeFilters?: boolean
}

type AppStateContextValue = {
  activePage: AppPage
  filters: AppFilters
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  setFilters: (patch: Partial<AppFilters>) => void
  resetFilters: () => void
  navigate: (page: AppPage, options?: NavigateOptions) => void
}

const AppStateContext = createContext<AppStateContextValue | null>(null)

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [activePage, setActivePage] = useState<AppPage>('dashboard')
  const [filters, setFiltersState] = useState<AppFilters>(defaultFilters)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const setFilters = useCallback((patch: Partial<AppFilters>) => {
    setFiltersState((prev) => ({ ...prev, ...patch }))
  }, [])

  const resetFilters = useCallback(() => {
    setFiltersState(defaultFilters)
  }, [])

  const navigate = useCallback((page: AppPage, options?: NavigateOptions) => {
    setActivePage(page)
    setSidebarOpen(false)
    if (options?.filters) {
      setFiltersState((prev) =>
        options.mergeFilters === false
          ? { ...defaultFilters, ...options.filters }
          : { ...prev, ...options.filters }
      )
    }
  }, [])

  const value = useMemo(
    () => ({
      activePage,
      filters,
      sidebarOpen,
      setSidebarOpen,
      setFilters,
      resetFilters,
      navigate,
    }),
    [activePage, filters, sidebarOpen, setFilters, resetFilters, navigate]
  )

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
}

export function useAppState() {
  const ctx = useContext(AppStateContext)
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider')
  return ctx
}
