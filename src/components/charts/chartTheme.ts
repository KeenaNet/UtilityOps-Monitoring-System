/** Recharts theme tokens aligned with CSS variables */
export const chartColors = {
  grid: 'hsl(216 34% 17%)',
  axis: 'hsl(215.4 16.3% 56.9%)',
  tooltipBg: 'hsl(224 71% 6%)',
  tooltipBorder: 'hsl(216 34% 25%)',
  primary: 'hsl(217 91% 60%)',
  cyan: 'hsl(187 85% 53%)',
  emerald: 'hsl(160 84% 39%)',
  rose: 'hsl(350 89% 60%)',
  amber: 'hsl(45 93% 47%)',
  violet: 'hsl(258 90% 66%)',
  teal: 'hsl(172 66% 50%)',
}

export const chartTooltipStyle = {
  backgroundColor: chartColors.tooltipBg,
  borderColor: chartColors.tooltipBorder,
  borderRadius: '8px',
  color: 'hsl(213 31% 91%)',
}

export const chartGridProps = {
  strokeDasharray: '3 3',
  stroke: chartColors.grid,
  vertical: false as const,
}

export const chartAxisProps = {
  stroke: chartColors.axis,
  fontSize: 12,
  tickLine: false as const,
  axisLine: false as const,
}
