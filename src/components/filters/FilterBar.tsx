import { useAppState } from '@/context/AppState'
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
import { id as localeId } from 'date-fns/locale'

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

  const selectClass = compact ? 'w-full min-h-[44px] bg-black/50' : 'w-[140px] min-h-[44px] bg-black/50'

  return (
    <div
      className={cn('flex flex-wrap items-end gap-2', className)}
      role="search"
      aria-label="Filter data dashboard"
    >
      {fields.includes('dateRange') && (
        <div className="space-y-1">
          {!compact && (
            <Label className="text-xs text-muted-foreground sr-only">Rentang tanggal</Label>
          )}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className={cn(
                  'justify-start text-left font-normal bg-black/50 border-input hover:bg-black/70 min-h-[44px]',
                  compact ? 'w-full' : 'w-[200px] lg:w-[240px]',
                  !filters.dateRange?.from && 'text-muted-foreground'
                )}
                aria-label="Pilih rentang tanggal"
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
                locale={localeId}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      )}

      {fields.includes('period') && (
        <Select value={filters.period} onValueChange={(v) => setFilters({ period: v as typeof filters.period })}>
          <SelectTrigger className={selectClass} aria-label="Periode">
            <SelectValue placeholder="Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today" className="min-h-[44px]">Today</SelectItem>
            <SelectItem value="yesterday" className="min-h-[44px]">Yesterday</SelectItem>
            <SelectItem value="week" className="min-h-[44px]">This Week</SelectItem>
            <SelectItem value="month" className="min-h-[44px]">This Month</SelectItem>
            <SelectItem value="semester" className="min-h-[44px]">This Semester</SelectItem>
            <SelectItem value="year" className="min-h-[44px]">This Year</SelectItem>
          </SelectContent>
        </Select>
      )}

      {fields.includes('utilityType') && (
        <Select
          value={filters.utilityType}
          onValueChange={(v) => setFilters({ utilityType: v as typeof filters.utilityType })}
        >
          <SelectTrigger className={selectClass} aria-label="Jenis utility">
            <SelectValue placeholder="Utility" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="min-h-[44px]">All Utilities</SelectItem>
            <SelectItem value="electricity" className="min-h-[44px]">Electricity</SelectItem>
            <SelectItem value="water" className="min-h-[44px]">Water</SelectItem>
            <SelectItem value="compressor" className="min-h-[44px]">Compressor</SelectItem>
          </SelectContent>
        </Select>
      )}

      {fields.includes('area') && (
        <Select value={filters.area} onValueChange={(v) => setFilters({ area: v as typeof filters.area })}>
          <SelectTrigger className={selectClass} aria-label="Area / plant">
            <SelectValue placeholder="Area" />
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
          <SelectTrigger className={selectClass} aria-label="Tingkat severity">
            <SelectValue placeholder="Severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="min-h-[44px]">All Severities</SelectItem>
            <SelectItem value="critical" className="min-h-[44px]">Critical</SelectItem>
            <SelectItem value="high" className="min-h-[44px]">High</SelectItem>
            <SelectItem value="medium" className="min-h-[44px]">Medium</SelectItem>
            <SelectItem value="low" className="min-h-[44px]">Low</SelectItem>
          </SelectContent>
        </Select>
      )}

      {fields.includes('status') && (
        <Select value={filters.status} onValueChange={(v) => setFilters({ status: v as typeof filters.status })}>
          <SelectTrigger className={selectClass} aria-label="Status">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="min-h-[44px]">All Statuses</SelectItem>
            <SelectItem value="active" className="min-h-[44px]">Active / Open</SelectItem>
            <SelectItem value="open" className="min-h-[44px]">Open</SelectItem>
            <SelectItem value="acknowledged" className="min-h-[44px]">Acknowledged</SelectItem>
            <SelectItem value="in progress" className="min-h-[44px]">In Progress</SelectItem>
            <SelectItem value="closed" className="min-h-[44px]">Closed</SelectItem>
          </SelectContent>
        </Select>
      )}

      {fields.includes('pic') && (
        <Select value={filters.pic} onValueChange={(v) => setFilters({ pic: v as typeof filters.pic })}>
          <SelectTrigger className={selectClass} aria-label="PIC">
            <SelectValue placeholder="PIC" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="min-h-[44px]">All PIC</SelectItem>
            <SelectItem value="unassigned" className="min-h-[44px]">Unassigned</SelectItem>
            <SelectItem value="eng1" className="min-h-[44px]">Engineering Team 1</SelectItem>
            <SelectItem value="util1" className="min-h-[44px]">Utility Operator 1</SelectItem>
          </SelectContent>
        </Select>
      )}

      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="min-h-[44px] text-muted-foreground hover:text-white"
        onClick={resetFilters}
        aria-label="Reset filter"
      >
        <RotateCcw className="h-4 w-4 mr-1" />
        Reset
      </Button>
    </div>
  )
}
