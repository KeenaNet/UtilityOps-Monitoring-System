import type { ExportColumn } from '@/lib/export'
import { formatDateRangeLabel } from '@/lib/reportUtils'
import type { DateRange } from 'react-day-picker'

export type ReportType =
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'shift'
  | 'abnormal'
  | 'manual'
  | 'compressor'
  | 'water'

export type ReportRecord = {
  id: string
  name: string
  period: string
  generatedAt: string
  status: 'Generated' | 'Failed'
  type: ReportType
  area: string
}

export const reportTypeLabels: Record<ReportType, string> = {
  daily: 'Daily Utility Report',
  weekly: 'Weekly Summary',
  monthly: 'Monthly Overview',
  shift: 'Shift Consumption Report',
  abnormal: 'Abnormal Usage Report',
  manual: 'Manual Input Log',
  compressor: 'Compressor Performance Report',
  water: 'Water Usage Report',
}

export function buildReportId(): string {
  return `REP-${String(Date.now()).slice(-6)}`
}

export function buildPeriodLabel(dateRange: DateRange | undefined, reportType: ReportType): string {
  if (dateRange?.from) return formatDateRangeLabel(dateRange)
  const defaults: Record<ReportType, string> = {
    daily: '2026-06-01',
    weekly: 'Week 22, 2026',
    monthly: 'June 2026',
    shift: 'Shift 1 — 2026-06-01',
    abnormal: 'May 2026',
    manual: 'May 2026',
    compressor: 'May 2026',
    water: 'May 2026',
  }
  return defaults[reportType]
}

export function buildReportSummary(type: ReportType) {
  const base = {
    totalKwhElectricity: 12450,
    totalKwhCompressor: 3280,
    totalAirUsage: 14200,
    avgCompressorPressure: 7.2,
    abnormalEvents: 8,
    missingManualInput: 2,
    topUsageArea: 'Production Line A',
    notes: 'Follow-up scheduled for compressor pressure drop.',
  }

  if (type === 'weekly') {
    return {
      ...base,
      weekOverWeek: '+3.2%',
      topAbnormal: 'HIGH_POWER_USAGE (Line A)',
      shiftComparison: 'Shift 2 highest consumption',
    }
  }

  if (type === 'monthly') {
    return {
      ...base,
      monthlyConsumption: 73500,
      actualVsTarget: '105% of target',
      costEstimate: 'Rp.110.250.000',
      recommendation: 'Review idle compressor during weekend shifts.',
    }
  }

  if (type === 'manual') {
    return {
      inputCompletionRate: '94%',
      lateInput: 3,
      missingCheck: 2,
      readingAbnormal: 1,
      userSummary: 'Utility Operator 1 — 12 entries',
    }
  }

  return base
}

export function summaryToRows(summary: Record<string, string | number>): Record<string, string | number>[] {
  return Object.entries(summary).map(([key, value]) => ({
    metric: key.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase()),
    value: String(value),
  }))
}

export const summaryColumns: ExportColumn[] = [
  { key: 'metric', header: 'Metric' },
  { key: 'value', header: 'Value' },
]

export const abnormalEventColumns: ExportColumn[] = [
  { key: 'id', header: 'Event ID' },
  { key: 'area', header: 'Area' },
  { key: 'type', header: 'Type' },
  { key: 'severity', header: 'Severity' },
  { key: 'status', header: 'Status' },
]

export const mockAbnormalEventsForReport = [
  { id: 'AN-2042', area: 'Utility Building', type: 'PRESSURE_DROP', severity: 'High', status: 'Open' },
  { id: 'AN-2041', area: 'Production Line B', type: 'LOW_POWER_FACTOR', severity: 'Medium', status: 'Acknowledged' },
  { id: 'AN-2040', area: 'Production Line A', type: 'ABNORMAL_MANUAL_USAGE', severity: 'Low', status: 'In Progress' },
]
