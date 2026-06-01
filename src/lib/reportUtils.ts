import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import type { DateRange } from 'react-day-picker'

export function formatDateRangeLabel(range: DateRange | undefined): string {
  if (!range?.from) return 'Pilih rentang tanggal'
  if (!range.to) return format(range.from, 'PPP', { locale: id })
  if (range.from.getTime() === range.to.getTime()) {
    return format(range.from, 'PPP', { locale: id })
  }
  return `${format(range.from, 'd MMM yyyy', { locale: id })} – ${format(range.to, 'd MMM yyyy', { locale: id })}`
}
