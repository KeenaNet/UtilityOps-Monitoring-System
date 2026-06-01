import { useMemo, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { KpiCard } from '@/components/common/KpiCard'
import { PageShell } from '@/components/common/PageShell'
import { EmptyState } from '@/components/common/EmptyState'
import { ResponsiveTable } from '@/components/common/ResponsiveTable'
import { TablePagination } from '@/components/common/TablePagination'
import { useAppState } from '@/context/AppState'
import {
  matchesAreaFilter,
  matchesPicFilter,
  matchesSeverityFilter,
  matchesStatusFilter,
  matchesUtilityFilter,
} from '@/lib/filterUtils'
import { useSortablePaginatedTable } from '@/lib/tableUtils'
import { formatDecimal, formatNumber, formatPercent } from '@/lib/format'
import { deltaPercent, mockAnomalies, type AnomalyRecord } from '@/data/mockAnomalies'
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Clock,
  Eye,
  UserX,
} from 'lucide-react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { chartAxisProps, chartColors, chartGridProps } from '@/components/charts/chartTheme'
import { getChartTooltipProps } from '@/components/charts/ChartTooltip'

const SEVERITY_COLORS: Record<string, string> = {
  Low: chartColors.axis,
  Medium: chartColors.amber,
  High: '#f97316',
  Critical: chartColors.rose,
}

function severityVariant(severity: string) {
  if (severity === 'Critical' || severity === 'High') return 'destructive' as const
  if (severity === 'Medium') return 'warning' as const
  return 'secondary' as const
}

function statusLabel(status: string) {
  const map: Record<string, string> = {
    open: 'Open',
    acknowledged: 'Acknowledged',
    'in progress': 'In Progress',
    closed: 'Closed',
  }
  return map[status] ?? status
}

