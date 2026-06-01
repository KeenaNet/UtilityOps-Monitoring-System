import { useAppState, pageTitles } from '@/context/AppState'
import { FilterBar, type FilterField } from '@/components/filters/FilterBar'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'

const pageFilterConfig: Partial<Record<string, FilterField[]>> = {
  executive: ['period', 'area', 'utilityType'],
  dashboard: ['period', 'area', 'utilityType'],
  shift: ['period', 'area', 'utilityType'],
  analytics: ['period', 'utilityType', 'dateRange'],
  anomaly: ['severity', 'utilityType', 'area', 'status', 'pic', 'dateRange'],
  'alarm-center': ['severity', 'utilityType', 'area', 'status', 'pic'],
}

export function TopBar() {
  const { activePage, setSidebarOpen } = useAppState()
  const filterFields = pageFilterConfig[activePage]

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-background/80 backdrop-blur-md px-4 py-3 lg:px-6">
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="lg:hidden shrink-0 min-h-[44px] min-w-[44px] bg-black/30"
              onClick={() => setSidebarOpen(true)}
              aria-label="Buka menu navigasi"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white truncate">
                {pageTitles[activePage]}
              </h1>
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mt-0.5">
                <span className="flex items-center">
                  <span
                    className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5 animate-pulse"
                    aria-hidden
                  />
                  System Online
                </span>
                <span aria-hidden>•</span>
                <span>Last update: Just now</span>
              </div>
            </div>
          </div>
        </div>
        {filterFields && filterFields.length > 0 ? (
          <FilterBar fields={filterFields} className="lg:justify-end" />
        ) : null}
      </div>
    </header>
  )
}
