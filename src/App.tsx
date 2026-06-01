import { useState } from 'react'
import { AppStateProvider, useAppState } from '@/context/AppState'
import { SettingsProvider } from '@/context/SettingsContext'
import Login from '@/pages/Login'
import Dashboard from '@/pages/Dashboard'
import ManualInput from '@/pages/ManualInput'
import AlarmCenter from '@/pages/AlarmCenter'
import Settings from '@/pages/Settings'
import MasterData from '@/pages/MasterData'
import Reporting from '@/pages/Reporting'
import Analytics from '@/pages/Analytics'
import AnomalyDashboard from '@/pages/AnomalyDashboard'
import ExecutiveDashboard from '@/pages/ExecutiveDashboard'
import ShiftDashboard from '@/pages/ShiftDashboard'
import { Sidebar } from '@/components/layout/Sidebar'
import { TopBar } from '@/components/layout/TopBar'

function AppRoutes() {
  const { activePage } = useAppState()

  switch (activePage) {
    case 'executive':
      return <ExecutiveDashboard />
    case 'dashboard':
      return <Dashboard />
    case 'shift':
      return <ShiftDashboard />
    case 'analytics':
      return <Analytics />
    case 'anomaly':
      return <AnomalyDashboard />
    case 'manual-input':
      return <ManualInput />
    case 'alarm-center':
      return <AlarmCenter />
    case 'reporting':
      return <Reporting />
    case 'master-data':
      return <MasterData />
    case 'settings':
      return <Settings />
    default:
      return <Dashboard />
  }
}

function AuthenticatedApp({ onLogout }: { onLogout: () => void }) {
  return (
    <AppStateProvider>
      <div className="flex h-screen bg-background text-foreground overflow-hidden selection:bg-primary/30">
        <Sidebar onLogout={onLogout} />
        <div className="flex-1 flex flex-col min-w-0 relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <TopBar />
          <AppRoutes />
        </div>
      </div>
    </AppStateProvider>
  )
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <SettingsProvider>
      {!isAuthenticated ? (
        <Login onLogin={() => setIsAuthenticated(true)} />
      ) : (
        <AuthenticatedApp onLogout={() => setIsAuthenticated(false)} />
      )}
    </SettingsProvider>
  )
}

export default App
