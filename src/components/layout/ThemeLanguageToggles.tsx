import { Button } from '@/components/ui/button'
import { useSettings } from '@/context/SettingsContext'
import { cn } from '@/lib/utils'
import { Globe, Moon, Sun } from 'lucide-react'

type ThemeLanguageTogglesProps = {
  className?: string
  /** Use 44px touch targets (app shell); default matches login compact controls */
  touchFriendly?: boolean
}

export function ThemeLanguageToggles({
  className,
  touchFriendly = false,
}: ThemeLanguageTogglesProps) {
  const { t, language, setLanguage, theme, setTheme } = useSettings()

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'id' : 'en')
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const iconBtnClass = cn(
    'text-muted-foreground hover:text-foreground',
    touchFriendly ? 'min-h-[44px] min-w-[44px]' : 'h-8 w-8'
  )
  const langBtnClass = cn(
    'gap-1.5 text-muted-foreground hover:text-foreground text-xs font-medium',
    touchFriendly ? 'min-h-[44px] px-3' : 'h-8'
  )

  return (
    <div className={cn('flex items-center gap-2 shrink-0', className)}>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className={iconBtnClass}
        aria-label={t('preferences.toggleTheme')}
      >
        {theme === 'dark' ? (
          <Sun className="h-4 w-4" aria-hidden />
        ) : (
          <Moon className="h-4 w-4" aria-hidden />
        )}
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={toggleLanguage}
        className={langBtnClass}
        aria-label={t('preferences.toggleLanguage')}
      >
        <Globe className="h-4 w-4" aria-hidden />
        {language === 'en' ? 'ID' : 'EN'}
      </Button>
    </div>
  )
}
