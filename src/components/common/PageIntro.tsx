import type { ReactNode } from 'react'
import { PageDescription } from '@/components/common/PageDescription'
import type { TranslationKey } from '@/lib/i18n'
import { cn } from '@/lib/utils'

type PageIntroProps = {
  messageKey: TranslationKey
  values?: Record<string, string | number>
  /** Secondary actions (export, etc.) — aligned end on sm+ */
  actions?: ReactNode
  className?: string
}

/**
 * Page lead block: description first, optional actions on the same row (desktop).
 * Keeps readable line length and 16px+ gap between copy and controls.
 */
export function PageIntro({ messageKey, values, actions, className }: PageIntroProps) {
  return (
    <div
      className={cn(
        '-mt-2 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6',
        className
      )}
    >
      <PageDescription
        messageKey={messageKey}
        values={values}
        layout="inline"
        className="min-w-0 flex-1 max-w-3xl"
      />
      {actions ? (
        <div className="flex flex-wrap items-center gap-2 shrink-0 sm:justify-end">{actions}</div>
      ) : null}
    </div>
  )
}
