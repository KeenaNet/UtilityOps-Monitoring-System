import { useEffect, useState } from 'react'
import { WifiOff } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useSettings } from '@/context/SettingsContext'

/**
 * Standardized offline banner. Listens to browser connectivity and renders a
 * destructive Alert while offline. Mount once near the app shell root.
 */
export function OfflineBanner() {
  const { t } = useSettings()
  const [offline, setOffline] = useState(
    typeof navigator !== 'undefined' ? !navigator.onLine : false
  )

  useEffect(() => {
    const goOnline = () => setOffline(false)
    const goOffline = () => setOffline(true)
    window.addEventListener('online', goOnline)
    window.addEventListener('offline', goOffline)
    return () => {
      window.removeEventListener('online', goOnline)
      window.removeEventListener('offline', goOffline)
    }
  }, [])

  if (!offline) return null

  return (
    <Alert
      variant="destructive"
      className="rounded-none border-x-0 border-t-0"
      aria-live="assertive"
    >
      <WifiOff className="h-4 w-4" aria-hidden />
      <AlertTitle>{t('offline.title')}</AlertTitle>
      <AlertDescription>{t('offline.message')}</AlertDescription>
    </Alert>
  )
}
