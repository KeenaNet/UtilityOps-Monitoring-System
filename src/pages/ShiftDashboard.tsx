import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { KpiCard } from '@/components/common/KpiCard'
import { PageShell } from '@/components/common/PageShell'
import { useAppState } from '@/context/AppState'
import { shiftAnomalies, shiftComparison, shiftTrend } from '@/data/mockShift'
import { formatNumber, formatWithUnit } from '@/lib/format'
import { chartAxisProps, chartColors, chartGridProps } from '@/components/charts/chartTheme'
import { getChartTooltipProps } from '@/components/charts/ChartTooltip'
import { Zap, Droplets, Gauge, AlertTriangle } from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
} from 'recharts'

export default function ShiftDashboard() {
  const { navigate } = useAppState()

  const totalElec = shiftComparison.find((r) => r.metric === 'Electricity')
  const totalComp = shiftComparison.find((r) => r.metric === 'Compressor kWh')
  const totalWater = shiftComparison.find((r) => r.metric === 'Water')
  const anomaliesShift2 = shiftAnomalies.find((s) => s.shift === 'Shift 2')?.count ?? 0

  return (
    <PageShell loadingDeps={[]}>
      <div className="flex-1 overflow-auto p-4 lg:p-6 space-y-6">
        <p className="text-sm text-muted-foreground -mt-2">
          Perbandingan konsumsi dan anomali per shift — hari ini
        </p>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KpiCard
            title="Electricity (All Shifts)"
            value={formatWithUnit(
              (totalElec?.shift1 ?? 0) + (totalElec?.shift2 ?? 0) + (totalElec?.shift3 ?? 0),
              'kWh'
            )}
            icon={Zap}
            iconClassName="text-blue-400"
            onClick={() => navigate('analytics', { filters: { period: 'today' } })}
          />
          <KpiCard
            title="Compressor kWh"
            value={formatWithUnit(
              (totalComp?.shift1 ?? 0) + (totalComp?.shift2 ?? 0) + (totalComp?.shift3 ?? 0),
              'kWh'
            )}
            icon={Gauge}
            iconClassName="text-violet-400"
          />
          <KpiCard
            title="Water Usage"
            value={formatWithUnit(
              (totalWater?.shift1 ?? 0) + (totalWater?.shift2 ?? 0) + (totalWater?.shift3 ?? 0),
              'm³'
            )}
            icon={Droplets}
            iconClassName="text-cyan-400"
          />
          <KpiCard
            title="Abnormal Events (Shift 2)"
            value={formatNumber(anomaliesShift2)}
            subtitle="Highest this week"
            icon={AlertTriangle}
            iconClassName="text-amber-400"
            onClick={() => navigate('anomaly')}
            ariaLabel="Lihat anomali shift"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Shift Comparison</CardTitle>
              <CardDescription>Consumption by utility type per shift</CardDescription>
            </CardHeader>
            <CardContent className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={shiftComparison}>
                  <CartesianGrid {...chartGridProps} />
                  <XAxis dataKey="metric" {...chartAxisProps} />
                  <YAxis {...chartAxisProps} />
                  <Tooltip {...getChartTooltipProps()} />
                  <Legend />
                  <Bar dataKey="shift1" name="Shift 1" fill={chartColors.primary} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="shift2" name="Shift 2" fill={chartColors.violet} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="shift3" name="Shift 3" fill={chartColors.teal} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Weekly Shift Trend</CardTitle>
            </CardHeader>
            <CardContent className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={shiftTrend}>
                  <CartesianGrid {...chartGridProps} />
                  <XAxis dataKey="day" {...chartAxisProps} />
                  <YAxis {...chartAxisProps} />
                  <Tooltip {...getChartTooltipProps()} />
                  <Legend />
                  <Line type="monotone" dataKey="s1" name="Shift 1" stroke={chartColors.primary} strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="s2" name="Shift 2" stroke={chartColors.violet} strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="s3" name="Shift 3" stroke={chartColors.teal} strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Abnormal Events per Shift</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-3">
            {shiftAnomalies.map((s) => (
              <button
                key={s.shift}
                type="button"
                className="rounded-lg border border-white/5 p-4 text-left hover:bg-white/5 transition-colors min-h-[44px]"
                onClick={() => navigate('anomaly')}
              >
                <p className="font-medium">{s.shift}</p>
                <p className="text-2xl font-bold mt-1">{formatNumber(s.count)}</p>
                <Badge variant="outline" className="mt-2">
                  {s.topIssue}
                </Badge>
              </button>
            ))}
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}
