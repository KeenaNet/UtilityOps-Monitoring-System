import { Button } from '@/components/ui/button'
import { formatNumber } from '@/lib/format'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type TablePaginationProps = {
  page: number
  pageCount: number
  total: number
  onPageChange: (page: number) => void
}

export function TablePagination({ page, pageCount, total, onPageChange }: TablePaginationProps) {
  if (total === 0) return null

  return (
    <div className="flex items-center justify-between pt-4 border-t border-border">
      <p className="text-xs text-muted-foreground">
        Total {formatNumber(total)} baris · Halaman {page + 1} / {pageCount}
      </p>
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="min-h-[44px] min-w-[44px] bg-muted"
          disabled={page <= 0}
          onClick={() => onPageChange(page - 1)}
          aria-label="Halaman sebelumnya"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="min-h-[44px] min-w-[44px] bg-muted"
          disabled={page >= pageCount - 1}
          onClick={() => onPageChange(page + 1)}
          aria-label="Halaman berikutnya"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
