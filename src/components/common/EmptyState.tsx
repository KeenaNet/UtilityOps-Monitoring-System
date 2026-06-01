import type { LucideIcon } from 'lucide-react'
import { Inbox } from 'lucide-react'
import { cn } from '@/lib/utils'

type EmptyStateProps = {
  icon?: LucideIcon
  title?: string
  message: string
  className?: string
  action?: React.ReactNode
}

export function EmptyState({
  icon: Icon = Inbox,
  title = 'Tidak ada data',
  message,
  className,
  action,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-12 px-4 text-center',
        className
      )}
      role="status"
    >
      <Icon className="h-10 w-10 text-muted-foreground/60 mb-3" aria-hidden />
      <p className="text-sm font-medium text-foreground">{title}</p>
      <p className="text-xs text-muted-foreground mt-1 max-w-sm">{message}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  )
}
