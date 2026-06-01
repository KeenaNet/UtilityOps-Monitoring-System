import { useAppState, type AppPage } from '@/context/AppState'
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

const navItems: { page: AppPage; label: string; icon: typeof LayoutDashboard }[] = [
  { page: 'executive', label: 'Executive Summary', icon: PieChart },
  { page: 'dashboard', label: 'Operational Dash', icon: LayoutDashboard },
  { page: 'shift', label: 'Shift Dashboard', icon: Clock },
  { page: 'analytics', label: 'Analytics', icon: BarChart3 },
  { page: 'anomaly', label: 'Anomaly Dashboard', icon: Radar },
  { page: 'manual-input', label: 'Manual Input', icon: FileText },
  { page: 'alarm-center', label: 'Alarm Center', icon: AlertTriangle },
  { page: 'reporting', label: 'Reporting', icon: FileBarChart },
  { page: 'master-data', label: 'Master Data', icon: Database },
  { page: 'settings', label: 'Settings', icon: Settings },
]

type SidebarProps = {
  onLogout: () => void
}

export function Sidebar({ onLogout }: SidebarProps) {
  const { activePage, navigate, sidebarOpen, setSidebarOpen } = useAppState()

  const nav = (
    <>
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center shadow-[0_0_10px_rgba(59,130,246,0.3)]">
            <Activity className="h-5 w-5 text-primary" aria-hidden />
          </div>
          <span className="font-bold text-lg tracking-tight">UtilityOps</span>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="lg:hidden min-h-[44px] min-w-[44px]"
          onClick={() => setSidebarOpen(false)}
          aria-label="Tutup menu"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-2 overflow-y-auto custom-scrollbar" aria-label="Main">
        {navItems.map(({ page, label, icon: Icon }) => (
          <button
            key={page}
            type="button"
            onClick={() => navigate(page)}
            className={cn(
              'flex w-full items-center space-x-3 px-3 py-2.5 rounded-md text-left transition-colors min-h-[44px]',
              activePage === page
                ? 'bg-primary/10 text-primary font-medium'
                : 'text-muted-foreground hover:bg-white/5 hover:text-white'
            )}
            aria-current={activePage === page ? 'page' : undefined}
          >
            <Icon className="h-4 w-4 shrink-0" aria-hidden />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button
          type="button"
          onClick={onLogout}
          className="flex items-center space-x-3 px-3 py-2 w-full rounded-md text-muted-foreground hover:bg-red-500/10 hover:text-red-400 transition-colors min-h-[44px]"
        >
          <LogOut className="h-4 w-4" aria-hidden />
          <span>Logout</span>
        </button>
      </div>
    </>
  )

  return (
    <>
      {sidebarOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          aria-label="Tutup overlay menu"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}

      <aside
        className={cn(
          'fixed lg:static inset-y-0 left-0 z-50 w-64 border-r border-white/10 bg-card/95 backdrop-blur-xl flex flex-col h-screen transition-transform duration-200',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {nav}
      </aside>
    </>
  )
}
