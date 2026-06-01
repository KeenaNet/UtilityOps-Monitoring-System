import { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { KpiCard } from '@/components/common/KpiCard'
import { PageShell } from '@/components/common/PageShell'
import { EmptyState } from '@/components/common/EmptyState'
import { ResponsiveTable } from '@/components/common/ResponsiveTable'
import { useAppState } from '@/context/AppState'
import {
  areaNameToFilter,
  matchesAreaFilter,
  matchesUtilityFilter,
  utilityNameToFilter,
} from '@/lib/filterUtils'
import { formatNumber, formatPercent, formatWithUnit } from '@/lib/format'
import {
  manualInputCompletion,
  meterStatusRows,
  shiftConsumption,
  systemStatus,
  topAbnormalMeters,
  trendData24h,
} from '@/data/mockDashboard'
import { chartAxisProps, chartColors, chartGridProps } from '@/components/charts/chartTheme'
import { getChartTooltipProps } from '@/components/charts/ChartTooltip'
import {
  Zap,
  Droplets,
  Gauge,
  AlertTriangle,
  ClipboardList,
  Server,
} from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from 'recharts'

export default function Dashboard() {
  const { filters, navigate } = useAppState()

  const filteredMeters = useMemo(
    () =>
      topAbnormalMeters.filter(
        (m) =>
          matchesAreaFilter(m.area, filters.area) &&
          matchesUtilityFilter(m.utility, filters.utilityType)
      ),
    [filters.area, filters.utilityType]
  )

  const filteredStatus = useMemo(
    () =>
      meterStatusRows.filter((m) => matchesAreaFilter(m.area, filters.area)),
    [filters.area]
  )

  const activeAlarms = 3
  const highPriority = 1

  return (
    <PageShell loadingDeps={[filters.period, filters.area, filters.utilityType]}>
      <div className="flex-1 overflow-auto p-4 lg:p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          <KpiCard
            title="Total Electricity"
            value={formatWithUnit(12450, 'kWh')}
            subtitle={`+${formatPercent(12)} dari kemarin`}
            icon={Zap}
            iconClassName="text-blue-400"
            className="hover:border-blue-400/50"
          />
          <KpiCard
            title="Compressor kWh Today"
            value={formatWithUnit(890, 'kWh')}
            subtitle="Normal operating range"
            icon={Gauge}
            iconClassName="text-violet-400"
            className="hover:border-violet-500/50"
          />
          <KpiCard
            title="Total Water Usage"
            value={formatWithUnit(450, 'm³')}
            subtitle={`+${formatPercent(2)} dari kemarin`}
            icon={Droplets}
            iconClassName="text-cyan-400"
            className="hover:border-cyan-500/50"
          />
          <KpiCard
            title="Avg Compressor Pressure"
            value={formatWithUnit(6.8, 'Bar', 1)}
            subtitle="Within target band"
            icon={Gauge}
            iconClassName="text-emerald-400"
            className="hover:border-emerald-500/50"
          />
          <KpiCard
            title="Active Alarms"
            value={<span className="text-red-400">{formatNumber(activeAlarms)}</span>}
            subtitle={`${formatNumber(highPriority)} High Priority`}
            icon={AlertTriangle}
            iconClassName="text-red-400"
            className="hover:border-destructive/50 md:col-span-2 lg:col-span-1"
            onClick={() =>
              navigate('alarm-center', { filters: { status: 'active', severity: 'all' } })
            }
            ariaLabel="Lihat alarm aktif"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KpiCard
            title="Manual Input Completion"
            value={formatPercent(manualInputCompletion.percent, 0)}
            subtitle={`${formatNumber(manualInputCompletion.completed)}/${formatNumber(manualInputCompletion.total)} — ${formatNumber(manualInputCompletion.missing)} missing`}
            icon={ClipboardList}
            iconClassName="text-amber-400"
            onClick={() => navigate('manual-input')}
            ariaLabel="Buka manual input"
          />
          <KpiCard
            title="Collector Status"
            value={systemStatus.collectorOnline ? 'Online' : 'Offline'}
            subtitle={`Datalogger: ${systemStatus.dataloggerLastUpdate}`}
            icon={Server}
            iconClassName={systemStatus.collectorOnline ? 'text-emerald-400' : 'text-red-400'}
          />
          <Card className="glass-card md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Last Data Update</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-1">
              <p>
                <span className="text-muted-foreground">Datalogger:</span>{' '}
                {systemStatus.dataloggerLastUpdate}
              </p>
              <p>
                <span className="text-muted-foreground">Manual input:</span>{' '}
                {systemStatus.manualLastUpdate}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-7">
          <Card className="col-span-4 glass-card">
            <CardHeader>
              <CardTitle>Consumption Trend (24h)</CardTitle>
              <CardDescription>Listrik, air, dan tekanan compressor</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData24h}>
                  <CartesianGrid {...chartGridProps} />
                  <XAxis dataKey="time" {...chartAxisProps} />
                  <YAxis {...chartAxisProps} tickFormatter={(v) => formatNumber(Number(v))} />
                  <Tooltip
                    {...getChartTooltipProps()}
                    formatter={(value: number, name: string) => [
                      name === 'pressure'
                        ? formatWithUnit(value, 'Bar', 1)
                        : formatNumber(value),
                      name === 'kwh'
                        ? 'Listrik (kWh)'
                        : name === 'water'
                          ? 'Air (m³)'
                          : name === 'compressorKwh'
                            ? 'Compressor (kWh)'
                            : 'Tekanan',
                    ]}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="kwh"
                    stroke={chartColors.primary}
                    strokeWidth={2}
                    dot={false}
                    name="Electricity (kWh)"
                  />
                  <Line
                    type="monotone"
                    dataKey="water"
                    stroke={chartColors.cyan}
                    strokeWidth={2}
                    dot={false}
                    name="Water (m³)"
                  />
                  <Line
                    type="monotone"
                    dataKey="compressorKwh"
                    stroke={chartColors.violet}
                    strokeWidth={2}
                    dot={false}
                    name="Compressor (kWh)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="col-span-3 glass-card">
            <CardHeader>
              <CardTitle>Consumption by Shift</CardTitle>
              <CardDescription>Today — all utilities</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={shiftConsumption}>
                  <CartesianGrid {...chartGridProps} />
                  <XAxis dataKey="shift" {...chartAxisProps} />
                  <YAxis {...chartAxisProps} tickFormatter={(v) => formatNumber(Number(v))} />
                  <Tooltip {...getChartTooltipProps()} />
                  <Legend />
                  <Bar dataKey="electricity" name="Electricity" fill={chartColors.primary} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="compressor" name="Compressor" fill={chartColors.violet} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="water" name="Water" fill={chartColors.cyan} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Top Abnormal Meters</CardTitle>
              <CardDescription>Klik baris untuk detail anomali</CardDescription>
            </CardHeader>
            <CardContent>
              {filteredMeters.length === 0 ? (
                <EmptyState message="Tidak ada meter abnormal untuk filter yang dipilih." />
              ) : (
                <ResponsiveTable>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Meter</TableHead>
                        <TableHead>Area</TableHead>
                        <TableHead>Events</TableHead>
                        <TableHead>Severity</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredMeters.map((m) => (
                        <TableRow
                          key={m.meter}
                          className="cursor-pointer hover:bg-white/5"
                          onClick={() =>
                            navigate('anomaly', {
                              filters: {
                                area: areaNameToFilter(m.area),
                                utilityType: utilityNameToFilter(m.utility),
                              },
                            })
                          }
                        >
                          <TableCell className="font-medium">{m.meter}</TableCell>
                          <TableCell>{m.area}</TableCell>
                          <TableCell>{formatNumber(m.events)}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                m.severity === 'Critical' || m.severity === 'High'
                                  ? 'destructive'
                                  : 'warning'
                              }
                            >
                              <span className="sr-only">Severity: </span>
                              {m.severity}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ResponsiveTable>
              )}
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Meter & Collector Status</CardTitle>
            </CardHeader>
            <CardContent>
              {filteredStatus.length === 0 ? (
                <EmptyState message="Tidak ada meter untuk area yang dipilih." />
              ) : (
                <ResponsiveTable>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Meter</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Updated</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStatus.map((row) => (
                        <TableRow key={row.meter}>
                          <TableCell className="font-medium">{row.meter}</TableCell>
                          <TableCell>{row.source}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                row.status === 'Online'
                                  ? 'success'
                                  : row.status === 'Warning'
                                    ? 'warning'
                                    : 'destructive'
                              }
                            >
                              {row.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{row.lastUpdate}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ResponsiveTable>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </PageShell>
  )
}
