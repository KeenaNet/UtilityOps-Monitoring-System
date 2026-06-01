import { Skeleton } from '@/components/ui/skeleton'
import { useSimulatedLoading } from '@/lib/useSimulatedLoading'
import { cn } from '@/lib/utils'

type PageShellProps = {
  children: React.ReactNode
  loadingDeps?: unknown[]
  className?: string
}

export function PageShell({ children, loadingDeps = [], className }: PageShellProps) {
  const loading = useSimulatedLoading(loadingDeps)

  if (loading) {
    return (
      <div className={cn('flex-1 overflow-auto bg-background/50 p-6 space-y-6', className)}>
        <div className="flex justify-between gap-4">
          <Skeleton className="h-9 w-64" />
          <Skeleton className="h-9 w-48" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-28 w-full" />
          ))}
        </div>
        <Skeleton className="h-[320px] w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    )
  }

  return <>{children}</>
}