export default function AnomalyDashboard() {
  const { filters, navigate } = useAppState()
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const filtered = useMemo(() => {
    return mockAnomalies.filter((a) => {
      if (!matchesSeverityFilter(a.severity, filters.severity)) return false
      if (!matchesUtilityFilter(a.utilityType, filters.utilityType)) return false
      if (!matchesAreaFilter(a.area, filters.area)) return false
      if (!matchesStatusFilter(a.status, filters.status)) return false
      if (!matchesPicFilter(a.pic, filters.pic)) return false
      return true
    })
  }, [filters])

  const table = useSortablePaginatedTable(filtered, 8, 'detectedAt')

  const activeCount = filtered.filter((a) => a.status !== 'closed').length
  const criticalHigh = filtered.filter(
    (a) => a.severity === 'Critical' || a.severity === 'High'
  ).length
  const avgDuration =
    filtered.length > 0
      ? filtered.reduce((s, a) => s + a.durationHours, 0) / filtered.length
      : 0
  const closedCount = filtered.filter((a) => a.status === 'closed').length
  const resolutionRate = filtered.length > 0 ? (closedCount / filtered.length) * 100 : 0
  const unassigned = filtered.filter((a) => a.pic === 'Unassigned' && a.status !== 'closed').length

  const severityBreakdown = useMemo(() => {
    const counts: Record<string, number> = { Low: 0, Medium: 0, High: 0, Critical: 0 }
    filtered.forEach((a) => {
      counts[a.severity] = (counts[a.severity] ?? 0) + 1
    })
    return Object.entries(counts).map(([name, value]) => ({ name, value }))
  }, [filtered])

  const areaRanking = useMemo(() => {
    const map = new Map<string, number>()
    filtered.forEach((a) => map.set(a.area, (map.get(a.area) ?? 0) + 1))
    return [...map.entries()]
      .map(([area, count]) => ({ area, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
  }, [filtered])

  const maxAreaCount = areaRanking[0]?.count ?? 1

  const selectedAnomaly: AnomalyRecord | undefined =
    filtered.find((a) => a.id === selectedId) ?? filtered[0]

  const baselineChartData = selectedAnomaly
    ? [
        { point: 'Baseline', value: selectedAnomaly.baseline },
        { point: 'Actual', value: selectedAnomaly.actual },
      ]
    : []

  return (
    <PageShell loadingDeps={[filters]}>
      <div className="flex-1 overflow-auto p-4 lg:p-6 space-y-6">
        <p className="text-sm text-muted-foreground -mt-2">
          Monitor abnormal usage, severity, and follow-up status
        </p>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <KpiCard
            title="Active Anomalies"
            value={formatNumber(activeCount)}
            subtitle={
              <span className="flex items-center text-amber-400">
                <ArrowUpRight className="w-3 h-3 mr-1" aria-hidden />
                {formatNumber(criticalHigh)} critical/high
              </span>
            }
            icon={AlertTriangle}
            iconClassName="text-amber-400"
            onClick={() =>
              navigate('anomaly', { filters: { status: 'open' }, mergeFilters: false })
            }
          />
          <KpiCard
            title="Critical / High"
            value={<span className="text-red-400">{formatNumber(criticalHigh)}</span>}
            subtitle="Requires immediate attention"
            icon={AlertTriangle}
            iconClassName="text-red-400"
            onClick={() =>
              navigate('anomaly', {
                filters: { severity: 'high', status: 'all' },
                mergeFilters: false,
              })
            }
          />
          <KpiCard
            title="Avg Duration (MTTR)"
            value={`${formatDecimal(avgDuration, 1)} h`}
            subtitle={
              <span className="flex items-center text-emerald-400">
                <ArrowDownRight className="w-3 h-3 mr-1" aria-hidden />
                Target &lt; 8 h
              </span>
            }
            icon={Clock}
            iconClassName="text-blue-400"
          />
          <KpiCard
            title="Resolution Rate"
            value={formatPercent(resolutionRate, 0)}
            subtitle={`${formatNumber(closedCount)} closed of ${formatNumber(filtered.length)}`}
          />
          <KpiCard
            title="Unassigned PIC"
            value={<span className="text-amber-400">{formatNumber(unassigned)}</span>}
            subtitle="Open without PIC"
            icon={UserX}
            iconClassName="text-amber-400"
            className="border-amber-500/30"
            onClick={() => navigate('anomaly', { filters: { pic: 'unassigned', status: 'open' } })}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Severity Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="h-[280px]">
              {filtered.length === 0 ? (
                <EmptyState message="Tidak ada anomali untuk filter yang dipilih." className="py-8" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={severityBreakdown}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={90}
                      paddingAngle={2}
                    >
                      {severityBreakdown.map((entry) => (
                        <Cell key={entry.name} fill={SEVERITY_COLORS[entry.name] ?? chartColors.axis} />
                      ))}
                    </Pie>
                    <Tooltip {...getChartTooltipProps()} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Anomalies by Area</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {areaRanking.length === 0 ? (
                <EmptyState message="Tidak ada area dengan anomali aktif." className="py-8" />
              ) : (
                areaRanking.map((item) => (
                  <button
                    key={item.area}
                    type="button"
                    className="w-full text-left space-y-2 min-h-[44px]"
                    onClick={() => setSelectedId(filtered.find((a) => a.area === item.area)?.id ?? null)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{item.area}</span>
                      <Badge variant="outline">{formatNumber(item.count)} events</Badge>
                    </div>
                    <div className="h-2 w-full bg-black/50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${(item.count / maxAreaCount) * 100}%` }}
                      />
                    </div>
                  </button>
                ))
              )}
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Actual vs Baseline</CardTitle>
              <CardDescription>
                {selectedAnomaly
                  ? `${selectedAnomaly.id} — ${selectedAnomaly.anomalyType}`
                  : 'Pilih baris di tabel'}
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[280px]">
              {baselineChartData.length === 0 ? (
                <EmptyState message="Pilih anomali dari tabel untuk melihat perbandingan." className="py-8" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={baselineChartData} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
                    <CartesianGrid {...chartGridProps} />
                    <XAxis dataKey="point" {...chartAxisProps} />
                    <YAxis {...chartAxisProps} />
                    <Tooltip {...getChartTooltipProps()} formatter={(v: number) => formatNumber(v)} />
                    <Bar dataKey="value" name="Value" radius={[4, 4, 0, 0]}>
                      <Cell fill={chartColors.emerald} />
                      <Cell fill={chartColors.rose} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Active Anomalies</CardTitle>
            <CardDescription>Klik baris untuk drill-down chart dan detail</CardDescription>
          </CardHeader>
          <CardContent>
            {filtered.length === 0 ? (
              <EmptyState
                title="Tidak ada anomali"
                message="Ubah filter atau reset untuk melihat semua data."
              />
            ) : (
              <>
                <ResponsiveTable>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Area</TableHead>
                        <TableHead>Meter</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Severity</TableHead>
                        <TableHead>Actual vs Baseline</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>PIC</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {table.rows.map((anomaly) => {
                        const delta = deltaPercent(anomaly.actual, anomaly.baseline)
                        return (
                          <TableRow
                            key={anomaly.id}
                            className={
                              selectedId === anomaly.id ? 'bg-primary/5' : 'cursor-pointer hover:bg-white/5'
                            }
                            onClick={() => setSelectedId(anomaly.id)}
                          >
                            <TableCell className="font-medium">{anomaly.id}</TableCell>
                            <TableCell>{anomaly.area}</TableCell>
                            <TableCell>{anomaly.meter}</TableCell>
                            <TableCell>{anomaly.utilityType}</TableCell>
                            <TableCell>
                              <Badge variant={severityVariant(anomaly.severity)}>
                                <span className="sr-only">Severity: </span>
                                {anomaly.severity}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <span className={delta > 0 ? 'text-red-400' : 'text-emerald-400'}>
                                {delta > 0 ? '+' : ''}
                                {formatPercent(delta, 1)}
                              </span>
                            </TableCell>
                            <TableCell>{formatDecimal(anomaly.durationHours, 1)} h</TableCell>
                            <TableCell>{anomaly.pic}</TableCell>
                            <TableCell>
                              <Badge variant={anomaly.status === 'closed' ? 'success' : 'outline'}>
                                {statusLabel(anomaly.status)}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                              <AnomalyDetailDialog anomaly={anomaly} />
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </ResponsiveTable>
                <TablePagination
                  page={table.page}
                  pageCount={table.pageCount}
                  total={table.total}
                  onPageChange={table.setPage}
                />
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}

function AnomalyDetailDialog({ anomaly }: { anomaly: AnomalyRecord }) {
  const delta = deltaPercent(anomaly.actual, anomaly.baseline)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-1 bg-black/20 hover:bg-black/40 min-h-[44px] min-w-[44px]"
        >
          <Eye className="w-4 h-4" />
          <span className="hidden sm:inline">Details</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[520px] glass-card border-white/10">
        <DialogHeader>
          <DialogTitle>Anomaly Details — {anomaly.id}</DialogTitle>
          <DialogDescription>Review metrics and update follow-up.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right text-muted-foreground">Area</Label>
            <div className="col-span-3 font-medium">{anomaly.area}</div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right text-muted-foreground">Meter</Label>
            <div className="col-span-3 font-medium">{anomaly.meter}</div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right text-muted-foreground">Rule</Label>
            <div className="col-span-3 font-medium text-red-400">{anomaly.anomalyType}</div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right text-muted-foreground">Actual / Baseline</Label>
            <div className="col-span-3 font-medium">
              {formatNumber(anomaly.actual)} / {formatNumber(anomaly.baseline)} ({delta > 0 ? '+' : ''}
              {formatPercent(delta, 1)})
            </div>
          </div>
          <div className="h-[120px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={[
                  { t: 'Baseline', v: anomaly.baseline },
                  { t: 'Actual', v: anomaly.actual },
                ]}
              >
                <CartesianGrid {...chartGridProps} />
                <XAxis dataKey="t" {...chartAxisProps} />
                <YAxis {...chartAxisProps} />
                <Tooltip {...getChartTooltipProps()} />
                <Line type="monotone" dataKey="v" stroke={chartColors.primary} strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor={`pic-${anomaly.id}`} className="text-right text-muted-foreground">
              Assign PIC
            </Label>
            <Select defaultValue={anomaly.pic === 'Unassigned' ? 'unassigned' : 'eng1'}>
              <SelectTrigger id={`pic-${anomaly.id}`} className="col-span-3 bg-black/50 min-h-[44px]">
                <SelectValue placeholder="Select PIC" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unassigned" className="min-h-[44px]">
                  Unassigned
                </SelectItem>
                <SelectItem value="eng1" className="min-h-[44px]">
                  Engineering Team 1
                </SelectItem>
                <SelectItem value="util1" className="min-h-[44px]">
                  Utility Operator 1
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor={`rc-${anomaly.id}`} className="text-right text-muted-foreground mt-2">
              Root Cause
            </Label>
            <Textarea
              id={`rc-${anomaly.id}`}
              defaultValue={anomaly.rootCause}
              placeholder="Identify the root cause..."
              className="col-span-3 bg-black/50 min-h-[44px]"
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor={`ca-${anomaly.id}`} className="text-right text-muted-foreground mt-2">
              Corrective Action
            </Label>
            <Textarea
              id={`ca-${anomaly.id}`}
              defaultValue={anomaly.correctiveAction}
              placeholder="Describe corrective action..."
              className="col-span-3 bg-black/50 min-h-[44px]"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" className="bg-black/20 hover:bg-black/40 min-h-[44px]">
            Save Draft
          </Button>
          <Button type="button" className="bg-red-500 hover:bg-red-600 text-white min-h-[44px]">
            Close Anomaly
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
