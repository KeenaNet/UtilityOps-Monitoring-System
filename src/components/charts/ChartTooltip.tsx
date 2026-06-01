import { chartTooltipStyle } from './chartTheme'

export function getChartTooltipProps() {
  return { contentStyle: chartTooltipStyle, cursor: { fill: 'rgba(255,255,255,0.06)' } }
}
