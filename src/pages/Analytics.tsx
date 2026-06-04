import { useMemo, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { PageIntro } from '@/components/common/PageIntro'
import { PageShell } from '@/components/common/PageShell'
import { EmptyState } from '@/components/common/EmptyState'
import { ResponsiveTable } from '@/components/common/ResponsiveTable'
import { useAppState } from '@/context/AppState'
import { formatNumber } from '@/lib/format'
import { exportToExcel, exportToPdf } from '@/lib/export'
import {
  dimensionLabels,
  getAnalyticsChartData,
  utilityUnit,
  type AnalyticsDimension,
} from '@/data/mockAnalytics'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Download, FileSpreadsheet } from 'lucide-react'
import { useChartTheme } from '@/components/charts/chartTheme'
import { useChartTooltipProps } from '@/components/charts/ChartTooltip'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const DIMENSIONS: AnalyticsDimension[] = [
  'shift',
  'day',
  'week',
  'month',
  'semester',
  'year',
  'area',
  'meter',
]

export default function Analytics() {
  const { colors: chartColors, gridProps: chartGridProps, axisProps: chartAxisProps } = useChartTheme()
  const chartTooltipProps = useChartTooltipProps()
  const { filters } = useAppState()
  const [dimension, setDimension] = useState<AnalyticsDimension>('shift')

  const chartData = useMemo(
    () => getAnalyticsChartData(dimension, filters.utilityType, filters.period),
    [dimension, filters.utilityType, filters.period]
  )

  const isShiftView = dimension === 'shift'
  const unit = utilityUnit(filters.utilityType)

  const exportRows = useMemo(
    () =>
      chartData.map((row) => ({
        label: row.label,
        actual: row.actual,
        baseline: row.baseline,
        target: row.target,
        ...(isShiftView
          ? {
              shift1: row.shift1 ?? '',
              shift2: row.shift2 ?? '',
              shift3: row.shift3 ?? '',
            }
          : {}),
      })),
    [chartData, isShiftView]
  )

  const exportColumns = useMemo(() => {
    const base = [
      { key: 'label', header: 'Label' },
      { key: 'actual', header: 'Actual' },
      { key: 'baseline', header: 'Baseline' },
      { key: 'target', header: 'Target' },
    ]
    if (isShiftView) {
      return [
        ...base,
        { key: 'shift1', header: 'Shift 1' },
        { key: 'shift2', header: 'Shift 2' },
        { key: 'shift3', header: 'Shift 3' },
      ]
    }
    return base
  }, [isShiftView])

  const handleExportExcel = () => {
    const stamp = new Date().toISOString().slice(0, 10)
    exportToExcel(`analytics-${dimension}-${stamp}`, [
      { name: dimensionLabels[dimension], columns: exportColumns, rows: exportRows },
    ])
  }

  const handleExportPdf = () => {
    const stamp = new Date().toISOString().slice(0, 10)
    exportToPdf(
      `analytics-${dimension}-${stamp}`,
      {
        title: `Consumption Analytics — ${dimensionLabels[dimension]}`,
        period: filters.period,
        subtitle: `Utility: ${filters.utilityType}`,
      },
      [{ heading: dimensionLabels[dimension], columns: exportColumns, rows: exportRows }]
    )
  }

  return (
    <PageShell loadingDeps={[dimension, filters.utilityType, filters.period]}>
      <div className="flex-1 overflow-auto p-4 lg:p-6 space-y-6">
        <PageIntro
          messageKey="page.analytics.description"
          values={{ unit }}
          actions={
            <>
              <Button
                variant="outline"
                className="gap-2 min-h-[44px] bg-muted"
                onClick={handleExportExcel}
                aria-label="Export to Excel"
              >
                <FileSpreadsheet className="w-4 h-4" aria-hidden />
                Excel
              </Button>
              <Button
                variant="outline"
                className="gap-2 min-h-[44px] bg-muted"
                onClick={handleExportPdf}
                aria-label="Export to PDF"
              >
                <Download className="w-4 h-4" aria-hidden />
                PDF
              </Button>
            </>
          }
        />

        <Tabs value={dimension} onValueChange={(v) => setDimension(v as AnalyticsDimension)}>
          <TabsList className="flex flex-wrap h-auto gap-1 bg-muted p-1">
            {DIMENSIONS.map((d) => (
              <TabsTrigger
                key={d}
                value={d}
                className="min-h-[40px] data-[state=active]:bg-primary/20"
              >
                {dimensionLabels[d]}
              </TabsTrigger>
            ))}
          </TabsList>

          {DIMENSIONS.map((d) => (
            <TabsContent key={d} value={d} className="space-y-6 mt-4">
              {chartData.length === 0 ? (
                <EmptyState message="Tidak ada data analitik untuk kombinasi filter ini." />
              ) : (
                <>
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card className="glass-card">
                      <CardHeader>
                        <CardTitle>
                          {isShiftView ? 'Consumption by Shift' : `Consumption — ${dimensionLabels[d]}`}
                        </CardTitle>
                        <CardDescription>
                          {isShiftView
                            ? 'Comparison across shifts.'
                            : 'Aggregated for selected dimension.'}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                          {isShiftView ? (
                            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                              <CartesianGrid {...chartGridProps} />
                              <XAxis dataKey="label" {...chartAxisProps} />
                              <YAxis {...chartAxisProps} tickFormatter={(v) => formatNumber(Number(v))} />
                              <Tooltip {...chartTooltipProps} formatter={(v: number) => formatNumber(v)} />
                              <Legend />
                              <Bar dataKey="shift1" name="Shift 1" fill={chartColors.primary} radius={[4, 4, 0, 0]} />
                              <Bar dataKey="shift2" name="Shift 2" fill={chartColors.violet} radius={[4, 4, 0, 0]} />
                              <Bar dataKey="shift3" name="Shift 3" fill={chartColors.teal} radius={[4, 4, 0, 0]} />
                            </BarChart>
                          ) : (
                            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                              <CartesianGrid {...chartGridProps} />
                              <XAxis dataKey="label" {...chartAxisProps} />
                              <YAxis {...chartAxisProps} tickFormatter={(v) => formatNumber(Number(v))} />
                              <Tooltip {...chartTooltipProps} formatter={(v: number) => formatNumber(v)} />
                              <Legend />
                              <Bar dataKey="actual" name="Actual" fill={chartColors.primary} radius={[4, 4, 0, 0]} />
                            </BarChart>
                          )}
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>

                    <Card className="glass-card">
                      <CardHeader>
                        <CardTitle>Actual vs Baseline vs Target</CardTitle>
                      </CardHeader>
                      <CardContent className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                            <CartesianGrid {...chartGridProps} />
                            <XAxis dataKey="label" {...chartAxisProps} />
                            <YAxis {...chartAxisProps} tickFormatter={(v) => formatNumber(Number(v))} />
                            <Tooltip {...chartTooltipProps} formatter={(v: number) => formatNumber(v)} />
                            <Legend />
                            <Line
                              type="monotone"
                              dataKey="actual"
                              name="Actual"
                              stroke={chartColors.rose}
                              strokeWidth={3}
                              dot={{ r: 4 }}
                            />
                            <Line
                              type="step"
                              dataKey="baseline"
                              name="Baseline"
                              stroke={chartColors.emerald}
                              strokeWidth={2}
                              strokeDasharray="5 5"
                              dot={false}
                            />
                            <Line
                              type="monotone"
                              dataKey="target"
                              name="Target"
                              stroke={chartColors.amber}
                              strokeWidth={2}
                              strokeDasharray="3 3"
                              dot={false}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle>Detail Data — {dimensionLabels[d]}</CardTitle>
                      <CardDescription>Nilai numerik untuk audit dan export</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveTable>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Label</TableHead>
                              <TableHead>Actual ({unit})</TableHead>
                              <TableHead>Baseline</TableHead>
                              <TableHead>Target</TableHead>
                              <TableHead>Δ vs Baseline</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {chartData.map((row) => {
                              const delta =
                                row.baseline === 0
                                  ? 0
                                  : ((row.actual - row.baseline) / row.baseline) * 100
                              return (
                                <TableRow key={row.label}>
                                  <TableCell className="font-medium">{row.label}</TableCell>
                                  <TableCell>{formatNumber(row.actual)}</TableCell>
                                  <TableCell>{formatNumber(row.baseline)}</TableCell>
                                  <TableCell>{formatNumber(row.target)}</TableCell>
                                  <TableCell className={delta > 0 ? 'text-destructive' : 'text-chart-emerald'}>
                                    {delta > 0 ? '+' : ''}
                                    {formatNumber(Math.round(delta))}%
                                  </TableCell>
                                </TableRow>
                              )
                            })}
                          </TableBody>
                        </Table>
                      </ResponsiveTable>
                    </CardContent>
                  </Card>
                </>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </PageShell>
  )
}
