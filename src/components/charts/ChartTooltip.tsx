import type { TooltipProps } from 'recharts'
import { formatNumber, formatPercent } from '@/lib/format'
import { chartColors, chartTooltipStyle } from './chartTheme'

const tooltipTextColor = 'hsl(213 31% 91%)'
const tooltipMutedColor = 'hsl(215 16% 70%)'

export const chartTooltipLabelStyle = {
  color: tooltipTextColor,
  fontWeight: 600,
}

export const chartTooltipItemStyle = {
  color: tooltipTextColor,
}

export function getChartTooltipProps() {
  return {
    contentStyle: chartTooltipStyle,
    labelStyle: chartTooltipLabelStyle,
    itemStyle: chartTooltipItemStyle,
    cursor: { fill: 'rgba(255,255,255,0.06)' },
  }
}

type PieTooltipEntry = {
  name?: string
  value?: number
  color?: string
  payload?: { name?: string; value?: number }
  percent?: number
}

/** High-contrast tooltip for donut/pie charts (default Recharts uses slice color for text). */
export function ChartPieTooltipContent({
  active,
  payload,
}: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null

  const entry = payload[0] as PieTooltipEntry
  const name = String(entry.name ?? entry.payload?.name ?? '')
  const value = Number(entry.value ?? entry.payload?.value ?? 0)
  const percent = entry.percent != null ? entry.percent * 100 : undefined
  const sliceColor = entry.color ?? chartColors.axis

  return (
    <div
      className="rounded-lg border px-3 py-2 text-sm shadow-lg"
      style={{
        backgroundColor: chartColors.tooltipBg,
        borderColor: chartColors.tooltipBorder,
      }}
      role="tooltip"
    >
      <div className="flex items-center gap-2">
        <span
          className="h-2.5 w-2.5 shrink-0 rounded-full"
          style={{ backgroundColor: sliceColor }}
          aria-hidden
        />
        <span className="font-semibold" style={{ color: tooltipTextColor }}>
          {name}
        </span>
      </div>
      <p className="mt-1 pl-4" style={{ color: tooltipTextColor }}>
        {formatNumber(value)} {value === 1 ? 'anomali' : 'anomali'}
        {percent != null && (
          <span style={{ color: tooltipMutedColor }}> · {formatPercent(percent, 1)}</span>
        )}
      </p>
    </div>
  )
}
