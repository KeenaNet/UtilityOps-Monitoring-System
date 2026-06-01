import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

type KpiCardProps = {
  title: string
  value: React.ReactNode
  subtitle?: React.ReactNode
  icon?: LucideIcon
  iconClassName?: string
  className?: string
  onClick?: () => void
  ariaLabel?: string
}

export function KpiCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconClassName,
  className,
  onClick,
  ariaLabel,
}: KpiCardProps) {
  const interactive = Boolean(onClick)

  return (
    <Card
      className={cn(
        'glass-card transition-colors',
        interactive && 'cursor-pointer hover:border-primary/50 focus-within:ring-2 focus-within:ring-primary/40',
        className
      )}
      onClick={onClick}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onClick?.()
              }
            }
          : undefined
      }
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={ariaLabel ?? (interactive ? `${title}: lihat detail` : undefined)}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon ? <Icon className={cn('h-4 w-4', iconClassName)} aria-hidden /> : null}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {subtitle ? <div className="text-xs text-muted-foreground mt-1">{subtitle}</div> : null}
      </CardContent>
    </Card>
  )
}
