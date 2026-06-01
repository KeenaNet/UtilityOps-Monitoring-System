import { useAppState, type AppPage } from '@/context/AppState'
import { useSettings } from '@/context/SettingsContext'
import { navKeyByPage } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import {
  Activity,
  LayoutDashboard,
  Settings,
  FileText,
  AlertTriangle,
  LogOut,
  Database,
  FileBarChart,
  BarChart3,
  PieChart,
  Radar,
  Clock,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const navItems: { page: AppPage; icon: typeof LayoutDashboard }[] = [
  { page: 'executive', icon: PieChart },
  { page: 'dashboard', icon: LayoutDashboard },
  { page: 'shift', icon: Clock },
  { page: 'analytics', icon: BarChart3 },
  { page: 'anomaly', icon: Radar },
  { page: 'manual-input', icon: FileText },
  { page: 'alarm-center', icon: AlertTriangle },
  { page: 'reporting', icon: FileBarChart },
  { page: 'master-data', icon: Database },
  { page: 'settings', icon: Settings },
]

type SidebarProps = {
  onLogout: () => void
}

export function Sidebar({ onLogout }: SidebarProps) {
  const { activePage, navigate, sidebarOpen, setSidebarOpen, sidebarCollapsed } = useAppState()
  const { t } = useSettings()

  const nav = (
    <>
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center shadow-[0_0_10px_hsl(var(--primary)/0.3)]">
            <Activity className="h-5 w-5 text-primary" aria-hidden />
          </div>
          <span className="font-bold text-lg tracking-tight">{t('app.name')}</span>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="lg:hidden min-h-[44px] min-w-[44px]"
          onClick={() => setSidebarOpen(false)}
          aria-label={t('sidebar.closeMenu')}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-2 overflow-y-auto custom-scrollbar" aria-label="Main">
        {navItems.map(({ page, icon: Icon }) => (
          <button
            key={page}
            type="button"
            onClick={() => navigate(page)}
            className={cn(
              'flex w-full items-center space-x-3 px-3 py-2.5 rounded-md text-left transition-colors min-h-[44px]',
              activePage === page
                ? 'bg-primary/10 text-primary font-medium'
                : 'text-muted-foreground hover:bg-accent hover:text-foreground'
            )}
            aria-current={activePage === page ? 'page' : undefined}
          >
            <Icon className="h-4 w-4 shrink-0" aria-hidden />
            <span>{t(navKeyByPage[page])}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <button
          type="button"
          onClick={onLogout}
          className="flex items-center space-x-3 px-3 py-2 w-full rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors min-h-[44px]"
        >
          <LogOut className="h-4 w-4" aria-hidden />
          <span>{t('nav.logout')}</span>
        </button>
      </div>
    </>
  )

  const hiddenOnDesktop = sidebarCollapsed

  return (
    <>
      {sidebarOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          aria-label={t('sidebar.closeOverlay')}
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}

      <aside
        className={cn(
          'fixed lg:static inset-y-0 left-0 z-50 w-64 border-r border-border bg-card/95 backdrop-blur-xl flex flex-col h-screen transition-all duration-200',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
          hiddenOnDesktop ? 'lg:-translate-x-full lg:w-0 lg:overflow-hidden lg:border-r-0' : 'lg:translate-x-0'
        )}
      >
        {nav}
      </aside>
    </>
  )
}
