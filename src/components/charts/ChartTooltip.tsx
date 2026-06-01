import type { TooltipProps } from 'recharts'
import { formatNumber, formatPercent } from '@/lib/format'
import { useChartTheme } from './chartTheme'

export function useChartTooltipProps() {
  const { tooltipStyle, colors } = useChartTheme()
  return {
    contentStyle: tooltipStyle,
    labelStyle: { color: colors.tooltipFg, fontWeight: 600 },
    itemStyle: { color: colors.tooltipFg },
    cursor: { fill: 'hsl(var(--surface))' },
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
  const { colors } = useChartTheme()

  if (!active || !payload?.length) return null

  const entry = payload[0] as PieTooltipEntry
  const name = String(entry.name ?? entry.payload?.name ?? '')
  const value = Number(entry.value ?? entry.payload?.value ?? 0)
  const percent = entry.percent != null ? entry.percent * 100 : undefined
  const sliceColor = entry.color ?? colors.axis

  return (
    <div
      className="rounded-lg border px-3 py-2 text-sm shadow-lg"
      style={{
        backgroundColor: colors.tooltipBg,
        borderColor: colors.tooltipBorder,
        color: colors.tooltipFg,
      }}
      role="tooltip"
    >
      <div className="flex items-center gap-2">
        <span
          className="h-2.5 w-2.5 shrink-0 rounded-full"
          style={{ backgroundColor: sliceColor }}
          aria-hidden
        />
        <span className="font-semibold">{name}</span>
      </div>
      <p className="mt-1 pl-4 text-muted-foreground">
        {formatNumber(value)} {value === 1 ? 'anomali' : 'anomali'}
        {percent != null && <span> · {formatPercent(percent, 1)}</span>}
      </p>
    </div>
  )
}
