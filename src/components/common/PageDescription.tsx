import { useSettings } from '@/context/SettingsContext'
import { formatTranslation, type TranslationKey } from '@/lib/i18n'
import { cn } from '@/lib/utils'

type PageDescriptionProps = {
  messageKey: TranslationKey
  values?: Record<string, string | number>
  /** standalone: directly under TopBar; inline: inside PageIntro */
  layout?: 'standalone' | 'inline'
  className?: string
}

/** Secondary line under TopBar — sentence case, i18n, not PRD requirement IDs */
export function PageDescription({
  messageKey,
  values,
  layout = 'standalone',
  className,
}: PageDescriptionProps) {
  const { t, language } = useSettings()
  const text = formatTranslation(t(messageKey), values)

  return (
    <p
      className={cn(
        'text-sm text-muted-foreground leading-relaxed',
        layout === 'standalone' && '-mt-2',
        className
      )}
      lang={language}
    >
      {text}
    </p>
  )
}
