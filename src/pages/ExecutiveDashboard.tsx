import { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { KpiCard } from '@/components/common/KpiCard'
import { PageShell } from '@/components/common/PageShell'
import { useAppState } from '@/context/AppState'
import { formatIdr, formatIdrJuta, formatPercent, formatWithUnit, jutaToIdr } from '@/lib/format'
import {
  Zap,
  Droplets,
  Gauge,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle,
} from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  LineChart,
  Legend,
} from 'recharts'
import { useChartTheme } from '@/components/charts/chartTheme'
import { useChartTooltipProps } from '@/components/charts/ChartTooltip'

const monthlyTrend = [
  { month: 'Jan', kwh: 320000, cost: 480, actual: 72000, target: 68000 },
  { month: 'Feb', kwh: 340000, cost: 510, actual: 68000, target: 68000 },
  { month: 'Mar', kwh: 310000, cost: 465, actual: 71000, target: 68000 },
  { month: 'Apr', kwh: 380000, cost: 570, actual: 74000, target: 68000 },
  { month: 'May', kwh: 350000, cost: 525, actual: 73500, target: 68000 },
  { month: 'Jun', kwh: 120000, cost: 180, actual: 12000, target: 68000 },
]

const topAbnormalAreas = [
  { area: 'Production Line A', events: 12, cause: 'High Power Usage', filterArea: 'line-a' as const },
  { area: 'Utility Building', events: 8, cause: 'Pressure Drops', filterArea: 'utility' as const },
  { area: 'Production Line B', events: 3, cause: 'Minor Water Leaks', filterArea: 'line-b' as const },
]

const TOTAL_ELECTRICITY_COST_IDR = 124_500_000
const SAVING_OPPORTUNITY_IDR = 2_100_000
const ABNORMAL_EVENTS_MTD = 23

export default function ExecutiveDashboard() {
  const { colors: chartColors, gridProps: chartGridProps, axisProps: chartAxisProps } = useChartTheme()
  const chartTooltipProps = useChartTooltipProps()
  const { filters, navigate } = useAppState()

  const areas = useMemo(() => {
    if (filters.area === 'all') return topAbnormalAreas
    return topAbnormalAreas.filter((a) => a.filterArea === filters.area)
  }, [filters.area])

  return (
    <PageShell loadingDeps={[filters.period, filters.area]}>
      <div className="flex-1 overflow-auto p-4 lg:p-6 space-y-6">
        <p className="text-sm text-muted-foreground -mt-2">
          Ringkasan konsumsi utility dan biaya (Rupiah) · Period: June 2026 (MTD)
        </p>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <KpiCard
            title="Total Biaya Listrik"
            value={formatIdr(TOTAL_ELECTRICITY_COST_IDR)}
            subtitle={
              <span className="flex items-center text-emerald-400">
                <ArrowDownRight className="w-3 h-3 mr-1" aria-hidden />
                {formatPercent(4.2, 1)} di bawah anggaran
              </span>
            }
            icon={Zap}
            iconClassName="text-blue-400"
          />
          <KpiCard
            title="Compressor Consumption"
            value={formatWithUnit(48500, 'kWh')}
            subtitle={
              <span className="flex items-center text-emerald-400">
                <ArrowDownRight className="w-3 h-3 mr-1" aria-hidden />
                {formatPercent(1.8, 1)} vs target
              </span>
            }
            icon={Gauge}
            iconClassName="text-violet-400"
          />
          <KpiCard
            title="Water Consumption"
            value={formatWithUnit(14200, 'm³')}
            subtitle={
              <span className="flex items-center text-red-400">
                <ArrowUpRight className="w-3 h-3 mr-1" aria-hidden />
                {formatPercent(2.1, 1)} di atas anggaran
              </span>
            }
            icon={Droplets}
            iconClassName="text-cyan-400"
          />
          <KpiCard
            title="Abnormal Events (MTD)"
            value={ABNORMAL_EVENTS_MTD}
            subtitle="Across all utilities"
            icon={AlertTriangle}
            iconClassName="text-amber-400"
            onClick={() => navigate('anomaly', { filters: { status: 'all' } })}
            ariaLabel="Lihat ringkasan anomali"
          />
          <KpiCard
            title="Saving Opportunity"
            value={<span className="text-emerald-400">~{formatIdr(SAVING_OPPORTUNITY_IDR)}</span>}
            subtitle="From idle compressors"
            icon={TrendingDown}
            iconClassName="text-emerald-400"
            className="border-emerald-500/30"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="glass-card lg:col-span-2">
            <CardHeader>
              <CardTitle>Tren Biaya Listrik YTD (Rp juta)</CardTitle>
            </CardHeader>
            <CardContent className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyTrend} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid {...chartGridProps} />
                  <XAxis dataKey="month" {...chartAxisProps} />
                  <YAxis {...chartAxisProps} tickFormatter={(v) => formatIdrJuta(Number(v))} />
                  <Tooltip
                    {...chartTooltipProps}
                    formatter={(value: number) => [jutaToIdr(value), 'Biaya']}
                  />
                  <Bar dataKey="cost" name="Biaya" fill={chartColors.primary} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Actual vs Target (kWh)</CardTitle>
              <CardDescription>Monthly consumption vs target</CardDescription>
            </CardHeader>
            <CardContent className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrend}>
                  <CartesianGrid {...chartGridProps} />
                  <XAxis dataKey="month" {...chartAxisProps} />
                  <YAxis {...chartAxisProps} />
                  <Tooltip {...chartTooltipProps} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    name="Actual"
                    stroke={chartColors.rose}
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                  <Line
                    type="step"
                    dataKey="target"
                    name="Target"
                    stroke={chartColors.amber}
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Top Abnormal Areas</CardTitle>
            <CardDescription>Klik area untuk buka Anomaly Dashboard terfilter</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {areas.length === 0 ? (
                <p className="text-sm text-muted-foreground">Tidak ada area untuk filter ini.</p>
              ) : (
                areas.map((item) => (
                  <button
                    key={item.area}
                    type="button"
                    className="w-full text-left space-y-2 rounded-lg p-2 -mx-2 hover:bg-accent transition-colors min-h-[44px]"
                    onClick={() =>
                      navigate('anomaly', { filters: { area: item.filterArea } })
                    }
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{item.area}</span>
                      <Badge variant={item.events > 8 ? 'destructive' : 'warning'}>
                        {item.events} Events
                      </Badge>
                    </div>
                    <div className="h-2 w-full bg-input rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${(item.events / 12) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">{item.cause}</p>
                  </button>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}
