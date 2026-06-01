import { useMemo } from 'react'
import { useSettings } from '@/context/SettingsContext'

function cssVar(name: string): string {
  if (typeof document === 'undefined') return ''
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return value ? `hsl(${value})` : ''
}

function readChartToken(name: string, fallback: string): string {
  const v = cssVar(name)
  return v || fallback
}

/** Recharts theme tokens aligned with CSS variables — reactive to data-theme */
export function getChartColors() {
  return {
    grid: readChartToken('--chart-grid', 'hsl(216 34% 17%)'),
    axis: readChartToken('--chart-axis', 'hsl(215.4 16.3% 56.9%)'),
    tooltipBg: readChartToken('--chart-tooltip-bg', 'hsl(224 71% 6%)'),
    tooltipBorder: readChartToken('--chart-tooltip-border', 'hsl(216 34% 25%)'),
    tooltipFg: readChartToken('--chart-tooltip-fg', 'hsl(213 31% 91%)'),
    primary: readChartToken('--chart-primary', 'hsl(217 91% 60%)'),
    cyan: readChartToken('--chart-cyan', 'hsl(187 85% 53%)'),
    emerald: readChartToken('--chart-emerald', 'hsl(160 84% 39%)'),
    rose: readChartToken('--chart-rose', 'hsl(350 89% 60%)'),
    amber: readChartToken('--chart-amber', 'hsl(45 93% 47%)'),
    violet: readChartToken('--chart-violet', 'hsl(258 90% 66%)'),
    teal: readChartToken('--chart-teal', 'hsl(172 66% 50%)'),
  }
}

/** Static fallback for modules that import at load time */
export const chartColors = getChartColors()

export function getChartTooltipStyle() {
  const c = getChartColors()
  return {
    backgroundColor: c.tooltipBg,
    borderColor: c.tooltipBorder,
    borderRadius: '8px',
    color: c.tooltipFg,
  }
}

export const chartTooltipStyle = getChartTooltipStyle()

export function getChartGridProps() {
  return {
    strokeDasharray: '3 3' as const,
    stroke: getChartColors().grid,
    vertical: false as const,
  }
}

export const chartGridProps = getChartGridProps()

export function getChartAxisProps() {
  return {
    stroke: getChartColors().axis,
    fontSize: 12,
    tickLine: false as const,
    axisLine: false as const,
  }
}

export const chartAxisProps = getChartAxisProps()

/** Re-read chart tokens when theme changes */
export function useChartTheme() {
  const { theme } = useSettings()
  return useMemo(
    () => ({
      colors: getChartColors(),
      tooltipStyle: getChartTooltipStyle(),
      gridProps: getChartGridProps(),
      axisProps: getChartAxisProps(),
    }),
    [theme]
  )
}
