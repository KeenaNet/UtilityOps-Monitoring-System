import { useAppState } from '@/context/AppState'
import { useSettings } from '@/context/SettingsContext'
import { areaLabels } from '@/lib/filterUtils'
import { formatDateRangeLabel } from '@/lib/reportUtils'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Calendar as CalendarIcon, RotateCcw } from 'lucide-react'
import { id as localeId, enUS } from 'date-fns/locale'

export type FilterField =
  | 'dateRange'
  | 'utilityType'
  | 'area'
  | 'status'
  | 'severity'
  | 'pic'
  | 'period'

type FilterBarProps = {
  fields: FilterField[]
  className?: string
  compact?: boolean
}

export function FilterBar({ fields, className, compact }: FilterBarProps) {
  const { filters, setFilters, resetFilters } = useAppState()
  const { t, language } = useSettings()
  const dateLocale = language === 'id' ? localeId : enUS

  const selectClass = compact
    ? 'w-full min-h-[44px] bg-input'
    : 'w-[140px] min-h-[44px] bg-input'

  return (
    <div
      className={cn('flex flex-wrap items-end gap-2', className)}
      role="search"
      aria-label={t('filter.ariaLabel')}
    >
      {fields.includes('dateRange') && (
        <div className="space-y-1">
          {!compact && (
            <Label className="text-xs text-muted-foreground sr-only">{t('filter.dateRange')}</Label>
          )}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className={cn(
                  'justify-start text-left font-normal bg-input border-input hover:bg-accent min-h-[44px]',
                  compact ? 'w-full' : 'w-[200px] lg:w-[240px]',
                  !filters.dateRange?.from && 'text-muted-foreground'
                )}
                aria-label={t('filter.dateRange')}
              >
                <CalendarIcon className="mr-2 h-4 w-4 shrink-0" aria-hidden />
                <span className="truncate">{formatDateRangeLabel(filters.dateRange)}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 glass-card" align="end">
              <Calendar
                mode="range"
                defaultMonth={filters.dateRange?.from}
                selected={filters.dateRange}
                onSelect={(range) => setFilters({ dateRange: range })}
                numberOfMonths={compact ? 1 : 2}
                locale={dateLocale}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      )}

      {fields.includes('period') && (
        <Select value={filters.period} onValueChange={(v) => setFilters({ period: v as typeof filters.period })}>
          <SelectTrigger className={selectClass} aria-label={t('filter.period')}>
            <SelectValue placeholder={t('filter.period')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today" className="min-h-[44px]">{t('filter.period.today')}</SelectItem>
            <SelectItem value="yesterday" className="min-h-[44px]">{t('filter.period.yesterday')}</SelectItem>
            <SelectItem value="week" className="min-h-[44px]">{t('filter.period.week')}</SelectItem>
            <SelectItem value="month" className="min-h-[44px]">{t('filter.period.month')}</SelectItem>
            <SelectItem value="semester" className="min-h-[44px]">{t('filter.period.semester')}</SelectItem>
            <SelectItem value="year" className="min-h-[44px]">{t('filter.period.year')}</SelectItem>
          </SelectContent>
        </Select>
      )}

      {fields.includes('utilityType') && (
        <Select
          value={filters.utilityType}
          onValueChange={(v) => setFilters({ utilityType: v as typeof filters.utilityType })}
        >
          <SelectTrigger className={selectClass} aria-label={t('filter.utility')}>
            <SelectValue placeholder={t('filter.utility')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="min-h-[44px]">{t('filter.utility.all')}</SelectItem>
            <SelectItem value="electricity" className="min-h-[44px]">{t('filter.utility.electricity')}</SelectItem>
            <SelectItem value="water" className="min-h-[44px]">{t('filter.utility.water')}</SelectItem>
            <SelectItem value="compressor" className="min-h-[44px]">{t('filter.utility.compressor')}</SelectItem>
          </SelectContent>
        </Select>
      )}

      {fields.includes('area') && (
        <Select value={filters.area} onValueChange={(v) => setFilters({ area: v as typeof filters.area })}>
          <SelectTrigger className={selectClass} aria-label={t('filter.area')}>
            <SelectValue placeholder={t('filter.area')} />
          </SelectTrigger>
          <SelectContent>
            {(Object.keys(areaLabels) as Array<keyof typeof areaLabels>).map((key) => (
              <SelectItem key={key} value={key} className="min-h-[44px]">
                {areaLabels[key]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {fields.includes('severity') && (
        <Select
          value={filters.severity}
          onValueChange={(v) => setFilters({ severity: v as typeof filters.severity })}
        >
          <SelectTrigger className={selectClass} aria-label={t('filter.severity')}>
            <SelectValue placeholder={t('filter.severity')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="min-h-[44px]">{t('filter.severity.all')}</SelectItem>
            <SelectItem value="critical" className="min-h-[44px]">{t('filter.severity.critical')}</SelectItem>
            <SelectItem value="high" className="min-h-[44px]">{t('filter.severity.high')}</SelectItem>
            <SelectItem value="medium" className="min-h-[44px]">{t('filter.severity.medium')}</SelectItem>
            <SelectItem value="low" className="min-h-[44px]">{t('filter.severity.low')}</SelectItem>
          </SelectContent>
        </Select>
      )}

      {fields.includes('status') && (
        <Select value={filters.status} onValueChange={(v) => setFilters({ status: v as typeof filters.status })}>
          <SelectTrigger className={selectClass} aria-label={t('filter.status')}>
            <SelectValue placeholder={t('filter.status')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="min-h-[44px]">{t('filter.status.all')}</SelectItem>
            <SelectItem value="active" className="min-h-[44px]">{t('filter.status.active')}</SelectItem>
            <SelectItem value="open" className="min-h-[44px]">{t('filter.status.open')}</SelectItem>
            <SelectItem value="acknowledged" className="min-h-[44px]">{t('filter.status.acknowledged')}</SelectItem>
            <SelectItem value="in progress" className="min-h-[44px]">{t('filter.status.inProgress')}</SelectItem>
            <SelectItem value="closed" className="min-h-[44px]">{t('filter.status.closed')}</SelectItem>
          </SelectContent>
        </Select>
      )}

      {fields.includes('pic') && (
        <Select value={filters.pic} onValueChange={(v) => setFilters({ pic: v as typeof filters.pic })}>
          <SelectTrigger className={selectClass} aria-label={t('filter.pic')}>
            <SelectValue placeholder={t('filter.pic')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="min-h-[44px]">{t('filter.pic.all')}</SelectItem>
            <SelectItem value="unassigned" className="min-h-[44px]">{t('filter.pic.unassigned')}</SelectItem>
            <SelectItem value="eng1" className="min-h-[44px]">{t('filter.pic.eng1')}</SelectItem>
            <SelectItem value="util1" className="min-h-[44px]">{t('filter.pic.util1')}</SelectItem>
          </SelectContent>
        </Select>
      )}

      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="min-h-[44px] text-muted-foreground hover:text-foreground"
        onClick={resetFilters}
        aria-label={t('filter.reset')}
      >
        <RotateCcw className="h-4 w-4 mr-1" />
        {t('filter.reset')}
      </Button>
    </div>
  )
}
