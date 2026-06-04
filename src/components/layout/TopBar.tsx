import { useAppState } from '@/context/AppState'
import { useSettings } from '@/context/SettingsContext'
import { pageTitleKeyByPage } from '@/lib/i18n'
import { FilterBar, type FilterField } from '@/components/filters/FilterBar'
import { ThemeLanguageToggles } from '@/components/layout/ThemeLanguageToggles'
import { Button } from '@/components/ui/button'
import { Menu, PanelLeft, PanelLeftClose } from 'lucide-react'

const pageFilterConfig: Partial<Record<string, FilterField[]>> = {
  executive: ['period', 'area', 'utilityType'],
  dashboard: ['period', 'area', 'utilityType'],
  shift: ['period', 'area', 'utilityType'],
  analytics: ['period', 'utilityType', 'dateRange'],
  anomaly: ['severity', 'utilityType', 'area', 'status', 'pic', 'dateRange'],
  'alarm-center': ['severity', 'utilityType', 'area', 'status', 'pic'],
}

export function TopBar() {
  const { activePage, toggleSidebar, sidebarCollapsed } = useAppState()
  const { t } = useSettings()
  const filterFields = pageFilterConfig[activePage]

  return (
    <header className="sticky top-0 z-(--z-sticky) border-b border-border bg-background/80 backdrop-blur-md px-4 py-3 lg:px-6">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="shrink-0 min-h-[44px] min-w-[44px] bg-muted"
              onClick={toggleSidebar}
              aria-label={
                sidebarCollapsed ? t('topbar.openMenu') : t('topbar.closeMenu')
              }
            >
              <Menu className="h-5 w-5 lg:hidden" aria-hidden />
              {sidebarCollapsed ? (
                <PanelLeft className="h-5 w-5 hidden lg:block" aria-hidden />
              ) : (
                <PanelLeftClose className="h-5 w-5 hidden lg:block" aria-hidden />
              )}
            </Button>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-foreground truncate">
                {t(pageTitleKeyByPage[activePage])}
              </h1>
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mt-0.5">
                <span className="flex items-center">
                  <span
                    className="w-2 h-2 rounded-full bg-status-live mr-1.5 animate-pulse"
                    aria-hidden
                  />
                  {t('topbar.systemOnline')}
                </span>
                <span aria-hidden>•</span>
                <span>{t('topbar.lastUpdate')}</span>
              </div>
            </div>
          </div>
          <ThemeLanguageToggles touchFriendly />
        </div>
        {filterFields && filterFields.length > 0 ? (
          <FilterBar fields={filterFields} className="lg:justify-end" />
        ) : null}
      </div>
    </header>
  )
}
