import type { PeriodFilter, UtilityFilter } from '@/context/AppState'

export type AnalyticsDimension =
  | 'shift'
  | 'day'
  | 'week'
  | 'month'
  | 'semester'
  | 'year'
  | 'area'
  | 'meter'

export type ChartPoint = {
  label: string
  actual: number
  baseline: number
  target: number
  [key: string]: string | number
}

const utilityScale: Record<Exclude<UtilityFilter, 'all'>, number> = {
  electricity: 1,
  water: 0.08,
  compressor: 0.35,
}

const periodScale: Record<PeriodFilter, number> = {
  today: 0.15,
  yesterday: 0.14,
  week: 1,
  month: 4.2,
  semester: 24,
  year: 52,
}

const shiftData: ChartPoint[] = [
  { label: 'Line A', actual: 450, baseline: 420, target: 400, shift1: 450, shift2: 420, shift3: 380 },
  { label: 'Line B', actual: 520, baseline: 500, target: 480, shift1: 520, shift2: 500, shift3: 410 },
  { label: 'Utility', actual: 180, baseline: 175, target: 170, shift1: 180, shift2: 175, shift3: 160 },
]

const dayData: ChartPoint[] = [
  { label: 'Mon', actual: 3200, baseline: 3000, target: 2900 },
  { label: 'Tue', actual: 3400, baseline: 3000, target: 2900 },
  { label: 'Wed', actual: 3100, baseline: 3000, target: 2900 },
  { label: 'Thu', actual: 3800, baseline: 3000, target: 2900 },
  { label: 'Fri', actual: 3500, baseline: 3000, target: 2900 },
  { label: 'Sat', actual: 2100, baseline: 2000, target: 1900 },
  { label: 'Sun', actual: 1900, baseline: 2000, target: 1900 },
]

const weekData: ChartPoint[] = [
  { label: 'W18', actual: 18500, baseline: 17500, target: 17000 },
  { label: 'W19', actual: 19200, baseline: 17500, target: 17000 },
  { label: 'W20', actual: 17800, baseline: 17500, target: 17000 },
  { label: 'W21', actual: 20100, baseline: 17500, target: 17000 },
  { label: 'W22', actual: 19600, baseline: 17500, target: 17000 },
]

const monthData: ChartPoint[] = [
  { label: 'Jan', actual: 72000, baseline: 70000, target: 68000 },
  { label: 'Feb', actual: 68000, baseline: 70000, target: 68000 },
  { label: 'Mar', actual: 71000, baseline: 70000, target: 68000 },
  { label: 'Apr', actual: 74000, baseline: 70000, target: 68000 },
  { label: 'May', actual: 73500, baseline: 70000, target: 68000 },
  { label: 'Jun', actual: 12000, baseline: 70000, target: 68000 },
]

const semesterData: ChartPoint[] = [
  { label: 'S1 2025', actual: 420000, baseline: 410000, target: 400000 },
  { label: 'S2 2025', actual: 435000, baseline: 410000, target: 400000 },
  { label: 'S1 2026', actual: 215000, baseline: 410000, target: 400000 },
]

const yearData: ChartPoint[] = [
  { label: '2023', actual: 820000, baseline: 800000, target: 780000 },
  { label: '2024', actual: 855000, baseline: 800000, target: 780000 },
  { label: '2025', actual: 855000, baseline: 800000, target: 780000 },
  { label: '2026 YTD', actual: 215000, baseline: 800000, target: 780000 },
]

const areaData: ChartPoint[] = [
  { label: 'Line A', actual: 1250, baseline: 1180, target: 1150 },
  { label: 'Line B', actual: 1430, baseline: 1350, target: 1300 },
  { label: 'Utility', actual: 515, baseline: 500, target: 480 },
  { label: 'Main Dist', actual: 890, baseline: 850, target: 820 },
]

const meterData: ChartPoint[] = [
  { label: 'ELC-A1', actual: 620, baseline: 580, target: 560 },
  { label: 'ELC-B2', actual: 710, baseline: 680, target: 650 },
  { label: 'CMP-01', actual: 280, baseline: 260, target: 250 },
  { label: 'WTR-A2', actual: 95, baseline: 90, target: 85 },
]

const baseByDimension: Record<AnalyticsDimension, ChartPoint[]> = {
  shift: shiftData,
  day: dayData,
  week: weekData,
  month: monthData,
  semester: semesterData,
  year: yearData,
  area: areaData,
  meter: meterData,
}

function scalePoint(point: ChartPoint, factor: number): ChartPoint {
  const scaled: ChartPoint = { ...point, label: point.label }
  for (const key of Object.keys(point)) {
    if (key === 'label') continue
    const v = point[key]
    if (typeof v === 'number') scaled[key] = Math.round(v * factor)
  }
  return scaled
}

export function getAnalyticsChartData(
  dimension: AnalyticsDimension,
  utility: UtilityFilter,
  period: PeriodFilter
): ChartPoint[] {
  const uScale = utility === 'all' ? 1 : utilityScale[utility]
  const pScale = periodScale[period]
  const factor = uScale * pScale
  return baseByDimension[dimension].map((p) => scalePoint(p, factor))
}

export const analyticsByDimension = baseByDimension

export const dimensionLabels: Record<AnalyticsDimension, string> = {
  shift: 'By Shift',
  day: 'By Day',
  week: 'By Week',
  month: 'By Month',
  semester: 'By Semester',
  year: 'By Year',
  area: 'By Area',
  meter: 'By Meter',
}

export function utilityUnit(utility: UtilityFilter): string {
  if (utility === 'water') return 'm³'
  if (utility === 'compressor') return 'kWh'
  return 'kWh'
}
